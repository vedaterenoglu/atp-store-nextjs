/**
 * CampaignProductCard - Complete campaign product card component
 * SOLID Principles: SRP - Orchestrates campaign product display
 * Design Patterns: Organism Component Pattern, Composition
 * Dependencies: React, shadcn/ui Card, atoms, molecules
 */

'use client'

import { Card, CardContent, CardFooter } from '@/components/ui/schadcn/card'
import { DiscountBadge } from '../atoms'
import {
  PriceDisplay,
  ProductImage,
  ProductInfo,
  CardActions,
} from '../molecules'
import type { CampaignProduct } from '@/types/campaign'

interface CampaignProductCardProps {
  product: CampaignProduct
  onAddToCart?: (stockId: string, quantity: number) => void
  className?: string
}

export function CampaignProductCard({
  product,
  onAddToCart,
  className = '',
}: CampaignProductCardProps) {
  const hasDiscount = product.campaign_price <= product.stock_price

  return (
    <Card
      className={`relative overflow-hidden transition-shadow hover:shadow-lg ${className}`}
    >
      {/* Discount Badge */}
      {hasDiscount && (
        <DiscountBadge
          originalPrice={product.stock_price}
          discountedPrice={product.campaign_price}
        />
      )}

      {/* Product Image */}
      <div className="relative aspect-[3/2] bg-secondary/10">
        <ProductImage src={product.stock_image_link} alt={product.stock_name} />
      </div>

      <CardContent className="p-4 space-y-4">
        {/* Product Info */}
        <ProductInfo
          stock_name={product.stock_name}
          stock_group={product.stock_group}
          stock_id={product.stock_id}
          stock_unit={product.stock_unit}
        />

        {/* Price Display */}
        <PriceDisplay
          stock_price={product.stock_price}
          campaign_price={product.campaign_price}
        />
      </CardContent>

      <CardFooter className="p-4 pt-0">
        {/* Action Button */}
        <CardActions
          stockId={product.stock_id}
          disabled={false}
          {...(onAddToCart && { onAddToCart })}
          className="w-full"
        />
      </CardFooter>
    </Card>
  )
}
