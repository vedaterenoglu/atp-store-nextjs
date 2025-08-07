/**
 * MSW GraphQL Handlers for Service Tests
 * SOLID Principles: SRP - Single responsibility for GraphQL mocking
 * Design Patterns: Factory Pattern for handler creation
 * Dependencies: MSW
 */

import { graphql, HttpResponse } from 'msw'

// Get the actual GraphQL endpoint from environment - use real backend
const GRAPHQL_ENDPOINT =
  process.env['NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT'] ||
  'https://gtbs-crm-backend-app.herokuapp.com/v1/graphql'

// Create GraphQL link for the actual endpoint
const gql = graphql.link(GRAPHQL_ENDPOINT)

export const serviceHandlers = [
  // Handler for MockQuery (Apollo Client introspection)
  gql.query('MockQuery', () => {
    return HttpResponse.json({
      data: {
        mock: true,
      },
    })
  }),

  // Handler for GetMostPurchasedProducts query
  gql.query('GetMostPurchasedProducts', () => {
    // Return mock data matching the actual GraphQL schema
    return HttpResponse.json({
      data: {
        goods_transactions: [
          {
            stock_id: 'MAT001',
            goods_transactions_stock_rel: {
              stock_id: 'MAT001',
              stock_name: 'Product 1',
              stock_price: 25.5,
              stock_unit: 'pcs',
              stock_group: 'CATEGORY1',
              stock_image_link: 'https://example.com/product1.jpg',
            },
            goods_transaction_goods_transaction_rel_aggregate: {
              aggregate: {
                sum: {
                  amount_credit: -100,
                },
              },
            },
          },
          {
            stock_id: 'MAT002',
            goods_transactions_stock_rel: {
              stock_id: 'MAT002',
              stock_name: 'Product 2',
              stock_price: 15.75,
              stock_unit: 'pcs',
              stock_group: 'CATEGORY2',
              stock_image_link: null,
            },
            goods_transaction_goods_transaction_rel_aggregate: {
              aggregate: {
                sum: {
                  amount_credit: -200,
                },
              },
            },
          },
          {
            stock_id: 'MAT003',
            goods_transactions_stock_rel: {
              stock_id: 'MAT003',
              stock_name: 'Product 3',
              stock_price: 30.0,
              stock_unit: 'pcs',
              stock_group: 'CATEGORY3',
              stock_image_link: 'https://example.com/product3.jpg',
            },
            goods_transaction_goods_transaction_rel_aggregate: {
              aggregate: {
                sum: {
                  amount_credit: -50,
                },
              },
            },
          },
        ],
        goods_transactions_aggregate: {
          aggregate: {
            count: 3,
          },
        },
      },
    })
  }),

  // Handler for GetProductsListWithPrice query (actual query name)
  gql.query('GetProductsListWithPrice', () => {
    return HttpResponse.json({
      data: {
        stock: [
          {
            stock_id: 'PROD001',
            stock_name: 'Premium Widget',
            stock_group: 'WIDGETS',
            stock_price: 99.99,
            stock_unit: 'EA',
            available_stock: 50,
            stock_image_link: 'https://example.com/widget.jpg',
          },
          {
            stock_id: 'PROD002',
            stock_name: 'Standard Gadget',
            stock_group: 'GADGETS',
            stock_price: 49.99,
            stock_unit: 'PCS',
            available_stock: 100,
            stock_image_link: null,
          },
          {
            stock_id: 'PROD003',
            stock_name: 'Basic Tool',
            stock_group: 'TOOLS',
            stock_price: 24.99,
            stock_unit: 'EA',
            available_stock: 0,
            stock_image_link: 'https://example.com/tool.jpg',
          },
        ],
      },
    })
  }),

  // Handler for GetCategories query
  gql.query('GetCategories', () => {
    return HttpResponse.json({
      data: {
        _type_stock_groups: [
          {
            stock_groups: 'ELECTRONICS',
            our_company: 'company_1',
            image_url: 'https://example.com/electronics.jpg',
            alt_text: 'Electronics Category',
          },
          {
            stock_groups: 'FURNITURE',
            our_company: 'company_1',
            image_url: 'https://example.com/furniture.jpg',
            alt_text: 'Furniture Category',
          },
          {
            stock_groups: 'APPLIANCES',
            our_company: 'company_1',
            image_url: null,
            alt_text: null,
          },
        ],
      },
    })
  }),

  // Generic handler for unmatched queries - returns empty data
  gql.query('*', () => {
    return HttpResponse.json({
      data: {},
    })
  }),

  // Generic handler for mutations - returns success
  gql.mutation('*', () => {
    return HttpResponse.json({
      data: {
        success: true,
      },
    })
  }),
]

// Handler to simulate network errors
export const networkErrorHandler = gql.query('*', () => {
  return HttpResponse.error()
})

// Handler to simulate GraphQL errors
export const graphqlErrorHandler = gql.query('*', () => {
  return HttpResponse.json({
    errors: [
      {
        message: 'GraphQL Error',
        extensions: {
          code: 'INTERNAL_SERVER_ERROR',
        },
      },
    ],
  })
})

// Handler to simulate validation errors
export const validationErrorHandler = gql.query('*', () => {
  return HttpResponse.json({
    data: {
      invalidField: 'This will fail validation',
    },
  })
})
