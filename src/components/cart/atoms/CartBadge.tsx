/**
 * Cart badge atom component
 * SOLID Principles: SRP - Single responsibility for displaying cart count badge
 * Design Patterns: Presentational Component Pattern
 * Dependencies: React, clsx
 */

'use client'

import { clsx } from 'clsx'

interface CartBadgeProps {
  count: number
  variant?: 'default' | 'primary' | 'secondary' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  showZero?: boolean
}

export function CartBadge({
  count,
  variant = 'default',
  size = 'md',
  className,
  showZero = false,
}: CartBadgeProps) {
  // Don't render if count is 0 and showZero is false
  if (count === 0 && !showZero) {
    return null
  }

  const sizeClasses = {
    sm: 'h-4 min-w-[1rem] text-[10px] px-1',
    md: 'h-5 min-w-[1.25rem] text-xs px-1.5',
    lg: 'h-6 min-w-[1.5rem] text-sm px-2',
  }

  const variantClasses = {
    default: 'bg-muted text-muted-foreground',
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    destructive: 'bg-destructive text-destructive-foreground',
  }

  // Format count display
  const displayCount = count > 99 ? '99+' : count.toString()

  return (
    <span
      className={clsx(
        'inline-flex items-center justify-center rounded-full font-medium',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      aria-label={`Cart contains ${count} items`}
    >
      {displayCount}
    </span>
  )
}
