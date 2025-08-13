/**
 * ProductCard Molecular Component
 * SOLID Principles: Single Responsibility - Display product card
 * Design Patterns: Composition Pattern - Combines multiple UI elements
 * Dependencies: shadcn/ui Card, Next.js Image, PriceTag atom, react-i18next
 */

'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, Button } from '@/components/ui/schadcn'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { PriceTag } from '@/components/products'
import { BookmarkButton } from '@/components/ui/custom'
import { useBookmarkStore } from '@/lib/stores/bookmark-store'
import { useCartStore } from '@/lib/stores/cart.store'
import { Minus, Plus, ShoppingCart } from 'lucide-react'
import { toast } from '@/lib/utils/toast'
import { useSecureAuth } from '@/hooks/use-secure-auth'

interface ProductCardProps {
  id: string
  name: string
  imageUrl?: string
  price: number
  unit: string
  categoryId: string
  className?: string
  onClick?: () => void
}

export function ProductCard({
  id,
  name,
  imageUrl,
  price,
  unit,
  categoryId,
  className,
  onClick,
}: ProductCardProps) {
  const { t } = useTranslation('products')
  const [quantity, setQuantity] = useState(0)
  const { auth, isAuthenticated } = useSecureAuth()

  // Get cart state from Zustand store (only for authenticated users)
  const addToCart = useCartStore(state => state.addToCart)
  const cartItem = useCartStore(state => state.findCartItem(id))
  const cartQuantity = isAuthenticated ? cartItem?.quantity || 0 : 0

  // Get bookmark state from Zustand store
  const {
    isBookmarked: checkBookmark,
    toggleBookmark,
    initializeBookmarks,
    isInitialized,
  } = useBookmarkStore()
  const isProductBookmarked = checkBookmark(id)

  // Initialize bookmarks on mount if user is signed in
  useEffect(() => {
    if (isAuthenticated && !isInitialized) {
      initializeBookmarks()
    }
  }, [isAuthenticated, isInitialized, initializeBookmarks])

  // Use secure server-side auth checks (cannot be manipulated from console)
  const canBookmark = () => auth.canBookmark
  const canAddToCart = () => auth.canAddToCart

  // Handle bookmark toggle using store
  const handleBookmarkToggle = async () => {
    // Pass product data when bookmarking
    const productData = !isProductBookmarked
      ? {
          id,
          name,
          price,
          unit,
          categoryId,
          ...(imageUrl && { imageUrl }),
        }
      : undefined

    await toggleBookmark(id, productData)
  }

  const handleDecrease = () => {
    // Check auth first
    if (!canAddToCart()) {
      if (!isAuthenticated) {
        toast.error('Please sign in to modify cart items')
      } else if (!auth.activeCustomerId) {
        toast.error('Please select a customer account')
      } else {
        toast.error('You need proper permissions to modify cart')
      }
      return
    }
    if (quantity > 0) setQuantity(quantity - 1)
  }

  const handleIncrease = () => {
    // Check auth first
    if (!canAddToCart()) {
      if (!isAuthenticated) {
        toast.error('Please sign in to add items to cart')
      } else if (!auth.activeCustomerId) {
        toast.error('Please select a customer account')
      } else {
        toast.error('You need proper permissions to add to cart')
      }
      return
    }
    setQuantity(quantity + 1)
  }

  const handleAddToCart = async () => {
    // Double check authentication (button should be disabled if not allowed)
    if (!canAddToCart()) {
      toast.error('Please sign in with a customer account to add items to cart')
      return
    }

    if (quantity > 0) {
      try {
        const success = await addToCart(
          id,
          name,
          price,
          quantity,
          imageUrl,
          categoryId, // using categoryId as productGroup
          unit,
          99 // max quantity
        )

        if (success) {
          toast.success(`Added ${quantity} ${name} to cart`)
          setQuantity(0) // Reset quantity after adding
        } else {
          toast.error('Failed to add to cart. Please try again.')
        }
      } catch (error) {
        toast.error('Failed to add to cart')
        console.error('Error adding to cart:', error)
      }
    }
  }

  return (
    <Card
      className={cn(
        'group overflow-hidden transition-all duration-200',
        'hover:shadow-lg hover:scale-[1.02]',
        'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/2] overflow-hidden bg-muted">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover transition-transform duration-200 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <span className="text-4xl text-muted-foreground">📦</span>
          </div>
        )}
        {/* Bookmark Button - Top Left - Only show for customers with customerid */}
        {canBookmark() && (
          <BookmarkButton
            productId={id}
            isBookmarked={isProductBookmarked}
            onToggle={handleBookmarkToggle}
            size="sm"
          />
        )}
        {/* Price Tag */}
        <PriceTag price={price} />
      </div>

      {/* Content */}
      <div className="p-3 space-y-2">
        <h3 className="font-medium line-clamp-1 text-sm">{name}</h3>
        <div className="space-y-0.5">
          <p className="text-xs text-muted-foreground">
            {t('productCard.category')}: {categoryId}
          </p>
          <p className="text-xs text-muted-foreground">
            {t('productCard.id')}: {id}
          </p>
          <p className="text-xs text-muted-foreground">
            {t('productCard.unit')}: {unit}
          </p>
        </div>

        {/* Quantity selector and Add to cart */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-center gap-3">
            <Button
              size="sm"
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={e => {
                e.stopPropagation()
                handleDecrease()
              }}
              disabled={quantity === 0 || !canAddToCart()}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="font-medium w-8 text-center">{quantity}</span>
            <Button
              size="sm"
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={e => {
                e.stopPropagation()
                handleIncrease()
              }}
              disabled={!canAddToCart()}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <Button
            size="sm"
            className="w-full"
            onClick={e => {
              e.stopPropagation()
              handleAddToCart()
            }}
            disabled={quantity === 0 || !canAddToCart()}
          >
            {cartQuantity > 0 ? (
              <>
                <ShoppingCart className="h-4 w-4 mr-2" />
                {t('productCard.addToCart')} ({cartQuantity} in cart)
              </>
            ) : (
              t('productCard.addToCart')
            )}
          </Button>
        </div>
      </div>
    </Card>
  )
}
