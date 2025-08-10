# Style Guide - ATP Store Next.js Application

## Overview

This document defines the styling standards and patterns for the ATP Store Next.js application. All components must follow these guidelines to ensure consistency and maintainability.

## Core Principles

### 1. Always Use `cn()` Utility

The `cn()` utility from `@/lib/utils` must be used for all className compositions.

```typescript
// ❌ Bad - Direct string concatenation
className={`text-lg ${isActive ? 'font-bold' : ''}`}

// ❌ Bad - Using clsx directly
className={clsx('text-lg', isActive && 'font-bold')}

// ✅ Good - Using cn() utility
className={cn('text-lg', isActive && 'font-bold')}
```

### 2. Use Style Utilities from `@/lib/styles/utilities`

Leverage the provided utility functions for consistent spacing, containers, and layouts.

```typescript
import { getContainerClasses, getSpacingClasses } from '@/lib/styles/utilities'

// ✅ Good - Using utility functions
<div className={getContainerClasses({ size: 'xl' })}>
  <section className={getSpacingClasses({ y: 'lg' })}>
```

## Component Patterns

### Layout Components

#### Navbar

```typescript
import { getLayoutClasses } from '@/lib/styles/utilities'

<nav className={getLayoutClasses({ component: 'navbar', part: 'container' })}>
  <div className={getLayoutClasses({ component: 'navbar', part: 'inner' })}>
    {/* Navigation content */}
  </div>
</nav>
```

#### Footer

```typescript
<footer className={getLayoutClasses({ component: 'footer', part: 'container' })}>
  <div className={getLayoutClasses({ component: 'footer', part: 'inner' })}>
    {/* Footer content */}
  </div>
</footer>
```

### Page Templates

All page templates should follow this structure:

```typescript
import { getPageClasses, getContainerClasses } from '@/lib/styles/utilities'

export function PageTemplate() {
  return (
    <div className={getPageClasses({ section: 'container' })}>
      <section className={getPageClasses({ section: 'content' })}>
        <div className={getContainerClasses({ size: 'xl' })}>
          {/* Page content */}
        </div>
      </section>
    </div>
  )
}
```

### Card Components

Cards should use the shadcn Card components with our utility functions:

```typescript
import { getCardClasses } from '@/lib/styles/utilities'

<Card>
  <CardHeader className={getCardClasses({ variant: 'header' })}>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent className={getCardClasses({ variant: 'content' })}>
    {/* Content */}
  </CardContent>
  <CardFooter className={getCardClasses({ variant: 'footer' })}>
    {/* Footer */}
  </CardFooter>
</Card>
```

### Grid Layouts

Use grid utilities for consistent layouts:

```typescript
import { getGridClasses } from '@/lib/styles/utilities'

<div className={getGridClasses({ gap: 'md', responsive: true })}>
  {items.map(item => (
    <GridItem key={item.id}>
      {/* Item content */}
    </GridItem>
  ))}
</div>
```

### Form Components

Forms should follow this pattern:

```typescript
import { getFormClasses } from '@/lib/styles/utilities'

<form className={getFormClasses({ variant: 'container' })}>
  <div className={getFormClasses({ variant: 'field' })}>
    {/* Form field */}
  </div>
  <div className={getFormClasses({ variant: 'buttonGroup' })}>
    {/* Buttons */}
  </div>
</form>
```

## Spacing Standards

### Container Padding

- Mobile: `px-4`
- Tablet: `sm:px-6`
- Desktop: `lg:px-8`

### Section Spacing

- Small: `py-4 sm:py-6`
- Medium: `py-6 sm:py-8 lg:py-10`
- Large: `py-8 sm:py-12 lg:py-16`

### Component Gaps

- Small: `gap-2`
- Medium: `gap-4 sm:gap-6`
- Large: `gap-6 sm:gap-8`

## Responsive Design

### Breakpoints

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Mobile-First Approach

Always start with mobile styles and add responsive modifiers:

```typescript
// ✅ Good - Mobile-first
className={cn('text-sm sm:text-base lg:text-lg')}

// ❌ Bad - Desktop-first
className={cn('text-lg lg:text-base sm:text-sm')}
```

## Color Usage

### Semantic Colors

