/**
 * Unit tests for Email Templates
 * SOLID Principles: SRP - Testing single responsibility
 * Design Patterns: Test Pattern with comprehensive coverage
 * Dependencies: Jest, email-templates module
 */

import { describe, it, expect, beforeEach } from '@jest/globals'
import {
  getEmailTemplates,
  getApiMessage,
  type EmailTemplateData,
  apiMessages,
} from '../email-templates'

describe('email-templates', () => {
  let mockEmailData: EmailTemplateData

  beforeEach(() => {
    // Reset mock data for each test
    mockEmailData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890',
      subject: 'general',
      message: 'This is a test message.',
      timestamp: '2024-01-15 10:30:00',
    }
  })

  describe('getEmailTemplates', () => {
    describe('English Language Templates', () => {
      it('should generate English admin templates correctly', () => {
        const templates = getEmailTemplates('en', mockEmailData)

        expect(templates.admin.subject).toBe(
          'John Doe - From ATP Store contact form - General Inquiry'
        )
        expect(templates.admin.html).toContain('New Contact Form Submission')
        expect(templates.admin.html).toContain('John Doe')
        expect(templates.admin.html).toContain('john.doe@example.com')
        expect(templates.admin.html).toContain('+1234567890')
        expect(templates.admin.html).toContain('General Inquiry')
        expect(templates.admin.html).toContain('This is a test message.')
        expect(templates.admin.html).toContain('2024-01-15 10:30:00')
        expect(templates.admin.html).toContain('ATP Store Website')
      })

      it('should generate English user templates correctly', () => {
        const templates = getEmailTemplates('en', mockEmailData)

        expect(templates.user.subject).toBe(
          'Thank you for contacting ATP Store - General Inquiry'
        )
        expect(templates.user.html).toContain('Thank You for Contacting Us!')
        expect(templates.user.html).toContain('Dear John Doe')
        expect(templates.user.html).toContain('General Inquiry')
        expect(templates.user.html).toContain('This is a test message.')
        expect(templates.user.html).toContain('+46 76 196 1113')
        expect(templates.user.html).toContain('+46 76 260 1112')
        expect(templates.user.html).toContain('Monday - Friday, 08:00 - 16:00')
        expect(templates.user.html).toContain('atpstore.se')
        expect(templates.user.html).toContain('Alfe Tissue Paper AB')
      })

      it('should handle missing phone number in English templates', () => {
        const dataWithoutPhone = {
          ...mockEmailData,
          phone: undefined,
        } as unknown as EmailTemplateData
        const templates = getEmailTemplates('en', dataWithoutPhone)

        expect(templates.admin.html).toContain('Not provided')
      })
    })

    describe('Swedish Language Templates', () => {
      it('should generate Swedish admin templates correctly', () => {
        const templates = getEmailTemplates('sv', mockEmailData)

        expect(templates.admin.subject).toBe(
          'John Doe - Från ATP Store kontaktformulär - Allmän förfrågan'
        )
        expect(templates.admin.html).toContain('Ny Kontaktformulär Inlämning')
        expect(templates.admin.html).toContain('ATP Store Webbplats')
        expect(templates.admin.html).toContain('Fullständigt namn:')
        expect(templates.admin.html).toContain('E-post:')
        expect(templates.admin.html).toContain('Telefon:')
        expect(templates.admin.html).toContain('Ämne:')
        expect(templates.admin.html).toContain('Allmän förfrågan')
        expect(templates.admin.html).toContain('Skickat:')
        expect(templates.admin.html).toContain('Meddelande:')
      })

      it('should generate Swedish user templates correctly', () => {
        const templates = getEmailTemplates('sv', mockEmailData)

        expect(templates.user.subject).toBe(
          'Tack för att du kontaktar ATP Store - Allmän förfrågan'
        )
        expect(templates.user.html).toContain('Tack för att du kontaktar oss!')
        expect(templates.user.html).toContain('Kära John Doe')
        expect(templates.user.html).toContain('Dina meddelandedetaljer:')
        expect(templates.user.html).toContain('Allmän förfrågan')
        expect(templates.user.html).toContain('Besök vår webbplats')
        expect(templates.user.html).toContain('ATP Store-teamet')
        expect(templates.user.html).toContain('Måndag - Fredag, 08:00 - 16:00')
      })

      it('should handle missing phone number in Swedish templates', () => {
        const dataWithoutPhone = {
          ...mockEmailData,
          phone: undefined,
        } as unknown as EmailTemplateData
        const templates = getEmailTemplates('sv', dataWithoutPhone)

        expect(templates.admin.html).toContain('Ej angivet')
      })
    })

    describe('Turkish Language Templates', () => {
      it('should generate Turkish admin templates correctly', () => {
        const templates = getEmailTemplates('tr', mockEmailData)

        expect(templates.admin.subject).toBe(
          'John Doe - ATP Store iletişim formundan - Genel Soru'
        )
        expect(templates.admin.html).toContain('Yeni İletişim Formu Gönderimi')
        expect(templates.admin.html).toContain('ATP Store Web Sitesi')
        expect(templates.admin.html).toContain('Ad Soyad:')
        expect(templates.admin.html).toContain('E-posta:')
        expect(templates.admin.html).toContain('Telefon:')
        expect(templates.admin.html).toContain('Konu:')
        expect(templates.admin.html).toContain('Genel Soru')
        expect(templates.admin.html).toContain('Gönderilme Zamanı:')
        expect(templates.admin.html).toContain('Mesaj:')
      })

      it('should generate Turkish user templates correctly', () => {
        const templates = getEmailTemplates('tr', mockEmailData)

        expect(templates.user.subject).toBe(
          "ATP Store'a ulaştığınız için teşekkürler - Genel Soru"
        )
        expect(templates.user.html).toContain(
          'Bize Ulaştığınız İçin Teşekkürler!'
        )
        expect(templates.user.html).toContain('Sayın John Doe')
        expect(templates.user.html).toContain('Mesaj Detaylarınız:')
        expect(templates.user.html).toContain('Genel Soru')
        expect(templates.user.html).toContain('Web Sitemizi Ziyaret Edin')
        expect(templates.user.html).toContain('ATP Store Ekibi')
        expect(templates.user.html).toContain('Pazartesi - Cuma, 08:00 - 16:00')
      })

      it('should handle missing phone number in Turkish templates', () => {
        const dataWithoutPhone = {
          ...mockEmailData,
          phone: undefined,
        } as unknown as EmailTemplateData
        const templates = getEmailTemplates('tr', dataWithoutPhone)

        expect(templates.admin.html).toContain('Belirtilmemiş')
      })
    })

    describe('Language Fallback', () => {
      it('should fallback to English for unsupported language', () => {
        const templates = getEmailTemplates('fr', mockEmailData) // French not supported

        expect(templates.admin.subject).toBe(
          'John Doe - From ATP Store contact form - General Inquiry'
        )
        expect(templates.admin.html).toContain('New Contact Form Submission')
        expect(templates.user.subject).toBe(
          'Thank you for contacting ATP Store - General Inquiry'
        )
        expect(templates.user.html).toContain('Thank You for Contacting Us!')
      })

      it('should fallback to English for empty string language', () => {
        const templates = getEmailTemplates('', mockEmailData)

        expect(templates.admin.subject).toBe(
          'John Doe - From ATP Store contact form - General Inquiry'
        )
      })

      it('should fallback to English for null-ish language', () => {
        const templates = getEmailTemplates(
          null as unknown as string,
          mockEmailData
        )

        expect(templates.admin.subject).toBe(
          'John Doe - From ATP Store contact form - General Inquiry'
        )
      })
    })

    describe('Subject Translation Tests', () => {
      it('should translate sales subject correctly in all languages', () => {
        const salesData = { ...mockEmailData, subject: 'sales' }

        const enTemplates = getEmailTemplates('en', salesData)
        const svTemplates = getEmailTemplates('sv', salesData)
        const trTemplates = getEmailTemplates('tr', salesData)

        expect(enTemplates.admin.subject).toContain('Sales Question')
        expect(svTemplates.admin.subject).toContain('Försäljningsfråga')
        expect(trTemplates.admin.subject).toContain('Satış Sorusu')
      })

      it('should translate support subject correctly in all languages', () => {
        const supportData = { ...mockEmailData, subject: 'support' }

        const enTemplates = getEmailTemplates('en', supportData)
        const svTemplates = getEmailTemplates('sv', supportData)
        const trTemplates = getEmailTemplates('tr', supportData)

        expect(enTemplates.admin.subject).toContain('Technical Support')
        expect(svTemplates.admin.subject).toContain('Teknisk support')
        expect(trTemplates.admin.subject).toContain('Teknik Destek')
      })

      it('should translate partnership subject correctly in all languages', () => {
        const partnershipData = { ...mockEmailData, subject: 'partnership' }

        const enTemplates = getEmailTemplates('en', partnershipData)
        const svTemplates = getEmailTemplates('sv', partnershipData)
        const trTemplates = getEmailTemplates('tr', partnershipData)

        expect(enTemplates.admin.subject).toContain('Partnership')
        expect(svTemplates.admin.subject).toContain('Partnerskap')
        expect(trTemplates.admin.subject).toContain('Ortaklık')
      })

      it('should translate feedback subject correctly in all languages', () => {
        const feedbackData = { ...mockEmailData, subject: 'feedback' }

        const enTemplates = getEmailTemplates('en', feedbackData)
        const svTemplates = getEmailTemplates('sv', feedbackData)
        const trTemplates = getEmailTemplates('tr', feedbackData)

        expect(enTemplates.admin.subject).toContain('Feedback')
        expect(svTemplates.admin.subject).toContain('Feedback')
        expect(trTemplates.admin.subject).toContain('Geri Bildirim')
      })

      it('should handle unknown subject keys by using the key itself', () => {
        const unknownSubjectData = {
          ...mockEmailData,
          subject: 'unknown_subject',
        }

        const templates = getEmailTemplates('en', unknownSubjectData)

        expect(templates.admin.subject).toContain('unknown_subject')
        expect(templates.admin.html).toContain('unknown_subject')
      })
    })

    describe('HTML Content Tests', () => {
      it('should preserve white-space in message content', () => {
        const multiLineData = {
          ...mockEmailData,
          message: 'Line 1\nLine 2\n\nLine 4 with spaces',
        }

        const templates = getEmailTemplates('en', multiLineData)

        expect(templates.admin.html).toContain('white-space: pre-wrap')
        expect(templates.admin.html).toContain(
          'Line 1\nLine 2\n\nLine 4 with spaces'
        )
        expect(templates.user.html).toContain('white-space: pre-wrap')
      })

      it('should include proper mailto links', () => {
        const templates = getEmailTemplates('en', mockEmailData)

        expect(templates.admin.html).toContain(
          'href="mailto:john.doe@example.com"'
        )
        expect(templates.admin.html).toContain('>john.doe@example.com</a>')
      })

      it('should include proper website links', () => {
        const templates = getEmailTemplates('en', mockEmailData)

        expect(templates.user.html).toContain('href="http://atpstore.se"')
        expect(templates.user.html).toContain('Visit Our Website')
      })

      it('should handle empty phone gracefully', () => {
        const noPhoneData = { ...mockEmailData, phone: '' }
        const templates = getEmailTemplates('en', noPhoneData)

        expect(templates.admin.html).toContain('Not provided')
      })
    })

    describe('Template Structure Validation', () => {
      it('should return templates with correct structure', () => {
        const templates = getEmailTemplates('en', mockEmailData)

        expect(templates).toHaveProperty('admin')
        expect(templates).toHaveProperty('user')
        expect(templates.admin).toHaveProperty('subject')
        expect(templates.admin).toHaveProperty('html')
        expect(templates.user).toHaveProperty('subject')
        expect(templates.user).toHaveProperty('html')

        expect(typeof templates.admin.subject).toBe('string')
        expect(typeof templates.admin.html).toBe('string')
        expect(typeof templates.user.subject).toBe('string')
        expect(typeof templates.user.html).toBe('string')
      })

      it('should generate valid HTML structure', () => {
        const templates = getEmailTemplates('en', mockEmailData)

        // Check for proper HTML structure
        expect(templates.admin.html).toContain('<!DOCTYPE html>')
        expect(templates.admin.html).toContain('<html>')
        expect(templates.admin.html).toContain('<head>')
        expect(templates.admin.html).toContain('<body>')
        expect(templates.admin.html).toContain('</html>')

        expect(templates.user.html).toContain('<!DOCTYPE html>')
        expect(templates.user.html).toContain('<html>')
        expect(templates.user.html).toContain('<head>')
        expect(templates.user.html).toContain('<body>')
        expect(templates.user.html).toContain('</html>')
      })
    })
  })

  describe('getApiMessage', () => {
    describe('English API Messages', () => {
      it('should return correct tooManyRequests message in English', () => {
        const message = getApiMessage('en', 'tooManyRequests')
        expect(message).toBe(
          'Too many requests. Please wait a moment before trying again.'
        )
      })

      it('should return correct missingFields message in English', () => {
        const message = getApiMessage('en', 'missingFields')
        expect(message).toBe('Please fill in all required fields.')
      })

      it('should return correct invalidEmail message in English', () => {
        const message = getApiMessage('en', 'invalidEmail')
        expect(message).toBe('Please provide a valid email address.')
      })

      it('should return correct success message in English', () => {
        const message = getApiMessage('en', 'success')
        expect(message).toBe(
          'Thank you for your message! We have sent you a confirmation email and will get back to you soon.'
        )
      })

      it('should return correct error message in English', () => {
        const message = getApiMessage('en', 'error')
        expect(message).toBe(
          'We encountered an issue sending your message. Please try again later or contact us directly by phone.'
        )
      })
    })

    describe('Swedish API Messages', () => {
      it('should return correct tooManyRequests message in Swedish', () => {
        const message = getApiMessage('sv', 'tooManyRequests')
        expect(message).toBe(
          'För många förfrågningar. Vänta en stund innan du försöker igen.'
        )
      })

      it('should return correct missingFields message in Swedish', () => {
        const message = getApiMessage('sv', 'missingFields')
        expect(message).toBe('Vänligen fyll i alla obligatoriska fält.')
      })

      it('should return correct invalidEmail message in Swedish', () => {
        const message = getApiMessage('sv', 'invalidEmail')
        expect(message).toBe('Vänligen ange en giltig e-postadress.')
      })

      it('should return correct success message in Swedish', () => {
        const message = getApiMessage('sv', 'success')
        expect(message).toBe(
          'Tack för ditt meddelande! Vi har skickat dig ett bekräftelsemail och återkommer snart.'
        )
      })

      it('should return correct error message in Swedish', () => {
        const message = getApiMessage('sv', 'error')
        expect(message).toBe(
          'Vi stötte på ett problem när vi skickade ditt meddelande. Försök igen senare eller kontakta oss direkt per telefon.'
        )
      })
    })

    describe('Turkish API Messages', () => {
      it('should return correct tooManyRequests message in Turkish', () => {
        const message = getApiMessage('tr', 'tooManyRequests')
        expect(message).toBe(
          'Çok fazla istek. Tekrar denemeden önce lütfen biraz bekleyin.'
        )
      })

      it('should return correct missingFields message in Turkish', () => {
        const message = getApiMessage('tr', 'missingFields')
        expect(message).toBe('Lütfen tüm zorunlu alanları doldurun.')
      })

      it('should return correct invalidEmail message in Turkish', () => {
        const message = getApiMessage('tr', 'invalidEmail')
        expect(message).toBe('Lütfen geçerli bir e-posta adresi girin.')
      })

      it('should return correct success message in Turkish', () => {
        const message = getApiMessage('tr', 'success')
        expect(message).toBe(
          'Mesajınız için teşekkürler! Size bir onay e-postası gönderdik ve en kısa sürede size geri döneceğiz.'
        )
      })

      it('should return correct error message in Turkish', () => {
        const message = getApiMessage('tr', 'error')
        expect(message).toBe(
          'Mesajınızı gönderirken bir sorunla karşılaştık. Lütfen daha sonra tekrar deneyin veya bizi doğrudan telefonla arayın.'
        )
      })
    })

    describe('API Message Language Fallback', () => {
      it('should fallback to English for unsupported language', () => {
        const message = getApiMessage('fr', 'success') // French not supported
        expect(message).toBe(
          'Thank you for your message! We have sent you a confirmation email and will get back to you soon.'
        )
      })

      it('should fallback to English for empty string language', () => {
        const message = getApiMessage('', 'error')
        expect(message).toBe(
          'We encountered an issue sending your message. Please try again later or contact us directly by phone.'
        )
      })

      it('should fallback to English for undefined language', () => {
        const message = getApiMessage(
          undefined as unknown as string,
          'invalidEmail'
        )
        expect(message).toBe('Please provide a valid email address.')
      })
    })

    describe('All Message Keys Coverage', () => {
      it('should have all required message keys in all languages', () => {
        const expectedKeys: Array<keyof typeof apiMessages.en> = [
          'tooManyRequests',
          'missingFields',
          'invalidEmail',
          'success',
          'error',
        ]

        expectedKeys.forEach(key => {
          expect(getApiMessage('en', key)).toBeDefined()
          expect(getApiMessage('sv', key)).toBeDefined()
          expect(getApiMessage('tr', key)).toBeDefined()
          expect(typeof getApiMessage('en', key)).toBe('string')
          expect(typeof getApiMessage('sv', key)).toBe('string')
          expect(typeof getApiMessage('tr', key)).toBe('string')
          expect(getApiMessage('en', key).length).toBeGreaterThan(0)
          expect(getApiMessage('sv', key).length).toBeGreaterThan(0)
          expect(getApiMessage('tr', key).length).toBeGreaterThan(0)
        })
      })
    })
  })

  describe('Internal Function Coverage', () => {
    it('should test getTranslatedSubject with valid language and key', () => {
      // This tests the true branch of: language in subjectTranslations ? language : 'en'
      const templates = getEmailTemplates('sv', {
        ...mockEmailData,
        subject: 'sales',
      })
      expect(templates.admin.subject).toContain('Försäljningsfråga')
    })

    it('should test getTranslatedSubject with invalid language', () => {
      // This tests the false branch of: language in subjectTranslations ? language : 'en'
      const templates = getEmailTemplates('invalid-lang', {
        ...mockEmailData,
        subject: 'sales',
      })
      expect(templates.admin.subject).toContain('Sales Question') // Should fallback to English
    })

    it('should test getTranslatedSubject with valid language but unknown subject key', () => {
      // This tests the fallback: translations[subjectKey] || subjectKey
      const templates = getEmailTemplates('en', {
        ...mockEmailData,
        subject: 'unknown-key',
      })
      expect(templates.admin.subject).toContain('unknown-key') // Should return the key itself
    })

    it('should handle all variations of language existence check', () => {
      // Test different types of language values to ensure complete branch coverage
      const testSubject = 'general'

      // Test with null (should convert to string "null" and fallback to en)
      const nullLangTemplates = getEmailTemplates(null as unknown as string, {
        ...mockEmailData,
        subject: testSubject,
      })
      expect(nullLangTemplates.admin.subject).toContain('General Inquiry')

      // Test with undefined (should convert to string "undefined" and fallback to en)
      const undefinedLangTemplates = getEmailTemplates(
        undefined as unknown as string,
        {
          ...mockEmailData,
          subject: testSubject,
        }
      )
      expect(undefinedLangTemplates.admin.subject).toContain('General Inquiry')

      // Test with number (should convert to string and fallback to en)
      const numberLangTemplates = getEmailTemplates(123 as unknown as string, {
        ...mockEmailData,
        subject: testSubject,
      })
      expect(numberLangTemplates.admin.subject).toContain('General Inquiry')
    })

    it('should test complete branch coverage for all ternary operators', () => {
      // Test getEmailTemplates supported languages individually
      const enTemplates = getEmailTemplates('en', mockEmailData)
      expect(enTemplates.admin.subject).toBeDefined()

      const svTemplates = getEmailTemplates('sv', mockEmailData)
      expect(svTemplates.admin.subject).toBeDefined()

      const trTemplates = getEmailTemplates('tr', mockEmailData)
      expect(trTemplates.admin.subject).toBeDefined()

      // Test getEmailTemplates with unsupported language (should fallback)
      const unsupportedTemplate = getEmailTemplates('xyz', mockEmailData)
      expect(unsupportedTemplate.admin.subject).toContain('General Inquiry')

      // Test getApiMessage supported languages individually
      const enMessage = getApiMessage('en', 'success')
      expect(enMessage).toBeDefined()

      const svMessage = getApiMessage('sv', 'success')
      expect(svMessage).toBeDefined()

      const trMessage = getApiMessage('tr', 'success')
      expect(trMessage).toBeDefined()

      // Test getApiMessage with unsupported language (should fallback)
      const unsupportedMessage = getApiMessage('xyz', 'success')
      expect(unsupportedMessage).toBe(
        'Thank you for your message! We have sent you a confirmation email and will get back to you soon.'
      )
    })

    it('should test subject key fallback logic specifically', () => {
      // This should test the `|| subjectKey` fallback in line 46
      // Create data with a subject that doesn't exist in any translation
      const dataWithUnknownSubject = {
        ...mockEmailData,
        subject: 'definitely-not-a-real-key',
      }

      // Test each language to ensure they all fallback to the key itself
      const enTemplate = getEmailTemplates('en', dataWithUnknownSubject)
      expect(enTemplate.admin.subject).toContain('definitely-not-a-real-key')
      expect(enTemplate.user.subject).toContain('definitely-not-a-real-key')

      const svTemplate = getEmailTemplates('sv', dataWithUnknownSubject)
      expect(svTemplate.admin.subject).toContain('definitely-not-a-real-key')
      expect(svTemplate.user.subject).toContain('definitely-not-a-real-key')

      const trTemplate = getEmailTemplates('tr', dataWithUnknownSubject)
      expect(trTemplate.admin.subject).toContain('definitely-not-a-real-key')
      expect(trTemplate.user.subject).toContain('definitely-not-a-real-key')
    })

    it('should cover all language branches in getTranslatedSubject', () => {
      // Test each language specifically to ensure all branches are covered
      const testData = { ...mockEmailData, subject: 'general' }

      // English (direct key exists)
      const enTemplates = getEmailTemplates('en', testData)
      expect(enTemplates.admin.subject).toContain('General Inquiry')

      // Swedish (direct key exists)
      const svTemplates = getEmailTemplates('sv', testData)
      expect(svTemplates.admin.subject).toContain('Allmän förfrågan')

      // Turkish (direct key exists)
      const trTemplates = getEmailTemplates('tr', testData)
      expect(trTemplates.admin.subject).toContain('Genel Soru')

      // German (direct key exists)
      const deTemplates = getEmailTemplates('de', testData)
      expect(deTemplates.admin.subject).toContain('Allgemeine Anfrage')

      // Danish (direct key exists)
      const daTemplates = getEmailTemplates('da', testData)
      expect(daTemplates.admin.subject).toContain('Generel forespørgsel')

      // Unsupported language (should fallback to English)
      const unsupportedTemplates = getEmailTemplates('fr', testData)
      expect(unsupportedTemplates.admin.subject).toContain('General Inquiry')
    })
  })

  describe('Edge Cases and Error Scenarios', () => {
    it('should handle extremely long names', () => {
      const longNameData = {
        ...mockEmailData,
        name: 'A'.repeat(1000),
      }
      const templates = getEmailTemplates('en', longNameData)

      expect(templates.admin.subject).toContain('A'.repeat(1000))
      expect(templates.admin.html).toContain('A'.repeat(1000))
    })

    it('should handle extremely long messages', () => {
      const longMessageData = {
        ...mockEmailData,
        message: 'Test message. '.repeat(100),
      }
      const templates = getEmailTemplates('en', longMessageData)

      expect(templates.admin.html).toContain('Test message. '.repeat(100))
      expect(templates.user.html).toContain('Test message. '.repeat(100))
    })

    it('should handle special characters in data', () => {
      const specialCharData = {
        ...mockEmailData,
        name: 'John "Special" <Doe> & Co',
        email: 'test+special@example.com',
        message: 'Message with <html> & "quotes" and special chars: åäö',
      }
      const templates = getEmailTemplates('en', specialCharData)

      expect(templates.admin.html).toContain('John "Special" <Doe> & Co')
      expect(templates.admin.html).toContain('test+special@example.com')
      expect(templates.admin.html).toContain('Message with <html> & "quotes"')
      expect(templates.admin.html).toContain('åäö')
    })

    it('should handle empty string values', () => {
      const emptyData = {
        ...mockEmailData,
        name: '',
        email: '',
        message: '',
        timestamp: '',
      }
      const templates = getEmailTemplates('en', emptyData)

      expect(typeof templates.admin.subject).toBe('string')
      expect(typeof templates.admin.html).toBe('string')
      expect(templates.admin.html).toContain('</html>')
    })
  })
})
