/**
 * Unit Tests for Categories Schema Definitions
 * SOLID Principles: Single Responsibility - Testing category schemas
 * Design Patterns: Test Pattern with comprehensive coverage
 * Dependencies: Jest, Zod schemas, mock data
 */

import {
  StockGroupSchema,
  GetCategoriesQueryResponseSchema,
  GraphQLCategoriesResponseSchema,
  type StockGroup,
  type GetCategoriesQueryResponse,
  type GraphQLCategoriesResponse,
} from './categories'
import mockCategoriesData from '@/mock/categories.json'

describe('Categories Schema Definitions', () => {
  // Use real mock data
  const validStockGroup = mockCategoriesData.data._type_stock_groups[0]!
  const validCategoriesResponse = mockCategoriesData.data
  const validGraphQLResponse = mockCategoriesData

  describe('StockGroupSchema', () => {
    it('should validate a valid stock group from mock data', () => {
      const result = StockGroupSchema.safeParse(validStockGroup)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.stock_groups).toBe('1000 - Pizzakartonger')
        expect(result.data.our_company).toBe('alfe')
        expect(result.data.image_url).toBe(
          'https://res.cloudinary.com/dnptbuf0s/image/upload/v1754299206/samples/atp-store-customer/alfe-fallback_nopd5j.jpg'
        )
        expect(result.data.alt_text).toBe('category image')
      }
    })

    it('should validate all stock groups from mock data', () => {
      mockCategoriesData.data._type_stock_groups.forEach(stockGroup => {
        const result = StockGroupSchema.safeParse(stockGroup)
        expect(result.success).toBe(true)
      })
    })

    it('should reject missing stock_groups field', () => {
      const invalidData = {
        our_company: 'alfe',
        image_url: 'https://example.com/image.jpg',
        alt_text: 'test',
      }
      const result = StockGroupSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0]?.path).toContain('stock_groups')
      }
    })

    it('should reject missing our_company field', () => {
      const invalidData = {
        stock_groups: '1000 - Test',
        image_url: 'https://example.com/image.jpg',
        alt_text: 'test',
      }
      const result = StockGroupSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0]?.path).toContain('our_company')
      }
    })

    it('should reject missing image_url field', () => {
      const invalidData = {
        stock_groups: '1000 - Test',
        our_company: 'alfe',
        alt_text: 'test',
      }
      const result = StockGroupSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0]?.path).toContain('image_url')
      }
    })

    it('should reject missing alt_text field', () => {
      const invalidData = {
        stock_groups: '1000 - Test',
        our_company: 'alfe',
        image_url: 'https://example.com/image.jpg',
      }
      const result = StockGroupSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0]?.path).toContain('alt_text')
      }
    })

    it('should reject non-string stock_groups', () => {
      const invalidData = {
        stock_groups: 1000,
        our_company: 'alfe',
        image_url: 'https://example.com/image.jpg',
        alt_text: 'test',
      }
      const result = StockGroupSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should reject non-string our_company', () => {
      const invalidData = {
        stock_groups: '1000 - Test',
        our_company: true,
        image_url: 'https://example.com/image.jpg',
        alt_text: 'test',
      }
      const result = StockGroupSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should reject non-string image_url', () => {
      const invalidData = {
        stock_groups: '1000 - Test',
        our_company: 'alfe',
        image_url: 123,
        alt_text: 'test',
      }
      const result = StockGroupSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should reject non-string alt_text', () => {
      const invalidData = {
        stock_groups: '1000 - Test',
        our_company: 'alfe',
        image_url: 'https://example.com/image.jpg',
        alt_text: null,
      }
      const result = StockGroupSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should strip extra fields not in schema', () => {
      const dataWithExtras = {
        ...validStockGroup,
        extra_field: 'should be removed',
        another_field: 123,
      }
      const result = StockGroupSchema.safeParse(dataWithExtras)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toEqual(validStockGroup)
        expect('extra_field' in result.data).toBe(false)
      }
    })
  })

  describe('GetCategoriesQueryResponseSchema', () => {
    it('should validate the complete mock categories response', () => {
      const result = GetCategoriesQueryResponseSchema.safeParse(
        validCategoriesResponse
      )
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data._type_stock_groups).toHaveLength(13)
        expect(result.data._type_stock_groups[0]?.stock_groups).toBe(
          '1000 - Pizzakartonger'
        )
      }
    })

    it('should validate empty array response', () => {
      const emptyResponse = { _type_stock_groups: [] }
      const result = GetCategoriesQueryResponseSchema.safeParse(emptyResponse)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data._type_stock_groups).toHaveLength(0)
      }
    })

    it('should reject missing _type_stock_groups field', () => {
      const invalidData = {}
      const result = GetCategoriesQueryResponseSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should reject non-array _type_stock_groups', () => {
      const invalidData = { _type_stock_groups: 'not-an-array' }
      const result = GetCategoriesQueryResponseSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should reject null _type_stock_groups', () => {
      const invalidData = { _type_stock_groups: null }
      const result = GetCategoriesQueryResponseSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should reject array with invalid stock group objects', () => {
      const invalidData = {
        _type_stock_groups: [
          {
            stock_groups: '1000 - Test',
            // missing required fields
          },
        ],
      }
      const result = GetCategoriesQueryResponseSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })

  describe('GraphQLCategoriesResponseSchema', () => {
    it('should validate the complete mock GraphQL response', () => {
      const result =
        GraphQLCategoriesResponseSchema.safeParse(validGraphQLResponse)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.data._type_stock_groups).toHaveLength(13)
        expect(result.data.errors).toBeUndefined()
      }
    })

    it('should validate response with errors field', () => {
      const responseWithErrors = {
        data: { _type_stock_groups: [] },
        errors: [
          {
            message: 'Permission denied',
            extensions: { code: 'FORBIDDEN' },
          },
        ],
      }
      const result =
        GraphQLCategoriesResponseSchema.safeParse(responseWithErrors)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.errors).toHaveLength(1)
        expect(result.data.errors?.[0]?.message).toBe('Permission denied')
      }
    })

    it('should validate errors without extensions', () => {
      const responseWithSimpleError = {
        data: { _type_stock_groups: [] },
        errors: [{ message: 'Simple error' }],
      }
      const result = GraphQLCategoriesResponseSchema.safeParse(
        responseWithSimpleError
      )
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.errors?.[0]?.extensions).toBeUndefined()
      }
    })

    it('should reject missing data field', () => {
      const invalidData = {
        errors: [{ message: 'Error' }],
      }
      const result = GraphQLCategoriesResponseSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should reject invalid error structure (missing message)', () => {
      const invalidData = {
        data: { _type_stock_groups: [] },
        errors: [{ extensions: {} }],
      }
      const result = GraphQLCategoriesResponseSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should accept various extension types', () => {
      const responseWithVariousExtensions = {
        data: { _type_stock_groups: [] },
        errors: [
          { message: 'Error 1', extensions: 'string' },
          { message: 'Error 2', extensions: 123 },
          { message: 'Error 3', extensions: { nested: { deep: true } } },
          { message: 'Error 4', extensions: null },
          { message: 'Error 5', extensions: [] },
        ],
      }
      const result = GraphQLCategoriesResponseSchema.safeParse(
        responseWithVariousExtensions
      )
      expect(result.success).toBe(true)
    })
  })

  describe('TypeScript type inference', () => {
    it('should correctly type StockGroup', () => {
      const stockGroup: StockGroup = validStockGroup
      expect(stockGroup.stock_groups).toBeDefined()
      expect(stockGroup.our_company).toBeDefined()
      expect(stockGroup.image_url).toBeDefined()
      expect(stockGroup.alt_text).toBeDefined()
    })

    it('should correctly type GetCategoriesQueryResponse', () => {
      const response: GetCategoriesQueryResponse = validCategoriesResponse
      expect(response._type_stock_groups).toBeDefined()
      expect(Array.isArray(response._type_stock_groups)).toBe(true)
    })

    it('should correctly type GraphQLCategoriesResponse', () => {
      const response: GraphQLCategoriesResponse = validGraphQLResponse
      expect(response.data).toBeDefined()
      expect(response.data._type_stock_groups).toBeDefined()
    })
  })

  describe('Edge cases', () => {
    it('should handle empty strings in all fields', () => {
      const emptyStrings = {
        stock_groups: '',
        our_company: '',
        image_url: '',
        alt_text: '',
      }
      const result = StockGroupSchema.safeParse(emptyStrings)
      expect(result.success).toBe(true)
    })

    it('should handle very long strings', () => {
      const longString = 'a'.repeat(10000)
      const longData = {
        stock_groups: longString,
        our_company: longString,
        image_url: longString,
        alt_text: longString,
      }
      const result = StockGroupSchema.safeParse(longData)
      expect(result.success).toBe(true)
    })

    it('should handle special characters and unicode', () => {
      const specialData = {
        stock_groups: '1000 - 🍕📦 <script>alert("xss")</script>',
        our_company: 'älfe™\n\t\r',
        image_url: 'https://example.com/image?param=value&other=123',
        alt_text: '画像 イメージ صورة',
      }
      const result = StockGroupSchema.safeParse(specialData)
      expect(result.success).toBe(true)
    })

    it('should handle large arrays efficiently', () => {
      const largeArray = Array(1000).fill(validStockGroup)
      const largeResponse = { _type_stock_groups: largeArray }
      const result = GetCategoriesQueryResponseSchema.safeParse(largeResponse)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data._type_stock_groups).toHaveLength(1000)
      }
    })
  })
})
