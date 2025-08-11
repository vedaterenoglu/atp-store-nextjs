/**
 * Unit tests for ImageSlider Component
 * SOLID Principles: SRP - Testing single responsibility
 * Design Patterns: AAA Pattern (Arrange, Act, Assert)
 * Dependencies: Jest, Testing Library, React
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import { ImageSlider } from '../ImageSlider'

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}))

// Mock Next.js Image
interface ImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  className?: string
  [key: string]: unknown
}

jest.mock('next/image', () => ({
  __esModule: true,
  default: jest.fn((props: ImageProps) => {
    const { priority, ...imgProps } = props
    return (
      <img
        {...imgProps}
        data-priority={priority}
        data-testid="image"
      />
    )
  }),
}))

// Mock shadcn/ui carousel
interface CarouselProps {
  children: React.ReactNode
  className?: string
  plugins?: unknown[]
  opts?: Record<string, unknown>
}

interface CarouselContentProps {
  children: React.ReactNode
  className?: string
}

interface CarouselItemProps {
  children: React.ReactNode
  className?: string
}

interface CarouselNavigationProps {
  className?: string
}

jest.mock('@/components/ui/schadcn/carousel', () => ({
  Carousel: jest.fn(({ children, className, opts }: CarouselProps) => (
    <div data-testid="carousel" className={className} data-opts={JSON.stringify(opts)}>
      {children}
    </div>
  )),
  CarouselContent: jest.fn(({ children, className }: CarouselContentProps) => (
    <div data-testid="carousel-content" className={className}>
      {children}
    </div>
  )),
  CarouselItem: jest.fn(({ children, className }: CarouselItemProps) => (
    <div data-testid="carousel-item" className={className}>
      {children}
    </div>
  )),
  CarouselPrevious: jest.fn(({ className }: CarouselNavigationProps) => (
    <button data-testid="carousel-previous" className={className}>
      Previous
    </button>
  )),
  CarouselNext: jest.fn(({ className }: CarouselNavigationProps) => (
    <button data-testid="carousel-next" className={className}>
      Next
    </button>
  )),
}))

// Mock embla-carousel-autoplay
interface AutoplayOptions {
  delay?: number
  stopOnInteraction?: boolean
}

jest.mock('embla-carousel-autoplay', () => ({
  __esModule: true,
  default: jest.fn((options: AutoplayOptions) => ({
    name: 'autoplay',
    options,
    init: jest.fn(),
    destroy: jest.fn(),
  })),
}))

// Import mocked modules for type assertions
import { useTranslation } from 'react-i18next'
import Autoplay from 'embla-carousel-autoplay'

describe('ImageSlider', () => {
  const mockT = jest.fn()
  const mockUseTranslation = useTranslation as jest.MockedFunction<typeof useTranslation>

  beforeEach(() => {
    jest.clearAllMocks()

    // Default mock implementation
    mockT.mockImplementation((key: string, options?: Record<string, unknown>) => {
      if (key === 'slider.slides' && options?.['returnObjects']) {
        return [
          { title: 'Trust and Reliability', subtitle: 'Building lasting partnerships' },
          { title: 'Order Management', subtitle: 'Efficient order processing' },
          { title: 'Modern Office Solutions', subtitle: 'Complete office supplies' },
          { title: 'Warehouse Facilities', subtitle: 'Strategic stock management' },
          { title: 'Fleet Management', subtitle: 'Reliable delivery service' },
          { title: 'Loading Operations', subtitle: 'Efficient logistics' },
          { title: 'Dispatch Center', subtitle: 'Coordinated distribution' },
          { title: 'Dispatch Operations', subtitle: 'Timely deliveries' },
        ]
      }
      return key
    })

    // Mock useTranslation
    mockUseTranslation.mockReturnValue({
      t: mockT as unknown as ReturnType<typeof useTranslation>['t'],
      i18n: {} as ReturnType<typeof useTranslation>['i18n'],
      ready: true,
    } as unknown as ReturnType<typeof useTranslation>)
  })

  describe('Loading State', () => {
    it('should render loading skeleton when translations are not ready', () => {
      mockUseTranslation.mockReturnValue({
        t: mockT as unknown as ReturnType<typeof useTranslation>['t'],
        i18n: {} as ReturnType<typeof useTranslation>['i18n'],
        ready: false,
      } as unknown as ReturnType<typeof useTranslation>)

      const { container } = render(<ImageSlider />)

      // Check for loading skeleton
      const skeleton = container.querySelector('.animate-pulse')
      expect(skeleton).toBeInTheDocument()

      // Check for gray background
      const loadingElement = container.querySelector('.bg-gray-200')
      expect(loadingElement).toBeInTheDocument()
    })

    it('should not render carousel when not ready', () => {
      mockUseTranslation.mockReturnValue({
        t: mockT as unknown as ReturnType<typeof useTranslation>['t'],
        i18n: {} as ReturnType<typeof useTranslation>['i18n'],
        ready: false,
      } as unknown as ReturnType<typeof useTranslation>)

      render(<ImageSlider />)

      expect(screen.queryByTestId('carousel')).not.toBeInTheDocument()
    })

    it('should have correct aspect ratio container when loading', () => {
      mockUseTranslation.mockReturnValue({
        t: mockT as unknown as ReturnType<typeof useTranslation>['t'],
        i18n: {} as ReturnType<typeof useTranslation>['i18n'],
        ready: false,
      } as unknown as ReturnType<typeof useTranslation>)

      const { container } = render(<ImageSlider />)

      const aspectContainer = container.querySelector('[class*="pb-"]')
      expect(aspectContainer).toBeInTheDocument()
    })
  })

  describe('Content Rendering', () => {
    it('should render carousel when ready', () => {
      render(<ImageSlider />)

      expect(screen.getByTestId('carousel')).toBeInTheDocument()
    })

    it('should render carousel content', () => {
      render(<ImageSlider />)

      expect(screen.getByTestId('carousel-content')).toBeInTheDocument()
    })

    it('should render correct number of carousel items', () => {
      render(<ImageSlider />)

      const items = screen.getAllByTestId('carousel-item')
      expect(items).toHaveLength(8) // 8 slides defined in component
    })

    it('should render carousel navigation buttons', () => {
      render(<ImageSlider />)

      expect(screen.getByTestId('carousel-previous')).toBeInTheDocument()
      expect(screen.getByTestId('carousel-next')).toBeInTheDocument()
    })

    it('should render images with correct properties', () => {
      render(<ImageSlider />)

      const images = screen.getAllByTestId('image')
      expect(images).toHaveLength(8)

      // First image should have priority
      expect(images[0]).toHaveAttribute('data-priority', 'true')
      
      // Other images should not have priority
      for (let i = 1; i < images.length; i++) {
        expect(images[i]).toHaveAttribute('data-priority', 'false')
      }

      // All images should have alt text
      images.forEach((img) => {
        expect(img).toHaveAttribute('alt')
        expect(img).toHaveAttribute('width', '900')
        expect(img).toHaveAttribute('height', '300')
      })
    })

    it('should render slides with titles and subtitles', () => {
      render(<ImageSlider />)

      expect(screen.getByText('Trust and Reliability')).toBeInTheDocument()
      expect(screen.getByText('Building lasting partnerships')).toBeInTheDocument()
      expect(screen.getByText('Order Management')).toBeInTheDocument()
      expect(screen.getByText('Efficient order processing')).toBeInTheDocument()
    })
  })

  describe('Carousel Configuration', () => {
    it('should configure carousel with autoplay', () => {
      render(<ImageSlider />)

      expect(Autoplay).toHaveBeenCalledWith({
        delay: 4000,
        stopOnInteraction: true,
      })
    })

    it('should configure carousel with correct options', () => {
      render(<ImageSlider />)

      const carousel = screen.getByTestId('carousel')
      const opts = carousel.getAttribute('data-opts')
      expect(opts).toBeTruthy()
      
      const parsedOpts = JSON.parse(opts || '{}')
      expect(parsedOpts.loop).toBe(true)
      expect(parsedOpts.align).toBe('start')
      expect(parsedOpts.skipSnaps).toBe(false)
      expect(parsedOpts.dragFree).toBe(false)
    })

    it('should apply full width and height classes to carousel', () => {
      render(<ImageSlider />)

      const carousel = screen.getByTestId('carousel')
      expect(carousel).toHaveClass('w-full', 'h-full')
    })
  })

  describe('Translation Integration', () => {
    it('should call useTranslation with correct namespace', () => {
      render(<ImageSlider />)

      expect(mockUseTranslation).toHaveBeenCalledWith('aboutUs')
    })

    it('should request slides with returnObjects option', () => {
      render(<ImageSlider />)

      expect(mockT).toHaveBeenCalledWith('slider.slides', { returnObjects: true })
    })

    it('should handle non-array translation response', () => {
      mockT.mockImplementation((key: string) => {
        if (key === 'slider.slides') {
          return 'not an array'
        }
        return key
      })

      render(<ImageSlider />)

      // Should still render 8 items (from slideImages)
      const items = screen.getAllByTestId('carousel-item')
      expect(items).toHaveLength(8)
    })

    it('should handle empty translation array', () => {
      mockT.mockImplementation((key: string, options?: Record<string, unknown>) => {
        if (key === 'slider.slides' && options?.['returnObjects']) {
          return []
        }
        return key
      })

      render(<ImageSlider />)

      // Should still render 8 items (from slideImages)
      const items = screen.getAllByTestId('carousel-item')
      expect(items).toHaveLength(8)
    })
  })

  describe('Styling and Layout', () => {
    it('should have overflow hidden container', () => {
      const { container } = render(<ImageSlider />)

      const overflowContainer = container.querySelector('.overflow-hidden')
      expect(overflowContainer).toBeInTheDocument()
    })

    it('should have correct aspect ratio container', () => {
      const { container } = render(<ImageSlider />)

      const aspectContainer = container.querySelector('[class*="pb-"]')
      expect(aspectContainer).toBeInTheDocument()
    })

    it('should position carousel absolutely within container', () => {
      const { container } = render(<ImageSlider />)

      const absoluteContainer = container.querySelector('.absolute.inset-0')
      expect(absoluteContainer).toBeInTheDocument()
    })

    it('should apply basis-full to carousel items', () => {
      render(<ImageSlider />)

      const items = screen.getAllByTestId('carousel-item')
      items.forEach((item) => {
        expect(item).toHaveClass('basis-full')
      })
    })

    it('should apply gradient overlay to slides', () => {
      const { container } = render(<ImageSlider />)

      const gradients = container.querySelectorAll('.bg-gradient-to-t')
      expect(gradients.length).toBeGreaterThan(0)
    })

    it('should position text content at bottom of slides', () => {
      const { container } = render(<ImageSlider />)

      const bottomTexts = container.querySelectorAll('.absolute.bottom-0')
      expect(bottomTexts.length).toBeGreaterThan(0)
    })

    it('should apply white text color', () => {
      const { container } = render(<ImageSlider />)

      const whiteTexts = container.querySelectorAll('.text-white')
      expect(whiteTexts.length).toBeGreaterThan(0)
    })
  })

  describe('Navigation Buttons', () => {
    it('should position previous button on left', () => {
      render(<ImageSlider />)

      const prevButton = screen.getByTestId('carousel-previous')
      expect(prevButton).toHaveClass('absolute', 'left-2', 'md:left-4')
    })

    it('should position next button on right', () => {
      render(<ImageSlider />)

      const nextButton = screen.getByTestId('carousel-next')
      expect(nextButton).toHaveClass('absolute', 'right-2', 'md:right-4')
    })

    it('should center buttons vertically', () => {
      render(<ImageSlider />)

      const buttons = [
        screen.getByTestId('carousel-previous'),
        screen.getByTestId('carousel-next')
      ]

      buttons.forEach((button) => {
        expect(button).toHaveClass('top-1/2', '-translate-y-1/2')
      })
    })

    it('should apply correct button styles', () => {
      render(<ImageSlider />)

      const buttons = [
        screen.getByTestId('carousel-previous'),
        screen.getByTestId('carousel-next')
      ]

      buttons.forEach((button) => {
        expect(button).toHaveClass('bg-white/80', 'hover:bg-white', 'z-10')
      })
    })
  })

  describe('Responsive Design', () => {
    it('should apply responsive padding classes', () => {
      const { container } = render(<ImageSlider />)

      const paddingElements = container.querySelectorAll('.p-4.md\\:p-6.lg\\:p-8')
      expect(paddingElements.length).toBeGreaterThan(0)
    })

    it('should apply responsive text sizes', () => {
      const { container } = render(<ImageSlider />)

      const titles = container.querySelectorAll('.text-xl.md\\:text-2xl.lg\\:text-3xl')
      expect(titles.length).toBeGreaterThan(0)

      const subtitles = container.querySelectorAll('.text-xs.md\\:text-sm.lg\\:text-base')
      expect(subtitles.length).toBeGreaterThan(0)
    })

    it('should apply responsive button sizes', () => {
      render(<ImageSlider />)

      const buttons = [
        screen.getByTestId('carousel-previous'),
        screen.getByTestId('carousel-next')
      ]

      buttons.forEach((button) => {
        expect(button).toHaveClass('h-8', 'w-8', 'md:h-10', 'md:w-10')
      })
    })
  })

  describe('Image Configuration', () => {
    it('should use correct image dimensions', () => {
      render(<ImageSlider />)

      const images = screen.getAllByTestId('image')
      images.forEach((img) => {
        expect(img).toHaveAttribute('width', '900')
        expect(img).toHaveAttribute('height', '300')
      })
    })

    it('should apply object-contain class to images', () => {
      render(<ImageSlider />)

      const images = screen.getAllByTestId('image')
      images.forEach((img) => {
        expect(img).toHaveClass('object-contain')
      })
    })

    it('should have background color for images', () => {
      render(<ImageSlider />)

      const images = screen.getAllByTestId('image')
      images.forEach((img) => {
        expect(img).toHaveClass('bg-gray-100')
      })
    })
  })
})