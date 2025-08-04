import { z } from 'zod'

/**
 * @file env.ts
 * @role Environment variable validation and type-safe access
 * @patterns Configuration Validation Pattern, Adapter Pattern
 * @solid SRP: Environment validation only, DIP: Depends on Zod abstraction
 * @tests src/lib/config/__tests__/env.test.ts (100% coverage target)
 */

// Server-side environment variables schema
const serverEnvSchema = z.object({
  // Application
  NODE_ENV: z.enum(['development', 'test', 'production']),
  PORT: z.string().default('3081'),

  // Hasura
  HASURA_GRAPHQL_ADMIN_SECRET: z
    .string()
    .min(1, 'HASURA_GRAPHQL_ADMIN_SECRET is required'),

  // Clerk (Server)
  CLERK_SECRET_KEY: z.string().min(1),

  // Database
  DATABASE_URL: z.string().min(1),

  // Stripe (Server)
  STRIPE_SECRET_KEY: z.string().optional(),

  // Email
  EMAIL_SERVER_HOST: z.string().optional(),
  EMAIL_SERVER_PORT: z.string().optional(),
  EMAIL_FROM: z.string().optional(),

  // Storage (Server)
  STORAGE_ACCESS_KEY: z.string().optional(),
  STORAGE_SECRET_KEY: z.string().optional(),

  // Cache
  REDIS_URL: z.string().optional(),

  // Monitoring
  SENTRY_AUTH_TOKEN: z.string().optional(),

  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: z.string().optional(),
  RATE_LIMIT_MAX_REQUESTS: z.string().optional(),

  // Business
  COMPANY_ID: z.string().min(1).default('alfe'),
})

// Client-side environment variables schema
const clientEnvSchema = z.object({
  // Application
  NEXT_PUBLIC_APP_URL: z.string().url(),

  // Hasura
  NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT: z
    .string()
    .url('NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT must be a valid URL')
    .refine(
      url => url.startsWith('http://') || url.startsWith('https://'),
      'HASURA_GRAPHQL_ENDPOINT must use http or https protocol'
    ),
  NEXT_PUBLIC_HASURA_WS_ENDPOINT: z
    .string()
    .min(1, 'NEXT_PUBLIC_HASURA_WS_ENDPOINT is required')
    .refine(
      url => url.startsWith('ws://') || url.startsWith('wss://'),
      'HASURA_WS_ENDPOINT must use ws or wss protocol'
    ),

  // Clerk (Client)
  // NOTE: We don't use custom Clerk sign-in/sign-up URLs - using modal authentication in navbar instead
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),

  // Feature Flags
  NEXT_PUBLIC_ENABLE_ANALYTICS: z
    .string()
    .optional()
    .default('false')
    .transform(val => val === 'true'),
  NEXT_PUBLIC_ENABLE_DEBUG: z
    .string()
    .optional()
    .default('false')
    .transform(val => val === 'true'),

  // Stripe (Client)
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().optional(),

  // Storage (Client)
  NEXT_PUBLIC_STORAGE_URL: z.string().url().optional(),

  // Monitoring
  NEXT_PUBLIC_SENTRY_DSN: z.string().optional(),
})

