/**
 * Customer route guard component
 * SOLID Principles: SRP - Single responsibility for customer authentication guard
 * Design Patterns: Guard Pattern, HOC Pattern
 * Dependencies: React, Clerk, useAuthGuard hook
 */

'use client'

import { SignIn } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/schadcn/dialog'
import { useAuthGuard } from '@/hooks/use-auth-guard'

interface CustomerRouteGuardProps {
  children: React.ReactNode
  requireActiveCustomer?: boolean
}

export function CustomerRouteGuard({ children }: CustomerRouteGuardProps) {
  const { isLoading, canAccessCustomerFeatures } = useAuthGuard()
  const [showSignInModal, setShowSignInModal] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)

  useEffect(() => {
    if (isLoading) return

    // Use centralized auth check
    const result = canAccessCustomerFeatures()

    if (!result.success) {
      setAuthError(result.message || 'Access denied')

      // Show sign-in modal for NOT_SIGNED_IN or INVALID_ROLE
      if (result.error === 'NOT_SIGNED_IN' || result.error === 'INVALID_ROLE') {
        setShowSignInModal(true)
      } else {
        setShowSignInModal(false)
      }
    } else {
      setAuthError(null)
      setShowSignInModal(false)
    }
  }, [isLoading, canAccessCustomerFeatures])

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Check authentication and authorization using centralized service
  const authResult = canAccessCustomerFeatures()
  const hasAccess = authResult.success

  return (
    <>
      {hasAccess ? (
        children
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Access Required</h2>
            <p className="text-muted-foreground mb-6">
              {authError || 'Please sign in to access this area.'}
            </p>
          </div>
        </div>
      )}

      {/* Sign In Modal */}
      <Dialog open={showSignInModal} onOpenChange={setShowSignInModal}>
        <DialogContent className="sm:max-w-md">
          <SignIn
            appearance={{
              elements: {
                rootBox: 'w-full',
                card: 'shadow-none p-0',
              },
            }}
            redirectUrl="/customer/dashboard"
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
