/**
 * Email Templates with i18n Support
 * SOLID Principles: SRP - Email template generation
 * Design Patterns: Factory Pattern for template selection
 * Dependencies: None
 */

export interface EmailTemplateData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  timestamp: string
}

// Subject translations for email display
const subjectTranslations = {
  en: {
    general: 'General Inquiry',
    sales: 'Sales Question',
    support: 'Technical Support',
    partnership: 'Partnership',
    feedback: 'Feedback',
  },
  sv: {
    general: 'Allmän förfrågan',
    sales: 'Försäljningsfråga',
    support: 'Teknisk support',
    partnership: 'Partnerskap',
    feedback: 'Feedback',
  },
  tr: {
    general: 'Genel Soru',
    sales: 'Satış Sorusu',
    support: 'Teknik Destek',
    partnership: 'Ortaklık',
    feedback: 'Geri Bildirim',
  },
  de: {
    general: 'Allgemeine Anfrage',
    sales: 'Verkaufsfrage',
    support: 'Technischer Support',
    partnership: 'Partnerschaft',
    feedback: 'Feedback',
  },
  da: {
    general: 'Generel forespørgsel',
    sales: 'Salgsspørgsmål',
    support: 'Teknisk support',
    partnership: 'Partnerskab',
    feedback: 'Feedback',
  },
}

function getTranslatedSubject(language: string, subjectKey: string): string {
  const lang = language in subjectTranslations ? language : 'en'
  const translations =
    subjectTranslations[lang as keyof typeof subjectTranslations]
  return translations[subjectKey as keyof typeof translations] || subjectKey
}

export interface EmailTemplates {
  admin: {
    subject: string
    html: string
  }
  user: {
    subject: string
    html: string
  }
}

