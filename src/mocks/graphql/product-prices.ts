/**
 * Mock data for GetProductPricesQuery
 *
 * SOLID Principles: SRP - Single responsibility for price mock data
 * Design Patterns: Mock Data Pattern with validation
 * Dependencies: Zod schemas, TypeScript types
 */

import { GetProductPricesQueryResponseSchema } from '@/services/graphql/queries/GetProductPricesQuery.schema'
import type { GetProductPricesQueryResponse } from '@/services/graphql/queries/GetProductPricesQuery.types'

/**
 * Default mock data for product prices
 * Based on actual Hasura response
 */
const rawMockProductPricesData: GetProductPricesQueryResponse = {
  stock: [
    {
      stock_price: 25000,
      stock_price_a: 19000,
      stock_price_b: 19000,
      stock_price_c: 19000,
      stock_price_d: 19000,
      stock_price_s: 19000,
      stock_price_hra: 19000,
      stock_price_hrb: 19000,
      stock_price_hrc: 19000,
      stock_price_hrd: 19000,
      stock_price_z: 19000,
      campaign_price: 0,
      is_campaign_active: false,
    },
  ],
  customer_price_list: [
    {
      customers_price: 18500,
    },
  ],
  customers: [
    {
      customer_price_class: 'c',
    },
  ],
}

/**
 * Validated mock data - validated at module load time
 */
export const mockProductPricesData: GetProductPricesQueryResponse =
  GetProductPricesQueryResponseSchema.parse(rawMockProductPricesData)

/**
 * Mock data with active campaign
 */
export const mockProductPricesWithCampaign: GetProductPricesQueryResponse =
  GetProductPricesQueryResponseSchema.parse({
    stock: [
      {
        stock_price: 25000,
        stock_price_a: 19000,
        stock_price_b: 19000,
        stock_price_c: 19000,
        stock_price_d: 19000,
        stock_price_s: 19000,
        stock_price_hra: 19000,
        stock_price_hrb: 19000,
        stock_price_hrc: 19000,
        stock_price_hrd: 19000,
        stock_price_z: 19000,
        campaign_price: 15000,
        is_campaign_active: true,
      },
    ],
    customer_price_list: [
      {
        customers_price: 18500,
      },
    ],
    customers: [
      {
        customer_price_class: 'c',
      },
    ],
  })

/**
 * Mock data with no customer price
 */
export const mockProductPricesNoCustomerPrice: GetProductPricesQueryResponse =
  GetProductPricesQueryResponseSchema.parse({
    stock: [
      {
        stock_price: 25000,
        stock_price_a: 19000,
        stock_price_b: 19000,
        stock_price_c: 19000,
        stock_price_d: 19000,
        stock_price_s: 19000,
        stock_price_hra: 19000,
        stock_price_hrb: 19000,
        stock_price_hrc: 19000,
        stock_price_hrd: 19000,
        stock_price_z: 19000,
        campaign_price: null,
        is_campaign_active: false,
      },
    ],
    customer_price_list: [],
    customers: [
      {
        customer_price_class: 'a',
      },
    ],
  })

/**
 * Mock data with all null prices (product without pricing)
 */
export const mockProductPricesAllNull: GetProductPricesQueryResponse =
  GetProductPricesQueryResponseSchema.parse({
    stock: [
      {
        stock_price: null,
        stock_price_a: null,
        stock_price_b: null,
        stock_price_c: null,
        stock_price_d: null,
        stock_price_s: null,
        stock_price_hra: null,
        stock_price_hrb: null,
        stock_price_hrc: null,
        stock_price_hrd: null,
        stock_price_z: null,
        campaign_price: null,
        is_campaign_active: null,
      },
    ],
    customer_price_list: [],
    customers: [],
  })

/**
 * Empty response (product not found)
 */
export const mockProductPricesEmpty: GetProductPricesQueryResponse =
  GetProductPricesQueryResponseSchema.parse({
    stock: [],
    customer_price_list: [],
    customers: [],
  })

/**
 * Factory function to create custom mock data
 */
export function createMockProductPricesData(
  overrides?: Partial<GetProductPricesQueryResponse>
): GetProductPricesQueryResponse {
  const data = {
    ...mockProductPricesData,
    ...overrides,
  }

  // Validate the custom mock data
  return GetProductPricesQueryResponseSchema.parse(data)
}
