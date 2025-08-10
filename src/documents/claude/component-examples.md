# Component Examples and Implementation Patterns

This document provides real-world component examples following Atomic Design principles. Each component demonstrates proper classification, SOLID principles, and implementation patterns.

## Component Classification by Atomic Design Level

### Atoms

- **ThemeToggle**: UI control for dark/light mode
- **LanguageToggle**: Language selector dropdown
- **Button**: Base interactive element
- **Input**: Form input field
- **EmptyCartButton**: Specialized cart action

### Molecules

- **NavbarBrand**: Logo + company name combination
- **NavbarActions**: Group of action buttons
- **CartItemCard**: Product display with actions
- **SearchBar**: Input + button combination

### Organisms

- **Navbar**: Complete navigation component
- **Footer**: Site footer with sections
- **CartItemsList**: List of cart items with actions
- **ProductGrid**: Grid of product cards

### Templates

- **CustomerCartTemplate**: Cart page layout
- **AdminDashboardTemplate**: Admin page structure

### Pages

- Route components in `/app` directory

## Layout Components

### Navbar Component (Organism - Actual Implementation)

**Purpose**: Main navigation with authentication and user preferences

```typescript
// components/layout/navbar.tsx
/**
 * Navbar - Main navigation component with authentication and preferences
 *
 * Features:
 * - Brand logo and company name
 * - Theme and language toggles
 * - Clerk authentication (sign in/user button)
 * - Responsive layout with proper spacing
 *
 * Props: None
 * State: Auth state from Clerk hooks
 */
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { SignInButton, UserButton, useAuth, useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/schadcn'
import { ThemeToggle, LanguageToggle } from '@/components/ui/custom'

export function Navbar() {
  return (
    <nav className="border-b -mx-4">
      <div className="px-6 sm:px-8 py-4">
        <div className="flex items-center justify-between">
          <NavbarBrand />
          <NavbarActions />
        </div>
      </div>
    </nav>
  )
}

function NavbarBrand() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3 text-foreground transition-colors hover:text-primary"
    >
      <Image
        src="/logo.png"
        alt="ATP Store Logo"
        width={40}
        height={40}
        className="h-10 w-10 object-contain"
        priority
      />
      <span className="text-xl font-bold">ATP Store</span>
    </Link>
  )

function NavbarActions() {
  const { isSignedIn } = useAuth()
  const { user } = useUser()

  return (
    <div className="flex items-center gap-2">
      <ThemeToggle />
      <LanguageToggle />
      {isSignedIn ? (
        <UserButton afterSignOutUrl="/" />
      ) : (
        <SignInButton mode="modal">
          <Button size="sm" className="ml-2">
            Sign In
          </Button>
        </SignInButton>
      )}
    </div>
  )
}
```

### Footer Component (Actual Implementation)

**Purpose**: Simple footer with copyright and branding

```typescript
// components/layout/footer.tsx
/**
 * Footer - Simple footer component with logo and copyright
 *
 * Features:
 * - Displays logo image
 * - Shows copyright with configurable year and author
 * - Centered layout with responsive spacing
 *
 * Props: Optional year and author for copyright text
 * State: None (pure presentation component)
 */
'use client'

import Image from 'next/image'

interface FooterProps {
  year?: number
  author?: string
}

export function Footer({
  year = new Date().getFullYear(),
  author = 'GTBS Coding',
}: FooterProps) {
  return (
    <footer className="mt-auto border-t -mx-4">
      <div className="px-4 py-4 sm:py-6">
        <div className="flex flex-col items-center gap-2">
          <p className="text-center text-sm text-muted-foreground">
            © {year} Alfe Tissue Paper AB. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Created by</span>
            <Image
              src="/logo-gtbs.png"
              alt="GTBS Coding Logo"
              width={20}
              height={20}
              className="h-5 w-5 object-contain"
            />
            <span className="font-medium text-foreground transition-colors hover:text-primary">
              {author}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
```

---

## UI Components

### Theme Toggle Component (Actual Implementation)

**Purpose**: Dropdown menu for theme selection with dynamic icons

