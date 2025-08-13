/**
 * Unit Tests for Price Service
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for testing price operations
 * - DIP: Depends on mocked abstractions
 *
 * Test Coverage:
 * - Price fetching and calculation
 * - Discount calculations
 * - Bulk operations
 * - Error handling
 */

import {
  getProductPrices,
  calculateCustomerPrice,
  calculateDiscountPercentage,
  getBulkProductPrices,
} from '../price.service'
import type {
  GetProductPricesQueryResponse,
  StockPriceItem,
} from '@/services/graphql/queries/GetProductPricesQuery.types'

// Mock the validation function
jest.mock('@/services/graphql/queries/GetProductPricesQuery.schema', () => ({
  validateGetProductPricesResponse: jest.fn(data => data),
}))

// Mock the env config
jest.mock('@/lib/config/env', () => ({
  env: {
    COMPANY_ID: 'test-company',
  },
}))

// Store original fetch to restore later
const originalFetch = global.fetch

// Mock fetch globally
const mockFetch = jest.fn()

// Note: console.error is mocked in jest.setup.ts, so we don't need to spy on it here
// The setup file suppresses specific error messages but still logs others

// Helper function to create a valid StockPriceItem
function createMockStockItem(
  overrides: Partial<StockPriceItem> = {}
): StockPriceItem {
  return {
    stock_price: 10000,
    stock_price_a: null,
    stock_price_b: null,
    stock_price_c: null,
    stock_price_d: null,
    stock_price_s: null,
    stock_price_hra: null,
    stock_price_hrb: null,
    stock_price_hrc: null,
    stock_price_hrd: null,
    stock_price_z: null,
    campaign_price: null,
    is_campaign_active: false,
    stock_moms: 25,
    ...overrides,
  }
}

