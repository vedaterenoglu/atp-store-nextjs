/**
 * SliderSlide - Individual slide component for carousel
 * SOLID Principles: SRP - Single responsibility for slide content
 * Design Patterns: Molecular Component Pattern
 * Dependencies: React, Next.js Image, campaign atoms
 */

'use client'

import Image from 'next/image'
import { DiscountBadge } from '../atoms'
import { SliderOverlay } from './SliderOverlay'
import type { CampaignProduct } from '@/types/campaign'

interface SliderSlideProps {
  product: CampaignProduct
  onClick?: () => void
  className?: string
}

export function SliderSlide({
  product,
  onClick,
  className = '',
}: SliderSlideProps) {
  const hasDiscount = product.campaign_price <= product.stock_price

  return (
    <div
      className={`relative w-full h-full cursor-pointer ${className}`}
      onClick={onClick}
    >
      {/* Product Image */}
      <div className="relative w-full h-full">
        <Image
          src={product.stock_image_link}
          alt={product.stock_name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          priority
        />
      </div>

      {/* Discount Badge */}
      {hasDiscount && (
        <DiscountBadge
          originalPrice={product.stock_price}
          discountedPrice={product.campaign_price}
        />
      )}

      {/* Overlay with Product Info */}
      <SliderOverlay
        stock_name={product.stock_name}
        stock_unit={product.stock_unit}
        stock_price={product.stock_price}
        campaign_price={product.campaign_price}
      />
    </div>
  )
}
