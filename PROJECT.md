# ATP Store Next.js - AI Agent Development Reference

## 🎯 Project Overview

**ATP Store Next.js** is a standalone Next.js portfolio application demonstrating modern full-stack development with GraphQL backend integration. This project showcases enterprise-grade architecture patterns, SOLID principles implementation, and comprehensive testing strategies.

---

## 📊 Current Project Status

### ✅ Implemented Features

- **🎨 Theme System**: Complete dark/light/system theme with Zustand persistence
- **🌍 Internationalization**: English, Swedish, Turkish with i18next
- **🧩 Component Architecture**: Decomposed components following SOLID principles
- **🧪 Testing Infrastructure**: Jest, Playwright, MSW setup with comprehensive test patterns
- **🔧 Development Tooling**: ESLint, Prettier, TypeScript with strict quality gates
- **📱 UI Framework**: shadcn/ui + Tailwind CSS with responsive design
- **🏗️ Layout System**: Navbar with Clerk integration, Footer with branding

### 🚧 In Development

- **📊 GraphQL Integration**: Hasura backend with urql client (configured, not implemented)
- **🔐 Authentication**: Clerk setup (optional for portfolio)
- **📋 Data Management**: TanStack Query caching (infrastructure ready)

---

## 🛠️ Technology Stack

### Core Framework

```json
{
  "framework": "Next.js 15.4.5",
  "react": "19.1.0",
  "typescript": "5.x",
  "runtime": "Node.js"
}
```

### State Management & Data

```json
{
  "globalState": "Zustand 5.0.7 (theme, language, preferences)",
  "serverState": "TanStack Query 5.84.1 (ready for implementation)",
  "graphqlClient": "urql (configured for Hasura integration)",
  "caching": "Next.js internal cache + TanStack Query",
  "persistence": "Zustand persistence middleware"
}
```

### UI & Styling

```json
{
  "uiFramework": "shadcn/ui (Radix UI primitives)",
  "styling": "Tailwind CSS 4.x",
  "icons": "Lucide React 0.536.0",
  "animations": "tailwindcss-animate",
  "responsive": "Mobile-first design",
  "accessibility": "ARIA labels, semantic HTML"
}
```

### Testing & Quality

```json
{
  "unitTesting": "Jest 30.0.5 + React Testing Library 16.3.0",
  "e2eTesting": "Playwright 1.54.2",
  "mocking": "MSW 2.10.4",
  "coverage": "100% requirement for unit tests",
  "linting": "ESLint 9.x + Prettier 3.6.2",
  "typeChecking": "TypeScript strict mode"
}
```

### Internationalization & Themes

```json
{
  "i18n": "i18next 25.3.2 + react-i18next 15.6.1",
  "languages": ["en", "sv", "tr"],
  "themes": "next-themes 0.4.6 (light/dark/system)",
  "persistence": "localStorage with Zustand"
}
```

### Authentication & Backend Integration

```json
{
  "authentication": "Clerk 6.28.1 (optional, configured)",
  "backend": "Hasura GraphQL (configured for future integration)",
  "database": "PostgreSQL via Hasura (planned)",
  "codeGeneration": "GraphQL Code Generator 5.0.7"
}
```

### Development & Build Tools

```json
{
  "bundler": "Next.js with Turbopack (dev)",
  "packageManager": "npm",
  "devServer": "localhost:3081",
  "deployment": "Vercel (GitHub integration)",
  "cicd": "GitHub Actions (planned)"
}
```

---

## 🏗️ Project Architecture

### Directory Structure

```
src/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles with Tailwind
│   ├── layout.tsx               # Root layout with providers
│   └── page.tsx                 # Home page
├── components/                   # Decomposed UI components
│   ├── layout/                  # Layout components (Navbar, Footer)
│   ├── providers/               # Context providers (Theme, i18n, Clerk)
│   ├── sections/                # Page sections (Hero, Features)
│   └── ui/                      # Reusable UI components
│       ├── custom/              # Custom components (ThemeToggle, LanguageToggle)
│       └── schadcn/             # shadcn/ui components
├── lib/                         # Utility libraries
│   ├── config/                  # Environment configuration
│   ├── i18n/                    # Internationalization setup
│   ├── stores/                  # Zustand stores
│   └── utils/                   # Utility functions
├── documents/                   # Project documentation
│   └── claude/                  # AI agent guidelines (subdocuments)
└── __tests__/                   # Testing infrastructure (setup files)
```

