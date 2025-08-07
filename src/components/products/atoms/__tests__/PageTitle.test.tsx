/**
 * Unit tests for PageTitle Component
 * SOLID Principles: Single Responsibility - Testing page title display
 * Design Patterns: AAA (Arrange-Act-Assert) Pattern
 * Dependencies: Jest, React Testing Library
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import { PageTitle } from '../PageTitle'

// Mock cn utility
jest.mock('@/lib/utils', () => ({
  cn: (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' '),
}))

describe('PageTitle', () => {
  it('should render with text children', () => {
    render(<PageTitle>Test Title</PageTitle>)

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Test Title')
    expect(heading).toHaveClass(
      'text-3xl font-bold tracking-tight text-foreground sm:text-4xl'
    )
  })

  it('should render with React node children', () => {
    render(
      <PageTitle>
        <span data-testid="child-span">Complex Title</span>
      </PageTitle>
    )

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()

    const childSpan = screen.getByTestId('child-span')
    expect(childSpan).toBeInTheDocument()
    expect(childSpan).toHaveTextContent('Complex Title')
  })

  it('should render with custom className', () => {
    render(<PageTitle className="custom-class">Title</PageTitle>)

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveClass(
      'text-3xl font-bold tracking-tight text-foreground sm:text-4xl custom-class'
    )
  })

  it('should render without className prop', () => {
    render(<PageTitle>Title</PageTitle>)

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveClass(
      'text-3xl font-bold tracking-tight text-foreground sm:text-4xl'
    )
    // Should not have undefined class
    expect(heading.className).not.toContain('undefined')
  })

  it('should handle multiple children', () => {
    render(
      <PageTitle>
        <span>Part 1</span>
        <span> Part 2</span>
      </PageTitle>
    )

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('Part 1 Part 2')
  })

  it('should maintain semantic HTML structure', () => {
    const { container } = render(<PageTitle>Semantic Title</PageTitle>)

    const h1Element = container.querySelector('h1')
    expect(h1Element).toBeInTheDocument()
    expect(h1Element?.tagName).toBe('H1')
  })

  it('should handle empty children', () => {
    render(<PageTitle>{''}</PageTitle>)

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('')
  })

  it('should apply responsive text size classes', () => {
    render(<PageTitle>Responsive Title</PageTitle>)

    const heading = screen.getByRole('heading', { level: 1 })
    // Base text size
    expect(heading).toHaveClass('text-3xl')
    // Responsive text size for small screens and up
    expect(heading).toHaveClass('sm:text-4xl')
  })
})
