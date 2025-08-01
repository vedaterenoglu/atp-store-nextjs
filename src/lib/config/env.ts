import { z } from 'zod'

/**
 * Environment Variable Validation
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for environment validation
 * - OCP: Open for extension via schema additions
 * - DIP: Depends on Zod abstraction for validation
 *
 * Design Pattern: Configuration Validation Pattern
 */

// Server-side environment variables schema
const serverEnvSchema = z.object({
  // Application
  NODE_ENV: z.enum(['development', 'test', 'production']),
  PORT: z.string().default('3081'),

  // Hasura
  HASURA_GRAPHQL_ADMIN_SECRET: z.string().min(1),

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
})

// Client-side environment variables schema
const clientEnvSchema = z.object({
  // Application
  NEXT_PUBLIC_APP_URL: z.string().url(),

  // Hasura
  NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT: z.string().url(),
  NEXT_PUBLIC_HASURA_WS_ENDPOINT: z.string().min(1),

  // Clerk (Client)
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().min(1),
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string().min(1),
  NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: z.string().min(1),
  NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: z.string().min(1),

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

  // Client-side variables
  NEXT_PUBLIC_APP_URL: process.env['NEXT_PUBLIC_APP_URL'],
  NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT:
    process.env['NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT'],
  NEXT_PUBLIC_HASURA_WS_ENDPOINT: process.env['NEXT_PUBLIC_HASURA_WS_ENDPOINT'],
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
    process.env['NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY'],
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env['NEXT_PUBLIC_CLERK_SIGN_IN_URL'],
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env['NEXT_PUBLIC_CLERK_SIGN_UP_URL'],
  NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL:
    process.env['NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL'],
  NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL:
    process.env['NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL'],
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
