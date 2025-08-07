/**
 * Unit tests for GetMostPurchasedProductsQuery schema and types
 * SOLID Principles: SRP - Testing single responsibility
 * Design Patterns: Test Pattern
 * Dependencies: Jest, Zod schemas, types
 */

import { describe, it, expect } from '@jest/globals'
import { ZodError } from 'zod'
import {
  GetMostPurchasedProductsQueryVariablesSchema,
  GoodsTransactionStockRelSchema,
  AmountCreditSumSchema,
  GoodsTransactionRelAggregateSchema,
  GoodsTransactionAggregateSchema,
  GoodsTransactionSchema,
  GoodsTransactionsCountAggregateSchema,
  GoodsTransactionsAggregateSchema,
  GetMostPurchasedProductsQueryResponseSchema,
  validateGetMostPurchasedProductsResponse,
  safeValidateGetMostPurchasedProductsResponse,
} from './GetMostPurchasedProductsQuery.schema'
import {
  isGetMostPurchasedProductsQueryResponse,
  type GetMostPurchasedProductsQueryVariables,
  type GoodsTransactionStockRel,
  type AmountCreditSum,
  type GoodsTransactionRelAggregate,
  type GoodsTransactionAggregate,
  type GoodsTransaction,
  type GoodsTransactionsCountAggregate,
  type GoodsTransactionsAggregate,
  type GetMostPurchasedProductsQueryResponse,
} from './GetMostPurchasedProductsQuery.types'

