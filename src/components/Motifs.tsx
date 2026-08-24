/**
 * Brand "Design Elements" motifs, redrawn in pure CSS / inline SVG per the
 * brand guide's Design Elements page: radiating forms, structured diagonal
 * line compositions, and repeating vertical striping. Used sparingly, at
 * low opacity, as texture behind content — never competing with it.
 */

interface MotifProps {
  className?: string
}

/** Repeating angled strips over a field — section backdrop texture. */
export function DiagonalStripes({ className = '' }: MotifProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{
        backgroundImage:
          'repeating-linear-gradient(45deg, rgba(211,161,255,0.16) 0px, rgba(211,161,255,0.16) 2px, transparent 2px, transparent 26px)',
      }}
    />
  )
}

/** Repeating vertical bars — texture on dark panels. */
export function VerticalStripes({ className = '' }: MotifProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{
        backgroundImage:
          'repeating-linear-gradient(90deg, rgba(211,161,255,0.14) 0px, rgba(211,161,255,0.14) 3px, transparent 3px, transparent 18px)',
      }}
    />
  )
}

/** The tapered-ray burst from the logomark, as a standalone section marker. */
export function RadiatingBurst({ className = '' }: { className?: string }) {
  const rays = [
    { rotate: 0, length: 34, width: 7 },
    { rotate: 45, length: 30, width: 6.5 },
    { rotate: 90, length: 26, width: 6 },
    { rotate: 135, length: 30, width: 6.5 },
    { rotate: 180, length: 34, width: 7 },
    { rotate: 225, length: 30, width: 6.5 },
    { rotate: 270, length: 26, width: 6 },
    { rotate: 315, length: 30, width: 6.5 },
  ]
  return (
    <svg
      aria-hidden="true"
      viewBox="-50 -50 100 100"
      className={className}
      width="56"
      height="56"
    >
      {rays.map((r, i) => (
        <polygon
          key={i}
          points={`-${r.width / 2},-14 ${r.width / 2},-14 0,-${14 + r.length}`}
          transform={`rotate(${r.rotate})`}
          fill="currentColor"
        />
      ))}
    </svg>
  )
}
