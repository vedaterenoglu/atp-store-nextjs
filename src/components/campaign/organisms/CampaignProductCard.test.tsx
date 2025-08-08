/**
 * Unit tests for CampaignProductCard component
 * SOLID Principles: SRP - Single responsibility for campaign product card testing
 * Design Patterns: AAA (Arrange, Act, Assert) Testing Pattern
 * Dependencies: React Testing Library, Jest
 */

import { render, screen } from '@testing-library/react'
import { CampaignProductCard } from './CampaignProductCard'
import type { CampaignProduct } from '@/types/campaign'

// Mock shadcn/ui Card components
interface MockCardProps {
  children: React.ReactNode
  className?: string
}

jest.mock('@/components/ui/schadcn/card', () => ({
  Card: ({ children, className }: MockCardProps) => (
    <div data-testid="card" className={className}>
      {children}
    </div>
  ),
  CardContent: ({ children, className }: MockCardProps) => (
    <div data-testid="card-content" className={className}>
      {children}
    </div>
  ),
  CardFooter: ({ children, className }: MockCardProps) => (
    <div data-testid="card-footer" className={className}>
      {children}
    </div>
  ),
}))

// Mock atoms
interface MockDiscountBadgeProps {
  originalPrice: number
  discountedPrice: number
}

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

// Mock molecules
interface MockProductImageProps {
  src: string
  alt: string
}

interface MockProductInfoProps {
  stock_name: string
  stock_group: string
  stock_id: string
  stock_unit: string
}

interface MockPriceDisplayProps {
  stock_price: number
  campaign_price: number
}

interface MockCardActionsProps {
  stockId: string
  disabled: boolean
  onAddToCart?: (stockId: string, quantity: number) => void
  className?: string
}

jest.mock('../molecules', () => ({
  ProductImage: ({ src, alt }: MockProductImageProps) => (
    <div data-testid="product-image" data-src={src} data-alt={alt}>
      Product Image
    </div>
  ),
  ProductInfo: ({
    stock_name,
    stock_group,
    stock_id,
    stock_unit,
  }: MockProductInfoProps) => (
    <div
      data-testid="product-info"
      data-stock-name={stock_name}
      data-stock-group={stock_group}
      data-stock-id={stock_id}
      data-stock-unit={stock_unit}
    >
      Product Info
    </div>
  ),
  PriceDisplay: ({ stock_price, campaign_price }: MockPriceDisplayProps) => (
    <div
      data-testid="price-display"
      data-stock-price={stock_price}
      data-campaign-price={campaign_price}
    >
      Price Display
    </div>
  ),
  CardActions: ({
    stockId,
    disabled,
    onAddToCart,
    className,
  }: MockCardActionsProps) => (
    <div
      data-testid="card-actions"
      data-stock-id={stockId}
      data-disabled={disabled}
      data-has-callback={!!onAddToCart}
      className={className}
    >
      <button onClick={() => onAddToCart?.(stockId, 1)}>Add to Cart</button>
    </div>
  ),
}))

