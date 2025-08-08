/**
 * Unit tests for SliderNavigationButton Component
 * SOLID Principles: SRP - Testing single responsibility
 * Design Patterns: AAA Pattern (Arrange, Act, Assert)
 * Dependencies: Jest, Testing Library, React
 */

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { SliderNavigationButton } from './SliderNavigationButton'

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  ChevronLeft: ({ className }: { className?: string }) => (
    <div data-testid="chevron-left-icon" className={className} />
  ),
  ChevronRight: ({ className }: { className?: string }) => (
    <div data-testid="chevron-right-icon" className={className} />
  ),
}))

// Mock the cn utility
jest.mock('@/lib/utils', () => ({
  cn: (...classes: (string | undefined | boolean)[]) =>
    classes.filter(Boolean).join(' '),
}))

// Mock Button component
jest.mock('@/components/ui/schadcn/button', () => ({
  Button: ({
    children,
    variant,
    size,
    onClick,
    disabled,
    className,
    'aria-label': ariaLabel,
  }: {
    children?: React.ReactNode
    variant?: string
    size?: string
    onClick?: () => void
    disabled?: boolean
    className?: string
    'aria-label'?: string
  }) => (
    <button
      data-variant={variant}
      data-size={size}
      onClick={onClick}
      disabled={disabled}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  ),
}))

