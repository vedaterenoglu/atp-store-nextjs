/**
 * Cart items list organism component
 * SOLID Principles: SRP - Single responsibility for managing cart items list
 * Design Patterns: Container Component Pattern
 * Dependencies: React, cart types, molecules, i18n
 */

'use client'

import { useState } from 'react'
import { clsx } from 'clsx'
import type { CartItem } from '@/types/cart'
import { CartItemCard } from '../molecules'
import { CartEmptyState } from '../atoms'
import { ShoppingBag } from 'lucide-react'
import { useSafeTranslation } from '@/hooks/use-safe-translation'

interface CartItemsListProps {
  items: CartItem[]
  onQuantityChange?: (itemId: string, quantity: number) => Promise<void>
  onRemove?: (itemId: string) => Promise<void>
  readonly?: boolean
  className?: string
  emptyMessage?: string
}

export function CartItemsList({
  items,
  onQuantityChange,
  onRemove,
  readonly = false,
  className,
  emptyMessage,
}: CartItemsListProps) {
  const { t } = useSafeTranslation('cart')
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set())

  // Use provided emptyMessage or fallback to translation
  const displayEmptyMessage = emptyMessage || t('emptyCart.title')

  const handleQuantityChange = async (itemId: string, quantity: number) => {
    if (!onQuantityChange) return

    setUpdatingItems(prev => new Set(prev).add(itemId))
    try {
      await onQuantityChange(itemId, quantity)
    } finally {
      setUpdatingItems(prev => {
        const next = new Set(prev)
        next.delete(itemId)
        return next
      })
    }
  }

  const handleRemove = async (itemId: string) => {
    if (!onRemove) return

    setUpdatingItems(prev => new Set(prev).add(itemId))
    try {
      await onRemove(itemId)
    } finally {
      setUpdatingItems(prev => {
        const next = new Set(prev)
        next.delete(itemId)
        return next
      })
    }
  }

  if (items.length === 0) {
    return (
      <CartEmptyState
        title={t('emptyState.emptyCart')}
        description={displayEmptyMessage}
        icon={<ShoppingBag className="h-12 w-12" />}
        {...(className && { className })}
      />
    )
  }

  return (
    <div className={clsx('', className)}>
      {/* Natural scrolling for all screen sizes */}
      <div className="space-y-3">
        {items.map(item => (
          <div
            key={item.id}
            className={clsx(
              'transition-opacity',
              updatingItems.has(item.id) && 'opacity-50 pointer-events-none'
            )}
          >
            <CartItemCard
              item={item}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemove}
              readonly={readonly || updatingItems.has(item.id)}
              showActions={!readonly}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
