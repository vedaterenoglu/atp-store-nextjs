/**
 * Unit Tests for GetCampaignProductsWithPrices Types
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for testing type definitions
 * - DIP: Depends on type abstractions
 *
 * Test Coverage:
 * - Type structure validation
 * - Interface property verification
 * - Optional and nullable field handling
 * - Edge cases and data validation
 */

import type {
  GetCampaignProductsWithPricesQueryVariables,
  CampaignStock,
  GetCampaignProductsWithPricesQueryResponse,
} from '../GetCampaignProductsWithPrices.types'
import { isGetCampaignProductsWithPricesQueryResponse } from '../GetCampaignProductsWithPrices.types'

describe('GetCampaignProductsWithPrices Types', () => {
  describe('GetCampaignProductsWithPricesQueryVariables', () => {
    it('should accept valid query variables', () => {
      const validVariables: GetCampaignProductsWithPricesQueryVariables = {
        company_id: 'COMP_001',
      }

      expect(validVariables.company_id).toBe('COMP_001')
      expect(typeof validVariables.company_id).toBe('string')
    })

    it('should enforce required company_id field', () => {
      const variables: GetCampaignProductsWithPricesQueryVariables = {
        company_id: 'TEST_COMPANY_123',
      }

      expect(variables).toHaveProperty('company_id')
      expect(variables.company_id).toBeDefined()
    })

    it('should handle various company_id formats', () => {
      const testCases: GetCampaignProductsWithPricesQueryVariables[] = [
        { company_id: 'COMP-001' },
        { company_id: 'company_123_456' },
        { company_id: 'ABC' },
        { company_id: '12345' },
        { company_id: 'company.test.001' },
        { company_id: 'COMPANY_ÅÄÖÆØÅ' }, // International characters
        { company_id: '' }, // Empty string (edge case)
      ]

      testCases.forEach(testCase => {
        expect(testCase).toHaveProperty('company_id')
        expect(typeof testCase.company_id).toBe('string')
      })
    })

    it('should handle very long company_id strings', () => {
      const longId = 'COMPANY_' + 'A'.repeat(1000)
      const variables: GetCampaignProductsWithPricesQueryVariables = {
        company_id: longId,
      }

      expect(variables.company_id).toHaveLength(1008)
      expect(variables.company_id).toContain('COMPANY_')
    })
  })

  describe('CampaignStock', () => {
    it('should accept valid CampaignStock objects', () => {
      const validStock: CampaignStock = {
        is_campaign_active: true,
        stock_id: 'STOCK_001',
        stock_name: 'Test Product',
        stock_group: 'Electronics',
        stock_image_link: 'https://example.com/image.jpg',
        stock_unit: 'piece',
        stock_price: 99.99,
        campaign_price: 79.99,
      }

      expect(validStock.is_campaign_active).toBe(true)
      expect(validStock.stock_id).toBe('STOCK_001')
      expect(validStock.stock_name).toBe('Test Product')
      expect(validStock.stock_group).toBe('Electronics')
      expect(validStock.stock_image_link).toBe('https://example.com/image.jpg')
      expect(validStock.stock_unit).toBe('piece')
      expect(validStock.stock_price).toBe(99.99)
      expect(validStock.campaign_price).toBe(79.99)
    })

    it('should handle null values for nullable fields', () => {
      const stockWithNulls: CampaignStock = {
        is_campaign_active: null,
        stock_id: 'STOCK_002',
        stock_name: 'Product without campaign',
        stock_group: 'Groceries',
        stock_image_link: null,
        stock_unit: 'kg',
        stock_price: 25.5,
        campaign_price: null,
      }

      expect(stockWithNulls.is_campaign_active).toBeNull()
      expect(stockWithNulls.stock_image_link).toBeNull()
      expect(stockWithNulls.campaign_price).toBeNull()
      expect(stockWithNulls.stock_id).toBeDefined()
      expect(stockWithNulls.stock_price).toBeDefined()
    })

    it('should handle boolean values for is_campaign_active', () => {
      const activeStock: CampaignStock = {
        is_campaign_active: true,
        stock_id: 'ACTIVE_001',
        stock_name: 'Active Campaign Product',
        stock_group: 'Group1',
        stock_image_link: null,
        stock_unit: 'unit',
        stock_price: 100,
        campaign_price: 80,
      }

      const inactiveStock: CampaignStock = {
        is_campaign_active: false,
        stock_id: 'INACTIVE_001',
        stock_name: 'Inactive Campaign Product',
        stock_group: 'Group2',
        stock_image_link: null,
        stock_unit: 'unit',
        stock_price: 100,
        campaign_price: null,
      }

      expect(activeStock.is_campaign_active).toBe(true)
      expect(inactiveStock.is_campaign_active).toBe(false)
      expect(typeof activeStock.is_campaign_active).toBe('boolean')
      expect(typeof inactiveStock.is_campaign_active).toBe('boolean')
    })

    it('should handle various price formats', () => {
      const priceTestCases: CampaignStock[] = [
        {
          is_campaign_active: true,
          stock_id: 'PRICE_001',
          stock_name: 'Integer Price',
          stock_group: 'Test',
          stock_image_link: null,
          stock_unit: 'pcs',
          stock_price: 100,
          campaign_price: 50,
        },
        {
          is_campaign_active: true,
          stock_id: 'PRICE_002',
          stock_name: 'Decimal Price',
          stock_group: 'Test',
          stock_image_link: null,
          stock_unit: 'pcs',
          stock_price: 99.99,
          campaign_price: 49.99,
        },
        {
          is_campaign_active: true,
          stock_id: 'PRICE_003',
          stock_name: 'Zero Price',
          stock_group: 'Test',
          stock_image_link: null,
          stock_unit: 'pcs',
          stock_price: 0,
          campaign_price: 0,
        },
        {
          is_campaign_active: false,
          stock_id: 'PRICE_004',
          stock_name: 'Very High Price',
          stock_group: 'Test',
          stock_image_link: null,
          stock_unit: 'pcs',
          stock_price: 999999.99,
          campaign_price: null,
        },
      ]

      priceTestCases.forEach(stock => {
        expect(typeof stock.stock_price).toBe('number')
        expect(stock.stock_price).toBeGreaterThanOrEqual(0)
        if (stock.campaign_price !== null) {
          expect(typeof stock.campaign_price).toBe('number')
        }
      })
    })

    it('should handle various image link formats', () => {
      const imageTestCases: CampaignStock[] = [
        {
          is_campaign_active: null,
          stock_id: 'IMG_001',
          stock_name: 'HTTPS Image',
          stock_group: 'Test',
          stock_image_link: 'https://example.com/image.jpg',
          stock_unit: 'pcs',
          stock_price: 10,
          campaign_price: null,
        },
        {
          is_campaign_active: null,
          stock_id: 'IMG_002',
          stock_name: 'HTTP Image',
          stock_group: 'Test',
          stock_image_link: 'http://example.com/image.png',
          stock_unit: 'pcs',
          stock_price: 10,
          campaign_price: null,
        },
        {
          is_campaign_active: null,
          stock_id: 'IMG_003',
          stock_name: 'Relative Path Image',
          stock_group: 'Test',
          stock_image_link: '/images/product.webp',
          stock_unit: 'pcs',
          stock_price: 10,
          campaign_price: null,
        },
        {
          is_campaign_active: null,
          stock_id: 'IMG_004',
          stock_name: 'Data URI Image',
          stock_group: 'Test',
          stock_image_link: 'data:image/png;base64,iVBORw0KGgoAAAANS...',
          stock_unit: 'pcs',
          stock_price: 10,
          campaign_price: null,
        },
        {
          is_campaign_active: null,
          stock_id: 'IMG_005',
          stock_name: 'No Image',
          stock_group: 'Test',
          stock_image_link: null,
          stock_unit: 'pcs',
          stock_price: 10,
          campaign_price: null,
        },
      ]

      imageTestCases.forEach(stock => {
        if (stock.stock_image_link !== null) {
          expect(typeof stock.stock_image_link).toBe('string')
        } else {
          expect(stock.stock_image_link).toBeNull()
        }
      })
    })

    it('should handle special characters in string fields', () => {
      const specialCharStock: CampaignStock = {
        is_campaign_active: true,
        stock_id: 'SPECIAL_#001',
        stock_name: 'Product™ with © Special® Characters & Symbols',
        stock_group: 'Café & Résumé',
        stock_image_link: 'https://example.com/image%20with%20spaces.jpg',
        stock_unit: 'm²',
        stock_price: 99.99,
        campaign_price: 79.99,
      }

      expect(specialCharStock.stock_name).toContain('™')
      expect(specialCharStock.stock_name).toContain('©')
      expect(specialCharStock.stock_name).toContain('®')
      expect(specialCharStock.stock_name).toContain('&')
      expect(specialCharStock.stock_group).toContain('é')
      expect(specialCharStock.stock_unit).toContain('²')
      expect(specialCharStock.stock_image_link).toContain('%20')
    })

    it('should handle international characters', () => {
      const internationalStock: CampaignStock = {
        is_campaign_active: false,
        stock_id: 'INTL_001',
        stock_name: 'Tüm Ürünler için Özel İndirim',
        stock_group: 'Möbler och Heminredning',
        stock_image_link: null,
        stock_unit: 'stück',
        stock_price: 250.0,
        campaign_price: 200.0,
      }

      expect(internationalStock.stock_name).toContain('ü')
      expect(internationalStock.stock_name).toContain('Ö')
      expect(internationalStock.stock_name).toContain('İ')
      expect(internationalStock.stock_group).toContain('ö')
      expect(internationalStock.stock_unit).toContain('ü')
    })

    it('should handle very long string values', () => {
      const longString = 'A'.repeat(5000)
      const longStock: CampaignStock = {
        is_campaign_active: null,
        stock_id: longString,
        stock_name: longString,
        stock_group: longString,
        stock_image_link: `https://example.com/${longString}.jpg`,
        stock_unit: longString,
        stock_price: 100,
        campaign_price: null,
      }

      expect(longStock.stock_id).toHaveLength(5000)
      expect(longStock.stock_name).toHaveLength(5000)
      expect(longStock.stock_group).toHaveLength(5000)
      expect(longStock.stock_unit).toHaveLength(5000)
      expect(longStock.stock_image_link).toContain(longString)
    })

    it('should validate all required fields are present', () => {
      const completeStock: CampaignStock = {
        is_campaign_active: true,
        stock_id: 'COMPLETE_001',
        stock_name: 'Complete Product',
        stock_group: 'Complete Group',
        stock_image_link: 'https://example.com/complete.jpg',
        stock_unit: 'complete',
        stock_price: 100,
        campaign_price: 80,
      }

      // Check all required fields exist
      expect(completeStock).toHaveProperty('stock_id')
      expect(completeStock).toHaveProperty('stock_name')
      expect(completeStock).toHaveProperty('stock_group')
      expect(completeStock).toHaveProperty('stock_unit')
      expect(completeStock).toHaveProperty('stock_price')

      // Check nullable fields exist (even if null)
      expect(completeStock).toHaveProperty('is_campaign_active')
      expect(completeStock).toHaveProperty('stock_image_link')
      expect(completeStock).toHaveProperty('campaign_price')
    })
  })

  describe('GetCampaignProductsWithPricesQueryResponse', () => {
    it('should accept valid response structure', () => {
      const validResponse: GetCampaignProductsWithPricesQueryResponse = {
        stock: [
          {
            is_campaign_active: true,
            stock_id: 'RESP_001',
            stock_name: 'Response Product 1',
            stock_group: 'Group1',
            stock_image_link: 'https://example.com/1.jpg',
            stock_unit: 'pcs',
            stock_price: 100,
            campaign_price: 80,
          },
          {
            is_campaign_active: false,
            stock_id: 'RESP_002',
            stock_name: 'Response Product 2',
            stock_group: 'Group2',
            stock_image_link: null,
            stock_unit: 'kg',
            stock_price: 50,
            campaign_price: null,
          },
        ],
      }

      expect(validResponse.stock).toHaveLength(2)
      expect(Array.isArray(validResponse.stock)).toBe(true)
      expect(validResponse.stock[0]?.stock_id).toBe('RESP_001')
      expect(validResponse.stock[1]?.stock_id).toBe('RESP_002')
    })

    it('should handle empty stock array', () => {
      const emptyResponse: GetCampaignProductsWithPricesQueryResponse = {
        stock: [],
      }

      expect(emptyResponse.stock).toEqual([])
      expect(emptyResponse.stock).toHaveLength(0)
      expect(Array.isArray(emptyResponse.stock)).toBe(true)
    })

    it('should handle single item in stock array', () => {
      const singleItemResponse: GetCampaignProductsWithPricesQueryResponse = {
        stock: [
          {
            is_campaign_active: null,
            stock_id: 'SINGLE_001',
            stock_name: 'Single Product',
            stock_group: 'Single',
            stock_image_link: null,
            stock_unit: 'unit',
            stock_price: 25,
            campaign_price: null,
          },
        ],
      }

      expect(singleItemResponse.stock).toHaveLength(1)
      expect(singleItemResponse.stock[0]?.stock_id).toBe('SINGLE_001')
    })

    it('should handle large stock arrays', () => {
      const largeStockArray: CampaignStock[] = Array.from(
        { length: 1000 },
        (_, index) => ({
          is_campaign_active: index % 2 === 0,
          stock_id: `STOCK_${index.toString().padStart(4, '0')}`,
          stock_name: `Product ${index + 1}`,
          stock_group: `Group${(index % 10) + 1}`,
          stock_image_link:
            index % 3 === 0 ? null : `https://example.com/img${index}.jpg`,
          stock_unit: ['pcs', 'kg', 'liter', 'meter'][index % 4] || 'pcs',
          stock_price: (index + 1) * 10,
          campaign_price: index % 2 === 0 ? (index + 1) * 8 : null,
        })
      )

      const largeResponse: GetCampaignProductsWithPricesQueryResponse = {
        stock: largeStockArray,
      }

      expect(largeResponse.stock).toHaveLength(1000)
      expect(largeResponse.stock[0]?.stock_id).toBe('STOCK_0000')
      expect(largeResponse.stock[999]?.stock_id).toBe('STOCK_0999')

      // Verify some items have campaigns
      const withCampaign = largeResponse.stock.filter(
        s => s.is_campaign_active === true
      )
      const withoutCampaign = largeResponse.stock.filter(
        s => s.is_campaign_active === false
      )
      expect(withCampaign.length).toBeGreaterThan(0)
      expect(withoutCampaign.length).toBeGreaterThan(0)
    })

    it('should support array operations on stock', () => {
      const response: GetCampaignProductsWithPricesQueryResponse = {
        stock: [
          {
            is_campaign_active: true,
            stock_id: 'FILTER_001',
            stock_name: 'Active Campaign',
            stock_group: 'Electronics',
            stock_image_link: null,
            stock_unit: 'pcs',
            stock_price: 100,
            campaign_price: 75,
          },
          {
            is_campaign_active: false,
            stock_id: 'FILTER_002',
            stock_name: 'No Campaign',
            stock_group: 'Electronics',
            stock_image_link: null,
            stock_unit: 'pcs',
            stock_price: 200,
            campaign_price: null,
          },
          {
            is_campaign_active: true,
            stock_id: 'FILTER_003',
            stock_name: 'Another Active',
            stock_group: 'Groceries',
            stock_image_link: null,
            stock_unit: 'kg',
            stock_price: 50,
            campaign_price: 40,
          },
        ],
      }

      // Test filter
      const activeCampaigns = response.stock.filter(
        s => s.is_campaign_active === true
      )
      expect(activeCampaigns).toHaveLength(2)

      // Test map
      const stockIds = response.stock.map(s => s.stock_id)
      expect(stockIds).toEqual(['FILTER_001', 'FILTER_002', 'FILTER_003'])

      // Test find
      const electronics = response.stock.find(
        s => s.stock_group === 'Electronics'
      )
      expect(electronics?.stock_id).toBe('FILTER_001')

      // Test some
      const hasGroceries = response.stock.some(
        s => s.stock_group === 'Groceries'
      )
      expect(hasGroceries).toBe(true)

      // Test every
      const allHavePrice = response.stock.every(s => s.stock_price > 0)
      expect(allHavePrice).toBe(true)

      // Test reduce
      const totalPrice = response.stock.reduce(
        (sum, s) => sum + s.stock_price,
        0
      )
      expect(totalPrice).toBe(350)
    })

    it('should handle mixed null and non-null campaign data', () => {
      const mixedResponse: GetCampaignProductsWithPricesQueryResponse = {
        stock: [
          {
            is_campaign_active: true,
            stock_id: 'MIX_001',
            stock_name: 'With Campaign',
            stock_group: 'Test',
            stock_image_link: 'image1.jpg',
            stock_unit: 'pcs',
            stock_price: 100,
            campaign_price: 80,
          },
          {
            is_campaign_active: null,
            stock_id: 'MIX_002',
            stock_name: 'Unknown Campaign Status',
            stock_group: 'Test',
            stock_image_link: null,
            stock_unit: 'pcs',
            stock_price: 100,
            campaign_price: null,
          },
          {
            is_campaign_active: false,
            stock_id: 'MIX_003',
            stock_name: 'No Campaign',
            stock_group: 'Test',
            stock_image_link: 'image3.jpg',
            stock_unit: 'pcs',
            stock_price: 100,
            campaign_price: null,
          },
        ],
      }

      const activeCount = mixedResponse.stock.filter(
        s => s.is_campaign_active === true
      ).length
      const inactiveCount = mixedResponse.stock.filter(
        s => s.is_campaign_active === false
      ).length
      const nullCount = mixedResponse.stock.filter(
        s => s.is_campaign_active === null
      ).length

      expect(activeCount).toBe(1)
      expect(inactiveCount).toBe(1)
      expect(nullCount).toBe(1)
    })
  })

  describe('Type Guard Function', () => {
    it('should identify valid responses', () => {
      const validResponse: GetCampaignProductsWithPricesQueryResponse = {
        stock: [
          {
            is_campaign_active: true,
            stock_id: 'GUARD_001',
            stock_name: 'Guard Test Product',
            stock_group: 'Test',
            stock_image_link: null,
            stock_unit: 'unit',
            stock_price: 100,
            campaign_price: 80,
          },
        ],
      }

      expect(isGetCampaignProductsWithPricesQueryResponse(validResponse)).toBe(
        true
      )
    })

    it('should identify empty stock array as valid', () => {
      const emptyResponse = { stock: [] }
      expect(isGetCampaignProductsWithPricesQueryResponse(emptyResponse)).toBe(
        true
      )
    })

    it('should reject null', () => {
      expect(isGetCampaignProductsWithPricesQueryResponse(null)).toBe(false)
    })

    it('should reject undefined', () => {
      expect(isGetCampaignProductsWithPricesQueryResponse(undefined)).toBe(
        false
      )
    })

    it('should reject primitive types', () => {
      expect(isGetCampaignProductsWithPricesQueryResponse('string')).toBe(false)
      expect(isGetCampaignProductsWithPricesQueryResponse(123)).toBe(false)
      expect(isGetCampaignProductsWithPricesQueryResponse(true)).toBe(false)
    })

    it('should reject objects without stock property', () => {
      expect(isGetCampaignProductsWithPricesQueryResponse({})).toBe(false)
      expect(isGetCampaignProductsWithPricesQueryResponse({ data: [] })).toBe(
        false
      )
      expect(isGetCampaignProductsWithPricesQueryResponse({ items: [] })).toBe(
        false
      )
    })

    it('should reject objects with non-array stock property', () => {
      expect(
        isGetCampaignProductsWithPricesQueryResponse({ stock: 'not array' })
      ).toBe(false)
      expect(isGetCampaignProductsWithPricesQueryResponse({ stock: 123 })).toBe(
        false
      )
      expect(
        isGetCampaignProductsWithPricesQueryResponse({ stock: null })
      ).toBe(false)
      expect(isGetCampaignProductsWithPricesQueryResponse({ stock: {} })).toBe(
        false
      )
    })

    it('should accept valid response with multiple items', () => {
      const multiItemResponse = {
        stock: [
          {
            is_campaign_active: true,
            stock_id: 'MULTI_001',
            stock_name: 'Product 1',
            stock_group: 'Group1',
            stock_image_link: 'image1.jpg',
            stock_unit: 'pcs',
            stock_price: 100,
            campaign_price: 80,
          },
          {
            is_campaign_active: false,
            stock_id: 'MULTI_002',
            stock_name: 'Product 2',
            stock_group: 'Group2',
            stock_image_link: null,
            stock_unit: 'kg',
            stock_price: 50,
            campaign_price: null,
          },
        ],
      }

      expect(
        isGetCampaignProductsWithPricesQueryResponse(multiItemResponse)
      ).toBe(true)
    })

    it('should not validate internal structure of stock items', () => {
      // Type guard only checks if stock is an array, not the validity of items
      const invalidItemsResponse = {
        stock: ['invalid item', 123, null, { random: 'object' }],
      }

      // Should still return true because stock is an array
      expect(
        isGetCampaignProductsWithPricesQueryResponse(invalidItemsResponse)
      ).toBe(true)
    })
  })

  describe('Type Relationships and Composition', () => {
    it('should maintain type consistency between interfaces', () => {
      // Create variables that match the query
      const variables: GetCampaignProductsWithPricesQueryVariables = {
        company_id: 'TEST_COMPANY',
      }

      // Create stock items
      const stockItem1: CampaignStock = {
        is_campaign_active: true,
        stock_id: 'REL_001',
        stock_name: 'Related Product 1',
        stock_group: 'Group1',
        stock_image_link: null,
        stock_unit: 'pcs',
        stock_price: 100,
        campaign_price: 80,
      }

      const stockItem2: CampaignStock = {
        is_campaign_active: false,
        stock_id: 'REL_002',
        stock_name: 'Related Product 2',
        stock_group: 'Group2',
        stock_image_link: null,
        stock_unit: 'kg',
        stock_price: 50,
        campaign_price: null,
      }

      // Create response using the stock items
      const response: GetCampaignProductsWithPricesQueryResponse = {
        stock: [stockItem1, stockItem2],
      }

      // Verify the relationships work correctly
      expect(variables.company_id).toBe('TEST_COMPANY')
      expect(response.stock).toContain(stockItem1)
      expect(response.stock).toContain(stockItem2)
      expect(response.stock[0]).toBe(stockItem1)
      expect(response.stock[1]).toBe(stockItem2)
    })

    it('should support type composition for complex scenarios', () => {
      // Simulate a query execution flow
      const executeQuery = (
        variables: GetCampaignProductsWithPricesQueryVariables
      ): GetCampaignProductsWithPricesQueryResponse => {
        // Mock implementation
        const mockStock: CampaignStock[] = [
          {
            is_campaign_active: true,
            stock_id: `STOCK_${variables.company_id}_001`,
            stock_name: 'Mock Product',
            stock_group: 'Mock Group',
            stock_image_link: null,
            stock_unit: 'unit',
            stock_price: 100,
            campaign_price: 75,
          },
        ]

        return { stock: mockStock }
      }

      const variables: GetCampaignProductsWithPricesQueryVariables = {
        company_id: 'COMP_TEST',
      }

      const result = executeQuery(variables)

      expect(result.stock).toHaveLength(1)
      expect(result.stock[0]?.stock_id).toContain('COMP_TEST')
      expect(result.stock[0]?.campaign_price).toBe(75)
    })
  })
})
