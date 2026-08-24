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
 * TODO(kit-integration): This targets Kit's standard public forms endpoint
 * and field names (`email_address`, `first_name`, `fields[organization_name]`),
 * which is what Kit's own JS embed snippet posts to. Before launch, open the
 * form in the Kit dashboard -> Share -> Embed, and diff the endpoint URL and
 * field names shown there against what's below — Kit has changed this
 * shape before (ConvertKit -> Kit rebrand) and per-account form config
 * (e.g. a custom "organization" field's actual key) can vary. If anything
 * differs, this is the only place that needs to change.
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
  if (data.name.trim()) body.set('first_name', data.name.trim())
  if (data.organization.trim()) {
    body.set('fields[organization_name]', data.organization.trim())
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
