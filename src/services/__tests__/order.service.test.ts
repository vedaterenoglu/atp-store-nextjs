/**
 * Order Service Tests
 * SOLID Principles: SRP - Single responsibility for testing order operations
 * Design Patterns: Test Pattern, Mock Pattern
 * Dependencies: Jest, Order Service, Price Service
 */

import { OrderService } from '../order.service'
import * as priceService from '../price.service'

// Mock the price service
jest.mock('../price.service')

// Mock uuid
jest.mock('uuid', () => ({
  v4: jest.fn(() => 'test-uuid-123'),
}))

describe('OrderService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Reset fetch mock
    global.fetch = jest.fn() as jest.Mock
  })

  describe('buildOrderLines', () => {
    it('should calculate invoice_price from database using calculateCustomerPrice', async () => {
      // Arrange: Mock customer-specific price from database
      const mockPriceResult = {
        basePrice: 25000, // This is the stock_price that should become unit_price
        customerPrice: 18500,
        campaignPrice: null,
        finalPrice: 18500, // This is the invoice_price we expect
        isCampaignActive: false,
        priceClass: 'c',
      }
      ;(priceService.calculateCustomerPrice as jest.Mock).mockResolvedValue(
        mockPriceResult
      )

      // Mock generateOrderNumber response
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: {
            orderNumber: 1234,
            letterCode: 'A',
            fullOrderNumber: 'A1234',
          },
        }),
      })

      // Mock createOrder mutation response (API route format)
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: {
            orderNumber: 'A1234',
            orderDate: '2024-01-15',
            customerTitle: 'Test Customer',
            affectedRows: 1,
            dispatchAddress: {
              address_nickname: 'Main',
              line_1: 'Test Street 1',
              line_2: null,
              city: 'Stockholm',
            },
            invoiceAddress: {
              address_nickname: 'Billing',
              line_1: 'Invoice Street 1',
              line_2: null,
              city: 'Stockholm',
            },
          },
          message: 'Order created successfully',
        }),
      })

      const orderInput = {
        companyId: 'alfe',
        companyNickname: 'alfe',
        customerId: 'SE0 1001 1697',
        dispatchAddressId: 'addr-123',
        invoiceAddressId: 'addr-456',
        orderLines: [
          {
            stockId: '0000 1002 0002',
            lineInfo: 'Test Product',
            quantity: 10,
            unitPrice: 25000, // Base price
            vatPercent: 25,
          },
        ],
        country: 'Sverige',
        exchangeUnit: 'kr.',
        exchangeRate: 1,
        language: 'se' as const,
      }

      // Act
      const result = await OrderService.createOrder(orderInput)

      // Assert: Verify calculateCustomerPrice was called with correct parameters
      expect(priceService.calculateCustomerPrice).toHaveBeenCalledWith(
        '0000 1002 0002', // stockId
        'SE0 1001 1697', // customerId
        'alfe' // companyId
      )

      // Verify the order was created successfully
      expect(result).toBeDefined()
      expect(result.success).toBe(true)
      expect(result.data).toBeDefined()
      expect(result.data?.orderNumber).toBe('A1234')
    })

    it('should calculate vat_credit correctly using invoice_price', async () => {
      // Arrange: Customer-specific price from database
      const invoicePrice = 18500 // Customer-specific price
      const vatPercent = 25
      const expectedVatCredit = Math.round((invoicePrice * vatPercent) / 100) // 4625

      const mockPriceResult = {
        basePrice: 25000,
        customerPrice: invoicePrice,
        campaignPrice: null,
        finalPrice: invoicePrice,
        isCampaignActive: false,
        priceClass: 'c',
      }
      ;(priceService.calculateCustomerPrice as jest.Mock).mockResolvedValue(
        mockPriceResult
      )

      // Mock generateOrderNumber
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: {
            orderNumber: 1234,
            letterCode: 'A',
            fullOrderNumber: 'A1234',
          },
        }),
      })

      // Mock createOrder mutation response (API route format)
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: {
            orderNumber: 'A1234',
            orderDate: '2024-01-15',
            customerTitle: 'Test Customer',
            affectedRows: 1,
            dispatchAddress: {
              address_nickname: '',
              line_1: '',
              line_2: '',
              city: '',
            },
            invoiceAddress: {
              address_nickname: '',
              line_1: '',
              line_2: '',
              city: '',
            },
          },
          message: 'Order created successfully',
        }),
      })

      const orderInput = {
        companyId: 'alfe',
        companyNickname: 'alfe',
        customerId: 'SE0 1001 1697',
        dispatchAddressId: 'addr-123',
        invoiceAddressId: 'addr-456',
        orderLines: [
          {
            stockId: '0000 1002 0002',
            lineInfo: 'Test Product',
            quantity: 10,
            unitPrice: 25000,
            vatPercent: vatPercent,
          },
        ],
        country: 'Sverige',
        exchangeUnit: 'kr.',
        exchangeRate: 1,
        language: 'se' as const,
      }

      // Act
      await OrderService.createOrder(orderInput)

      // Assert: Check what was sent to the create order API
      const createOrderCall = (global.fetch as jest.Mock).mock.calls[1]
      expect(createOrderCall).toBeDefined()
      expect(createOrderCall[0]).toBe('/api/orders/create')

      const requestBody = JSON.parse(createOrderCall[1].body)
      const orderLines =
        requestBody.input[0].order_heders_goods_transactions_rel.data

      expect(orderLines).toBeDefined()
      expect(orderLines[0].vat_credit).toBe(expectedVatCredit) // Should be 4625
      expect(orderLines[0].invoice_price).toBe(invoicePrice) // Should be 18500
    })

    it('should calculate line_price_total_credit as quantity * invoice_price', async () => {
      // Arrange
      const invoicePrice = 18500
      const quantity = 10
      const expectedLinePriceTotal = quantity * invoicePrice // 185000 (without VAT)

      const mockPriceResult = {
        basePrice: 25000,
        customerPrice: invoicePrice,
        campaignPrice: null,
        finalPrice: invoicePrice,
        isCampaignActive: false,
        priceClass: 'c',
      }
      ;(priceService.calculateCustomerPrice as jest.Mock).mockResolvedValue(
        mockPriceResult
      )

      // Mock generateOrderNumber
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: {
            orderNumber: 1234,
            letterCode: 'A',
            fullOrderNumber: 'A1234',
          },
        }),
      })

      // Mock createOrder mutation response (API route format)
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: {
            orderNumber: 'A1234',
            orderDate: '2024-01-15',
            customerTitle: 'Test Customer',
            affectedRows: 1,
            dispatchAddress: {
              address_nickname: '',
              line_1: '',
              line_2: '',
              city: '',
            },
            invoiceAddress: {
              address_nickname: '',
              line_1: '',
              line_2: '',
              city: '',
            },
          },
          message: 'Order created successfully',
        }),
      })

      const orderInput = {
        companyId: 'alfe',
        companyNickname: 'alfe',
        customerId: 'SE0 1001 1697',
        dispatchAddressId: 'addr-123',
        invoiceAddressId: 'addr-456',
        orderLines: [
          {
            stockId: '0000 1002 0002',
            lineInfo: 'Test Product',
            quantity: quantity,
            unitPrice: 25000,
            vatPercent: 25,
          },
        ],
        country: 'Sverige',
        exchangeUnit: 'kr.',
        exchangeRate: 1,
        language: 'se' as const,
      }

      // Act
      await OrderService.createOrder(orderInput)

      // Assert: Check what was sent to the create order API
      const createOrderCall = (global.fetch as jest.Mock).mock.calls[1]
      expect(createOrderCall).toBeDefined()
      expect(createOrderCall[0]).toBe('/api/orders/create')

      const requestBody = JSON.parse(createOrderCall[1].body)
      const orderLines =
        requestBody.input[0].order_heders_goods_transactions_rel.data

      expect(orderLines).toBeDefined()
      expect(orderLines[0].line_price_total_credit).toBe(expectedLinePriceTotal) // 185000
      expect(orderLines[0].amount_credit).toBe(quantity) // 10
      expect(orderLines[0].invoice_price).toBe(invoicePrice) // 18500
    })

    it('should use stock_price from database as unit_price', async () => {
      // Arrange: Mock prices from database
      const stockPrice = 25000 // stock_price from database
      const customerSpecificPrice = 18500
      const mockPriceResult = {
        basePrice: stockPrice, // This should become unit_price
        customerPrice: customerSpecificPrice,
        campaignPrice: null,
        finalPrice: customerSpecificPrice,
        isCampaignActive: false,
        priceClass: 'c',
      }
      ;(priceService.calculateCustomerPrice as jest.Mock).mockResolvedValue(
        mockPriceResult
      )

      // Mock generateOrderNumber
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: {
            orderNumber: 1234,
            letterCode: 'A',
            fullOrderNumber: 'A1234',
          },
        }),
      })

      // Mock createOrder mutation response (API route format)
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: {
            orderNumber: 'A1234',
            orderDate: '2024-01-15',
            customerTitle: 'Test Customer',
            affectedRows: 1,
            dispatchAddress: {
              address_nickname: '',
              line_1: '',
              line_2: '',
              city: '',
            },
            invoiceAddress: {
              address_nickname: '',
              line_1: '',
              line_2: '',
              city: '',
            },
          },
          message: 'Order created successfully',
        }),
      })

      const orderInput = {
        companyId: 'alfe',
        companyNickname: 'alfe',
        customerId: 'SE0 1001 1697',
        dispatchAddressId: 'addr-123',
        invoiceAddressId: 'addr-456',
        orderLines: [
          {
            stockId: '0000 1002 0002',
            lineInfo: 'Test Product',
            quantity: 5,
            unitPrice: 30000, // Cart price (should be ignored)
            vatPercent: 25,
          },
        ],
        country: 'Sverige',
        exchangeUnit: 'kr.',
        exchangeRate: 1,
        language: 'se' as const,
      }

      // Act
      await OrderService.createOrder(orderInput)

      // Assert: Check what was sent to the create order API
      const createOrderCall = (global.fetch as jest.Mock).mock.calls[1]
      expect(createOrderCall).toBeDefined()
      expect(createOrderCall[0]).toBe('/api/orders/create')

      const requestBody = JSON.parse(createOrderCall[1].body)
      const orderLines =
        requestBody.input[0].order_heders_goods_transactions_rel.data

      expect(orderLines).toBeDefined()
      expect(orderLines[0].unit_price).toBe(stockPrice) // Should use stock_price from database (25000)
      expect(orderLines[0].invoice_price).toBe(customerSpecificPrice) // Should use customer price (18500)
    })

    it('should use unitPrice as fallback when calculateCustomerPrice returns null basePrice and finalPrice', async () => {
      // Arrange: No prices available from database
      const mockPriceResult = {
        basePrice: null, // No stock_price found
        customerPrice: null,
        campaignPrice: null,
        finalPrice: null, // No customer price found
        isCampaignActive: false,
        priceClass: null,
      }
      ;(priceService.calculateCustomerPrice as jest.Mock).mockResolvedValue(
        mockPriceResult
      )

      // Mock generateOrderNumber
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: {
            orderNumber: 1234,
            letterCode: 'A',
            fullOrderNumber: 'A1234',
          },
        }),
      })

      // Mock createOrder mutation response (API route format)
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: {
            orderNumber: 'A1234',
            orderDate: '2024-01-15',
            customerTitle: 'Test Customer',
            affectedRows: 1,
            dispatchAddress: {
              address_nickname: '',
              line_1: '',
              line_2: '',
              city: '',
            },
            invoiceAddress: {
              address_nickname: '',
              line_1: '',
              line_2: '',
              city: '',
            },
          },
          message: 'Order created successfully',
        }),
      })

      const unitPrice = 30000
      const orderInput = {
        companyId: 'alfe',
        companyNickname: 'alfe',
        customerId: 'SE0 1001 1697',
        dispatchAddressId: 'addr-123',
        invoiceAddressId: 'addr-456',
        orderLines: [
          {
            stockId: '0000 1002 0002',
            lineInfo: 'Test Product',
            quantity: 5,
            unitPrice: unitPrice,
            vatPercent: 25,
          },
        ],
        country: 'Sverige',
        exchangeUnit: 'kr.',
        exchangeRate: 1,
        language: 'se' as const,
      }

      // Act
      await OrderService.createOrder(orderInput)

      // Assert: Check what was sent to the create order API
      const createOrderCall = (global.fetch as jest.Mock).mock.calls[1]
      expect(createOrderCall).toBeDefined()
      expect(createOrderCall[0]).toBe('/api/orders/create')

      const requestBody = JSON.parse(createOrderCall[1].body)
      const orderLines =
        requestBody.input[0].order_heders_goods_transactions_rel.data

      expect(orderLines).toBeDefined()
      expect(orderLines[0].invoice_price).toBe(unitPrice) // Fallback to 30000
      expect(orderLines[0].vat_credit).toBe(Math.round((unitPrice * 25) / 100)) // 7500
      expect(orderLines[0].line_price_total_credit).toBe(5 * unitPrice) // 150000
    })
  })

  describe('getOrderType', () => {
    it('should return "Inland" for Swedish countries', () => {
      expect(OrderService.getOrderType('Sverige')).toBe('Inland')
      expect(OrderService.getOrderType('Sweden')).toBe('Inland')
    })

    it('should return "Inside EU" for EU countries', () => {
      expect(OrderService.getOrderType('Tyskland')).toBe('Inside EU')
      expect(OrderService.getOrderType('Germany')).toBe('Inside EU')
      expect(OrderService.getOrderType('Danmark')).toBe('Inside EU')
    })

    it('should return "Outside EU" for non-EU countries', () => {
      expect(OrderService.getOrderType('Turkiet')).toBe('Outside EU')
      expect(OrderService.getOrderType('Turkey')).toBe('Outside EU')
      expect(OrderService.getOrderType('Unknown Country')).toBe('Outside EU')
    })
  })
})
