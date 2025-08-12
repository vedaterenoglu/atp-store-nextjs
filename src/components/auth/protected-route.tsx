/**
 * Protected Route Component - Client-side route protection wrapper
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for client-side route protection
 * - OCP: Open for extension with new protection strategies
 * - DIP: Depends on auth service abstraction
 *
 * Design Patterns:
 * - Wrapper Pattern: Wraps content with protection logic
 * - Guard Pattern: Prevents unauthorized access
 * - Loading State Pattern: Shows spinner during auth check
 *
 * Dependencies: Auth service hook, Next.js router, toast notifications
 */

'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthService } from '@/lib/auth/use-auth-service'
import type { UserRole } from '@/lib/auth/auth-types'
import { toast } from '@/lib/utils/toast'
import { Skeleton } from '@/components/ui/schadcn'
import { getSpacingClasses } from '@/lib/styles/utilities'
import { cn } from '@/lib/utils'

export interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: UserRole
  requireCustomerId?: boolean
  fallbackUrl?: string
  showLoading?: boolean
  loadingComponent?: React.ReactNode
}

/**
 * Wraps content with client-side protection
 * Handles loading states and redirects gracefully
 */
export function ProtectedRoute({
  children,
  requiredRole,
  requireCustomerId = false,
  fallbackUrl = '/',
  showLoading = true,
  loadingComponent,
}: ProtectedRouteProps) {
  const { isLoaded, isSignedIn, user } = useAuthService()
  const router = useRouter()

  useEffect(() => {
    if (!isLoaded) return

    // Check authentication
    if (!isSignedIn) {
      toast.error('Please sign in to continue', {
        duration: 4000,
      })

      // Redirect to sign-in page with return URL
      const returnUrl = encodeURIComponent(window.location.pathname)
      router.push(`/sign-in?redirect_url=${returnUrl}`)
      return
    }

    // Check role requirement
    if (requiredRole && user?.role !== requiredRole) {
      toast.error('You do not have permission to access this page', {
        duration: 4000,
      })
      router.push(fallbackUrl)
      return
    }

    // Check customer ID requirement
    if (requireCustomerId && !user?.customerId) {
      toast.error('Please complete your profile to continue', {
        duration: 4000,
      })
      router.push('/profile/complete')
      return
    }
  }, [
    isLoaded,
    isSignedIn,
    user,
    requiredRole,
    requireCustomerId,
    router,
    fallbackUrl,
  ])

  // Show loading state while checking auth
  if (!isLoaded && showLoading) {
    return loadingComponent || <DefaultLoadingState />
  }

  // Don't render if not authenticated
  if (!isSignedIn) {
    return null
  }

  // Don't render if role requirement not met
  if (requiredRole && user?.role !== requiredRole) {
    return null
  }

  // Don't render if customer ID required but missing
  if (requireCustomerId && !user?.customerId) {
    return null
  }

  // All checks passed - render protected content
  return <>{children}</>
}

/**
 * Default loading skeleton for protected routes
 */
function DefaultLoadingState() {
  return (
    <div
      className={cn('flex flex-col gap-4', getSpacingClasses({ all: 'md' }))}
    >
      <Skeleton className={cn('h-8 w-48')} />
      <Skeleton className={cn('h-4 w-full max-w-2xl')} />
      <Skeleton className={cn('h-4 w-full max-w-xl')} />
      <div className={cn('grid gap-4 mt-6')}>
        <Skeleton className={cn('h-32 w-full')} />
        <Skeleton className={cn('h-32 w-full')} />
      </div>
    </div>
  )
}
