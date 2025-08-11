/**
 * Unit tests for CampaignProductsGrid component
 * SOLID Principles: SRP - Single responsibility for campaign products grid testing
 * Design Patterns: AAA (Arrange, Act, Assert) Testing Pattern
 * Dependencies: React Testing Library, Jest
 */

import { render, screen } from '@testing-library/react'
import { CampaignProductsGrid } from '../CampaignProductsGrid'
import type { CampaignProduct } from '@/types/campaign'

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'messages.noCampaigns': 'No campaigns available',
        'messages.checkBackSoon': 'Please check back soon',
      }
      return translations[key] || key
    },
  }),
}))

// Mock CampaignProductCard
jest.mock('../CampaignProductCard', () => ({
  CampaignProductCard: jest.fn(({ product, onAddToCart }: any) => (
    <div
      data-testid={`product-card-${product.stock_id}`}
      data-product-id={product.stock_id}
      data-has-callback={!!onAddToCart}
    >
      Product Card: {product.stock_name}
    </div>
  )),
}))

// Mock molecules
jest.mock('../../molecules', () => ({
  CampaignCardSkeleton: jest.fn(() => (
    <div data-testid="skeleton">Loading Skeleton</div>
  )),
  CampaignErrorBoundary: jest.fn(({ children, onRetry }: any) => (
    <div data-testid="error-boundary" data-has-retry={!!onRetry}>
      {children}
    </div>
  )),
  CampaignGridError: jest.fn(({ error, onRetry }: any) => (
    <div data-testid="grid-error" data-has-retry={!!onRetry}>
      <span>Error: {error.message}</span>
      {onRetry && <button onClick={onRetry}>Retry</button>}
    </div>
  )),
}))

