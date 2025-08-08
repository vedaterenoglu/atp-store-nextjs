/**
 * Cart type definitions
 * SOLID Principles: SRP - Single responsibility for cart type definitions
 * Design Patterns: Type definitions for cart domain
 * Dependencies: None
 */

// Cart item interface representing a single product in the cart
export interface CartItem {
  id: string
  productId: string
  productName: string
  productImage: string
  productGroup: string
  quantity: number
  unitPrice: number // Backend calculated price in öre
  totalPrice: number // quantity × unitPrice
  vatRate: number // Product-specific VAT percentage from backend
  vatAmount: number // VAT amount for this line
  priceSource?: 'class' | 'campaign' | 'customer' | 'default' // Which price was used
  originalPrice?: number | undefined // Original price if discounted
  discount?: number
  discountedPrice?: number
  stockUnit: string
  maxQuantity: number
  isAvailable: boolean
  addedAt: Date
  updatedAt: Date
}

// Cart summary for totals and calculations
export interface CartSummary {
  subtotal: number
  totalDiscount: number
  tax: number
  shipping: number
  total: number
  itemCount: number
  uniqueItemCount: number
}

// Cart status enum
export enum CartStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  CHECKED_OUT = 'CHECKED_OUT',
  ABANDONED = 'ABANDONED',
  EXPIRED = 'EXPIRED',
}

// Main cart interface
export interface Cart {
  id: string
  userId: string
  customerId?: string
  companyId?: string
  items: CartItem[]
  summary: CartSummary
  status: CartStatus
  createdAt: Date
  updatedAt: Date
  expiresAt?: Date
  notes?: string
}

// Cart action types for state management
export enum CartActionType {
  ADD_ITEM = 'ADD_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
  UPDATE_QUANTITY = 'UPDATE_QUANTITY',
  CLEAR_CART = 'CLEAR_CART',
  SET_CART = 'SET_CART',
  UPDATE_ITEM_AVAILABILITY = 'UPDATE_ITEM_AVAILABILITY',
  APPLY_DISCOUNT = 'APPLY_DISCOUNT',
  CALCULATE_SUMMARY = 'CALCULATE_SUMMARY',
}

// Cart filter interface for admin views
export interface CartFilter {
  status?: CartStatus[]
  userId?: string
  customerId?: string
  companyId?: string
  dateFrom?: Date
  dateTo?: Date
  minTotal?: number
  maxTotal?: number
  searchTerm?: string
}

// Cart sort options
export enum CartSortBy {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  TOTAL = 'total',
  ITEM_COUNT = 'itemCount',
  USER_NAME = 'userName',
}

export interface CartSortOptions {
  sortBy: CartSortBy
  sortOrder: 'asc' | 'desc'
}

// Props interfaces for components
export interface CartItemProps {
  item: CartItem
  onQuantityChange?: (itemId: string, quantity: number) => void
  onRemove?: (itemId: string) => void
  readonly?: boolean
  showActions?: boolean
  compact?: boolean
}

export interface CartSummaryProps {
  summary: CartSummary
  showDetails?: boolean
  className?: string
}

export interface CartListProps {
  carts: Cart[]
  onCartSelect?: (cartId: string) => void
  onCartDelete?: (cartId: string) => void
  selectedCartId?: string
  loading?: boolean
}

// Type guards
export function isCartItem(obj: unknown): obj is CartItem {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'productId' in obj &&
    'quantity' in obj &&
    'unitPrice' in obj
  )
}

export function isCart(obj: unknown): obj is Cart {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'userId' in obj &&
    'items' in obj &&
    Array.isArray((obj as Cart).items) &&
    'summary' in obj
  )
}
