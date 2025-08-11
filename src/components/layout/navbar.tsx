/**
 * Navbar - Main navigation component with authentication and preferences
 *
 * Features:
 * - Brand logo and company name (smaller on mobile)
 * - Hamburger menu for mobile navigation
 * - Cart icon always visible (outside hamburger)
 * - Theme and language toggles
 * - Clerk authentication (sign in/user button)
 * - Responsive layout with proper spacing
 * - Tooltips with i18n support
 *
 * Props: None
 * State: Auth state from Clerk hooks, mobile menu state
 */
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SignInButton, UserButton, useAuth, useUser } from '@clerk/nextjs'
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/schadcn'
import { ThemeToggle, LanguageToggle } from '@/components/ui/custom'
import { LayoutDashboard, ShoppingCart, Menu, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useRoleAuth } from '@/lib/auth/role-auth'
import { useSafeTranslation } from '@/hooks/use-safe-translation'
import { useCartCount } from '@/lib/stores/cart.store'
import { CartBadge } from '@/components/cart/atoms/CartBadge'
import { getLayoutClasses } from '@/lib/styles/utilities'
import { cn } from '@/lib/utils'
import { CustomerSwitcher } from '@/components/customer/organisms/CustomerSwitcher'
import { ImpersonationBanner } from '@/components/customer/molecules/ImpersonationBanner'

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Admin Impersonation Banner */}
      <ImpersonationBanner />
      
      <TooltipProvider>
        <nav
          className={getLayoutClasses({ component: 'navbar', part: 'container' })}
        >
          <div
            className={getLayoutClasses({ component: 'navbar', part: 'inner' })}
          >
            <div className="flex items-center justify-between">
              <NavbarBrand />
              <NavbarActions
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
              />
            </div>
          </div>
          {/* Mobile Menu Dropdown */}
          <MobileMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          />
        </nav>
      </TooltipProvider>
    </>
  )
}

function NavbarBrand() {
  const { t } = useSafeTranslation('common')

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href="/"
          className="flex items-center gap-2 sm:gap-3 text-foreground transition-colors hover:text-primary"
        >
          <Image
            src="/logo.png"
            alt="ATP Store Logo"
            width={40}
            height={40}
            className="h-8 w-8 sm:h-10 sm:w-10 object-contain"
            priority
          />
          <span className="text-lg sm:text-xl font-bold">ATP Store</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent>
        <p>{t('tooltips.navbar.home')}</p>
      </TooltipContent>
    </Tooltip>
  )
}

