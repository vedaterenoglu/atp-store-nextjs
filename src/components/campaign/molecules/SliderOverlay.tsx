/**
 * SliderOverlay - Overlay content for slider items
 * SOLID Principles: SRP - Single responsibility for slide overlay display
 * Design Patterns: Molecular Component Pattern
 * Dependencies: React, price service
 */

import { calculateDiscountPercentage } from '@/services/price.service'
import { cn } from '@/lib/utils'

interface SliderOverlayProps {
  stock_name: string
  stock_unit: string
  stock_price: number // in öre
  campaign_price: number // in öre
  className?: string
}

export function SliderOverlay({
  stock_name,
  stock_unit,
  stock_price,
  campaign_price,
  className = '',
}: SliderOverlayProps) {
  const originalPrice = stock_price / 100 // Convert to SEK
  const discountedPrice = campaign_price / 100 // Convert to SEK
  const discountPercentage = calculateDiscountPercentage(
    stock_price,
    campaign_price
  )
  const hasDiscount = discountPercentage > 0

  return (
    <div
      className={cn(
        'absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6 text-white',
        className
      )}
    >
      <div className="space-y-2">
        {/* Product Info */}
        <div>
          <h3 className="text-2xl font-bold">{stock_name}</h3>
          <p className="text-sm opacity-90">{stock_unit}</p>
        </div>

        {/* Price Display */}
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold">
            {discountedPrice.toFixed(2)} SEK
          </span>
          {hasDiscount && (
            <span className="text-xl line-through opacity-70">
              {originalPrice.toFixed(2)} SEK
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
