/**
 * PageTitle Atom Component
 * SOLID Principles: Single Responsibility - Displays page title
 * Design Patterns: Presentational Component Pattern
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
        'text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl',
        className
      )}
    >
      {children}
    </h1>
  )
}
