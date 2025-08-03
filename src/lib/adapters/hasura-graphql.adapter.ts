/**
 * @file hasura-graphql.adapter.ts
 * @role Adapter for Hasura GraphQL API integration
 * @patterns Adapter Pattern, Error Handling Pattern
 * @solid SRP: GraphQL communication only, DIP: Depends on abstractions (Client interface)
 * @tests src/lib/adapters/__tests__/hasura-graphql.adapter.test.ts (100% coverage target)
 */

import type {
  Client,
  OperationResult,
  TypedDocumentNode,
  AnyVariables,
} from '@urql/core'
import type { DocumentNode } from 'graphql'
import { hasuraConfig } from '@/lib/config/env'

/**
 * Base Service Adapter Interface
 * Following the Adapter Pattern from CLAUDE.md
 */
export interface ServiceAdapter<TInput, TOutput> {
  execute(input: TInput): Promise<TOutput>
  validate(input: TInput): boolean
  handleError(error: unknown): never
}

/**
 * GraphQL Request Input Type
 */
export interface GraphQLRequest<
  TVariables extends AnyVariables = AnyVariables,
> {
  query: DocumentNode | TypedDocumentNode<unknown, TVariables> | string
  variables?: TVariables
  requestPolicy?:
    | 'cache-first'
    | 'cache-and-network'
    | 'network-only'
    | 'cache-only'
}

/**
 * GraphQL Response Output Type
 */
export interface GraphQLResponse<TData = unknown> {
  data: TData | null
  error: Error | null
}

/**
 * Hasura-specific error types
 */
export class HasuraError extends Error {
  constructor(
    message: string,
    public code?: string,
    public extensions?: Record<string, unknown>
  ) {
    super(message)
    this.name = 'HasuraError'
  }
}

/**
 * Hasura GraphQL Adapter
 * Implements the Adapter Pattern for Hasura GraphQL API integration
 *
 * SOLID Principles:
 * - SRP: Only handles GraphQL communication with Hasura
 * - OCP: Can be extended for specific query/mutation types
 * - LSP: Can be substituted with any ServiceAdapter implementation
 * - ISP: Implements only required adapter methods
 * - DIP: Depends on Client abstraction, not concrete implementation
 */
export class HasuraGraphQLAdapter<
  TVariables extends AnyVariables = AnyVariables,
  TData = unknown,
> implements ServiceAdapter<GraphQLRequest<TVariables>, GraphQLResponse<TData>>
{
  constructor(private client: Client) {}

  /**
   * Execute GraphQL operation
   * @param input GraphQL request with query and variables
   * @returns Promise with data or error
   */
  async execute(
    input: GraphQLRequest<TVariables>
  ): Promise<GraphQLResponse<TData>> {
    try {
      // Validate input before execution
      if (!this.validate(input)) {
        throw new HasuraError('Invalid GraphQL request input')
      }

      // Add admin secret header if on server
      const context = this.getRequestContext()

      // Execute GraphQL operation
      const result = (await this.client
        .query(input.query, input.variables as TVariables, {
          requestPolicy: input.requestPolicy || 'cache-first',
          ...context,
        })
        .toPromise()) as OperationResult<TData>

      // Handle GraphQL errors
      if (result.error) {
        return {
          data: null,
          error: this.parseGraphQLError(result.error),
        }
      }

      return {
        data: result.data || null,
        error: null,
      }
    } catch (error) {
      this.handleError(error)
    }
  }

  /**
   * Validate GraphQL request input
   * @param input Request to validate
   * @returns true if valid
   */
  validate(input: GraphQLRequest<TVariables>): boolean {
    if (!input || typeof input !== 'object') {
      return false
    }

    if (!input.query) {
      return false
    }

    // If query is a string, it should not be empty
    if (typeof input.query === 'string' && input.query.trim().length === 0) {
      return false
    }

    // Variables should be an object if provided
    if (input.variables !== undefined && typeof input.variables !== 'object') {
      return false
    }

    return true
  }

  /**
   * Handle and transform errors
   * @param error Unknown error
   * @throws HasuraError with proper context
   */
  handleError(error: unknown): never {
    console.error('HasuraGraphQLAdapter error:', error)

    if (error instanceof HasuraError) {
      throw error
    }

    if (error instanceof Error) {
      throw new HasuraError(
        error.message || 'GraphQL operation failed',
        'GRAPHQL_ERROR'
      )
    }

    throw new HasuraError('An unexpected error occurred', 'UNKNOWN_ERROR')
  }

  /**
   * Parse GraphQL errors into HasuraError
   * @param error GraphQL error object
   * @returns HasuraError instance
   */
  private parseGraphQLError(error: unknown): HasuraError {
    const err = error as {
      networkError?: Error
      graphQLErrors?: Array<{
        message: string
        extensions?: { code?: string }
      }>
    }

    // Handle network errors
    if (err.networkError) {
      return new HasuraError(
        'Network error: Unable to reach Hasura GraphQL API',
        'NETWORK_ERROR',
        { originalError: err.networkError }
      )
    }

    // Handle GraphQL errors array
    if (err.graphQLErrors && Array.isArray(err.graphQLErrors)) {
      const firstError = err.graphQLErrors[0]
      return new HasuraError(
        firstError?.message || 'GraphQL operation failed',
        firstError?.extensions?.code || 'GRAPHQL_ERROR',
        firstError?.extensions
      )
    }

    // Handle CombinedError from urql
    if ('message' in err && typeof err.message === 'string') {
      return new HasuraError(err.message, 'COMBINED_ERROR')
    }

    return new HasuraError('Unknown GraphQL error occurred', 'UNKNOWN_ERROR')
  }

  /**
   * Get request context with auth headers
   * @returns Request context object
   */
  private getRequestContext(): Record<string, unknown> {
    // Server-side: Add admin secret header
    if (typeof window === 'undefined') {
      return {
        fetchOptions: {
          headers: hasuraConfig.getAuthHeaders(),
        },
      }
    }

    // Client-side: No admin secret
    return {}
  }
}

/**
 * Factory function to create typed Hasura adapters
 * @param client urql Client instance
 * @returns Typed HasuraGraphQLAdapter instance
 */
export function createHasuraAdapter<
  TVariables extends AnyVariables = AnyVariables,
  TData = unknown,
>(client: Client): HasuraGraphQLAdapter<TVariables, TData> {
  return new HasuraGraphQLAdapter<TVariables, TData>(client)
}

/**
 * Type guard to check if response has data
 * @param response GraphQL response
 * @returns true if response has data
 */
export function hasData<T>(
  response: GraphQLResponse<T>
): response is GraphQLResponse<T> & { data: T } {
  return response.data !== null
}

/**
 * Type guard to check if response has error
 * @param response GraphQL response
 * @returns true if response has error
 */
export function hasError(
  response: GraphQLResponse<unknown>
): response is GraphQLResponse<unknown> & { error: Error } {
  return response.error !== null
}
