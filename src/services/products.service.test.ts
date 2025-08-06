/**
 * Products Service Test Suite
 * SOLID Principles: Single Responsibility - Test products service operations
 * Design Patterns: Test Pattern - Unit tests with mocking
 * Dependencies: Jest, serverGraphQLFetch mock, products mock data
 */

import {
  getProducts,
  getProductsByCategory,
  searchProducts,
} from './products.service'
import { serverGraphQLFetch } from '@/lib/graphql'
import {
  mockProductsData,
  emptyMockProductsData,
} from '@/mocks/graphql/products'

// Mock the dependencies
jest.mock('@/lib/graphql')
jest.mock('@/lib/config/env', () => ({
  env: {
    COMPANY_ID: 'alfe',
    NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT: 'http://localhost:8080/v1/graphql',
  },
  hasuraConfig: {
    getAuthHeaders: () => ({
      'x-hasura-admin-secret': 'test-secret',
    }),
  },
}))

const mockServerGraphQLFetch = serverGraphQLFetch as jest.MockedFunction<
  typeof serverGraphQLFetch
>

describe('Products Service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getProducts', () => {
    it('should fetch and transform products successfully', async () => {
      mockServerGraphQLFetch.mockResolvedValueOnce({
        data: mockProductsData,
      })

      const result = await getProducts()

      expect(mockServerGraphQLFetch).toHaveBeenCalledWith({
        document: expect.objectContaining({
          kind: 'Document',
          loc: expect.objectContaining({
            source: expect.objectContaining({
              body: expect.stringContaining(
                'query GetProductsListWithPriceQuery'
              ),
            }),
          }),
        }),
        variables: { company_id: 'alfe' },
      })

      expect(result).toHaveLength(13)
      expect(result[0]).toEqual({
        id: '1001',
        name: 'Pizza Box Large',
        price: 15.99,
        unit: 'pcs',
        categoryId: 'PIZZA_BOXES',
        imageUrl: undefined,
      })
    })

    it('should return empty array when no data is returned', async () => {
      mockServerGraphQLFetch.mockResolvedValueOnce({
        data: emptyMockProductsData,
      })

      const result = await getProducts()

      expect(result).toEqual([])
    })

    it('should return empty array when data is null', async () => {
      mockServerGraphQLFetch.mockResolvedValueOnce({
        data: null,
      })

      const result = await getProducts()

      expect(result).toEqual([])
    })

    it('should throw error when GraphQL request fails', async () => {
      const error = new Error('GraphQL error')
      mockServerGraphQLFetch.mockResolvedValueOnce({
        error,
      })

      await expect(getProducts()).rejects.toThrow('Failed to fetch products')
    })

    it('should use environment COMPANY_ID', async () => {
      mockServerGraphQLFetch.mockResolvedValueOnce({
        data: mockProductsData,
      })

      await getProducts()

      expect(mockServerGraphQLFetch).toHaveBeenCalledWith({
        document: expect.objectContaining({
          kind: 'Document',
          loc: expect.objectContaining({
            source: expect.objectContaining({
              body: expect.stringContaining(
                'query GetProductsListWithPriceQuery'
              ),
            }),
          }),
        }),
        variables: { company_id: 'alfe' },
      })
    })
  })

  describe('getProductsByCategory', () => {
    it('should filter products by category', async () => {
      mockServerGraphQLFetch.mockResolvedValueOnce({
        data: mockProductsData,
      })

      const result = await getProductsByCategory('PIZZA_BOXES')

      expect(result).toHaveLength(3)
      expect(result.every(p => p.categoryId === 'PIZZA_BOXES')).toBe(
        true
      )
    })

    it('should return empty array for non-existent category', async () => {
      mockServerGraphQLFetch.mockResolvedValueOnce({
        data: mockProductsData,
      })

      const result = await getProductsByCategory('9999 - Non-existent')

      expect(result).toEqual([])
    })

    it('should handle empty products list', async () => {
      mockServerGraphQLFetch.mockResolvedValueOnce({
        data: emptyMockProductsData,
      })

      const result = await getProductsByCategory('PIZZA_BOXES')

      expect(result).toEqual([])
    })
  })

  describe('searchProducts', () => {
    it('should search products by name', async () => {
      mockServerGraphQLFetch.mockResolvedValueOnce({
        data: mockProductsData,
      })

      const result = await searchProducts('pizza')

      expect(result).toHaveLength(3) // 3 pizza boxes in mock data
      expect(result[0]?.name).toContain('Pizza')
    })

    it('should search case-insensitively', async () => {
      mockServerGraphQLFetch.mockResolvedValueOnce({
        data: mockProductsData,
      })

      const result = await searchProducts('PIZZA')

      expect(result).toHaveLength(3) // 3 pizza boxes in mock data
    })

    it('should return empty array for no matches', async () => {
      mockServerGraphQLFetch.mockResolvedValueOnce({
        data: mockProductsData,
      })

      const result = await searchProducts('xyz')

      expect(result).toEqual([])
    })

    it('should handle partial matches', async () => {
      mockServerGraphQLFetch.mockResolvedValueOnce({
        data: mockProductsData,
      })

      const result = await searchProducts('large')

      expect(result).toHaveLength(4) // 4 large products in mock data
      expect(result[0]?.name).toContain('Large')
    })

    it('should handle empty search term', async () => {
      mockServerGraphQLFetch.mockResolvedValueOnce({
        data: mockProductsData,
      })

      const result = await searchProducts('')

      expect(result).toHaveLength(13) // All products match empty string
    })
  })

  describe('Data transformation', () => {
    it('should correctly map backend fields to frontend fields', async () => {
      const singleProductData = {
        stock: [
          {
            stock_group: '1000 - Pizzakartonger',
            stock_id: '1001 1009 0042',
            stock_name: 'Pizzakartong 42*42*4 50 st./förp.',
            stock_unit: 'förp.',
            stock_price: 29000,
          },
        ],
      }

      mockServerGraphQLFetch.mockResolvedValueOnce({
        data: singleProductData,
      })

      const result = await getProducts()

      expect(result[0]).toEqual({
        id: '1001 1009 0042',
        name: 'Pizzakartong 42*42*4 50 st./förp.',
        price: 29000,
        unit: 'förp.',
        categoryId: '1000 - Pizzakartonger',
        imageUrl: undefined,
      })
    })

    it('should handle products with special characters', async () => {
      mockServerGraphQLFetch.mockResolvedValueOnce({
        data: mockProductsData,
      })

      const result = await getProducts()

      // Test that our mock data includes products with spaces and special chars
      const productWithSpaces = result.find(p =>
        p.name.includes('Pizza Box Large')
      )
      expect(productWithSpaces).toBeDefined()
      expect(productWithSpaces?.name).toBe('Pizza Box Large')
    })
  })

  describe('Error handling', () => {
    it('should log error when no products data returned', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

      mockServerGraphQLFetch.mockResolvedValueOnce({
        data: {},
      })

      await getProducts()

      expect(consoleSpy).toHaveBeenCalledWith(
        'No products data returned from GraphQL'
      )

      consoleSpy.mockRestore()
    })

    it('should log and throw error on GraphQL failure', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      const error = new Error('Network error')

      mockServerGraphQLFetch.mockResolvedValueOnce({
        error,
      })

      await expect(getProducts()).rejects.toThrow('Failed to fetch products')

      expect(consoleSpy).toHaveBeenCalledWith('Error fetching products:', error)

      consoleSpy.mockRestore()
    })
  })
})
