/**
 * Admin Dashboard - Admin Management Page (Superadmin Only)
 * SOLID Principles: SRP - Single responsibility for authentication and delegation
 * Design Patterns: Delegation Pattern
 * Dependencies: CreateAdminContainer, Secure Auth Hook
 */

'use client'

import { useSecureAuth } from '@/hooks/use-secure-auth'
import CreateAdminContainer from '@/components/admin/create-admin/containers/CreateAdminContainer'

export default function CreateAdminPage() {
  const { auth } = useSecureAuth()

  // Check if user is superadmin
  const isSuperAdmin = auth.role === 'superadmin'

  // Delegate all admin management to the container
  return <CreateAdminContainer isSuperAdmin={isSuperAdmin} />
}
