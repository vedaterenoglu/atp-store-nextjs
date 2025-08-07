/**
 * Unit tests for PriceTag Component
 * SOLID Principles: Single Responsibility - Testing price display formatting
 * Design Patterns: AAA (Arrange-Act-Assert) Pattern
 * Dependencies: Jest, React Testing Library, i18next mocks
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import { PriceTag } from '../PriceTag'

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'productCard.currency': 'SEK',
      }
      return translations[key] || key
    },
  }),
}))

// Mock cn utility
jest.mock('@/lib/utils', () => ({
  cn: (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' '),
}))

describe('PriceTag', () => {
  it('should render with price conversion from öre to SEK', () => {
    render(<PriceTag price={1000} />)

    // 1000 öre = 10.00 SEK
    expect(screen.getByText('10.00 SEK')).toBeInTheDocument()
  })

  it('should format price with exactly 2 decimal places', () => {
    render(<PriceTag price={1234} />)

    // 1234 öre = 12.34 SEK
    expect(screen.getByText('12.34 SEK')).toBeInTheDocument()
  })

  it('should handle zero price', () => {
    render(<PriceTag price={0} />)

    expect(screen.getByText('0.00 SEK')).toBeInTheDocument()
  })

  it('should handle prices that result in single decimal', () => {
    render(<PriceTag price={1050} />)

    // 1050 öre = 10.50 SEK (should show .50 not .5)
    expect(screen.getByText('10.50 SEK')).toBeInTheDocument()
  })

  it('should handle very large prices', () => {
    render(<PriceTag price={999999} />)

    // 999999 öre = 9999.99 SEK
    expect(screen.getByText('9999.99 SEK')).toBeInTheDocument()
  })

  it('should render with default styling classes', () => {
    const { container } = render(<PriceTag price={1000} />)

    const priceTag = container.firstChild as HTMLElement
    expect(priceTag).toHaveClass(
      'absolute right-2 top-2 z-10',
      'rounded-md bg-green-500 px-2 py-1',
      'text-sm font-semibold text-white',
      'shadow-sm'
    )
  })

  it('should render with custom className', () => {
    const { container } = render(
      <PriceTag price={1000} className="custom-class" />
    )

    const priceTag = container.firstChild as HTMLElement
    expect(priceTag).toHaveClass('custom-class')
    // Should still have default classes
    expect(priceTag).toHaveClass('absolute right-2 top-2 z-10')
  })

  it('should handle prices with single digit öre', () => {
    render(<PriceTag price={101} />)

    // 101 öre = 1.01 SEK
    expect(screen.getByText('1.01 SEK')).toBeInTheDocument()
  })

  it('should translate currency correctly', () => {
    render(<PriceTag price={1000} />)

    // Verify translation is applied
    expect(screen.getByText('10.00 SEK')).toBeInTheDocument()
  })

  it('should maintain correct DOM structure', () => {
    const { container } = render(<PriceTag price={1500} />)

    const priceTag = container.querySelector('div')
    expect(priceTag).toBeInTheDocument()
    expect(priceTag).toHaveTextContent('15.00 SEK')
  })

  it('should handle edge case of 1 öre', () => {
    render(<PriceTag price={1} />)

    // 1 öre = 0.01 SEK
    expect(screen.getByText('0.01 SEK')).toBeInTheDocument()
  })

  it('should handle edge case of 99 öre', () => {
    render(<PriceTag price={99} />)

    // 99 öre = 0.99 SEK
    expect(screen.getByText('0.99 SEK')).toBeInTheDocument()
  })
})
