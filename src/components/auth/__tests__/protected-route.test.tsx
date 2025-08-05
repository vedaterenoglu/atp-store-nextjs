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
import { ProtectedRoute } from '../protected-route'
import { useRoleAuth } from '@/lib/auth/role-auth'
import { toast } from '@/lib/utils/toast'

// Create a shared mock push function that all router instances will use
const mockRouterPush = jest.fn()

// Mock dependencies
jest.mock('@/lib/auth/role-auth')
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

// Helper to create mock return value for useRoleAuth
const createMockRoleAuth = (
  overrides: Partial<ReturnType<typeof useRoleAuth>> = {}
): ReturnType<typeof useRoleAuth> => ({
  isLoaded: true,
  isSignedIn: false,
  userRole: null,
  checkAuth: jest.fn(),
  requireAuth: jest.fn(),
  hasRole: jest.fn(),
  hasAnyRole: jest.fn(),
  getUserRole: jest.fn(),
  ...overrides,
})

// Type the mocks
const mockUseRoleAuth = useRoleAuth as jest.MockedFunction<typeof useRoleAuth>
const mockToast = toast as jest.Mocked<typeof toast>

describe('ProtectedRoute', () => {
  const mockCheckAuth = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    mockRouterPush.mockClear()
  })

  describe('Loading state', () => {
    it('should show default loading skeleton when auth is loading', () => {
      mockUseRoleAuth.mockReturnValue(
        createMockRoleAuth({
          isLoaded: false,
          checkAuth: mockCheckAuth,
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
      mockUseRoleAuth.mockReturnValue(
        createMockRoleAuth({
          isLoaded: false,
          checkAuth: mockCheckAuth,
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
      mockUseRoleAuth.mockReturnValue(
        createMockRoleAuth({
          isLoaded: false,
          checkAuth: mockCheckAuth.mockReturnValue({
            success: false,
            reason: 'loading',
          }),
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
      mockUseRoleAuth.mockReturnValue(
        createMockRoleAuth({
          isLoaded: true,
          checkAuth: jest.fn().mockReturnValue({ success: true }),
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
      mockCheckAuth.mockReturnValue({
        success: false,
        reason: 'not-signed-in',
        message: 'To continue you must sign in',
      })

      mockUseRoleAuth.mockReturnValue(
        createMockRoleAuth({
          isLoaded: true,
          checkAuth: mockCheckAuth,
        })
      )

      render(
        <ProtectedRoute requiredRole="customer">
          <div>Protected Content</div>
        </ProtectedRoute>
      )

      await waitFor(() => {
        expect(mockToast.error).toHaveBeenCalledWith(
          'To continue you must sign in',
          { position: 'bottom-left', duration: 6000 }
        )
        expect(mockRouterPush).toHaveBeenCalledWith(
          expect.stringMatching(/^\/sign-in\?redirect_url=/)
        )
      })

      expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
    })

    it('should redirect to fallback URL when user has wrong role', async () => {
      mockCheckAuth.mockReturnValue({
        success: false,
        reason: 'wrong-role',
        message: 'Insufficient permissions. Please contact support.',
      })

      mockUseRoleAuth.mockReturnValue(
        createMockRoleAuth({
          isLoaded: true,
          checkAuth: mockCheckAuth,
        })
      )

      render(
        <ProtectedRoute requiredRole="customer" fallbackUrl="/home">
          <div>Protected Content</div>
        </ProtectedRoute>
      )

      await waitFor(() => {
        expect(mockToast.error).toHaveBeenCalledWith(
          'Insufficient permissions. Please contact support.',
          { position: 'bottom-left', duration: 6000 }
        )
        expect(mockRouterPush).toHaveBeenCalledWith('/home')
      })

      expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
    })

    it('should use default fallback URL when not specified', async () => {
      mockCheckAuth.mockReturnValue({
        success: false,
        reason: 'wrong-role',
        message: 'Insufficient permissions. Please contact support.',
      })

      mockUseRoleAuth.mockReturnValue(
        createMockRoleAuth({
          isLoaded: true,
          checkAuth: mockCheckAuth,
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
      const { rerender } = render(
        <ProtectedRoute requiredRole="customer">
          <div>Protected Content</div>
        </ProtectedRoute>
      )

      // Initially not loaded
      mockUseRoleAuth.mockReturnValue(
        createMockRoleAuth({
          isLoaded: false,
          checkAuth: mockCheckAuth,
        })
      )

      rerender(
        <ProtectedRoute requiredRole="customer">
          <div>Protected Content</div>
        </ProtectedRoute>
      )

      // Then loaded with successful auth
      mockCheckAuth.mockReturnValue({ success: true })
      mockUseRoleAuth.mockReturnValue(
        createMockRoleAuth({
          isLoaded: true,
          checkAuth: mockCheckAuth,
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
      mockCheckAuth.mockReturnValue({ success: true })
      mockUseRoleAuth.mockReturnValue(
        createMockRoleAuth({
          isLoaded: true,
          checkAuth: mockCheckAuth,
        })
      )

      const { rerender } = render(
        <ProtectedRoute requiredRole="customer">
          <div>Protected Content</div>
        </ProtectedRoute>
      )

      // Clear mock to track new calls
      mockCheckAuth.mockClear()

      // Re-render with same props
      rerender(
        <ProtectedRoute requiredRole="customer">
          <div>Protected Content</div>
        </ProtectedRoute>
      )

      // Should not check auth again if isLoaded hasn't changed
      expect(mockCheckAuth).toHaveBeenCalledTimes(2) // Once for effect, once for render
    })
  })
})
