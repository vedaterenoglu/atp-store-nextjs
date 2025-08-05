/**
 * CategoriesGrid Component Test Suite
 * SOLID Principles: Single Responsibility - Test categories grid functionality
 * Design Patterns: Test Pattern - Unit tests with mocking
 * Dependencies: Jest, React Testing Library
 */

import { render, screen } from '@testing-library/react'
import { CategoriesGrid } from './CategoriesGrid'

// Mock the CategoryCard component
jest.mock('../molecules', () => ({
  CategoryCard: jest.fn(({ id, name, imageUrl }) => (
    <div
      data-testid={`category-card-${id}`}
      data-name={name}
      data-image-url={imageUrl}
    >
      Category Card: {name}
    </div>
  )),
}))

// Mock the Grid UI components
jest.mock('@/components/ui/custom/grid', () => ({
  GridErrorBoundary: jest.fn(({ children }) => (
    <div data-testid="grid-error-boundary">{children}</div>
  )),
  GridSkeleton: jest.fn(({ count, variant }) => (
    <div data-testid="grid-skeleton" data-count={count} data-variant={variant}>
      Loading skeletons...
    </div>
  )),
  GridItem: jest.fn(({ children }) => (
    <div data-testid="grid-item">{children}</div>
  )),
}))

// Mock the cn utility
jest.mock('@/components/ui/utils', () => ({
  cn: jest.fn((...classes) => classes.filter(Boolean).join(' ')),
}))

