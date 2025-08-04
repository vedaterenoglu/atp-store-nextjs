/**
 * Unit Tests for Categories Service
 * SOLID Principles: Single Responsibility - Testing categories service functionality
 * Design Patterns: Test Pattern with comprehensive mocks
 * Dependencies: Jest, mock data, GraphQL client mock
 */

import {
  getCategories,
  getCategoriesWithCache,
  clearCategoriesCache,
  getCategoryByStockGroup,
  getCategoriesGrouped,
} from './categories.service'
import { executeGraphQLOperation } from '@/lib/graphql/client'
import mockCategoriesData from '@/mock/categories.json'

// Mock the GraphQL client
jest.mock('@/lib/graphql/client')

// Mock console.error to avoid noise in tests
const originalConsoleError = console.error
beforeAll(() => {
  console.error = jest.fn()
})
afterAll(() => {
  console.error = originalConsoleError
})

describe('Categories Service', () => {
  const mockExecuteGraphQLOperation =
    executeGraphQLOperation as jest.MockedFunction<
      typeof executeGraphQLOperation
    >

  beforeEach(() => {
    jest.clearAllMocks()
    // Clear cache before each test
    clearCategoriesCache()
    // Reset Date.now mock
    jest.spyOn(Date, 'now').mockRestore()
  })

  describe('getCategories', () => {
    it('should fetch categories successfully with default company ID', async () => {
      mockExecuteGraphQLOperation.mockResolvedValueOnce(mockCategoriesData.data)

      const result = await getCategories()

      expect(mockExecuteGraphQLOperation).toHaveBeenCalledWith(
        expect.stringContaining('query GetCategoriesQuery'),
        { company_id: 'alfe' }
      )
      expect(result).toHaveLength(13)
      expect(result[0]).toEqual({
        stock_groups: '1000 - Pizzakartonger',
        our_company: 'alfe',
        image_url:
          'https://res.cloudinary.com/dnptbuf0s/image/upload/v1754299206/samples/atp-store-customer/alfe-fallback_nopd5j.jpg',
        alt_text: 'category image',
      })
    })

    it('should fetch categories with custom company ID', async () => {
      const customCompanyId = 'custom-company'
      mockExecuteGraphQLOperation.mockResolvedValueOnce(mockCategoriesData.data)

      const result = await getCategories(customCompanyId)

      expect(mockExecuteGraphQLOperation).toHaveBeenCalledWith(
        expect.any(String),
        { company_id: customCompanyId }
      )
      expect(result).toHaveLength(13)
    })

    it('should handle empty response', async () => {
      mockExecuteGraphQLOperation.mockResolvedValueOnce({
        _type_stock_groups: [],
      })

      const result = await getCategories()

      expect(result).toEqual([])
    })

    it('should throw error for invalid response structure', async () => {
      mockExecuteGraphQLOperation.mockResolvedValueOnce({
        invalid_field: 'invalid',
      })

      await expect(getCategories()).rejects.toThrow(
        'Invalid response format from server'
      )
      expect(console.error).toHaveBeenCalledWith(
        'Response validation failed:',
        expect.any(Error)
      )
    })

    it('should handle Zod validation error with missing fields', async () => {
      mockExecuteGraphQLOperation.mockResolvedValueOnce({
        _type_stock_groups: [{ stock_groups: 'test' }], // missing required fields
      })

      await expect(getCategories()).rejects.toThrow(
        'Invalid response format from server'
      )
    })

    it('should re-throw non-Zod errors', async () => {
      const networkError = new Error('Network error')
      mockExecuteGraphQLOperation.mockRejectedValueOnce(networkError)

      await expect(getCategories()).rejects.toThrow('Network error')
    })

    it('should handle GraphQL errors', async () => {
      const graphQLError = new Error('GraphQL error')
      mockExecuteGraphQLOperation.mockRejectedValueOnce(graphQLError)

      await expect(getCategories()).rejects.toThrow('GraphQL error')
    })
  })

  describe('getCategoriesWithCache', () => {
    it('should fetch fresh data when cache is empty', async () => {
      mockExecuteGraphQLOperation.mockResolvedValueOnce(mockCategoriesData.data)

      const result = await getCategoriesWithCache()

      expect(mockExecuteGraphQLOperation).toHaveBeenCalledTimes(1)
      expect(result).toHaveLength(13)
    })

    it('should return cached data when cache is fresh', async () => {
      // First call - populate cache
      mockExecuteGraphQLOperation.mockResolvedValueOnce(mockCategoriesData.data)
      const firstResult = await getCategoriesWithCache()

      // Second call - should use cache
      const secondResult = await getCategoriesWithCache()

      expect(mockExecuteGraphQLOperation).toHaveBeenCalledTimes(1)
      expect(secondResult).toEqual(firstResult)
    })

    it('should fetch fresh data when cache is expired', async () => {
      // Mock Date.now
      let currentTime = 1000000
      jest.spyOn(Date, 'now').mockImplementation(() => currentTime)

      // First call - populate cache
      mockExecuteGraphQLOperation.mockResolvedValueOnce(mockCategoriesData.data)
      await getCategoriesWithCache()

      // Advance time beyond cache duration (5 minutes)
      currentTime += 6 * 60 * 1000

      // Second call - should fetch fresh data
      mockExecuteGraphQLOperation.mockResolvedValueOnce({
        _type_stock_groups: [mockCategoriesData.data._type_stock_groups[0]!],
      })
      const result = await getCategoriesWithCache()

      expect(mockExecuteGraphQLOperation).toHaveBeenCalledTimes(2)
      expect(result).toHaveLength(1)
    })

    it('should handle errors and not cache them', async () => {
      const error = new Error('Fetch error')
      mockExecuteGraphQLOperation.mockRejectedValueOnce(error)

      await expect(getCategoriesWithCache()).rejects.toThrow('Fetch error')

      // Second call should attempt to fetch again
      mockExecuteGraphQLOperation.mockResolvedValueOnce(mockCategoriesData.data)
      const result = await getCategoriesWithCache()

      expect(mockExecuteGraphQLOperation).toHaveBeenCalledTimes(2)
      expect(result).toHaveLength(13)
    })
  })

  describe('clearCategoriesCache', () => {
    it('should clear the cache', async () => {
      // Populate cache
      mockExecuteGraphQLOperation.mockResolvedValueOnce(mockCategoriesData.data)
      await getCategoriesWithCache()

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

  describe('getCategoryByStockGroup', () => {
    it('should find category by stock group name', async () => {
      mockExecuteGraphQLOperation.mockResolvedValueOnce(mockCategoriesData.data)

      const result = await getCategoryByStockGroup('1000 - Pizzakartonger')

      expect(result).toEqual({
        stock_groups: '1000 - Pizzakartonger',
        our_company: 'alfe',
        image_url:
          'https://res.cloudinary.com/dnptbuf0s/image/upload/v1754299206/samples/atp-store-customer/alfe-fallback_nopd5j.jpg',
        alt_text: 'category image',
      })
    })

    it('should return undefined for non-existent stock group', async () => {
      mockExecuteGraphQLOperation.mockResolvedValueOnce(mockCategoriesData.data)

      const result = await getCategoryByStockGroup('9999 - Non-existent')

      expect(result).toBeUndefined()
    })

    it('should handle empty categories list', async () => {
      mockExecuteGraphQLOperation.mockResolvedValueOnce({
        _type_stock_groups: [],
      })

      const result = await getCategoryByStockGroup('1000 - Pizzakartonger')

      expect(result).toBeUndefined()
    })
  })

  describe('getCategoriesGrouped', () => {
    it('should group categories by first character', async () => {
      mockExecuteGraphQLOperation.mockResolvedValueOnce(mockCategoriesData.data)

      const result = await getCategoriesGrouped()

      expect(result['1']).toHaveLength(3) // 1000, 1500, 1600
      expect(result['2']).toHaveLength(2) // 2000, 2500
      expect(result['3']).toHaveLength(1) // 3000
      expect(result['4']).toHaveLength(1) // 4000
      expect(result['5']).toHaveLength(1) // 5000
      expect(result['6']).toHaveLength(1) // 6000
      expect(result['7']).toHaveLength(1) // 7000
      expect(result['8']).toHaveLength(2) // 8000, 8500
      expect(result['9']).toHaveLength(1) // 9000
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
            image_url: 'test.jpg',
            alt_text: 'test',
          },
          {
            stock_groups: 'A - Second',
            our_company: 'alfe',
            image_url: 'test.jpg',
            alt_text: 'test',
          },
          {
            stock_groups: 'B - First',
            our_company: 'alfe',
            image_url: 'test.jpg',
            alt_text: 'test',
          },
        ],
      })

      const result = await getCategoriesGrouped()

      expect(result['A']).toHaveLength(2)
      expect(result['B']).toHaveLength(1)
      expect(result['A']?.[0]?.stock_groups).toBe('A - First')
      expect(result['A']?.[1]?.stock_groups).toBe('A - Second')
    })
  })

  describe('Edge cases and error scenarios', () => {
    it('should handle malformed GraphQL response', async () => {
      mockExecuteGraphQLOperation.mockResolvedValueOnce(
        null as unknown as { _type_stock_groups: [] }
      )

      await expect(getCategories()).rejects.toThrow()
    })

    it('should handle Zod error with non-Error name property', async () => {
      const customError = Object.assign(new Error('Custom error'), {
        name: 'ZodError',
      })
      mockExecuteGraphQLOperation.mockRejectedValueOnce(customError)

      await expect(getCategories()).rejects.toThrow(
        'Invalid response format from server'
      )
    })

    it('should validate complete query structure', async () => {
      mockExecuteGraphQLOperation.mockResolvedValueOnce(mockCategoriesData.data)

      await getCategories()

      const callArgs = mockExecuteGraphQLOperation.mock.calls[0]
      const query = callArgs![0]

      expect(query).toContain('query GetCategoriesQuery($company_id: String!)')
      expect(query).toContain('_type_stock_groups')
      expect(query).toContain('order_by: { stock_groups: asc }')
      expect(query).toContain('our_company: { _eq: $company_id }')
      expect(query).toContain('willBeListed: { _eq: true }')
      expect(query).toContain('stock_groups')
      expect(query).toContain('our_company')
      expect(query).toContain('image_url')
      expect(query).toContain('alt_text')
    })
  })
})
