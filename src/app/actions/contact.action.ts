/**
 * Contact Server Action - Handles contact form submission server-side
 * SOLID Principles: SRP - Single responsibility for contact form processing
 * Design Patterns: Server Action Pattern
 * Dependencies: Server Actions, Zod validation
 */

'use server'

import { z } from 'zod'

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
    const CONTACT_EMAIL_TO = process.env['CONTACT_EMAIL_TO'] || 'info@alfe.se'
    const CONTACT_EMAIL_FROM =
      process.env['CONTACT_EMAIL_FROM'] || 'noreply@alfe.se'

    if (!SENDGRID_API_KEY) {
      console.error('SendGrid API key not configured')
      return {
        success: false,
        error: 'Email service not configured. Please contact support directly.',
      }
    }

    // Prepare the email content
    const emailContent = {
      to: CONTACT_EMAIL_TO,
      from: CONTACT_EMAIL_FROM,
      subject: `[${validatedData.subject.toUpperCase()}] Contact Form Submission from ${validatedData.name}`,
      replyTo: validatedData.email,
      text: `
Name: ${validatedData.name}
Email: ${validatedData.email}
Phone: ${validatedData.phone || 'Not provided'}
Subject: ${validatedData.subject}
Customer ID: ${validatedData.customerid || 'Not provided'}
Language: ${validatedData.language || 'Not specified'}

Message:
${validatedData.message}
      `,
      html: `
<h2>Contact Form Submission</h2>
<p><strong>Name:</strong> ${validatedData.name}</p>
<p><strong>Email:</strong> ${validatedData.email}</p>
<p><strong>Phone:</strong> ${validatedData.phone || 'Not provided'}</p>
<p><strong>Subject:</strong> ${validatedData.subject}</p>
<p><strong>Customer ID:</strong> ${validatedData.customerid || 'Not provided'}</p>
<p><strong>Language:</strong> ${validatedData.language || 'Not specified'}</p>
<hr>
<h3>Message:</h3>
<p>${validatedData.message.replace(/\n/g, '<br>')}</p>
      `,
    }

    // Send email using SendGrid API directly (server-side)
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: emailContent.to }] }],
        from: { email: emailContent.from },
        reply_to: { email: emailContent.replyTo },
        subject: emailContent.subject,
        content: [
          { type: 'text/plain', value: emailContent.text },
          { type: 'text/html', value: emailContent.html },
        ],
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('SendGrid API error:', response.status, errorText)
      throw new Error('Failed to send email')
    }

    return {
      success: true,
    }
  } catch (error) {
    console.error('Contact form submission error:', error)

    if (error instanceof z.ZodError) {
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
