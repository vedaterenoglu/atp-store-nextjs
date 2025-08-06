/**
 * Mock data for GetProductsListWithPriceQuery
 * SOLID Principles: SRP - Single responsibility for product mock data
 * Design Patterns: Factory Pattern for mock generation
 * Dependencies: Zod schemas for validation, generated GraphQL types
 */

import type { GetProductsListWithPriceQueryQuery } from '@/lib/generated/graphql'
import { GetProductsListWithPriceQueryResponseSchema } from '@/lib/graphql/schemas/products'

/**
 * Mock products data that satisfies both TypeScript and Zod validation
 * This data is validated at module load time to ensure consistency
 */
export const mockProductsData: GetProductsListWithPriceQueryQuery = {
  stock: [
    {
      stock_group: 'PIZZA_BOXES',
      stock_id: '1001',
      stock_name: 'Pizza Box Large',
      stock_unit: 'pcs',
      stock_price: 15.99,
    },
    {
      stock_group: 'PIZZA_BOXES',
      stock_id: '1002',
      stock_name: 'Pizza Box Medium',
      stock_unit: 'pcs',
      stock_price: 12.99,
    },
    {
      stock_group: 'PIZZA_BOXES',
      stock_id: '1003',
      stock_name: 'Pizza Box Small',
      stock_unit: 'pcs',
      stock_price: 9.99,
    },
    {
      stock_group: 'NAPKINS',
      stock_id: '2001',
      stock_name: 'Napkins White Pack',
      stock_unit: 'pack',
      stock_price: 5.99,
    },
    {
      stock_group: 'NAPKINS',
      stock_id: '2002',
      stock_name: 'Napkins Brown Pack',
      stock_unit: 'pack',
      stock_price: 5.49,
    },
    {
      stock_group: 'CUPS',
      stock_id: '3001',
      stock_name: 'Plastic Cups Large',
      stock_unit: 'pack',
      stock_price: 8.99,
    },
    {
      stock_group: 'CUPS',
      stock_id: '3002',
      stock_name: 'Plastic Cups Medium',
      stock_unit: 'pack',
      stock_price: 7.49,
    },
    {
      stock_group: 'BAGS',
      stock_id: '4001',
      stock_name: 'Delivery Bags Large',
      stock_unit: 'pcs',
      stock_price: 3.99,
    },
    {
      stock_group: 'BAGS',
      stock_id: '4002',
      stock_name: 'Delivery Bags Small',
      stock_unit: 'pcs',
      stock_price: 2.99,
    },
    {
      stock_group: 'CONTAINERS',
      stock_id: '5001',
      stock_name: 'Food Container Large',
      stock_unit: 'pack',
      stock_price: 10.99,
    },
    {
      stock_group: 'CONTAINERS',
      stock_id: '5002',
      stock_name: 'Food Container Medium',
      stock_unit: 'pack',
      stock_price: 8.99,
    },
    {
      stock_group: 'CUTLERY',
      stock_id: '6001',
      stock_name: 'Plastic Fork Pack',
      stock_unit: 'pack',
      stock_price: 4.99,
    },
    {
      stock_group: 'CUTLERY',
      stock_id: '6002',
      stock_name: 'Plastic Knife Pack',
      stock_unit: 'pack',
      stock_price: 4.99,
    },
  ],
}

/**
 * Validate mock data at module load time
 * This ensures the mock data always matches our schema
 */
try {
  GetProductsListWithPriceQueryResponseSchema.parse(mockProductsData)
} catch (error) {
  console.error('Mock products data validation failed:', error)
  throw new Error('Invalid mock data for products')
}

/**
 * Factory function to create custom mock data
 * Useful for testing different scenarios
 */
export function createMockProductsData(
  overrides?: Partial<GetProductsListWithPriceQueryQuery>
): GetProductsListWithPriceQueryQuery {
  const data = {
    ...mockProductsData,
    ...overrides,
  }
  
  // Validate the custom mock data
  return GetProductsListWithPriceQueryResponseSchema.parse(data)
}

/**
 * Empty products response for testing empty states
 */
export const emptyMockProductsData: GetProductsListWithPriceQueryQuery = {
  stock: [],
}

/**
 * Single product response for testing minimal data
 */
export const singleMockProductData: GetProductsListWithPriceQueryQuery = {
  stock: [
    {
      stock_group: 'TEST_CATEGORY',
      stock_id: 'TEST001',
      stock_name: 'Test Product',
      stock_unit: 'pcs',
      stock_price: 9.99,
    },
  ],
}

/**
 * Products with invalid price for testing validation
 */
export const invalidPriceMockData = {
  stock: [
    {
      stock_group: 'TEST',
      stock_id: 'TEST001',
      stock_name: 'Test Product',
      stock_unit: 'pcs',
      stock_price: -10, // Invalid negative price
    },
  ],
}