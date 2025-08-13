/**
 * Categories Page Test Suite
 * SOLID Principles: Single Responsibility - Test categories page component
 * Design Patterns: Test Pattern - Unit tests with mocking
 * Dependencies: Jest, React Testing Library, mock data
 */

import { render } from '@testing-library/react'
import Page from '../page'
import { getCategories } from '@/services'
import mockCategoriesData from '@/mock/categories.json'

// Define the expected transformed categories type
interface TransformedCategory {
  id: string
  name: string
  companyId: string
  imageUrl: string
  altText: string
}

// Mock services
jest.mock('@/services', () => ({
  getCategories: jest.fn(),
}))

// Mock CategoriesPage component with proper typing
interface MockCategoriesPageProps {
  categories: TransformedCategory[]
  error?: Error | null
}

jest.mock('@/components/categories', () => ({
  CategoriesPage: jest.fn(({ categories, error }: MockCategoriesPageProps) => (
    <div
      data-testid="categories-page"
      data-categories={JSON.stringify(categories)}
    >
      Categories Page
      <div data-testid="categories-count">{categories?.length || 0}</div>
      {error && <div data-testid="error-state">Error: {error.message}</div>}
    </div>
  )),
}))

// Type the mock
const mockGetCategories = getCategories as jest.MockedFunction<
  typeof getCategories
>

describe('Categories Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Successful data fetching', () => {
    it('should render CategoriesPage with fetched categories', async () => {
      // Transform mock data to match expected format
      const transformedCategories: TransformedCategory[] =
        mockCategoriesData.map(cat => ({
          id: cat.stock_groups,
          name: cat.stock_groups,
          companyId: cat.our_company,
          imageUrl: cat.image_url,
          altText: cat.alt_text,
        }))

      mockGetCategories.mockResolvedValueOnce(transformedCategories)

      const { findByTestId } = render(await Page())

      // Verify CategoriesPage was rendered with categories
      const categoriesPage = await findByTestId('categories-page')
      expect(categoriesPage).toBeInTheDocument()

      // Verify correct number of categories passed
      const categoriesCount = await findByTestId('categories-count')
      expect(categoriesCount).toHaveTextContent('13')

      // Verify getCategories was called
      expect(mockGetCategories).toHaveBeenCalledTimes(1)
    })

    it('should render CategoriesPage with empty array when no categories', async () => {
      mockGetCategories.mockResolvedValueOnce([])

      const { findByTestId } = render(await Page())

      // Verify CategoriesPage was rendered
      const categoriesPage = await findByTestId('categories-page')
      expect(categoriesPage).toBeInTheDocument()

      // Verify zero categories
      const categoriesCount = await findByTestId('categories-count')
      expect(categoriesCount).toHaveTextContent('0')
    })
  })

  describe('Error handling', () => {
    it('should pass error to CategoriesPage when getCategories throws', async () => {
      const testError = new Error('Failed to fetch categories')
      mockGetCategories.mockRejectedValueOnce(testError)

      const { findByTestId } = render(await Page())

      // Verify CategoriesPage was rendered with error
      const categoriesPage = await findByTestId('categories-page')
      expect(categoriesPage).toBeInTheDocument()

      // Verify error state
      const errorState = await findByTestId('error-state')
      expect(errorState).toHaveTextContent('Error: Failed to fetch categories')

      // Verify getCategories was called
      expect(mockGetCategories).toHaveBeenCalledTimes(1)
    })

    it('should handle non-Error objects thrown by getCategories', async () => {
      const testError = { message: 'String error' }
      mockGetCategories.mockRejectedValueOnce(testError)

      const { findByTestId } = render(await Page())

      // Verify CategoriesPage was rendered
      const categoriesPage = await findByTestId('categories-page')
      expect(categoriesPage).toBeInTheDocument()

      // Verify error was passed as Error object
      const errorState = await findByTestId('error-state')
      expect(errorState).toHaveTextContent('Error: String error')
    })
  })

  describe('Metadata', () => {
    it('should export correct metadata', () => {
      // Import metadata from the page
      const pageModule = jest.requireActual('../page') as { metadata: unknown }

      expect(pageModule.metadata).toEqual({
        title: 'Categories | ATP Store',
        description: 'Browse our product categories',
      })
    })
  })
})
