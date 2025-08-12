/**
 * New Sign-up Notification API Route
 * SOLID Principles: SRP - Single responsibility for handling sign-up notification requests
 * Design Patterns: API Route Pattern, Service Pattern (delegation to email service)
 * Dependencies: Email service singleton, environment variables
 */

import { NextRequest, NextResponse } from 'next/server'
import { emailService } from '@/services/email.service'

export async function POST(request: NextRequest) {
  try {
    // Get the request body
    const body = await request.json()
    const { userEmail, userId, firstName, lastName } = body

    // Validate required fields
    if (!userEmail) {
      return NextResponse.json(
        { error: 'User email is required' },
        { status: 400 }
      )
    }

    // Send notification using email service
    const success = await emailService.sendNewUserNotification({
      userEmail,
      userId,
      firstName,
      lastName,
    })

    if (success) {
      console.log('New user notification sent for:', userEmail)
    } else {
      console.log('Failed to send new user notification for:', userEmail)
    }

    // Always return success to not block user flow
    return NextResponse.json({ 
      success: true,
      message: success ? 'Sign-up notification sent' : 'User registered (notification may have failed)'
    })

  } catch (error) {
    console.error('Error processing sign-up notification:', error)
    // Don't fail the user flow even if notification fails
    return NextResponse.json({ 
      success: true,
      message: 'User registered (notification may have failed)'
    })
  }
}