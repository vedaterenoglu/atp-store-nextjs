/**
 * Unit tests for ProductsGrid Component
 * SOLID Principles: Single Responsibility - Testing product grid layout
 * Design Patterns: AAA (Arrange-Act-Assert) Pattern
 * Dependencies: Jest, React Testing Library
 */

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { ProductsGrid } from '../ProductsGrid'

// Mock interfaces
interface MockProduct {
  id: string
  name: string
  imageUrl?: string
  price: number
  unit: string
  categoryId: string
}

// Helper function to create mock products
function createMockProducts(count: number): MockProduct[] {
  return Array.from({ length: count }, (_, index) => {
    const product: MockProduct = {
      id: `PROD${String(index + 1).padStart(3, '0')}`,
      name: `Product ${index + 1}`,
      price: (index + 1) * 1000,
      unit: 'kg',
      categoryId: `CAT${String((index % 3) + 1).padStart(3, '0')}`,
    }
    if (index % 2 === 0) {
      product.imageUrl = `https://example.com/product${index + 1}.jpg`
    }
    return product
  })
}

// Mock ProductCard component
jest.mock('@/components/products', () => ({
  ProductCard: jest.fn(function ProductCard({
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
  }) {
    return (
      <div data-testid={`product-card-${id}`} onClick={onClick}>
        <div>Name: {name}</div>
        <div>Price: {price}</div>
        <div>Unit: {unit}</div>
        <div>Category: {categoryId}</div>
        {imageUrl && <div>Image: {imageUrl}</div>}
      </div>
    )
  }),
}))

