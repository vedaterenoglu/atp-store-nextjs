/**
 * GraphQL client adapter providing a consistent interface for GraphQL operations
 * 
 * Responsibilities:
 * - Wraps urql client with a simplified API surface
 * - Handles DocumentNode to string conversion
 * - Provides request and mutate methods with consistent signatures
 * 
 * Architecture:
 * - SOLID Principles: ISP (minimal interface), DIP (depends on urql abstractions)
 * - Patterns: Adapter (adapts urql to application needs)
 * 
 * Dependencies: urql client singleton, GraphQL types
 */

import { getGraphQLClient } from './client'
import type { DocumentNode } from 'graphql'
import type { AnyVariables, OperationResult } from '@urql/core'

/**
 * GraphQL Client Adapter
 * Provides a request method similar to other GraphQL clients
 */
export const graphQLClientAdapter = {
  /**
   * Execute a GraphQL request
   * @param options - Request options including document and variables
   * @returns Operation result with data and error
   */
  async request<
    TData = unknown,
    TVariables extends AnyVariables = AnyVariables,
  >(options: {
    document: DocumentNode | string
    variables?: TVariables
  }): Promise<OperationResult<TData, TVariables>> {
    const client = getGraphQLClient()

    // Convert DocumentNode to string if needed
    const query =
      typeof options.document === 'string'
        ? options.document
        : options.document.loc?.source.body || ''

    return client
      .query<TData, TVariables>(query, options.variables || ({} as TVariables))
      .toPromise()
  },

  /**
   * Execute a GraphQL mutation
   * @param options - Mutation options including document and variables
   * @returns Operation result with data and error
   */
  async mutate<
    TData = unknown,
    TVariables extends AnyVariables = AnyVariables,
  >(options: {
    document: DocumentNode | string
    variables?: TVariables
  }): Promise<OperationResult<TData, TVariables>> {
    const client = getGraphQLClient()

    // Convert DocumentNode to string if needed
    const mutation =
      typeof options.document === 'string'
        ? options.document
        : options.document.loc?.source.body || ''

    return client
      .mutation<
        TData,
        TVariables
      >(mutation, options.variables || ({} as TVariables))
      .toPromise()
  },
}
