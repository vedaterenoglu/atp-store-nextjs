/**
 * Apollo Client Configuration for Server Components
 *
 * SOLID Principles: SRP - Single responsibility for server-side GraphQL client
 * Design Patterns: Singleton Pattern for client instance
 * Dependencies: @apollo/client, @apollo/experimental-nextjs-app-support
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
      'x-hasura-admin-secret': process.env['HASURA_GRAPHQL_ADMIN_SECRET'] || '',
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

// Create Apollo Client for server-side use
const apolloClient = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          customer_bookmarks: {
            merge(...[, incoming]: [unknown[], unknown[]]) {
              return incoming
            },
          },
        },
      },
    },
  }),
  link: errorLink.concat(authLink.concat(httpLink)),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
    query: {
      fetchPolicy: 'network-only',
    },
  },
})

export function getClient() {
  return apolloClient
}

// Default export for compatibility
export default apolloClient
