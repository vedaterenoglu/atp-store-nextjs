/**
 * Product price service for fetching prices from backend
 * SOLID Principles: SRP - Single responsibility for price fetching
 * Design Patterns: Service Pattern, Repository Pattern
 * Dependencies: Apollo Client, GraphQL, Pricing utils
 */

import { getClient } from '@/lib/apollo/client'
import {
  calculateProductPrice,
  type ProductPriceResponse,
  type PriceCalculation,
} from '@/lib/utils/pricing'
import GET_PRODUCT_PRICES_QUERY from '@/services/graphql/queries/GetProductPricesQuery.graphql'

/**
 * Fetch product price from backend and calculate final price
 */
export async function fetchProductPrice(
  companyId: string,
  customerId: string,
  stockId: string
): Promise<PriceCalculation> {
  try {
    const client = getClient()

    const { data } = await client.query<ProductPriceResponse>({
      query: GET_PRODUCT_PRICES_QUERY,
      variables: {
        company_id: companyId,
        customer_id: customerId,
        stock_id: stockId,
      },
      fetchPolicy: 'network-only', // Always fetch fresh prices
    })

    if (!data) {
      throw new Error('No price data received')
    }

    // Calculate the final price using the pricing utility
    return calculateProductPrice(data)
  } catch (error) {
    console.error('Error fetching product price:', error)
    throw new Error('Failed to fetch product price')
  }
}

/**
 * Batch fetch prices for multiple products
 */
export async function fetchMultipleProductPrices(
  companyId: string,
  customerId: string,
  stockIds: string[]
): Promise<Map<string, PriceCalculation>> {
  const priceMap = new Map<string, PriceCalculation>()

  // Fetch prices in parallel
  const promises = stockIds.map(stockId =>
    fetchProductPrice(companyId, customerId, stockId)
      .then(price => ({ stockId, price }))
      .catch(error => {
        console.error(`Failed to fetch price for ${stockId}:`, error)
        return null
      })
  )

  const results = await Promise.all(promises)

  // Build the price map
  for (const result of results) {
    if (result) {
      priceMap.set(result.stockId, result.price)
    }
  }

  return priceMap
}
