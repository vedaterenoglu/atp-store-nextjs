/**
 * Order Service
 * SOLID Principles: SRP - Single responsibility for order operations
 * Design Patterns: Service Layer Pattern, Adapter Pattern, Factory Pattern
 * Dependencies: uuid, Fetch API
 */

import { v4 as uuidv4 } from 'uuid'
import { calculateCustomerPrice } from '@/services/price.service'
import type {
  OrderHeaderInput,
  GoodsTransactionInput,
  CreateOrderHeadersMutationVariables,
  OrderType,
  AddressResponse,
} from '@/services/graphql/mutations/CreateOrderHeadersMutation.types'

// Country lists for order type determination
const INLAND_COUNTRIES = ['Sverige', 'Sweden']

const EU_COUNTRIES = [
  // Swedish names
  'Belgien',
  'Bulgarien',
  'Cypern',
  'Danmark',
  'Estland',
  'Finland',
  'Frankrike',
  'Grekland',
  'Irland',
  'Italien',
  'Kroatien',
  'Lettland',
  'Litauen',
  'Luxemburg',
  'Malta',
  'Nederländerna',
  'Polen',
  'Portugal',
  'Rumänien',
  'Slovakien',
  'Slovenien',
  'Spanien',
  'Tjeckien',
  'Tyskland',
  'Ungern',
  'Österrike',
  // English names
  'Belgium',
  'Bulgaria',
  'Cyprus',
  'Denmark',
  'Estonia',
  'Finland',
  'France',
  'Greece',
  'Ireland',
  'Italy',
  'Croatia',
  'Latvia',
  'Lithuania',
  'Luxembourg',
  'Malta',
  'Netherlands',
  'Poland',
  'Portugal',
  'Romania',
  'Slovakia',
  'Slovenia',
  'Spain',
  'Czech Republic',
  'Germany',
  'Hungary',
  'Austria',
]

const OTHER_COUNTRIES = [
  // Swedish names
  'Albanien',
  'Bosnien och Hercegovina',
  'Georgien',
  'Moldavien',
  'Montenegro',
  'Nordmakedonien',
  'Serbien',
  'Turkiet',
  'Ukraina',
  // English names
  'Albania',
  'Bosnia and Herzegovina',
  'Georgia',
  'Moldova',
  'Montenegro',
  'North Macedonia',
  'Serbia',
  'Turkey',
  'Ukraine',
  'Türkiye',
]

export interface OrderLineInput {
  stockId: string
  lineInfo: string
  quantity: number
  unitPrice: number
  vatPercent: number
}

export interface CreateOrderInput {
  companyId: string
  companyNickname: string
  customerId: string
  dispatchAddressId: string
  invoiceAddressId: string
  orderLines: OrderLineInput[]
  country: string
  exchangeUnit: string
  exchangeRate: number
  language: 'se' | 'en'
}

export interface OrderNumberResponse {
  success: boolean
  data?: {
    orderNumber: number
    letterCode: string
    fullOrderNumber: string
  }
  error?: string
}

export interface CreateOrderResponse {
  success: boolean
  data?: {
    orderNumber: string
    orderDate: string
    customerTitle: string
    affectedRows: number
    dispatchAddress: AddressResponse
    invoiceAddress: AddressResponse
  }
  error?: string
  message?: string
  details?: unknown
}

