/**
 * ProductCard Molecular Component
 * SOLID Principles: Single Responsibility - Display product card
 * Design Patterns: Composition Pattern - Combines multiple UI elements
 * Dependencies: shadcn/ui Card, Next.js Image
 */

'use client'

import { Card } from '@/components/ui/schadcn'
import Image from 'next/image'
import { cn } from '@/components/ui/utils'

interface ProductCardProps {
  id: string
  name: string
  imageUrl?: string
  price: number
  currency?: string
  unit: string
  className?: string
  onClick?: () => void
}

export function ProductCard({
  id: _id, // eslint-disable-line @typescript-eslint/no-unused-vars
  name,
  imageUrl,
  price,
  currency = 'kr',
  unit,
  className,
  onClick,
}: ProductCardProps) {
  return (
    <Card
      className={cn(
        'group overflow-hidden bg-neutral-950 border-gray-800 transition-all duration-200',
        'hover:shadow-lg hover:scale-[1.02] hover:border-gray-700',
        'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/2] overflow-hidden bg-gray-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover transition-transform duration-200 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-800">
            <span className="text-4xl text-gray-600">📦</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <p className="text-sm text-gray-500">{unit}</p>
        <h3 className="font-medium text-white line-clamp-2">{name}</h3>
        <p className="text-lg font-semibold text-white">
          {price.toFixed(2)} {currency}
        </p>
      </div>
    </Card>
  )
}
