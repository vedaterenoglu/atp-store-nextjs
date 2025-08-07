/**
 * Mock data for GetProductsListWithPriceQuery with manual workflow
 *
 * SOLID Principles: SRP - Single responsibility for product mock data
 * Design Patterns: Mock Data Pattern with validation
 * Dependencies: Zod schemas, TypeScript types
 */

import { GetProductsListWithPriceQueryResponseSchema } from '@/services/graphql/queries/GetProductsListWithPriceQuery.schema'
import type { GetProductsListWithPriceQueryResponse } from '@/services/graphql/queries/GetProductsListWithPriceQuery.types'

/**
 * Sample of actual product data from Hasura
 * Validated at module load time
 */
export const mockProductsData: GetProductsListWithPriceQueryResponse =
  GetProductsListWithPriceQueryResponseSchema.parse({
    stock: [
      {
        stock_group: '1000 - Pizzakartonger',
        stock_id: '1001 1008 0040',
        stock_name: 'Pizzakartong 40*40*4 50 st./förp.',
        stock_unit: 'förp.',
        stock_price: 23000,
      },
      {
        stock_group: '1000 - Pizzakartonger',
        stock_id: '1001 1003 G030',
        stock_name: 'Pizzakartong 30*30*3,5 Röd 100 st./förp.',
        stock_unit: 'förp.',
        stock_price: 21300,
      },
      {
        stock_group: '1000 - Pizzakartonger',
        stock_id: '1001 1007 R033',
        stock_name: 'Pizzakrtong 33*33*3,5 Premium 100 st./förp.',
        stock_unit: 'förp.',
        stock_price: 23900,
      },
      {
        stock_group: '1500 - Wellpap & Smörpapper',
        stock_id: '1501 1005 0004',
        stock_name: 'Kebabficka',
        stock_unit: 'förp.',
        stock_price: 48000,
      },
      {
        stock_group: '1500 - Wellpap & Smörpapper',
        stock_id: '1501 1007 0006',
        stock_name: 'Hamburgareficka PREMIUM 500 st./förp.',
        stock_unit: 'förp.',
        stock_price: 19900,
      },
      {
        stock_group: '1600 - Hygienpapper',
        stock_id: '1601 1007 0007',
        stock_name: 'Toalettpapper Midi-Jumbo 6 st/förp.',
        stock_unit: 'förp.',
        stock_price: 23500,
      },
      {
        stock_group: '1600 - Hygienpapper',
        stock_id: '1601 1004 0004',
        stock_name: 'Mellanrulle 6 st./kolli',
        stock_unit: 'kolli',
        stock_price: 32900,
      },
      {
        stock_group: '2000 - Bägare',
        stock_id: '2001 1001 P200',
        stock_name: 'Salladsbägare med Lock ACK 200 ml 400 st/.kolli',
        stock_unit: 'förp.',
        stock_price: 29900,
      },
      {
        stock_group: '2000 - Bägare',
        stock_id: '2001 1006 0030',
        stock_name: 'Såsbägare med Lock 30 ml',
        stock_unit: 'kolli',
        stock_price: 36000,
      },
      {
        stock_group: '2500 - Micro- & Sallad Förpackningar',
        stock_id: '2501 2001 0001',
        stock_name: 'Salladsskål Bagasse 160 st. / förp.',
        stock_unit: 'förp.',
        stock_price: 69900,
      },
      {
        stock_group: '3000 - Avhämtningslådor PAP/BAGASSE',
        stock_id: '1501 1004 0003',
        stock_name: 'Pappershämtboxar ACK',
        stock_unit: 'kolli',
        stock_price: 58500,
      },
      {
        stock_group: '4000 - Servetter & Ljus',
        stock_id: '4001 1007 0008',
        stock_name: 'Servetter 3L 40*40 Mörkblå 3-Lag 1000 pack VIKTA',
        stock_unit: 'förp.',
        stock_price: 58000,
      },
      {
        stock_group: '5000 - Folie & Film',
        stock_id: '5001 1002 0045',
        stock_name: 'Aluminiumfolie 45 cm',
        stock_unit: 'st.',
        stock_price: 19900,
      },
    ],
  })

/**
 * Empty products response for testing empty states
 */
export const mockProductsEmpty: GetProductsListWithPriceQueryResponse =
  GetProductsListWithPriceQueryResponseSchema.parse({
    stock: [],
  })

/**
 * Products with null prices
 */
export const mockProductsWithNullPrices: GetProductsListWithPriceQueryResponse =
  GetProductsListWithPriceQueryResponseSchema.parse({
    stock: [
      {
        stock_group: 'TEST',
        stock_id: 'TEST001',
        stock_name: 'Test Product Without Price',
        stock_unit: null,
        stock_price: null,
      },
      {
        stock_group: 'TEST',
        stock_id: 'TEST002',
        stock_name: null,
        stock_unit: 'pcs',
        stock_price: 10000,
      },
    ],
  })

/**
 * Factory function to create custom mock data
 */
export function createMockProductsData(
  overrides?: Partial<GetProductsListWithPriceQueryResponse>
): GetProductsListWithPriceQueryResponse {
  const data = {
    ...mockProductsData,
    ...overrides,
  }

  // Validate the custom mock data
  return GetProductsListWithPriceQueryResponseSchema.parse(data)
}

/**
 * Get products by category from mock data
 */
export function getMockProductsByCategory(category: string) {
  return mockProductsData.stock.filter(
    product => product.stock_group === category
  )
}
