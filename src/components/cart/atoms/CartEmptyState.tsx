/**
 * Cart empty state atom component
 * SOLID Principles: SRP - Single responsibility for displaying empty cart state
 * Design Patterns: Presentational Component Pattern
 * Dependencies: React, lucide-react, i18n
 */

'use client'

import { ShoppingCart } from 'lucide-react'
import { clsx } from 'clsx'
import { useSafeTranslation } from '@/hooks/use-safe-translation'

interface CartEmptyStateProps {
  title?: string
  description?: string
  icon?: React.ReactNode
  action?: React.ReactNode
  className?: string
}

export function CartEmptyState({
  title,
  description,
  icon,
  action,
  className,
}: CartEmptyStateProps) {
  const { t } = useSafeTranslation('cart')

  // Use provided values or fallback to translations
  const displayTitle = title || t('emptyState.noCartsFound')
  const displayDescription = description || t('emptyState.noCartsMatching')
  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center py-12 px-4 text-center',
        className
      )}
    >
      <div className="mb-4 text-muted-foreground">
        {icon || <ShoppingCart className="h-12 w-12" />}
      </div>
      <h3 className="mb-2 text-lg font-semibold">{displayTitle}</h3>
      <p className="mb-4 text-sm text-muted-foreground max-w-sm">
        {displayDescription}
      </p>
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}
