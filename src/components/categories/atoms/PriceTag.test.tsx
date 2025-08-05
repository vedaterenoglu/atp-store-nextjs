/**
 * PriceTag Component Test Suite
 * SOLID Principles: Single Responsibility - Test price tag component
 * Design Patterns: Test Pattern - Unit tests with RTL
 * Dependencies: Jest, React Testing Library
 */

import { render, screen } from '@testing-library/react'
import { PriceTag } from './PriceTag'

// Mock the cn utility
jest.mock('@/components/ui/utils', () => ({
  cn: jest.fn((...classes) => classes.filter(Boolean).join(' ')),
}))

describe('PriceTag', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Component rendering', () => {
    it('should render with price prop', () => {
      render(<PriceTag price={1000} />)

      const priceTag = screen.getByText('10.00 SEK')
      expect(priceTag).toBeInTheDocument()
    })

    it('should apply default classes', () => {
      const { container } = render(<PriceTag price={1000} />)

      const priceTag = container.firstChild
      expect(priceTag).toHaveClass(
        'absolute',
        'right-3',
        'top-3',
        'z-10',
        'rounded-full',
        'bg-white/95',
        'px-3',
        'py-1.5',
        'text-sm',
        'font-semibold',
        'text-gray-900',
        'shadow-md',
        'backdrop-blur-sm'
      )
    })

    it('should apply custom className', () => {
      const customClass = 'custom-price-class bg-red-500'
      const { container } = render(
        <PriceTag price={1000} className={customClass} />
      )

      const priceTag = container.firstChild
      expect(priceTag).toHaveClass(customClass)
      // Should still have default classes
      expect(priceTag).toHaveClass('absolute', 'right-3', 'top-3')
    })
  })

  describe('Price formatting', () => {
    it('should format price from cents to SEK with 2 decimals', () => {
      const testCases = [
        { price: 100, expected: '1.00 SEK' },
        { price: 1000, expected: '10.00 SEK' },
        { price: 1050, expected: '10.50 SEK' },
        { price: 1099, expected: '10.99 SEK' },
        { price: 10000, expected: '100.00 SEK' },
        { price: 99999, expected: '999.99 SEK' },
      ]

      testCases.forEach(({ price, expected }) => {
        const { rerender } = render(<PriceTag price={price} />)
        expect(screen.getByText(expected)).toBeInTheDocument()
        rerender(<></>)
      })
    })

    it('should handle zero price', () => {
      render(<PriceTag price={0} />)
      expect(screen.getByText('0.00 SEK')).toBeInTheDocument()
    })

    it('should handle single digit cents', () => {
      render(<PriceTag price={5} />)
      expect(screen.getByText('0.05 SEK')).toBeInTheDocument()
    })

    it('should handle prices with fractional cents (rounding)', () => {
      // JavaScript's toFixed rounds 0.5 up
      render(<PriceTag price={1234} />)
      expect(screen.getByText('12.34 SEK')).toBeInTheDocument()
    })

    it('should handle negative prices', () => {
      render(<PriceTag price={-500} />)
      expect(screen.getByText('-5.00 SEK')).toBeInTheDocument()
    })

    it('should handle very large prices', () => {
      render(<PriceTag price={1000000000} />)
      expect(screen.getByText('10000000.00 SEK')).toBeInTheDocument()
    })
  })

  describe('Edge cases', () => {
    it('should handle decimal price inputs', () => {
      // Even though price should be integer (cents), component should handle decimals
      render(<PriceTag price={123.45} />)
      expect(screen.getByText('1.23 SEK')).toBeInTheDocument()
    })

    it('should handle Infinity', () => {
      render(<PriceTag price={Infinity} />)
      expect(screen.getByText('Infinity SEK')).toBeInTheDocument()
    })

    it('should handle -Infinity', () => {
      render(<PriceTag price={-Infinity} />)
      expect(screen.getByText('-Infinity SEK')).toBeInTheDocument()
    })

    it('should handle NaN', () => {
      render(<PriceTag price={NaN} />)
      expect(screen.getByText('NaN SEK')).toBeInTheDocument()
    })
  })

  describe('Props combinations', () => {
    it('should handle both price and className', () => {
      const { container } = render(
        <PriceTag price={2499} className="text-green-600 text-lg" />
      )

      const priceTag = container.firstChild
      expect(priceTag).toHaveTextContent('24.99 SEK')
      expect(priceTag).toHaveClass('text-green-600', 'text-lg')
    })
  })

  describe('Currency display', () => {
    it('should always display SEK currency', () => {
      render(<PriceTag price={1000} />)

      const priceText = screen.getByText(/SEK/)
      expect(priceText).toBeInTheDocument()
      expect(priceText.textContent).toMatch(/\d+\.\d{2} SEK$/)
    })

    it('should have space between price and currency', () => {
      render(<PriceTag price={1000} />)

      const priceText = screen.getByText('10.00 SEK')
      expect(priceText.textContent).toBe('10.00 SEK')
      expect(priceText.textContent).not.toBe('10.00SEK')
    })
  })

  describe('Positioning', () => {
    it('should be absolutely positioned', () => {
      const { container } = render(<PriceTag price={1000} />)

      const priceTag = container.firstChild
      expect(priceTag).toHaveClass('absolute')
      expect(priceTag).toHaveClass('right-3')
      expect(priceTag).toHaveClass('top-3')
      expect(priceTag).toHaveClass('z-10')
    })
  })

  describe('Styling', () => {
    it('should have visual styling classes', () => {
      const { container } = render(<PriceTag price={1000} />)

      const priceTag = container.firstChild
      // Background and shape
      expect(priceTag).toHaveClass('rounded-full')
      expect(priceTag).toHaveClass('bg-white/95')
      expect(priceTag).toHaveClass('shadow-md')
      expect(priceTag).toHaveClass('backdrop-blur-sm')

      // Text styling
      expect(priceTag).toHaveClass('text-sm')
      expect(priceTag).toHaveClass('font-semibold')
      expect(priceTag).toHaveClass('text-gray-900')

      // Padding
      expect(priceTag).toHaveClass('px-3')
      expect(priceTag).toHaveClass('py-1.5')
    })
  })
})
