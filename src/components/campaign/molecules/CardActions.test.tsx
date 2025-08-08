/**
 * Unit tests for CardActions component
 * SOLID Principles: SRP - Single responsibility for card actions testing
 * Design Patterns: AAA (Arrange, Act, Assert) Testing Pattern
 * Dependencies: React Testing Library, Jest, i18n mock
 */

import { render, screen, fireEvent } from '@testing-library/react'
import { CardActions } from './CardActions'

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'card.addToCart': 'Add to Cart',
      }
      return translations[key] || key
    },
  }),
}))

// Mock Lucide React icons
interface MockIconProps {
  className?: string
  [key: string]: unknown
}

jest.mock('lucide-react', () => ({
  ShoppingCart: ({ className, ...props }: MockIconProps) => (
    <div data-testid="shopping-cart-icon" className={className} {...props} />
  ),
}))

// Mock shadcn/ui Button
interface MockButtonProps {
  children?: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
  variant?: string
  size?: string
  [key: string]: unknown
}

jest.mock('@/components/ui/schadcn/button', () => ({
  Button: ({
    children,
    onClick,
    disabled,
    className,
    variant,
    size,
    ...props
  }: MockButtonProps) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={className}
      data-variant={variant}
      data-size={size}
      data-testid="add-to-cart-button"
      {...props}
    >
      {children}
    </button>
  ),
}))

// Mock QuantityCounter component
interface MockQuantityCounterProps {
  quantity: number
  onDecrease: () => void
  onIncrease: () => void
  disabled?: boolean
}

jest.mock('../atoms', () => ({
  QuantityCounter: ({
    quantity,
    onDecrease,
    onIncrease,
    disabled,
  }: MockQuantityCounterProps) => (
    <div data-testid="quantity-counter" data-disabled={disabled}>
      <button
        data-testid="decrease-button"
        onClick={onDecrease}
        disabled={disabled}
      >
        -
      </button>
      <span data-testid="quantity-display">{quantity}</span>
      <button
        data-testid="increase-button"
        onClick={onIncrease}
        disabled={disabled}
      >
        +
      </button>
    </div>
  ),
}))

