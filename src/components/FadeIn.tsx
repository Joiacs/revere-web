import type { ElementType, ReactNode } from 'react'
import { useFadeInOnScroll } from '../hooks/useFadeInOnScroll'

interface FadeInProps {
  children: ReactNode
  as?: ElementType
  className?: string
}

export function FadeIn({ children, as: Tag = 'div', className = '' }: FadeInProps) {
  const { ref, className: motionClass } = useFadeInOnScroll<HTMLElement>()
  return (
    <Tag ref={ref} className={`${className} ${motionClass}`}>
      {children}
    </Tag>
  )
}
