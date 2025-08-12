/**
 * Cart store using Zustand with persistence
 * SOLID Principles: SRP - Single responsibility for cart state management
 * Design Patterns: Store Pattern, Observer Pattern
 * Dependencies: Zustand, cart types
 */

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import type { Cart, CartItem, CartStatus } from '@/types/cart'
import {
  fetchProductPriceAction,
  fetchMultipleProductPricesAction,
} from '@/app/actions/product-price.actions'
import { calculateOrderLine } from '@/lib/utils/pricing'

interface CartStore {
  // State
  cart: Cart | null
  isLoading: boolean
  isInitialized: boolean
  companyId: string // Company ID for price fetching

  // Actions
  initializeCart: (
    userId: string,
    customerId: string,
    companyId?: string
  ) => void
  addToCart: (
    productId: string,
    productName: string,
    unitPrice: number,
    quantity?: number,
    productImage?: string,
    productGroup?: string,
    stockUnit?: string,
    maxQuantity?: number,
    discount?: number
  ) => Promise<boolean>
  updateQuantity: (itemId: string, quantity: number) => Promise<void>
  removeFromCart: (itemId: string) => Promise<void>
  clearCart: () => void
  setCartStatus: (status: CartStatus) => void
  checkout: () => Promise<boolean>

  // Computed getters
  getItemCount: () => number
  getUniqueItemCount: () => number
  getSubtotal: () => number
  getTotal: () => number
  getTotalDiscount: () => number
  findCartItem: (productId: string) => CartItem | undefined

  // Helper actions
  recalculateSummary: () => void
  resetCart: () => void
  refreshPrices: () => Promise<void> // Fetch latest prices from backend
}

const FREE_SHIPPING_THRESHOLD = 50000 // 500 SEK in öre
const SHIPPING_COST = Number(process.env['NEXT_PUBLIC_SHIPPING_PRICE']) || 0 // Get from env, default 0
const DEFAULT_COMPANY_ID = 'alfe' // Default company ID

