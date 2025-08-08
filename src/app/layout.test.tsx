/**
 * Unit tests for Root Layout Component
 *
 * SOLID Principles Applied:
 * - SRP: Tests focus solely on layout behavior
 * - DIP: Tests depend on mocked abstractions
 *
 * Design Patterns:
 * - AAA Pattern: Arrange, Act, Assert test structure
 * - Mock Pattern: All external dependencies mocked
 */

import React from 'react'
import { render as rtlRender, screen } from '@testing-library/react'

// Mock next/font/google BEFORE importing the component
jest.mock('next/font/google', () => ({
  Geist: jest.fn(() => ({
    variable: '--font-geist-sans',
    className: 'mock-geist-sans',
  })),
  Geist_Mono: jest.fn(() => ({
    variable: '--font-geist-mono',
    className: 'mock-geist-mono',
  })),
}))

// Now import the component after mocks are set up
import RootLayout, { metadata } from './layout'

// Mock CSS import
jest.mock('./globals.css', () => ({}))

// Mock sonner
jest.mock('sonner', () => ({
  Toaster: jest.fn(() => null),
}))

// Mock all provider components
jest.mock('@/components/providers', () => ({
  ThemeInitializer: jest.fn(() => null),
  I18nProvider: jest.fn(({ children }: { children: React.ReactNode }) => (
    <div data-testid="i18n-provider">{children}</div>
  )),
  ClerkLocaleProvider: jest.fn(
    ({ children }: { children: React.ReactNode }) => (
      <div data-testid="clerk-locale-provider">{children}</div>
    )
  ),
  CartProvider: jest.fn(({ children }: { children: React.ReactNode }) => (
    <div data-testid="cart-provider">{children}</div>
  )),
}))

// Mock ApolloWrapper
jest.mock('@/lib/apollo/ApolloWrapper', () => ({
  ApolloWrapper: jest.fn(({ children }: { children: React.ReactNode }) => (
    <div data-testid="apollo-wrapper">{children}</div>
  )),
}))

// Mock AppLayout component
jest.mock('@/components/layout', () => ({
  AppLayout: jest.fn(({ children }: { children: React.ReactNode }) => (
    <div data-testid="app-layout">{children}</div>
  )),
}))

// Custom render function for layout component
function renderLayout(children: React.ReactNode) {
  // RootLayout returns html and body elements, which can't be rendered inside a div
  // Instead, we'll extract and test the component's output directly
  const layoutElement = RootLayout({ children })

  if (!React.isValidElement(layoutElement)) {
    throw new Error('Invalid layout element')
  }

  // Return the layout element props for testing
  return {
    element: layoutElement as React.ReactElement<{
      lang: string
      suppressHydrationWarning: boolean
      children: React.ReactNode
    }>,
    props: layoutElement.props as {
      lang: string
      suppressHydrationWarning: boolean
      children: React.ReactNode
    },
  }
}

