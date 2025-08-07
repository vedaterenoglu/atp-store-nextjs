/**
 * Most Purchased Products Service
 *
 * SOLID Principles: SRP - Single responsibility for fetching most purchased products
 * Design Patterns: Service Layer Pattern, Repository Pattern
 * Dependencies: Apollo Client, environment config
 */

// Dynamic import for client selection based on environment
import type { ApolloClient } from '@apollo/client'

let getClient: () => ApolloClient<object>

if (typeof window !== 'undefined') {
  // Browser environment - use browser client
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { getBrowserClient } = require('@/lib/apollo/browser-client')
  getClient = getBrowserClient
} else {
  // Server environment - use server client
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { getClient: getServerClient } = require('@/lib/apollo/client')
  getClient = getServerClient
}

import GetMostPurchasedProductsQueryDocument from '@/services/graphql/queries/GetMostPurchasedProductsQuery.graphql'
import { validateGetMostPurchasedProductsResponse } from '@/services/graphql/queries/GetMostPurchasedProductsQuery.schema'
import type {
  GetMostPurchasedProductsQueryResponse,
  GetMostPurchasedProductsQueryVariables,
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
 * Calculate date range based on consumption period from environment
 */
function getDateRange(): { beginDate: string; endDate: string } {
  const today = new Date()
  const periodInDays = parseInt(
    process.env['NEXT_PUBLIC_CONSUMPTION_PERIOD_IN_DAYS'] || '90',
    10
  )

  // Calculate begin date (90 days ago by default)
  const beginDate = new Date(today)
  beginDate.setDate(beginDate.getDate() - periodInDays)

  // Format dates as YYYY-MM-DD
  const formatDate = (date: Date): string => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  return {
    beginDate: formatDate(beginDate),
    endDate: formatDate(today),
  }
}

/**
 * Fetch most purchased products for a customer
 */
export async function getMostPurchasedProducts(
  customerId: string,
  companyId?: string
): Promise<MostPurchasedProduct[]> {
  try {
    const { beginDate, endDate } = getDateRange()
    const actualCompanyId = companyId || process.env['COMPANY_ID'] || 'alfe'

    const client = getClient()
    const { data } = await client.query<
      GetMostPurchasedProductsQueryResponse,
      GetMostPurchasedProductsQueryVariables
    >({
      query: GetMostPurchasedProductsQueryDocument,
      variables: {
        company_id: actualCompanyId,
        customer_id: customerId,
        bd: beginDate,
        ed: endDate,
      },
    })

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
