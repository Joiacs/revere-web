import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/**
 * Short fade-and-rise on scroll entry. Fires once, respects
 * prefers-reduced-motion by rendering fully visible with no animation class.
 */
export function useFadeInOnScroll<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [visible, setVisible] = useState(false)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (reducedMotion) {
      setVisible(true)
      return
    }
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [reducedMotion])

  const className = reducedMotion
    ? 'opacity-100'
    : visible
      ? 'animate-fade-rise'
      : 'opacity-0'

  return { ref, className }
}
