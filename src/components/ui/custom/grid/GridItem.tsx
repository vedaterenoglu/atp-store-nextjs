/**
 * GridItem Component - Wrapper for grid items
 * SOLID Principles: Single Responsibility - Wraps grid items
 * Design Patterns: Wrapper Pattern - Provides consistent item behavior
 * Dependencies: None
 */

import React from 'react'
import { cn } from '@/lib/utils'

interface GridItemProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  role?: string
  'aria-label'?: string
}

export function GridItem({
  children,
  className,
  onClick,
  role,
  'aria-label': ariaLabel,
}: GridItemProps) {
  const Component = onClick ? 'button' : 'div'

  return (
    <Component
      className={cn(
        'transition-all duration-200',
        onClick &&
          'cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary',
        className
      )}
      onClick={onClick}
      role={role}
      aria-label={ariaLabel}
    >
      {children}
    </Component>
  )
}
