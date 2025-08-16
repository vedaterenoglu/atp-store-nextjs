/**
 * @file env.ts (Mock)
 * @role Mock environment configuration for testing
 * @patterns Mock Pattern
 * @solid SRP: Mock environment only, DIP: Provides same interface as real module
 * @tests Used by env.test.ts
 */

// Mock environment values for testing
export const env = {
  NODE_ENV: 'test',
  HASURA_GRAPHQL_ADMIN_SECRET: 'mock-admin-secret',
  NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT: 'http://mock-hasura.test/v1/graphql',
  NEXT_PUBLIC_HASURA_WS_ENDPOINT: 'ws://mock-hasura.test/v1/graphql',
  NEXT_PUBLIC_APP_URL: 'http://localhost:3081',
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: 'pk_test_mock',
  CLERK_SECRET_KEY: 'sk_test_mock',
  // NOTE: We don't include Clerk sign-in/sign-up URLs as we use modal authentication
  PORT: '3000',
  NEXT_PUBLIC_ENABLE_ANALYTICS: false,
  NEXT_PUBLIC_ENABLE_DEBUG: false,
  RATE_LIMIT_WINDOW_MS: '900000',
  RATE_LIMIT_MAX_REQUESTS: '100',
}

// Mock Hasura configuration helpers
export const hasuraConfig = {
  getGraphQLEndpoint: () => env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT,
  getWSEndpoint: () => env.NEXT_PUBLIC_HASURA_WS_ENDPOINT,
  getAdminSecret: () => {
    if (typeof window !== 'undefined') {
      throw new Error(
        'Cannot access HASURA_GRAPHQL_ADMIN_SECRET on client side'
      )
    }
    return env.HASURA_GRAPHQL_ADMIN_SECRET
  },
  getAuthHeaders: () => {
    if (typeof window !== 'undefined') {
      return {}
    }
    return {
      'x-hasura-admin-secret': env.HASURA_GRAPHQL_ADMIN_SECRET,
    }
  },
  isDevelopment: () => env.NODE_ENV === 'development',
  isProduction: () => env.NODE_ENV === 'production',
}
