/**
 * Products Page Test Suite
 * SOLID Principles: Single Responsibility - Test products page component
 * Design Patterns: Test Pattern - Unit tests with mocking
 * Dependencies: Jest, React Testing Library, mock data
 */

import { render } from '@testing-library/react'
import Page from './page'
import { getProducts } from '@/services'

// Mock the dependencies
jest.mock('@/services')
jest.mock('@/components/products', () => ({
  ProductsPage: jest.fn(({ products }) => (
    <div data-testid="products-page">
      <div data-testid="products-count">{products.length}</div>
      {products.map((product: { id: string; imageUrl: string }) => (
        <div key={product.id} data-testid={`product-${product.id}`}>
          {product.imageUrl}
        </div>
      ))}
    </div>
  )),
}))

// Mock console.error to track error logging
const originalConsoleError = console.error
beforeAll(() => {
  console.error = jest.fn()
})

afterAll(() => {
  console.error = originalConsoleError
})

// Type the mock
const mockGetProducts = getProducts as jest.MockedFunction<typeof getProducts>

// Import the correct Product type
import type { Product } from '@/services/utils/product-transforms'

describe('Products Page', () => {
  const fallbackImageUrl =
    'https://res.cloudinary.com/dnptbuf0s/image/upload/v1754299206/samples/atp-store-customer/alfe-fallback_nopd5j.jpg'

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Successful data fetching', () => {
    it('should render ProductsPage with fetched products', async () => {
      // Create mock products without imageUrl
      const mockProducts: Product[] = [
        {
          id: '1001',
          name: 'Product 1',
          price: 100,
          unit: 'pcs',
          categoryId: 'cat1',
          stock: 10,
          imageUrl: '/placeholder-product.png',
        },
        {
          id: '1002',
          name: 'Product 2',
          price: 200,
          unit: 'pcs',
          categoryId: 'cat2',
          stock: 5,
          imageUrl: 'https://example.com/product2.jpg',
        },
      ]

      mockGetProducts.mockResolvedValueOnce(mockProducts)

      const { findByTestId } = render(await Page())

      // Verify ProductsPage was rendered
      const productsPage = await findByTestId('products-page')
      expect(productsPage).toBeInTheDocument()

      // Verify correct number of products
      const productsCount = await findByTestId('products-count')
      expect(productsCount).toHaveTextContent('2')

      // Verify getProducts was called
      expect(mockGetProducts).toHaveBeenCalledTimes(1)
    })

    it('should add fallback imageUrl to products without images', async () => {
      const mockProducts: Product[] = [
        {
          id: '1001',
          name: 'Product without image',
          price: 100,
          unit: 'pcs',
          categoryId: 'cat1',
          stock: 15,
          imageUrl: '',
        },
        {
          id: '1002',
          name: 'Product with image',
          price: 200,
          unit: 'pcs',
          categoryId: 'cat2',
          stock: 8,
          imageUrl: 'https://example.com/existing.jpg',
        },
      ]

      mockGetProducts.mockResolvedValueOnce(mockProducts)

      const { findByTestId } = render(await Page())

      // Check first product has fallback image applied by page component
      const product1 = await findByTestId('product-1001')
      expect(product1).toHaveTextContent(fallbackImageUrl)

      // Check second product keeps its original image
      const product2 = await findByTestId('product-1002')
      expect(product2).toHaveTextContent('https://example.com/existing.jpg')
    })

    it('should handle empty products array', async () => {
      mockGetProducts.mockResolvedValueOnce([])

      const { findByTestId } = render(await Page())

      // Verify ProductsPage was rendered with empty array
      const productsPage = await findByTestId('products-page')
      expect(productsPage).toBeInTheDocument()

      // Verify zero products
      const productsCount = await findByTestId('products-count')
      expect(productsCount).toHaveTextContent('0')
    })

    it('should transform all products with map function', async () => {
      // Create a larger array to ensure map is properly tested
      const mockProducts: Product[] = Array.from({ length: 5 }, (_, i) => {
        const product: Product = {
          id: `prod-${i}`,
          name: `Product ${i}`,
          price: (i + 1) * 100,
          unit: 'pcs',
          categoryId: `cat-${i}`,
          stock: i * 5,
          imageUrl: i % 2 === 0 ? '' : `https://example.com/prod-${i}.jpg`,
        }
        return product
      })

      mockGetProducts.mockResolvedValueOnce(mockProducts)

      const { findByTestId } = render(await Page())

      // Verify all products are rendered
      const productsCount = await findByTestId('products-count')
      expect(productsCount).toHaveTextContent('5')

      // Verify products with and without images
      for (let i = 0; i < 5; i++) {
        const product = await findByTestId(`product-prod-${i}`)
        if (i % 2 === 0) {
          // Even indices should have fallback image (empty string gets fallback)
          expect(product).toHaveTextContent(fallbackImageUrl)
        } else {
          // Odd indices should have original image
          expect(product).toHaveTextContent(`https://example.com/prod-${i}.jpg`)
        }
      }
    })
  })

  describe('Error handling', () => {
    it('should handle getProducts error and return empty array', async () => {
      const testError = new Error('Failed to fetch from GraphQL')
      mockGetProducts.mockRejectedValueOnce(testError)

      const { findByTestId } = render(await Page())

      // Verify ProductsPage was rendered with empty array
      const productsPage = await findByTestId('products-page')
      expect(productsPage).toBeInTheDocument()

      const productsCount = await findByTestId('products-count')
      expect(productsCount).toHaveTextContent('0')

      // Verify error was logged
      expect(console.error).toHaveBeenCalledWith(
        'Failed to fetch products:',
        testError
      )
    })

    it('should log non-Error objects when getProducts fails', async () => {
      const testError = { message: 'Network error', code: 500 }
      mockGetProducts.mockRejectedValueOnce(testError)

      const { findByTestId } = render(await Page())

      // Verify empty products rendered
      const productsCount = await findByTestId('products-count')
      expect(productsCount).toHaveTextContent('0')

      // Verify error object was logged
      expect(console.error).toHaveBeenCalledWith(
        'Failed to fetch products:',
        testError
      )
    })

    it('should handle string errors from getProducts', async () => {
      const testError = 'Connection timeout'
      mockGetProducts.mockRejectedValueOnce(testError)

      const { findByTestId } = render(await Page())

      // Verify empty products rendered
      const productsCount = await findByTestId('products-count')
      expect(productsCount).toHaveTextContent('0')

      // Verify string error was logged
      expect(console.error).toHaveBeenCalledWith(
        'Failed to fetch products:',
        testError
      )
    })
  })

  describe('Metadata', () => {
    it('should export correct metadata', () => {
      // Import metadata from the page
      const pageModule = jest.requireActual('./page') as { metadata: unknown }

      expect(pageModule.metadata).toEqual({
        title: 'Products | ATP Store',
        description: 'Browse our product catalog',
      })
    })
  })

  describe('Image URL fallback logic', () => {
    it('should use fallback when imageUrl is empty', async () => {
      const mockProducts: Product[] = [
        {
          id: '1',
          name: 'Test',
          price: 100,
          unit: 'pcs',
          categoryId: 'cat1',
          stock: 0,
          imageUrl: '',
        },
      ]

      mockGetProducts.mockResolvedValueOnce(mockProducts)

      const { findByTestId } = render(await Page())

      const product = await findByTestId('product-1')
      expect(product).toHaveTextContent(fallbackImageUrl)
    })

    it('should use fallback when imageUrl is empty string', async () => {
      const mockProducts: Product[] = [
        {
          id: '1',
          name: 'Test',
          price: 100,
          unit: 'pcs',
          categoryId: 'cat1',
          stock: 0,
          imageUrl: '',
        },
      ]

      mockGetProducts.mockResolvedValueOnce(mockProducts)

      const { findByTestId } = render(await Page())

      const product = await findByTestId('product-1')
      expect(product).toHaveTextContent(fallbackImageUrl)
    })

    it('should preserve existing imageUrl when present', async () => {
      const customImageUrl = 'https://custom.com/image.jpg'
      const mockProducts: Product[] = [
        {
          id: '1',
          name: 'Test',
          price: 100,
          unit: 'pcs',
          categoryId: 'cat1',
          stock: 0,
          imageUrl: customImageUrl,
        },
      ]

      mockGetProducts.mockResolvedValueOnce(mockProducts)

      const { findByTestId } = render(await Page())

      const product = await findByTestId('product-1')
      expect(product).toHaveTextContent(customImageUrl)
    })
  })
})