function NavbarActions({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: {
  isMobileMenuOpen: boolean
  setIsMobileMenuOpen: (open: boolean) => void
}) {
  return (
    <div className="flex items-center gap-2 sm:gap-4">
      {/* Cart Button - Always visible on all screens */}
      <CartButton />

      {/* Desktop Navigation Items */}
      <div className="hidden sm:flex items-center gap-4">
        <CustomerSwitcher />
        <CustomerDashboardButton />
        <LanguageToggleWithTooltip />
        <ThemeToggleWithTooltip />
        <NavbarAuth />
      </div>

      {/* Mobile: Auth always visible */}
      <div className="sm:hidden">
        <NavbarAuth />
      </div>

      {/* Mobile Hamburger Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 sm:hidden"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </Button>
    </div>
  )
}

function CartButton() {
  // Hooks must be in exact same order every render
  const { t } = useSafeTranslation('common')
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()
  const { isSignedIn } = useAuth()
  const { requireAuth, hasRole } = useRoleAuth()
  const cartCount = useCartCount()

  // Prevent hydration mismatch by only showing badge after mount
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Show cart badge only for authenticated users with items (only after hydration)
  const showBadge =
    isMounted && isSignedIn && hasRole('customer') && cartCount > 0

  const handleCartClick = () => {
    // Require authentication before navigating to cart
    if (!isSignedIn || !hasRole('customer')) {
      requireAuth(
        'customer',
        () => {
          router.push('/cart')
        },
        {
          showToast: true,
          redirectTo: '/cart',
        }
      )
    } else {
      // Authenticated customer - go directly to cart
      router.push('/cart')
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 relative"
          aria-label={t('navigation.cart')}
          onClick={handleCartClick}
        >
          <ShoppingCart className="h-4 w-4" />
          {showBadge && (
            <div className="absolute -top-1 -right-1">
              <CartBadge count={cartCount} variant="destructive" size="sm" />
            </div>
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{t('tooltips.navbar.cart')}</p>
      </TooltipContent>
    </Tooltip>
  )
}

function ThemeToggleWithTooltip() {
  // const { t } = useSafeTranslation('common')

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div>
          <ThemeToggle />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>Toggle theme</p>
      </TooltipContent>
    </Tooltip>
  )
}

function LanguageToggleWithTooltip() {
  // const { t } = useSafeTranslation('common')

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div>
          <LanguageToggle />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>Change language</p>
      </TooltipContent>
    </Tooltip>
  )
}

function CustomerDashboardButton() {
  const { isLoaded, hasRole, requireAuth } = useRoleAuth()
  const { user } = useUser()
  const router = useRouter()
  // const { t } = useSafeTranslation('common')

  // Only show for signed-in customers
  if (!isLoaded || !hasRole('customer')) {
    return null
  }

  const handleClick = () => {
    // Check for customerid in publicMetadata
    const customerid = user?.publicMetadata?.customerid as string | undefined
    
    if (!customerid) {
      // Show error toast if customerid is missing
      const { toast } = require('@/lib/utils/toast')
      toast.error('Customer ID not found in your account', {
        position: 'bottom-left',
      })
      // Still redirect to customer dashboard where guard will handle sign-in
      router.push('/customer/dashboard')
      return
    }

    // All checks passed - navigate to customer dashboard
    requireAuth(
      'customer',
      () => {
        router.push('/customer/dashboard')
      },
      {
        showToast: true,
        redirectTo: '/customer/dashboard',
      }
    )
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          aria-label="Customer Dashboard"
          onClick={handleClick}
        >
          <LayoutDashboard className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Customer Dashboard</p>
      </TooltipContent>
    </Tooltip>
  )
}

function NavbarAuth() {
  const { isLoaded, isSignedIn } = useAuth()
  const { user } = useUser()

  // Show loading state while Clerk initializes
  if (!isLoaded) {
    return <NavbarAuthSkeleton />
  }

  // Show sign-in button for unauthenticated users
  if (!isSignedIn) {
    return <NavbarSignIn />
  }

  // Show user button for authenticated users
  return <NavbarUserButton user={user} />
}

function NavbarAuthSkeleton() {
  return <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
}

function NavbarSignIn() {
  const { t } = useSafeTranslation('common')

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <SignInButton mode="modal">
          <Button
            variant="default"
            size="sm"
            className="h-8 px-3 text-xs sm:text-sm"
          >
            {t('actions.signIn')}
          </Button>
        </SignInButton>
      </TooltipTrigger>
      <TooltipContent>
        <p>{t('tooltips.navbar.signIn')}</p>
      </TooltipContent>
    </Tooltip>
  )
}

function NavbarUserButton({
  user,
}: {
  user: ReturnType<typeof useUser>['user']
}) {
  // const { t } = useSafeTranslation('common')
  const isAdmin = user?.publicMetadata?.['role'] === 'admin'

  return (
    <div className="flex items-center gap-2">
      {isAdmin && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/admin">
              <Button variant="ghost" size="sm">
                Admin
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Admin Panel</p>
          </TooltipContent>
        </Tooltip>
      )}
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <UserButton />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>User menu</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}

function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const { isLoaded, isSignedIn } = useAuth()
  const { user } = useUser()
  const { hasRole } = useRoleAuth()
  const router = useRouter()
  // const { t } = useSafeTranslation('common')

  if (!isOpen) return null

  const handleDashboardClick = () => {
    // Check for customerid in publicMetadata
    const customerid = user?.publicMetadata?.customerid as string | undefined
    
    if (!customerid) {
      // Show error toast if customerid is missing
      const { toast } = require('@/lib/utils/toast')
      toast.error('Customer ID not found in your account', {
        position: 'bottom-left',
      })
      // Still redirect to customer dashboard where guard will handle sign-in
      router.push('/customer/dashboard')
      onClose()
      return
    }

    // All checks passed - navigate to customer dashboard
    router.push('/customer/dashboard')
    onClose()
  }

  const isAdmin = user?.publicMetadata?.['role'] === 'admin'

  return (
    <div className={cn('sm:hidden border-t bg-background')}>
      <div className={cn('px-4 py-3 space-y-3')}>
        {/* Customer Switcher for mobile */}
        <div className="flex justify-center">
          <CustomerSwitcher />
        </div>
        
        {/* Icons row - Dashboard, Language, Theme */}
        <div className="flex items-center justify-center gap-4">
          {/* Customer Dashboard - Icon only */}
          {isLoaded && hasRole('customer') && (
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              onClick={handleDashboardClick}
              aria-label="Customer Dashboard"
            >
              <LayoutDashboard className="h-4 w-4" />
            </Button>
          )}

          {/* Language and Theme toggles - Icons only */}
          <LanguageToggle />
          <ThemeToggle />
        </div>

        {/* Admin Link - Only for admins */}
        {isSignedIn && isAdmin && (
          <div className="border-t pt-3">
            <Link href="/admin" onClick={onClose}>
              <Button variant="ghost" className="w-full justify-start">
                Admin Panel
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
