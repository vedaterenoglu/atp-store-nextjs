# Component Examples and Implementation Patterns

## Layout Components

### App Navbar Component

**Purpose**: Navigation header with theme toggle and responsive design

```typescript
// components/layout/app-navbar.tsx
/**
 * App Navigation Header Component
 * SOLID Principles: Single Responsibility (navigation and theme toggle)
 * Design Patterns: Compound Component, responsive design patterns
 * Dependencies: Zustand theme store, i18next, shadcn/ui components
 */
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { Menu, Calendar } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { LanguageToggle } from '@/components/ui/language-toggle'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

interface NavItem {
  title: string
  href: string
  description?: string
  badge?: string
}

export function AppNavbar() {
  const { t } = useTranslation('common')

  const navigationItems: NavItem[] = [
    {
      title: t('navigation.events'),
      href: '/events',
      description: t('events.discover'),
    },
    {
      title: t('navigation.cities'),
      href: '/cities',
      description: t('cities.explore'),
    },
    {
      title: t('navigation.dashboard'),
      href: '/dashboard',
      description: t('dashboard.manage'),
      badge: 'Auth Required',
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center">
        <AppNavbarBrand />
        <AppNavbarDesktopMenu items={navigationItems} />
        <div className="flex flex-1 items-center justify-end space-x-2">
          <LanguageToggle />
          <ThemeToggle />
          <AppNavbarMobileMenu items={navigationItems} />
          <AppNavbarAuth />
        </div>
      </div>
    </header>
  )
}

function AppNavbarBrand() {
  const { t } = useTranslation('common')

  return (
    <div className="mr-6 flex items-center space-x-2">
      <Link href="/" className="flex items-center space-x-2">
        <Calendar className="h-6 w-6" />
        <span className="font-bold text-xl">{t('app.name')}</span>
      </Link>
    </div>
  )
}

function AppNavbarDesktopMenu({ items }: { items: NavItem[] }) {
  const pathname = usePathname()

  return (
    <nav className="hidden md:flex items-center space-x-6">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === item.href
              ? "text-foreground"
              : "text-foreground/60"
          )}
        >
          {item.title}
          {item.badge && (
            <Badge variant="secondary" className="ml-2 text-xs">
              {item.badge}
            </Badge>
          )}
        </Link>
      ))}
    </nav>
  )
}

function AppNavbarMobileMenu({ items }: { items: NavItem[] }) {
  const pathname = usePathname()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav className="flex flex-col space-y-4">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-2 text-sm font-medium",
                pathname === item.href
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
            >
              <span>{item.title}</span>
              {item.badge && (
                <Badge variant="secondary" className="text-xs">
                  {item.badge}
                </Badge>
              )}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

function AppNavbarAuth() {
  const { t } = useTranslation('auth')

  // This would integrate with Clerk in the future
  return (
    <Button variant="default" size="sm">
      {t('signIn')}
    </Button>
  )
}
```

### App Footer Component

**Purpose**: Consistent footer with copyright and branding

