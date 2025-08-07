/**
 * Apollo Provider Wrapper for Next.js App Router
 *
 * SOLID Principles: SRP - Single responsibility for providing Apollo Client
 * Design Patterns: Provider Pattern for dependency injection
 * Dependencies: @apollo/client, @apollo/experimental-nextjs-app-support
 */

'use client'

import { ApolloLink, HttpLink } from '@apollo/client'
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr'

function makeClient() {
  const httpLink = new HttpLink({
    uri:
      process.env['NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT'] ||
      'https://gtbs-crm-backend-app.herokuapp.com/v1/graphql',
    headers: {
      'x-hasura-admin-secret':
        process.env['NEXT_PUBLIC_HASURA_GRAPHQL_ADMIN_SECRET'] || '',
      'x-hasura-role': 'admin',
    },
  })

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache({
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
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
      watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
    },
  })
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  )
}
