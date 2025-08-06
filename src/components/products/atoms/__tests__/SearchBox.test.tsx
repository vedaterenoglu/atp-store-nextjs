/**
 * Unit tests for SearchBox Component
 * SOLID Principles: Single Responsibility - Testing search input functionality
 * Design Patterns: AAA (Arrange-Act-Assert) Pattern
 * Dependencies: Jest, React Testing Library
 */

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { SearchBox } from '../SearchBox'

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Search: ({ className }: { className?: string }) => (
    <span data-testid="search-icon" className={className}>
      Search Icon
    </span>
  ),
  X: ({ className }: { className?: string }) => (
    <span data-testid="x-icon" className={className}>
      X Icon
    </span>
  ),
}))

// Mock shadcn components
jest.mock('@/components/ui/schadcn', () => ({
  Input: ({
    type,
    value,
    onChange,
    placeholder,
    className,
    ...props
  }: {
    type?: string
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    className?: string
  }) => (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
      data-testid="search-input"
      {...props}
    />
  ),
  Button: ({
    children,
    type,
    variant,
    size,
    onClick,
    className,
    'aria-label': ariaLabel,
    ...props
  }: {
    children: React.ReactNode
    type?: 'button' | 'submit' | 'reset'
    variant?: string
    size?: string
    onClick?: () => void
    className?: string
    'aria-label'?: string
  }) => (
    <button
      type={type}
      onClick={onClick}
      data-variant={variant}
      data-size={size}
      className={className}
      aria-label={ariaLabel}
      data-testid="clear-button"
      {...props}
    >
      {children}
    </button>
  ),
}))

// Mock cn utility
jest.mock('@/components/ui/utils', () => ({
  cn: (...classes: (string | undefined | false)[]) =>
    classes.filter(Boolean).join(' '),
}))

describe('SearchBox', () => {
  const mockOnChange = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render with empty value', () => {
    render(<SearchBox value="" onChange={mockOnChange} />)

    const input = screen.getByTestId('search-input')
    expect(input).toBeInTheDocument()
    expect(input).toHaveValue('')
    expect(input).toHaveAttribute('placeholder', 'Search products...')

    // Search icon should be visible
    const searchIcon = screen.getByTestId('search-icon')
    expect(searchIcon).toBeInTheDocument()
    expect(searchIcon).toHaveClass(
      'absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none'
    )

    // Clear button should not be visible
    expect(screen.queryByTestId('clear-button')).not.toBeInTheDocument()
  })

  it('should render with value and show clear button', () => {
    render(<SearchBox value="test search" onChange={mockOnChange} />)

    const input = screen.getByTestId('search-input')
    expect(input).toHaveValue('test search')

    // Clear button should be visible
    const clearButton = screen.getByTestId('clear-button')
    expect(clearButton).toBeInTheDocument()
    expect(clearButton).toHaveAttribute('aria-label', 'Clear search')
  })

  it('should render with custom placeholder', () => {
    render(
      <SearchBox
        value=""
        onChange={mockOnChange}
        placeholder="Custom placeholder"
      />
    )

    const input = screen.getByTestId('search-input')
    expect(input).toHaveAttribute('placeholder', 'Custom placeholder')
  })

  it('should render with custom className', () => {
    const { container } = render(
      <SearchBox value="" onChange={mockOnChange} className="custom-class" />
    )

    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveClass('relative w-full custom-class')
  })

  it('should call onChange when typing', () => {
    render(<SearchBox value="" onChange={mockOnChange} />)

    const input = screen.getByTestId('search-input')
    fireEvent.change(input, { target: { value: 'new search' } })

    expect(mockOnChange).toHaveBeenCalledWith('new search')
  })

  it('should clear value when clear button is clicked', () => {
    render(<SearchBox value="test" onChange={mockOnChange} />)

    const clearButton = screen.getByTestId('clear-button')
    fireEvent.click(clearButton)

    expect(mockOnChange).toHaveBeenCalledWith('')
  })

  it('should apply correct classes to input based on value', () => {
    const { rerender } = render(<SearchBox value="" onChange={mockOnChange} />)

    let input = screen.getByTestId('search-input')
    expect(input).toHaveClass('h-12 w-full pl-10')
    expect(input).not.toHaveClass('pr-10')

    // Re-render with value
    rerender(<SearchBox value="test" onChange={mockOnChange} />)

    input = screen.getByTestId('search-input')
    expect(input).toHaveClass('h-12 w-full pl-10 pr-10')
  })

  it('should style clear button correctly', () => {
    render(<SearchBox value="test" onChange={mockOnChange} />)

    const clearButton = screen.getByTestId('clear-button')
    expect(clearButton).toHaveAttribute('data-variant', 'ghost')
    expect(clearButton).toHaveAttribute('data-size', 'sm')
    expect(clearButton).toHaveClass(
      'absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 p-0 hover:bg-transparent'
    )

    const xIcon = screen.getByTestId('x-icon')
    expect(xIcon).toHaveClass(
      'h-4 w-4 text-muted-foreground hover:text-foreground transition-colors'
    )
  })

  it('should toggle clear button visibility based on value', () => {
    const { rerender } = render(<SearchBox value="" onChange={mockOnChange} />)

    // No clear button when empty
    expect(screen.queryByTestId('clear-button')).not.toBeInTheDocument()

    // Clear button appears with value
    rerender(<SearchBox value="a" onChange={mockOnChange} />)
    expect(screen.getByTestId('clear-button')).toBeInTheDocument()

    // Clear button disappears when empty again
    rerender(<SearchBox value="" onChange={mockOnChange} />)
    expect(screen.queryByTestId('clear-button')).not.toBeInTheDocument()
  })

  it('should handle multiple rapid changes', () => {
    render(<SearchBox value="" onChange={mockOnChange} />)

    const input = screen.getByTestId('search-input')
    fireEvent.change(input, { target: { value: 'a' } })
    fireEvent.change(input, { target: { value: 'ab' } })
    fireEvent.change(input, { target: { value: 'abc' } })

    expect(mockOnChange).toHaveBeenCalledTimes(3)
    expect(mockOnChange).toHaveBeenNthCalledWith(1, 'a')
    expect(mockOnChange).toHaveBeenNthCalledWith(2, 'ab')
    expect(mockOnChange).toHaveBeenNthCalledWith(3, 'abc')
  })
})
