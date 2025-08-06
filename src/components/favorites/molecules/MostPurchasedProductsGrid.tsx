/**
 * MostPurchasedProductsGrid Molecule - Grid layout for most purchased products
 * SOLID Principles: SRP - Single responsibility for grid layout
 * Design Patterns: Molecule Pattern, Grid Layout Pattern
 * Dependencies: ProductCard, GraphQL client, Clerk auth
 */

'use client'

import { useEffect, useState } from 'react'
import { ProductCard } from '@/components/products/molecules'
import {
  GridErrorBoundary,
  GridSkeleton,
  GridItem,
} from '@/components/ui/custom/grid'
import { cn } from '@/components/ui/utils'
// TODO: Uncomment when backend is ready
// import { executeGraphQLOperation } from '@/lib/graphql/client'
// import GetMostPurchasedProductsClientQuery from '@/services/graphql/queries/GetMostPurchasedProductsClientQuery.graphql'
import { useAuth, useUser } from '@clerk/nextjs'

interface Product {
  id: string
  name: string
  imageUrl?: string
  price: number
  unit: string
  categoryId: string
  consumptionQuantity?: number
}

// TODO: Uncomment when backend is ready
// interface GoodsTransaction {
//   goods_transactions_stock_rel: {
//     stock_id: string
//     stock_name: string
//   }
//   goods_transaction_goods_transaction_rel_aggregate: {
//     aggregate: {
//       sum: {
//         amount_credit: number | null
//       }
//     }
//   }
// }

// interface GetMostPurchasedResponse {
//   goods_transactions: GoodsTransaction[]
//   goods_transactions_aggregate: {
//     aggregate: {
//       count: number
//     }
//   }
// }

