/**
 * Order Summary Presentation Component
 * SOLID Principles: SRP - Single responsibility for order summary display
 * Design Patterns: Composite Component Pattern
 * Dependencies: React, atoms, utilities, types
 */

'use client'

import { Card, CardContent } from '@/components/ui/schadcn/card'
import { Separator } from '@/components/ui/schadcn/separator'
import { PriceDisplayWithLabel, TotalPriceDisplay } from '../atoms/PriceDisplay'
import { formatOrderStats, formatExchangeInfo } from '../utils/order-formatters'
import { formatPrice } from '@/lib/utils/price'
import type { OrderSummaryProps } from '../types/order-confirmation.types'

/**
 * Displays order summary with totals and statistics
 * @param props - Component props
 * @returns Rendered order summary
 */
export function OrderSummary({
  orderSummary,
  orderMetadata,
}: OrderSummaryProps) {
  // Format order statistics
  const stats = formatOrderStats(
    orderMetadata.totalItems,
    orderMetadata.totalQuantity
  )

  // Format exchange rate info
  const exchangeInfo = formatExchangeInfo(
    orderMetadata.exchangeRate,
    orderMetadata.exchangeUnit
  )

  return (
    <Card>
      <CardContent className="space-y-4 p-6">
        {/* Order Statistics */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">
            Order Statistics
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Items</p>
              <p className="font-medium">{stats.items}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Quantity</p>
              <p className="font-medium">{stats.quantity}</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Price Breakdown */}
        <div className="space-y-3">
          <PriceDisplayWithLabel
            label="Subtotal"
            amount={orderSummary.subtotal}
            currency={orderMetadata.exchangeUnit}
            size="sm"
          />
          <PriceDisplayWithLabel
            label="VAT Total"
            amount={orderSummary.vatTotal}
            currency={orderMetadata.exchangeUnit}
            size="sm"
          />
        </div>

        <Separator />

        {/* Grand Total */}
        <TotalPriceDisplay
          amount={orderSummary.total}
          currency={orderMetadata.exchangeUnit}
        />

        {/* Exchange Rate Info */}
        {orderMetadata.exchangeRate !== 1 && (
          <>
            <Separator />
            <div className="text-xs text-muted-foreground">
              Exchange Rate: {exchangeInfo}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

/**
 * Compact summary for smaller displays
 * @param props - Component props
 * @returns Rendered compact summary
 */
export function OrderSummaryCompact({ orderSummary }: OrderSummaryProps) {
  return (
    <div className="space-y-2 rounded-lg bg-muted/50 p-4">
      <div className="flex items-center justify-between text-sm">
        <span>Subtotal</span>
        <span className="font-medium tabular-nums">
          {formatPrice(orderSummary.subtotal)}
        </span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span>VAT</span>
        <span className="font-medium tabular-nums">
          {formatPrice(orderSummary.vatTotal)}
        </span>
      </div>
      <Separator />
      <div className="flex items-center justify-between">
        <span className="font-medium">Total</span>
        <span className="text-lg font-bold tabular-nums">
          {formatPrice(orderSummary.total)}
        </span>
      </div>
    </div>
  )
}
