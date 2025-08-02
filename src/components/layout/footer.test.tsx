/**
 * Unit tests for Footer Component
 *
 * SOLID Principles Applied:
 * - SRP: Tests focus solely on footer behavior
 * - DIP: Tests depend on mocked abstractions
 *
 * Design Patterns:
 * - AAA Pattern: Arrange, Act, Assert test structure
 * - Mock Pattern: All external dependencies mocked
 */

import React from 'react'
import { render, screen } from '@/__tests__/utils/test-utils'
import { Footer } from './footer'

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: jest.fn(
    ({
      src,
      alt,
      width,
      height,
      className,
    }: {
      src: string
      alt: string
      width: number
      height: number
      className?: string
    }) => (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        data-testid="next-image"
      />
    )
  ),
}))

describe('Footer', () => {
  const mockYear = 2024
  const mockAuthor = 'Test Author'

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render with default props', () => {
    const currentYear = new Date().getFullYear()
    render(<Footer />)

    // Check copyright text with default year
    expect(
      screen.getByText(
        `© ${currentYear} Alfe Tissue Paper AB. All rights reserved.`
      )
    ).toBeInTheDocument()

    // Check default author
    expect(screen.getByText('GTBS Coding')).toBeInTheDocument()
  })

  it('should render with custom year and author', () => {
    render(<Footer year={mockYear} author={mockAuthor} />)

    // Check copyright text with custom year
    expect(
      screen.getByText(
        `© ${mockYear} Alfe Tissue Paper AB. All rights reserved.`
      )
    ).toBeInTheDocument()

    // Check custom author
    expect(screen.getByText(mockAuthor)).toBeInTheDocument()
  })

  it('should render with correct structure and classes', () => {
    const { container } = render(<Footer />)

    // Check footer element
    const footer = container.querySelector('footer')
    expect(footer).toBeInTheDocument()
    expect(footer).toHaveClass('mt-auto', 'border-t', '-mx-4')

    // Check inner container
    const innerContainer = footer?.firstChild as HTMLElement
    expect(innerContainer).toHaveClass('px-4', 'py-4', 'sm:py-6')

    // Check flex container
    const flexContainer = innerContainer?.firstChild as HTMLElement
    expect(flexContainer).toHaveClass(
      'flex',
      'flex-col',
      'items-center',
      'gap-2'
    )
  })

  it('should render copyright paragraph with correct styles', () => {
    render(<Footer year={mockYear} />)

    const copyrightText = screen.getByText(
      `© ${mockYear} Alfe Tissue Paper AB. All rights reserved.`
    )
    expect(copyrightText).toHaveClass(
      'text-center',
      'text-sm',
      'text-muted-foreground'
    )
  })

  it('should render logo with correct props', () => {
    render(<Footer />)

    const logo = screen.getByTestId('next-image')
    expect(logo).toHaveAttribute('src', '/logo-gtbs.png')
    expect(logo).toHaveAttribute('alt', 'GTBS Coding Logo')
    expect(logo).toHaveAttribute('width', '20')
    expect(logo).toHaveAttribute('height', '20')
    expect(logo).toHaveClass('h-5', 'w-5', 'object-contain')
  })

  it('should render "Created by" text', () => {
    render(<Footer />)

    expect(screen.getByText('Created by')).toBeInTheDocument()
  })

  it('should render author attribution section with correct styles', () => {
    render(<Footer author={mockAuthor} />)

    // Check the attribution container
    const attributionContainer = screen.getByText('Created by').parentElement
    expect(attributionContainer).toHaveClass(
      'flex',
      'items-center',
      'gap-2',
      'text-sm',
      'text-muted-foreground'
    )

    // Check author name has correct styles
    const authorElement = screen.getByText(mockAuthor)
    expect(authorElement).toHaveClass(
      'font-medium',
      'text-foreground',
      'transition-colors',
      'hover:text-primary'
    )
  })

  it('should handle empty author prop', () => {
    render(<Footer author="" />)

    // Should still render but with empty author
    expect(screen.getByText('Created by')).toBeInTheDocument()
    const authorElement = screen
      .getByText('Created by')
      .parentElement?.querySelector('.font-medium')
    expect(authorElement).toBeInTheDocument()
    expect(authorElement).toHaveTextContent('')
  })

  it('should handle year 0 edge case', () => {
    render(<Footer year={0} />)

    expect(
      screen.getByText(`© 0 Alfe Tissue Paper AB. All rights reserved.`)
    ).toBeInTheDocument()
  })

  it('should handle very long author names', () => {
    const longAuthor = 'A'.repeat(100)
    render(<Footer author={longAuthor} />)

    const authorElement = screen.getByText(longAuthor)
    expect(authorElement).toBeInTheDocument()
    expect(authorElement).toHaveClass('font-medium')
  })

  it('should maintain layout structure with all elements present', () => {
    const { container } = render(<Footer year={mockYear} author={mockAuthor} />)

    // Verify the complete DOM structure
    const footer = container.querySelector('footer')
    const innerDiv = footer?.querySelector('.px-4')
    const flexContainer = innerDiv?.querySelector('.flex')

    // Should have 2 children: copyright and attribution
    expect(flexContainer?.children).toHaveLength(2)

    // First child is copyright
    const copyright = flexContainer?.children[0]
    expect(copyright).toHaveTextContent(
      `© ${mockYear} Alfe Tissue Paper AB. All rights reserved.`
    )

    // Second child is attribution with logo
    const attribution = flexContainer?.children[1]
    expect(attribution).toContainElement(screen.getByTestId('next-image'))
    expect(attribution).toHaveTextContent(`Created by${mockAuthor}`)
  })
})
