/**
 * Style Utilities Test Suite
 * Tests for style utility functions to ensure consistent output
 */

import {
  getContainerClasses,
  getSpacingClasses,
  getCardClasses,
  getGridClasses,
  getPageClasses,
  getLayoutClasses,
  getFormClasses,
  getResponsiveClasses,
} from '../utilities'

describe('Style Utilities', () => {
  describe('getContainerClasses', () => {
    it('should return default container classes', () => {
      const result = getContainerClasses()
      expect(result).toBe('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8')
    })

    it('should return container without padding', () => {
      const result = getContainerClasses({ withPadding: false })
      expect(result).toBe('max-w-7xl mx-auto')
    })

    it('should return small container with custom class', () => {
      const result = getContainerClasses({
        size: 'sm',
        className: 'custom-class',
      })
      expect(result).toContain('max-w-4xl')
      expect(result).toContain('custom-class')
    })

    it('should return full width container', () => {
      const result = getContainerClasses({ size: 'full' })
      expect(result).toContain('w-full')
    })
  })

  describe('getSpacingClasses', () => {
    it('should return all spacing when specified', () => {
      const result = getSpacingClasses({ all: 'md' })
      expect(result).toBe('p-4 sm:p-6')
    })

    it('should return x-axis spacing', () => {
      const result = getSpacingClasses({ x: 'lg' })
      expect(result).toBe('px-6 sm:px-8 lg:px-10')
    })

    it('should return y-axis spacing', () => {
      const result = getSpacingClasses({ y: 'sm' })
      expect(result).toBe('py-3 sm:py-4')
    })

    it('should combine x and y spacing', () => {
      const result = getSpacingClasses({ x: 'md', y: 'lg' })
      expect(result).toContain('px-4')
      expect(result).toContain('py-6')
    })

    it('should prefer all over x/y when both specified', () => {
      const result = getSpacingClasses({ all: 'lg', x: 'sm', y: 'sm' })
      expect(result).toBe('p-6 sm:p-8')
    })
  })

  describe('getCardClasses', () => {
    it('should return content classes by default', () => {
      const result = getCardClasses()
      expect(result).toBe('px-4 sm:px-6 py-4')
    })

    it('should return header classes', () => {
      const result = getCardClasses({ variant: 'header' })
      expect(result).toBe('px-4 sm:px-6 pb-3')
    })

    it('should return footer classes', () => {
      const result = getCardClasses({ variant: 'footer' })
      expect(result).toBe('px-4 sm:px-6 pt-3')
    })

    it('should append custom classes', () => {
      const result = getCardClasses({ className: 'border-2' })
      expect(result).toContain('px-4 sm:px-6 py-4')
      expect(result).toContain('border-2')
    })
  })

  describe('getGridClasses', () => {
    it('should return responsive grid by default', () => {
      const result = getGridClasses()
      expect(result).toContain('grid w-full')
      expect(result).toContain('gap-4 sm:gap-6')
      expect(result).toContain(
        'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      )
    })

    it('should return non-responsive grid', () => {
      const result = getGridClasses({ responsive: false })
      expect(result).toContain('grid w-full')
      expect(result).not.toContain('grid-cols-1')
    })

    it('should use custom gap', () => {
      const result = getGridClasses({ gap: 'xl' })
      expect(result).toContain('gap-8 sm:gap-10 lg:gap-12')
    })
  })

  describe('getPageClasses', () => {
    it('should return container classes by default', () => {
      const result = getPageClasses()
      expect(result).toBe('min-h-screen')
    })

    it('should return content classes', () => {
      const result = getPageClasses({ section: 'content' })
      expect(result).toBe('py-8 sm:py-12 lg:py-16')
    })

    it('should return section classes', () => {
      const result = getPageClasses({ section: 'section' })
      expect(result).toBe('px-4 sm:px-6 lg:px-8')
    })
  })

  describe('getLayoutClasses', () => {
    it('should return navbar container classes', () => {
      const result = getLayoutClasses({
        component: 'navbar',
        part: 'container',
      })
      expect(result).toBe('border-b -mx-4')
    })

    it('should return navbar inner classes', () => {
      const result = getLayoutClasses({ component: 'navbar', part: 'inner' })
      expect(result).toBe('px-4 sm:px-8 py-3 sm:py-4')
    })

    it('should return footer container classes', () => {
      const result = getLayoutClasses({
        component: 'footer',
        part: 'container',
      })
      expect(result).toBe('mt-auto border-t -mx-4')
    })

    it('should return sidebar classes', () => {
      const result = getLayoutClasses({ component: 'sidebar', part: 'inner' })
      expect(result).toBe('p-4 sm:p-6')
    })
  })

  describe('getFormClasses', () => {
    it('should return container classes by default', () => {
      const result = getFormClasses()
      expect(result).toBe('space-y-4')
    })

    it('should return field classes', () => {
      const result = getFormClasses({ variant: 'field' })
      expect(result).toBe('space-y-2')
    })

    it('should return button group classes', () => {
      const result = getFormClasses({ variant: 'buttonGroup' })
      expect(result).toBe('flex gap-2 sm:gap-4')
    })
  })

  describe('getResponsiveClasses', () => {
    it('should return base class only', () => {
      const result = getResponsiveClasses({ base: 'text-sm' })
      expect(result).toBe('text-sm')
    })

    it('should build responsive classes', () => {
      const result = getResponsiveClasses({
        base: 'text-sm',
        sm: 'text-base',
        lg: 'text-lg',
      })
      expect(result).toBe('text-sm sm:text-base lg:text-lg')
    })

    it('should handle all breakpoints', () => {
      const result = getResponsiveClasses({
        base: 'p-2',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
      })
      expect(result).toBe('p-2 sm:p-4 md:p-6 lg:p-8 xl:p-10')
    })

    it('should append custom className', () => {
      const result = getResponsiveClasses({
        base: 'text-sm',
        className: 'font-bold',
      })
      expect(result).toContain('text-sm')
      expect(result).toContain('font-bold')
    })
  })
})