describe('GetMostPurchasedProductsQuery', () => {
  describe('Schema Validation', () => {
    describe('GetMostPurchasedProductsQueryVariablesSchema', () => {
      it('should validate valid variables', () => {
        const validVariables: GetMostPurchasedProductsQueryVariables = {
          company_id: 'comp_123',
          customer_id: 'cust_456',
          bd: '2024-01-01',
          ed: '2024-12-31',
        }
        const result =
          GetMostPurchasedProductsQueryVariablesSchema.parse(validVariables)
        expect(result).toEqual(validVariables)
      })

      it('should reject missing fields', () => {
        const invalidVariables = {
          company_id: 'comp_123',
          customer_id: 'cust_456',
          bd: '2024-01-01',
          // missing ed
        }
        expect(() =>
          GetMostPurchasedProductsQueryVariablesSchema.parse(invalidVariables)
        ).toThrow(ZodError)
      })

      it('should reject invalid types', () => {
        const invalidVariables = {
          company_id: 'comp_123',
          customer_id: 'cust_456',
          bd: 123, // should be string
          ed: '2024-12-31',
        }
        expect(() =>
          GetMostPurchasedProductsQueryVariablesSchema.parse(invalidVariables)
        ).toThrow(ZodError)
      })
    })

    describe('GoodsTransactionStockRelSchema', () => {
      it('should validate valid stock relation', () => {
        const validStockRel: GoodsTransactionStockRel = {
          stock_id: 'stock_123',
          stock_name: 'Product Name',
          stock_price: 99.99,
          stock_unit: 'pcs',
          stock_group: 'ELECTRONICS',
          stock_image_link: 'https://example.com/image.jpg',
        }
        const result = GoodsTransactionStockRelSchema.parse(validStockRel)
        expect(result).toEqual(validStockRel)
      })

      it('should validate stock relation with null values', () => {
        const validStockRel: GoodsTransactionStockRel = {
          stock_id: 'stock_123',
          stock_name: null,
          stock_price: null,
          stock_unit: null,
          stock_group: null,
          stock_image_link: null,
        }
        const result = GoodsTransactionStockRelSchema.parse(validStockRel)
        expect(result).toEqual(validStockRel)
      })

      it('should reject missing stock_id', () => {
        const invalidStockRel = {
          stock_name: 'Product',
          stock_price: 10,
          stock_unit: 'pcs',
          stock_group: 'GROUP',
          stock_image_link: 'link',
        }
        expect(() =>
          GoodsTransactionStockRelSchema.parse(invalidStockRel)
        ).toThrow(ZodError)
      })
    })

    describe('AmountCreditSumSchema', () => {
      it('should validate valid amount credit sum', () => {
        const validSum: AmountCreditSum = {
          amount_credit: 1234.56,
        }
        const result = AmountCreditSumSchema.parse(validSum)
        expect(result).toEqual(validSum)
      })

      it('should validate null amount_credit', () => {
        const validSum: AmountCreditSum = {
          amount_credit: null,
        }
        const result = AmountCreditSumSchema.parse(validSum)
        expect(result).toEqual(validSum)
      })

      it('should reject missing amount_credit', () => {
        const invalidSum = {}
        expect(() => AmountCreditSumSchema.parse(invalidSum)).toThrow(ZodError)
      })
    })

    describe('GoodsTransactionRelAggregateSchema', () => {
      it('should validate valid aggregate', () => {
        const validAggregate: GoodsTransactionRelAggregate = {
          sum: {
            amount_credit: 500.0,
          },
        }
        const result = GoodsTransactionRelAggregateSchema.parse(validAggregate)
        expect(result).toEqual(validAggregate)
      })

      it('should reject missing sum', () => {
        const invalidAggregate = {}
        expect(() =>
          GoodsTransactionRelAggregateSchema.parse(invalidAggregate)
        ).toThrow(ZodError)
      })
    })

    describe('GoodsTransactionAggregateSchema', () => {
      it('should validate valid transaction aggregate', () => {
        const validAggregate: GoodsTransactionAggregate = {
          aggregate: {
            sum: {
              amount_credit: 750.25,
            },
          },
        }
        const result = GoodsTransactionAggregateSchema.parse(validAggregate)
        expect(result).toEqual(validAggregate)
      })

      it('should reject missing aggregate', () => {
        const invalidAggregate = {}
        expect(() =>
          GoodsTransactionAggregateSchema.parse(invalidAggregate)
        ).toThrow(ZodError)
      })
    })

    describe('GoodsTransactionSchema', () => {
      it('should validate valid goods transaction', () => {
        const validTransaction: GoodsTransaction = {
          stock_id: 'stock_123',
          goods_transactions_stock_rel: {
            stock_id: 'stock_123',
            stock_name: 'Product',
            stock_price: 50.0,
            stock_unit: 'box',
            stock_group: 'GROUP_A',
            stock_image_link: 'https://example.com/img.jpg',
          },
          goods_transaction_goods_transaction_rel_aggregate: {
            aggregate: {
              sum: {
                amount_credit: 1500.0,
              },
            },
          },
        }
        const result = GoodsTransactionSchema.parse(validTransaction)
        expect(result).toEqual(validTransaction)
      })

      it('should reject missing fields', () => {
        const invalidTransaction = {
          stock_id: 'stock_123',
          // missing other required fields
        }
        expect(() => GoodsTransactionSchema.parse(invalidTransaction)).toThrow(
          ZodError
        )
      })
    })

    describe('GoodsTransactionsCountAggregateSchema', () => {
      it('should validate valid count aggregate', () => {
        const validCount: GoodsTransactionsCountAggregate = {
          count: 42,
        }
        const result = GoodsTransactionsCountAggregateSchema.parse(validCount)
        expect(result).toEqual(validCount)
      })

      it('should validate zero count', () => {
        const validCount: GoodsTransactionsCountAggregate = {
          count: 0,
        }
        const result = GoodsTransactionsCountAggregateSchema.parse(validCount)
        expect(result).toEqual(validCount)
      })

      it('should reject missing count', () => {
        const invalidCount = {}
        expect(() =>
          GoodsTransactionsCountAggregateSchema.parse(invalidCount)
        ).toThrow(ZodError)
      })
    })

    describe('GoodsTransactionsAggregateSchema', () => {
      it('should validate valid transactions aggregate', () => {
        const validAggregate: GoodsTransactionsAggregate = {
          aggregate: {
            count: 100,
          },
        }
        const result = GoodsTransactionsAggregateSchema.parse(validAggregate)
        expect(result).toEqual(validAggregate)
      })

      it('should reject missing aggregate', () => {
        const invalidAggregate = {}
        expect(() =>
          GoodsTransactionsAggregateSchema.parse(invalidAggregate)
        ).toThrow(ZodError)
      })
    })

    describe('GetMostPurchasedProductsQueryResponseSchema', () => {
      it('should validate valid complete response', () => {
        const validResponse: GetMostPurchasedProductsQueryResponse = {
          goods_transactions: [
            {
              stock_id: 'stock_123',
              goods_transactions_stock_rel: {
                stock_id: 'stock_123',
                stock_name: 'Top Product',
                stock_price: 99.99,
                stock_unit: 'pcs',
                stock_group: 'BEST_SELLERS',
                stock_image_link: null,
              },
              goods_transaction_goods_transaction_rel_aggregate: {
                aggregate: {
                  sum: {
                    amount_credit: 5000.0,
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
        }
        const result =
          GetMostPurchasedProductsQueryResponseSchema.parse(validResponse)
        expect(result).toEqual(validResponse)
      })

      it('should validate empty transactions array', () => {
        const validResponse: GetMostPurchasedProductsQueryResponse = {
          goods_transactions: [],
          goods_transactions_aggregate: {
            aggregate: {
              count: 0,
            },
          },
        }
        const result =
          GetMostPurchasedProductsQueryResponseSchema.parse(validResponse)
        expect(result).toEqual(validResponse)
      })

      it('should reject missing goods_transactions', () => {
        const invalidResponse = {
          goods_transactions_aggregate: {
            aggregate: {
              count: 0,
            },
          },
        }
        expect(() =>
          GetMostPurchasedProductsQueryResponseSchema.parse(invalidResponse)
        ).toThrow(ZodError)
      })

      it('should reject missing goods_transactions_aggregate', () => {
        const invalidResponse = {
          goods_transactions: [],
        }
        expect(() =>
          GetMostPurchasedProductsQueryResponseSchema.parse(invalidResponse)
        ).toThrow(ZodError)
      })
    })

    describe('validateGetMostPurchasedProductsResponse', () => {
      it('should parse valid response', () => {
        const validResponse = {
          goods_transactions: [],
          goods_transactions_aggregate: {
            aggregate: {
              count: 0,
            },
          },
        }
        const result = validateGetMostPurchasedProductsResponse(validResponse)
        expect(result).toEqual(validResponse)
      })

      it('should throw on invalid response', () => {
        const invalidResponse = {
          goods_transactions: 'invalid',
        }
        expect(() =>
          validateGetMostPurchasedProductsResponse(invalidResponse)
        ).toThrow(ZodError)
      })

      it('should throw on null response', () => {
        expect(() => validateGetMostPurchasedProductsResponse(null)).toThrow(
          ZodError
        )
      })

      it('should throw on undefined response', () => {
        expect(() =>
          validateGetMostPurchasedProductsResponse(undefined)
        ).toThrow(ZodError)
      })
    })

    describe('safeValidateGetMostPurchasedProductsResponse', () => {
      it('should return success for valid response', () => {
        const validResponse = {
          goods_transactions: [],
          goods_transactions_aggregate: {
            aggregate: {
              count: 0,
            },
          },
        }
        const result =
          safeValidateGetMostPurchasedProductsResponse(validResponse)
        expect(result.success).toBe(true)
        if (result.success) {
          expect(result.data).toEqual(validResponse)
        }
      })

      it('should return error for invalid response', () => {
        const invalidResponse = {
          goods_transactions: 'invalid',
        }
        const result =
          safeValidateGetMostPurchasedProductsResponse(invalidResponse)
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error).toBeInstanceOf(ZodError)
        }
      })

      it('should return error for null', () => {
        const result = safeValidateGetMostPurchasedProductsResponse(null)
        expect(result.success).toBe(false)
      })

      it('should return error for undefined', () => {
        const result = safeValidateGetMostPurchasedProductsResponse(undefined)
        expect(result.success).toBe(false)
      })
    })
  })

  describe('Type Guards', () => {
    describe('isGetMostPurchasedProductsQueryResponse', () => {
      it('should return true for valid response', () => {
        const validResponse = {
          goods_transactions: [],
          goods_transactions_aggregate: {
            aggregate: {
              count: 0,
            },
          },
        }
        expect(isGetMostPurchasedProductsQueryResponse(validResponse)).toBe(
          true
        )
      })

      it('should return false for null', () => {
        expect(isGetMostPurchasedProductsQueryResponse(null)).toBe(false)
      })

      it('should return false for undefined', () => {
        expect(isGetMostPurchasedProductsQueryResponse(undefined)).toBe(false)
      })

      it('should return false for string', () => {
        expect(isGetMostPurchasedProductsQueryResponse('string')).toBe(false)
      })

      it('should return false for number', () => {
        expect(isGetMostPurchasedProductsQueryResponse(123)).toBe(false)
      })

      it('should return false for missing goods_transactions', () => {
        const invalidResponse = {
          goods_transactions_aggregate: {},
        }
        expect(isGetMostPurchasedProductsQueryResponse(invalidResponse)).toBe(
          false
        )
      })

      it('should return false for missing goods_transactions_aggregate', () => {
        const invalidResponse = {
          goods_transactions: [],
        }
        expect(isGetMostPurchasedProductsQueryResponse(invalidResponse)).toBe(
          false
        )
      })

      it('should return false for non-array goods_transactions', () => {
        const invalidResponse = {
          goods_transactions: 'not an array',
          goods_transactions_aggregate: {},
        }
        expect(isGetMostPurchasedProductsQueryResponse(invalidResponse)).toBe(
          false
        )
      })

      it('should return true for valid structure', () => {
        const validResponse = {
          goods_transactions: [{}],
          goods_transactions_aggregate: {},
        }
        expect(isGetMostPurchasedProductsQueryResponse(validResponse)).toBe(
          true
        )
      })
    })
  })

  describe('Type Exports', () => {
    it('should export all required types', () => {
      const variables: GetMostPurchasedProductsQueryVariables = {
        company_id: 'comp',
        customer_id: 'cust',
        bd: '2024-01-01',
        ed: '2024-12-31',
      }
      const stockRel: GoodsTransactionStockRel = {
        stock_id: 'id',
        stock_name: null,
        stock_price: null,
        stock_unit: null,
        stock_group: null,
        stock_image_link: null,
      }
      const sum: AmountCreditSum = { amount_credit: null }
      const relAgg: GoodsTransactionRelAggregate = { sum }
      const transAgg: GoodsTransactionAggregate = { aggregate: relAgg }
      const trans: GoodsTransaction = {
        stock_id: 'id',
        goods_transactions_stock_rel: stockRel,
        goods_transaction_goods_transaction_rel_aggregate: transAgg,
      }
      const countAgg: GoodsTransactionsCountAggregate = { count: 0 }
      const transactionsAgg: GoodsTransactionsAggregate = {
        aggregate: countAgg,
      }
      const response: GetMostPurchasedProductsQueryResponse = {
        goods_transactions: [trans],
        goods_transactions_aggregate: transactionsAgg,
      }

      expect(variables).toBeDefined()
      expect(stockRel).toBeDefined()
      expect(sum).toBeDefined()
      expect(relAgg).toBeDefined()
      expect(transAgg).toBeDefined()
      expect(trans).toBeDefined()
      expect(countAgg).toBeDefined()
      expect(transactionsAgg).toBeDefined()
      expect(response).toBeDefined()
    })
  })
})
