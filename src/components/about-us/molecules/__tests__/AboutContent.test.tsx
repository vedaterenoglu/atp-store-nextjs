/**
 * Unit tests for AboutContent Component
 * SOLID Principles: SRP - Testing single responsibility
 * Design Patterns: AAA Pattern (Arrange, Act, Assert)
 * Dependencies: Jest, Testing Library, React
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import { AboutContent } from '../AboutContent'
import { useTranslation } from 'react-i18next'

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}))

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Users: jest.fn(({ className }: any) => (
    <div data-testid="users-icon" className={className}>Users Icon</div>
  )),
  Globe: jest.fn(({ className }: any) => (
    <div data-testid="globe-icon" className={className}>Globe Icon</div>
  )),
  Award: jest.fn(({ className }: any) => (
    <div data-testid="award-icon" className={className}>Award Icon</div>
  )),
  CheckCircle: jest.fn(({ className }: any) => (
    <div data-testid="check-circle-icon" className={className}>Check Icon</div>
  )),
}))

describe('AboutContent', () => {
  const mockT = jest.fn()
  const mockUseTranslation = useTranslation as jest.MockedFunction<
    typeof useTranslation
  >

  beforeEach(() => {
    jest.clearAllMocks()

    // Default mock implementation
    mockT.mockImplementation(
      (key: string, options?: { returnObjects?: boolean }) => {
        const translations: Record<string, string | string[]> = {
          'mission.title': 'Our Mission',
          'mission.paragraph1': 'Mission paragraph 1',
          'mission.paragraph2': 'Mission paragraph 2',
          'history.title': 'Our History',
          'history.paragraphs': [
            'History paragraph 1',
            'History paragraph 2',
            'History paragraph 3',
          ],
          'features.expertTeam.title': 'Expert Team',
          'features.expertTeam.description': 'Expert team description',
          'features.globalPresence.title': 'Global Presence',
          'features.globalPresence.description': 'Global presence description',
          'features.qualityAssured.title': 'Quality Assured',
          'features.qualityAssured.description': 'Quality assured description',
          'features.trustedPartner.title': 'Trusted Partner',
          'features.trustedPartner.description': 'Trusted partner description',
          'values.title': 'Our Values',
          'values.items.integrity.label': 'Integrity',
          'values.items.integrity.description': 'Integrity description',
          'values.items.innovation.label': 'Innovation',
          'values.items.innovation.description': 'Innovation description',
          'values.items.customerFocus.label': 'Customer Focus',
          'values.items.customerFocus.description':
            'Customer focus description',
          'values.items.sustainability.label': 'Sustainability',
          'values.items.sustainability.description':
            'Sustainability description',
        }

        if (options?.returnObjects) {
          return translations[key] || key
        }

        return translations[key] || key
      }
    )

    mockUseTranslation.mockReturnValue({
      t: mockT,
      i18n: {} as ReturnType<typeof useTranslation>['i18n'],
      ready: true,
    })
  })

  describe('Loading State', () => {
    it('should render loading skeleton when translations are not ready', () => {
      mockUseTranslation.mockReturnValue({
        t: mockT,
        i18n: {} as ReturnType<typeof useTranslation>['i18n'],
        ready: false,
      })

      const { container } = render(<AboutContent />)

      // Check for loading skeleton
      const skeleton = container.querySelector('.animate-pulse')
      expect(skeleton).toBeInTheDocument()

      // Check for loading bars
      const loadingBars = container.querySelectorAll('.bg-gray-200')
      expect(loadingBars).toHaveLength(3)
      expect(loadingBars[0]).toHaveClass('w-3/4')
      expect(loadingBars[2]).toHaveClass('w-5/6')
    })
  })

  describe('Mission Section', () => {
    it('should render mission title and paragraphs', () => {
      render(<AboutContent />)

      expect(screen.getByText('Our Mission')).toBeInTheDocument()
      expect(screen.getByText('Mission paragraph 1')).toBeInTheDocument()
      expect(screen.getByText('Mission paragraph 2')).toBeInTheDocument()
    })

    it('should apply correct classes to mission content', () => {
      render(<AboutContent />)

      const missionParagraph1 = screen.getByText('Mission paragraph 1')
      expect(missionParagraph1).toHaveClass('text-muted-foreground')

      const missionParagraph2 = screen.getByText('Mission paragraph 2')
      expect(missionParagraph2).toHaveClass('text-muted-foreground', 'mt-4')
    })
  })

  describe('History Section', () => {
    it('should render history title and paragraphs from array', () => {
      render(<AboutContent />)

      expect(screen.getByText('Our History')).toBeInTheDocument()
      expect(screen.getByText('History paragraph 1')).toBeInTheDocument()
      expect(screen.getByText('History paragraph 2')).toBeInTheDocument()
      expect(screen.getByText('History paragraph 3')).toBeInTheDocument()
    })

    it('should handle non-array history paragraphs gracefully', () => {
      mockT.mockImplementation(
        (key: string, options?: { returnObjects?: boolean }) => {
          if (key === 'history.paragraphs' && options?.returnObjects) {
            return 'Not an array'
          }
          return key
        }
      )

      render(<AboutContent />)

      // Should not crash and should render empty array
      const historySection =
        screen.getByText('history.title').parentElement?.parentElement
      expect(historySection).toBeInTheDocument()
    })

    it('should apply correct margin classes to history paragraphs', () => {
      render(<AboutContent />)

      const paragraph1 = screen.getByText('History paragraph 1')
      const paragraph2 = screen.getByText('History paragraph 2')
      const paragraph3 = screen.getByText('History paragraph 3')

      expect(paragraph1).toHaveClass('mb-4')
      expect(paragraph2).toHaveClass('mb-4')
      expect(paragraph3).not.toHaveClass('mb-4')
    })
  })

  describe('Features Grid', () => {
    it('should render all four feature cards', () => {
      render(<AboutContent />)

      expect(screen.getByText('Expert Team')).toBeInTheDocument()
      expect(screen.getByText('Global Presence')).toBeInTheDocument()
      expect(screen.getByText('Quality Assured')).toBeInTheDocument()
      expect(screen.getByText('Trusted Partner')).toBeInTheDocument()
    })

    it('should render feature descriptions', () => {
      render(<AboutContent />)

      expect(screen.getByText('Expert team description')).toBeInTheDocument()
      expect(
        screen.getByText('Global presence description')
      ).toBeInTheDocument()
      expect(
        screen.getByText('Quality assured description')
      ).toBeInTheDocument()
      expect(
        screen.getByText('Trusted partner description')
      ).toBeInTheDocument()
    })

    it('should render correct icons for each feature', () => {
      render(<AboutContent />)

      const usersIcon = screen.getByTestId('users-icon')
      const globeIcon = screen.getByTestId('globe-icon')
      const awardIcon = screen.getByTestId('award-icon')
      const checkCircleIcons = screen.getAllByTestId('check-circle-icon')

      expect(usersIcon).toBeInTheDocument()
      expect(globeIcon).toBeInTheDocument()
      expect(awardIcon).toBeInTheDocument()
      expect(checkCircleIcons.length).toBeGreaterThan(0)
    })

    it('should apply correct classes to feature icons', () => {
      render(<AboutContent />)

      const icons = [
        screen.getByTestId('users-icon'),
        screen.getByTestId('globe-icon'),
        screen.getByTestId('award-icon'),
      ]

      icons.forEach(icon => {
        expect(icon).toHaveClass(
          'h-12',
          'w-12',
          'mx-auto',
          'mb-4',
          'text-primary'
        )
      })
    })
  })

  describe('Values Section', () => {
    it('should render values title', () => {
      render(<AboutContent />)

      expect(screen.getByText('Our Values')).toBeInTheDocument()
    })

    it('should render all value items with labels and descriptions', () => {
      render(<AboutContent />)

      // Check for labels
      expect(screen.getByText(/Integrity:/)).toBeInTheDocument()
      expect(screen.getByText(/Innovation:/)).toBeInTheDocument()
      expect(screen.getByText(/Customer Focus:/)).toBeInTheDocument()
      expect(screen.getByText(/Sustainability:/)).toBeInTheDocument()

      // Check for descriptions (they're part of the same text node)
      expect(screen.getByText(/Integrity description/)).toBeInTheDocument()
      expect(screen.getByText(/Innovation description/)).toBeInTheDocument()
      expect(screen.getByText(/Customer focus description/)).toBeInTheDocument()
      expect(screen.getByText(/Sustainability description/)).toBeInTheDocument()
    })

    it('should render check icons for each value item', () => {
      render(<AboutContent />)

      const checkIcons = screen.getAllByTestId('check-circle-icon')
      // Should have at least 4 check icons for values (plus 1 for features)
      expect(checkIcons.length).toBeGreaterThanOrEqual(5)
    })

    it('should apply correct classes to value check icons', () => {
      render(<AboutContent />)

      const checkIcons = screen.getAllByTestId('check-circle-icon')

      // Filter to get only the value section icons (they have specific classes)
      const valueIcons = checkIcons.filter(
        icon =>
          icon.className?.includes('h-5') && icon.className?.includes('w-5')
      )

      valueIcons.forEach(icon => {
        expect(icon).toHaveClass(
          'h-5',
          'w-5',
          'text-primary',
          'mt-0.5',
          'mr-3',
          'flex-shrink-0'
        )
      })
    })
  })

  describe('Layout and Structure', () => {
    it('should render all main sections in correct order', () => {
      const { container } = render(<AboutContent />)

      const cards = container.querySelectorAll('.text-2xl')
      expect(cards).toHaveLength(3) // Mission, History, Values titles

      expect(cards[0]).toHaveTextContent('Our Mission')
      expect(cards[1]).toHaveTextContent('Our History')
      expect(cards[2]).toHaveTextContent('Our Values')
    })

    it('should apply responsive grid classes to features', () => {
      const { container } = render(<AboutContent />)

      const grid = container.querySelector(
        '.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4'
      )
      expect(grid).toBeInTheDocument()
      expect(grid?.children).toHaveLength(4)
    })

    it('should apply correct spacing between sections', () => {
      const { container } = render(<AboutContent />)

      const mainContainer = container.querySelector('.space-y-12')
      expect(mainContainer).toBeInTheDocument()
    })
  })

  describe('Translation Integration', () => {
    it('should call useTranslation with correct namespace', () => {
      render(<AboutContent />)

      expect(mockUseTranslation).toHaveBeenCalledWith('aboutUs')
    })

    it('should call t function with returnObjects option for paragraphs', () => {
      render(<AboutContent />)

      expect(mockT).toHaveBeenCalledWith('history.paragraphs', {
        returnObjects: true,
      })
    })

    it('should handle empty history paragraphs array', () => {
      mockT.mockImplementation(
        (key: string, options?: { returnObjects?: boolean }) => {
          if (key === 'history.paragraphs' && options?.returnObjects) {
            return []
          }
          return key
        }
      )

      const { container } = render(<AboutContent />)

      // Should render without paragraphs
      const historyCard = container.querySelectorAll('.prose')[1]
      expect(historyCard?.children).toHaveLength(0)
    })
  })
})
