/**
 * StatusAlert Component Tests
 * SOLID Principles: SRP - Single responsibility for testing StatusAlert
 * Design Patterns: AAA Pattern (Arrange, Act, Assert)
 * Dependencies: React Testing Library, Jest
 */

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

// Mock the external dependencies
jest.mock('@/components/ui', () => ({
  Alert: ({
    children,
    className,
  }: {
    children: React.ReactNode
    className?: string
  }) => (
    <div role="alert" className={className}>
      {children}
    </div>
  ),
  AlertDescription: ({
    children,
    className,
  }: {
    children: React.ReactNode
    className?: string
  }) => <div className={className}>{children}</div>,
}))

jest.mock('@/lib/utils', () => ({
  cn: (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' '),
}))

jest.mock('lucide-react', () => ({
  CheckCircle: ({ className }: { className?: string }) => (
    <svg className={className} data-testid="check-circle" />
  ),
  XCircle: ({ className }: { className?: string }) => (
    <svg className={className} data-testid="x-circle" />
  ),
  X: ({ className }: { className?: string }) => (
    <svg className={className} data-testid="x-icon" />
  ),
}))

jest.mock('@/hooks/use-safe-translation', () => ({
  useSafeTranslation: () => ({
    t: (key: string) => {
      if (key === 'createAdmin.closeAlert') {
        return 'Close alert'
      }
      return key
    },
  }),
}))

import StatusAlert from '../StatusAlert'

describe('StatusAlert', () => {
  describe('Rendering', () => {
    it('should render success alert with correct message', () => {
      render(<StatusAlert type="success" message="Operation successful!" />)

      const alert = screen.getByRole('alert')
      expect(alert).toBeInTheDocument()
      expect(alert).toHaveClass('border-green-500')
      expect(screen.getByText('Operation successful!')).toBeInTheDocument()
    })

    it('should render error alert with correct message', () => {
      render(<StatusAlert type="error" message="Operation failed!" />)

      const alert = screen.getByRole('alert')
      expect(alert).toBeInTheDocument()
      expect(alert).toHaveClass('border-destructive')
      expect(screen.getByText('Operation failed!')).toBeInTheDocument()
    })

    it('should display success icon for success type', () => {
      render(<StatusAlert type="success" message="Success" />)

      // CheckCircle icon should be present for success
      const successIcon = screen.getByTestId('check-circle')
      expect(successIcon).toBeInTheDocument()
      expect(successIcon).toHaveClass('h-4', 'w-4', 'text-green-600')
    })

    it('should display error icon for error type', () => {
      render(<StatusAlert type="error" message="Error" />)

      // XCircle icon should be present for error
      const errorIcon = screen.getByTestId('x-circle')
      expect(errorIcon).toBeInTheDocument()
      expect(errorIcon).toHaveClass('h-4', 'w-4', 'text-destructive')
    })
  })

  describe('Close functionality', () => {
    it('should render close button when onClose is provided', () => {
      const onCloseMock = jest.fn()
      render(
        <StatusAlert
          type="success"
          message="Closeable alert"
          onClose={onCloseMock}
        />
      )

      const closeButton = screen.getByRole('button')
      expect(closeButton).toBeInTheDocument()

      // Check for X icon inside close button
      const xIcon = screen.getByTestId('x-icon')
      expect(xIcon).toBeInTheDocument()
    })

    it('should not render close button when onClose is not provided', () => {
      render(<StatusAlert type="success" message="Not closeable" />)

      const closeButton = screen.queryByRole('button')
      expect(closeButton).not.toBeInTheDocument()
    })

    it('should call onClose when close button is clicked', () => {
      const onCloseMock = jest.fn()
      render(
        <StatusAlert
          type="error"
          message="Click to close"
          onClose={onCloseMock}
        />
      )

      const closeButton = screen.getByRole('button')
      fireEvent.click(closeButton)

      expect(onCloseMock).toHaveBeenCalledTimes(1)
    })

    it('should have proper hover state on close button', () => {
      const onCloseMock = jest.fn()
      render(
        <StatusAlert
          type="success"
          message="Hover test"
          onClose={onCloseMock}
        />
      )

      const closeButton = screen.getByRole('button')
      expect(closeButton).toHaveClass('hover:bg-muted')
    })
  })

  describe('Styling', () => {
    it('should apply correct classes for success type', () => {
      render(<StatusAlert type="success" message="Success styling" />)

      const alert = screen.getByRole('alert')
      expect(alert).toHaveClass('border-green-500', 'bg-green-50')
    })

    it('should apply correct classes for error type', () => {
      render(<StatusAlert type="error" message="Error styling" />)

      const alert = screen.getByRole('alert')
      expect(alert).toHaveClass('border-destructive', 'bg-destructive/10')
    })

    it('should maintain consistent spacing and layout', () => {
      render(
        <StatusAlert type="success" message="Layout test" onClose={jest.fn()} />
      )

      // Check that the alert has relative positioning
      const alert = screen.getByRole('alert')
      expect(alert).toHaveClass('relative')

      // Check that the message has proper padding for close button
      const message = screen.getByText('Layout test')
      expect(message).toHaveClass('pr-8')
    })
  })

  describe('Accessibility', () => {
    it('should have role="alert" for screen readers', () => {
      render(<StatusAlert type="error" message="Accessible alert" />)

      const alert = screen.getByRole('alert')
      expect(alert).toBeInTheDocument()
    })

    it('should have accessible close button with aria-label', () => {
      render(
        <StatusAlert
          type="success"
          message="Accessible close"
          onClose={jest.fn()}
        />
      )

      const closeButton = screen.getByRole('button')
      expect(closeButton).toHaveAttribute('aria-label', 'Close alert')
    })

    it('should be keyboard navigable', () => {
      const onCloseMock = jest.fn()
      render(
        <StatusAlert
          type="success"
          message="Keyboard test"
          onClose={onCloseMock}
        />
      )

      const closeButton = screen.getByRole('button')
      closeButton.focus()
      expect(closeButton).toHaveFocus()

      // Simulate Enter key press
      fireEvent.keyDown(closeButton, { key: 'Enter', code: 'Enter' })
      fireEvent.click(closeButton)
      expect(onCloseMock).toHaveBeenCalled()
    })
  })

  describe('Edge cases', () => {
    it('should handle empty message gracefully', () => {
      render(<StatusAlert type="success" message="" />)

      const alert = screen.getByRole('alert')
      expect(alert).toBeInTheDocument()
    })

    it('should handle very long messages', () => {
      const longMessage =
        'This is a very long message that might overflow or cause layout issues in the alert component but should be handled gracefully without breaking the layout'
      render(<StatusAlert type="error" message={longMessage} />)

      expect(screen.getByText(longMessage)).toBeInTheDocument()
    })

    it('should handle special characters in message', () => {
      const specialMessage = 'Alert with <special> & "characters" \'test\''
      render(<StatusAlert type="success" message={specialMessage} />)

      expect(screen.getByText(specialMessage)).toBeInTheDocument()
    })
  })
})
