# React/Next.js Design Patterns

## 🎨 Essential React/Next.js Design Patterns

## 🏗️ Single Source of Truth (SSOT) Pattern

### REQUIREMENT: Eliminate Data Duplication

**Purpose**: Centralize data definitions to prevent inconsistencies

**IMPLEMENTATION:**

- Centralize data definitions in single locations
- Use shared interfaces/types for common data structures
- Create centralized state management for shared data
- Reference single data sources, never duplicate
- Apply DRY principle to all data definitions

**VALIDATION:** Ensure no duplicate data definitions exist after implementation

### Component Decomposition Strategy

**Purpose**: Break down components following Single Responsibility Principle

**DECOMPOSITION REQUIREMENTS:**

**Component Analysis Process:**

1. Identify current monolithic structures in components
2. Map functional responsibilities within existing components
3. Determine reusable patterns and shared logic
4. Plan component hierarchy and data flow

**Sub-Component Creation Strategy:**

- Extract UI elements into atomic components
- Separate business logic from presentation
- Create container/presenter component pairs
- Implement props interface for each component
- Ensure testability through dependency injection

**Quality Standards:**

- Each component must have single responsibility
- All components must be independently testable
- Use TypeScript interfaces for all props
- Follow shadcn/ui + Tailwind CSS patterns
- Add header comments specifying SOLID principles applied

**DELIVERABLES:**

1. Component decomposition plan with file structure
2. Interface definitions for each sub-component
3. Data flow diagram between components
4. Testing strategy for decomposed components
5. Migration plan from current to decomposed structure

### StateFrame Pattern (Unified State Management)

**Purpose**: Consistent handling of loading, error, and empty states

```typescript
interface StateFrameProps {
  error?: Error | null
  isLoading?: boolean
  isEmpty?: boolean
  onRetry?: () => void
  children: React.ReactNode
}

function StateFrame({ error, isLoading, isEmpty, onRetry, children }: StateFrameProps) {
  if (error) return <ErrorState error={error} onRetry={onRetry} />
  if (isLoading) return <LoadingState />
  if (isEmpty) return <EmptyState />
  return <>{children}</>
}
```

### Query Factory Pattern (Cache Key Management)

**Purpose**: Consistent cache key generation for TanStack Query

```typescript
class QueryKeyFactory {
  static events = {
    all: ['events'] as const,
    lists: () => [...QueryKeyFactory.events.all, 'list'] as const,
    list: (filters: EventFilters) =>
      [...QueryKeyFactory.events.lists(), filters] as const,
    detail: (id: string) =>
      [...QueryKeyFactory.events.all, 'detail', id] as const,
  }

  static cities = {
    all: ['cities'] as const,
    detail: (slug: string) =>
      [...QueryKeyFactory.cities.all, 'detail', slug] as const,
  }
}
```

### Compound Components Pattern

**Purpose**: Related components that work together as a cohesive unit

```typescript
// Main component with sub-components as properties
function EventCard({ children }: { children: React.ReactNode }) {
  return <div className="event-card">{children}</div>
}

EventCard.Header = function EventCardHeader({ title }: { title: string }) {
  return <h3 className="event-title">{title}</h3>
}

EventCard.Content = function EventCardContent({ children }: { children: React.ReactNode }) {
  return <div className="event-content">{children}</div>
}

EventCard.Actions = function EventCardActions({ children }: { children: React.ReactNode }) {
  return <div className="event-actions">{children}</div>
}

// Usage
<EventCard>
  <EventCard.Header title="Event Title" />
  <EventCard.Content>Event description...</EventCard.Content>
  <EventCard.Actions>
    <Button>Register</Button>
  </EventCard.Actions>
</EventCard>
```

### Adapter Pattern (External Service Integration)

**Purpose**: Standardize external service interfaces for consistent internal usage

```typescript
// Base adapter interface for all external services
interface ServiceAdapter<TInput, TOutput> {
  execute(input: TInput): Promise<TOutput>
  validate(input: TInput): boolean
  handleError(error: any): never
}

// Example: GraphQL Adapter for Hasura
class HasuraGraphQLAdapter
  implements ServiceAdapter<GraphQLQuery, GraphQLResponse>
{
  async execute(query: GraphQLQuery): Promise<GraphQLResponse> {
    try {
      const response = await fetch(process.env.HASURA_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await this.getAuthToken()}`,
        },
        body: JSON.stringify(query),
      })

      return response.json()
    } catch (error) {
      this.handleError(error)
    }
  }

  validate(query: GraphQLQuery): boolean {
    return typeof query.query === 'string' && query.query.length > 0
  }

  handleError(error: any): never {
    console.error('HasuraGraphQLAdapter error:', error)
    throw new Error('GraphQL service unavailable')
  }

  private async getAuthToken(): Promise<string> {
    // Implementation for getting auth token
    return 'token'
  }
}
```

### Facade Pattern (Complex System Coordination)

**Purpose**: Simplify complex interactions between multiple systems

```typescript
// Event Management Facade - Coordinates all event-related operations
class EventManagementFacade {
  private hasuraAdapter: HasuraGraphQLAdapter
  private cacheAdapter: QueryCacheAdapter
  private validationAdapter: ZodValidationAdapter

