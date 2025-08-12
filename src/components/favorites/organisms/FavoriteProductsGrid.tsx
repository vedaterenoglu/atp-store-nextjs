/**
 * FavoriteProductsGrid Organism - Grid layout for favorite products
 * SOLID Principles: SRP - Manages favorite products display
 * Design Patterns: Organism Pattern, Adapter Pattern (reuses ProductGrid)
 * Dependencies: ProductGrid, bookmark store, GraphQL client
 */

'use client'

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ProductCard } from '@/components/products/molecules'
import {
  GridErrorBoundary,
  GridSkeleton,
  GridItem,
} from '@/components/ui/custom/grid'
import { cn } from '@/lib/utils'
import { useAuth } from '@clerk/nextjs'
import {
  useBookmarkStore,
  type BookmarkedProduct,
} from '@/lib/stores/bookmark-store'

export function FavoriteProductsGrid() {
  const { t } = useTranslation('favorites')
  const { isSignedIn } = useAuth()
  const [isHydrated, setIsHydrated] = useState(false)

  // Subscribe to bookmark store
  const getBookmarkedProductsArray = useBookmarkStore(
    state => state.getBookmarkedProductsArray
  )
  const initializeBookmarks = useBookmarkStore(
    state => state.initializeBookmarks
  )
  const isInitialized = useBookmarkStore(state => state.isInitialized)
  const isLoading = useBookmarkStore(state => state.isLoading)

  // Get products from store (only after hydration)
  const products: BookmarkedProduct[] = isHydrated
    ? getBookmarkedProductsArray()
    : []

  // Handle hydration
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  // Initialize bookmarks on mount - always refresh on favorites page
  useEffect(() => {
    if (isSignedIn && isHydrated) {
      // Force refresh on favorites page to always show latest bookmarks
      initializeBookmarks(true)
    }
  }, [isSignedIn, initializeBookmarks, isHydrated])

  // Show loading while hydrating or initializing
  const showLoading = !isHydrated || (isLoading && !isInitialized)

  return (
    <GridErrorBoundary>
      <div
        className={cn(
          'mx-auto grid w-full max-w-7xl gap-4',
          'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
          'px-4 sm:px-6 lg:px-8'
        )}
      >
        {showLoading ? (
          <GridSkeleton count={8} variant="card" />
        ) : products.length === 0 ? (
          <div className="col-span-full py-12 text-center">
            <p className="text-muted-foreground">
              {t('sections.favorites.empty.title')}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {t('sections.favorites.empty.description')}
            </p>
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
              />
            </GridItem>
          ))
        )}
      </div>
    </GridErrorBoundary>
  )
}