export const useCartStore = create<CartStore>()(
  persist(
    immer((set, get) => ({
      // Initial state
      cart: null,
      isLoading: false,
      isInitialized: false,
      companyId: DEFAULT_COMPANY_ID,

      // Initialize cart for a user
      initializeCart: (
        userId: string,
        customerId: string,
        companyId?: string
      ) => {
        set(state => {
          // Set company ID if provided
          if (companyId) {
            state.companyId = companyId
          }

          // If cart exists and belongs to same user, keep it
          if (
            state.cart &&
            state.cart.userId === userId &&
            state.cart.customerId === customerId
          ) {
            state.isInitialized = true
            // Refresh prices for existing cart
            get().refreshPrices()
            return
          }

          // Create new cart for user
          state.cart = {
            id: `cart-${customerId}`,
            userId,
            customerId,
            companyId: state.companyId,
            status: 'ACTIVE' as CartStatus,
            items: [], // Always start with empty cart
            summary: {
              subtotal: 0,
              totalDiscount: 0,
              tax: 0,
              shipping: 0,
              total: 0,
              itemCount: 0,
              uniqueItemCount: 0,
            },
            createdAt: new Date(),
            updatedAt: new Date(),
          }
          state.isInitialized = true
        })
      },

      // Add item to cart
      addToCart: async (
        productId,
        productName,
        _unitPrice, // Unused now, keeping for API compatibility
        quantity = 1,
        productImage = '/placeholder-product.jpg',
        productGroup = 'General',
        stockUnit = 'pcs',
        maxQuantity = 99,
        discount
      ) => {
        const { cart } = get()
        const { companyId } = get()

        // Cart must exist (user must be signed in)
        if (!cart) {
          console.warn('Cannot add to cart: Cart not initialized')
          return false
        }

        // Set loading state
        set(state => {
          state.isLoading = true
        })

        try {
          // Always fetch backend price (user is authenticated)
          const priceData = await fetchProductPriceAction(
            companyId,
            cart.customerId || '',
            productId
          )

          // Calculate line totals
          const lineCalc = calculateOrderLine(
            quantity,
            priceData.unitPrice,
            priceData.vatRate
          )

          set(state => {
            if (!state.cart) return

            // Check if item already exists
            const existingItem = state.cart.items.find(
              (item: CartItem) => item.productId === productId
            )

            if (existingItem) {
              // Update quantity of existing item
              const newQuantity = Math.min(
                existingItem.quantity + quantity,
                existingItem.maxQuantity
              )
              const updatedCalc = calculateOrderLine(
                newQuantity,
                priceData.unitPrice,
                priceData.vatRate
              )

              existingItem.quantity = newQuantity
              existingItem.unitPrice = priceData.unitPrice
              existingItem.totalPrice = updatedCalc.subtotal
              existingItem.vatRate = priceData.vatRate
              existingItem.vatAmount = updatedCalc.vatAmount
              existingItem.priceSource = priceData.priceSource
              if (priceData.originalPrice !== undefined) {
                existingItem.originalPrice = priceData.originalPrice
              }
              existingItem.updatedAt = new Date()
            } else {
              // Add new item with backend price
              const newItem: CartItem = {
                id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                productId,
                productName,
                productImage,
                productGroup,
                quantity,
                unitPrice: priceData.unitPrice,
                totalPrice: lineCalc.subtotal,
                vatRate: priceData.vatRate,
                vatAmount: lineCalc.vatAmount,
                priceSource: priceData.priceSource,
                ...(priceData.originalPrice !== undefined && {
                  originalPrice: priceData.originalPrice,
                }),
                stockUnit,
                maxQuantity,
                ...(discount && { discount }),
                isAvailable: true,
                addedAt: new Date(),
                updatedAt: new Date(),
              }
              state.cart.items.push(newItem)
            }

            state.cart.updatedAt = new Date()
          })

          // Recalculate summary after adding
          get().recalculateSummary()
          return true // Successfully added
        } catch (error) {
          console.error('Failed to add item to cart:', error)
          return false // Failed to add
        } finally {
          set(state => {
            state.isLoading = false
          })
        }
      },

      // Update item quantity with SSOT pattern - fetch fresh prices for ALL items
      updateQuantity: async (itemId: string, quantity: number) => {
        const { cart } = get()
        if (!cart) return

        // First, update the quantity locally for immediate UI feedback
        set(state => {
          if (!state.cart) return
          const item = state.cart.items.find((i: CartItem) => i.id === itemId)
          if (!item) return

          if (quantity <= 0) {
            // Remove item if quantity is 0 or less
            state.cart.items = state.cart.items.filter(
              (i: CartItem) => i.id !== itemId
            )
          } else {
            // Update quantity only (not prices yet)
            item.quantity = Math.min(quantity, item.maxQuantity)
          }
        })

        // Now fetch fresh prices for ALL items from backend (SSOT)
        await get().refreshPrices()
      },

      // Remove item from cart with SSOT pattern
      removeFromCart: async (itemId: string) => {
        set(state => {
          if (!state.cart) return

          state.cart.items = state.cart.items.filter(
            (i: CartItem) => i.id !== itemId
          )
          state.cart.updatedAt = new Date()
        })

        // Fetch fresh prices for remaining items (SSOT)
        const { cart } = get()
        if (cart && cart.items.length > 0) {
          await get().refreshPrices()
        } else {
          // If cart is empty, just recalculate summary
          get().recalculateSummary()
        }
      },

      // Set cart status
      setCartStatus: (status: CartStatus) => {
        set(state => {
          if (!state.cart) return
          state.cart.status = status
          state.cart.updatedAt = new Date()
        })
      },

      // Checkout cart
      checkout: async () => {
        const { cart, setCartStatus, clearCart } = get()
        if (!cart || cart.items.length === 0) return false

        try {
          set(state => {
            state.isLoading = true
          })

          // Set status to pending
          setCartStatus('PENDING' as CartStatus)

          // TODO: Implement actual checkout logic
          // 1. Validate all items are available
          // 2. Create order in backend
          // 3. Process payment
          // 4. Clear cart on success

          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000))

          // Clear cart after successful checkout
          clearCart()

          return true
        } catch (error) {
          console.error('Checkout failed:', error)
          setCartStatus('ACTIVE' as CartStatus)
          return false
        } finally {
          set(state => {
            state.isLoading = false
          })
        }
      },

      // Computed getters
      getItemCount: () => {
        const { cart } = get()
        return cart?.summary.itemCount || 0
      },

      getUniqueItemCount: () => {
        const { cart } = get()
        return cart?.summary.uniqueItemCount || 0
      },

      getSubtotal: () => {
        const { cart } = get()
        return cart?.summary.subtotal || 0
      },

      getTotal: () => {
        const { cart } = get()
        return cart?.summary.total || 0
      },

      getTotalDiscount: () => {
        const { cart } = get()
        return cart?.summary.totalDiscount || 0
      },

      findCartItem: (productId: string) => {
        const { cart } = get()
        return cart?.items.find(item => item.productId === productId)
      },

      // Clear all items from cart
      clearCart: () => {
        set(state => {
          if (!state.cart) return

          state.cart.items = []
          state.cart.summary = {
            itemCount: 0,
            uniqueItemCount: 0,
            subtotal: 0,
            tax: 0,
            shipping: 0,
            total: 0,
            totalDiscount: 0,
          }
        })
      },

      // Helper to recalculate cart summary
      recalculateSummary: () => {
        set(state => {
          if (!state.cart) return

          const items = state.cart.items

          // Calculate subtotal (excl. VAT)
          const subtotal = items.reduce(
            (sum: number, item: CartItem) => sum + item.totalPrice,
            0
          )

          // Calculate total VAT using product-specific rates
          const tax = items.reduce(
            (sum: number, item: CartItem) => sum + (item.vatAmount || 0),
            0
          )

          // Calculate total discount
          const totalDiscount = items.reduce((sum: number, item: CartItem) => {
            if (item.originalPrice && item.priceSource === 'campaign') {
              // For campaign prices, discount is the difference
              return sum + (item.originalPrice - item.unitPrice) * item.quantity
            }
            return sum
          }, 0)

          // Calculate item counts
          const itemCount = items.reduce(
            (sum: number, item: CartItem) => sum + item.quantity,
            0
          )
          const uniqueItemCount = items.length

          // Calculate shipping
          const shipping =
            subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST

          // Calculate total (subtotal + VAT + shipping)
          const total = subtotal + tax + shipping

          // Update summary
          state.cart.summary = {
            subtotal,
            totalDiscount,
            tax,
            shipping,
            total,
            itemCount,
            uniqueItemCount,
          }
        })
      },

      // Reset cart (for logout)
      resetCart: () => {
        set(state => {
          state.cart = null
          state.isInitialized = false
          state.isLoading = false
        })
      },

      // Refresh prices from backend
      refreshPrices: async () => {
        const { cart, companyId } = get()
        if (!cart || cart.items.length === 0) return

        // Cart must have customerId (authenticated user)
        if (!cart.customerId) {
          console.error('Cart missing customerId - cannot refresh prices')
          return
        }

        set(state => {
          state.isLoading = true
        })

        try {
          // Get all unique product IDs
          const stockIds = cart.items.map(item => item.productId)

          // Fetch prices for all products using Server Action
          const priceObject = await fetchMultipleProductPricesAction(
            companyId,
            cart.customerId,
            stockIds
          )

          set(state => {
            if (!state.cart) return

            // Update each item with new prices
            state.cart.items.forEach(item => {
              const priceData = priceObject[item.productId]
              if (priceData) {
                const lineCalc = calculateOrderLine(
                  item.quantity,
                  priceData.unitPrice,
                  priceData.vatRate
                )

                item.unitPrice = priceData.unitPrice
                item.totalPrice = lineCalc.subtotal
                item.vatRate = priceData.vatRate
                item.vatAmount = lineCalc.vatAmount
                item.priceSource = priceData.priceSource
                if (priceData.originalPrice !== undefined) {
                  item.originalPrice = priceData.originalPrice
                }
                item.updatedAt = new Date()
              }
            })

            state.cart.updatedAt = new Date()
          })

          // Recalculate summary with new prices
          get().recalculateSummary()
        } catch (error) {
          console.error('Failed to refresh prices:', error)
        } finally {
          set(state => {
            state.isLoading = false
          })
        }
      },
    })),
    {
      name: 'cart-storage', // localStorage key
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        cart: state.cart,
        isInitialized: state.isInitialized,
      }), // Only persist cart data and init state
      version: 1,
    }
  )
)

// Stable empty array reference to prevent infinite loops
const EMPTY_ARRAY: CartItem[] = []

// Selector hooks for common use cases
export const useCartItem = (productId: string) =>
  useCartStore(state => state.findCartItem(productId))

export const useCartSummary = () => useCartStore(state => state.cart?.summary)

export const useCartItems = () =>
  useCartStore(state => state.cart?.items || EMPTY_ARRAY)

export const useCartCount = () => useCartStore(state => state.getItemCount())

export const useIsCartEmpty = () =>
  useCartStore(state => !state.cart || state.cart.items.length === 0)
