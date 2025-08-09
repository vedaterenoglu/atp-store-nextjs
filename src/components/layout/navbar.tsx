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

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SignInButton, UserButton, useAuth, useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/schadcn'
import {
  ThemeToggle,
  LanguageToggle,
  ControlledTooltip,
  ControlledTooltipProvider,
} from '@/components/ui/custom'
import { LayoutDashboard, ShoppingCart, Menu, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useRoleAuth } from '@/lib/auth/role-auth'
import { useTranslation } from 'react-i18next'
import { useCartCount } from '@/lib/stores/cart.store'
import { CartBadge } from '@/components/cart/atoms/CartBadge'

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <ControlledTooltipProvider>
      <nav className="border-b -mx-4">
        <div className="px-4 sm:px-8 py-3 sm:py-4">
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
    </ControlledTooltipProvider>
  )
}

function NavbarBrand() {
  const { t } = useTranslation('common')

  return (
    <ControlledTooltip content={<p>{t('tooltips.navbar.home')}</p>}>
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
    </ControlledTooltip>
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
  const router = useRouter()
  const cartCount = useCartCount()
  const { t } = useTranslation('common')
  const { isSignedIn } = useAuth()
  const { hasRole } = useRoleAuth()

  // Only show cart for signed-in customers
  if (!isSignedIn || !hasRole('customer')) {
    return null
  }

  return (
    <ControlledTooltip content={<p>{t('tooltips.navbar.cart')}</p>}>
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 relative"
        aria-label="Shopping Cart"
        onClick={() => router.push('/cart')}
      >
        <ShoppingCart className="h-4 w-4" />
        {cartCount > 0 && (
          <div className="absolute -top-1 -right-1">
            <CartBadge count={cartCount} variant="destructive" size="sm" />
          </div>
        )}
      </Button>
    </ControlledTooltip>
  )
}

function ThemeToggleWithTooltip() {
  const { t } = useTranslation('common')

  return (
    <ControlledTooltip content={<p>{t('tooltips.navbar.theme')}</p>}>
      <div>
        <ThemeToggle />
      </div>
    </ControlledTooltip>
  )
}

function LanguageToggleWithTooltip() {
  const { t } = useTranslation('common')

  return (
    <ControlledTooltip content={<p>{t('tooltips.navbar.language')}</p>}>
      <div>
        <LanguageToggle />
      </div>
    </ControlledTooltip>
  )
}

function CustomerDashboardButton() {
  const { isLoaded, hasRole, requireAuth } = useRoleAuth()
  const router = useRouter()
  const { t } = useTranslation('common')

  // Only show for signed-in customers
  if (!isLoaded || !hasRole('customer')) {
    return null
  }

  const handleClick = () => {
    requireAuth(
      'customer',
      () => {
        router.push('/admin/dashboard')
      },
      {
        showToast: true,
        redirectTo: '/admin/dashboard',
      }
    )
  }

  return (
    <ControlledTooltip content={<p>{t('tooltips.navbar.dashboard')}</p>}>
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9"
        aria-label="Customer Dashboard"
        onClick={handleClick}
      >
        <LayoutDashboard className="h-4 w-4" />
      </Button>
    </ControlledTooltip>
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
  const { t } = useTranslation('common')

  return (
    <ControlledTooltip content={<p>{t('tooltips.navbar.signIn')}</p>}>
      <SignInButton mode="modal">
        <Button
          variant="default"
          size="sm"
          className="h-8 px-3 text-xs sm:text-sm"
        >
          Sign In
        </Button>
      </SignInButton>
    </ControlledTooltip>
  )
}

function NavbarUserButton({
  user,
}: {
  user: ReturnType<typeof useUser>['user']
}) {
  const { t } = useTranslation('common')
  const isAdmin = user?.publicMetadata?.['role'] === 'admin'

  return (
    <div className="flex items-center gap-2">
      {isAdmin && (
        <ControlledTooltip content={<p>{t('tooltips.navbar.admin')}</p>}>
          <Link href="/admin">
            <Button variant="ghost" size="sm">
              Admin
            </Button>
          </Link>
        </ControlledTooltip>
      )}
      <ControlledTooltip content={<p>{t('tooltips.navbar.userMenu')}</p>}>
        <div>
          <UserButton />
        </div>
      </ControlledTooltip>
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
  const { t } = useTranslation('common')

  if (!isOpen) return null

  const handleDashboardClick = () => {
    router.push('/admin/dashboard')
    onClose()
  }

  const isAdmin = user?.publicMetadata?.['role'] === 'admin'

  return (
    <div className="sm:hidden border-t bg-background">
      <div className="px-4 py-3 space-y-3">
        {/* Icons row - Dashboard, Language, Theme */}
        <div className="flex items-center justify-center gap-4">
          {/* Customer Dashboard - Icon only */}
          {isLoaded && hasRole('customer') && (
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              onClick={handleDashboardClick}
              aria-label={t('tooltips.navbar.dashboard')}
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
