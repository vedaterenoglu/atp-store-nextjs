/**
 * Mock for TestGetCategories.graphql
 * Test-specific query mock for GraphQL infrastructure testing
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for mocking test query
 *
 * Design Patterns:
 * - Mock Pattern: Provides test double for GraphQL import
 */

import { Kind } from 'graphql'
import type { DocumentNode } from 'graphql'

const TestGetCategoriesDocument = {
  kind: Kind.DOCUMENT,
  definitions: [],
  loc: {
    source: {
      body: `query TestGetCategories($company_id: String!) {
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

export default TestGetCategoriesDocument