```typescript
// components/layout/app-footer.tsx
/**
 * App Footer Component
 * SOLID Principles: Single Responsibility (footer display and branding)
 * Design Patterns: Component composition with shadcn/ui
 * Dependencies: i18next for internationalization
 */

import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { Calendar } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function AppFooter() {
  const { t } = useTranslation('common')
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    { title: t('footer.privacyPolicy'), href: '/privacy' },
    { title: t('footer.termsOfService'), href: '/terms' },
    { title: t('footer.contact'), href: '/contact' },
    { title: t('footer.about'), href: '/about' },
  ]

  return (
    <footer className="border-t bg-background">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <AppFooterBrand />
          <AppFooterLinks />
          <AppFooterSocial />
          <AppFooterNewsletter />
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
          <div className="text-sm text-muted-foreground">
            {t('footer.copyright', { year: currentYear })}
          </div>

          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            {footerLinks.map((link, index) => (
              <span key={link.href} className="flex items-center">
                <Link
                  href={link.href}
                  className="hover:text-foreground transition-colors"
                >
                  {link.title}
                </Link>
                {index < footerLinks.length - 1 && (
                  <span className="ml-4">•</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

function AppFooterBrand() {
  const { t } = useTranslation('common')

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Calendar className="h-6 w-6" />
        <span className="font-bold text-lg">{t('app.name')}</span>
      </div>
      <p className="text-sm text-muted-foreground max-w-xs">
        {t('app.description')}
      </p>
    </div>
  )
}

function AppFooterLinks() {
  const { t } = useTranslation('common')

  const quickLinks = [
    { title: t('navigation.events'), href: '/events' },
    { title: t('navigation.cities'), href: '/cities' },
    { title: 'Create Event', href: '/events/create' },
    { title: t('navigation.dashboard'), href: '/dashboard' },
  ]

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Quick Links</h3>
      <ul className="space-y-2 text-sm">
        {quickLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function AppFooterSocial() {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Connect</h3>
      <div className="text-sm text-muted-foreground space-y-2">
        <p>Follow us for updates and event announcements.</p>
        <div className="flex space-x-4">
          <Link href="#" className="hover:text-foreground transition-colors">
            Twitter
          </Link>
          <Link href="#" className="hover:text-foreground transition-colors">
            LinkedIn
          </Link>
          <Link href="#" className="hover:text-foreground transition-colors">
            GitHub
          </Link>
        </div>
      </div>
    </div>
  )
}

function AppFooterNewsletter() {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Stay Updated</h3>
      <p className="text-sm text-muted-foreground">
        Get notified about new events and features.
      </p>
      <div className="text-sm text-muted-foreground">
        <Link href="/newsletter" className="hover:text-foreground transition-colors">
          Subscribe to Newsletter →
        </Link>
      </div>
    </div>
  )
}
```

---

## UI Components

### Theme Toggle Component

**Purpose**: Enhanced theme selection with dropdown and system support

```typescript
// components/ui/theme-toggle.tsx
/**
 * Theme Toggle Dropdown Component
 * SOLID Principles: Single Responsibility (theme selection UI)
 * Design Patterns: Command Pattern (theme actions), Facade Pattern (theme store)
 * Dependencies: Zustand theme store, shadcn/ui components, Lucide icons
 */
'use client'

import { Monitor, Moon, Sun, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useThemeStore } from '@/lib/stores/theme-store'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

interface ThemeOption {
  value: 'light' | 'dark' | 'system'
  label: string
  icon: React.ComponentType<{ className?: string }>
  description: string
}

export function ThemeToggle() {
  const { theme, setTheme, initializeTheme } = useThemeStore()
  const { t } = useTranslation('common')

  const themeOptions: ThemeOption[] = [
    {
      value: 'light',
      label: t('theme.light'),
      icon: Sun,
      description: t('theme.lightMode'),
    },
    {
      value: 'dark',
      label: t('theme.dark'),
      icon: Moon,
      description: t('theme.darkMode'),
    },
    {
      value: 'system',
      label: t('theme.system'),
      icon: Monitor,
      description: t('theme.systemSetting'),
    },
  ]

  useEffect(() => {
    const cleanup = initializeTheme()
    return cleanup
  }, [initializeTheme])

  const currentThemeOption = themeOptions.find(option => option.value === theme)
  const CurrentIcon = currentThemeOption?.icon || Monitor

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-9 w-9 px-0"
          aria-label={t('theme.toggleTheme')}
        >
          <CurrentIcon className="h-4 w-4" />
          <span className="sr-only">{t('theme.toggleTheme')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {themeOptions.map((option) => {
          const Icon = option.icon
          const isSelected = theme === option.value

          return (
            <DropdownMenuItem
              key={option.value}
              onClick={() => setTheme(option.value)}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center space-x-2">
                <Icon className="h-4 w-4" />
                <div className="flex flex-col">
                  <span>{option.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {option.description}
                  </span>
                </div>
              </div>
              {isSelected && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

### Language Toggle Component

**Purpose**: Language selection dropdown with proper i18n integration

```typescript
// components/ui/language-toggle.tsx
/**
 * Language Toggle Dropdown Component
 * SOLID Principles: Single Responsibility (language selection UI)
 * Design Patterns: Command Pattern (language actions), Integration with i18next
 * Dependencies: i18next, Zustand language store, shadcn/ui components
 */
'use client'

import { Languages, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useLanguageStore, type SupportedLanguage } from '@/lib/stores/language-store'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

interface LanguageOption {
  value: SupportedLanguage
  label: string
  nativeLabel: string
  flag: string
}

