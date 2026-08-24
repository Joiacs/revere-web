import { FadeIn } from './FadeIn'
import { DiagonalStripes, RadiatingBurst } from './Motifs'

export function ClosingCta() {
  return (
    <section className="relative overflow-hidden bg-gradient-primary px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <DiagonalStripes className="opacity-20" />
      <RadiatingBurst className="absolute left-8 bottom-8 hidden text-white/20 sm:block" />

      <FadeIn as="div" className="relative mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Ready to learn more?
        </h2>
        <p className="mt-5 text-lg text-white/90">
          Revere is currently in limited beta. Join the list for early access and product
          updates. Early access opening October 2026.
        </p>
        <a
          href="#signup"
          className="mt-8 inline-block rounded-full bg-white px-8 py-3 text-base font-medium text-royal-iris transition-opacity hover:opacity-90"
        >
          Join the Beta
        </a>
      </FadeIn>
    </section>
  )
}
