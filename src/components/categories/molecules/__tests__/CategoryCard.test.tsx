/**
 * CategoryCard Component Test Suite
 * SOLID Principles: Single Responsibility - Test category card functionality
 * Design Patterns: Test Pattern - Unit tests with mocking
 * Dependencies: Jest, React Testing Library, Next.js mocks
 */

import React from 'react'
import { CategoryCard } from '../CategoryCard'
import { renderWithProviders, screen, fireEvent } from '@/__tests__/utils'
import { useRouter } from 'next/navigation'
import { useCategorySearchStore } from '@/lib/stores'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

// Mock the Zustand store
jest.mock('@/lib/stores', () => ({
  useCategorySearchStore: jest.fn(),
}))

// Mock the UI components
jest.mock('@/components/ui/schadcn', () => ({
  Card: function Card({
    children,
    className,
  }: {
    children: React.ReactNode
    className?: string
  }) {
    return (
      <div className={className} data-testid="card">
        {children}
      </div>
    )
  },
}))

// Mock the categories components
jest.mock('@/components/categories', () => ({
  ImageContainer: function ImageContainer({
    src,
    alt,
    className,
  }: {
    src: string
    alt: string
    className?: string
  }) {
    return (
      <div
        data-testid="image-container"
        data-src={src}
        data-alt={alt}
        className={className}
      >
        Image: {alt}
      </div>
    )
  },
  OverlayComponent: function OverlayComponent({
    title,
    isVisible,
  }: {
    title: string
    isVisible: boolean
  }) {
    return (
      <div
        data-testid="overlay-component"
        data-title={title}
        data-visible={isVisible}
      >
        {title}
      </div>
    )
  },
}))

// Mock the cn utility
jest.mock('@/lib/utils', () => ({
  cn: function cn(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(' ')
  },
}))

// Type the mocked functions
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>
const mockUseCategorySearchStore =
  useCategorySearchStore as jest.MockedFunction<typeof useCategorySearchStore>

