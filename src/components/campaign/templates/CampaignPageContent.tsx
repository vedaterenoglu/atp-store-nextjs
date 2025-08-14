/**
 * Campaign Page Content - Client component for campaign page
 * SOLID Principles: SRP - Manages campaign page content display
 * Design Patterns: Presentation Component Pattern
 * Dependencies: React, Campaign components
 */

'use client'

import { useState } from 'react'
import { CampaignProductsGrid } from '@/components/campaign/organisms'
import type { CampaignProduct } from '@/types/campaign'
import { toast } from '@/lib/utils/toast'
import { Button } from '@/components/ui/schadcn'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useCartStore } from '@/lib/stores/cart.store'

interface CampaignPageContentProps {
  products: CampaignProduct[]
}

export function CampaignPageContent({ products }: CampaignPageContentProps) {
  const { t } = useTranslation('campaign')
  const [error] = useState<Error | null>(null)
  const addToCart = useCartStore(state => state.addToCart)

  const handleAddToCart = (product: CampaignProduct, quantity: number) => {
    try {
      // Add to cart using campaign price
      addToCart(
        product.stock_id,
        product.stock_name,
        product.campaign_price, // Use campaign price instead of stock price
        quantity,
        product.stock_image_link,
        product.stock_group,
        product.stock_unit,
        99 // max quantity
      )

      const message =
        quantity > 1
          ? t('messages.addedToCartPlural', { count: quantity })
          : t('messages.addedToCart', { count: quantity })
      toast.success(message)
    } catch (error) {
      toast.error(t('errors.somethingWentWrong'))
      console.error('Error adding to cart:', error)
    }
  }

  const handleRetry = () => {
    // In server component version, we can't retry
    // Just refresh the page
    window.location.reload()
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Top Navigation Button */}
      <div className="flex justify-end mb-6">
        <Button
          size="lg"
          className="bg-green-600 hover:bg-green-700 text-white border-green-600 hover:border-green-700 gap-2"
          asChild
        >
          <Link href="/products">
            {t('page.goToAllProducts')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Campaign Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{t('page.title')}</h1>
        <p className="text-muted-foreground">{t('page.description')}</p>
      </div>

      {/* Campaign Products Grid */}
      <CampaignProductsGrid
        products={products}
        isLoading={false}
        error={error}
        onAddToCart={handleAddToCart}
        onRetry={handleRetry}
        skeletonCount={6}
      />
    </main>
  )
}