// Mock Grid components
jest.mock('@/components/ui/custom/grid', () => ({
  GridErrorBoundary: jest.fn(function GridErrorBoundary({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <div data-testid="grid-error-boundary">{children}</div>
  }),
  GridSkeleton: jest.fn(function GridSkeleton({
    count,
    variant,
  }: {
    count: number
    variant: string
  }) {
    return (
      <div
        data-testid="grid-skeleton"
        data-count={count}
        data-variant={variant}
      >
        Loading {count} items...
      </div>
    )
  }),
  GridItem: jest.fn(function GridItem({ children }: { children: React.ReactNode }) {
    return <div data-testid="grid-item">{children}</div>
  }),
}))

// Mock style utilities
jest.mock('@/lib/styles/utilities', () => ({
  getGridClasses: jest.fn(() => 'grid'),
  getContainerClasses: jest.fn(() => 'container'),
}))

// Mock cn utility
jest.mock('@/lib/utils', () => ({
  cn: jest.fn((...classes: (string | undefined | null | false)[]) => 
    classes.filter(Boolean).join(' ')
  ),
}))

describe('ProductsGrid', () => {
  const mockProducts = createMockProducts(3)
  const mockOnProductClick = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render products grid with products', () => {
    render(
      <ProductsGrid
        products={mockProducts}
        onProductClick={mockOnProductClick}
      />
    )

    // Check grid error boundary wrapper
    expect(screen.getByTestId('grid-error-boundary')).toBeInTheDocument()

    // Check all products are rendered
    mockProducts.forEach(product => {
      expect(
        screen.getByTestId(`product-card-${product.id}`)
      ).toBeInTheDocument()
      expect(screen.getByText(`Name: ${product.name}`)).toBeInTheDocument()
      expect(screen.getByText(`Price: ${product.price}`)).toBeInTheDocument()
    })
  })

  it('should render loading skeleton when isLoading is true', () => {
    render(<ProductsGrid products={[]} isLoading={true} />)

    const skeleton = screen.getByTestId('grid-skeleton')
    expect(skeleton).toBeInTheDocument()
    expect(skeleton).toHaveAttribute('data-count', '8')
    expect(skeleton).toHaveAttribute('data-variant', 'card')
  })

  it('should render loading skeleton with fixed count', () => {
    render(<ProductsGrid products={[]} isLoading={true} />)

    const skeleton = screen.getByTestId('grid-skeleton')
    expect(skeleton).toHaveAttribute('data-count', '8')
  })

  it('should render empty state when no products', () => {
    render(<ProductsGrid products={[]} />)

    expect(screen.getByText('No products found')).toBeInTheDocument()
  })

  it('should render default empty message', () => {
    render(<ProductsGrid products={[]} />)

    expect(screen.getByText('No products found')).toBeInTheDocument()
  })

  it('should handle product click', () => {
    render(
      <ProductsGrid
        products={mockProducts}
        onProductClick={mockOnProductClick}
      />
    )

    const firstMockProduct = mockProducts[0]
    if (!firstMockProduct) throw new Error('Mock product not found')

    const firstProduct = screen.getByTestId(
      `product-card-${firstMockProduct.id}`
    )
    fireEvent.click(firstProduct)

    expect(mockOnProductClick).toHaveBeenCalledTimes(1)
    expect(mockOnProductClick).toHaveBeenCalledWith(firstMockProduct)
  })

  it('should apply custom className', () => {
    const customClass = 'custom-grid-class'
    const { container } = render(
      <ProductsGrid products={mockProducts} className={customClass} />
    )

    const gridElement = container.querySelector(`.${customClass}`)
    expect(gridElement).toBeInTheDocument()
  })

  it('should wrap each product in GridItem', () => {
    render(<ProductsGrid products={mockProducts} />)

    const gridItems = screen.getAllByTestId('grid-item')
    expect(gridItems).toHaveLength(mockProducts.length)
  })

  it('should not show loading when isLoading is false', () => {
    render(
      <ProductsGrid products={mockProducts} isLoading={false} />
    )

    expect(screen.queryByTestId('grid-skeleton')).not.toBeInTheDocument()
  })

  it('should handle products without images', () => {
    const productsNoImages = mockProducts.map(p => {
      const productCopy = { ...p }
      delete productCopy.imageUrl
      return productCopy
    })

    render(<ProductsGrid products={productsNoImages} />)

    // Check products are still rendered
    productsNoImages.forEach(product => {
      expect(
        screen.getByTestId(`product-card-${product.id}`)
      ).toBeInTheDocument()
      // Image should not be rendered when not provided
      expect(screen.queryByText(/Image:/)).not.toBeInTheDocument()
    })
  })

  it('should handle single product', () => {
    const firstProduct = mockProducts[0]
    if (!firstProduct) throw new Error('Mock product not found')

    render(<ProductsGrid products={[firstProduct]} />)

    expect(
      screen.getByTestId(`product-card-${firstProduct.id}`)
    ).toBeInTheDocument()
    expect(screen.getAllByTestId('grid-item')).toHaveLength(1)
  })

  it('should handle large number of products', () => {
    const manyProducts = createMockProducts(50)

    render(<ProductsGrid products={manyProducts} />)

    expect(screen.getAllByTestId('grid-item')).toHaveLength(50)
  })

  it('should not call onProductClick when not provided', () => {
    render(<ProductsGrid products={mockProducts} />)

    const firstMockProduct = mockProducts[0]
    if (!firstMockProduct) throw new Error('Mock product not found')

    const firstProduct = screen.getByTestId(
      `product-card-${firstMockProduct.id}`
    )
    fireEvent.click(firstProduct)

    // Should not throw error
    expect(mockOnProductClick).not.toHaveBeenCalled()
  })

  it('should render with default loading count when not specified', () => {
    render(<ProductsGrid products={[]} isLoading={true} />)

    const skeleton = screen.getByTestId('grid-skeleton')
    expect(skeleton).toHaveAttribute('data-count', '8') // Default count
  })

  it('should handle empty products array differently from undefined', () => {
    const { rerender } = render(<ProductsGrid products={[]} />)

    expect(screen.getByText('No products found')).toBeInTheDocument()

    // Test with products
    rerender(<ProductsGrid products={mockProducts} />)

    expect(screen.queryByText('No products found')).not.toBeInTheDocument()
    expect(screen.getAllByTestId('grid-item')).toHaveLength(mockProducts.length)
  })
})