/**
 * Unit tests for CartProvider component
 * SOLID Principles: SRP - Single responsibility for testing cart provider
 * Design Patterns: Test Suite Pattern
 * Dependencies: React Testing Library, Clerk mocks, Zustand mocks
 */

import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { CartProvider } from '../cart-provider'
import { useUser } from '@clerk/nextjs'
import { useCartStore } from '@/lib/stores/cart.store'

// Mock Clerk
jest.mock('@clerk/nextjs', () => ({
  useUser: jest.fn(),
}))

// Mock cart store
jest.mock('@/lib/stores/cart.store', () => ({
  useCartStore: jest.fn(),
}))

// Mock fetch globally
global.fetch = jest.fn()

// Mock functions at module level
const mockInitializeCart = jest.fn()
const mockResetCart = jest.fn()
const mockAddItem = jest.fn()
const mockRemoveItem = jest.fn()
const mockUpdateQuantity = jest.fn()
const mockClearCart = jest.fn()
const mockSyncWithServer = jest.fn()

// Type for mocked cart store return value
type MockCartStore = {
  initializeCart: jest.Mock
  resetCart: jest.Mock
  isInitialized: boolean
  items: never[]
  totalItems: number
  totalPrice: number
  addItem: jest.Mock
  removeItem: jest.Mock
  updateQuantity: jest.Mock
  clearCart: jest.Mock
  syncWithServer: jest.Mock
}

