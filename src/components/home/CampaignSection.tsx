/**
 * Campaign Section Component - Client component for campaign display
 * SOLID Principles: SRP - Manages campaign section display
 * Design Patterns: Presentation Component Pattern
 * Dependencies: React, Campaign components
 */

'use client'

import { CampaignSlider } from '@/components/campaign/organisms'
import type { CampaignProduct } from '@/types/campaign'
import { Button } from '@/components/ui/schadcn'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { toast } from '@/lib/utils/toast'

interface CampaignSectionProps {
  products: CampaignProduct[]
}

export function CampaignSection({ products }: CampaignSectionProps) {
  const { t } = useTranslation('common')
  const { t: tCampaign } = useTranslation('campaign')

  const handleProductClick = (product: CampaignProduct) => {
    toast.info(
      tCampaign('messages.viewingDetails', { product: product.stock_name })
    )
    // TODO: Navigate to product detail page
    // router.push(`/products/${product.stock_id}`)
  }

  // Don't render anything if no products
  if (products.length === 0) {
    return null
  }

  return (
    <>
      {/* Campaign Slider - Top of the page */}
      <div className="w-full mt-12">
        <CampaignSlider
          products={products}
          autoPlay={true}
          autoPlayInterval={1500}
          onProductClick={handleProductClick}
        />
      </div>

      {/* Campaign Page Button */}
      <div className="flex justify-center mt-8 mb-2">
        <Button
          size="lg"
          className="bg-green-600 hover:bg-green-700 text-white border-green-600 hover:border-green-700 gap-2"
          asChild
        >
          <Link href="/campaign">
            {t('home.hero.goToCampaignPage')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </>
  )
}
