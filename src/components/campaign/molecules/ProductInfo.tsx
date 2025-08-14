/**
 * ProductInfo - Displays product details
 * SOLID Principles: SRP - Single responsibility for product info display
 * Design Patterns: Molecular Component Pattern
 * Dependencies: React, i18next
 */

'use client'

import { useSafeTranslation } from '@/hooks/use-safe-translation'

interface ProductInfoProps {
  stock_name: string
  stock_group: string
  stock_id: string
  stock_unit: string
  className?: string
}

export function ProductInfo({
  stock_name,
  stock_group,
  stock_id,
  stock_unit,
  className = '',
}: ProductInfoProps) {
  const { t } = useSafeTranslation('campaign')

  return (
    <div className={`space-y-2 ${className}`}>
      <h3 className="font-semibold line-clamp-2 text-base">{stock_name}</h3>
      <div className="space-y-1">
        <p className="text-xs text-muted-foreground">
          <span className="font-medium">{t('productInfo.category')}:</span>{' '}
          {stock_group}
        </p>
        <p className="text-xs text-muted-foreground">
          <span className="font-medium">{t('productInfo.id')}:</span> {stock_id}
        </p>
        <p className="text-xs text-muted-foreground">
          <span className="font-medium">{t('productInfo.unit')}:</span>{' '}
          {stock_unit}
        </p>
      </div>
    </div>
  )
}