describe('CardActions', () => {
  const mockProps = {
    stockId: 'test-stock-123',
    disabled: false,
    onAddToCart: jest.fn(),
    className: '',
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  // Test basic rendering
  describe('Basic rendering', () => {
    it('renders quantity counter and add to cart button', () => {
      // Arrange & Act
      render(<CardActions {...mockProps} />)

      // Assert
      expect(screen.getByTestId('quantity-counter')).toBeInTheDocument()
      expect(screen.getByTestId('add-to-cart-button')).toBeInTheDocument()
      expect(screen.getByText('Add to Cart')).toBeInTheDocument()
      expect(screen.getByTestId('shopping-cart-icon')).toBeInTheDocument()
    })

    it('applies custom className', () => {
      // Arrange
      const customClassName = 'custom-actions-class'

      // Act
      render(<CardActions {...mockProps} className={customClassName} />)

      // Assert
      const container = screen.getByTestId('quantity-counter').parentElement
      expect(container).toHaveClass('space-y-2', customClassName)
    })

    it('applies default empty className when none provided', () => {
      // Arrange
      const { className, ...propsWithoutClassName } = mockProps
      void className // Intentionally unused - testing default behavior

      // Act
      render(<CardActions {...propsWithoutClassName} />)

      // Assert
      const container = screen.getByTestId('quantity-counter').parentElement
      expect(container).toHaveClass('space-y-2')
    })
  })

  // Test quantity management
  describe('Quantity management', () => {
    it('starts with quantity 0', () => {
      // Arrange & Act
      render(<CardActions {...mockProps} />)

      // Assert
      expect(screen.getByTestId('quantity-display')).toHaveTextContent('0')
    })

    it('increases quantity when increase button is clicked', () => {
      // Arrange
      render(<CardActions {...mockProps} />)

      // Act
      fireEvent.click(screen.getByTestId('increase-button'))

      // Assert
      expect(screen.getByTestId('quantity-display')).toHaveTextContent('1')
    })

    it('increases quantity multiple times', () => {
      // Arrange
      render(<CardActions {...mockProps} />)

      // Act
      fireEvent.click(screen.getByTestId('increase-button'))
      fireEvent.click(screen.getByTestId('increase-button'))
      fireEvent.click(screen.getByTestId('increase-button'))

      // Assert
      expect(screen.getByTestId('quantity-display')).toHaveTextContent('3')
    })

    it('decreases quantity when decrease button is clicked', () => {
      // Arrange
      render(<CardActions {...mockProps} />)
      fireEvent.click(screen.getByTestId('increase-button'))
      fireEvent.click(screen.getByTestId('increase-button'))

      // Act
      fireEvent.click(screen.getByTestId('decrease-button'))

      // Assert
      expect(screen.getByTestId('quantity-display')).toHaveTextContent('1')
    })

    it('does not decrease quantity below 0', () => {
      // Arrange
      render(<CardActions {...mockProps} />)

      // Act
      fireEvent.click(screen.getByTestId('decrease-button'))

      // Assert
      expect(screen.getByTestId('quantity-display')).toHaveTextContent('0')
    })

    it('handles decrease from quantity 1 to 0', () => {
      // Arrange
      render(<CardActions {...mockProps} />)
      fireEvent.click(screen.getByTestId('increase-button'))

      // Act
      fireEvent.click(screen.getByTestId('decrease-button'))

      // Assert
      expect(screen.getByTestId('quantity-display')).toHaveTextContent('0')
    })
  })

  // Test add to cart functionality
  describe('Add to cart functionality', () => {
    it('calls onAddToCart with correct parameters when button is clicked with quantity > 0', () => {
      // Arrange
      const mockOnAddToCart = jest.fn()
      render(<CardActions {...mockProps} onAddToCart={mockOnAddToCart} />)
      fireEvent.click(screen.getByTestId('increase-button'))

      // Act
      fireEvent.click(screen.getByTestId('add-to-cart-button'))

      // Assert
      expect(mockOnAddToCart).toHaveBeenCalledWith('test-stock-123', 1)
    })

    it('resets quantity to 0 after adding to cart', () => {
      // Arrange
      const mockOnAddToCart = jest.fn()
      render(<CardActions {...mockProps} onAddToCart={mockOnAddToCart} />)
      fireEvent.click(screen.getByTestId('increase-button'))
      fireEvent.click(screen.getByTestId('increase-button'))

      // Act
      fireEvent.click(screen.getByTestId('add-to-cart-button'))

      // Assert
      expect(screen.getByTestId('quantity-display')).toHaveTextContent('0')
    })

    it('does not call onAddToCart when quantity is 0', () => {
      // Arrange
      const mockOnAddToCart = jest.fn()
      render(<CardActions {...mockProps} onAddToCart={mockOnAddToCart} />)

      // Act
      fireEvent.click(screen.getByTestId('add-to-cart-button'))

      // Assert
      expect(mockOnAddToCart).not.toHaveBeenCalled()
    })

    it('does not call onAddToCart when onAddToCart is not provided', () => {
      // Arrange
      const { onAddToCart, ...propsWithoutCallback } = mockProps
      void onAddToCart // Intentionally unused - testing without callback
      render(<CardActions {...propsWithoutCallback} />)
      fireEvent.click(screen.getByTestId('increase-button'))

      // Act
      fireEvent.click(screen.getByTestId('add-to-cart-button'))

      // Assert - No error should occur, component should handle gracefully
      expect(screen.getByTestId('quantity-display')).toHaveTextContent('1')
    })

    it('calls onAddToCart with different quantities', () => {
      // Arrange
      const mockOnAddToCart = jest.fn()
      render(<CardActions {...mockProps} onAddToCart={mockOnAddToCart} />)

      // Test with quantity 3
      fireEvent.click(screen.getByTestId('increase-button'))
      fireEvent.click(screen.getByTestId('increase-button'))
      fireEvent.click(screen.getByTestId('increase-button'))

      // Act
      fireEvent.click(screen.getByTestId('add-to-cart-button'))

      // Assert
      expect(mockOnAddToCart).toHaveBeenCalledWith('test-stock-123', 3)
    })
  })

  // Test disabled state
  describe('Disabled state', () => {
    it('passes disabled state to quantity counter', () => {
      // Arrange & Act
      render(<CardActions {...mockProps} disabled={true} />)

      // Assert
      expect(screen.getByTestId('quantity-counter')).toHaveAttribute(
        'data-disabled',
        'true'
      )
    })

    it('disables add to cart button when disabled prop is true', () => {
      // Arrange & Act
      render(<CardActions {...mockProps} disabled={true} />)

      // Assert
      expect(screen.getByTestId('add-to-cart-button')).toBeDisabled()
    })

    it('disables add to cart button when quantity is 0', () => {
      // Arrange & Act
      render(<CardActions {...mockProps} />)

      // Assert
      expect(screen.getByTestId('add-to-cart-button')).toBeDisabled()
    })

    it('enables add to cart button when quantity > 0 and not disabled', () => {
      // Arrange
      render(<CardActions {...mockProps} />)

      // Act
      fireEvent.click(screen.getByTestId('increase-button'))

      // Assert
      expect(screen.getByTestId('add-to-cart-button')).not.toBeDisabled()
    })

    it('keeps add to cart button disabled when disabled=true even with quantity > 0', () => {
      // Arrange
      render(<CardActions {...mockProps} disabled={true} />)

      // Act
      fireEvent.click(screen.getByTestId('increase-button'))

      // Assert
      expect(screen.getByTestId('add-to-cart-button')).toBeDisabled()
    })
  })

  // Test button styling and attributes
  describe('Button styling and attributes', () => {
    it('applies correct variant and size to add to cart button', () => {
      // Arrange & Act
      render(<CardActions {...mockProps} />)

      // Assert
      const button = screen.getByTestId('add-to-cart-button')
      expect(button).toHaveAttribute('data-variant', 'default')
      expect(button).toHaveAttribute('data-size', 'default')
      expect(button).toHaveClass('w-full')
    })

    it('displays shopping cart icon with correct styling', () => {
      // Arrange & Act
      render(<CardActions {...mockProps} />)

      // Assert
      const icon = screen.getByTestId('shopping-cart-icon')
      expect(icon).toHaveClass('h-4', 'w-4', 'mr-2')
    })
  })

  // Test prop variations
  describe('Prop variations', () => {
    it('works with different stockId values', () => {
      // Arrange
      const mockOnAddToCart = jest.fn()
      const customStockId = 'custom-stock-456'
      render(
        <CardActions stockId={customStockId} onAddToCart={mockOnAddToCart} />
      )
      fireEvent.click(screen.getByTestId('increase-button'))

      // Act
      fireEvent.click(screen.getByTestId('add-to-cart-button'))

      // Assert
      expect(mockOnAddToCart).toHaveBeenCalledWith(customStockId, 1)
    })

    it('handles missing onAddToCart gracefully', () => {
      // Arrange & Act
      render(<CardActions stockId="test" />)
      fireEvent.click(screen.getByTestId('increase-button'))

      // Assert - Should not throw error
      expect(() => {
        fireEvent.click(screen.getByTestId('add-to-cart-button'))
      }).not.toThrow()
    })
  })

  // Test complete user workflow
  describe('Complete user workflow', () => {
    it('handles complete add to cart workflow', () => {
      // Arrange
      const mockOnAddToCart = jest.fn()
      render(<CardActions {...mockProps} onAddToCart={mockOnAddToCart} />)

      // Act - User increases quantity, adds to cart, then increases again
      fireEvent.click(screen.getByTestId('increase-button'))
      fireEvent.click(screen.getByTestId('increase-button'))
      fireEvent.click(screen.getByTestId('add-to-cart-button'))
      fireEvent.click(screen.getByTestId('increase-button'))

      // Assert
      expect(mockOnAddToCart).toHaveBeenCalledWith('test-stock-123', 2)
      expect(screen.getByTestId('quantity-display')).toHaveTextContent('1')
    })
  })
})
