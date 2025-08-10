/**
 * Pricing calculation utilities
 * SOLID Principles: SRP - Single responsibility for price calculations
 * Design Patterns: Strategy Pattern for price selection
 * Dependencies: None
 */

/**
 * Stock price data from backend
 */
export interface StockPriceData {
  stock_price: number
  stock_price_a: number
  stock_price_b: number
  stock_price_c: number
  stock_price_d: number
  stock_price_s: number
  stock_price_hra: number
  stock_price_hrb: number
  stock_price_hrc: number
  stock_price_hrd: number
  stock_price_z: number
  campaign_price: number
  is_campaign_active: boolean
  stock_moms: number // VAT percentage
}

/**
 * Product price query response
 */
export interface ProductPriceResponse {
  stock: StockPriceData[]
  customers: Array<{
    customer_price_class: string
  }>
  customer_price_list: Array<{
    customers_price: number
  }>
}

/**
 * Price calculation result
 */
export interface PriceCalculation {
  unitPrice: number // Final price per unit in öre
  vatRate: number // VAT percentage (e.g., 25)
  priceSource: 'class' | 'campaign' | 'customer' | 'default' // Which price was used
  originalPrice?: number | undefined // Original price before discount
}

/**
 * Get the stock price based on customer price class
 */
function getPriceByClass(
  stockData: StockPriceData,
  priceClass: string
): number | null {
  const classMap: Record<string, keyof StockPriceData> = {
    a: 'stock_price_a',
    b: 'stock_price_b',
    c: 'stock_price_c',
    d: 'stock_price_d',
    s: 'stock_price_s',
    hra: 'stock_price_hra',
    hrb: 'stock_price_hrb',
    hrc: 'stock_price_hrc',
    hrd: 'stock_price_hrd',
    z: 'stock_price_z',
  }

  const priceField = classMap[priceClass.toLowerCase()]
  if (priceField && priceField in stockData) {
    return stockData[priceField] as number
  }

  return null
}

/**
 * Calculate the final product price based on backend data
 *
 * Price selection logic:
 * 1. Get class-based price (e.g., stock_price_c for class "c")
 * 2. If campaign is active, consider campaign price
 * 3. If customer has specific price, consider that
 * 4. Take the minimum of all valid candidates
 */
export function calculateProductPrice(
  data: ProductPriceResponse
): PriceCalculation {
  // Extract data
  const stockData = data.stock[0]
  const customerClass = data.customers[0]?.customer_price_class
  const customerPrice = data.customer_price_list[0]?.customers_price

  if (!stockData) {
    throw new Error('No stock data available')
  }

  const candidates: Array<{
    price: number
    source: PriceCalculation['priceSource']
  }> = []

  // Candidate 1: Class-based price
  if (customerClass) {
    const classPrice = getPriceByClass(stockData, customerClass)
    if (classPrice !== null && classPrice > 0) {
      candidates.push({ price: classPrice, source: 'class' })
    }
  }

  // Candidate 2: Campaign price (only if campaign is active)
  if (stockData.is_campaign_active && stockData.campaign_price > 0) {
    candidates.push({ price: stockData.campaign_price, source: 'campaign' })
  }

  // Candidate 3: Customer-specific price
  if (customerPrice && customerPrice > 0) {
    candidates.push({ price: customerPrice, source: 'customer' })
  }

  // Fallback: Use default stock price if no candidates
  if (candidates.length === 0) {
    candidates.push({ price: stockData.stock_price, source: 'default' })
  }

  // Select the minimum price
  const selected = candidates.reduce((min, current) =>
    current.price < min.price ? current : min
  )

  // Find original price for discount display
  const originalPrice =
    selected.source === 'campaign' || selected.source === 'customer'
      ? stockData.stock_price
      : undefined

  return {
    unitPrice: selected.price,
    vatRate: stockData.stock_moms!,
    priceSource: selected.source,
    originalPrice,
  }
}

/**
 * Calculate VAT amount
 */
export function calculateVAT(subtotal: number, vatRate: number): number {
  return Math.round(subtotal * (vatRate / 100))
}

/**
 * Calculate totals for an order line
 */
export interface OrderLineCalculation {
  quantity: number
  unitPrice: number // Price per unit in öre
  subtotal: number // Quantity × unit price in öre
  vatRate: number // VAT percentage
  vatAmount: number // VAT amount in öre
  total: number // Subtotal + VAT in öre
}

export function calculateOrderLine(
  quantity: number,
  unitPrice: number,
  vatRate: number
): OrderLineCalculation {
  const subtotal = quantity * unitPrice
  const vatAmount = calculateVAT(subtotal, vatRate)
  const total = subtotal + vatAmount

  return {
    quantity,
    unitPrice,
    subtotal,
    vatRate,
    vatAmount,
    total,
  }
}

/**
 * Calculate totals for entire cart/order
 */
export interface CartTotals {
  subtotal: number // Sum of all items (excl. VAT) in öre
  totalVAT: number // Sum of all VAT amounts in öre
  total: number // Grand total (incl. VAT) in öre
  shipping: number // Shipping cost in öre
  grandTotal: number // Total including shipping in öre
}

export function calculateCartTotals(
  items: OrderLineCalculation[],
  shippingCost: number = 0
): CartTotals {
  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0)
  const totalVAT = items.reduce((sum, item) => sum + item.vatAmount, 0)
  const total = subtotal + totalVAT
  const grandTotal = total + shippingCost

  return {
    subtotal,
    totalVAT,
    total,
    shipping: shippingCost,
    grandTotal,
  }
}
