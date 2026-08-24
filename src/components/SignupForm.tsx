import { useState, type FormEvent } from 'react'
import { isValidEmail } from '../lib/validateEmail'
import { submitSignup, SignupError } from '../lib/submitSignup'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function SignupForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [organization, setOrganization] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [validationError, setValidationError] = useState('')
  const [submitError, setSubmitError] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    // Honeypot: bots that fill hidden fields get a silent no-op "success"
    // rather than a tell that they were caught.
    if (honeypot) {
      setStatus('success')
      return
    }

    if (!isValidEmail(email)) {
      setValidationError('Enter a valid email address to join the beta.')
      return
    }
    setValidationError('')
    setSubmitError('')
    setStatus('submitting')

    try {
      await submitSignup({ name, email, organization })
      setStatus('success')
    } catch (err) {
      setSubmitError(
        err instanceof SignupError
          ? err.message
          : 'Something went wrong. Please try again.',
      )
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-2xl border border-white/10 bg-white/5 px-6 py-10 text-center sm:px-10"
      >
        <p className="text-xl font-medium text-white">You&rsquo;re on the list.</p>
        <p className="mt-2 text-periwinkle/80">We&rsquo;ll be in touch.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot — hidden from sighted users and screen readers, never
          reachable by keyboard. Real visitors never see or fill this. */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: 'hidden',
          clip: 'rect(0,0,0,0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
      >
        <label htmlFor="organization_website">Leave this field empty</label>
        <input
          type="text"
          id="organization_website"
          name="organization_website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-periwinkle/90">
          Name <span className="text-periwinkle/75">(optional)</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1.5 block w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-white placeholder:text-white/30 focus:border-lavender-sky"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-periwinkle/90">
          Email address <span className="text-golden-orange/90">(required)</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={validationError ? 'true' : undefined}
          aria-describedby={validationError ? 'email-error' : undefined}
          className="mt-1.5 block w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-white placeholder:text-white/30 focus:border-lavender-sky"
        />
        <p id="email-error" role="alert" aria-live="polite" className="mt-1.5 min-h-[1.25rem] text-sm text-golden-orange">
          {validationError}
        </p>
      </div>

      <div>
        <label htmlFor="organization" className="block text-sm font-medium text-periwinkle/90">
          Organization name <span className="text-periwinkle/75">(optional)</span>
        </label>
        <input
          id="organization"
          name="organization"
          type="text"
          autoComplete="organization"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
          className="mt-1.5 block w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-white placeholder:text-white/30 focus:border-lavender-sky"
        />
      </div>

      {submitError && (
        <p role="alert" aria-live="assertive" className="text-sm text-golden-orange">
          {submitError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full rounded-full bg-white px-6 py-3 text-base font-medium text-royal-iris transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-8"
      >
        {status === 'submitting' ? 'Joining…' : 'Join the Beta'}
      </button>
    </form>
  )
}
