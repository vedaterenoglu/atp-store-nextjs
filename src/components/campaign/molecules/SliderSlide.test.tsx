/**
 * Unit tests for SliderSlide component
 * SOLID Principles: SRP - Single responsibility for slider slide testing
 * Design Patterns: AAA (Arrange, Act, Assert) Testing Pattern
 * Dependencies: React Testing Library, Jest, Next.js Image mock
 */

import { render, screen, fireEvent } from '@testing-library/react'
import { SliderSlide } from './SliderSlide'
import type { CampaignProduct } from '@/types/campaign'

interface MockImageProps {
  src?: string
  alt?: string
  className?: string
  fill?: boolean
  sizes?: string
  priority?: boolean
  [key: string]: unknown
}

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockImage({
    src,
    alt,
    className,
    fill,
    sizes,
    priority,
    ...props
  }: MockImageProps) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className={className}
        data-fill={fill}
        data-sizes={sizes}
        data-priority={priority}
        data-testid="product-image"
        {...props}
      />
    )
  }
})

interface MockDiscountBadgeProps {
  originalPrice: number
  discountedPrice: number
}

// Mock DiscountBadge component
jest.mock('../atoms', () => ({
  DiscountBadge: ({
    originalPrice,
    discountedPrice,
  }: MockDiscountBadgeProps) => (
    <div
      data-testid="discount-badge"
      data-original-price={originalPrice}
      data-discounted-price={discountedPrice}
    >
      Discount Badge
    </div>
  ),
}))

interface MockSliderOverlayProps {
  stock_name: string
  stock_unit: string
  stock_price: number
  campaign_price: number
}

// Mock SliderOverlay component
jest.mock('./SliderOverlay', () => ({
  SliderOverlay: ({
    stock_name,
    stock_unit,
    stock_price,
    campaign_price,
  }: MockSliderOverlayProps) => (
    <div
      data-testid="slider-overlay"
      data-stock-name={stock_name}
      data-stock-unit={stock_unit}
      data-stock-price={stock_price}
      data-campaign-price={campaign_price}
    >
      Slider Overlay
    </div>
  ),
}))

