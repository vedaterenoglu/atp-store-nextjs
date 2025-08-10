/**
 * Most Purchased Products Service
 *
 * SOLID Principles: SRP - Single responsibility for fetching most purchased products
 * Design Patterns: Service Layer Pattern, Repository Pattern
 * Dependencies: Apollo Client, environment config
 */

import { validateGetMostPurchasedProductsResponse } from '@/services/graphql/queries/GetMostPurchasedProductsQuery.schema'
import type {
  GetMostPurchasedProductsQueryResponse,
  GoodsTransaction,
} from '@/services/graphql/queries/GetMostPurchasedProductsQuery.types'

/**
 * Most purchased product with consumption data
 */
export interface MostPurchasedProduct {
  stockId: string
  name: string
  price: number
  unit: string
  categoryId: string
  imageUrl?: string
  consumedUnits: number
  rank?: number // 1, 2, 3 for top products
}

/**
 * Fetch most purchased products for a customer
 */
export async function getMostPurchasedProducts(
  customerId: string,
  companyId?: string
): Promise<MostPurchasedProduct[]> {
  try {
    const actualCompanyId = companyId || process.env['COMPANY_ID'] || 'alfe'

    // Construct absolute URL for Server Components
    const baseUrl =
      typeof window === 'undefined'
        ? process.env['NEXT_PUBLIC_APP_URL'] || 'http://localhost:3081'
        : ''

    // Use new API route facade (dates are calculated server-side)
    const params = new URLSearchParams({
      company_id: actualCompanyId,
      customer_id: customerId,
    })

    const response = await fetch(`${baseUrl}/api/most-purchased?${params}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch most purchased: ${response.statusText}`)
    }

    const data: GetMostPurchasedProductsQueryResponse = await response.json()

    if (!data) {
      throw new Error('No data returned from API')
    }

    // Validate response with Zod
    const validatedResponse = validateGetMostPurchasedProductsResponse(data)

    // Transform and sort by consumed units
    const products = validatedResponse.goods_transactions
      .map((transaction: GoodsTransaction): MostPurchasedProduct => {
        const consumedUnits =
          transaction.goods_transaction_goods_transaction_rel_aggregate
            ?.aggregate?.sum?.amount_credit || 0

        return {
          stockId: transaction.stock_id,
          name:
            transaction.goods_transactions_stock_rel?.stock_name ||
            'Unknown Product',
          price: transaction.goods_transactions_stock_rel?.stock_price || 0,
          unit: transaction.goods_transactions_stock_rel?.stock_unit || 'pcs',
          categoryId:
            transaction.goods_transactions_stock_rel?.stock_group ||
            'uncategorized',
          consumedUnits: Math.abs(consumedUnits), // Make sure it's positive
          ...(transaction.goods_transactions_stock_rel?.stock_image_link && {
            imageUrl: transaction.goods_transactions_stock_rel.stock_image_link,
          }),
        }
      })
      .filter(product => product.consumedUnits > 0) // Only show products with consumption
      .sort((a, b) => b.consumedUnits - a.consumedUnits) // Sort by most consumed

    // Add rank to top 3 products
    products.forEach((product, index) => {
      if (index < 3) {
        product.rank = index + 1
      }
    })

    return products
  } catch (error) {
    console.error('Failed to fetch most purchased products:', error)
    return []
  }
}

/**
 * Get consumption period in days from environment
 */
export function getConsumptionPeriodInDays(): number {
  return parseInt(
    process.env['NEXT_PUBLIC_CONSUMPTION_PERIOD_IN_DAYS'] || '90',
    10
  )
}

// Export singleton instance for easy use
export const mostPurchasedService = {
  getMostPurchasedProducts,
  getConsumptionPeriodInDays,
}