describe('CampaignProductCard', () => {
  const mockProduct: CampaignProduct = {
    stock_id: 'PROD-123',
    stock_name: 'Test Product',
    stock_group: 'Electronics',
    stock_image_link: 'https://example.com/product.jpg',
    stock_unit: 'pcs',
    stock_price: 10000, // 100.00 SEK
    campaign_price: 8000, // 80.00 SEK
    discount_percentage: 20,
  }

  const mockOnAddToCart = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Basic Rendering', () => {
    it('renders all product components correctly', () => {
      render(<CampaignProductCard product={mockProduct} />)

      expect(screen.getByTestId('card')).toBeInTheDocument()
      expect(screen.getByTestId('product-image')).toBeInTheDocument()
      expect(screen.getByTestId('product-info')).toBeInTheDocument()
      expect(screen.getByTestId('price-display')).toBeInTheDocument()
      expect(screen.getByTestId('card-actions')).toBeInTheDocument()
    })

    it('applies custom className to card', () => {
      const customClass = 'custom-card-class'
      render(
        <CampaignProductCard product={mockProduct} className={customClass} />
      )

      const card = screen.getByTestId('card')
      expect(card).toHaveClass(customClass)
    })

    it('applies default className when not provided', () => {
      render(<CampaignProductCard product={mockProduct} />)

      const card = screen.getByTestId('card')
      expect(card).toHaveClass(
        'relative',
        'overflow-hidden',
        'transition-shadow',
        'hover:shadow-lg'
      )
    })
  })

  describe('Discount Badge Display', () => {
    it('shows discount badge when campaign price is lower than stock price', () => {
      render(<CampaignProductCard product={mockProduct} />)

      const badge = screen.getByTestId('discount-badge')
      expect(badge).toBeInTheDocument()
      expect(badge).toHaveAttribute('data-original-price', '10000')
      expect(badge).toHaveAttribute('data-discounted-price', '8000')
    })

    it('shows discount badge when campaign price equals stock price', () => {
      const productWithEqualPrices = {
        ...mockProduct,
        campaign_price: 10000,
        stock_price: 10000,
      }
      render(<CampaignProductCard product={productWithEqualPrices} />)

      expect(screen.getByTestId('discount-badge')).toBeInTheDocument()
    })

    it('does not show discount badge when campaign price is higher than stock price', () => {
      const productWithHigherCampaignPrice = {
        ...mockProduct,
        campaign_price: 12000,
        stock_price: 10000,
      }
      render(<CampaignProductCard product={productWithHigherCampaignPrice} />)

      expect(screen.queryByTestId('discount-badge')).not.toBeInTheDocument()
    })
  })

  describe('Product Image', () => {
    it('passes correct props to ProductImage component', () => {
      render(<CampaignProductCard product={mockProduct} />)

      const image = screen.getByTestId('product-image')
      expect(image).toHaveAttribute(
        'data-src',
        'https://example.com/product.jpg'
      )
      expect(image).toHaveAttribute('data-alt', 'Test Product')
    })

    it('renders image container with correct styling', () => {
      render(<CampaignProductCard product={mockProduct} />)

      const imageContainer = screen.getByTestId('product-image').parentElement
      expect(imageContainer).toHaveClass(
        'relative',
        'aspect-[3/2]',
        'bg-secondary/10'
      )
    })
  })

  describe('Product Info', () => {
    it('passes all product info props correctly', () => {
      render(<CampaignProductCard product={mockProduct} />)

      const info = screen.getByTestId('product-info')
      expect(info).toHaveAttribute('data-stock-name', 'Test Product')
      expect(info).toHaveAttribute('data-stock-group', 'Electronics')
      expect(info).toHaveAttribute('data-stock-id', 'PROD-123')
      expect(info).toHaveAttribute('data-stock-unit', 'pcs')
    })
  })

  describe('Price Display', () => {
    it('passes price props correctly', () => {
      render(<CampaignProductCard product={mockProduct} />)

      const priceDisplay = screen.getByTestId('price-display')
      expect(priceDisplay).toHaveAttribute('data-stock-price', '10000')
      expect(priceDisplay).toHaveAttribute('data-campaign-price', '8000')
    })
  })

  describe('Card Actions', () => {
    it('passes stockId and disabled props to CardActions', () => {
      render(<CampaignProductCard product={mockProduct} />)

      const actions = screen.getByTestId('card-actions')
      expect(actions).toHaveAttribute('data-stock-id', 'PROD-123')
      expect(actions).toHaveAttribute('data-disabled', 'false')
      expect(actions).toHaveClass('w-full')
    })

    it('passes onAddToCart callback when provided', () => {
      render(
        <CampaignProductCard
          product={mockProduct}
          onAddToCart={mockOnAddToCart}
        />
      )

      const actions = screen.getByTestId('card-actions')
      expect(actions).toHaveAttribute('data-has-callback', 'true')
    })

    it('does not pass onAddToCart when not provided', () => {
      render(<CampaignProductCard product={mockProduct} />)

      const actions = screen.getByTestId('card-actions')
      expect(actions).toHaveAttribute('data-has-callback', 'false')
    })

    it('calls onAddToCart with correct parameters when button clicked', () => {
      render(
        <CampaignProductCard
          product={mockProduct}
          onAddToCart={mockOnAddToCart}
        />
      )

      const button = screen.getByText('Add to Cart')
      button.click()

      expect(mockOnAddToCart).toHaveBeenCalledWith('PROD-123', 1)
    })
  })

  describe('Component Structure', () => {
    it('renders CardContent with correct styling', () => {
      render(<CampaignProductCard product={mockProduct} />)

      const content = screen.getByTestId('card-content')
      expect(content).toHaveClass('p-4', 'space-y-4')
    })

    it('renders CardFooter with correct styling', () => {
      render(<CampaignProductCard product={mockProduct} />)

      const footer = screen.getByTestId('card-footer')
      expect(footer).toHaveClass('p-4', 'pt-0')
    })
  })

  describe('Edge Cases', () => {
    it('handles product with zero prices', () => {
      const freeProduct = {
        ...mockProduct,
        stock_price: 0,
        campaign_price: 0,
      }
      render(<CampaignProductCard product={freeProduct} />)

      expect(screen.getByTestId('price-display')).toHaveAttribute(
        'data-stock-price',
        '0'
      )
      expect(screen.getByTestId('price-display')).toHaveAttribute(
        'data-campaign-price',
        '0'
      )
      expect(screen.getByTestId('discount-badge')).toBeInTheDocument()
    })

    it('handles product with very long names', () => {
      const longNameProduct = {
        ...mockProduct,
        stock_name: 'A'.repeat(200),
      }
      render(<CampaignProductCard product={longNameProduct} />)

      const image = screen.getByTestId('product-image')
      const info = screen.getByTestId('product-info')
      expect(image).toHaveAttribute('data-alt', 'A'.repeat(200))
      expect(info).toHaveAttribute('data-stock-name', 'A'.repeat(200))
    })

    it('handles product with special characters in name', () => {
      const specialProduct = {
        ...mockProduct,
        stock_name: 'Product™ & Co. <Special>',
      }
      render(<CampaignProductCard product={specialProduct} />)

      const info = screen.getByTestId('product-info')
      expect(info).toHaveAttribute(
        'data-stock-name',
        'Product™ & Co. <Special>'
      )
    })
  })
})
