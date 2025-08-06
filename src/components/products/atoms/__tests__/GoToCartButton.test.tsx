/**
 * Unit tests for GoToCartButton Component
 * SOLID Principles: Single Responsibility - Testing cart navigation with auth
 * Design Patterns: AAA (Arrange-Act-Assert) Pattern
 * Dependencies: Jest, React Testing Library, Next.js router mocks
 */

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { GoToCartButton } from '../GoToCartButton'

// Mock next/navigation
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'navigation.goToCart': 'Go to Cart',
        'navigation.cart': 'Cart',
      }
      return translations[key] || key
    },
  }),
}))

// Mock role auth hook
const mockRequireAuth = jest.fn()
jest.mock('@/lib/auth/role-auth', () => ({
  useRoleAuth: () => ({
    requireAuth: mockRequireAuth,
  }),
}))

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  ShoppingCart: ({ className }: { className?: string }) => (
    <span data-testid="shopping-cart-icon" className={className}>
      ShoppingCart Icon
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
jest.mock('@/components/ui/utils', () => ({
  cn: (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' '),
}))

describe('GoToCartButton', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render with default props', () => {
    render(<GoToCartButton />)

    // Check button is rendered
    const button = screen.getByTestId('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('data-variant', 'default')
    expect(button).toHaveAttribute('data-size', 'lg')
    expect(button).toHaveClass('h-12 gap-2')

    // Check icon is rendered
    const icon = screen.getByTestId('shopping-cart-icon')
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveClass('h-4 w-4')

    // Check text content for desktop
    expect(screen.getByText('Go to Cart')).toBeInTheDocument()
    expect(screen.getByText('Go to Cart')).toHaveClass('hidden sm:inline')

    // Check text content for mobile
    expect(screen.getByText('Cart')).toBeInTheDocument()
    expect(screen.getByText('Cart')).toHaveClass('sm:hidden')
  })

  it('should render with custom className', () => {
    render(<GoToCartButton className="custom-class" />)

    const button = screen.getByTestId('button')
    expect(button).toHaveClass('h-12 gap-2 custom-class')
  })

  it('should handle click with auth check and navigation', () => {
    mockRequireAuth.mockImplementation((_, callback) => {
      // Simulate successful auth
      callback()
    })

    render(<GoToCartButton />)

    const button = screen.getByTestId('button')
    fireEvent.click(button)

    // Verify requireAuth was called with correct parameters
    expect(mockRequireAuth).toHaveBeenCalledWith(
      'customer',
      expect.any(Function),
      { showToast: true }
    )

    // Verify navigation was triggered
    expect(mockPush).toHaveBeenCalledWith('/cart')
  })

  it('should not navigate when auth fails', () => {
    mockRequireAuth.mockImplementation(() => {
      // Simulate failed auth - don't call callback
    })

    render(<GoToCartButton />)

    const button = screen.getByTestId('button')
    fireEvent.click(button)

    // Verify requireAuth was called
    expect(mockRequireAuth).toHaveBeenCalledWith(
      'customer',
      expect.any(Function),
      { showToast: true }
    )

    // Verify navigation was NOT triggered
    expect(mockPush).not.toHaveBeenCalled()
  })

  it('should translate text content correctly', () => {
    render(<GoToCartButton />)

    // Verify translations are applied
    expect(screen.getByText('Go to Cart')).toBeInTheDocument()
    expect(screen.getByText('Cart')).toBeInTheDocument()
  })

  it('should maintain responsive text visibility classes', () => {
    render(<GoToCartButton />)

    const desktopText = screen.getByText('Go to Cart')
    const mobileText = screen.getByText('Cart')

    // Desktop text should be hidden on mobile
    expect(desktopText).toHaveClass('hidden sm:inline')

    // Mobile text should be hidden on desktop
    expect(mobileText).toHaveClass('sm:hidden')
  })

  it('should execute auth callback on successful authentication', () => {
    let authCallback: (() => void) | null = null
    mockRequireAuth.mockImplementation((_, callback) => {
      authCallback = callback
      callback()
    })

    render(<GoToCartButton />)

    const button = screen.getByTestId('button')
    fireEvent.click(button)

    // Verify the callback was captured and executed
    expect(authCallback).toBeTruthy()
    expect(mockPush).toHaveBeenCalledWith('/cart')
  })
})
