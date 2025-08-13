/**
 * Unit tests for Categories Service
 * SOLID Principles: SRP - Testing single responsibility
 * Design Patterns: Test Pattern with fetch mocking
 * Dependencies: Jest, Testing utilities
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
} from '../categories.service'
import {
  mockGetCategoriesResponse,
  emptyResponses,
} from '@/__tests__/mocks/graphql-responses'
import { FetchMockBuilder } from '@/__tests__/utils/fetch-mock'

// Mock fetch is setup in jest.setup.ts
// We'll override it here for specific test cases

describe('categories.service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    clearCategoriesCache()
    delete process.env['COMPANY_ID']
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('getCategories', () => {
    it('should fetch and return categories successfully', async () => {
      // Use centralized mock builder
      const mockResponse = mockGetCategoriesResponse()
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/categories', mockResponse)
        .build()

      const result = await getCategories()

      // The service transforms the response, so we check the result is an array
      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBeGreaterThan(0)
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/categories?company_id=alfe')
      )
    })

    it('should use custom company ID when provided', async () => {
      // Use centralized mock builder with custom company
      const mockResponse = mockGetCategoriesResponse({
        _type_stock_groups: [
          {
            stock_groups: '1000 - Test Category',
            our_company: 'custom_company',
            image_url: 'https://example.com/image.jpg',
            alt_text: 'Test Category',
          },
        ],
      })
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/categories', mockResponse)
        .build()

      await getCategories('custom_company')

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/categories?company_id=custom_company')
      )
    })

    it('should use default company ID when not provided', async () => {
      // Use centralized mock builder
      const mockResponse = mockGetCategoriesResponse()
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/categories', mockResponse)
        .build()

      await getCategories()

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/categories?company_id=alfe')
      )
    })

    it('should use company ID from environment when set', async () => {
      process.env['COMPANY_ID'] = 'env_company'
      // Use centralized mock builder
      const mockResponse = mockGetCategoriesResponse()
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/categories', mockResponse)
        .build()

      await getCategories()

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/categories?company_id=env_company')
      )
    })

    it('should handle empty categories array', async () => {
      // Use centralized empty response helper
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/categories', emptyResponses.categories())
        .build()

      const result = await getCategories()

      expect(result).toEqual([])
    })

    it('should handle fetch errors', async () => {
      global.fetch = new FetchMockBuilder()
        .mockError('/api/categories', 'Internal Server Error', 500)
        .build()

      await expect(getCategories()).rejects.toThrow(
        'Failed to fetch categories'
      )
    })

    it('should handle network errors', async () => {
      global.fetch = jest.fn(() =>
        Promise.reject(new Error('Network error'))
      ) as typeof fetch

      await expect(getCategories()).rejects.toThrow('Network error')
    })

    it('should handle invalid response data', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/categories', { invalid: 'data' })
        .build()

      await expect(getCategories()).rejects.toThrow(
        'Invalid response format from server'
      )
    })
  })

  describe('getCategoriesWithCache', () => {
    it('should fetch categories on first call', async () => {
      const mockResponse = mockGetCategoriesResponse()
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/categories', mockResponse)
        .build()

      const result = await getCategoriesWithCache()

      expect(Array.isArray(result)).toBe(true)
      expect(global.fetch).toHaveBeenCalledTimes(1)
    })

    it('should use cached data on subsequent calls', async () => {
      const mockResponse = mockGetCategoriesResponse()
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/categories', mockResponse)
        .build()

      // First call - should fetch
      const firstResult = await getCategoriesWithCache()
      expect(global.fetch).toHaveBeenCalledTimes(1)

      // Second call - should use cache
      const result = await getCategoriesWithCache()
      expect(result).toEqual(firstResult)
      expect(global.fetch).toHaveBeenCalledTimes(1) // Still 1, no new fetch
    })

    it('should refetch after cache expires', async () => {
      const mockResponse = mockGetCategoriesResponse()
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/categories', mockResponse)
        .build()

      // First call
      await getCategoriesWithCache()
      expect(global.fetch).toHaveBeenCalledTimes(1)

      // Simulate cache expiration (5 minutes + 1 second)
      jest.useFakeTimers()
      jest.advanceTimersByTime(5 * 60 * 1000 + 1000)

      // Should refetch
      await getCategoriesWithCache()
      expect(global.fetch).toHaveBeenCalledTimes(2)

      jest.useRealTimers()
    })

    it('should refetch after cache is cleared', async () => {
      const mockResponse = mockGetCategoriesResponse()
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/categories', mockResponse)
        .build()

      // First call
      await getCategoriesWithCache()
      expect(global.fetch).toHaveBeenCalledTimes(1)

      // Clear cache
      clearCategoriesCache()

      // Should refetch
      await getCategoriesWithCache()
      expect(global.fetch).toHaveBeenCalledTimes(2)
    })
  })

  describe('clearCategoriesCache', () => {
    it('should clear the cache', async () => {
      const mockResponse = mockGetCategoriesResponse()
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/categories', mockResponse)
        .build()

      // Populate cache
      await getCategoriesWithCache()
      expect(global.fetch).toHaveBeenCalledTimes(1)

      // Clear cache
      clearCategoriesCache()

      // Next call should fetch fresh data
      await getCategoriesWithCache()
      expect(global.fetch).toHaveBeenCalledTimes(2)
    })
  })

  describe('getCategoryById', () => {
    it('should return category with matching ID', async () => {
      const mockResponse = mockGetCategoriesResponse()
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/categories', mockResponse)
        .build()

      const result = await getCategoryById('1000 - Pizzakartonger')

      expect(result).toBeDefined()
      expect(result?.id).toBe('1000 - Pizzakartonger')
    })

    it('should return undefined for non-existent ID', async () => {
      const mockResponse = mockGetCategoriesResponse()
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/categories', mockResponse)
        .build()

      const result = await getCategoryById('NON_EXISTENT')
      expect(result).toBeUndefined()
    })

    it('should handle case-sensitive IDs', async () => {
      const mockResponse = mockGetCategoriesResponse()
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/categories', mockResponse)
        .build()

      // IDs are case-sensitive
      const result = await getCategoryById('1000 - pizzakartonger')
      expect(result).toBeUndefined()
    })

    it('should handle empty categories list', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/categories', emptyResponses.categories())
        .build()

      const result = await getCategoryById('ANY_ID')
      expect(result).toBeUndefined()
    })
  })

  describe('getCategoriesGrouped', () => {
    it('should group categories by first character', async () => {
      // Use custom categories that will transform properly
      const mockResponse = mockGetCategoriesResponse({
        _type_stock_groups: [
          {
            stock_groups: 'Electronics',
            our_company: 'alfe',
            image_url: 'https://example.com/electronics.jpg',
            alt_text: 'Electronics',
          },
          {
            stock_groups: 'Furniture',
            our_company: 'alfe',
            image_url: 'https://example.com/furniture.jpg',
            alt_text: 'Furniture',
          },
          {
            stock_groups: 'Appliances',
            our_company: 'alfe',
            image_url: 'https://example.com/appliances.jpg',
            alt_text: 'Appliances',
          },
        ],
      })
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/categories', mockResponse)
        .build()

      const result = await getCategoriesGrouped()

      expect(result['E']).toHaveLength(1)
      expect(result['E']?.[0]?.name).toBe('Electronics')
      expect(result['F']).toHaveLength(1)
      expect(result['F']?.[0]?.name).toBe('Furniture')
      expect(result['A']).toHaveLength(1)
      expect(result['A']?.[0]?.name).toBe('Appliances')
    })

    it('should handle multiple categories with same first character', async () => {
      const mockResponse = mockGetCategoriesResponse({
        _type_stock_groups: [
          {
            stock_groups: 'Electronics',
            our_company: 'alfe',
            image_url: 'https://example.com/electronics.jpg',
            alt_text: 'Electronics',
          },
          {
            stock_groups: 'Equipment',
            our_company: 'alfe',
            image_url: 'https://example.com/equipment.jpg',
            alt_text: 'Equipment',
          },
          {
            stock_groups: 'Furniture',
            our_company: 'alfe',
            image_url: 'https://example.com/furniture.jpg',
            alt_text: 'Furniture',
          },
        ],
      })
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/categories', mockResponse)
        .build()

      const result = await getCategoriesGrouped()

      expect(result['E']).toHaveLength(2)
      expect(result['E']?.map(c => c.name)).toEqual([
        'Electronics',
        'Equipment',
      ])
      expect(result['F']).toHaveLength(1)
    })

    it('should handle empty categories', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/categories', emptyResponses.categories())
        .build()

      const result = await getCategoriesGrouped()
      expect(result).toEqual({})
    })

    it('should handle categories with special characters', async () => {
      const mockResponse = mockGetCategoriesResponse({
        _type_stock_groups: [
          {
            stock_groups: '123numbers',
            our_company: 'alfe',
            image_url: 'https://example.com/123.jpg',
            alt_text: '123Numbers',
          },
          {
            stock_groups: '#Special',
            our_company: 'alfe',
            image_url: 'https://example.com/special.jpg',
            alt_text: '#Special',
          },
        ],
      })
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/categories', mockResponse)
        .build()

      const result = await getCategoriesGrouped()

      expect(result['1']).toBeDefined()
      expect(result['1']?.[0]?.name).toBe('123numbers')
      expect(result['#']).toBeDefined()
      expect(result['#']?.[0]?.name).toBe('#Special')
    })
  })
})
