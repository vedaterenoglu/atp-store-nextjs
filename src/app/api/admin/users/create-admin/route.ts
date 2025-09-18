/**
 * API Route - Create Admin Account (Superadmin Only)
 * SOLID Principles: SRP - Single responsibility for admin creation
 * Design Patterns: API Route Pattern with validation
 * Dependencies: Clerk SDK, Zod validation
 * Access Control: Only superadmin users can create admin accounts
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { z } from 'zod'

// Request validation schema
const createAdminSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

// Response types
type SuccessResponse = {
  success: true
  userId: string
  email: string
  message: string
}

type ErrorResponse = {
  success: false
  error: string
}

export async function POST(
  req: NextRequest
): Promise<NextResponse<SuccessResponse | ErrorResponse>> {
  try {
    // Check admin authentication
    const { userId, sessionClaims } = await auth()

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - Not authenticated' },
        { status: 401 }
      )
    }

    // Check superadmin role - only superadmin can create admin accounts
    const metadata = sessionClaims?.['metadata'] as
      | { role?: string }
      | undefined
    const userRole = metadata?.role

    if (userRole !== 'superadmin') {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Superadmin access required' },
        { status: 403 }
      )
    }

    // Parse and validate request body
    const body = await req.json()

    const validationResult = createAdminSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error:
            validationResult.error.issues[0]?.message || 'Invalid request data',
        },
        { status: 400 }
      )
    }

    const { email, password } = validationResult.data

    // Get Clerk client
    const clerk = await clerkClient()

    // Check if user already exists
    try {
      const existingUsers = await clerk.users.getUserList({
        emailAddress: [email],
      })

      if (existingUsers.totalCount > 0) {
        return NextResponse.json(
          { success: false, error: 'User with this email already exists' },
          { status: 409 }
        )
      }
    } catch {
      // Continue with creation if check fails
    }

    // Create user in Clerk with admin role
    const newUser = await clerk.users.createUser({
      emailAddress: [email],
      password,
      publicMetadata: {
        role: 'admin',
        customerids: [], // Admins can also have customer access if needed
      },
    })

    // Return success response
    return NextResponse.json(
      {
        success: true,
        userId: newUser.id,
        email: newUser.emailAddresses[0]?.emailAddress || email,
        message: 'Admin account created successfully',
      },
      { status: 201 }
    )
  } catch (error) {
    // Handle Clerk-specific errors
    if (error && typeof error === 'object' && 'errors' in error) {
      const clerkError = error as { errors: Array<{ message: string }> }
      const errorMessage =
        clerkError.errors[0]?.message || 'Failed to create account'

      return NextResponse.json(
        { success: false, error: errorMessage },
        { status: 400 }
      )
    }

    // Generic error response
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
