/**
 * Price Display Atom Component
 * SOLID Principles: SRP - Single responsibility for price display
 * Design Patterns: Presentation Component Pattern
 * Dependencies: React, types, utilities
 */

'use client'

import { cn } from '@/lib/utils'
import { formatPrice, formatTablePrice } from '../utils/order-formatters'
import type { PriceDisplayProps } from '../types/order-confirmation.types'

/**
 * Size-specific styling classes
 */
const sizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg font-semibold',
}

/**
 * Displays a formatted price with configurable size and currency
 * @param props - Component props
 * @returns Rendered price display
 */
export function PriceDisplay({
  amount,
  currency = 'kr',
  className,
  size = 'md',
  showCurrency = true,
}: PriceDisplayProps) {
  // Format the price
  const formattedPrice = showCurrency
    ? formatPrice(amount, currency)
    : formatTablePrice(amount)

  return (
    <span className={cn(sizeClasses[size], 'tabular-nums', className)}>
      {formattedPrice}
    </span>
  )
}

/**
 * Inline price display for compact layouts
 * @param props - Component props
 * @returns Rendered inline price
 */
export function PriceDisplayInline({
  amount,
  currency = 'kr',
  className,
}: Omit<PriceDisplayProps, 'size' | 'showCurrency'>) {
  return (
    <span className={cn('text-sm tabular-nums', className)}>
      {formatPrice(amount, currency)}
    </span>
  )
}

/**
 * Price display with label
 * @param props - Component props with label
 * @returns Rendered price with label
 */
export function PriceDisplayWithLabel({
  label,
  amount,
  currency = 'kr',
  size = 'md',
  className,
}: PriceDisplayProps & { label: string }) {
  return (
    <div className={cn('flex items-baseline justify-between', className)}>
      <span className={cn('text-muted-foreground', sizeClasses[size])}>
        {label}:
      </span>
      <PriceDisplay
        amount={amount}
        currency={currency}
        size={size}
        showCurrency
      />
    </div>
  )
}

/**
 * Total price display with emphasis
 * @param props - Component props
 * @returns Rendered total price
 */
export function TotalPriceDisplay({
  amount,
  currency = 'kr',
  className,
}: Omit<PriceDisplayProps, 'size' | 'showCurrency'>) {
  return (
    <div className={cn('text-right', className)}>
      <p className="text-sm text-muted-foreground">Total</p>
      <p className="text-2xl font-bold tabular-nums">
        {formatPrice(amount, currency)}
      </p>
    </div>
  )
}
