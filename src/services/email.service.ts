/**
 * Email Service - Centralized email handling service
 * SOLID Principles: SRP - Single responsibility for email operations
 * Design Patterns: Singleton Pattern, Service Pattern
 * Dependencies: SendGrid API, environment variables
 */

interface EmailOptions {
  to: string | string[]
  subject: string
  html?: string
  text?: string
  from?: {
    email: string
    name?: string
  }
}

interface NewUserNotification {
  userEmail: string
  userId?: string
  firstName?: string
  lastName?: string
}

class EmailService {
  private static instance: EmailService
  private readonly sendGridApiKey: string | undefined
  private readonly defaultFrom: {
    email: string
    name: string
  }
  private readonly collectorEmail: string | undefined

  private constructor() {
    this.sendGridApiKey = process.env['SENDGRID_API_KEY']
    this.collectorEmail = process.env['NEXT_PUBLIC_COLLECTOR_MAIL']
    this.defaultFrom = {
      email: process.env['EMAIL_FROM'] || 'noreply@alfetissuepaper.se',
      name: 'ATP Store',
    }
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService()
    }
    return EmailService.instance
  }

  /**
   * Send email via SendGrid
   */
  private async sendEmail(options: EmailOptions): Promise<boolean> {
    if (!this.sendGridApiKey) {
      console.warn('SendGrid API key not configured')
      return false
    }

    try {
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.sendGridApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: Array.isArray(options.to)
                ? options.to.map(email => ({ email }))
                : [{ email: options.to }],
              subject: options.subject,
            },
          ],
          from: options.from || this.defaultFrom,
          content: [
            options.html && {
              type: 'text/html',
              value: options.html,
            },
            options.text && {
              type: 'text/plain',
              value: options.text,
            },
          ].filter(Boolean),
        }),
      })

      if (!response.ok) {
        const error = await response.text()
        console.error('SendGrid error:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Failed to send email:', error)
      return false
    }
  }

  /**
   * Send new user sign-up notification to admin
   */
  public async sendNewUserNotification(
    data: NewUserNotification
  ): Promise<boolean> {
    if (!this.collectorEmail) {
      console.warn('Collector email not configured')
      return false
    }

    const subject = `New Sign-up Alert: ${data.userEmail}`
    const html = this.generateNewUserEmailHtml(data)

    const success = await this.sendEmail({
      to: this.collectorEmail,
      subject,
      html,
    })

    return success
  }

  /**
   * Generate HTML content for new user notification
   */
  private generateNewUserEmailHtml(data: NewUserNotification): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
          .header h2 { margin: 0; color: #2c3e50; }
          .info-box { background-color: #fff; border: 1px solid #dee2e6; padding: 15px; border-radius: 5px; }
          .info-item { margin: 10px 0; }
          .info-label { font-weight: bold; color: #495057; }
          .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; font-size: 12px; color: #6c757d; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>🔔 New User Sign-up Notification</h2>
          </div>
          <div class="info-box">
            <p>A new user has registered on ATP Store:</p>
            <div class="info-item">
              <span class="info-label">Email:</span> ${data.userEmail}
            </div>
            <div class="info-item">
              <span class="info-label">User ID:</span> ${data.userId || 'N/A'}
            </div>
            <div class="info-item">
              <span class="info-label">Name:</span> ${data.firstName || ''} ${data.lastName || ''}
            </div>
            <div class="info-item">
              <span class="info-label">Registration Time:</span> ${new Date().toLocaleString(
                'sv-SE',
                {
                  timeZone: 'Europe/Stockholm',
                  dateStyle: 'full',
                  timeStyle: 'medium',
                }
              )}
            </div>
          </div>
          <div class="footer">
            <p><strong>Action Required:</strong> Please activate this user account as needed.</p>
            <p>This is an automated message from ATP Store.</p>
          </div>
        </div>
      </body>
      </html>
    `
  }

  /**
   * Send order confirmation email
   * @todo Implement when order system is ready
   */
  public async sendOrderConfirmation(
    _orderId: string, // eslint-disable-line @typescript-eslint/no-unused-vars
    _customerEmail: string // eslint-disable-line @typescript-eslint/no-unused-vars
  ): Promise<boolean> {
    // TODO: Implement order confirmation email
    return false
  }

  /**
   * Send password reset email
   * @todo Implement if custom password reset is needed
   */
  public async sendPasswordReset(
    _email: string, // eslint-disable-line @typescript-eslint/no-unused-vars
    _resetLink: string // eslint-disable-line @typescript-eslint/no-unused-vars
  ): Promise<boolean> {
    // TODO: Implement password reset email
    return false
  }

  /**
   * Send account activation confirmation
   * @todo Implement when account activation is automated
   */
  public async sendAccountActivated(
    _email: string // eslint-disable-line @typescript-eslint/no-unused-vars
  ): Promise<boolean> {
    // TODO: Implement account activation email
    return false
  }

  /**
   * Test email configuration
   */
  public async testEmailConfiguration(): Promise<boolean> {
    if (!this.sendGridApiKey) {
      console.error('SendGrid API key not configured')
      return false
    }

    if (!this.collectorEmail) {
      console.error('Collector email not configured')
      return false
    }

    const success = await this.sendEmail({
      to: this.collectorEmail,
      subject: 'ATP Store - Email Configuration Test',
      html: `
        <h2>Email Configuration Test</h2>
        <p>This is a test email from ATP Store.</p>
        <p>If you receive this email, your email configuration is working correctly.</p>
        <p>Timestamp: ${new Date().toISOString()}</p>
      `,
    })

    return success
  }
}

// Export singleton instance
export const emailService = EmailService.getInstance()

// Export types
export type { EmailOptions, NewUserNotification }
