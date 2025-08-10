/**
 * ViewAllProductsButton Component Test Suite
 * SOLID Principles: Single Responsibility - Test navigation button
 * Design Patterns: Test Pattern - Unit tests with mocking
 * Dependencies: Jest, React Testing Library, Next.js mocks
 */

import { render, screen } from '@testing-library/react'
import { ViewAllProductsButton } from '../ViewAllProductsButton'

// Mock Next.js Link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: jest.fn(({ children, href }) => (
    <a href={href} data-testid="next-link">
      {children}
    </a>
  )),
}))

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}))

// Mock shadcn Button component
jest.mock('@/components/ui/schadcn', () => ({
  Button: jest.fn(({ children, asChild, variant, size, className }) => {
    const Component = asChild ? 'span' : 'button'
    return (
      <Component
        data-variant={variant}
        data-size={size}
        className={className}
        data-testid="button"
      >
        {children}
      </Component>
    )
  }),
}))

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  ArrowRight: jest.fn(({ className }) => (
    <svg
      data-testid="arrow-right-icon"
      className={className}
      aria-hidden="true"
    />
  )),
}))

// Import mocked functions
import { useTranslation } from 'react-i18next'

const mockUseTranslation = useTranslation as jest.MockedFunction<
  typeof useTranslation
>

describe('ViewAllProductsButton', () => {
  const mockT = jest.fn(
    (_key: string, defaultValue?: string): string => defaultValue ?? _key
  )

  beforeEach(() => {
    jest.clearAllMocks()
    mockUseTranslation.mockReturnValue({
      t: mockT as never,
      i18n: {
        changeLanguage: jest.fn(),
        language: 'en',
        languages: ['en'],
        isInitialized: true,
      } as never,
      ready: true,
    } as never)
  })

  describe('Component rendering', () => {
    it('should render with default props', () => {
      render(<ViewAllProductsButton />)

      // Check button is rendered
      const button = screen.getByTestId('button')
      expect(button).toBeInTheDocument()

      // Check link is rendered
      const link = screen.getByTestId('next-link')
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', '/products')

      // Check text content
      expect(screen.getByText('View All Products')).toBeInTheDocument()

      // Check icon
      const icon = screen.getByTestId('arrow-right-icon')
      expect(icon).toBeInTheDocument()
      expect(icon).toHaveClass('ml-2', 'h-4', 'w-4')
    })

    it('should use custom href when provided', () => {
      render(<ViewAllProductsButton href="/custom-products" />)

      const link = screen.getByTestId('next-link')
      expect(link).toHaveAttribute('href', '/custom-products')
    })

    it('should apply custom className', () => {
      const customClass = 'custom-button-class mt-4'
      render(<ViewAllProductsButton className={customClass} />)

      const button = screen.getByTestId('button')
      expect(button).toHaveClass(customClass)
    })
  })

  describe('Translation', () => {
    it('should use translation with correct namespace', () => {
      render(<ViewAllProductsButton />)

      expect(mockUseTranslation).toHaveBeenCalledWith('categories')
    })

    it('should call t function with correct key and default', () => {
      render(<ViewAllProductsButton />)

      expect(mockT).toHaveBeenCalledWith('viewAllProducts', 'View All Products')
    })

    it('should display translated text', () => {
      mockT.mockReturnValue('Voir tous les produits')
      render(<ViewAllProductsButton />)

      expect(screen.getByText('Voir tous les produits')).toBeInTheDocument()
    })

    it('should fallback to default text when translation missing', () => {
      mockT.mockImplementation(
        (_key: string, defaultValue?: string): string => defaultValue ?? _key
      )
      render(<ViewAllProductsButton />)

      expect(screen.getByText('View All Products')).toBeInTheDocument()
    })

    it('should display key when no default provided', () => {
      mockT.mockImplementation((key: string) => key)
      render(<ViewAllProductsButton />)

      expect(screen.getByText('viewAllProducts')).toBeInTheDocument()
    })
  })

  describe('Button properties', () => {
    it('should have correct button variant', () => {
      render(<ViewAllProductsButton />)

      const button = screen.getByTestId('button')
      expect(button).toHaveAttribute('data-variant', 'outline')
    })

    it('should have correct button size', () => {
      render(<ViewAllProductsButton />)

      const button = screen.getByTestId('button')
      expect(button).toHaveAttribute('data-size', 'lg')
    })

    it('should use asChild prop', () => {
      render(<ViewAllProductsButton />)

      // Button should render as span when asChild is true
      const button = screen.getByTestId('button')
      expect(button.tagName.toLowerCase()).toBe('span')
    })
  })

  describe('Link behavior', () => {
    it('should wrap button content in Link', () => {
      render(<ViewAllProductsButton />)

      const link = screen.getByTestId('next-link')
      // Check that link contains the text (either key or value)
      expect(link).toBeInTheDocument()
      expect(link).toHaveTextContent('viewAllProducts')
    })

    it('should include icon inside link', () => {
      render(<ViewAllProductsButton />)

      const link = screen.getByTestId('next-link')
      const icon = link.querySelector('[data-testid="arrow-right-icon"]')

      expect(icon).toBeInTheDocument()
    })
  })

  describe('Icon properties', () => {
    it('should render ArrowRight icon with correct classes', () => {
      render(<ViewAllProductsButton />)

      const icon = screen.getByTestId('arrow-right-icon')
      expect(icon).toHaveClass('ml-2', 'h-4', 'w-4')
    })

    it('should have aria-hidden on icon', () => {
      render(<ViewAllProductsButton />)

      const icon = screen.getByTestId('arrow-right-icon')
      expect(icon).toHaveAttribute('aria-hidden', 'true')
    })
  })

  describe('Props combinations', () => {
    it('should handle all props together', () => {
      render(
        <ViewAllProductsButton href="/all-products" className="mt-8 w-full" />
      )

      const link = screen.getByTestId('next-link')
      const button = screen.getByTestId('button')

      expect(link).toHaveAttribute('href', '/all-products')
      expect(button).toHaveClass('mt-8', 'w-full')
    })

    it('should handle missing props with defaults', () => {
      render(<ViewAllProductsButton />)

      const link = screen.getByTestId('next-link')
      expect(link).toHaveAttribute('href', '/products')
    })
  })

  describe('Edge cases', () => {
    it('should handle empty href', () => {
      render(<ViewAllProductsButton href="" />)

      const link = screen.getByTestId('next-link')
      expect(link).toHaveAttribute('href', '')
    })

    it('should handle very long translated text', () => {
      const longText = 'A'.repeat(200)
      mockT.mockReturnValue(longText)
      render(<ViewAllProductsButton />)

      expect(screen.getByText(longText)).toBeInTheDocument()
    })

    it('should handle special characters in translation', () => {
      mockT.mockReturnValue('View All Products & More →')
      render(<ViewAllProductsButton />)

      expect(screen.getByText('View All Products & More →')).toBeInTheDocument()
    })
  })
})