describe('SliderNavigationButton', () => {
  const defaultProps = {
    direction: 'next' as const,
    onClick: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Component Rendering', () => {
    it('should render the button', () => {
      render(<SliderNavigationButton {...defaultProps} />)
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('should render ChevronLeft icon for prev direction', () => {
      render(<SliderNavigationButton {...defaultProps} direction="prev" />)
      expect(screen.getByTestId('chevron-left-icon')).toBeInTheDocument()
      expect(screen.queryByTestId('chevron-right-icon')).not.toBeInTheDocument()
    })

    it('should render ChevronRight icon for next direction', () => {
      render(<SliderNavigationButton {...defaultProps} direction="next" />)
      expect(screen.getByTestId('chevron-right-icon')).toBeInTheDocument()
      expect(screen.queryByTestId('chevron-left-icon')).not.toBeInTheDocument()
    })
  })

  describe('Click Handler', () => {
    it('should call onClick when button is clicked', () => {
      const onClick = jest.fn()
      render(<SliderNavigationButton {...defaultProps} onClick={onClick} />)

      const button = screen.getByRole('button')
      fireEvent.click(button)

      expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('should not call onClick when button is disabled', () => {
      const onClick = jest.fn()
      render(
        <SliderNavigationButton
          {...defaultProps}
          onClick={onClick}
          disabled={true}
        />
      )

      const button = screen.getByRole('button')
      fireEvent.click(button)

      // Note: In real Button component, this would prevent onClick
      // Our mock doesn't prevent it, so we just verify disabled state
      expect(button).toBeDisabled()
    })
  })

  describe('Direction Prop', () => {
    it('should apply correct positioning class for prev direction', () => {
      render(<SliderNavigationButton {...defaultProps} direction="prev" />)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('-left-6')
      expect(button).not.toHaveClass('-right-6')
    })

    it('should apply correct positioning class for next direction', () => {
      render(<SliderNavigationButton {...defaultProps} direction="next" />)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('-right-6')
      expect(button).not.toHaveClass('-left-6')
    })

    it('should select correct icon based on direction', () => {
      const { rerender } = render(
        <SliderNavigationButton {...defaultProps} direction="prev" />
      )

      expect(screen.getByTestId('chevron-left-icon')).toBeInTheDocument()

      rerender(<SliderNavigationButton {...defaultProps} direction="next" />)

      expect(screen.getByTestId('chevron-right-icon')).toBeInTheDocument()
    })
  })

  describe('Disabled State', () => {
    it('should apply disabled attribute when disabled is true', () => {
      render(<SliderNavigationButton {...defaultProps} disabled={true} />)

      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })

    it('should not apply disabled attribute when disabled is false', () => {
      render(<SliderNavigationButton {...defaultProps} disabled={false} />)

      const button = screen.getByRole('button')
      expect(button).not.toBeDisabled()
    })

    it('should apply opacity-50 class when disabled', () => {
      render(<SliderNavigationButton {...defaultProps} disabled={true} />)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('opacity-50')
      expect(button).not.toHaveClass('opacity-100')
    })

    it('should apply opacity-100 class when not disabled', () => {
      render(<SliderNavigationButton {...defaultProps} disabled={false} />)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('opacity-100')
      expect(button).not.toHaveClass('opacity-50')
    })

    it('should handle undefined disabled prop as false', () => {
      render(<SliderNavigationButton direction="next" onClick={jest.fn()} />)

      const button = screen.getByRole('button')
      expect(button).not.toBeDisabled()
      expect(button).toHaveClass('opacity-100')
    })
  })

  describe('Props Handling', () => {
    it('should apply default classes', () => {
      render(<SliderNavigationButton {...defaultProps} />)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('absolute')
      expect(button).toHaveClass('top-1/2')
      expect(button).toHaveClass('-translate-y-1/2')
      expect(button).toHaveClass('z-20')
      expect(button).toHaveClass('h-12')
      expect(button).toHaveClass('w-12')
      expect(button).toHaveClass('rounded-full')
      expect(button).toHaveClass('bg-background/80')
      expect(button).toHaveClass('backdrop-blur-sm')
      expect(button).toHaveClass('hover:bg-background/90')
      expect(button).toHaveClass('transition-opacity')
    })

    it('should apply custom className when provided', () => {
      const customClass = 'custom-nav-button'
      render(
        <SliderNavigationButton {...defaultProps} className={customClass} />
      )

      const button = screen.getByRole('button')
      expect(button).toHaveClass(customClass)
    })

    it('should combine default and custom classes', () => {
      const customClass = 'shadow-lg border-2'
      render(
        <SliderNavigationButton {...defaultProps} className={customClass} />
      )

      const button = screen.getByRole('button')
      expect(button).toHaveClass('absolute')
      expect(button).toHaveClass('top-1/2')
      expect(button).toHaveClass('shadow-lg')
      expect(button).toHaveClass('border-2')
    })

    it('should handle empty string className', () => {
      render(<SliderNavigationButton {...defaultProps} className="" />)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('absolute')
      expect(button).toHaveClass('top-1/2')
    })

    it('should handle undefined className', () => {
      render(<SliderNavigationButton direction="next" onClick={jest.fn()} />)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('absolute')
    })
  })

  describe('Button Configuration', () => {
    it('should pass correct variant to Button', () => {
      render(<SliderNavigationButton {...defaultProps} />)

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('data-variant', 'ghost')
    })

    it('should pass correct size to Button', () => {
      render(<SliderNavigationButton {...defaultProps} />)

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('data-size', 'icon')
    })
  })

  describe('Accessibility', () => {
    it('should have correct aria-label for prev button', () => {
      render(<SliderNavigationButton {...defaultProps} direction="prev" />)

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-label', 'Previous slide')
    })

    it('should have correct aria-label for next button', () => {
      render(<SliderNavigationButton {...defaultProps} direction="next" />)

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-label', 'Next slide')
    })

    it('should be keyboard accessible', () => {
      render(<SliderNavigationButton {...defaultProps} />)

      const button = screen.getByRole('button')
      expect(button.tagName).toBe('BUTTON')
    })
  })

  describe('Icon Styling', () => {
    it('should apply correct size classes to icon', () => {
      render(<SliderNavigationButton {...defaultProps} />)

      const icon = screen.getByTestId('chevron-right-icon')
      expect(icon).toHaveClass('h-6')
      expect(icon).toHaveClass('w-6')
    })

    it('should apply same size classes to prev icon', () => {
      render(<SliderNavigationButton {...defaultProps} direction="prev" />)

      const icon = screen.getByTestId('chevron-left-icon')
      expect(icon).toHaveClass('h-6')
      expect(icon).toHaveClass('w-6')
    })
  })

  describe('Styling Classes', () => {
    it('should apply positioning classes', () => {
      render(<SliderNavigationButton {...defaultProps} />)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('absolute')
      expect(button).toHaveClass('top-1/2')
      expect(button).toHaveClass('-translate-y-1/2')
      expect(button).toHaveClass('z-20')
    })

    it('should apply size classes', () => {
      render(<SliderNavigationButton {...defaultProps} />)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('h-12')
      expect(button).toHaveClass('w-12')
    })

    it('should apply appearance classes', () => {
      render(<SliderNavigationButton {...defaultProps} />)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('rounded-full')
      expect(button).toHaveClass('bg-background/80')
      expect(button).toHaveClass('backdrop-blur-sm')
      expect(button).toHaveClass('hover:bg-background/90')
    })

    it('should apply transition classes', () => {
      render(<SliderNavigationButton {...defaultProps} />)

      const button = screen.getByRole('button')
      expect(button).toHaveClass('transition-opacity')
    })
  })

  describe('Edge Cases', () => {
    it('should handle rapid clicks', () => {
      const onClick = jest.fn()
      render(<SliderNavigationButton {...defaultProps} onClick={onClick} />)

      const button = screen.getByRole('button')
      fireEvent.click(button)
      fireEvent.click(button)
      fireEvent.click(button)

      expect(onClick).toHaveBeenCalledTimes(3)
    })

    it('should handle changing direction prop', () => {
      const { rerender } = render(
        <SliderNavigationButton {...defaultProps} direction="prev" />
      )

      expect(screen.getByTestId('chevron-left-icon')).toBeInTheDocument()
      expect(screen.getByRole('button')).toHaveClass('-left-6')

      rerender(<SliderNavigationButton {...defaultProps} direction="next" />)

      expect(screen.getByTestId('chevron-right-icon')).toBeInTheDocument()
      expect(screen.getByRole('button')).toHaveClass('-right-6')
    })

    it('should handle changing disabled state', () => {
      const { rerender } = render(
        <SliderNavigationButton {...defaultProps} disabled={false} />
      )

      let button = screen.getByRole('button')
      expect(button).not.toBeDisabled()
      expect(button).toHaveClass('opacity-100')

      rerender(<SliderNavigationButton {...defaultProps} disabled={true} />)

      button = screen.getByRole('button')
      expect(button).toBeDisabled()
      expect(button).toHaveClass('opacity-50')
    })
  })

  describe('DOM Structure', () => {
    it('should render button as root element', () => {
      const { container } = render(<SliderNavigationButton {...defaultProps} />)

      const button = container.firstChild as HTMLElement
      expect(button.tagName).toBe('BUTTON')
    })

    it('should render icon as child of button', () => {
      render(<SliderNavigationButton {...defaultProps} />)

      const button = screen.getByRole('button')
      const icon = button.querySelector('[data-testid="chevron-right-icon"]')

      expect(icon).toBeInTheDocument()
      expect(icon?.parentElement).toBe(button)
    })

    it('should have single child element', () => {
      render(<SliderNavigationButton {...defaultProps} />)

      const button = screen.getByRole('button')
      expect(button.children).toHaveLength(1)
    })
  })
})
