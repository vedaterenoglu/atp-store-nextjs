/**
 * Mock data for bookmark queries and mutations
 *
 * SOLID Principles: SRP - Single responsibility for bookmark mock data
 * Design Patterns: Mock Data Pattern with validation
 * Dependencies: Zod schemas, TypeScript types
 */

import type { CheckBookmarkQueryResponse } from '@/services/graphql/queries/CheckBookmarkQuery.types'

/**
 * Mock data for CheckBookmarkQuery - bookmark exists
 */
export const mockCheckBookmarkExists: CheckBookmarkQueryResponse = {
  customer_bookmarks: [
    {
      company_id: 'alfe',
      customer_id: 'SE0 1001 1697',
      stock_id: '0000 1002 0002',
    },
  ],
}

/**
 * Mock data for CheckBookmarkQuery - bookmark does not exist
 */
export const mockCheckBookmarkNotExists: CheckBookmarkQueryResponse = {
  customer_bookmarks: [],
}

/**
 * Mock data for GetCustomerBookmarksQuery - multiple bookmarks
 */
export const mockCustomerBookmarks = {
  customer_bookmarks: [
    {
      company_id: 'alfe',
      customer_id: 'SE0 1001 1697',
      stock_id: '0000 1002 0002',
      stock: {
        stock_id: '0000 1002 0002',
        stock_name: 'Pizza Box Large',
      },
    },
    {
      company_id: 'alfe',
      customer_id: 'SE0 1001 1697',
      stock_id: '0000 1002 0003',
      stock: {
        stock_id: '0000 1002 0003',
        stock_name: 'Pizza Box Medium',
      },
    },
    {
      company_id: 'alfe',
      customer_id: 'SE0 1001 1697',
      stock_id: '0000 1002 0004',
      stock: {
        stock_id: '0000 1002 0004',
        stock_name: 'Pizza Box Small',
      },
    },
  ],
}

/**
 * Mock data for GetCustomerBookmarksQuery - empty
 */
export const mockCustomerBookmarksEmpty = {
  customer_bookmarks: [],
}

/**
 * Mock data for BookmarkProductMutation - success
 */
export const mockBookmarkProductSuccess = {
  insert_customer_bookmarks: {
    returning: [
      {
        company_id: 'alfe',
        customer_id: 'SE0 1001 1697',
        stock_id: '0000 1002 0002',
        customer: {
          customer_id: 'SE0 1001 1697',
          customer_nickname: 'Test Customer',
        },
        stock: {
          stock_id: '0000 1002 0002',
          stock_name: 'Pizza Box Large',
        },
      },
    ],
    affected_rows: 1,
  },
}

/**
 * Mock data for BookmarkProductMutation - already exists
 */
export const mockBookmarkProductAlreadyExists = {
  insert_customer_bookmarks: {
    returning: [],
    affected_rows: 0,
  },
}

/**
 * Mock data for UnbookmarkProductMutation - success
 */
export const mockUnbookmarkProductSuccess = {
  delete_customer_bookmarks: {
    returning: [
      {
        company_id: 'alfe',
        customer_id: 'SE0 1001 1697',
        stock_id: '0000 1002 0002',
        customer: {
          customer_id: 'SE0 1001 1697',
          customer_nickname: 'Test Customer',
        },
        stock: {
          stock_id: '0000 1002 0002',
          stock_name: 'Pizza Box Large',
        },
      },
    ],
    affected_rows: 1,
  },
}

/**
 * Mock data for UnbookmarkProductMutation - not found
 */
export const mockUnbookmarkProductNotFound = {
  delete_customer_bookmarks: {
    returning: [],
    affected_rows: 0,
  },
}

/**
 * Factory function to create custom CheckBookmark mock data
 */
export function createMockCheckBookmarkData(
  exists: boolean,
  customerId = 'SE0 1001 1697',
  stockId = '0000 1002 0002'
): CheckBookmarkQueryResponse {
  return exists
    ? {
        customer_bookmarks: [
          {
            company_id: 'alfe',
            customer_id: customerId,
            stock_id: stockId,
          },
        ],
      }
    : {
        customer_bookmarks: [],
      }
}