describe('SliderSlide', () => {
  const mockProduct: CampaignProduct = {
    stock_id: 'PROD-123',
    stock_name: 'Test Product',
    stock_group: 'Electronics',
    stock_image_link: 'https://example.com/product-image.jpg',
    stock_unit: 'pcs',
    stock_price: 10000, // 100.00 SEK in öre
    campaign_price: 8000, // 80.00 SEK in öre
    discount_percentage: 20,
  }

  const mockProps = {
    product: mockProduct,
    onClick: jest.fn(),
    className: '',
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  // Test basic rendering
  describe('Basic rendering', () => {
    it('renders product image with correct props', () => {
      // Arrange & Act
      render(<SliderSlide {...mockProps} />)

      // Assert
      const image = screen.getByTestId('product-image')
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute(
        'src',
        'https://example.com/product-image.jpg'
      )
      expect(image).toHaveAttribute('alt', 'Test Product')
      expect(image).toHaveAttribute('data-fill', 'true')
      expect(image).toHaveAttribute('data-priority', 'true')
    })

    it('renders slider overlay with correct props', () => {
      // Arrange & Act
      render(<SliderSlide {...mockProps} />)

      // Assert
      const overlay = screen.getByTestId('slider-overlay')
      expect(overlay).toBeInTheDocument()
      expect(overlay).toHaveAttribute('data-stock-name', 'Test Product')
      expect(overlay).toHaveAttribute('data-stock-unit', 'pcs')
      expect(overlay).toHaveAttribute('data-stock-price', '10000')
      expect(overlay).toHaveAttribute('data-campaign-price', '8000')
    })

    it('applies default container styling', () => {
      // Arrange & Act
      render(<SliderSlide {...mockProps} />)

      // Assert
      const container = screen
        .getByTestId('product-image')
        .closest('div')?.parentElement
      expect(container).toHaveClass(
        'relative',
        'w-full',
        'h-full',
        'cursor-pointer'
      )
    })

    it('applies custom className', () => {
      // Arrange
      const customClassName = 'custom-slide-class'

      // Act
      render(<SliderSlide {...mockProps} className={customClassName} />)

      // Assert
      const container = screen
        .getByTestId('product-image')
        .closest('div')?.parentElement
      expect(container).toHaveClass(customClassName)
    })

    it('applies default empty className when none provided', () => {
      // Arrange
      const { className, ...propsWithoutClassName } = mockProps
      void className // Intentionally unused - testing default behavior

      // Act
      render(<SliderSlide {...propsWithoutClassName} />)

      // Assert
      const container = screen
        .getByTestId('product-image')
        .closest('div')?.parentElement
      expect(container).toHaveClass(
        'relative',
        'w-full',
        'h-full',
        'cursor-pointer'
      )
    })
  })

  // Test discount badge rendering
  describe('Discount badge rendering', () => {
    it('renders discount badge when campaign price is lower than stock price', () => {
      // Arrange & Act
      render(<SliderSlide {...mockProps} />)

      // Assert
      const badge = screen.getByTestId('discount-badge')
      expect(badge).toBeInTheDocument()
      expect(badge).toHaveAttribute('data-original-price', '10000')
      expect(badge).toHaveAttribute('data-discounted-price', '8000')
    })

    it('renders discount badge when campaign price equals stock price', () => {
      // Arrange
      const productWithEqualPrices = {
        ...mockProduct,
        campaign_price: 10000, // Same as stock_price
      }

      // Act
      render(<SliderSlide product={productWithEqualPrices} />)

      // Assert
      expect(screen.getByTestId('discount-badge')).toBeInTheDocument()
    })

    it('does not render discount badge when campaign price is higher than stock price', () => {
      // Arrange
      const productWithHigherCampaignPrice = {
        ...mockProduct,
        campaign_price: 12000, // Higher than stock_price
      }

      // Act
      render(<SliderSlide product={productWithHigherCampaignPrice} />)

      // Assert
      expect(screen.queryByTestId('discount-badge')).not.toBeInTheDocument()
    })

    it('handles zero campaign price (free product)', () => {
      // Arrange
      const freeProduct = {
        ...mockProduct,
        campaign_price: 0,
      }

      // Act
      render(<SliderSlide product={freeProduct} />)

      // Assert
      const badge = screen.getByTestId('discount-badge')
      expect(badge).toBeInTheDocument()
      expect(badge).toHaveAttribute('data-discounted-price', '0')
    })
  })

  // Test click functionality
  describe('Click functionality', () => {
    it('calls onClick when slide is clicked', () => {
      // Arrange
      const mockOnClick = jest.fn()
      render(<SliderSlide {...mockProps} onClick={mockOnClick} />)

      // Act
      const container = screen
        .getByTestId('product-image')
        .closest('div')?.parentElement
      fireEvent.click(container!)

      // Assert
      expect(mockOnClick).toHaveBeenCalledTimes(1)
    })

    it('does not call onClick when onClick is not provided', () => {
      // Arrange
      const { onClick, ...propsWithoutOnClick } = mockProps
      void onClick // Intentionally unused - testing without callback

      // Act & Assert - Should not throw error
      expect(() => {
        render(<SliderSlide {...propsWithoutOnClick} />)
        const container = screen
          .getByTestId('product-image')
          .closest('div')?.parentElement
        fireEvent.click(container!)
      }).not.toThrow()
    })

    it('handles multiple clicks', () => {
      // Arrange
      const mockOnClick = jest.fn()
      render(<SliderSlide {...mockProps} onClick={mockOnClick} />)
      const container = screen
        .getByTestId('product-image')
        .closest('div')?.parentElement

      // Act
      fireEvent.click(container!)
      fireEvent.click(container!)
      fireEvent.click(container!)

      // Assert
      expect(mockOnClick).toHaveBeenCalledTimes(3)
    })

    it('maintains cursor pointer styling for clickable area', () => {
      // Arrange & Act
      render(<SliderSlide {...mockProps} />)

      // Assert
      const container = screen
        .getByTestId('product-image')
        .closest('div')?.parentElement
      expect(container).toHaveClass('cursor-pointer')
    })
  })

  // Test image properties and configuration
  describe('Image properties and configuration', () => {
    it('configures image with fill and priority properties', () => {
      // Arrange & Act
      render(<SliderSlide {...mockProps} />)

      // Assert
      const image = screen.getByTestId('product-image')
      expect(image).toHaveAttribute('data-fill', 'true')
      expect(image).toHaveAttribute('data-priority', 'true')
    })

    it('applies object-cover class to image', () => {
      // Arrange & Act
      render(<SliderSlide {...mockProps} />)

      // Assert
      const image = screen.getByTestId('product-image')
      expect(image).toHaveClass('object-cover')
    })

    it('sets responsive sizes attribute', () => {
      // Arrange & Act
      render(<SliderSlide {...mockProps} />)

      // Assert
      const image = screen.getByTestId('product-image')
      expect(image).toHaveAttribute(
        'data-sizes',
        '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px'
      )
    })

    it('uses product image link as src', () => {
      // Arrange
      const customImageLink = 'https://example.com/custom-image.png'
      const productWithCustomImage = {
        ...mockProduct,
        stock_image_link: customImageLink,
      }

      // Act
      render(<SliderSlide product={productWithCustomImage} />)

      // Assert
      const image = screen.getByTestId('product-image')
      expect(image).toHaveAttribute('src', customImageLink)
    })

    it('uses product name as alt text', () => {
      // Arrange
      const customProductName = 'Custom Product Name'
      const productWithCustomName = {
        ...mockProduct,
        stock_name: customProductName,
      }

      // Act
      render(<SliderSlide product={productWithCustomName} />)

      // Assert
      const image = screen.getByTestId('product-image')
      expect(image).toHaveAttribute('alt', customProductName)
    })
  })

  // Test component structure
  describe('Component structure', () => {
    it('has correct nested structure', () => {
      // Arrange & Act
      render(<SliderSlide {...mockProps} />)

      // Assert
      // Main container
      const container = screen
        .getByTestId('product-image')
        .closest('div')?.parentElement
      expect(container).toHaveClass(
        'relative',
        'w-full',
        'h-full',
        'cursor-pointer'
      )

      // Image container
      const imageContainer = screen.getByTestId('product-image').parentElement
      expect(imageContainer).toHaveClass('relative', 'w-full', 'h-full')

      // Image
      const image = screen.getByTestId('product-image')
      expect(image).toBeInTheDocument()

      // Overlay
      const overlay = screen.getByTestId('slider-overlay')
      expect(overlay).toBeInTheDocument()
    })

    it('renders all elements when discount exists', () => {
      // Arrange & Act
      render(<SliderSlide {...mockProps} />)

      // Assert
      expect(screen.getByTestId('product-image')).toBeInTheDocument()
      expect(screen.getByTestId('discount-badge')).toBeInTheDocument()
      expect(screen.getByTestId('slider-overlay')).toBeInTheDocument()
    })

    it('renders without discount badge when no discount', () => {
      // Arrange
      const productWithNoDiscount = {
        ...mockProduct,
        campaign_price: 12000, // Higher than stock_price
      }

      // Act
      render(<SliderSlide product={productWithNoDiscount} />)

      // Assert
      expect(screen.getByTestId('product-image')).toBeInTheDocument()
      expect(screen.queryByTestId('discount-badge')).not.toBeInTheDocument()
      expect(screen.getByTestId('slider-overlay')).toBeInTheDocument()
    })
  })

  // Test different product variations
  describe('Product variations', () => {
    it('handles different product properties', () => {
      // Arrange
      const customProduct: CampaignProduct = {
        stock_id: 'CUSTOM-456',
        stock_name: 'Custom Product Name',
        stock_group: 'Home & Garden',
        stock_image_link: 'https://example.com/custom.jpg',
        stock_unit: 'boxes',
        stock_price: 25000, // 250.00 SEK
        campaign_price: 20000, // 200.00 SEK
        discount_percentage: 20,
      }

      // Act
      render(<SliderSlide product={customProduct} />)

      // Assert
      const image = screen.getByTestId('product-image')
      expect(image).toHaveAttribute('src', 'https://example.com/custom.jpg')
      expect(image).toHaveAttribute('alt', 'Custom Product Name')

      const overlay = screen.getByTestId('slider-overlay')
      expect(overlay).toHaveAttribute('data-stock-name', 'Custom Product Name')
      expect(overlay).toHaveAttribute('data-stock-unit', 'boxes')
      expect(overlay).toHaveAttribute('data-stock-price', '25000')
      expect(overlay).toHaveAttribute('data-campaign-price', '20000')
    })

    it('handles products with special characters in names', () => {
      // Arrange
      const productWithSpecialChars = {
        ...mockProduct,
        stock_name: 'Product™ with åäö & <symbols>',
      }

      // Act
      render(<SliderSlide product={productWithSpecialChars} />)

      // Assert
      const image = screen.getByTestId('product-image')
      expect(image).toHaveAttribute('alt', 'Product™ with åäö & <symbols>')
    })

    it('handles products with empty or minimal data', () => {
      // Arrange
      const minimalProduct: CampaignProduct = {
        stock_id: '',
        stock_name: '',
        stock_group: '',
        stock_image_link: '/placeholder.jpg', // Use non-empty src to avoid console warnings
        stock_unit: '',
        stock_price: 0,
        campaign_price: 0,
      }

      // Act
      render(<SliderSlide product={minimalProduct} />)

      // Assert
      expect(screen.getByTestId('product-image')).toHaveAttribute(
        'src',
        '/placeholder.jpg'
      )
      expect(screen.getByTestId('product-image')).toHaveAttribute('alt', '')
    })
  })

  // Test prop combinations
  describe('Prop combinations', () => {
    it('works with all props provided', () => {
      // Arrange
      const mockOnClick = jest.fn()
      const allProps = {
        product: mockProduct,
        onClick: mockOnClick,
        className: 'test-slide-class',
      }

      // Act
      render(<SliderSlide {...allProps} />)

      // Assert
      const container = screen
        .getByTestId('product-image')
        .closest('div')?.parentElement
      expect(container).toHaveClass('test-slide-class')
      expect(screen.getByTestId('product-image')).toBeInTheDocument()
      expect(screen.getByTestId('discount-badge')).toBeInTheDocument()
      expect(screen.getByTestId('slider-overlay')).toBeInTheDocument()

      // Test click functionality
      fireEvent.click(container!)
      expect(mockOnClick).toHaveBeenCalled()
    })

    it('works with minimal props (product only)', () => {
      // Arrange & Act
      render(<SliderSlide product={mockProduct} />)

      // Assert
      expect(screen.getByTestId('product-image')).toBeInTheDocument()
      expect(screen.getByTestId('slider-overlay')).toBeInTheDocument()
    })
  })

  // Test accessibility
  describe('Accessibility', () => {
    it('provides proper alt text for image', () => {
      // Arrange & Act
      render(<SliderSlide {...mockProps} />)

      // Assert
      const image = screen.getByTestId('product-image')
      expect(image).toHaveAttribute('alt', 'Test Product')
    })

    it('maintains clickable area for keyboard users', () => {
      // Arrange & Act
      render(<SliderSlide {...mockProps} />)

      // Assert
      const container = screen
        .getByTestId('product-image')
        .closest('div')?.parentElement
      expect(container).toHaveClass('cursor-pointer')
    })

    it('handles missing alt text gracefully', () => {
      // Arrange
      const productWithoutName = {
        ...mockProduct,
        stock_name: '',
      }

      // Act
      render(<SliderSlide product={productWithoutName} />)

      // Assert
      const image = screen.getByTestId('product-image')
      expect(image).toHaveAttribute('alt', '')
    })
  })

  // Test edge cases
  describe('Edge cases', () => {
    it('handles very large price values', () => {
      // Arrange
      const productWithLargePrices = {
        ...mockProduct,
        stock_price: 999999999, // Very large number
        campaign_price: 888888888,
      }

      // Act
      render(<SliderSlide product={productWithLargePrices} />)

      // Assert
      const overlay = screen.getByTestId('slider-overlay')
      expect(overlay).toHaveAttribute('data-stock-price', '999999999')
      expect(overlay).toHaveAttribute('data-campaign-price', '888888888')
    })

    it('handles negative price values', () => {
      // Arrange
      const productWithNegativePrices = {
        ...mockProduct,
        stock_price: -1000,
        campaign_price: -800,
      }

      // Act
      render(<SliderSlide product={productWithNegativePrices} />)

      // Assert - Should not crash
      expect(screen.getByTestId('slider-overlay')).toBeInTheDocument()
    })

    it('handles very long image URLs', () => {
      // Arrange
      const longUrl =
        'https://example.com/' + 'very-long-path/'.repeat(50) + 'image.jpg'
      const productWithLongUrl = {
        ...mockProduct,
        stock_image_link: longUrl,
      }

      // Act
      render(<SliderSlide product={productWithLongUrl} />)

      // Assert
      const image = screen.getByTestId('product-image')
      expect(image).toHaveAttribute('src', longUrl)
    })
  })
})
