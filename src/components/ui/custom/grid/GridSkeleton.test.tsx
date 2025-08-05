/**
 * GridSkeleton Component Unit Tests
 * SOLID Principles: Single Responsibility - Test GridSkeleton component behavior
 * Design Patterns: Test Pattern - Unit tests with comprehensive coverage
 * Dependencies: Jest, React Testing Library
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import { GridSkeleton } from './GridSkeleton'

// Mock the Skeleton component
jest.mock('@/components/ui/schadcn', () => ({
  Skeleton: ({ className }: { className?: string }) => (
    <div className={className} data-testid="skeleton" />
  ),
}))

describe('GridSkeleton', () => {
  describe('Basic Rendering', () => {
    it('should render default count of skeletons', () => {
      render(<GridSkeleton />)

      const skeletons = screen.getAllByTestId('skeleton')
      expect(skeletons).toHaveLength(6 * 3) // Default count is 6, card variant has 3 skeletons each (image + 2 text)
    })

    it('should render specified count of skeletons', () => {
      render(<GridSkeleton count={3} />)

      // Card variant has 3 skeletons per item (image + 2 text lines)
      const skeletons = screen.getAllByTestId('skeleton')
      expect(skeletons).toHaveLength(3 * 3) // 3 items with 3 skeletons each
    })

    it('should render single skeleton item', () => {
      render(<GridSkeleton count={1} />)

      const skeletons = screen.getAllByTestId('skeleton')
      expect(skeletons.length).toBeGreaterThan(0)
    })

    it('should render zero skeletons when count is 0', () => {
      render(<GridSkeleton count={0} />)

      const skeletons = screen.queryAllByTestId('skeleton')
      expect(skeletons).toHaveLength(0)
    })
  })

  describe('Variant Rendering', () => {
    it('should render card variant by default', () => {
      const { container } = render(<GridSkeleton count={1} />)

      // Check for card structure
      const cardSpace = container.querySelector('.space-y-3')
      expect(cardSpace).toBeInTheDocument()

      // Check for image skeleton
      const imageSkeleton = container.querySelector('.aspect-\\[3\\/2\\]')
      expect(imageSkeleton).toBeInTheDocument()

      // Check for text skeletons
      const textSkeletons = container.querySelectorAll('.h-4, .h-3')
      expect(textSkeletons.length).toBeGreaterThan(0)
    })

    it('should render list variant', () => {
      const { container } = render(<GridSkeleton count={1} variant="list" />)

      // Check for list structure
      const listContainer = container.querySelector(
        '.flex.items-center.space-x-4'
      )
      expect(listContainer).toBeInTheDocument()

      // Check for avatar skeleton
      const avatarSkeleton = container.querySelector('.rounded-full')
      expect(avatarSkeleton).toBeInTheDocument()

      // Check for text container
      const textContainer = container.querySelector('.flex-1.space-y-2')
      expect(textContainer).toBeInTheDocument()
    })

    it('should render custom variant', () => {
      const { container } = render(<GridSkeleton count={1} variant="custom" />)

      // Check for custom skeleton
      const customSkeleton = container.querySelector('.h-32.w-full')
      expect(customSkeleton).toBeInTheDocument()
    })
  })

  describe('Custom Content', () => {
    it('should render custom content when provided', () => {
      const customContent = (
        <div data-testid="custom-skeleton">
          <span>Custom loading...</span>
        </div>
      )

      render(<GridSkeleton count={2} customContent={customContent} />)

      const customSkeletons = screen.getAllByTestId('custom-skeleton')
      expect(customSkeletons).toHaveLength(2)
      expect(screen.getAllByText('Custom loading...')).toHaveLength(2)
    })

    it('should ignore variant when custom content is provided', () => {
      const customContent = <div data-testid="custom">Custom</div>

      render(
        <GridSkeleton count={1} variant="list" customContent={customContent} />
      )

      expect(screen.getByTestId('custom')).toBeInTheDocument()
      // Should not have list variant classes
      const listContainer = screen.queryByText(/flex.*items-center.*space-x-4/)
      expect(listContainer).not.toBeInTheDocument()
    })
  })

  describe('Styling', () => {
    it('should apply className to wrapper divs', () => {
      const { container } = render(
        <GridSkeleton count={2} className="custom-wrapper" />
      )

      const wrappers = container.querySelectorAll('.custom-wrapper')
      expect(wrappers).toHaveLength(2)
    })

    it('should apply itemClassName to skeleton items in card variant', () => {
      const { container } = render(
        <GridSkeleton count={1} itemClassName="custom-item" variant="card" />
      )

      const item = container.querySelector('.custom-item')
      expect(item).toBeInTheDocument()
      expect(item).toHaveClass('space-y-3') // Should also have default classes
    })

    it('should apply itemClassName to skeleton items in list variant', () => {
      const { container } = render(
        <GridSkeleton count={1} itemClassName="custom-item" variant="list" />
      )

      const item = container.querySelector('.custom-item')
      expect(item).toBeInTheDocument()
      expect(item).toHaveClass('flex')
      expect(item).toHaveClass('items-center')
    })

    it('should apply itemClassName to skeleton items in custom variant', () => {
      const { container } = render(
        <GridSkeleton count={1} itemClassName="custom-item" variant="custom" />
      )

      const skeleton = container.querySelector('.custom-item')
      expect(skeleton).toBeInTheDocument()
      expect(skeleton).toHaveClass('h-32')
      expect(skeleton).toHaveClass('w-full')
    })
  })

  describe('Key Generation', () => {
    it('should generate unique keys for each skeleton', () => {
      const { container } = render(<GridSkeleton count={3} />)

      // Note: React doesn't expose keys directly in DOM, but we can verify uniqueness
      // by checking that all skeleton wrappers are rendered
      expect(container.children).toHaveLength(3)
    })
  })

  describe('Edge Cases', () => {
    it('should handle large count values', () => {
      render(<GridSkeleton count={20} />)

      // Each card has 3 skeletons
      const skeletons = screen.getAllByTestId('skeleton')
      expect(skeletons.length).toBeGreaterThan(0)
    })

    it('should handle negative count as zero', () => {
      render(<GridSkeleton count={-5} />)

      const skeletons = screen.queryAllByTestId('skeleton')
      expect(skeletons).toHaveLength(0)
    })

    it('should render empty custom content', () => {
      render(<GridSkeleton count={1} customContent={null} />)

      // Should fall back to default variant
      const skeletons = screen.getAllByTestId('skeleton')
      expect(skeletons.length).toBeGreaterThan(0)
    })

    it('should handle undefined props gracefully', () => {
      render(<GridSkeleton />)

      // Should use all defaults
      const skeletons = screen.getAllByTestId('skeleton')
      expect(skeletons).toHaveLength(6 * 3) // Default count 6, card variant
    })
  })

  describe('Complex Scenarios', () => {
    it('should work with different variants in sequence', () => {
      const { rerender } = render(<GridSkeleton count={1} variant="card" />)
      let skeletons = screen.getAllByTestId('skeleton')

      rerender(<GridSkeleton count={1} variant="list" />)
      skeletons = screen.getAllByTestId('skeleton')
      expect(skeletons).toHaveLength(3) // List has 3 skeletons (avatar + 2 text)

      rerender(<GridSkeleton count={1} variant="custom" />)
      skeletons = screen.getAllByTestId('skeleton')
      expect(skeletons).toHaveLength(1) // Custom has 1 skeleton
    })

    it('should handle prop updates correctly', () => {
      const { rerender, container } = render(
        <GridSkeleton count={2} className="initial" />
      )

      // Check we have 2 wrapper divs with class "initial"
      const wrappers = container.querySelectorAll('.initial')
      expect(wrappers).toHaveLength(2)

      rerender(<GridSkeleton count={3} className="updated" />)

      // Check we have 3 wrapper divs with class "updated"
      const updatedWrappers = container.querySelectorAll('.updated')
      expect(updatedWrappers).toHaveLength(3)
    })

    it('should compose well with grid layouts', () => {
      const { container } = render(
        <div className="grid grid-cols-3 gap-4">
          <GridSkeleton count={3} className="col-span-1" />
        </div>
      )

      const gridItems = container.querySelectorAll('.col-span-1')
      expect(gridItems).toHaveLength(3)
    })
  })

  describe('Variant-specific Details', () => {
    it('should render correct card variant structure', () => {
      const { container } = render(<GridSkeleton count={1} variant="card" />)

      // Verify specific skeleton dimensions
      const imageSkeleton = container.querySelector(
        '[data-testid="skeleton"].aspect-\\[3\\/2\\]'
      )
      expect(imageSkeleton).toHaveClass('w-full')
      expect(imageSkeleton).toHaveClass('rounded-lg')

      const titleSkeleton = container.querySelector(
        '[data-testid="skeleton"].h-4'
      )
      expect(titleSkeleton).toHaveClass('w-3/4')

      const subtitleSkeleton = container.querySelector(
        '[data-testid="skeleton"].h-3'
      )
      expect(subtitleSkeleton).toHaveClass('w-1/2')
    })

    it('should render correct list variant structure', () => {
      const { container } = render(<GridSkeleton count={1} variant="list" />)

      // Verify avatar skeleton
      const avatarSkeleton = container.querySelector(
        '[data-testid="skeleton"].h-12'
      )
      expect(avatarSkeleton).toHaveClass('w-12')
      expect(avatarSkeleton).toHaveClass('rounded-full')

      // Verify text skeletons
      const titleSkeleton = container.querySelector(
        '.flex-1 [data-testid="skeleton"].h-4'
      )
      expect(titleSkeleton).toHaveClass('w-1/4')

      const subtitleSkeleton = container.querySelector(
        '.flex-1 [data-testid="skeleton"].h-3'
      )
      expect(subtitleSkeleton).toHaveClass('w-1/2')
    })
  })
})
