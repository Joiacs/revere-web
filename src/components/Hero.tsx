import { FadeIn } from './FadeIn'
import { DiagonalStripes, RadiatingBurst } from './Motifs'

const AUDIENCES = [
  'nonprofits',
  'campaigns',
  'unions',
  'schools and universities',
  'foundations',
  'businesses',
  'legal advocates',
  'journalists',
  'and more',
]

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-ink pt-32 pb-20 sm:pt-40 sm:pb-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 55% at 50% 0%, rgba(117,50,228,0.35) 0%, rgba(15,5,36,0) 70%)',
        }}
      />
      <DiagonalStripes className="opacity-40" />
      <RadiatingBurst className="absolute right-6 top-24 hidden text-lavender-sky/30 sm:block md:right-16" />

      <FadeIn as="div" className="relative mx-auto max-w-content px-4 text-center sm:px-6 lg:px-8">
        <h1 className="mx-auto max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl">
          Security and resilience, built for organizations doing important work.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-periwinkle/90 sm:text-xl">
          The AI-powered operational security and resilience layer for anyone who needs it.
        </p>

        <ul
          role="list"
          className="mx-auto mt-10 flex max-w-2xl flex-wrap justify-center gap-x-2 gap-y-1.5 text-sm text-periwinkle/70 sm:text-base"
        >
          {AUDIENCES.map((item, i) => (
            <li key={item} className="flex items-center gap-2 whitespace-nowrap">
              <span>{item}</span>
              {i < AUDIENCES.length - 1 && (
                <span aria-hidden="true" className="text-periwinkle/35">
                  &middot;
                </span>
              )}
            </li>
          ))}
        </ul>
      </FadeIn>
    </section>
  )
}
