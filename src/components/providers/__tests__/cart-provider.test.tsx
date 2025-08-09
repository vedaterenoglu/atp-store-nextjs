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

// Type for mocked cart store return value
type MockCartStore = {
  initializeCart: jest.Mock
  resetCart: jest.Mock
  isInitialized: boolean
  [key: string]: unknown
}

describe('CartProvider', () => {
  const mockInitializeCart = jest.fn()
  const mockResetCart = jest.fn()
  // Use unknown to bypass strict type checking for mocks
  const mockUseUser = useUser as jest.MockedFunction<typeof useUser>
  const mockUseCartStore = useCartStore as unknown as jest.MockedFunction<
    () => MockCartStore
  >

  beforeEach(() => {
    jest.clearAllMocks()
    mockUseCartStore.mockReturnValue({
      initializeCart: mockInitializeCart,
      resetCart: mockResetCart,
      isInitialized: false,
    } as MockCartStore)
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

  describe('Non-Customer Users', () => {
    it('should reset cart for admin user', async () => {
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
        user: {
          id: 'user-1',
          publicMetadata: {
            role: 'admin',
            customerid: 'CUST-123',
          },
        },
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

    it('should reset cart for user with no role', async () => {
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
        user: {
          id: 'user-1',
          publicMetadata: {
            customerid: 'CUST-123',
          },
        },
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

    it('should reset cart for customer without customerid', async () => {
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
    it('should initialize cart for customer with valid customerid', async () => {
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
        user: {
          id: 'user-123',
          publicMetadata: {
            role: 'customer',
            customerid: 'CUST-456',
          },
        },
      } as unknown as ReturnType<typeof useUser>)

      render(
        <CartProvider>
          <div>Test</div>
        </CartProvider>
      )

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
      } as MockCartStore)

      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
        user: {
          id: 'user-123',
          publicMetadata: {
            role: 'customer',
            customerid: 'CUST-456',
          },
        },
      } as unknown as ReturnType<typeof useUser>)

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
            customerid: 'CUST-456',
          },
        },
      } as unknown as ReturnType<typeof useUser>)

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
            customerid: 'CUST-456',
          },
        },
      } as unknown as ReturnType<typeof useUser>)

      const { rerender } = render(
        <CartProvider>
          <div>Test</div>
        </CartProvider>
      )

      await waitFor(() => {
        expect(mockInitializeCart).toHaveBeenCalledWith('user-123', 'CUST-456')
      })

      jest.clearAllMocks()

      // Change to: Admin
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
        user: {
          id: 'user-123',
          publicMetadata: {
            role: 'admin',
            customerid: 'CUST-456',
          },
        },
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
  })

  describe('Edge Cases', () => {
    it('should handle empty string customerid', async () => {
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
        user: {
          id: 'user-1',
          publicMetadata: {
            role: 'customer',
            customerid: '',
          },
        },
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

    it('should handle whitespace-only customerid', async () => {
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
        user: {
          id: 'user-1',
          publicMetadata: {
            role: 'customer',
            customerid: '   ',
          },
        },
      } as unknown as ReturnType<typeof useUser>)

      render(
        <CartProvider>
          <div>Test</div>
        </CartProvider>
      )

      await waitFor(() => {
        // Whitespace is still truthy, so it would initialize
        expect(mockInitializeCart).toHaveBeenCalledWith('user-1', '   ')
        expect(mockResetCart).not.toHaveBeenCalled()
      })
    })

    it('should handle numeric customerid', async () => {
      mockUseUser.mockReturnValue({
        isLoaded: true,
        isSignedIn: true,
        user: {
          id: 'user-1',
          publicMetadata: {
            role: 'customer',
            customerid: 12345 as unknown, // Numeric instead of string
          },
        },
      } as unknown as ReturnType<typeof useUser>)

      render(
        <CartProvider>
          <div>Test</div>
        </CartProvider>
      )

      await waitFor(() => {
        // Numeric value is cast to string and still truthy
        expect(mockInitializeCart).toHaveBeenCalledWith('user-1', 12345)
        expect(mockResetCart).not.toHaveBeenCalled()
      })
    })
  })
})
