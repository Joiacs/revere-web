# Revere — marketing splash site

Single-page marketing site for Revere, built with Vite + React + TypeScript + Tailwind CSS.
No backend, no CMS, no router — one page, one build.

## Local setup

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-checks (tsc -b) then builds to dist/
npm run preview  # serve the production build locally
```

## Kit (email capture) setup

The signup form posts to [Kit](https://kit.com) (formerly ConvertKit). The form ID is read
from an environment variable so it's a one-line change to go live.

1. Copy `.env.example` to `.env`.
2. Get the real numeric form ID (see the callout below — **this is not** the ID shown in
   Kit's default dashboard embed snippet).
3. Paste it into `.env`:
   ```
   VITE_KIT_FORM_ID=9840503
   ```
4. Restart `npm run dev` (Vite only reads `.env` on startup).

**⚠️ Kit's dashboard "Embed" snippet gives you the wrong ID for this integration.** Kit's
current embed UI hands you a `<script async data-uid="132da3bd7c" src="https://your-sub
domain.kit.com/132da3bd7c/index.js">` snippet. That `data-uid` is a widget-loader ID, not
the form ID the subscribe endpoint expects — pasting it into `.env` as-is silently breaks
the integration (the request goes to a form that doesn't exist, so nothing shows up in Kit
and nothing useful shows up in the browser's Network tab either, since a plausible-looking
`data-uid` doesn't fail loudly).

The real numeric form ID lives inside that script. To find it:
```bash
curl -s https://your-subdomain.kit.com/<data-uid>/index.js | grep -o 'forms/[0-9]*/subscriptions'
```
That prints the real `<form action="https://app.kit.com/forms/{NUMERIC_ID}/subscriptions">`
— use that numeric ID, not the `data-uid`. The same fetch also shows the form's actual
field names (they can vary by form/account) — `src/lib/submitSignup.ts` currently posts
`email_address`, `fields[first_name]`, and `fields[organization]`, confirmed against this
account's live form. If you edit the form in Kit later (rename fields, add new ones), redo
this check and update the field names at the top of `submitSignup()` to match — that
function is the only place that needs to change.

Until `VITE_KIT_FORM_ID` is set, the form fails gracefully with an inline error asking you
to configure it — it never silently drops a signup.

## CAPTCHA (Cloudflare Turnstile) setup

The signup form requires a Cloudflare Turnstile "click the box" check before it can be
submitted (`src/components/Turnstile.tsx`). **This is a deliberate exception** to this
project's otherwise-strict zero-third-party-request rule — it was added on request after
the initial build, trading a small amount of the site's privacy stance for spam
resistance. There's no server here to call Cloudflare's verification API from, so this
only gates the submit button client-side; it stops generic form-spam bots (which don't
run the challenge) but isn't cryptographic proof against a targeted attacker.

1. Get a free site key: [Cloudflare dashboard](https://dash.cloudflare.com/) → **Turnstile**
   → **Add site** (no billing info needed).
2. Add it to `.env`:
   ```
   VITE_TURNSTILE_SITE_KEY=0x4AAAAAAA...
   ```
3. Restart `npm run dev`.

Until it's set, the widget renders a small inline message instead of the checkbox, and the
submit button stays disabled — same fail-gracefully approach as the Kit form ID. For local
testing without a real key, Cloudflare publishes a public "always passes" test key:
`1x00000000000000000000AA` — it renders a visible "FOR TESTING ONLY" watermark, so swap in
the real key before launch.

## Swapping in the real Founders Grotesk font

The brand's primary typeface, Founders Grotesk, is a commercial Klim Type Foundry font and
isn't self-hostable without a license, so the site currently ships with **General Sans**
(Fontshare, self-hosted, free for commercial use) as a close geometric-grotesque stand-in.

To swap it in once the agency delivers licensed webfont files:

1. Drop the `.woff2` files into `public/fonts/founders-grotesk/`.
2. In `src/index.css`, update the `@font-face` blocks at the top of the file to point at
   the new files (swap the `src: url(...)` paths and `font-family` name).
3. In `tailwind.config.js`, change `theme.extend.fontFamily.sans[0]` from `'General Sans'`
   to `'Founders Grotesk'`.

That's the whole swap — every component references the `font-sans` Tailwind utility, none
of them hardcode a font name.

## Swapping in a transparent SVG logo

`public/logo/revere-lockup.png` is a raster export of the horizontal lockup with the Royal
Iris (`#2e0585`) background baked into the file — it only looks correct on a `#2e0585`
surface (the header and footer, both already that color). Every place it's used has a
`TODO` comment marking this.

Once the design agency delivers a transparent SVG:

1. Add it as `public/logo/revere-lockup.svg`.
2. In `src/components/Header.tsx` and `src/components/Footer.tsx`, swap the `<img src=...>`
   for the new SVG (drop the `width`/`height` attrs tied to the PNG's pixel dimensions).
3. Delete `public/logo/revere-lockup.png` and `assets-src/revere-lockup-cutout.png` (the
   latter is a transparent-background cutout used only to generate `public/og-image.png` —
   regenerate that image from the new SVG if you want it to match).

The favicon files in `public/` (`favicon.ico`, `favicon-*.png`, `apple-touch-icon.png`,
`android-chrome-*.png`) were cropped from the logomark in `Logo_V1.png`. Regenerate them
from the new SVG the same way if the mark itself changes.

## Deploying

This is a static site — `npm run build` produces a self-contained `dist/` directory
(HTML, CSS, JS, fonts, images) with no server-side runtime required. It can be served by
any static file host or web server (nginx, Apache, Caddy, S3 + CDN, etc.).

Deploy target: **X-Lab servers** (per Sascha). Once the specifics of that environment are
confirmed — plain static hosting vs. a container/CI pipeline — this section will be filled
in with the exact steps. In the meantime, the general shape is:

```bash
npm run build          # produces dist/
# copy/rsync dist/ to the web root X-Lab serves, or build it as part of their pipeline
```

Things whoever configures the server should know:
- It's a single-page app with client-side routing only via in-page anchors (`#signup`,
  `#what-is-revere`) — no server-side routes to configure beyond serving `index.html`.
- `VITE_KIT_FORM_ID` (see above) must be set **at build time**, not runtime — Vite inlines
  it into the built JS. There's no `.env` to manage on the server.
- `index.html`'s canonical URL and Open Graph tags are hardcoded to
  `https://reveresecurity.tech` — update those in `index.html` if the final domain differs.

### Pointing the domain

`reveresecurity.tech` is currently parked at a third-party registrar and needs its DNS
pointed at wherever X-Lab hosts it — the exact records (A/CNAME/etc.) depend on that
environment and aren't known yet.

## What's intentionally not here

No analytics, no tag manager, no third-party fonts, no `localStorage`, no dark mode toggle
(the site is dark by design), no CMS or router. See the project brief for the full list of
constraints — they're load-bearing, not oversights.

The one deliberate exception is **Cloudflare Turnstile** on the signup form (see above) —
originally the brief called for zero third-party requests site-wide, and that held until
CAPTCHA was requested afterward. Everything else — fonts, icons, the brand motifs — stays
self-hosted/inline as originally specified.
