/**
 * Price display atom component
 * SOLID Principles: SRP - Single responsibility for formatting and displaying prices
 * Design Patterns: Presentational Component Pattern
 * Dependencies: React, clsx
 */

'use client'

import { clsx } from 'clsx'

interface PriceDisplayProps {
  amount: number
  currency?: string
  showCurrency?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  strikethrough?: boolean
  originalAmount?: number
}

export function PriceDisplay({
  amount,
  currency = 'SEK',
  showCurrency = true,
  size = 'md',
  className,
  strikethrough = false,
  originalAmount,
}: PriceDisplayProps) {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  }

  // Convert from öre to SEK and format price with proper locale
  const formatPrice = (value: number) => {
    // Convert öre to SEK (divide by 100)
    const sekValue = value / 100

    const formatted = new Intl.NumberFormat('sv-SE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(sekValue)

    return showCurrency ? `${formatted} ${currency}` : formatted
  }

  return (
    <div className={clsx('inline-flex items-baseline gap-2', className)}>
      {originalAmount !== undefined && originalAmount !== amount && (
        <span
          className={clsx(
            'line-through text-muted-foreground',
            sizeClasses[size]
          )}
        >
          {formatPrice(originalAmount)}
        </span>
      )}
      <span
        className={clsx(
          sizeClasses[size],
          strikethrough && 'line-through text-muted-foreground',
          'font-medium'
        )}
      >
        {formatPrice(amount)}
      </span>
    </div>
  )
}