const templates = {
  en: {
    admin: {
      subject: (data: EmailTemplateData) =>
        `${data.name} - From ATP Store contact form - ${getTranslatedSubject('en', data.subject)}`,
      html: (data: EmailTemplateData) => {
        const translatedSubject = getTranslatedSubject('en', data.subject)
        return `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
              .container { max-width: 600px; margin: 0 auto; }
              .header { background: #4267B2; color: white; padding: 30px; text-align: center; }
              .header h2 { margin: 0; font-size: 24px; }
              .header p { margin: 5px 0 0; font-size: 14px; opacity: 0.9; }
              .content { background: white; padding: 30px; border: 1px solid #e0e0e0; border-top: none; }
              .field { margin-bottom: 20px; }
              .label { font-weight: bold; color: #333; font-size: 14px; margin-bottom: 5px; }
              .value { color: #555; font-size: 16px; }
              .value a { color: #4267B2; text-decoration: none; }
              .value a:hover { text-decoration: underline; }
              .message-box { background: #f8f9fa; padding: 20px; border-left: 4px solid #4267B2; margin: 20px 0; }
              .message-box .label { color: #4267B2; margin-bottom: 10px; font-size: 16px; }
              .message-box .value { white-space: pre-wrap; color: #333; }
              .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666; border: 1px solid #e0e0e0; border-top: none; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>New Contact Form Submission</h2>
                <p>ATP Store Website</p>
              </div>

              <div class="content">
                <div class="field">
                  <div class="label">Full Name:</div>
                  <div class="value">${data.name}</div>
                </div>

                <div class="field">
                  <div class="label">Email:</div>
                  <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
                </div>

                <div class="field">
                  <div class="label">Phone:</div>
                  <div class="value">${data.phone || 'Not provided'}</div>
                </div>

                <div class="field">
                  <div class="label">Subject:</div>
                  <div class="value">${translatedSubject}</div>
                </div>

                <div class="field">
                  <div class="label">Submitted at:</div>
                  <div class="value">${data.timestamp}</div>
                </div>

                <div class="message-box">
                  <div class="label">Message:</div>
                  <div class="value">${data.message}</div>
                </div>
              </div>

              <div class="footer">
                <p>This email was sent from the ATP Store contact form.</p>
              </div>
            </div>
          </body>
        </html>
      `
      },
    },
    user: {
      subject: (data: EmailTemplateData) =>
        `Thank you for contacting ATP Store - ${getTranslatedSubject('en', data.subject)}`,
      html: (data: EmailTemplateData) => {
        const translatedSubject = getTranslatedSubject('en', data.subject)
        return `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #0066cc; color: white; padding: 30px; border-radius: 5px 5px 0 0; text-align: center; }
              .content { background: #fff; padding: 30px; border: 1px solid #ddd; border-top: none; }
              .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666; border: 1px solid #ddd; border-top: none; border-radius: 0 0 5px 5px; }
              .button { display: inline-block; padding: 12px 30px; background: #0066cc; color: white !important; text-decoration: none; border-radius: 5px; margin-top: 20px; font-weight: bold; font-size: 16px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">Thank You for Contacting Us!</h1>
              </div>
              
              <div class="content">
                <p>Dear ${data.name},</p>
                
                <p>We have received your message and appreciate you reaching out to ATP Store. Our team will review your inquiry and get back to you as soon as possible, typically within 1-2 business days.</p>
                
                <h3 style="color: #0066cc;">Your Message Details:</h3>
                <p><strong>Subject:</strong> ${translatedSubject}</p>
                <p><strong>Message:</strong></p>
                <p style="background: #f8f9fa; padding: 15px; border-left: 3px solid #0066cc; white-space: pre-wrap;">${data.message}</p>
                
                <p>If you need immediate assistance, please feel free to call us during business hours:</p>
                <ul>
                  <li><strong>Order Reception:</strong> +46 76 196 1113</li>
                  <li><strong>Customer Service:</strong> +46 76 260 1112</li>
                  <li><strong>Business Hours:</strong> Monday - Friday, 08:00 - 16:00</li>
                </ul>
                
                <p>Best regards,<br>
                The ATP Store Team</p>
                
                <center>
                  <a href="http://atpstore.se" class="button" style="color: white !important; text-decoration: none;">Visit Our Website</a>
                </center>
              </div>
              
              <div class="footer">
                <p>Alfe Tissue Paper AB<br>
                Maskinvägen 1 Port 8, 227 30 Lund, Skåne Sweden<br>
                Email: info@alfetissuepaper.se | Web: atpstore.se</p>
                <p style="margin-top: 10px;">This is an automated response. Please do not reply to this email.</p>
              </div>
            </div>
          </body>
        </html>
      `
      },
    },
  },
  sv: {
    admin: {
      subject: (data: EmailTemplateData) =>
        `${data.name} - Från ATP Store kontaktformulär - ${getTranslatedSubject('sv', data.subject)}`,
      html: (data: EmailTemplateData) => {
        const translatedSubject = getTranslatedSubject('sv', data.subject)
        return `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
              .container { max-width: 600px; margin: 0 auto; }
              .header { background: #4267B2; color: white; padding: 30px; text-align: center; }
              .header h2 { margin: 0; font-size: 24px; }
              .header p { margin: 5px 0 0; font-size: 14px; opacity: 0.9; }
              .content { background: white; padding: 30px; border: 1px solid #e0e0e0; border-top: none; }
              .field { margin-bottom: 20px; }
              .label { font-weight: bold; color: #333; font-size: 14px; margin-bottom: 5px; }
              .value { color: #555; font-size: 16px; }
              .value a { color: #4267B2; text-decoration: none; }
              .value a:hover { text-decoration: underline; }
              .message-box { background: #f8f9fa; padding: 20px; border-left: 4px solid #4267B2; margin: 20px 0; }
              .message-box .label { color: #4267B2; margin-bottom: 10px; font-size: 16px; }
              .message-box .value { white-space: pre-wrap; color: #333; }
              .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666; border: 1px solid #e0e0e0; border-top: none; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>Ny Kontaktformulär Inlämning</h2>
                <p>ATP Store Webbplats</p>
              </div>

              <div class="content">
                <div class="field">
                  <div class="label">Fullständigt namn:</div>
                  <div class="value">${data.name}</div>
                </div>

                <div class="field">
                  <div class="label">E-post:</div>
                  <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
                </div>

                <div class="field">
                  <div class="label">Telefon:</div>
                  <div class="value">${data.phone || 'Ej angivet'}</div>
                </div>

                <div class="field">
                  <div class="label">Ämne:</div>
                  <div class="value">${translatedSubject}</div>
                </div>

                <div class="field">
                  <div class="label">Skickat:</div>
                  <div class="value">${data.timestamp}</div>
                </div>

                <div class="message-box">
                  <div class="label">Meddelande:</div>
                  <div class="value">${data.message}</div>
                </div>
              </div>

              <div class="footer">
                <p>Detta e-postmeddelande skickades från ATP Store kontaktformulär.</p>
              </div>
            </div>
          </body>
        </html>
      `
      },
    },
    user: {
      subject: (data: EmailTemplateData) =>
        `Tack för att du kontaktar ATP Store - ${getTranslatedSubject('sv', data.subject)}`,
      html: (data: EmailTemplateData) => {
        const translatedSubject = getTranslatedSubject('sv', data.subject)
        return `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #0066cc; color: white; padding: 30px; border-radius: 5px 5px 0 0; text-align: center; }
              .content { background: #fff; padding: 30px; border: 1px solid #ddd; border-top: none; }
              .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666; border: 1px solid #ddd; border-top: none; border-radius: 0 0 5px 5px; }
              .button { display: inline-block; padding: 12px 30px; background: #0066cc; color: white !important; text-decoration: none; border-radius: 5px; margin-top: 20px; font-weight: bold; font-size: 16px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">Tack för att du kontaktar oss!</h1>
              </div>
              
              <div class="content">
                <p>Kära ${data.name},</p>
                
                <p>Vi har mottagit ditt meddelande och uppskattar att du kontaktar ATP Store. Vårt team kommer att granska din förfrågan och återkomma till dig så snart som möjligt, vanligtvis inom 1-2 arbetsdagar.</p>
                
                <h3 style="color: #0066cc;">Dina meddelandedetaljer:</h3>
                <p><strong>Ämne:</strong> ${translatedSubject}</p>
                <p><strong>Meddelande:</strong></p>
                <p style="background: #f8f9fa; padding: 15px; border-left: 3px solid #0066cc; white-space: pre-wrap;">${data.message}</p>
                
                <p>Om du behöver omedelbar hjälp, vänligen ring oss under kontorstid:</p>
                <ul>
                  <li><strong>Ordermottagning:</strong> +46 76 196 1113</li>
                  <li><strong>Kundtjänst:</strong> +46 76 260 1112</li>
                  <li><strong>Öppettider:</strong> Måndag - Fredag, 08:00 - 16:00</li>
                </ul>
                
                <p>Med vänliga hälsningar,<br>
                ATP Store-teamet</p>
                
                <center>
                  <a href="http://atpstore.se" class="button" style="color: white !important; text-decoration: none;">Besök vår webbplats</a>
                </center>
              </div>
              
              <div class="footer">
                <p>Alfe Tissue Paper AB<br>
                Maskinvägen 1 Port 8, 227 30 Lund, Skåne Sverige<br>
                E-post: info@alfetissuepaper.se | Webb: atpstore.se</p>
                <p style="margin-top: 10px;">Detta är ett automatiskt svar. Vänligen svara inte på detta e-postmeddelande.</p>
              </div>
            </div>
          </body>
        </html>
      `
      },
    },
  },
  tr: {
    admin: {
      subject: (data: EmailTemplateData) =>
        `${data.name} - ATP Store iletişim formundan - ${getTranslatedSubject('tr', data.subject)}`,
      html: (data: EmailTemplateData) => {
        const translatedSubject = getTranslatedSubject('tr', data.subject)
        return `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
              .container { max-width: 600px; margin: 0 auto; }
              .header { background: #4267B2; color: white; padding: 30px; text-align: center; }
              .header h2 { margin: 0; font-size: 24px; }
              .header p { margin: 5px 0 0; font-size: 14px; opacity: 0.9; }
              .content { background: white; padding: 30px; border: 1px solid #e0e0e0; border-top: none; }
              .field { margin-bottom: 20px; }
              .label { font-weight: bold; color: #333; font-size: 14px; margin-bottom: 5px; }
              .value { color: #555; font-size: 16px; }
              .value a { color: #4267B2; text-decoration: none; }
              .value a:hover { text-decoration: underline; }
              .message-box { background: #f8f9fa; padding: 20px; border-left: 4px solid #4267B2; margin: 20px 0; }
              .message-box .label { color: #4267B2; margin-bottom: 10px; font-size: 16px; }
              .message-box .value { white-space: pre-wrap; color: #333; }
              .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666; border: 1px solid #e0e0e0; border-top: none; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>Yeni İletişim Formu Gönderimi</h2>
                <p>ATP Store Web Sitesi</p>
              </div>

              <div class="content">
                <div class="field">
                  <div class="label">Ad Soyad:</div>
                  <div class="value">${data.name}</div>
                </div>

                <div class="field">
                  <div class="label">E-posta:</div>
                  <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
                </div>

                <div class="field">
                  <div class="label">Telefon:</div>
                  <div class="value">${data.phone || 'Belirtilmemiş'}</div>
                </div>

                <div class="field">
                  <div class="label">Konu:</div>
                  <div class="value">${translatedSubject}</div>
                </div>

                <div class="field">
                  <div class="label">Gönderilme Zamanı:</div>
                  <div class="value">${data.timestamp}</div>
                </div>

                <div class="message-box">
                  <div class="label">Mesaj:</div>
                  <div class="value">${data.message}</div>
                </div>
              </div>

              <div class="footer">
                <p>Bu e-posta ATP Store iletişim formundan gönderildi.</p>
              </div>
            </div>
          </body>
        </html>
      `
      },
    },
    user: {
      subject: (data: EmailTemplateData) =>
        `ATP Store'a ulaştığınız için teşekkürler - ${getTranslatedSubject('tr', data.subject)}`,
      html: (data: EmailTemplateData) => {
        const translatedSubject = getTranslatedSubject('tr', data.subject)
        return `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #0066cc; color: white; padding: 30px; border-radius: 5px 5px 0 0; text-align: center; }
              .content { background: #fff; padding: 30px; border: 1px solid #ddd; border-top: none; }
              .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666; border: 1px solid #ddd; border-top: none; border-radius: 0 0 5px 5px; }
              .button { display: inline-block; padding: 12px 30px; background: #0066cc; color: white !important; text-decoration: none; border-radius: 5px; margin-top: 20px; font-weight: bold; font-size: 16px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">Bize Ulaştığınız İçin Teşekkürler!</h1>
              </div>
              
              <div class="content">
                <p>Sayın ${data.name},</p>
                
                <p>Mesajınızı aldık ve ATP Store'a ulaştığınız için teşekkür ederiz. Ekibimiz talebinizi inceleyecek ve en kısa sürede, genellikle 1-2 iş günü içinde size geri dönecektir.</p>
                
                <h3 style="color: #0066cc;">Mesaj Detaylarınız:</h3>
                <p><strong>Konu:</strong> ${translatedSubject}</p>
                <p><strong>Mesaj:</strong></p>
                <p style="background: #f8f9fa; padding: 15px; border-left: 3px solid #0066cc; white-space: pre-wrap;">${data.message}</p>
                
                <p>Acil yardıma ihtiyacınız varsa, lütfen mesai saatleri içinde bizi arayın:</p>
                <ul>
                  <li><strong>Sipariş Kabul:</strong> +46 76 196 1113</li>
                  <li><strong>Müşteri Hizmetleri:</strong> +46 76 260 1112</li>
                  <li><strong>Çalışma Saatleri:</strong> Pazartesi - Cuma, 08:00 - 16:00</li>
                </ul>
                
                <p>Saygılarımızla,<br>
                ATP Store Ekibi</p>
                
                <center>
                  <a href="http://atpstore.se" class="button" style="color: white !important; text-decoration: none;">Web Sitemizi Ziyaret Edin</a>
                </center>
              </div>
              
              <div class="footer">
                <p>Alfe Tissue Paper AB<br>
                Maskinvägen 1 Port 8, 227 30 Lund, Skåne İsveç<br>
                E-posta: info@alfetissuepaper.se | Web: atpstore.se</p>
                <p style="margin-top: 10px;">Bu otomatik bir yanıttır. Lütfen bu e-postaya cevap vermeyin.</p>
              </div>
            </div>
          </body>
        </html>
      `
      },
    },
  },
  de: {
    admin: {
      subject: (data: EmailTemplateData) =>
        `${data.name} - Von ATP Store Kontaktformular - ${getTranslatedSubject('de', data.subject)}`,
      html: (data: EmailTemplateData) => {
        const translatedSubject = getTranslatedSubject('de', data.subject)
        return `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
              .container { max-width: 600px; margin: 0 auto; }
              .header { background: #4267B2; color: white; padding: 30px; text-align: center; }
              .header h2 { margin: 0; font-size: 24px; }
              .header p { margin: 5px 0 0; font-size: 14px; opacity: 0.9; }
              .content { background: white; padding: 30px; border: 1px solid #e0e0e0; border-top: none; }
              .field { margin-bottom: 20px; }
              .label { font-weight: bold; color: #333; font-size: 14px; margin-bottom: 5px; }
              .value { color: #555; font-size: 16px; }
              .value a { color: #4267B2; text-decoration: none; }
              .value a:hover { text-decoration: underline; }
              .message-box { background: #f8f9fa; padding: 20px; border-left: 4px solid #4267B2; margin: 20px 0; }
              .message-box .label { color: #4267B2; margin-bottom: 10px; font-size: 16px; }
              .message-box .value { white-space: pre-wrap; color: #333; }
              .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666; border: 1px solid #e0e0e0; border-top: none; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>Neue Kontaktformular-Nachricht</h2>
                <p>ATP Store Webseite</p>
              </div>

              <div class="content">
                <div class="field">
                  <div class="label">Vollständiger Name:</div>
                  <div class="value">${data.name}</div>
                </div>

                <div class="field">
                  <div class="label">E-Mail:</div>
                  <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
                </div>

                <div class="field">
                  <div class="label">Telefon:</div>
                  <div class="value">${data.phone || 'Nicht angegeben'}</div>
                </div>

                <div class="field">
                  <div class="label">Betreff:</div>
                  <div class="value">${translatedSubject}</div>
                </div>

                <div class="field">
                  <div class="label">Gesendet am:</div>
                  <div class="value">${data.timestamp}</div>
                </div>

                <div class="message-box">
                  <div class="label">Nachricht:</div>
                  <div class="value">${data.message}</div>
                </div>
              </div>

              <div class="footer">
                <p>Diese E-Mail wurde vom ATP Store Kontaktformular gesendet.</p>
              </div>
            </div>
          </body>
        </html>
      `
      },
    },
    user: {
      subject: (data: EmailTemplateData) =>
        `Vielen Dank für Ihre Kontaktaufnahme mit ATP Store - ${getTranslatedSubject('de', data.subject)}`,
      html: (data: EmailTemplateData) => {
        const translatedSubject = getTranslatedSubject('de', data.subject)
        return `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #0066cc; color: white; padding: 30px; border-radius: 5px 5px 0 0; text-align: center; }
              .content { background: #fff; padding: 30px; border: 1px solid #ddd; border-top: none; }
              .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666; border: 1px solid #ddd; border-top: none; border-radius: 0 0 5px 5px; }
              .button { display: inline-block; padding: 12px 30px; background: #0066cc; color: white !important; text-decoration: none; border-radius: 5px; margin-top: 20px; font-weight: bold; font-size: 16px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">Vielen Dank für Ihre Nachricht!</h1>
              </div>

              <div class="content">
                <p>Sehr geehrte/r ${data.name},</p>

                <p>Wir haben Ihre Nachricht erhalten und danken Ihnen für Ihre Kontaktaufnahme mit ATP Store. Unser Team wird Ihre Anfrage prüfen und sich so schnell wie möglich bei Ihnen melden, normalerweise innerhalb von 1-2 Werktagen.</p>

                <h3 style="color: #0066cc;">Ihre Nachrichtendetails:</h3>
                <p><strong>Betreff:</strong> ${translatedSubject}</p>
                <p><strong>Nachricht:</strong></p>
                <p style="background: #f8f9fa; padding: 15px; border-left: 3px solid #0066cc; white-space: pre-wrap;">${data.message}</p>

                <p>Falls Sie sofortige Hilfe benötigen, rufen Sie uns bitte während der Geschäftszeiten an:</p>
                <ul>
                  <li><strong>Bestellannahme:</strong> +46 76 196 1113</li>
                  <li><strong>Kundendienst:</strong> +46 76 260 1112</li>
                  <li><strong>Geschäftszeiten:</strong> Montag - Freitag, 08:00 - 16:00</li>
                </ul>

                <p>Mit freundlichen Grüßen,<br>
                Das ATP Store Team</p>

                <center>
                  <a href="http://atpstore.se" class="button" style="color: white !important; text-decoration: none;">Besuchen Sie unsere Webseite</a>
                </center>
              </div>

              <div class="footer">
                <p>Alfe Tissue Paper AB<br>
                Maskinvägen 1 Port 8, 227 30 Lund, Skåne Schweden<br>
                E-Mail: info@alfetissuepaper.se | Web: atpstore.se</p>
                <p style="margin-top: 10px;">Dies ist eine automatische Antwort. Bitte antworten Sie nicht auf diese E-Mail.</p>
              </div>
            </div>
          </body>
        </html>
      `
      },
    },
  },
  da: {
    admin: {
      subject: (data: EmailTemplateData) =>
        `${data.name} - Fra ATP Store kontaktformular - ${getTranslatedSubject('da', data.subject)}`,
      html: (data: EmailTemplateData) => {
        const translatedSubject = getTranslatedSubject('da', data.subject)
        return `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
              .container { max-width: 600px; margin: 0 auto; }
              .header { background: #4267B2; color: white; padding: 30px; text-align: center; }
              .header h2 { margin: 0; font-size: 24px; }
              .header p { margin: 5px 0 0; font-size: 14px; opacity: 0.9; }
              .content { background: white; padding: 30px; border: 1px solid #e0e0e0; border-top: none; }
              .field { margin-bottom: 20px; }
              .label { font-weight: bold; color: #333; font-size: 14px; margin-bottom: 5px; }
              .value { color: #555; font-size: 16px; }
              .value a { color: #4267B2; text-decoration: none; }
              .value a:hover { text-decoration: underline; }
              .message-box { background: #f8f9fa; padding: 20px; border-left: 4px solid #4267B2; margin: 20px 0; }
              .message-box .label { color: #4267B2; margin-bottom: 10px; font-size: 16px; }
              .message-box .value { white-space: pre-wrap; color: #333; }
              .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666; border: 1px solid #e0e0e0; border-top: none; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>Ny Kontaktformular Indsendelse</h2>
                <p>ATP Store Hjemmeside</p>
              </div>

              <div class="content">
                <div class="field">
                  <div class="label">Fulde navn:</div>
                  <div class="value">${data.name}</div>
                </div>

                <div class="field">
                  <div class="label">E-mail:</div>
                  <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
                </div>

                <div class="field">
                  <div class="label">Telefon:</div>
                  <div class="value">${data.phone || 'Ikke angivet'}</div>
                </div>

                <div class="field">
                  <div class="label">Emne:</div>
                  <div class="value">${translatedSubject}</div>
                </div>

                <div class="field">
                  <div class="label">Sendt:</div>
                  <div class="value">${data.timestamp}</div>
                </div>

                <div class="message-box">
                  <div class="label">Besked:</div>
                  <div class="value">${data.message}</div>
                </div>
              </div>

              <div class="footer">
                <p>Denne e-mail blev sendt fra ATP Store kontaktformular.</p>
              </div>
            </div>
          </body>
        </html>
      `
      },
    },
    user: {
      subject: (data: EmailTemplateData) =>
        `Tak for din henvendelse til ATP Store - ${getTranslatedSubject('da', data.subject)}`,
      html: (data: EmailTemplateData) => {
        const translatedSubject = getTranslatedSubject('da', data.subject)
        return `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #0066cc; color: white; padding: 30px; border-radius: 5px 5px 0 0; text-align: center; }
              .content { background: #fff; padding: 30px; border: 1px solid #ddd; border-top: none; }
              .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666; border: 1px solid #ddd; border-top: none; border-radius: 0 0 5px 5px; }
              .button { display: inline-block; padding: 12px 30px; background: #0066cc; color: white !important; text-decoration: none; border-radius: 5px; margin-top: 20px; font-weight: bold; font-size: 16px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">Tak for din henvendelse!</h1>
              </div>

              <div class="content">
                <p>Kære ${data.name},</p>

                <p>Vi har modtaget din besked og sætter pris på, at du kontakter ATP Store. Vores team vil gennemgå din forespørgsel og vende tilbage til dig så hurtigt som muligt, typisk inden for 1-2 hverdage.</p>

                <h3 style="color: #0066cc;">Dine beskeddetaljer:</h3>
                <p><strong>Emne:</strong> ${translatedSubject}</p>
                <p><strong>Besked:</strong></p>
                <p style="background: #f8f9fa; padding: 15px; border-left: 3px solid #0066cc; white-space: pre-wrap;">${data.message}</p>

                <p>Hvis du har brug for øjeblikkelig hjælp, er du velkommen til at ringe til os i åbningstiden:</p>
                <ul>
                  <li><strong>Ordremodtagelse:</strong> +46 76 196 1113</li>
                  <li><strong>Kundeservice:</strong> +46 76 260 1112</li>
                  <li><strong>Åbningstider:</strong> Mandag - Fredag, 08:00 - 16:00</li>
                </ul>

                <p>Med venlig hilsen,<br>
                ATP Store Teamet</p>

                <center>
                  <a href="http://atpstore.se" class="button" style="color: white !important; text-decoration: none;">Besøg vores hjemmeside</a>
                </center>
              </div>

              <div class="footer">
                <p>Alfe Tissue Paper AB<br>
                Maskinvägen 1 Port 8, 227 30 Lund, Skåne Sverige<br>
                E-mail: info@alfetissuepaper.se | Web: atpstore.se</p>
                <p style="margin-top: 10px;">Dette er et automatisk svar. Venligst svar ikke på denne e-mail.</p>
              </div>
            </div>
          </body>
        </html>
      `
      },
    },
  },
}

