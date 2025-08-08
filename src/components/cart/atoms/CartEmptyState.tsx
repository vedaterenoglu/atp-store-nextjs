/**
 * Cart empty state atom component
 * SOLID Principles: SRP - Single responsibility for displaying empty cart state
 * Design Patterns: Presentational Component Pattern
 * Dependencies: React, lucide-react
 */

'use client'

import { ShoppingCart } from 'lucide-react'
import { clsx } from 'clsx'

interface CartEmptyStateProps {
  title?: string
  description?: string
  icon?: React.ReactNode
  action?: React.ReactNode
  className?: string
}

export function CartEmptyState({
  title = 'No carts found',
  description = 'There are no carts matching your criteria',
  icon,
  action,
  className,
}: CartEmptyStateProps) {
  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center py-12 px-4 text-center',
        className
      )}
    >
      <div className="mb-4 text-muted-foreground">
        {icon || <ShoppingCart className="h-12 w-12" />}
      </div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="mb-4 text-sm text-muted-foreground max-w-sm">
        {description}
      </p>
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}
