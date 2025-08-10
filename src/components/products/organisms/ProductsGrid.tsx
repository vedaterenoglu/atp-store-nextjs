/**
 * ProductsGrid Organism Component
 * SOLID Principles: Single Responsibility - Manages product grid layout
 * Design Patterns: Composition Pattern - Composes with grid system
 * Dependencies: ProductCard, Grid components
 */

'use client'

import { ProductCard } from '@/components/products'
import {
  GridErrorBoundary,
  GridSkeleton,
  GridItem,
} from '@/components/ui/custom/grid'
import { getGridClasses, getContainerClasses } from '@/lib/styles/utilities'
import { cn } from '@/lib/utils'

interface Product {
  id: string
  name: string
  imageUrl?: string
  price: number
  unit: string
  categoryId: string
}

interface ProductsGridProps {
  products: Product[]
  className?: string
  isLoading?: boolean
  error?: Error | null
  onProductClick?: (product: Product) => void
}

export function ProductsGrid({
  products,
  className,
  isLoading = false,
  error = null,
  onProductClick,
}: ProductsGridProps) {
  if (error) {
    throw error // Let error boundary handle it
  }

  return (
    <GridErrorBoundary>
      <div
        className={cn(
          getContainerClasses({ size: 'xl' }),
          getGridClasses({ gap: 'md', responsive: false }),
          'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
          className
        )}
      >
        {isLoading ? (
          <GridSkeleton count={8} variant="card" />
        ) : products.length === 0 ? (
          <div className="col-span-full py-12 text-center">
            <p className="text-muted-foreground">No products found</p>
          </div>
        ) : (
          products.map(product => (
            <GridItem key={product.id}>
              <ProductCard
                id={product.id}
                name={product.name}
                {...(product.imageUrl && { imageUrl: product.imageUrl })}
                price={product.price}
                unit={product.unit}
                categoryId={product.categoryId}
                onClick={() => onProductClick?.(product)}
              />
            </GridItem>
          ))
        )}
      </div>
    </GridErrorBoundary>
  )
}