describe('CartProvider', () => {
  const mockUseUser = useUser as jest.MockedFunction<typeof useUser>
  const mockUseCartStore = useCartStore as jest.MockedFunction<
    typeof useCartStore
  >

  beforeEach(() => {
    jest.clearAllMocks()
    // Reset fetch mock
    ;(global.fetch as jest.Mock) = jest.fn()
    mockUseCartStore.mockReturnValue({
      initializeCart: mockInitializeCart,
      resetCart: mockResetCart,
      isInitialized: false,
      items: [],
      totalItems: 0,
      totalPrice: 0,
      addItem: mockAddItem,
      removeItem: mockRemoveItem,
      updateQuantity: mockUpdateQuantity,
      clearCart: mockClearCart,
      syncWithServer: mockSyncWithServer,
    })
  })

  describe('Rendering', () => {
    it('should render children correctly', () => {
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: false,
        user: null,
      } as unknown as ReturnType<typeof useUser>)

      const { getByText } = render(
        <CartProvider>
          <div>Test Child Component</div>
        </CartProvider>
      )

      expect(getByText('Test Child Component')).toBeInTheDocument()
    })

    it('should render multiple children', () => {
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: false,
        user: null,
      } as unknown as ReturnType<typeof useUser>)

      const { getByText } = render(
        <CartProvider>
          <div>Child 1</div>
          <div>Child 2</div>
        </CartProvider>
      )

      expect(getByText('Child 1')).toBeInTheDocument()
      expect(getByText('Child 2')).toBeInTheDocument()
    })
  })

  describe('Authentication Loading State', () => {
    it('should not initialize or reset cart when auth is not loaded', () => {
      mockUseUser.mockReturnValue({
        isLoaded: false,
        isSignedIn: undefined,
        user: undefined,
      } as unknown as ReturnType<typeof useUser>)

      render(
        <CartProvider>
          <div>Test</div>
        </CartProvider>
      )

      expect(mockInitializeCart).not.toHaveBeenCalled()
      expect(mockResetCart).not.toHaveBeenCalled()
    })
  })

  describe('Unauthenticated User', () => {
    it('should reset cart when user is not signed in', async () => {
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: false,
        user: null,
      } as unknown as ReturnType<typeof useUser>)

      render(
        <CartProvider>
          <div>Test</div>
        </CartProvider>
      )

      await waitFor(() => {
        expect(mockResetCart).toHaveBeenCalledTimes(1)
        expect(mockInitializeCart).not.toHaveBeenCalled()
      })
    })

    it('should reset cart when user object is null despite being signed in', async () => {
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
        user: null,
      } as unknown as ReturnType<typeof useUser>)

      render(
        <CartProvider>
          <div>Test</div>
        </CartProvider>
      )

      await waitFor(() => {
        expect(mockResetCart).toHaveBeenCalledTimes(1)
        expect(mockInitializeCart).not.toHaveBeenCalled()
      })
    })
  })

  describe('Admin Users', () => {
    it('should initialize cart for admin user with active customer', async () => {
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
        user: {
          id: 'user-1',
          publicMetadata: {
            role: 'admin',
            customerids: ['CUST-123'],
          },
        },
      } as unknown as ReturnType<typeof useUser>)

      // Mock fetch to return active customer
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce({ customerId: 'CUST-123' }),
      })

      render(
        <CartProvider>
          <div>Test</div>
        </CartProvider>
      )

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('/api/customer/active')
      })

      await waitFor(() => {
        expect(mockInitializeCart).toHaveBeenCalledWith('user-1', 'CUST-123')
        expect(mockResetCart).not.toHaveBeenCalled()
      })
    })

    it('should reset cart for user with no role', async () => {
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
        user: {
          id: 'user-1',
          publicMetadata: {
            customerids: ['CUST-123'],
          },
        },
      } as unknown as ReturnType<typeof useUser>)

      // Mock fetch to return no active customer
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce({}),
      })

      render(
        <CartProvider>
          <div>Test</div>
        </CartProvider>
      )

      await waitFor(() => {
        expect(mockResetCart).toHaveBeenCalledTimes(1)
        expect(mockInitializeCart).not.toHaveBeenCalled()
      })
    })

    it('should reset cart for customer without customerids', async () => {
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
        user: {
          id: 'user-1',
          publicMetadata: {
            role: 'customer',
          },
        },
      } as unknown as ReturnType<typeof useUser>)

      // Mock fetch to return no active customer
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce({}),
      })

      render(
        <CartProvider>
          <div>Test</div>
        </CartProvider>
      )

      await waitFor(() => {
        expect(mockResetCart).toHaveBeenCalledTimes(1)
        expect(mockInitializeCart).not.toHaveBeenCalled()
      })
    })

    it('should reset cart for user with empty publicMetadata', async () => {
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
        user: {
          id: 'user-1',
          publicMetadata: {},
        },
      } as unknown as ReturnType<typeof useUser>)

      // Mock fetch to return no active customer
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce({}),
      })

      render(
        <CartProvider>
          <div>Test</div>
        </CartProvider>
      )

      await waitFor(() => {
        expect(mockResetCart).toHaveBeenCalledTimes(1)
        expect(mockInitializeCart).not.toHaveBeenCalled()
      })
    })

    it('should reset cart for user with null publicMetadata', async () => {
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
        user: {
          id: 'user-1',
          publicMetadata: null,
        },
      } as unknown as ReturnType<typeof useUser>)

      // Mock fetch to return no active customer
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce({}),
      })

      render(
        <CartProvider>
          <div>Test</div>
        </CartProvider>
      )

      await waitFor(() => {
        expect(mockResetCart).toHaveBeenCalledTimes(1)
        expect(mockInitializeCart).not.toHaveBeenCalled()
      })
    })

    it('should reset cart for user with undefined publicMetadata', async () => {
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
        user: {
          id: 'user-1',
          publicMetadata: undefined,
        },
      } as unknown as ReturnType<typeof useUser>)

      // Mock fetch to return no active customer
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce({}),
      })

      render(
        <CartProvider>
          <div>Test</div>
        </CartProvider>
      )

      await waitFor(() => {
        expect(mockResetCart).toHaveBeenCalledTimes(1)
        expect(mockInitializeCart).not.toHaveBeenCalled()
      })
    })
  })

  describe('Customer Cart Initialization', () => {
    it('should initialize cart for customer with valid customerids', async () => {
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
        user: {
          id: 'user-123',
          publicMetadata: {
            role: 'customer',
            customerids: ['CUST-456'],
          },
        },
      } as unknown as ReturnType<typeof useUser>)

      // Mock fetch to return active customer
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce({ customerId: 'CUST-456' }),
      })

      render(
        <CartProvider>
          <div>Test</div>
        </CartProvider>
      )

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('/api/customer/active')
      })

      await waitFor(() => {
        expect(mockInitializeCart).toHaveBeenCalledWith('user-123', 'CUST-456')
        expect(mockResetCart).not.toHaveBeenCalled()
      })
    })

    it('should not re-initialize cart if already initialized', async () => {
      mockUseCartStore.mockReturnValue({
        initializeCart: mockInitializeCart,
        resetCart: mockResetCart,
        isInitialized: true, // Already initialized
        items: [],
        totalItems: 0,
        totalPrice: 0,
        addItem: mockAddItem,
        removeItem: mockRemoveItem,
        updateQuantity: mockUpdateQuantity,
        clearCart: mockClearCart,
        syncWithServer: mockSyncWithServer,
      })

      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
        user: {
          id: 'user-123',
          publicMetadata: {
            role: 'customer',
            customerids: ['CUST-456'],
          },
        },
      } as unknown as ReturnType<typeof useUser>)

      // Mock fetch to return active customer
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce({ customerId: 'CUST-456' }),
      })

      render(
        <CartProvider>
          <div>Test</div>
        </CartProvider>
      )

      await waitFor(() => {
        expect(mockInitializeCart).not.toHaveBeenCalled()
        expect(mockResetCart).not.toHaveBeenCalled()
      })
    })
  })

  describe('Re-render Behavior', () => {
    it('should handle user state changes from loading to signed out', async () => {
      // Initial: Loading state
      mockUseUser.mockReturnValue({
        isLoaded: false,
        isSignedIn: undefined,
        user: undefined,
      } as unknown as ReturnType<typeof useUser>)

      const { rerender } = render(
        <CartProvider>
          <div>Test</div>
        </CartProvider>
      )

      expect(mockResetCart).not.toHaveBeenCalled()
      expect(mockInitializeCart).not.toHaveBeenCalled()

      // Change to: Signed out
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: false,
        user: null,
      } as unknown as ReturnType<typeof useUser>)

      rerender(
        <CartProvider>
          <div>Test</div>
        </CartProvider>
      )

      await waitFor(() => {
        expect(mockResetCart).toHaveBeenCalledTimes(1)
        expect(mockInitializeCart).not.toHaveBeenCalled()
      })
    })

    it('should handle user state changes from loading to customer', async () => {
      // Initial: Loading state
      mockUseUser.mockReturnValue({
        isLoaded: false,
        isSignedIn: undefined,
        user: undefined,
      } as unknown as ReturnType<typeof useUser>)

      const { rerender } = render(
        <CartProvider>
          <div>Test</div>
        </CartProvider>
      )

      expect(mockResetCart).not.toHaveBeenCalled()
      expect(mockInitializeCart).not.toHaveBeenCalled()

      // Change to: Customer
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
        user: {
          id: 'user-123',
          publicMetadata: {
            role: 'customer',
            customerids: ['CUST-456'],
          },
        },
      } as unknown as ReturnType<typeof useUser>)

      // Mock fetch to return active customer
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce({ customerId: 'CUST-456' }),
      })

      rerender(
        <CartProvider>
          <div>Test</div>
        </CartProvider>
      )

      await waitFor(() => {
        expect(mockInitializeCart).toHaveBeenCalledWith('user-123', 'CUST-456')
        expect(mockResetCart).not.toHaveBeenCalled()
      })
    })

    it('should handle user role change from customer to admin', async () => {
      // Initial: Customer
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
        user: {
          id: 'user-123',
          publicMetadata: {
            role: 'customer',
            customerids: ['CUST-456'],
          },
        },
      } as unknown as ReturnType<typeof useUser>)

      // Mock fetch to return active customer
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce({ customerId: 'CUST-456' }),
      })

      const { rerender } = render(
        <CartProvider>
          <div>Test</div>
        </CartProvider>
      )

      await waitFor(() => {
        expect(mockInitializeCart).toHaveBeenCalledWith('user-123', 'CUST-456')
      })

      jest.clearAllMocks()

      // Change to: Admin (admins now also can have cart)
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
        user: {
          id: 'user-123',
          publicMetadata: {
            role: 'admin',
            customerids: ['CUST-456'],
          },
        },
      } as unknown as ReturnType<typeof useUser>)

      // Mock fetch again for admin
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce({ customerId: 'CUST-456' }),
      })

      rerender(
        <CartProvider>
          <div>Test</div>
        </CartProvider>
      )

      // Admin with active customer should also get cart initialized
      await waitFor(() => {
        expect(mockInitializeCart).toHaveBeenCalledWith('user-123', 'CUST-456')
        expect(mockResetCart).not.toHaveBeenCalled()
      })
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty customerids array', async () => {
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
        user: {
          id: 'user-1',
          publicMetadata: {
            role: 'customer',
            customerids: [],
          },
        },
      } as unknown as ReturnType<typeof useUser>)

      // Even though user is signed in, customerids is empty so no fetch will be made
      // But we still need to provide mock in case component calls it
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce({}),
      })

      render(
        <CartProvider>
          <div>Test</div>
        </CartProvider>
      )

      await waitFor(() => {
        expect(mockResetCart).toHaveBeenCalledTimes(1)
        expect(mockInitializeCart).not.toHaveBeenCalled()
      })
    })

    it('should handle fetch error gracefully', async () => {
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
        user: {
          id: 'user-1',
          publicMetadata: {
            role: 'customer',
            customerids: ['CUST-123'],
          },
        },
      } as unknown as ReturnType<typeof useUser>)

      // Mock fetch to reject
      ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

      render(
        <CartProvider>
          <div>Test</div>
        </CartProvider>
      )

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('Failed to fetch active customer:', expect.any(Error))
      })

      // Should not initialize cart when fetch fails
      expect(mockInitializeCart).not.toHaveBeenCalled()
      
      consoleSpy.mockRestore()
    })

    it('should handle multiple customerids', async () => {
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
        user: {
          id: 'user-1',
          publicMetadata: {
            role: 'customer',
            customerids: ['CUST-123', 'CUST-456', 'CUST-789'],
          },
        },
      } as unknown as ReturnType<typeof useUser>)

      // Mock fetch to return the first customer as active
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce({ customerId: 'CUST-456' }),
      })

      render(
        <CartProvider>
          <div>Test</div>
        </CartProvider>
      )

      await waitFor(() => {
        // Should initialize with the active customer from API
        expect(mockInitializeCart).toHaveBeenCalledWith('user-1', 'CUST-456')
        expect(mockResetCart).not.toHaveBeenCalled()
      })
    })
  })
})
