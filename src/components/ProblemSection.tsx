import { FadeIn } from './FadeIn'
import { VerticalStripes } from './Motifs'

export function ProblemSection() {
  return (
    <section
      id="what-is-revere"
      className="relative overflow-hidden bg-royal-iris px-4 py-20 scroll-mt-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <VerticalStripes className="opacity-[0.06]" />
      <FadeIn as="div" className="relative mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Security shouldn&rsquo;t require a security department.
        </h2>
        <p className="mt-6 text-lg text-periwinkle/85">
          Most organizations know they should be doing more to protect their people,
          information, operations, and infrastructure. But figuring out what matters, what to do
          first, and how to implement it can require expertise, time, and resources they don&rsquo;t
          have.
        </p>
        <p className="mt-6 text-lg font-medium text-white">
          Revere puts security and resilience expertise within reach of every organization.
        </p>
      </FadeIn>
    </section>
  )
}
