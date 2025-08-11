/**
 * Unit tests for CampaignTimer Component
 * SOLID Principles: SRP - Testing single responsibility
 * Design Patterns: AAA Pattern (Arrange, Act, Assert)
 * Dependencies: Jest, Testing Library, React
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import { CampaignTimer } from '../CampaignTimer'

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Tag: jest.fn(({ className }: any) => (
    <div data-testid="tag-icon" className={className}>Tag Icon</div>
  )),
}))

describe('CampaignTimer', () => {
  describe('Component Rendering', () => {
    it('should render the component', () => {
      const { container } = render(<CampaignTimer />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('should render Campaign text', () => {
      render(<CampaignTimer />)
      expect(screen.getByText('Campaign')).toBeInTheDocument()
    })

    it('should render Tag icon', () => {
      render(<CampaignTimer />)
      expect(screen.getByTestId('tag-icon')).toBeInTheDocument()
    })
  })

  describe('Props Handling', () => {
    it('should apply default classes when no className prop provided', () => {
      const { container } = render(<CampaignTimer />)
      const element = container.firstChild as HTMLElement

      expect(element).toHaveClass('flex')
      expect(element).toHaveClass('items-center')
      expect(element).toHaveClass('gap-1')
      expect(element).toHaveClass('text-sm')
      expect(element).toHaveClass('text-green-600')
      expect(element).toHaveClass('dark:text-green-400')
      expect(element).toHaveClass('font-medium')
    })

    it('should apply custom className when provided', () => {
      const customClass = 'custom-test-class'
      const { container } = render(<CampaignTimer className={customClass} />)
      const element = container.firstChild as HTMLElement

      expect(element).toHaveClass(customClass)
    })

    it('should combine default and custom classes', () => {
      const customClass = 'mt-4 mb-2'
      const { container } = render(<CampaignTimer className={customClass} />)
      const element = container.firstChild as HTMLElement

      // Should have both default and custom classes
      expect(element).toHaveClass('flex')
      expect(element).toHaveClass('items-center')
      expect(element).toHaveClass('gap-1')
      expect(element).toHaveClass('text-sm')
      expect(element).toHaveClass('text-green-600')
      expect(element).toHaveClass('dark:text-green-400')
      expect(element).toHaveClass('font-medium')
      expect(element).toHaveClass('mt-4')
      expect(element).toHaveClass('mb-2')
    })

    it('should handle empty string className', () => {
      const { container } = render(<CampaignTimer className="" />)
      const element = container.firstChild as HTMLElement

      expect(element).toHaveClass('flex')
      expect(element).toHaveClass('items-center')
      expect(element).toHaveClass('gap-1')
    })
  })

  describe('Icon Styling', () => {
    it('should apply correct size classes to Tag icon', () => {
      render(<CampaignTimer />)
      const icon = screen.getByTestId('tag-icon')

      expect(icon).toHaveClass('h-3')
      expect(icon).toHaveClass('w-3')
    })
  })

  describe('Layout Structure', () => {
    it('should have correct DOM structure', () => {
      const { container } = render(<CampaignTimer />)

      const wrapper = container.firstChild as HTMLElement
      expect(wrapper.tagName).toBe('DIV')

      const children = wrapper.children
      expect(children).toHaveLength(2)

      // First child should be the icon
      expect(children[0]).toHaveAttribute('data-testid', 'tag-icon')

      // Second child should be the span with text
      expect(children[1]?.tagName).toBe('SPAN')
      expect(children[1]?.textContent).toBe('Campaign')
    })

    it('should render span element for text', () => {
      const { container } = render(<CampaignTimer />)
      const span = container.querySelector('span')

      expect(span).toBeInTheDocument()
      expect(span?.textContent).toBe('Campaign')
    })
  })

  describe('Styling Classes', () => {
    it('should have flex layout classes', () => {
      const { container } = render(<CampaignTimer />)
      const element = container.firstChild as HTMLElement

      expect(element).toHaveClass('flex')
      expect(element).toHaveClass('items-center')
      expect(element).toHaveClass('gap-1')
    })

    it('should have text styling classes', () => {
      const { container } = render(<CampaignTimer />)
      const element = container.firstChild as HTMLElement

      expect(element).toHaveClass('text-sm')
      expect(element).toHaveClass('font-medium')
    })

    it('should have color classes for light and dark mode', () => {
      const { container } = render(<CampaignTimer />)
      const element = container.firstChild as HTMLElement

      expect(element).toHaveClass('text-green-600')
      expect(element).toHaveClass('dark:text-green-400')
    })
  })

  describe('Edge Cases', () => {
    it('should handle undefined className prop', () => {
      const { container } = render(<CampaignTimer />)
      const element = container.firstChild as HTMLElement

      // Should apply default classes
      expect(element).toHaveClass('flex')
      expect(element).toHaveClass('items-center')
    })

    it('should handle multiple className values', () => {
      const multipleClasses = 'class1 class2 class3'
      const { container } = render(
        <CampaignTimer className={multipleClasses} />
      )
      const element = container.firstChild as HTMLElement

      expect(element).toHaveClass('class1')
      expect(element).toHaveClass('class2')
      expect(element).toHaveClass('class3')
    })

    it('should handle className with special characters', () => {
      const specialClass = 'hover:bg-green-100 sm:text-lg'
      const { container } = render(<CampaignTimer className={specialClass} />)
      const element = container.firstChild as HTMLElement

      expect(element).toHaveClass('hover:bg-green-100')
      expect(element).toHaveClass('sm:text-lg')
    })
  })

  describe('Accessibility', () => {
    it('should have readable text content', () => {
      render(<CampaignTimer />)
      const text = screen.getByText('Campaign')

      expect(text).toBeInTheDocument()
      expect(text).toBeVisible()
    })

    it('should maintain text hierarchy with span element', () => {
      const { container } = render(<CampaignTimer />)
      const span = container.querySelector('span')

      expect(span).toBeInTheDocument()
      expect(span?.tagName).toBe('SPAN')
    })
  })
})
