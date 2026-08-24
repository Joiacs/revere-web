import { FadeIn } from './FadeIn'

const CAPABILITIES = [
  'Threat Assessment',
  'Alerts & Monitoring',
  'Secure Communications',
  'Data Management',
  'Device Security',
  'Travel Security',
  'Emergency Planning',
  'Physical Safety',
  'Surveillance & Privacy',
  'Doxxing & Harassment',
  'Document Retention',
  'Whistleblower Protection',
  'Onboarding & Offboarding',
]

export function CapabilityPills() {
  return (
    <section className="bg-ink px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <FadeIn as="div" className="mx-auto max-w-content">
        <h2 className="text-center text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          How Revere can help:
        </h2>

        <ul
          role="list"
          className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2.5 sm:gap-3"
        >
          {CAPABILITIES.map((item) => (
            <li key={item}>
              <span className="inline-block rounded-full border border-lavender-sky/30 bg-lavender-sky/[0.08] px-4 py-2 text-sm text-periwinkle/90 sm:text-base">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </FadeIn>
    </section>
  )
}
