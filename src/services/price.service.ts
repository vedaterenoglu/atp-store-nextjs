/**
 * Price Service - Fetches product pricing information
 *
 * SOLID Principles: SRP - Single responsibility for price operations
 * Design Patterns: Service Layer Pattern, Repository Pattern
 * Dependencies: Apollo Client, Zod validation, price schemas
 */

import { getClient } from '@/lib/apollo/client'
import GetProductPricesQueryDocument from '@/services/graphql/queries/GetProductPricesQuery.graphql'
import { validateGetProductPricesResponse } from '@/services/graphql/queries/GetProductPricesQuery.schema'
import type {
  GetProductPricesQueryResponse,
  GetProductPricesQueryVariables,
} from '@/services/graphql/queries/GetProductPricesQuery.types'
import { env } from '@/lib/config/env'

/**
 * Interface for calculated price result
 */
export interface ProductPriceResult {
  basePrice: number | null
  customerPrice: number | null
  campaignPrice: number | null
  finalPrice: number | null
  isCampaignActive: boolean
  priceClass: string | null
}

/**
 * Fetch product prices using Apollo Client
 * Returns all price information for a specific product and customer
 */
export async function getProductPrices(
  stockId: string,
  customerId: string,
  companyId?: string
): Promise<GetProductPricesQueryResponse> {
  try {
    const client = getClient()
    const { data } = await client.query<
      GetProductPricesQueryResponse,
      GetProductPricesQueryVariables
    >({
      query: GetProductPricesQueryDocument,
      variables: {
        company_id: companyId || env.COMPANY_ID || 'alfe',
        customer_id: customerId,
        stock_id: stockId,
      },
    })

    // Validate the response structure with Zod
    return validateGetProductPricesResponse(data)
  } catch (error) {
    console.error('Error fetching product prices:', error)
    throw new Error('Failed to fetch product prices')
  }
}

/**
 * Calculate the final price for a customer
 * Considers customer-specific price, price class, and campaigns
 */
export async function calculateCustomerPrice(
  stockId: string,
  customerId: string,
  companyId?: string
): Promise<ProductPriceResult> {
  const priceData = await getProductPrices(stockId, customerId, companyId)

  const stock = priceData.stock[0]
  const customerPriceList = priceData.customer_price_list[0]
  const customer = priceData.customers[0]

  if (!stock) {
    return {
      basePrice: null,
      customerPrice: null,
      campaignPrice: null,
      finalPrice: null,
      isCampaignActive: false,
      priceClass: null,
    }
  }

  // Get base price
  const basePrice = stock.stock_price

  // Get customer-specific price if available
  const customerPrice = customerPriceList?.customers_price || null

  // Get campaign price if active
  const campaignPrice =
    stock.is_campaign_active && stock.campaign_price
      ? stock.campaign_price
      : null

  // Get price based on customer class
  const priceClass = customer?.customer_price_class?.toLowerCase() || null
  let classPriceField: keyof typeof stock | null = null

  if (priceClass) {
    // Map price class to field name
    const priceClassMap: Record<string, keyof typeof stock> = {
      a: 'stock_price_a',
      b: 'stock_price_b',
      c: 'stock_price_c',
      d: 'stock_price_d',
      s: 'stock_price_s',
      hra: 'stock_price_hra',
      hrb: 'stock_price_hrb',
      hrc: 'stock_price_hrc',
      hrd: 'stock_price_hrd',
      z: 'stock_price_z',
    }
    classPriceField = priceClassMap[priceClass] || null
  }

  const classPrice = classPriceField ? stock[classPriceField] : null

  // Calculate final price (priority: campaign > customer-specific > class > base)
  let finalPrice = basePrice

  if (campaignPrice && campaignPrice > 0) {
    finalPrice = campaignPrice
  } else if (customerPrice && customerPrice > 0) {
    finalPrice = customerPrice
  } else if (classPrice && typeof classPrice === 'number' && classPrice > 0) {
    finalPrice = classPrice
  }

  return {
    basePrice,
    customerPrice,
    campaignPrice,
    finalPrice,
    isCampaignActive: stock.is_campaign_active || false,
    priceClass,
  }
}

/**
 * Calculate discount percentage between original and discounted price
 * Returns an integer percentage value (e.g., 25 for 25% discount)
 * @param originalPrice - Original price in öre
 * @param discountedPrice - Discounted price in öre
 * @returns Integer percentage discount or 0 if no discount
 */
export function calculateDiscountPercentage(
  originalPrice: number,
  discountedPrice: number
): number {
  // Return 0 if original price is invalid
  if (originalPrice <= 0) {
    return 0
  }

  // Return 0 if no discount (prices are equal or discounted is higher)
  if (discountedPrice >= originalPrice) {
    return 0
  }

  // Handle FREE products (campaign_price = 0)
  if (discountedPrice === 0) {
    return 100
  }

  // Calculate percentage and round to integer
  const discount = ((originalPrice - discountedPrice) / originalPrice) * 100
  return Math.round(discount)
}

/**
 * Get bulk prices for multiple products
 * Useful for cart or product list calculations
 */
export async function getBulkProductPrices(
  stockIds: string[],
  customerId: string,
  companyId?: string
): Promise<Map<string, ProductPriceResult>> {
  const priceMap = new Map<string, ProductPriceResult>()

  // Fetch prices in parallel
  const pricePromises = stockIds.map(stockId =>
    calculateCustomerPrice(stockId, customerId, companyId).then(price => ({
      stockId,
      price,
    }))
  )

  const results = await Promise.allSettled(pricePromises)

  results.forEach(result => {
    if (result.status === 'fulfilled') {
      priceMap.set(result.value.stockId, result.value.price)
    }
  })

  return priceMap
}