export function getEmailTemplates(
  language: string,
  data: EmailTemplateData
): EmailTemplates {
  const lang = language in templates ? language : 'en'
  const selectedTemplates = templates[lang as keyof typeof templates]

  return {
    admin: {
      subject: selectedTemplates.admin.subject(data),
      html: selectedTemplates.admin.html(data),
    },
    user: {
      subject: selectedTemplates.user.subject(data),
      html: selectedTemplates.user.html(data),
    },
  }
}

// API Response Messages
export const apiMessages = {
  en: {
    tooManyRequests:
      'Too many requests. Please wait a moment before trying again.',
    missingFields: 'Please fill in all required fields.',
    invalidEmail: 'Please provide a valid email address.',
    success:
      'Thank you for your message! We have sent you a confirmation email and will get back to you soon.',
    error:
      'We encountered an issue sending your message. Please try again later or contact us directly by phone.',
  },
  sv: {
    tooManyRequests:
      'För många förfrågningar. Vänta en stund innan du försöker igen.',
    missingFields: 'Vänligen fyll i alla obligatoriska fält.',
    invalidEmail: 'Vänligen ange en giltig e-postadress.',
    success:
      'Tack för ditt meddelande! Vi har skickat dig ett bekräftelsemail och återkommer snart.',
    error:
      'Vi stötte på ett problem när vi skickade ditt meddelande. Försök igen senare eller kontakta oss direkt per telefon.',
  },
  tr: {
    tooManyRequests:
      'Çok fazla istek. Tekrar denemeden önce lütfen biraz bekleyin.',
    missingFields: 'Lütfen tüm zorunlu alanları doldurun.',
    invalidEmail: 'Lütfen geçerli bir e-posta adresi girin.',
    success:
      'Mesajınız için teşekkürler! Size bir onay e-postası gönderdik ve en kısa sürede size geri döneceğiz.',
    error:
      'Mesajınızı gönderirken bir sorunla karşılaştık. Lütfen daha sonra tekrar deneyin veya bizi doğrudan telefonla arayın.',
  },
}

export function getApiMessage(
  language: string,
  key: keyof typeof apiMessages.en
): string {
  const lang = language in apiMessages ? language : 'en'
  return apiMessages[lang as keyof typeof apiMessages][key]
}
