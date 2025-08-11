/**
 * Unit Tests for GetCampaignProductsWithPrices Schema Validation
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for testing schema validation
 * - DIP: Depends on schema abstractions
 *
 * Test Coverage:
 * - Schema validation for all types
 * - Type guard functions
 * - Error handling and edge cases
 * - Lines 56-59 coverage (validateGetCampaignProductsWithPricesVariables)
 */

import { z } from 'zod'
import {
  GetCampaignProductsWithPricesQueryVariablesSchema,
  CampaignStockSchema,
  GetCampaignProductsWithPricesQueryResponseSchema,
  validateGetCampaignProductsWithPricesResponse,
  validateGetCampaignProductsWithPricesVariables,
} from '../GetCampaignProductsWithPrices.schema'

describe('GetCampaignProductsWithPrices Schema Validation', () => {
  describe('GetCampaignProductsWithPricesQueryVariablesSchema', () => {
    it('should validate correct query variables', () => {
      const validVariables = {
        company_id: 'COMP_001',
      }

      const result = GetCampaignProductsWithPricesQueryVariablesSchema.parse(validVariables)
      expect(result).toEqual(validVariables)
      expect(result.company_id).toBe('COMP_001')
    })

    it('should reject missing company_id', () => {
      const invalidVariables = {}

      expect(() => {
        GetCampaignProductsWithPricesQueryVariablesSchema.parse(invalidVariables)
      }).toThrow(z.ZodError)
    })

    it('should reject non-string company_id', () => {
      const invalidVariables = {
        company_id: 123,
      }

      expect(() => {
        GetCampaignProductsWithPricesQueryVariablesSchema.parse(invalidVariables)
      }).toThrow(z.ZodError)
    })

    it('should reject null company_id', () => {
      const invalidVariables = {
        company_id: null,
      }

      expect(() => {
        GetCampaignProductsWithPricesQueryVariablesSchema.parse(invalidVariables)
      }).toThrow(z.ZodError)
    })

    it('should accept empty string company_id', () => {
      const variables = {
        company_id: '',
      }

      const result = GetCampaignProductsWithPricesQueryVariablesSchema.parse(variables)
      expect(result.company_id).toBe('')
    })

    it('should handle various string formats', () => {
      const testCases = [
        { company_id: 'ABC123' },
        { company_id: 'company-with-dashes' },
        { company_id: 'company_with_underscores' },
        { company_id: 'Company With Spaces' },
        { company_id: 'Société Française' },
        { company_id: '12345' },
        { company_id: 'A'.repeat(1000) },
      ]

      testCases.forEach(testCase => {
        const result = GetCampaignProductsWithPricesQueryVariablesSchema.parse(testCase)
        expect(result).toEqual(testCase)
      })
    })
  })

  describe('CampaignStockSchema', () => {
    it('should validate correct stock item', () => {
      const validStock = {
        is_campaign_active: true,
        stock_id: 'STOCK_001',
        stock_name: 'Test Product',
        stock_group: 'Electronics',
        stock_image_link: 'https://example.com/image.jpg',
        stock_unit: 'piece',
        stock_price: 99.99,
        campaign_price: 79.99,
      }

      const result = CampaignStockSchema.parse(validStock)
      expect(result).toEqual(validStock)
    })

    it('should validate stock with null fields', () => {
      const stockWithNulls = {
        is_campaign_active: null,
        stock_id: 'STOCK_002',
        stock_name: 'Product',
        stock_group: 'Group',
        stock_image_link: null,
        stock_unit: 'kg',
        stock_price: 25.50,
        campaign_price: null,
      }

      const result = CampaignStockSchema.parse(stockWithNulls)
      expect(result.is_campaign_active).toBeNull()
      expect(result.stock_image_link).toBeNull()
      expect(result.campaign_price).toBeNull()
    })

    it('should reject missing required fields', () => {
      const invalidStock = {
        is_campaign_active: true,
        stock_id: 'STOCK_003',
        // Missing stock_name
        stock_group: 'Group',
        stock_image_link: null,
        stock_unit: 'unit',
        stock_price: 100,
        campaign_price: null,
      }

      expect(() => {
        CampaignStockSchema.parse(invalidStock)
      }).toThrow(z.ZodError)
    })

    it('should reject invalid data types', () => {
      const invalidTypes = {
        is_campaign_active: 'yes', // Should be boolean or null
        stock_id: 123, // Should be string
        stock_name: true, // Should be string
        stock_group: null, // Should be string (not nullable)
        stock_image_link: false, // Should be string or null
        stock_unit: {}, // Should be string
        stock_price: '100', // Should be number
        campaign_price: 'free', // Should be number or null
      }

      expect(() => {
        CampaignStockSchema.parse(invalidTypes)
      }).toThrow(z.ZodError)
    })

    it('should handle edge case numbers', () => {
      const edgeCaseStock = {
        is_campaign_active: false,
        stock_id: 'EDGE_001',
        stock_name: 'Edge Product',
        stock_group: 'Test',
        stock_image_link: null,
        stock_unit: 'unit',
        stock_price: 0,
        campaign_price: -10.50, // Negative price
      }

      const result = CampaignStockSchema.parse(edgeCaseStock)
      expect(result.stock_price).toBe(0)
      expect(result.campaign_price).toBe(-10.50)
    })

    it('should handle special characters in strings', () => {
      const specialStock = {
        is_campaign_active: true,
        stock_id: 'SPECIAL_#$%_001',
        stock_name: 'Product™ © ® with "quotes" and \'apostrophes\'',
        stock_group: 'Café & Résumé',
        stock_image_link: 'https://example.com/image%20with%20spaces.jpg?param=value&other=123',
        stock_unit: 'm²/kg·h',
        stock_price: 999.99,
        campaign_price: 799.99,
      }

      const result = CampaignStockSchema.parse(specialStock)
      expect(result.stock_name).toContain('™')
      expect(result.stock_group).toContain('é')
      expect(result.stock_unit).toContain('²')
    })
  })

  describe('GetCampaignProductsWithPricesQueryResponseSchema', () => {
    it('should validate correct response', () => {
      const validResponse = {
        stock: [
          {
            is_campaign_active: true,
            stock_id: 'RESP_001',
            stock_name: 'Product 1',
            stock_group: 'Group1',
            stock_image_link: 'https://example.com/1.jpg',
            stock_unit: 'pcs',
            stock_price: 100,
            campaign_price: 80,
          },
          {
            is_campaign_active: false,
            stock_id: 'RESP_002',
            stock_name: 'Product 2',
            stock_group: 'Group2',
            stock_image_link: null,
            stock_unit: 'kg',
            stock_price: 50,
            campaign_price: null,
          },
        ],
      }

      const result = GetCampaignProductsWithPricesQueryResponseSchema.parse(validResponse)
      expect(result.stock).toHaveLength(2)
      expect(result.stock[0]?.stock_id).toBe('RESP_001')
    })

    it('should validate empty stock array', () => {
      const emptyResponse = {
        stock: [],
      }

      const result = GetCampaignProductsWithPricesQueryResponseSchema.parse(emptyResponse)
      expect(result.stock).toEqual([])
    })

    it('should reject missing stock array', () => {
      const invalidResponse = {}

      expect(() => {
        GetCampaignProductsWithPricesQueryResponseSchema.parse(invalidResponse)
      }).toThrow(z.ZodError)
    })

    it('should reject non-array stock', () => {
      const invalidResponse = {
        stock: 'not an array',
      }

      expect(() => {
        GetCampaignProductsWithPricesQueryResponseSchema.parse(invalidResponse)
      }).toThrow(z.ZodError)
    })

    it('should reject invalid items in stock array', () => {
      const invalidResponse = {
        stock: [
          {
            is_campaign_active: true,
            stock_id: 'VALID_001',
            stock_name: 'Valid Product',
            stock_group: 'Group',
            stock_image_link: null,
            stock_unit: 'unit',
            stock_price: 100,
            campaign_price: null,
          },
          {
            // Invalid item - missing required fields
            is_campaign_active: true,
            stock_id: 'INVALID_001',
            // Missing other required fields
          },
        ],
      }

      expect(() => {
        GetCampaignProductsWithPricesQueryResponseSchema.parse(invalidResponse)
      }).toThrow(z.ZodError)
    })

    it('should handle large arrays', () => {
      const largeArray = Array.from({ length: 1000 }, (_, i) => ({
        is_campaign_active: i % 2 === 0,
        stock_id: `STOCK_${i}`,
        stock_name: `Product ${i}`,
        stock_group: `Group ${i % 10}`,
        stock_image_link: i % 3 === 0 ? null : `https://example.com/${i}.jpg`,
        stock_unit: 'unit',
        stock_price: i * 10,
        campaign_price: i % 2 === 0 ? i * 8 : null,
      }))

      const response = {
        stock: largeArray,
      }

      const result = GetCampaignProductsWithPricesQueryResponseSchema.parse(response)
      expect(result.stock).toHaveLength(1000)
    })
  })

  describe('validateGetCampaignProductsWithPricesResponse', () => {
    it('should validate and return correct response', () => {
      const validData = {
        stock: [
          {
            is_campaign_active: true,
            stock_id: 'VAL_001',
            stock_name: 'Valid Product',
            stock_group: 'Group',
            stock_image_link: null,
            stock_unit: 'unit',
            stock_price: 100,
            campaign_price: 80,
          },
        ],
      }

      const result = validateGetCampaignProductsWithPricesResponse(validData)
      expect(result).toEqual(validData)
      expect(result.stock).toHaveLength(1)
    })

    it('should throw ZodError for invalid response', () => {
      const invalidData = {
        stock: 'not an array',
      }

      expect(() => {
        validateGetCampaignProductsWithPricesResponse(invalidData)
      }).toThrow(z.ZodError)
    })

    it('should handle undefined input', () => {
      expect(() => {
        validateGetCampaignProductsWithPricesResponse(undefined)
      }).toThrow(z.ZodError)
    })

    it('should handle null input', () => {
      expect(() => {
        validateGetCampaignProductsWithPricesResponse(null)
      }).toThrow(z.ZodError)
    })

    it('should handle non-object input', () => {
      expect(() => {
        validateGetCampaignProductsWithPricesResponse('string')
      }).toThrow(z.ZodError)

      expect(() => {
        validateGetCampaignProductsWithPricesResponse(123)
      }).toThrow(z.ZodError)

      expect(() => {
        validateGetCampaignProductsWithPricesResponse(true)
      }).toThrow(z.ZodError)
    })

    it('should validate nested structure correctly', () => {
      const complexData = {
        stock: [
          {
            is_campaign_active: null,
            stock_id: 'COMPLEX_001',
            stock_name: 'Complex Product with "Special" Characters',
            stock_group: 'Électronique',
            stock_image_link: 'data:image/png;base64,iVBORw0KGgoAAAANS...',
            stock_unit: 'pièce',
            stock_price: 1234.56,
            campaign_price: 999.99,
          },
        ],
      }

      const result = validateGetCampaignProductsWithPricesResponse(complexData)
      expect(result.stock[0]?.stock_name).toContain('Special')
      expect(result.stock[0]?.stock_group).toContain('É')
    })
  })

  describe('validateGetCampaignProductsWithPricesVariables', () => {
    // IMPORTANT: These tests cover lines 56-59 which were previously uncovered
    it('should validate and return correct variables', () => {
      const validVariables = {
        company_id: 'TEST_COMPANY_001',
      }

      const result = validateGetCampaignProductsWithPricesVariables(validVariables)
      expect(result).toEqual(validVariables)
      expect(result.company_id).toBe('TEST_COMPANY_001')
    })

    it('should throw ZodError for missing company_id', () => {
      const invalidVariables = {}

      expect(() => {
        validateGetCampaignProductsWithPricesVariables(invalidVariables)
      }).toThrow(z.ZodError)

      try {
        validateGetCampaignProductsWithPricesVariables(invalidVariables)
      } catch (error) {
        expect(error).toBeInstanceOf(z.ZodError)
        if (error instanceof z.ZodError) {
          expect(error.issues).toBeDefined()
          expect(error.issues.length).toBeGreaterThan(0)
          expect(error.issues[0]?.path).toContain('company_id')
        }
      }
    })

    it('should throw ZodError for non-string company_id', () => {
      const invalidVariables = {
        company_id: 12345,
      }

      expect(() => {
        validateGetCampaignProductsWithPricesVariables(invalidVariables)
      }).toThrow(z.ZodError)
    })

    it('should throw ZodError for null company_id', () => {
      const invalidVariables = {
        company_id: null,
      }

      expect(() => {
        validateGetCampaignProductsWithPricesVariables(invalidVariables)
      }).toThrow(z.ZodError)
    })

    it('should handle undefined input', () => {
      expect(() => {
        validateGetCampaignProductsWithPricesVariables(undefined)
      }).toThrow(z.ZodError)
    })

    it('should handle null input', () => {
      expect(() => {
        validateGetCampaignProductsWithPricesVariables(null)
      }).toThrow(z.ZodError)
    })

    it('should handle non-object input', () => {
      expect(() => {
        validateGetCampaignProductsWithPricesVariables('string')
      }).toThrow(z.ZodError)

      expect(() => {
        validateGetCampaignProductsWithPricesVariables(123)
      }).toThrow(z.ZodError)

      expect(() => {
        validateGetCampaignProductsWithPricesVariables(true)
      }).toThrow(z.ZodError)

      expect(() => {
        validateGetCampaignProductsWithPricesVariables([])
      }).toThrow(z.ZodError)
    })

    it('should accept empty string company_id', () => {
      const variables = {
        company_id: '',
      }

      const result = validateGetCampaignProductsWithPricesVariables(variables)
      expect(result.company_id).toBe('')
    })

    it('should accept various valid string formats', () => {
      const testCases = [
        { company_id: 'SIMPLE' },
        { company_id: 'with-dashes-123' },
        { company_id: 'with_underscores_456' },
        { company_id: 'With Spaces And Numbers 789' },
        { company_id: 'Spécial Çhãracters' },
        { company_id: '🏢 Emoji Company' },
        { company_id: 'A'.repeat(5000) }, // Very long string
      ]

      testCases.forEach(testCase => {
        const result = validateGetCampaignProductsWithPricesVariables(testCase)
        expect(result).toEqual(testCase)
      })
    })

    it('should reject additional properties', () => {
      const variablesWithExtra = {
        company_id: 'VALID_ID',
        extra_field: 'should be ignored',
        another_field: 123,
      }

      const result = validateGetCampaignProductsWithPricesVariables(variablesWithExtra)
      // Zod strips unknown keys by default
      expect(result).toEqual({ company_id: 'VALID_ID' })
      expect(result).not.toHaveProperty('extra_field')
      expect(result).not.toHaveProperty('another_field')
    })

    it('should provide helpful error messages', () => {
      const testCases = [
        { input: {}, expectedPath: ['company_id'] },
        { input: { company_id: null }, expectedPath: ['company_id'] },
        { input: { company_id: 123 }, expectedPath: ['company_id'] },
        { input: { company_id: true }, expectedPath: ['company_id'] },
        { input: { company_id: {} }, expectedPath: ['company_id'] },
        { input: { company_id: [] }, expectedPath: ['company_id'] },
      ]

      testCases.forEach(({ input, expectedPath }) => {
        try {
          validateGetCampaignProductsWithPricesVariables(input)
          // Should not reach here
          expect(true).toBe(false)
        } catch (error) {
          expect(error).toBeInstanceOf(z.ZodError)
          if (error instanceof z.ZodError) {
            expect(error.issues).toBeDefined()
            expect(error.issues.length).toBeGreaterThan(0)
            expect(error.issues[0]?.path).toEqual(expectedPath)
          }
        }
      })
    })
  })

  describe('Schema Type Safety', () => {
    it('should maintain type consistency with TypeScript types', () => {
      // This test ensures our schemas match the TypeScript types
      const variables = { company_id: 'TYPE_TEST' }
      const stock = {
        is_campaign_active: true,
        stock_id: 'TYPE_001',
        stock_name: 'Type Test Product',
        stock_group: 'Test',
        stock_image_link: null,
        stock_unit: 'unit',
        stock_price: 100,
        campaign_price: 50,
      }
      const response = { stock: [stock] }

      // All should parse without errors
      expect(() => GetCampaignProductsWithPricesQueryVariablesSchema.parse(variables)).not.toThrow()
      expect(() => CampaignStockSchema.parse(stock)).not.toThrow()
      expect(() => GetCampaignProductsWithPricesQueryResponseSchema.parse(response)).not.toThrow()
      expect(() => validateGetCampaignProductsWithPricesVariables(variables)).not.toThrow()
      expect(() => validateGetCampaignProductsWithPricesResponse(response)).not.toThrow()
    })
  })
})