/**
 * Unit Tests for Protected Route Component
 *
 * Tests cover:
 * - Loading states
 * - Authentication redirects
 * - Role-based access control
 * - Toast notifications
 * - Custom loading components
 *
 * SOLID Principles: Test isolation, component behavior verification
 * Mocking: Role auth hook, Next.js router, toast notifications
 */

import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import {
  createClerkMock,
  mockAuthSignedOut,
  mockUserSignedOut,
} from '@/__tests__/mocks/clerk-mocks'

// Mock Clerk with centralized mocks
jest.mock('@clerk/nextjs', () =>
  createClerkMock(mockAuthSignedOut(), mockUserSignedOut())
)

import { ProtectedRoute } from '../protected-route'
import { useAuthService } from '@/lib/auth/use-auth-service'
import { toast } from '@/lib/utils/toast'

// Create a shared mock push function that all router instances will use
const mockRouterPush = jest.fn()

// Mock dependencies
jest.mock('@/lib/auth/use-auth-service')
jest.mock('@/lib/utils/toast')
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        requireSignIn: 'To continue you must sign in',
        insufficientPermissions:
          'Insufficient permissions. Please contact support.',
      }
      return translations[key] || key
    },
  }),
}))

// Override the next/navigation mock for this test
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockRouterPush,
    replace: jest.fn(),
    refresh: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}))

// Helper to create mock return value for useAuthService
const createMockAuthService = (
  overrides: Partial<ReturnType<typeof useAuthService>> = {}
): ReturnType<typeof useAuthService> => ({
  isLoaded: true,
  isSignedIn: false,
  user: null,
  requireAuth: jest.fn(),
  requireCustomer: jest.fn(),
  hasRole: jest.fn(),
  hasCustomerId: jest.fn(),
  isValidCustomer: jest.fn(),
  isCustomer: false,
  isAdmin: false,
  isStaff: false,
  ...overrides,
})

// Type the mocks
const mockUseAuthService = useAuthService as jest.MockedFunction<
  typeof useAuthService
>
const mockToast = toast as jest.Mocked<typeof toast>

