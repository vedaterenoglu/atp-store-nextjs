/**
 * Centralized Products Mocks
 * SOLID Principles: SRP - Single responsibility for products mocking
 * Design Patterns: Factory Pattern for mock creation
 * Dependencies: React, Jest
 */

import React from 'react'

/**
 * Centralized mock for ProductsPage component
 */
export const mockProductsPage = jest.fn(
  (props: { products: Array<{ id: string; imageUrl: string }> }) => {
    const { products } = props
    return (
      <div data-testid="products-page">
        <div data-testid="products-count">{products.length}</div>
        {products.map(product => (
          <div key={product.id} data-testid={`product-${product.id}`}>
            {product.imageUrl}
          </div>
        ))}
      </div>
    )
  }
)

/**
 * Centralized mock for BookmarkProvider
 */
export const mockBookmarkProvider = jest.fn(
  ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>
  }
)

/**
 * Centralized mock for console.error
 */
export const mockConsoleError = jest.fn()

/**
 * Module export for jest.mock('@/components/products')
 */
export const productsComponentModule = {
  ProductsPage: mockProductsPage,
}

/**
 * Module export for jest.mock('@/components/providers/bookmark-provider')
 */
export const bookmarkProviderModule = {
  BookmarkProvider: mockBookmarkProvider,
}