describe('Price Service', () => {
  beforeAll(() => {
    // Override global fetch with our mock
    global.fetch = mockFetch as jest.Mock
  })

  beforeEach(() => {
    jest.clearAllMocks()
    mockFetch.mockClear()
  })

  afterAll(() => {
    // Restore original fetch
    global.fetch = originalFetch
  })

  describe('getProductPrices', () => {
    const mockResponse: GetProductPricesQueryResponse = {
      stock: [
        createMockStockItem({
          stock_price: 10000,
          stock_price_a: 9500,
          stock_price_b: 9000,
          stock_price_c: 8500,
          stock_price_d: 8000,
          stock_price_s: 9200,
          stock_price_hra: 9800,
          stock_price_hrb: 9300,
          stock_price_hrc: 8800,
          stock_price_hrd: 8300,
          stock_price_z: 7500,
          is_campaign_active: true,
          campaign_price: 7000,
        }),
      ],
      customer_price_list: [
        {
          customers_price: 8500,
        },
      ],
      customers: [
        {
          customer_price_class: 'B',
        },
      ],
    }

    it('should fetch product prices successfully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await getProductPrices('STOCK_001', 'CUST_001')

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/product-prices?')
      )
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('company_id=test-company')
      )
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('customer_id=CUST_001')
      )
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('stock_id=STOCK_001')
      )
      expect(result).toEqual(mockResponse)
    })

    it('should use provided company ID', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      await getProductPrices('STOCK_001', 'CUST_001', 'custom-company')

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('company_id=custom-company')
      )
    })

    it('should use default company ID when not provided', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      await getProductPrices('STOCK_001', 'CUST_001')

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('company_id=test-company')
      )
    })

    it('should construct proper URL based on environment', async () => {
      // The service checks typeof window === 'undefined' for server-side
      // In jest-dom environment, window is always defined, so we test client-side behavior
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      await getProductPrices('STOCK_001', 'CUST_001')

      // In client-side (window defined), it uses relative URL
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/product-prices?')
      )
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('company_id=test-company')
      )
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('customer_id=CUST_001')
      )
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('stock_id=STOCK_001')
      )
    })

    it('should handle fetch errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Internal Server Error',
      })

      await expect(getProductPrices('STOCK_001', 'CUST_001')).rejects.toThrow(
        'Failed to fetch product prices'
      )
      // console.error is called internally but mocked in jest.setup.ts
    })

    it('should handle network errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      await expect(getProductPrices('STOCK_001', 'CUST_001')).rejects.toThrow(
        'Failed to fetch product prices'
      )
      // console.error is called internally but mocked in jest.setup.ts
    })

    it('should validate response data', async () => {
      const { validateGetProductPricesResponse } = jest.requireMock(
        '@/services/graphql/queries/GetProductPricesQuery.schema'
      )

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      await getProductPrices('STOCK_001', 'CUST_001')

      expect(validateGetProductPricesResponse).toHaveBeenCalledWith(
        mockResponse
      )
    })
  })

  describe('calculateCustomerPrice', () => {
    it('should calculate price with campaign priority', async () => {
      const mockData: GetProductPricesQueryResponse = {
        stock: [
          createMockStockItem({
            stock_price: 10000,
            stock_price_b: 9000,
            is_campaign_active: true,
            campaign_price: 7000,
          }),
        ],
        customer_price_list: [
          {
            customers_price: 8500,
          },
        ],
        customers: [
          {
            customer_price_class: 'B',
          },
        ],
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      })

      const result = await calculateCustomerPrice('STOCK_001', 'CUST_001')

      expect(result).toEqual({
        basePrice: 10000,
        customerPrice: 8500,
        campaignPrice: 7000,
        finalPrice: 7000, // Campaign price has priority
        isCampaignActive: true,
        priceClass: 'b',
      })
    })

    it('should use customer-specific price when no campaign', async () => {
      const mockData: GetProductPricesQueryResponse = {
        stock: [
          createMockStockItem({
            stock_price: 10000,
            stock_price_b: 9000,
            is_campaign_active: false,
            campaign_price: null,
          }),
        ],
        customer_price_list: [
          {
            customers_price: 8500,
          },
        ],
        customers: [
          {
            customer_price_class: 'B',
          },
        ],
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      })

      const result = await calculateCustomerPrice('STOCK_001', 'CUST_001')

      expect(result.finalPrice).toBe(8500) // Customer-specific price
    })

    it('should use price class when no customer-specific price', async () => {
      const mockData: GetProductPricesQueryResponse = {
        stock: [
          createMockStockItem({
            stock_price: 10000,
            stock_price_b: 9000,
            is_campaign_active: false,
            campaign_price: null,
          }),
        ],
        customer_price_list: [],
        customers: [
          {
            customer_price_class: 'B',
          },
        ],
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      })

      const result = await calculateCustomerPrice('STOCK_001', 'CUST_001')

      expect(result.finalPrice).toBe(9000) // Price class B
      expect(result.priceClass).toBe('b')
    })

    it('should handle all price classes', async () => {
      const priceClasses = [
        'A',
        'B',
        'C',
        'D',
        'S',
        'HRA',
        'HRB',
        'HRC',
        'HRD',
        'Z',
      ]

      for (const priceClass of priceClasses) {
        const mockData: GetProductPricesQueryResponse = {
          stock: [
            createMockStockItem({
              stock_price: 10000,
              stock_price_a: 9500,
              stock_price_b: 9000,
              stock_price_c: 8500,
              stock_price_d: 8000,
              stock_price_s: 9200,
              stock_price_hra: 9800,
              stock_price_hrb: 9300,
              stock_price_hrc: 8800,
              stock_price_hrd: 8300,
              stock_price_z: 7500,
              is_campaign_active: false,
              campaign_price: null,
            }),
          ],
          customer_price_list: [],
          customers: [
            {
              customer_price_class: priceClass,
            },
          ],
        }

        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockData,
        })

        const result = await calculateCustomerPrice('STOCK_001', 'CUST_001')
        expect(result.priceClass).toBe(priceClass.toLowerCase())
      }
    })

    it('should use base price as fallback', async () => {
      const mockData: GetProductPricesQueryResponse = {
        stock: [
          createMockStockItem({
            stock_price: 10000,
            is_campaign_active: false,
            campaign_price: null,
          }),
        ],
        customer_price_list: [],
        customers: [],
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      })

      const result = await calculateCustomerPrice('STOCK_001', 'CUST_001')

      expect(result.finalPrice).toBe(10000) // Base price
      expect(result.priceClass).toBeNull()
    })

    it('should handle missing stock', async () => {
      const mockData: GetProductPricesQueryResponse = {
        stock: [],
        customer_price_list: [],
        customers: [],
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      })

      const result = await calculateCustomerPrice('STOCK_001', 'CUST_001')

      expect(result).toEqual({
        basePrice: null,
        customerPrice: null,
        campaignPrice: null,
        finalPrice: null,
        isCampaignActive: false,
        priceClass: null,
      })
    })

    it('should handle invalid price class', async () => {
      const mockData: GetProductPricesQueryResponse = {
        stock: [
          createMockStockItem({
            stock_price: 10000,
            is_campaign_active: false,
            campaign_price: null,
          }),
        ],
        customer_price_list: [],
        customers: [
          {
            customer_price_class: 'INVALID',
          },
        ],
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      })

      const result = await calculateCustomerPrice('STOCK_001', 'CUST_001')

      expect(result.finalPrice).toBe(10000) // Falls back to base price
      expect(result.priceClass).toBe('invalid')
    })

    it('should skip zero or negative prices', async () => {
      const mockData: GetProductPricesQueryResponse = {
        stock: [
          createMockStockItem({
            stock_price: 10000,
            stock_price_b: -100, // Negative price
            is_campaign_active: true,
            campaign_price: 0, // Zero price
          }),
        ],
        customer_price_list: [
          {
            customers_price: 0, // Zero price
          },
        ],
        customers: [
          {
            customer_price_class: 'B',
          },
        ],
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      })

      const result = await calculateCustomerPrice('STOCK_001', 'CUST_001')

      expect(result.finalPrice).toBe(10000) // Falls back to base price
    })
  })

  describe('calculateDiscountPercentage', () => {
    it('should calculate correct discount percentage', () => {
      expect(calculateDiscountPercentage(10000, 7500)).toBe(25)
      expect(calculateDiscountPercentage(10000, 5000)).toBe(50)
      expect(calculateDiscountPercentage(10000, 9000)).toBe(10)
    })

    it('should round to nearest integer', () => {
      expect(calculateDiscountPercentage(10000, 6666)).toBe(33)
      expect(calculateDiscountPercentage(10000, 3333)).toBe(67)
    })

    it('should return 0 for no discount', () => {
      expect(calculateDiscountPercentage(10000, 10000)).toBe(0)
      expect(calculateDiscountPercentage(10000, 11000)).toBe(0)
    })

    it('should return 0 for invalid original price', () => {
      expect(calculateDiscountPercentage(0, 5000)).toBe(0)
      expect(calculateDiscountPercentage(-100, 50)).toBe(0)
    })

    it('should return 100 for free products', () => {
      expect(calculateDiscountPercentage(10000, 0)).toBe(100)
    })

    it('should handle edge cases', () => {
      expect(calculateDiscountPercentage(1, 0)).toBe(100)
      expect(calculateDiscountPercentage(Number.MAX_SAFE_INTEGER, 1)).toBe(100)
    })
  })

  describe('getBulkProductPrices', () => {
    it('should fetch prices for multiple products', async () => {
      const mockData: GetProductPricesQueryResponse = {
        stock: [
          createMockStockItem({
            stock_price: 10000,
            is_campaign_active: false,
            campaign_price: null,
          }),
        ],
        customer_price_list: [],
        customers: [],
      }

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockData,
      })

      const stockIds = ['STOCK_001', 'STOCK_002', 'STOCK_003']
      const result = await getBulkProductPrices(stockIds, 'CUST_001')

      expect(result).toBeInstanceOf(Map)
      expect(result.size).toBe(3)
      expect(mockFetch).toHaveBeenCalledTimes(3)

      for (const stockId of stockIds) {
        expect(result.has(stockId)).toBe(true)
        const price = result.get(stockId)
        expect(price?.basePrice).toBe(10000)
      }
    })

    it('should handle partial failures gracefully', async () => {
      // First call succeeds
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          stock: [
            createMockStockItem({
              stock_price: 10000,
              is_campaign_active: false,
              campaign_price: null,
            }),
          ],
          customer_price_list: [],
          customers: [],
        }),
      })

      // Second call fails
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      // Third call succeeds
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          stock: [
            createMockStockItem({
              stock_price: 15000,
              is_campaign_active: false,
              campaign_price: null,
            }),
          ],
          customer_price_list: [],
          customers: [],
        }),
      })

      const stockIds = ['STOCK_001', 'STOCK_002', 'STOCK_003']
      const result = await getBulkProductPrices(stockIds, 'CUST_001')

      expect(result.size).toBe(2) // Only successful fetches
      expect(result.has('STOCK_001')).toBe(true)
      expect(result.has('STOCK_002')).toBe(false) // Failed
      expect(result.has('STOCK_003')).toBe(true)
    })

    it('should handle empty stock list', async () => {
      const result = await getBulkProductPrices([], 'CUST_001')

      expect(result).toBeInstanceOf(Map)
      expect(result.size).toBe(0)
      expect(mockFetch).not.toHaveBeenCalled()
    })

    it('should pass company ID to all requests', async () => {
      const mockData: GetProductPricesQueryResponse = {
        stock: [
          createMockStockItem({
            stock_price: 10000,
            is_campaign_active: false,
            campaign_price: null,
          }),
        ],
        customer_price_list: [],
        customers: [],
      }

      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockData,
      })

      await getBulkProductPrices(
        ['STOCK_001', 'STOCK_002'],
        'CUST_001',
        'custom-company'
      )

      expect(mockFetch).toHaveBeenCalledTimes(2)
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('company_id=custom-company')
      )
    })

    it('should handle all failures', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'))

      const stockIds = ['STOCK_001', 'STOCK_002']
      const result = await getBulkProductPrices(stockIds, 'CUST_001')

      expect(result).toBeInstanceOf(Map)
      expect(result.size).toBe(0)
      // console.error is called internally but mocked in jest.setup.ts
    })
  })

  describe('Integration scenarios', () => {
    it('should handle complete price calculation flow', async () => {
      const mockData: GetProductPricesQueryResponse = {
        stock: [
          createMockStockItem({
            stock_price: 20000,
            stock_price_a: 19000,
            stock_price_b: 18000,
            stock_price_c: 17000,
            is_campaign_active: true,
            campaign_price: 15000,
          }),
        ],
        customer_price_list: [
          {
            customers_price: 16000,
          },
        ],
        customers: [
          {
            customer_price_class: 'A',
          },
        ],
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      })

      const priceResult = await calculateCustomerPrice('STOCK_001', 'CUST_001')

      // Campaign price should take priority
      expect(priceResult.finalPrice).toBe(15000)
      expect(priceResult.isCampaignActive).toBe(true)

      // Calculate discount
      const discount = calculateDiscountPercentage(20000, 15000)
      expect(discount).toBe(25)
    })

    it('should handle complex bulk pricing scenario', async () => {
      const products = [
        { id: 'PROD_1', price: 10000, campaign: 8000 },
        { id: 'PROD_2', price: 15000, campaign: null },
        { id: 'PROD_3', price: 5000, campaign: 4000 },
      ]

      let callIndex = 0
      mockFetch.mockImplementation(async () => {
        const product = products[callIndex++]
        return {
          ok: true,
          json: async () => ({
            stock: [
              createMockStockItem({
                stock_price: product?.price ?? 10000,
                is_campaign_active: product?.campaign !== null,
                campaign_price: product?.campaign ?? null,
              }),
            ],
            customer_price_list: [],
            customers: [],
          }),
        }
      })

      const stockIds = products.map(p => p.id)
      const result = await getBulkProductPrices(stockIds, 'CUST_001')

      expect(result.size).toBe(3)

      const prod1 = result.get('PROD_1')
      expect(prod1?.finalPrice).toBe(8000)
      expect(prod1?.isCampaignActive).toBe(true)

      const prod2 = result.get('PROD_2')
      expect(prod2?.finalPrice).toBe(15000)
      expect(prod2?.isCampaignActive).toBe(false)

      const prod3 = result.get('PROD_3')
      expect(prod3?.finalPrice).toBe(4000)
      expect(prod3?.isCampaignActive).toBe(true)
    })
  })
})