```typescript
// components/ui/custom/theme-toggle.tsx
/**
 * ThemeToggle - Dropdown menu for theme selection with dynamic icons
 *
 * Features:
 * - Displays current theme icon (sun/moon/monitor)
 * - Dropdown with light/dark/system options
 * - Shows check mark on selected theme
 * - Smooth icon transitions
 *
 * Props: None (uses theme store)
 * State: Manages mounted state for hydration safety
 */
'use client'

import { Moon, Sun, Monitor, Check } from 'lucide-react'
import { useThemeStore } from '@/lib/stores'
import { Button } from '@/components/ui'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui'
import { useEffect, useState } from 'react'

interface ThemeOption {
  value: 'light' | 'dark' | 'system'
  icon: typeof Sun
  label: string
}

const themes: ThemeOption[] = [
  { value: 'light', icon: Sun, label: 'Light' },
  { value: 'dark', icon: Moon, label: 'Dark' },
  { value: 'system', icon: Monitor, label: 'System' },
]

export function ThemeToggle() {
  return (
    <ThemeToggleContainer>
      <ThemeToggleDropdown />
    </ThemeToggleContainer>
  )
}

function ThemeToggleContainer({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-9 w-9" />
  }

  return <>{children}</>
}

function ThemeToggleDropdown() {
  const { theme, setTheme } = useThemeStore()
  const currentTheme = themes.find(t => t.value === theme) || themes[2]
  const Icon = currentTheme.icon

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          aria-label="Toggle theme"
        >
          <Icon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map(({ value, icon: ItemIcon, label }) => (
          <DropdownMenuItem
            key={value}
            onClick={() => setTheme(value)}
            className="flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2">
              <ItemIcon className="h-4 w-4" />
              <span>{label}</span>
            </div>
            {theme === value && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

### Language Toggle Component (Actual Implementation)

**Purpose**: Dropdown menu for language selection with flag emojis

```typescript
// components/ui/custom/language-toggle.tsx
/**
 * LanguageToggle - Dropdown menu for language selection with flag emojis
 *
 * Features:
 * - Displays current language flag (🇬🇧/🇸🇪/🇹🇷)
 * - Dropdown with English/Swedish/Turkish options
 * - Shows check mark on selected language
 * - Persists selection via Zustand store
 *
 * Props: None (uses language store)
 * State: Manages mounted state for hydration safety
 */
'use client'

import { Check } from 'lucide-react'
import { Button } from '@/components/ui'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui'
import { useLanguageStore, type SupportedLanguage } from '@/lib/stores'
import { useEffect, useState } from 'react'

interface LanguageOption {
  value: SupportedLanguage
  flag: string
  label: string
}

const languages: LanguageOption[] = [
  { value: 'en', flag: '🇬🇧', label: 'English' },
  { value: 'sv', flag: '🇸🇪', label: 'Svenska' },
  { value: 'tr', flag: '🇹🇷', label: 'Türkçe' },
]

export function LanguageToggle() {
  return (
    <LanguageToggleContainer>
      <LanguageToggleDropdown />
    </LanguageToggleContainer>
  )
}

function LanguageToggleContainer({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-9 w-9" />
  }

  return <>{children}</>
}

