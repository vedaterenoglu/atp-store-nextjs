/**
 * Admin Route Guard Component - Protects admin-only routes
 * SOLID Principles: SRP - Single responsibility for admin route protection
 * Design Patterns: Guard Pattern, HOC Pattern
 * Dependencies: React, useAuthGuard hook
 */

'use client'

import { useEffect, useState } from 'react'
import { useAuthGuard } from '@/hooks/use-auth-guard'

interface AdminRouteGuardProps {
  children: React.ReactNode
}

/**
 * Guards admin-only routes like /admin/dashboard
 * Only allows access to users with admin role
 */
export function AdminRouteGuard({ children }: AdminRouteGuardProps) {
  const { isLoading, canAccessAdminDashboard } = useAuthGuard()
  const [authError, setAuthError] = useState<string | null>(null)

  useEffect(() => {
    if (isLoading) return

    // Use centralized auth check for admin
    const result = canAccessAdminDashboard()

    if (!result.success) {
      setAuthError(result.message || 'Admin access required')
    } else {
      setAuthError(null)
    }
  }, [isLoading, canAccessAdminDashboard])

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Check admin access using centralized service
  const authResult = canAccessAdminDashboard()
  const hasAccess = authResult.success

  return hasAccess ? (
    children
  ) : (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Admin Access Required</h2>
        <p className="text-muted-foreground mb-6">
          {authError || 'This area is restricted to administrators only.'}
        </p>
      </div>
    </div>
  )
}
