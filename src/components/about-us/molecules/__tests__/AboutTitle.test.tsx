/**
 * Unit tests for AboutTitle Component
 * SOLID Principles: SRP - Testing single responsibility
 * Design Patterns: AAA Pattern (Arrange, Act, Assert)
 * Dependencies: Jest, Testing Library, React
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import { AboutTitle } from '../AboutTitle'
import { useTranslation } from 'react-i18next'

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}))

// Mock HeroPrimaryAction component
jest.mock('@/components/sections/home/hero-section', () => ({
  HeroPrimaryAction: () => (
    <div data-testid="hero-primary-action">Hero Action</div>
  ),
}))

describe('AboutTitle', () => {
  const mockT = jest.fn()
  const mockUseTranslation = useTranslation as jest.MockedFunction<
    typeof useTranslation
  >

  beforeEach(() => {
    jest.clearAllMocks()

    // Default mock implementation
    mockT.mockImplementation((key: string) => {
      const translations: Record<string, string> = {
        title: 'About Us',
        subtitle: 'Learn more about our company and mission',
      }
      return translations[key] || key
    })

    mockUseTranslation.mockReturnValue({
      t: mockT,
      i18n: {},
      ready: true,
    } as unknown as ReturnType<typeof useTranslation>)
  })

  describe('Loading State', () => {
    it('should render loading skeleton when translations are not ready', () => {
      mockUseTranslation.mockReturnValue({
        t: mockT,
        i18n: {},
        ready: false,
      } as unknown as ReturnType<typeof useTranslation>)

      const { container } = render(<AboutTitle />)

      // Check for loading skeleton
      const skeleton = container.querySelector('.animate-pulse')
      expect(skeleton).toBeInTheDocument()

      // Check for loading bars
      const loadingBars = container.querySelectorAll('.bg-gray-200')
      expect(loadingBars).toHaveLength(2)
    })

    it('should apply correct width classes to loading skeleton', () => {
      mockUseTranslation.mockReturnValue({
        t: mockT,
        i18n: {},
        ready: false,
      } as unknown as ReturnType<typeof useTranslation>)

      const { container } = render(<AboutTitle />)

      const titleSkeleton = container.querySelector('.h-10.bg-gray-200')
      expect(titleSkeleton).toHaveClass('w-64', 'mx-auto', 'mb-4')

      const subtitleSkeleton = container.querySelector('.h-6.bg-gray-200')
      expect(subtitleSkeleton).toHaveClass('max-w-3xl', 'mx-auto')
    })

    it('should center the loading skeleton', () => {
      mockUseTranslation.mockReturnValue({
        t: mockT,
        i18n: {},
        ready: false,
      } as unknown as ReturnType<typeof useTranslation>)

      const { container } = render(<AboutTitle />)

      const wrapper = container.querySelector('.text-center.mb-12')
      expect(wrapper).toBeInTheDocument()
    })
  })

  describe('Content Rendering', () => {
    it('should render title from translations', () => {
      render(<AboutTitle />)

      const title = screen.getByText('About Us')
      expect(title).toBeInTheDocument()
      expect(title.tagName).toBe('H1')
    })

    it('should render subtitle from translations', () => {
      render(<AboutTitle />)

      const subtitle = screen.getByText(
        'Learn more about our company and mission'
      )
      expect(subtitle).toBeInTheDocument()
      expect(subtitle.tagName).toBe('P')
    })

    it('should render HeroPrimaryAction component', () => {
      render(<AboutTitle />)

      const heroAction = screen.getByTestId('hero-primary-action')
      expect(heroAction).toBeInTheDocument()
      expect(heroAction).toHaveTextContent('Hero Action')
    })
  })

  describe('Styling and Layout', () => {
    it('should apply correct classes to title', () => {
      render(<AboutTitle />)

      const title = screen.getByText('About Us')
      expect(title).toHaveClass('text-4xl', 'md:text-5xl', 'font-bold', 'mb-4')
    })

    it('should apply correct classes to subtitle', () => {
      render(<AboutTitle />)

      const subtitle = screen.getByText(
        'Learn more about our company and mission'
      )
      expect(subtitle).toHaveClass(
        'text-xl',
        'text-muted-foreground',
        'max-w-3xl',
        'mx-auto',
        'mb-6'
      )
    })

    it('should center align all content', () => {
      const { container } = render(<AboutTitle />)

      const wrapper = container.querySelector('.text-center.mb-12')
      expect(wrapper).toBeInTheDocument()
    })

    it('should center the hero action button', () => {
      const { container } = render(<AboutTitle />)

      const buttonWrapper = container.querySelector('.flex.justify-center')
      expect(buttonWrapper).toBeInTheDocument()

      const heroAction = screen.getByTestId('hero-primary-action')
      expect(heroAction.parentElement).toBe(buttonWrapper)
    })
  })

  describe('Translation Integration', () => {
    it('should call useTranslation with correct namespace', () => {
      render(<AboutTitle />)

      expect(mockUseTranslation).toHaveBeenCalledWith('aboutUs')
    })

    it('should call t function for title', () => {
      render(<AboutTitle />)

      expect(mockT).toHaveBeenCalledWith('title')
    })

    it('should call t function for subtitle', () => {
      render(<AboutTitle />)

      expect(mockT).toHaveBeenCalledWith('subtitle')
    })

    it('should handle missing translations gracefully', () => {
      mockT.mockImplementation((key: string) => key)

      render(<AboutTitle />)

      expect(screen.getByText('title')).toBeInTheDocument()
      expect(screen.getByText('subtitle')).toBeInTheDocument()
    })
  })

  describe('Component Structure', () => {
    it('should render with correct DOM hierarchy', () => {
      const { container } = render(<AboutTitle />)

      const wrapper = container.firstElementChild
      expect(wrapper).toHaveClass('text-center', 'mb-12')

      const title = wrapper?.querySelector('h1')
      expect(title).toBeInTheDocument()

      const subtitle = wrapper?.querySelector('p')
      expect(subtitle).toBeInTheDocument()

      const actionWrapper = wrapper?.querySelector('.flex.justify-center')
      expect(actionWrapper).toBeInTheDocument()
    })

    it('should render all elements when ready', () => {
      render(<AboutTitle />)

      // Should have title, subtitle, and action button
      expect(screen.getByText('About Us')).toBeInTheDocument()
      expect(
        screen.getByText('Learn more about our company and mission')
      ).toBeInTheDocument()
      expect(screen.getByTestId('hero-primary-action')).toBeInTheDocument()
    })

    it('should not render content elements when not ready', () => {
      mockUseTranslation.mockReturnValue({
        t: mockT,
        i18n: {},
        ready: false,
      } as unknown as ReturnType<typeof useTranslation>)

      render(<AboutTitle />)

      expect(screen.queryByText('About Us')).not.toBeInTheDocument()
      expect(
        screen.queryByText('Learn more about our company and mission')
      ).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('hero-primary-action')
      ).not.toBeInTheDocument()
    })
  })
})