const languageOptions: LanguageOption[] = [
  {
    value: 'en',
    label: 'English',
    nativeLabel: 'English',
    flag: '🇺🇸',
  },
  {
    value: 'sv',
    label: 'Swedish',
    nativeLabel: 'Svenska',
    flag: '🇸🇪',
  },
  {
    value: 'tr',
    label: 'Turkish',
    nativeLabel: 'Türkçe',
    flag: '🇹🇷',
  },
]

export function LanguageToggle() {
  const { language, setLanguage, initializeLanguage } = useLanguageStore()
  const { t } = useTranslation('common')

  useEffect(() => {
    initializeLanguage()
  }, [initializeLanguage])

  const currentLanguageOption = languageOptions.find(option => option.value === language)

  const handleLanguageChange = async (newLanguage: SupportedLanguage) => {
    await setLanguage(newLanguage)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-9 w-9 px-0"
          aria-label={t('language.changeLanguage')}
        >
          <Languages className="h-4 w-4" />
          <span className="sr-only">{t('language.changeLanguage')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {languageOptions.map((option) => {
          const isSelected = language === option.value

          return (
            <DropdownMenuItem
              key={option.value}
              onClick={() => handleLanguageChange(option.value)}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg">{option.flag}</span>
                <div className="flex flex-col">
                  <span>{option.nativeLabel}</span>
                  <span className="text-xs text-muted-foreground">
                    {option.label}
                  </span>
                </div>
              </div>
              {isSelected && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

---

## Component Decomposition Examples

### Admin City Route Decomposition Strategy

**Target**: Break down admin/city route component into reusable sub-components

**DECOMPOSITION PROCESS:**

**Component Analysis:**

1. Identify current monolithic structures in admin/city route
2. Map functional responsibilities within existing components
3. Determine reusable patterns and shared logic
4. Plan component hierarchy and data flow

**Sub-Component Creation Strategy:**

- Extract UI elements into atomic components (CityCard, SearchBox, FilterPanel)
- Separate business logic from presentation (CityListContainer vs CityListPresentation)
- Create container/presenter component pairs
- Implement props interface for each component
- Ensure testability through dependency injection

**Example Decomposition:**

```typescript
// Before: Monolithic CityPage component
function CityPage() {
  // 200+ lines of mixed logic
}

// After: Decomposed components
function CityPage() {
  return (
    <CityPageLayout>
      <CityPageHeader />
      <CityPageFilters />
      <CityPageContent />
    </CityPageLayout>
  )
}

function CityPageContent() {
  return (
    <CityListContainer>
      <CityListGrid>
        {cities.map(city => (
          <CityCard key={city.id} city={city} />
        ))}
      </CityListGrid>
    </CityListContainer>
  )
}

// Each component has single responsibility
function CityCard({ city }: { city: CityType }) {
  return (
    <Card>
      <CityCardHeader city={city} />
      <CityCardContent city={city} />
      <CityCardActions city={city} />
    </Card>
  )
}
```

**Quality Standards:**

- Each component must have single responsibility
- All components must be independently testable
- Use TypeScript interfaces for all props
- Follow shadcn/ui + Tailwind CSS patterns
- Add header comments specifying SOLID principles applied

---

## Implementation Status

### ✅ Implemented Components

- **Theme Toggle**: Full dropdown with system theme support
- **Language Toggle**: Multi-language support with persistence
- **Layout Components**: Navbar and Footer with responsive design
- **i18n Integration**: Complete internationalization support

### 🎯 Component Decomposition Targets

- **City Components**: CityCard, CityList, CityFilters, CitySearch
- **Event Components**: EventCard, EventList, EventFilters, EventDetails
- **Form Components**: React Hook Form + Zod integration with shadcn/ui
- **Data Display**: Server Component + Client Component patterns
- **Navigation**: Breadcrumbs, Pagination, Search components

### 📝 Component Guidelines for Portfolio Project

- All components follow SOLID principles with clear single responsibility
- Complete component decomposition (no monolithic components)
- Proper TypeScript typing throughout all components
- Responsive design using Tailwind CSS and shadcn/ui
- Accessibility considerations with proper ARIA labels
- Server Components for data fetching, Client Components for interactivity
- Mock data integration using `src/mock/event.ts` for testing
