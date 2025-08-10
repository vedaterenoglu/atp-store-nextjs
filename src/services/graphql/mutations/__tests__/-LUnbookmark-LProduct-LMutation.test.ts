/**
 * Unit tests for UnbookmarkProductMutation schema and types
 * SOLID Principles: SRP - Testing single responsibility
 * Design Patterns: Test Pattern
 * Dependencies: Jest, Zod schemas, types
 */

import { describe, it, expect } from '@jest/globals'
import { ZodError } from 'zod'
import {
  UnbookmarkProductMutationVariablesSchema,
  UnbookmarkCustomerSchema,
  UnbookmarkStockSchema,
  UnbookmarkReturningSchema,
  UnbookmarkProductMutationResponseSchema,
  validateUnbookmarkProductResponse,
  safeValidateUnbookmarkProductResponse,
} from '../UnbookmarkProductMutation.schema'
import {
  isUnbookmarkProductMutationResponse,
  type UnbookmarkProductMutationVariables,
  type UnbookmarkCustomer,
  type UnbookmarkStock,
  type UnbookmarkReturning,
  type UnbookmarkProductMutationResponse,
} from '../UnbookmarkProductMutation.types'

describe('UnbookmarkProductMutation', () => {
  describe('Schema Validation', () => {
    describe('UnbookmarkProductMutationVariablesSchema', () => {
      it('should validate valid variables', () => {
        const validVariables: UnbookmarkProductMutationVariables = {
          company_id: 'comp_123',
          customer_id: 'cust_456',
          stock_id: 'stock_789',
        }
        const result =
          UnbookmarkProductMutationVariablesSchema.parse(validVariables)
        expect(result).toEqual(validVariables)
      })

      it('should reject missing fields', () => {
        const invalidVariables = {
          company_id: 'comp_123',
          customer_id: 'cust_456',
          // missing stock_id
        }
        expect(() =>
          UnbookmarkProductMutationVariablesSchema.parse(invalidVariables)
        ).toThrow(ZodError)
      })

      it('should reject invalid types', () => {
        const invalidVariables = {
          company_id: 123, // should be string
          customer_id: 'cust_456',
          stock_id: 'stock_789',
        }
        expect(() =>
          UnbookmarkProductMutationVariablesSchema.parse(invalidVariables)
        ).toThrow(ZodError)
      })

      it('should reject null values', () => {
        const invalidVariables = {
          company_id: 'comp_123',
          customer_id: null,
          stock_id: 'stock_789',
        }
        expect(() =>
          UnbookmarkProductMutationVariablesSchema.parse(invalidVariables)
        ).toThrow(ZodError)
      })
    })

    describe('UnbookmarkCustomerSchema', () => {
      it('should validate valid customer with nickname', () => {
        const validCustomer: UnbookmarkCustomer = {
          customer_id: 'cust_123',
          customer_nickname: 'JohnDoe',
        }
        const result = UnbookmarkCustomerSchema.parse(validCustomer)
        expect(result).toEqual(validCustomer)
      })

      it('should validate customer with null nickname', () => {
        const validCustomer: UnbookmarkCustomer = {
          customer_id: 'cust_123',
          customer_nickname: null,
        }
        const result = UnbookmarkCustomerSchema.parse(validCustomer)
        expect(result).toEqual(validCustomer)
      })

      it('should reject missing customer_id', () => {
        const invalidCustomer = {
          customer_nickname: 'JohnDoe',
        }
        expect(() => UnbookmarkCustomerSchema.parse(invalidCustomer)).toThrow(
          ZodError
        )
      })

      it('should reject invalid customer_id type', () => {
        const invalidCustomer = {
          customer_id: 123,
          customer_nickname: 'JohnDoe',
        }
        expect(() => UnbookmarkCustomerSchema.parse(invalidCustomer)).toThrow(
          ZodError
        )
      })
    })

    describe('UnbookmarkStockSchema', () => {
      it('should validate valid stock with name', () => {
        const validStock: UnbookmarkStock = {
          stock_id: 'stock_123',
          stock_name: 'Product Name',
        }
        const result = UnbookmarkStockSchema.parse(validStock)
        expect(result).toEqual(validStock)
      })

      it('should validate stock with null name', () => {
        const validStock: UnbookmarkStock = {
          stock_id: 'stock_123',
          stock_name: null,
        }
        const result = UnbookmarkStockSchema.parse(validStock)
        expect(result).toEqual(validStock)
      })

      it('should reject missing stock_id', () => {
        const invalidStock = {
          stock_name: 'Product Name',
        }
        expect(() => UnbookmarkStockSchema.parse(invalidStock)).toThrow(
          ZodError
        )
      })

      it('should reject invalid stock_id type', () => {
        const invalidStock = {
          stock_id: 123,
          stock_name: 'Product Name',
        }
        expect(() => UnbookmarkStockSchema.parse(invalidStock)).toThrow(
          ZodError
        )
      })
    })

    describe('UnbookmarkReturningSchema', () => {
      it('should validate complete returning object', () => {
        const validReturning: UnbookmarkReturning = {
          company_id: 'comp_123',
          customer: {
            customer_id: 'cust_123',
            customer_nickname: 'JohnDoe',
          },
          stock: {
            stock_id: 'stock_123',
            stock_name: 'Product Name',
          },
        }
        const result = UnbookmarkReturningSchema.parse(validReturning)
        expect(result).toEqual(validReturning)
      })

      it('should validate with null customer', () => {
        const validReturning: UnbookmarkReturning = {
          company_id: 'comp_123',
          customer: null,
          stock: {
            stock_id: 'stock_123',
            stock_name: 'Product Name',
          },
        }
        const result = UnbookmarkReturningSchema.parse(validReturning)
        expect(result).toEqual(validReturning)
      })

      it('should validate with null stock', () => {
        const validReturning: UnbookmarkReturning = {
          company_id: 'comp_123',
          customer: {
            customer_id: 'cust_123',
            customer_nickname: 'JohnDoe',
          },
          stock: null,
        }
        const result = UnbookmarkReturningSchema.parse(validReturning)
        expect(result).toEqual(validReturning)
      })

      it('should validate with both null', () => {
        const validReturning: UnbookmarkReturning = {
          company_id: 'comp_123',
          customer: null,
          stock: null,
        }
        const result = UnbookmarkReturningSchema.parse(validReturning)
        expect(result).toEqual(validReturning)
      })

      it('should reject missing company_id', () => {
        const invalidReturning = {
          customer: null,
          stock: null,
        }
        expect(() => UnbookmarkReturningSchema.parse(invalidReturning)).toThrow(
          ZodError
        )
      })
    })

    describe('UnbookmarkProductMutationResponseSchema', () => {
      it('should validate successful mutation response', () => {
        const validResponse: UnbookmarkProductMutationResponse = {
          delete_customer_bookmarks: {
            returning: [
              {
                company_id: 'comp_123',
                customer: {
                  customer_id: 'cust_123',
                  customer_nickname: 'JohnDoe',
                },
                stock: {
                  stock_id: 'stock_123',
                  stock_name: 'Product Name',
                },
              },
            ],
            affected_rows: 1,
          },
        }
        const result =
          UnbookmarkProductMutationResponseSchema.parse(validResponse)
        expect(result).toEqual(validResponse)
      })

      it('should validate response with null delete_customer_bookmarks', () => {
        const validResponse: UnbookmarkProductMutationResponse = {
          delete_customer_bookmarks: null,
        }
        const result =
          UnbookmarkProductMutationResponseSchema.parse(validResponse)
        expect(result).toEqual(validResponse)
      })

      it('should validate empty returning array', () => {
        const validResponse: UnbookmarkProductMutationResponse = {
          delete_customer_bookmarks: {
            returning: [],
            affected_rows: 0,
          },
        }
        const result =
          UnbookmarkProductMutationResponseSchema.parse(validResponse)
        expect(result).toEqual(validResponse)
      })

      it('should validate multiple returned unbookmarks', () => {
        const validResponse: UnbookmarkProductMutationResponse = {
          delete_customer_bookmarks: {
            returning: [
              {
                company_id: 'comp_123',
                customer: null,
                stock: null,
              },
              {
                company_id: 'comp_456',
                customer: null,
                stock: null,
              },
            ],
            affected_rows: 2,
          },
        }
        const result =
          UnbookmarkProductMutationResponseSchema.parse(validResponse)
        expect(result).toEqual(validResponse)
      })

      it('should reject missing delete_customer_bookmarks field', () => {
        const invalidResponse = {}
        expect(() =>
          UnbookmarkProductMutationResponseSchema.parse(invalidResponse)
        ).toThrow(ZodError)
      })

      it('should reject invalid affected_rows type', () => {
        const invalidResponse = {
          delete_customer_bookmarks: {
            returning: [],
            affected_rows: '1', // should be number
          },
        }
        expect(() =>
          UnbookmarkProductMutationResponseSchema.parse(invalidResponse)
        ).toThrow(ZodError)
      })

      it('should reject non-array returning field', () => {
        const invalidResponse = {
          delete_customer_bookmarks: {
            returning: 'not an array',
            affected_rows: 1,
          },
        }
        expect(() =>
          UnbookmarkProductMutationResponseSchema.parse(invalidResponse)
        ).toThrow(ZodError)
      })
    })

    describe('validateUnbookmarkProductResponse', () => {
      it('should parse valid response', () => {
        const validResponse = {
          delete_customer_bookmarks: {
            returning: [],
            affected_rows: 0,
          },
        }
        const result = validateUnbookmarkProductResponse(validResponse)
        expect(result).toEqual(validResponse)
      })

      it('should throw on invalid response', () => {
        const invalidResponse = {
          delete_customer_bookmarks: 'invalid',
        }
        expect(() =>
          validateUnbookmarkProductResponse(invalidResponse)
        ).toThrow(ZodError)
      })

      it('should throw on null response', () => {
        expect(() => validateUnbookmarkProductResponse(null)).toThrow(ZodError)
      })

      it('should throw on undefined response', () => {
        expect(() => validateUnbookmarkProductResponse(undefined)).toThrow(
          ZodError
        )
      })
    })

    describe('safeValidateUnbookmarkProductResponse', () => {
      it('should return success for valid response', () => {
        const validResponse = {
          delete_customer_bookmarks: {
            returning: [],
            affected_rows: 0,
          },
        }
        const result = safeValidateUnbookmarkProductResponse(validResponse)
        expect(result.success).toBe(true)
        if (result.success) {
          expect(result.data).toEqual(validResponse)
        }
      })

      it('should return error for invalid response', () => {
        const invalidResponse = {
          delete_customer_bookmarks: 'invalid',
        }
        const result = safeValidateUnbookmarkProductResponse(invalidResponse)
        expect(result.success).toBe(false)
        if (!result.success) {
          expect(result.error).toBeInstanceOf(ZodError)
        }
      })

      it('should return error for null', () => {
        const result = safeValidateUnbookmarkProductResponse(null)
        expect(result.success).toBe(false)
      })

      it('should return error for undefined', () => {
        const result = safeValidateUnbookmarkProductResponse(undefined)
        expect(result.success).toBe(false)
      })

      it('should return error for missing fields', () => {
        const invalidResponse = {}
        const result = safeValidateUnbookmarkProductResponse(invalidResponse)
        expect(result.success).toBe(false)
      })
    })
  })

  describe('Type Guards', () => {
    describe('isUnbookmarkProductMutationResponse', () => {
      it('should return true for valid response', () => {
        const validResponse = {
          delete_customer_bookmarks: {
            returning: [],
            affected_rows: 0,
          },
        }
        expect(isUnbookmarkProductMutationResponse(validResponse)).toBe(true)
      })

      it('should return true for response with null delete_customer_bookmarks', () => {
        const validResponse = {
          delete_customer_bookmarks: null,
        }
        expect(isUnbookmarkProductMutationResponse(validResponse)).toBe(true)
      })

      it('should return false for null', () => {
        expect(isUnbookmarkProductMutationResponse(null)).toBe(false)
      })

      it('should return false for undefined', () => {
        expect(isUnbookmarkProductMutationResponse(undefined)).toBe(false)
      })

      it('should return false for string', () => {
        expect(isUnbookmarkProductMutationResponse('string')).toBe(false)
      })

      it('should return false for number', () => {
        expect(isUnbookmarkProductMutationResponse(123)).toBe(false)
      })

      it('should return false for empty object', () => {
        expect(isUnbookmarkProductMutationResponse({})).toBe(false)
      })

      it('should return false for object with wrong field', () => {
        const invalidResponse = {
          wrong_field: 'value',
        }
        expect(isUnbookmarkProductMutationResponse(invalidResponse)).toBe(false)
      })

      it('should return true for object with delete_customer_bookmarks field', () => {
        const validResponse = {
          delete_customer_bookmarks: {},
        }
        expect(isUnbookmarkProductMutationResponse(validResponse)).toBe(true)
      })
    })
  })

  describe('Type Exports', () => {
    it('should export UnbookmarkProductMutationVariables interface', () => {
      const variables: UnbookmarkProductMutationVariables = {
        company_id: 'comp_123',
        customer_id: 'cust_456',
        stock_id: 'stock_789',
      }
      expect(variables).toBeDefined()
    })

    it('should export UnbookmarkCustomer interface', () => {
      const customer: UnbookmarkCustomer = {
        customer_id: 'cust_123',
        customer_nickname: null,
      }
      expect(customer).toBeDefined()
    })

    it('should export UnbookmarkStock interface', () => {
      const stock: UnbookmarkStock = {
        stock_id: 'stock_123',
        stock_name: null,
      }
      expect(stock).toBeDefined()
    })

    it('should export UnbookmarkReturning interface', () => {
      const returning: UnbookmarkReturning = {
        company_id: 'comp_123',
        customer: null,
        stock: null,
      }
      expect(returning).toBeDefined()
    })

    it('should export UnbookmarkProductMutationResponse interface', () => {
      const response: UnbookmarkProductMutationResponse = {
        delete_customer_bookmarks: null,
      }
      expect(response).toBeDefined()
    })
  })
})
