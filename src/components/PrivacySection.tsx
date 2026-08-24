import { FadeIn } from './FadeIn'

export function PrivacySection() {
  return (
    <section className="bg-ink px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <FadeIn as="div" className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Built for organizations that take privacy seriously.
        </h2>
        <p className="mt-6 text-lg text-periwinkle/80">
          Revere is built around privacy, security, and data minimization. We believe
          organizations shouldn&rsquo;t have to trade away sensitive information in order to get
          better security guidance.
        </p>
      </FadeIn>
    </section>
  )
}
