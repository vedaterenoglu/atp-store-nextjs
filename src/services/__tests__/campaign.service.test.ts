/**
 * Unit tests for Campaign Service
 * SOLID Principles: SRP - Single responsibility for testing campaign service
 * Design Patterns: AAA (Arrange, Act, Assert) Testing Pattern
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
import { getCampaignProducts, hasCampaignProducts } from '../campaign.service'
import {
  mockGetCampaignProductsResponse,
  emptyResponses,
} from '@/__tests__/mocks/graphql-responses'
import { FetchMockBuilder } from '@/__tests__/utils/fetch-mock'

describe('Campaign Service', () => {
  const mockCompanyId = 'alfe'

  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('getCampaignProducts', () => {
    it('should fetch and return campaign products successfully', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess(
          '/api/campaign-products',
          mockGetCampaignProductsResponse()
        )
        .build()

      const result = await getCampaignProducts(mockCompanyId)

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining(
          `/api/campaign-products?company_id=${mockCompanyId}`
        )
      )
      // Result is transformed from GraphQL response
      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBeGreaterThan(0)
    })

    it('should fetch campaign products with specific company ID', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess(
          '/api/campaign-products',
          mockGetCampaignProductsResponse()
        )
        .build()

      await getCampaignProducts('test_company')

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining(
          '/api/campaign-products?company_id=test_company'
        )
      )
    })

    it('should handle company ID correctly', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess(
          '/api/campaign-products',
          mockGetCampaignProductsResponse()
        )
        .build()

      await getCampaignProducts('custom_company')

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining(
          '/api/campaign-products?company_id=custom_company'
        )
      )
    })

    it('should handle empty campaign products', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess(
          '/api/campaign-products',
          emptyResponses.campaignProducts()
        )
        .build()

      const result = await getCampaignProducts(mockCompanyId)

      expect(result).toEqual([])
    })

    it('should handle fetch errors gracefully', async () => {
      global.fetch = new FetchMockBuilder()
        .mockError('/api/campaign-products', 'Internal Server Error', 500)
        .build()

      const result = await getCampaignProducts(mockCompanyId)

      expect(result).toEqual([])
      expect(console.error).toHaveBeenCalledWith(
        'Failed to fetch campaign products:',
        expect.any(String)
      )
    })

    it('should handle network errors', async () => {
      global.fetch = jest.fn<typeof fetch>(() =>
        Promise.reject(new Error('Network error'))
      )

      const result = await getCampaignProducts(mockCompanyId)

      expect(result).toEqual([])
      expect(console.error).toHaveBeenCalledWith(
        'Error fetching campaign products:',
        expect.objectContaining({
          message: 'Network error',
        })
      )
    })

    it('should handle invalid response data', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess('/api/campaign-products', { invalid: 'data' })
        .build()

      const result = await getCampaignProducts(mockCompanyId)

      expect(result).toEqual([])
    })

    it('should return only valid campaign products', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess(
          '/api/campaign-products',
          mockGetCampaignProductsResponse()
        )
        .build()

      const result = await getCampaignProducts(mockCompanyId)

      // All products from the mock have campaign prices
      expect(result).toHaveLength(2)
      expect(result.every(p => p.campaign_price !== undefined)).toBe(true)
    })

    it('should correctly transform campaign products', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess(
          '/api/campaign-products',
          mockGetCampaignProductsResponse()
        )
        .build()

      const result = await getCampaignProducts(mockCompanyId)

      // Check first product transformation
      expect(result[0]?.stock_id).toBe('8501 1001 0002')
      expect(result[0]?.campaign_price).toBe(4500)
      expect(result[0]?.discount_percentage).toBeGreaterThan(0)
    })
  })

  describe('hasCampaignProducts', () => {
    it('should return true when campaign products exist', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess(
          '/api/campaign-products',
          mockGetCampaignProductsResponse()
        )
        .build()

      const result = await hasCampaignProducts(mockCompanyId)

      expect(result).toBe(true)
    })

    it('should return false when no campaign products exist', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess(
          '/api/campaign-products',
          emptyResponses.campaignProducts()
        )
        .build()

      const result = await hasCampaignProducts(mockCompanyId)

      expect(result).toBe(false)
    })

    it('should return false on fetch error', async () => {
      global.fetch = new FetchMockBuilder()
        .mockError('/api/campaign-products', 'Internal Server Error', 500)
        .build()

      const result = await hasCampaignProducts(mockCompanyId)

      expect(result).toBe(false)
    })

    it('should return false on network error', async () => {
      global.fetch = jest.fn<typeof fetch>(() =>
        Promise.reject(new Error('Network error'))
      )

      const result = await hasCampaignProducts(mockCompanyId)

      expect(result).toBe(false)
    })

    it('should use provided company ID', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess(
          '/api/campaign-products',
          mockGetCampaignProductsResponse()
        )
        .build()

      await hasCampaignProducts('test_company')

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining(
          '/api/campaign-products?company_id=test_company'
        )
      )
    })
  })

  describe('Edge cases', () => {
    it('should handle campaign products with zero prices', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess(
          '/api/campaign-products',
          mockGetCampaignProductsResponse({
            stock: [
              {
                is_campaign_active: true,
                stock_id: 'TEST-001',
                stock_name: 'Test Product',
                stock_group: 'TEST',
                stock_image_link: 'https://example.com/image.jpg',
                stock_unit: 'st.',
                stock_price: 10000,
                campaign_price: 0,
              },
            ],
          })
        )
        .build()

      const result = await getCampaignProducts(mockCompanyId)

      expect(result[0]?.campaign_price).toBe(0)
    })

    it('should handle campaign products with equal normal and campaign prices', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess(
          '/api/campaign-products',
          mockGetCampaignProductsResponse({
            stock: [
              {
                is_campaign_active: true,
                stock_id: 'TEST-001',
                stock_name: 'Test Product',
                stock_group: 'TEST',
                stock_image_link: 'https://example.com/image.jpg',
                stock_unit: 'st.',
                stock_price: 10000,
                campaign_price: 10000,
              },
            ],
          })
        )
        .build()

      const result = await getCampaignProducts(mockCompanyId)

      expect(result[0]?.stock_price).toBe(10000)
      expect(result[0]?.campaign_price).toBe(10000)
    })

    it('should handle campaign products with special characters in names', async () => {
      global.fetch = new FetchMockBuilder()
        .mockSuccess(
          '/api/campaign-products',
          mockGetCampaignProductsResponse({
            stock: [
              {
                is_campaign_active: true,
                stock_id: 'TEST-001',
                stock_name: 'Product™ with © symbols & más',
                stock_group: 'TEST',
                stock_image_link: 'https://example.com/image.jpg',
                stock_unit: 'st.',
                stock_price: 10000,
                campaign_price: 5000,
              },
            ],
          })
        )
        .build()

      const result = await getCampaignProducts(mockCompanyId)

      expect(result[0]?.stock_name).toBe('Product™ with © symbols & más')
    })

    it('should handle large lists of campaign products', async () => {
      const largeStock = Array.from({ length: 100 }, (_, i) => ({
        is_campaign_active: true,
        stock_id: `PROD-${i}`,
        stock_name: `Product ${i}`,
        stock_group: 'TEST',
        stock_image_link: 'https://example.com/image.jpg',
        stock_unit: 'st.',
        stock_price: 10000,
        campaign_price: 5000 + i,
      }))
      global.fetch = new FetchMockBuilder()
        .mockSuccess(
          '/api/campaign-products',
          mockGetCampaignProductsResponse({ stock: largeStock })
        )
        .build()

      const result = await getCampaignProducts(mockCompanyId)

      expect(result).toHaveLength(100)
    })
  })
})
