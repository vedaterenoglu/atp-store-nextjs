# Barrel Export Strategy

## Overview

Barrel exports provide a clean import interface by consolidating exports from multiple files into a single index file. This strategy improves code organization, simplifies imports, and enforces module boundaries in the ATP Store application.

## Core Principles

1. **Single Entry Point**: Each module exposes a single public API
2. **Encapsulation**: Hide internal file structure from consumers
3. **Maintainability**: Easier refactoring without breaking imports
4. **Developer Experience**: Better IntelliSense and autocomplete

## Export Rules and Structure

### Directory Structure with Barrel Exports

```
src/
├── components/
│   ├── products/
│   │   ├── atoms/
│   │   │   ├── ProductImage.tsx
│   │   │   ├── ProductPrice.tsx
│   │   │   ├── ProductBadge.tsx
│   │   │   └── index.ts           # Barrel for atoms
│   │   ├── molecules/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductQuickView.tsx
│   │   │   └── index.ts           # Barrel for molecules
│   │   ├── organisms/
│   │   │   ├── ProductGrid.tsx
│   │   │   ├── ProductFilters.tsx
│   │   │   └── index.ts           # Barrel for organisms
│   │   ├── templates/
│   │   │   ├── ProductCatalogTemplate.tsx
│   │   │   └── index.ts           # Barrel for templates
│   │   └── index.ts               # Main barrel for products
│   ├── cart/
│   │   ├── atoms/
│   │   │   └── index.ts
│   │   ├── molecules/
│   │   │   └── index.ts
│   │   ├── organisms/
│   │   │   └── index.ts
│   │   └── index.ts               # Main barrel for cart
│   └── index.ts                   # Root barrel for all components
├── lib/
│   ├── utils/
│   │   ├── cn.ts
│   │   ├── price.ts
│   │   ├── toast-wrapper.ts
│   │   └── index.ts               # Barrel for utils
│   ├── stores/
│   │   ├── cart.store.ts
│   │   ├── theme.store.ts
│   │   └── index.ts               # Barrel for stores
│   └── index.ts                   # Main barrel for lib
└── services/
    ├── graphql/
    │   └── queries/
    │       └── index.ts           # Barrel for queries
    ├── products.service.ts
    ├── categories.service.ts
    └── index.ts                   # Barrel for services
```

## Barrel Export Patterns

### Level 1: Component Directory Exports

```typescript
// src/components/products/atoms/index.ts

// Named exports for components
export { ProductImage } from './ProductImage'
export { ProductPrice } from './ProductPrice'
export { ProductBadge } from './ProductBadge'

// Re-export types when needed
export type { ProductImageProps } from './ProductImage'
export type { ProductPriceProps } from './ProductPrice'
export type { ProductBadgeProps } from './ProductBadge'
```

### Level 2: Feature Directory Exports

```typescript
// src/components/products/index.ts

// Option 1: Re-export everything from subdirectories
export * from './atoms'
export * from './molecules'
export * from './organisms'
export * from './templates'

// Option 2: Selective exports for public API
export { ProductCard, ProductQuickView } from './molecules'
export { ProductGrid } from './organisms'
export { ProductCatalogTemplate } from './templates'

// Option 3: Grouped exports
export * as ProductAtoms from './atoms'
export * as ProductMolecules from './molecules'
```

### Level 3: Root Component Exports

```typescript
// src/components/index.ts

// Export major component groups
export * from './products'
export * from './cart'
export * from './auth'
export * from './ui/schadcn'

// Or namespace exports
export * as Products from './products'
export * as Cart from './cart'
export * as UI from './ui/schadcn'
```

## Named vs Default Exports Guidelines

### Use Named Exports (Preferred) ✅

```typescript
// component.tsx
export function ProductCard({ product }: ProductCardProps) {
  return <div>...</div>
}

export interface ProductCardProps {
  product: Product
}

// index.ts
export { ProductCard } from './ProductCard'
export type { ProductCardProps } from './ProductCard'

// Usage
import { ProductCard } from '@/components/products'
```

**When to use**:

- All React components
- Utilities and helper functions
- Types and interfaces
- Constants and configurations
- Services and stores

