/**
 * Unit tests for Most Purchased Products Service
 * SOLID Principles: SRP - Testing single responsibility
 * Design Patterns: Test Pattern with Apollo Client mocking
 * Dependencies: Jest, Apollo Client mocks
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
} from './most-purchased.service'

// Mock Apollo Client (modules are already mocked globally in jest.setup.ts)
jest.mock('@/lib/apollo/client')
jest.mock('@/lib/apollo/browser-client')
import { mockQuery } from '@/lib/apollo/__mocks__/client'

// Mock console methods
const originalConsoleError = console.error
beforeEach(() => {
  console.error = jest.fn()
  jest.clearAllMocks()
})
afterEach(() => {
  console.error = originalConsoleError
})

describe('most-purchased.service', () => {
  // Mock response matching the actual GraphQL schema
  const mockSuccessResponse = {
    data: {
      goods_transactions: [
        {
          stock_id: 'STOCK001',
          goods_transactions_stock_rel: {
            stock_id: 'STOCK001',
            stock_name: 'Premium Product',
            stock_price: 99.99,
            stock_unit: 'pcs',
            stock_group: 'ELECTRONICS',
            stock_image_link: 'https://example.com/product1.jpg',
          },
          goods_transaction_goods_transaction_rel_aggregate: {
            aggregate: {
              sum: {
                amount_credit: -150, // Negative indicates consumption
              },
            },
          },
        },
        {
          stock_id: 'STOCK002',
          goods_transactions_stock_rel: {
            stock_id: 'STOCK002',
            stock_name: 'Standard Product',
            stock_price: 49.99,
            stock_unit: 'kg',
            stock_group: 'FURNITURE',
            stock_image_link: null,
          },
          goods_transaction_goods_transaction_rel_aggregate: {
            aggregate: {
              sum: {
                amount_credit: -200,
              },
            },
          },
        },
        {
          stock_id: 'STOCK003',
          goods_transactions_stock_rel: {
            stock_id: 'STOCK003',
            stock_name: 'Basic Product',
            stock_price: 19.99,
            stock_unit: 'EA',
            stock_group: 'TOOLS',
            stock_image_link: 'https://example.com/product3.jpg',
          },
          goods_transaction_goods_transaction_rel_aggregate: {
            aggregate: {
              sum: {
                amount_credit: -75,
              },
            },
          },
        },
      ],
      goods_transactions_aggregate: {
        aggregate: {
          count: 3,
        },
      },
    },
  }

  beforeEach(() => {
    jest.clearAllMocks()
    jest.useRealTimers()
    // Reset environment variables
    delete process.env['NEXT_PUBLIC_CONSUMPTION_PERIOD_IN_DAYS']
    delete process.env['COMPANY_ID']
  })

  describe('getMostPurchasedProducts', () => {
    it('should fetch and transform most purchased products successfully', async () => {
      mockQuery.mockResolvedValueOnce(mockSuccessResponse)

      const result = await getMostPurchasedProducts(
        'customer_123',
        'company_456'
      )

      // Should be sorted by consumed units (descending) with rank
      expect(result).toEqual([
        {
          stockId: 'STOCK002',
          name: 'Standard Product',
          price: 49.99,
          unit: 'kg',
          categoryId: 'FURNITURE',
          consumedUnits: 200,
          rank: 1,
        },
        {
          stockId: 'STOCK001',
          name: 'Premium Product',
          price: 99.99,
          unit: 'pcs',
          categoryId: 'ELECTRONICS',
          imageUrl: 'https://example.com/product1.jpg',
          consumedUnits: 150,
          rank: 2,
        },
        {
          stockId: 'STOCK003',
          name: 'Basic Product',
          price: 19.99,
          unit: 'EA',
          categoryId: 'TOOLS',
          imageUrl: 'https://example.com/product3.jpg',
          consumedUnits: 75,
          rank: 3,
        },
      ])
    })

    it('should handle products with null values gracefully', async () => {
      const responseWithNulls = {
        data: {
          goods_transactions: [
            {
              stock_id: 'STOCK001',
              goods_transactions_stock_rel: null,
              goods_transaction_goods_transaction_rel_aggregate: null,
            },
            {
              stock_id: 'STOCK002',
              goods_transactions_stock_rel: {
                stock_id: 'STOCK002',
                stock_name: null,
                stock_price: null,
                stock_unit: null,
                stock_group: null,
                stock_image_link: null,
              },
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
              count: 2,
            },
          },
        },
      }

      mockQuery.mockResolvedValueOnce(responseWithNulls)

      const result = await getMostPurchasedProducts('customer_123')

      // Only products with consumed units > 0 should be returned
      expect(result).toEqual([
        {
          stockId: 'STOCK002',
          name: 'Unknown Product',
          price: 0,
          unit: 'pcs',
          categoryId: 'uncategorized',
          consumedUnits: 50,
          rank: 1,
        },
      ])
    })

    it('should use correct date range based on consumption period', async () => {
      const mockDate = new Date('2024-03-15')
      jest.useFakeTimers()
      jest.setSystemTime(mockDate)

      mockQuery.mockResolvedValueOnce(mockSuccessResponse)

      await getMostPurchasedProducts('customer_123')

      // Check that the query was called with correct variables
      expect(mockQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          variables: expect.objectContaining({
            customer_id: 'customer_123',
            company_id: 'alfe', // Default company
            bd: '2023-12-16', // 90 days before 2024-03-15
            ed: '2024-03-15',
          }),
        })
      )

      jest.useRealTimers()
    })

    it('should use custom consumption period from environment', async () => {
      process.env['NEXT_PUBLIC_CONSUMPTION_PERIOD_IN_DAYS'] = '30'
      const mockDate = new Date('2024-03-15')
      jest.useFakeTimers()
      jest.setSystemTime(mockDate)

      mockQuery.mockResolvedValueOnce(mockSuccessResponse)

      await getMostPurchasedProducts('customer_123')

      expect(mockQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          variables: expect.objectContaining({
            bd: '2024-02-14', // 30 days before
            ed: '2024-03-15',
          }),
        })
      )

      jest.useRealTimers()
    })

    it('should filter out products with zero consumption', async () => {
      const responseWithZeroConsumption = {
        data: {
          goods_transactions: [
            {
              stock_id: 'STOCK001',
              goods_transactions_stock_rel: {
                stock_id: 'STOCK001',
                stock_name: 'Product 1',
                stock_price: 10,
                stock_unit: 'pcs',
                stock_group: 'CAT1',
                stock_image_link: null,
              },
              goods_transaction_goods_transaction_rel_aggregate: {
                aggregate: {
                  sum: {
                    amount_credit: 0, // Zero consumption
                  },
                },
              },
            },
            {
              stock_id: 'STOCK002',
              goods_transactions_stock_rel: {
                stock_id: 'STOCK002',
                stock_name: 'Product 2',
                stock_price: 20,
                stock_unit: 'pcs',
                stock_group: 'CAT2',
                stock_image_link: null,
              },
              goods_transaction_goods_transaction_rel_aggregate: {
                aggregate: {
                  sum: {
                    amount_credit: -100,
                  },
                },
              },
            },
          ],
          goods_transactions_aggregate: {
            aggregate: {
              count: 2,
            },
          },
        },
      }

      mockQuery.mockResolvedValueOnce(responseWithZeroConsumption)

      const result = await getMostPurchasedProducts('customer_123')

      // Only Product 2 with consumption should be returned
      expect(result).toHaveLength(1)
      expect(result[0]?.stockId).toBe('STOCK002')
      expect(result[0]?.consumedUnits).toBe(100)
    })

    it('should handle empty response gracefully', async () => {
      mockQuery.mockResolvedValueOnce({
        data: {
          goods_transactions: [],
          goods_transactions_aggregate: {
            aggregate: {
              count: 0,
            },
          },
        },
      })

      const result = await getMostPurchasedProducts('customer_123')
      expect(result).toEqual([])
    })

    it('should handle network errors by returning empty array', async () => {
      mockQuery.mockRejectedValueOnce(new Error('Network error'))

      const result = await getMostPurchasedProducts('customer_123')
      expect(result).toEqual([])
      expect(console.error).toHaveBeenCalled()
    })

    it('should handle GraphQL errors by returning empty array', async () => {
      mockQuery.mockRejectedValueOnce(new Error('GraphQL Error'))

      const result = await getMostPurchasedProducts('customer_123')
      expect(result).toEqual([])
      expect(console.error).toHaveBeenCalled()
    })

    it('should add rank only to top 3 products', async () => {
      const manyProductsResponse = {
        data: {
          goods_transactions: [
            ...Array.from({ length: 5 }, (_, i) => ({
              stock_id: `STOCK00${i + 1}`,
              goods_transactions_stock_rel: {
                stock_id: `STOCK00${i + 1}`,
                stock_name: `Product ${i + 1}`,
                stock_price: 10 * (i + 1),
                stock_unit: 'pcs',
                stock_group: 'CATEGORY',
                stock_image_link: null,
              },
              goods_transaction_goods_transaction_rel_aggregate: {
                aggregate: {
                  sum: {
                    amount_credit: -(100 - i * 10), // Decreasing consumption
                  },
                },
              },
            })),
          ],
          goods_transactions_aggregate: {
            aggregate: {
              count: 5,
            },
          },
        },
      }

      mockQuery.mockResolvedValueOnce(manyProductsResponse)

      const result = await getMostPurchasedProducts('customer_123')

      // Check that only top 3 have ranks
      expect(result[0]?.rank).toBe(1)
      expect(result[1]?.rank).toBe(2)
      expect(result[2]?.rank).toBe(3)
      expect(result[3]?.rank).toBeUndefined()
      expect(result[4]?.rank).toBeUndefined()
    })
  })

  describe('getConsumptionPeriodInDays', () => {
    it('should return default 90 days when no env variable set', () => {
      const result = getConsumptionPeriodInDays()
      expect(result).toBe(90)
    })

    it('should return custom value from environment variable', () => {
      process.env['NEXT_PUBLIC_CONSUMPTION_PERIOD_IN_DAYS'] = '60'
      const result = getConsumptionPeriodInDays()
      expect(result).toBe(60)
    })

    it('should return NaN when env variable is invalid', () => {
      process.env['NEXT_PUBLIC_CONSUMPTION_PERIOD_IN_DAYS'] = 'invalid'
      const result = getConsumptionPeriodInDays()
      expect(result).toBeNaN()
    })

    it('should return negative value when env variable is negative', () => {
      process.env['NEXT_PUBLIC_CONSUMPTION_PERIOD_IN_DAYS'] = '-30'
      const result = getConsumptionPeriodInDays()
      expect(result).toBe(-30)
    })

    it('should return zero when env variable is zero', () => {
      process.env['NEXT_PUBLIC_CONSUMPTION_PERIOD_IN_DAYS'] = '0'
      const result = getConsumptionPeriodInDays()
      expect(result).toBe(0)
    })
  })

  describe('mostPurchasedService', () => {
    it('should expose getMostPurchasedProducts function', () => {
      expect(mostPurchasedService.getMostPurchasedProducts).toBe(
        getMostPurchasedProducts
      )
    })

    it('should expose getConsumptionPeriodInDays function', () => {
      expect(mostPurchasedService.getConsumptionPeriodInDays).toBe(
        getConsumptionPeriodInDays
      )
    })
  })

  describe('Date formatting', () => {
    it('should format dates correctly for different months', async () => {
      const testCases = [
        {
          date: '2024-01-15',
          expected: { bd: '2023-10-17', ed: '2024-01-15' },
        },
        {
          date: '2024-06-30',
          expected: { bd: '2024-04-01', ed: '2024-06-30' },
        },
        {
          date: '2024-12-31',
          expected: { bd: '2024-10-02', ed: '2024-12-31' },
        },
      ]

      for (const testCase of testCases) {
        jest.useFakeTimers()
        jest.setSystemTime(new Date(testCase.date))

        mockQuery.mockResolvedValueOnce(mockSuccessResponse)

        await getMostPurchasedProducts('customer_123')

        expect(mockQuery).toHaveBeenCalledWith(
          expect.objectContaining({
            variables: expect.objectContaining({
              bd: testCase.expected.bd,
              ed: testCase.expected.ed,
            }),
          })
        )

        jest.useRealTimers()
        jest.clearAllMocks()
      }
    })
  })
})
