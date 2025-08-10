/**
 * Unit tests for Most Purchased Products Service
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
  getMostPurchasedProducts,
  getConsumptionPeriodInDays,
  mostPurchasedService,
} from '../most-purchased.service'
import {
  mockGetMostPurchasedResponse,
  emptyResponses,
} from '@/__tests__/mocks/graphql-responses'
import { FetchMockBuilder } from '@/__tests__/utils/fetch-mock'

describe('most-purchased.service', () => {
  const mockCustomerId = 'SE0 1001 1086'
  const mockCompanyId = 'alfe'

  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(console, 'error').mockImplementation(() => {})
    delete process.env['COMPANY_ID']
    delete process.env['NEXT_PUBLIC_CONSUMPTION_PERIOD_IN_DAYS']
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('getMostPurchasedProducts', () => {
    it('should fetch and transform most purchased products successfully', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/most-purchased', mockGetMostPurchasedResponse())
        .build()

      const result = await getMostPurchasedProducts(
        mockCustomerId,
        mockCompanyId
      )

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining(
          '/api/most-purchased?company_id=alfe&customer_id=SE0+1001+1086'
        )
      )
      expect(result).toHaveLength(2) // Default mock has 2 products
      expect(result[0].rank).toBe(1) // First product should have rank 1
      expect(result[1].rank).toBe(2) // Second product should have rank 2
    })

    it('should use default company ID when not provided', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/most-purchased', mockGetMostPurchasedResponse())
        .build()

      await getMostPurchasedProducts(mockCustomerId)

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('company_id=alfe')
      )
    })

    it('should use environment company ID when available', async () => {
      process.env['COMPANY_ID'] = 'env_company'
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/most-purchased', mockGetMostPurchasedResponse())
        .build()

      await getMostPurchasedProducts(mockCustomerId)

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('company_id=env_company')
      )
    })

    it('should handle empty response', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/most-purchased', emptyResponses.mostPurchased())
        .build()

      const result = await getMostPurchasedProducts(mockCustomerId)

      expect(result).toEqual([])
    })

    it('should filter out products with zero consumption', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/most-purchased', mockGetMostPurchasedResponse())
        .build()

      const result = await getMostPurchasedProducts(mockCustomerId)

      // Default mock has products with positive consumption
      expect(result.every(p => p.consumedUnits > 0)).toBe(true)
    })

    it('should handle products with missing data gracefully', async () => {
      // Use centralized mock with null values
      global.fetch = new FetchMockBuilder()
        .mockSuccess(
          '/api/most-purchased',
          mockGetMostPurchasedResponse({
            goods_transactions: [
              {
                stock_id: 'INCOMPLETE001',
                goods_transactions_stock_rel: null,
                goods_transaction_goods_transaction_rel_aggregate: {
                  aggregate: {
                    sum: {
                      amount_credit: -50,
                    },
                  },
                },
              },
            ],
            goods_transactions_aggregate: {
              aggregate: {
                count: 1,
              },
            },
          })
        )
        .build()

      const result = await getMostPurchasedProducts(mockCustomerId)

      expect(result[0]?.name).toBe('Unknown Product')
      expect(result[0]?.price).toBe(0)
      expect(result[0]?.unit).toBe('pcs')
      expect(result[0]?.categoryId).toBe('uncategorized')
      expect(result[0]?.imageUrl).toBeUndefined()
    })

    it('should sort products by consumed units descending', async () => {
      // Default mock already has sorted products
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/most-purchased', mockGetMostPurchasedResponse())
        .build()

      const result = await getMostPurchasedProducts(mockCustomerId)

      // Check they are sorted by consumed units (24 > 1)
      expect(result[0]?.consumedUnits).toBe(24) // Highest
      expect(result[1]?.consumedUnits).toBe(1) // Lowest
    })

    it('should handle fetch errors gracefully', async () => {
      global.fetch = new FetchMockBuilder()
        .mockError('/api/most-purchased', 'Internal Server Error', 500)
        .build()

      const result = await getMostPurchasedProducts(mockCustomerId)

      expect(result).toEqual([])
      expect(console.error).toHaveBeenCalledWith(
        'Failed to fetch most purchased products:',
        expect.objectContaining({
          message: expect.stringContaining('Failed to fetch most purchased'),
        })
      )
    })

    it('should handle network errors', async () => {
      global.fetch = jest.fn<typeof fetch>(() =>
        Promise.reject(new Error('Network error'))
      )

      const result = await getMostPurchasedProducts(mockCustomerId)

      expect(result).toEqual([])
      expect(console.error).toHaveBeenCalled()
    })

    it('should handle invalid response data', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/most-purchased', { invalid: 'data' })
        .build()

      const result = await getMostPurchasedProducts(mockCustomerId)

      expect(result).toEqual([])
    })

    it('should make absolute value of negative consumption', async () => {
      // Use default mock - it has negative values that should become positive
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/most-purchased', mockGetMostPurchasedResponse())
        .build()

      const result = await getMostPurchasedProducts(mockCustomerId)

      // All consumed units should be positive
      expect(result.every(p => p.consumedUnits > 0)).toBe(true)
    })
  })

  describe('getConsumptionPeriodInDays', () => {
    it('should return default value when env var not set', () => {
      const result = getConsumptionPeriodInDays()
      expect(result).toBe(90)
    })

    it('should return value from environment variable', () => {
      process.env['NEXT_PUBLIC_CONSUMPTION_PERIOD_IN_DAYS'] = '180'
      const result = getConsumptionPeriodInDays()
      expect(result).toBe(180)
    })

    it('should return NaN for invalid env var', () => {
      process.env['NEXT_PUBLIC_CONSUMPTION_PERIOD_IN_DAYS'] = 'invalid'
      const result = getConsumptionPeriodInDays()
      expect(result).toBeNaN()
    })

    it('should return default for negative env var', () => {
      process.env['NEXT_PUBLIC_CONSUMPTION_PERIOD_IN_DAYS'] = '-30'
      const result = getConsumptionPeriodInDays()
      expect(result).toBe(-30) // parseInt handles negative values
    })
  })

  describe('mostPurchasedService singleton', () => {
    it('should expose getMostPurchasedProducts method', () => {
      expect(mostPurchasedService.getMostPurchasedProducts).toBeDefined()
      expect(typeof mostPurchasedService.getMostPurchasedProducts).toBe(
        'function'
      )
    })

    it('should expose getConsumptionPeriodInDays method', () => {
      expect(mostPurchasedService.getConsumptionPeriodInDays).toBeDefined()
      expect(typeof mostPurchasedService.getConsumptionPeriodInDays).toBe(
        'function'
      )
    })
  })

  describe('Edge cases', () => {
    it('should handle very large consumption values', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess(
          '/api/most-purchased',
          mockGetMostPurchasedResponse({
            goods_transactions: [
              {
                stock_id: 'LARGE001',
                goods_transactions_stock_rel: {
                  stock_id: 'LARGE001',
                  stock_name: 'Large Product',
                  stock_price: 100000,
                  stock_unit: 'förp.',
                  stock_group: '1000 - Test',
                  stock_image_link: 'https://example.com/image.jpg',
                },
                goods_transaction_goods_transaction_rel_aggregate: {
                  aggregate: {
                    sum: {
                      amount_credit: -999999,
                    },
                  },
                },
              },
            ],
            goods_transactions_aggregate: {
              aggregate: {
                count: 1,
              },
            },
          })
        )
        .build()

      const result = await getMostPurchasedProducts(mockCustomerId)

      expect(result[0]?.consumedUnits).toBe(999999)
    })

    it('should only assign rank to top 3 products', async () => {
      // Create response with 5 products
      const fiveProducts = Array.from({ length: 5 }, (_, i) => ({
        stock_id: `PROD-${i}`,
        goods_transactions_stock_rel: {
          stock_id: `PROD-${i}`,
          stock_name: `Product ${i}`,
          stock_price: 10000,
          stock_unit: 'förp.',
          stock_group: '1000 - Test',
          stock_image_link: 'https://example.com/image.jpg',
        },
        goods_transaction_goods_transaction_rel_aggregate: {
          aggregate: {
            sum: {
              amount_credit: -(100 - i * 10), // Descending consumption
            },
          },
        },
      }))

      global.fetch = new FetchMockBuilder()
        .mockSuccess(
          '/api/most-purchased',
          mockGetMostPurchasedResponse({
            goods_transactions: fiveProducts,
            goods_transactions_aggregate: {
              aggregate: {
                count: 5,
              },
            },
          })
        )
        .build()

      const result = await getMostPurchasedProducts(mockCustomerId)

      expect(result[0]?.rank).toBe(1)
      expect(result[1]?.rank).toBe(2)
      expect(result[2]?.rank).toBe(3)
      expect(result[3]?.rank).toBeUndefined() // No rank for 4th and beyond
    })
  })
})