function LanguageToggleDropdown() {
  const { language, setLanguage } = useLanguageStore()
  const currentLanguage = languages.find(l => l.value === language) || languages[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-lg"
          aria-label="Select language"
        >
          {currentLanguage.flag}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map(({ value, flag, label }) => (
          <DropdownMenuItem
            key={value}
            onClick={() => setLanguage(value)}
            className="flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{flag}</span>
              <span>{label}</span>
            </div>
            {language === value && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

---

## Grid Components (Current Implementation)

### GridLayout Component

**Purpose**: Generic responsive grid layout wrapper

```typescript
// components/ui/custom/grid/GridLayout.tsx
/**
 * GridLayout Component - Generic responsive grid layout
 * SOLID Principles: Single Responsibility - Handles grid layout only
 * Design Patterns: Composition Pattern - Composes with any content
 * Dependencies: None
 */

interface GridLayoutProps {
  children: React.ReactNode
  className?: string | undefined
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  padding?: boolean
}

export function GridLayout({
  children,
  className,
  gap = 'md',
  maxWidth = 'full',
  padding = true,
}: GridLayoutProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full',
        maxWidthClasses[maxWidth],
        padding && 'px-4 sm:px-6 lg:px-8',
        className
      )}
    >
      <div
        className={cn(
          'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
          gapClasses[gap]
        )}
      >
        {children}
      </div>
    </div>
  )
}
```

### GridItem Component

**Purpose**: Individual grid item wrapper with consistent styling

```typescript
// components/ui/custom/grid/GridItem.tsx
/**
 * GridItem Component - Wrapper for grid items
 * SOLID Principles: Single Responsibility - Handles grid item styling
 * Design Patterns: Composition Pattern - Wraps any content
 * Dependencies: None
 */

interface GridItemProps {
  children: React.ReactNode
  className?: string
}

export function GridItem({ children, className }: GridItemProps) {
  return (
    <div
      className={cn(
        'rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-md',
        className
      )}
    >
      {children}
    </div>
  )
}
```

### GridErrorBoundary Component

**Purpose**: Error boundary for grid components with fallback UI

```typescript
// components/ui/custom/grid/GridErrorBoundary.tsx
/**
 * GridErrorBoundary - Error boundary for grid components
 * SOLID Principles: Single Responsibility - Error handling
 * Design Patterns: Error Boundary Pattern
 * Dependencies: React Error Boundary API
 */

interface GridErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class GridErrorBoundary extends React.Component<
  GridErrorBoundaryProps,
  GridErrorBoundaryState
> {
  constructor(props: GridErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): GridErrorBoundaryState {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <p className="text-lg font-semibold text-destructive">
            Something went wrong
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          {this.props.onReset && (
            <Button onClick={this.props.onReset} className="mt-4">
              Try Again
            </Button>
          )}
        </div>
      )
    }

    return this.props.children
  }
}
```

### GridSkeleton Component

**Purpose**: Loading skeleton for grid layouts

```typescript
// components/ui/custom/grid/GridSkeleton.tsx
/**
 * GridSkeleton - Loading skeleton for grid layouts
 * SOLID Principles: Single Responsibility - Loading state display
 * Design Patterns: Skeleton Screen Pattern
 * Dependencies: shadcn/ui skeleton component
 */

interface GridSkeletonProps {
  count?: number
  className?: string
}

export function GridSkeleton({ count = 6, className }: GridSkeletonProps) {
  return (
    <GridLayout className={className}>
      {Array.from({ length: count }).map((_, index) => (
        <GridItem key={index}>
          <div className="space-y-3">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </GridItem>
      ))}
    </GridLayout>
  )
}

```

---

## Implementation Status

### ✅ Implemented Components

#### Layout Components

- **Navbar**: Main navigation with Clerk authentication integration
- **Footer**: Simple footer with copyright and GTBS Coding branding
- **AppLayout**: Main layout wrapper with consistent spacing

#### UI Components

- **Theme Toggle**: Dropdown with light/dark/system options
- **Language Toggle**: Flag-based dropdown for English/Swedish/Turkish
- **Grid Components**: Layout, Item, ErrorBoundary, and Skeleton

#### Provider Components

- **I18nProvider**: Next.js App Router i18n integration
- **ClerkLocaleProvider**: Clerk authentication with locale support
- **ThemeInitializer**: Theme initialization with Zustand
- **I18nInitializer**: Language initialization with i18next

### 🏗️ Architecture Patterns Used

- **Component Decomposition**: All components follow single responsibility
- **Barrel Exports**: Consistent imports via index files
- **Co-located Tests**: Test files next to implementation
- **Type Safety**: Full TypeScript coverage
- **State Management**: Zustand for theme and language
- **Error Boundaries**: Graceful error handling
- **Loading States**: Skeleton screens for better UX

### 🎯 Current Focus Areas

#### Categories Implementation

- Server-side data fetching with Hasura GraphQL
- Grid layout for category display
- Error handling with error boundaries
- Loading states with skeletons

#### Products Implementation

- Product listing with pagination
- Product detail pages
- Search and filtering capabilities

### 📝 Component Guidelines Applied

- **SOLID Principles**: Every component has single responsibility
- **Testability**: 100% test coverage achieved
- **Accessibility**: ARIA labels and semantic HTML
- **Responsive Design**: Mobile-first with Tailwind CSS
- **Type Safety**: No `any` types, full TypeScript coverage
- **Performance**: Server Components for data, Client for interactivity

### 🔧 Technology Integration

- **Next.js 15.4.5**: App Router with Server Components
- **React 19.1.0**: Latest features and patterns
- **Clerk Authentication**: Modal-only authentication
- **Hasura GraphQL**: Backend API with admin secret
- **Zustand 5.0.7**: Global state management
- **i18next 25.3.2**: Internationalization
- **shadcn/ui**: Component library
- **Tailwind CSS 4.x**: Utility-first styling

---

## Barrel Export Implementation

### Component Export Structure

```typescript
// src/components/layout/index.ts
export { Navbar } from './Navbar'
export { Footer } from './Footer'
export { AppLayout } from './AppLayout'

// src/components/ui/custom/index.ts
export { ThemeToggle } from './ThemeToggle'
export { LanguageToggle } from './LanguageToggle'

// src/components/ui/schadcn/index.ts
export { Button } from './button'
export { Input } from './input'
export { Card, CardHeader, CardContent, CardFooter } from './card'
export * from './form'

// src/components/index.ts (root barrel)
export * from './layout'
export * from './ui/custom'
export * from './ui/schadcn'
```

### Usage Examples

```typescript
// Before (without barrel exports)
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/schadcn/button'

// After (with barrel exports)
import { Navbar, Footer } from '@/components/layout'
import { Button } from '@/components/ui/schadcn'

// Or from root barrel
import { Navbar, Footer, Button } from '@/components'
```

### Atomic Design with Barrel Exports

```typescript
// src/components/cart/atoms/index.ts
export { EmptyCartButton } from './EmptyCartButton'
export { CartEmptyState } from './CartEmptyState'
export type { EmptyCartButtonProps, CartEmptyStateProps } from './types'

// src/components/cart/molecules/index.ts
export { CartItemCard } from './CartItemCard'
export { CartSummaryCard } from './CartSummaryCard'

// src/components/cart/organisms/index.ts
export { CartItemsList } from './CartItemsList'

// src/components/cart/templates/index.ts
export { CustomerCartTemplate } from './CustomerCartTemplate'

// src/components/cart/index.ts (feature barrel)
export * from './atoms'
export * from './molecules'
export * from './organisms'
export * from './templates'
```

## Related Documentation

- [Atomic Design Guidelines](./atomic-design-guidelines.md)
- [Barrel Export Strategy](./barrel-export-strategy.md)
- [Design Patterns](./design-patterns.md)
- [Technology Stack](./technology-stack.md)
