export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-royal-iris/95 backdrop-blur-sm border-b border-white/10">
      <div className="mx-auto flex max-w-content items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center" aria-label="Revere home">
          {/* TODO: replace with a transparent SVG lockup once the design
              agency delivers one. This raster PNG bakes in the Royal Iris
              background, so it must only ever sit on a #2e0585 surface. */}
          <img
            src="/logo/revere-lockup.png"
            alt="Revere"
            width={900}
            height={290}
            className="h-9 w-auto sm:h-[42px]"
          />
        </a>

        <nav aria-label="Primary" className="flex items-center gap-4 sm:gap-8">
          <a
            href="#what-is-revere"
            className="text-sm text-periwinkle/90 hover:text-white transition-colors sm:text-base"
          >
            What is Revere?
          </a>
          <a
            href="#signup"
            className="rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-medium text-white hover:bg-white/20 transition-colors sm:px-4 sm:py-2 sm:text-base"
          >
            Join the Beta
          </a>
        </nav>
      </div>
    </header>
  )
}
