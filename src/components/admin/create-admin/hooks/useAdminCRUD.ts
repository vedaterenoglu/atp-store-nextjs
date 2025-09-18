/**
 * useAdminCRUD Hook - Handles admin CRUD operations (update, delete)
 * SOLID Principles: SRP - Single responsibility for admin CRUD operations
 * Design Patterns: Custom Hook Pattern, Repository Pattern
 * Dependencies: React hooks
 */

'use client'

import { useState, useCallback } from 'react'
import type {
  UseAdminCRUDReturn,
  EditAdminFormData,
  UpdateAdminResponse,
  DeleteAdminResponse,
} from '../types/admin.types'

export default function useAdminCRUD(): UseAdminCRUDReturn {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateAdmin = useCallback(
    async (id: string, data: EditAdminFormData): Promise<boolean> => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/admin/users/${id}/update`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })

        const result: UpdateAdminResponse = await response.json()

        if (!response.ok) {
          throw new Error(
            result.error || `Failed to update admin (${response.status})`
          )
        }

        return result.success
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Unknown error occurred'
        setError(message)
        return false
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  const deleteAdmin = useCallback(async (id: string): Promise<boolean> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/admin/users/${id}/delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })

      const result: DeleteAdminResponse = await response.json()

      if (!response.ok) {
        throw new Error(
          result.error || `Failed to delete admin (${response.status})`
        )
      }

      return result.success
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Unknown error occurred'
      setError(message)
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    updateAdmin,
    deleteAdmin,
    isLoading,
    error,
  }
}
