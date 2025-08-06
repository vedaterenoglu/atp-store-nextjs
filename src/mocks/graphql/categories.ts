/**
 * Mock data for GetCategoriesQuery
 * SOLID Principles: SRP - Single responsibility for category mock data
 * Design Patterns: Factory Pattern for mock generation
 * Dependencies: Zod schemas for validation, generated GraphQL types
 */

import type { GetCategoriesQueryQuery } from '@/lib/generated/graphql'
import { GetCategoriesQueryResponseSchema } from '@/lib/graphql/schemas/categories'

/**
 * Mock categories data that satisfies both TypeScript and Zod validation
 * This data is validated at module load time to ensure consistency
 */
export const mockCategoriesData: GetCategoriesQueryQuery = {
  _type_stock_groups: [
    {
      stock_groups: 'PIZZA_BOXES',
      our_company: 'alfe',
      image_url: 'https://res.cloudinary.com/dnptbuf0s/image/upload/v1754299206/samples/atp-store-customer/pizza-boxes.jpg',
      alt_text: 'Pizza Boxes Category',
    },
    {
      stock_groups: 'NAPKINS',
      our_company: 'alfe',
      image_url: 'https://res.cloudinary.com/dnptbuf0s/image/upload/v1754299206/samples/atp-store-customer/napkins.jpg',
      alt_text: 'Napkins Category',
    },
    {
      stock_groups: 'CUPS',
      our_company: 'alfe',
      image_url: 'https://res.cloudinary.com/dnptbuf0s/image/upload/v1754299206/samples/atp-store-customer/cups.jpg',
      alt_text: 'Cups Category',
    },
    {
      stock_groups: 'BAGS',
      our_company: 'alfe',
      image_url: 'https://res.cloudinary.com/dnptbuf0s/image/upload/v1754299206/samples/atp-store-customer/bags.jpg',
      alt_text: 'Bags Category',
    },
    {
      stock_groups: 'CONTAINERS',
      our_company: 'alfe',
      image_url: 'https://res.cloudinary.com/dnptbuf0s/image/upload/v1754299206/samples/atp-store-customer/containers.jpg',
      alt_text: 'Food Containers Category',
    },
    {
      stock_groups: 'CUTLERY',
      our_company: 'alfe',
      image_url: 'https://res.cloudinary.com/dnptbuf0s/image/upload/v1754299206/samples/atp-store-customer/cutlery.jpg',
      alt_text: 'Cutlery Category',
    },
  ],
}

/**
 * Validate mock data at module load time
 * This ensures the mock data always matches our schema
 */
try {
  GetCategoriesQueryResponseSchema.parse(mockCategoriesData)
} catch (error) {
  console.error('Mock categories data validation failed:', error)
  throw new Error('Invalid mock data for categories')
}

/**
 * Factory function to create custom mock data
 * Useful for testing different scenarios
 */
export function createMockCategoriesData(
  overrides?: Partial<GetCategoriesQueryQuery>
): GetCategoriesQueryQuery {
  const data = {
    ...mockCategoriesData,
    ...overrides,
  }
  
  // Validate the custom mock data
  return GetCategoriesQueryResponseSchema.parse(data)
}

/**
 * Empty categories response for testing empty states
 */
export const emptyMockCategoriesData: GetCategoriesQueryQuery = {
  _type_stock_groups: [],
}

/**
 * Single category response for testing minimal data
 */
export const singleMockCategoryData: GetCategoriesQueryQuery = {
  _type_stock_groups: [
    {
      stock_groups: 'TEST_CATEGORY',
      our_company: 'alfe',
      image_url: 'https://res.cloudinary.com/dnptbuf0s/image/upload/v1754299206/samples/atp-store-customer/test.jpg',
      alt_text: 'Test Category',
    },
  ],
}