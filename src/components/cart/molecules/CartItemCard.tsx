/**
 * Cart item card molecule component
 * SOLID Principles: SRP - Single responsibility for displaying a cart item
 * Design Patterns: Composite Component Pattern
 * Dependencies: React, cart types, atoms, UI components
 */

'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Trash2, Plus, Minus, AlertCircle } from 'lucide-react'
import { clsx } from 'clsx'
import { useTranslation } from 'react-i18next'
import type { CartItemProps } from '@/types/cart'
import { PriceDisplay } from '../atoms'
import { Button } from '@/components/ui/schadcn'
import { Card, CardContent } from '@/components/ui/schadcn/card'
import { formatPrice } from '@/lib/utils/price'

export function CartItemCard({
  item,
  onQuantityChange,
  onRemove,
  readonly = false,
  showActions = true,
  compact = false,
}: CartItemProps) {
  const { t } = useTranslation('cart')
  const [quantity, setQuantity] = useState(item.quantity)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleQuantityChange = async (newQuantity: number) => {
    if (readonly || !onQuantityChange) return

    if (newQuantity < 1 || newQuantity > item.maxQuantity) return

    setIsUpdating(true)
    setQuantity(newQuantity)

    try {
      await onQuantityChange(item.id, newQuantity)
    } catch (error) {
      // Revert on error
      setQuantity(item.quantity)
      console.error('Failed to update quantity:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleRemove = async () => {
    if (readonly || !onRemove) return

    setIsUpdating(true)
    try {
      await onRemove(item.id)
    } catch (error) {
      console.error('Failed to remove item:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <Card className={clsx('overflow-hidden', compact && 'p-2')}>
      <CardContent className={clsx('p-3 sm:p-4', compact && 'p-2')}>
        {/* Mobile: Stack vertically, Desktop: Side by side */}
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
          {/* Product Image - Larger on mobile */}
          <div className="relative mx-auto h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-muted sm:mx-0 sm:h-20 sm:w-20">
            <Image
              src={item.productImage || '/placeholder-product.jpg'}
              alt={item.productName}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 96px, 80px"
            />
            {!item.isAvailable && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-white" />
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            {/* Product Info and Remove Button */}
            <div className="flex justify-between gap-2">
              <div className="flex-1">
                <h4
                  className={clsx(
                    'font-medium',
                    compact ? 'text-sm' : 'text-base sm:text-lg',
                    !item.isAvailable && 'text-muted-foreground'
                  )}
                >
                  {item.productName}
                </h4>
                <p className="text-xs text-muted-foreground sm:text-sm">
                  {item.productGroup} • {item.stockUnit}
                </p>
              </div>

              {/* Remove Button - Larger touch target on mobile */}
              {showActions && !readonly && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleRemove}
                  disabled={isUpdating}
                  className="h-8 w-8 sm:h-8 sm:w-8 -mr-2 sm:mr-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Availability Warning */}
            {!item.isAvailable && (
              <p className="text-xs text-destructive mt-1 sm:text-sm">
                {t('product.outOfStock')}
              </p>
            )}

            {/* Mobile: Price and Quantity in columns */}
            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              {/* Quantity Controls - Full width on mobile */}
              {showActions && !readonly ? (
                <div className="flex items-center justify-between sm:justify-start sm:gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 sm:h-7 sm:w-7"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={isUpdating || quantity <= 1 || !item.isAvailable}
                  >
                    <Minus className="h-4 w-4 sm:h-3 sm:w-3" />
                  </Button>
                  <span className="w-16 text-center text-base font-medium sm:w-12 sm:text-sm">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 sm:h-7 sm:w-7"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={
                      isUpdating ||
                      quantity >= item.maxQuantity ||
                      !item.isAvailable
                    }
                  >
                    <Plus className="h-4 w-4 sm:h-3 sm:w-3" />
                  </Button>
                </div>
              ) : (
                <span className="text-sm text-muted-foreground">
                  {t('product.quantity')}: {quantity}
                </span>
              )}

              {/* Price - Prominent on mobile */}
              <div className="text-right sm:text-right">
                <PriceDisplay
                  amount={item.discountedPrice ?? item.totalPrice}
                  {...(item.discount && { originalAmount: item.totalPrice })}
                  size={compact ? 'sm' : 'md'}
                />
                {quantity > 1 && (
                  <p className="text-xs text-muted-foreground sm:text-xs">
                    {formatPrice(item.unitPrice)} / {item.stockUnit}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
