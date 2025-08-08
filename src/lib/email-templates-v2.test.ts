/**
 * Email Templates v2 Tests - Customer ID functionality
 * SOLID Principles: SRP - Testing email template generation
 * Design Patterns: Unit Test Pattern
 * Dependencies: Jest
 */

import {
  generateEmailTemplates,
  type EmailTemplateData,
} from './email-templates-v2'

describe('Email Templates v2 - Customer ID Support', () => {
  const baseData: EmailTemplateData = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+46 70 123 4567',
    subject: 'general',
    message: 'This is a test message',
    timestamp: '2024-01-01 12:00',
    language: 'en',
  }

  describe('Customer ID in Admin Email (Swedish)', () => {
    it('should include customer ID when provided', () => {
      const dataWithId = {
        ...baseData,
        customerid: 'cust_123abc456def',
      }

      const result = generateEmailTemplates(dataWithId)

      expect(result.admin.html).toContain('Kund-ID')
      expect(result.admin.html).toContain('cust_123abc456def')
    })

    it('should show "Ej angivet" when customer ID is not provided', () => {
      const result = generateEmailTemplates(baseData)

      expect(result.admin.html).toContain('Kund-ID')
      expect(result.admin.html).toContain('Ej angivet')
    })
  })

  describe('Customer ID in Customer Email', () => {
    const languages: Array<EmailTemplateData['language']> = [
      'en',
      'sv',
      'tr',
      'da',
      'de',
    ]
    const expectedLabels = {
      en: 'Customer ID',
      sv: 'Kund-ID',
      tr: 'Müşteri Numarası',
      da: 'Kunde-ID',
      de: 'Kundennummer',
    }

    languages.forEach(lang => {
      it(`should include customer ID in ${lang} when provided`, () => {
        const dataWithId = {
          ...baseData,
          customerid: 'cust_123abc456def',
          ...(lang && { language: lang }),
        }

        const result = generateEmailTemplates(dataWithId)

        expect(result.customer.html).toContain(expectedLabels[lang!])
        expect(result.customer.html).toContain('cust_123abc456def')
      })

      it(`should not show customer ID section in ${lang} when not provided`, () => {
        const dataWithoutId = {
          ...baseData,
          ...(lang && { language: lang }),
        }

        const result = generateEmailTemplates(dataWithoutId)

        // The customer ID section should not be rendered at all when not provided
        expect(result.customer.html).not.toContain(expectedLabels[lang!])
      })
    })
  })

  describe('Subject Line Generation', () => {
    it('should not include customer ID in subject lines', () => {
      const dataWithId = {
        ...baseData,
        customerid: 'cust_123abc456def',
      }

      const result = generateEmailTemplates(dataWithId)

      expect(result.admin.subject).not.toContain('cust_123abc456def')
      expect(result.customer.subject).not.toContain('cust_123abc456def')
    })
  })
})
