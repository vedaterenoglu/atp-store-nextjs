/**
 * Update Admin User API Route - Updates admin user details for superadmin management
 * SOLID Principles: SRP - Single responsibility for updating admin users
 * Design Patterns: Facade Pattern over Clerk user management
 * Dependencies: Clerk auth, user management, Zod validation
 */

import { NextResponse } from 'next/server'
import { auth, currentUser, clerkClient } from '@clerk/nextjs/server'
import { z } from 'zod'

// Request body validation schema
const UpdateAdminSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  email: z.string().email('Invalid email address').optional(),
  firstName: z.string().nullable().optional(),
  lastName: z.string().nullable().optional(),
  role: z.enum(['admin', 'superadmin']).optional(),
})

export async function PUT(request: Request) {
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
    const validatedData = UpdateAdminSchema.parse(body)

    // Prevent superadmin from demoting themselves
    if (
      validatedData.userId === authData.userId &&
      validatedData.role === 'admin'
    ) {
      return NextResponse.json(
        { error: 'Cannot demote your own superadmin account' },
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

    // Prepare update data
    const updateData: Parameters<typeof clerk.users.updateUser>[1] = {}

    // Update basic info if provided
    if (validatedData.firstName !== undefined) {
      updateData.firstName = validatedData.firstName || ''
    }
    if (validatedData.lastName !== undefined) {
      updateData.lastName = validatedData.lastName || ''
    }

    // Update email if provided
    if (
      validatedData.email &&
      validatedData.email !== targetUser.emailAddresses[0]?.emailAddress
    ) {
      // Note: Updating email in Clerk is complex as it requires verification
      // For now, we'll skip email updates and return a message
      return NextResponse.json(
        {
          error:
            'Email updates are not supported through this interface. Please use Clerk dashboard or have the user update their email directly.',
        },
        { status: 400 }
      )
    }

    // Update role if provided
    if (validatedData.role && validatedData.role !== targetRole) {
      updateData.publicMetadata = {
        ...targetUser.publicMetadata,
        role: validatedData.role,
      }
    }

    // Perform the update
    const updatedUser = await clerk.users.updateUser(
      validatedData.userId,
      updateData
    )

    // Return success response
    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser.id,
        email: updatedUser.emailAddresses[0]?.emailAddress || '',
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        role: updatedUser.publicMetadata?.['role'] as 'admin' | 'superadmin',
      },
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

    console.error('Update admin error:', error)
    return NextResponse.json(
      { error: 'Failed to update admin user' },
      { status: 500 }
    )
  }
}