describe('CategoryCard', () => {
  const mockPush = jest.fn()
  const mockSetSearchPrefix = jest.fn()

  const defaultProps = {
    id: 'CAT_001',
    name: 'Electronics',
    imageUrl: 'https://example.com/electronics.jpg',
  }

  beforeEach(() => {
    jest.clearAllMocks()
    mockUseRouter.mockReturnValue({
      push: mockPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    } as never)
    mockUseCategorySearchStore.mockReturnValue({
      setSearchPrefix: mockSetSearchPrefix,
      searchPrefix: '',
      clearSearchPrefix: jest.fn(),
    })
  })

  describe('Component rendering', () => {
    it('should render with required props', () => {
      renderWithProviders(<CategoryCard {...defaultProps} />)

      // Check main container
      const container = screen.getByTestId('card').parentElement as HTMLElement
      expect(container).toBeInTheDocument()
      expect(container).toHaveClass('group', 'block', 'cursor-pointer')

      // Check card
      const card = screen.getByTestId('card')
      expect(card).toBeInTheDocument()
      expect(card).toHaveClass(
        'relative',
        'overflow-hidden',
        'rounded-xl',
        'bg-card',
        'transition-all',
        'duration-300',
        'hover:shadow-xl',
        'hover:scale-[1.02]',
        'hover:ring-2',
        'hover:ring-green-500',
        'hover:ring-offset-2',
        'border-0'
      )
    })

    it('should render with custom className', () => {
      const customClass = 'custom-category-card'
      renderWithProviders(
        <CategoryCard {...defaultProps} className={customClass} />
      )

      const card = screen.getByTestId('card')
      expect(card).toHaveClass(customClass)
    })

    it('should render image container with correct props', () => {
      renderWithProviders(<CategoryCard {...defaultProps} />)

      const imageContainer = screen.getByTestId('image-container')
      expect(imageContainer).toBeInTheDocument()
      expect(imageContainer).toHaveAttribute('data-src', defaultProps.imageUrl)
      expect(imageContainer).toHaveAttribute('data-alt', defaultProps.name)
      expect(imageContainer).toHaveClass('h-full', 'w-full')
    })

    it('should render overlay component with correct props', () => {
      renderWithProviders(<CategoryCard {...defaultProps} />)

      const overlay = screen.getByTestId('overlay-component')
      expect(overlay).toBeInTheDocument()
      expect(overlay).toHaveAttribute('data-title', defaultProps.name)
      expect(overlay).toHaveAttribute('data-visible', 'true')
    })

    it('should have correct aspect ratio container', () => {
      const { container } = renderWithProviders(
        <CategoryCard {...defaultProps} />
      )

      const aspectContainer = container.querySelector('.aspect-\\[3\\/2\\]')
      expect(aspectContainer).toBeInTheDocument()
      expect(aspectContainer).toHaveClass('relative')
    })
  })

  describe('Click behavior', () => {
    it('should handle click event', () => {
      renderWithProviders(<CategoryCard {...defaultProps} />)

      const container = screen.getByTestId('card').parentElement as HTMLElement
      fireEvent.click(container)

      // Check store method was called with category id
      expect(mockSetSearchPrefix).toHaveBeenCalledTimes(1)
      expect(mockSetSearchPrefix).toHaveBeenCalledWith(defaultProps.id)

      // Check router navigation
      expect(mockPush).toHaveBeenCalledTimes(1)
      expect(mockPush).toHaveBeenCalledWith('/products')
    })

    it('should handle multiple clicks', () => {
      renderWithProviders(<CategoryCard {...defaultProps} />)

      const container = screen.getByTestId('card').parentElement as HTMLElement

      // Click multiple times
      fireEvent.click(container)
      fireEvent.click(container)
      fireEvent.click(container)

      // Each click should trigger both actions
      expect(mockSetSearchPrefix).toHaveBeenCalledTimes(3)
      expect(mockPush).toHaveBeenCalledTimes(3)
    })

    it('should set search prefix before navigation', () => {
      const callOrder: string[] = []

      mockSetSearchPrefix.mockImplementation(() => {
        callOrder.push('setSearchPrefix')
      })

      mockPush.mockImplementation(() => {
        callOrder.push('push')
      })

      renderWithProviders(<CategoryCard {...defaultProps} />)

      const container = screen.getByTestId('card').parentElement as HTMLElement
      fireEvent.click(container)

      // Verify order of operations
      expect(callOrder).toEqual(['setSearchPrefix', 'push'])
    })
  })

  describe('Props variations', () => {
    it('should handle different category ids', () => {
      const categories = [
        { id: 'ELECTRONICS', name: 'Electronics' },
        { id: 'CLOTHING', name: 'Clothing' },
        { id: 'HOME_GARDEN', name: 'Home & Garden' },
        { id: 'SPORTS_001', name: 'Sports Equipment' },
      ]

      categories.forEach(category => {
        const { unmount } = renderWithProviders(
          <CategoryCard
            {...defaultProps}
            id={category.id}
            name={category.name}
          />
        )

        const container = screen.getByTestId('card')
          .parentElement as HTMLElement
        fireEvent.click(container)

        expect(mockSetSearchPrefix).toHaveBeenCalledWith(category.id)

        unmount()
        jest.clearAllMocks()
      })
    })

    it('should handle special characters in name', () => {
      const specialNames = [
        'Books & Media',
        'Health/Beauty',
        '"Special" Items',
        "Kids' Toys",
        'Café & Restaurant',
        '50% Off Items',
      ]

      specialNames.forEach(name => {
        const { unmount } = renderWithProviders(
          <CategoryCard {...defaultProps} name={name} />
        )

        const overlay = screen.getByTestId('overlay-component')
        expect(overlay).toHaveAttribute('data-title', name)

        unmount()
      })
    })

    it('should handle various image URLs', () => {
      const imageUrls = [
        'https://example.com/image.jpg',
        'https://cdn.example.com/categories/electronics.webp',
        '/local/image.png',
        '//protocol-relative.com/image.gif',
        '',
      ]

      imageUrls.forEach(imageUrl => {
        const { unmount } = renderWithProviders(
          <CategoryCard {...defaultProps} imageUrl={imageUrl} />
        )

        const imageContainer = screen.getByTestId('image-container')
        expect(imageContainer).toHaveAttribute('data-src', imageUrl)

        unmount()
      })
    })

    it('should handle empty strings', () => {
      renderWithProviders(<CategoryCard id="" name="" imageUrl="" />)

      const container = screen.getByTestId('card').parentElement as HTMLElement
      fireEvent.click(container)

      expect(mockSetSearchPrefix).toHaveBeenCalledWith('')
      expect(mockPush).toHaveBeenCalledWith('/products')
    })

    it('should handle very long names', () => {
      const longName = 'A'.repeat(200)
      renderWithProviders(<CategoryCard {...defaultProps} name={longName} />)

      const overlay = screen.getByTestId('overlay-component')
      expect(overlay).toHaveAttribute('data-title', longName)
    })
  })

  describe('Store integration', () => {
    it('should use store hook correctly', () => {
      renderWithProviders(<CategoryCard {...defaultProps} />)

      expect(mockUseCategorySearchStore).toHaveBeenCalledTimes(1)
      expect(mockUseCategorySearchStore).toHaveBeenCalledWith()
    })

    it('should handle store errors gracefully', () => {
      mockUseCategorySearchStore.mockImplementation(() => {
        throw new Error('Store error')
      })

      // Should throw the error (not catch it)
      expect(() => {
        renderWithProviders(<CategoryCard {...defaultProps} />)
      }).toThrow('Store error')
    })
  })

  describe('Router integration', () => {
    it('should use router hook correctly', () => {
      renderWithProviders(<CategoryCard {...defaultProps} />)

      expect(mockUseRouter).toHaveBeenCalledTimes(1)
      expect(mockUseRouter).toHaveBeenCalledWith()
    })

    it('should handle router errors gracefully', () => {
      mockUseRouter.mockImplementation(() => {
        throw new Error('Router error')
      })

      // Should throw the error (not catch it)
      expect(() => {
        renderWithProviders(<CategoryCard {...defaultProps} />)
      }).toThrow('Router error')
    })
  })

  describe('Edge cases', () => {
    it('should handle rapid clicks', () => {
      renderWithProviders(<CategoryCard {...defaultProps} />)

      const container = screen.getByTestId('card').parentElement as HTMLElement

      // Simulate rapid clicking
      for (let i = 0; i < 10; i++) {
        fireEvent.click(container)
      }

      expect(mockSetSearchPrefix).toHaveBeenCalledTimes(10)
      expect(mockPush).toHaveBeenCalledTimes(10)
    })

    it('should handle component unmounting during click', () => {
      const { unmount } = renderWithProviders(
        <CategoryCard {...defaultProps} />
      )

      const container = screen.getByTestId('card').parentElement as HTMLElement
      fireEvent.click(container)

      // Unmount immediately after click
      unmount()

      // Actions should still have been called
      expect(mockSetSearchPrefix).toHaveBeenCalledTimes(1)
      expect(mockPush).toHaveBeenCalledTimes(1)
    })
  })
})
