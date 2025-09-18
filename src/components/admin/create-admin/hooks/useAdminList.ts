/**
 * useAdminList Hook - Fetches and manages admin users list
 * SOLID Principles: SRP - Single responsibility for fetching admin list
 * Design Patterns: Custom Hook Pattern, Data Fetching Pattern
 * Dependencies: React hooks
 */

'use client'

import { useState, useCallback, useEffect } from 'react'
import type {
  UseAdminListReturn,
  AdminUser,
  AdminListResponse,
} from '../types/admin.types'

export default function useAdminList(): UseAdminListReturn {
  const [admins, setAdmins] = useState<AdminUser[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchAdmins = useCallback(async (): Promise<void> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/admin/users/list-admins', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

      const result: AdminListResponse = await response.json()

      if (!response.ok) {
        throw new Error(
          result.error || `Failed to fetch admins (${response.status})`
        )
      }

      if (result.admins) {
        setAdmins(result.admins)
      } else {
        // If no admins array, set empty array (don't throw error)
        setAdmins([])
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Unknown error occurred'
      setError(message)
      setAdmins([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Fetch admins on component mount
  useEffect(() => {
    fetchAdmins()
  }, [fetchAdmins])

  return {
    admins,
    isLoading,
    error,
    fetchAdmins,
  }
}
