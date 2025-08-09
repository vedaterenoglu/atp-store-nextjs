/**
 * Unit tests for customer-cart service
 * SOLID Principles: SRP - Single responsibility for testing cart service
 * Design Patterns: Test Suite Pattern
 * Dependencies: Jest, Testing Library, Clerk mocks
 */

import type { Cart } from '@/types/cart'

// Mock Clerk first before any imports
jest.mock('@clerk/nextjs/server', () => ({
  currentUser: jest.fn(),
}))

// Mock console.error
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

afterAll(() => {
  jest.restoreAllMocks()
})

// Type definitions for service functions
type GetCustomerCartFn = () => Promise<Cart | null>
type AddToCartFn = (
  productId: string,
  quantity?: number
) => Promise<Cart | null>
type UpdateCartItemQuantityFn = (
  itemId: string,
  quantity: number
) => Promise<Cart | null>
type RemoveFromCartFn = (itemId: string) => Promise<Cart | null>
type ClearCartFn = () => Promise<boolean>
type CheckoutCartFn = () => Promise<boolean>

// Mock user type
type MockClerkUser = {
  id: string
  publicMetadata?: {
    role?: string
    customerid?: string
    [key: string]: unknown
  }
}

describe('customer-cart.service', () => {
  let currentUser: jest.MockedFunction<() => Promise<MockClerkUser | null>>
  let getCustomerCart: GetCustomerCartFn
  let addToCart: AddToCartFn
  let updateCartItemQuantity: UpdateCartItemQuantityFn
  let removeFromCart: RemoveFromCartFn
  let clearCart: ClearCartFn
  let checkoutCart: CheckoutCartFn

  beforeEach(async () => {
    jest.clearAllMocks()
    // Reset environment variable
    process.env['NEXT_PUBLIC_SHIPPING_PRICE'] = '0'
    // Clear module cache to reset mock cart state
    jest.resetModules()

    // Re-import modules fresh for each test using dynamic imports
    const clerkMock = await import('@clerk/nextjs/server')
    currentUser = (
      clerkMock as unknown as {
        currentUser: jest.MockedFunction<() => Promise<MockClerkUser | null>>
      }
    ).currentUser

    const cartService = await import('../customer-cart.service')
    getCustomerCart = cartService.getCustomerCart
    addToCart = cartService.addToCart
    updateCartItemQuantity = cartService.updateCartItemQuantity
    removeFromCart = cartService.removeFromCart
    clearCart = cartService.clearCart
    checkoutCart = cartService.checkoutCart
  })

  describe('getCustomerCart', () => {
    it('should return cart for authenticated customer', async () => {
      currentUser.mockResolvedValue({
        id: 'user-123',
        publicMetadata: {
          role: 'customer',
          customerid: 'CUST-456',
        },
      } as MockClerkUser)

      const cart = await getCustomerCart()

      expect(cart).toBeDefined()
      expect(cart?.id).toBe('cart-CUST-456')
      expect(cart?.userId).toBe('user-123')
      expect(cart?.customerId).toBe('CUST-456')
      expect(cart?.status).toBe('ACTIVE')
      expect(cart?.items).toEqual([])
      expect(cart?.summary).toMatchObject({
        subtotal: 0,
        totalDiscount: 0,
        tax: 0,
        shipping: 0,
        total: 0,
        itemCount: 0,
        uniqueItemCount: 0,
      })
    })

    it('should return null when user is not authenticated', async () => {
      currentUser.mockResolvedValue(null)

      const cart = await getCustomerCart()

      expect(cart).toBeNull()
      expect(console.error).toHaveBeenCalledWith(
        'Error fetching customer cart:',
        expect.any(Error)
      )
    })

    it('should return null when user role is not customer', async () => {
      currentUser.mockResolvedValue({
        id: 'user-123',
        publicMetadata: {
          role: 'admin',
          customerid: 'CUST-456',
        },
      } as MockClerkUser)

      const cart = await getCustomerCart()

      expect(cart).toBeNull()
      expect(console.error).toHaveBeenCalledWith(
        'Error fetching customer cart:',
        expect.any(Error)
      )
    })

    it('should return null when customerid is missing', async () => {
      currentUser.mockResolvedValue({
        id: 'user-123',
        publicMetadata: {
          role: 'customer',
        },
      } as MockClerkUser)

      const cart = await getCustomerCart()

      expect(cart).toBeNull()
      expect(console.error).toHaveBeenCalledWith(
        'Error fetching customer cart:',
        expect.any(Error)
      )
    })

    it('should return null when publicMetadata is missing', async () => {
      currentUser.mockResolvedValue({
        id: 'user-123',
      } as MockClerkUser)

      const cart = await getCustomerCart()

      expect(cart).toBeNull()
      expect(console.error).toHaveBeenCalledWith(
        'Error fetching customer cart:',
        expect.any(Error)
      )
    })

    it('should reuse existing mock cart on subsequent calls', async () => {
      currentUser.mockResolvedValue({
        id: 'user-123',
        publicMetadata: {
          role: 'customer',
          customerid: 'CUST-456',
        },
      } as MockClerkUser)

      const cart1 = await getCustomerCart()
      const cart2 = await getCustomerCart()

      expect(cart1).toBe(cart2) // Same reference
      expect(currentUser).toHaveBeenCalledTimes(2)
    })

    it('should handle currentUser throwing an error', async () => {
      currentUser.mockRejectedValue(new Error('Auth service error'))

      const cart = await getCustomerCart()

      expect(cart).toBeNull()
      expect(console.error).toHaveBeenCalledWith(
        'Error fetching customer cart:',
        expect.any(Error)
      )
    })
  })

  describe('addToCart', () => {
    beforeEach(() => {
      // Reset mock cart between tests
      jest.resetModules()
    })

    it('should add new item to empty cart', async () => {
      currentUser.mockResolvedValue({
        id: 'user-123',
        publicMetadata: {
          role: 'customer',
          customerid: 'CUST-456',
        },
      } as MockClerkUser)

      const cart = await addToCart('PROD-001', 2)

      expect(cart).toBeDefined()
      expect(cart?.items).toHaveLength(1)
      expect(cart?.items[0]).toMatchObject({
        productId: 'PROD-001',
        productName: 'Product PROD-001',
        quantity: 2,
        unitPrice: 99.99,
        totalPrice: 199.98,
        vatRate: 25,
        vatAmount: 50, // Math.round(199.98 * 0.25)
      })
      expect(cart?.summary.itemCount).toBe(2)
      expect(cart?.summary.uniqueItemCount).toBe(1)
    })

    it('should update quantity when adding existing item', async () => {
      currentUser.mockResolvedValue({
        id: 'user-123',
        publicMetadata: {
          role: 'customer',
          customerid: 'CUST-456',
        },
      } as MockClerkUser)

      // Add first time
      await addToCart('PROD-001', 2)
      // Add again
      const cart = await addToCart('PROD-001', 3)

      expect(cart?.items).toHaveLength(1)
      expect(cart?.items[0]?.quantity).toBe(5) // 2 + 3
      expect(cart?.items[0]?.totalPrice).toBe(499.95) // 5 * 99.99
    })

    it('should handle existing item with discount', async () => {
      currentUser.mockResolvedValue({
        id: 'user-123',
        publicMetadata: {
          role: 'customer',
          customerid: 'CUST-456',
        },
      } as MockClerkUser)

      // First add an item
      const cart1 = await addToCart('PROD-001', 1)
      // Manually set discount on the item
      if (cart1?.items[0]) {
        cart1.items[0].discount = 10
      }

      // Add more of the same item
      const cart2 = await addToCart('PROD-001', 2)

      expect(cart2?.items[0]?.quantity).toBe(3)
      expect(cart2?.items[0]?.discountedPrice).toBeCloseTo(269.973, 2) // 299.97 * 0.9
    })

    it('should add item with default quantity of 1', async () => {
      currentUser.mockResolvedValue({
        id: 'user-123',
        publicMetadata: {
          role: 'customer',
          customerid: 'CUST-456',
        },
      } as MockClerkUser)

      const cart = await addToCart('PROD-001')

      expect(cart?.items[0]?.quantity).toBe(1)
    })

    it('should calculate summary with shipping from env', async () => {
      process.env['NEXT_PUBLIC_SHIPPING_PRICE'] = '50'
      currentUser.mockResolvedValue({
        id: 'user-123',
        publicMetadata: {
          role: 'customer',
          customerid: 'CUST-456',
        },
      } as MockClerkUser)

      const cart = await addToCart('PROD-001', 1)

      expect(cart?.summary.shipping).toBe(50)
      expect(cart?.summary.total).toBe(174.9875) // 99.99 + 24.9975 (tax) + 50 (shipping)
    })

    it('should handle shipping price as 0 when env is not a number', async () => {
      process.env['NEXT_PUBLIC_SHIPPING_PRICE'] = 'invalid'
      currentUser.mockResolvedValue({
        id: 'user-123',
        publicMetadata: {
          role: 'customer',
          customerid: 'CUST-456',
        },
      } as MockClerkUser)

      const cart = await addToCart('PROD-001', 1)

      expect(cart?.summary.shipping).toBe(0)
    })

    it('should return null when getCustomerCart fails', async () => {
      currentUser.mockResolvedValue(null)

      const cart = await addToCart('PROD-001', 1)

      expect(cart).toBeNull()
    })

    it('should handle errors gracefully', async () => {
      // Create a specific error that will be caught in the service
      const authError = new Error('Auth error')
      currentUser.mockRejectedValue(authError)

      const cart = await addToCart('PROD-001', 1)

      expect(cart).toBeNull()
      // The error is caught in getCustomerCart which is called first
      expect(console.error).toHaveBeenCalledWith(
        'Error fetching customer cart:',
        authError
      )
    })

    it('should calculate discount in summary', async () => {
      currentUser.mockResolvedValue({
        id: 'user-123',
        publicMetadata: {
          role: 'customer',
          customerid: 'CUST-456',
        },
      } as MockClerkUser)

      const cart = await addToCart('PROD-001', 2)
      // Set discount on item
      if (cart?.items[0]) {
        cart.items[0].discount = 20
        // Recalculate by adding another item
        const updatedCart = await addToCart('PROD-002', 1)

        expect(updatedCart?.summary.totalDiscount).toBe(39.996) // 199.98 * 0.2
      }
    })
  })

  describe('updateCartItemQuantity', () => {
    beforeEach(() => {
      jest.resetModules()
    })

    it('should update item quantity', async () => {
      currentUser.mockResolvedValue({
        id: 'user-123',
        publicMetadata: {
          role: 'customer',
          customerid: 'CUST-456',
        },
      } as MockClerkUser)

      // Add item first
      const cart1 = await addToCart('PROD-001', 2)
      const itemId = cart1?.items[0]?.id

      const cart2 = await updateCartItemQuantity(itemId!, 5)

      expect(cart2?.items[0]?.quantity).toBe(5)
      expect(cart2?.items[0]?.totalPrice).toBe(499.95)
      expect(cart2?.summary.itemCount).toBe(5)
    })

    it('should respect maxQuantity limit', async () => {
      currentUser.mockResolvedValue({
        id: 'user-123',
        publicMetadata: {
          role: 'customer',
          customerid: 'CUST-456',
        },
      } as MockClerkUser)

      const cart1 = await addToCart('PROD-001', 1)
      const itemId = cart1?.items[0]?.id

      // Try to set quantity above max (maxQuantity is 10)
      const cart2 = await updateCartItemQuantity(itemId!, 15)

      expect(cart2?.items[0]?.quantity).toBe(10) // Capped at maxQuantity
      expect(cart2?.items[0]?.totalPrice).toBe(999.9)
    })

    it('should remove item when quantity is 0', async () => {
      currentUser.mockResolvedValue({
        id: 'user-123',
        publicMetadata: {
          role: 'customer',
          customerid: 'CUST-456',
        },
      } as MockClerkUser)

      const cart1 = await addToCart('PROD-001', 2)
      const itemId = cart1?.items[0]?.id

      const cart2 = await updateCartItemQuantity(itemId!, 0)

      expect(cart2?.items).toHaveLength(0)
      expect(cart2?.summary.itemCount).toBe(0)
      expect(cart2?.summary.uniqueItemCount).toBe(0)
    })

    it('should remove item when quantity is negative', async () => {
      currentUser.mockResolvedValue({
        id: 'user-123',
        publicMetadata: {
          role: 'customer',
          customerid: 'CUST-456',
        },
      } as MockClerkUser)

      const cart1 = await addToCart('PROD-001', 2)
      const itemId = cart1?.items[0]?.id

      const cart2 = await updateCartItemQuantity(itemId!, -5)

      expect(cart2?.items).toHaveLength(0)
    })

    it('should update item with discount', async () => {
      currentUser.mockResolvedValue({
        id: 'user-123',
        publicMetadata: {
          role: 'customer',
          customerid: 'CUST-456',
        },
      } as MockClerkUser)

      const cart1 = await addToCart('PROD-001', 1)
      if (cart1?.items[0]) {
        cart1.items[0].discount = 15
      }
      const itemId = cart1?.items[0]?.id

      const cart2 = await updateCartItemQuantity(itemId!, 3)

      expect(cart2?.items[0]?.quantity).toBe(3)
      expect(cart2?.items[0]?.totalPrice).toBeCloseTo(299.97, 2)
      expect(cart2?.items[0]?.discountedPrice).toBeCloseTo(254.9745, 2) // 299.97 * 0.85
    })

    it('should return null when item not found', async () => {
      currentUser.mockResolvedValue({
        id: 'user-123',
        publicMetadata: {
          role: 'customer',
          customerid: 'CUST-456',
        },
      } as MockClerkUser)

      await addToCart('PROD-001', 1)
      const cart = await updateCartItemQuantity('non-existent-id', 5)

      expect(cart).toBeNull()
    })

    it('should return null when cart is null', async () => {
      currentUser.mockResolvedValue(null)

      const cart = await updateCartItemQuantity('item-id', 5)

      expect(cart).toBeNull()
    })

    it('should handle errors gracefully', async () => {
      const authError = new Error('Auth error')
      currentUser.mockRejectedValue(authError)

      const cart = await updateCartItemQuantity('item-id', 5)

      expect(cart).toBeNull()
      // The error is caught in getCustomerCart which is called first
      expect(console.error).toHaveBeenCalledWith(
        'Error fetching customer cart:',
        authError
      )
    })

    it('should update summary with shipping from env', async () => {
      process.env['NEXT_PUBLIC_SHIPPING_PRICE'] = '25'
      currentUser.mockResolvedValue({
        id: 'user-123',
        publicMetadata: {
          role: 'customer',
          customerid: 'CUST-456',
        },
      } as MockClerkUser)

      const cart1 = await addToCart('PROD-001', 1)
      const itemId = cart1?.items[0]?.id

      const cart2 = await updateCartItemQuantity(itemId!, 2)

      expect(cart2?.summary.shipping).toBe(25)
      expect(cart2?.summary.total).toBe(274.975) // 199.98 + 49.995 (tax) + 25 (shipping)
    })
  })

  describe('removeFromCart', () => {
    it('should remove item by calling updateCartItemQuantity with 0', async () => {
      currentUser.mockResolvedValue({
        id: 'user-123',
        publicMetadata: {
          role: 'customer',
          customerid: 'CUST-456',
        },
      } as MockClerkUser)

      const cart1 = await addToCart('PROD-001', 3)
      const itemId = cart1?.items[0]?.id

      const cart2 = await removeFromCart(itemId!)

      expect(cart2?.items).toHaveLength(0)
      expect(cart2?.summary.itemCount).toBe(0)
    })

    it('should handle non-existent item', async () => {
      currentUser.mockResolvedValue({
        id: 'user-123',
        publicMetadata: {
          role: 'customer',
          customerid: 'CUST-456',
        },
      } as MockClerkUser)

      const cart = await removeFromCart('non-existent-id')

      expect(cart).toBeNull()
    })
  })

  describe('clearCart', () => {
    it('should clear all items from cart', async () => {
      currentUser.mockResolvedValue({
        id: 'user-123',
        publicMetadata: {
          role: 'customer',
          customerid: 'CUST-456',
        },
      } as MockClerkUser)

      // Add multiple items
      await addToCart('PROD-001', 2)
      await addToCart('PROD-002', 3)

      const success = await clearCart()

      expect(success).toBe(true)

      // Verify cart is empty
      const cart = await getCustomerCart()
      expect(cart?.items).toHaveLength(0)
      expect(cart?.summary).toMatchObject({
        subtotal: 0,
        totalDiscount: 0,
        tax: 0,
        shipping: 0,
        total: 0,
        itemCount: 0,
        uniqueItemCount: 0,
      })
    })

    it('should return false when cart is null', async () => {
      currentUser.mockResolvedValue(null)

      const success = await clearCart()

      expect(success).toBe(false)
    })

    it('should handle errors gracefully', async () => {
      const authError = new Error('Auth error')
      currentUser.mockRejectedValue(authError)

      const success = await clearCart()

      expect(success).toBe(false)
      // The error is caught in getCustomerCart which is called first
      expect(console.error).toHaveBeenCalledWith(
        'Error fetching customer cart:',
        authError
      )
    })

    it('should update cart timestamp', async () => {
      currentUser.mockResolvedValue({
        id: 'user-123',
        publicMetadata: {
          role: 'customer',
          customerid: 'CUST-456',
        },
      } as MockClerkUser)

      await addToCart('PROD-001', 1)
      const cartBefore = await getCustomerCart()
      const timestampBefore = cartBefore?.updatedAt

      // Wait a bit to ensure timestamp changes
      await new Promise(resolve => setTimeout(resolve, 10))

      await clearCart()
      const cartAfter = await getCustomerCart()

      expect(cartAfter?.updatedAt).not.toEqual(timestampBefore)
    })
  })

  describe('checkoutCart', () => {
    it('should initiate checkout for cart with items', async () => {
      currentUser.mockResolvedValue({
        id: 'user-123',
        publicMetadata: {
          role: 'customer',
          customerid: 'CUST-456',
        },
      } as MockClerkUser)

      await addToCart('PROD-001', 2)
      const success = await checkoutCart()

      expect(success).toBe(true)

      // Verify cart status changed
      const cart = await getCustomerCart()
      expect(cart?.status).toBe('PENDING')
    })

    it('should return false for empty cart', async () => {
      currentUser.mockResolvedValue({
        id: 'user-123',
        publicMetadata: {
          role: 'customer',
          customerid: 'CUST-456',
        },
      } as MockClerkUser)

      const success = await checkoutCart()

      expect(success).toBe(false)
    })

    it('should return false when cart is null', async () => {
      currentUser.mockResolvedValue(null)

      const success = await checkoutCart()

      expect(success).toBe(false)
    })

    it('should handle errors gracefully', async () => {
      const authError = new Error('Auth error')
      currentUser.mockRejectedValue(authError)

      const success = await checkoutCart()

      expect(success).toBe(false)
      // The error is caught in getCustomerCart which is called first
      expect(console.error).toHaveBeenCalledWith(
        'Error fetching customer cart:',
        authError
      )
    })

    it('should update cart timestamp on checkout', async () => {
      currentUser.mockResolvedValue({
        id: 'user-123',
        publicMetadata: {
          role: 'customer',
          customerid: 'CUST-456',
        },
      } as MockClerkUser)

      await addToCart('PROD-001', 1)
      const cartBefore = await getCustomerCart()
      const timestampBefore = cartBefore?.updatedAt

      // Wait a bit to ensure timestamp changes
      await new Promise(resolve => setTimeout(resolve, 10))

      await checkoutCart()
      const cartAfter = await getCustomerCart()

      expect(cartAfter?.updatedAt).not.toEqual(timestampBefore)
    })
  })

  describe('Edge Cases', () => {
    it('should handle undefined environment variable', async () => {
      delete process.env['NEXT_PUBLIC_SHIPPING_PRICE']
      currentUser.mockResolvedValue({
        id: 'user-123',
        publicMetadata: {
          role: 'customer',
          customerid: 'CUST-456',
        },
      } as MockClerkUser)

      const cart = await addToCart('PROD-001', 1)

      expect(cart?.summary.shipping).toBe(0)
    })

    it('should handle empty string environment variable', async () => {
      process.env['NEXT_PUBLIC_SHIPPING_PRICE'] = ''
      currentUser.mockResolvedValue({
        id: 'user-123',
        publicMetadata: {
          role: 'customer',
          customerid: 'CUST-456',
        },
      } as MockClerkUser)

      const cart = await addToCart('PROD-001', 1)

      expect(cart?.summary.shipping).toBe(0)
    })

    it('should handle negative shipping price', async () => {
      process.env['NEXT_PUBLIC_SHIPPING_PRICE'] = '-10'
      currentUser.mockResolvedValue({
        id: 'user-123',
        publicMetadata: {
          role: 'customer',
          customerid: 'CUST-456',
        },
      } as MockClerkUser)

      const cart = await addToCart('PROD-001', 1)

      expect(cart?.summary.shipping).toBe(-10)
      expect(cart?.summary.total).toBe(114.9875) // 99.99 + 24.9975 - 10
    })
  })
})
