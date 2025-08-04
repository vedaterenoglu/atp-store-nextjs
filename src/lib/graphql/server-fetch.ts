/**
 * Server-side GraphQL fetch utility
 *
 * Responsibilities:
 * - Provides direct fetch-based GraphQL operations for Server Components
 * - Avoids urql client-side dependencies
 * - Handles authentication headers for Hasura
 *
 * Architecture:
 * - SOLID Principles: SRP (server-side fetching only)
 * - Patterns: Adapter (adapts fetch API for GraphQL)
 *
 * Dependencies: env config, DocumentNode from graphql
 */

import { env, hasuraConfig } from '@/lib/config/env'
import type { DocumentNode } from 'graphql'
import { print } from 'graphql'

interface GraphQLResponse<T = unknown> {
  data?: T
  errors?: Array<{
    message: string
    extensions?: Record<string, unknown>
  }>
}

/**
 * Execute GraphQL operation using fetch API
 * For use in Server Components where urql client cannot be used
 */
export async function serverGraphQLFetch<
  TData = unknown,
  TVariables = Record<string, unknown>,
>({
  document,
  variables,
}: {
  document: DocumentNode | string
  variables?: TVariables
}): Promise<{ data?: TData; error?: Error }> {
  try {
    const query = typeof document === 'string' ? document : print(document)

    const response = await fetch(env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...hasuraConfig.getAuthHeaders(),
      } as HeadersInit,
      body: JSON.stringify({
        query,
        variables: variables || {},
      }),
      // Important: This ensures fresh data in development
      cache: 'no-store',
    })

    if (!response.ok) {
      throw new Error(`GraphQL request failed: ${response.statusText}`)
    }

    const result = (await response.json()) as GraphQLResponse<TData>

    if (result.errors?.length) {
      const errorMessage = result.errors.map(err => err.message).join(', ')
      throw new Error(`GraphQL errors: ${errorMessage}`)
    }

    return result.data ? { data: result.data as TData } : {}
  } catch (error) {
    console.error('Server GraphQL fetch error:', error)
    return {
      error:
        error instanceof Error ? error : new Error('Unknown error occurred'),
    }
  }
}
