import { FadeIn } from './FadeIn'
import { HumanIcon, InsightIcon, SecurityIcon } from './Icons'
import { VerticalStripes } from './Motifs'

const COLUMNS = [
  {
    Icon: InsightIcon,
    title: 'Understand your risks',
    body: 'Identify vulnerabilities and understand the threats that actually matter to your organization.',
  },
  {
    Icon: SecurityIcon,
    title: 'Build stronger systems',
    body: "Develop policies, procedures, and security practices tailored to your organization's needs.",
  },
  {
    Icon: HumanIcon,
    title: 'Get help when you need it',
    body: 'Ask questions, work through problems, and get practical guidance as new situations arise.',
  },
]

export function ValueColumns() {
  return (
    <section className="relative overflow-hidden bg-royal-iris px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <VerticalStripes className="opacity-[0.06]" />
      <FadeIn as="div" className="relative mx-auto max-w-content">
        <h2 className="mx-auto max-w-2xl text-center text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Revere helps organizations figure out what they need—and actually do it.
        </h2>

        <div className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {COLUMNS.map(({ Icon, title, body }) => (
            <div key={title} className="text-center sm:text-left">
              <Icon className="mx-auto h-8 w-8 text-lavender-sky sm:mx-0" />
              <h3 className="mt-4 text-lg font-medium text-white">{title}</h3>
              <p className="mt-2 text-base text-periwinkle/80">{body}</p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-16 max-w-2xl text-center text-base text-periwinkle/80">
          Revere brings operational security and resilience guidance together in one
          place—and helps translate best practices into policies and actions that work for your
          organization.
        </p>
      </FadeIn>
    </section>
  )
}
