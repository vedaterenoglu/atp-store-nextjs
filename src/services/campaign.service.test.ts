/**
 * Unit tests for Campaign Service
 * SOLID Principles: SRP - Single responsibility for testing campaign service
 * Design Patterns: AAA (Arrange, Act, Assert) Testing Pattern
 * Dependencies: Jest, Apollo Client mocks
 */

import { getCampaignProducts, hasCampaignProducts } from './campaign.service'
import apolloClient from '@/lib/apollo/client'

// Mock server-only module
jest.mock('server-only', () => ({}))

// Mock Apollo Client
jest.mock('@/lib/apollo/client', () => ({
  __esModule: true,
  default: {
    query: jest.fn(),
  },
}))

// Mock GraphQL document - Note: this is handled by jest.config.ts moduleNameMapper
// which maps all .graphql files to the mock in src/__tests__/mocks/graphql/graphql.mock.ts

describe('Campaign Service', () => {
  const mockCompanyId = 'COMPANY001'

  beforeEach(() => {
    jest.clearAllMocks()
    // Reset console.error mock
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('getCampaignProducts', () => {
    it('should fetch and transform campaign products successfully', async () => {
      const mockResponse = {
        data: {
          stock: [
            {
              stock_id: 'PROD001',
              stock_name: 'Product 1',
              stock_group: 'Group A',
              stock_image_link: 'https://example.com/image1.jpg',
              stock_unit: 'kg',
              stock_price: 100,
              campaign_price: 75,
              is_campaign_active: true,
            },
            {
              stock_id: 'PROD002',
              stock_name: 'Product 2',
              stock_group: 'Group B',
              stock_image_link: 'https://example.com/image2.jpg',
              stock_unit: 'piece',
              stock_price: 200,
              campaign_price: 150,
              is_campaign_active: true,
            },
          ],
        },
      }

      ;(apolloClient.query as jest.Mock).mockResolvedValue(mockResponse)

      const result = await getCampaignProducts(mockCompanyId)

      expect(apolloClient.query).toHaveBeenCalledWith({
        query: expect.objectContaining({
          kind: 'Document',
          definitions: expect.arrayContaining([
            expect.objectContaining({
              kind: 'OperationDefinition',
            }),
          ]),
        }),
        variables: { company_id: mockCompanyId },
        fetchPolicy: 'network-only',
      })

      expect(result).toHaveLength(2)
      expect(result[0]).toEqual({
        stock_id: 'PROD001',
        stock_name: 'Product 1',
        stock_group: 'Group A',
        stock_image_link: 'https://example.com/image1.jpg',
        stock_unit: 'kg',
        stock_price: 100,
        campaign_price: 75,
        discount_percentage: 25,
      })
      expect(result[1]).toEqual({
        stock_id: 'PROD002',
        stock_name: 'Product 2',
        stock_group: 'Group B',
        stock_image_link: 'https://example.com/image2.jpg',
        stock_unit: 'piece',
        stock_price: 200,
        campaign_price: 150,
        discount_percentage: 25,
      })
    })

    it('should use placeholder image when stock_image_link is null', async () => {
      const mockResponse = {
        data: {
          stock: [
            {
              stock_id: 'PROD003',
              stock_name: 'Product 3',
              stock_group: 'Group C',
              stock_image_link: null,
              stock_unit: 'item',
              stock_price: 50,
              campaign_price: 40,
              is_campaign_active: true,
            },
          ],
        },
      }

      ;(apolloClient.query as jest.Mock).mockResolvedValue(mockResponse)

      const result = await getCampaignProducts(mockCompanyId)

      expect(result[0]!.stock_image_link).toBe('/placeholder-product.jpg')
    })

    it('should calculate discount percentage correctly', async () => {
      const mockResponse = {
        data: {
          stock: [
            {
              stock_id: 'PROD004',
              stock_name: 'Product 4',
              stock_group: 'Group D',
              stock_image_link: 'https://example.com/image4.jpg',
              stock_unit: 'box',
              stock_price: 1000,
              campaign_price: 600,
            },
          ],
        },
      }

      ;(apolloClient.query as jest.Mock).mockResolvedValue(mockResponse)

      const result = await getCampaignProducts(mockCompanyId)

      expect(result[0]!.discount_percentage).toBe(40) // (1000 - 600) / 1000 * 100 = 40
    })

    it('should round discount percentage correctly', async () => {
      const mockResponse = {
        data: {
          stock: [
            {
              stock_id: 'PROD005',
              stock_name: 'Product 5',
              stock_group: 'Group E',
              stock_image_link: 'https://example.com/image5.jpg',
              stock_unit: 'unit',
              stock_price: 333,
              campaign_price: 222,
            },
          ],
        },
      }

      ;(apolloClient.query as jest.Mock).mockResolvedValue(mockResponse)

      const result = await getCampaignProducts(mockCompanyId)

      // (333 - 222) / 333 * 100 = 33.333... which rounds to 33
      expect(result[0]!.discount_percentage).toBe(33)
    })

    it('should return empty array when no data', async () => {
      const mockResponse = {
        data: null,
      }

      ;(apolloClient.query as jest.Mock).mockResolvedValue(mockResponse)

      const result = await getCampaignProducts(mockCompanyId)

      expect(result).toEqual([])
    })

    it('should return empty array when stock is undefined', async () => {
      const mockResponse = {
        data: {
          stock: undefined,
        },
      }

      ;(apolloClient.query as jest.Mock).mockResolvedValue(mockResponse)

      const result = await getCampaignProducts(mockCompanyId)

      expect(result).toEqual([])
    })

    it('should return empty array when stock is empty', async () => {
      const mockResponse = {
        data: {
          stock: [],
        },
      }

      ;(apolloClient.query as jest.Mock).mockResolvedValue(mockResponse)

      const result = await getCampaignProducts(mockCompanyId)

      expect(result).toEqual([])
    })

    it('should handle GraphQL query errors gracefully', async () => {
      const mockError = new Error('GraphQL query failed')
      ;(apolloClient.query as jest.Mock).mockRejectedValue(mockError)

      const result = await getCampaignProducts(mockCompanyId)

      expect(console.error).toHaveBeenCalledWith(
        'Error fetching campaign products:',
        mockError
      )
      expect(result).toEqual([])
    })

    it('should handle network errors gracefully', async () => {
      const networkError = new Error('Network error')
      ;(apolloClient.query as jest.Mock).mockRejectedValue(networkError)

      const result = await getCampaignProducts(mockCompanyId)

      expect(console.error).toHaveBeenCalledWith(
        'Error fetching campaign products:',
        networkError
      )
      expect(result).toEqual([])
    })

    it('should handle malformed response gracefully', async () => {
      const mockResponse = {
        // data property missing stock
        data: {},
      }

      ;(apolloClient.query as jest.Mock).mockResolvedValue(mockResponse)

      const result = await getCampaignProducts(mockCompanyId)

      expect(result).toEqual([])
    })

    it('should transform multiple products with various discount percentages', async () => {
      const mockResponse = {
        data: {
          stock: [
            {
              stock_id: 'PROD006',
              stock_name: 'Product 6',
              stock_group: 'Group F',
              stock_image_link: 'https://example.com/image6.jpg',
              stock_unit: 'pack',
              stock_price: 100,
              campaign_price: 90,
            },
            {
              stock_id: 'PROD007',
              stock_name: 'Product 7',
              stock_group: 'Group G',
              stock_image_link: null,
              stock_unit: 'bottle',
              stock_price: 80,
              campaign_price: 40,
            },
            {
              stock_id: 'PROD008',
              stock_name: 'Product 8',
              stock_group: 'Group H',
              stock_image_link: 'https://example.com/image8.jpg',
              stock_unit: 'can',
              stock_price: 150,
              campaign_price: 75,
            },
          ],
        },
      }

      ;(apolloClient.query as jest.Mock).mockResolvedValue(mockResponse)

      const result = await getCampaignProducts(mockCompanyId)

      expect(result).toHaveLength(3)
      expect(result[0]!.discount_percentage).toBe(10) // 10% off
      expect(result[1]!.discount_percentage).toBe(50) // 50% off
      expect(result[2]!.discount_percentage).toBe(50) // 50% off
      expect(result[1]!.stock_image_link).toBe('/placeholder-product.jpg')
    })

    it('should handle zero price edge case', async () => {
      const mockResponse = {
        data: {
          stock: [
            {
              stock_id: 'PROD009',
              stock_name: 'Free Product',
              stock_group: 'Group I',
              stock_image_link: 'https://example.com/free.jpg',
              stock_unit: 'sample',
              stock_price: 100,
              campaign_price: 0,
            },
          ],
        },
      }

      ;(apolloClient.query as jest.Mock).mockResolvedValue(mockResponse)

      const result = await getCampaignProducts(mockCompanyId)

      expect(result[0]!.campaign_price).toBe(0)
      expect(result[0]!.discount_percentage).toBe(100) // 100% discount (free)
    })
  })

  describe('hasCampaignProducts', () => {
    it('should return true when campaign products exist', async () => {
      const mockResponse = {
        data: {
          stock: [
            {
              stock_id: 'PROD001',
              stock_name: 'Product 1',
              stock_group: 'Group A',
              stock_image_link: 'https://example.com/image1.jpg',
              stock_unit: 'kg',
              stock_price: 100,
              campaign_price: 75,
            },
          ],
        },
      }

      ;(apolloClient.query as jest.Mock).mockResolvedValue(mockResponse)

      const result = await hasCampaignProducts(mockCompanyId)

      expect(result).toBe(true)
      expect(apolloClient.query).toHaveBeenCalledWith({
        query: expect.objectContaining({
          kind: 'Document',
          definitions: expect.arrayContaining([
            expect.objectContaining({
              kind: 'OperationDefinition',
            }),
          ]),
        }),
        variables: { company_id: mockCompanyId },
        fetchPolicy: 'network-only',
      })
    })

    it('should return false when no campaign products exist', async () => {
      const mockResponse = {
        data: {
          stock: [],
        },
      }

      ;(apolloClient.query as jest.Mock).mockResolvedValue(mockResponse)

      const result = await hasCampaignProducts(mockCompanyId)

      expect(result).toBe(false)
    })

    it('should return false when query fails', async () => {
      const mockError = new Error('Query failed')
      ;(apolloClient.query as jest.Mock).mockRejectedValue(mockError)

      const result = await hasCampaignProducts(mockCompanyId)

      expect(result).toBe(false)
      expect(console.error).toHaveBeenCalledWith(
        'Error fetching campaign products:',
        mockError
      )
    })

    it('should return false when data is null', async () => {
      const mockResponse = {
        data: null,
      }

      ;(apolloClient.query as jest.Mock).mockResolvedValue(mockResponse)

      const result = await hasCampaignProducts(mockCompanyId)

      expect(result).toBe(false)
    })

    it('should return true for multiple products', async () => {
      const mockResponse = {
        data: {
          stock: [
            {
              stock_id: 'PROD001',
              stock_name: 'Product 1',
              stock_group: 'Group A',
              stock_image_link: 'https://example.com/image1.jpg',
              stock_unit: 'kg',
              stock_price: 100,
              campaign_price: 75,
            },
            {
              stock_id: 'PROD002',
              stock_name: 'Product 2',
              stock_group: 'Group B',
              stock_image_link: 'https://example.com/image2.jpg',
              stock_unit: 'piece',
              stock_price: 200,
              campaign_price: 150,
            },
          ],
        },
      }

      ;(apolloClient.query as jest.Mock).mockResolvedValue(mockResponse)

      const result = await hasCampaignProducts(mockCompanyId)

      expect(result).toBe(true)
    })
  })

  describe('Integration Tests', () => {
    it('should properly integrate both functions', async () => {
      const mockResponse = {
        data: {
          stock: [
            {
              stock_id: 'INT001',
              stock_name: 'Integration Product',
              stock_group: 'Test Group',
              stock_image_link: 'https://example.com/int.jpg',
              stock_unit: 'unit',
              stock_price: 500,
              campaign_price: 400,
            },
          ],
        },
      }

      ;(apolloClient.query as jest.Mock).mockResolvedValue(mockResponse)

      // First check if products exist
      const hasProducts = await hasCampaignProducts(mockCompanyId)
      expect(hasProducts).toBe(true)

      // Then fetch the actual products
      const products = await getCampaignProducts(mockCompanyId)
      expect(products).toHaveLength(1)
      expect(products[0]!.stock_id).toBe('INT001')

      // Apollo client should be called twice
      expect(apolloClient.query).toHaveBeenCalledTimes(2)
    })

    it('should handle different company IDs', async () => {
      const company1Response = {
        data: {
          stock: [
            {
              stock_id: 'COMP1_PROD',
              stock_name: 'Company 1 Product',
              stock_group: 'Group',
              stock_image_link: null,
              stock_unit: 'unit',
              stock_price: 100,
              campaign_price: 80,
            },
          ],
        },
      }

      const company2Response = {
        data: {
          stock: [],
        },
      }

      ;(apolloClient.query as jest.Mock)
        .mockResolvedValueOnce(company1Response)
        .mockResolvedValueOnce(company2Response)

      const result1 = await getCampaignProducts('COMPANY001')
      const result2 = await getCampaignProducts('COMPANY002')

      expect(result1).toHaveLength(1)
      expect(result2).toHaveLength(0)

      expect(apolloClient.query).toHaveBeenCalledWith({
        query: expect.objectContaining({
          kind: 'Document',
          definitions: expect.arrayContaining([
            expect.objectContaining({
              kind: 'OperationDefinition',
            }),
          ]),
        }),
        variables: { company_id: 'COMPANY001' },
        fetchPolicy: 'network-only',
      })

      expect(apolloClient.query).toHaveBeenCalledWith({
        query: expect.objectContaining({
          kind: 'Document',
          definitions: expect.arrayContaining([
            expect.objectContaining({
              kind: 'OperationDefinition',
            }),
          ]),
        }),
        variables: { company_id: 'COMPANY002' },
        fetchPolicy: 'network-only',
      })
    })
  })
})
