/**
 * GraphQL Client Configuration with urql
 * SOLID Principles: Single Responsibility (GraphQL client setup)
 * Design Patterns: Singleton Pattern (single client instance), Factory Pattern (client creation)
 * Dependencies: urql, graphql
 */

import {
  Client,
  cacheExchange,
  fetchExchange,
  errorExchange,
  type AnyVariables,
  type OperationResult,
} from '@urql/core'
import { env } from '@/lib/config/env'
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
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      }

      // Add admin secret for server-side operations
      if (env.HASURA_GRAPHQL_ADMIN_SECRET) {
        headers['x-hasura-admin-secret'] = env.HASURA_GRAPHQL_ADMIN_SECRET
      }

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
>(query: string, variables?: TVariables, client?: Client): Promise<TData> {
  const gqlClient = client || getGraphQLClient()

  const result = await gqlClient
    .query<TData, TVariables>(query, variables || ({} as TVariables))
    .toPromise()

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
