/**
 * ImageContainer Component Test Suite
 * SOLID Principles: Single Responsibility - Test image container functionality
 * Design Patterns: Test Pattern - Unit tests with mocking
 * Dependencies: Jest, React Testing Library, Next.js Image mock
 */

import { render, screen, waitFor } from '@testing-library/react'
import { ImageContainer } from './ImageContainer'
import React from 'react'

// Define interface for extended HTMLElement
interface TestableImageElement extends HTMLElement {
  _onLoad?: () => void
  _onError?: () => void
}

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: jest.fn(
    ({
      src,
      alt,
      fill,
      className,
      onError,
      onLoad,
      sizes,
    }: {
      src: string
      alt: string
      fill?: boolean
      className?: string
      onError?: () => void
      onLoad?: () => void
      sizes?: string
    }) => {
      // Store the handlers so we can trigger them in tests
      React.useEffect(() => {
        if (typeof onLoad === 'function') {
          // Store onLoad handler on the element for testing
          const element = document.querySelector(
            `[data-alt="${alt}"]`
          ) as TestableImageElement | null
          if (element) {
            if (onLoad) element._onLoad = onLoad
            if (onError) element._onError = onError
          }
        }
      }, [alt, onLoad, onError])

      return (
        <span
          data-src={src}
          data-alt={alt}
          className={className}
          data-fill={fill}
          data-sizes={sizes}
          data-testid="next-image"
        >
          {/* Using span instead of img to avoid ESLint warning */}
        </span>
      )
    }
  ),
}))

// Mock the cn utility
jest.mock('@/components/ui/utils', () => ({
  cn: jest.fn((...classes) => classes.filter(Boolean).join(' ')),
}))

