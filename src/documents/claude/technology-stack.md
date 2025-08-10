# Technology Stack Guidelines

## 🛠️ Technology Stack Guidelines

### Next.js Full-Stack Architecture

- **App Router**: Use App Router patterns exclusively
- **Server Components**: Default for static content and data fetching
- **Client Components**: Only when interactivity required
- **Server Actions**: PREFER for form submissions, mutations, and server-side operations
- **API Routes**: Use only when Server Actions are not applicable (webhooks, external APIs)
- **Data Fetching**: Server Components for initial data, TanStack Query for client updates
- **App Layout**: MANDATORY app-level layout with Header (Navbar + Clerk), Content, Footer

### Component Architecture Standards

- **MANDATORY**: Decompose ALL components into sub-components
- **MANDATORY**: Use shadcn/ui components exclusively (NO custom UI components)
- **MANDATORY**: Use React Hook Form for ALL form implementations
- **MANDATORY**: Use Zod for ALL runtime validations (client & server)
- **MANDATORY**: Use AG Grid or TanStack Table for ALL data table implementations
- **MANDATORY**: Always use Adapter Pattern for external service integration
- **MANDATORY**: Always use Facade Pattern for complex system interactions
- **MANDATORY**: Use Sonner for ALL toast notifications
- **MANDATORY**: Support dark, light, and system themes with icon dropdown toggle
- **MANDATORY**: Use i18next for ALL internationalization with English, Swedish, Turkish
- **MANDATORY**: Create all components with full i18n support and proper translation keys
- **PATTERN**: Container/Presentational component separation
- **PATTERN**: Custom hooks for all stateful logic

### Database Integration Standards (Hasura GraphQL API)

- **MANDATORY**: Use Hasura GraphQL API as the backend service
- **MANDATORY**: Use urql as the GraphQL client (lightweight, performant)
- **MANDATORY**: Implement Adapter Pattern for Hasura integration
- **MANDATORY**: Use admin secret authentication for GraphQL requests
- **MANDATORY**: Handle Hasura-specific errors appropriately
- **PATTERN**: GraphQL → Adapter Pattern → Components data flow
- **PATTERN**: Server Components fetch data with admin secret, Client Components handle interactivity

### Environment Configuration Standards

- **MANDATORY**: Create separate configurations for development, test, and production
- **MANDATORY**: Create all .env files (.env.development, .env.test, .env.production)
- **MANDATORY**: Create .env.example with all required environment variables
- **MANDATORY**: Use environment-specific configurations with proper validation
- **PATTERN**: Type-safe environment variable access with Zod validation

### State Management Standards

- **MANDATORY**: Use Zustand EXCLUSIVELY for ALL client-side state
- **FORBIDDEN**: React Context API for ANY state management purpose
- **IMPLEMENTATION**: Create dedicated Zustand stores for each feature
- **PERSISTENCE**: Use Zustand persistence middleware for user preferences
- **PATTERN**: Slice pattern for complex stores
- **EXAMPLES**: theme.store.ts, language.store.ts, cart.store.ts, bookmark.store.ts

### Caching Standards

- **MANDATORY**: Use TanStack Query for ALL client-side data caching
- **MANDATORY**: Use Next.js internal cache for server-side caching
- **PATTERN**: Hybrid caching strategy (server + client data + global state coordination)
- **PATTERN**: Cache key consistency between server and client layers

### Authentication Standards (Clerk - Modal Only)

- **MANDATORY**: Use Clerk modal authentication in navbar (NO custom sign-in/sign-up URLs)
- **FORBIDDEN**: Custom Clerk sign-in/sign-up pages or URLs
- **PATTERN**: Modal authentication popup in navbar only
- **PATTERN**: Server-side auth checks with Clerk middleware
- **PATTERN**: Client-side auth state management via Zustand
- **NOTE**: We do NOT use NEXT_PUBLIC_CLERK_SIGN_IN_URL or related URL configurations

### React 19 Patterns

- **Custom Hooks First**: Extract all stateful logic
- **Compound Components**: For related component groups
- **Composition Over Inheritance**: Build through component composition
- **Suspense Integration**: Use Suspense boundaries for loading states

---

## Current Project Status (ATP Store E-commerce Platform)

### ✅ Implemented Technologies

- **Next.js 15.4.5**: App Router implementation with Server Components
- **React 19.1.0**: Latest React with concurrent features
- **TypeScript 5.x**: Strict mode with all safety features enabled
- **Zustand 5.0.7**: ALL client-side state management (React Context FORBIDDEN)
- **i18next 25.3.2**: Internationalization (English, Swedish, Turkish)
- **Sonner 2.0.6**: Toast notifications system
- **shadcn/ui**: UI component library with Tailwind CSS 4.x
- **urql 4.2.2**: GraphQL client with Singleton pattern
- **Zod 4.0.14**: Runtime validation for GraphQL responses
- **Testing Infrastructure**: Jest 30.0.5 with 100% coverage target

### 🎯 Core Architecture Decisions (Portfolio Project)

- **Backend**: Hasura GraphQL API (external service with admin secret auth)
- **GraphQL Client**: urql with Adapter Pattern implementation
- **Authentication**: Clerk modal authentication (no custom sign-in/sign-up URLs)
- **Single Branch Development**: Simplified workflow for portfolio project
- **Deployment**: Vercel integration with GitHub auto-deployment
- **Testing Strategy**: Mocked GraphQL calls using MSW handlers

### 🔄 Current Implementation Status

- **Hasura GraphQL Adapter**: ✅ COMPLETED - Type-safe GraphQL client with urql
- **GraphQL Client Configuration**: ✅ COMPLETED - Singleton pattern with error handling
- **Server Components**: ✅ COMPLETED - Categories and Products pages with data fetching
- **GraphQL File Support**: ✅ COMPLETED - Webpack loader for .graphql files
- **Barrel Exports**: ✅ COMPLETED - Consistent imports across codebase
- **Testing Suite**: ✅ COMPLETED - 635 tests passing with MSW mocks
- **Code Quality**: ✅ COMPLETED - TypeScript, ESLint, Prettier all passing
- **React Hook Form + Zod**: Type-safe form handling
- **Component Architecture**: Full decomposition following SOLID principles
- **CI/CD Pipeline**: GitHub Actions with automated testing

### 📋 Architecture Notes

- Hasura GraphQL API backend with admin secret authentication
- Component decomposition following SOLID principles
- Testing infrastructure with MSW for GraphQL mocking
- Single repository with GitHub-Vercel integration
- No custom Clerk sign-in/sign-up URLs (modal authentication only)

### 🔧 Accepted Technical Exceptions

- **@ts-nocheck in shadcn/ui barrel exports**: Required for third-party component type re-exports. This is standard practice for shadcn/ui integration and should not be modified.
- **ESLint disables in test setup**: Minimal disables acceptable only in jest.setup.ts for test infrastructure configuration.
- **Third-party library patterns**: Some third-party libraries (like shadcn/ui) may have patterns that deviate from project standards. These should be documented but not modified.