### Component Hierarchy

```
App Layout
├── ThemeProvider (next-themes)
├── I18nProvider (react-i18next)
├── ClerkProvider (authentication)
├── TanStackQueryProvider (server state)
└── Main Content
    ├── Navbar
    │   ├── NavbarBrand
    │   ├── NavbarActions
    │   │   ├── LanguageToggle
    │   │   ├── ThemeToggle
    │   │   └── NavbarAuth
    │   └── NavbarUserButton
    ├── Page Content
    └── Footer
        ├── FooterBrand
        ├── FooterLinks
        ├── FooterSocial
        └── FooterNewsletter
```

---

## 🎨 SOLID Principles Implementation

### Single Responsibility Principle (SRP) ✅

**Status**: Fully Implemented

- Each component has one clear purpose
- Stores manage single concerns (theme, language)
- Utilities focus on specific functionality
- Test files target specific components

**Examples**:

```typescript
// ✅ Single responsibility: Theme management only
export const useThemeStore = create<ThemeStore>()

// ✅ Single responsibility: Navigation brand display
function NavbarBrand() {
  /* ... */
}

// ✅ Single responsibility: Authentication state
function NavbarAuth() {
  /* ... */
}
```

### Open/Closed Principle (OCP) ✅

**Status**: Implemented in component structure

- Components extensible through props interfaces
- Zustand stores can be extended with new features
- UI components accept variant props for customization

**Examples**:

```typescript
// ✅ Open for extension via props
interface ThemeToggleProps {
  variant?: 'dropdown' | 'toggle'
  position?: 'top-right' | 'top-left'
}

// ✅ Store extensible without modification
interface ThemeStore {
  theme: Theme
  setTheme: (theme: Theme) => void
  // New features can be added without changing existing
}
```

### Liskov Substitution Principle (LSP) ✅

**Status**: Applied in component interfaces

- Component props interfaces ensure substitutability
- Abstract base types allow component swapping

### Interface Segregation Principle (ISP) ✅

**Status**: Implemented through focused interfaces

- Component props interfaces are minimal and focused
- Store interfaces separated by concern

**Examples**:

```typescript
// ✅ Focused interface for theme operations
interface ThemeStore {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

// ✅ Separate interface for language operations
interface LanguageStore {
  language: SupportedLanguage
  setLanguage: (language: SupportedLanguage) => Promise<void>
}
```

### Dependency Inversion Principle (DIP) ✅

**Status**: Implemented through abstractions

- Components depend on Zustand abstractions
- Use of React hooks as abstractions
- Props interfaces abstract implementation details

---

## 🎯 Design Patterns Implementation

### State Management Patterns ✅

- **Observer Pattern**: Zustand stores notify subscribers of state changes
- **Persistence Pattern**: Automatic localStorage persistence for user preferences
- **Centralized State**: Global theme and language state management

### Component Patterns ✅

- **Compound Components**: Navbar decomposed into specialized sub-components
- **Composition Pattern**: Layout built through component composition
- **Delegation Pattern**: Authentication delegated to Clerk hooks
- **Component Decomposition**: All components broken into focused sub-components

### Testing Patterns ✅

- **Mock Pattern**: MSW for API mocking, Zustand store mocking
- **Arrangement Pattern**: Setup → Action → Assertion test structure
- **Isolation Pattern**: Each test runs independently

### Data Flow Patterns 🚧

- **Server Components**: Ready for implementation (Next.js App Router)
- **Client Components**: Implemented for interactive elements
- **Adapter Pattern**: Planned for GraphQL client integration

---

## 🧪 Testing Strategy

### Unit Testing (100% Coverage Requirement)