**Benefits**:

- Tree-shaking support
- Explicit imports
- Better refactoring
- Prevents naming conflicts

### Use Default Exports (Limited) ⚠️

```typescript
// page.tsx
export default function HomePage() {
  return <div>...</div>
}

// layout.tsx
export default function RootLayout({ children }) {
  return <html>{children}</html>
}
```

**When to use ONLY**:

- Next.js page components (required by framework)
- Next.js layouts and error boundaries
- Next.js API routes
- Large standalone modules (rare)

## Implementation Guide

### Step 1: Create Index Files

```typescript
// Create index.ts in each directory
// src/components/cart/atoms/index.ts

export { EmptyCartButton } from './EmptyCartButton'
export { CartEmptyState } from './CartEmptyState'
export { CartItemQuantity } from './CartItemQuantity'

// Export types
export type { EmptyCartButtonProps } from './EmptyCartButton'
export type { CartEmptyStateProps } from './CartEmptyState'
```

### Step 2: Update Import Statements

```typescript
// ❌ Before - Direct imports
import { EmptyCartButton } from '@/components/cart/atoms/EmptyCartButton'
import { CartEmptyState } from '@/components/cart/atoms/CartEmptyState'
import { CartItemQuantity } from '@/components/cart/atoms/CartItemQuantity'

// ✅ After - Barrel imports
import {
  EmptyCartButton,
  CartEmptyState,
  CartItemQuantity,
} from '@/components/cart/atoms'
```

### Step 3: Configure Path Aliases

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/components": ["./src/components/index.ts"],
      "@/components/*": ["./src/components/*"],
      "@/ui": ["./src/components/ui/schadcn/index.ts"],
      "@/cart": ["./src/components/cart/index.ts"],
      "@/products": ["./src/components/products/index.ts"],
      "@/lib": ["./src/lib/index.ts"],
      "@/lib/*": ["./src/lib/*"],
      "@/services": ["./src/services/index.ts"],
      "@/services/*": ["./src/services/*"],
      "@/stores": ["./src/lib/stores/index.ts"],
      "@/utils": ["./src/lib/utils/index.ts"]
    }
  }
}
```

### Step 4: ESLint Rules for Enforcement

```javascript
// .eslintrc.js
module.exports = {
  rules: {
    // Enforce barrel imports for components
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['@/components/*/*/**'],
            message: 'Use barrel imports from parent directory index',
          },
          {
            group: ['@/lib/*/*/**'],
            message: 'Use barrel imports from parent directory index',
          },
        ],
      },
    ],

    // Enforce named exports
    'import/no-default-export': [
      'error',
      {
        exceptions: [
          '**/app/**/page.tsx',
          '**/app/**/layout.tsx',
          '**/app/**/error.tsx',
          '**/app/**/loading.tsx',
          '**/app/**/not-found.tsx',
          '**/app/api/**/route.ts',
        ],
      },
    ],

    // Prevent circular dependencies
    'import/no-cycle': 'error',

    // Consistent type imports
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        disallowTypeAnnotations: true,
      },
    ],
  },
}
```

## Best Practices

### 1. Selective Re-exports

```typescript
// ✅ Good - Selective exports
export { ProductCard } from './ProductCard'
export { ProductList } from './ProductList'

// ❌ Bad - Exposing internals
export * from './ProductCard'
export * from './internal/helpers'
```

### 2. Type Exports

```typescript
// ✅ Good - Separate type exports
export { ProductCard } from './ProductCard'
export type { ProductCardProps } from './ProductCard'

// Or use type-only exports
export type * from './types'
```

### 3. Avoid Deep Nesting

```typescript
// ❌ Bad - Too many levels
import { Button } from '@/components/ui/atoms/buttons/primary'

// ✅ Good - Reasonable depth
import { Button } from '@/components/ui'
```

### 4. Consistent Naming

```typescript
// index.ts files should only contain exports
// No implementation code in barrel files

// ✅ Good
export { ProductCard } from './ProductCard'

// ❌ Bad
export const helper = () => {
  /* implementation */
}
```

## Anti-Patterns to Avoid

### ❌ Circular Dependencies

```typescript
// Bad - Creates circular dependency
// components/atoms/index.ts
export { Button } from './Button'

