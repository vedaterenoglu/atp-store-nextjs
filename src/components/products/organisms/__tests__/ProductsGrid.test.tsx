/**
 * Unit tests for ProductsGrid Component
 * SOLID Principles: Single Responsibility - Testing product grid layout
 * Design Patterns: AAA (Arrange-Act-Assert) Pattern
 * Dependencies: Jest, React Testing Library, component mocks
 */

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { ProductsGrid } from '../ProductsGrid'

// Mock ProductCard component
jest.mock('@/components/products', () => ({
  ProductCard: ({
    id,
    name,
    imageUrl,
    price,
    unit,
    categoryId,
    onClick,
  }: {
    id: string
    name: string
    imageUrl?: string
    price: number
    unit: string
    categoryId: string
    onClick?: () => void
  }) => (
    <div data-testid={`product-card-${id}`} onClick={onClick}>
      <div>Name: {name}</div>
      <div>Price: {price}</div>
      <div>Unit: {unit}</div>
      <div>Category: {categoryId}</div>
      {imageUrl && <div>Image: {imageUrl}</div>}
    </div>
  ),
}))

// Mock Grid components
jest.mock('@/components/ui/custom/grid', () => ({
  GridErrorBoundary: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="grid-error-boundary">
      {(() => {
        try {
          return children
        } catch (error) {
          return <div>Error: {(error as Error).message}</div>
        }
      })()}
    </div>
  ),
  GridSkeleton: ({ count, variant }: { count: number; variant: string }) => (
    <div data-testid="grid-skeleton" data-count={count} data-variant={variant}>
      Loading {count} items...
    </div>
  ),
  GridItem: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="grid-item">{children}</div>
  ),
}))

// Mock cn utility
jest.mock('@/components/ui/utils', () => ({
  cn: (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' '),
}))

describe('ProductsGrid', () => {
  const mockProducts = [
    {
      id: 'PROD001',
      name: 'Product 1',
      imageUrl: 'https://example.com/prod1.jpg',
      price: 1000,
      unit: 'kg',
      categoryId: 'CAT001',
    },
    {
      id: 'PROD002',
      name: 'Product 2',
      price: 2000,
      unit: 'pcs',
      categoryId: 'CAT002',
    },
    {
      id: 'PROD003',
      name: 'Product 3',
      imageUrl: 'https://example.com/prod3.jpg',
      price: 3000,
      unit: 'liter',
      categoryId: 'CAT001',
    },
  ]

  const mockOnProductClick = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render products when not loading', () => {
    render(<ProductsGrid products={mockProducts} />)

    // Check grid container
    const gridErrorBoundary = screen.getByTestId('grid-error-boundary')
    expect(gridErrorBoundary).toBeInTheDocument()

    // Check all products are rendered
    expect(screen.getByTestId('product-card-PROD001')).toBeInTheDocument()
    expect(screen.getByTestId('product-card-PROD002')).toBeInTheDocument()
    expect(screen.getByTestId('product-card-PROD003')).toBeInTheDocument()

    // Check GridItem wrapper
    const gridItems = screen.getAllByTestId('grid-item')
    expect(gridItems).toHaveLength(3)
  })

  it('should render with default grid classes', () => {
    const { container } = render(<ProductsGrid products={mockProducts} />)

    const grid = container.querySelector('.mx-auto.grid')
    expect(grid).toHaveClass(
      'mx-auto grid w-full max-w-7xl gap-4',
      'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      'px-4 sm:px-6 lg:px-8'
    )
  })

  it('should render with custom className', () => {
    const { container } = render(
      <ProductsGrid products={mockProducts} className="custom-grid" />
    )

    const grid = container.querySelector('.mx-auto.grid')
    expect(grid).toHaveClass('custom-grid')
  })

  it('should render loading skeleton when isLoading is true', () => {
    render(<ProductsGrid products={[]} isLoading={true} />)

    const skeleton = screen.getByTestId('grid-skeleton')
    expect(skeleton).toBeInTheDocument()
    expect(skeleton).toHaveAttribute('data-count', '8')
    expect(skeleton).toHaveAttribute('data-variant', 'card')
    expect(skeleton).toHaveTextContent('Loading 8 items...')
  })

  it('should render empty state when no products', () => {
    render(<ProductsGrid products={[]} />)

    expect(screen.getByText('No products found')).toBeInTheDocument()
    const emptyState = screen.getByText('No products found').parentElement
    expect(emptyState).toHaveClass('col-span-full py-12 text-center')
  })

  it('should handle product click', () => {
    render(
      <ProductsGrid
        products={mockProducts}
        onProductClick={mockOnProductClick}
      />
    )

    const firstProduct = screen.getByTestId('product-card-PROD001')
    fireEvent.click(firstProduct)

    expect(mockOnProductClick).toHaveBeenCalledWith(mockProducts[0])
  })

  it('should pass all product props to ProductCard', () => {
    render(<ProductsGrid products={mockProducts} />)

    // Check first product with image
    const product1 = screen.getByTestId('product-card-PROD001')
    expect(product1).toHaveTextContent('Name: Product 1')
    expect(product1).toHaveTextContent('Price: 1000')
    expect(product1).toHaveTextContent('Unit: kg')
    expect(product1).toHaveTextContent('Category: CAT001')
    expect(product1).toHaveTextContent('Image: https://example.com/prod1.jpg')

    // Check second product without image
    const product2 = screen.getByTestId('product-card-PROD002')
    expect(product2).toHaveTextContent('Name: Product 2')
    expect(product2).not.toHaveTextContent('Image:')
  })

  it('should throw error when error prop is provided', () => {
    const testError = new Error('Test error')

    // Since we're testing error throwing, we need to catch it
    expect(() => {
      render(<ProductsGrid products={[]} error={testError} />)
    }).toThrow('Test error')
  })

  it('should not render products when loading', () => {
    render(<ProductsGrid products={mockProducts} isLoading={true} />)

    // Should show skeleton, not products
    expect(screen.getByTestId('grid-skeleton')).toBeInTheDocument()
    expect(screen.queryByTestId('product-card-PROD001')).not.toBeInTheDocument()
  })

  it('should handle products with optional imageUrl', () => {
    render(<ProductsGrid products={mockProducts} />)

    // Product with image
    const product1 = screen.getByTestId('product-card-PROD001')
    expect(product1).toHaveTextContent('Image: https://example.com/prod1.jpg')

    // Product without image
    const product2 = screen.getByTestId('product-card-PROD002')
    expect(product2).not.toHaveTextContent('Image:')
  })

  it('should call onProductClick with correct product data', () => {
    render(
      <ProductsGrid
        products={mockProducts}
        onProductClick={mockOnProductClick}
      />
    )

    // Click different products
    fireEvent.click(screen.getByTestId('product-card-PROD002'))
    expect(mockOnProductClick).toHaveBeenCalledWith(mockProducts[1])

    fireEvent.click(screen.getByTestId('product-card-PROD003'))
    expect(mockOnProductClick).toHaveBeenCalledWith(mockProducts[2])
  })

  it('should render correctly when onProductClick is not provided', () => {
    render(<ProductsGrid products={mockProducts} />)

    // Should render without errors
    const firstProduct = screen.getByTestId('product-card-PROD001')
    fireEvent.click(firstProduct)

    // No errors should occur
    expect(firstProduct).toBeInTheDocument()
  })
})
