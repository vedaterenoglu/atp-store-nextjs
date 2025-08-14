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
import { LayoutDashboard, ShoppingCart, Menu, X, UserCog } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useSafeTranslation } from '@/hooks/use-safe-translation'
import { useCartCount } from '@/lib/stores/cart.store'
import { CartBadge } from '@/components/cart/atoms/CartBadge'
import { getLayoutClasses } from '@/lib/styles/utilities'
import { cn } from '@/lib/utils'
import { toast } from '@/lib/utils/toast'
import { CustomerSwitcher } from '@/components/customer/organisms/CustomerSwitcher'
import { ImpersonationBanner } from '@/components/customer/molecules/ImpersonationBanner'
import { useAuthGuard } from '@/hooks/use-auth-guard'

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Admin Impersonation Banner */}
      <ImpersonationBanner />

      <TooltipProvider>
        <nav
          className={getLayoutClasses({
            component: 'navbar',
            part: 'container',
          })}
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
      {/* Customer Switcher - Visible on desktop, moved to first position */}
      <div className="hidden sm:block">
        <CustomerSwitcher />
      </div>

      {/* Cart Button - Always visible on all screens */}
      <CartButton />

      {/* Desktop Navigation Items */}
      <div className="hidden sm:flex items-center gap-4">
        <AdminDashboardButton />
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
  const { t } = useSafeTranslation('common')
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()
  const cartCount = useCartCount()
  const { authContext } = useAuthGuard()

  // Prevent hydration mismatch by only showing badge after mount
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Determine if cart is accessible
  const isCartAccessible =
    authContext.isSignedIn &&
    authContext.role &&
    (authContext.role === 'customer' || authContext.role === 'admin') &&
    authContext.hasActiveCustomer

  // Show cart badge only when there are items and cart is accessible
  const showBadge = isMounted && cartCount > 0 && isCartAccessible

  const handleCartClick = () => {
    // Check auth conditions and show appropriate toast
    if (!authContext.isSignedIn) {
      toast.error(t('messages.auth.signInToAccessCart'))
      return
    }

    if (
      !authContext.role ||
      (authContext.role !== 'customer' && authContext.role !== 'admin')
    ) {
      toast.error(t('messages.auth.needCustomerAccount'))
      return
    }

    if (!authContext.hasActiveCustomer) {
      toast.error(t('messages.auth.selectCustomerFirst'))
      return
    }

    router.push('/cart')
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'h-9 w-9 relative',
            !isCartAccessible && 'opacity-50 hover:opacity-50'
          )}
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
        <p>
          {!isCartAccessible
            ? t('messages.auth.signInToAccessCart')
            : t('tooltips.navbar.cart')}
        </p>
      </TooltipContent>
    </Tooltip>
  )
}

function ThemeToggleWithTooltip() {
  const { t } = useSafeTranslation('common')

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div>
          <ThemeToggle />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{t('tooltips.navbar.toggleTheme')}</p>
      </TooltipContent>
    </Tooltip>
  )
}

function LanguageToggleWithTooltip() {
  const { t } = useSafeTranslation('common')

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div>
          <LanguageToggle />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{t('tooltips.navbar.changeLanguage')}</p>
      </TooltipContent>
    </Tooltip>
  )
}

function AdminDashboardButton() {
  const { t } = useSafeTranslation('common')
  const router = useRouter()
  const { user } = useUser()

  // Only show for admin users
  const isAdmin = user?.publicMetadata?.['role'] === 'admin'
  
  if (!isAdmin) {
    return null
  }

  const handleClick = () => {
    router.push('/admin/dashboard')
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={handleClick}
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          aria-label="Admin Dashboard"
        >
          <UserCog className="h-5 w-5" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{t('tooltips.navbar.adminDashboard')}</p>
      </TooltipContent>
    </Tooltip>
  )
}

function CustomerDashboardButton() {
  const { t } = useSafeTranslation('common')
  const router = useRouter()
  const { authContext } = useAuthGuard()

  // Determine if dashboard is accessible
  const isDashboardAccessible =
    authContext.isSignedIn &&
    authContext.role &&
    (authContext.role === 'customer' || authContext.role === 'admin') &&
    authContext.hasActiveCustomer

  const handleClick = () => {
    // Check auth conditions and show appropriate toast
    if (!authContext.isSignedIn) {
      toast.error(t('messages.auth.signInToAccessDashboard'))
      return
    }

    if (
      !authContext.role ||
      (authContext.role !== 'customer' && authContext.role !== 'admin')
    ) {
      toast.error(t('messages.auth.needCustomerAccount'))
      return
    }

    if (!authContext.hasActiveCustomer) {
      toast.error(t('messages.auth.selectCustomerFirst'))
      return
    }

    router.push('/customer/dashboard')
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'h-9 w-9',
            !isDashboardAccessible && 'opacity-50 hover:opacity-50'
          )}
          aria-label={t('navbar.customerDashboard')}
          onClick={handleClick}
        >
          <LayoutDashboard className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>
          {!isDashboardAccessible
            ? t('messages.auth.signInToAccessDashboard')
            : t('navbar.customerDashboard')}
        </p>
      </TooltipContent>
    </Tooltip>
  )
}

function NavbarAuth() {
  const { isLoaded, isSignedIn } = useAuth()

  // Show loading state while Clerk initializes
  if (!isLoaded) {
    return <NavbarAuthSkeleton />
  }

  // Show sign-in button for unauthenticated users
  if (!isSignedIn) {
    return <NavbarSignIn />
  }

  // Show user button for authenticated users
  return <NavbarUserButton />
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

function NavbarUserButton() {
  const { t } = useSafeTranslation('common')

  return (
    <div className="flex items-center gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <UserButton />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t('navbar.userMenu')}</p>
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
  const { t } = useSafeTranslation('common')
  const { user } = useUser()
  const router = useRouter()
  const { authContext } = useAuthGuard()

  if (!isOpen) return null

  const handleDashboardClick = () => {
    router.push('/customer/dashboard')
    onClose()
  }

  const handleAdminDashboardClick = () => {
    router.push('/admin/dashboard')
    onClose()
  }

  const isAdmin = user?.publicMetadata?.['role'] === 'admin'

  return (
    <div className={cn('sm:hidden border-t bg-background')}>
      <div className={cn('px-4 py-3 space-y-3')}>
        {/* Customer Switcher for mobile - Placed first for consistency */}
        <div className="flex justify-center">
          <CustomerSwitcher />
        </div>

        {/* Icons row - Admin Dashboard (if admin), Customer Dashboard, Language, Theme */}
        <div className="flex items-center justify-center gap-4">
          {/* Admin Dashboard - Icon only (for admins) */}
          {isAdmin && (
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              onClick={handleAdminDashboardClick}
              aria-label={t('navbar.adminDashboard')}
            >
              <UserCog className="h-4 w-4" />
            </Button>
          )}

          {/* Customer Dashboard - Icon only (for customers and admins) */}
          {authContext.isSignedIn &&
            (authContext.role === 'customer' || authContext.role === 'admin') &&
            authContext.hasActiveCustomer && (
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                onClick={handleDashboardClick}
                aria-label={t('navbar.customerDashboard')}
              >
                <LayoutDashboard className="h-4 w-4" />
              </Button>
            )}

          {/* Language and Theme toggles - Icons only */}
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}
