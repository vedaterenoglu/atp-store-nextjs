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
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/schadcn'
import { ThemeToggle, LanguageToggle } from '@/components/ui/custom'
import { LayoutDashboard } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useRoleAuth } from '@/lib/auth/role-auth'
import { useTranslation } from 'react-i18next'

export function Navbar() {
  return (
    <TooltipProvider>
      <nav className="border-b -mx-4">
        <div className="px-6 sm:px-8 py-4">
          <div className="flex items-center justify-between">
            <NavbarBrand />
            <NavbarActions />
          </div>
        </div>
      </nav>
    </TooltipProvider>
  )
}

function NavbarBrand() {
  const { t } = useTranslation('common')

  return (
    <Tooltip>
      <TooltipTrigger asChild>
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
      </TooltipTrigger>
      <TooltipContent>
        <p>{t('tooltips.navbar.home')}</p>
      </TooltipContent>
    </Tooltip>
  )
}

function NavbarActions() {
  return (
    <div className="flex items-center gap-4">
      <CustomerDashboardButton />
      <LanguageToggleWithTooltip />
      <ThemeToggleWithTooltip />
      <NavbarAuth />
    </div>
  )
}

function ThemeToggleWithTooltip() {
  const { t } = useTranslation('common')

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div>
          <ThemeToggle />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{t('tooltips.navbar.theme')}</p>
      </TooltipContent>
    </Tooltip>
  )
}

function LanguageToggleWithTooltip() {
  const { t } = useTranslation('common')

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div>
          <LanguageToggle />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{t('tooltips.navbar.language')}</p>
      </TooltipContent>
    </Tooltip>
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
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 cursor-pointer"
          aria-label="Customer Dashboard"
          onClick={handleClick}
        >
          <LayoutDashboard className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{t('tooltips.navbar.dashboard')}</p>
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
  const { t } = useTranslation('common')

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <SignInButton mode="modal">
          <Button variant="default" size="sm">
            Sign In
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
  const { t } = useTranslation('common')
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
            <p>{t('tooltips.navbar.admin')}</p>
          </TooltipContent>
        </Tooltip>
      )}
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <UserButton afterSignOutUrl="/" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t('tooltips.navbar.userMenu')}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
