/**
 * List Admin Users API Route - Fetches all admin users for superadmin management
 * SOLID Principles: SRP - Single responsibility for fetching admin users
 * Design Patterns: Facade Pattern over Clerk user management
 * Dependencies: Clerk auth, user management
 */

import { NextResponse } from 'next/server'
import { auth, currentUser, clerkClient } from '@clerk/nextjs/server'

export interface AdminUser {
  id: string
  email: string
  firstName: string | null
  lastName: string | null
  role: 'admin' | 'superadmin'
  createdAt: Date
  lastSignInAt: Date | null
}

export async function GET() {
  try {
    // Authenticate user
    const authData = await auth()
    const user = await currentUser()

    if (!authData.userId || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user is superadmin
    const userRole = user.publicMetadata?.['role'] as string

    if (userRole !== 'superadmin') {
      return NextResponse.json(
        { error: 'Access denied: Superadmin privileges required' },
        { status: 403 }
      )
    }

    // Get Clerk client
    const clerk = await clerkClient()

    // Fetch all users with admin or superadmin role
    // Note: Clerk doesn't support filtering by metadata directly,
    // so we need to fetch users and filter manually
    const users = await clerk.users.getUserList({
      limit: 100, // Adjust based on expected number of admins
    })

    // Filter for admin and superadmin users
    const adminUsers: AdminUser[] = users.data
      .filter(clerkUser => {
        const role = clerkUser.publicMetadata?.['role'] as string
        return role === 'admin' || role === 'superadmin'
      })
      .map(clerkUser => ({
        id: clerkUser.id,
        email: clerkUser.emailAddresses[0]?.emailAddress || '',
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        role: clerkUser.publicMetadata?.['role'] as 'admin' | 'superadmin',
        createdAt: new Date(clerkUser.createdAt),
        lastSignInAt: clerkUser.lastSignInAt
          ? new Date(clerkUser.lastSignInAt)
          : null,
      }))

    return NextResponse.json({ admins: adminUsers })
  } catch (error) {
    console.error('List admins error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch admin users' },
      { status: 500 }
    )
  }
}
