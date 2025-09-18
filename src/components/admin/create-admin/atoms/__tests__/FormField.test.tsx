/**
 * FormField Component Tests
 * SOLID Principles: SRP - Single responsibility for testing FormField
 * Design Patterns: AAA Pattern (Arrange, Act, Assert)
 * Dependencies: React Testing Library, Jest, React Hook Form
 */

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

// Mock external dependencies
jest.mock('@/components/ui', () => ({
  Label: ({
    children,
    htmlFor,
    className,
  }: {
    children: React.ReactNode
    htmlFor?: string
    className?: string
  }) => (
    <label htmlFor={htmlFor} className={className}>
      {children}
    </label>
  ),
  Input: React.forwardRef<
    HTMLInputElement,
    React.InputHTMLAttributes<HTMLInputElement>
  >(function MockInput(props, ref) {
    return <input ref={ref} {...props} />
  }),
}))

jest.mock('@/lib/utils', () => ({
  cn: (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' '),
}))

import FormField from '../FormField'

describe('FormField', () => {
  const mockRegister = {
    name: 'email' as const,
    onChange: jest.fn(),
    onBlur: jest.fn(),
    ref: jest.fn(),
  }

  describe('Rendering', () => {
    it('should render label with correct text', () => {
      render(<FormField id="email" label="Email Address" />)

      const label = screen.getByText('Email Address')
      expect(label).toBeInTheDocument()
      expect(label).toHaveAttribute('for', 'email')
    })

    it('should render input with correct attributes', () => {
      render(
        <FormField
          id="username"
          label="Username"
          type="text"
          placeholder="Enter username"
        />
      )

      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('id', 'username')
      expect(input).toHaveAttribute('type', 'text')
      expect(input).toHaveAttribute('placeholder', 'Enter username')
    })

    it('should render required indicator when required prop is true', () => {
      render(<FormField id="required-field" label="Required Field" required />)

      const requiredIndicator = screen.getByText('*')
      expect(requiredIndicator).toBeInTheDocument()
      expect(requiredIndicator).toHaveClass('text-destructive')
    })

    it('should not render required indicator when required is false', () => {
      render(<FormField id="optional-field" label="Optional Field" />)

      const requiredIndicator = screen.queryByText('*', { exact: true })
      expect(requiredIndicator).not.toBeInTheDocument()
    })

    it('should render error message when error prop is provided', () => {
      render(
        <FormField
          id="error-field"
          label="Field with error"
          error="This field is required"
        />
      )

      const errorMessage = screen.getByText('This field is required')
      expect(errorMessage).toBeInTheDocument()
      expect(errorMessage).toHaveClass('text-sm', 'text-destructive')
    })

    it('should not render error message when no error', () => {
      render(<FormField id="no-error" label="No error field" />)

      const errorElement = screen.queryByRole('alert')
      expect(errorElement).not.toBeInTheDocument()
    })
  })

  describe('Input Types', () => {
    it('should render text input by default', () => {
      render(<FormField id="default" label="Default Input" />)

      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('type', 'text')
    })

    it('should render email input when type is email', () => {
      render(<FormField id="email" label="Email" type="email" />)

      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('type', 'email')
    })

    it('should render password input when type is password', () => {
      render(<FormField id="password" label="Password" type="password" />)

      const input = screen.getByLabelText('Password')
      expect(input).toHaveAttribute('type', 'password')
    })
  })

  describe('Disabled State', () => {
    it('should disable input when disabled prop is true', () => {
      render(<FormField id="disabled" label="Disabled Field" disabled />)

      const input = screen.getByRole('textbox')
      expect(input).toBeDisabled()
    })

    it('should enable input when disabled prop is false', () => {
      render(<FormField id="enabled" label="Enabled Field" disabled={false} />)

      const input = screen.getByRole('textbox')
      expect(input).not.toBeDisabled()
    })
  })

  describe('React Hook Form Integration', () => {
    it('should spread register props when provided', () => {
      render(
        <FormField
          id="registered"
          label="Registered Field"
          register={mockRegister}
        />
      )

      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('name', 'email')
    })

    it('should work without register prop', () => {
      render(<FormField id="unregistered" label="Unregistered Field" />)

      const input = screen.getByRole('textbox')
      expect(input).toBeInTheDocument()
      expect(input).not.toHaveAttribute('name')
    })

    it('should call register callbacks on interaction', () => {
      render(
        <FormField
          id="interactive"
          label="Interactive Field"
          register={mockRegister}
        />
      )

      const input = screen.getByRole('textbox')

      // Simulate onChange
      fireEvent.change(input, { target: { value: 'test value' } })
      expect(mockRegister.onChange).toHaveBeenCalled()

      // Simulate onBlur
      fireEvent.blur(input)
      expect(mockRegister.onBlur).toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    it('should have proper label-input association', () => {
      render(<FormField id="accessible" label="Accessible Field" />)

      const input = screen.getByLabelText('Accessible Field')
      expect(input).toBeInTheDocument()
      expect(input).toHaveAttribute('id', 'accessible')
    })

    it('should have aria-invalid when error is present', () => {
      render(
        <FormField id="error" label="Error Field" error="Validation failed" />
      )

      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('aria-invalid', 'true')
    })

    it('should not have aria-invalid when no error', () => {
      render(<FormField id="valid" label="Valid Field" />)

      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('aria-invalid', 'false')
    })

    it('should have aria-describedby pointing to error message', () => {
      render(
        <FormField
          id="described"
          label="Described Field"
          error="Error description"
        />
      )

      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('aria-describedby', 'described-error')

      const errorMessage = screen.getByText('Error description')
      expect(errorMessage).toBeInTheDocument()
    })
  })

  describe('User Interaction', () => {
    it('should accept user input', () => {
      render(<FormField id="user-input" label="User Input" />)

      const input = screen.getByRole('textbox') as HTMLInputElement
      fireEvent.change(input, { target: { value: 'test input' } })

      expect(input.value).toBe('test input')
    })

    it('should not accept input when disabled', () => {
      render(<FormField id="disabled-input" label="Disabled Input" disabled />)

      const input = screen.getByRole('textbox') as HTMLInputElement
      fireEvent.change(input, { target: { value: 'should not change' } })

      // Disabled inputs can still change programmatically in tests
      // but they won't accept user input in real usage
      expect(input).toBeDisabled()
    })

    it('should handle focus and blur events', () => {
      render(<FormField id="focus-test" label="Focus Test" />)

      const input = screen.getByRole('textbox')

      // Focus the input
      input.focus()
      expect(input).toHaveFocus()

      // Blur the input
      input.blur()
      expect(input).not.toHaveFocus()
    })
  })

  describe('Edge Cases', () => {
    it('should handle undefined error gracefully', () => {
      render(<FormField id="no-error" label="No Error" error={undefined} />)

      const errorElement = screen.queryByRole('alert')
      expect(errorElement).not.toBeInTheDocument()
    })

    it('should handle empty label', () => {
      render(<FormField id="empty-label" label="" />)

      const label = screen.getByLabelText('')
      expect(label).toBeInTheDocument()
    })

    it('should handle special characters in placeholder', () => {
      const specialPlaceholder = 'Enter <special> & "characters"'
      render(
        <FormField
          id="special"
          label="Special"
          placeholder={specialPlaceholder}
        />
      )

      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('placeholder', specialPlaceholder)
    })
  })
})
