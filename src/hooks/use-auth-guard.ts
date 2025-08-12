/**
 * useAuthGuard Hook - Client-side authorization hook
 * SOLID Principles: SRP - Single responsibility for client auth checks
 * Design Patterns: Hook Pattern, Facade Pattern
 * Dependencies: Clerk hooks, Authorization service, Toast
 */

'use client'

import { useAuth, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { toast } from '@/lib/utils/toast'
import { 
  AuthorizationService, 
  type AuthContext, 
  type AuthCheckResult
} from '@/lib/auth/authorization.service'

interface UseAuthGuardReturn {
  // State
  isLoading: boolean
  authContext: AuthContext
  
  // Check methods
  canAccessCustomerFeatures: () => AuthCheckResult
  canAccessAdminDashboard: () => AuthCheckResult
  
  // Action methods
  requireCustomerAccess: (
    callback: () => void,
    options?: { showToast?: boolean; redirectOnFail?: boolean }
  ) => void
  requireAdminAccess: (
    callback: () => void,
    options?: { showToast?: boolean; redirectOnFail?: boolean }
  ) => void
}

/**
 * Hook for client-side authorization checks
 * Provides centralized auth validation and error handling
 */
export function useAuthGuard(): UseAuthGuardReturn {
  const { isLoaded, isSignedIn } = useAuth()
  const { user } = useUser()
  const router = useRouter()
  const [activeCustomerId, setActiveCustomerId] = useState<string | null>(null)
  const [isCheckingCustomer, setIsCheckingCustomer] = useState(true)

  // Check for active customer on mount and when auth changes
  useEffect(() => {
    if (!isLoaded || !isSignedIn) {
      setIsCheckingCustomer(false)
      return
    }

    // Fetch active customer from API
    fetch('/api/customer/active')
      .then(res => res.json())
      .then(data => {
        setActiveCustomerId(data.customerId || null)
        setIsCheckingCustomer(false)
      })
      .catch(() => {
        setActiveCustomerId(null)
        setIsCheckingCustomer(false)
      })
  }, [isLoaded, isSignedIn])

  // Build auth context
  const authContext: AuthContext = {
    isSignedIn: isSignedIn || false,
    role: AuthorizationService.extractRole(user as any),
    hasActiveCustomer: !!activeCustomerId,
    customerId: activeCustomerId || undefined
  }

  // Check if user can access customer features
  const canAccessCustomerFeatures = useCallback(() => {
    return AuthorizationService.canAccessCustomerFeatures(authContext)
  }, [authContext])

  // Check if user can access admin dashboard
  const canAccessAdminDashboard = useCallback(() => {
    return AuthorizationService.canAccessAdminDashboard(authContext)
  }, [authContext])

  // Require customer access with error handling
  const requireCustomerAccess = useCallback((
    callback: () => void,
    options: { showToast?: boolean; redirectOnFail?: boolean } = { showToast: true, redirectOnFail: false }
  ) => {
    const result = canAccessCustomerFeatures()
    
    if (result.success) {
      callback()
    } else {
      // Only show toast for non-sign-in errors
      if (options.showToast && result.message && result.error !== 'NOT_SIGNED_IN') {
        toast.error(result.message)
      }
      
      if (options.redirectOnFail && result.error) {
        const redirectUrl = AuthorizationService.getRedirectUrl(
          result.error,
          window.location.pathname
        )
        router.push(redirectUrl)
      }
    }
  }, [canAccessCustomerFeatures, router])

  // Require admin access with error handling
  const requireAdminAccess = useCallback((
    callback: () => void,
    options: { showToast?: boolean; redirectOnFail?: boolean } = { showToast: true, redirectOnFail: false }
  ) => {
    const result = canAccessAdminDashboard()
    
    if (result.success) {
      callback()
    } else {
      // Only show toast for non-sign-in errors
      if (options.showToast && result.message && result.error !== 'NOT_SIGNED_IN') {
        toast.error(result.message)
      }
      
      if (options.redirectOnFail && result.error) {
        const redirectUrl = AuthorizationService.getRedirectUrl(
          result.error,
          window.location.pathname
        )
        router.push(redirectUrl)
      }
    }
  }, [canAccessAdminDashboard, router])

  return {
    isLoading: !isLoaded || isCheckingCustomer,
    authContext,
    canAccessCustomerFeatures,
    canAccessAdminDashboard,
    requireCustomerAccess,
    requireAdminAccess
  }
}