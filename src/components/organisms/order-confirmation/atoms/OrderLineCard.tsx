/**
 * Order Line Card Component for Mobile View
 * SOLID Principles: SRP - Single responsibility for mobile order line display
 * Design Patterns: Card Component Pattern
 * Dependencies: React, formatPrice utility, cn utility
 */

'use client'

import { cn } from '@/lib/utils'
import { formatPrice } from '@/lib/utils/price'
import type { OrderLineInput } from '@/services/order.service'

interface OrderLineCardProps {
  orderLine: OrderLineInput
  className?: string
}

/**
 * Displays a single order line in a mobile-friendly card format
 * @param props - Component props
 * @returns Rendered order line card
 */
export function OrderLineCard({ orderLine, className }: OrderLineCardProps) {
  // Calculate totals
  const vatAmount = Math.round(
    (orderLine.unitPrice * orderLine.vatPercent) / 100
  )
  const lineTotal =
    orderLine.unitPrice * orderLine.quantity + vatAmount * orderLine.quantity

  return (
    <div className={cn('rounded-lg border bg-card p-4 space-y-3', className)}>
      {/* Product Info Section */}
      <div className="space-y-1">
        <div className="flex flex-col space-y-1">
          <span className="text-sm font-medium text-foreground">
            {orderLine.lineInfo}
          </span>
          <span className="text-xs text-muted-foreground font-mono">
            ID: {orderLine.stockId}
          </span>
        </div>
      </div>

      {/* Price Details Grid */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        {/* Quantity */}
        <div className="flex justify-between">
          <span className="text-muted-foreground">Quantity:</span>
          <span className="font-medium">{orderLine.quantity} pcs</span>
        </div>

        {/* Unit Price */}
        <div className="flex justify-between">
          <span className="text-muted-foreground">Unit Price:</span>
          <span className="font-medium">
            {formatPrice(orderLine.unitPrice)}
          </span>
        </div>

        {/* VAT */}
        <div className="flex justify-between">
          <span className="text-muted-foreground">
            VAT ({orderLine.vatPercent}%):
          </span>
          <span className="font-medium">
            {formatPrice(vatAmount * orderLine.quantity)}
          </span>
        </div>

        {/* Subtotal */}
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal:</span>
          <span className="font-medium">
            {formatPrice(orderLine.unitPrice * orderLine.quantity)}
          </span>
        </div>
      </div>

      {/* Total Section */}
      <div className="pt-3 border-t">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-muted-foreground">
            Line Total
          </span>
          <span className="text-base font-semibold text-foreground">
            {formatPrice(lineTotal)}
          </span>
        </div>
      </div>
    </div>
  )
}

/**
 * Skeleton loader for OrderLineCard
 * @param props - Component props
 * @returns Rendered skeleton
 */
export function OrderLineCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'rounded-lg border bg-card p-4 space-y-3 animate-pulse',
        className
      )}
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
  )
}
