/**
 * Unit tests for SliderOverlay component
 * SOLID Principles: SRP - Single responsibility for slider overlay testing
 * Design Patterns: AAA (Arrange, Act, Assert) Testing Pattern
 * Dependencies: React Testing Library, Jest, price service mock
 */

import { render, screen } from '@testing-library/react'
import { SliderOverlay } from '../SliderOverlay'

// Mock price service
jest.mock('@/services/price.service', () => ({
  calculateDiscountPercentage: jest.fn(
    (originalPrice: number, discountedPrice: number) => {
      if (originalPrice <= 0) return 0
      if (discountedPrice >= originalPrice) return 0
      if (discountedPrice === 0) return 100
      return Math.round(
        ((originalPrice - discountedPrice) / originalPrice) * 100
      )
    }
  ),
}))

// Mock cn utility
jest.mock('@/lib/utils', () => ({
  cn: jest.fn((...classes: Array<string | undefined | null | false>) =>
    classes.filter(Boolean).join(' ')
  ),
}))

describe('SliderOverlay', () => {
  const mockProps = {
    stock_name: 'Test Product',
    stock_unit: 'pcs',
    stock_price: 10000, // 100.00 SEK in öre
    campaign_price: 8000, // 80.00 SEK in öre
    className: '',
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  // Test basic rendering
  describe('Basic rendering', () => {
    it('renders product information', () => {
      // Arrange & Act
      render(<SliderOverlay {...mockProps} />)

      // Assert
      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
        'Test Product'
      )
      expect(screen.getByText('pcs')).toBeInTheDocument()
    })

    it('renders campaign price in SEK format', () => {
      // Arrange & Act
      render(<SliderOverlay {...mockProps} />)

      // Assert
      expect(screen.getByText('80.00 SEK')).toBeInTheDocument()
    })

    it('applies default overlay styling', () => {
      // Arrange & Act
      render(<SliderOverlay {...mockProps} />)

      // Assert
      const overlay = screen.getByRole('heading', { level: 3 }).closest('div')
        ?.parentElement?.parentElement
      expect(overlay).toHaveClass(
        'absolute',
        'bottom-0',
        'left-0',
        'right-0',
        'bg-gradient-to-t',
        'from-black/80',
        'via-black/50',
        'to-transparent',
        'p-6',
        'text-white'
      )
    })

    it('applies custom className', () => {
      // Arrange
      const customClassName = 'custom-overlay-class'

      // Act
      render(<SliderOverlay {...mockProps} className={customClassName} />)

      // Assert
      const overlay = screen.getByRole('heading', { level: 3 }).closest('div')
        ?.parentElement?.parentElement
      expect(overlay).toHaveClass(customClassName)
    })

    it('applies default empty className when none provided', () => {
      // Arrange
      const { className, ...propsWithoutClassName } = mockProps
      void className // Intentionally unused - testing default behavior

      // Act
      render(<SliderOverlay {...propsWithoutClassName} />)

      // Assert
      const overlay = screen.getByRole('heading', { level: 3 }).closest('div')
        ?.parentElement?.parentElement
      expect(overlay).toHaveClass('absolute')
    })
  })

  // Test price conversion and display
  describe('Price conversion and display', () => {
    it('correctly converts öre to SEK for campaign price', () => {
      // Arrange & Act
      const testCases = [
        { ore: 100, expected: '1.00' },
        { ore: 1234, expected: '12.34' },
        { ore: 10050, expected: '100.50' },
        { ore: 999999, expected: '9999.99' },
      ]

      testCases.forEach(({ ore, expected }) => {
        const { unmount } = render(
          <SliderOverlay
            {...mockProps}
            campaign_price={ore}
            stock_price={ore + 1000}
          />
        )

        // Assert
        expect(screen.getByText(`${expected} SEK`)).toBeInTheDocument()
        unmount()
      })
    })

    it('handles zero campaign price (free products)', () => {
      // Arrange & Act
      render(<SliderOverlay {...mockProps} campaign_price={0} />)

      // Assert
      expect(screen.getByText('0.00 SEK')).toBeInTheDocument()
    })

    it('handles large price values', () => {
      // Arrange & Act
      render(
        <SliderOverlay
          {...mockProps}
          campaign_price={1000000} // 10000.00 SEK
          stock_price={1200000} // 12000.00 SEK
        />
      )

      // Assert
      expect(screen.getByText('10000.00 SEK')).toBeInTheDocument()
    })
  })

  // Test discount detection and display
  describe('Discount detection and display', () => {
    it('shows original price when there is a discount', () => {
      // Arrange & Act
      render(<SliderOverlay {...mockProps} />)

      // Assert
      expect(screen.getByText('100.00 SEK')).toBeInTheDocument() // Original price
      expect(screen.getByText('80.00 SEK')).toBeInTheDocument() // Campaign price

      const originalPrice = screen.getByText('100.00 SEK')
      expect(originalPrice).toHaveClass('line-through', 'opacity-70')
    })

    it('does not show original price when no discount', () => {
      // Arrange & Act
      render(
        <SliderOverlay
          {...mockProps}
          campaign_price={10000} // Same as stock_price
        />
      )

      // Assert
      expect(screen.getByText('100.00 SEK')).toBeInTheDocument() // Only campaign price
      expect(screen.getAllByText('100.00 SEK')).toHaveLength(1) // Should only appear once
    })

    it('does not show original price when campaign price is higher', () => {
      // Arrange & Act
      render(
        <SliderOverlay
          {...mockProps}
          stock_price={8000} // Lower than campaign price
          campaign_price={10000}
        />
      )

      // Assert
      expect(screen.getByText('100.00 SEK')).toBeInTheDocument() // Campaign price
      expect(screen.queryByText('80.00 SEK')).not.toBeInTheDocument() // No original price shown
    })

    it('calls calculateDiscountPercentage with correct parameters', () => {
      // Arrange
      const priceService = jest.requireMock('@/services/price.service')
      const calculateDiscountPercentage =
        priceService.calculateDiscountPercentage as jest.Mock

      // Act
      render(<SliderOverlay {...mockProps} />)

      // Assert
      expect(calculateDiscountPercentage).toHaveBeenCalledWith(10000, 8000)
    })

    it('handles edge case where both prices are zero', () => {
      // Arrange & Act
      render(
        <SliderOverlay {...mockProps} stock_price={0} campaign_price={0} />
      )

      // Assert
      expect(screen.getByText('0.00 SEK')).toBeInTheDocument()
    })
  })

  // Test product information display
  describe('Product information display', () => {
    it('displays product name with correct styling', () => {
      // Arrange & Act
      render(<SliderOverlay {...mockProps} />)

      // Assert
      const productName = screen.getByRole('heading', { level: 3 })
      expect(productName).toHaveTextContent('Test Product')
      expect(productName).toHaveClass('text-2xl', 'font-bold')
    })

    it('displays unit information with correct styling', () => {
      // Arrange & Act
      render(<SliderOverlay {...mockProps} />)

      // Assert
      const unit = screen.getByText('pcs')
      expect(unit).toHaveClass('text-sm', 'opacity-90')
    })

    it('handles long product names', () => {
      // Arrange
      const longName =
        'This is a very long product name that contains many words and should still display properly in the overlay'

      // Act
      render(<SliderOverlay {...mockProps} stock_name={longName} />)

      // Assert
      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
        longName
      )
    })

    it('handles different unit types', () => {
      // Arrange & Act
      const units = ['kg', 'liters', 'm²', 'boxes', 'pairs']

      units.forEach(unit => {
        const { unmount } = render(
          <SliderOverlay {...mockProps} stock_unit={unit} />
        )

        // Assert
        expect(screen.getByText(unit)).toBeInTheDocument()
        unmount()
      })
    })

    it('handles empty product name', () => {
      // Arrange & Act
      render(<SliderOverlay {...mockProps} stock_name="" />)

      // Assert
      const heading = screen.getByRole('heading', { level: 3 })
      expect(heading).toHaveTextContent('')
    })

    it('handles empty unit', () => {
      // Arrange & Act
      render(<SliderOverlay {...mockProps} stock_unit="" />)

      // Assert
      // Find the paragraph element that would contain the unit
      const heading = screen.getByRole('heading', { level: 3 })
      const unitParagraph = heading.nextElementSibling
      expect(unitParagraph).toHaveTextContent('') // Empty unit text
    })
  })

  // Test styling and layout
  describe('Styling and layout', () => {
    it('applies correct styling to campaign price', () => {
      // Arrange & Act
      render(<SliderOverlay {...mockProps} />)

      // Assert
      const campaignPrice = screen.getByText('80.00 SEK')
      expect(campaignPrice).toHaveClass('text-3xl', 'font-bold')
    })

    it('applies correct styling to original price when shown', () => {
      // Arrange & Act
      render(<SliderOverlay {...mockProps} />)

      // Assert
      const originalPrice = screen.getByText('100.00 SEK')
      expect(originalPrice).toHaveClass('text-xl', 'line-through', 'opacity-70')
    })

    it('has proper container structure with space-y-2', () => {
      // Arrange & Act
      render(<SliderOverlay {...mockProps} />)

      // Assert
      const container = screen.getByRole('heading', { level: 3 }).parentElement
        ?.parentElement
      expect(container).toHaveClass('space-y-2')
    })

    it('has proper price container with flex layout', () => {
      // Arrange & Act
      render(<SliderOverlay {...mockProps} />)

      // Assert
      const priceContainer = screen.getByText('80.00 SEK').parentElement
      expect(priceContainer).toHaveClass('flex', 'items-baseline', 'gap-3')
    })

    it('uses cn utility for className merging', () => {
      // Arrange
      const { cn } = jest.requireMock('@/lib/utils') as { cn: jest.Mock }

      // Act
      render(<SliderOverlay {...mockProps} className="test-class" />)

      // Assert
      expect(cn).toHaveBeenCalledWith(
        'absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6 text-white',
        'test-class'
      )
    })
  })

  // Test different discount scenarios
  describe('Discount scenarios', () => {
    it('handles 100% discount (free product)', () => {
      // Arrange & Act
      render(
        <SliderOverlay {...mockProps} campaign_price={0} stock_price={5000} />
      )

      // Assert
      expect(screen.getByText('0.00 SEK')).toBeInTheDocument()
      expect(screen.getByText('50.00 SEK')).toBeInTheDocument()
    })

    it('handles small discount percentage', () => {
      // Arrange & Act
      render(
        <SliderOverlay
          {...mockProps}
          campaign_price={9500}
          stock_price={10000}
        />
      )

      // Assert
      expect(screen.getByText('95.00 SEK')).toBeInTheDocument()
      expect(screen.getByText('100.00 SEK')).toBeInTheDocument()
    })

    it('handles no discount case', () => {
      // Arrange & Act
      render(
        <SliderOverlay
          {...mockProps}
          campaign_price={10000}
          stock_price={10000}
        />
      )

      // Assert
      expect(screen.getByText('100.00 SEK')).toBeInTheDocument()
      expect(screen.getAllByText('100.00 SEK')).toHaveLength(1) // Only one price shown when no discount
    })
  })

  // Test prop combinations
  describe('Prop combinations', () => {
    it('works with all props provided', () => {
      // Arrange
      const allProps = {
        stock_name: 'Complete Product',
        stock_unit: 'boxes',
        stock_price: 15000,
        campaign_price: 12000,
        className: 'test-overlay',
      }

      // Act
      render(<SliderOverlay {...allProps} />)

      // Assert
      expect(screen.getByText('Complete Product')).toBeInTheDocument()
      expect(screen.getByText('boxes')).toBeInTheDocument()
      expect(screen.getByText('120.00 SEK')).toBeInTheDocument()
      expect(screen.getByText('150.00 SEK')).toBeInTheDocument()
    })

    it('works with minimal props', () => {
      // Arrange
      const minimalProps = {
        stock_name: 'Min Product',
        stock_unit: 'pc',
        stock_price: 1000,
        campaign_price: 800,
      }

      // Act
      render(<SliderOverlay {...minimalProps} />)

      // Assert
      expect(screen.getByText('Min Product')).toBeInTheDocument()
      expect(screen.getByText('pc')).toBeInTheDocument()
      expect(screen.getByText('8.00 SEK')).toBeInTheDocument()
    })
  })

  // Test accessibility
  describe('Accessibility', () => {
    it('uses proper heading hierarchy', () => {
      // Arrange & Act
      render(<SliderOverlay {...mockProps} />)

      // Assert
      const heading = screen.getByRole('heading', { level: 3 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('Test Product')
    })

    it('maintains readable text contrast with white text', () => {
      // Arrange & Act
      render(<SliderOverlay {...mockProps} />)

      // Assert
      const overlay = screen.getByRole('heading', { level: 3 }).closest('div')
        ?.parentElement?.parentElement
      expect(overlay).toHaveClass('text-white')
    })
  })

  // Test edge cases
  describe('Edge cases', () => {
    it('handles very small prices correctly', () => {
      // Arrange & Act
      render(
        <SliderOverlay {...mockProps} stock_price={5} campaign_price={1} />
      )

      // Assert
      expect(screen.getByText('0.01 SEK')).toBeInTheDocument()
      expect(screen.getByText('0.05 SEK')).toBeInTheDocument()
    })

    it('handles fractional öre values', () => {
      // Arrange & Act
      render(
        <SliderOverlay
          {...mockProps}
          stock_price={10033} // 100.33 SEK
          campaign_price={9011} // 90.11 SEK - needs bigger discount to show original price
        />
      )

      // Assert
      expect(screen.getByText('90.11 SEK')).toBeInTheDocument()
      expect(screen.getByText('100.33 SEK')).toBeInTheDocument()
    })

    it('handles product name with special characters', () => {
      // Arrange
      const specialName = 'Product™ with åäö & <symbols>'

      // Act
      render(<SliderOverlay {...mockProps} stock_name={specialName} />)

      // Assert
      expect(screen.getByText(specialName)).toBeInTheDocument()
    })
  })
})
