export interface SignupData {
  name: string
  email: string
  organization: string
}

export class SignupError extends Error {}

const KIT_FORM_ID = import.meta.env.VITE_KIT_FORM_ID as string | undefined

/**
 * Submits the beta signup to Kit (formerly ConvertKit).
 *
 * IMPORTANT: VITE_KIT_FORM_ID must be the numeric form ID from the real
 * <form action="https://app.kit.com/forms/{ID}/subscriptions"> markup —
 * NOT the `data-uid` hash Kit's dashboard shows in its <script async
 * data-uid="..."> embed snippet. That script tag loads a widget that
 * dynamically injects the real form; the hash it carries is a
 * widget-loader ID, not the form ID the subscribe endpoint expects. Find
 * the real numeric ID by viewing that script's response (or the rendered
 * form's `action`/`data-sv-form` attribute) directly, e.g.:
 *   curl https://<your-subdomain>.kit.com/<data-uid>/index.js | grep forms/
 *
 * `email_address` is Kit's fixed top-level field. `fields[first_name]` and
 * `fields[organization]` are this form's actual field keys, confirmed
 * straight from its live embed markup — if fields are ever renamed in the
 * Kit dashboard, their keys (and the lines below) may change too.
 */
export async function submitSignup(data: SignupData): Promise<void> {
  if (!KIT_FORM_ID) {
    throw new SignupError(
      'Signups are not configured yet. Set VITE_KIT_FORM_ID in .env — see README.md.',
    )
  }

  const endpoint = `https://app.kit.com/forms/${KIT_FORM_ID}/subscriptions`

  const body = new FormData()
  body.set('email_address', data.email)
  if (data.name.trim()) body.set('fields[first_name]', data.name.trim())
  if (data.organization.trim()) {
    body.set('fields[organization]', data.organization.trim())
  }

  let response: Response
  try {
    response = await fetch(endpoint, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body,
    })
  } catch {
    throw new SignupError('Network error — please check your connection and try again.')
  }

  if (!response.ok) {
    throw new SignupError('Something went wrong on our end. Please try again in a moment.')
  }
}
