/**
 * CardActions - Action buttons with quantity counter for campaign product card
 * SOLID Principles: SRP - Single responsibility for card actions
 * Design Patterns: Molecular Component Pattern
 * Dependencies: React, shadcn/ui Button, QuantityCounter, i18n, secure auth, cart store
 */

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/schadcn/button'
import { ShoppingCart } from 'lucide-react'
import { QuantityCounter } from '../atoms'
import { useTranslation } from 'react-i18next'
import type { CampaignProduct } from '@/types/campaign'
import { useSecureAuth } from '@/hooks/use-secure-auth'
import { useCartStore } from '@/lib/stores/cart.store'
import { toast } from '@/lib/utils/toast'

interface CardActionsProps {
  product: CampaignProduct
  disabled?: boolean
  onAddToCart?: (product: CampaignProduct, quantity: number) => void
  className?: string
}

export function CardActions({
  product,
  onAddToCart,
  className = '',
}: CardActionsProps) {
  const { t } = useTranslation('campaign')
  const [quantity, setQuantity] = useState(0)
  const { auth, isAuthenticated } = useSecureAuth()
  const addToCart = useCartStore(state => state.addToCart)
  const cartItem = useCartStore(state => state.findCartItem(product.stock_id))
  const cartQuantity = isAuthenticated ? cartItem?.quantity || 0 : 0

  // Check if user can add to cart (same logic as ProductCard)
  const canAddToCart = () => auth.canAddToCart

  const handleDecrease = () => {
    // Check auth first
    if (!canAddToCart()) {
      if (!isAuthenticated) {
        toast.error(t('auth.notAuthenticated'))
      } else if (!auth.activeCustomerId) {
        toast.error(t('auth.noCustomerSelected'))
      } else {
        toast.error(t('auth.noPermission'))
      }
      return
    }
    if (quantity > 0) setQuantity(quantity - 1)
  }

  const handleIncrease = () => {
    // Check auth first
    if (!canAddToCart()) {
      if (!isAuthenticated) {
        toast.error(t('auth.notAuthenticated'))
      } else if (!auth.activeCustomerId) {
        toast.error(t('auth.noCustomerSelected'))
      } else {
        toast.error(t('auth.noPermission'))
      }
      return
    }
    setQuantity(quantity + 1)
  }

  const handleAddToCart = async () => {
    // Check auth first
    if (!canAddToCart()) {
      if (!isAuthenticated) {
        toast.error(t('auth.notAuthenticated'))
      } else if (!auth.activeCustomerId) {
        toast.error(t('auth.noCustomerSelected'))
      } else {
        toast.error(t('auth.noPermission'))
      }
      return
    }

    if (quantity > 0) {
      try {
        // Use cart store directly with campaign price
        const success = await addToCart(
          product.stock_id, // productId
          product.stock_name, // productName
          product.campaign_price, // unitPrice (use campaign price)
          quantity, // quantity
          product.stock_image_link, // productImage
          product.stock_group, // productGroup
          product.stock_unit, // stockUnit
          99 // maxQuantity
        )

        if (success) {
          toast.success(
            t('cart.addedSuccess', {
              quantity,
              product: product.stock_name,
            })
          )
          setQuantity(0) // Reset quantity after adding

          // Call legacy callback if provided (for backwards compatibility)
          if (onAddToCart) {
            onAddToCart(product, quantity)
          }
        } else {
          toast.error(t('errors.somethingWentWrong'))
        }
      } catch (error) {
        toast.error(t('errors.somethingWentWrong'))
        console.error('Error adding to cart:', error)
      }
    }
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <QuantityCounter
        quantity={quantity}
        onDecrease={handleDecrease}
        onIncrease={handleIncrease}
        disabled={!canAddToCart()}
        canModify={canAddToCart()}
      />
      <Button
        variant="default"
        size="default"
        className="w-full"
        onClick={handleAddToCart}
        disabled={quantity === 0 || !canAddToCart()}
      >
        <ShoppingCart className="h-4 w-4 mr-2" />
        {cartQuantity > 0
          ? `${t('card.addToCart')} (${cartQuantity} in cart)`
          : t('card.addToCart')}
      </Button>
    </div>
  )
}
