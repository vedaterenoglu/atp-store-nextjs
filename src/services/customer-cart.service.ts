/**
 * Customer cart service layer
 * SOLID Principles: SRP - Single responsibility for customer cart operations
 * Design Patterns: Service Layer Pattern
 * Dependencies: Apollo Client, cart types
 */

import 'server-only'
import { currentUser } from '@clerk/nextjs/server'
import type { Cart, CartItem, CartStatus } from '@/types/cart'

// Mock cart for development
let mockCart: Cart | null = null

/**
 * Get or create cart for current customer
 */
export async function getCustomerCart(): Promise<Cart | null> {
  try {
    const user = await currentUser()

    if (!user) {
      throw new Error('User not authenticated')
    }

    // Get customerid from public metadata
    const customerid = user.publicMetadata?.customerid as string
    const role = user.publicMetadata?.['role'] as string

    if (role !== 'customer' || !customerid) {
      throw new Error('User is not a customer or missing customerid')
    }

    // For now, return mock cart
    // TODO: Replace with actual GraphQL query
    if (!mockCart) {
      mockCart = {
        id: `cart-${customerid}`,
        userId: user.id,
        customerId: customerid,
        status: 'ACTIVE' as CartStatus,
        items: [],
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
    }

    return mockCart
  } catch (error) {
    console.error('Error fetching customer cart:', error)
    return null
  }
}

/**
 * Add item to customer cart
 */
export async function addToCart(
  productId: string,
  quantity: number = 1
): Promise<Cart | null> {
  try {
    const cart = await getCustomerCart()
    if (!cart) return null

    // Check if item already exists
    const existingItem = cart.items.find(item => item.productId === productId)

    if (existingItem) {
      // Update quantity
      existingItem.quantity += quantity
      existingItem.totalPrice = existingItem.unitPrice * existingItem.quantity
      if (existingItem.discount) {
        existingItem.discountedPrice =
          existingItem.totalPrice * (1 - existingItem.discount / 100)
      }
    } else {
      // Add new item (mock data for now)
      const newItem: CartItem = {
        id: `item-${Date.now()}`,
        productId,
        productName: `Product ${productId}`, // TODO: Fetch from product service
        productImage: '/placeholder-product.jpg',
        productGroup: 'General',
        quantity,
        unitPrice: 99.99, // TODO: Fetch from product service
        totalPrice: 99.99 * quantity,
        vatRate: 25, // TODO: Fetch from backend
        vatAmount: Math.round(99.99 * quantity * 0.25), // TODO: Calculate from backend
        stockUnit: 'pcs',
        maxQuantity: 10,
        isAvailable: true,
        addedAt: new Date(),
        updatedAt: new Date(),
      }
      cart.items.push(newItem)
    }

    // Recalculate summary
    cart.summary.subtotal = cart.items.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    )
    cart.summary.totalDiscount = cart.items.reduce(
      (sum, item) =>
        sum + (item.discount ? item.totalPrice * (item.discount / 100) : 0),
      0
    )
    cart.summary.itemCount = cart.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    )
    cart.summary.uniqueItemCount = cart.items.length
    cart.summary.tax = cart.summary.subtotal * 0.25 // 25% tax
    cart.summary.shipping =
      Number(process.env['NEXT_PUBLIC_SHIPPING_PRICE']) || 0 // From env variable
    cart.summary.total =
      cart.summary.subtotal -
      cart.summary.totalDiscount +
      cart.summary.tax +
      cart.summary.shipping

    cart.updatedAt = new Date()

    return cart
  } catch (error) {
    console.error('Error adding to cart:', error)
    return null
  }
}

/**
 * Update cart item quantity
 */
export async function updateCartItemQuantity(
  itemId: string,
  quantity: number
): Promise<Cart | null> {
  try {
    const cart = await getCustomerCart()
    if (!cart) return null

    const item = cart.items.find(i => i.id === itemId)
    if (!item) return null

    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      cart.items = cart.items.filter(i => i.id !== itemId)
    } else {
      // Update quantity
      item.quantity = Math.min(quantity, item.maxQuantity)
      item.totalPrice = item.unitPrice * item.quantity
      if (item.discount) {
        item.discountedPrice = item.totalPrice * (1 - item.discount / 100)
      }
      item.updatedAt = new Date()
    }

    // Recalculate summary
    cart.summary.subtotal = cart.items.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    )
    cart.summary.totalDiscount = cart.items.reduce(
      (sum, item) =>
        sum + (item.discount ? item.totalPrice * (item.discount / 100) : 0),
      0
    )
    cart.summary.itemCount = cart.items.reduce(
      (sum, item) => sum + item.quantity,
      0
    )
    cart.summary.uniqueItemCount = cart.items.length
    cart.summary.tax = cart.summary.subtotal * 0.25 // 25% tax
    cart.summary.shipping =
      Number(process.env['NEXT_PUBLIC_SHIPPING_PRICE']) || 0 // From env variable
    cart.summary.total =
      cart.summary.subtotal -
      cart.summary.totalDiscount +
      cart.summary.tax +
      cart.summary.shipping

    cart.updatedAt = new Date()

    return cart
  } catch (error) {
    console.error('Error updating cart item:', error)
    return null
  }
}

/**
 * Remove item from cart
 */
export async function removeFromCart(itemId: string): Promise<Cart | null> {
  return updateCartItemQuantity(itemId, 0)
}

/**
 * Clear customer cart
 */
export async function clearCart(): Promise<boolean> {
  try {
    const cart = await getCustomerCart()
    if (!cart) return false

    cart.items = []
    cart.summary = {
      subtotal: 0,
      totalDiscount: 0,
      tax: 0,
      shipping: 0,
      total: 0,
      itemCount: 0,
      uniqueItemCount: 0,
    }
    cart.updatedAt = new Date()

    return true
  } catch (error) {
    console.error('Error clearing cart:', error)
    return false
  }
}

/**
 * Checkout cart
 */
export async function checkoutCart(): Promise<boolean> {
  try {
    const cart = await getCustomerCart()
    if (!cart || cart.items.length === 0) return false

    // TODO: Implement actual checkout logic
    // 1. Validate all items are available
    // 2. Create order
    // 3. Clear cart
    // 4. Redirect to payment

    cart.status = 'PENDING' as CartStatus
    cart.updatedAt = new Date()

    // Checkout initiated for cart

    return true
  } catch (error) {
    console.error('Error during checkout:', error)
    return false
  }
}