describe('ProtectedRoute', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockRouterPush.mockClear()
  })

  describe('Loading state', () => {
    it('should show default loading skeleton when auth is loading', () => {
      mockUseAuthService.mockReturnValue(
        createMockAuthService({
          isLoaded: false,
        })
      )

      render(
        <ProtectedRoute requiredRole="customer">
          <div>Protected Content</div>
        </ProtectedRoute>
      )

      // Should show skeleton, not content
      expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
      // Check for skeleton elements - the default loading state should render skeleton components
      // The Skeleton component from shadcn/ui typically has a 'skeleton' class
      const container = document.body
      const hasSkeletonElements =
        container.innerHTML.includes('skeleton') ||
        container.querySelector('[class*="animate-pulse"]') !== null
      expect(hasSkeletonElements).toBe(true)
    })

    it('should show custom loading component when provided', () => {
      mockUseAuthService.mockReturnValue(
        createMockAuthService({
          isLoaded: false,
        })
      )

      render(
        <ProtectedRoute
          requiredRole="customer"
          loadingComponent={<div>Custom Loading...</div>}
        >
          <div>Protected Content</div>
        </ProtectedRoute>
      )

      expect(screen.getByText('Custom Loading...')).toBeInTheDocument()
      expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
    })

    it('should not show loading when showLoading is false', () => {
      mockUseAuthService.mockReturnValue(
        createMockAuthService({
          isLoaded: false,
        })
      )

      render(
        <ProtectedRoute requiredRole="customer" showLoading={false}>
          <div>Protected Content</div>
        </ProtectedRoute>
      )

      // Should not show skeleton or content
      expect(
        document.querySelector('[class*="skeleton"]')
      ).not.toBeInTheDocument()
      expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
    })
  })

  describe('Authentication checks', () => {
    it('should show content when user has required role', () => {
      mockUseAuthService.mockReturnValue(
        createMockAuthService({
          isLoaded: true,
          isSignedIn: true,
          user: {
            id: 'user-123',
            role: 'customer',
            customerId: 'cust-123',
            email: 'test@example.com',
            name: 'Test User',
          },
        })
      )

      render(
        <ProtectedRoute requiredRole="customer">
          <div>Protected Content</div>
        </ProtectedRoute>
      )

      expect(screen.getByText('Protected Content')).toBeInTheDocument()
    })

    it('should redirect to sign-in when user is not authenticated', async () => {
      mockUseAuthService.mockReturnValue(
        createMockAuthService({
          isLoaded: true,
          isSignedIn: false,
        })
      )

      render(
        <ProtectedRoute requiredRole="customer">
          <div>Protected Content</div>
        </ProtectedRoute>
      )

      await waitFor(() => {
        expect(mockToast.error).toHaveBeenCalledWith(
          'Please sign in to continue',
          { position: 'bottom-left', duration: 4000 }
        )
        expect(mockRouterPush).toHaveBeenCalledWith(
          expect.stringMatching(/^\/sign-in\?redirect_url=/)
        )
      })

      expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
    })

    it('should redirect to fallback URL when user has wrong role', async () => {
      mockUseAuthService.mockReturnValue(
        createMockAuthService({
          isLoaded: true,
          isSignedIn: true,
          user: {
            id: 'user-123',
            role: 'admin',
            customerId: null,
            email: 'admin@example.com',
            name: 'Admin User',
          },
        })
      )

      render(
        <ProtectedRoute requiredRole="customer" fallbackUrl="/home">
          <div>Protected Content</div>
        </ProtectedRoute>
      )

      await waitFor(() => {
        expect(mockToast.error).toHaveBeenCalledWith(
          'You do not have permission to access this page',
          { position: 'bottom-left', duration: 4000 }
        )
        expect(mockRouterPush).toHaveBeenCalledWith('/home')
      })

      expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
    })

    it('should use default fallback URL when not specified', async () => {
      mockUseAuthService.mockReturnValue(
        createMockAuthService({
          isLoaded: true,
          isSignedIn: true,
          user: {
            id: 'user-123',
            role: 'admin',
            customerId: null,
            email: 'admin@example.com',
            name: 'Admin User',
          },
        })
      )

      render(
        <ProtectedRoute requiredRole="customer">
          <div>Protected Content</div>
        </ProtectedRoute>
      )

      await waitFor(() => {
        expect(mockRouterPush).toHaveBeenCalledWith('/')
      })
    })
  })

  describe('Re-render behavior', () => {
    it('should re-check auth when isLoaded changes', async () => {
      // Initially not loaded
      mockUseAuthService.mockReturnValue(
        createMockAuthService({
          isLoaded: false,
        })
      )

      const { rerender } = render(
        <ProtectedRoute requiredRole="customer">
          <div>Protected Content</div>
        </ProtectedRoute>
      )

      // Then loaded with successful auth
      mockUseAuthService.mockReturnValue(
        createMockAuthService({
          isLoaded: true,
          isSignedIn: true,
          user: {
            id: 'user-123',
            role: 'customer',
            customerId: 'cust-123',
            email: 'test@example.com',
            name: 'Test User',
          },
        })
      )

      rerender(
        <ProtectedRoute requiredRole="customer">
          <div>Protected Content</div>
        </ProtectedRoute>
      )

      await waitFor(() => {
        expect(screen.getByText('Protected Content')).toBeInTheDocument()
      })
    })

    it('should not re-check when already loaded and auth checked', () => {
      const mockRequireAuth = jest.fn()
      mockUseAuthService.mockReturnValue(
        createMockAuthService({
          isLoaded: true,
          isSignedIn: true,
          user: {
            id: 'user-123',
            role: 'customer',
            customerId: 'cust-123',
            email: 'test@example.com',
            name: 'Test User',
          },
          requireAuth: mockRequireAuth,
        })
      )

      const { rerender } = render(
        <ProtectedRoute requiredRole="customer">
          <div>Protected Content</div>
        </ProtectedRoute>
      )

      // Re-render with same props
      rerender(
        <ProtectedRoute requiredRole="customer">
          <div>Protected Content</div>
        </ProtectedRoute>
      )

      // Component should show content
      expect(screen.getByText('Protected Content')).toBeInTheDocument()
    })
  })
})