Use semantic color tokens from Tailwind:

- `text-foreground` - Primary text
- `text-muted-foreground` - Secondary text
- `bg-background` - Main background
- `bg-muted` - Muted background
- `border-border` - Border color

### State Colors

- Success: `text-green-600 dark:text-green-400`
- Error: `text-destructive`
- Warning: `text-yellow-600 dark:text-yellow-400`
- Info: `text-blue-600 dark:text-blue-400`

## Typography

### Headings

```typescript
// Page title
<h1 className={cn('text-3xl sm:text-4xl font-bold')}>

// Section title
<h2 className={cn('text-2xl sm:text-3xl font-semibold')}>

// Subsection title
<h3 className={cn('text-xl sm:text-2xl font-medium')}>
```

### Body Text

```typescript
// Regular text
<p className={cn('text-base')}>

// Small text
<p className={cn('text-sm text-muted-foreground')}>

// Large text
<p className={cn('text-lg')}>
```

## Migration Guide

### Step 1: Import Required Utilities

```typescript
import { cn } from '@/lib/utils'
import {
  getContainerClasses,
  getSpacingClasses,
  getGridClasses,
} from '@/lib/styles/utilities'
```

### Step 2: Replace Direct className Strings

```typescript
// Before
<div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

// After
<div className={getContainerClasses({ size: 'xl' })}>
```

### Step 3: Use cn() for All Dynamic Classes

```typescript
// Before
<div className={`grid gap-4 ${columns ? `grid-cols-${columns}` : 'grid-cols-1'}`}>

// After
<div className={cn(
  'grid gap-4',
  columns ? `grid-cols-${columns}` : 'grid-cols-1'
)}>
```

### Step 4: Apply Component-Specific Patterns

Follow the patterns defined for your component type (layout, page, card, grid, form).

## Common Patterns

### Conditional Classes

```typescript
className={cn(
  'base-classes',
  isActive && 'active-classes',
  isDisabled && 'disabled-classes',
  size === 'large' && 'large-classes',
  className // Allow override from props
)}
```

### Responsive Classes

```typescript
className={cn(
  'text-sm', // Mobile
  'sm:text-base', // Tablet
  'lg:text-lg', // Desktop
  'xl:text-xl' // Large desktop
)}
```

### Variant-Based Styling

```typescript
const variants = {
  primary: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  outline: 'border border-input bg-background',
}

className={cn(variants[variant], className)}
```

## Validation Checklist

Before committing code, ensure:

- [ ] All className props use `cn()` utility
- [ ] Style utilities are used where applicable
- [ ] No direct string concatenation for classes
- [ ] Consistent spacing patterns applied
- [ ] Mobile-first responsive design
- [ ] Semantic color tokens used
- [ ] Component follows its category pattern

## Tools & Enforcement

### ESLint Rules

Custom ESLint rules enforce the use of `cn()` for className props.

### Prettier

Ensures consistent formatting of className strings.

### Pre-commit Hooks

Validates style patterns before allowing commits.

## Examples

### Complete Component Example

```typescript
/**
 * Example Card Component
 * SOLID Principles: SRP - Display card content
 * Design Patterns: Composition Pattern
 */

import { cn } from '@/lib/utils'
import { getCardClasses, getSpacingClasses } from '@/lib/styles/utilities'
import { Card, CardHeader, CardContent } from '@/components/ui/schadcn'

interface ExampleCardProps {
  title: string
  content: string
  variant?: 'default' | 'featured'
  className?: string
}

export function ExampleCard({
  title,
  content,
  variant = 'default',
  className
}: ExampleCardProps) {
  return (
    <Card className={cn(
      variant === 'featured' && 'border-primary',
      className
    )}>
      <CardHeader className={getCardClasses({ variant: 'header' })}>
        <h3 className={cn('text-lg font-semibold')}>{title}</h3>
      </CardHeader>
      <CardContent className={getCardClasses({ variant: 'content' })}>
        <p className={cn('text-muted-foreground')}>{content}</p>
      </CardContent>
    </Card>
  )
}
```

## Resources

- [Style Constants](/src/lib/styles/constants.ts)
- [Style Utilities](/src/lib/styles/utilities.ts)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
