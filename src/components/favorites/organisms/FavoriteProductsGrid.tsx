/**
 * FavoriteProductsGrid Organism - Grid layout for favorite products
 * SOLID Principles: SRP - Manages favorite products display
 * Design Patterns: Organism Pattern, Adapter Pattern (reuses ProductGrid)
 * Dependencies: ProductGrid, bookmark store, GraphQL client
 */

'use client'

import { useEffect, useState } from 'react'
import { ProductCard } from '@/components/products/molecules'
import { useBookmarkStore } from '@/lib/stores/bookmark-store'
import {
  GridErrorBoundary,
  GridSkeleton,
  GridItem,
} from '@/components/ui/custom/grid'
import { cn } from '@/components/ui/utils'
// TODO: Uncomment when backend is ready
// import { executeGraphQLOperation } from '@/lib/graphql/client'
// import GetProductsByIdsQuery from '@/services/graphql/queries/GetProductsByIdsQuery.graphql'

interface Product {
  id: string
  name: string
  imageUrl?: string
  price: number
  unit: string
  categoryId: string
}

// TODO: Uncomment when backend is ready
// interface StockItem {
//   stock_id: string
//   stock_name: string
//   category_id: string
//   category?: {
//     category_name: string
//   }
//   stock_prices?: Array<{
//     price: number
//     unit: string
//     currency_code: string
//   }>
// }

// interface GetProductsByIdsResponse {
//   stock: StockItem[]
// }

export function FavoriteProductsGrid() {
  const { bookmarkedProducts, isInitialized, initializeBookmarks } =
    useBookmarkStore()
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Initialize bookmarks if not already done
    if (!isInitialized) {
      initializeBookmarks()
    }
  }, [isInitialized, initializeBookmarks])

  useEffect(() => {
    async function fetchBookmarkedProducts() {
      if (!isInitialized || bookmarkedProducts.size === 0) {
        setProducts([])
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        const stockIds = Array.from(bookmarkedProducts)

        // TODO: Enable real GraphQL query when backend is configured
        // Mock implementation for testing UI
        if (stockIds.length > 0) {
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 500))

          const mockProducts: Product[] = stockIds.map((id, index) => ({
            id,
            name: `Product ${id}`,
            imageUrl: `/images/products/placeholder.jpg`,
            price: 10.99 + index * 2,
            unit: 'pcs',
            categoryId: `cat-${(index % 3) + 1}`,
          }))
          setProducts(mockProducts)
        } else {
          setProducts([])
        }

        /* Real implementation - uncomment when backend is ready
        const variables = {
          company_id: 'alfe',
          stock_ids: stockIds,
        }

        const data = await executeGraphQLOperation<GetProductsByIdsResponse>(
          GetProductsByIdsQuery,
          variables
        )

        if (data?.stock) {
          const mappedProducts: Product[] = data.stock.map(item => ({
            id: item.stock_id,
            name: item.stock_name,
            imageUrl: `/images/products/${item.stock_id.toLowerCase()}.jpg`,
            price: item.stock_prices?.[0]?.price || 0,
            unit: item.stock_prices?.[0]?.unit || 'pcs',
            categoryId: item.category_id,
          }))
          setProducts(mappedProducts)
        }
        */
      } catch {
        // Failed to fetch bookmarked products
        setProducts([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchBookmarkedProducts()
  }, [bookmarkedProducts, isInitialized])

  return (
    <GridErrorBoundary>
      <div
        className={cn(
          'mx-auto grid w-full max-w-7xl gap-4',
          'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
          'px-4 sm:px-6 lg:px-8'
        )}
      >
        {isLoading ? (
          <GridSkeleton count={8} variant="card" />
        ) : products.length === 0 ? (
          <div className="col-span-full py-12 text-center">
            <p className="text-muted-foreground">No bookmarked products yet</p>
            <p className="text-sm text-muted-foreground mt-2">
              Browse products and bookmark your favorites to see them here
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
