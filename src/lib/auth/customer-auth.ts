/**
 * Customer Authentication Utilities
 *
 * SOLID Principles:
 * - SRP: Single responsibility for customer auth checks
 * - OCP: Open for extension with new auth requirements
 *
 * Design Patterns:
 * - Guard Pattern: Prevents unauthorized access
 * - Strategy Pattern: Different handling for auth scenarios
 *
 * Dependencies: Clerk auth, toast notifications, i18n
 */

'use client'

import { useAuth, useUser, useClerk } from '@clerk/nextjs'
import { toast } from '@/lib/utils/toast'
import { useTranslation } from 'react-i18next'

/**
 * Hook for customer-only action authentication
 * Shows appropriate messages and opens sign-in when needed
 */
export function useCustomerAuth() {
  const { isSignedIn } = useAuth()
  const { user } = useUser()
  const { openSignIn } = useClerk()
  const { t } = useTranslation('auth')

  /**
   * Checks if user is authenticated and has customer role
   * @param onSuccess - Callback to execute if auth check passes
   * @returns boolean indicating if action was allowed
   */
  const requireCustomerAuth = (onSuccess: () => void): boolean => {
    // Check if user is signed in
    if (!isSignedIn) {
      // Show toast from bottom-left
      toast.error(t('requireSignIn', 'To continue you must sign in'), {
        position: 'bottom-left',
      })

      // Open sign-in modal
      openSignIn()

      return false
    }

    // Check if user has customer role
    const userRole =
      (user?.publicMetadata as { role?: string })?.role ||
      (user?.unsafeMetadata as { role?: string })?.role

    if (userRole !== 'customer') {
      // Show insufficient permissions toast
      toast.error(
        t(
          'insufficientPermissions',
          'Insufficient permissions. Please contact support.'
        ),
        {
          position: 'bottom-left',
        }
      )

      return false
    }

    // Auth check passed, execute callback
    onSuccess()
    return true
  }

  return { requireCustomerAuth }
}
