/**
 * Unit tests for ProductsPage Component
 * SOLID Principles: Single Responsibility - Testing page layout and functionality
 * Design Patterns: AAA (Arrange-Act-Assert) Pattern
 * Dependencies: Jest, React Testing Library, Zustand mocks
 */

import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ProductsPage } from '../ProductsPage'

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, defaultValue?: string) => {
      const translations: Record<string, string> = {
        title: 'Products',
        subtitle: 'Discover and order products for your business',
        searchPlaceholder: 'Search products...',
      }
      return translations[key] || defaultValue || key
    },
  }),
}))

// Mock Zustand store
const mockSearchPrefix = jest.fn()
const mockClearSearchPrefix = jest.fn()
jest.mock('@/lib/stores', () => ({
  useCategorySearchStore: () => ({
    searchPrefix: mockSearchPrefix(),
    clearSearchPrefix: mockClearSearchPrefix,
  }),
}))

// Mock child components
jest.mock('@/components/products', () => ({
  SearchBox: ({
    value,
    onChange,
    placeholder,
    className,
  }: {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    className?: string
  }) => (
    <input
      data-testid="search-box"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className={className}
    />
  ),
  BookmarksFilterButton: ({
    isActive,
    onClick,
    className,
  }: {
    isActive: boolean
    onClick: () => void
    className?: string
  }) => (
    <button
      data-testid="bookmarks-filter-button"
      data-active={isActive}
      onClick={onClick}
      className={className}
    >
      Bookmarks Filter
    </button>
  ),
  BackToCategoriesButton: ({ className }: { className?: string }) => (
    <button data-testid="back-to-categories-button" className={className}>
      Back to Categories
    </button>
  ),
  GoToCartButton: ({ className }: { className?: string }) => (
    <button data-testid="go-to-cart-button" className={className}>
      Go to Cart
    </button>
  ),
  ProductsGrid: ({
    products,
    onProductClick,
  }: {
    products: Array<{
      id: string
      name: string
      price: number
      unit: string
      categoryId: string
    }>
    onProductClick?: (product: {
      id: string
      name: string
      price: number
      unit: string
      categoryId: string
    }) => void
  }) => (
    <div data-testid="products-grid">
      {products.map(product => (
        <div
          key={product.id}
          data-testid={`product-${product.id}`}
          onClick={() => onProductClick?.(product)}
        >
          {product.name}
        </div>
      ))}
    </div>
  ),
}))

// Mock console.warn
const originalWarn = console.warn
beforeAll(() => {
  console.warn = jest.fn()
})

afterAll(() => {
  console.warn = originalWarn
})