// Parse and validate environment variables
const processEnv = {
  // Server-side variables
  NODE_ENV: process.env['NODE_ENV'],
  PORT: process.env['PORT'],
  HASURA_GRAPHQL_ADMIN_SECRET: process.env['HASURA_GRAPHQL_ADMIN_SECRET'],
  CLERK_SECRET_KEY: process.env['CLERK_SECRET_KEY'],
  DATABASE_URL: process.env['DATABASE_URL'],
  STRIPE_SECRET_KEY: process.env['STRIPE_SECRET_KEY'],
  EMAIL_SERVER_HOST: process.env['EMAIL_SERVER_HOST'],
  EMAIL_SERVER_PORT: process.env['EMAIL_SERVER_PORT'],
  EMAIL_FROM: process.env['EMAIL_FROM'],
  STORAGE_ACCESS_KEY: process.env['STORAGE_ACCESS_KEY'],
  STORAGE_SECRET_KEY: process.env['STORAGE_SECRET_KEY'],
  REDIS_URL: process.env['REDIS_URL'],
  SENTRY_AUTH_TOKEN: process.env['SENTRY_AUTH_TOKEN'],
  RATE_LIMIT_WINDOW_MS: process.env['RATE_LIMIT_WINDOW_MS'],
  RATE_LIMIT_MAX_REQUESTS: process.env['RATE_LIMIT_MAX_REQUESTS'],
  COMPANY_ID: process.env['COMPANY_ID'],

  // Client-side variables
  NEXT_PUBLIC_APP_URL: process.env['NEXT_PUBLIC_APP_URL'],
  NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT:
    process.env['NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT'],
  NEXT_PUBLIC_HASURA_WS_ENDPOINT: process.env['NEXT_PUBLIC_HASURA_WS_ENDPOINT'],
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
    process.env['NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY'],
  NEXT_PUBLIC_ENABLE_ANALYTICS: process.env['NEXT_PUBLIC_ENABLE_ANALYTICS'],
  NEXT_PUBLIC_ENABLE_DEBUG: process.env['NEXT_PUBLIC_ENABLE_DEBUG'],
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
    process.env['NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY'],
  NEXT_PUBLIC_STORAGE_URL: process.env['NEXT_PUBLIC_STORAGE_URL'],
  NEXT_PUBLIC_SENTRY_DSN: process.env['NEXT_PUBLIC_SENTRY_DSN'],
}

// Validate server environment variables (only on server)
let serverEnv: z.infer<typeof serverEnvSchema>
if (typeof window === 'undefined') {
  const parsed = serverEnvSchema.safeParse(processEnv)

  if (!parsed.success) {
    console.error(
      '❌ Invalid server environment variables:',
      parsed.error.flatten().fieldErrors
    )
    throw new Error('Invalid server environment variables')
  }

  serverEnv = parsed.data
}

// Validate client environment variables
const parsedClient = clientEnvSchema.safeParse(processEnv)

if (!parsedClient.success) {
  console.error(
    '❌ Invalid client environment variables:',
    parsedClient.error.flatten().fieldErrors
  )
  throw new Error('Invalid client environment variables')
}

const clientEnv = parsedClient.data

// Export validated environment variables
export const env = {
  // @ts-expect-error - serverEnv is only defined on server
  ...(typeof window === 'undefined' ? serverEnv : {}),
  ...clientEnv,
}

// Type exports
export type ServerEnv = z.infer<typeof serverEnvSchema>
export type ClientEnv = z.infer<typeof clientEnvSchema>
export type Env = typeof env

// Hasura Configuration Helpers - Following Adapter Pattern
export const hasuraConfig = {
  /**
   * Get Hasura GraphQL endpoint
   * @returns The validated Hasura GraphQL endpoint URL
   */
  getGraphQLEndpoint: () => env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT,

  /**
   * Get Hasura WebSocket endpoint
   * @returns The validated Hasura WebSocket endpoint URL
   */
  getWSEndpoint: () => env.NEXT_PUBLIC_HASURA_WS_ENDPOINT,

  /**
   * Get Hasura admin secret (server-side only)
   * @returns The admin secret or undefined if on client
   */
  getAdminSecret: () => {
    if (typeof window !== 'undefined') {
      throw new Error(
        'Cannot access HASURA_GRAPHQL_ADMIN_SECRET on client side'
      )
    }
    return env.HASURA_GRAPHQL_ADMIN_SECRET
  },

  /**
   * Get authorization headers for Hasura requests
   * @returns Headers object with admin secret
   */
  getAuthHeaders: () => {
    if (typeof window !== 'undefined') {
      // Client-side: no admin secret
      return {}
    }
    return {
      'x-hasura-admin-secret': env.HASURA_GRAPHQL_ADMIN_SECRET,
    }
  },

  /**
   * Check if running in development mode
   * @returns true if NODE_ENV is development
   */
  isDevelopment: () => env.NODE_ENV === 'development',

  /**
   * Check if running in production mode
   * @returns true if NODE_ENV is production
   */
  isProduction: () => env.NODE_ENV === 'production',
}
