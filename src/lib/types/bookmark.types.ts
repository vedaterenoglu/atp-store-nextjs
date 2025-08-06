/**
 * Bookmark Types and Interfaces
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for bookmark type definitions
 * - ISP: Segregated interfaces for different bookmark operations
 * - DIP: Depends on abstractions, not concrete implementations
 *
 * Design Patterns:
 * - Type Safety Pattern: Comprehensive type definitions
 * - DTO Pattern: Data transfer objects for API communication
 *
 * Dependencies: None (pure type definitions)
 */

/**
 * Customer bookmark entity
 */
export interface CustomerBookmark {
  company_id: string
  customer_id: string
  stock_id: string
  customer?: {
    customer_id: string
    customer_nickname: string
  }
  stock?: {
    stock_id: string
    stock_name: string
  }
}

/**
 * Bookmark mutation variables
 */
export interface BookmarkVariables {
  company_id: string
  customer_id: string
  stock_id: string
}

/**
 * Response from bookmark mutation
 */
export interface BookmarkMutationResponse {
  insert_customer_bookmarks: {
    returning: CustomerBookmark[]
    affected_rows: number
  }
}

/**
 * Response from unbookmark mutation
 */
export interface UnbookmarkMutationResponse {
  delete_customer_bookmarks: {
    returning: CustomerBookmark[]
    affected_rows: number
  }
}

/**
 * Service layer bookmark response
 */
export interface BookmarkResponse {
  success: boolean
  bookmark?: CustomerBookmark
  error?: string
}

/**
 * Service layer unbookmark response
 */
export interface UnbookmarkResponse {
  success: boolean
  bookmark?: CustomerBookmark
  error?: string
}

/**
 * Query response for checking bookmark status
 */
export interface BookmarkStatusResponse {
  customer_bookmarks: CustomerBookmark[]
}

/**
 * Product with bookmark status
 */
export interface ProductWithBookmark {
  stock_id: string
  stock_name: string
  isBookmarked?: boolean
}

/**
 * Bookmark action error
 */
export class BookmarkError extends Error {
  constructor(
    message: string,
    public code?: string,
    public details?: unknown
  ) {
    super(message)
    this.name = 'BookmarkError'
  }
}
