/**
 * CategoriesPage Component Test Suite
 * SOLID Principles: Single Responsibility - Test categories page template
 * Design Patterns: Test Pattern - Unit tests with mocking
 * Dependencies: Jest, React Testing Library
 */

import { render, screen } from '@testing-library/react'
import { CategoriesPage } from './CategoriesPage'
import { useTranslation } from 'react-i18next'

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}))

// Mock atomic components
jest.mock('../atoms', () => ({
  PageTitle: jest.fn(({ children }) => (
    <h1 data-testid="page-title">{children}</h1>
  )),
  ViewAllProductsButton: jest.fn(() => (
    <button data-testid="view-all-products-button">View All Products</button>
  )),
}))

// Mock organisms
jest.mock('../organisms', () => ({
  CategoriesGrid: jest.fn(({ categories, error }) => (
    <div
      data-testid="categories-grid"
      data-categories-count={categories.length}
      data-error={error?.message || ''}
    >
      Categories Grid
    </div>
  )),
}))

const mockUseTranslation = useTranslation as jest.MockedFunction<
  typeof useTranslation
>

describe('CategoriesPage', () => {
  const mockT = jest.fn((key: string, defaultValue?: string): string => {
    const translations: Record<string, string> = {
      title: 'Product Categories',
    }
    return translations[key] || defaultValue || key
  })

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
    mockUseTranslation.mockReturnValue({
      t: mockT,
      i18n: {
        changeLanguage: jest.fn(),
        language: 'en',
        languages: ['en'],
        isInitialized: true,
      } as never,
      ready: true,
    } as never)
  })

  describe('Component rendering', () => {
    it('should render with categories', () => {
      render(<CategoriesPage categories={mockCategories} />)

      // Check main container
      const mainContainer = screen.getByTestId('page-title').parentElement
        ?.parentElement?.parentElement as HTMLElement
      expect(mainContainer).toBeInTheDocument()
      expect(mainContainer).toHaveClass(
        'min-h-screen',
        'py-8',
        'sm:py-12',
        'lg:py-16'
      )

      // Check header section
      const headerSection = mainContainer.firstChild
      expect(headerSection).toHaveClass(
        'mx-auto',
        'mb-8',
        'max-w-[1200px]',
        'px-4',
        'sm:mb-12',
        'sm:px-6',
        'lg:px-8'
      )

      // Check flex container
      const flexContainer = screen.getByTestId('page-title')
        .parentElement as HTMLElement
      expect(flexContainer).toHaveClass(
        'flex',
        'flex-col',
        'items-start',
        'justify-between',
        'gap-4',
        'sm:flex-row',
        'sm:items-center'
      )

      // Check page title
      expect(screen.getByTestId('page-title')).toBeInTheDocument()
      expect(screen.getByTestId('page-title')).toHaveTextContent(
        'Product Categories'
      )

      // Check view all products button
      expect(screen.getByTestId('view-all-products-button')).toBeInTheDocument()

      // Check categories grid
      const grid = screen.getByTestId('categories-grid')
      expect(grid).toBeInTheDocument()
      expect(grid).toHaveAttribute('data-categories-count', '3')
      expect(grid).toHaveAttribute('data-error', '')
    })

    it('should render with empty categories', () => {
      render(<CategoriesPage categories={[]} />)

      const grid = screen.getByTestId('categories-grid')
      expect(grid).toHaveAttribute('data-categories-count', '0')
    })

    it('should render with error', () => {
      const testError = new Error('Test error message')
      render(<CategoriesPage categories={[]} error={testError} />)

      const grid = screen.getByTestId('categories-grid')
      expect(grid).toHaveAttribute('data-error', 'Test error message')
    })
  })

  describe('Translation integration', () => {
    it('should use translation hook', () => {
      render(<CategoriesPage categories={mockCategories} />)

      expect(mockUseTranslation).toHaveBeenCalledTimes(1)
      expect(mockUseTranslation).toHaveBeenCalledWith('categories')
    })

    it('should translate page title', () => {
      render(<CategoriesPage categories={mockCategories} />)

      expect(mockT).toHaveBeenCalledWith('title', 'Categories')
      expect(screen.getByTestId('page-title')).toHaveTextContent(
        'Product Categories'
      )
    })

    it('should use fallback when translation missing', () => {
      mockT.mockImplementation(
        (_key: string, defaultValue?: string): string => {
          return defaultValue || _key
        }
      )

      render(<CategoriesPage categories={mockCategories} />)

      expect(screen.getByTestId('page-title')).toHaveTextContent('Categories')
    })

    it('should use key when no fallback provided', () => {
      mockT.mockImplementation((key: string): string => key)

      render(<CategoriesPage categories={mockCategories} />)

      expect(screen.getByTestId('page-title')).toHaveTextContent('title')
    })

    it('should handle different languages', () => {
      const translations: Record<string, Record<string, string>> = {
        en: { title: 'Categories' },
        es: { title: 'Categorías' },
        fr: { title: 'Catégories' },
        de: { title: 'Kategorien' },
      }

      let currentLang = 'en'

      mockT.mockImplementation((key: string, defaultValue?: string): string => {
        return translations[currentLang]?.[key] || defaultValue || key
      })

      // Test different languages
      Object.entries(translations).forEach(([lang, trans]) => {
        currentLang = lang
        mockUseTranslation.mockReturnValue({
          t: mockT,
          i18n: {
            language: lang,
          } as never,
          ready: true,
        } as never)

        const { unmount } = render(
          <CategoriesPage categories={mockCategories} />
        )

        expect(screen.getByTestId('page-title')).toHaveTextContent(
          trans['title'] || ''
        )

        unmount()
      })
    })
  })

  describe('Error handling', () => {
    it('should pass error to CategoriesGrid', () => {
      const errors = [
        new Error('Network error'),
        new TypeError('Type error'),
        new ReferenceError('Reference error'),
        null,
        undefined,
      ]

      errors.forEach(error => {
        const { unmount } = render(
          <CategoriesPage
            categories={mockCategories}
            error={error as Error | null}
          />
        )

        const grid = screen.getByTestId('categories-grid')
        expect(grid).toHaveAttribute('data-error', error?.message || '')

        unmount()
      })
    })

    it('should render normally when error is null', () => {
      render(<CategoriesPage categories={mockCategories} error={null} />)

      expect(screen.getByTestId('page-title')).toBeInTheDocument()
      expect(screen.getByTestId('view-all-products-button')).toBeInTheDocument()
      expect(screen.getByTestId('categories-grid')).toBeInTheDocument()
    })

    it('should render normally when error is undefined', () => {
      render(<CategoriesPage categories={mockCategories} />)

      expect(screen.getByTestId('page-title')).toBeInTheDocument()
      expect(screen.getByTestId('view-all-products-button')).toBeInTheDocument()
      expect(screen.getByTestId('categories-grid')).toBeInTheDocument()
    })

    it('should not render error prop when not provided', () => {
      render(<CategoriesPage categories={mockCategories} />)

      const grid = screen.getByTestId('categories-grid')
      expect(grid).toHaveAttribute('data-error', '')
    })
  })

  describe('Categories data variations', () => {
    it('should handle single category', () => {
      const firstCategory = mockCategories[0]
      const singleCategory = firstCategory ? [firstCategory] : []
      render(<CategoriesPage categories={singleCategory} />)

      const grid = screen.getByTestId('categories-grid')
      expect(grid).toHaveAttribute('data-categories-count', '1')
    })

    it('should handle many categories', () => {
      const manyCategories = Array.from({ length: 50 }, (_, i) => ({
        id: `CAT_${i}`,
        name: `Category ${i}`,
        companyId: 'COMP_001',
        imageUrl: `https://example.com/cat-${i}.jpg`,
        altText: `Category ${i}`,
      }))

      render(<CategoriesPage categories={manyCategories} />)

      const grid = screen.getByTestId('categories-grid')
      expect(grid).toHaveAttribute('data-categories-count', '50')
    })

    it('should handle categories with special data', () => {
      const specialCategories = [
        {
          id: '',
          name: '',
          companyId: '',
          imageUrl: '',
          altText: '',
        },
        {
          id: 'SPECIAL_&_CHARS',
          name: 'Special & Characters "Test"',
          companyId: 'COMP_<>',
          imageUrl: 'data:image/jpeg;base64,/9j/4AAQ',
          altText: 'Alt text with <tags>',
        },
      ]

      render(<CategoriesPage categories={specialCategories} />)

      const grid = screen.getByTestId('categories-grid')
      expect(grid).toHaveAttribute('data-categories-count', '2')
    })
  })

  describe('Component structure', () => {
    it('should have correct DOM hierarchy', () => {
      const { container } = render(
        <CategoriesPage categories={mockCategories} />
      )

      // Main container > Header section > Flex container > [PageTitle, ViewAllProductsButton]
      const mainDiv = container.firstChild
      expect(mainDiv).toHaveClass('min-h-screen')

      const headerSection = mainDiv?.firstChild
      expect(headerSection).toHaveClass('mx-auto')

      const flexContainer = headerSection?.firstChild
      expect(flexContainer).toHaveClass('flex')

      const pageTitle = flexContainer?.firstChild
      expect(pageTitle).toHaveAttribute('data-testid', 'page-title')

      const button = flexContainer?.lastChild
      expect(button).toHaveAttribute('data-testid', 'view-all-products-button')

      // Categories grid as sibling to header section
      const grid = mainDiv?.lastChild
      expect(grid).toHaveAttribute('data-testid', 'categories-grid')
    })
  })

  describe('Props combinations', () => {
    it('should handle all props together', () => {
      const testError = new Error('Combined test')
      render(<CategoriesPage categories={mockCategories} error={testError} />)

      // All components should render
      expect(screen.getByTestId('page-title')).toBeInTheDocument()
      expect(screen.getByTestId('view-all-products-button')).toBeInTheDocument()

      const grid = screen.getByTestId('categories-grid')
      expect(grid).toHaveAttribute('data-categories-count', '3')
      expect(grid).toHaveAttribute('data-error', 'Combined test')
    })

    it('should handle missing optional props', () => {
      // Only categories is required
      render(<CategoriesPage categories={mockCategories} />)

      expect(screen.getByTestId('categories-grid')).toBeInTheDocument()
    })
  })

  describe('Edge cases', () => {
    it('should handle rapid re-renders', () => {
      const { rerender } = render(
        <CategoriesPage categories={mockCategories} />
      )

      // Rapid re-renders with different data
      for (let i = 0; i < 10; i++) {
        const categories = mockCategories.slice(0, (i % 3) + 1)
        rerender(<CategoriesPage categories={categories} />)
      }

      // Should still render correctly
      expect(screen.getByTestId('page-title')).toBeInTheDocument()
      expect(screen.getByTestId('categories-grid')).toBeInTheDocument()
    })

    it('should handle translation loading state', () => {
      mockUseTranslation.mockReturnValue({
        t: mockT,
        i18n: {} as never,
        ready: false, // Not ready
      } as never)

      render(<CategoriesPage categories={mockCategories} />)

      // Should still render with fallback
      expect(screen.getByTestId('page-title')).toBeInTheDocument()
    })

    it('should handle translation errors', () => {
      mockT.mockImplementation(() => {
        throw new Error('Translation error')
      })

      expect(() => {
        render(<CategoriesPage categories={mockCategories} />)
      }).toThrow('Translation error')
    })
  })
})
