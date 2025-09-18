/**
 * Admin Layout - Server-side auth check for admin dashboard
 *
 * Features:
 * - Protected route (requires admin or superadmin role)
 * - Server-side authentication check with proper error handling
 * - Delegates UI to client wrapper
 * - Enhanced security with multiple role check methods
 *
 * SOLID Principles:
 * - SRP: Single responsibility for server-side auth validation
 * - OCP: Open for extension with additional role types
 *
 * Dependencies: Clerk server auth, Next.js navigation, AdminLayoutWrapper
 */
import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { AdminLayoutWrapper } from '@/components/admin'

// Define allowed roles for admin access
const ADMIN_ALLOWED_ROLES = ['admin', 'superadmin'] as const
type AdminRole = (typeof ADMIN_ALLOWED_ROLES)[number]

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Get auth state from Clerk
  const { userId, sessionClaims } = await auth()

  // Not authenticated - redirect to sign-in with return URL
  if (!userId) {
    redirect('/sign-in?redirect_url=/admin/dashboard')
  }

  // Get user data for additional checks
  const user = await currentUser()

  // Extract role from multiple sources (sessionClaims is most secure)
  const metadata = sessionClaims?.['metadata'] as { role?: string } | undefined
  const sessionRole = metadata?.['role']
  const publicRole = user?.publicMetadata?.['role'] as string | undefined
  const unsafeRole = user?.unsafeMetadata?.['role'] as string | undefined

  // Use session role first, then fallback to other sources
  const userRole = sessionRole || publicRole || unsafeRole

  // Check if user has required role
  if (!userRole || !ADMIN_ALLOWED_ROLES.includes(userRole as AdminRole)) {
    // Log unauthorized access attempt for security monitoring
    console.warn(
      `Unauthorized admin access attempt: userId=${userId}, role=${userRole}`
    )

    // Redirect to home with error parameter
    redirect('/?error=unauthorized&message=insufficient_permissions')
  }

  // All checks passed - render admin layout
  return <AdminLayoutWrapper>{children}</AdminLayoutWrapper>
}