describe('CampaignProductsGrid', () => {
  const mockProducts: CampaignProduct[] = [
    {
      stock_id: 'PROD-1',
      stock_name: 'Product 1',
      stock_group: 'Group A',
      stock_image_link: 'https://example.com/1.jpg',
      stock_unit: 'pcs',
      stock_price: 10000,
      campaign_price: 8000,
      discount_percentage: 20,
    },
    {
      stock_id: 'PROD-2',
      stock_name: 'Product 2',
      stock_group: 'Group B',
      stock_image_link: 'https://example.com/2.jpg',
      stock_unit: 'kg',
      stock_price: 5000,
      campaign_price: 4000,
      discount_percentage: 20,
    },
    {
      stock_id: 'PROD-3',
      stock_name: 'Product 3',
      stock_group: 'Group C',
      stock_image_link: 'https://example.com/3.jpg',
      stock_unit: 'l',
      stock_price: 2000,
      campaign_price: 1500,
      discount_percentage: 25,
    },
  ]

  const mockOnAddToCart = jest.fn()
  const mockOnRetry = jest.fn()
  const mockError = new Error('Test error message')

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Loading State', () => {
    it('renders skeleton cards when loading', () => {
      render(<CampaignProductsGrid isLoading={true} />)

      const skeletons = screen.getAllByTestId('skeleton')
      expect(skeletons).toHaveLength(6) // Default skeleton count
    })

    it('renders custom number of skeleton cards', () => {
      render(<CampaignProductsGrid isLoading={true} skeletonCount={3} />)

      const skeletons = screen.getAllByTestId('skeleton')
      expect(skeletons).toHaveLength(3)
    })

    it('applies grid layout classes when loading', () => {
      render(<CampaignProductsGrid isLoading={true} />)

      const grid = screen.getAllByTestId('skeleton')[0]?.parentElement
      expect(grid).toHaveClass(
        'grid',
        'grid-cols-1',
        'md:grid-cols-2',
        'lg:grid-cols-3',
        'gap-6'
      )
    })

    it('applies custom className when loading', () => {
      render(<CampaignProductsGrid isLoading={true} className="custom-class" />)

      const grid = screen.getAllByTestId('skeleton')[0]?.parentElement
      expect(grid).toHaveClass('custom-class')
    })

    it('does not show error when loading even if error exists', () => {
      render(<CampaignProductsGrid isLoading={true} error={mockError} />)

      expect(screen.queryByTestId('grid-error')).not.toBeInTheDocument()
      expect(screen.getAllByTestId('skeleton')).toHaveLength(6)
    })
  })

  describe('Error State', () => {
    it('renders error component when error exists and not loading', () => {
      render(<CampaignProductsGrid error={mockError} />)

      const errorComponent = screen.getByTestId('grid-error')
      expect(errorComponent).toBeInTheDocument()
      expect(screen.getByText('Error: Test error message')).toBeInTheDocument()
    })

    it('passes onRetry callback to error component', () => {
      render(<CampaignProductsGrid error={mockError} onRetry={mockOnRetry} />)

      const errorComponent = screen.getByTestId('grid-error')
      expect(errorComponent).toHaveAttribute('data-has-retry', 'true')

      const retryButton = screen.getByText('Retry')
      retryButton.click()
      expect(mockOnRetry).toHaveBeenCalledTimes(1)
    })

    it('does not pass onRetry when not provided', () => {
      render(<CampaignProductsGrid error={mockError} />)

      const errorComponent = screen.getByTestId('grid-error')
      expect(errorComponent).toHaveAttribute('data-has-retry', 'false')
    })

    it('applies custom className to error container', () => {
      render(
        <CampaignProductsGrid error={mockError} className="error-custom" />
      )

      const container = screen.getByTestId('grid-error').parentElement
      expect(container).toHaveClass('w-full', 'error-custom')
    })
  })

  describe('Empty State', () => {
    it('renders empty state when products array is empty', () => {
      render(<CampaignProductsGrid products={[]} />)

      expect(screen.getByText('No campaigns available')).toBeInTheDocument()
      expect(screen.getByText('Please check back soon')).toBeInTheDocument()
    })

    it('renders empty state when products is undefined', () => {
      render(<CampaignProductsGrid />)

      expect(screen.getByText('No campaigns available')).toBeInTheDocument()
      expect(screen.getByText('Please check back soon')).toBeInTheDocument()
    })

    it('applies correct styling to empty state', () => {
      render(<CampaignProductsGrid products={[]} />)

      const emptyContainer = screen.getByText(
        'No campaigns available'
      ).parentElement
      expect(emptyContainer).toHaveClass('text-center', 'py-12')

      const heading = screen.getByText('No campaigns available')
      expect(heading).toHaveClass('text-lg', 'font-semibold', 'mb-2')

      const description = screen.getByText('Please check back soon')
      expect(description).toHaveClass('text-muted-foreground')
    })

    it('applies custom className to empty state container', () => {
      render(<CampaignProductsGrid products={[]} className="empty-custom" />)

      const container = screen
        .getByText('No campaigns available')
        .closest('.w-full')
      expect(container).toHaveClass('w-full', 'empty-custom')
    })
  })

  describe('Products Display', () => {
    it('renders all product cards', () => {
      render(<CampaignProductsGrid products={mockProducts} />)

      expect(screen.getByTestId('product-card-PROD-1')).toBeInTheDocument()
      expect(screen.getByTestId('product-card-PROD-2')).toBeInTheDocument()
      expect(screen.getByTestId('product-card-PROD-3')).toBeInTheDocument()
    })

    it('wraps products in error boundary', () => {
      render(<CampaignProductsGrid products={mockProducts} />)

      const errorBoundary = screen.getByTestId('error-boundary')
      expect(errorBoundary).toBeInTheDocument()

      const productCards = screen.getAllByTestId(/product-card-/)
      productCards.forEach(card => {
        expect(errorBoundary).toContainElement(card)
      })
    })

    it('passes onAddToCart to each product card', () => {
      render(
        <CampaignProductsGrid
          products={mockProducts}
          onAddToCart={mockOnAddToCart}
        />
      )

      const card1 = screen.getByTestId('product-card-PROD-1')
      const card2 = screen.getByTestId('product-card-PROD-2')
      const card3 = screen.getByTestId('product-card-PROD-3')

      expect(card1).toHaveAttribute('data-has-callback', 'true')
      expect(card2).toHaveAttribute('data-has-callback', 'true')
      expect(card3).toHaveAttribute('data-has-callback', 'true')
    })

    it('does not pass onAddToCart when not provided', () => {
      render(<CampaignProductsGrid products={mockProducts} />)

      const card1 = screen.getByTestId('product-card-PROD-1')
      expect(card1).toHaveAttribute('data-has-callback', 'false')
    })

    it('passes onRetry to error boundary when provided', () => {
      render(
        <CampaignProductsGrid products={mockProducts} onRetry={mockOnRetry} />
      )

      const errorBoundary = screen.getByTestId('error-boundary')
      expect(errorBoundary).toHaveAttribute('data-has-retry', 'true')
    })

    it('does not pass onRetry when not provided', () => {
      render(<CampaignProductsGrid products={mockProducts} />)

      const errorBoundary = screen.getByTestId('error-boundary')
      expect(errorBoundary).toHaveAttribute('data-has-retry', 'false')
    })

    it('applies grid layout classes', () => {
      render(<CampaignProductsGrid products={mockProducts} />)

      const grid = screen.getByTestId('product-card-PROD-1').parentElement
      expect(grid).toHaveClass(
        'grid',
        'grid-cols-1',
        'md:grid-cols-2',
        'lg:grid-cols-3',
        'gap-6'
      )
    })

    it('applies custom className to grid', () => {
      render(
        <CampaignProductsGrid
          products={mockProducts}
          className="products-custom"
        />
      )

      const grid = screen.getByTestId('product-card-PROD-1').parentElement
      expect(grid).toHaveClass('products-custom')
    })
  })

  describe('Edge Cases', () => {
    it('handles single product', () => {
      render(<CampaignProductsGrid products={[mockProducts[0]!]} />)

      expect(screen.getByTestId('product-card-PROD-1')).toBeInTheDocument()
      expect(
        screen.queryByTestId('product-card-PROD-2')
      ).not.toBeInTheDocument()
    })

    it('handles large number of products', () => {
      const manyProducts = Array.from({ length: 50 }, (_, i) => ({
        ...mockProducts[0]!,
        stock_id: `PROD-${i}`,
        stock_name: `Product ${i}`,
      }))

      render(<CampaignProductsGrid products={manyProducts} />)

      const cards = screen.getAllByTestId(/product-card-/)
      expect(cards).toHaveLength(50)
    })

    it('handles products with duplicate IDs (uses last occurrence)', () => {
      const duplicateProducts = [
        ...mockProducts,
        { ...mockProducts[0]!, stock_name: 'Duplicate Product' },
      ]

      render(<CampaignProductsGrid products={duplicateProducts} />)

      // React will use the key to identify unique elements
      const cards = screen.getAllByTestId(/product-card-/)
      expect(cards).toHaveLength(4) // All products rendered despite duplicate key
    })

    it('handles default props correctly', () => {
      render(<CampaignProductsGrid />)

      // Should show empty state with default props
      expect(screen.getByText('No campaigns available')).toBeInTheDocument()
    })

    it('prioritizes error over empty state', () => {
      render(<CampaignProductsGrid products={[]} error={mockError} />)

      expect(screen.getByTestId('grid-error')).toBeInTheDocument()
      expect(
        screen.queryByText('No campaigns available')
      ).not.toBeInTheDocument()
    })

    it('prioritizes loading over error', () => {
      render(<CampaignProductsGrid isLoading={true} error={mockError} />)

      expect(screen.getAllByTestId('skeleton')).toHaveLength(6)
      expect(screen.queryByTestId('grid-error')).not.toBeInTheDocument()
    })
  })
})
