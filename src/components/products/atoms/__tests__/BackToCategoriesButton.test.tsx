/**
 * Unit tests for BackToCategoriesButton Component
 * SOLID Principles: Single Responsibility - Testing navigation button behavior
 * Design Patterns: AAA (Arrange-Act-Assert) Pattern
 * Dependencies: Jest, React Testing Library, i18next mocks
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import { BackToCategoriesButton } from '../BackToCategoriesButton'

// Mock Next.js Link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode
    href: string
  }) => (
    <a href={href} data-testid="link">
      {children}
    </a>
  ),
}))

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'navigation.backToCategories': 'Back to Categories',
        'navigation.back': 'Back',
      }
      return translations[key] || key
    },
  }),
}))

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  ArrowLeft: ({ className }: { className?: string }) => (
    <span data-testid="arrow-left-icon" className={className}>
      ArrowLeft Icon
    </span>
  ),
}))

// Mock shadcn Button component
jest.mock('@/components/ui/schadcn', () => ({
  Button: ({
    children,
    variant,
    size,
    className,
    asChild,
    ...props
  }: {
    children: React.ReactNode
    variant?: string
    size?: string
    className?: string
    asChild?: boolean
    [key: string]: unknown
  }) => {
    if (asChild) {
      // When asChild is true, Button renders its child with className merged
      const child = React.Children.only(children) as React.ReactElement
      const childProps = child.props || {}
      return React.cloneElement(child, {
        ...childProps,
        className: className,
      } as React.Attributes)
    }
    return (
      <button
        data-variant={variant}
        data-size={size}
        className={className}
        data-testid="button"
        {...props}
      >
        {children}
      </button>
    )
  },
}))

// Mock cn utility
jest.mock('@/lib/utils', () => ({
  cn: (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' '),
}))

describe('BackToCategoriesButton', () => {
  it('should render with default props', () => {
    render(<BackToCategoriesButton />)

    // Check link is rendered
    const link = screen.getByTestId('link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/categories')

    // Check icon is rendered
    const icon = screen.getByTestId('arrow-left-icon')
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveClass('h-4 w-4')

    // Check text content for desktop
    expect(screen.getByText('Back to Categories')).toBeInTheDocument()
    expect(screen.getByText('Back to Categories')).toHaveClass(
      'hidden sm:inline'
    )

    // Check text content for mobile
    expect(screen.getByText('Back')).toBeInTheDocument()
    expect(screen.getByText('Back')).toHaveClass('sm:hidden')
  })

  it('should render with custom className', () => {
    render(<BackToCategoriesButton className="custom-class" />)

    // Verify the component renders without error with custom className
    const link = screen.getByTestId('link')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/categories')
  })

  it('should have correct structure with Button asChild prop', () => {
    render(<BackToCategoriesButton />)

    // The button should render its children directly when asChild is true
    const link = screen.getByTestId('link')
    const icon = screen.getByTestId('arrow-left-icon')
    const desktopText = screen.getByText('Back to Categories')
    const mobileText = screen.getByText('Back')

    // All elements should be present
    expect(link).toBeInTheDocument()
    expect(icon).toBeInTheDocument()
    expect(desktopText).toBeInTheDocument()
    expect(mobileText).toBeInTheDocument()
  })

  it('should translate text content correctly', () => {
    render(<BackToCategoriesButton />)

    // Verify translations are applied
    expect(screen.getByText('Back to Categories')).toBeInTheDocument()
    expect(screen.getByText('Back')).toBeInTheDocument()
  })

  it('should maintain responsive text visibility classes', () => {
    render(<BackToCategoriesButton />)

    const desktopText = screen.getByText('Back to Categories')
    const mobileText = screen.getByText('Back')

    // Desktop text should be hidden on mobile
    expect(desktopText).toHaveClass('hidden sm:inline')

    // Mobile text should be hidden on desktop
    expect(mobileText).toHaveClass('sm:hidden')
  })
})
