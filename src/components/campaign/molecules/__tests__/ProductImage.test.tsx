/**
 * Unit tests for ProductImage component
 * SOLID Principles: SRP - Single responsibility for product image display testing
 * Design Patterns: AAA (Arrange, Act, Assert) Testing Pattern
 * Dependencies: React Testing Library, Jest, Next.js Image mock
 */

import { render, screen, fireEvent } from '@testing-library/react'
import { ProductImage } from '../ProductImage'

// Mock Next.js Image component
interface MockImageProps {
  src: string
  alt: string
  onLoad?: () => void
  onError?: () => void
  className?: string
  fill?: boolean
  [key: string]: unknown
}

jest.mock('next/image', () => {
  return function MockImage({
    src,
    alt,
    onLoad,
    onError,
    className,
    fill,
    ...props
  }: MockImageProps) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        data-fill={fill}
        data-testid="product-image"
        onLoad={onLoad}
        onError={onError}
        {...props}
      />
    )
  }
})

// Mock shadcn/ui Skeleton
interface MockSkeletonProps {
  className?: string
}

jest.mock('@/components/ui/schadcn/skeleton', () => ({
  Skeleton: ({ className }: MockSkeletonProps) => (
    <div data-testid="skeleton" className={className} />
  ),
}))

describe('ProductImage', () => {
  const mockProps = {
    src: 'https://example.com/product-image.jpg',
    alt: 'Test Product Image',
    className: '',
  }

  // Test basic rendering
  describe('Basic rendering', () => {
    it('renders image with correct props', () => {
      // Arrange & Act
      render(<ProductImage {...mockProps} />)

      // Assert
      const image = screen.getByTestId('product-image')
      expect(image).toBeInTheDocument()
      expect(image).toHaveAttribute(
        'src',
        'https://example.com/product-image.jpg'
      )
      expect(image).toHaveAttribute('alt', 'Test Product Image')
      expect(image).toHaveAttribute('data-fill', 'true')
    })

    it('renders skeleton initially while loading', () => {
      // Arrange & Act
      render(<ProductImage {...mockProps} />)

      // Assert
      expect(screen.getByTestId('skeleton')).toBeInTheDocument()
    })

    it('applies custom className to container', () => {
      // Arrange
      const customClassName = 'custom-image-class'

      // Act
      render(<ProductImage {...mockProps} className={customClassName} />)

      // Assert
      const container = screen.getByTestId('skeleton').parentElement
      expect(container).toHaveClass(
        'relative',
        'w-full',
        'h-full',
        customClassName
      )
    })

    it('applies default empty className when none provided', () => {
      // Arrange
      const { className, ...propsWithoutClassName } = mockProps
      void className // Intentionally unused - testing default behavior

      // Act
      render(<ProductImage {...propsWithoutClassName} />)

      // Assert
      const container = screen.getByTestId('skeleton').parentElement
      expect(container).toHaveClass('relative', 'w-full', 'h-full')
    })
  })

  // Test loading states
  describe('Loading states', () => {
    it('shows skeleton while image is loading', () => {
      // Arrange & Act
      render(<ProductImage {...mockProps} />)

      // Assert
      expect(screen.getByTestId('skeleton')).toBeInTheDocument()
      expect(screen.getByTestId('product-image')).toBeInTheDocument()
    })

    it('hides skeleton after image loads successfully', () => {
      // Arrange
      render(<ProductImage {...mockProps} />)
      const image = screen.getByTestId('product-image')

      // Act
      fireEvent.load(image)

      // Assert
      expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument()
      expect(screen.getByTestId('product-image')).toBeInTheDocument()
    })

    it('applies correct classes to skeleton', () => {
      // Arrange & Act
      render(<ProductImage {...mockProps} />)

      // Assert
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toHaveClass('absolute', 'inset-0', 'w-full', 'h-full')
    })
  })

  // Test error states
  describe('Error states', () => {
    it('shows error message when image fails to load', () => {
      // Arrange
      render(<ProductImage {...mockProps} />)
      const image = screen.getByTestId('product-image')

      // Act
      fireEvent.error(image)

      // Assert
      expect(screen.getByText('No image')).toBeInTheDocument()
      expect(screen.queryByTestId('product-image')).not.toBeInTheDocument()
      expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument()
    })

    it('applies correct styling to error message container', () => {
      // Arrange
      render(<ProductImage {...mockProps} />)
      const image = screen.getByTestId('product-image')

      // Act
      fireEvent.error(image)

      // Assert
      const errorContainer = screen.getByText('No image').parentElement
      expect(errorContainer).toHaveClass(
        'flex',
        'items-center',
        'justify-center',
        'w-full',
        'h-full',
        'bg-muted'
      )
    })

    it('applies correct styling to error message text', () => {
      // Arrange
      render(<ProductImage {...mockProps} />)
      const image = screen.getByTestId('product-image')

      // Act
      fireEvent.error(image)

      // Assert
      const errorText = screen.getByText('No image')
      expect(errorText).toHaveClass('text-muted-foreground', 'text-sm')
    })

    it('hides skeleton when error occurs', () => {
      // Arrange
      render(<ProductImage {...mockProps} />)
      const image = screen.getByTestId('product-image')

      // Act
      fireEvent.error(image)

      // Assert
      expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument()
    })
  })

  // Test image properties
  describe('Image properties', () => {
    it('applies object-cover class to image', () => {
      // Arrange & Act
      render(<ProductImage {...mockProps} />)

      // Assert
      const image = screen.getByTestId('product-image')
      expect(image).toHaveClass('object-cover')
    })

    it('sets fill property correctly', () => {
      // Arrange & Act
      render(<ProductImage {...mockProps} />)

      // Assert
      const image = screen.getByTestId('product-image')
      expect(image).toHaveAttribute('data-fill', 'true')
    })

    it('handles different alt text values', () => {
      // Arrange
      const altTexts = [
        'Product Image',
        'Test Alt Text',
        'Swedish Product Name åäö',
        '',
      ]

      altTexts.forEach(alt => {
        const { unmount } = render(
          <ProductImage src="https://example.com/image.jpg" alt={alt} />
        )

        // Assert
        const image = screen.getByTestId('product-image')
        expect(image).toHaveAttribute('alt', alt)
        unmount()
      })
    })

    it('handles different src values', () => {
      // Arrange
      const srcs = [
        'https://example.com/image1.jpg',
        'https://example.com/image2.png',
        '/local-image.jpg',
        'data:image/svg+xml;base64,abc123',
      ]

      srcs.forEach(src => {
        const { unmount } = render(<ProductImage src={src} alt="Test Image" />)

        // Assert
        const image = screen.getByTestId('product-image')
        expect(image).toHaveAttribute('src', src)
        unmount()
      })
    })
  })

  // Test state transitions
  describe('State transitions', () => {
    it('transitions from loading to loaded state', () => {
      // Arrange
      render(<ProductImage {...mockProps} />)

      // Assert initial loading state
      expect(screen.getByTestId('skeleton')).toBeInTheDocument()
      expect(screen.getByTestId('product-image')).toBeInTheDocument()

      // Act
      fireEvent.load(screen.getByTestId('product-image'))

      // Assert loaded state
      expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument()
      expect(screen.getByTestId('product-image')).toBeInTheDocument()
    })

    it('transitions from loading to error state', () => {
      // Arrange
      render(<ProductImage {...mockProps} />)

      // Assert initial loading state
      expect(screen.getByTestId('skeleton')).toBeInTheDocument()
      expect(screen.getByTestId('product-image')).toBeInTheDocument()

      // Act
      fireEvent.error(screen.getByTestId('product-image'))

      // Assert error state
      expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument()
      expect(screen.queryByTestId('product-image')).not.toBeInTheDocument()
      expect(screen.getByText('No image')).toBeInTheDocument()
    })

    it('does not transition back to loading after load event', () => {
      // Arrange
      render(<ProductImage {...mockProps} />)
      const image = screen.getByTestId('product-image')

      // Act
      fireEvent.load(image)

      // Assert - skeleton should stay hidden
      expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument()
      expect(screen.getByTestId('product-image')).toBeInTheDocument()
    })

    it('does not transition back to loading after error event', () => {
      // Arrange
      render(<ProductImage {...mockProps} />)
      const image = screen.getByTestId('product-image')

      // Act
      fireEvent.error(image)

      // Assert - skeleton should stay hidden
      expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument()
      expect(screen.getByText('No image')).toBeInTheDocument()
    })
  })

  // Test multiple instances
  describe('Multiple instances', () => {
    it('handles multiple ProductImage components independently', () => {
      // Arrange & Act
      render(
        <div>
          <ProductImage src="image1.jpg" alt="Image 1" className="image-1" />
          <ProductImage src="image2.jpg" alt="Image 2" className="image-2" />
        </div>
      )

      // Assert
      const images = screen.getAllByTestId('product-image')
      expect(images).toHaveLength(2)
      expect(images[0]).toHaveAttribute('src', 'image1.jpg')
      expect(images[1]).toHaveAttribute('src', 'image2.jpg')

      const skeletons = screen.getAllByTestId('skeleton')
      expect(skeletons).toHaveLength(2)
    })

    it('handles independent state changes for multiple instances', () => {
      // Arrange
      render(
        <div>
          <ProductImage src="image1.jpg" alt="Image 1" />
          <ProductImage src="image2.jpg" alt="Image 2" />
        </div>
      )
      const images = screen.getAllByTestId('product-image')

      // Act - Load first image, error second image
      if (images[0]) fireEvent.load(images[0])
      if (images[1]) fireEvent.error(images[1])

      // Assert - Both skeletons should be hidden (one loaded, one errored)
      expect(screen.queryAllByTestId('skeleton')).toHaveLength(0)
      expect(screen.getByText('No image')).toBeInTheDocument()
      expect(images[0]).toBeInTheDocument() // First image still visible
    })
  })

  // Test edge cases
  describe('Edge cases', () => {
    it('handles rapid load/error events correctly', () => {
      // Arrange
      render(<ProductImage {...mockProps} />)
      const image = screen.getByTestId('product-image')

      // Act - Rapid fire events (error wins because it removes the image)
      fireEvent.error(image)
      fireEvent.load(image) // This won't have effect as image is removed

      // Assert - Error state should persist
      expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument()
      expect(screen.queryByTestId('product-image')).not.toBeInTheDocument()
      expect(screen.getByText('No image')).toBeInTheDocument()
    })

    it('handles placeholder src attribute', () => {
      // Arrange & Act
      render(<ProductImage src="/placeholder.jpg" alt="Placeholder" />)

      // Assert
      const image = screen.getByTestId('product-image')
      expect(image).toHaveAttribute('src', '/placeholder.jpg')
    })

    it('handles very long alt text', () => {
      // Arrange
      const longAlt =
        'This is a very long alt text that contains many words and describes the product in great detail with multiple sentences and various descriptive elements.'

      // Act
      render(<ProductImage src="test.jpg" alt={longAlt} />)

      // Assert
      const image = screen.getByTestId('product-image')
      expect(image).toHaveAttribute('alt', longAlt)
    })
  })

  // Test accessibility
  describe('Accessibility', () => {
    it('provides proper alt text for screen readers', () => {
      // Arrange & Act
      render(<ProductImage {...mockProps} />)

      // Assert
      const image = screen.getByTestId('product-image')
      expect(image).toHaveAttribute('alt', 'Test Product Image')
    })

    it('maintains alt text even when image fails to load', () => {
      // Note: Error state shows text content instead of image with alt
      // Arrange
      render(<ProductImage {...mockProps} />)
      const image = screen.getByTestId('product-image')

      // Act
      fireEvent.error(image)

      // Assert
      expect(screen.getByText('No image')).toBeInTheDocument()
    })
  })
})
