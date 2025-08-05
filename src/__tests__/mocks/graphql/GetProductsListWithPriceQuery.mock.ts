/**
 * Mock for GetProductsListWithPriceQuery.graphql
 * Returns a minimal DocumentNode with the actual query content
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for mocking GetProductsListWithPriceQuery
 *
 * Design Patterns:
 * - Mock Pattern: Provides test double for GraphQL import
 */

import { Kind } from 'graphql'
import type { DocumentNode } from 'graphql'

// Minimal DocumentNode that satisfies our code's requirements
// Our code only uses document.loc?.source.body to extract the query string
const GetProductsListWithPriceQueryDocument = {
  kind: Kind.DOCUMENT,
  definitions: [],
  loc: {
    source: {
      body: `query GetProductsListWithPriceQuery($company_id: String!) {
  stock(
    where: {
      company_id: { _eq: $company_id }
      stock_is_active: { _eq: true }
      _rel_type_stock_group: { willBeListed: { _eq: true } }
    }
    order_by: { stock_group: asc }
  ) {
    stock_group
    stock_id
    stock_name
    stock_unit
    stock_price
  }
}`,
      name: 'GraphQL request',
      locationOffset: { line: 1, column: 1 },
    },
    start: 0,
    end: 0,
  },
} as unknown as DocumentNode

export default GetProductsListWithPriceQueryDocument
