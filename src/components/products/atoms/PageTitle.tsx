/**
 * PageTitle Atom Component
 * SOLID Principles: Single Responsibility - Display page title
 * Design Patterns: Presentation Component
 * Dependencies: None
 */

import { cn } from '@/lib/utils'

interface PageTitleProps {
  children: React.ReactNode
  className?: string
}

export function PageTitle({ children, className }: PageTitleProps) {
  return (
    <h1
      className={cn(
        'text-3xl font-bold tracking-tight text-foreground sm:text-4xl',
        className
      )}
    >
      {children}
    </h1>
  )
}
