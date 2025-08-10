/**
 * Centralized Products Page Mocks
 * SOLID Principles: SRP - Single responsibility for products page mocking
 * Design Patterns: Factory Pattern for mock creation
 * Dependencies: None (uses require for React in mock context)
 */

// Export mock functions that will be used in jest.mock
export const createProductsPageMock = () => {
  const React = require('react')
  return {
    ProductsPage:
      require('@/__tests__/utils/fetch-mock').createMockComponentWithRender(
        (props: Record<string, unknown>) => {
          const products = props.products as Array<{
            id: string
            imageUrl: string
          }>
          return React.createElement(
            'div',
            { 'data-testid': 'products-page' },
            React.createElement(
              'div',
              { 'data-testid': 'products-count' },
              products.length
            ),
            ...products.map((product: { id: string; imageUrl: string }) =>
              React.createElement(
                'div',
                { key: product.id, 'data-testid': `product-${product.id}` },
                product.imageUrl
              )
            )
          )
        }
      ),
  }
}

// Create console error mock
export const createConsoleErrorMock = () => {
  return require('@/__tests__/utils/fetch-mock').createMockConsoleMethod()
}
