/**
 * Unit tests for Campaign Service
 * SOLID Principles: SRP - Single responsibility for testing campaign service
 * Design Patterns: AAA (Arrange, Act, Assert) Testing Pattern
 * Dependencies: Jest with inline mocks only
 */

import { getCampaignProducts, hasCampaignProducts } from '../campaign.service'
import type { GetCampaignProductsWithPricesQueryResponse } from '@/services/graphql/queries/GetCampaignProductsWithPrices.types'

// Mock the validation function
jest.mock('@/services/graphql/queries/GetCampaignProductsWithPrices.schema', () => ({
  validateGetCampaignProductsWithPricesResponse: jest.fn((data) => data),
}))

// Store original fetch to restore later
const originalFetch = global.fetch

// Mock fetch globally
const mockFetch = jest.fn()

describe('Campaign Service', () => {
  const mockCompanyId = 'alfe'

  beforeAll(() => {
    // Override global fetch with our mock
    global.fetch = mockFetch as jest.Mock
  })

  beforeEach(() => {
    jest.clearAllMocks()
    mockFetch.mockClear()
    // Don't spy on console.error since it's already handled in jest.setup.ts
  })

  afterAll(() => {
    // Restore original fetch
    global.fetch = originalFetch
  })

  // Helper function to create mock campaign response
  function createMockCampaignResponse(overrides?: Partial<GetCampaignProductsWithPricesQueryResponse>): GetCampaignProductsWithPricesQueryResponse {
    return {
      stock: [
        {
          is_campaign_active: true,
          stock_id: '8501 1001 0002',
          stock_name: 'Premium Tissues',
          stock_group: 'Hygiene',
          stock_image_link: 'https://example.com/tissue.jpg',
          stock_unit: 'pack',
          stock_price: 10000,
          campaign_price: 4500,
        },
        {
          is_campaign_active: true,
          stock_id: '8501 1001 0003',
          stock_name: 'Ultra Soft Tissues',
          stock_group: 'Hygiene',
          stock_image_link: 'https://example.com/tissue2.jpg',
          stock_unit: 'pack',
          stock_price: 8000,
          campaign_price: 6000,
        },
      ],
      ...overrides,
    }
  }

  describe('getCampaignProducts', () => {
    it('should fetch and return campaign products successfully', async () => {
      const mockResponse = createMockCampaignResponse()
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await getCampaignProducts(mockCompanyId)

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining(`/api/campaign-products?company_id=${mockCompanyId}`)
      )
      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBe(2)
      
      // Check transformation
      expect(result[0]).toMatchObject({
        stock_id: '8501 1001 0002',
        stock_name: 'Premium Tissues',
        campaign_price: 4500,
        discount_percentage: 55, // (10000-4500)/10000 * 100 = 55
      })
    })

    it('should construct URL for client-side environment', async () => {
      // In jest-dom environment, window is always defined (client-side behavior)
      const mockResponse = createMockCampaignResponse()
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      await getCampaignProducts(mockCompanyId)

      // Should use relative URL for client-side (when window exists)
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/campaign-products')
      )
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining(`company_id=${mockCompanyId}`)
      )
    })

    it('should handle various company ID formats correctly', async () => {
      const testCases = ['company-123', 'COMP_ABC', 'test.company.co', '12345']
      
      for (const companyId of testCases) {
        const mockResponse = createMockCampaignResponse()
        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => mockResponse,
        })

        await getCampaignProducts(companyId)

        expect(mockFetch).toHaveBeenCalledWith(
          expect.stringContaining(`company_id=${companyId}`)
        )
        
        mockFetch.mockClear()
      }
    })

    it('should handle null response data', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => null, // This triggers lines 42-43
      })

      const result = await getCampaignProducts(mockCompanyId)

      expect(result).toEqual([])
    })

    it('should handle undefined response data', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => undefined, // This also triggers lines 42-43
      })

      const result = await getCampaignProducts(mockCompanyId)

      expect(result).toEqual([])
    })

    it('should handle empty campaign products', async () => {
      const emptyResponse = createMockCampaignResponse({ stock: [] })
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => emptyResponse,
      })

      const result = await getCampaignProducts(mockCompanyId)

      expect(result).toEqual([])
    })

    it('should handle fetch errors gracefully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Internal Server Error',
      })

      const result = await getCampaignProducts(mockCompanyId)

      expect(result).toEqual([])
      // console.error is called internally but mocked in jest.setup.ts
    })

    it('should handle network errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      const result = await getCampaignProducts(mockCompanyId)

      expect(result).toEqual([])
      // console.error is called internally but mocked in jest.setup.ts
    })

    it('should transform products with default image when null', async () => {
      const mockResponse = createMockCampaignResponse({
        stock: [
          {
            is_campaign_active: true,
            stock_id: 'TEST-001',
            stock_name: 'Test Product',
            stock_group: 'TEST',
            stock_image_link: null, // null image
            stock_unit: 'piece',
            stock_price: 10000,
            campaign_price: 5000,
          },
        ],
      })

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await getCampaignProducts(mockCompanyId)

      expect(result[0]?.stock_image_link).toBe('/placeholder-product.jpg')
    })

    it('should calculate discount percentage correctly', async () => {
      const mockResponse = createMockCampaignResponse({
        stock: [
          {
            is_campaign_active: true,
            stock_id: 'DISCOUNT-001',
            stock_name: 'Discount Test',
            stock_group: 'TEST',
            stock_image_link: null,
            stock_unit: 'piece',
            stock_price: 10000,
            campaign_price: 2500, // 75% discount
          },
        ],
      })

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await getCampaignProducts(mockCompanyId)

      expect(result[0]?.discount_percentage).toBe(75)
    })

    it('should handle zero campaign price', async () => {
      const mockResponse = createMockCampaignResponse({
        stock: [
          {
            is_campaign_active: true,
            stock_id: 'FREE-001',
            stock_name: 'Free Product',
            stock_group: 'TEST',
            stock_image_link: null,
            stock_unit: 'piece',
            stock_price: 10000,
            campaign_price: 0, // Free product
          },
        ],
      })

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await getCampaignProducts(mockCompanyId)

      expect(result[0]?.campaign_price).toBe(0)
      expect(result[0]?.discount_percentage).toBe(100)
    })

    it('should validate response with schema validation', async () => {
      const { validateGetCampaignProductsWithPricesResponse } = jest.requireMock(
        '@/services/graphql/queries/GetCampaignProductsWithPrices.schema'
      )

      const mockResponse = createMockCampaignResponse()
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      await getCampaignProducts(mockCompanyId)

      expect(validateGetCampaignProductsWithPricesResponse).toHaveBeenCalledWith(mockResponse)
    })
  })

  describe('hasCampaignProducts', () => {
    it('should return true when campaign products exist', async () => {
      const mockResponse = createMockCampaignResponse()
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await hasCampaignProducts(mockCompanyId)

      expect(result).toBe(true)
    })

    it('should return false when no campaign products exist', async () => {
      const emptyResponse = createMockCampaignResponse({ stock: [] })
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => emptyResponse,
      })

      const result = await hasCampaignProducts(mockCompanyId)

      expect(result).toBe(false)
    })

    it('should return false on fetch error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Internal Server Error',
      })

      const result = await hasCampaignProducts(mockCompanyId)

      expect(result).toBe(false)
    })

    it('should return false on network error', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      const result = await hasCampaignProducts(mockCompanyId)

      expect(result).toBe(false)
    })

    it('should return false when response data is null', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => null,
      })

      const result = await hasCampaignProducts(mockCompanyId)

      expect(result).toBe(false)
    })
  })

  describe('Edge cases and validation', () => {
    it('should handle malformed response gracefully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ invalid: 'data' }),
      })

      const result = await getCampaignProducts(mockCompanyId)

      expect(result).toEqual([])
    })

    it('should handle products with special characters in names', async () => {
      const mockResponse = createMockCampaignResponse({
        stock: [
          {
            is_campaign_active: true,
            stock_id: 'SPECIAL-001',
            stock_name: 'Product™ with © symbols & más',
            stock_group: 'Åäö Group',
            stock_image_link: null,
            stock_unit: 'm²',
            stock_price: 10000,
            campaign_price: 5000,
          },
        ],
      })

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await getCampaignProducts(mockCompanyId)

      expect(result[0]?.stock_name).toBe('Product™ with © symbols & más')
      expect(result[0]?.stock_group).toBe('Åäö Group')
      expect(result[0]?.stock_unit).toBe('m²')
    })

    it('should handle large numbers in prices', async () => {
      const mockResponse = createMockCampaignResponse({
        stock: [
          {
            is_campaign_active: true,
            stock_id: 'LARGE-001',
            stock_name: 'Expensive Product',
            stock_group: 'Premium',
            stock_image_link: null,
            stock_unit: 'piece',
            stock_price: 999999999,
            campaign_price: 500000000,
          },
        ],
      })

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await getCampaignProducts(mockCompanyId)

      expect(result[0]?.stock_price).toBe(999999999)
      expect(result[0]?.campaign_price).toBe(500000000)
      expect(result[0]?.discount_percentage).toBe(50)
    })
  })
})