/**
 * Email Templates v2 with Dynamic Multi-Language Support
 * SOLID Principles: SRP - Email template generation with i18n
 * Design Patterns: Factory Pattern, Strategy Pattern for language selection
 * Dependencies: None
 */

export type SupportedLanguage = 'en' | 'sv' | 'tr' | 'da' | 'de'

export interface EmailTemplateData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  timestamp: string // Admin timestamp (always Swedish)
  customerid?: string
  language?: SupportedLanguage
}

export interface EmailContent {
  subject: string
  html: string
}

export interface EmailTemplateResult {
  admin: EmailContent // Always in Swedish
  customer: EmailContent // In customer's selected language
}

// Email translations for all languages
const emailTranslations = {
  en: {
    // Admin email (but admin always gets Swedish)
    adminSubjectPrefix: 'New Contact Form Submission',

    // Customer email
    customerId: 'Customer ID',
    customerSubject: 'Thank you for contacting ATP Store',
    greeting: 'Dear',
    thankYouTitle: 'Thank You for Contacting Us!',
    thankYouMessage:
      'We have received your message and appreciate you reaching out to ATP Store. Our team will review your inquiry and get back to you as soon as possible, typically within 1-2 business days.',
    yourMessageDetails: 'Your Message Details',
    subject: 'Subject',
    message: 'Message',
    needHelp:
      'If you need immediate assistance, please feel free to call us during business hours:',
    orderReception: 'Order Reception',
    customerService: 'Customer Service',
    businessHours: 'Business Hours',
    businessHoursTime: 'Monday - Friday, 08:00 - 16:00',
    bestRegards: 'Best regards',
    teamSignature: 'The ATP Store Team',
    visitWebsite: 'Visit Our Website',
    companyAddress: 'Alfe Tissue Paper AB',
    addressLine: 'Maskinvägen 1 Port 8, 227 30 Lund, Skåne Sweden',
    contactInfo: 'Email: info@alfetissuepaper.se | Web: atpstore.se',
    automatedResponse:
      'This is an automated response. Please do not reply to this email.',

    // Subject types
    subjects: {
      general: 'General Inquiry',
      sales: 'Sales Question',
      support: 'Technical Support',
      partnership: 'Partnership',
      feedback: 'Feedback',
    },
  },
  sv: {
    // Admin email (Swedish - this is what admin always receives)
    adminSubjectPrefix: 'Ny kontaktformulär inlämning',
    adminTitle: 'Ny Kontaktformulär Inlämning',
    adminWebsite: 'ATP Store Webbplats',
    adminFullName: 'Fullständigt namn',
    adminEmail: 'E-post',
    adminPhone: 'Telefon',
    adminCustomerId: 'Kund-ID',
    adminNotProvided: 'Ej angivet',
    adminSubject: 'Ämne',
    adminSubmittedAt: 'Skickat',
    adminMessage: 'Meddelande',
    adminFooter:
      'Detta e-postmeddelande skickades från ATP Store kontaktformulär.',

    // Customer email
    customerId: 'Kund-ID',
    customerSubject: 'Tack för att du kontaktar ATP Store',
    greeting: 'Kära',
    thankYouTitle: 'Tack för att du kontaktar oss!',
    thankYouMessage:
      'Vi har mottagit ditt meddelande och uppskattar att du kontaktar ATP Store. Vårt team kommer att granska din förfrågan och återkomma till dig så snart som möjligt, vanligtvis inom 1-2 arbetsdagar.',
    yourMessageDetails: 'Dina meddelandedetaljer',
    subject: 'Ämne',
    message: 'Meddelande',
    needHelp:
      'Om du behöver omedelbar hjälp, vänligen ring oss under kontorstid:',
    orderReception: 'Ordermottagning',
    customerService: 'Kundtjänst',
    businessHours: 'Öppettider',
    businessHoursTime: 'Måndag - Fredag, 08:00 - 16:00',
    bestRegards: 'Med vänliga hälsningar',
    teamSignature: 'ATP Store-teamet',
    visitWebsite: 'Besök vår webbplats',
    companyAddress: 'Alfe Tissue Paper AB',
    addressLine: 'Maskinvägen 1 Port 8, 227 30 Lund, Skåne Sverige',
    contactInfo: 'E-post: info@alfetissuepaper.se | Webb: atpstore.se',
    automatedResponse:
      'Detta är ett automatiskt svar. Vänligen svara inte på detta e-postmeddelande.',

    // Subject types
    subjects: {
      general: 'Allmän förfrågan',
      sales: 'Försäljningsfråga',
      support: 'Teknisk support',
      partnership: 'Partnerskap',
      feedback: 'Feedback',
    },
  },
  tr: {
    // Admin email (but admin always gets Swedish)
    adminSubjectPrefix: 'Yeni İletişim Formu Gönderimi',

    // Customer email
    customerId: 'Müşteri Numarası',
    customerSubject: "ATP Store'a ulaştığınız için teşekkürler",
    greeting: 'Sayın',
    thankYouTitle: 'Bize Ulaştığınız İçin Teşekkürler!',
    thankYouMessage:
      "Mesajınızı aldık ve ATP Store'a ulaştığınız için teşekkür ederiz. Ekibimiz talebinizi inceleyecek ve en kısa sürede, genellikle 1-2 iş günü içinde size geri dönecektir.",
    yourMessageDetails: 'Mesaj Detaylarınız',
    subject: 'Konu',
    message: 'Mesaj',
    needHelp:
      'Acil yardıma ihtiyacınız varsa, lütfen mesai saatleri içinde bizi arayın:',
    orderReception: 'Sipariş Kabul',
    customerService: 'Müşteri Hizmetleri',
    businessHours: 'Çalışma Saatleri',
    businessHoursTime: 'Pazartesi - Cuma, 08:00 - 16:00',
    bestRegards: 'Saygılarımızla',
    teamSignature: 'ATP Store Ekibi',
    visitWebsite: 'Web Sitemizi Ziyaret Edin',
    companyAddress: 'Alfe Tissue Paper AB',
    addressLine: 'Maskinvägen 1 Port 8, 227 30 Lund, Skåne İsveç',
    contactInfo: 'E-posta: info@alfetissuepaper.se | Web: atpstore.se',
    automatedResponse:
      'Bu otomatik bir yanıttır. Lütfen bu e-postaya cevap vermeyin.',

    // Subject types
    subjects: {
      general: 'Genel Soru',
      sales: 'Satış Sorusu',
      support: 'Teknik Destek',
      partnership: 'Ortaklık',
      feedback: 'Geri Bildirim',
    },
  },
  da: {
    // Admin email (but admin always gets Swedish)
    adminSubjectPrefix: 'Ny kontaktformular indsendelse',

    // Customer email
    customerId: 'Kunde-ID',
    customerSubject: 'Tak for at kontakte ATP Store',
    greeting: 'Kære',
    thankYouTitle: 'Tak for at kontakte os!',
    thankYouMessage:
      'Vi har modtaget din besked og sætter pris på, at du kontakter ATP Store. Vores team vil gennemgå din forespørgsel og vende tilbage til dig så hurtigt som muligt, typisk inden for 1-2 arbejdsdage.',
    yourMessageDetails: 'Dine beskeddetaljer',
    subject: 'Emne',
    message: 'Besked',
    needHelp:
      'Hvis du har brug for øjeblikkelig hjælp, er du velkommen til at ringe til os i åbningstiden:',
    orderReception: 'Ordremodtagelse',
    customerService: 'Kundeservice',
    businessHours: 'Åbningstider',
    businessHoursTime: 'Mandag - Fredag, 08:00 - 16:00',
    bestRegards: 'Med venlig hilsen',
    teamSignature: 'ATP Store-teamet',
    visitWebsite: 'Besøg vores hjemmeside',
    companyAddress: 'Alfe Tissue Paper AB',
    addressLine: 'Maskinvägen 1 Port 8, 227 30 Lund, Skåne Sverige',
    contactInfo: 'E-mail: info@alfetissuepaper.se | Web: atpstore.se',
    automatedResponse:
      'Dette er et automatisk svar. Svar venligst ikke på denne e-mail.',

    // Subject types
    subjects: {
      general: 'Generel forespørgsel',
      sales: 'Salgsspørgsmål',
      support: 'Teknisk support',
      partnership: 'Partnerskab',
      feedback: 'Feedback',
    },
  },
  de: {
    // Admin email (but admin always gets Swedish)
    adminSubjectPrefix: 'Neue Kontaktformular-Einreichung',

    // Customer email
    customerId: 'Kundennummer',
    customerSubject: 'Vielen Dank für Ihre Kontaktaufnahme mit ATP Store',
    greeting: 'Sehr geehrte(r)',
    thankYouTitle: 'Vielen Dank für Ihre Kontaktaufnahme!',
    thankYouMessage:
      'Wir haben Ihre Nachricht erhalten und bedanken uns für Ihre Kontaktaufnahme mit ATP Store. Unser Team wird Ihre Anfrage prüfen und sich so schnell wie möglich bei Ihnen melden, in der Regel innerhalb von 1-2 Werktagen.',
    yourMessageDetails: 'Ihre Nachrichtendetails',
    subject: 'Betreff',
    message: 'Nachricht',
    needHelp:
      'Wenn Sie sofortige Hilfe benötigen, rufen Sie uns bitte während der Geschäftszeiten an:',
    orderReception: 'Bestellannahme',
    customerService: 'Kundenservice',
    businessHours: 'Geschäftszeiten',
    businessHoursTime: 'Montag - Freitag, 08:00 - 16:00',
    bestRegards: 'Mit freundlichen Grüßen',
    teamSignature: 'Das ATP Store Team',
    visitWebsite: 'Besuchen Sie unsere Website',
    companyAddress: 'Alfe Tissue Paper AB',
    addressLine: 'Maskinvägen 1 Port 8, 227 30 Lund, Skåne Schweden',
    contactInfo: 'E-Mail: info@alfetissuepaper.se | Web: atpstore.se',
    automatedResponse:
      'Dies ist eine automatische Antwort. Bitte antworten Sie nicht auf diese E-Mail.',

    // Subject types
    subjects: {
      general: 'Allgemeine Anfrage',
      sales: 'Verkaufsfrage',
      support: 'Technischer Support',
      partnership: 'Partnerschaft',
      feedback: 'Feedback',
    },
  },
}

