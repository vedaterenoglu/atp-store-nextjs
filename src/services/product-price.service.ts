/**
 * Product price service for fetching prices from backend
 * SOLID Principles: SRP - Single responsibility for price fetching
 * Design Patterns: Service Pattern, Repository Pattern
 * Dependencies: Apollo Client, GraphQL, Pricing utils
 */

import {
  calculateProductPrice,
  type ProductPriceResponse,
  type PriceCalculation,
} from '@/lib/utils/pricing'

/**
 * Fetch product price from backend and calculate final price
 */
export async function fetchProductPrice(
  companyId: string,
  customerId: string,
  stockId: string
): Promise<PriceCalculation> {
  try {
    // Construct absolute URL for Server Components
    const baseUrl =
      typeof window === 'undefined'
        ? process.env['NEXT_PUBLIC_APP_URL'] || 'http://localhost:3081'
        : ''

    // Use new API route facade
    const params = new URLSearchParams({
      company_id: companyId,
      customer_id: customerId,
      stock_id: stockId,
    })

    const response = await fetch(`${baseUrl}/api/product-prices?${params}`, {
      cache: 'no-store', // Always fetch fresh prices
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch price: ${response.statusText}`)
    }

    const data: ProductPriceResponse = await response.json()

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
