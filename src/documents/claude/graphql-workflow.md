# GraphQL Workflow Guidelines

## Overview

This document describes the manual GraphQL type safety workflow used in the ATP Store Next.js application. The project uses Apollo Client with a manual type definition approach instead of code generation.

## Current Implementation Status

### ✅ Completed

- Migration from urql to Apollo Client
- Manual type safety workflow implementation
- Removal of all codegen dependencies
- Creation of validated mock data for all queries/mutations

### 🔧 Technology Stack

- **GraphQL Client**: Apollo Client 3.12.8
- **SSR Support**: @apollo/experimental-nextjs-app-support 0.11.8
- **Type Safety**: Manual TypeScript types + Zod runtime validation
- **GraphQL Files**: Imported via @graphql-tools/webpack-loader

## Manual Type Safety Workflow

### 1. File Structure

For each GraphQL operation, create the following files:

```
src/services/graphql/
├── queries/
│   ├── QueryName.graphql           # GraphQL query definition
│   ├── QueryName.types.ts          # TypeScript interfaces
│   └── QueryName.schema.ts         # Zod validation schemas
└── mutations/
    ├── MutationName.graphql         # GraphQL mutation definition
    ├── MutationName.types.ts       # TypeScript interfaces
    └── MutationName.schema.ts      # Zod validation schemas
```

### 2. GraphQL Query File (.graphql)

```graphql
query GetProducts($company_id: String!) {
  stock(where: { company_id: { _eq: $company_id } }) {
    stock_id
    stock_name
    stock_price
    stock_unit
    stock_group
  }
}
```

### 3. TypeScript Types (.types.ts)

```typescript
/**
 * TypeScript Types for GetProductsQuery
 *
 * SOLID Principles: SRP - Single responsibility for type definitions
 * Design Patterns: Type Safety Pattern
 * Dependencies: None
 */

export interface GetProductsQueryVariables {
  company_id: string
}

export interface StockItem {
  stock_id: string
  stock_name: string | null
  stock_price: number | null
  stock_unit: string | null
  stock_group: string | null
}

export interface GetProductsQueryResponse {
  stock: StockItem[]
}

// Type guard for runtime checking
export function isGetProductsQueryResponse(
  data: unknown
): data is GetProductsQueryResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'stock' in data &&
    Array.isArray((data as GetProductsQueryResponse).stock)
  )
}
```

### 4. Zod Schema (.schema.ts)

```typescript
/**
 * Zod Schema for GetProductsQuery
 *
 * SOLID Principles: SRP - Single responsibility for validation
 * Design Patterns: Validation Pattern with runtime type checking
 * Dependencies: zod, TypeScript types
 */

import { z } from 'zod'
import type { GetProductsQueryResponse } from './GetProductsQuery.types'

export const StockItemSchema = z.object({
  stock_id: z.string(),
  stock_name: z.string().nullable(),
  stock_price: z.number().nullable(),
  stock_unit: z.string().nullable(),
  stock_group: z.string().nullable(),
})

export const GetProductsQueryResponseSchema = z.object({
  stock: z.array(StockItemSchema),
}) satisfies z.ZodType<GetProductsQueryResponse>

// Validation functions
export function validateGetProductsResponse(
  data: unknown
): GetProductsQueryResponse {
  return GetProductsQueryResponseSchema.parse(data)
}

export function safeValidateGetProductsResponse(data: unknown) {
  return GetProductsQueryResponseSchema.safeParse(data)
}
```

### 5. Mock Data

```typescript
/**
 * Mock data for GetProductsQuery
 *
 * SOLID Principles: SRP - Single responsibility for mock data
 * Design Patterns: Mock Data Pattern with validation
 * Dependencies: Zod schemas, TypeScript types
 */

import { GetProductsQueryResponseSchema } from '@/services/graphql/queries/GetProductsQuery.schema'
import type { GetProductsQueryResponse } from '@/services/graphql/queries/GetProductsQuery.types'

// Validated at module load time
export const mockProductsData: GetProductsQueryResponse =
  GetProductsQueryResponseSchema.parse({
    stock: [
      {
        stock_id: '1001',
        stock_name: 'Pizza Box Large',
        stock_price: 15.99,
        stock_unit: 'pcs',
        stock_group: 'PIZZA_BOXES',
      },
      // ... more items
    ],
  })

// Factory function for custom mock data
export function createMockProductsData(
  overrides?: Partial<GetProductsQueryResponse>
): GetProductsQueryResponse {
  const data = {
    ...mockProductsData,
    ...overrides,
  }
  return GetProductsQueryResponseSchema.parse(data)
}
```

