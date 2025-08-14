/**
 * Order Lines Mobile View Component
 * SOLID Principles: SRP - Single responsibility for mobile order lines display
 * Design Patterns: Container Component Pattern, Mobile-First Design
 * Dependencies: React, OrderLineCard component
 */

'use client'

import { OrderLineCard } from '../atoms/OrderLineCard'
import type { OrderLineInput } from '@/services/order.service'
import { cn } from '@/lib/utils'

interface OrderLinesMobileViewProps {
  orderLines: OrderLineInput[]
  className?: string
}

/**
 * Displays order lines in a mobile-optimized card layout
 * Stacks OrderLineCard components vertically with proper spacing
 * @param props - Component props
 * @returns Rendered mobile view of order lines
 */
export function OrderLinesMobileView({
  orderLines,
  className,
}: OrderLinesMobileViewProps) {
  if (!orderLines || orderLines.length === 0) {
    return (
      <div className={cn('py-8 text-center text-muted-foreground', className)}>
        <p className="text-sm">No order items found</p>
      </div>
    )
  }

  return (
    <div className={cn('space-y-3', className)}>
      {/* Header for mobile view */}
      <div className="px-2 pb-2">
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
          Order Items ({orderLines.length})
        </p>
      </div>

      {/* Order line cards */}
      <div className="space-y-3">
        {orderLines.map((orderLine, index) => (
          <OrderLineCard
            key={`${orderLine.stockId}-${index}`}
            orderLine={orderLine}
          />
        ))}
      </div>

      {/* Summary info */}
      <div className="pt-3 px-2 border-t">
        <p className="text-xs text-muted-foreground">
          Total items: {orderLines.length} | Total quantity:{' '}
          {orderLines.reduce((sum, line) => sum + line.quantity, 0)} pcs
        </p>
      </div>
    </div>
  )
}

/**
 * Loading state for mobile view
 * Shows skeleton cards while data is loading
 * @param props - Component props
 * @returns Rendered loading state
 */
export function OrderLinesMobileViewSkeleton({
  className,
}: {
  className?: string
}) {
  return (
    <div className={cn('space-y-3', className)}>
      {/* Header skeleton */}
      <div className="px-2 pb-2">
        <div className="h-3 w-24 bg-muted rounded animate-pulse" />
      </div>

      {/* Skeleton cards */}
      <div className="space-y-3">
        {[1, 2, 3].map(i => (
          <div
            key={i}
            className="rounded-lg border bg-card p-4 space-y-3 animate-pulse"
          >
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-3 bg-muted rounded w-1/2" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="h-3 bg-muted rounded" />
              <div className="h-3 bg-muted rounded" />
              <div className="h-3 bg-muted rounded" />
              <div className="h-3 bg-muted rounded" />
            </div>
            <div className="pt-3 border-t">
              <div className="flex justify-between">
                <div className="h-4 bg-muted rounded w-1/4" />
                <div className="h-5 bg-muted rounded w-1/3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Error state for mobile view
 * Shows error message when order lines fail to load
 * @param props - Component props with error message
 * @returns Rendered error state
 */
export function OrderLinesMobileViewError({
  error,
  className,
}: {
  error?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'rounded-lg border border-destructive/20 bg-destructive/5 p-6 text-center',
        className
      )}
    >
      <p className="text-sm text-destructive font-medium">
        {error || 'Failed to load order items'}
      </p>
      <p className="text-xs text-destructive/80 mt-1">
        Please try refreshing the page
      </p>
    </div>
  )
}
