/**
 * Unit tests for Campaign Types
 * SOLID Principles: SRP - Single responsibility for type testing
 * Design Patterns: Type Validation Testing Pattern
 * Dependencies: Jest
 */

import {
  type CampaignProduct,
  type CampaignSliderProps,
  type CampaignSectionProps,
  isCampaignProduct,
} from '../campaign'
import { createMockCallback } from '@/__tests__/utils/fetch-mock'

describe('Campaign Types', () => {
  describe('CampaignProduct Interface', () => {
    it('should create a valid CampaignProduct object with all required fields', () => {
      const product: CampaignProduct = {
        stock_id: 'STOCK001',
        stock_name: 'Test Product',
        stock_group: 'Electronics',
        stock_image_link: 'https://example.com/image.jpg',
        stock_unit: 'piece',
        stock_price: 1000,
        campaign_price: 800,
      }

      expect(product.stock_id).toBe('STOCK001')
      expect(product.stock_name).toBe('Test Product')
      expect(product.stock_group).toBe('Electronics')
      expect(product.stock_image_link).toBe('https://example.com/image.jpg')
      expect(product.stock_unit).toBe('piece')
      expect(product.stock_price).toBe(1000)
      expect(product.campaign_price).toBe(800)
      expect(product.discount_percentage).toBeUndefined()
    })

    it('should create a valid CampaignProduct with optional discount_percentage', () => {
      const product: CampaignProduct = {
        stock_id: 'STOCK002',
        stock_name: 'Discounted Product',
        stock_group: 'Clothing',
        stock_image_link: 'https://example.com/product.jpg',
        stock_unit: 'item',
        stock_price: 500,
        campaign_price: 350,
        discount_percentage: 30,
      }

      expect(product.discount_percentage).toBe(30)
    })

    it('should handle empty strings for text fields', () => {
      const product: CampaignProduct = {
        stock_id: '',
        stock_name: '',
        stock_group: '',
        stock_image_link: '',
        stock_unit: '',
        stock_price: 0,
        campaign_price: 0,
      }

      expect(product.stock_id).toBe('')
      expect(product.stock_name).toBe('')
      expect(product.stock_group).toBe('')
      expect(product.stock_image_link).toBe('')
      expect(product.stock_unit).toBe('')
    })

    it('should handle negative prices', () => {
      const product: CampaignProduct = {
        stock_id: 'STOCK003',
        stock_name: 'Negative Price Product',
        stock_group: 'Test',
        stock_image_link: 'https://example.com/test.jpg',
        stock_unit: 'kg',
        stock_price: -100,
        campaign_price: -50,
        discount_percentage: -10,
      }

      expect(product.stock_price).toBe(-100)
      expect(product.campaign_price).toBe(-50)
      expect(product.discount_percentage).toBe(-10)
    })

    it('should handle decimal prices', () => {
      const product: CampaignProduct = {
        stock_id: 'STOCK004',
        stock_name: 'Decimal Price Product',
        stock_group: 'Food',
        stock_image_link: 'https://example.com/food.jpg',
        stock_unit: 'g',
        stock_price: 99.99,
        campaign_price: 74.99,
        discount_percentage: 25.01,
      }

      expect(product.stock_price).toBe(99.99)
      expect(product.campaign_price).toBe(74.99)
      expect(product.discount_percentage).toBe(25.01)
    })

    it('should handle special characters in text fields', () => {
      const product: CampaignProduct = {
        stock_id: 'STOCK-005#',
        stock_name: 'Product with @special! characters',
        stock_group: 'Group & Category',
        stock_image_link: 'https://example.com/image?id=123&size=large',
        stock_unit: 'm²',
        stock_price: 1500,
        campaign_price: 1200,
      }

      expect(product.stock_id).toBe('STOCK-005#')
      expect(product.stock_name).toBe('Product with @special! characters')
      expect(product.stock_group).toBe('Group & Category')
      expect(product.stock_unit).toBe('m²')
    })
  })

  describe('CampaignSliderProps Interface', () => {
    it('should create valid CampaignSliderProps with required products array', () => {
      const props: CampaignSliderProps = {
        products: [
          {
            stock_id: 'STOCK001',
            stock_name: 'Product 1',
            stock_group: 'Group 1',
            stock_image_link: 'https://example.com/1.jpg',
            stock_unit: 'unit',
            stock_price: 100,
            campaign_price: 80,
          },
        ],
      }

      expect(props.products).toHaveLength(1)
      expect(props.products[0]!.stock_id).toBe('STOCK001')
      expect(props.autoPlay).toBeUndefined()
      expect(props.autoPlayInterval).toBeUndefined()
      expect(props.onProductClick).toBeUndefined()
    })

    it('should create CampaignSliderProps with all optional fields', () => {
      const mockCallback = createMockCallback<CampaignProduct>()
      const props: CampaignSliderProps = {
        products: [],
        autoPlay: true,
        autoPlayInterval: 5000,
        onProductClick: mockCallback,
      }

      expect(props.products).toHaveLength(0)
      expect(props.autoPlay).toBe(true)
      expect(props.autoPlayInterval).toBe(5000)
      expect(props.onProductClick).toBe(mockCallback)
    })

    it('should handle empty products array', () => {
      const props: CampaignSliderProps = {
        products: [],
      }

      expect(props.products).toEqual([])
      expect(props.products).toHaveLength(0)
    })

    it('should handle multiple products in array', () => {
      const props: CampaignSliderProps = {
        products: [
          {
            stock_id: 'STOCK001',
            stock_name: 'Product 1',
            stock_group: 'Group 1',
            stock_image_link: 'https://example.com/1.jpg',
            stock_unit: 'unit',
            stock_price: 100,
            campaign_price: 80,
          },
          {
            stock_id: 'STOCK002',
            stock_name: 'Product 2',
            stock_group: 'Group 2',
            stock_image_link: 'https://example.com/2.jpg',
            stock_unit: 'kg',
            stock_price: 200,
            campaign_price: 150,
            discount_percentage: 25,
          },
        ],
      }

      expect(props.products).toHaveLength(2)
      expect(props.products[0]!.stock_id).toBe('STOCK001')
      expect(props.products[1]!.stock_id).toBe('STOCK002')
      expect(props.products[1]!.discount_percentage).toBe(25)
    })

    it('should handle onProductClick callback', () => {
      const mockCallback = createMockCallback<CampaignProduct>()
      const testProduct: CampaignProduct = {
        stock_id: 'STOCK001',
        stock_name: 'Test Product',
        stock_group: 'Test Group',
        stock_image_link: 'https://example.com/test.jpg',
        stock_unit: 'piece',
        stock_price: 100,
        campaign_price: 75,
      }

      const props: CampaignSliderProps = {
        products: [testProduct],
        onProductClick: mockCallback,
      }

      // Simulate calling the callback
      if (props.onProductClick) {
        props.onProductClick(testProduct)
      }

      expect(mockCallback).toHaveBeenCalledWith(testProduct)
      expect(mockCallback).toHaveBeenCalledTimes(1)
    })

    it('should handle various autoPlay configurations', () => {
      const props1: CampaignSliderProps = {
        products: [],
        autoPlay: false,
        autoPlayInterval: 0,
      }

      const props2: CampaignSliderProps = {
        products: [],
        autoPlay: true,
        autoPlayInterval: 10000,
      }

      expect(props1.autoPlay).toBe(false)
      expect(props1.autoPlayInterval).toBe(0)
      expect(props2.autoPlay).toBe(true)
      expect(props2.autoPlayInterval).toBe(10000)
    })
  })

  describe('CampaignSectionProps Interface', () => {
    it('should create valid CampaignSectionProps with required showCampaigns', () => {
      const props: CampaignSectionProps = {
        showCampaigns: true,
      }

      expect(props.showCampaigns).toBe(true)
      expect(props.products).toBeUndefined()
      expect(props.isLoading).toBeUndefined()
    })

    it('should create CampaignSectionProps with all fields', () => {
      const props: CampaignSectionProps = {
        showCampaigns: false,
        products: [
          {
            stock_id: 'STOCK001',
            stock_name: 'Product',
            stock_group: 'Group',
            stock_image_link: 'https://example.com/image.jpg',
            stock_unit: 'unit',
            stock_price: 100,
            campaign_price: 80,
          },
        ],
        isLoading: true,
      }

      expect(props.showCampaigns).toBe(false)
      expect(props.products).toHaveLength(1)
      expect(props.isLoading).toBe(true)
    })

    it('should handle showCampaigns as false', () => {
      const props: CampaignSectionProps = {
        showCampaigns: false,
      }

      expect(props.showCampaigns).toBe(false)
    })

    it('should handle empty products array', () => {
      const props: CampaignSectionProps = {
        showCampaigns: true,
        products: [],
      }

      expect(props.products).toEqual([])
      expect(props.products).toHaveLength(0)
    })

    it('should handle isLoading states', () => {
      const propsLoading: CampaignSectionProps = {
        showCampaigns: true,
        isLoading: true,
      }

      const propsNotLoading: CampaignSectionProps = {
        showCampaigns: true,
        isLoading: false,
      }

      expect(propsLoading.isLoading).toBe(true)
      expect(propsNotLoading.isLoading).toBe(false)
    })

    it('should handle combination of all properties', () => {
      const props: CampaignSectionProps = {
        showCampaigns: true,
        products: [
          {
            stock_id: 'STOCK001',
            stock_name: 'Product 1',
            stock_group: 'Group 1',
            stock_image_link: 'https://example.com/1.jpg',
            stock_unit: 'unit',
            stock_price: 100,
            campaign_price: 80,
            discount_percentage: 20,
          },
          {
            stock_id: 'STOCK002',
            stock_name: 'Product 2',
            stock_group: 'Group 2',
            stock_image_link: 'https://example.com/2.jpg',
            stock_unit: 'kg',
            stock_price: 200,
            campaign_price: 150,
          },
        ],
        isLoading: false,
      }

      expect(props.showCampaigns).toBe(true)
      expect(props.products).toHaveLength(2)
      expect(props.products![0]!.discount_percentage).toBe(20)
      expect(props.products![1]!.discount_percentage).toBeUndefined()
      expect(props.isLoading).toBe(false)
    })
  })

  describe('Type Guard Functions', () => {
    describe('isCampaignProduct', () => {
      it('should return true for valid CampaignProduct objects', () => {
        const validProduct = {
          stock_id: 'STOCK001',
          stock_name: 'Test Product',
          stock_group: 'Electronics',
          stock_image_link: 'https://example.com/image.jpg',
          stock_unit: 'piece',
          stock_price: 1000,
          campaign_price: 800,
        }

        expect(isCampaignProduct(validProduct)).toBe(true)
      })

      it('should return true with optional discount_percentage', () => {
        const productWithDiscount = {
          stock_id: 'STOCK002',
          stock_name: 'Discounted Product',
          stock_group: 'Clothing',
          stock_image_link: 'https://example.com/product.jpg',
          stock_unit: 'item',
          stock_price: 500,
          campaign_price: 350,
          discount_percentage: 30,
        }

        expect(isCampaignProduct(productWithDiscount)).toBe(true)
      })

      it('should return false for null', () => {
        expect(isCampaignProduct(null)).toBe(false)
      })

      it('should return false for undefined', () => {
        expect(isCampaignProduct(undefined)).toBe(false)
      })

      it('should return false for non-objects', () => {
        expect(isCampaignProduct('string')).toBe(false)
        expect(isCampaignProduct(123)).toBe(false)
        expect(isCampaignProduct(true)).toBe(false)
        expect(isCampaignProduct([])).toBe(false)
      })

      it('should return false for objects missing required fields', () => {
        const missingStockId = {
          stock_name: 'Test Product',
          stock_group: 'Electronics',
          stock_image_link: 'https://example.com/image.jpg',
          stock_unit: 'piece',
          stock_price: 1000,
          campaign_price: 800,
        }

        const missingStockName = {
          stock_id: 'STOCK001',
          stock_group: 'Electronics',
          stock_image_link: 'https://example.com/image.jpg',
          stock_unit: 'piece',
          stock_price: 1000,
          campaign_price: 800,
        }

        const missingStockGroup = {
          stock_id: 'STOCK001',
          stock_name: 'Test Product',
          stock_image_link: 'https://example.com/image.jpg',
          stock_unit: 'piece',
          stock_price: 1000,
          campaign_price: 800,
        }

        const missingImageLink = {
          stock_id: 'STOCK001',
          stock_name: 'Test Product',
          stock_group: 'Electronics',
          stock_unit: 'piece',
          stock_price: 1000,
          campaign_price: 800,
        }

        const missingUnit = {
          stock_id: 'STOCK001',
          stock_name: 'Test Product',
          stock_group: 'Electronics',
          stock_image_link: 'https://example.com/image.jpg',
          stock_price: 1000,
          campaign_price: 800,
        }

        const missingStockPrice = {
          stock_id: 'STOCK001',
          stock_name: 'Test Product',
          stock_group: 'Electronics',
          stock_image_link: 'https://example.com/image.jpg',
          stock_unit: 'piece',
          campaign_price: 800,
        }

        const missingCampaignPrice = {
          stock_id: 'STOCK001',
          stock_name: 'Test Product',
          stock_group: 'Electronics',
          stock_image_link: 'https://example.com/image.jpg',
          stock_unit: 'piece',
          stock_price: 1000,
        }

        expect(isCampaignProduct(missingStockId)).toBe(false)
        expect(isCampaignProduct(missingStockName)).toBe(false)
        expect(isCampaignProduct(missingStockGroup)).toBe(false)
        expect(isCampaignProduct(missingImageLink)).toBe(false)
        expect(isCampaignProduct(missingUnit)).toBe(false)
        expect(isCampaignProduct(missingStockPrice)).toBe(false)
        expect(isCampaignProduct(missingCampaignPrice)).toBe(false)
      })

      it('should return false for empty object', () => {
        expect(isCampaignProduct({})).toBe(false)
      })

      it('should handle objects with extra properties', () => {
        const productWithExtras = {
          stock_id: 'STOCK001',
          stock_name: 'Test Product',
          stock_group: 'Electronics',
          stock_image_link: 'https://example.com/image.jpg',
          stock_unit: 'piece',
          stock_price: 1000,
          campaign_price: 800,
          extra_field: 'This is extra',
          another_extra: 123,
        }

        expect(isCampaignProduct(productWithExtras)).toBe(true)
      })
    })
  })

  describe('Type Safety and Edge Cases', () => {
    it('should enforce type safety for CampaignProduct', () => {
      const validProduct: CampaignProduct = {
        stock_id: 'ID',
        stock_name: 'Name',
        stock_group: 'Group',
        stock_image_link: 'Link',
        stock_unit: 'Unit',
        stock_price: 10,
        campaign_price: 8,
      }

      // TypeScript would catch these at compile time
      // These tests verify runtime behavior
      expect(typeof validProduct.stock_id).toBe('string')
      expect(typeof validProduct.stock_price).toBe('number')
      expect(typeof validProduct.campaign_price).toBe('number')
    })

    it('should handle optional fields correctly', () => {
      const minimalProduct: CampaignProduct = {
        stock_id: 'MIN001',
        stock_name: 'Minimal',
        stock_group: 'Test',
        stock_image_link: 'link',
        stock_unit: 'unit',
        stock_price: 1,
        campaign_price: 1,
      }

      const fullProduct: CampaignProduct = {
        ...minimalProduct,
        discount_percentage: 50,
      }

      expect('discount_percentage' in minimalProduct).toBe(false)
      expect('discount_percentage' in fullProduct).toBe(true)
    })

    it('should allow products array modification in CampaignSliderProps', () => {
      const props: CampaignSliderProps = {
        products: [],
      }

      const newProduct: CampaignProduct = {
        stock_id: 'NEW001',
        stock_name: 'New Product',
        stock_group: 'New Group',
        stock_image_link: 'https://example.com/new.jpg',
        stock_unit: 'piece',
        stock_price: 500,
        campaign_price: 400,
      }

      props.products.push(newProduct)

      expect(props.products).toHaveLength(1)
      expect(props.products[0]!.stock_id).toBe('NEW001')
    })

    it('should handle undefined optional fields in CampaignSectionProps', () => {
      const props: CampaignSectionProps = {
        showCampaigns: true,
      }

      expect(props.products).toBeUndefined()
      expect(props.isLoading).toBeUndefined()
    })
  })
})
