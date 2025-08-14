/**
 * API Route - Create Customer Account
 * SOLID Principles: SRP - Single responsibility for customer creation
 * Design Patterns: API Route Pattern with validation
 * Dependencies: Clerk SDK, Zod validation
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { z } from 'zod'

// Request validation schema
const createCustomerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

// Response schemas
const successResponseSchema = z.object({
  success: z.literal(true),
  userId: z.string(),
  email: z.string(),
  message: z.string(),
})

const errorResponseSchema = z.object({
  success: z.literal(false),
  error: z.string(),
})

type SuccessResponse = z.infer<typeof successResponseSchema>
type ErrorResponse = z.infer<typeof errorResponseSchema>

export async function POST(
  req: NextRequest
): Promise<NextResponse<SuccessResponse | ErrorResponse>> {
  console.log('=== CREATE CUSTOMER API CALLED ===')
  
  try {
    // Check admin authentication
    const { userId, sessionClaims } = await auth()
    console.log('Auth check - userId:', userId)
    console.log('Auth check - sessionClaims:', sessionClaims)

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - Not authenticated' },
        { status: 401 }
      )
    }

    // Check admin role
    const metadata = sessionClaims?.['metadata'] as { role?: string } | undefined
    const userRole = metadata?.role

    if (userRole !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Admin access required' },
        { status: 403 }
      )
    }

    // Parse and validate request body
    const body = await req.json()
    console.log('Request body:', body)
    
    const validationResult = createCustomerSchema.safeParse(body)
    console.log('Validation result:', validationResult)

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
    } catch (checkError) {
      console.error('Error checking existing user:', checkError)
      // Continue with creation if check fails
    }

    // Create user in Clerk
    const newUser = await clerk.users.createUser({
      emailAddress: [email],
      password,
      publicMetadata: {
        role: 'customer',
        customerids: [], // Empty array, will be populated via authenticate-user
      },
    })

    // Return success response
    return NextResponse.json(
      {
        success: true,
        userId: newUser.id,
        email: newUser.emailAddresses[0]?.emailAddress || email,
        message: 'Customer account created successfully',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating customer account:', error)

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
