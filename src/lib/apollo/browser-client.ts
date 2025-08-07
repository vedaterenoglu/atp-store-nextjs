/**
 * Browser Apollo Client Configuration
 *
 * SOLID Principles: SRP - Single responsibility for browser GraphQL client
 * Design Patterns: Singleton Pattern for client instance
 * Dependencies: @apollo/client
 */

import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'

const httpLink = createHttpLink({
  uri:
    process.env['NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT'] ||
    'https://gtbs-crm-backend-app.herokuapp.com/v1/graphql',
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'x-hasura-admin-secret':
        process.env['NEXT_PUBLIC_HASURA_ADMIN_SECRET'] || '',
      'x-hasura-role': 'admin',
    },
  }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`)
  }
})

// Create a singleton Apollo Client instance for browser
let apolloClient: ApolloClient<object> | null = null

export function getBrowserClient() {
  if (!apolloClient) {
    apolloClient = new ApolloClient({
      link: errorLink.concat(authLink.concat(httpLink)),
      cache: new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
              customer_bookmarks: {
                merge(...[, incoming]: [unknown[], unknown[]]) {
                  return incoming
                },
              },
              stock: {
                merge(...[, incoming]: [unknown[], unknown[]]) {
                  return incoming
                },
              },
            },
          },
        },
      }),
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'cache-and-network',
        },
        query: {
          fetchPolicy: 'network-only',
        },
      },
    })
  }
  return apolloClient
}

// Export for compatibility
export const getClient = getBrowserClient

// Default export
export default getBrowserClient()
