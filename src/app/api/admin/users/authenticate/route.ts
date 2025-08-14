/**
 * API Route - Authenticate User (Link to Customers)
 * SOLID Principles: SRP - Single responsibility for user authentication
 * Design Patterns: API Route Pattern with validation
 * Dependencies: Clerk SDK, Zod validation
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { z } from 'zod'

// Request validation schema
const authenticateUserSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  customerIds: z
    .array(z.string())
    .min(1, 'At least one customer ID is required'),
})

// Response types
type SuccessResponse = {
  success: true
  userId: string
  customerIds: string[]
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
    const { userId: adminId, sessionClaims } = await auth()

    if (!adminId) {
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

    // Parse and validate request body
    const body = await req.json()

    const validationResult = authenticateUserSchema.safeParse(body)

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

    const { userId, customerIds } = validationResult.data

    // Get Clerk client
    const clerk = await clerkClient()

    // Get the user to verify they exist
    let user
    try {
      user = await clerk.users.getUser(userId)
    } catch {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    // Get current metadata
    const currentMetadata = user.publicMetadata || {}
    const currentRole =
      (currentMetadata as { role?: string }).role || 'customer'

    // Update user metadata with new customer IDs
    const updatedUser = await clerk.users.updateUser(userId, {
      publicMetadata: {
        ...currentMetadata,
        role: currentRole, // Preserve existing role
        customerids: customerIds, // Update customer access
      },
    })

    // Return success response
    return NextResponse.json(
      {
        success: true,
        userId: updatedUser.id,
        customerIds: customerIds,
        message: `User successfully linked to ${customerIds.length} customer account(s)`,
      },
      { status: 200 }
    )
  } catch (error) {
    // Handle Clerk-specific errors
    if (error && typeof error === 'object' && 'errors' in error) {
      const clerkError = error as { errors: Array<{ message: string }> }
      const errorMessage =
        clerkError.errors[0]?.message || 'Failed to authenticate user'

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
