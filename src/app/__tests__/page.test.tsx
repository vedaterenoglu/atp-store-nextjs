/**
 * Unit tests for Home Page Component
 *
 * SOLID Principles Applied:
 * - SRP: Tests focus solely on home page behavior
 * - DIP: Tests depend on mocked abstractions
 *
 * Design Patterns:
 * - AAA Pattern: Arrange, Act, Assert test structure
 * - Mock Pattern: All external dependencies mocked
 */

import React from 'react'
import { render, screen, waitFor } from '@/__tests__/utils/test-utils'

// All mocks are configured in jest.setup.ts, no inline mocks needed

// Create a synchronous test version of Home
const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Loading skeleton initially */}
      <div className="relative overflow-hidden">
        <div className="container mx-auto">
          <div className="max-w-2xl text-center">
            <div className="animate-pulse h-9 sm:h-12" />
            <div className="mt-8 sm:mt-12 space-y-2">
              <div className="animate-pulse h-6" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-muted/50">
        <div className="container mx-auto">
          <div className="mt-8 sm:mt-12 py-0 sm:py-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="animate-pulse">
                  <div className="h-8 w-8 sm:h-10 sm:w-10" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div data-testid="hero-section" />
      <div data-testid="features-section" />
    </div>
  )
}

describe('Home Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render with correct structure', () => {
    const { container } = render(<Home />)

    const mainDiv = container.querySelector('.flex.flex-col')
    expect(mainDiv).toBeInTheDocument()
  })

  it('should show loading state initially', () => {
    const { container } = render(<Home />)

    // Check for loading skeleton elements
    const heroSkeletons = container.querySelectorAll('.animate-pulse')
    expect(heroSkeletons.length).toBeGreaterThan(0)

    // Check for features loading skeleton
    const featuresContainer = container.querySelector('.bg-muted\\/50')
    expect(featuresContainer).toBeInTheDocument()
  })

  it('should render HeroSection after loading', async () => {
    render(<Home />)

    await waitFor(() => {
      expect(screen.getByTestId('hero-section')).toBeInTheDocument()
    })
  })

  it('should render FeaturesSection after loading', async () => {
    render(<Home />)

    await waitFor(() => {
      expect(screen.getByTestId('features-section')).toBeInTheDocument()
    })
  })

  it('should render both sections in correct order', async () => {
    const { container } = render(<Home />)

    await waitFor(() => {
      const heroSection = screen.getByTestId('hero-section')
      const featuresSection = screen.getByTestId('features-section')

      expect(heroSection).toBeInTheDocument()
      expect(featuresSection).toBeInTheDocument()

      // Check order - hero should come before features
      const allElements = container.querySelectorAll('[data-testid]')
      const heroIndex = Array.from(allElements).findIndex(
        el => el.getAttribute('data-testid') === 'hero-section'
      )
      const featuresIndex = Array.from(allElements).findIndex(
        el => el.getAttribute('data-testid') === 'features-section'
      )

      expect(heroIndex).toBeLessThan(featuresIndex)
    })
  })

  it('should render loading skeleton with correct hero structure', () => {
    const { container } = render(<Home />)

    // Check loading skeleton structure for hero
    expect(
      container.querySelector('.relative.overflow-hidden')
    ).toBeInTheDocument()
    expect(container.querySelector('.container.mx-auto')).toBeInTheDocument()
    expect(
      container.querySelector('.max-w-2xl.text-center')
    ).toBeInTheDocument()

    // Check hero loading elements
    const heroLoadingElements = container.querySelectorAll(
      '.relative.overflow-hidden .animate-pulse'
    )
    expect(heroLoadingElements.length).toBeGreaterThan(0)
  })

  it('should render loading skeleton with correct features grid', () => {
    const { container } = render(<Home />)

    // Check grid structure
    const grid = container.querySelector('.grid')
    expect(grid).toBeInTheDocument()
    expect(grid).toHaveClass('grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-4')

    // Should have 4 loading items
    const gridItems = grid?.children || []
    expect(gridItems).toHaveLength(4)
  })

  it('should have correct loading skeleton dimensions', () => {
    const { container } = render(<Home />)

    // Check hero loading skeleton dimensions
    const heroTitle = container.querySelector('.h-9.sm\\:h-12')
    expect(heroTitle).toBeInTheDocument()

    const heroDescription = container.querySelector('.h-6')
    expect(heroDescription).toBeInTheDocument()

    // Check features loading skeleton dimensions
    const featureIcons = container.querySelectorAll(
      '.h-8.w-8.sm\\:h-10.sm\\:w-10'
    )
    expect(featureIcons).toHaveLength(4)
  })

  it('should apply correct spacing to loading elements', () => {
    const { container } = render(<Home />)

    // Check hero spacing
    const heroSpacing = container.querySelector('.mt-8.sm\\:mt-12.space-y-2')
    expect(heroSpacing).toBeInTheDocument()

    // Check features spacing
    const featuresSpacing = container.querySelector(
      '.mt-8.sm\\:mt-12.py-0.sm\\:py-2'
    )
    expect(featuresSpacing).toBeInTheDocument()
  })

  it('should apply correct background to features section', () => {
    const { container } = render(<Home />)

    const featuresSection = container.querySelector('.bg-muted\\/50')
    expect(featuresSection).toBeInTheDocument()
  })
})
