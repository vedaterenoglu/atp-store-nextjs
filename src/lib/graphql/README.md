# GraphQL Query Pattern Guide

## How to Add New Queries/Mutations

This guide shows how to add new GraphQL operations using our urql + manual types + Zod pattern.

### Step 1: Create the GraphQL Query File

Create your `.graphql` file:

```graphql
# src/services/graphql/queries/GetProductsQuery.graphql
query GetProductsQuery($limit: Int = 10) {
  products(limit: $limit) {
    id
    name
    price
    stock_quantity
  }
}
```

### Step 2: Create Zod Schema and Types

Create a schema file in `src/lib/graphql/schemas/`:

```typescript
// src/lib/graphql/schemas/products.ts
import { z } from 'zod'

// Define Zod schema
export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  stock_quantity: z.number(),
})

export const GetProductsQueryResponseSchema = z.object({
  products: z.array(ProductSchema),
})

// Infer TypeScript types
export type Product = z.infer<typeof ProductSchema>
export type GetProductsQueryResponse = z.infer<
  typeof GetProductsQueryResponseSchema
>
```

### Step 3: Create Service Layer

Create a service file with the Facade pattern:

```typescript
// src/services/products.service.ts
import { executeGraphQLOperation } from '@/lib/graphql/client'
import {
  GetProductsQueryResponseSchema,
  type GetProductsQueryResponse,
  type Product,
} from '@/lib/graphql/schemas/products'
import GET_PRODUCTS_QUERY from '@/services/graphql/queries/GetProductsQuery.graphql'

export async function getProducts(limit?: number): Promise<Product[]> {
  try {
    // Use urql with manual types
    const response = await executeGraphQLOperation<GetProductsQueryResponse>(
      GET_PRODUCTS_QUERY,
      { limit }
    )

    // Validate with Zod
    const validated = GetProductsQueryResponseSchema.parse(response)

    return validated.products
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      throw new Error('Invalid product data format')
    }
    throw error
  }
}
```

### Step 4: Use in Components

```typescript
// src/components/ProductList.tsx
import { getProducts } from '@/services/products.service';

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts(20).then(setProducts);
  }, []);

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

## Benefits of This Pattern

1. **Type Safety**: Manual TypeScript types provide compile-time safety
2. **Runtime Validation**: Zod ensures data matches expected format
3. **Gradual Migration**: Add types for queries as needed
4. **No Code Generation**: Works immediately without build steps
5. **Clear Architecture**: Separation of concerns with Adapter/Facade patterns

## Architecture Overview

```
Component (UI Layer)
    ↓
Service (Facade Pattern)
    ↓
GraphQL Client (Adapter Pattern)
    ↓
urql → Hasura → PostgreSQL
```

## Testing

Always create tests for your services:

```typescript
// Mock the GraphQL response
;(executeGraphQLOperation as jest.Mock).mockResolvedValue({
  products: [{ id: '1', name: 'Test', price: 10, stock_quantity: 5 }],
})

// Test the service
const products = await getProducts()
expect(products).toHaveLength(1)
```
