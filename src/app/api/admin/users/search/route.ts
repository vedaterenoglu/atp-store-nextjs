/**
 * API Route - Search Users
 * SOLID Principles: SRP - Single responsibility for user search
 * Design Patterns: API Route Pattern with validation
 * Dependencies: Clerk SDK, Zod validation
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { z } from 'zod'

// Request validation schema
const searchUsersSchema = z.object({
  email: z.string().email('Invalid email address'),
})

// User metadata schema
const userMetadataSchema = z.object({
  role: z.enum(['admin', 'customer']).optional(),
  customerids: z.array(z.string()).optional().default([]),
})

// Response types
type UserResponse = {
  id: string
  email: string
  firstName: string | null
  lastName: string | null
  role: 'admin' | 'customer' | null
  customerIds: string[]
  createdAt: string
}

type SuccessResponse = {
  success: true
  user: UserResponse | null
  message: string
}

type ErrorResponse = {
  success: false
  error: string
}

export async function GET(
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

    // Check admin role
    const metadata = sessionClaims?.['metadata'] as
      | { role?: string }
      | undefined
    const userRole = metadata?.role

    if (userRole !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Admin access required' },
        { status: 403 }
      )
    }

    // Get search parameters
    const searchParams = req.nextUrl.searchParams
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email parameter is required' },
        { status: 400 }
      )
    }

    // Validate email
    const validationResult = searchUsersSchema.safeParse({ email })
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: validationResult.error.issues[0]?.message || 'Invalid email',
        },
        { status: 400 }
      )
    }

    // Get Clerk client
    const clerk = await clerkClient()

    // Search for user by email
    const users = await clerk.users.getUserList({
      emailAddress: [email],
    })

    if (users.totalCount === 0) {
      return NextResponse.json({
        success: true,
        user: null,
        message: 'No user found with this email',
      })
    }

    // Get the first user (should only be one with exact email match)
    const user = users.data[0]
    if (!user) {
      return NextResponse.json({
        success: true,
        user: null,
        message: 'No user found with this email',
      })
    }

    // Parse user metadata
    const publicMetadata = user.publicMetadata || {}
    const parsedMetadata = userMetadataSchema.parse(publicMetadata)

    // Prepare response
    const userResponse = {
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress || email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: parsedMetadata.role || null,
      customerIds: parsedMetadata.customerids || [],
      createdAt: new Date(user.createdAt).toISOString(),
    }

    return NextResponse.json({
      success: true,
      user: userResponse,
      message: 'User found successfully',
    })
  } catch (error) {
    // Handle Clerk-specific errors
    if (error && typeof error === 'object' && 'errors' in error) {
      const clerkError = error as { errors: Array<{ message: string }> }
      const errorMessage =
        clerkError.errors[0]?.message || 'Failed to search users'

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
