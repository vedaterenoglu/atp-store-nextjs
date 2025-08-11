/**
 * Unit tests for AboutUsTemplate component
 * SOLID Principles: SRP - Single responsibility for template testing
 * Design Patterns: AAA (Arrange, Act, Assert) Testing Pattern
 * Dependencies: React Testing Library, Jest
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import { AboutUsTemplate } from '../AboutUsTemplate'
import { useTranslation } from 'react-i18next'

// Mock interfaces - none needed for this test file

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}))

// Mock About Us components individually
jest.mock('@/components/about-us/molecules/ImageSlider', () => ({
  ImageSlider: jest.fn(() => <div data-testid="image-slider">Image Slider</div>),
}))

jest.mock('@/components/about-us/molecules/AboutTitle', () => ({
  AboutTitle: jest.fn(() => <div data-testid="about-title">About Title</div>),
}))

jest.mock('@/components/about-us/molecules/AboutContent', () => ({
  AboutContent: jest.fn(() => <div data-testid="about-content">About Content</div>),
}))

jest.mock('@/components/about-us/molecules/ContactInfo', () => ({
  ContactInfo: jest.fn(() => <div data-testid="contact-info">Contact Info</div>),
}))

jest.mock('@/components/about-us/molecules/GoogleMapsEmbed', () => ({
  GoogleMapsEmbed: jest.fn(() => <div data-testid="google-maps">Google Maps</div>),
}))

jest.mock('@/components/about-us/organisms/ContactForm', () => ({
  ContactForm: jest.fn(() => <div data-testid="contact-form">Contact Form</div>),
}))

// Mock style utilities
jest.mock('@/lib/styles/utilities', () => ({
  getPageClasses: jest.fn(({ section }: { section: string }) => {
    if (section === 'container') return 'min-h-screen'
    if (section === 'section') return 'px-4 sm:px-6 lg:px-8'
    return ''
  }),
  getContainerClasses: jest.fn(({ withPadding }: { size?: string; withPadding?: boolean }) => {
    const classes = ['mx-auto', 'max-w-7xl']
    if (withPadding !== false) {
      classes.push('px-4', 'sm:px-6', 'lg:px-8')
    }
    return classes.join(' ')
  }),
  getSpacingClasses: jest.fn(({ y }: { y: string }) => {
    if (y === 'xl') return 'py-8 sm:py-12 lg:py-16'
    return ''
  }),
  getGridClasses: jest.fn(({ gap }: { gap: string; responsive?: boolean }) => {
    const classes = ['grid']
    if (gap === 'lg') {
      classes.push('gap-6', 'sm:gap-8')
    }
    return classes.join(' ')
  }),
}))

// Mock cn utility
jest.mock('@/lib/utils', () => ({
  cn: jest.fn((...classes: (string | undefined)[]) => 
    classes.filter(Boolean).join(' ')
  ),
}))

describe('AboutUsTemplate', () => {
  const mockT = jest.fn((key: string) => {
    const translations: Record<string, string> = {
      'location.title': 'Our Location',
      'contact.title': 'Contact Us',
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

  describe('Component Structure', () => {
    it('renders all major sections', () => {
      render(<AboutUsTemplate />)

      // Check for main container
      const mainContainer = screen
        .getByTestId('image-slider')
        .closest('.min-h-screen')
      expect(mainContainer).toBeInTheDocument()

      // Check all child components are rendered
      expect(screen.getByTestId('image-slider')).toBeInTheDocument()
      expect(screen.getByTestId('about-title')).toBeInTheDocument()
      expect(screen.getByTestId('about-content')).toBeInTheDocument()
      expect(screen.getByTestId('google-maps')).toBeInTheDocument()
      expect(screen.getByTestId('contact-form')).toBeInTheDocument()
      expect(screen.getByTestId('contact-info')).toBeInTheDocument()
    })

    it('renders section headings with translations', () => {
      render(<AboutUsTemplate />)

      expect(screen.getByText('Our Location')).toBeInTheDocument()
      expect(screen.getByText('Contact Us')).toBeInTheDocument()
    })

    it('calls useTranslation with correct namespace', () => {
      render(<AboutUsTemplate />)

      expect(useTranslation).toHaveBeenCalledWith('aboutUs')
    })

    it('uses translation function for headings', () => {
      render(<AboutUsTemplate />)

      expect(mockT).toHaveBeenCalledWith('location.title')
      expect(mockT).toHaveBeenCalledWith('contact.title')
    })
  })

  describe('Layout Structure', () => {
    it('renders hero section with correct structure', () => {
      render(<AboutUsTemplate />)

      const heroSection = screen.getByTestId('image-slider').closest('section')
      expect(heroSection).toHaveClass('relative', 'w-full')
    })

    it('renders about content section with correct styling', () => {
      render(<AboutUsTemplate />)

      const aboutSection = screen.getByTestId('about-title').closest('section')
      expect(aboutSection).toHaveClass(
        'px-4',
        'sm:px-6',
        'lg:px-8',
        'py-8',
        'sm:py-12',
        'lg:py-16'
      )

      const aboutContainer = screen
        .getByTestId('about-title')
        .closest('.max-w-7xl')
      expect(aboutContainer).toHaveClass('mx-auto', 'max-w-7xl')
    })

    it('renders location section with background styling', () => {
      render(<AboutUsTemplate />)

      const locationSection = screen
        .getByText('Our Location')
        .closest('section')
      expect(locationSection).toHaveClass(
        'py-8',
        'sm:py-12',
        'lg:py-16',
        'bg-muted/50'
      )

      const locationContainer = screen
        .getByText('Our Location')
        .closest('.max-w-7xl')
      expect(locationContainer).toHaveClass(
        'mx-auto',
        'max-w-7xl',
        'px-4',
        'sm:px-6',
        'lg:px-8'
      )
    })

    it('renders contact section with grid layout', () => {
      render(<AboutUsTemplate />)

      const contactSection = screen.getByText('Contact Us').closest('section')
      expect(contactSection).toHaveClass(
        'px-4',
        'sm:px-6',
        'lg:px-8',
        'py-8',
        'sm:py-12',
        'lg:py-16'
      )

      const gridContainer = screen.getByTestId('contact-info').closest('.grid')
      expect(gridContainer).toHaveClass(
        'grid',
        'grid-cols-1',
        'lg:grid-cols-2',
        'gap-6',
        'sm:gap-8'
      )
    })
  })

  describe('Heading Styles', () => {
    it('renders location heading with correct styles', () => {
      render(<AboutUsTemplate />)

      const locationHeading = screen.getByText('Our Location')
      expect(locationHeading.tagName).toBe('H2')
      expect(locationHeading).toHaveClass(
        'text-3xl',
        'font-bold',
        'text-center',
        'mb-8'
      )
    })

    it('renders contact heading with correct styles', () => {
      render(<AboutUsTemplate />)

      const contactHeading = screen.getByText('Contact Us')
      expect(contactHeading.tagName).toBe('H2')
      expect(contactHeading).toHaveClass(
        'text-3xl',
        'font-bold',
        'text-center',
        'mb-12'
      )
    })
  })

  describe('Component Integration', () => {
    it('renders ImageSlider in hero section', () => {
      render(<AboutUsTemplate />)

      const slider = screen.getByTestId('image-slider')
      const heroSection = slider.closest('section')
      expect(heroSection).toBeInTheDocument()
      expect(heroSection?.previousElementSibling).toBeNull() // First section
    })

    it('renders AboutTitle and AboutContent together', () => {
      render(<AboutUsTemplate />)

      const title = screen.getByTestId('about-title')
      const content = screen.getByTestId('about-content')

      // They should be in the same container
      expect(title.parentElement).toBe(content.parentElement)
    })

    it('renders GoogleMapsEmbed in location section', () => {
      render(<AboutUsTemplate />)

      const maps = screen.getByTestId('google-maps')
      const locationSection = screen
        .getByText('Our Location')
        .closest('section')
      expect(locationSection).toContainElement(maps)
    })

    it('renders ContactInfo and ContactForm in grid layout', () => {
      render(<AboutUsTemplate />)

      const info = screen.getByTestId('contact-info')
      const form = screen.getByTestId('contact-form')

      // They should be in the same grid container
      expect(info.parentElement).toBe(form.parentElement)
      expect(info.parentElement).toHaveClass('grid')
    })
  })

  describe('Responsive Design', () => {
    it('applies responsive padding classes', () => {
      render(<AboutUsTemplate />)

      // Check about section responsive padding
      const aboutSection = screen.getByTestId('about-title').closest('section')
      expect(aboutSection).toHaveClass('px-4', 'sm:px-6', 'lg:px-8')

      // Check location section responsive padding
      const locationContainer = screen
        .getByText('Our Location')
        .closest('.max-w-7xl')
      expect(locationContainer).toHaveClass('px-4', 'sm:px-6', 'lg:px-8')

      // Check contact section responsive padding
      const contactSection = screen.getByText('Contact Us').closest('section')
      expect(contactSection).toHaveClass('px-4', 'sm:px-6', 'lg:px-8')
    })

    it('applies responsive grid for contact section', () => {
      render(<AboutUsTemplate />)

      const gridContainer = screen.getByTestId('contact-info').closest('.grid')
      expect(gridContainer).toHaveClass('grid-cols-1', 'lg:grid-cols-2')
    })
  })

  describe('Container Constraints', () => {
    it('applies max-width constraint to content sections', () => {
      render(<AboutUsTemplate />)

      // About section
      const aboutContainer = screen
        .getByTestId('about-title')
        .closest('.max-w-7xl')
      expect(aboutContainer).toHaveClass('mx-auto', 'max-w-7xl')

      // Location section
      const locationContainer = screen
        .getByText('Our Location')
        .closest('.max-w-7xl')
      expect(locationContainer).toHaveClass('mx-auto', 'max-w-7xl')

      // Contact section
      const contactContainer = screen
        .getByText('Contact Us')
        .closest('.max-w-7xl')
      expect(contactContainer).toHaveClass('mx-auto', 'max-w-7xl')
    })
  })

  describe('Section Order', () => {
    it('renders sections in correct order', () => {
      render(<AboutUsTemplate />)

      const sections = document.querySelectorAll('section')

      // Should have 4 sections
      expect(sections).toHaveLength(4)

      // Check order by content
      expect(sections[0]).toContainElement(screen.getByTestId('image-slider'))
      expect(sections[1]).toContainElement(screen.getByTestId('about-title'))
      expect(sections[2]).toContainElement(screen.getByTestId('google-maps'))
      expect(sections[3]).toContainElement(screen.getByTestId('contact-form'))
    })
  })

  describe('Component Rendering', () => {
    it('renders without crashing', () => {
      expect(() => render(<AboutUsTemplate />)).not.toThrow()
    })

    it('renders all components exactly once', () => {
      render(<AboutUsTemplate />)

      expect(screen.getAllByTestId('image-slider')).toHaveLength(1)
      expect(screen.getAllByTestId('about-title')).toHaveLength(1)
      expect(screen.getAllByTestId('about-content')).toHaveLength(1)
      expect(screen.getAllByTestId('google-maps')).toHaveLength(1)
      expect(screen.getAllByTestId('contact-form')).toHaveLength(1)
      expect(screen.getAllByTestId('contact-info')).toHaveLength(1)
    })
  })

  describe('Accessibility', () => {
    it('uses semantic HTML sections', () => {
      render(<AboutUsTemplate />)

      const sections = document.querySelectorAll('section')
      expect(sections.length).toBeGreaterThan(0)
    })

    it('uses proper heading hierarchy', () => {
      render(<AboutUsTemplate />)

      const h2Elements = document.querySelectorAll('h2')
      expect(h2Elements).toHaveLength(2) // Location and Contact headings
    })
  })

  describe('Gap and Spacing', () => {
    it('applies correct gap in contact grid', () => {
      render(<AboutUsTemplate />)

      const gridContainer = screen.getByTestId('contact-info').closest('.grid')
      expect(gridContainer).toHaveClass('gap-6', 'sm:gap-8')
    })

    it('applies correct margin to location heading', () => {
      render(<AboutUsTemplate />)

      const locationHeading = screen.getByText('Our Location')
      expect(locationHeading).toHaveClass('mb-8')
    })

    it('applies correct margin to contact heading', () => {
      render(<AboutUsTemplate />)

      const contactHeading = screen.getByText('Contact Us')
      expect(contactHeading).toHaveClass('mb-12')
    })
  })
})