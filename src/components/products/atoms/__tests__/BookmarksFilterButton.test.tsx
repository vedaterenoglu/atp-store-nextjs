/**
 * Unit tests for BookmarksFilterButton Component
 * SOLID Principles: Single Responsibility - Testing bookmarks filter with auth
 * Design Patterns: AAA (Arrange-Act-Assert) Pattern
 * Dependencies: Jest, React Testing Library, role auth mocks
 */

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { BookmarksFilterButton } from '../BookmarksFilterButton'

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'bookmarks.button': 'Bookmarks',
      }
      return translations[key] || key
    },
  }),
}))

// Mock secure auth hook
const mockSecureAuth = {
  auth: {
    canBookmark: false,
    activeCustomerId: null as string | null,
    role: null as 'customer' | 'admin' | null,
  },
  isAuthenticated: false,
}
jest.mock('@/hooks/use-secure-auth', () => ({
  useSecureAuth: jest.fn(() => mockSecureAuth),
}))

// Mock next/navigation
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

// Mock toast
jest.mock('@/lib/utils/toast', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
    warning: jest.fn(),
    info: jest.fn(),
  },
}))
import { toast } from '@/lib/utils/toast'

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Bookmark: ({ className }: { className?: string }) => (
    <span data-testid="bookmark-icon" className={className}>
      Bookmark Icon
    </span>
  ),
}))

// Mock shadcn Button component
jest.mock('@/components/ui/schadcn', () => ({
  Button: ({
    children,
    onClick,
    variant,
    size,
    className,
    ...props
  }: {
    children: React.ReactNode
    onClick?: () => void
    variant?: string
    size?: string
    className?: string
  }) => (
    <button
      onClick={onClick}
      data-variant={variant}
      data-size={size}
      className={className}
      data-testid="button"
      {...props}
    >
      {children}
    </button>
  ),
}))

// Mock cn utility
jest.mock('@/lib/utils', () => ({
  cn: (...classes: (string | undefined | false)[]) =>
    classes.filter(Boolean).join(' '),
}))

