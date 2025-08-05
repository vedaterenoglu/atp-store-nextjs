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
import { LayoutDashboard } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useRoleAuth } from '@/lib/auth/role-auth'

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
}

function NavbarActions() {
  return (
    <div className="flex items-center gap-4">
      <CustomerDashboardButton />
      <LanguageToggle />
      <ThemeToggle />
      <NavbarAuth />
    </div>
  )
}

function CustomerDashboardButton() {
  const { isLoaded, hasRole, requireAuth } = useRoleAuth()
  const router = useRouter()

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
    <Button
      variant="ghost"
      size="icon"
      className="h-9 w-9"
      aria-label="Customer Dashboard"
      onClick={handleClick}
    >
      <LayoutDashboard className="h-4 w-4" />
    </Button>
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
  return (
    <SignInButton mode="modal">
      <Button variant="default" size="sm">
        Sign In
      </Button>
    </SignInButton>
  )
}

function NavbarUserButton({
  user,
}: {
  user: ReturnType<typeof useUser>['user']
}) {
  const isAdmin = user?.publicMetadata?.['role'] === 'admin'

  return (
    <div className="flex items-center gap-2">
      {isAdmin && (
        <Link href="/admin">
          <Button variant="ghost" size="sm">
            Admin
          </Button>
        </Link>
      )}
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}
