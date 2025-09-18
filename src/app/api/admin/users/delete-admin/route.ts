/**
 * Delete Admin User API Route - Deletes admin user for superadmin management
 * SOLID Principles: SRP - Single responsibility for deleting admin users
 * Design Patterns: Facade Pattern over Clerk user management
 * Dependencies: Clerk auth, user management, Zod validation
 */

import { NextResponse } from 'next/server'
import { auth, currentUser, clerkClient } from '@clerk/nextjs/server'
import { z } from 'zod'

// Request body validation schema
const DeleteAdminSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
})

export async function DELETE(request: Request) {
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

    // Parse and validate request body
    const body = await request.json()
    const validatedData = DeleteAdminSchema.parse(body)

    // Prevent superadmin from deleting themselves
    if (validatedData.userId === authData.userId) {
      return NextResponse.json(
        { error: 'Cannot delete your own account' },
        { status: 400 }
      )
    }

    // Get Clerk client
    const clerk = await clerkClient()

    // Fetch the target user to verify they exist and are an admin/superadmin
    const targetUser = await clerk.users.getUser(validatedData.userId)
    const targetRole = targetUser.publicMetadata?.['role'] as string

    if (targetRole !== 'admin' && targetRole !== 'superadmin') {
      return NextResponse.json(
        { error: 'Target user is not an admin' },
        { status: 400 }
      )
    }

    // If deleting a superadmin, check if there are other superadmins
    if (targetRole === 'superadmin') {
      // Get all users and count superadmins
      const allUsers = await clerk.users.getUserList({ limit: 500 })
      const superadminCount = allUsers.data.filter(
        u => u.publicMetadata?.['role'] === 'superadmin'
      ).length

      // Prevent deletion if this is the last superadmin
      if (superadminCount <= 1) {
        return NextResponse.json(
          { error: 'Cannot delete the last superadmin account' },
          { status: 400 }
        )
      }
    }

    // Delete the user
    await clerk.users.deleteUser(validatedData.userId)

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Admin user deleted successfully',
      deletedUserId: validatedData.userId,
    })
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.flatten() },
        { status: 400 }
      )
    }

    // Handle Clerk API errors
    if (error instanceof Error && error.message.includes('not found')) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    console.error('Delete admin error:', error)
    return NextResponse.json(
      { error: 'Failed to delete admin user' },
      { status: 500 }
    )
  }
}
