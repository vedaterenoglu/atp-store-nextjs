/**
 * PriceTag - Displays formatted price in SEK currency
 *
 * Features:
 * - Converts price from öre to SEK (divides by 100)
 * - Shows 2 decimal places
 * - Positioned absolutely in top-right corner
 *
 * Props: price in öre (number)
 * State: None (pure presentation component)
 */

'use client'

import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

interface PriceTagProps {
  price: number
  className?: string
}

export function PriceTag({ price, className }: PriceTagProps) {
  const { t } = useTranslation('products')
  // Convert from öre to SEK and format with 2 decimal places
  const formattedPrice = (price / 100).toFixed(2)

  return (
    <div
      className={cn(
        'absolute right-2 top-2 z-10',
        'rounded-md bg-green-500 px-2 py-1',
        'text-sm font-semibold text-white',
        'shadow-sm',
        className
      )}
    >
      {formattedPrice} {t('productCard.currency')}
    </div>
  )
}
