/**
 * Unit tests for cart type definitions and type guards
 * SOLID Principles: SRP - Single responsibility for testing cart types
 * Design Patterns: Test Suite Pattern
 * Dependencies: Cart types
 */

import {
  CartStatus,
  CartActionType,
  CartSortBy,
  isCartItem,
  isCart,
} from '../cart'
import type {
  CartItem,
  CartSummary,
  Cart,
  CartFilter,
  CartSortOptions,
  CartItemProps,
  CartSummaryProps,
  CartListProps,
} from '../cart'

describe('Cart Types', () => {
  describe('Enums', () => {
    it('should have correct CartStatus values', () => {
      expect(CartStatus.ACTIVE).toBe('ACTIVE')
      expect(CartStatus.PENDING).toBe('PENDING')
      expect(CartStatus.CHECKED_OUT).toBe('CHECKED_OUT')
      expect(CartStatus.ABANDONED).toBe('ABANDONED')
      expect(CartStatus.EXPIRED).toBe('EXPIRED')
    })

    it('should have correct CartActionType values', () => {
      expect(CartActionType.ADD_ITEM).toBe('ADD_ITEM')
      expect(CartActionType.REMOVE_ITEM).toBe('REMOVE_ITEM')
      expect(CartActionType.UPDATE_QUANTITY).toBe('UPDATE_QUANTITY')
      expect(CartActionType.CLEAR_CART).toBe('CLEAR_CART')
      expect(CartActionType.SET_CART).toBe('SET_CART')
      expect(CartActionType.UPDATE_ITEM_AVAILABILITY).toBe(
        'UPDATE_ITEM_AVAILABILITY'
      )
      expect(CartActionType.APPLY_DISCOUNT).toBe('APPLY_DISCOUNT')
      expect(CartActionType.CALCULATE_SUMMARY).toBe('CALCULATE_SUMMARY')
    })

    it('should have correct CartSortBy values', () => {
      expect(CartSortBy.CREATED_AT).toBe('createdAt')
      expect(CartSortBy.UPDATED_AT).toBe('updatedAt')
      expect(CartSortBy.TOTAL).toBe('total')
      expect(CartSortBy.ITEM_COUNT).toBe('itemCount')
      expect(CartSortBy.USER_NAME).toBe('userName')
    })
  })

  describe('isCartItem type guard', () => {
    const validCartItem: CartItem = {
      id: 'item-1',
      productId: 'product-1',
      productName: 'Test Product',
      productImage: '/test.jpg',
      productGroup: 'Test Group',
      quantity: 2,
      unitPrice: 1000,
      totalPrice: 2000,
      vatRate: 25,
      vatAmount: 500,
      priceSource: 'default',
      originalPrice: 1200,
      discount: 200,
      discountedPrice: 1000,
      stockUnit: 'pcs',
      maxQuantity: 10,
      isAvailable: true,
      addedAt: new Date(),
      updatedAt: new Date(),
    }

    it('should return true for valid CartItem', () => {
      expect(isCartItem(validCartItem)).toBe(true)
    })

    it('should return true for CartItem with minimal required fields', () => {
      const minimalItem = {
        id: 'item-1',
        productId: 'product-1',
        quantity: 1,
        unitPrice: 1000,
      }
      expect(isCartItem(minimalItem)).toBe(true)
    })

    it('should return false for null', () => {
      expect(isCartItem(null)).toBe(false)
    })

    it('should return false for undefined', () => {
      expect(isCartItem(undefined)).toBe(false)
    })

    it('should return false for non-object types', () => {
      expect(isCartItem('string')).toBe(false)
      expect(isCartItem(123)).toBe(false)
      expect(isCartItem(true)).toBe(false)
      expect(isCartItem([])).toBe(false)
    })

    it('should return false for object missing id', () => {
      const invalidItem = {
        productId: 'product-1',
        quantity: 1,
        unitPrice: 1000,
      }
      expect(isCartItem(invalidItem)).toBe(false)
    })

    it('should return false for object missing productId', () => {
      const invalidItem = {
        id: 'item-1',
        quantity: 1,
        unitPrice: 1000,
      }
      expect(isCartItem(invalidItem)).toBe(false)
    })

    it('should return false for object missing quantity', () => {
      const invalidItem = {
        id: 'item-1',
        productId: 'product-1',
        unitPrice: 1000,
      }
      expect(isCartItem(invalidItem)).toBe(false)
    })

    it('should return false for object missing unitPrice', () => {
      const invalidItem = {
        id: 'item-1',
        productId: 'product-1',
        quantity: 1,
      }
      expect(isCartItem(invalidItem)).toBe(false)
    })

    it('should return false for empty object', () => {
      expect(isCartItem({})).toBe(false)
    })
  })

  describe('isCart type guard', () => {
    const validCart: Cart = {
      id: 'cart-1',
      userId: 'user-1',
      customerId: 'customer-1',
      companyId: 'company-1',
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
      status: CartStatus.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
      expiresAt: new Date(),
      notes: 'Test notes',
    }

    it('should return true for valid Cart', () => {
      expect(isCart(validCart)).toBe(true)
    })

    it('should return true for Cart with minimal required fields', () => {
      const minimalCart = {
        id: 'cart-1',
        userId: 'user-1',
        items: [],
        summary: {},
      }
      expect(isCart(minimalCart)).toBe(true)
    })

    it('should return true for Cart with populated items array', () => {
      const cartWithItems = {
        id: 'cart-1',
        userId: 'user-1',
        items: [
          { id: 'item-1', productId: 'prod-1', quantity: 1, unitPrice: 100 },
        ],
        summary: {
          subtotal: 100,
          total: 100,
        },
      }
      expect(isCart(cartWithItems)).toBe(true)
    })

    it('should return false for null', () => {
      expect(isCart(null)).toBe(false)
    })

    it('should return false for undefined', () => {
      expect(isCart(undefined)).toBe(false)
    })

    it('should return false for non-object types', () => {
      expect(isCart('string')).toBe(false)
      expect(isCart(123)).toBe(false)
      expect(isCart(true)).toBe(false)
      expect(isCart([])).toBe(false)
    })

    it('should return false for object missing id', () => {
      const invalidCart = {
        userId: 'user-1',
        items: [],
        summary: {},
      }
      expect(isCart(invalidCart)).toBe(false)
    })

    it('should return false for object missing userId', () => {
      const invalidCart = {
        id: 'cart-1',
        items: [],
        summary: {},
      }
      expect(isCart(invalidCart)).toBe(false)
    })

    it('should return false for object missing items', () => {
      const invalidCart = {
        id: 'cart-1',
        userId: 'user-1',
        summary: {},
      }
      expect(isCart(invalidCart)).toBe(false)
    })

    it('should return false for object with non-array items', () => {
      const invalidCart = {
        id: 'cart-1',
        userId: 'user-1',
        items: 'not-an-array',
        summary: {},
      }
      expect(isCart(invalidCart)).toBe(false)
    })

    it('should return false for object with items as null', () => {
      const invalidCart = {
        id: 'cart-1',
        userId: 'user-1',
        items: null,
        summary: {},
      }
      expect(isCart(invalidCart)).toBe(false)
    })

    it('should return false for object with items as undefined', () => {
      const invalidCart = {
        id: 'cart-1',
        userId: 'user-1',
        items: undefined,
        summary: {},
      }
      expect(isCart(invalidCart)).toBe(false)
    })

    it('should return false for object with items as object', () => {
      const invalidCart = {
        id: 'cart-1',
        userId: 'user-1',
        items: {},
        summary: {},
      }
      expect(isCart(invalidCart)).toBe(false)
    })

    it('should return false for object missing summary', () => {
      const invalidCart = {
        id: 'cart-1',
        userId: 'user-1',
        items: [],
      }
      expect(isCart(invalidCart)).toBe(false)
    })

    it('should return false for empty object', () => {
      expect(isCart({})).toBe(false)
    })
  })

  describe('Type Interfaces', () => {
    it('should allow valid CartItem creation', () => {
      const item: CartItem = {
        id: 'test-id',
        productId: 'prod-1',
        productName: 'Product',
        productImage: '/image.jpg',
        productGroup: 'Group',
        quantity: 1,
        unitPrice: 100,
        totalPrice: 100,
        vatRate: 25,
        vatAmount: 25,
        stockUnit: 'pcs',
        maxQuantity: 10,
        isAvailable: true,
        addedAt: new Date(),
        updatedAt: new Date(),
      }
      expect(item).toBeDefined()
      expect(item.id).toBe('test-id')
    })

    it('should allow valid CartSummary creation', () => {
      const summary: CartSummary = {
        subtotal: 100,
        totalDiscount: 10,
        tax: 25,
        shipping: 15,
        total: 130,
        itemCount: 2,
        uniqueItemCount: 1,
      }
      expect(summary).toBeDefined()
      expect(summary.total).toBe(130)
    })

    it('should allow valid CartFilter creation', () => {
      const filter: CartFilter = {
        status: [CartStatus.ACTIVE, CartStatus.PENDING],
        userId: 'user-1',
        customerId: 'customer-1',
        companyId: 'company-1',
        dateFrom: new Date('2024-01-01'),
        dateTo: new Date('2024-12-31'),
        minTotal: 100,
        maxTotal: 1000,
        searchTerm: 'test',
      }
      expect(filter).toBeDefined()
      expect(filter.status).toHaveLength(2)
    })

    it('should allow valid CartSortOptions creation', () => {
      const sortOptions: CartSortOptions = {
        sortBy: CartSortBy.CREATED_AT,
        sortOrder: 'desc',
      }
      expect(sortOptions).toBeDefined()
      expect(sortOptions.sortOrder).toBe('desc')
    })

    it('should allow valid CartItemProps creation', () => {
      const props: CartItemProps = {
        item: {
          id: 'item-1',
          productId: 'prod-1',
          productName: 'Product',
          productImage: '/image.jpg',
          productGroup: 'Group',
          quantity: 1,
          unitPrice: 100,
          totalPrice: 100,
          vatRate: 25,
          vatAmount: 25,
          stockUnit: 'pcs',
          maxQuantity: 10,
          isAvailable: true,
          addedAt: new Date(),
          updatedAt: new Date(),
        },
        onQuantityChange: jest.fn(),
        onRemove: jest.fn(),
        readonly: false,
        showActions: true,
        compact: false,
      }
      expect(props).toBeDefined()
      expect(props.readonly).toBe(false)
    })

    it('should allow valid CartSummaryProps creation', () => {
      const props: CartSummaryProps = {
        summary: {
          subtotal: 100,
          totalDiscount: 10,
          tax: 25,
          shipping: 15,
          total: 130,
          itemCount: 2,
          uniqueItemCount: 1,
        },
        showDetails: true,
        className: 'test-class',
      }
      expect(props).toBeDefined()
      expect(props.showDetails).toBe(true)
    })

    it('should allow valid CartListProps creation', () => {
      const props: CartListProps = {
        carts: [],
        onCartSelect: jest.fn(),
        onCartDelete: jest.fn(),
        selectedCartId: 'cart-1',
        loading: false,
      }
      expect(props).toBeDefined()
      expect(props.loading).toBe(false)
    })
  })
})
