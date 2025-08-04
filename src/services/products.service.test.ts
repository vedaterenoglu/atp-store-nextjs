/**
 * Products Service Test Suite
 * SOLID Principles: Single Responsibility - Test products service operations
 * Design Patterns: Test Pattern - Unit tests with mocking
 * Dependencies: Jest, graphQLClientAdapter mock, products mock data
 */

import {
  getProducts,
  getProductsByCategory,
  searchProducts,
} from './products.service'
import { graphQLClientAdapter } from '@/lib/graphql/adapter'
import mockProductsData from '@/mock/products.json'
import type { OperationResult } from '@urql/core'

// Mock the dependencies
jest.mock('@/lib/graphql/adapter')
jest.mock('@/lib/config/env', () => ({
  env: {
    COMPANY_ID: 'alfe',
  },
}))

const mockGraphQLClientAdapter = graphQLClientAdapter as jest.Mocked<
  typeof graphQLClientAdapter
>

// Helper to create mock OperationResult
const createMockOperationResult = <T>(data: T) =>
  ({
    data,
    error: undefined,
    operation: {} as Record<string, unknown>,
    stale: false,
    hasNext: false,
  }) as unknown as OperationResult<T>

describe('Products Service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getProducts', () => {
    it('should fetch and transform products successfully', async () => {
      mockGraphQLClientAdapter.request.mockResolvedValueOnce(
        createMockOperationResult(mockProductsData.data)
      )

      const result = await getProducts()

      expect(mockGraphQLClientAdapter.request).toHaveBeenCalledWith({
        document: expect.anything(),
        variables: { company_id: 'alfe' },
      })

      expect(result).toHaveLength(10)
      expect(result[0]).toEqual({
        id: '1002 1001 0001',
        name: 'Baklava Låda 1 kg 100 pack',
        price: 30000,
        unit: 'förp.',
        categoryId: '1000 - Pizzakartonger',
        imageUrl: undefined,
      })
    })

    it('should return empty array when no data is returned', async () => {
      mockGraphQLClientAdapter.request.mockResolvedValueOnce(
        createMockOperationResult({ stock: [] })
      )

      const result = await getProducts()

      expect(result).toEqual([])
    })

    it('should return empty array when data is null', async () => {
      mockGraphQLClientAdapter.request.mockResolvedValueOnce(
        createMockOperationResult(null)
      )

      const result = await getProducts()

      expect(result).toEqual([])
    })

    it('should throw error when GraphQL request fails', async () => {
      const error = new Error('GraphQL error')
      mockGraphQLClientAdapter.request.mockRejectedValueOnce(error)

      await expect(getProducts()).rejects.toThrow('Failed to fetch products')
    })

    it('should use environment COMPANY_ID', async () => {
      mockGraphQLClientAdapter.request.mockResolvedValueOnce(
        createMockOperationResult(mockProductsData.data)
      )

      await getProducts()

      expect(mockGraphQLClientAdapter.request).toHaveBeenCalledWith({
        document: expect.anything(),
        variables: { company_id: 'alfe' },
      })
    })
  })

  describe('getProductsByCategory', () => {
    it('should filter products by category', async () => {
      mockGraphQLClientAdapter.request.mockResolvedValueOnce(
        createMockOperationResult(mockProductsData.data)
      )

      const result = await getProductsByCategory('1000 - Pizzakartonger')

      expect(result).toHaveLength(3)
      expect(result.every(p => p.categoryId === '1000 - Pizzakartonger')).toBe(
        true
      )
    })

    it('should return empty array for non-existent category', async () => {
      mockGraphQLClientAdapter.request.mockResolvedValueOnce(
        createMockOperationResult(mockProductsData.data)
      )

      const result = await getProductsByCategory('9999 - Non-existent')

      expect(result).toEqual([])
    })

    it('should handle empty products list', async () => {
      mockGraphQLClientAdapter.request.mockResolvedValueOnce(
        createMockOperationResult({ stock: [] })
      )

      const result = await getProductsByCategory('1000 - Pizzakartonger')

      expect(result).toEqual([])
    })
  })

  describe('searchProducts', () => {
    it('should search products by name', async () => {
      mockGraphQLClientAdapter.request.mockResolvedValueOnce(
        createMockOperationResult(mockProductsData.data)
      )

      const result = await searchProducts('pizza')

      expect(result).toHaveLength(2)
      expect(result[0]?.name).toContain('Pizza')
    })

    it('should search case-insensitively', async () => {
      mockGraphQLClientAdapter.request.mockResolvedValueOnce(
        createMockOperationResult(mockProductsData.data)
      )

      const result = await searchProducts('PIZZA')

      expect(result).toHaveLength(2)
    })

    it('should return empty array for no matches', async () => {
      mockGraphQLClientAdapter.request.mockResolvedValueOnce(
        createMockOperationResult(mockProductsData.data)
      )

      const result = await searchProducts('xyz')

      expect(result).toEqual([])
    })

    it('should handle partial matches', async () => {
      mockGraphQLClientAdapter.request.mockResolvedValueOnce(
        createMockOperationResult(mockProductsData.data)
      )

      const result = await searchProducts('kebab')

      expect(result).toHaveLength(1)
      expect(result[0]?.name).toBe('Kebabrullebox')
    })

    it('should handle empty search term', async () => {
      mockGraphQLClientAdapter.request.mockResolvedValueOnce(
        createMockOperationResult(mockProductsData.data)
      )

      const result = await searchProducts('')

      expect(result).toHaveLength(10) // All products match empty string
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

      mockGraphQLClientAdapter.request.mockResolvedValueOnce(
        createMockOperationResult(singleProductData)
      )

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
      mockGraphQLClientAdapter.request.mockResolvedValueOnce(
        createMockOperationResult(mockProductsData.data)
      )

      const result = await getProducts()

      const specialCharProduct = result.find(p =>
        p.name.includes('Salladsskål')
      )
      expect(specialCharProduct).toBeDefined()
      expect(specialCharProduct?.name).toBe(
        'Salladsskål Fyrkantig Transparent med Transparent Lock 200 st./kolli 1100 ml'
      )
    })
  })

  describe('Error handling', () => {
    it('should log error when no products data returned', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

      mockGraphQLClientAdapter.request.mockResolvedValueOnce(
        createMockOperationResult({})
      )

      await getProducts()

      expect(consoleSpy).toHaveBeenCalledWith(
        'No products data returned from GraphQL'
      )

      consoleSpy.mockRestore()
    })

    it('should log and throw error on GraphQL failure', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      const error = new Error('Network error')

      mockGraphQLClientAdapter.request.mockRejectedValueOnce(error)

      await expect(getProducts()).rejects.toThrow('Failed to fetch products')

      expect(consoleSpy).toHaveBeenCalledWith('Error fetching products:', error)

      consoleSpy.mockRestore()
    })
  })
})
