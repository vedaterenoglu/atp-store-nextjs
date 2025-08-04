/**
 * ProductCard Molecular Component
 * SOLID Principles: Single Responsibility - Display product card
 * Design Patterns: Composition Pattern - Combines multiple UI elements
 * Dependencies: shadcn/ui Card, Next.js Image, PriceTag atom, react-i18next
 */

'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, Button } from '@/components/ui/schadcn'
import Image from 'next/image'
import { cn } from '@/components/ui/utils'
import { PriceTag } from '../atoms'
import { Minus, Plus } from 'lucide-react'

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

  const handleDecrease = () => {
    if (quantity > 0) setQuantity(quantity - 1)
  }

  const handleIncrease = () => {
    setQuantity(quantity + 1)
  }

  const handleAddToCart = () => {
    if (quantity > 0) {
      // TODO: Implement add to cart functionality
      // Will be implemented when cart functionality is added
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
        {/* Price Tag */}
        <PriceTag price={price} />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <h3 className="font-medium line-clamp-2">{name}</h3>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">
            {t('productCard.category')}: {categoryId}
          </p>
          <p className="text-sm text-muted-foreground">
            {t('productCard.id')}: {id}
          </p>
          <p className="text-sm text-muted-foreground">
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
              disabled={quantity === 0}
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
            disabled={quantity === 0}
          >
            {t('productCard.addToCart')}
          </Button>
        </div>
      </div>
    </Card>
  )
}
