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

- **StateFrame Pattern**: Partially implemented in test files
- **Zustand Global State**: Theme and language stores implemented
- **Component Decomposition**: Following SOLID principles
- **Compound Components**: Used in layout components

### 🔄 Patterns for Future Implementation

- **Query Factory Pattern**: Ready for TanStack Query integration
- **Adapter Pattern**: Prepared for Hasura GraphQL integration
- **Facade Pattern**: Architecture designed for complex system coordination
- **Server/Client Caching**: Framework ready for implementation
- **React Hook Form + Zod**: Pattern established for form handling

### 📝 Implementation Notes

- All patterns designed to work with the current Hasura GraphQL + Next.js architecture
- Zustand stores currently handle theme and language preferences
- Component patterns follow SOLID principles and are fully testable
- Architecture supports future integration of Clerk, Prisma, and TanStack Query