export class OrderService {
  /**
   * Generates a new order number for the company
   */
  static async generateOrderNumber(
    companyNickname: string
  ): Promise<OrderNumberResponse> {
    try {
      const response = await fetch('/api/orders/generate-number', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ companyNickname }),
      })

      const data = await response.json()

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Failed to generate order number',
        }
      }

      return data as OrderNumberResponse
    } catch (error) {
      console.error('Error in OrderService.generateOrderNumber:', error)
      return {
        success: false,
        error: 'Network error occurred while generating order number',
      }
    }
  }

  /**
   * Creates a complete order with order lines
   */
  static async createOrder(
    input: CreateOrderInput
  ): Promise<CreateOrderResponse> {
    try {
      // Generate order number first
      const orderNumberResult = await this.generateOrderNumber(
        input.companyNickname
      )

      if (!orderNumberResult.success || !orderNumberResult.data) {
        return {
          success: false,
          error: orderNumberResult.error || 'Failed to generate order number',
        }
      }

      // Build order lines (goods transactions)
      const orderLines = await this.buildOrderLines(
        input.orderLines,
        input.exchangeRate,
        input.customerId,
        input.companyId
      )

      // Build order header
      const orderHeader = this.buildOrderHeader(
        input,
        orderNumberResult.data.fullOrderNumber,
        orderLines
      )

      // Create the order
      const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: [orderHeader],
        } as CreateOrderHeadersMutationVariables),
      })

      const data = await response.json()

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Failed to create order',
          details: data.details,
        }
      }

      return data as CreateOrderResponse
    } catch (error) {
      console.error('Error in OrderService.createOrder:', error)
      return {
        success: false,
        error: 'Network error occurred while creating order',
      }
    }
  }

  /**
   * Determines order type based on country
   */
  static getOrderType(country: string): OrderType {
    if (INLAND_COUNTRIES.includes(country)) {
      return 'Inland'
    }
    if (EU_COUNTRIES.includes(country)) {
      return 'Inside EU'
    }
    if (OTHER_COUNTRIES.includes(country)) {
      return 'Outside EU'
    }
    // Default to Outside EU for unknown countries
    return 'Outside EU'
  }

  /**
   * Builds order lines (goods transactions) from input
   */
  private static async buildOrderLines(
    lines: OrderLineInput[],
    exchangeRate: number,
    customerId: string,
    companyId: string
  ): Promise<GoodsTransactionInput[]> {
    const orderLines: GoodsTransactionInput[] = []

    for (const line of lines) {
      // Fetch customer-specific price from database
      const priceResult = await calculateCustomerPrice(
        line.stockId,
        customerId,
        companyId
      )

      // Use customer's invoice price (finalPrice) or fallback to unit price
      const invoicePrice = priceResult.finalPrice || line.unitPrice
      // Use stock_price from database as unit_price, fallback to cart unitPrice if not available
      const unitPrice = priceResult.basePrice || line.unitPrice

      const vatCredit = Math.round((invoicePrice * line.vatPercent) / 100)
      const linePriceTotal = line.quantity * invoicePrice

      orderLines.push({
        goods_transaction_id: uuidv4(),
        transaction_type: 'customer order',
        stock_id: line.stockId,
        line_info: line.lineInfo,
        amount_credit: line.quantity,
        order_amount: line.quantity,
        dispatch_amount: line.quantity,
        unit_price: unitPrice,
        vat_percent: line.vatPercent,
        vat_credit: vatCredit,
        invoice_price: invoicePrice,
        line_price_total_credit: linePriceTotal,
        vat_credit_exchange: Math.round(vatCredit * exchangeRate),
        invoice_price_exchange: Math.round(invoicePrice * exchangeRate),
        line_price_total_credit_exchange: Math.round(
          linePriceTotal * exchangeRate
        ),
      })
    }

    return orderLines
  }

  /**
   * Builds order header from input
   */
  private static buildOrderHeader(
    input: CreateOrderInput,
    fullOrderNumber: string,
    orderLines: GoodsTransactionInput[]
  ): OrderHeaderInput {
    const today = new Date().toISOString().split('T')[0] ?? '' // yyyy-mm-dd format

    return {
      company_id: input.companyId,
      order_number: fullOrderNumber,
      order_date: today,
      order_source: 'internet',
      order_type: this.getOrderType(input.country),
      order_exchange_unit: input.exchangeUnit,
      order_exchange_rate: input.exchangeRate,
      order_language: input.language,
      customer_id: input.customerId,
      dispatch_address_id: input.dispatchAddressId,
      invoice_address_id: input.invoiceAddressId,
      order_lock: false,
      order_heders_goods_transactions_rel: {
        data: orderLines,
      },
    }
  }

  /**
   * Calculates order totals from order lines
   */
  static calculateOrderTotals(lines: GoodsTransactionInput[]): {
    subtotal: number
    vatTotal: number
    grandTotal: number
  } {
    const subtotal = lines.reduce((sum, line) => sum + line.invoice_price, 0)
    const vatTotal = lines.reduce((sum, line) => sum + line.vat_credit, 0)
    const grandTotal = lines.reduce(
      (sum, line) => sum + line.line_price_total_credit,
      0
    )

    return {
      subtotal,
      vatTotal,
      grandTotal,
    }
  }
}