  constructor() {
    this.hasuraAdapter = new HasuraGraphQLAdapter()
    this.cacheAdapter = new QueryCacheAdapter(queryClient)
    this.validationAdapter = new ZodValidationAdapter()
  }

  async createEvent(
    eventData: EventCreateType,
    userId: string
  ): Promise<DatabaseEvent> {
    // 1. Validate event data
    const validatedData = await this.validationAdapter.execute(
      eventData,
      EventCreateSchema
    )

    // 2. Create event in Hasura
    const createdEvent = await this.hasuraAdapter.execute({
      query: CREATE_EVENT_MUTATION,
      variables: { ...validatedData, createdById: userId },
    })

    // 3. Update cache
    this.cacheAdapter.invalidateQueries(QueryKeyFactory.events.all)
    this.cacheAdapter.setQueryData(
      QueryKeyFactory.events.detail(createdEvent.id),
      createdEvent
    )

    return createdEvent
  }
}
```

---

## 📋 Current Implementation Status

### ✅ Implemented Patterns

- **Adapter Pattern**: ✅ COMPLETED - HasuraGraphQLAdapter with full error handling
- **Singleton Pattern**: ✅ COMPLETED - GraphQL client single instance management
- **Component Decomposition**: ✅ COMPLETED - All components follow SOLID principles
- **Barrel Export Pattern**: ✅ COMPLETED - Consistent imports across codebase
- **Provider Pattern**: ✅ COMPLETED - Hierarchical providers in app layout
- **Observer Pattern**: ✅ COMPLETED - Zustand stores with subscriptions
- **Repository Pattern**: ✅ COMPLETED - Services abstract data access
- **Cache-aside Pattern**: ✅ COMPLETED - Categories service with TTL caching

### 🔄 Patterns for Future Implementation

- **Query Factory Pattern**: Ready for TanStack Query integration
- **StateFrame Pattern**: Unified loading/error states (partially in GridErrorBoundary)
- **Facade Pattern**: Complex system coordination (when needed)
- **Compound Components**: Advanced component composition

### 📝 Implementation Examples in Codebase

- **Adapter Pattern**: `/src/lib/adapters/hasura-graphql.adapter.ts`
- **Singleton Pattern**: `/src/lib/graphql/client.ts`
- **Repository Pattern**: `/src/services/categories.service.ts`
- **Observer Pattern**: `/src/lib/stores/theme.store.ts`
- **Provider Pattern**: `/src/app/layout.tsx`
- **Barrel Export Pattern**: `/src/components/*/index.ts`
- Zustand stores currently handle theme and language preferences
- Component patterns follow SOLID principles and are fully testable
- Architecture supports future integration of Clerk, Prisma, and TanStack Query

## 7. Barrel Export Pattern

### Purpose

Simplify imports and create clean module boundaries by consolidating exports into index files.

### Implementation

```typescript
// src/components/products/atoms/index.ts
export { ProductImage } from './ProductImage'
export { ProductPrice } from './ProductPrice'
export { ProductBadge } from './ProductBadge'
export type { ProductImageProps, ProductPriceProps } from './types'

// src/components/products/index.ts
export * from './atoms'
export * from './molecules'
export * from './organisms'

// Usage
import { ProductImage, ProductPrice } from '@/components/products'
```

### Benefits

- **Clean Imports**: Single import statement for multiple components
- **Encapsulation**: Hide internal file structure
- **Maintainability**: Easier refactoring without breaking imports
- **IntelliSense**: Better IDE autocomplete support

### Current Status

- ✅ Partial implementation in UI components
- 🏗️ Needs full implementation across all component directories
- 📝 ESLint rules to be added for enforcement

## 8. Atomic Design Pattern

### Purpose

Organize components into hierarchical levels for better structure and reusability.

### Levels

#### Atoms

```typescript
// Smallest, indivisible components
export function Button({ children, onClick }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>
}
```

#### Molecules

```typescript
// Combinations of atoms
export function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <div className="flex gap-2">
      <Input placeholder="Search..." />
      <Button onClick={onSearch}>Search</Button>
    </div>
  )
}
```

#### Organisms

```typescript
// Complex components with business logic
export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid">
      <ProductFilters />
      {products.map(p => <ProductCard key={p.id} product={p} />)}
      <Pagination />
    </div>
  )
}
```

#### Templates

```typescript
// Page layouts without content
export function CartTemplate({ cart, onCheckout }: CartTemplateProps) {
  return (
    <div className="container">
      <CartHeader />
      <CartItemsList items={cart.items} />
      <CartSummary summary={cart.summary} />
      <CheckoutButton onClick={onCheckout} />
    </div>
  )
}
```

### Current Implementation

- ✅ Cart components follow atomic design
- ✅ UI components properly classified
- 🏗️ Products components being refactored
- 📝 Migration guide created for existing components

## Related Documentation

- [Atomic Design Guidelines](./atomic-design-guidelines.md) - Detailed classification criteria
- [Barrel Export Strategy](./barrel-export-strategy.md) - Implementation guide
- [Component Examples](./component-examples.md) - Real-world examples
- [Technology Stack](./technology-stack.md) - Technical implementation details
