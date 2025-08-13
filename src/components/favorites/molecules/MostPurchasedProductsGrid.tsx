/**
 * MostPurchasedProductsGrid Molecule - Grid layout for most purchased products
 * SOLID Principles: SRP - Single responsibility for grid layout
 * Design Patterns: Molecule Pattern, Grid Layout Pattern
 * Dependencies: ProductCard, Most Purchased Service, Clerk auth
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
import {
  mostPurchasedService,
  type MostPurchasedProduct,
} from '@/services/most-purchased.service'
import { useAuth } from '@clerk/nextjs'
import { Button } from '@/components/ui/schadcn'
import { Minus, Plus } from 'lucide-react'
import { useBookmarkStore } from '@/lib/stores/bookmark-store'

interface ProductWithQuantity extends MostPurchasedProduct {
  selectedQuantity: number
}

export function MostPurchasedProductsGrid() {
  const { t } = useTranslation('favorites')
  const [products, setProducts] = useState<ProductWithQuantity[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [consumptionPeriod, setConsumptionPeriod] = useState<number>(90)
  const { isSignedIn } = useAuth()

  // Subscribe to bookmark store changes to trigger re-render when bookmarks change
  // This ensures bookmark buttons update when bookmarks are toggled
  useBookmarkStore(state => state.bookmarkedProducts)
  const initializeBookmarks = useBookmarkStore(
    state => state.initializeBookmarks
  )
  const isInitialized = useBookmarkStore(state => state.isInitialized)

  // Initialize bookmarks on mount if signed in
  useEffect(() => {
    if (isSignedIn && !isInitialized) {
      initializeBookmarks()
    }
  }, [isSignedIn, isInitialized, initializeBookmarks])

  useEffect(() => {
    async function fetchMostPurchasedProducts() {
      try {
        setIsLoading(true)

        // Get active customer ID from cookies via the API
        const response = await fetch('/api/customer/active')
        const activeCustomerData = await response.json()
        const customerId = activeCustomerData?.customerId

        if (!customerId) {
          setProducts([])
          setIsLoading(false)
          return
        }

        // Get consumption period from service
        const period = mostPurchasedService.getConsumptionPeriodInDays()
        setConsumptionPeriod(period)

        // Fetch most purchased products from service
        const mostPurchased =
          await mostPurchasedService.getMostPurchasedProducts(customerId)

        // Transform to include selected quantity for cart
        const productsWithQuantity: ProductWithQuantity[] = mostPurchased.map(
          product => ({
            ...product,
            selectedQuantity: 0,
          })
        )

        setProducts(productsWithQuantity)
      } catch (error) {
        console.error('Failed to fetch most purchased products:', error)
        setProducts([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchMostPurchasedProducts()
  }, [isSignedIn]) // Only fetch on initial load or auth change

  const handleQuantityChange = (productId: string, delta: number) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.stockId === productId
          ? {
              ...product,
              selectedQuantity: Math.max(0, product.selectedQuantity + delta),
            }
          : product
      )
    )
  }

  const handleAddToCart = (product: ProductWithQuantity) => {
    if (product.selectedQuantity > 0) {
      // TODO: Implement add to cart functionality
      // Will dispatch to cart store when implemented

      // Reset quantity after adding to cart
      handleQuantityChange(product.stockId, -product.selectedQuantity)
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold">
            {t('sections.mostPurchased.title')}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {t('sections.mostPurchased.description', {
              days: consumptionPeriod,
            })}
          </p>
        </div>
        <GridErrorBoundary>
          <div
            className={cn(
              'grid w-full gap-4',
              'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            )}
          >
            {isLoading ? (
              <GridSkeleton count={6} variant="card" />
            ) : products.length === 0 ? (
              <div className="col-span-full py-12 text-center">
                <p className="text-muted-foreground">
                  {t('sections.mostPurchased.empty.title')}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {t('sections.mostPurchased.empty.description')}
                </p>
              </div>
            ) : (
              products.map(product => (
                <GridItem key={product.stockId}>
                  <div className="relative space-y-2">
                    {/* Show badge for top 3 most consumed */}
                    {product.rank && (
                      <div className="absolute top-2 right-2 z-10 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                        {t('sections.mostPurchased.badge.top', {
                          rank: product.rank,
                        })}
                      </div>
                    )}

                    {/* Product Card */}
                    <ProductCard
                      id={product.stockId}
                      name={product.name}
                      {...(product.imageUrl && { imageUrl: product.imageUrl })}
                      price={product.price}
                      unit={product.unit}
                      categoryId={product.categoryId}
                    />

                    {/* Show consumption quantity */}
                    <div className="text-center text-sm text-muted-foreground">
                      {t('sections.mostPurchased.consumed', {
                        units: product.consumedUnits,
                      })}
                    </div>

                    {/* Quantity selector and Add to Cart */}
                    <div className="flex items-center justify-between px-2">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            handleQuantityChange(product.stockId, -1)
                          }
                          disabled={product.selectedQuantity === 0}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-12 text-center font-medium">
                          {product.selectedQuantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            handleQuantityChange(product.stockId, 1)
                          }
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleAddToCart(product)}
                        disabled={product.selectedQuantity === 0}
                      >
                        {t('sections.mostPurchased.addToCart')}
                      </Button>
                    </div>
                  </div>
                </GridItem>
              ))
            )}
          </div>
        </GridErrorBoundary>
      </div>
    </div>
  )
}
