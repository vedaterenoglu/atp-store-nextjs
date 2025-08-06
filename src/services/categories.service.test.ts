/**
 * Categories Service Test Suite
 * SOLID Principles: Single Responsibility - Test categories service operations
 * Design Patterns: Test Pattern - Unit tests with mocking
 * Dependencies: Jest, executeGraphQLOperation mock, categories mock data
 */

import {
  getCategories,
  getCategoriesWithCache,
  clearCategoriesCache,
  getCategoryById,
  getCategoriesGrouped,
} from './categories.service'
import { executeGraphQLOperation } from '@/lib/graphql'
import {
  mockCategoriesData,
  emptyMockCategoriesData,
  singleMockCategoryData,
} from '@/mocks/graphql/categories'

// Mock dependencies
jest.mock('@/lib/graphql')
jest.mock('@/lib/config/env', () => ({
  env: {
    COMPANY_ID: 'alfe',
  },
}))

const mockExecuteGraphQLOperation =
  executeGraphQLOperation as jest.MockedFunction<typeof executeGraphQLOperation>

describe('Categories Service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    clearCategoriesCache()
  })

  describe('getCategories', () => {
    it('should fetch categories successfully with default company ID', async () => {
      mockExecuteGraphQLOperation.mockResolvedValueOnce(mockCategoriesData)

      const result = await getCategories()

      expect(mockExecuteGraphQLOperation).toHaveBeenCalledTimes(1)
      expect(mockExecuteGraphQLOperation).toHaveBeenCalledWith(
        expect.objectContaining({
          kind: 'Document',
          loc: expect.objectContaining({
            source: expect.objectContaining({
              body: expect.stringContaining('query GetCategoriesQuery'),
            }),
          }),
        }),
        { company_id: 'alfe' }
      )
      expect(result).toHaveLength(6)
      expect(result[0]).toEqual({
        id: 'PIZZA_BOXES',
        name: 'PIZZA_BOXES',
        companyId: 'alfe',
        imageUrl:
          'https://res.cloudinary.com/dnptbuf0s/image/upload/v1754299206/samples/atp-store-customer/pizza-boxes.jpg',
        altText: 'Pizza Boxes Category',
      })
    })

    it('should fetch categories with custom company ID', async () => {
      mockExecuteGraphQLOperation.mockResolvedValueOnce(mockCategoriesData)

      const result = await getCategories('custom-company')

      expect(mockExecuteGraphQLOperation).toHaveBeenCalledWith(
        expect.objectContaining({
          kind: 'Document',
        }),
        { company_id: 'custom-company' }
      )
      expect(result).toHaveLength(6)
    })

    it('should handle empty categories response', async () => {
      mockExecuteGraphQLOperation.mockResolvedValueOnce(emptyMockCategoriesData)

      const result = await getCategories()

      expect(result).toEqual([])
    })

    it('should handle network errors', async () => {
      mockExecuteGraphQLOperation.mockRejectedValueOnce(
        new Error('Network error')
      )

      await expect(getCategories()).rejects.toThrow('Network error')
    })

    it('should handle invalid response format', async () => {
      mockExecuteGraphQLOperation.mockResolvedValueOnce({
        _type_stock_groups: [{ stock_groups: 'test' }], // missing required fields
      })

      await expect(getCategories()).rejects.toThrow(
        'Invalid response format from server'
      )
    })

    it('should validate response with Zod schema', async () => {
      const invalidData = {
        _type_stock_groups: [
          {
            stock_groups: 123, // should be string
            our_company: 'alfe',
            image_url:
              'https://res.cloudinary.com/dnptbuf0s/image/upload/v1754299206/samples/atp-store-customer/alfe-fallback_nopd5j.jpg',
            alt_text: 'test',
          },
        ],
      }

      mockExecuteGraphQLOperation.mockResolvedValueOnce(invalidData)

      await expect(getCategories()).rejects.toThrow(
        'Invalid response format from server'
      )
    })
  })

  describe('getCategoriesWithCache', () => {
    // Mock Date.now() for cache testing
    const originalDateNow = Date.now
    const mockNow = jest.fn()

    beforeEach(() => {
      Date.now = mockNow
      mockNow.mockReturnValue(1000000)
    })

    afterEach(() => {
      Date.now = originalDateNow
    })

    it('should cache categories on first call', async () => {
      mockExecuteGraphQLOperation.mockResolvedValueOnce(mockCategoriesData)

      // First call - should hit the API
      const result1 = await getCategoriesWithCache()
      expect(mockExecuteGraphQLOperation).toHaveBeenCalledTimes(1)
      expect(result1).toHaveLength(13)

      // Second call - should use cache
      const result2 = await getCategoriesWithCache()
      expect(mockExecuteGraphQLOperation).toHaveBeenCalledTimes(1)
      expect(result2).toEqual(result1)
    })

    it('should refresh cache after expiration', async () => {
      mockExecuteGraphQLOperation.mockResolvedValueOnce(mockCategoriesData)

      // First call at time 1000000
      await getCategoriesWithCache()
      expect(mockExecuteGraphQLOperation).toHaveBeenCalledTimes(1)

      // Advance time beyond cache duration (5 minutes = 300000ms)
      mockNow.mockReturnValue(1000000 + 300001)

      // Second call - should hit API again
      mockExecuteGraphQLOperation.mockResolvedValueOnce(singleMockCategoryData)
      const result = await getCategoriesWithCache()

      expect(mockExecuteGraphQLOperation).toHaveBeenCalledTimes(2)
      expect(result).toHaveLength(1)
    })

    it('should handle errors and not cache them', async () => {
      mockExecuteGraphQLOperation.mockRejectedValueOnce(
        new Error('Network error')
      )

      // First call fails
      await expect(getCategoriesWithCache()).rejects.toThrow('Network error')

      // Second call should attempt to fetch again
      mockExecuteGraphQLOperation.mockResolvedValueOnce(mockCategoriesData)
      const result = await getCategoriesWithCache()

      expect(mockExecuteGraphQLOperation).toHaveBeenCalledTimes(2)
      expect(result).toHaveLength(6)
    })
  })

  describe('clearCategoriesCache', () => {
    it('should clear the cache', async () => {
      mockExecuteGraphQLOperation.mockResolvedValueOnce(mockCategoriesData)

      // Populate cache
      await getCategoriesWithCache()
      expect(mockExecuteGraphQLOperation).toHaveBeenCalledTimes(1)

      // Clear cache
      clearCategoriesCache()

      // Next call should fetch fresh data
      mockExecuteGraphQLOperation.mockResolvedValueOnce({
        _type_stock_groups: [],
      })
      const result = await getCategoriesWithCache()

      expect(mockExecuteGraphQLOperation).toHaveBeenCalledTimes(2)
      expect(result).toEqual([])
    })
  })

  describe('getCategoryById', () => {
    it('should find category by id', async () => {
      mockExecuteGraphQLOperation.mockResolvedValueOnce(mockCategoriesData)

      const result = await getCategoryById('1000 - Pizzakartonger')

      expect(result).toEqual({
        id: '1000 - Pizzakartonger',
        name: '1000 - Pizzakartonger',
        companyId: 'alfe',
        imageUrl:
          'https://res.cloudinary.com/dnptbuf0s/image/upload/v1754299206/samples/atp-store-customer/alfe-fallback_nopd5j.jpg',
        altText: 'category image',
      })
    })

    it('should return undefined for non-existent id', async () => {
      mockExecuteGraphQLOperation.mockResolvedValueOnce(mockCategoriesData)

      const result = await getCategoryById('9999 - Non-existent')

      expect(result).toBeUndefined()
    })

    it('should handle empty categories list', async () => {
      mockExecuteGraphQLOperation.mockResolvedValueOnce({
        _type_stock_groups: [],
      })

      const result = await getCategoryById('1000 - Pizzakartonger')

      expect(result).toBeUndefined()
    })
  })

  describe('getCategoriesGrouped', () => {
    it('should group categories by first character', async () => {
      mockExecuteGraphQLOperation.mockResolvedValueOnce(mockCategoriesData)

      const result = await getCategoriesGrouped()

      expect(result['1']).toBeDefined()
      expect(result['1']?.length).toBeGreaterThan(0)
      expect(result['2']).toBeDefined()
      expect(result['3']).toBeDefined()
    })

    it('should handle empty categories', async () => {
      mockExecuteGraphQLOperation.mockResolvedValueOnce({
        _type_stock_groups: [],
      })

      const result = await getCategoriesGrouped()

      expect(result).toEqual({})
    })

    it('should handle categories with same first character', async () => {
      mockExecuteGraphQLOperation.mockResolvedValueOnce({
        _type_stock_groups: [
          {
            stock_groups: 'A - First',
            our_company: 'alfe',
            image_url:
              'https://res.cloudinary.com/dnptbuf0s/image/upload/v1754299206/samples/atp-store-customer/alfe-fallback_nopd5j.jpg',
            alt_text: 'test',
          },
          {
            stock_groups: 'A - Second',
            our_company: 'alfe',
            image_url:
              'https://res.cloudinary.com/dnptbuf0s/image/upload/v1754299206/samples/atp-store-customer/alfe-fallback_nopd5j.jpg',
            alt_text: 'test',
          },
          {
            stock_groups: 'B - First',
            our_company: 'alfe',
            image_url:
              'https://res.cloudinary.com/dnptbuf0s/image/upload/v1754299206/samples/atp-store-customer/alfe-fallback_nopd5j.jpg',
            alt_text: 'test',
          },
        ],
      })

      const result = await getCategoriesGrouped()

      expect(result['A']).toHaveLength(2)
      expect(result['B']).toHaveLength(1)
      expect(result['A']?.[0]?.name).toBe('A - First')
      expect(result['A']?.[1]?.name).toBe('A - Second')
    })
  })

  describe('Edge cases and error scenarios', () => {
    it('should handle GraphQL operation returning null', async () => {
      mockExecuteGraphQLOperation.mockResolvedValueOnce(
        null as unknown as { _type_stock_groups: [] }
      )

      await expect(getCategories()).rejects.toThrow()
    })

    it('should handle malformed response structure', async () => {
      mockExecuteGraphQLOperation.mockResolvedValueOnce({
        wrong_field: [],
      } as unknown as { _type_stock_groups: [] })

      await expect(getCategories()).rejects.toThrow(
        'Invalid response format from server'
      )
    })

    it('should use proper GraphQL query structure', async () => {
      mockExecuteGraphQLOperation.mockResolvedValueOnce(mockCategoriesData)

      await getCategories()

      const callArgs = mockExecuteGraphQLOperation.mock.calls[0]
      if (!callArgs || callArgs.length < 1) {
        throw new Error('Mock was not called')
      }
      const queryDoc = callArgs[0] as { loc?: { source?: { body?: string } } }
      const query = queryDoc.loc?.source?.body || ''
      expect(query).toContain('query GetCategoriesQuery')
      expect(query).toContain('_type_stock_groups')
      expect(query).toContain('order_by: { stock_groups: asc }')
      expect(query).toContain('where: { our_company: { _eq: $company_id }')
      expect(query).toContain('willBeListed: { _eq: true }')
      expect(query).toContain('stock_groups')
      expect(query).toContain('our_company')
      expect(query).toContain('image_url')
      expect(query).toContain('alt_text')
    })
  })
})