describe('RootLayout', () => {
  const mockChildren = <div data-testid="children">Test Content</div>

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render with correct HTML structure and attributes', () => {
    const { element } = renderLayout(mockChildren)

    expect(element.type).toBe('html')
    expect(element.props.lang).toBe('sv')
    expect(element.props.suppressHydrationWarning).toBe(true)
  })

  it('should render body with correct font classes', () => {
    const { element } = renderLayout(mockChildren)

    // Find the body element in the React tree
    const bodyElement = React.Children.toArray(element.props.children).find(
      child => React.isValidElement(child) && child.type === 'body'
    ) as React.ReactElement<{ className: string; children: React.ReactNode }>

    expect(bodyElement).toBeDefined()
    expect(bodyElement.props.className).toContain('--font-geist-sans')
    expect(bodyElement.props.className).toContain('--font-geist-mono')
    expect(bodyElement.props.className).toContain('antialiased')
  })

  it('should render all providers in correct hierarchy', () => {
    // For this test, we need to actually render the providers
    const { element } = renderLayout(mockChildren)
    const bodyElement = React.Children.toArray(element.props.children).find(
      child => React.isValidElement(child) && child.type === 'body'
    ) as React.ReactElement<{ className?: string; children: React.ReactNode }>

    // Render the body content to test provider hierarchy
    rtlRender(bodyElement.props.children)

    const clerkProvider = screen.getByTestId('clerk-locale-provider')
    const i18nProvider = screen.getByTestId('i18n-provider')
    const appLayout = screen.getByTestId('app-layout')

    expect(clerkProvider).toBeInTheDocument()
    expect(i18nProvider).toBeInTheDocument()
    expect(appLayout).toBeInTheDocument()

    // Verify nesting structure
    expect(clerkProvider).toContainElement(i18nProvider)
    expect(i18nProvider).toContainElement(appLayout)
  })

  it('should render ThemeInitializer component', () => {
    const providers = jest.requireMock('@/components/providers')
    const { ThemeInitializer } = providers

    const { element } = renderLayout(mockChildren)
    const bodyElement = React.Children.toArray(element.props.children).find(
      child => React.isValidElement(child) && child.type === 'body'
    ) as React.ReactElement<{ className?: string; children: React.ReactNode }>

    // Render the body content to trigger component calls
    rtlRender(bodyElement.props.children)

    expect(ThemeInitializer).toHaveBeenCalledTimes(1)
  })

  it('should render children within AppLayout', () => {
    const { element } = renderLayout(mockChildren)
    const bodyElement = React.Children.toArray(element.props.children).find(
      child => React.isValidElement(child) && child.type === 'body'
    ) as React.ReactElement<{ className?: string; children: React.ReactNode }>

    // Render the body content
    rtlRender(bodyElement.props.children)

    const children = screen.getByTestId('children')
    const appLayout = screen.getByTestId('app-layout')

    expect(children).toBeInTheDocument()
    expect(appLayout).toContainElement(children)
  })

  it('should pass children prop correctly through all providers', () => {
    const providers = jest.requireMock('@/components/providers')
    const { I18nProvider, ClerkLocaleProvider, CartProvider } = providers
    const layout = jest.requireMock('@/components/layout')
    const { AppLayout } = layout
    const apollo = jest.requireMock('@/lib/apollo/ApolloWrapper')
    const { ApolloWrapper } = apollo

    const { element } = renderLayout(mockChildren)
    const bodyElement = React.Children.toArray(element.props.children).find(
      child => React.isValidElement(child) && child.type === 'body'
    ) as React.ReactElement<{ className?: string; children: React.ReactNode }>

    // Render to trigger provider calls
    rtlRender(bodyElement.props.children)

    // Verify each provider was called
    expect(ClerkLocaleProvider).toHaveBeenCalled()
    expect(I18nProvider).toHaveBeenCalled()
    expect(CartProvider).toHaveBeenCalled()
    expect(ApolloWrapper).toHaveBeenCalled()
    expect(AppLayout).toHaveBeenCalled()

    // Verify AppLayout receives the mock children
    const appLayoutCall = AppLayout.mock.calls[0][0]
    expect(appLayoutCall.children).toEqual(mockChildren)
  })

  it('should export correct metadata', () => {
    expect(metadata).toEqual({
      title: 'ATP Store - Alfe Tissue Paper AB',
      description: 'Premium products from Alfe Tissue Paper AB',
    })
  })

  it('should handle different children types', () => {
    const testCases = [
      { children: 'String child', testId: 'string-child' },
      { children: <span>Element child</span>, testId: 'element-child' },
      {
        children: [<div key="1">Child 1</div>, <div key="2">Child 2</div>],
        testId: 'array-children',
      },
      { children: null, testId: 'null-child' },
      { children: undefined, testId: 'undefined-child' },
    ]

    testCases.forEach(({ children }) => {
      const { element } = renderLayout(children)

      // Should not throw error with any children type
      expect(element).toBeDefined()
      expect(element.type).toBe('html')
    })
  })

  it('should initialize fonts correctly', () => {
    // Fonts are initialized during module import
    // The layout component uses the font variables in className
    const { element } = renderLayout(mockChildren)
    const bodyElement = React.Children.toArray(element.props.children).find(
      child => React.isValidElement(child) && child.type === 'body'
    ) as React.ReactElement<{ className?: string; children: React.ReactNode }>

    // Verify the font classes are applied
    expect(bodyElement.props.className).toContain('--font-geist-sans')
    expect(bodyElement.props.className).toContain('--font-geist-mono')
  })

  it('should apply all CSS classes to body element', () => {
    const { element } = renderLayout(mockChildren)

    const bodyElement = React.Children.toArray(element.props.children).find(
      child => React.isValidElement(child) && child.type === 'body'
    ) as React.ReactElement<{ className?: string; children: React.ReactNode }>

    const className = bodyElement.props.className || ''

    expect(className).toContain('--font-geist-sans')
    expect(className).toContain('--font-geist-mono')
    expect(className).toContain('antialiased')
  })
})
