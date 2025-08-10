/**
 * Unit tests for QuantityCounter Component
 * SOLID Principles: SRP - Testing single responsibility
 * Design Patterns: AAA Pattern (Arrange, Act, Assert)
 * Dependencies: Jest, Testing Library, React
 */

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { QuantityCounter } from '../QuantityCounter'

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Minus: ({ className }: { className?: string }) => (
    <div data-testid="minus-icon" className={className} />
  ),
  Plus: ({ className }: { className?: string }) => (
    <div data-testid="plus-icon" className={className} />
  ),
}))

// Mock Button component
jest.mock('@/components/ui/schadcn/button', () => ({
  Button: ({
    children,
    size,
    variant,
    className,
    onClick,
    disabled,
  }: {
    children?: React.ReactNode
    size?: string
    variant?: string
    className?: string
    onClick?: (e: React.MouseEvent) => void
    disabled?: boolean
  }) => (
    <button
      data-size={size}
      data-variant={variant}
      className={className}
      onClick={e => {
        if (onClick && !disabled) {
          onClick(e)
        }
      }}
      disabled={disabled}
    >
      {children}
    </button>
  ),
}))

describe('QuantityCounter', () => {
  const defaultProps = {
    quantity: 5,
    onDecrease: jest.fn(),
    onIncrease: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Component Rendering', () => {
    it('should render the component', () => {
      const { container } = render(<QuantityCounter {...defaultProps} />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('should display the current quantity', () => {
      render(<QuantityCounter {...defaultProps} />)
      expect(screen.getByText('5')).toBeInTheDocument()
    })

    it('should render decrease button with minus icon', () => {
      render(<QuantityCounter {...defaultProps} />)
      const buttons = screen.getAllByRole('button')
      const decreaseButton = buttons[0]
      const minusIcon = screen.getAllByTestId('minus-icon')[0]

      expect(decreaseButton).toBeInTheDocument()
      expect(minusIcon).toBeInTheDocument()
    })

    it('should render increase button with plus icon', () => {
      render(<QuantityCounter {...defaultProps} />)
      const buttons = screen.getAllByRole('button')
      const increaseButton = buttons[1]
      const plusIcon = screen.getAllByTestId('plus-icon')[0]

      expect(increaseButton).toBeInTheDocument()
      expect(plusIcon).toBeInTheDocument()
    })
  })

  describe('Button Click Handlers', () => {
    it('should call onDecrease when decrease button is clicked', () => {
      const onDecrease = jest.fn()
      render(<QuantityCounter {...defaultProps} onDecrease={onDecrease} />)

      const buttons = screen.getAllByRole('button')
      const decreaseButton = buttons[0]
      if (decreaseButton) {
        fireEvent.click(decreaseButton)
      }

      expect(onDecrease).toHaveBeenCalledTimes(1)
    })

    it('should call onIncrease when increase button is clicked', () => {
      const onIncrease = jest.fn()
      render(<QuantityCounter {...defaultProps} onIncrease={onIncrease} />)

      const buttons = screen.getAllByRole('button')
      const increaseButton = buttons[1]
      if (increaseButton) {
        fireEvent.click(increaseButton)
      }

      expect(onIncrease).toHaveBeenCalledTimes(1)
    })

    it('should stop propagation on decrease button click', () => {
      const onDecrease = jest.fn()
      const stopPropagationSpy = jest.fn()

      render(<QuantityCounter {...defaultProps} onDecrease={onDecrease} />)

      const buttons = screen.getAllByRole('button')

      // Create a synthetic event with stopPropagation
      const event = new MouseEvent('click', { bubbles: true })
      Object.defineProperty(event, 'stopPropagation', {
        value: stopPropagationSpy,
        writable: false,
      })

      // Dispatch the event
      buttons[0]?.dispatchEvent(event)

      expect(stopPropagationSpy).toHaveBeenCalled()
      expect(onDecrease).toHaveBeenCalled()
    })

    it('should stop propagation on increase button click', () => {
      const onIncrease = jest.fn()
      const stopPropagationSpy = jest.fn()

      render(<QuantityCounter {...defaultProps} onIncrease={onIncrease} />)

      const buttons = screen.getAllByRole('button')

      // Create a synthetic event with stopPropagation
      const event = new MouseEvent('click', { bubbles: true })
      Object.defineProperty(event, 'stopPropagation', {
        value: stopPropagationSpy,
        writable: false,
      })

      // Dispatch the event
      buttons[1]?.dispatchEvent(event)

      expect(stopPropagationSpy).toHaveBeenCalled()
      expect(onIncrease).toHaveBeenCalled()
    })
  })

  describe('Min/Max Boundaries', () => {
    it('should disable decrease button when quantity equals min', () => {
      render(<QuantityCounter {...defaultProps} quantity={0} min={0} />)

      const buttons = screen.getAllByRole('button')
      expect(buttons[0]).toBeDisabled()
      expect(buttons[1]).not.toBeDisabled()
    })

    it('should disable increase button when quantity equals max', () => {
      render(<QuantityCounter {...defaultProps} quantity={99} max={99} />)

      const buttons = screen.getAllByRole('button')
      expect(buttons[0]).not.toBeDisabled()
      expect(buttons[1]).toBeDisabled()
    })

    it('should disable decrease button when quantity is below min', () => {
      render(<QuantityCounter {...defaultProps} quantity={2} min={5} />)

      const buttons = screen.getAllByRole('button')
      expect(buttons[0]).toBeDisabled()
    })

    it('should disable increase button when quantity is above max', () => {
      render(<QuantityCounter {...defaultProps} quantity={15} max={10} />)

      const buttons = screen.getAllByRole('button')
      expect(buttons[1]).toBeDisabled()
    })

    it('should use default min value of 0', () => {
      render(<QuantityCounter {...defaultProps} quantity={0} />)

      const buttons = screen.getAllByRole('button')
      expect(buttons[0]).toBeDisabled()
    })

    it('should use default max value of 99', () => {
      render(<QuantityCounter {...defaultProps} quantity={99} />)

      const buttons = screen.getAllByRole('button')
      expect(buttons[1]).toBeDisabled()
    })
  })

  describe('Disabled State', () => {
    it('should disable both buttons when disabled prop is true', () => {
      render(<QuantityCounter {...defaultProps} disabled={true} />)

      const buttons = screen.getAllByRole('button')
      expect(buttons[0]).toBeDisabled()
      expect(buttons[1]).toBeDisabled()
    })

    it('should not disable buttons when disabled prop is false', () => {
      render(
        <QuantityCounter {...defaultProps} disabled={false} quantity={5} />
      )

      const buttons = screen.getAllByRole('button')
      expect(buttons[0]).not.toBeDisabled()
      expect(buttons[1]).not.toBeDisabled()
    })

    it('should disable decrease button when disabled=true even if quantity > min', () => {
      render(
        <QuantityCounter
          {...defaultProps}
          disabled={true}
          quantity={10}
          min={0}
        />
      )

      const buttons = screen.getAllByRole('button')
      expect(buttons[0]).toBeDisabled()
    })

    it('should disable increase button when disabled=true even if quantity < max', () => {
      render(
        <QuantityCounter
          {...defaultProps}
          disabled={true}
          quantity={10}
          max={99}
        />
      )

      const buttons = screen.getAllByRole('button')
      expect(buttons[1]).toBeDisabled()
    })
  })

  describe('Props Handling', () => {
    it('should apply default className when none provided', () => {
      const { container } = render(<QuantityCounter {...defaultProps} />)
      const wrapper = container.firstChild as HTMLElement

      expect(wrapper).toHaveClass('flex')
      expect(wrapper).toHaveClass('items-center')
      expect(wrapper).toHaveClass('justify-center')
      expect(wrapper).toHaveClass('gap-3')
    })

    it('should apply custom className when provided', () => {
      const customClass = 'custom-counter-class'
      const { container } = render(
        <QuantityCounter {...defaultProps} className={customClass} />
      )
      const wrapper = container.firstChild as HTMLElement

      expect(wrapper).toHaveClass(customClass)
    })

    it('should combine default and custom classes', () => {
      const customClass = 'mt-4 mb-2'
      const { container } = render(
        <QuantityCounter {...defaultProps} className={customClass} />
      )
      const wrapper = container.firstChild as HTMLElement

      expect(wrapper).toHaveClass('flex')
      expect(wrapper).toHaveClass('items-center')
      expect(wrapper).toHaveClass('justify-center')
      expect(wrapper).toHaveClass('gap-3')
      expect(wrapper).toHaveClass('mt-4')
      expect(wrapper).toHaveClass('mb-2')
    })

    it('should handle empty string className', () => {
      const { container } = render(
        <QuantityCounter {...defaultProps} className="" />
      )
      const wrapper = container.firstChild as HTMLElement

      expect(wrapper).toHaveClass('flex')
      expect(wrapper).toHaveClass('items-center')
    })

    it('should handle undefined className', () => {
      const { container } = render(<QuantityCounter {...defaultProps} />)
      const wrapper = container.firstChild as HTMLElement

      expect(wrapper).toHaveClass('flex')
    })
  })

  describe('Button Styling', () => {
    it('should apply correct size to buttons', () => {
      render(<QuantityCounter {...defaultProps} />)

      const buttons = screen.getAllByRole('button')
      expect(buttons[0]).toHaveAttribute('data-size', 'sm')
      expect(buttons[1]).toHaveAttribute('data-size', 'sm')
    })

    it('should apply correct variant to buttons', () => {
      render(<QuantityCounter {...defaultProps} />)

      const buttons = screen.getAllByRole('button')
      expect(buttons[0]).toHaveAttribute('data-variant', 'outline')
      expect(buttons[1]).toHaveAttribute('data-variant', 'outline')
    })

    it('should apply correct classes to buttons', () => {
      render(<QuantityCounter {...defaultProps} />)

      const buttons = screen.getAllByRole('button')
      buttons.forEach(button => {
        expect(button).toHaveClass('h-8')
        expect(button).toHaveClass('w-8')
        expect(button).toHaveClass('p-0')
      })
    })

    it('should apply correct size classes to icons', () => {
      render(<QuantityCounter {...defaultProps} />)

      const minusIcon = screen.getByTestId('minus-icon')
      const plusIcon = screen.getByTestId('plus-icon')

      expect(minusIcon).toHaveClass('h-3')
      expect(minusIcon).toHaveClass('w-3')
      expect(plusIcon).toHaveClass('h-3')
      expect(plusIcon).toHaveClass('w-3')
    })
  })

  describe('Quantity Display', () => {
    it('should display single digit quantities', () => {
      render(<QuantityCounter {...defaultProps} quantity={7} />)
      expect(screen.getByText('7')).toBeInTheDocument()
    })

    it('should display double digit quantities', () => {
      render(<QuantityCounter {...defaultProps} quantity={42} />)
      expect(screen.getByText('42')).toBeInTheDocument()
    })

    it('should display zero quantity', () => {
      render(<QuantityCounter {...defaultProps} quantity={0} />)
      expect(screen.getByText('0')).toBeInTheDocument()
    })

    it('should display maximum quantity', () => {
      render(<QuantityCounter {...defaultProps} quantity={99} />)
      expect(screen.getByText('99')).toBeInTheDocument()
    })

    it('should apply correct classes to quantity span', () => {
      const { container } = render(<QuantityCounter {...defaultProps} />)
      const quantitySpan = container.querySelector('span')

      expect(quantitySpan).toHaveClass('font-medium')
      expect(quantitySpan).toHaveClass('w-8')
      expect(quantitySpan).toHaveClass('text-center')
    })
  })

  describe('Edge Cases', () => {
    it('should handle custom min greater than default', () => {
      render(<QuantityCounter {...defaultProps} quantity={5} min={10} />)

      const buttons = screen.getAllByRole('button')
      expect(buttons[0]).toBeDisabled()
    })

    it('should handle custom max less than default', () => {
      render(<QuantityCounter {...defaultProps} quantity={50} max={30} />)

      const buttons = screen.getAllByRole('button')
      expect(buttons[1]).toBeDisabled()
    })

    it('should handle negative quantities', () => {
      render(<QuantityCounter {...defaultProps} quantity={-5} min={-10} />)

      expect(screen.getByText('-5')).toBeInTheDocument()
      const buttons = screen.getAllByRole('button')
      expect(buttons[0]).not.toBeDisabled()
    })

    it('should handle very large quantities', () => {
      render(<QuantityCounter {...defaultProps} quantity={9999} max={10000} />)

      expect(screen.getByText('9999')).toBeInTheDocument()
      const buttons = screen.getAllByRole('button')
      expect(buttons[1]).not.toBeDisabled()
    })

    it('should handle min equal to max', () => {
      render(<QuantityCounter {...defaultProps} quantity={5} min={5} max={5} />)

      const buttons = screen.getAllByRole('button')
      expect(buttons[0]).toBeDisabled()
      expect(buttons[1]).toBeDisabled()
    })
  })

  describe('DOM Structure', () => {
    it('should have correct DOM hierarchy', () => {
      const { container } = render(<QuantityCounter {...defaultProps} />)

      const wrapper = container.firstChild as HTMLElement
      expect(wrapper.tagName).toBe('DIV')

      const children = wrapper.children
      expect(children).toHaveLength(3)

      // First child: decrease button
      expect(children[0]?.tagName).toBe('BUTTON')

      // Second child: quantity span
      expect(children[1]?.tagName).toBe('SPAN')

      // Third child: increase button
      expect(children[2]?.tagName).toBe('BUTTON')
    })

    it('should render icons inside buttons', () => {
      render(<QuantityCounter {...defaultProps} />)

      const buttons = screen.getAllByRole('button')
      const minusIcon = buttons[0]?.querySelector('[data-testid="minus-icon"]')
      const plusIcon = buttons[1]?.querySelector('[data-testid="plus-icon"]')

      expect(minusIcon).toBeInTheDocument()
      expect(plusIcon).toBeInTheDocument()
    })
  })
})
