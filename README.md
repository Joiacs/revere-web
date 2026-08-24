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
2. In the Kit dashboard, open the beta signup form → **Share** → **Embed**, and copy the
   numeric form ID out of the embed snippet's URL.
3. Paste it into `.env`:
   ```
   VITE_KIT_FORM_ID=1234567
   ```
4. Restart `npm run dev` (Vite only reads `.env` on startup).

**Before launch, double-check the endpoint.** `src/lib/submitSignup.ts` posts to Kit's
standard public-forms endpoint (`https://app.kit.com/forms/{ID}/subscriptions`) with the
field names Kit's own embed snippet uses (`email_address`, `first_name`,
`fields[organization_name]`). This is the documented default, but Kit has changed this
shape before (the ConvertKit → Kit rebrand) and a custom field's exact key can vary per
account. Compare the embed snippet shown in your dashboard against the constants at the
top of `submitSignup()` — if anything differs, that function is the only place you need to
edit. Every other part of the form (validation, states, honeypot) is already wired up
against it.

Until `VITE_KIT_FORM_ID` is set, the form fails gracefully with an inline error asking you
to configure it — it never silently drops a signup.

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

No analytics, no tag manager, no third-party embeds or fonts, no `localStorage`, no dark
mode toggle (the site is dark by design), no CMS or router. See the project brief for the
full list of constraints — they're load-bearing, not oversights.