describe('CategoriesGrid', () => {
  const mockCategories = [
    {
      id: 'CAT_001',
      name: 'Electronics',
      companyId: 'COMP_001',
      imageUrl: 'https://example.com/electronics.jpg',
      altText: 'Electronics category',
    },
    {
      id: 'CAT_002',
      name: 'Clothing',
      companyId: 'COMP_001',
      imageUrl: 'https://example.com/clothing.jpg',
      altText: 'Clothing category',
    },
    {
      id: 'CAT_003',
      name: 'Home & Garden',
      companyId: 'COMP_001',
      imageUrl: 'https://example.com/home-garden.jpg',
      altText: 'Home and Garden category',
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Component rendering', () => {
    it('should render with categories', () => {
      render(<CategoriesGrid categories={mockCategories} />)

      // Check error boundary wrapper
      expect(screen.getByTestId('grid-error-boundary')).toBeInTheDocument()

      // Check grid container
      const gridContainer = screen.getByTestId('grid-error-boundary').firstChild
      expect(gridContainer).toHaveClass(
        'mx-auto',
        'grid',
        'w-full',
        'max-w-7xl',
        'gap-4',
        'grid-cols-1',
        'sm:grid-cols-2',
        'lg:grid-cols-3',
        'px-4',
        'sm:px-6',
        'lg:px-8'
      )

      // Check all categories are rendered
      mockCategories.forEach(category => {
        const card = screen.getByTestId(`category-card-${category.id}`)
        expect(card).toBeInTheDocument()
        expect(card).toHaveAttribute('data-name', category.name)
        expect(card).toHaveAttribute('data-image-url', category.imageUrl)
      })

      // Check GridItem wrappers
      const gridItems = screen.getAllByTestId('grid-item')
      expect(gridItems).toHaveLength(mockCategories.length)
    })

    it('should render with custom className', () => {
      const customClass = 'custom-grid-class mt-8'
      const { container } = render(
        <CategoriesGrid categories={mockCategories} className={customClass} />
      )

      const gridContainer = container.querySelector('.mx-auto.grid')
      expect(gridContainer).toHaveClass(customClass)
    })

    it('should render empty grid when no categories', () => {
      render(<CategoriesGrid categories={[]} />)

      // Error boundary should still be present
      expect(screen.getByTestId('grid-error-boundary')).toBeInTheDocument()

      // No category cards or grid items
      expect(screen.queryAllByTestId('grid-item')).toHaveLength(0)
      expect(screen.queryByText(/Category Card:/)).not.toBeInTheDocument()
    })
  })

  describe('Loading state', () => {
    it('should show loading skeleton when isLoading is true', () => {
      render(<CategoriesGrid categories={[]} isLoading={true} />)

      const skeleton = screen.getByTestId('grid-skeleton')
      expect(skeleton).toBeInTheDocument()
      expect(skeleton).toHaveAttribute('data-count', '6')
      expect(skeleton).toHaveAttribute('data-variant', 'card')

      // Should not render categories when loading
      expect(screen.queryAllByTestId('grid-item')).toHaveLength(0)
    })

    it('should show categories when isLoading is false', () => {
      render(<CategoriesGrid categories={mockCategories} isLoading={false} />)

      // Should not show skeleton
      expect(screen.queryByTestId('grid-skeleton')).not.toBeInTheDocument()

      // Should show categories
      expect(screen.getAllByTestId('grid-item')).toHaveLength(
        mockCategories.length
      )
    })

    it('should prefer loading state over categories', () => {
      render(<CategoriesGrid categories={mockCategories} isLoading={true} />)

      // Should show skeleton even with categories provided
      expect(screen.getByTestId('grid-skeleton')).toBeInTheDocument()
      expect(screen.queryAllByTestId('grid-item')).toHaveLength(0)
    })
  })

  describe('Error handling', () => {
    it('should throw error when error prop is provided', () => {
      const testError = new Error('Test error message')

      expect(() => {
        render(<CategoriesGrid categories={[]} error={testError} />)
      }).toThrow('Test error message')
    })

    it('should handle different error types', () => {
      const errors = [
        new Error('Network error'),
        new TypeError('Type error'),
        new ReferenceError('Reference error'),
      ]

      errors.forEach(error => {
        expect(() => {
          render(<CategoriesGrid categories={[]} error={error} />)
        }).toThrow(error.message)
      })
    })

    it('should not throw when error is null', () => {
      expect(() => {
        render(<CategoriesGrid categories={mockCategories} error={null} />)
      }).not.toThrow()

      expect(screen.getAllByTestId('grid-item')).toHaveLength(
        mockCategories.length
      )
    })

    it('should not throw when error is undefined', () => {
      expect(() => {
        render(<CategoriesGrid categories={mockCategories} error={undefined} />)
      }).not.toThrow()

      expect(screen.getAllByTestId('grid-item')).toHaveLength(
        mockCategories.length
      )
    })

    it('should throw error before rendering anything', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      const testError = new Error('Early error')

      try {
        render(<CategoriesGrid categories={mockCategories} error={testError} />)
      } catch {
        // Error boundary should not be rendered
        expect(
          screen.queryByTestId('grid-error-boundary')
        ).not.toBeInTheDocument()
      }

      consoleSpy.mockRestore()
    })
  })

  describe('Category data variations', () => {
    it('should handle single category', () => {
      const firstCategory = mockCategories[0]
      const singleCategory = firstCategory ? [firstCategory] : []
      render(<CategoriesGrid categories={singleCategory} />)

      expect(screen.getAllByTestId('grid-item')).toHaveLength(1)
      if (firstCategory) {
        expect(
          screen.getByTestId(`category-card-${firstCategory.id}`)
        ).toBeInTheDocument()
      }
    })

    it('should handle many categories', () => {
      const manyCategories = Array.from({ length: 20 }, (_, i) => ({
        id: `CAT_${i.toString().padStart(3, '0')}`,
        name: `Category ${i + 1}`,
        companyId: 'COMP_001',
        imageUrl: `https://example.com/cat-${i}.jpg`,
        altText: `Category ${i + 1} image`,
      }))

      render(<CategoriesGrid categories={manyCategories} />)

      expect(screen.getAllByTestId('grid-item')).toHaveLength(20)
    })

    it('should handle categories with special characters', () => {
      const specialCategories = [
        {
          id: 'CAT_SPECIAL_1',
          name: 'Books & Media',
          companyId: 'COMP_001',
          imageUrl: 'https://example.com/books.jpg',
          altText: 'Books & Media',
        },
        {
          id: 'CAT_SPECIAL_2',
          name: '"Special" Offers',
          companyId: 'COMP_001',
          imageUrl: 'https://example.com/special.jpg',
          altText: 'Special Offers',
        },
        {
          id: 'CAT_SPECIAL_3',
          name: "Kids' Toys",
          companyId: 'COMP_001',
          imageUrl: 'https://example.com/kids.jpg',
          altText: "Kids' Toys",
        },
      ]

      render(<CategoriesGrid categories={specialCategories} />)

      specialCategories.forEach(category => {
        const card = screen.getByTestId(`category-card-${category.id}`)
        expect(card).toHaveAttribute('data-name', category.name)
      })
    })

    it('should handle categories with empty fields', () => {
      const emptyFieldCategories = [
        {
          id: 'EMPTY_1',
          name: '',
          companyId: '',
          imageUrl: '',
          altText: '',
        },
        {
          id: 'EMPTY_2',
          name: 'Valid Name',
          companyId: 'COMP_001',
          imageUrl: '',
          altText: '',
        },
      ]

      render(<CategoriesGrid categories={emptyFieldCategories} />)

      emptyFieldCategories.forEach(category => {
        const card = screen.getByTestId(`category-card-${category.id}`)
        expect(card).toBeInTheDocument()
      })
    })

    it('should maintain category order', () => {
      render(<CategoriesGrid categories={mockCategories} />)

      const gridItems = screen.getAllByTestId('grid-item')

      // Check that categories appear in the same order
      mockCategories.forEach((category, index) => {
        const card = gridItems[index]?.querySelector(
          `[data-testid="category-card-${category.id}"]`
        )
        expect(card).toBeInTheDocument()
      })
    })
  })

  describe('Props combinations', () => {
    it('should handle loading with error (error takes precedence)', () => {
      const testError = new Error('Error takes precedence')

      expect(() => {
        render(
          <CategoriesGrid
            categories={mockCategories}
            isLoading={true}
            error={testError}
          />
        )
      }).toThrow('Error takes precedence')
    })

    it('should handle loading with className', () => {
      render(
        <CategoriesGrid
          categories={[]}
          isLoading={true}
          className="loading-custom-class"
        />
      )

      const gridContainer = screen.getByTestId('grid-error-boundary')
        .firstChild as HTMLElement
      expect(gridContainer).toHaveClass('loading-custom-class')
      expect(screen.getByTestId('grid-skeleton')).toBeInTheDocument()
    })

    it('should handle all props together (no error)', () => {
      render(
        <CategoriesGrid
          categories={mockCategories}
          className="all-props-class"
          isLoading={false}
          error={null}
        />
      )

      const gridContainer = screen.getByTestId('grid-error-boundary').firstChild
      expect(gridContainer).toHaveClass('all-props-class')
      expect(screen.getAllByTestId('grid-item')).toHaveLength(
        mockCategories.length
      )
    })
  })

  describe('Default props', () => {
    it('should default isLoading to false', () => {
      render(<CategoriesGrid categories={mockCategories} />)

      // Should show categories, not skeleton
      expect(screen.queryByTestId('grid-skeleton')).not.toBeInTheDocument()
      expect(screen.getAllByTestId('grid-item')).toHaveLength(
        mockCategories.length
      )
    })

    it('should default error to null', () => {
      expect(() => {
        render(<CategoriesGrid categories={mockCategories} />)
      }).not.toThrow()
    })
  })
})
