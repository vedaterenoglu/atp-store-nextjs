# Environment Configuration

## Environment Configuration Pattern

**Purpose**: Type-safe environment management across all deployment stages

### Current Implementation (ATP Store E-commerce Platform)

The project uses a sophisticated environment configuration with separate schemas for server and client variables:

```typescript
// lib/config/env.ts - Current implementation
import { z } from 'zod'

// Server-side environment variables (secure, not exposed to client)
const serverEnvSchema = z.object({
  // Application
  NODE_ENV: z.enum(['development', 'test', 'production']),
  PORT: z.string().default('3081'),

  // Hasura GraphQL
  HASURA_GRAPHQL_ADMIN_SECRET: z.string().min(1),

  // Clerk Authentication
  CLERK_SECRET_KEY: z.string().min(1),

  // Database
  DATABASE_URL: z.string().min(1),

  // Optional services
  STRIPE_SECRET_KEY: z.string().optional(),
  REDIS_URL: z.string().optional(),
  // ... other server-only variables
})

// Client-side environment variables (exposed to browser)
const clientEnvSchema = z.object({
  // Application
  NEXT_PUBLIC_APP_URL: z.string().url(),

  // Hasura GraphQL
  NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT: z.string().url(),
  NEXT_PUBLIC_HASURA_WS_ENDPOINT: z.string().refine(
    url => url.startsWith('ws://') || url.startsWith('wss://')
  ),

  // Clerk Authentication (public key only)
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),

  // Feature Flags
  NEXT_PUBLIC_ENABLE_ANALYTICS: z.string()
    .transform(val => val === 'true'),
  NEXT_PUBLIC_ENABLE_DEBUG: z.string()
    .transform(val => val === 'true'),
})

// Hasura configuration helpers following Adapter Pattern
export const hasuraConfig = {
  getGraphQLEndpoint: () => env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT,
  getWSEndpoint: () => env.NEXT_PUBLIC_HASURA_WS_ENDPOINT,
  getAdminSecret: () => {
    if (typeof window !== 'undefined') {
      throw new Error('Cannot access admin secret on client')
    }
    return env.HASURA_GRAPHQL_ADMIN_SECRET
  },
  getAuthHeaders: () => {
    if (typeof window !== 'undefined') return {}
    return { 'x-hasura-admin-secret': env.HASURA_GRAPHQL_ADMIN_SECRET }
  },
}
```

---

## Environment Files Structure

### .env.example (Current Implementation)

```bash
# Environment Variables Template
# Copy this file to .env.development, .env.test, or .env.production and fill in your values

# ===== APPLICATION CONFIGURATION =====
# The environment mode (development, test, production)
NODE_ENV=development

# The public URL of your application
NEXT_PUBLIC_APP_URL=http://localhost:3081

# The port your application runs on
PORT=3081

# ===== HASURA GRAPHQL API =====
# Your Hasura GraphQL endpoint
NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT=http://localhost:8080/v1/graphql

# Admin secret for Hasura (keep this secure!)
HASURA_GRAPHQL_ADMIN_SECRET=your-hasura-admin-secret

# WebSocket endpoint for subscriptions
NEXT_PUBLIC_HASURA_WS_ENDPOINT=ws://localhost:8080/v1/graphql

# ===== CLERK AUTHENTICATION =====
# Get these from https://clerk.dev
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your-clerk-publishable-key
CLERK_SECRET_KEY=sk_test_your-clerk-secret-key
# NOTE: We don't use custom Clerk sign-in/sign-up URLs - modal authentication in navbar is used instead

# ===== DATABASE =====
# PostgreSQL connection string
DATABASE_URL=postgresql://username:password@localhost:5432/database_name

# ===== FEATURE FLAGS =====
# Enable/disable analytics tracking
NEXT_PUBLIC_ENABLE_ANALYTICS=false

# Enable/disable debug mode
NEXT_PUBLIC_ENABLE_DEBUG=true

# ... (other optional services like Stripe, Redis, etc.)
```

### Environment-Specific Configuration Examples

#### .env.development
- Development Hasura endpoint with local or cloud instance
- Debug mode enabled for better error messages
- Analytics disabled for development
- Port 3081 to avoid conflicts

#### .env.test
- Test-specific Hasura endpoint or mocked services
- Minimal external service dependencies
- Used for running test suites

#### .env.production
- Production Hasura endpoint with proper security
- Full feature flags enabled (analytics, monitoring)
- Optimized for performance and security
- All required services configured

---

## Current Implementation Status

### ✅ Implemented Features

- **Zod Validation**: Full type-safe environment variable validation
- **Server/Client Separation**: Secure handling of sensitive variables
- **Hasura Integration**: Complete GraphQL configuration with admin secret
- **Clerk Authentication**: Modal authentication configured (no custom URLs)
- **Feature Flags**: Analytics and debug mode toggles
- **Configuration Helpers**: `hasuraConfig` object for easy access

### 🏗️ Architecture Highlights

- **Security**: Server-only variables never exposed to client
- **Type Safety**: Full TypeScript types generated from Zod schemas
- **Validation**: Runtime validation with helpful error messages
- **Adapter Pattern**: Hasura configuration follows adapter pattern
- **Error Handling**: Proper error messages for missing/invalid variables

### 🎯 Key Configuration Areas

#### Hasura GraphQL
- GraphQL endpoint for queries/mutations
- WebSocket endpoint for subscriptions
- Admin secret for server-side authentication
- Automatic header generation for requests

#### Authentication
- Clerk integration with public/secret keys
- Modal authentication only (no custom sign-in URLs)
- Server-side auth validation

#### Optional Services
- Stripe payment processing
- Redis caching
- Sentry error monitoring
- Email service configuration
- File storage (S3-compatible)

### 📝 Usage Notes

- Environment variables are validated at build time
- Invalid configuration prevents application startup
- Client variables must be prefixed with `NEXT_PUBLIC_`
- Server variables are only accessible in server components/API routes
- Use `hasuraConfig` helpers for consistent Hasura access
