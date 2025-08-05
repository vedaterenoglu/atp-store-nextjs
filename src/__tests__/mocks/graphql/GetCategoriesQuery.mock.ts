/**
 * Mock for GetCategoriesQuery.graphql
 * Returns a minimal DocumentNode with the actual query content
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for mocking GetCategoriesQuery
 *
 * Design Patterns:
 * - Mock Pattern: Provides test double for GraphQL import
 */

import { Kind } from 'graphql'
import type { DocumentNode } from 'graphql'

// Minimal DocumentNode that satisfies our code's requirements
// Our code only uses document.loc?.source.body to extract the query string
const GetCategoriesQueryDocument = {
  kind: Kind.DOCUMENT,
  definitions: [],
  loc: {
    source: {
      body: `query GetCategoriesQuery($company_id: String!) {
  _type_stock_groups(
    order_by: { stock_groups: asc }
    where: { our_company: { _eq: $company_id }, willBeListed: { _eq: true } }
  ) {
    stock_groups
    our_company
    image_url
    alt_text
  }
}`,
      name: 'GraphQL request',
      locationOffset: { line: 1, column: 1 },
    },
    start: 0,
    end: 0,
  },
} as unknown as DocumentNode

export default GetCategoriesQueryDocument
