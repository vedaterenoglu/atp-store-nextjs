/**
 * Unit tests for CampaignSlider component
 * SOLID Principles: SRP - Single responsibility for campaign slider testing
 * Design Patterns: AAA (Arrange, Act, Assert) Testing Pattern
 * Dependencies: React Testing Library, Jest
 */

import { render, screen, fireEvent, act } from '@testing-library/react'
import { CampaignSlider } from '../CampaignSlider'
import type { CampaignProduct } from '@/types/campaign'
import React from 'react'

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, params?: Record<string, unknown>) => {
      const translations: Record<string, string> = {
        'messages.viewingDetails': `Viewing details for ${params?.['product']}`,
        'messages.noCampaigns': 'No campaigns available',
      }
      return translations[key] || key
    },
  }),
}))

// Mock toast utility which wraps sonner
// The real toast facade always adds default options when called
jest.mock('@/lib/utils/toast', () => ({
  toast: {
    info: jest.fn((message: string) => {
      // Simulate the real behavior where the facade adds default options
      return message
    }),
    success: jest.fn(),
    error: jest.fn(),
    warning: jest.fn(),
  },
}))

// Import the mocked toast to use in tests
import { toast } from '@/lib/utils/toast'

// Mock Carousel components with proper typing
interface CarouselProps {
  children: React.ReactNode
  className?: string
  setApi?: (api: unknown) => void
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

jest.mock('@/components/ui/schadcn/carousel', () => ({
  Carousel: jest.fn(({ children, className, setApi, opts }: CarouselProps) => {
    React.useEffect(() => {
      const mockApi = {
        selectedScrollSnap: jest.fn(() => 0),
        canScrollPrev: jest.fn(() => false),
        canScrollNext: jest.fn(() => true),
        scrollNext: jest.fn(),
        scrollPrev: jest.fn(),
        scrollTo: jest.fn(),
        on: jest.fn(),
        off: jest.fn(),
      }
      setApi?.(mockApi)
    }, [setApi])

    return (
      <div
        data-testid="carousel"
        className={className}
        data-opts={JSON.stringify(opts)}
      >
        {children}
      </div>
    )
  }),
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
}))

// Mock SliderSlide and SliderControls with proper typing
interface SliderSlideProps {
  product: CampaignProduct
  onClick: () => void
}

interface SliderControlsProps {
  total: number
  current: number
  onPrevious: () => void
  onNext: () => void
  onSelect: (index: number) => void
  canScrollPrev?: boolean
  canScrollNext?: boolean
}

jest.mock('../../molecules', () => ({
  SliderSlide: jest.fn(({ product, onClick }: SliderSlideProps) => (
    <div data-testid={`slider-slide-${product.stock_id}`} onClick={onClick}>
      Slide: {product.stock_name}
    </div>
  )),
  SliderControls: jest.fn(
    ({
      total,
      current,
      onPrevious,
      onNext,
      onSelect,
      canScrollPrev,
      canScrollNext,
    }: SliderControlsProps) => (
      <div data-testid="slider-controls">
        <button
          data-testid="prev-button"
          onClick={onPrevious}
          disabled={!canScrollPrev}
        >
          Previous
        </button>
        <button
          data-testid="next-button"
          onClick={onNext}
          disabled={!canScrollNext}
        >
          Next
        </button>
        <span data-testid="current-index">{current}</span>
        <span data-testid="total-items">{total}</span>
        {Array.from({ length: total }, (_, i) => (
          <button
            key={i}
            data-testid={`indicator-${i}`}
            onClick={() => onSelect(i)}
          >
            {i}
          </button>
        ))}
      </div>
    )
  ),
}))

describe('CampaignSlider', () => {
  const mockProducts: CampaignProduct[] = [
    {
      stock_id: 'PROD-1',
      stock_name: 'Product 1',
      stock_group: 'Group A',
      stock_image_link: 'https://example.com/1.jpg',
      stock_unit: 'pcs',
      stock_price: 10000,
      campaign_price: 8000,
      discount_percentage: 20,
    },
    {
      stock_id: 'PROD-2',
      stock_name: 'Product 2',
      stock_group: 'Group B',
      stock_image_link: 'https://example.com/2.jpg',
      stock_unit: 'kg',
      stock_price: 5000,
      campaign_price: 4000,
      discount_percentage: 20,
    },
    {
      stock_id: 'PROD-3',
      stock_name: 'Product 3',
      stock_group: 'Group C',
      stock_image_link: 'https://example.com/3.jpg',
      stock_unit: 'l',
      stock_price: 2000,
      campaign_price: 1500,
      discount_percentage: 25,
    },
  ]

  const mockOnProductClick = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  describe('Empty State', () => {
    it('renders empty state when products array is empty', () => {
      render(<CampaignSlider products={[]} />)

      expect(screen.getByText('No campaigns available')).toBeInTheDocument()
      expect(screen.queryByTestId('carousel')).not.toBeInTheDocument()
    })

    it('renders empty state when products is undefined', () => {
      render(
        <CampaignSlider products={undefined as unknown as CampaignProduct[]} />
      )

      expect(screen.getByText('No campaigns available')).toBeInTheDocument()
    })

    it('applies correct styling to empty state', () => {
      render(<CampaignSlider products={[]} />)

      const container = screen.getByText('No campaigns available').parentElement
      expect(container).toHaveClass(
        'w-full',
        'aspect-[3/2]',
        'flex',
        'items-center',
        'justify-center',
        'bg-muted/10',
        'rounded-lg'
      )
    })

    it('applies custom className to empty state', () => {
      render(<CampaignSlider products={[]} className="custom-empty" />)

      const container = screen.getByText('No campaigns available').parentElement
      expect(container).toHaveClass('custom-empty')
    })
  })

  describe('Products Display', () => {
    it('renders carousel with all products', () => {
      render(<CampaignSlider products={mockProducts} />)

      expect(screen.getByTestId('carousel')).toBeInTheDocument()
      expect(screen.getByTestId('slider-slide-PROD-1')).toBeInTheDocument()
      expect(screen.getByTestId('slider-slide-PROD-2')).toBeInTheDocument()
      expect(screen.getByTestId('slider-slide-PROD-3')).toBeInTheDocument()
    })

    it('renders slider controls', () => {
      render(<CampaignSlider products={mockProducts} />)

      expect(screen.getByTestId('slider-controls')).toBeInTheDocument()
      expect(screen.getByTestId('total-items')).toHaveTextContent('3')
    })

    it('applies correct carousel options', () => {
      render(<CampaignSlider products={mockProducts} />)

      const carousel = screen.getByTestId('carousel')
      const opts = JSON.parse(carousel.getAttribute('data-opts') || '{}')
      expect(opts).toEqual({
        align: 'start',
        loop: true,
        slidesToScroll: 1,
      })
    })

    it('applies custom className to container', () => {
      render(
        <CampaignSlider products={mockProducts} className="custom-slider" />
      )

      const container = screen.getByTestId('carousel').parentElement
      expect(container).toHaveClass('relative', 'w-full', 'custom-slider')
    })

    it('renders carousel items with correct classes', () => {
      render(<CampaignSlider products={mockProducts} />)

      const items = screen.getAllByTestId('carousel-item')
      items.forEach(item => {
        expect(item).toHaveClass(
          'pl-4',
          'basis-full',
          'md:basis-1/2',
          'lg:basis-1/3'
        )
      })
    })

    it('wraps slides in aspect ratio container', () => {
      render(<CampaignSlider products={mockProducts} />)

      const slideContainers = screen
        .getAllByTestId(/slider-slide-/)
        .map(slide => slide.parentElement)
      slideContainers.forEach(container => {
        expect(container).toHaveClass(
          'relative',
          'aspect-[3/2]',
          'w-full',
          'overflow-hidden',
          'rounded-lg'
        )
      })
    })
  })

  describe('Product Click Handling', () => {
    it('calls onProductClick when product is clicked', () => {
      render(
        <CampaignSlider
          products={mockProducts}
          onProductClick={mockOnProductClick}
        />
      )

      const slide1 = screen.getByTestId('slider-slide-PROD-1')
      fireEvent.click(slide1)

      expect(mockOnProductClick).toHaveBeenCalledWith(mockProducts[0])
    })

    it('shows toast when product clicked without onProductClick handler', () => {
      render(<CampaignSlider products={mockProducts} />)

      const slide1 = screen.getByTestId('slider-slide-PROD-1')
      fireEvent.click(slide1)

      // The toast facade is called with just the message from the component,
      // but our mock doesn't add the default options, so we just check the message
      expect(toast.info).toHaveBeenCalledWith('Viewing details for Product 1')
    })

    it('handles clicks on different products', () => {
      render(
        <CampaignSlider
          products={mockProducts}
          onProductClick={mockOnProductClick}
        />
      )

      fireEvent.click(screen.getByTestId('slider-slide-PROD-2'))
      expect(mockOnProductClick).toHaveBeenCalledWith(mockProducts[1])

      fireEvent.click(screen.getByTestId('slider-slide-PROD-3'))
      expect(mockOnProductClick).toHaveBeenCalledWith(mockProducts[2])
    })
  })

  describe('Navigation Controls', () => {
    it('renders navigation buttons', () => {
      render(<CampaignSlider products={mockProducts} />)

      expect(screen.getByTestId('prev-button')).toBeInTheDocument()
      expect(screen.getByTestId('next-button')).toBeInTheDocument()
    })

    it('renders indicators for each product', () => {
      render(<CampaignSlider products={mockProducts} />)

      expect(screen.getByTestId('indicator-0')).toBeInTheDocument()
      expect(screen.getByTestId('indicator-1')).toBeInTheDocument()
      expect(screen.getByTestId('indicator-2')).toBeInTheDocument()
    })

    it('navigation buttons are clickable', () => {
      render(<CampaignSlider products={mockProducts} />)

      const prevButton = screen.getByTestId('prev-button')
      const nextButton = screen.getByTestId('next-button')

      // Just verify buttons can be clicked without errors
      fireEvent.click(prevButton)
      fireEvent.click(nextButton)

      // Buttons should still be in document after clicking
      expect(prevButton).toBeInTheDocument()
      expect(nextButton).toBeInTheDocument()
    })

    it('indicators are clickable', () => {
      render(<CampaignSlider products={mockProducts} />)

      const indicator0 = screen.getByTestId('indicator-0')
      const indicator1 = screen.getByTestId('indicator-1')
      const indicator2 = screen.getByTestId('indicator-2')

      // Just verify indicators can be clicked without errors
      fireEvent.click(indicator0)
      fireEvent.click(indicator1)
      fireEvent.click(indicator2)

      // Indicators should still be in document after clicking
      expect(indicator0).toBeInTheDocument()
      expect(indicator1).toBeInTheDocument()
      expect(indicator2).toBeInTheDocument()
    })
  })

  describe('Auto-play Functionality', () => {
    it('renders with auto-play enabled by default', () => {
      render(<CampaignSlider products={mockProducts} />)

      // Component should render without errors when autoPlay is true (default)
      expect(screen.getByTestId('carousel')).toBeInTheDocument()
    })

    it('renders with custom auto-play interval', () => {
      render(<CampaignSlider products={mockProducts} autoPlayInterval={3000} />)

      // Component should render without errors with custom interval
      expect(screen.getByTestId('carousel')).toBeInTheDocument()
    })

    it('renders when auto-play is disabled', () => {
      render(<CampaignSlider products={mockProducts} autoPlay={false} />)

      // Component should render without errors when autoPlay is false
      expect(screen.getByTestId('carousel')).toBeInTheDocument()
    })

    it('handles component unmount gracefully', () => {
      const { unmount } = render(<CampaignSlider products={mockProducts} />)

      expect(screen.getByTestId('carousel')).toBeInTheDocument()

      // Should unmount without errors
      unmount()

      expect(screen.queryByTestId('carousel')).not.toBeInTheDocument()
    })

    it('timer cleanup on unmount', () => {
      const { unmount } = render(<CampaignSlider products={mockProducts} />)

      // Advance timers before unmount
      act(() => {
        jest.advanceTimersByTime(2000)
      })

      // Should unmount and clear timers without errors
      unmount()

      // Advancing timers after unmount should not cause errors
      act(() => {
        jest.advanceTimersByTime(10000)
      })

      expect(screen.queryByTestId('carousel')).not.toBeInTheDocument()
    })
  })

  describe('API Event Handling', () => {
    it('handles carousel lifecycle correctly', () => {
      const { unmount } = render(<CampaignSlider products={mockProducts} />)

      // Component should mount and set up carousel
      expect(screen.getByTestId('carousel')).toBeInTheDocument()

      // Component should unmount cleanly
      unmount()

      expect(screen.queryByTestId('carousel')).not.toBeInTheDocument()
    })

    it('renders controls that respond to carousel state', () => {
      render(<CampaignSlider products={mockProducts} />)

      const controls = screen.getByTestId('slider-controls')
      expect(controls).toBeInTheDocument()

      // Check that current index is displayed
      expect(screen.getByTestId('current-index')).toBeInTheDocument()
      expect(screen.getByTestId('total-items')).toHaveTextContent('3')
    })
  })

  describe('Edge Cases', () => {
    it('handles single product', () => {
      render(<CampaignSlider products={[mockProducts[0]!]} />)

      expect(screen.getByTestId('slider-slide-PROD-1')).toBeInTheDocument()
      expect(screen.getByTestId('total-items')).toHaveTextContent('1')
    })

    it('handles large number of products', () => {
      const manyProducts = Array.from({ length: 100 }, (_, i) => ({
        ...mockProducts[0]!,
        stock_id: `PROD-${i}`,
        stock_name: `Product ${i}`,
      }))

      render(<CampaignSlider products={manyProducts} />)

      const items = screen.getAllByTestId(/slider-slide-/)
      expect(items).toHaveLength(100)
    })

    it('handles products with special characters in names', () => {
      const specialProducts = [
        {
          ...mockProducts[0]!,
          stock_name: 'Product™ & Co. <Special>',
        },
      ]

      render(<CampaignSlider products={specialProducts} />)

      const slide = screen.getByTestId(
        `slider-slide-${specialProducts[0]!.stock_id}`
      )
      fireEvent.click(slide)

      // The toast facade is called with just the message from the component
      expect(toast.info).toHaveBeenCalledWith(
        'Viewing details for Product™ & Co. <Special>'
      )
    })
  })
})
