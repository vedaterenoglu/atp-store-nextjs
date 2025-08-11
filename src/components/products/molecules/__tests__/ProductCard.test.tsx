/**
 * Unit tests for ProductCard Component
 * SOLID Principles: Single Responsibility - Testing product card display and interactions
 * Design Patterns: AAA (Arrange-Act-Assert) Pattern
 * Dependencies: Jest, React Testing Library
 */

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { ProductCard } from '../ProductCard'

// Mock interfaces
interface MockProduct {
  stockId: string
  stockName: string
  stockPrice: number
  stockUnit: string
  stockGroup: string
  stockImageLink?: string | undefined
}

// Helper function to create mock product
function createMockProduct(overrides: Partial<MockProduct> = {}): MockProduct {
  return {
    stockId: 'PROD001',
    stockName: 'Test Product',
    stockPrice: 1500,
    stockUnit: 'kg',
    stockGroup: 'CAT001',
    ...(overrides.stockImageLink !== undefined && { stockImageLink: overrides.stockImageLink }),
    ...overrides,
  }
}

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: jest.fn(function Image({
    src,
    alt,
    fill,
    className,
    sizes,
  }: {
    src: string
    alt: string
    fill?: boolean
    className?: string
    sizes?: string
  }) {
    return React.createElement('img', {
      src,
      alt,
      'data-fill': fill,
      className,
      'data-sizes': sizes,
      'data-testid': 'product-image',
    })
  }),
}))

// Mock PriceTag component
jest.mock('@/components/products', () => ({
  PriceTag: jest.fn(function PriceTag({ price }: { price: number }) {
    return <div data-testid="price-tag">Price: {price}</div>
  }),
}))

// Mock BookmarkButton component
jest.mock('@/components/ui/custom', () => ({
  BookmarkButton: jest.fn(function BookmarkButton({
    productId,
    isBookmarked,
    onToggle,
    size,
  }: {
    productId: string
    isBookmarked: boolean
    onToggle: () => void
    size?: string
  }) {
    return (
      <button
        data-testid="bookmark-button"
        data-product-id={productId}
        data-bookmarked={isBookmarked}
        data-size={size}
        onClick={onToggle}
      >
        Bookmark
      </button>
    )
  }),
}))

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Minus: jest.fn(function Minus({ className }: { className?: string }) {
    return (
      <span data-testid="minus-icon" className={className}>
        -
      </span>
    )
  }),
  Plus: jest.fn(function Plus({ className }: { className?: string }) {
    return (
      <span data-testid="plus-icon" className={className}>
        +
      </span>
    )
  }),
  ShoppingCart: jest.fn(function ShoppingCart({ className }: { className?: string }) {
    return (
      <span data-testid="shopping-cart-icon" className={className}>
        Cart
      </span>
    )
  }),
}))

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(() => ({
    t: jest.fn((key: string) => {
      const translations: Record<string, string> = {
        'products.addToCart': 'Add to Cart',
        'products.removeFromCart': 'Remove from Cart',
        'products.quantity': 'Quantity',
        'productCard.category': 'Category',
        'productCard.id': 'ID',
        'productCard.unit': 'Unit',
        'productCard.addToCart': 'Add to Cart',
      }
      return translations[key] || key
    }),
  })),
}))

// Mock Clerk auth hooks
jest.mock('@clerk/nextjs', () => ({
  useAuth: jest.fn(),
  useUser: jest.fn(),
}))

// Mock Zustand stores
const mockAddToCart = jest.fn()
const mockToggleBookmark = jest.fn()
const mockIsBookmarked = jest.fn(() => false)
const mockInitializeBookmarks = jest.fn()

jest.mock('@/lib/stores/cart.store', () => ({
  useCartStore: jest.fn((selector) => {
    const store = {
      addToCart: mockAddToCart,
      findCartItem: jest.fn(() => null),
    }
    // If a selector function is passed, call it with the store
    if (typeof selector === 'function') {
      return selector(store)
    }
    // Otherwise return the whole store
    return store
  }),
}))

jest.mock('@/lib/stores/bookmark-store', () => ({
  useBookmarkStore: jest.fn(() => ({
    isBookmarked: mockIsBookmarked,
    toggleBookmark: mockToggleBookmark,
    initializeBookmarks: mockInitializeBookmarks,
    isInitialized: false,
  })),
}))