```typescript
// Test Commands
npm run test:unit              // Run unit tests
npm run test:unit:coverage     // Coverage report (100% target)
npm run test:unit:watch        // Watch mode
```

**Coverage Status**:

- **Theme Store**: ✅ Comprehensive tests with persistence
- **Language Store**: ✅ Full coverage with async operations
- **UI Components**: ✅ Theme/Language toggles tested
- **Layout Components**: ✅ Navbar decomposition tested

### Testing Strategy

- **Unit Testing Only**: 100% coverage requirement for all components
- **Mock All Dependencies**: External services, APIs, and libraries
- **State Management**: Zustand stores tested in isolation
- **Test-Driven Development**: Write tests before implementation

### Mock Data Strategy

- **Location**: Test mocks created in `src/__tests__/mocks/`
- **MSW Setup**: API mocking infrastructure ready
- **Zustand Mocking**: Store mocking for isolated testing

---

## 🔧 Code Quality Standards

### TypeScript Configuration ✅

```json
{
  "strict": true,
  "noImplicitAny": true,
  "strictNullChecks": true,
  "noImplicitReturns": true
}
```

### ESLint Rules ✅

- **Next.js Config**: eslint-config-next
- **Prettier Integration**: eslint-config-prettier
- **Import Organization**: Enforced import order
- **No Disable Statements**: ESLint disable statements forbidden

### File Header Requirements ✅

Every component file includes:

```typescript
/**
 * [Component Name]
 *
 * SOLID Principles Applied:
 * - SRP: [Actual single responsibility]
 * - OCP: [Extension capabilities]
 * - DIP: [Dependencies on abstractions]
 *
 * Design Patterns:
 * - [Actual patterns implemented]
 *
 * Dependencies: [External dependencies listed]
 */
```

### Quality Gates

- ✅ Zero TypeScript errors
- ✅ Zero ESLint violations
- ✅ Prettier formatting applied
- ✅ 100% unit test coverage (target)
- ✅ All tests passing

---

## 🚀 Development Workflow

### Available Scripts

```json
{
  "dev": "next dev --turbopack --port 3081",
  "build": "next build",
  "start": "next start --port 3081",
  "lint": "next lint",
  "format": "prettier --write \"src/**/*.{js,jsx,ts,tsx}\"",
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage",
  "test:unit": "jest",
  "test:unit:coverage": "jest --coverage",
  "codegen": "graphql-codegen --config codegen.yml"
}
```

### Development Process

1. **Component Creation**: Follow SOLID principles with decomposition
2. **Testing**: Write tests before implementation (TDD approach)
3. **Quality Check**: Run lint, format, and type checking
4. **Coverage**: Ensure 100% unit test coverage
5. **Documentation**: Add proper file headers and documentation

### Git Workflow

- **Single Branch**: Main branch development
- **Conventional Commits**: Structured commit messages
- **GitHub Integration**: Connected to Vercel for deployment

---

## 🎛️ Environment Configuration

### Development Setup

```bash
# Environment Variables
NODE_ENV=development
PORT=3081
NEXT_PUBLIC_APP_URL=http://localhost:3081
NEXT_PUBLIC_APP_NAME=ATP Store

# Future GraphQL Integration
HASURA_GRAPHQL_ENDPOINT=https://your-hasura-endpoint.hasura.app/v1/graphql
HASURA_GRAPHQL_ADMIN_SECRET=your-admin-secret

# Optional Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your-key
CLERK_SECRET_KEY=sk_test_your-secret
```

### Feature Flags

```typescript
// Current feature flags
NEXT_PUBLIC_ENABLE_ANALYTICS = false
NEXT_PUBLIC_ENABLE_MAINTENANCE_MODE = false

// Planned feature flags
NEXT_PUBLIC_ENABLE_GRAPHQL = false
NEXT_PUBLIC_ENABLE_AUTH = false
```

---

## 🎯 AI Agent Development Guidelines

### Component Creation Protocol

