/**
 * Unit tests for Categories Service
 * SOLID Principles: SRP - Testing single responsibility
 * Design Patterns: Test Pattern with MSW for GraphQL mocking
 * Dependencies: Jest, MSW, Testing Library
 */

import {
  describe,
  it,
  expect,
  jest,
  beforeEach,
  afterEach,
} from '@jest/globals'
import {
  getCategories,
  getCategoriesWithCache,
  clearCategoriesCache,
  getCategoryById,
  getCategoriesGrouped,
} from './categories.service'

// Mock Apollo Client
jest.mock('@/lib/apollo/client')
jest.mock('@/lib/apollo/browser-client')
import { mockQuery } from '@/lib/apollo/__mocks__/client'

// Mock console methods
const originalConsoleError = console.error
beforeEach(() => {
  console.error = jest.fn()
})
afterEach(() => {
  console.error = originalConsoleError
  jest.clearAllMocks()
})

describe('categories.service', () => {
  // Mock response matching the actual GraphQL schema
  const mockCategoriesResponse = {
    _type_stock_groups: [
      {
        stock_groups: 'ELECTRONICS',
        our_company: 'alfe',
        image_url: 'https://example.com/electronics.jpg',
        alt_text: 'Electronics Category',
      },
      {
        stock_groups: 'FURNITURE',
        our_company: 'alfe',
        image_url: 'https://example.com/furniture.jpg',
        alt_text: 'Furniture Category',
      },
      {
        stock_groups: 'APPLIANCES',
        our_company: 'alfe',
        image_url: null,
        alt_text: null,
      },
    ],
  }

  const expectedTransformedCategories = [
    {
      id: 'ELECTRONICS',
      name: 'Electronics',
      companyId: 'alfe',
      imageUrl: 'https://example.com/electronics.jpg',
      altText: 'Electronics Category',
    },
    {
      id: 'FURNITURE',
      name: 'Furniture',
      companyId: 'alfe',
      imageUrl: 'https://example.com/furniture.jpg',
      altText: 'Furniture Category',
    },
    {
      id: 'APPLIANCES',
      name: 'Appliances',
      companyId: 'alfe',
      imageUrl: '/placeholder-category.jpg',
      altText: 'APPLIANCES category',
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
    clearCategoriesCache()
    delete process.env['COMPANY_ID']
  })

  describe('getCategories', () => {
    it('should fetch and transform categories successfully', async () => {
      mockQuery.mockResolvedValueOnce({ data: mockCategoriesResponse })

      const result = await getCategories()

      expect(result).toEqual(expectedTransformedCategories)
    })

    it('should use custom company ID when provided', async () => {
      interface MockQueryArgs {
        variables: Record<string, unknown>
      }
      let capturedVariables: Record<string, unknown> | null = null
      mockQuery.mockImplementationOnce((args: MockQueryArgs) => {
        capturedVariables = args.variables
        return Promise.resolve({ data: mockCategoriesResponse })
      })

      await getCategories('custom_company')

      expect(capturedVariables).toMatchObject({
        company_id: 'custom_company',
      })
    })

    it('should use default company ID when not provided', async () => {
      interface MockQueryArgs {
        variables: Record<string, unknown>
      }
      let capturedVariables: Record<string, unknown> | null = null
      mockQuery.mockImplementationOnce((args: MockQueryArgs) => {
        capturedVariables = args.variables
        return Promise.resolve({ data: mockCategoriesResponse })
      })

      await getCategories()

      expect(capturedVariables).toMatchObject({
        company_id: 'alfe',
      })
    })

    it('should use company ID from environment when set', async () => {
      process.env['COMPANY_ID'] = 'env_company'

      interface MockQueryArgs {
        variables: Record<string, unknown>
      }
      let capturedVariables: Record<string, unknown> | null = null
      mockQuery.mockImplementationOnce((args: MockQueryArgs) => {
        capturedVariables = args.variables
        return Promise.resolve({ data: mockCategoriesResponse })
      })

      await getCategories()

      expect(capturedVariables).toMatchObject({
        company_id: 'env_company',
      })
    })

    it('should handle empty categories array', async () => {
      mockQuery.mockResolvedValueOnce({
        data: {
          _type_stock_groups: [],
        },
      })

      const result = await getCategories()
      expect(result).toEqual([])
    })

    it('should handle categories with null values', async () => {
      const responseWithNulls = {
        _type_stock_groups: [
          {
            stock_groups: 'CATEGORY1',
            our_company: 'alfe',
            image_url: null,
            alt_text: null,
          },
          {
            stock_groups: 'CATEGORY2',
            our_company: 'alfe',
            image_url: 'https://example.com/image.jpg',
            alt_text: 'Alt text',
          },
        ],
      }

      mockQuery.mockResolvedValueOnce({ data: responseWithNulls })

      const result = await getCategories()

      // First category should be transformed with defaults
      expect(result[0]).toEqual({
        id: 'CATEGORY1',
        name: 'Category1',
        companyId: 'alfe',
        imageUrl: '/placeholder-category.jpg',
        altText: 'CATEGORY1 category',
      })

      // Second category should have provided values
      expect(result[1]).toEqual({
        id: 'CATEGORY2',
        name: 'Category2',
        companyId: 'alfe',
        imageUrl: 'https://example.com/image.jpg',
        altText: 'Alt text',
      })
    })

    it('should handle validation errors gracefully', async () => {
      mockQuery.mockResolvedValueOnce({
        data: {
          invalid_field: 'bad_data',
        },
      })

      await expect(getCategories()).rejects.toThrow(
        'Invalid response format from server'
      )
      expect(console.error).toHaveBeenCalled()
    })

    it('should handle network errors', async () => {
      mockQuery.mockRejectedValueOnce(new Error('Network error'))

      await expect(getCategories()).rejects.toThrow()
    })

    it('should handle GraphQL errors', async () => {
      mockQuery.mockRejectedValueOnce(new Error('GraphQL Error'))

      await expect(getCategories()).rejects.toThrow()
    })
  })

  describe('getCategoriesWithCache', () => {
    it('should fetch categories on first call', async () => {
      mockQuery.mockResolvedValue({ data: mockCategoriesResponse })

      const result = await getCategoriesWithCache()

      expect(result).toEqual(expectedTransformedCategories)
      expect(mockQuery).toHaveBeenCalledTimes(1)
    })

    it('should use cached data on subsequent calls', async () => {
      mockQuery.mockResolvedValue({ data: mockCategoriesResponse })

      // First call - should fetch
      await getCategoriesWithCache()
      expect(mockQuery).toHaveBeenCalledTimes(1)

      // Second call - should use cache
      const result = await getCategoriesWithCache()
      expect(result).toEqual(expectedTransformedCategories)
      expect(mockQuery).toHaveBeenCalledTimes(1) // Still 1, no new fetch
    })

    it('should refetch after cache expires', async () => {
      mockQuery.mockResolvedValue({ data: mockCategoriesResponse })

      // First call
      await getCategoriesWithCache()
      expect(mockQuery).toHaveBeenCalledTimes(1)

      // Simulate cache expiration (5 minutes + 1 second)
      jest.useFakeTimers()
      jest.advanceTimersByTime(5 * 60 * 1000 + 1000)

      // Should refetch
      await getCategoriesWithCache()
      expect(mockQuery).toHaveBeenCalledTimes(2)

      jest.useRealTimers()
    })

    it('should refetch after cache is cleared', async () => {
      mockQuery.mockResolvedValue({ data: mockCategoriesResponse })

      // First call
      await getCategoriesWithCache()
      expect(mockQuery).toHaveBeenCalledTimes(1)

      // Clear cache
      clearCategoriesCache()

      // Should refetch
      await getCategoriesWithCache()
      expect(mockQuery).toHaveBeenCalledTimes(2)
    })
  })

  describe('clearCategoriesCache', () => {
    it('should clear the cache', async () => {
      mockQuery.mockResolvedValue({ data: mockCategoriesResponse })

      // Populate cache
      await getCategoriesWithCache()
      expect(mockQuery).toHaveBeenCalledTimes(1)

      // Clear cache
      clearCategoriesCache()

      // Next call should fetch fresh data
      await getCategoriesWithCache()
      expect(mockQuery).toHaveBeenCalledTimes(2)
    })
  })

  describe('getCategoryById', () => {
    it('should return category with matching ID', async () => {
      mockQuery.mockResolvedValueOnce({ data: mockCategoriesResponse })

      const result = await getCategoryById('ELECTRONICS')

      expect(result).toEqual({
        id: 'ELECTRONICS',
        name: 'Electronics',
        companyId: 'alfe',
        imageUrl: 'https://example.com/electronics.jpg',
        altText: 'Electronics Category',
      })
    })

    it('should return undefined for non-existent ID', async () => {
      mockQuery.mockResolvedValueOnce({ data: mockCategoriesResponse })

      const result = await getCategoryById('NON_EXISTENT')
      expect(result).toBeUndefined()
    })

    it('should handle case-sensitive IDs', async () => {
      mockQuery.mockResolvedValueOnce({ data: mockCategoriesResponse })

      // IDs are case-sensitive
      const result = await getCategoryById('electronics')
      expect(result).toBeUndefined()
    })

    it('should handle empty categories list', async () => {
      mockQuery.mockResolvedValueOnce({
        data: {
          _type_stock_groups: [],
        },
      })

      const result = await getCategoryById('ELECTRONICS')
      expect(result).toBeUndefined()
    })
  })

  describe('getCategoriesGrouped', () => {
    it('should group categories by first character', async () => {
      mockQuery.mockResolvedValueOnce({ data: mockCategoriesResponse })

      const result = await getCategoriesGrouped()

      expect(result).toEqual({
        E: [
          {
            id: 'ELECTRONICS',
            name: 'Electronics',
            companyId: 'alfe',
            imageUrl: 'https://example.com/electronics.jpg',
            altText: 'Electronics Category',
          },
        ],
        F: [
          {
            id: 'FURNITURE',
            name: 'Furniture',
            companyId: 'alfe',
            imageUrl: 'https://example.com/furniture.jpg',
            altText: 'Furniture Category',
          },
        ],
        A: [
          {
            id: 'APPLIANCES',
            name: 'Appliances',
            companyId: 'alfe',
            imageUrl: '/placeholder-category.jpg',
            altText: 'APPLIANCES category',
          },
        ],
      })
    })

    it('should handle multiple categories with same first character', async () => {
      const multipleResponse = {
        _type_stock_groups: [
          {
            stock_groups: 'ELECTRONICS',
            our_company: 'alfe',
            image_url: null,
            alt_text: null,
          },
          {
            stock_groups: 'EQUIPMENT',
            our_company: 'alfe',
            image_url: null,
            alt_text: null,
          },
          {
            stock_groups: 'FURNITURE',
            our_company: 'alfe',
            image_url: null,
            alt_text: null,
          },
        ],
      }

      mockQuery.mockResolvedValueOnce({ data: multipleResponse })

      const result = await getCategoriesGrouped()

      expect(result['E']).toHaveLength(2)
      expect(result['E']?.map(c => c.name)).toEqual([
        'Electronics',
        'Equipment',
      ])
      expect(result['F']).toHaveLength(1)
    })

    it('should handle empty categories', async () => {
      mockQuery.mockResolvedValueOnce({
        data: {
          _type_stock_groups: [],
        },
      })

      const result = await getCategoriesGrouped()
      expect(result).toEqual({})
    })

    it('should handle categories with special characters', async () => {
      const specialResponse = {
        _type_stock_groups: [
          {
            stock_groups: '123NUMBERS',
            our_company: 'alfe',
            image_url: null,
            alt_text: null,
          },
          {
            stock_groups: '#SPECIAL',
            our_company: 'alfe',
            image_url: null,
            alt_text: null,
          },
        ],
      }

      mockQuery.mockResolvedValueOnce({ data: specialResponse })

      const result = await getCategoriesGrouped()

      expect(result['1']).toBeDefined()
      expect(result['1']?.[0]?.name).toBe('123numbers')
      expect(result['#']).toBeDefined()
      expect(result['#']?.[0]?.name).toBe('#Special')
    })
  })

  describe('Category transformation', () => {
    it('should transform category names correctly', async () => {
      const testCases = {
        _type_stock_groups: [
          {
            stock_groups: 'ELECTRONICS_AND_GADGETS',
            our_company: 'alfe',
            image_url: null,
            alt_text: null,
          },
          {
            stock_groups: 'HOME-APPLIANCES',
            our_company: 'alfe',
            image_url: null,
            alt_text: null,
          },
          {
            stock_groups: 'furniture_items',
            our_company: 'alfe',
            image_url: null,
            alt_text: null,
          },
        ],
      }

      mockQuery.mockResolvedValueOnce({ data: testCases })

      const result = await getCategories()

      expect(result[0]?.name).toBe('Electronics And Gadgets')
      expect(result[1]?.name).toBe('Home-Appliances')
      expect(result[2]?.name).toBe('Furniture Items')
    })

    it('should provide fallback image for categories without images', async () => {
      mockQuery.mockResolvedValueOnce({ data: mockCategoriesResponse })

      const result = await getCategories()

      const categoryWithoutImage = result.find(c => c.id === 'APPLIANCES')
      expect(categoryWithoutImage?.imageUrl).toBe('/placeholder-category.jpg')
    })

    it('should preserve original image URL when provided', async () => {
      mockQuery.mockResolvedValueOnce({ data: mockCategoriesResponse })

      const result = await getCategories()

      const categoryWithImage = result.find(c => c.id === 'ELECTRONICS')
      expect(categoryWithImage?.imageUrl).toBe(
        'https://example.com/electronics.jpg'
      )
    })

    it('should generate alt text when not provided', async () => {
      mockQuery.mockResolvedValueOnce({ data: mockCategoriesResponse })

      const result = await getCategories()

      const categoryWithoutAlt = result.find(c => c.id === 'APPLIANCES')
      expect(categoryWithoutAlt?.altText).toBe('APPLIANCES category')
    })
  })
})