// Mock shadcn/ui components
jest.mock('@/components/ui/schadcn', () => ({
  Card: jest.fn(({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => (
    <div className={className} data-testid="card" onClick={onClick}>
      {children}
    </div>
  )),
  Button: jest.fn(({ 
    children, 
    onClick, 
    disabled, 
    variant, 
    size, 
    className 
  }: { 
    children: React.ReactNode
    onClick?: () => void
    disabled?: boolean
    variant?: string
    size?: string
    className?: string
  }) => (
    <button 
      onClick={onClick} 
      disabled={disabled} 
      data-variant={variant}
      data-size={size}
      className={className}
    >
      {children}
    </button>
  )),
}))

// Mock cn utility
jest.mock('@/lib/utils', () => ({
  cn: jest.fn((...classes: (string | undefined | null | false)[]) => 
    classes.filter(Boolean).join(' ')
  ),
}))

// Mock toast
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}))

// Import mocked functions
import { useAuth, useUser } from '@clerk/nextjs'

const mockUseAuth = useAuth as jest.Mock
const mockUseUser = useUser as jest.Mock

// Helper functions for auth mocks
function mockAuthSignedOut() {
  return {
    isLoaded: true as const,
    isSignedIn: false as const,
    userId: null,
    sessionId: null,
    sessionClaims: null,
    actor: null,
    orgId: null,
    orgRole: null,
    orgSlug: null,
    has: jest.fn(() => false),
    signOut: jest.fn(),
    getToken: jest.fn(),
  }
}

function mockUserSignedOut() {
  return {
    isLoaded: true as const,
    isSignedIn: false as const,
    user: null,
  }
}

function mockAuthSignedIn() {
  return {
    isLoaded: true as const,
    isSignedIn: true as const,
    userId: 'user_test123',
    sessionId: 'sess_test123',
    sessionClaims: {
      metadata: { role: 'customer', customerid: 'CUST123' },
    } as Record<string, unknown>,
    actor: null,
    orgId: null,
    orgRole: null,
    orgSlug: null,
    has: jest.fn(() => false),
    signOut: jest.fn(),
    getToken: jest.fn(),
  }
}

function mockUserSignedIn(overrides: { publicMetadata?: Record<string, unknown> } = {}) {
  return {
    isLoaded: true as const,
    isSignedIn: true as const,
    user: {
      id: 'user_test123',
      firstName: 'Test',
      lastName: 'User',
      username: 'testuser',
      imageUrl: 'https://example.com/avatar.jpg',
      publicMetadata: overrides.publicMetadata || { role: 'customer', customerid: 'CUST123' },
    } as Record<string, unknown>,
  }
}

