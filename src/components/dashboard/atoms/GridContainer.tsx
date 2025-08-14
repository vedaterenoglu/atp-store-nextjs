/**
 * @file GridContainer.tsx
 * @role Responsive grid container for dashboard cards
 * @patterns Atomic Design, Responsive Design
 * @solid SRP - Single responsibility for grid layout
 * @tests /src/components/dashboard/atoms/__tests__/GridContainer.test.tsx
 */

import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface GridContainerProps {
  children: ReactNode
  className?: string
}

/**
 * GridContainer - Responsive grid layout for dashboard cards
 * Implements 3-2-1 column pattern for desktop-tablet-mobile
 */
export function GridContainer({ children, className }: GridContainerProps) {
  return (
    <div
      className={cn(
        'grid gap-4',
        'grid-cols-1', // Mobile: 1 column
        'sm:grid-cols-2', // Tablet: 2 columns
        'lg:grid-cols-3', // Desktop: 3 columns
        'auto-rows-fr', // Equal height rows
        className
      )}
    >
      {children}
    </div>
  )
}
