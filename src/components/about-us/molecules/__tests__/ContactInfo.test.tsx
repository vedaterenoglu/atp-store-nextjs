/**
 * Unit tests for ContactInfo Component
 * SOLID Principles: SRP - Testing single responsibility
 * Design Patterns: AAA Pattern (Arrange, Act, Assert)
 * Dependencies: Jest, Testing Library, React
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import { ContactInfo } from '../ContactInfo'
import { useTranslation } from 'react-i18next'

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}))

// Mock lucide-react icons with proper typing
interface IconProps {
  className?: string
}

jest.mock('lucide-react', () => ({
  MapPin: jest.fn(({ className }: IconProps) => (
    <div data-testid="map-pin-icon" className={className}>
      MapPin Icon
    </div>
  )),
  Phone: jest.fn(({ className }: IconProps) => (
    <div data-testid="phone-icon" className={className}>
      Phone Icon
    </div>
  )),
  Mail: jest.fn(({ className }: IconProps) => (
    <div data-testid="mail-icon" className={className}>
      Mail Icon
    </div>
  )),
  Clock: jest.fn(({ className }: IconProps) => (
    <div data-testid="clock-icon" className={className}>
      Clock Icon
    </div>
  )),
  Globe: jest.fn(({ className }: IconProps) => (
    <div data-testid="globe-icon" className={className}>
      Globe Icon
    </div>
  )),
  MessageCircle: jest.fn(({ className }: IconProps) => (
    <div data-testid="message-circle-icon" className={className}>
      Message Icon
    </div>
  )),
}))

// Mock shadcn/ui components
interface ButtonProps {
  children: React.ReactNode
  variant?: string
  size?: string
  className?: string
}

jest.mock('@/components/ui/schadcn/button', () => ({
  Button: jest.fn(({ children, variant, size, className }: ButtonProps) => (
    <button data-variant={variant} data-size={size} className={className}>
      {children}
    </button>
  )),
}))

interface CardProps {
  children: React.ReactNode
  className?: string
}

interface CardHeaderProps {
  children: React.ReactNode
  className?: string
}

interface CardTitleProps {
  children: React.ReactNode
  className?: string
}

interface CardContentProps {
  children: React.ReactNode
  className?: string
}

jest.mock('@/components/ui/schadcn/card', () => ({
  Card: jest.fn(({ children, className }: CardProps) => (
    <div data-testid="card" className={className}>
      {children}
    </div>
  )),
  CardHeader: jest.fn(({ children, className }: CardHeaderProps) => (
    <div data-testid="card-header" className={className}>
      {children}
    </div>
  )),
  CardTitle: jest.fn(({ children, className }: CardTitleProps) => (
    <h2 data-testid="card-title" className={className}>
      {children}
    </h2>
  )),
  CardContent: jest.fn(({ children, className }: CardContentProps) => (
    <div data-testid="card-content" className={className}>
      {children}
    </div>
  )),
}))

describe('ContactInfo', () => {
  const mockT = jest.fn((key: string) => key)
  const mockUseTranslation = useTranslation as jest.MockedFunction<
    typeof useTranslation
  >

  beforeEach(() => {
    jest.clearAllMocks()

    // Default mock implementation
    mockT.mockImplementation((key: string) => {
      const translations: Record<string, string> = {
        'contact.info.title': 'Contact Information',
        'contact.info.description': 'Get in touch with us',
        'contact.info.address.title': 'Address',
        'contact.info.address.company': 'Alfe Tissue Paper AB',
        'contact.info.address.street': 'Street 123',
        'contact.info.address.postal': '12345 Stockholm',
        'contact.info.address.country': 'Sweden',
        'contact.info.orderReception.title': 'Order Reception',
        'contact.info.orderReception.whatsapp': 'WhatsApp',
        'contact.info.customerService.title': 'Customer Service',
        'contact.info.customerService.whatsapp': 'WhatsApp',
        'contact.info.email.title': 'Email',
        'contact.info.hours.title': 'Business Hours',
        'contact.info.hours.weekdays': 'Mon-Fri: 9:00 AM - 5:00 PM',
        'contact.info.hours.weekend': 'Sat-Sun: Closed',
        'contact.info.website.title': 'Website',
        'contact.info.social.title': 'Follow Us',
      }
      return translations[key] || key
    })

    mockUseTranslation.mockReturnValue({
      t: mockT as unknown as ReturnType<typeof useTranslation>['t'],
      i18n: {} as ReturnType<typeof useTranslation>['i18n'],
      ready: true,
    } as ReturnType<typeof useTranslation>)
  })

  describe('Loading State', () => {
    it('should render loading skeleton when translations are not ready', () => {
      mockUseTranslation.mockReturnValue({
        t: mockT as unknown as ReturnType<typeof useTranslation>['t'],
        i18n: {} as ReturnType<typeof useTranslation>['i18n'],
        ready: false,
      } as ReturnType<typeof useTranslation>)

      const { container } = render(<ContactInfo />)

      // Check for loading skeleton
      const skeletons = container.querySelectorAll('.animate-pulse')
      expect(skeletons.length).toBeGreaterThan(0)

      // Check for loading bars
      const loadingBars = container.querySelectorAll('.bg-gray-200')
      expect(loadingBars.length).toBeGreaterThan(0)
    })

    it('should render 6 skeleton items for contact details', () => {
      mockUseTranslation.mockReturnValue({
        t: mockT as unknown as ReturnType<typeof useTranslation>['t'],
        i18n: {} as ReturnType<typeof useTranslation>['i18n'],
        ready: false,
      } as ReturnType<typeof useTranslation>)

      const { container } = render(<ContactInfo />)

      const detailSkeletons = container.querySelectorAll('.h-12.bg-gray-200')
      expect(detailSkeletons).toHaveLength(6)
    })
  })

  describe('Content Rendering', () => {
    it('should render card title', () => {
      render(<ContactInfo />)

      expect(screen.getByText('Contact Information')).toBeInTheDocument()
    })

    it('should render description', () => {
      render(<ContactInfo />)

      expect(screen.getByText('Get in touch with us')).toBeInTheDocument()
    })

    it('should render all contact sections', () => {
      render(<ContactInfo />)

      expect(screen.getByText('Address')).toBeInTheDocument()
      expect(screen.getByText('Order Reception')).toBeInTheDocument()
      expect(screen.getByText('Customer Service')).toBeInTheDocument()
      expect(screen.getByText('Email')).toBeInTheDocument()
      expect(screen.getByText('Business Hours')).toBeInTheDocument()
      expect(screen.getByText('Website')).toBeInTheDocument()
    })
  })

  describe('Address Section', () => {
    it('should render address details', () => {
      render(<ContactInfo />)

      expect(screen.getByText('Alfe Tissue Paper AB')).toBeInTheDocument()
      expect(screen.getByText('Street 123')).toBeInTheDocument()
      expect(screen.getByText('12345 Stockholm')).toBeInTheDocument()
      expect(screen.getByText('Sweden')).toBeInTheDocument()
    })

    it('should render map pin icon', () => {
      render(<ContactInfo />)

      const mapPinIcons = screen.getAllByTestId('map-pin-icon')
      expect(mapPinIcons.length).toBeGreaterThan(0)
    })
  })

  describe('Phone Numbers Section', () => {
    it('should render order reception phone numbers', () => {
      render(<ContactInfo />)

      const orderPhone = screen.getByText('+46 76 196 1113')
      expect(orderPhone).toBeInTheDocument()
      expect(orderPhone.tagName).toBe('A')
      expect(orderPhone).toHaveAttribute('href', 'tel:+46761961113')
    })

    it('should render customer service phone numbers', () => {
      render(<ContactInfo />)

      const servicePhone1 = screen.getByText('+46 76 260 1112')
      const servicePhone2 = screen.getByText('+46 73 769 6164')

      expect(servicePhone1).toBeInTheDocument()
      expect(servicePhone1).toHaveAttribute('href', 'tel:+46762601112')

      expect(servicePhone2).toBeInTheDocument()
      expect(servicePhone2).toHaveAttribute('href', 'tel:+46737696164')
    })

    it('should render WhatsApp links', () => {
      render(<ContactInfo />)

      const whatsappLinks = screen.getAllByText(/WhatsApp:/i)
      expect(whatsappLinks.length).toBeGreaterThan(0)
    })

    it('should render WhatsApp links with correct attributes', () => {
      render(<ContactInfo />)

      const links = screen.getAllByRole('link')
      const whatsappLinks = links.filter(link =>
        link.getAttribute('href')?.includes('wa.me')
      )

      whatsappLinks.forEach(link => {
        expect(link).toHaveAttribute('target', '_blank')
        expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      })
    })

    it('should render phone icons for phone numbers', () => {
      render(<ContactInfo />)

      const phoneIcons = screen.getAllByTestId('phone-icon')
      expect(phoneIcons.length).toBeGreaterThan(0)
    })

    it('should render message circle icons for WhatsApp', () => {
      render(<ContactInfo />)

      const messageIcons = screen.getAllByTestId('message-circle-icon')
      expect(messageIcons.length).toBeGreaterThan(0)
    })
  })

  describe('Email Section', () => {
    it('should render email addresses', () => {
      render(<ContactInfo />)

      const orderEmail = screen.getByText('order@alfetissuepaper.se')
      const infoEmail = screen.getByText('info@alfetissuepaper.se')

      expect(orderEmail).toBeInTheDocument()
      expect(orderEmail).toHaveAttribute(
        'href',
        'mailto:order@alfetissuepaper.se'
      )

      expect(infoEmail).toBeInTheDocument()
      expect(infoEmail).toHaveAttribute(
        'href',
        'mailto:info@alfetissuepaper.se'
      )
    })

    it('should render mail icon', () => {
      render(<ContactInfo />)

      const mailIcons = screen.getAllByTestId('mail-icon')
      expect(mailIcons.length).toBeGreaterThan(0)
    })
  })

  describe('Business Hours Section', () => {
    it('should render business hours', () => {
      render(<ContactInfo />)

      expect(screen.getByText('Mon-Fri: 9:00 AM - 5:00 PM')).toBeInTheDocument()
      expect(screen.getByText('Sat-Sun: Closed')).toBeInTheDocument()
    })

    it('should render clock icon', () => {
      render(<ContactInfo />)

      const clockIcons = screen.getAllByTestId('clock-icon')
      expect(clockIcons.length).toBeGreaterThan(0)
    })
  })

  describe('Website Section', () => {
    it('should render website link', () => {
      render(<ContactInfo />)

      const websiteLink = screen.getByText('atpstore.se')
      expect(websiteLink).toBeInTheDocument()
      expect(websiteLink).toHaveAttribute('href', 'http://atpstore.se')
      expect(websiteLink).toHaveAttribute('target', '_blank')
      expect(websiteLink).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('should render globe icon', () => {
      render(<ContactInfo />)

      const globeIcons = screen.getAllByTestId('globe-icon')
      expect(globeIcons.length).toBeGreaterThan(0)
    })
  })

  describe('Social Media Section', () => {
    it('should render social media title', () => {
      render(<ContactInfo />)

      expect(screen.getByText('Follow Us')).toBeInTheDocument()
    })

    it('should render social media buttons', () => {
      const { container } = render(<ContactInfo />)

      const socialButtons = container.querySelectorAll(
        'button[data-variant="outline"]'
      )
      expect(socialButtons).toHaveLength(3) // Facebook, Twitter, LinkedIn
    })

    it('should render social media icons', () => {
      const { container } = render(<ContactInfo />)

      const svgIcons = container.querySelectorAll('svg')
      expect(svgIcons.length).toBeGreaterThanOrEqual(3)
    })

    it('should apply correct size to social buttons', () => {
      const { container } = render(<ContactInfo />)

      const socialButtons = container.querySelectorAll(
        'button[data-size="icon"]'
      )
      expect(socialButtons).toHaveLength(3)
    })
  })

  describe('Styling and Layout', () => {
    it('should apply correct classes to icons', () => {
      render(<ContactInfo />)

      const mapPinIcon = screen.getAllByTestId('map-pin-icon')[0]
      expect(mapPinIcon).toHaveClass(
        'h-5',
        'w-5',
        'text-primary',
        'mt-1',
        'flex-shrink-0'
      )
    })

    it('should apply correct classes to phone icons', () => {
      render(<ContactInfo />)

      const phoneIcons = screen.getAllByTestId('phone-icon')
      const coloredPhoneIcons = phoneIcons.filter(icon =>
        icon.className?.includes('text-blue-600')
      )
      expect(coloredPhoneIcons.length).toBeGreaterThan(0)
    })

    it('should apply correct classes to WhatsApp icons', () => {
      render(<ContactInfo />)

      const messageIcons = screen.getAllByTestId('message-circle-icon')
      const greenMessageIcons = messageIcons.filter(icon =>
        icon.className?.includes('text-green-600')
      )
      expect(greenMessageIcons.length).toBeGreaterThan(0)
    })

    it('should apply hover styles to links', () => {
      render(<ContactInfo />)

      const links = screen.getAllByRole('link')
      links.forEach(link => {
        if (link.className?.includes('text-primary')) {
          expect(link).toHaveClass('hover:underline')
        }
      })
    })

    it('should have border separator before social media section', () => {
      const { container } = render(<ContactInfo />)

      const socialSection = container.querySelector('.pt-6.border-t')
      expect(socialSection).toBeInTheDocument()
    })
  })

  describe('Translation Integration', () => {
    it('should call useTranslation with correct namespace', () => {
      render(<ContactInfo />)

      expect(mockUseTranslation).toHaveBeenCalledWith('aboutUs')
    })

    it('should call t function for all text content', () => {
      render(<ContactInfo />)

      expect(mockT).toHaveBeenCalledWith('contact.info.title')
      expect(mockT).toHaveBeenCalledWith('contact.info.description')
      expect(mockT).toHaveBeenCalledWith('contact.info.address.title')
      expect(mockT).toHaveBeenCalledWith('contact.info.email.title')
      expect(mockT).toHaveBeenCalledWith('contact.info.hours.title')
      expect(mockT).toHaveBeenCalledWith('contact.info.website.title')
      expect(mockT).toHaveBeenCalledWith('contact.info.social.title')
    })
  })
})
