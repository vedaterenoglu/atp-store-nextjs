/**
 * Unit tests for CardActions component
 * SOLID Principles: SRP - Single responsibility for card actions testing
 * Design Patterns: AAA (Arrange, Act, Assert) Testing Pattern
 * Dependencies: React Testing Library, Jest, i18n mock
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { CardActions } from '../CardActions'
import type { CampaignProduct } from '@/types/campaign'
import { toast } from '@/lib/utils/toast'

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

// Mock lucide-react
jest.mock('lucide-react', () => ({
  ShoppingCart: jest.fn(({ className }: { className?: string }) => (
    <span data-testid="shopping-cart-icon" className={className}>
      Cart Icon
    </span>
  )),
}))

// Mock shadcn/ui Button with proper typing
interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
  variant?: string
  size?: string
}

jest.mock('@/components/ui/schadcn/button', () => ({
  Button: jest.fn(
    ({
      children,
      onClick,
      disabled,
      className,
      variant,
      size,
      ...props
    }: ButtonProps) => (
      <button
        data-testid="add-to-cart-button"
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        className={className}
        data-variant={variant}
        data-size={size}
        {...props}
      >
        {children}
      </button>
    )
  ),
}))

// Mock QuantityCounter with proper typing
interface QuantityCounterProps {
  quantity: number
  onDecrease: () => void
  onIncrease: () => void
  disabled?: boolean
  canModify?: boolean
}

jest.mock('../../atoms', () => ({
  QuantityCounter: jest.fn(
    ({
      quantity,
      onDecrease,
      onIncrease,
      disabled,
      canModify,
    }: QuantityCounterProps) => (
      <div
        data-testid="quantity-counter"
        data-disabled={disabled}
        data-can-modify={canModify}
      >
        <button
          data-testid="decrease-button"
          onClick={onDecrease}
          disabled={disabled || !canModify}
        >
          -
        </button>
        <span data-testid="quantity-display">{quantity}</span>
        <button
          data-testid="increase-button"
          onClick={onIncrease}
          disabled={disabled || !canModify}
        >
          +
        </button>
      </div>
    )
  ),
}))

// Mock toast
jest.mock('@/lib/utils/toast', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}))

// Mock secure auth hook
const mockSecureAuth = {
  auth: {
    canAddToCart: true,
    activeCustomerId: 'customer-123' as string | null,
  },
  isAuthenticated: true,
}

jest.mock('@/hooks/use-secure-auth', () => ({
  useSecureAuth: jest.fn(() => mockSecureAuth),
}))

// Mock cart store
const mockAddToCart = jest.fn(() => Promise.resolve(true))
const mockFindCartItem = jest.fn(() => null as { quantity: number } | null)

jest.mock('@/lib/stores/cart.store', () => ({
  useCartStore: jest.fn(selector => {
    const state = {
      addToCart: mockAddToCart,
      findCartItem: mockFindCartItem,
    }
    return selector ? selector(state) : state
  }),
}))

describe('CardActions', () => {
  const mockProduct: CampaignProduct = {
    stock_id: 'test-stock-123',
    stock_name: 'Test Product',
    stock_group: 'Test Group',
    stock_image_link: 'https://example.com/image.jpg',
    stock_unit: 'pcs',
    stock_price: 100,
    campaign_price: 80,
    discount_percentage: 20,
  }

  const mockProps = {
    product: mockProduct,
    disabled: false,
    onAddToCart: jest.fn(),
    className: '',
  }

  beforeEach(() => {
    jest.clearAllMocks()
    // Reset auth state to default
    mockSecureAuth.auth.canAddToCart = true
    mockSecureAuth.auth.activeCustomerId = 'customer-123'
    mockSecureAuth.isAuthenticated = true
    mockAddToCart.mockResolvedValue(true)
    mockFindCartItem.mockReturnValue(null)
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
    it('does not call onAddToCart when quantity is 0', () => {
      // Arrange
      const mockOnAddToCart = jest.fn()
      render(<CardActions {...mockProps} onAddToCart={mockOnAddToCart} />)

      // Act
      fireEvent.click(screen.getByTestId('add-to-cart-button'))

      // Assert
      expect(mockOnAddToCart).not.toHaveBeenCalled()
    })

    it('calls onAddToCart with correct parameters when button is clicked with quantity > 0', async () => {
      // Arrange
      const mockOnAddToCart = jest.fn()
      render(<CardActions {...mockProps} onAddToCart={mockOnAddToCart} />)
      fireEvent.click(screen.getByTestId('increase-button'))

      // Act
      fireEvent.click(screen.getByTestId('add-to-cart-button'))

      // Assert - wait for async operations
      await waitFor(() => {
        expect(mockOnAddToCart).toHaveBeenCalledWith(mockProduct, 1)
      })
    })

    it('resets quantity to 0 after adding to cart', async () => {
      // Arrange
      const mockOnAddToCart = jest.fn()
      render(<CardActions {...mockProps} onAddToCart={mockOnAddToCart} />)
      fireEvent.click(screen.getByTestId('increase-button'))
      fireEvent.click(screen.getByTestId('increase-button'))

      // Act
      fireEvent.click(screen.getByTestId('add-to-cart-button'))

      // Assert
      await waitFor(() => {
        expect(screen.getByTestId('quantity-display')).toHaveTextContent('0')
      })
    })

    it('does not call onAddToCart when onAddToCart is not provided', async () => {
      // Arrange
      const { onAddToCart, ...propsWithoutCallback } = mockProps
      void onAddToCart // Intentionally unused
      render(<CardActions {...propsWithoutCallback} />)
      fireEvent.click(screen.getByTestId('increase-button'))

      // Act
      fireEvent.click(screen.getByTestId('add-to-cart-button'))

      // Assert - Component should show error toast when onAddToCart is not provided
      await waitFor(() => {
        expect(toast.error).toHaveBeenCalled()
      })
    })

    it('calls onAddToCart with different quantities', async () => {
      // Arrange
      const mockOnAddToCart = jest.fn()
      render(<CardActions {...mockProps} onAddToCart={mockOnAddToCart} />)
      fireEvent.click(screen.getByTestId('increase-button'))
      fireEvent.click(screen.getByTestId('increase-button'))
      fireEvent.click(screen.getByTestId('increase-button'))

      // Act
      fireEvent.click(screen.getByTestId('add-to-cart-button'))

      // Assert
      await waitFor(() => {
        expect(mockOnAddToCart).toHaveBeenCalledWith(mockProduct, 3)
      })
    })
  })

  // Test disabled state
  describe('Disabled state', () => {
    it('disables quantity counter when canAddToCart is false', () => {
      // Arrange
      mockSecureAuth.auth.canAddToCart = false

      // Act
      render(<CardActions {...mockProps} />)

      // Assert
      expect(screen.getByTestId('quantity-counter')).toHaveAttribute(
        'data-disabled',
        'true'
      )
      expect(screen.getByTestId('quantity-counter')).toHaveAttribute(
        'data-can-modify',
        'false'
      )
    })

    it('disables add to cart button when quantity is 0', () => {
      // Arrange & Act
      render(<CardActions {...mockProps} />)

      // Assert
      expect(screen.getByTestId('add-to-cart-button')).toBeDisabled()
    })

    it('enables add to cart button when quantity > 0 and not disabled', () => {
      // Arrange
      render(<CardActions {...mockProps} disabled={false} />)

      // Act
      fireEvent.click(screen.getByTestId('increase-button'))

      // Assert
      expect(screen.getByTestId('add-to-cart-button')).not.toBeDisabled()
    })

    it('keeps add to cart button disabled when disabled=true even with quantity > 0', () => {
      // Arrange
      mockSecureAuth.auth.canAddToCart = false
      render(<CardActions {...mockProps} disabled={true} />)

      // Act - Try to increase quantity (should not work)
      fireEvent.click(screen.getByTestId('increase-button'))

      // Assert
      expect(screen.getByTestId('add-to-cart-button')).toBeDisabled()
      expect(screen.getByTestId('quantity-display')).toHaveTextContent('0')
    })
  })

  // Test prop variations
  describe('Prop variations', () => {
    it('handles undefined onAddToCart callback', async () => {
      // Arrange
      render(<CardActions product={mockProduct} />)
      fireEvent.click(screen.getByTestId('increase-button'))

      // Act
      fireEvent.click(screen.getByTestId('add-to-cart-button'))

      // Assert - Should show error toast when onAddToCart is not provided
      await waitFor(() => {
        expect(toast.error).toHaveBeenCalled()
      })
    })

    it('works with different product values', async () => {
      // Arrange
      const customProduct: CampaignProduct = {
        ...mockProduct,
        stock_id: 'custom-stock-456',
      }
      const mockOnAddToCart = jest.fn()
      render(
        <CardActions product={customProduct} onAddToCart={mockOnAddToCart} />
      )

      // Act
      fireEvent.click(screen.getByTestId('increase-button'))
      fireEvent.click(screen.getByTestId('add-to-cart-button'))

      // Assert
      await waitFor(() => {
        expect(mockOnAddToCart).toHaveBeenCalledWith(customProduct, 1)
      })
    })

    it('handles missing onAddToCart gracefully', async () => {
      // Arrange
      render(<CardActions product={mockProduct} />)

      // Act
      fireEvent.click(screen.getByTestId('increase-button'))
      fireEvent.click(screen.getByTestId('add-to-cart-button'))

      // Assert - Should show error toast when onAddToCart is not provided
      await waitFor(() => {
        expect(toast.error).toHaveBeenCalled()
      })
    })
  })

  // Test complete user workflow
  describe('Complete user workflow', () => {
    it('handles complete add to cart workflow', async () => {
      // Arrange
      const mockOnAddToCart = jest.fn()
      render(<CardActions {...mockProps} onAddToCart={mockOnAddToCart} />)

      // Act - User adds quantity
      fireEvent.click(screen.getByTestId('increase-button'))
      fireEvent.click(screen.getByTestId('increase-button'))

      // Act - User adds to cart
      fireEvent.click(screen.getByTestId('add-to-cart-button'))

      // Assert
      await waitFor(() => {
        expect(mockOnAddToCart).toHaveBeenCalledWith(mockProduct, 2)
        expect(screen.getByTestId('quantity-display')).toHaveTextContent('0')
      })
    })
  })

  // Test authentication scenarios
  describe('Authentication scenarios', () => {
    it('disables quantity controls when user cannot add to cart', () => {
      // Arrange
      mockSecureAuth.isAuthenticated = false
      mockSecureAuth.auth.canAddToCart = false

      render(<CardActions {...mockProps} />)

      // Assert - The quantity counter should be disabled
      expect(screen.getByTestId('quantity-counter')).toHaveAttribute(
        'data-disabled',
        'true'
      )
      expect(screen.getByTestId('quantity-counter')).toHaveAttribute(
        'data-can-modify',
        'false'
      )
      expect(screen.getByTestId('increase-button')).toBeDisabled()
      expect(screen.getByTestId('decrease-button')).toBeDisabled()
    })

    it('enables quantity controls when user can add to cart', () => {
      // Arrange
      mockSecureAuth.isAuthenticated = true
      mockSecureAuth.auth.canAddToCart = true
      mockSecureAuth.auth.activeCustomerId = 'customer-123'

      render(<CardActions {...mockProps} />)

      // Assert - The quantity counter should be enabled
      expect(screen.getByTestId('quantity-counter')).toHaveAttribute(
        'data-disabled',
        'false'
      )
      expect(screen.getByTestId('quantity-counter')).toHaveAttribute(
        'data-can-modify',
        'true'
      )
      expect(screen.getByTestId('increase-button')).not.toBeDisabled()
      expect(screen.getByTestId('decrease-button')).not.toBeDisabled()
    })

    it('shows existing cart quantity when item is in cart', () => {
      // Arrange
      mockFindCartItem.mockReturnValue({ quantity: 5 })

      // Act
      render(<CardActions {...mockProps} />)

      // Assert
      expect(screen.getByText('Add to Cart (5 in cart)')).toBeInTheDocument()
    })
  })
})