describe('ProductCard', () => {
  const mockProduct = createMockProduct({
    stockId: 'PROD001',
    stockName: 'Test Product',
    stockPrice: 1500,
    stockUnit: 'kg',
    stockGroup: 'CAT001',
  })

  const mockOnClick = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    // Default to signed out state
    mockUseAuth.mockReturnValue(mockAuthSignedOut())
    mockUseUser.mockReturnValue(mockUserSignedOut())
  })

  it('should render with all required props', () => {
    render(
      <ProductCard
        id={mockProduct.stockId}
        name={mockProduct.stockName}
        price={mockProduct.stockPrice}
        unit={mockProduct.stockUnit}
        categoryId={mockProduct.stockGroup}
      />
    )

    // Check product name
    expect(screen.getByText('Test Product')).toBeInTheDocument()

    // Check price tag
    expect(screen.getByTestId('price-tag')).toHaveTextContent('Price: 1500')

    // Check product details
    expect(screen.getByText(/CAT001/)).toBeInTheDocument()
    expect(screen.getByText(/PROD001/)).toBeInTheDocument()
    expect(screen.getByText(/kg/)).toBeInTheDocument()

    // Check quantity controls
    const quantityDisplay = screen.getByText('0')
    expect(quantityDisplay).toBeInTheDocument() // Initial quantity
  })

  it('should render with image when imageUrl is provided', () => {
    render(
      <ProductCard
        id={mockProduct.stockId}
        name={mockProduct.stockName}
        price={mockProduct.stockPrice}
        unit={mockProduct.stockUnit}
        categoryId={mockProduct.stockGroup}
        imageUrl="https://example.com/product.jpg"
      />
    )

    const image = screen.getByTestId('product-image')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', 'https://example.com/product.jpg')
    expect(image).toHaveAttribute('alt', 'Test Product')
  })

  it('should render placeholder when no imageUrl', () => {
    render(
      <ProductCard
        id={mockProduct.stockId}
        name={mockProduct.stockName}
        price={mockProduct.stockPrice}
        unit={mockProduct.stockUnit}
        categoryId={mockProduct.stockGroup}
      />
    )

    // Should show emoji placeholder
    expect(screen.getByText('📦')).toBeInTheDocument()
  })

  it('should handle onClick on card', () => {
    render(
      <ProductCard
        id={mockProduct.stockId}
        name={mockProduct.stockName}
        price={mockProduct.stockPrice}
        unit={mockProduct.stockUnit}
        categoryId={mockProduct.stockGroup}
        onClick={mockOnClick}
      />
    )

    // Click on the card element itself
    const card = screen.getByTestId('card')
    fireEvent.click(card)

    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('should increase quantity when plus button is clicked', () => {
    // Test the quantity controls - the component uses local state
    render(
      <ProductCard
        id={mockProduct.stockId}
        name={mockProduct.stockName}
        price={mockProduct.stockPrice}
        unit={mockProduct.stockUnit}
        categoryId={mockProduct.stockGroup}
      />
    )

    // Check initial state
    expect(screen.getByText('0')).toBeInTheDocument()

    // Find buttons - there should be 3: minus, plus, and add to cart
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(3)

    // The minus button should be disabled at 0
    const minusButton = screen
      .getByTestId('minus-icon')
      .closest('button') as HTMLButtonElement
    expect(minusButton).toBeDisabled()

    // The plus button should be enabled
    const plusButton = screen
      .getByTestId('plus-icon')
      .closest('button') as HTMLButtonElement

    // Verify the plus button exists and can be clicked
    expect(plusButton).toBeInTheDocument()

    // Click to test interaction (state changes are internal to component)
    fireEvent.click(plusButton)

    // After click, quantity should increase
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('should decrease quantity when minus button is clicked', () => {
    render(
      <ProductCard
        id={mockProduct.stockId}
        name={mockProduct.stockName}
        price={mockProduct.stockPrice}
        unit={mockProduct.stockUnit}
        categoryId={mockProduct.stockGroup}
      />
    )

    const minusButton = screen.getByTestId('minus-icon')
      .parentElement as HTMLButtonElement
    const plusButton = screen.getByTestId('plus-icon')
      .parentElement as HTMLButtonElement

    // Initially minus should be disabled at 0
    expect(minusButton).toBeDisabled()

    // Click plus to enable minus button
    fireEvent.click(plusButton)
    expect(screen.getByText('1')).toBeInTheDocument()

    // Now minus should be enabled
    expect(minusButton).not.toBeDisabled()
    
    // Click minus to decrease
    fireEvent.click(minusButton)
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('should not decrease below 0', () => {
    render(
      <ProductCard
        id={mockProduct.stockId}
        name={mockProduct.stockName}
        price={mockProduct.stockPrice}
        unit={mockProduct.stockUnit}
        categoryId={mockProduct.stockGroup}
      />
    )

    const minusButton = screen.getByTestId('minus-icon')
      .parentElement as HTMLButtonElement
    expect(screen.getByText('0')).toBeInTheDocument()

    // Minus button should be disabled at 0
    expect(minusButton).toBeDisabled()

    // Clicking disabled button should not change quantity
    fireEvent.click(minusButton)
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('should call addToCart when add to cart button is clicked', () => {
    // Mock signed in state - required for add to cart
    mockUseAuth.mockReturnValue(mockAuthSignedIn())
    mockUseUser.mockReturnValue(mockUserSignedIn())
    
    render(
      <ProductCard
        id={mockProduct.stockId}
        name={mockProduct.stockName}
        price={mockProduct.stockPrice}
        unit={mockProduct.stockUnit}
        categoryId={mockProduct.stockGroup}
      />
    )

    // The add to cart button should be initially disabled (quantity = 0)
    const addToCartButton = screen.getByRole('button', { name: /add to cart/i })
    expect(addToCartButton).toBeDisabled()

    // After increasing quantity, it should be enabled
    const plusButton = screen.getByTestId('plus-icon')
      .parentElement as HTMLButtonElement
    fireEvent.click(plusButton)
    
    expect(addToCartButton).not.toBeDisabled()
    
    // Click add to cart
    fireEvent.click(addToCartButton)
    // The component calls addToCart with individual parameters
    expect(mockAddToCart).toHaveBeenCalledWith(
      'PROD001',      // id
      'Test Product', // name
      1500,           // price
      1,              // quantity
      undefined,      // imageUrl
      'CAT001',       // categoryId (used as productGroup)
      'kg',           // unit
      99              // max quantity
    )
  })

  it('should not add to cart when quantity is 0', () => {
    render(
      <ProductCard
        id={mockProduct.stockId}
        name={mockProduct.stockName}
        price={mockProduct.stockPrice}
        unit={mockProduct.stockUnit}
        categoryId={mockProduct.stockGroup}
      />
    )

    const addToCartButton = screen.getByRole('button', { name: /add to cart/i })
    // Button should be disabled when quantity is 0
    expect(addToCartButton).toBeDisabled()

    // Clicking disabled button shouldn't call addToCart
    fireEvent.click(addToCartButton)
    expect(mockAddToCart).not.toHaveBeenCalled()
  })

  it('should show bookmark button for signed-in customers', () => {
    // Mock signed in state with customer role
    mockUseAuth.mockReturnValue(mockAuthSignedIn())
    mockUseUser.mockReturnValue(
      mockUserSignedIn({
        publicMetadata: { role: 'customer', customerid: 'CUST123' },
      })
    )

    render(
      <ProductCard
        id={mockProduct.stockId}
        name={mockProduct.stockName}
        price={mockProduct.stockPrice}
        unit={mockProduct.stockUnit}
        categoryId={mockProduct.stockGroup}
      />
    )

    expect(screen.getByTestId('bookmark-button')).toBeInTheDocument()
  })

  it('should handle bookmark toggle', () => {
    // Mock signed in state with customer role
    mockUseAuth.mockReturnValue(mockAuthSignedIn())
    mockUseUser.mockReturnValue(
      mockUserSignedIn({
        publicMetadata: { role: 'customer', customerid: 'CUST123' },
      })
    )

    render(
      <ProductCard
        id={mockProduct.stockId}
        name={mockProduct.stockName}
        price={mockProduct.stockPrice}
        unit={mockProduct.stockUnit}
        categoryId={mockProduct.stockGroup}
      />
    )

    const bookmarkButton = screen.getByTestId('bookmark-button')
    fireEvent.click(bookmarkButton)

    // The component calls toggleBookmark with productId and optional product data
    expect(mockToggleBookmark).toHaveBeenCalledWith(
      'PROD001',
      expect.objectContaining({
        id: 'PROD001',
        name: 'Test Product',
        price: 1500,
        unit: 'kg',
        categoryId: 'CAT001',
      })
    )
  })

  it('should render product without campaign elements', () => {
    render(
      <ProductCard
        id={mockProduct.stockId}
        name={mockProduct.stockName}
        price={mockProduct.stockPrice}
        unit={mockProduct.stockUnit}
        categoryId={mockProduct.stockGroup}
      />
    )

    // ProductCard doesn't have campaign functionality
    expect(screen.queryByText(/campaign/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/discount/i)).not.toBeInTheDocument()
  })

  it('should handle product with all optional props', () => {
    render(
      <ProductCard
        id="PROD002"
        name="Full Product"
        price={2500}
        unit="pcs"
        categoryId="CAT002"
        imageUrl="https://example.com/full.jpg"
        onClick={mockOnClick}
      />
    )

    expect(screen.getByText('Full Product')).toBeInTheDocument()
    expect(screen.getByTestId('product-image')).toHaveAttribute(
      'src',
      'https://example.com/full.jpg'
    )
    // Click on the card to verify onClick
    const card = screen.getByTestId('card')
    fireEvent.click(card)
    expect(mockOnClick).toHaveBeenCalled()
  })
})