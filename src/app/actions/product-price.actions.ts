/**
 * Server Actions for product price operations
 * SOLID Principles: SRP - Single responsibility for server-side price fetching
 * Design Patterns: Server Action Pattern, Facade Pattern
 * Dependencies: Product price service
 */

'use server'

import {
  fetchProductPrice,
  fetchMultipleProductPrices,
} from '@/services/product-price.service'
import type { PriceCalculation } from '@/lib/utils/pricing'

/**
 * Server Action to fetch single product price
 * Runs on server where HASURA_GRAPHQL_ADMIN_SECRET is available
 */
export async function fetchProductPriceAction(
  companyId: string,
  customerId: string,
  stockId: string
): Promise<PriceCalculation> {
  try {
    return await fetchProductPrice(companyId, customerId, stockId)
  } catch (error) {
    console.error('Server Action: Failed to fetch product price:', error)
    throw new Error('Failed to fetch product price from server')
  }
}

/**
 * Server Action to fetch multiple product prices
 * Runs on server for batch price fetching
 */
export async function fetchMultipleProductPricesAction(
  companyId: string,
  customerId: string,
  stockIds: string[]
): Promise<Record<string, PriceCalculation>> {
  try {
    const priceMap = await fetchMultipleProductPrices(
      companyId,
      customerId,
      stockIds
    )
    // Convert Map to plain object for serialization
    const priceObject: Record<string, PriceCalculation> = {}
    priceMap.forEach((value, key) => {
      priceObject[key] = value
    })
    return priceObject
  } catch (error) {
    console.error('Server Action: Failed to fetch multiple prices:', error)
    throw new Error('Failed to fetch product prices from server')
  }
}