describe('BookmarksFilterButton', () => {
  const mockOnClick = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    // Reset mock auth state to default (not authenticated)
    mockSecureAuth.isAuthenticated = false
    mockSecureAuth.auth.canBookmark = false
    mockSecureAuth.auth.activeCustomerId = null
    mockSecureAuth.auth.role = null
  })

  it('should render with inactive state', () => {
    render(<BookmarksFilterButton isActive={false} onClick={mockOnClick} />)

    // Check button is rendered
    const button = screen.getByTestId('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('data-variant', 'outline')
    expect(button).toHaveAttribute('data-size', 'lg')
    expect(button).toHaveClass('h-12 gap-2')

    // Check icon is rendered
    const icon = screen.getByTestId('bookmark-icon')
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveClass('h-4 w-4')
    expect(icon).not.toHaveClass('fill-current')

    // Check text content
    expect(screen.getByText('Bookmarks')).toBeInTheDocument()
  })

  it('should render with active state', () => {
    render(<BookmarksFilterButton isActive={true} onClick={mockOnClick} />)

    // Check button variant changes
    const button = screen.getByTestId('button')
    expect(button).toHaveAttribute('data-variant', 'default')

    // Check icon has fill-current class
    const icon = screen.getByTestId('bookmark-icon')
    expect(icon).toHaveClass('h-4 w-4 fill-current')
  })

  it('should render with custom className', () => {
    render(
      <BookmarksFilterButton
        isActive={false}
        onClick={mockOnClick}
        className="custom-class"
      />
    )

    const button = screen.getByTestId('button')
    expect(button).toHaveClass('h-12 gap-2 custom-class')
  })

  it('should handle click when not authenticated', () => {
    // User is not authenticated
    mockSecureAuth.isAuthenticated = false

    render(<BookmarksFilterButton isActive={false} onClick={mockOnClick} />)

    const button = screen.getByTestId('button')
    fireEvent.click(button)

    // Should show error toast
    expect(toast.error).toHaveBeenCalledWith('Please sign in to access bookmarks')
    
    // Should not navigate
    expect(mockPush).not.toHaveBeenCalled()
  })

  it('should handle click when authenticated but cannot bookmark', () => {
    // User is authenticated but cannot bookmark (no active customer)
    mockSecureAuth.isAuthenticated = true
    mockSecureAuth.auth.canBookmark = false
    mockSecureAuth.auth.role = 'customer'

    render(<BookmarksFilterButton isActive={false} onClick={mockOnClick} />)

    const button = screen.getByTestId('button')
    fireEvent.click(button)

    // Should show error toast about selecting customer
    expect(toast.error).toHaveBeenCalledWith('Please select a customer account to access bookmarks')
    
    // Should not navigate
    expect(mockPush).not.toHaveBeenCalled()
  })

  it('should translate button text correctly', () => {
    render(<BookmarksFilterButton isActive={false} onClick={mockOnClick} />)

    expect(screen.getByText('Bookmarks')).toBeInTheDocument()
  })

  it('should toggle icon fill based on active state', () => {
    const { rerender } = render(
      <BookmarksFilterButton isActive={false} onClick={mockOnClick} />
    )

    let icon = screen.getByTestId('bookmark-icon')
    expect(icon).not.toHaveClass('fill-current')

    // Re-render with active state
    rerender(<BookmarksFilterButton isActive={true} onClick={mockOnClick} />)

    icon = screen.getByTestId('bookmark-icon')
    expect(icon).toHaveClass('fill-current')
  })

  describe('Navigation for signed-in customers', () => {
    it('should navigate to /favorites when customer can bookmark', () => {
      // User is authenticated customer with bookmark permission
      mockSecureAuth.isAuthenticated = true
      mockSecureAuth.auth.canBookmark = true
      mockSecureAuth.auth.role = 'customer'
      mockSecureAuth.auth.activeCustomerId = 'customer-123'

      render(<BookmarksFilterButton isActive={false} onClick={mockOnClick} />)

      const button = screen.getByTestId('button')
      fireEvent.click(button)

      // Should navigate to favorites page
      expect(mockPush).toHaveBeenCalledWith('/favorites')
      // Should not show error
      expect(toast.error).not.toHaveBeenCalled()
    })

    it('should navigate to /favorites when admin can bookmark', () => {
      // Admin with bookmark permission
      mockSecureAuth.isAuthenticated = true
      mockSecureAuth.auth.canBookmark = true
      mockSecureAuth.auth.role = 'admin'
      mockSecureAuth.auth.activeCustomerId = 'admin-customer'

      render(<BookmarksFilterButton isActive={false} onClick={mockOnClick} />)

      const button = screen.getByTestId('button')
      fireEvent.click(button)

      // Should navigate to favorites page
      expect(mockPush).toHaveBeenCalledWith('/favorites')
      // Should not show error
      expect(toast.error).not.toHaveBeenCalled()
    })

    it('should not navigate when authenticated but invalid role', () => {
      // User with invalid role
      mockSecureAuth.isAuthenticated = true
      mockSecureAuth.auth.canBookmark = false
      mockSecureAuth.auth.role = null
      mockSecureAuth.auth.activeCustomerId = null

      render(<BookmarksFilterButton isActive={false} onClick={mockOnClick} />)

      const button = screen.getByTestId('button')
      fireEvent.click(button)

      // Should show error about needing customer/admin account
      expect(toast.error).toHaveBeenCalledWith('You need a customer or admin account to access bookmarks')
      // Should NOT navigate
      expect(mockPush).not.toHaveBeenCalled()
    })

    it('should not navigate when customer role but no active customer', () => {
      // Customer without active customer selected
      mockSecureAuth.isAuthenticated = true
      mockSecureAuth.auth.canBookmark = false
      mockSecureAuth.auth.role = 'customer'
      mockSecureAuth.auth.activeCustomerId = null

      render(<BookmarksFilterButton isActive={false} onClick={mockOnClick} />)

      const button = screen.getByTestId('button')
      fireEvent.click(button)

      // Should show error about selecting customer
      expect(toast.error).toHaveBeenCalledWith('Please select a customer account to access bookmarks')
      // Should NOT navigate
      expect(mockPush).not.toHaveBeenCalled()
    })

    it('should handle admin role with no active customer', () => {
      // Admin without active customer (canBookmark would be false)
      mockSecureAuth.isAuthenticated = true
      mockSecureAuth.auth.canBookmark = false
      mockSecureAuth.auth.role = 'admin'
      mockSecureAuth.auth.activeCustomerId = null

      render(<BookmarksFilterButton isActive={false} onClick={mockOnClick} />)

      const button = screen.getByTestId('button')
      fireEvent.click(button)

      // Should show error about selecting customer
      expect(toast.error).toHaveBeenCalledWith('Please select a customer account to access bookmarks')
      // Should NOT navigate
      expect(mockPush).not.toHaveBeenCalled()
    })

    it('should handle all auth states correctly', () => {
      // Test various state transitions
      const { rerender } = render(<BookmarksFilterButton isActive={false} />)

      // Not authenticated
      mockSecureAuth.isAuthenticated = false
      rerender(<BookmarksFilterButton isActive={false} />)
      fireEvent.click(screen.getByTestId('button'))
      expect(toast.error).toHaveBeenCalledWith('Please sign in to access bookmarks')

      jest.clearAllMocks()

      // Authenticated but can't bookmark
      mockSecureAuth.isAuthenticated = true
      mockSecureAuth.auth.canBookmark = false
      mockSecureAuth.auth.role = 'customer'
      rerender(<BookmarksFilterButton isActive={false} />)
      fireEvent.click(screen.getByTestId('button'))
      expect(toast.error).toHaveBeenCalledWith('Please select a customer account to access bookmarks')

      jest.clearAllMocks()

      // Can bookmark - navigates
      mockSecureAuth.auth.canBookmark = true
      mockSecureAuth.auth.activeCustomerId = 'customer-123'
      rerender(<BookmarksFilterButton isActive={false} />)
      fireEvent.click(screen.getByTestId('button'))
      expect(mockPush).toHaveBeenCalledWith('/favorites')
    })
  })
})
