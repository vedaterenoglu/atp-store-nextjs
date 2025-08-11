/**
 * Unit tests for DiscountBadge Component
 * SOLID Principles: SRP - Testing single responsibility
 * Design Patterns: AAA Pattern (Arrange, Act, Assert)
 * Dependencies: Jest, Testing Library, React
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import { DiscountBadge } from '../DiscountBadge'
import { calculateDiscountPercentage } from '@/services/price.service'

// Mock price service
jest.mock('@/services/price.service', () => ({
  calculateDiscountPercentage: jest.fn(),
}))

describe('DiscountBadge', () => {
  const mockCalculateDiscountPercentage =
    calculateDiscountPercentage as jest.MockedFunction<
      typeof calculateDiscountPercentage
    >

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Component Rendering', () => {
    it('should render badge when there is a discount', () => {
      mockCalculateDiscountPercentage.mockReturnValue(25)

      render(<DiscountBadge originalPrice={10000} discountedPrice={7500} />)

      expect(screen.getByText('-25%')).toBeInTheDocument()
    })

    it('should not render when discount is 0', () => {
      mockCalculateDiscountPercentage.mockReturnValue(0)

      const { container } = render(
        <DiscountBadge originalPrice={10000} discountedPrice={10000} />
      )

      expect(container.firstChild).toBeNull()
    })

    it('should return null when no discount', () => {
      mockCalculateDiscountPercentage.mockReturnValue(0)

      const result = render(
        <DiscountBadge originalPrice={10000} discountedPrice={10000} />
      )

      expect(result.container.innerHTML).toBe('')
    })
  })

  describe('Discount Percentage Display', () => {
    it('should display correct percentage for 10% discount', () => {
      mockCalculateDiscountPercentage.mockReturnValue(10)

      render(<DiscountBadge originalPrice={10000} discountedPrice={9000} />)

      expect(screen.getByText('-10%')).toBeInTheDocument()
    })

    it('should display correct percentage for 50% discount', () => {
      mockCalculateDiscountPercentage.mockReturnValue(50)

      render(<DiscountBadge originalPrice={20000} discountedPrice={10000} />)

      expect(screen.getByText('-50%')).toBeInTheDocument()
    })

    it('should display correct percentage for 75% discount', () => {
      mockCalculateDiscountPercentage.mockReturnValue(75)

      render(<DiscountBadge originalPrice={40000} discountedPrice={10000} />)

      expect(screen.getByText('-75%')).toBeInTheDocument()
    })

    it('should display correct percentage for 100% discount (FREE)', () => {
      mockCalculateDiscountPercentage.mockReturnValue(100)

      render(<DiscountBadge originalPrice={10000} discountedPrice={0} />)

      expect(screen.getByText('-100%')).toBeInTheDocument()
    })
  })

  describe('Props Handling', () => {
    it('should call calculateDiscountPercentage with correct parameters', () => {
      mockCalculateDiscountPercentage.mockReturnValue(30)

      render(<DiscountBadge originalPrice={15000} discountedPrice={10500} />)

      expect(mockCalculateDiscountPercentage).toHaveBeenCalledWith(15000, 10500)
    })

    it('should apply default classes when no className prop provided', () => {
      mockCalculateDiscountPercentage.mockReturnValue(20)

      const { container } = render(
        <DiscountBadge originalPrice={10000} discountedPrice={8000} />
      )
      const badge = container.firstChild as HTMLElement

      expect(badge).toHaveClass('absolute')
      expect(badge).toHaveClass('top-3')
      expect(badge).toHaveClass('right-3')
      expect(badge).toHaveClass('z-10')
      expect(badge).toHaveClass('font-bold')
      expect(badge).toHaveClass('text-xl')
      expect(badge).toHaveClass('w-20')
      expect(badge).toHaveClass('h-20')
      expect(badge).toHaveClass('rounded-full')
      expect(badge).toHaveClass('bg-red-500/50')
      expect(badge).toHaveClass('text-white')
      expect(badge).toHaveClass('flex')
      expect(badge).toHaveClass('items-center')
      expect(badge).toHaveClass('justify-center')
    })

    it('should apply custom className when provided', () => {
      mockCalculateDiscountPercentage.mockReturnValue(15)

      const customClass = 'custom-badge-class'
      const { container } = render(
        <DiscountBadge
          originalPrice={10000}
          discountedPrice={8500}
          className={customClass}
        />
      )
      const badge = container.firstChild as HTMLElement

      expect(badge).toHaveClass(customClass)
    })

    it('should combine default and custom classes', () => {
      mockCalculateDiscountPercentage.mockReturnValue(35)

      const customClass = 'shadow-lg border-2'
      const { container } = render(
        <DiscountBadge
          originalPrice={10000}
          discountedPrice={6500}
          className={customClass}
        />
      )
      const badge = container.firstChild as HTMLElement

      // Should have both default and custom classes
      expect(badge).toHaveClass('absolute')
      expect(badge).toHaveClass('font-bold')
      expect(badge).toHaveClass('shadow-lg')
      expect(badge).toHaveClass('border-2')
    })

    it('should handle empty string className', () => {
      mockCalculateDiscountPercentage.mockReturnValue(40)

      const { container } = render(
        <DiscountBadge
          originalPrice={10000}
          discountedPrice={6000}
          className=""
        />
      )
      const badge = container.firstChild as HTMLElement

      expect(badge).toHaveClass('absolute')
      expect(badge).toHaveClass('top-3')
      expect(badge).toHaveClass('right-3')
    })
  })

  describe('Edge Cases', () => {
    it('should handle very small discounts', () => {
      mockCalculateDiscountPercentage.mockReturnValue(1)

      render(<DiscountBadge originalPrice={10000} discountedPrice={9900} />)

      expect(screen.getByText('-1%')).toBeInTheDocument()
    })

    it('should handle large prices', () => {
      mockCalculateDiscountPercentage.mockReturnValue(33)

      render(<DiscountBadge originalPrice={1000000} discountedPrice={670000} />)

      expect(screen.getByText('-33%')).toBeInTheDocument()
    })

    it('should handle zero original price', () => {
      mockCalculateDiscountPercentage.mockReturnValue(0)

      const { container } = render(
        <DiscountBadge originalPrice={0} discountedPrice={0} />
      )

      expect(container.firstChild).toBeNull()
    })

    it('should handle negative discount percentage (price increase)', () => {
      mockCalculateDiscountPercentage.mockReturnValue(0)

      const { container } = render(
        <DiscountBadge originalPrice={10000} discountedPrice={12000} />
      )

      expect(container.firstChild).toBeNull()
    })

    it('should handle undefined className prop', () => {
      mockCalculateDiscountPercentage.mockReturnValue(25)

      const { container } = render(
        <DiscountBadge originalPrice={10000} discountedPrice={7500} />
      )
      const badge = container.firstChild as HTMLElement

      expect(badge).toHaveClass('absolute')
      expect(badge).toHaveClass('top-3')
    })
  })

  describe('Styling and Layout', () => {
    it('should position badge absolutely', () => {
      mockCalculateDiscountPercentage.mockReturnValue(20)

      const { container } = render(
        <DiscountBadge originalPrice={10000} discountedPrice={8000} />
      )
      const badge = container.firstChild as HTMLElement

      expect(badge).toHaveClass('absolute')
      expect(badge).toHaveClass('top-3')
      expect(badge).toHaveClass('right-3')
      expect(badge).toHaveClass('z-10')
    })

    it('should have circular shape with fixed dimensions', () => {
      mockCalculateDiscountPercentage.mockReturnValue(30)

      const { container } = render(
        <DiscountBadge originalPrice={10000} discountedPrice={7000} />
      )
      const badge = container.firstChild as HTMLElement

      expect(badge).toHaveClass('w-20')
      expect(badge).toHaveClass('h-20')
      expect(badge).toHaveClass('rounded-full')
    })

    it('should center content within badge', () => {
      mockCalculateDiscountPercentage.mockReturnValue(45)

      const { container } = render(
        <DiscountBadge originalPrice={10000} discountedPrice={5500} />
      )
      const badge = container.firstChild as HTMLElement

      expect(badge).toHaveClass('flex')
      expect(badge).toHaveClass('items-center')
      expect(badge).toHaveClass('justify-center')
    })

    it('should apply text styling', () => {
      mockCalculateDiscountPercentage.mockReturnValue(60)

      const { container } = render(
        <DiscountBadge originalPrice={10000} discountedPrice={4000} />
      )
      const badge = container.firstChild as HTMLElement

      expect(badge).toHaveClass('font-bold')
      expect(badge).toHaveClass('text-xl')
      expect(badge).toHaveClass('text-white')
    })

    it('should have semi-transparent red background', () => {
      mockCalculateDiscountPercentage.mockReturnValue(80)

      const { container } = render(
        <DiscountBadge originalPrice={10000} discountedPrice={2000} />
      )
      const badge = container.firstChild as HTMLElement

      expect(badge).toHaveClass('bg-red-500/50')
    })
  })

  describe('DOM Structure', () => {
    it('should render as div element', () => {
      mockCalculateDiscountPercentage.mockReturnValue(15)

      const { container } = render(
        <DiscountBadge originalPrice={10000} discountedPrice={8500} />
      )
      const badge = container.firstChild as HTMLElement

      expect(badge.tagName).toBe('DIV')
    })

    it('should contain percentage text directly', () => {
      mockCalculateDiscountPercentage.mockReturnValue(55)

      const { container } = render(
        <DiscountBadge originalPrice={10000} discountedPrice={4500} />
      )
      const badge = container.firstChild as HTMLElement

      expect(badge.textContent).toBe('-55%')
    })

    it('should format percentage with minus sign and percent symbol', () => {
      mockCalculateDiscountPercentage.mockReturnValue(42)

      render(<DiscountBadge originalPrice={10000} discountedPrice={5800} />)

      const badge = screen.getByText('-42%')
      expect(badge).toBeInTheDocument()
      expect(badge.textContent).toMatch(/^-\d+%$/)
    })
  })
})