describe('ProductsPage', () => {
  const mockProducts = [
    {
      id: 'PROD001',
      name: 'Apple',
      price: 1000,
      unit: 'kg',
      categoryId: 'FRUIT',
    },
    {
      id: 'PROD002',
      name: 'Banana',
      price: 2000,
      unit: 'kg',
      categoryId: 'FRUIT',
    },
    {
      id: 'PROD003',
      name: 'Carrot',
      price: 1500,
      unit: 'pcs',
      categoryId: 'VEGETABLE',
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
    mockSearchPrefix.mockReturnValue('')
  })

  it('should render with all components', () => {
    render(<ProductsPage products={mockProducts} />)

    // Check page structure
    expect(screen.getByText('Products')).toBeInTheDocument()
    expect(
      screen.getByText('Discover and order products for your business')
    ).toBeInTheDocument()

    // Check navigation components
    expect(screen.getByTestId('back-to-categories-button')).toBeInTheDocument()
    expect(screen.getByTestId('search-box')).toBeInTheDocument()
    expect(screen.getByTestId('bookmarks-filter-button')).toBeInTheDocument()
    expect(screen.getByTestId('go-to-cart-button')).toBeInTheDocument()

    // Check products grid
    expect(screen.getByTestId('products-grid')).toBeInTheDocument()
    expect(screen.getByTestId('product-PROD001')).toBeInTheDocument()
    expect(screen.getByTestId('product-PROD002')).toBeInTheDocument()
    expect(screen.getByTestId('product-PROD003')).toBeInTheDocument()
  })

  it('should initialize with empty search when no props or store value', () => {
    render(<ProductsPage products={mockProducts} />)

    const searchBox = screen.getByTestId('search-box') as HTMLInputElement
    expect(searchBox.value).toBe('')
  })

  it('should initialize with initialSearch prop', () => {
    render(<ProductsPage products={mockProducts} initialSearch="Apple" />)

    const searchBox = screen.getByTestId('search-box') as HTMLInputElement
    expect(searchBox.value).toBe('Apple')
  })

  it('should initialize with searchPrefix from store', async () => {
    mockSearchPrefix.mockReturnValue('Banana')

    render(<ProductsPage products={mockProducts} />)

    await waitFor(() => {
      const searchBox = screen.getByTestId('search-box') as HTMLInputElement
      expect(searchBox.value).toBe('Banana')
    })

    expect(mockClearSearchPrefix).toHaveBeenCalled()
  })

  it('should prefer initialSearch over searchPrefix', () => {
    mockSearchPrefix.mockReturnValue('Store Value')

    render(<ProductsPage products={mockProducts} initialSearch="Prop Value" />)

    const searchBox = screen.getByTestId('search-box') as HTMLInputElement
    expect(searchBox.value).toBe('Prop Value')
  })

  it('should filter products by search term (name)', () => {
    render(<ProductsPage products={mockProducts} />)

    const searchBox = screen.getByTestId('search-box')
    fireEvent.change(searchBox, { target: { value: 'app' } })

    // Should only show Apple
    expect(screen.getByTestId('product-PROD001')).toBeInTheDocument()
    expect(screen.queryByTestId('product-PROD002')).not.toBeInTheDocument()
    expect(screen.queryByTestId('product-PROD003')).not.toBeInTheDocument()
  })

  it('should filter products by search term (unit)', () => {
    render(<ProductsPage products={mockProducts} />)

    const searchBox = screen.getByTestId('search-box')
    fireEvent.change(searchBox, { target: { value: 'pcs' } })

    // Should only show Carrot
    expect(screen.queryByTestId('product-PROD001')).not.toBeInTheDocument()
    expect(screen.queryByTestId('product-PROD002')).not.toBeInTheDocument()
    expect(screen.getByTestId('product-PROD003')).toBeInTheDocument()
  })

  it('should filter products by search term (id)', () => {
    render(<ProductsPage products={mockProducts} />)

    const searchBox = screen.getByTestId('search-box')
    fireEvent.change(searchBox, { target: { value: 'PROD002' } })

    // Should only show Banana
    expect(screen.queryByTestId('product-PROD001')).not.toBeInTheDocument()
    expect(screen.getByTestId('product-PROD002')).toBeInTheDocument()
    expect(screen.queryByTestId('product-PROD003')).not.toBeInTheDocument()
  })

  it('should filter products by search term (categoryId)', () => {
    render(<ProductsPage products={mockProducts} />)

    const searchBox = screen.getByTestId('search-box')
    fireEvent.change(searchBox, { target: { value: 'vegetable' } })

    // Should only show Carrot
    expect(screen.queryByTestId('product-PROD001')).not.toBeInTheDocument()
    expect(screen.queryByTestId('product-PROD002')).not.toBeInTheDocument()
    expect(screen.getByTestId('product-PROD003')).toBeInTheDocument()
  })

  it('should handle case-insensitive search', () => {
    render(<ProductsPage products={mockProducts} />)

    const searchBox = screen.getByTestId('search-box')
    fireEvent.change(searchBox, { target: { value: 'APPLE' } })

    expect(screen.getByTestId('product-PROD001')).toBeInTheDocument()
  })

  it('should toggle bookmarks filter', () => {
    render(<ProductsPage products={mockProducts} />)

    const bookmarksButton = screen.getByTestId('bookmarks-filter-button')
    expect(bookmarksButton).toHaveAttribute('data-active', 'false')

    fireEvent.click(bookmarksButton)
    expect(bookmarksButton).toHaveAttribute('data-active', 'true')

    fireEvent.click(bookmarksButton)
    expect(bookmarksButton).toHaveAttribute('data-active', 'false')
  })

  it('should handle product click', () => {
    render(<ProductsPage products={mockProducts} />)

    const product = screen.getByTestId('product-PROD001')
    fireEvent.click(product)

    expect(console.warn).toHaveBeenCalledWith('Product clicked:', 'PROD001')
  })

  it('should show all products when search is cleared', () => {
    render(<ProductsPage products={mockProducts} />)

    const searchBox = screen.getByTestId('search-box')

    // Filter first
    fireEvent.change(searchBox, { target: { value: 'Apple' } })
    expect(screen.queryByTestId('product-PROD002')).not.toBeInTheDocument()

    // Clear search
    fireEvent.change(searchBox, { target: { value: '' } })

    // All products should be visible
    expect(screen.getByTestId('product-PROD001')).toBeInTheDocument()
    expect(screen.getByTestId('product-PROD002')).toBeInTheDocument()
    expect(screen.getByTestId('product-PROD003')).toBeInTheDocument()
  })

  it('should apply responsive classes to buttons', () => {
    render(<ProductsPage products={mockProducts} />)

    const backButton = screen.getByTestId('back-to-categories-button')
    expect(backButton).toHaveClass('w-full lg:w-auto')

    const searchBox = screen.getByTestId('search-box')
    expect(searchBox).toHaveClass('w-full lg:flex-1')

    const bookmarksButton = screen.getByTestId('bookmarks-filter-button')
    expect(bookmarksButton).toHaveClass('flex-1 lg:flex-initial')

    const cartButton = screen.getByTestId('go-to-cart-button')
    expect(cartButton).toHaveClass('flex-1 lg:flex-initial')
  })

  it('should handle empty products array', () => {
    render(<ProductsPage products={[]} />)

    const productsGrid = screen.getByTestId('products-grid')
    expect(productsGrid).toBeInTheDocument()
    expect(productsGrid).toBeEmptyDOMElement()
  })

  it('should maintain bookmarks filter state when searching', () => {
    render(<ProductsPage products={mockProducts} />)

    const bookmarksButton = screen.getByTestId('bookmarks-filter-button')
    const searchBox = screen.getByTestId('search-box')

    // Enable bookmarks filter
    fireEvent.click(bookmarksButton)
    expect(bookmarksButton).toHaveAttribute('data-active', 'true')

    // Search
    fireEvent.change(searchBox, { target: { value: 'Apple' } })

    // Bookmarks filter should still be active
    expect(bookmarksButton).toHaveAttribute('data-active', 'true')
  })
})
