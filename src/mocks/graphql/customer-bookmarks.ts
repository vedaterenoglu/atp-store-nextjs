/**
 * Mock data for GetCustomerBookmarksQuery
 *
 * SOLID Principles: SRP - Single responsibility for bookmark mock data
 * Design Patterns: Mock Data Pattern with validation
 * Dependencies: Zod schemas, TypeScript types
 */

import type { GetCustomerBookmarksQueryResponse } from '@/services/graphql/queries/GetCustomerBookmarksQuery.types'

/**
 * Sample of actual customer bookmarks data from Hasura
 */
export const mockCustomerBookmarksData: GetCustomerBookmarksQueryResponse = {
  customer_bookmarks: [
    {
      company_id: 'alfe',
      customer_id: 'SE0 1001 1086',
      stock_id: '1001 1001 0026',
      stock: {
        stock_id: '1001 1001 0026',
        stock_name: 'Pizzakartonger 26*26*3,5 100 st./förp.',
        stock_price: 299.99,
        stock_unit: 'st./förp.',
        stock_group: 'Pizza Boxes',
        stock_image_link: '/images/products/pizza-box-26.jpg',
      },
    },
    {
      company_id: 'alfe',
      customer_id: 'SE0 1001 1086',
      stock_id: '1001 1005 T030',
      stock: {
        stock_id: '1001 1005 T030',
        stock_name: 'Pizzakrtong 30*30*3,5 Tillfällig Besök100 st./förp.',
        stock_price: 349.99,
        stock_unit: 'st./förp.',
        stock_group: 'Pizza Boxes',
        stock_image_link: '/images/products/pizza-box-30.jpg',
      },
    },
    {
      company_id: 'alfe',
      customer_id: 'SE0 1001 1086',
      stock_id: '1001 1007 R033',
      stock: {
        stock_id: '1001 1007 R033',
        stock_name: 'Pizzakrtong 33*33*3,5 Premium 100 st./förp.',
        stock_price: 399.99,
        stock_unit: 'st./förp.',
        stock_group: 'Pizza Boxes',
        stock_image_link: '/images/products/pizza-box-33.jpg',
      },
    },
    {
      company_id: 'alfe',
      customer_id: 'SE0 1001 1086',
      stock_id: '1501 1007 0006',
      stock: {
        stock_id: '1501 1007 0006',
        stock_name: 'Hamburgareficka PREMIUM 500 st./förp.',
        stock_price: 199.99,
        stock_unit: 'st./förp.',
        stock_group: 'Burger Packaging',
        stock_image_link: '/images/products/burger-pocket.jpg',
      },
    },
  ],
}

/**
 * Empty bookmarks response for testing empty states
 */
export const mockCustomerBookmarksEmpty: GetCustomerBookmarksQueryResponse = {
  customer_bookmarks: [],
}

/**
 * Single bookmark for testing
 */
export const mockCustomerBookmarksSingle: GetCustomerBookmarksQueryResponse = {
  customer_bookmarks: [
    {
      company_id: 'alfe',
      customer_id: 'SE0 1001 1086',
      stock_id: '1001 1001 0026',
      stock: {
        stock_id: '1001 1001 0026',
        stock_name: 'Pizzakartonger 26*26*3,5 100 st./förp.',
        stock_price: 299.99,
        stock_unit: 'st./förp.',
        stock_group: 'Pizza Boxes',
        stock_image_link: '/images/products/pizza-box-26.jpg',
      },
    },
  ],
}

/**
 * Factory function to create custom mock data
 */
export function createMockCustomerBookmarksData(
  overrides?: Partial<GetCustomerBookmarksQueryResponse>
): GetCustomerBookmarksQueryResponse {
  return {
    ...mockCustomerBookmarksData,
    ...overrides,
  }
}