// Button.tsx imports from same index
import { Icon } from './index' // ❌ Circular!

// Good - Direct import
import { Icon } from './Icon' // ✅ Direct
```

### ❌ Re-exporting Everything

```typescript
// Bad - Loses benefits of tree-shaking
export * from './components'
export * from './utils'
export * from './types'
export * from './constants'

// Good - Selective exports
export { Button, Input, Card } from './components'
export { cn, formatPrice } from './utils'
```

### ❌ Mixed Exports

```typescript
// Bad - Mixing named and default
export default Button
export { ButtonProps }

// Good - Consistent named exports
export { Button }
export type { ButtonProps }
```

### ❌ Implementation in Barrels

```typescript
// Bad - Implementation in index.ts
// index.ts
export const calculateTotal = items => {
  return items.reduce((sum, item) => sum + item.price, 0)
}

// Good - Only exports in index.ts
// calculateTotal.ts
export const calculateTotal = items => {
  /* ... */
}
// index.ts
export { calculateTotal } from './calculateTotal'
```

## Migration Checklist

### Phase 1: Audit

- [ ] List all current import patterns
- [ ] Identify circular dependencies
- [ ] Document public APIs

### Phase 2: Structure

- [ ] Create index.ts files for each directory
- [ ] Define export strategy (selective vs. re-export all)
- [ ] Configure TypeScript path aliases

### Phase 3: Implementation

- [ ] Convert default exports to named exports (except pages)
- [ ] Update all import statements to use barrels
- [ ] Add type exports where needed

### Phase 4: Enforcement

- [ ] Add ESLint rules for barrel imports
- [ ] Configure import/no-cycle rule
- [ ] Set up pre-commit hooks

### Phase 5: Validation

- [ ] Run build to verify no errors
- [ ] Check bundle size impact
- [ ] Verify tree-shaking works
- [ ] Update documentation

## Common Use Cases

### Component Library

```typescript
// src/components/ui/index.ts
export { Button } from './button'
export { Input } from './input'
export { Card, CardHeader, CardContent, CardFooter } from './card'
export { Dialog, DialogTrigger, DialogContent } from './dialog'

// Usage
import { Button, Card, Dialog } from '@/components/ui'
```

### Feature Module

```typescript
// src/features/auth/index.ts
export { LoginForm } from './components/LoginForm'
export { useAuth } from './hooks/useAuth'
export { authService } from './services/auth.service'
export type { User, AuthState } from './types'

// Usage
import { LoginForm, useAuth, type User } from '@/features/auth'
```

### Utility Functions

```typescript
// src/lib/utils/index.ts
export { cn } from './cn'
export { formatPrice } from './price'
export { formatDate } from './date'
export { toast } from './toast-wrapper'

// Usage
import { cn, formatPrice, toast } from '@/lib/utils'
```

## Performance Considerations

### Tree Shaking

- Named exports enable better tree shaking
- Avoid `export *` when possible
- Use production builds to verify unused code elimination

### Bundle Size

- Monitor bundle size with barrel exports
- Use dynamic imports for large modules
- Consider code splitting boundaries

### Build Time

- Barrel exports may increase TypeScript compile time
- Use project references for large codebases
- Consider incremental builds

## Troubleshooting

### Circular Dependency Detected

```bash
# Use madge to detect circular dependencies
npx madge --circular src/

# Fix by:
1. Identify the circular path
2. Extract shared code to separate module
3. Use dependency injection if needed
```

### TypeScript Cannot Find Module

```bash
# Verify tsconfig.json paths
# Ensure index.ts exists
# Check for typos in exports
# Restart TypeScript server in VS Code
```

### ESLint Import Errors

```bash
# Update .eslintrc.js with proper rules
# Ensure eslint-plugin-import is installed
# Clear ESLint cache: npm run lint -- --cache-clear
```

## Related Documentation

- [Atomic Design Guidelines](./atomic-design-guidelines.md)
- [Component Examples](./component-examples.md)
- [Technology Stack](./technology-stack.md)
- [Design Patterns](./design-patterns.md)
