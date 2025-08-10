/**
 * Unit tests for PriceDisplay component
 * SOLID Principles: SRP - Single responsibility for price display testing
 * Design Patterns: AAA (Arrange, Act, Assert) Testing Pattern
 * Dependencies: React Testing Library, Jest
 */

import { render, screen } from '@testing-library/react'
import { PriceDisplay } from '../PriceDisplay'

describe('PriceDisplay', () => {
  // Test basic rendering
  describe('Basic rendering', () => {
    it('renders campaign price in SEK format', () => {
      // Arrange
      const props = {
        stock_price: 10000, // 100.00 SEK in öre
        campaign_price: 8000, // 80.00 SEK in öre
      }

      // Act
      render(<PriceDisplay {...props} />)

      // Assert
      expect(screen.getByText('80.00 SEK')).toBeInTheDocument()
    })

    it('renders original price with line-through when there is a discount', () => {
      // Arrange
      const props = {
        stock_price: 15000, // 150.00 SEK in öre
        campaign_price: 12000, // 120.00 SEK in öre
      }

      // Act
      render(<PriceDisplay {...props} />)

      // Assert
      expect(screen.getByText('120.00 SEK')).toBeInTheDocument()
      expect(screen.getByText('150.00 SEK')).toBeInTheDocument()

      const originalPrice = screen.getByText('150.00 SEK')
      expect(originalPrice).toHaveClass('line-through')
    })

    it('does not render original price when no discount (campaign price higher)', () => {
      // Arrange
      const props = {
        stock_price: 8000, // 80.00 SEK in öre
        campaign_price: 10000, // 100.00 SEK in öre (higher price)
      }

      // Act
      render(<PriceDisplay {...props} />)

      // Assert
      expect(screen.getByText('100.00 SEK')).toBeInTheDocument()
      expect(screen.queryByText('80.00 SEK')).not.toBeInTheDocument()
    })

    it('applies custom className', () => {
      // Arrange
      const props = {
        stock_price: 10000,
        campaign_price: 8000,
        className: 'custom-price-class',
      }

      // Act
      render(<PriceDisplay {...props} />)

      // Assert
      const container = screen.getByText('80.00 SEK').parentElement
      expect(container).toHaveClass(
        'flex',
        'items-baseline',
        'gap-2',
        'custom-price-class'
      )
    })

    it('applies default empty className when none provided', () => {
      // Arrange
      const props = {
        stock_price: 10000,
        campaign_price: 8000,
      }

      // Act
      render(<PriceDisplay {...props} />)

      // Assert
      const container = screen.getByText('80.00 SEK').parentElement
      expect(container).toHaveClass('flex', 'items-baseline', 'gap-2')
    })
  })

  // Test currency handling
  describe('Currency handling', () => {
    it('uses SEK as default currency', () => {
      // Arrange
      const props = {
        stock_price: 10000,
        campaign_price: 8000,
      }

      // Act
      render(<PriceDisplay {...props} />)

      // Assert
      expect(screen.getByText('80.00 SEK')).toBeInTheDocument()
    })

    it('uses custom currency when provided', () => {
      // Arrange
      const props = {
        stock_price: 10000,
        campaign_price: 8000,
        currency: 'EUR',
      }

      // Act
      render(<PriceDisplay {...props} />)

      // Assert
      expect(screen.getByText('80.00 EUR')).toBeInTheDocument()
    })

    it('handles different currency formats', () => {
      // Arrange
      const currencies = ['USD', 'NOK', 'DKK']

      currencies.forEach(currency => {
        const { unmount } = render(
          <PriceDisplay
            stock_price={10000}
            campaign_price={8000}
            currency={currency}
          />
        )

        // Assert
        expect(screen.getByText(`80.00 ${currency}`)).toBeInTheDocument()
        unmount()
      })
    })
  })

  // Test price conversion from öre to currency units
  describe('Price conversion', () => {
    it('correctly converts öre to SEK (divide by 100)', () => {
      // Arrange & Act
      const testCases = [
        { ore: 1, expected: '0.01' },
        { ore: 100, expected: '1.00' },
        { ore: 1234, expected: '12.34' },
        { ore: 10050, expected: '100.50' },
        { ore: 999999, expected: '9999.99' },
      ]

      testCases.forEach(({ ore, expected }) => {
        const { unmount } = render(
          <PriceDisplay stock_price={ore * 2} campaign_price={ore} />
        )

        // Assert
        expect(screen.getByText(`${expected} SEK`)).toBeInTheDocument()
        unmount()
      })
    })

    it('handles zero prices correctly', () => {
      // Arrange
      const props = {
        stock_price: 1000, // 10.00 SEK
        campaign_price: 0, // Free
      }

      // Act
      render(<PriceDisplay {...props} />)

      // Assert
      expect(screen.getByText('0.00 SEK')).toBeInTheDocument()
      expect(screen.getByText('10.00 SEK')).toBeInTheDocument()
    })

    it('handles large numbers correctly', () => {
      // Arrange
      const props = {
        stock_price: 1000000, // 10000.00 SEK
        campaign_price: 999900, // 9999.00 SEK
      }

      // Act
      render(<PriceDisplay {...props} />)

      // Assert
      expect(screen.getByText('9999.00 SEK')).toBeInTheDocument()
      expect(screen.getByText('10000.00 SEK')).toBeInTheDocument()
    })
  })

  // Test discount detection
  describe('Discount detection', () => {
    it('shows discount when campaign_price < stock_price', () => {
      // Arrange
      const props = {
        stock_price: 10000, // 100.00 SEK
        campaign_price: 8000, // 80.00 SEK
      }

      // Act
      render(<PriceDisplay {...props} />)

      // Assert
      expect(screen.getByText('100.00 SEK')).toHaveClass('line-through')
    })

    it('shows discount when campaign_price = stock_price', () => {
      // Arrange
      const props = {
        stock_price: 10000, // 100.00 SEK
        campaign_price: 10000, // 100.00 SEK
      }

      // Act
      render(<PriceDisplay {...props} />)

      // Assert
      const originalPrices = screen.getAllByText('100.00 SEK')
      expect(originalPrices).toHaveLength(2) // Both campaign and original price should show
      expect(originalPrices[1]).toHaveClass('line-through') // Second one is the original price
    })

    it('does not show discount when campaign_price > stock_price', () => {
      // Arrange
      const props = {
        stock_price: 8000, // 80.00 SEK
        campaign_price: 10000, // 100.00 SEK (higher than original)
      }

      // Act
      render(<PriceDisplay {...props} />)

      // Assert
      expect(screen.getByText('100.00 SEK')).not.toHaveClass('line-through')
      expect(screen.queryByText('80.00 SEK')).not.toBeInTheDocument()
    })

    it('handles edge case where both prices are zero', () => {
      // Arrange
      const props = {
        stock_price: 0,
        campaign_price: 0,
      }

      // Act
      render(<PriceDisplay {...props} />)

      // Assert
      const zeroPrices = screen.getAllByText('0.00 SEK')
      expect(zeroPrices).toHaveLength(2) // Both original and campaign prices show as 0.00 SEK
      expect(zeroPrices[1]).toHaveClass('line-through') // Second one is the original price
    })
  })

  // Test styling classes
  describe('Styling classes', () => {
    it('applies correct classes to campaign price', () => {
      // Arrange
      const props = {
        stock_price: 10000,
        campaign_price: 8000,
      }

      // Act
      render(<PriceDisplay {...props} />)

      // Assert
      const campaignPrice = screen.getByText('80.00 SEK')
      expect(campaignPrice).toHaveClass('text-2xl', 'font-bold', 'text-primary')
    })

    it('applies correct classes to original price when discount exists', () => {
      // Arrange
      const props = {
        stock_price: 10000,
        campaign_price: 8000,
      }

      // Act
      render(<PriceDisplay {...props} />)

      // Assert
      const originalPrice = screen.getByText('100.00 SEK')
      expect(originalPrice).toHaveClass(
        'text-xl',
        'text-muted-foreground',
        'line-through'
      )
    })

    it('applies container classes correctly', () => {
      // Arrange
      const props = {
        stock_price: 10000,
        campaign_price: 8000,
      }

      // Act
      render(<PriceDisplay {...props} />)

      // Assert
      const container = screen.getByText('80.00 SEK').parentElement
      expect(container).toHaveClass('flex', 'items-baseline', 'gap-2')
    })
  })

  // Test decimal formatting
  describe('Decimal formatting', () => {
    it('always shows 2 decimal places', () => {
      // Arrange & Act
      const testCases = [
        { ore: 10000, expected: '100.00' },
        { ore: 10050, expected: '100.50' },
        { ore: 10005, expected: '100.05' },
        { ore: 10001, expected: '100.01' },
      ]

      testCases.forEach(({ ore, expected }) => {
        const { unmount } = render(
          <PriceDisplay stock_price={ore + 1000} campaign_price={ore} />
        )

        // Assert
        expect(screen.getByText(`${expected} SEK`)).toBeInTheDocument()
        unmount()
      })
    })

    it('handles rounding correctly for fractional öre', () => {
      // Arrange - This tests the toFixed(2) functionality
      const props = {
        stock_price: 10033, // Should be 100.33 SEK
        campaign_price: 10011, // Should be 100.11 SEK
      }

      // Act
      render(<PriceDisplay {...props} />)

      // Assert
      expect(screen.getByText('100.11 SEK')).toBeInTheDocument()
      expect(screen.getByText('100.33 SEK')).toBeInTheDocument()
    })
  })

  // Test complex scenarios
  describe('Complex scenarios', () => {
    it('handles very small prices correctly', () => {
      // Arrange
      const props = {
        stock_price: 5, // 0.05 SEK
        campaign_price: 1, // 0.01 SEK
      }

      // Act
      render(<PriceDisplay {...props} />)

      // Assert
      expect(screen.getByText('0.01 SEK')).toBeInTheDocument()
      expect(screen.getByText('0.05 SEK')).toBeInTheDocument()
    })

    it('renders correctly with all props provided', () => {
      // Arrange
      const props = {
        stock_price: 15000,
        campaign_price: 12000,
        currency: 'USD',
        className: 'test-class',
      }

      // Act
      render(<PriceDisplay {...props} />)

      // Assert
      expect(screen.getByText('120.00 USD')).toBeInTheDocument()
      expect(screen.getByText('150.00 USD')).toBeInTheDocument()

      const container = screen.getByText('120.00 USD').parentElement
      expect(container).toHaveClass('test-class')
    })
  })
})
