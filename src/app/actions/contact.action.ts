/**
 * Contact Server Action - Handles contact form submission server-side
 * SOLID Principles: SRP - Single responsibility for contact form processing
 * Design Patterns: Server Action Pattern
 * Dependencies: Server Actions, Zod validation
 */

'use server'

import { z } from 'zod'
import {
  getEmailTemplates,
  type EmailTemplateData,
} from '@/lib/email-templates'

// Define the validation schema using Zod
const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  phone: z.string().optional(),
  subject: z
    .enum(['general', 'sales', 'support', 'partnership', 'feedback'])
    .refine(val => val !== undefined, { message: 'Please select a subject' }),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters',
  }),
  customerid: z.string().optional(),
  language: z.string().optional(),
})

type ContactFormInput = z.infer<typeof contactFormSchema>

export interface ContactActionResult {
  success: boolean
  error?: string
}

/**
 * Server Action for handling contact form submissions
 * Processes the form data server-side, avoiding client-side API calls
 */
export async function submitContactForm(
  data: ContactFormInput
): Promise<ContactActionResult> {
  try {
    // Validate the input data
    const validatedData = contactFormSchema.parse(data)

    // Get environment variables server-side
    const SENDGRID_API_KEY = process.env['SENDGRID_API_KEY']
    const CONTACT_EMAIL_TO =
      process.env['CONTACT_EMAIL_TO'] || process.env['EMAIL_TO']
    const CONTACT_EMAIL_FROM =
      process.env['CONTACT_EMAIL_FROM'] || process.env['EMAIL_FROM']

    if (!SENDGRID_API_KEY) {
      console.error('❌ [CONTACT FORM] SendGrid API key not configured')
      return {
        success: false,
        error: 'Email service not configured. Please contact support directly.',
      }
    }

    if (!CONTACT_EMAIL_TO || !CONTACT_EMAIL_FROM) {
      console.error('❌ [CONTACT FORM] Email addresses not configured:', {
        to: CONTACT_EMAIL_TO,
        from: CONTACT_EMAIL_FROM,
      })
      return {
        success: false,
        error:
          'Email configuration incomplete. Please contact support directly.',
      }
    }

    // Prepare template data
    const templateData: EmailTemplateData = {
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone || '',
      subject: validatedData.subject,
      message: validatedData.message,
      timestamp: new Date().toISOString(),
    }

    // Get email templates - Company ALWAYS gets Swedish, User gets their locale
    const companyTemplates = getEmailTemplates('sv', templateData)
    const userTemplates = getEmailTemplates(
      validatedData.language || 'en',
      templateData
    )

    // Prepare the company notification email content (always in Swedish)
    const companyEmailContent = {
      to: CONTACT_EMAIL_TO,
      from: CONTACT_EMAIL_FROM,
      subject: companyTemplates.admin.subject,
      replyTo: validatedData.email,
      html: companyTemplates.admin.html,
    }

    // Prepare the user confirmation email content (in user's language)
    const userEmailContent = {
      to: validatedData.email,
      from: CONTACT_EMAIL_FROM,
      subject: userTemplates.user.subject,
      html: userTemplates.user.html,
    }

    // Send company notification email using SendGrid API
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: companyEmailContent.to }] }],
        from: { email: companyEmailContent.from },
        reply_to: { email: companyEmailContent.replyTo },
        subject: companyEmailContent.subject,
        content: [{ type: 'text/html', value: companyEmailContent.html }],
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ [CONTACT FORM] SendGrid API error:', {
        status: response.status,
        error: errorText,
      })

      // Try to parse error as JSON for more details
      try {
        const errorJson = JSON.parse(errorText)
        console.error('❌ [CONTACT FORM] SendGrid error details:', errorJson)
      } catch {
        // Not JSON, already logged as text
      }

      throw new Error('Failed to send company notification email')
    }

    // Send user confirmation email

    const userResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: userEmailContent.to }] }],
        from: { email: userEmailContent.from },
        subject: userEmailContent.subject,
        content: [{ type: 'text/html', value: userEmailContent.html }],
      }),
    })

    if (!userResponse.ok) {
      const errorText = await userResponse.text()
      console.error('❌ [CONTACT FORM] User email SendGrid API error:', {
        status: userResponse.status,
        error: errorText,
      })

      // Try to parse error as JSON for more details
      try {
        const errorJson = JSON.parse(errorText)
        console.error(
          '❌ [CONTACT FORM] User email SendGrid error details:',
          errorJson
        )
      } catch {
        // Not JSON, already logged as text
      }

      throw new Error('Failed to send user confirmation email')
    }

    return {
      success: true,
    }
  } catch (error) {
    console.error(
      '[CONTACT FORM] Error:',
      error instanceof Error ? error.message : 'Unknown error'
    )

    if (error instanceof z.ZodError) {
      console.error('❌ [CONTACT FORM] Validation error:', error.issues)
      return {
        success: false,
        error: error.issues[0]?.message || 'Invalid form data',
      }
    }

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to send message. Please try again later.',
    }
  }
}
