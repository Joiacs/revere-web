import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'

const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined
const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js'

declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: Record<string, unknown>) => string
      reset: (widgetId?: string) => void
      remove: (widgetId?: string) => void
    }
  }
}

// Shared across instances so the script is only ever injected once, even if
// multiple Turnstile components were to mount.
let scriptLoadPromise: Promise<void> | null = null
function loadTurnstileScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve()
  if (!scriptLoadPromise) {
    scriptLoadPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = SCRIPT_SRC
      script.async = true
      script.defer = true
      script.onload = () => resolve()
      script.onerror = () => reject(new Error('Failed to load Turnstile'))
      document.head.appendChild(script)
    })
  }
  return scriptLoadPromise
}

export interface TurnstileHandle {
  /** Tokens are single-use and expire — call after a failed submit so the
   * widget re-arms for another attempt. */
  reset: () => void
}

interface TurnstileProps {
  onVerify: (token: string) => void
  onExpire: () => void
}

/**
 * Cloudflare Turnstile "click the box" widget. Note this project otherwise
 * makes zero third-party requests by design (see README) — this is a
 * deliberate, explicit exception the client asked for; there is no
 * server-side verification step here (this site has no backend), so this
 * only gates the submit button client-side. That stops generic spam bots
 * (which don't run the challenge) but isn't cryptographic proof against a
 * targeted attacker — same practical ceiling any CAPTCHA has on a static
 * site with no backend to call Cloudflare's siteverify endpoint from.
 */
export const Turnstile = forwardRef<TurnstileHandle, TurnstileProps>(function Turnstile(
  { onVerify, onExpire },
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | undefined>(undefined)
  const [loadError, setLoadError] = useState(false)

  useImperativeHandle(ref, () => ({
    reset() {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current)
      }
    },
  }))

  useEffect(() => {
    if (!SITE_KEY) return
    let cancelled = false

    loadTurnstileScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) return
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: SITE_KEY,
          theme: 'dark',
          callback: onVerify,
          'expired-callback': onExpire,
          'error-callback': () => setLoadError(true),
        })
      })
      .catch(() => setLoadError(true))

    return () => {
      cancelled = true
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!SITE_KEY) {
    return (
      <p className="text-xs text-golden-orange/90">
        Verification isn&rsquo;t configured yet — set VITE_TURNSTILE_SITE_KEY in .env.
      </p>
    )
  }

  return (
    <div>
      <div ref={containerRef} />
      {loadError && (
        <p role="alert" className="mt-1.5 text-sm text-golden-orange">
          Verification failed to load. Please refresh and try again.
        </p>
      )}
    </div>
  )
})
