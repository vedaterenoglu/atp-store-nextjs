/**
 * CardActions - Action buttons with quantity counter for campaign product card
 * SOLID Principles: SRP - Single responsibility for card actions
 * Design Patterns: Molecular Component Pattern
 * Dependencies: React, shadcn/ui Button, QuantityCounter, i18n
 */

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/schadcn/button'
import { ShoppingCart } from 'lucide-react'
import { QuantityCounter } from '../atoms'
import { useTranslation } from 'react-i18next'
import type { CampaignProduct } from '@/types/campaign'

interface CardActionsProps {
  product: CampaignProduct
  disabled?: boolean
  onAddToCart?: (product: CampaignProduct, quantity: number) => void
  className?: string
}

export function CardActions({
  product,
  disabled = false,
  onAddToCart,
  className = '',
}: CardActionsProps) {
  const { t } = useTranslation('campaign')
  const [quantity, setQuantity] = useState(0)

  const handleDecrease = () => {
    if (quantity > 0) setQuantity(quantity - 1)
  }

  const handleIncrease = () => {
    setQuantity(quantity + 1)
  }

  const handleAddToCart = () => {
    if (onAddToCart && quantity > 0) {
      onAddToCart(product, quantity)
      // Reset quantity after adding to cart
      setQuantity(0)
    }
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <QuantityCounter
        quantity={quantity}
        onDecrease={handleDecrease}
        onIncrease={handleIncrease}
        disabled={disabled}
      />
      <Button
        variant="default"
        size="default"
        className="w-full"
        onClick={handleAddToCart}
        disabled={disabled || quantity === 0}
      >
        <ShoppingCart className="h-4 w-4 mr-2" />
        {t('card.addToCart')}
      </Button>
    </div>
  )
}
