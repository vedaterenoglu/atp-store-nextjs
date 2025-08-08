/**
 * Navbar - Main navigation component with authentication and preferences
 *
 * Features:
 * - Brand logo and company name
 * - Theme and language toggles
 * - Clerk authentication (sign in/user button)
 * - Responsive layout with proper spacing
 * - Tooltips with i18n support
 *
 * Props: None
 * State: Auth state from Clerk hooks
 */
'use client'

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
import { LayoutDashboard, ShoppingCart } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useRoleAuth } from '@/lib/auth/role-auth'
import { useTranslation } from 'react-i18next'
import { useCartCount } from '@/lib/stores/cart.store'
import { CartBadge } from '@/components/cart/atoms/CartBadge'

export function Navbar() {
  return (
    <ControlledTooltipProvider>
      <nav className="border-b -mx-4">
        <div className="px-6 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <NavbarBrand />
            <NavbarActions />
          </div>
        </div>
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
    </ControlledTooltip>
  )
}

function NavbarActions() {
  return (
    <div className="flex items-center gap-4">
      <CartButton />
      <CustomerDashboardButton />
      <LanguageToggleWithTooltip />
      <ThemeToggleWithTooltip />
      <NavbarAuth />
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
        <Button variant="default" size="sm">
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