describe('ImageContainer', () => {
  const defaultProps = {
    src: 'https://example.com/image.jpg',
    alt: 'Test image',
  }

  const defaultFallback =
    'https://res.cloudinary.com/dnptbuf0s/image/upload/v1754299206/samples/atp-store-customer/alfe-fallback_nopd5j.jpg'

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Component rendering', () => {
    it('should render with required props', () => {
      render(<ImageContainer {...defaultProps} />)

      const image = screen.getByTestId('next-image')
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute('data-src', defaultProps.src)
      expect(image).toHaveAttribute('data-alt', defaultProps.alt)
    })

    it('should apply custom className', () => {
      const customClass = 'custom-image-class'
      const { container } = render(
        <ImageContainer {...defaultProps} className={customClass} />
      )

      const wrapper = container.firstChild
      expect(wrapper).toHaveClass(
        'relative',
        'overflow-hidden',
        'bg-muted',
        customClass
      )
    })

    it('should render with default fallback src', () => {
      render(<ImageContainer {...defaultProps} />)

      // The component should be ready to use the default fallback
      const image = screen.getByTestId('next-image')
      expect(image).toHaveAttribute('data-src', defaultProps.src)
    })

    it('should render with custom fallback src', () => {
      const customFallback = 'https://example.com/fallback.jpg'
      render(<ImageContainer {...defaultProps} fallbackSrc={customFallback} />)

      const image = screen.getByTestId('next-image')
      expect(image).toHaveAttribute('data-src', defaultProps.src)
    })
  })

  describe('Loading state', () => {
    it('should show loading skeleton initially', () => {
      const { container } = render(<ImageContainer {...defaultProps} />)

      // Check for loading skeleton
      const skeleton = container.querySelector('.animate-pulse.bg-muted')
      expect(skeleton).toBeInTheDocument()
      expect(skeleton).toHaveClass('absolute', 'inset-0')
    })

    it('should hide loading skeleton after image loads', async () => {
      const { container } = render(<ImageContainer {...defaultProps} />)

      const image = screen.getByTestId('next-image') as TestableImageElement
      const onLoad = image._onLoad

      // Initially loading
      expect(container.querySelector('.animate-pulse')).toBeInTheDocument()

      // Trigger load
      if (onLoad) {
        onLoad()
      }

      // Wait for state update
      await waitFor(() => {
        expect(
          container.querySelector('.animate-pulse')
        ).not.toBeInTheDocument()
      })
    })

    it('should apply opacity classes based on loading state', async () => {
      render(<ImageContainer {...defaultProps} />)

      const image = screen.getByTestId('next-image') as TestableImageElement
      const onLoad = image._onLoad

      // Initially loading - opacity-0
      expect(image).toHaveClass('opacity-0')
      expect(image).not.toHaveClass('opacity-100')

      // Trigger load
      if (onLoad) {
        onLoad()
      }

      // After loading - opacity-100
      await waitFor(() => {
        expect(image).toHaveClass('opacity-100')
        expect(image).not.toHaveClass('opacity-0')
      })
    })
  })

  describe('Error handling', () => {
    it('should switch to fallback image on error', async () => {
      render(<ImageContainer {...defaultProps} />)

      const image = screen.getByTestId('next-image') as TestableImageElement
      const onError = image._onError

      // Trigger error
      if (onError) {
        onError()
      }

      // Should switch to default fallback
      await waitFor(() => {
        expect(image).toHaveAttribute('data-src', defaultFallback)
      })
    })

    it('should use custom fallback on error if provided', async () => {
      const customFallback = 'https://example.com/custom-fallback.jpg'
      render(<ImageContainer {...defaultProps} fallbackSrc={customFallback} />)

      const image = screen.getByTestId('next-image') as TestableImageElement
      const onError = image._onError

      // Trigger error
      if (onError) {
        onError()
      }

      // Should switch to custom fallback
      await waitFor(() => {
        expect(image).toHaveAttribute('data-src', customFallback)
      })
    })

    it('should not change src if already showing fallback', async () => {
      render(<ImageContainer {...defaultProps} src={defaultFallback} />)

      const image = screen.getByTestId('next-image') as TestableImageElement
      const onError = image._onError

      // Trigger error when already showing fallback
      if (onError) {
        onError()
      }

      // Should still show the same fallback
      await waitFor(() => {
        expect(image).toHaveAttribute('data-src', defaultFallback)
      })
    })

    it('should handle error with empty fallbackSrc', async () => {
      render(<ImageContainer {...defaultProps} fallbackSrc="" />)

      const image = screen.getByTestId('next-image') as TestableImageElement
      const onError = image._onError

      // Trigger error
      if (onError) {
        onError()
      }

      // Should keep original src when fallbackSrc is empty
      await waitFor(() => {
        expect(image).toHaveAttribute('data-src', defaultProps.src)
      })
    })
  })

  describe('Image props', () => {
    it('should pass correct props to Next Image component', () => {
      render(<ImageContainer {...defaultProps} />)

      const image = screen.getByTestId('next-image')

      // Check fill prop
      expect(image).toHaveAttribute('data-fill', 'true')

      // Check sizes prop
      expect(image).toHaveAttribute(
        'data-sizes',
        '(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw'
      )

      // Check className includes required classes
      expect(image.className).toContain('object-cover')
      expect(image.className).toContain('transition-opacity')
      expect(image.className).toContain('duration-300')
    })
  })

  describe('State management', () => {
    it('should initialize with correct states', () => {
      const { container } = render(<ImageContainer {...defaultProps} />)

      // Should show original src
      const image = screen.getByTestId('next-image')
      expect(image).toHaveAttribute('data-src', defaultProps.src)

      // Should be in loading state
      const skeleton = container.querySelector('.animate-pulse')
      expect(skeleton).toBeInTheDocument()
    })

    it('should handle rapid error and load events', async () => {
      render(<ImageContainer {...defaultProps} />)

      const image = screen.getByTestId('next-image') as TestableImageElement
      const onError = image._onError
      const onLoad = image._onLoad

      // Trigger error then load rapidly
      if (onError) onError()
      if (onLoad) onLoad()

      // Should end up with fallback src and not loading
      await waitFor(() => {
        expect(image).toHaveAttribute('data-src', defaultFallback)
        expect(image).toHaveClass('opacity-100')
      })
    })
  })
})