export function MostPurchasedProductsGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [consumptionPeriod, setConsumptionPeriod] = useState<number>(90)
  const { sessionClaims } = useAuth()
  const { user } = useUser()

  useEffect(() => {
    async function fetchMostPurchasedProducts() {
      try {
        setIsLoading(true)

        // Get customer ID from session or user metadata
        const metadata = sessionClaims?.['metadata'] as
          | Record<string, unknown>
          | undefined
        const sessionCustomerId = metadata?.['customerid'] as string | undefined
        const publicCustomerId = user?.publicMetadata?.['customerid'] as
          | string
          | undefined
        const customerId = sessionCustomerId || publicCustomerId

        if (!customerId) {
          setProducts([])
          setIsLoading(false)
          return
        }

        // Get consumption period from environment variable
        const period = parseInt(
          process.env['NEXT_PUBLIC_CONSUMPTION_PERIOD_IN_DAYS'] || '90',
          10
        )
        setConsumptionPeriod(period)

        // TODO: Uncomment when backend is ready
        // Calculate date range (ed = today, bd = today - consumption period)
        // const today = new Date()
        // const year = today.getFullYear()
        // const month = String(today.getMonth() + 1).padStart(2, '0')
        // const day = String(today.getDate()).padStart(2, '0')
        // const endDate = `${year}-${month}-${day}` // YYYY-MM-DD format

        // const beginDate = new Date(today)
        // beginDate.setDate(beginDate.getDate() - period)
        // const beginYear = beginDate.getFullYear()
        // const beginMonth = String(beginDate.getMonth() + 1).padStart(2, '0')
        // const beginDay = String(beginDate.getDate()).padStart(2, '0')
        // const startDate = `${beginYear}-${beginMonth}-${beginDay}` // YYYY-MM-DD format

        // Variables would be used for real query
        // const variables = {
        //   company_id: 'alfe',
        //   customer_id: customerId,
        //   bd: startDate,
        //   ed: endDate,
        // }

        // TODO: Enable real GraphQL query when backend is configured
        // Mock implementation for testing UI
        await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API delay

        const mockProducts: Product[] = [
          {
            id: '1001',
            name: 'Pizza Box Large',
            imageUrl: '/images/products/placeholder.jpg',
            price: 15.99,
            unit: 'pcs',
            categoryId: 'cat-1',
            consumptionQuantity: 150,
          },
          {
            id: '1002',
            name: 'Pizza Box Medium',
            imageUrl: '/images/products/placeholder.jpg',
            price: 12.99,
            unit: 'pcs',
            categoryId: 'cat-1',
            consumptionQuantity: 120,
          },
          {
            id: '2001',
            name: 'Napkins Pack',
            imageUrl: '/images/products/placeholder.jpg',
            price: 5.99,
            unit: 'pack',
            categoryId: 'cat-2',
            consumptionQuantity: 95,
          },
          {
            id: '2002',
            name: 'Plastic Cups',
            imageUrl: '/images/products/placeholder.jpg',
            price: 8.99,
            unit: 'pack',
            categoryId: 'cat-2',
            consumptionQuantity: 80,
          },
          {
            id: '3001',
            name: 'Delivery Bags',
            imageUrl: '/images/products/placeholder.jpg',
            price: 3.99,
            unit: 'pcs',
            categoryId: 'cat-3',
            consumptionQuantity: 75,
          },
          {
            id: '3002',
            name: 'Food Containers',
            imageUrl: '/images/products/placeholder.jpg',
            price: 10.99,
            unit: 'pack',
            categoryId: 'cat-3',
            consumptionQuantity: 60,
          },
        ]
        setProducts(mockProducts)

        /* Real implementation - uncomment when backend is ready
        const data = await executeGraphQLOperation<GetMostPurchasedResponse>(
          GetMostPurchasedProductsClientQuery,
          variables
        )

        if (data?.goods_transactions) {
          // Map and sort products by consumption quantity
          const mappedProducts: Product[] = data.goods_transactions
            .filter(item => item.goods_transactions_stock_rel)
            .map(item => ({
              id: item.goods_transactions_stock_rel.stock_id,
              name: item.goods_transactions_stock_rel.stock_name,
              imageUrl: `/images/products/${item.goods_transactions_stock_rel.stock_id.toLowerCase()}.jpg`,
              price: 0, // Price not available in this query
              unit: 'pcs', // Unit not available in this query
              categoryId: '', // Category not available in this query
              consumptionQuantity:
                item.goods_transaction_goods_transaction_rel_aggregate.aggregate
                  .sum.amount_credit || 0,
            }))
            .sort(
              (a, b) =>
                (b.consumptionQuantity || 0) - (a.consumptionQuantity || 0)
            )
          // Show all products without pagination - company policy

          setProducts(mappedProducts)
        }
        */
      } catch {
        // Failed to fetch most purchased products
        setProducts([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchMostPurchasedProducts()
  }, [sessionClaims, user])

  return (
    <div className="space-y-2">
      {products.length > 0 && (
        <div className="text-sm text-muted-foreground px-4 sm:px-6 lg:px-8">
          Based on your consumption in the last {consumptionPeriod} days
        </div>
      )}
      <GridErrorBoundary>
        <div
          className={cn(
            'mx-auto grid w-full max-w-7xl gap-4',
            'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
            'px-4 sm:px-6 lg:px-8'
          )}
        >
          {isLoading ? (
            <GridSkeleton count={6} variant="card" />
          ) : products.length === 0 ? (
            <div className="col-span-full py-12 text-center">
              <p className="text-muted-foreground">
                No purchase history available
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Start shopping to see your most purchased products here
              </p>
            </div>
          ) : (
            products.map((product, index) => (
              <GridItem key={product.id}>
                <div className="relative">
                  {/* Show badge for top 3 most consumed */}
                  {index < 3 &&
                    product.consumptionQuantity &&
                    product.consumptionQuantity > 0 && (
                      <div className="absolute top-2 right-2 z-10 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                        Top {index + 1}
                      </div>
                    )}
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    {...(product.imageUrl && { imageUrl: product.imageUrl })}
                    price={product.price}
                    unit={product.unit}
                    categoryId={product.categoryId}
                  />
                  {/* Show consumption quantity */}
                  {product.consumptionQuantity &&
                    product.consumptionQuantity > 0 && (
                      <div className="text-center text-sm text-muted-foreground mt-1">
                        Consumed: {product.consumptionQuantity.toFixed(0)} units
                      </div>
                    )}
                </div>
              </GridItem>
            ))
          )}
        </div>
      </GridErrorBoundary>
    </div>
  )
}
