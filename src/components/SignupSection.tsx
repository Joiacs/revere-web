import { FadeIn } from './FadeIn'
import { SignupForm } from './SignupForm'

export function SignupSection() {
  return (
    <section id="signup" className="relative bg-ink px-4 py-20 scroll-mt-20 sm:px-6 sm:py-28 lg:px-8">
      <FadeIn as="div" className="mx-auto grid max-w-content gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Get early access to Revere.
          </h2>
          <p className="mt-5 max-w-md text-lg text-periwinkle/80">
            Revere is currently in limited beta. Join the list for early access, product updates,
            and invitations as we expand access.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <SignupForm />
        </div>
      </FadeIn>
    </section>
  )
}