## Apollo Client Integration

### 1. Client Configuration

```typescript
// src/lib/apollo/client.ts
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support'

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT,
})

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
  },
}))

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  })
})
```

### 2. Service Implementation

```typescript
// src/services/products.service.ts
import { getClient } from '@/lib/apollo/client'
import GetProductsQueryDocument from '@/services/graphql/queries/GetProductsQuery.graphql'
import { validateGetProductsResponse } from '@/services/graphql/queries/GetProductsQuery.schema'
import type {
  GetProductsQueryResponse,
  GetProductsQueryVariables,
} from '@/services/graphql/queries/GetProductsQuery.types'

export async function getProducts(): Promise<ProductsArray> {
  const client = getClient()

  const { data } = await client.query<
    GetProductsQueryResponse,
    GetProductsQueryVariables
  >({
    query: GetProductsQueryDocument,
    variables: { company_id: 'alfe' },
  })

  // Validate response with Zod
  const validatedResponse = validateGetProductsResponse(data)

  // Transform and return
  return transformProducts(validatedResponse.stock)
}
```

## Benefits of Manual Workflow

### 1. **Full Control**

- Complete control over type definitions
- No dependency on flaky code generation
- Easier to debug and understand

### 2. **Better Type Safety**

- Compile-time checking with `satisfies` operator
- Runtime validation with Zod
- Type guards for defensive programming

### 3. **Improved Testing**

- Mock data validated at module load time
- Consistent mock data across all tests
- Factory functions for test scenarios

### 4. **No Build Dependencies**

- No codegen step in build process
- Faster builds without generation step
- No broken builds from codegen errors

## Migration from Codegen

When migrating from codegen to manual workflow:

1. **Keep the .graphql files** - They're still used via webpack loader
2. **Create .types.ts files** - Manual TypeScript interfaces matching the GraphQL schema
3. **Create .schema.ts files** - Zod schemas with `satisfies` operator for validation
4. **Update services** - Use Apollo Client instead of generated hooks
5. **Create mock data** - Validated mock data for tests
6. **Remove codegen packages** - Uninstall all @graphql-codegen/\* packages

## Common Patterns

### Transform Functions

Create transform utilities to convert backend data to frontend models:

```typescript
// src/services/utils/product-transforms.ts
export function validateAndTransformProducts(
  stockItems: StockItem[]
): Product[] {
  return stockItems.map(item => ({
    id: item.stock_id,
    name: item.stock_name || 'Unknown Product',
    price: item.stock_price || 0,
    unit: item.stock_unit || 'pcs',
    categoryId: item.stock_group || 'uncategorized',
  }))
}
```

### Error Handling

Implement consistent error handling:

```typescript
try {
  const { data } = await client.query(/* ... */)
  const validated = validateResponse(data)
  return transform(validated)
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error('Response validation failed:', error)
    throw new Error('Invalid response format')
  }
  throw error
}
```

## Best Practices

1. **Always validate responses** - Use Zod schemas to validate GraphQL responses
2. **Use type guards** - Implement type guard functions for runtime checks
3. **Mock data validation** - Validate mock data at module load time
4. **Consistent naming** - Match file names to GraphQL operation names
5. **Document types** - Include clear comments in type files
6. **Transform at boundaries** - Convert backend models to frontend models in services

## Troubleshooting

### Common Issues

1. **Import errors for .graphql files**
   - Ensure @graphql-tools/webpack-loader is configured
   - Check that .graphql files are in correct location

2. **Type mismatches**
   - Verify manual types match actual GraphQL schema
   - Use actual Hasura responses to create accurate types

3. **Validation failures**
   - Check Zod schemas match the type definitions
   - Use `satisfies` operator for compile-time checking

4. **Mock data issues**
   - Ensure mock data is validated at module load
   - Use factory functions for test variations

---

_Last Updated: 2025-08-06_
