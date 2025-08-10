/**
 * Products Loading Page Test Suite
 * SOLID Principles: Single Responsibility - Test loading state component
 * Design Patterns: Test Pattern - Unit tests with RTL
 * Dependencies: Jest, React Testing Library
 */

import { render } from '@testing-library/react'
import Loading from '../loading'

describe('Products Loading Page', () => {
  describe('Component rendering', () => {
    it('should render loading skeleton structure', () => {
      const { container } = render(<Loading />)

      // Check main container
      const mainContainer = container.firstChild
      expect(mainContainer).toHaveClass('min-h-screen')

      // Check header section exists
      const headerSection = container.querySelector('.py-12')
      expect(headerSection).toBeInTheDocument()
    })

    it('should render title skeleton', () => {
      render(<Loading />)

      // Find title skeleton by its unique classes
      const titleSkeletons = document.querySelectorAll(
        '.h-10.w-48.animate-pulse'
      )
      expect(titleSkeletons).toHaveLength(1)
      expect(titleSkeletons[0]).toHaveClass('mx-auto', 'rounded-md', 'bg-muted')
    })

    it('should render subtitle skeleton', () => {
      render(<Loading />)

      // Find subtitle skeleton by its unique classes
      const subtitleSkeletons = document.querySelectorAll(
        '.h-6.w-96.animate-pulse'
      )
      expect(subtitleSkeletons).toHaveLength(1)
      expect(subtitleSkeletons[0]).toHaveClass(
        'mx-auto',
        'rounded-md',
        'bg-muted'
      )
    })

    it('should render search and filter skeletons', () => {
      render(<Loading />)

      // Check search/filter container
      const searchContainer = document.querySelector('.mx-auto.mt-8.flex')
      expect(searchContainer).toHaveClass(
        'max-w-2xl',
        'flex-col',
        'gap-4',
        'sm:flex-row',
        'sm:items-center'
      )

      // Check search input skeleton (full width on mobile, flex-1 on desktop)
      const searchSkeletons = searchContainer?.querySelectorAll(
        '.h-12.w-full.animate-pulse'
      )
      expect(searchSkeletons).toHaveLength(2)
      expect(searchSkeletons?.[0]).toHaveClass(
        'rounded-md',
        'bg-muted',
        'sm:flex-1'
      )

      // Check filter button skeleton
      expect(searchSkeletons?.[1]).toHaveClass(
        'rounded-md',
        'bg-muted',
        'sm:w-40'
      )
    })
  })

  describe('Products grid skeleton', () => {
    it('should render exactly 8 product card skeletons', () => {
      render(<Loading />)

      // Find all product card containers
      const productCards = document.querySelectorAll(
        '.overflow-hidden.rounded-lg.border.bg-card'
      )
      expect(productCards).toHaveLength(8)
    })

    it('should render correct grid layout', () => {
      render(<Loading />)

      // Check grid container
      const gridContainer = document.querySelector('.grid')
      expect(gridContainer).toHaveClass(
        'grid-cols-1',
        'gap-6',
        'sm:grid-cols-2',
        'lg:grid-cols-3',
        'xl:grid-cols-4'
      )
    })

    it('should render complete product card skeleton structure', () => {
      render(<Loading />)

      const firstCard = document.querySelector(
        '.overflow-hidden.rounded-lg.border.bg-card'
      )

      // Check image skeleton
      const imageSkeleton = firstCard?.querySelector('.aspect-\\[3\\/2\\]')
      expect(imageSkeleton).toHaveClass('animate-pulse', 'bg-muted')

      // Check content container
      const contentContainer = firstCard?.querySelector('.p-4.space-y-3')
      expect(contentContainer).toBeInTheDocument()

      // Check title skeleton in card
      const titleSkeleton = contentContainer?.querySelector('.h-5.w-3\\/4')
      expect(titleSkeleton).toHaveClass('animate-pulse', 'rounded', 'bg-muted')

      // Check detail skeletons
      const detailContainer = contentContainer?.querySelector('.space-y-1')
      const detailSkeletons = detailContainer?.querySelectorAll('.h-4')
      expect(detailSkeletons).toHaveLength(2)
      expect(detailSkeletons?.[0]).toHaveClass(
        'w-1/2',
        'animate-pulse',
        'rounded',
        'bg-muted'
      )
      expect(detailSkeletons?.[1]).toHaveClass(
        'w-1/3',
        'animate-pulse',
        'rounded',
        'bg-muted'
      )

      // Check button skeletons
      const buttonContainer = contentContainer?.querySelector('.space-y-2.pt-2')
      const buttonSkeletons = buttonContainer?.querySelectorAll('.h-8.w-full')
      expect(buttonSkeletons).toHaveLength(2)
      buttonSkeletons?.forEach(skeleton => {
        expect(skeleton).toHaveClass('animate-pulse', 'rounded', 'bg-muted')
      })
    })

    it('should use Array.from to generate skeletons', () => {
      // This test ensures the Array.from branch is covered
      const arrayFromSpy = jest.spyOn(Array, 'from')

      render(<Loading />)

      // Verify Array.from was called with length 8
      expect(arrayFromSpy).toHaveBeenCalledWith({ length: 8 })

      arrayFromSpy.mockRestore()
    })
  })

  describe('Layout structure', () => {
    it('should have correct container hierarchy', () => {
      const { container } = render(<Loading />)

      // Check main sections exist
      const mainDiv = container.querySelector('.min-h-screen')
      const headerSection = mainDiv?.querySelector('.py-12')
      const maxWidthContainer =
        headerSection?.querySelector('.mx-auto.max-w-7xl')
      expect(maxWidthContainer).toHaveClass('px-4', 'sm:px-6', 'lg:px-8')

      // Check products section
      const productsSection = headerSection?.querySelector('.py-8.sm\\:py-12')
      expect(productsSection).toBeInTheDocument()

      const productsContainer =
        productsSection?.querySelector('.mx-auto.max-w-7xl')
      expect(productsContainer).toHaveClass('px-4', 'sm:px-6', 'lg:px-8')
    })

    it('should have all animation classes applied', () => {
      render(<Loading />)

      // Count all elements with animate-pulse
      const animatedElements = document.querySelectorAll('.animate-pulse')

      // Should have: 1 title + 1 subtitle + 2 search/filter + (8 cards * 5 elements each)
      expect(animatedElements.length).toBeGreaterThanOrEqual(44)

      // Verify all have bg-muted
      animatedElements.forEach(element => {
        expect(element).toHaveClass('bg-muted')
      })
    })
  })
})
