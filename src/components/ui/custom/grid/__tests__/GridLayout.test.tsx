/**
 * GridLayout Component Unit Tests
 * SOLID Principles: Single Responsibility - Test GridLayout component behavior
 * Design Patterns: Test Pattern - Unit tests with comprehensive coverage
 * Dependencies: Jest, React Testing Library
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import { GridLayout } from '../GridLayout'

describe('GridLayout', () => {
  describe('Basic Rendering', () => {
    it('should render children correctly', () => {
      render(
        <GridLayout>
          <div>Test content</div>
        </GridLayout>
      )

      expect(screen.getByText('Test content')).toBeInTheDocument()
    })

    it('should render multiple children', () => {
      render(
        <GridLayout>
          <div>First child</div>
          <div>Second child</div>
          <div>Third child</div>
        </GridLayout>
      )

      expect(screen.getByText('First child')).toBeInTheDocument()
      expect(screen.getByText('Second child')).toBeInTheDocument()
      expect(screen.getByText('Third child')).toBeInTheDocument()
    })

    it('should render as a div element', () => {
      const { container } = render(
        <GridLayout>
          <div>Content</div>
        </GridLayout>
      )

      const element = container.firstChild
      expect(element?.nodeName).toBe('DIV')
    })
  })

  describe('Default Props', () => {
    it('should apply default gap (md)', () => {
      const { container } = render(
        <GridLayout>
          <div>Content</div>
        </GridLayout>
      )

      const element = container.firstChild as HTMLElement
      expect(element).toHaveClass('gap-4') // md gap
    })

    it('should apply default maxWidth (xl)', () => {
      const { container } = render(
        <GridLayout>
          <div>Content</div>
        </GridLayout>
      )

      const element = container.firstChild as HTMLElement
      expect(element).toHaveClass('max-w-screen-xl')
      expect(element).toHaveClass('mx-auto')
    })

    it('should apply default padding (true)', () => {
      const { container } = render(
        <GridLayout>
          <div>Content</div>
        </GridLayout>
      )

      const element = container.firstChild as HTMLElement
      expect(element).toHaveClass('px-4')
      expect(element).toHaveClass('sm:px-6')
      expect(element).toHaveClass('lg:px-8')
    })

    it('should always have base grid classes', () => {
      const { container } = render(
        <GridLayout>
          <div>Content</div>
        </GridLayout>
      )

      const element = container.firstChild as HTMLElement
      expect(element).toHaveClass('grid')
      expect(element).toHaveClass('w-full')
    })
  })

  describe('Gap Prop', () => {
    it('should apply gap none class', () => {
      const { container } = render(
        <GridLayout gap="none">
          <div>Content</div>
        </GridLayout>
      )

      const element = container.firstChild as HTMLElement
      expect(element).toHaveClass('gap-0')
      expect(element).not.toHaveClass('gap-4') // Should not have default
    })

    it('should apply gap sm class', () => {
      const { container } = render(
        <GridLayout gap="sm">
          <div>Content</div>
        </GridLayout>
      )

      const element = container.firstChild as HTMLElement
      expect(element).toHaveClass('gap-2')
    })

    it('should apply gap md class', () => {
      const { container } = render(
        <GridLayout gap="md">
          <div>Content</div>
        </GridLayout>
      )

      const element = container.firstChild as HTMLElement
      expect(element).toHaveClass('gap-4')
    })

    it('should apply gap lg class', () => {
      const { container } = render(
        <GridLayout gap="lg">
          <div>Content</div>
        </GridLayout>
      )

      const element = container.firstChild as HTMLElement
      expect(element).toHaveClass('gap-6')
    })

    it('should apply gap xl class', () => {
      const { container } = render(
        <GridLayout gap="xl">
          <div>Content</div>
        </GridLayout>
      )

      const element = container.firstChild as HTMLElement
      expect(element).toHaveClass('gap-8')
    })
  })

  describe('MaxWidth Prop', () => {
    it('should apply maxWidth sm with centering', () => {
      const { container } = render(
        <GridLayout maxWidth="sm">
          <div>Content</div>
        </GridLayout>
      )

      const element = container.firstChild as HTMLElement
      expect(element).toHaveClass('max-w-screen-sm')
      expect(element).toHaveClass('mx-auto')
    })

    it('should apply maxWidth md with centering', () => {
      const { container } = render(
        <GridLayout maxWidth="md">
          <div>Content</div>
        </GridLayout>
      )

      const element = container.firstChild as HTMLElement
      expect(element).toHaveClass('max-w-screen-md')
      expect(element).toHaveClass('mx-auto')
    })

    it('should apply maxWidth lg with centering', () => {
      const { container } = render(
        <GridLayout maxWidth="lg">
          <div>Content</div>
        </GridLayout>
      )

      const element = container.firstChild as HTMLElement
      expect(element).toHaveClass('max-w-screen-lg')
      expect(element).toHaveClass('mx-auto')
    })

    it('should apply maxWidth xl with centering', () => {
      const { container } = render(
        <GridLayout maxWidth="xl">
          <div>Content</div>
        </GridLayout>
      )

      const element = container.firstChild as HTMLElement
      expect(element).toHaveClass('max-w-screen-xl')
      expect(element).toHaveClass('mx-auto')
    })

    it('should apply maxWidth 2xl with centering', () => {
      const { container } = render(
        <GridLayout maxWidth="2xl">
          <div>Content</div>
        </GridLayout>
      )

      const element = container.firstChild as HTMLElement
      expect(element).toHaveClass('max-w-screen-2xl')
      expect(element).toHaveClass('mx-auto')
    })

    it('should apply maxWidth full without centering', () => {
      const { container } = render(
        <GridLayout maxWidth="full">
          <div>Content</div>
        </GridLayout>
      )

      const element = container.firstChild as HTMLElement
      expect(element).toHaveClass('max-w-full')
      expect(element).not.toHaveClass('mx-auto')
    })
  })

  describe('Padding Prop', () => {
    it('should apply padding classes when true', () => {
      const { container } = render(
        <GridLayout padding={true}>
          <div>Content</div>
        </GridLayout>
      )

      const element = container.firstChild as HTMLElement
      expect(element).toHaveClass('px-4')
      expect(element).toHaveClass('sm:px-6')
      expect(element).toHaveClass('lg:px-8')
    })

    it('should not apply padding classes when false', () => {
      const { container } = render(
        <GridLayout padding={false}>
          <div>Content</div>
        </GridLayout>
      )

      const element = container.firstChild as HTMLElement
      expect(element).not.toHaveClass('px-4')
      expect(element).not.toHaveClass('sm:px-6')
      expect(element).not.toHaveClass('lg:px-8')
    })
  })

  describe('Custom className', () => {
    it('should apply custom className along with default classes', () => {
      const { container } = render(
        <GridLayout className="custom-grid-class">
          <div>Content</div>
        </GridLayout>
      )

      const element = container.firstChild as HTMLElement
      expect(element).toHaveClass('custom-grid-class')
      expect(element).toHaveClass('grid') // Should still have base classes
      expect(element).toHaveClass('w-full')
      expect(element).toHaveClass('gap-4') // Should still have default gap
    })

    it('should handle multiple custom classes', () => {
      const { container } = render(
        <GridLayout className="class1 class2 class3">
          <div>Content</div>
        </GridLayout>
      )

      const element = container.firstChild as HTMLElement
      expect(element).toHaveClass('class1')
      expect(element).toHaveClass('class2')
      expect(element).toHaveClass('class3')
    })

    it('should handle undefined className', () => {
      const { container } = render(
        <GridLayout className={undefined}>
          <div>Content</div>
        </GridLayout>
      )

      const element = container.firstChild as HTMLElement
      expect(element).toHaveClass('grid')
      expect(element).toHaveClass('w-full')
    })
  })

  describe('Prop Combinations', () => {
    it('should apply all props correctly together', () => {
      const { container } = render(
        <GridLayout
          gap="lg"
          maxWidth="md"
          padding={false}
          className="custom-class"
        >
          <div>Content</div>
        </GridLayout>
      )

      const element = container.firstChild as HTMLElement
      expect(element).toHaveClass('grid')
      expect(element).toHaveClass('w-full')
      expect(element).toHaveClass('gap-6') // lg gap
      expect(element).toHaveClass('max-w-screen-md')
      expect(element).toHaveClass('mx-auto')
      expect(element).toHaveClass('custom-class')
      expect(element).not.toHaveClass('px-4') // padding false
    })

    it('should handle edge case with full width and no padding', () => {
      const { container } = render(
        <GridLayout maxWidth="full" padding={false}>
          <div>Content</div>
        </GridLayout>
      )

      const element = container.firstChild as HTMLElement
      expect(element).toHaveClass('max-w-full')
      expect(element).not.toHaveClass('mx-auto')
      expect(element).not.toHaveClass('px-4')
    })
  })

  describe('Edge Cases', () => {
    it('should render with empty children', () => {
      const { container } = render(<GridLayout>{''}</GridLayout>)

      const element = container.firstChild as HTMLElement
      expect(element).toBeInTheDocument()
      expect(element.textContent).toBe('')
    })

    it('should render with null children', () => {
      const { container } = render(<GridLayout>{null}</GridLayout>)

      const element = container.firstChild as HTMLElement
      expect(element).toBeInTheDocument()
      expect(element.textContent).toBe('')
    })

    it('should render with fragment children', () => {
      render(
        <GridLayout>
          <>
            <div>Fragment 1</div>
            <div>Fragment 2</div>
          </>
        </GridLayout>
      )

      expect(screen.getByText('Fragment 1')).toBeInTheDocument()
      expect(screen.getByText('Fragment 2')).toBeInTheDocument()
    })

    it('should handle conditional children', () => {
      const ConditionalContent = ({ show }: { show: boolean }) => (
        <GridLayout>
          {show && <div>Conditional content</div>}
          <div>Always visible</div>
        </GridLayout>
      )

      const { rerender } = render(<ConditionalContent show={true} />)
      expect(screen.getByText('Conditional content')).toBeInTheDocument()
      expect(screen.getByText('Always visible')).toBeInTheDocument()

      rerender(<ConditionalContent show={false} />)
      expect(screen.queryByText('Conditional content')).not.toBeInTheDocument()
      expect(screen.getByText('Always visible')).toBeInTheDocument()
    })
  })

  describe('Responsive Grid Patterns', () => {
    it('should work well with responsive grid columns', () => {
      const { container } = render(
        <GridLayout className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
        </GridLayout>
      )

      const element = container.firstChild as HTMLElement
      expect(element).toHaveClass('grid-cols-1')
      expect(element).toHaveClass('md:grid-cols-2')
      expect(element).toHaveClass('lg:grid-cols-3')
    })

    it('should maintain grid structure with nested grids', () => {
      render(
        <GridLayout>
          <GridLayout gap="sm">
            <div>Nested item 1</div>
            <div>Nested item 2</div>
          </GridLayout>
        </GridLayout>
      )

      expect(screen.getByText('Nested item 1')).toBeInTheDocument()
      expect(screen.getByText('Nested item 2')).toBeInTheDocument()
    })
  })
})
