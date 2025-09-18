/**
 * useCreateAdmin Hook - Handles creation of new admin users
 * SOLID Principles: SRP - Single responsibility for admin creation
 * Design Patterns: Custom Hook Pattern, Command Pattern
 * Dependencies: React hooks
 */

'use client'

import { useState, useCallback } from 'react'
import type {
  UseCreateAdminReturn,
  CreateAdminFormData,
  CreateAdminResponse,
} from '../types/admin.types'

export default function useCreateAdmin(): UseCreateAdminReturn {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const createAdmin = useCallback(
    async (data: CreateAdminFormData): Promise<void> => {
      setIsLoading(true)
      setError(null)
      setSuccess(false)

      try {
        const response = await fetch('/api/admin/users/create-admin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })

        const result: CreateAdminResponse = await response.json()

        if (!response.ok) {
          throw new Error(
            result.error || `Failed to create admin (${response.status})`
          )
        }

        if (result.success) {
          setSuccess(true)
          // Clear success after 5 seconds
          setTimeout(() => setSuccess(false), 5000)
        } else {
          throw new Error(result.error || 'Failed to create admin')
        }
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Unknown error occurred'
        setError(message)
        setSuccess(false)
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  const reset = useCallback(() => {
    setIsLoading(false)
    setError(null)
    setSuccess(false)
  }, [])

  return {
    isLoading,
    error,
    success,
    createAdmin,
    reset,
  }
}
