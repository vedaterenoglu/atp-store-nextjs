/**
 * Unit tests for SliderIndicator Component
 * SOLID Principles: SRP - Testing single responsibility
 * Design Patterns: AAA Pattern (Arrange, Act, Assert)
 * Dependencies: Jest, Testing Library, React
 */

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { SliderIndicator } from './SliderIndicator'

// Mock the cn utility
jest.mock('@/lib/utils', () => ({
  cn: (...classes: (string | undefined | boolean)[]) =>
    classes.filter(Boolean).join(' '),
}))

describe('SliderIndicator', () => {
  const defaultProps = {
    total: 5,
    current: 2,
  }

  describe('Component Rendering', () => {
    it('should render the component', () => {
      const { container } = render(<SliderIndicator {...defaultProps} />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('should render correct number of indicators', () => {
      render(<SliderIndicator {...defaultProps} />)
      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(5)
    })

    it('should render no indicators when total is 0', () => {
      render(<SliderIndicator total={0} current={0} />)
      const buttons = screen.queryAllByRole('button')
      expect(buttons).toHaveLength(0)
    })

    it('should render single indicator when total is 1', () => {
      render(<SliderIndicator total={1} current={0} />)
      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(1)
    })
  })

  describe('Indicator Selection', () => {
    it('should call onSelect with correct index when indicator is clicked', () => {
      const onSelect = jest.fn()
      render(<SliderIndicator {...defaultProps} onSelect={onSelect} />)

      const buttons = screen.getAllByRole('button')
      const targetButton = buttons[3]
      if (targetButton) {
        fireEvent.click(targetButton)
      }

      expect(onSelect).toHaveBeenCalledWith(3)
    })

    it('should not throw error when onSelect is not provided', () => {
      render(<SliderIndicator {...defaultProps} />)

      const buttons = screen.getAllByRole('button')
      const firstButton = buttons[0]
      if (firstButton) {
        expect(() => fireEvent.click(firstButton)).not.toThrow()
      }
    })

    it('should call onSelect for each different indicator', () => {
      const onSelect = jest.fn()
      render(<SliderIndicator total={3} current={0} onSelect={onSelect} />)

      const buttons = screen.getAllByRole('button')
      if (buttons[0]) fireEvent.click(buttons[0])
      if (buttons[1]) fireEvent.click(buttons[1])
      if (buttons[2]) fireEvent.click(buttons[2])

      expect(onSelect).toHaveBeenCalledTimes(3)
      expect(onSelect).toHaveBeenNthCalledWith(1, 0)
      expect(onSelect).toHaveBeenNthCalledWith(2, 1)
      expect(onSelect).toHaveBeenNthCalledWith(3, 2)
    })

    it('should handle optional chaining for onSelect', () => {
      const { container } = render(<SliderIndicator {...defaultProps} />)

      const buttons = container.querySelectorAll('button')
      buttons.forEach(button => {
        expect(() => fireEvent.click(button)).not.toThrow()
      })
    })
  })

  describe('Active State Styling', () => {
    it('should apply active styles to current indicator', () => {
      render(<SliderIndicator total={5} current={2} />)

      const buttons = screen.getAllByRole('button')
      expect(buttons[2]).toHaveClass('bg-primary')
      expect(buttons[2]).toHaveClass('w-8')
    })

    it('should apply inactive styles to non-current indicators', () => {
      render(<SliderIndicator total={5} current={2} />)

      const buttons = screen.getAllByRole('button')
      ;[0, 1, 3, 4].forEach(index => {
        expect(buttons[index]).toHaveClass('bg-muted-foreground/30')
        expect(buttons[index]).toHaveClass('hover:bg-muted-foreground/50')
        expect(buttons[index]).not.toHaveClass('bg-primary')
        expect(buttons[index]).not.toHaveClass('w-8')
      })
    })

    it('should update active indicator when current changes', () => {
      const { rerender } = render(<SliderIndicator total={3} current={0} />)

      let buttons = screen.getAllByRole('button')
      expect(buttons[0]).toHaveClass('bg-primary')

      rerender(<SliderIndicator total={3} current={1} />)
      buttons = screen.getAllByRole('button')
      expect(buttons[0]).not.toHaveClass('bg-primary')
      expect(buttons[1]).toHaveClass('bg-primary')

      rerender(<SliderIndicator total={3} current={2} />)
      buttons = screen.getAllByRole('button')
      expect(buttons[1]).not.toHaveClass('bg-primary')
      expect(buttons[2]).toHaveClass('bg-primary')
    })
  })

  describe('Props Handling', () => {
    it('should apply default className when none provided', () => {
      const { container } = render(<SliderIndicator {...defaultProps} />)
      const wrapper = container.firstChild as HTMLElement

      expect(wrapper).toHaveClass('flex')
      expect(wrapper).toHaveClass('gap-2')
      expect(wrapper).toHaveClass('justify-center')
    })

    it('should apply custom className when provided', () => {
      const customClass = 'custom-indicator-class'
      const { container } = render(
        <SliderIndicator {...defaultProps} className={customClass} />
      )
      const wrapper = container.firstChild as HTMLElement

      expect(wrapper).toHaveClass(customClass)
    })

    it('should combine default and custom classes', () => {
      const customClass = 'mt-4 mb-2'
      const { container } = render(
        <SliderIndicator {...defaultProps} className={customClass} />
      )
      const wrapper = container.firstChild as HTMLElement

      expect(wrapper).toHaveClass('flex')
      expect(wrapper).toHaveClass('gap-2')
      expect(wrapper).toHaveClass('justify-center')
      expect(wrapper).toHaveClass('mt-4')
      expect(wrapper).toHaveClass('mb-2')
    })

    it('should handle empty string className', () => {
      const { container } = render(
        <SliderIndicator {...defaultProps} className="" />
      )
      const wrapper = container.firstChild as HTMLElement

      expect(wrapper).toHaveClass('flex')
      expect(wrapper).toHaveClass('gap-2')
      expect(wrapper).toHaveClass('justify-center')
    })

    it('should handle undefined className', () => {
      const { container } = render(<SliderIndicator {...defaultProps} />)
      const wrapper = container.firstChild as HTMLElement

      expect(wrapper).toHaveClass('flex')
    })
  })

  describe('Accessibility', () => {
    it('should have correct aria-label for each indicator', () => {
      render(<SliderIndicator total={3} current={0} />)

      const buttons = screen.getAllByRole('button')
      expect(buttons[0]).toHaveAttribute('aria-label', 'Go to slide 1')
      expect(buttons[1]).toHaveAttribute('aria-label', 'Go to slide 2')
      expect(buttons[2]).toHaveAttribute('aria-label', 'Go to slide 3')
    })

    it('should have descriptive aria-labels for large numbers', () => {
      render(<SliderIndicator total={10} current={0} />)

      const buttons = screen.getAllByRole('button')
      expect(buttons[9]).toHaveAttribute('aria-label', 'Go to slide 10')
    })
  })

  describe('Styling Classes', () => {
    it('should apply common styles to all indicators', () => {
      render(<SliderIndicator {...defaultProps} />)

      const buttons = screen.getAllByRole('button')
      buttons.forEach(button => {
        expect(button).toHaveClass('rounded-full')
        expect(button).toHaveClass('transition-all')
        expect(button).toHaveClass('duration-300')
        expect(button).toHaveClass('cursor-pointer')
        expect(button).toHaveClass('h-2')
      })
    })

    it('should apply different width to active indicator', () => {
      render(<SliderIndicator total={3} current={1} />)

      const buttons = screen.getAllByRole('button')
      expect(buttons[0]).toHaveClass('w-2')
      expect(buttons[1]).toHaveClass('w-8') // Active
      expect(buttons[2]).toHaveClass('w-2')
    })
  })

  describe('Edge Cases', () => {
    it('should handle current index out of bounds (negative)', () => {
      render(<SliderIndicator total={5} current={-1} />)

      const buttons = screen.getAllByRole('button')
      // No indicator should be active
      buttons.forEach(button => {
        expect(button).not.toHaveClass('bg-primary')
        expect(button).not.toHaveClass('w-8')
      })
    })

    it('should handle current index out of bounds (greater than total)', () => {
      render(<SliderIndicator total={3} current={5} />)

      const buttons = screen.getAllByRole('button')
      // No indicator should be active
      buttons.forEach(button => {
        expect(button).not.toHaveClass('bg-primary')
        expect(button).not.toHaveClass('w-8')
      })
    })

    it('should handle large number of indicators', () => {
      render(<SliderIndicator total={20} current={10} />)

      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(20)
      expect(buttons[10]).toHaveClass('bg-primary')
    })

    it('should handle current equal to total minus one', () => {
      render(<SliderIndicator total={5} current={4} />)

      const buttons = screen.getAllByRole('button')
      expect(buttons[4]).toHaveClass('bg-primary')
      expect(buttons[4]).toHaveClass('w-8')
    })

    it('should handle fractional or invalid numbers gracefully', () => {
      // TypeScript would normally prevent this, but testing runtime behavior
      render(<SliderIndicator total={3.5 as number} current={1} />)

      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(3) // Array.from truncates to integer
    })
  })

  describe('DOM Structure', () => {
    it('should have correct DOM hierarchy', () => {
      const { container } = render(<SliderIndicator {...defaultProps} />)

      const wrapper = container.firstChild as HTMLElement
      expect(wrapper.tagName).toBe('DIV')

      const buttons = wrapper.querySelectorAll('button')
      expect(buttons).toHaveLength(5)
    })

    it('should render buttons as direct children', () => {
      const { container } = render(<SliderIndicator {...defaultProps} />)

      const wrapper = container.firstChild as HTMLElement
      const children = wrapper.children

      for (let i = 0; i < children.length; i++) {
        expect(children[i]?.tagName).toBe('BUTTON')
      }
    })

    it('should maintain consistent key prop', () => {
      const { rerender } = render(<SliderIndicator total={3} current={0} />)

      let buttons = screen.getAllByRole('button')
      const firstButtonLabel = buttons[0]?.getAttribute('aria-label')

      rerender(<SliderIndicator total={3} current={1} />)
      buttons = screen.getAllByRole('button')
      expect(buttons[0]?.getAttribute('aria-label')).toBe(firstButtonLabel)
    })
  })

  describe('Array Generation', () => {
    it('should create correct array for small total', () => {
      render(<SliderIndicator total={2} current={0} />)
      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(2)
    })

    it('should create empty array for zero total', () => {
      const { container } = render(<SliderIndicator total={0} current={0} />)
      const wrapper = container.firstChild as HTMLElement
      expect(wrapper.children).toHaveLength(0)
    })

    it('should handle negative total as zero', () => {
      render(<SliderIndicator total={-5 as number} current={0} />)
      const buttons = screen.queryAllByRole('button')
      expect(buttons).toHaveLength(0)
    })
  })
})
