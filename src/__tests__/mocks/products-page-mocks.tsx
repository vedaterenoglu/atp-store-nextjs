/**
 * Centralized Products Page Mocks
 * SOLID Principles: SRP - Single responsibility for products page mocking
 * Design Patterns: Factory Pattern for mock creation
 * Dependencies: React, Jest
 */

import React from 'react'

/**
 * Mock ProductsPage component
 */
export const MockProductsPage = jest.fn(
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
 * Mock console.error
 */
export const mockConsoleError = jest.fn()

/**
 * Export the complete mock module for products component
 */
export const productsComponentMocks = {
  ProductsPage: MockProductsPage,
}
