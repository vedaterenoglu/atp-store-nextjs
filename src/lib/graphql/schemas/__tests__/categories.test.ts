/**
 * Categories Schema Test
 * SOLID Principles: SRP - Single responsibility for testing category schemas
 * Design Patterns: Test Pattern
 * Dependencies: Jest, Zod schemas
 */

import { describe, it, expect } from '@jest/globals'
import { GetCategoriesQueryResponseSchema } from '@/services/graphql/queries/GetCategoriesQuery.schema'
import type {
  CategoryItem,
  GetCategoriesQueryResponse,
} from '@/services/graphql/queries/GetCategoriesQuery.types'
import mockCategoriesData from '@/mock/categories.json'

describe('Categories Schema Definitions', () => {
  // Transform mock data to match GraphQL response structure
  const realMockData = {
    _type_stock_groups: mockCategoriesData,
  }

  describe('GetCategoriesQueryResponseSchema', () => {
    it('should validate valid category response data', () => {
      const validData: GetCategoriesQueryResponse = {
        _type_stock_groups: [
          {
            stock_groups: 'ELECTRONICS',
            our_company: 'alfe',
            image_url: '/images/electronics.jpg',
            alt_text: 'Electronics category',
          },
        ],
      }

      const result = GetCategoriesQueryResponseSchema.safeParse(validData)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data._type_stock_groups).toHaveLength(1)
        expect(result.data._type_stock_groups[0]?.stock_groups).toBe(
          'ELECTRONICS'
        )
      }
    })

    it('should validate real mock data from categories.json', () => {
      const result = GetCategoriesQueryResponseSchema.safeParse(realMockData)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data._type_stock_groups).toBeDefined()
        expect(Array.isArray(result.data._type_stock_groups)).toBe(true)
      }
    })

    it('should handle nullable fields', () => {
      const dataWithNulls: GetCategoriesQueryResponse = {
        _type_stock_groups: [
          {
            stock_groups: 'FURNITURE',
            our_company: 'alfe',
            image_url: null,
            alt_text: null,
          },
        ],
      }

      const result = GetCategoriesQueryResponseSchema.safeParse(dataWithNulls)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data._type_stock_groups[0]?.image_url).toBeNull()
        expect(result.data._type_stock_groups[0]?.alt_text).toBeNull()
      }
    })

    it('should reject invalid data structure', () => {
      const invalidData = {
        categories: [], // Wrong field name
      }

      const result = GetCategoriesQueryResponseSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should reject data with missing required fields', () => {
      const invalidData = {
        _type_stock_groups: [
          {
            // Missing stock_groups field
            our_company: 'alfe',
            image_url: '/image.jpg',
            alt_text: 'Alt text',
          },
        ],
      }

      const result = GetCategoriesQueryResponseSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })

  describe('CategoryItem Type', () => {
    it('should have correct type structure', () => {
      const category: CategoryItem = {
        stock_groups: 'TEST_CATEGORY',
        our_company: 'alfe',
        image_url: '/test.jpg',
        alt_text: 'Test category',
      }

      expect(category.stock_groups).toBe('TEST_CATEGORY')
      expect(category.our_company).toBe('alfe')
      expect(category.image_url).toBe('/test.jpg')
      expect(category.alt_text).toBe('Test category')
    })

    it('should allow null values for optional fields', () => {
      const category: CategoryItem = {
        stock_groups: 'TEST',
        our_company: 'alfe',
        image_url: null,
        alt_text: null,
      }

      expect(category.image_url).toBeNull()
      expect(category.alt_text).toBeNull()
    })
  })
})
