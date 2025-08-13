/**
 * Unit tests for DeliveriesHeader component
 * SOLID Principles: SRP - Single responsibility for header testing
 * Design Patterns: AAA (Arrange, Act, Assert) Testing Pattern
 * Dependencies: React Testing Library, Jest
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import { DeliveriesHeader } from '../deliveries-header'
import { useTranslation } from 'react-i18next'

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}))

describe('DeliveriesHeader', () => {
  const mockT = jest.fn((key: string) => {
    const translations: Record<string, string> = {
      'pages.deliveries.title': 'Deliveries Management',
      'pages.deliveries.description': 'Manage and track all delivery orders',
    }
    return translations[key] || key
  })

  const mockUseTranslation = useTranslation as jest.MockedFunction<
    typeof useTranslation
  >

  beforeEach(() => {
    jest.clearAllMocks()

    // Setup translation mock
    mockUseTranslation.mockReturnValue({
      t: mockT as unknown as ReturnType<typeof useTranslation>['t'],
      i18n: {} as ReturnType<typeof useTranslation>['i18n'],
      ready: true,
    } as unknown as ReturnType<typeof useTranslation>)
  })

  describe('Component Rendering', () => {
    it('renders without crashing', () => {
      expect(() => render(<DeliveriesHeader />)).not.toThrow()
    })

    it('renders container div', () => {
      render(<DeliveriesHeader />)

      const container = screen.getByText('Deliveries Management').parentElement
      expect(container).toBeInTheDocument()
      expect(container?.tagName).toBe('DIV')
    })
  })

  describe('Title Rendering', () => {
    it('renders title heading', () => {
      render(<DeliveriesHeader />)

      const title = screen.getByText('Deliveries Management')
      expect(title).toBeInTheDocument()
    })

    it('renders title as h1 element', () => {
      render(<DeliveriesHeader />)

      const title = screen.getByText('Deliveries Management')
      expect(title.tagName).toBe('H1')
    })

    it('applies correct classes to title', () => {
      render(<DeliveriesHeader />)

      const title = screen.getByText('Deliveries Management')
      expect(title).toHaveClass('text-3xl', 'font-bold', 'text-foreground')
    })

    it('uses correct translation key for title', () => {
      render(<DeliveriesHeader />)

      expect(mockT).toHaveBeenCalledWith('pages.deliveries.title')
    })
  })

  describe('Description Rendering', () => {
    it('renders description text', () => {
      render(<DeliveriesHeader />)

      const description = screen.getByText(
        'Manage and track all delivery orders'
      )
      expect(description).toBeInTheDocument()
    })

    it('renders description as paragraph element', () => {
      render(<DeliveriesHeader />)

      const description = screen.getByText(
        'Manage and track all delivery orders'
      )
      expect(description.tagName).toBe('P')
    })

    it('applies correct classes to description', () => {
      render(<DeliveriesHeader />)

      const description = screen.getByText(
        'Manage and track all delivery orders'
      )
      expect(description).toHaveClass('text-muted-foreground', 'mt-2')
    })

    it('uses correct translation key for description', () => {
      render(<DeliveriesHeader />)

      expect(mockT).toHaveBeenCalledWith('pages.deliveries.description')
    })
  })

  describe('Translation Integration', () => {
    it('calls useTranslation with correct namespace', () => {
      render(<DeliveriesHeader />)

      expect(useTranslation).toHaveBeenCalledWith('admin')
    })

    it('calls translation function exactly twice', () => {
      render(<DeliveriesHeader />)

      expect(mockT).toHaveBeenCalledTimes(2)
    })

    it('renders correctly with different translations', () => {
      const customMockT = jest.fn((key: string) => {
        const translations: Record<string, string> = {
          'pages.deliveries.title': 'Custom Title',
          'pages.deliveries.description': 'Custom Description',
        }
        return translations[key] || key
      })

      mockUseTranslation.mockReturnValue({
        t: customMockT as unknown as ReturnType<typeof useTranslation>['t'],
        i18n: {} as ReturnType<typeof useTranslation>['i18n'],
        ready: true,
      } as unknown as ReturnType<typeof useTranslation>)

      render(<DeliveriesHeader />)

      expect(screen.getByText('Custom Title')).toBeInTheDocument()
      expect(screen.getByText('Custom Description')).toBeInTheDocument()
    })

    it('handles missing translation keys gracefully', () => {
      const mockTWithMissingKeys = jest.fn((key: string) => key)

      mockUseTranslation.mockReturnValue({
        t: mockTWithMissingKeys as unknown as ReturnType<
          typeof useTranslation
        >['t'],
        i18n: {} as ReturnType<typeof useTranslation>['i18n'],
        ready: true,
      } as unknown as ReturnType<typeof useTranslation>)

      render(<DeliveriesHeader />)

      expect(screen.getByText('pages.deliveries.title')).toBeInTheDocument()
      expect(
        screen.getByText('pages.deliveries.description')
      ).toBeInTheDocument()
    })
  })

  describe('Component Structure', () => {
    it('maintains correct DOM hierarchy', () => {
      render(<DeliveriesHeader />)

      const container = screen.getByText('Deliveries Management').parentElement
      const title = screen.getByText('Deliveries Management')
      const description = screen.getByText(
        'Manage and track all delivery orders'
      )

      expect(container).toContainElement(title)
      expect(container).toContainElement(description)
    })

    it('renders elements in correct order', () => {
      render(<DeliveriesHeader />)

      const container = screen.getByText('Deliveries Management').parentElement
      const children = container?.children

      expect(children).toHaveLength(2)
      expect(children?.[0]).toHaveTextContent('Deliveries Management')
      expect(children?.[1]).toHaveTextContent(
        'Manage and track all delivery orders'
      )
    })
  })

  describe('Styling Classes', () => {
    it('applies all title classes correctly', () => {
      render(<DeliveriesHeader />)

      const title = screen.getByText('Deliveries Management')
      const classes = title.className.split(' ')

      expect(classes).toContain('text-3xl')
      expect(classes).toContain('font-bold')
      expect(classes).toContain('text-foreground')
    })

    it('applies all description classes correctly', () => {
      render(<DeliveriesHeader />)

      const description = screen.getByText(
        'Manage and track all delivery orders'
      )
      const classes = description.className.split(' ')

      expect(classes).toContain('text-muted-foreground')
      expect(classes).toContain('mt-2')
    })
  })

  describe('Reusability', () => {
    it('renders consistently on multiple renders', () => {
      const { rerender } = render(<DeliveriesHeader />)

      const firstTitle = screen.getByText('Deliveries Management').textContent
      const firstDescription = screen.getByText(
        'Manage and track all delivery orders'
      ).textContent

      rerender(<DeliveriesHeader />)

      expect(screen.getByText('Deliveries Management').textContent).toBe(
        firstTitle
      )
      expect(
        screen.getByText('Manage and track all delivery orders').textContent
      ).toBe(firstDescription)
    })

    it('does not create duplicate elements on rerender', () => {
      const { rerender } = render(<DeliveriesHeader />)

      rerender(<DeliveriesHeader />)

      const titles = screen.getAllByText('Deliveries Management')
      const descriptions = screen.getAllByText(
        'Manage and track all delivery orders'
      )

      expect(titles).toHaveLength(1)
      expect(descriptions).toHaveLength(1)
    })
  })

  describe('Accessibility', () => {
    it('uses semantic HTML elements', () => {
      render(<DeliveriesHeader />)

      const heading = document.querySelector('h1')
      const paragraph = document.querySelector('p')

      expect(heading).toBeInTheDocument()
      expect(paragraph).toBeInTheDocument()
    })

    it('provides proper heading hierarchy', () => {
      render(<DeliveriesHeader />)

      const h1Elements = document.querySelectorAll('h1')
      expect(h1Elements).toHaveLength(1)
    })
  })

  describe('Edge Cases', () => {
    it('handles empty translation values', () => {
      const emptyMockT = jest.fn(() => '')

      mockUseTranslation.mockReturnValue({
        t: emptyMockT as unknown as ReturnType<typeof useTranslation>['t'],
        i18n: {} as ReturnType<typeof useTranslation>['i18n'],
        ready: true,
      } as unknown as ReturnType<typeof useTranslation>)

      render(<DeliveriesHeader />)

      const heading = document.querySelector('h1')
      const paragraph = document.querySelector('p')

      expect(heading).toBeInTheDocument()
      expect(paragraph).toBeInTheDocument()
      expect(heading).toHaveTextContent('')
      expect(paragraph).toHaveTextContent('')
    })

    it('handles very long translation values', () => {
      const longTextMockT = jest.fn((key: string) => {
        const translations: Record<string, string> = {
          'pages.deliveries.title': 'A'.repeat(200),
          'pages.deliveries.description': 'B'.repeat(500),
        }
        return translations[key] || key
      })

      mockUseTranslation.mockReturnValue({
        t: longTextMockT as unknown as ReturnType<typeof useTranslation>['t'],
        i18n: {} as ReturnType<typeof useTranslation>['i18n'],
        ready: true,
      } as unknown as ReturnType<typeof useTranslation>)

      render(<DeliveriesHeader />)

      expect(screen.getByText('A'.repeat(200))).toBeInTheDocument()
      expect(screen.getByText('B'.repeat(500))).toBeInTheDocument()
    })

    it('handles special characters in translations', () => {
      const specialCharMockT = jest.fn((key: string) => {
        const translations: Record<string, string> = {
          'pages.deliveries.title': 'Deliveries & Orders <Management>',
          'pages.deliveries.description': 'Track "all" orders & deliveries!',
        }
        return translations[key] || key
      })

      mockUseTranslation.mockReturnValue({
        t: specialCharMockT as unknown as ReturnType<
          typeof useTranslation
        >['t'],
        i18n: {} as ReturnType<typeof useTranslation>['i18n'],
        ready: true,
      } as unknown as ReturnType<typeof useTranslation>)

      render(<DeliveriesHeader />)

      expect(
        screen.getByText('Deliveries & Orders <Management>')
      ).toBeInTheDocument()
      expect(
        screen.getByText('Track "all" orders & deliveries!')
      ).toBeInTheDocument()
    })
  })
})
