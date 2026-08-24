/**
 * Single-weight outline icons redrawn from the brand guide's Iconography
 * page (2.11) — Security (shield + check), Insight (magnifying glass), and
 * Human (nested fingerprint arcs), the three icons the guide's own
 * three-column mockups pair with "risk / systems / help" messaging.
 */

interface IconProps {
  className?: string
}

const shared = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function SecurityIcon({ className = '' }: IconProps) {
  return (
    <svg {...shared} className={className} aria-hidden="true">
      <path d="M5 3.5H19V10C19 15.4 15.9 18.9 12 20.8C8.1 18.9 5 15.4 5 10V3.5Z" />
      <path d="M8.2 11.2 11 14 15.8 8.8" />
    </svg>
  )
}

export function InsightIcon({ className = '' }: IconProps) {
  return (
    <svg {...shared} className={className} aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M19.5 19.5 15.4 15.4" />
    </svg>
  )
}

/** Nested fingerprint arcs, matching the guide's "Human" glyph. */
export function HumanIcon({ className = '' }: IconProps) {
  return (
    <svg {...shared} className={className} aria-hidden="true">
      <path d="M9.18 14.53 A3 3 0 1 1 14.82 14.53" />
      <path d="M7.3 15.21 A5 5 0 1 1 16.7 15.21" />
      <path d="M5.42 15.89 A7 7 0 1 1 18.58 15.89" />
    </svg>
  )
}