1. **Analyze Requirements**: Understand component purpose and scope
2. **Apply SOLID Principles**: Ensure single responsibility and proper interfaces
3. **Decompose Components**: Break into focused sub-components
4. **Write Tests First**: Create unit tests with 100% coverage
5. **Implement Component**: Follow established patterns
6. **Quality Check**: ESLint, Prettier, TypeScript validation

### Testing Protocol for AI Agents

```typescript
// Unit Test Protocol
1. CREATE unit test file for target component
2. MOCK all external dependencies
3. WRITE comprehensive test suite (100% coverage)
4. RUN: npm run test:unit:coverage
5. FIX any failing tests
6. VERIFY TypeScript/ESLint/Prettier errors fixed
7. REPORT: "ALL ERRORS FIXED"
```

### Systematic Engineering Approach

- **No Trial-and-Error**: Analyze completely before coding
- **Predict Outcomes**: Know expected results before implementation
- **One-Shot Solutions**: Solve problems in single iteration
- **Deterministic Code**: Same inputs produce consistent outputs

---

## 📋 Implementation Roadmap

### Phase 1: Foundation (✅ Complete)

- [x] Project structure and tooling
- [x] Component decomposition patterns
- [x] Theme and language management
- [x] Testing infrastructure
- [x] Development workflow

### Phase 2: GraphQL Integration (🚧 Configured)

- [ ] Hasura backend connection
- [ ] urql client implementation
- [ ] GraphQL code generation
- [ ] TanStack Query data management
- [ ] Server Component data fetching

### Phase 3: Portfolio Features (📋 Planned)

- [ ] Product display components
- [ ] Search and filtering
- [ ] Shopping cart functionality
- [ ] Admin panel (if authentication added)
- [ ] Performance optimization

### Phase 4: Production Ready (📋 Planned)

- [ ] Error boundaries and handling
- [ ] SEO optimization
- [ ] Analytics integration
- [ ] Performance monitoring
- [ ] Deployment automation

---

## 🔍 Current File Structure Analysis

### Key Implementation Files

```
✅ src/lib/stores/theme-store.ts      # Complete theme management
✅ src/lib/stores/language-store.ts   # Complete i18n state
✅ src/components/layout/navbar.tsx   # Decomposed navigation
✅ src/components/ui/custom/theme-toggle.tsx    # Theme selection UI
✅ src/components/ui/custom/language-toggle.tsx # Language selection UI
✅ src/lib/i18n/config.ts            # i18next configuration
🚧 src/lib/config/env.ts             # Environment configuration (ready)
📋 GraphQL infrastructure            # Configured but not implemented
```

### Documentation Structure

```
✅ CLAUDE.md                         # Main AI agent guidelines
✅ src/documents/claude/              # Subdocument organization
  ├── ai-agent-operation-modes.md    # Agent protocols
  ├── technology-stack.md            # Tech requirements
  ├── design-patterns.md             # React/Next.js patterns
  ├── testing-strategy.md            # Testing protocols
  ├── environment-configuration.md   # Env setup
  └── component-examples.md          # Implementation examples
✅ PROJECT.md                        # This comprehensive reference
```

---

## 🎯 AI Agent Action Items

### Immediate Development Opportunities

1. **Component Development**: Create product display components following decomposition patterns
2. **GraphQL Integration**: Implement Hasura connection with urql client
3. **Data Management**: Set up TanStack Query for server state management
4. **Testing Expansion**: Add unit tests for new components
5. **Performance**: Implement Server Components for data fetching

### Quality Assurance Tasks

1. **Coverage Expansion**: Ensure 100% unit test coverage for all components
2. **Test Maintenance**: Keep unit tests updated with code changes
3. **Documentation**: Keep PROJECT.md updated with implementation progress

### Architecture Enhancements

1. **Error Handling**: Implement error boundaries and recovery patterns
2. **Performance**: Add React.Suspense and loading states
3. **Accessibility**: Enhance ARIA labels and keyboard navigation
4. **SEO**: Implement metadata and structured data

---

**Project Version**: 0.1.0  
**Last Updated**: January 2025  
**AI Agent Compatibility**: Optimized for Claude Code development workflows