// Get translated subject
function getTranslatedSubject(
  language: SupportedLanguage,
  subjectKey: string
): string {
  const translations = emailTranslations[language].subjects
  return translations[subjectKey as keyof typeof translations] || subjectKey
}

// Generate admin email template (ALWAYS in Swedish)
function generateAdminEmail(data: EmailTemplateData): EmailContent {
  const t = emailTranslations.sv // Always Swedish for admin
  const translatedSubject = getTranslatedSubject('sv', data.subject)

  return {
    subject: `${data.name} - ${t.adminSubjectPrefix} - ${translatedSubject}`,
    html: `
      <!DOCTYPE html>
      <html lang="sv">
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #555; }
            .value { color: #000; margin-top: 5px; }
            .message { background: #f1f3f5; padding: 15px; border-left: 4px solid #0066cc; margin-top: 20px; }
            .footer { margin-top: 30px; font-size: 12px; color: #666; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0; color: #0066cc;">${t.adminTitle}</h2>
              <p style="margin: 5px 0 0; color: #666;">${t.adminWebsite}</p>
            </div>
            
            <div class="field">
              <div class="label">${t.adminFullName}:</div>
              <div class="value">${data.name}</div>
            </div>
            
            <div class="field">
              <div class="label">${t.adminEmail}:</div>
              <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
            </div>
            
            <div class="field">
              <div class="label">${t.adminPhone}:</div>
              <div class="value">${data.phone || t.adminNotProvided}</div>
            </div>
            
            <div class="field">
              <div class="label">${t.adminCustomerId}:</div>
              <div class="value">${data.customerid || t.adminNotProvided}</div>
            </div>
            
            <div class="field">
              <div class="label">${t.adminSubject}:</div>
              <div class="value">${translatedSubject}</div>
            </div>
            
            <div class="field">
              <div class="label">${t.adminSubmittedAt}:</div>
              <div class="value">${data.timestamp}</div>
            </div>
            
            <div class="field">
              <div class="label">Kundens språk:</div>
              <div class="value">${data.language ? data.language.toUpperCase() : 'Okänd'}</div>
            </div>
            
            <div class="message">
              <div class="label">${t.adminMessage}:</div>
              <div class="value" style="white-space: pre-wrap; margin-top: 10px;">${data.message}</div>
            </div>
            
            <div class="footer">
              <p>${t.adminFooter}</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }
}

// Generate customer email template (in customer's language)
function generateCustomerEmail(
  data: EmailTemplateData,
  language: SupportedLanguage
): EmailContent {
  const t = emailTranslations[language]
  const translatedSubject = getTranslatedSubject(language, data.subject)

  return {
    subject: `${t.customerSubject} - ${translatedSubject}`,
    html: `
      <!DOCTYPE html>
      <html lang="${language}">
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #0066cc; color: white; padding: 30px; border-radius: 5px 5px 0 0; text-align: center; }
            .content { background: #fff; padding: 30px; border: 1px solid #ddd; border-top: none; }
            .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666; border: 1px solid #ddd; border-top: none; border-radius: 0 0 5px 5px; }
            .button { display: inline-block; padding: 12px 30px; background: #0066cc; color: white !important; text-decoration: none; border-radius: 5px; margin-top: 20px; font-weight: bold; font-size: 16px; }
            .info-box { background: #f8f9fa; padding: 15px; border-left: 3px solid #0066cc; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">${t.thankYouTitle}</h1>
            </div>
            
            <div class="content">
              <p>${t.greeting} ${data.name},</p>
              
              <p>${t.thankYouMessage}</p>
              
              <h3 style="color: #0066cc;">${t.yourMessageDetails}:</h3>
              ${data.customerid ? `<p><strong>${t.customerId}:</strong> ${data.customerid}</p>` : ''}
              <p><strong>${t.subject}:</strong> ${translatedSubject}</p>
              <p><strong>${t.message}:</strong></p>
              <div class="info-box">
                <p style="white-space: pre-wrap; margin: 0;">${data.message}</p>
              </div>
              
              <p>${t.needHelp}</p>
              <ul>
                <li><strong>${t.orderReception}:</strong> +46 76 196 1113</li>
                <li><strong>${t.customerService}:</strong> +46 76 260 1112</li>
                <li><strong>${t.businessHours}:</strong> ${t.businessHoursTime}</li>
              </ul>
              
              <p>${t.bestRegards},<br>
              ${t.teamSignature}</p>
              
              <center>
                <a href="http://atpstore.se" class="button">${t.visitWebsite}</a>
              </center>
            </div>
            
            <div class="footer">
              <p>${t.companyAddress}<br>
              ${t.addressLine}<br>
              ${t.contactInfo}</p>
              <p style="margin-top: 10px;">${t.automatedResponse}</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }
}

/**
 * Main function to generate email templates
 * @param data - Email template data including customer language
 * @returns Object with admin (Swedish) and customer (selected language) emails
 */
export function generateEmailTemplates(
  data: EmailTemplateData
): EmailTemplateResult {
  // Ensure we have a valid language, default to English
  const customerLanguage: SupportedLanguage = data.language || 'en'

  return {
    admin: generateAdminEmail(data),
    customer: generateCustomerEmail(data, customerLanguage),
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
  da: {
    tooManyRequests:
      'For mange anmodninger. Vent et øjeblik, før du prøver igen.',
    missingFields: 'Udfyld venligst alle påkrævede felter.',
    invalidEmail: 'Angiv venligst en gyldig e-mailadresse.',
    success:
      'Tak for din besked! Vi har sendt dig en bekræftelses-e-mail og vender tilbage til dig snart.',
    error:
      'Vi stødte på et problem med at sende din besked. Prøv venligst igen senere eller kontakt os direkte på telefon.',
  },
  de: {
    tooManyRequests:
      'Zu viele Anfragen. Bitte warten Sie einen Moment, bevor Sie es erneut versuchen.',
    missingFields: 'Bitte füllen Sie alle erforderlichen Felder aus.',
    invalidEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse an.',
    success:
      'Vielen Dank für Ihre Nachricht! Wir haben Ihnen eine Bestätigungs-E-Mail gesendet und werden uns bald bei Ihnen melden.',
    error:
      'Beim Senden Ihrer Nachricht ist ein Problem aufgetreten. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt telefonisch.',
  },
}

export function getApiMessage(
  language: string,
  key: keyof typeof apiMessages.en
): string {
  const lang = (language in apiMessages ? language : 'en') as SupportedLanguage
  return apiMessages[lang][key]
}
