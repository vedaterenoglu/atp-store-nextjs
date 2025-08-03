# Environment Configuration

## Environment Configuration Pattern

**Purpose**: Type-safe environment management across all deployment stages

### Environment Schema Definition (Simplified for Portfolio Project)

```typescript
// lib/config/env.ts - Environment configuration with Zod validation
import { z } from 'zod'

const environmentSchema = z.object({
  // App Configuration
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.string().default('3000'),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_PUBLIC_APP_NAME: z.string().default('Portfolio Events'),

  // Database Configuration (Neon PostgreSQL)
  DATABASE_URL: z.string().url(),
  DIRECT_URL: z.string().url().optional(), // For connection pooling if needed

  // Authentication (Optional for portfolio)
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().optional(),
  CLERK_SECRET_KEY: z.string().optional(),

  // Analytics (Optional for portfolio)
  NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
  SENTRY_DSN: z.string().optional(),

  // Feature Flags (Simplified)
  NEXT_PUBLIC_ENABLE_ANALYTICS: z
    .string()
    .transform(val => val === 'true')
    .default('false'),
  NEXT_PUBLIC_ENABLE_MAINTENANCE_MODE: z
    .string()
    .transform(val => val === 'true')
    .default('false'),
})

export type Environment = z.infer<typeof environmentSchema>

// Validate and export environment variables
export const env = environmentSchema.parse(process.env)

// Environment helpers
export const isDevelopment = env.NODE_ENV === 'development'
export const isTest = env.NODE_ENV === 'test'
export const isProduction = env.NODE_ENV === 'production'

// Database configuration
export const databaseConfig = {
  url: env.DATABASE_URL,
  directUrl: env.DIRECT_URL,
}
```

---

## Environment Files Structure

### .env.example (Portfolio Project Template)

```bash
# ===========================================
# APPLICATION CONFIGURATION
# ===========================================
NODE_ENV=development
PORT=3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=Portfolio Events

# ===========================================
# DATABASE CONFIGURATION (Neon PostgreSQL)
# ===========================================
# Get these from your Neon project dashboard
DATABASE_URL=postgresql://username:password@ep-example.neon.tech/portfolio_events?sslmode=require
DIRECT_URL=postgresql://username:password@ep-example.neon.tech/portfolio_events?sslmode=require

# ===========================================
# AUTHENTICATION (Optional for Portfolio)
# ===========================================
# NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_example-key
# CLERK_SECRET_KEY=sk_test_example-secret

# ===========================================
# ANALYTICS & MONITORING (Optional)
# ===========================================
# NEXT_PUBLIC_POSTHOG_KEY=phc_example-key
# SENTRY_DSN=https://example@sentry.io/123456

# ===========================================
# FEATURE FLAGS
# ===========================================
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_MAINTENANCE_MODE=false
```

### .env.development

```bash
NODE_ENV=development
PORT=3001
NEXT_PUBLIC_APP_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=Portfolio Events (Dev)

# Hasura development endpoint
HASURA_GRAPHQL_ENDPOINT=https://dev-hasura-endpoint.hasura.app/v1/graphql
HASURA_GRAPHQL_ADMIN_SECRET=dev-admin-secret

# Development features (minimal)
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_SENTRY=false
NEXT_PUBLIC_ENABLE_MAINTENANCE_MODE=false
```

### .env.test

```bash
NODE_ENV=test
PORT=3002
NEXT_PUBLIC_APP_URL=http://localhost:3002
NEXT_PUBLIC_APP_NAME=Portfolio Events (Test)

# Test Hasura endpoint (or mock)
HASURA_GRAPHQL_ENDPOINT=https://test-hasura-endpoint.hasura.app/v1/graphql
HASURA_GRAPHQL_ADMIN_SECRET=test-admin-secret

# Test features (disabled)
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_SENTRY=false
NEXT_PUBLIC_ENABLE_MAINTENANCE_MODE=false
```

### .env.production

```bash
NODE_ENV=production
PORT=3000
NEXT_PUBLIC_APP_URL=https://portfolioevents.com
NEXT_PUBLIC_APP_NAME=Portfolio Events

# Production Hasura endpoint
HASURA_GRAPHQL_ENDPOINT=https://prod-hasura-endpoint.hasura.app/v1/graphql
HASURA_GRAPHQL_ADMIN_SECRET=prod-admin-secret
HASURA_GRAPHQL_JWT_SECRET=prod-jwt-secret

# Production services
UPLOADTHING_SECRET=sk_live_prod-secret
UPLOADTHING_APP_ID=prod-app-id
RESEND_API_KEY=re_prod-api-key

# Production analytics
NEXT_PUBLIC_POSTHOG_KEY=phc_prod-key
SENTRY_DSN=https://prod@sentry.io/123456

# Production features
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_SENTRY=true
NEXT_PUBLIC_ENABLE_MAINTENANCE_MODE=false
```

---

## Current Implementation Status

### ✅ Environment Management Ready

- **Zod Validation**: Type-safe environment variable access
- **Multiple Environments**: Development, test, production configurations
- **Feature Flags**: Environment-specific feature toggling
- **Neon PostgreSQL**: Cloud database configuration

### 🎯 Portfolio Project Focus

- **Simplified Configuration**: Only essential environment variables
- **Neon Database**: Primary focus on database connectivity
- **Optional Services**: Authentication and analytics marked as optional
- **Vercel Deployment**: Environment variables configured for Vercel platform

### 🔄 Optional Implementations

- **Clerk Authentication**: Can be added later if user management needed
- **Analytics**: PostHog/Sentry for portfolio traffic monitoring
- **Performance Monitoring**: Basic monitoring sufficient for portfolio

### 📝 Usage Notes

- All environment variables are validated at application startup
- Invalid database configuration will prevent application from starting
- Environment-specific configurations enable different behaviors per deployment stage
- Feature flags allow for optional service integration
- Neon PostgreSQL provides production-ready database without infrastructure management
