/**
 * CampaignProductsGrid - Grid layout for campaign products with error handling and loading states
 * SOLID Principles: SRP - Orchestrates grid display with proper states
 * Design Patterns: Organism Component Pattern, Container Pattern
 * Dependencies: React, campaign components, i18n
 */

'use client'

import { CampaignProductCard } from './CampaignProductCard'
import {
  CampaignCardSkeleton,
  CampaignErrorBoundary,
  CampaignGridError,
} from '../molecules'
import type { CampaignProduct } from '@/types/campaign'
import { useTranslation } from 'react-i18next'

interface CampaignProductsGridProps {
  products?: CampaignProduct[]
  isLoading?: boolean
  error?: Error | null
  onAddToCart?: (product: CampaignProduct, quantity: number) => void
  onRetry?: () => void
  skeletonCount?: number
  className?: string
}

export function CampaignProductsGrid({
  products = [],
  isLoading = false,
  error = null,
  onAddToCart,
  onRetry,
  skeletonCount = 6,
  className = '',
}: CampaignProductsGridProps) {
  const { t } = useTranslation('campaign')
  // Error state
  if (error && !isLoading) {
    return (
      <div className={`w-full ${className}`}>
        <CampaignGridError error={error} {...(onRetry && { onRetry })} />
      </div>
    )
  }

  // Loading state
  if (isLoading) {
    return (
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
      >
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <CampaignCardSkeleton key={`skeleton-${index}`} />
        ))}
      </div>
    )
  }

  // Empty state
  if (!products || products.length === 0) {
    return (
      <div className={`w-full ${className}`}>
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold mb-2">
            {t('messages.noCampaigns')}
          </h3>
          <p className="text-muted-foreground">{t('messages.checkBackSoon')}</p>
        </div>
      </div>
    )
  }

  // Products display with error boundary
  return (
    <CampaignErrorBoundary {...(onRetry && { onRetry })}>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
      >
        {products.map(product => (
          <CampaignProductCard
            key={product.stock_id}
            product={product}
            {...(onAddToCart && { onAddToCart })}
          />
        ))}
      </div>
    </CampaignErrorBoundary>
  )
}
