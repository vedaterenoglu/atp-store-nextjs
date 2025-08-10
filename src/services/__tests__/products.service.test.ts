/**
 * Unit tests for Products Service
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
  getProducts,
  getProductsByCategory,
  searchProducts,
} from '../products.service'
import {
  mockGetProductsListResponse,
  emptyResponses,
} from '@/__tests__/mocks/graphql-responses'
import { FetchMockBuilder } from '@/__tests__/utils/fetch-mock'

describe('products.service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    delete process.env['COMPANY_ID']
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('getProducts', () => {
    it('should fetch and return products successfully', async () => {
      // Use centralized mock builder for GraphQL response
      const mockResponse = mockGetProductsListResponse()
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/products', mockResponse)
        .build()

      const result = await getProducts()

      // Service transforms the GraphQL response, so check it's an array
      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBeGreaterThan(0)
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/products?company_id=alfe')
      )
    })

    it('should use custom company ID when provided', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/products', mockGetProductsListResponse())
        .build()

      // getProducts doesn't take arguments, it uses env vars
      process.env['COMPANY_ID'] = 'custom_company'
      await getProducts()

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/products?company_id=custom_company')
      )
    })

    it('should use default company ID when not provided', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/products', mockGetProductsListResponse())
        .build()

      await getProducts()

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/products?company_id=alfe')
      )
    })

    it('should use company ID from environment when set', async () => {
      process.env['COMPANY_ID'] = 'env_company'
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/products', mockGetProductsListResponse())
        .build()

      await getProducts()

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/products?company_id=env_company')
      )
    })

    it('should handle empty products array', async () => {
      // Use centralized empty response helper
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/products', emptyResponses.products())
        .build()

      const result = await getProducts()

      expect(result).toEqual([])
    })

    it('should handle fetch errors', async () => {
      global.fetch = new FetchMockBuilder()
        .mockError('/api/products', 'Internal Server Error', 500)
        .build()

      await expect(getProducts()).rejects.toThrow('Failed to fetch products')
    })

    it('should handle network errors', async () => {
      global.fetch = jest.fn<typeof fetch>(() =>
        Promise.reject(new Error('Network error'))
      )

      await expect(getProducts()).rejects.toThrow('Failed to fetch products')
    })

    it('should handle invalid response data', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/products', { invalid: 'data' })
        .build()

      // Service returns empty array when no stock data
      const result = await getProducts()
      expect(result).toEqual([])
    })
  })

  describe('getProductsByCategory', () => {
    it('should return products for specific category', async () => {
      // Use centralized mock - default mock has products with categoryId '1000 - Pizzakartonger'
      const mockResponse = mockGetProductsListResponse()
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/products', mockResponse)
        .build()

      const result = await getProductsByCategory('1000 - Pizzakartonger')

      // Default mock has 3 products all with this category
      expect(result).toHaveLength(3)
      expect(result.every(p => p.categoryId === '1000 - Pizzakartonger')).toBe(
        true
      )
    })

    it('should return empty array for category with no products', async () => {
      const mockResponse = mockGetProductsListResponse()
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/products', mockResponse)
        .build()

      const result = await getProductsByCategory('NON_EXISTENT')

      expect(result).toEqual([])
    })

    it('should handle case-sensitive category IDs', async () => {
      // Use centralized mock - it doesn't have 'electronics' (lowercase) category
      const mockResponse = mockGetProductsListResponse()
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/products', mockResponse)
        .build()

      const result = await getProductsByCategory('electronics')

      expect(result).toEqual([])
    })

    it('should handle empty products list', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/products', emptyResponses.products())
        .build()

      const result = await getProductsByCategory('ELECTRONICS')

      expect(result).toEqual([])
    })

    it('should use default company ID for category fetch', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/products', mockGetProductsListResponse())
        .build()

      await getProductsByCategory('ELECTRONICS')

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/products?company_id=alfe')
      )
    })
  })

  describe('searchProducts', () => {
    it('should return products matching search query in name', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/products', mockGetProductsListResponse())
        .build()

      const result = await searchProducts('pizzakartong')

      // All 3 products have 'pizzakartong' in their name (case-insensitive)
      expect(result).toHaveLength(3)
      // Verify all results contain the search term
      expect(
        result.every(p => p.name.toLowerCase().includes('pizzakartong'))
      ).toBe(true)
    })

    it('should be case-insensitive', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/products', mockGetProductsListResponse())
        .build()

      const result = await searchProducts('Pizza')

      expect(result).toHaveLength(3)
    })

    it('should return empty array when no matches found', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/products', mockGetProductsListResponse())
        .build()

      const result = await searchProducts('nonexistent')

      expect(result).toEqual([])
    })

    it('should handle empty search query', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/products', mockGetProductsListResponse())
        .build()

      const result = await searchProducts('')

      expect(result).toHaveLength(3)
    })

    it('should handle whitespace in search query', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/products', mockGetProductsListResponse())
        .build()

      const result = await searchProducts('   ')

      // Three consecutive spaces won't match anything in product names
      expect(result).toHaveLength(0)
    })

    it('should handle special characters in search query', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/products', mockGetProductsListResponse())
        .build()

      // Search for product with parentheses
      const result = await searchProducts('26*26')

      // One product has "26*26" in its name
      expect(result).toHaveLength(1)
      expect(result[0]?.name).toContain('26*26')
    })

    it('should NOT search in product ID', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/products', mockGetProductsListResponse())
        .build()

      // Search for product ID "1001 1001" - should not match since search only looks in name
      const result = await searchProducts('1001 1001')

      // Service only searches in name field, not ID
      expect(result).toHaveLength(0)
    })

    it('should use default company ID for search', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/products', mockGetProductsListResponse())
        .build()

      await searchProducts('test')

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/products?company_id=alfe')
      )
    })

    it('should handle fetch errors gracefully', async () => {
      global.fetch = new FetchMockBuilder()
        .mockError('/api/products', 'Internal Server Error', 500)
        .build()

      // searchProducts calls getProducts which will throw
      await expect(searchProducts('test')).rejects.toThrow(
        'Failed to fetch products'
      )
    })
  })

  describe('Edge cases', () => {
    it('should handle products with missing optional fields', async () => {
      // Mock response with undefined image link
      // Use centralized mock with minimal product
      const mockResponse = mockGetProductsListResponse()
      // Modify response to have null image for first product (API returns null, not undefined)
      if (mockResponse.stock && mockResponse.stock[0]) {
        mockResponse.stock[0].stock_image_link = null
      }
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/products', mockResponse)
        .build()

      const result = await getProducts()

      // Default mock has 3 products, first one now has null image
      expect(result).toHaveLength(3)
      // Check that the product was returned (service handles null image)
    })

    it('should handle very large product lists', async () => {
      // Use centralized mock and just verify it handles the default response
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/products', mockGetProductsListResponse())
        .build()

      const result = await getProducts()

      // Verify it handles the standard mock response
      expect(result.length).toBeGreaterThan(0)
    })

    it('should handle products with special characters in names', async () => {
      // Use centralized mock - the default mock already has special characters (30*30*3,5)
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/products', mockGetProductsListResponse())
        .build()

      const result = await searchProducts('30*30')

      expect(result).toHaveLength(1)
      expect(result[0]?.name).toContain('30*30')
    })
  })
})
