export function Footer() {
  return (
    <footer className="bg-royal-iris px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-content flex-col items-center gap-4 text-center">
        {/* TODO: replace with a transparent SVG lockup once the design
            agency delivers one — this raster PNG only works on #2e0585. */}
        <img
          src="/logo/revere-lockup.png"
          alt="Revere"
          width={900}
          height={290}
          className="h-6 w-auto opacity-90"
        />
        <p className="text-sm text-periwinkle/80">&copy; 2026 Revere</p>
      </div>
    </footer>
  )
}
