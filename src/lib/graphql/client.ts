/**
 * GraphQL client singleton with error handling and authentication
 *
 * Responsibilities:
 * - Creates and configures urql GraphQL client
 * - Manages authentication headers for Hasura
 * - Implements centralized error handling with user notifications
 * - Provides helper functions for queries, mutations, and subscriptions
 *
 * Architecture:
 * - SOLID Principles: SRP (client configuration only)
 * - Patterns: Singleton (ensures single client instance), Factory (client creation)
 *
 * Dependencies: urql exchanges, Hasura config, toast notifications
 */

import {
  Client,
  cacheExchange,
  fetchExchange,
  errorExchange,
  type AnyVariables,
  type OperationResult,
} from '@urql/core'
import { print } from 'graphql'
import type { DocumentNode } from 'graphql'
import { env, hasuraConfig } from '@/lib/config/env'
import { toast } from '@/lib/utils/toast'

/**
 * Creates and configures the urql GraphQL client
 * Uses admin secret for server-side operations
 * Implements error handling and caching strategies
 */
export function createGraphQLClient(): Client {
  return new Client({
    url: env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT,
    exchanges: [
      cacheExchange,
      errorExchange({
        onError(error) {
          // Handle network errors
          if (error.networkError) {
            console.error('GraphQL Network Error:', error.networkError)
            if (typeof window !== 'undefined') {
              toast.error('Network error. Please check your connection.')
            }
          }

          // Handle GraphQL errors
          if (error.graphQLErrors?.length) {
            error.graphQLErrors.forEach(err => {
              console.error('GraphQL Error:', err)

              // Handle specific error types
              if (err.extensions?.['code'] === 'access-denied') {
                if (typeof window !== 'undefined') {
                  toast.error('Access denied. Please check your permissions.')
                }
              } else if (err.extensions?.['code'] === 'invalid-jwt') {
                if (typeof window !== 'undefined') {
                  toast.error('Authentication error. Please sign in again.')
                }
              } else {
                if (typeof window !== 'undefined') {
                  toast.error(err.message || 'An error occurred')
                }
              }
            })
          }
        },
      }),
      fetchExchange,
    ],
    fetchOptions: () => {
      const authHeaders = hasuraConfig.getAuthHeaders()
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      }

      // Add auth headers only if they exist
      Object.entries(authHeaders).forEach(([key, value]) => {
        if (value !== undefined) {
          headers[key] = value
        }
      })

      // Debug logging removed - was only for testing authentication

      return { headers }
    },
  })
}

// Singleton instance for client-side usage
let graphqlClient: Client | null = null

/**
 * Get or create the GraphQL client instance
 * Ensures single instance for client-side operations
 */
export function getGraphQLClient(): Client {
  if (!graphqlClient) {
    graphqlClient = createGraphQLClient()
  }
  return graphqlClient
}

// Reset client for testing
export function resetGraphQLClient(): void {
  graphqlClient = null
}

/**
 * Type-safe GraphQL operation executor
 * Wraps urql client operations with proper typing
 */
export async function executeGraphQLOperation<
  TData,
  TVariables extends AnyVariables = AnyVariables,
>(
  query: string | DocumentNode,
  variables?: TVariables,
  client?: Client
): Promise<TData> {
  const gqlClient = client || getGraphQLClient()

  // Extract query string from DocumentNode if needed
  const queryString =
    typeof query === 'string'
      ? query
      : (query as DocumentNode).loc?.source?.body ||
        print(query as DocumentNode)

  // Determine if this is a mutation or query
  const isMutation = queryString.trim().toLowerCase().startsWith('mutation')

  const result = await (
    isMutation
      ? gqlClient.mutation<TData, TVariables>(
          queryString,
          variables || ({} as TVariables)
        )
      : gqlClient.query<TData, TVariables>(
          queryString,
          variables || ({} as TVariables)
        )
  ).toPromise()

  if (result.error) {
    throw result.error
  }

  if (!result.data) {
    throw new Error('No data returned from GraphQL operation')
  }

  return result.data
}

/**
 * Type-safe GraphQL mutation executor
 * Wraps urql client mutations with proper typing
 */
export async function executeGraphQLMutation<
  TData,
  TVariables extends AnyVariables = AnyVariables,
>(mutation: string, variables?: TVariables, client?: Client): Promise<TData> {
  const gqlClient = client || getGraphQLClient()

  const result = await gqlClient
    .mutation<TData, TVariables>(mutation, variables || ({} as TVariables))
    .toPromise()

  if (result.error) {
    throw result.error
  }

  if (!result.data) {
    throw new Error('No data returned from GraphQL mutation')
  }

  return result.data
}

/**
 * GraphQL subscription configuration
 * For real-time data updates (if needed)
 */
export interface GraphQLSubscriptionConfig<TData = unknown> {
  query: string
  variables?: AnyVariables
  onData: (data: TData) => void
  onError?: (error: Error) => void
}

/**
 * Execute GraphQL subscription
 * Returns unsubscribe function
 */
export function executeGraphQLSubscription<TData = unknown>(
  config: GraphQLSubscriptionConfig<TData>,
  client?: Client
): () => void {
  const gqlClient = client || getGraphQLClient()

  const { unsubscribe } = gqlClient
    .subscription<TData, AnyVariables>(config.query, config.variables || {})
    .subscribe((result: OperationResult<TData>) => {
      if (result.data) {
        config.onData(result.data)
      }
      if (result.error && config.onError) {
        config.onError(result.error)
      }
    })

  return unsubscribe
}
