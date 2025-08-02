/**
 * Unit tests for AppLayout Component
 *
 * SOLID Principles Applied:
 * - SRP: Tests focus solely on app layout behavior
 * - DIP: Tests depend on mocked abstractions
 *
 * Design Patterns:
 * - AAA Pattern: Arrange, Act, Assert test structure
 * - Mock Pattern: All external dependencies mocked
 */

import React from 'react'
import { render, screen } from '@/__tests__/utils/test-utils'
import { AppLayout } from './app-layout'

// Mock the Navbar component
jest.mock('./navbar', () => ({
  Navbar: jest.fn(() => <nav data-testid="navbar">Mocked Navbar</nav>),
}))

// Mock the Footer component
jest.mock('./footer', () => ({
  Footer: jest.fn(({ author }: { author: string }) => (
    <footer data-testid="footer">Mocked Footer - {author}</footer>
  )),
}))

describe('AppLayout', () => {
  const mockChildren = <div data-testid="children">Test Content</div>

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render with correct structure', () => {
    const { container } = render(<AppLayout>{mockChildren}</AppLayout>)

    // Check main wrapper structure
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveClass('min-h-screen', 'flex', 'flex-col')

    // Check max-width container
    const maxWidthContainer = wrapper.firstChild as HTMLElement
    expect(maxWidthContainer).toHaveClass(
      'w-full',
      'max-w-[1280px]',
      'mx-auto',
      'flex',
      'flex-col',
      'flex-1'
    )
  })

  it('should render Navbar component', () => {
    render(<AppLayout>{mockChildren}</AppLayout>)

    const navbar = screen.getByTestId('navbar')
    expect(navbar).toBeInTheDocument()
    expect(navbar).toHaveTextContent('Mocked Navbar')
  })

  it('should render children in main element', () => {
    render(<AppLayout>{mockChildren}</AppLayout>)

    const main = screen.getByRole('main')
    expect(main).toBeInTheDocument()
    expect(main).toHaveClass('flex-1', 'flex', 'flex-col', 'px-4')

    const children = screen.getByTestId('children')
    expect(children).toBeInTheDocument()
    expect(main).toContainElement(children)
  })

  it('should render Footer component with correct author', () => {
    render(<AppLayout>{mockChildren}</AppLayout>)

    const footer = screen.getByTestId('footer')
    expect(footer).toBeInTheDocument()
    expect(footer).toHaveTextContent('Mocked Footer - GTBS Coding')
  })

  it('should maintain correct component order', () => {
    const { container } = render(<AppLayout>{mockChildren}</AppLayout>)

    const maxWidthContainer = container.querySelector('.max-w-\\[1280px\\]')
    const children = maxWidthContainer?.children

    expect(children).toHaveLength(3)
    expect(children?.[0]).toHaveAttribute('data-testid', 'navbar')
    expect(children?.[1]?.tagName?.toLowerCase()).toBe('main')
    expect(children?.[2]).toHaveAttribute('data-testid', 'footer')
  })

  it('should pass GTBS Coding as author to Footer', () => {
    const Footer = jest.requireMock('./footer').Footer
    render(<AppLayout>{mockChildren}</AppLayout>)

    expect(Footer).toHaveBeenCalledTimes(1)
    expect(Footer).toHaveBeenCalledWith(
      expect.objectContaining({
        author: 'GTBS Coding',
      }),
      undefined
    )
  })

  it('should handle different children types', () => {
    const testCases = [
      { children: 'String child', testId: 'string' },
      { children: <span>Element child</span>, testId: 'element' },
      {
        children: [<div key="1">Child 1</div>, <div key="2">Child 2</div>],
        testId: 'array',
      },
      { children: null, testId: 'null' },
      { children: undefined, testId: 'undefined' },
    ]

    testCases.forEach(({ children }) => {
      const { container } = render(<AppLayout>{children}</AppLayout>)

      const main = container.querySelector('main')
      expect(main).toBeInTheDocument()
    })
  })

  it('should apply responsive layout classes', () => {
    const { container } = render(<AppLayout>{mockChildren}</AppLayout>)

    // Check that the layout uses flexbox for responsive design
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveClass('min-h-screen', 'flex', 'flex-col')

    const maxWidthContainer = wrapper.firstChild as HTMLElement
    expect(maxWidthContainer).toHaveClass('flex-1')

    const main = screen.getByRole('main')
    expect(main).toHaveClass('flex-1')
  })
})
