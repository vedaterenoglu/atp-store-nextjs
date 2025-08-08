/**
 * DiscountBadge - Displays discount percentage on campaign products
 * SOLID Principles: SRP - Single responsibility for discount display
 * Design Patterns: Atomic Component Pattern
 * Dependencies: React, price service
 */

import { calculateDiscountPercentage } from '@/services/price.service'

interface DiscountBadgeProps {
  originalPrice: number // Price in öre
  discountedPrice: number // Discounted price in öre
  className?: string
}

export function DiscountBadge({
  originalPrice,
  discountedPrice,
  className = '',
}: DiscountBadgeProps) {
  const percentage = calculateDiscountPercentage(originalPrice, discountedPrice)

  // Don't render if no discount
  if (percentage === 0) return null

  return (
    <div
      className={`absolute top-3 right-3 z-10 font-bold text-xl w-20 h-20 rounded-full bg-red-500/50 text-white flex items-center justify-center ${className}`}
    >
      -{percentage}%
    </div>
  )
}
