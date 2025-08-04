/**
 * PriceTag Atom Component
 * SOLID Principles: Single Responsibility - Displays formatted price
 * Design Patterns: Presentational Component Pattern
 * Dependencies: shadcn Badge component
 */

import { cn } from '@/components/ui/utils'

interface PriceTagProps {
  price: number
  className?: string
}

export function PriceTag({ price, className }: PriceTagProps) {
  const formattedPrice = new Intl.NumberFormat('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price)

  return (
    <div
      className={cn(
        'absolute right-3 top-3 z-10 rounded-full bg-white/95 px-3 py-1.5',
        'text-sm font-semibold text-gray-900',
        'shadow-md backdrop-blur-sm',
        className
      )}
    >
      ${formattedPrice}
    </div>
  )
}
