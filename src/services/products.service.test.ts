/**
 * Unit tests for Products Service
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
  getProducts,
  getProductsByCategory,
  searchProducts,
} from './products.service'

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

describe('products.service', () => {
  // Mock response matching the actual GraphQL schema
  const mockProductsResponse = {
    stock: [
      {
        stock_id: 'PROD001',
        stock_name: 'Premium Widget',
        stock_group: 'ELECTRONICS',
        stock_price: 99.99,
        stock_unit: 'EA',
        available_stock: 50,
        stock_image_link: 'https://example.com/widget.jpg',
      },
      {
        stock_id: 'PROD002',
        stock_name: 'Standard Gadget',
        stock_group: 'FURNITURE',
        stock_price: 49.99,
        stock_unit: 'PCS',
        available_stock: 100,
        stock_image_link: null,
      },
      {
        stock_id: 'PROD003',
        stock_name: 'Basic Tool',
        stock_group: 'TOOLS',
        stock_price: 24.99,
        stock_unit: 'KG',
        available_stock: 0,
        stock_image_link: 'https://example.com/tool.jpg',
      },
    ],
  }

  const expectedTransformedProducts = [
    {
      id: 'PROD001',
      name: 'Premium Widget',
      categoryId: 'ELECTRONICS',
      price: 99.99,
      unit: 'EA',
      stock: 50,
      imageUrl: 'https://example.com/widget.jpg',
    },
    {
      id: 'PROD002',
      name: 'Standard Gadget',
      categoryId: 'FURNITURE',
      price: 49.99,
      unit: 'PCS',
      stock: 100,
      imageUrl: '/placeholder-product.png',
    },
    {
      id: 'PROD003',
      name: 'Basic Tool',
      categoryId: 'TOOLS',
      price: 24.99,
      unit: 'KG',
      stock: 0,
      imageUrl: 'https://example.com/tool.jpg',
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
    delete process.env['COMPANY_ID']
  })

  describe('getProducts', () => {
    it('should fetch and transform products successfully', async () => {
      mockQuery.mockResolvedValueOnce({ data: mockProductsResponse })

      const result = await getProducts()

      expect(result).toEqual(expectedTransformedProducts)
    })

    it('should use default company ID when env not set', async () => {
      interface MockQueryArgs {
        variables: Record<string, unknown>
      }
      let capturedVariables: Record<string, unknown> | null = null
      mockQuery.mockImplementationOnce((args: MockQueryArgs) => {
        capturedVariables = args.variables
        return Promise.resolve({ data: mockProductsResponse })
      })

      await getProducts()

      expect(capturedVariables).toMatchObject({
        company_id: 'alfe', // Default company ID
      })
    })

    it('should use company ID from environment when set', async () => {
      process.env['COMPANY_ID'] = 'test_company'

      interface MockQueryArgs {
        variables: Record<string, unknown>
      }
      let capturedVariables: Record<string, unknown> | null = null
      mockQuery.mockImplementationOnce((args: MockQueryArgs) => {
        capturedVariables = args.variables
        return Promise.resolve({ data: mockProductsResponse })
      })

      await getProducts()

      expect(capturedVariables).toMatchObject({
        company_id: 'test_company',
      })
    })

    it('should handle empty stock array', async () => {
      mockQuery.mockResolvedValueOnce({ data: { stock: [] } })

      const result = await getProducts()
      expect(result).toEqual([])
    })

    it('should handle missing stock field', async () => {
      mockQuery.mockResolvedValueOnce({ data: {} })

      const result = await getProducts()
      expect(result).toEqual([])
      expect(console.error).toHaveBeenCalledWith(
        'No products data returned from GraphQL'
      )
    })

    it('should handle null data response', async () => {
      mockQuery.mockResolvedValueOnce({ data: null })

      const result = await getProducts()
      expect(result).toEqual([])
      expect(console.error).toHaveBeenCalledWith(
        'No products data returned from GraphQL'
      )
    })

    it('should handle products with null values', async () => {
      const responseWithNulls = {
        stock: [
          {
            stock_id: 'PROD001',
            stock_name: null,
            stock_group: null,
            stock_price: null,
            stock_unit: null,
            available_stock: null,
            stock_image_link: null,
          },
        ],
      }

      mockQuery.mockResolvedValueOnce({ data: responseWithNulls })

      const result = await getProducts()

      expect(result).toEqual([
        {
          id: 'PROD001',
          name: 'Unknown Product',
          categoryId: 'uncategorized',
          price: 0,
          unit: 'EA',
          stock: 0,
          imageUrl: '/placeholder-product.png',
        },
      ])
    })

    it('should handle network errors', async () => {
      mockQuery.mockRejectedValueOnce(new Error('Network error'))

      await expect(getProducts()).rejects.toThrow('Failed to fetch products')
      expect(console.error).toHaveBeenCalled()
    })

    it('should handle GraphQL errors', async () => {
      mockQuery.mockRejectedValueOnce(new Error('GraphQL Error'))

      await expect(getProducts()).rejects.toThrow('Failed to fetch products')
      expect(console.error).toHaveBeenCalled()
    })

    it('should handle validation errors', async () => {
      mockQuery.mockResolvedValueOnce({
        data: {
          stock: [{ invalid_field: 'bad_data' }],
        },
      })

      await expect(getProducts()).rejects.toThrow('Failed to fetch products')
      expect(console.error).toHaveBeenCalled()
    })
  })

  describe('getProductsByCategory', () => {
    it('should filter products by category', async () => {
      mockQuery.mockResolvedValueOnce({ data: mockProductsResponse })

      const result = await getProductsByCategory('ELECTRONICS')

      expect(result).toEqual([
        {
          id: 'PROD001',
          name: 'Premium Widget',
          categoryId: 'ELECTRONICS',
          price: 99.99,
          unit: 'EA',
          stock: 50,
          imageUrl: 'https://example.com/widget.jpg',
        },
      ])
    })

    it('should return empty array for non-existent category', async () => {
      mockQuery.mockResolvedValueOnce({ data: mockProductsResponse })

      const result = await getProductsByCategory('NON_EXISTENT')
      expect(result).toEqual([])
    })

    it('should handle category filtering with empty products', async () => {
      mockQuery.mockResolvedValueOnce({ data: { stock: [] } })

      const result = await getProductsByCategory('ELECTRONICS')
      expect(result).toEqual([])
    })

    it('should filter multiple products in same category', async () => {
      const multiCategoryResponse = {
        stock: [
          {
            stock_id: 'PROD001',
            stock_name: 'Product 1',
            stock_group: 'ELECTRONICS',
            stock_price: 10,
            stock_unit: 'EA',
            available_stock: 5,
            stock_image_link: null,
          },
          {
            stock_id: 'PROD002',
            stock_name: 'Product 2',
            stock_group: 'ELECTRONICS',
            stock_price: 20,
            stock_unit: 'EA',
            available_stock: 10,
            stock_image_link: null,
          },
          {
            stock_id: 'PROD003',
            stock_name: 'Product 3',
            stock_group: 'FURNITURE',
            stock_price: 30,
            stock_unit: 'EA',
            available_stock: 15,
            stock_image_link: null,
          },
        ],
      }

      mockQuery.mockResolvedValueOnce({ data: multiCategoryResponse })

      const result = await getProductsByCategory('ELECTRONICS')
      expect(result).toHaveLength(2)
      expect(result.every(p => p.categoryId === 'ELECTRONICS')).toBe(true)
    })
  })

  describe('searchProducts', () => {
    it('should search products by name', async () => {
      mockQuery.mockResolvedValueOnce({ data: mockProductsResponse })

      const result = await searchProducts('widget')

      expect(result).toEqual([
        {
          id: 'PROD001',
          name: 'Premium Widget',
          categoryId: 'ELECTRONICS',
          price: 99.99,
          unit: 'EA',
          stock: 50,
          imageUrl: 'https://example.com/widget.jpg',
        },
      ])
    })

    it('should perform case-insensitive search', async () => {
      mockQuery.mockResolvedValueOnce({ data: mockProductsResponse })

      const result = await searchProducts('GADGET')

      expect(result).toEqual([
        {
          id: 'PROD002',
          name: 'Standard Gadget',
          categoryId: 'FURNITURE',
          price: 49.99,
          unit: 'PCS',
          stock: 100,
          imageUrl: '/placeholder-product.png',
        },
      ])
    })

    it('should search with partial matches', async () => {
      mockQuery.mockResolvedValueOnce({ data: mockProductsResponse })

      const result = await searchProducts('Tool')

      expect(result).toEqual([
        {
          id: 'PROD003',
          name: 'Basic Tool',
          categoryId: 'TOOLS',
          price: 24.99,
          unit: 'KG',
          stock: 0,
          imageUrl: 'https://example.com/tool.jpg',
        },
      ])
    })

    it('should return empty array for no matches', async () => {
      mockQuery.mockResolvedValueOnce({ data: mockProductsResponse })

      const result = await searchProducts('xyz123')
      expect(result).toEqual([])
    })

    it('should return all products for empty search term', async () => {
      mockQuery.mockResolvedValueOnce({ data: mockProductsResponse })

      const result = await searchProducts('')
      expect(result).toEqual(expectedTransformedProducts)
    })

    it('should find multiple matching products', async () => {
      const searchableResponse = {
        stock: [
          {
            stock_id: 'PROD001',
            stock_name: 'Premium Product',
            stock_group: 'CAT1',
            stock_price: 10,
            stock_unit: 'EA',
            available_stock: 5,
            stock_image_link: null,
          },
          {
            stock_id: 'PROD002',
            stock_name: 'Standard Product',
            stock_group: 'CAT2',
            stock_price: 20,
            stock_unit: 'EA',
            available_stock: 10,
            stock_image_link: null,
          },
          {
            stock_id: 'PROD003',
            stock_name: 'Basic Item',
            stock_group: 'CAT3',
            stock_price: 30,
            stock_unit: 'EA',
            available_stock: 15,
            stock_image_link: null,
          },
        ],
      }

      mockQuery.mockResolvedValueOnce({ data: searchableResponse })

      const result = await searchProducts('Product')
      expect(result).toHaveLength(2)
      expect(result.every(p => p.name.includes('Product'))).toBe(true)
    })

    it('should handle search with special characters', async () => {
      const specialResponse = {
        stock: [
          {
            stock_id: 'PROD001',
            stock_name: 'Product (Special)',
            stock_group: 'CAT1',
            stock_price: 10,
            stock_unit: 'EA',
            available_stock: 5,
            stock_image_link: null,
          },
        ],
      }

      mockQuery.mockResolvedValueOnce({ data: specialResponse })

      const result = await searchProducts('(Special)')
      expect(result).toHaveLength(1)
      expect(result[0]?.name).toBe('Product (Special)')
    })
  })

  describe('Product transformation', () => {
    it('should provide fallback image for products without images', async () => {
      mockQuery.mockResolvedValueOnce({ data: mockProductsResponse })

      const result = await getProducts()

      const productWithoutImage = result.find(p => p.id === 'PROD002')
      expect(productWithoutImage?.imageUrl).toBe('/placeholder-product.png')
    })

    it('should preserve original image URL when provided', async () => {
      mockQuery.mockResolvedValueOnce({ data: mockProductsResponse })

      const result = await getProducts()

      const productWithImage = result.find(p => p.id === 'PROD001')
      expect(productWithImage?.imageUrl).toBe('https://example.com/widget.jpg')
    })

    it('should handle all null/undefined optional fields gracefully', async () => {
      const minimalResponse = {
        stock: [
          {
            stock_id: 'MINIMAL001',
            stock_name: 'Minimal Product',
            stock_group: 'CATEGORY',
            stock_price: 15.99,
            stock_unit: 'EA',
            available_stock: 25,
            stock_image_link: null,
          },
        ],
      }

      mockQuery.mockResolvedValueOnce({ data: minimalResponse })

      const result = await getProducts()

      expect(result?.[0]).toEqual({
        id: 'MINIMAL001',
        name: 'Minimal Product',
        categoryId: 'CATEGORY',
        price: 15.99,
        unit: 'EA',
        stock: 25,
        imageUrl: '/placeholder-product.png',
      })
    })
  })
})
