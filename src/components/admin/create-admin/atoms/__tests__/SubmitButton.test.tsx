/**
 * SubmitButton Component Tests
 * SOLID Principles: SRP - Single responsibility for testing SubmitButton
 * Design Patterns: AAA Pattern (Arrange, Act, Assert)
 * Dependencies: React Testing Library, Jest
 */

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

// Mock external dependencies
jest.mock('@/components/ui', () => ({
  Button: React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement> & {
      variant?: string
      className?: string
    }
  >(function MockButton({ children, ...props }, ref) {
    return (
      <button ref={ref} {...props}>
        {children}
      </button>
    )
  }),
}))

jest.mock('lucide-react', () => ({
  Loader2: ({ className }: { className?: string }) => (
    <svg className={className} data-testid="loader-icon" />
  ),
}))

jest.mock('@/lib/utils', () => ({
  cn: (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' '),
}))

import SubmitButton from '../SubmitButton'

describe('SubmitButton', () => {
  describe('Rendering', () => {
    it('should render button with children text', () => {
      render(<SubmitButton isLoading={false}>Submit Form</SubmitButton>)

      const button = screen.getByRole('button', { name: /submit form/i })
      expect(button).toBeInTheDocument()
    })

    it('should render with custom children elements', () => {
      render(
        <SubmitButton isLoading={false}>
          <span>Custom Content</span>
        </SubmitButton>
      )

      expect(screen.getByText('Custom Content')).toBeInTheDocument()
    })

    it('should render loading spinner when isLoading is true', () => {
      render(<SubmitButton isLoading={true}>Submit</SubmitButton>)

      const spinner = screen.getByTestId('loader-icon')
      expect(spinner).toBeInTheDocument()
      expect(spinner).toHaveClass('mr-2', 'h-4', 'w-4', 'animate-spin')
    })

    it('should not render spinner when isLoading is false', () => {
      render(<SubmitButton isLoading={false}>Submit</SubmitButton>)

      const spinner = screen.queryByTestId('loader-icon')
      expect(spinner).not.toBeInTheDocument()
    })

    it('should show loading text when provided and loading', () => {
      render(
        <SubmitButton isLoading={true} loadingText="Processing...">
          Submit
        </SubmitButton>
      )

      expect(screen.getByText('Processing...')).toBeInTheDocument()
      expect(screen.queryByText('Submit')).not.toBeInTheDocument()
    })

    it('should show default loading text when loading but no loadingText provided', () => {
      render(<SubmitButton isLoading={true}>Submit Form</SubmitButton>)

      expect(screen.getByText('Loading...')).toBeInTheDocument()
      expect(screen.queryByText('Submit Form')).not.toBeInTheDocument()
    })
  })

  describe('Button Props', () => {
    it('should apply correct type attribute', () => {
      render(
        <SubmitButton isLoading={false} type="submit">
          Submit
        </SubmitButton>
      )

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('type', 'submit')
    })

    it('should default to submit type when not specified', () => {
      render(<SubmitButton isLoading={false}>Click Me</SubmitButton>)

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('type', 'submit')
    })

    it('should apply custom className', () => {
      render(
        <SubmitButton isLoading={false} className="custom-class">
          Button
        </SubmitButton>
      )

      const button = screen.getByRole('button')
      expect(button).toHaveClass('custom-class')
    })

    it('should apply variant prop', () => {
      render(
        <SubmitButton isLoading={false} variant="destructive">
          Delete
        </SubmitButton>
      )

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('variant', 'destructive')
    })
  })

  describe('Disabled State', () => {
    it('should be disabled when isLoading is true', () => {
      render(<SubmitButton isLoading={true}>Submit</SubmitButton>)

      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })

    it('should be disabled when disabled prop is true', () => {
      render(
        <SubmitButton isLoading={false} disabled={true}>
          Submit
        </SubmitButton>
      )

      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })

    it('should be disabled when both isLoading and disabled are true', () => {
      render(
        <SubmitButton isLoading={true} disabled={true}>
          Submit
        </SubmitButton>
      )

      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })

    it('should not be disabled when both are false', () => {
      render(
        <SubmitButton isLoading={false} disabled={false}>
          Submit
        </SubmitButton>
      )

      const button = screen.getByRole('button')
      expect(button).not.toBeDisabled()
    })
  })

  describe('Click Events', () => {
    it('should call onClick handler when clicked', () => {
      const handleClick = jest.fn()
      render(
        <SubmitButton isLoading={false} onClick={handleClick}>
          Click Me
        </SubmitButton>
      )

      const button = screen.getByRole('button')
      fireEvent.click(button)

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should not call onClick when disabled', () => {
      const handleClick = jest.fn()
      render(
        <SubmitButton isLoading={false} disabled={true} onClick={handleClick}>
          Click Me
        </SubmitButton>
      )

      const button = screen.getByRole('button')
      fireEvent.click(button)

      expect(handleClick).not.toHaveBeenCalled()
    })

    it('should not call onClick when loading', () => {
      const handleClick = jest.fn()
      render(
        <SubmitButton isLoading={true} onClick={handleClick}>
          Click Me
        </SubmitButton>
      )

      const button = screen.getByRole('button')
      fireEvent.click(button)

      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('Loading States', () => {
    it('should transition from normal to loading state', () => {
      const { rerender } = render(
        <SubmitButton isLoading={false}>Submit</SubmitButton>
      )

      let button = screen.getByRole('button')
      expect(button).not.toBeDisabled()
      expect(screen.queryByTestId('loader-icon')).not.toBeInTheDocument()

      rerender(<SubmitButton isLoading={true}>Submit</SubmitButton>)

      button = screen.getByRole('button')
      expect(button).toBeDisabled()
      expect(screen.getByTestId('loader-icon')).toBeInTheDocument()
    })

    it('should display different text during loading', () => {
      const { rerender } = render(
        <SubmitButton isLoading={false}>Save</SubmitButton>
      )

      expect(screen.getByText('Save')).toBeInTheDocument()

      rerender(
        <SubmitButton isLoading={true} loadingText="Saving...">
          Save
        </SubmitButton>
      )

      expect(screen.getByText('Saving...')).toBeInTheDocument()
      expect(screen.queryByText('Save')).not.toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have accessible button role', () => {
      render(<SubmitButton isLoading={false}>Submit</SubmitButton>)

      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('should be keyboard accessible', () => {
      const handleClick = jest.fn()
      render(
        <SubmitButton isLoading={false} onClick={handleClick}>
          Submit
        </SubmitButton>
      )

      const button = screen.getByRole('button')
      button.focus()
      expect(button).toHaveFocus()

      // Simulate Enter key press
      fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' })
      fireEvent.click(button)
      expect(handleClick).toHaveBeenCalled()
    })

    it('should convey loading state to screen readers', () => {
      render(
        <SubmitButton isLoading={true} loadingText="Processing your request">
          Submit
        </SubmitButton>
      )

      // The loading text should be available to screen readers
      expect(screen.getByText('Processing your request')).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('should handle no loadingText prop', () => {
      render(<SubmitButton isLoading={true}>Submit</SubmitButton>)

      expect(screen.getByText('Loading...')).toBeInTheDocument()
    })

    it('should handle empty children', () => {
      render(<SubmitButton isLoading={false}>{''}</SubmitButton>)

      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('should handle complex children with loading state', () => {
      render(
        <SubmitButton isLoading={true} loadingText="Loading...">
          <span>Icon</span>
          <span>Text</span>
        </SubmitButton>
      )

      expect(screen.getByText('Loading...')).toBeInTheDocument()
      expect(screen.queryByText('Icon')).not.toBeInTheDocument()
      expect(screen.queryByText('Text')).not.toBeInTheDocument()
    })
  })
})
