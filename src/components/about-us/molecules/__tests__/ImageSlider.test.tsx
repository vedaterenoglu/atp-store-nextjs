/**
 * Unit tests for ImageSlider Component
 * SOLID Principles: SRP - Testing single responsibility
 * Design Patterns: AAA Pattern (Arrange, Act, Assert)
 * Dependencies: Jest, Testing Library, React
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import { ImageSlider } from '../ImageSlider'
import { useTranslation } from 'react-i18next'

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}))

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    width,
    height,
    className,
    priority,
  }: {
    src?: string
    alt?: string
    width?: number
    height?: number
    className?: string
    priority?: boolean
  }) => (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      data-priority={priority}
    />
  ),
}))

// Mock embla-carousel-autoplay
jest.mock('embla-carousel-autoplay', () => ({
  __esModule: true,
  default: jest.fn(
    (options: { delay?: number; stopOnInteraction?: boolean }) => ({
      name: 'autoplay',
      options,
      init: jest.fn(),
      destroy: jest.fn(),
    })
  ),
}))

// Mock carousel components
jest.mock('@/components/ui/schadcn/carousel', () => ({
  Carousel: ({
    children,
    className,
    plugins,
    opts,
  }: {
    children?: React.ReactNode
    className?: string
    plugins?: unknown[]
    opts?: unknown
  }) => (
    <div
      data-testid="carousel"
      className={className}
      data-plugins={JSON.stringify(plugins)}
      data-opts={JSON.stringify(opts)}
    >
      {children}
    </div>
  ),
  CarouselContent: ({
    children,
    className,
  }: {
    children?: React.ReactNode
    className?: string
  }) => (
    <div data-testid="carousel-content" className={className}>
      {children}
    </div>
  ),
  CarouselItem: ({
    children,
    className,
  }: {
    children?: React.ReactNode
    className?: string
  }) => (
    <div data-testid="carousel-item" className={className}>
      {children}
    </div>
  ),
  CarouselPrevious: ({ className }: { className?: string }) => (
    <button data-testid="carousel-previous" className={className}>
      Previous
    </button>
  ),
  CarouselNext: ({ className }: { className?: string }) => (
    <button data-testid="carousel-next" className={className}>
      Next
    </button>
  ),
}))

describe('ImageSlider', () => {
  const mockT = jest.fn()
  const mockUseTranslation = useTranslation as jest.MockedFunction<
    typeof useTranslation
  >

  beforeEach(() => {
    jest.clearAllMocks()

    // Default mock implementation
    mockT.mockImplementation(
      (key: string, options?: { returnObjects?: boolean }) => {
        if (key === 'slider.slides' && options?.returnObjects) {
          return [
            {
              title: 'Trust & Reliability',
              subtitle: 'Building lasting partnerships',
            },
            {
              title: 'Order Management',
              subtitle: 'Efficient order processing',
            },
            {
              title: 'Modern Solutions',
              subtitle: 'Office solutions for today',
            },
            { title: 'Warehouse', subtitle: 'State-of-the-art facilities' },
            { title: 'Fleet', subtitle: 'Reliable delivery network' },
            { title: 'Loading', subtitle: 'Efficient loading operations' },
            { title: 'Dispatch', subtitle: 'Coordinated dispatch center' },
            { title: 'Operations', subtitle: 'Seamless dispatch operations' },
          ]
        }
        return key
      }
    )

    mockUseTranslation.mockReturnValue({
      t: mockT,
      i18n: {},
      ready: true,
    } as unknown as ReturnType<typeof useTranslation>)
  })

  describe('Loading State', () => {
    it('should render loading skeleton when translations are not ready', () => {
      mockUseTranslation.mockReturnValue({
        t: mockT,
        i18n: {},
        ready: false,
      } as unknown as ReturnType<typeof useTranslation>)

      const { container } = render(<ImageSlider />)

      // Check for loading skeleton
      const skeleton = container.querySelector('.animate-pulse')
      expect(skeleton).toBeInTheDocument()
      expect(skeleton).toHaveClass('bg-gray-200')
    })

    it('should maintain aspect ratio in loading state', () => {
      mockUseTranslation.mockReturnValue({
        t: mockT,
        i18n: {},
        ready: false,
      } as unknown as ReturnType<typeof useTranslation>)

      const { container } = render(<ImageSlider />)

      const aspectRatioContainer = container.querySelector('[class*="pb-"]')
      expect(aspectRatioContainer).toBeInTheDocument()
    })
  })

  describe('Component Rendering', () => {
    it('should render carousel component', () => {
      render(<ImageSlider />)

      const carousel = screen.getByTestId('carousel')
      expect(carousel).toBeInTheDocument()
    })

    it('should render all 8 slide images', () => {
      render(<ImageSlider />)

      const carouselItems = screen.getAllByTestId('carousel-item')
      expect(carouselItems).toHaveLength(8)
    })

    it('should render carousel navigation buttons', () => {
      render(<ImageSlider />)

      expect(screen.getByTestId('carousel-previous')).toBeInTheDocument()
      expect(screen.getByTestId('carousel-next')).toBeInTheDocument()
    })
  })

  describe('Slide Content', () => {
    it('should render images with correct src URLs', () => {
      render(<ImageSlider />)

      const images = screen.getAllByRole('img')

      expect(images[0]).toHaveAttribute(
        'src',
        'https://res.cloudinary.com/dnptbuf0s/image/upload/v1690386631/alfe-customer/slide-2-trust_uhgmpj.png'
      )
      expect(images[1]).toHaveAttribute(
        'src',
        'https://res.cloudinary.com/dnptbuf0s/image/upload/v1690386631/alfe-customer/slide-3-order_iiiou5.png'
      )
    })

    it('should render images with correct alt text', () => {
      render(<ImageSlider />)

      const images = screen.getAllByRole('img')

      expect(images[0]).toHaveAttribute('alt', 'Trust and Reliability')
      expect(images[1]).toHaveAttribute('alt', 'Order Management')
      expect(images[2]).toHaveAttribute('alt', 'Modern Office Solutions')
      expect(images[3]).toHaveAttribute('alt', 'Warehouse Facilities')
    })

    it('should render translated titles for slides', () => {
      render(<ImageSlider />)

      expect(screen.getByText('Trust & Reliability')).toBeInTheDocument()
      expect(screen.getByText('Order Management')).toBeInTheDocument()
      expect(screen.getByText('Modern Solutions')).toBeInTheDocument()
    })

    it('should render translated subtitles for slides', () => {
      render(<ImageSlider />)

      expect(
        screen.getByText('Building lasting partnerships')
      ).toBeInTheDocument()
      expect(screen.getByText('Efficient order processing')).toBeInTheDocument()
      expect(screen.getByText('Office solutions for today')).toBeInTheDocument()
    })

    it('should set priority on first image', () => {
      render(<ImageSlider />)

      const images = screen.getAllByRole('img')
      expect(images[0]).toHaveAttribute('data-priority', 'true')
      expect(images[1]).toHaveAttribute('data-priority', 'false')
    })
  })

  describe('Carousel Configuration', () => {
    it('should configure autoplay plugin with correct delay', () => {
      render(<ImageSlider />)

      const carousel = screen.getByTestId('carousel')
      const plugins = JSON.parse(carousel.getAttribute('data-plugins') || '[]')

      expect(plugins).toHaveLength(1)
      expect(plugins[0].options.delay).toBe(4000)
      expect(plugins[0].options.stopOnInteraction).toBe(true)
    })

    it('should configure carousel options correctly', () => {
      render(<ImageSlider />)

      const carousel = screen.getByTestId('carousel')
      const opts = JSON.parse(carousel.getAttribute('data-opts') || '{}')

      expect(opts.align).toBe('start')
      expect(opts.loop).toBe(true)
      expect(opts.skipSnaps).toBe(false)
      expect(opts.dragFree).toBe(false)
    })
  })

  describe('Styling and Layout', () => {
    it('should apply correct aspect ratio container', () => {
      const { container } = render(<ImageSlider />)

      const aspectRatioContainer = container.querySelector('[class*="pb-"]')
      expect(aspectRatioContainer).toBeInTheDocument()
    })

    it('should apply overflow-hidden to main container', () => {
      const { container } = render(<ImageSlider />)

      const mainContainer = container.querySelector('.overflow-hidden')
      expect(mainContainer).toBeInTheDocument()
    })

    it('should apply gradient overlay to slides', () => {
      const { container } = render(<ImageSlider />)

      const gradients = container.querySelectorAll('.bg-gradient-to-t')
      expect(gradients).toHaveLength(8)
    })

    it('should apply responsive text sizes to titles', () => {
      const { container } = render(<ImageSlider />)

      const titles = container.querySelectorAll('h1')
      titles.forEach(title => {
        expect(title).toHaveClass('text-xl', 'md:text-2xl', 'lg:text-3xl')
      })
    })

    it('should apply responsive text sizes to subtitles', () => {
      const { container } = render(<ImageSlider />)

      const subtitles = container.querySelectorAll('p.text-xs')
      subtitles.forEach(subtitle => {
        expect(subtitle).toHaveClass('text-xs', 'md:text-sm', 'lg:text-base')
      })
    })

    it('should position navigation buttons correctly', () => {
      render(<ImageSlider />)

      const prevButton = screen.getByTestId('carousel-previous')
      const nextButton = screen.getByTestId('carousel-next')

      expect(prevButton).toHaveClass('absolute', 'left-2', 'md:left-4')
      expect(nextButton).toHaveClass('absolute', 'right-2', 'md:right-4')
    })

    it('should apply hover styles to navigation buttons', () => {
      render(<ImageSlider />)

      const prevButton = screen.getByTestId('carousel-previous')
      const nextButton = screen.getByTestId('carousel-next')

      expect(prevButton).toHaveClass('bg-white/80', 'hover:bg-white')
      expect(nextButton).toHaveClass('bg-white/80', 'hover:bg-white')
    })
  })

  describe('Translation Integration', () => {
    it('should call useTranslation with correct namespace', () => {
      render(<ImageSlider />)

      expect(mockUseTranslation).toHaveBeenCalledWith('aboutUs')
    })

    it('should call t function for slide translations', () => {
      render(<ImageSlider />)

      expect(mockT).toHaveBeenCalledWith('slider.slides', {
        returnObjects: true,
      })
    })

    it('should handle non-array slide translations gracefully', () => {
      mockT.mockImplementation(
        (key: string, options?: { returnObjects?: boolean }) => {
          if (key === 'slider.slides' && options?.returnObjects) {
            return 'Not an array'
          }
          return key
        }
      )

      render(<ImageSlider />)

      // Should still render 8 slides with empty titles/subtitles
      const carouselItems = screen.getAllByTestId('carousel-item')
      expect(carouselItems).toHaveLength(8)
    })

    it('should handle missing slide translations', () => {
      mockT.mockImplementation(
        (key: string, options?: { returnObjects?: boolean }) => {
          if (key === 'slider.slides' && options?.returnObjects) {
            return []
          }
          return key
        }
      )

      render(<ImageSlider />)

      // Should still render slides with empty titles/subtitles
      const carouselItems = screen.getAllByTestId('carousel-item')
      expect(carouselItems).toHaveLength(8)
    })
  })

  describe('Image Configuration', () => {
    it('should set correct dimensions for images', () => {
      render(<ImageSlider />)

      const images = screen.getAllByRole('img')
      images.forEach(image => {
        expect(image).toHaveAttribute('width', '900')
        expect(image).toHaveAttribute('height', '300')
      })
    })

    it('should apply object-contain class to images', () => {
      render(<ImageSlider />)

      const images = screen.getAllByRole('img')
      images.forEach(image => {
        expect(image).toHaveClass('object-contain')
      })
    })

    it('should apply background color to images', () => {
      render(<ImageSlider />)

      const images = screen.getAllByRole('img')
      images.forEach(image => {
        expect(image).toHaveClass('bg-gray-100')
      })
    })
  })

  describe('Text Overlay', () => {
    it('should position text overlay at bottom', () => {
      const { container } = render(<ImageSlider />)

      const overlays = container.querySelectorAll('.absolute.bottom-0')
      expect(overlays.length).toBeGreaterThan(0)
    })

    it('should apply responsive padding to text overlay', () => {
      const { container } = render(<ImageSlider />)

      const overlays = container.querySelectorAll('.p-4.md\\:p-6.lg\\:p-8')
      expect(overlays).toHaveLength(8)
    })

    it('should apply white text color to overlay content', () => {
      const { container } = render(<ImageSlider />)

      const overlays = container.querySelectorAll('.text-white')
      expect(overlays).toHaveLength(8)
    })

    it('should limit subtitle width', () => {
      const { container } = render(<ImageSlider />)

      const subtitles = container.querySelectorAll('p.max-w-2xl')
      expect(subtitles).toHaveLength(8)
    })
  })
})
