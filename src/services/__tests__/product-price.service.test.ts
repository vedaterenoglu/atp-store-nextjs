/**
 * Unit tests for Product Price Service
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
  fetchProductPrice,
  fetchMultipleProductPrices,
} from '../product-price.service'
import { mockGetProductPricesResponse } from '@/__tests__/mocks/graphql-responses'
import { FetchMockBuilder } from '@/__tests__/utils/fetch-mock'

describe('product-price.service', () => {
  const mockCompanyId = 'alfe'
  const mockCustomerId = 'SE0 1001 1086'
  const mockStockId = '1001 1001 0026'

  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('fetchProductPrice', () => {
    it('should fetch product price successfully', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/product-prices', mockGetProductPricesResponse())
        .build()

      const result = await fetchProductPrice(
        mockCompanyId,
        mockCustomerId,
        mockStockId
      )

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining(
          '/api/product-prices?company_id=alfe&customer_id=SE0+1001+1086&stock_id=1001+1001+0026'
        ),
        expect.objectContaining({
          cache: 'no-store',
        })
      )
      expect(result).toBeDefined()
      expect(result.unitPrice).toBeGreaterThan(0)
    })

    it('should handle standard price calculation', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/product-prices', mockGetProductPricesResponse())
        .build()

      const result = await fetchProductPrice(
        mockCompanyId,
        mockCustomerId,
        mockStockId
      )

      expect(result.unitPrice).toBeDefined()
      expect(result.priceSource).toBeDefined()
      expect(result.vatRate).toBeDefined()
    })

    it('should handle customer-specific price', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess(
          '/api/product-prices',
          mockGetProductPricesResponse({
            customer_price_list: [
              {
                customers_price: 18500,
              },
            ],
          })
        )
        .build()

      const result = await fetchProductPrice(
        mockCompanyId,
        mockCustomerId,
        mockStockId
      )

      expect(result.unitPrice).toBe(18500)
      expect(result.priceSource).toBe('customer')
    })

    it('should handle campaign price', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess(
          '/api/product-prices',
          mockGetProductPricesResponse({
            stock: [
              {
                stock_price: 25000,
                stock_price_a: 19000,
                stock_price_b: 19000,
                stock_price_c: 19000,
                stock_price_d: 19000,
                stock_price_s: 19000,
                stock_price_hra: 19000,
                stock_price_hrb: 19000,
                stock_price_hrc: 19000,
                stock_price_hrd: 19000,
                stock_price_z: 19000,
                campaign_price: 15000,
                is_campaign_active: true,
                stock_moms: 25,
              },
            ],
          })
        )
        .build()

      const result = await fetchProductPrice(
        mockCompanyId,
        mockCustomerId,
        mockStockId
      )

      expect(result.unitPrice).toBe(15000)
      expect(result.priceSource).toBe('campaign')
    })

    it('should handle fetch errors gracefully', async () => {
      global.fetch = new FetchMockBuilder()
        .mockError('/api/product-prices', 'Internal Server Error', 500)
        .build()

      await expect(
        fetchProductPrice(mockCompanyId, mockCustomerId, mockStockId)
      ).rejects.toThrow('Failed to fetch product price')

      expect(console.error).toHaveBeenCalledWith(
        'Error fetching product price:',
        expect.any(Error)
      )
    })

    it('should handle network errors', async () => {
      // Use centralized mockSequence for network rejection
      global.fetch = new FetchMockBuilder().mockSequence([
        { type: 'reject', error: 'Network error' },
      ])

      await expect(
        fetchProductPrice(mockCompanyId, mockCustomerId, mockStockId)
      ).rejects.toThrow('Failed to fetch product price')

      expect(console.error).toHaveBeenCalledWith(
        'Error fetching product price:',
        expect.any(Error)
      )
    })

    it('should handle invalid response data', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/product-prices', { invalid: 'data' })
        .build()

      await expect(
        fetchProductPrice(mockCompanyId, mockCustomerId, mockStockId)
      ).rejects.toThrow()
    })

    it('should handle null response', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/product-prices', null)
        .build()

      await expect(
        fetchProductPrice(mockCompanyId, mockCustomerId, mockStockId)
      ).rejects.toThrow('Failed to fetch product price')
    })

    it('should handle empty stock array', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess(
          '/api/product-prices',
          mockGetProductPricesResponse({
            stock: [],
            customers: [],
            customer_price_list: [],
          })
        )
        .build()

      // Service throws when no stock data is available
      await expect(
        fetchProductPrice(mockCompanyId, mockCustomerId, mockStockId)
      ).rejects.toThrow('Failed to fetch product price')
    })

    it('should use cache: no-store for API call', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/product-prices', mockGetProductPricesResponse())
        .build()

      await fetchProductPrice(mockCompanyId, mockCustomerId, mockStockId)

      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          cache: 'no-store',
        })
      )
    })

    it('should construct correct URL with parameters', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/product-prices', mockGetProductPricesResponse())
        .build()

      await fetchProductPrice('test_company', 'test_customer', 'test_stock')

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('company_id=test_company'),
        expect.any(Object)
      )
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('customer_id=test_customer'),
        expect.any(Object)
      )
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('stock_id=test_stock'),
        expect.any(Object)
      )
    })
  })

  describe('fetchMultipleProductPrices', () => {
    it('should fetch prices for multiple products', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/product-prices', mockGetProductPricesResponse())
        .build()

      const stockIds = ['STOCK-001', 'STOCK-002', 'STOCK-003']
      const result = await fetchMultipleProductPrices(
        mockCompanyId,
        mockCustomerId,
        stockIds
      )

      expect(result).toBeInstanceOf(Map)
      expect(result.size).toBe(3)
      stockIds.forEach(id => {
        expect(result.has(id)).toBe(true)
      })
    })

    it('should handle partial failures gracefully', async () => {
      // Use centralized mockSequence for complex sequential responses
      global.fetch = new FetchMockBuilder().mockSequence([
        { type: 'success', data: mockGetProductPricesResponse() },
        { type: 'reject', error: 'Network error' },
        { type: 'success', data: mockGetProductPricesResponse() },
      ])

      const stockIds = ['STOCK-001', 'STOCK-002', 'STOCK-003']
      const result = await fetchMultipleProductPrices(
        mockCompanyId,
        mockCustomerId,
        stockIds
      )

      expect(result.size).toBe(2) // Only 2 successful
      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining('Failed to fetch price for STOCK-002'),
        expect.any(Error)
      )
    })

    it('should fetch prices in parallel', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/product-prices', mockGetProductPricesResponse())
        .build()

      const stockIds = ['STOCK-001', 'STOCK-002', 'STOCK-003']
      await fetchMultipleProductPrices(mockCompanyId, mockCustomerId, stockIds)

      expect(global.fetch).toHaveBeenCalledTimes(3)
    })

    it('should handle empty stock IDs array', async () => {
      const result = await fetchMultipleProductPrices(
        mockCompanyId,
        mockCustomerId,
        []
      )

      expect(result).toBeInstanceOf(Map)
      expect(result.size).toBe(0)
      expect(global.fetch).not.toHaveBeenCalled()
    })

    it('should handle all failures gracefully', async () => {
      global.fetch = new FetchMockBuilder()
        .mockError('/api/product-prices', 'Internal Server Error', 500)
        .build()

      const stockIds = ['STOCK-001', 'STOCK-002']
      const result = await fetchMultipleProductPrices(
        mockCompanyId,
        mockCustomerId,
        stockIds
      )

      expect(result).toBeInstanceOf(Map)
      expect(result.size).toBe(0)
      expect(console.error).toHaveBeenCalled()
    })
  })

  describe('Edge cases', () => {
    it('should handle empty customer ID', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/product-prices', mockGetProductPricesResponse())
        .build()

      await fetchProductPrice(mockCompanyId, '', mockStockId)

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('customer_id=&'),
        expect.any(Object)
      )
    })

    it('should handle empty stock ID', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/product-prices', mockGetProductPricesResponse())
        .build()

      await fetchProductPrice(mockCompanyId, mockCustomerId, '')

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('stock_id='),
        expect.any(Object)
      )
    })

    it('should handle special characters in IDs', async () => {
      const specialCompanyId = 'company#123'
      const specialCustomerId = 'customer/456'
      const specialStockId = 'stock&789'
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/product-prices', mockGetProductPricesResponse())
        .build()

      await fetchProductPrice(
        specialCompanyId,
        specialCustomerId,
        specialStockId
      )

      // URLSearchParams should handle encoding
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('company_id=company%23123'),
        expect.any(Object)
      )
    })

    it('should handle VAT/MOMS in price calculation', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/product-prices', mockGetProductPricesResponse())
        .build()

      const result = await fetchProductPrice(
        mockCompanyId,
        mockCustomerId,
        mockStockId
      )

      // The price calculation should consider VAT/MOMS
      expect(result.vatRate).toBe(25) // Default mock has 25% VAT
    })
  })
})
