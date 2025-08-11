/**
 * Unit tests for CampaignCardSkeleton Component
 * SOLID Principles: SRP - Testing single responsibility
 * Design Patterns: AAA Pattern (Arrange, Act, Assert)
 * Dependencies: Jest, Testing Library, React
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import { CampaignCardSkeleton } from '../CampaignCardSkeleton'

// Mock shadcn/ui Card components
jest.mock('@/components/ui/schadcn/card', () => ({
  Card: jest.fn(({ children, className }: any) => (
    <div data-testid="card" className={className}>
      {children}
    </div>
  )),
  CardContent: jest.fn(({ children, className }: any) => (
    <div data-testid="card-content" className={className}>
      {children}
    </div>
  )),
  CardFooter: jest.fn(({ children, className }: any) => (
    <div data-testid="card-footer" className={className}>
      {children}
    </div>
  )),
}))

// Mock Skeleton component
jest.mock('@/components/ui/schadcn/skeleton', () => ({
  Skeleton: jest.fn(({ className }: any) => (
    <div data-testid="skeleton" className={`${className} skeleton animate-pulse`} />
  )),
}))

describe('CampaignCardSkeleton', () => {
  describe('Component Rendering', () => {
    it('should render the skeleton card', () => {
      render(<CampaignCardSkeleton />)
      const card = screen.getByTestId('card')
      expect(card).toBeInTheDocument()
    })

    it('should render Card with overflow-hidden class', () => {
      render(<CampaignCardSkeleton />)
      const card = screen.getByTestId('card')
      expect(card).toHaveClass('overflow-hidden')
    })

    it('should render CardContent', () => {
      render(<CampaignCardSkeleton />)
      const cardContent = screen.getByTestId('card-content')
      expect(cardContent).toBeInTheDocument()
    })

    it('should render CardFooter', () => {
      render(<CampaignCardSkeleton />)
      const cardFooter = screen.getByTestId('card-footer')
      expect(cardFooter).toBeInTheDocument()
    })
  })

  describe('Image Skeleton', () => {
    it('should render image skeleton container', () => {
      const { container } = render(<CampaignCardSkeleton />)
      const imageContainer = container.querySelector(
        '.relative.aspect-\\[3\\/2\\]'
      )
      expect(imageContainer).toBeInTheDocument()
    })

    it('should apply correct classes to image container', () => {
      const { container } = render(<CampaignCardSkeleton />)
      const imageContainer = container.querySelector(
        '.relative.aspect-\\[3\\/2\\]'
      )
      expect(imageContainer).toHaveClass('relative')
      expect(imageContainer).toHaveClass('aspect-[3/2]')
      expect(imageContainer).toHaveClass('bg-secondary/10')
    })

    it('should render image skeleton with full size', () => {
      render(<CampaignCardSkeleton />)
      const skeletons = screen.getAllByTestId('skeleton')
      const imageSkeleton = skeletons[0]
      expect(imageSkeleton).toHaveClass('w-full')
      expect(imageSkeleton).toHaveClass('h-full')
    })
  })

  describe('Content Skeleton', () => {
    it('should apply correct classes to CardContent', () => {
      render(<CampaignCardSkeleton />)
      const cardContent = screen.getByTestId('card-content')
      expect(cardContent).toHaveClass('p-4')
      expect(cardContent).toHaveClass('space-y-4')
    })

    it('should render product name skeleton', () => {
      render(<CampaignCardSkeleton />)
      const skeletons = screen.getAllByTestId('skeleton')
      const nameSkeleton = skeletons[1]
      expect(nameSkeleton).toHaveClass('h-5')
      expect(nameSkeleton).toHaveClass('w-full')
    })

    it('should render product category skeleton', () => {
      render(<CampaignCardSkeleton />)
      const skeletons = screen.getAllByTestId('skeleton')
      const categorySkeleton = skeletons[2]
      expect(categorySkeleton).toHaveClass('h-4')
      expect(categorySkeleton).toHaveClass('w-1/3')
    })

    it('should render price skeleton', () => {
      render(<CampaignCardSkeleton />)
      const skeletons = screen.getAllByTestId('skeleton')
      const priceSkeleton = skeletons[3]
      expect(priceSkeleton).toHaveClass('h-7')
      expect(priceSkeleton).toHaveClass('w-24')
    })

    it('should render discount skeleton', () => {
      render(<CampaignCardSkeleton />)
      const skeletons = screen.getAllByTestId('skeleton')
      const discountSkeleton = skeletons[4]
      expect(discountSkeleton).toHaveClass('h-4')
      expect(discountSkeleton).toHaveClass('w-16')
    })
  })

  describe('Footer Skeleton', () => {
    it('should apply correct classes to CardFooter', () => {
      render(<CampaignCardSkeleton />)
      const cardFooter = screen.getByTestId('card-footer')
      expect(cardFooter).toHaveClass('p-4')
      expect(cardFooter).toHaveClass('pt-0')
    })

    it('should render counter skeletons', () => {
      render(<CampaignCardSkeleton />)
      const skeletons = screen.getAllByTestId('skeleton')

      // Decrease button skeleton
      const decreaseSkeleton = skeletons[5]
      expect(decreaseSkeleton).toHaveClass('h-8')
      expect(decreaseSkeleton).toHaveClass('w-8')

      // Counter value skeleton
      const counterSkeleton = skeletons[6]
      expect(counterSkeleton).toHaveClass('h-6')
      expect(counterSkeleton).toHaveClass('w-8')

      // Increase button skeleton
      const increaseSkeleton = skeletons[7]
      expect(increaseSkeleton).toHaveClass('h-8')
      expect(increaseSkeleton).toHaveClass('w-8')
    })

    it('should render button skeleton', () => {
      render(<CampaignCardSkeleton />)
      const skeletons = screen.getAllByTestId('skeleton')
      const buttonSkeleton = skeletons[8]
      expect(buttonSkeleton).toHaveClass('h-10')
      expect(buttonSkeleton).toHaveClass('w-full')
    })
  })

  describe('Layout Structure', () => {
    it('should render all 9 skeleton elements', () => {
      render(<CampaignCardSkeleton />)
      const skeletons = screen.getAllByTestId('skeleton')
      expect(skeletons).toHaveLength(9)
    })

    it('should have product info container with correct spacing', () => {
      const { container } = render(<CampaignCardSkeleton />)
      const infoContainer = container.querySelector('.space-y-2')
      expect(infoContainer).toBeInTheDocument()
    })

    it('should have price container with flex layout', () => {
      const { container } = render(<CampaignCardSkeleton />)
      const priceContainer = container.querySelector(
        '.flex.items-baseline.gap-2'
      )
      expect(priceContainer).toBeInTheDocument()
    })

    it('should have counter container with proper layout', () => {
      const { container } = render(<CampaignCardSkeleton />)
      const counterContainer = container.querySelector(
        '.flex.items-center.justify-center.gap-3'
      )
      expect(counterContainer).toBeInTheDocument()
    })
  })

  describe('DOM Structure', () => {
    it('should have correct component hierarchy', () => {
      const { container } = render(<CampaignCardSkeleton />)

      // Card > [Image Container, CardContent, CardFooter]
      const card = container.querySelector('[data-testid="card"]')
      expect(card).toBeInTheDocument()

      const children = card?.children
      expect(children).toHaveLength(3)

      // First child is image container
      expect(children?.[0]).toHaveClass('relative')

      // Second child is CardContent
      expect(children?.[1]).toHaveAttribute('data-testid', 'card-content')

      // Third child is CardFooter
      expect(children?.[2]).toHaveAttribute('data-testid', 'card-footer')
    })

    it('should render footer content wrapper', () => {
      const { container } = render(<CampaignCardSkeleton />)
      const footerWrapper = container.querySelector(
        '[data-testid="card-footer"] > .space-y-2'
      )
      expect(footerWrapper).toBeInTheDocument()
    })
  })

  describe('Spacing Classes', () => {
    it('should apply vertical spacing in content', () => {
      render(<CampaignCardSkeleton />)
      const cardContent = screen.getByTestId('card-content')
      expect(cardContent).toHaveClass('space-y-4')
    })

    it('should apply gap spacing in counter', () => {
      const { container } = render(<CampaignCardSkeleton />)
      const counterContainer = container.querySelector(
        '.flex.items-center.justify-center.gap-3'
      )
      expect(counterContainer).toHaveClass('gap-3')
    })

    it('should apply gap spacing in price container', () => {
      const { container } = render(<CampaignCardSkeleton />)
      const priceContainer = container.querySelector(
        '.flex.items-baseline.gap-2'
      )
      expect(priceContainer).toHaveClass('gap-2')
    })

    it('should apply vertical spacing in footer wrapper', () => {
      const { container } = render(<CampaignCardSkeleton />)
      const footerWrapper = container.querySelector(
        '[data-testid="card-footer"] > .space-y-2'
      )
      expect(footerWrapper).toHaveClass('space-y-2')
    })
  })

  describe('Responsive Design', () => {
    it('should use aspect ratio for image container', () => {
      const { container } = render(<CampaignCardSkeleton />)
      const imageContainer = container.querySelector('.aspect-\\[3\\/2\\]')
      expect(imageContainer).toBeInTheDocument()
    })

    it('should use full width for button skeleton', () => {
      render(<CampaignCardSkeleton />)
      const skeletons = screen.getAllByTestId('skeleton')
      const buttonSkeleton = skeletons[8]
      expect(buttonSkeleton).toHaveClass('w-full')
    })

    it('should use fractional width for category skeleton', () => {
      render(<CampaignCardSkeleton />)
      const skeletons = screen.getAllByTestId('skeleton')
      const categorySkeleton = skeletons[2]
      expect(categorySkeleton).toHaveClass('w-1/3')
    })
  })
})
