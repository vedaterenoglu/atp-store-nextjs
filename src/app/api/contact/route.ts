/**
 * Contact Form API Route
 * SOLID Principles: SRP - Handles contact form submissions
 * Design Patterns: API Route Pattern
 * Dependencies: SendGrid, Rate Limiting, Email Templates
 */

import { NextRequest, NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'
import {
  generateEmailTemplates,
  getApiMessage,
  type SupportedLanguage,
} from '@/lib/email-templates-v2'

// Initialize SendGrid
sgMail.setApiKey(process.env['SENDGRID_API_KEY']!)

// Simple in-memory rate limiting (consider Redis for production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const limit = rateLimitMap.get(ip)

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + 60000, // 1 minute window
    })
    return true
  }

  if (limit.count >= 3) {
    // Max 3 requests per minute
    return false
  }

  limit.count++
  return true
}

export async function POST(request: NextRequest) {
  let language = 'en' // Default language for error handling

  try {
    // Get client IP for rate limiting
    const ip =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown'

    // Parse request body
    const body = await request.json()
    const {
      name,
      email,
      phone,
      subject,
      message,
      customerid,
      language: userLanguage = 'en',
    } = body
    language = userLanguage // Update the outer scope language variable

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: getApiMessage(language, 'tooManyRequests') },
        { status: 429 }
      )
    }

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: getApiMessage(language, 'missingFields') },
        { status: 400 }
      )
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: getApiMessage(language, 'invalidEmail') },
        { status: 400 }
      )
    }

    // Always use Swedish timestamp for admin email
    const timestamp = new Date().toLocaleString('sv-SE', {
      timeZone: 'Europe/Stockholm',
      dateStyle: 'full',
      timeStyle: 'short',
    })

    // Generate email templates using new dynamic system
    // Admin always gets Swedish, customer gets their selected language
    const emailTemplates = generateEmailTemplates({
      name,
      email,
      phone,
      subject,
      message,
      timestamp, // Swedish timestamp for admin
      customerid,
      language: language as SupportedLanguage,
    })

    // Send email to admin (ALWAYS in Swedish)
    const adminMsg = {
      to: process.env['NEXT_PUBLIC_COLLECTOR_MAIL'] || process.env['EMAIL_TO']!,
      from: process.env['EMAIL_FROM']!,
      subject: emailTemplates.admin.subject,
      html: emailTemplates.admin.html,
    }

    // Send auto-reply to customer (in their selected language)
    const userMsg = {
      to: email,
      from: process.env['EMAIL_FROM']!,
      subject: emailTemplates.customer.subject,
      html: emailTemplates.customer.html,
    }

    // Send both emails
    await Promise.all([sgMail.send(adminMsg), sgMail.send(userMsg)])

    return NextResponse.json(
      {
        success: true,
        message: getApiMessage(language, 'success'),
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      {
        error: getApiMessage(language, 'error'),
      },
      { status: 500 }
    )
  }
}
