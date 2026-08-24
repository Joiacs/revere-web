// Intentionally permissive — good enough to catch typos client-side.
// Real validation (deliverability, MX, etc.) happens on Kit's side.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim())
}
