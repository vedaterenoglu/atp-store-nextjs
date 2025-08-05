/**
 * Protected Route Component - Client-side route protection wrapper
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for client-side route protection
 * - OCP: Open for extension with new protection strategies
 * - DIP: Depends on auth hook abstraction
 *
 * Design Patterns:
 * - Wrapper Pattern: Wraps content with protection logic
 * - Guard Pattern: Prevents unauthorized access
 * - Loading State Pattern: Shows spinner during auth check
 *
 * Dependencies: Role auth hook, Next.js router, i18n, toast notifications
 */

'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { useRoleAuth, type UserRole } from '@/lib/auth/role-auth'
import { toast } from '@/lib/utils/toast'
import { Skeleton } from '@/components/ui/schadcn'

export interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole: UserRole
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
  fallbackUrl = '/',
  showLoading = true,
  loadingComponent,
}: ProtectedRouteProps) {
  const { checkAuth, isLoaded } = useRoleAuth()
  const router = useRouter()
  const { t } = useTranslation('auth')

  useEffect(() => {
    if (!isLoaded) return

    const result = checkAuth(requiredRole)

    // Handle auth failure with appropriate messaging
    if (!result.success) {
      if (result.reason === 'not-signed-in') {
        // Show sign-in required message
        toast.error(t('requireSignIn'), {
          position: 'bottom-left',
          duration: 6000,
        })

        // Redirect to sign-in with return URL
        const currentPath = window.location.pathname
        router.push(`/sign-in?redirect_url=${encodeURIComponent(currentPath)}`)
      } else if (result.reason === 'wrong-role') {
        // Show insufficient permissions message
        toast.error(t('insufficientPermissions'), {
          position: 'bottom-left',
          duration: 6000,
        })

        // Redirect to fallback URL
        router.push(fallbackUrl)
      }
    }
  }, [isLoaded, checkAuth, requiredRole, router, fallbackUrl, t])

  // Show loading state while checking auth
  if (!isLoaded && showLoading) {
    return loadingComponent || <DefaultLoadingState />
  }

  // Check auth status
  const result = checkAuth(requiredRole)

  // Don't render content if auth check failed
  if (!result.success) {
    return null
  }

  // Auth passed - render protected content
  return <>{children}</>
}

/**
 * Default loading skeleton for protected routes
 */
function DefaultLoadingState() {
  return (
    <div className="flex flex-col gap-4 p-6">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-full max-w-2xl" />
      <Skeleton className="h-4 w-full max-w-xl" />
      <div className="grid gap-4 mt-6">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    </div>
  )
}
