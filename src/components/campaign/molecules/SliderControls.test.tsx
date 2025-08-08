/**
 * Unit tests for SliderControls component
 * SOLID Principles: SRP - Single responsibility for slider controls testing
 * Design Patterns: AAA (Arrange, Act, Assert) Testing Pattern
 * Dependencies: React Testing Library, Jest
 */

import { render, screen, fireEvent } from '@testing-library/react'
import { SliderControls } from './SliderControls'

interface MockNavigationButtonProps {
  direction: 'prev' | 'next'
  onClick?: () => void
  disabled?: boolean
}

interface MockIndicatorProps {
  total: number
  current: number
  onSelect?: (index: number) => void
}

// Mock the atom components
jest.mock('../atoms', () => ({
  SliderNavigationButton: ({
    direction,
    onClick,
    disabled,
  }: MockNavigationButtonProps) => (
    <button
      data-testid={`nav-button-${direction}`}
      onClick={onClick}
      disabled={disabled}
      data-direction={direction}
    >
      {direction === 'prev' ? 'Previous' : 'Next'}
    </button>
  ),
  SliderIndicator: ({ total, current, onSelect }: MockIndicatorProps) => (
    <div
      data-testid="slider-indicator"
      data-total={total}
      data-current={current}
    >
      {Array.from({ length: total }, (_, index) => (
        <button
          key={index}
          data-testid={`indicator-${index}`}
          onClick={() => onSelect?.(index)}
          data-active={index === current}
        >
          {index + 1}
        </button>
      ))}
    </div>
  ),
}))

describe('SliderControls', () => {
  const mockProps = {
    total: 5,
    current: 0,
    onPrevious: jest.fn(),
    onNext: jest.fn(),
    onSelect: jest.fn(),
    canScrollPrev: false,
    canScrollNext: true,
    className: '',
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  // Test basic rendering
  describe('Basic rendering', () => {
    it('renders navigation buttons', () => {
      // Arrange & Act
      render(<SliderControls {...mockProps} />)

      // Assert
      expect(screen.getByTestId('nav-button-prev')).toBeInTheDocument()
      expect(screen.getByTestId('nav-button-next')).toBeInTheDocument()
      expect(screen.getByText('Previous')).toBeInTheDocument()
      expect(screen.getByText('Next')).toBeInTheDocument()
    })

    it('renders slider indicator', () => {
      // Arrange & Act
      render(<SliderControls {...mockProps} />)

      // Assert
      const indicator = screen.getByTestId('slider-indicator')
      expect(indicator).toBeInTheDocument()
      expect(indicator).toHaveAttribute('data-total', '5')
      expect(indicator).toHaveAttribute('data-current', '0')
    })

    it('renders indicator with correct number of items', () => {
      // Arrange & Act
      render(<SliderControls {...mockProps} />)

      // Assert
      expect(screen.getByTestId('indicator-0')).toBeInTheDocument()
      expect(screen.getByTestId('indicator-1')).toBeInTheDocument()
      expect(screen.getByTestId('indicator-2')).toBeInTheDocument()
      expect(screen.getByTestId('indicator-3')).toBeInTheDocument()
      expect(screen.getByTestId('indicator-4')).toBeInTheDocument()
      expect(screen.queryByTestId('indicator-5')).not.toBeInTheDocument()
    })

    it('applies custom className to indicator container', () => {
      // Arrange
      const customClassName = 'custom-controls-class'

      // Act
      render(<SliderControls {...mockProps} className={customClassName} />)

      // Assert
      const indicatorContainer =
        screen.getByTestId('slider-indicator').parentElement
      expect(indicatorContainer).toHaveClass(
        'absolute',
        'bottom-4',
        'left-0',
        'right-0',
        'z-20',
        customClassName
      )
    })

    it('applies default empty className when none provided', () => {
      // Arrange
      const { className, ...propsWithoutClassName } = mockProps
      void className // Intentionally unused - testing default behavior

      // Act
      render(<SliderControls {...propsWithoutClassName} />)

      // Assert
      const indicatorContainer =
        screen.getByTestId('slider-indicator').parentElement
      expect(indicatorContainer).toHaveClass(
        'absolute',
        'bottom-4',
        'left-0',
        'right-0',
        'z-20'
      )
    })
  })

  // Test navigation button functionality
  describe('Navigation button functionality', () => {
    it('calls onPrevious when previous button is clicked', () => {
      // Arrange
      const mockOnPrevious = jest.fn()
      render(
        <SliderControls
          {...mockProps}
          onPrevious={mockOnPrevious}
          canScrollPrev={true}
        />
      )

      // Act
      fireEvent.click(screen.getByTestId('nav-button-prev'))

      // Assert
      expect(mockOnPrevious).toHaveBeenCalledTimes(1)
    })

    it('calls onNext when next button is clicked', () => {
      // Arrange
      const mockOnNext = jest.fn()
      render(<SliderControls {...mockProps} onNext={mockOnNext} />)

      // Act
      fireEvent.click(screen.getByTestId('nav-button-next'))

      // Assert
      expect(mockOnNext).toHaveBeenCalledTimes(1)
    })

    it('disables previous button when canScrollPrev is false', () => {
      // Arrange & Act
      render(<SliderControls {...mockProps} canScrollPrev={false} />)

      // Assert
      expect(screen.getByTestId('nav-button-prev')).toBeDisabled()
    })

    it('enables previous button when canScrollPrev is true', () => {
      // Arrange & Act
      render(<SliderControls {...mockProps} canScrollPrev={true} />)

      // Assert
      expect(screen.getByTestId('nav-button-prev')).not.toBeDisabled()
    })

    it('disables next button when canScrollNext is false', () => {
      // Arrange & Act
      render(<SliderControls {...mockProps} canScrollNext={false} />)

      // Assert
      expect(screen.getByTestId('nav-button-next')).toBeDisabled()
    })

    it('enables next button when canScrollNext is true', () => {
      // Arrange & Act
      render(<SliderControls {...mockProps} canScrollNext={true} />)

      // Assert
      expect(screen.getByTestId('nav-button-next')).not.toBeDisabled()
    })

    it('passes correct direction to navigation buttons', () => {
      // Arrange & Act
      render(<SliderControls {...mockProps} />)

      // Assert
      expect(screen.getByTestId('nav-button-prev')).toHaveAttribute(
        'data-direction',
        'prev'
      )
      expect(screen.getByTestId('nav-button-next')).toHaveAttribute(
        'data-direction',
        'next'
      )
    })
  })

  // Test indicator functionality
  describe('Indicator functionality', () => {
    it('shows current active indicator', () => {
      // Arrange & Act
      render(<SliderControls {...mockProps} current={2} />)

      // Assert
      expect(screen.getByTestId('indicator-2')).toHaveAttribute(
        'data-active',
        'true'
      )
      expect(screen.getByTestId('indicator-0')).toHaveAttribute(
        'data-active',
        'false'
      )
      expect(screen.getByTestId('indicator-1')).toHaveAttribute(
        'data-active',
        'false'
      )
    })

    it('calls onSelect when indicator is clicked', () => {
      // Arrange
      const mockOnSelect = jest.fn()
      render(<SliderControls {...mockProps} onSelect={mockOnSelect} />)

      // Act
      fireEvent.click(screen.getByTestId('indicator-3'))

      // Assert
      expect(mockOnSelect).toHaveBeenCalledWith(3)
    })

    it('does not pass onSelect when not provided', () => {
      // Arrange
      const { onSelect, ...propsWithoutOnSelect } = mockProps
      void onSelect // Intentionally unused - testing without callback

      // Act
      render(<SliderControls {...propsWithoutOnSelect} />)

      // Assert - Should not crash when clicking indicators
      expect(() => {
        fireEvent.click(screen.getByTestId('indicator-2'))
      }).not.toThrow()
    })

    it('handles different total values', () => {
      // Arrange & Act
      const totals = [1, 3, 10]

      totals.forEach(total => {
        const { unmount } = render(
          <SliderControls {...mockProps} total={total} />
        )

        // Assert
        const indicator = screen.getByTestId('slider-indicator')
        expect(indicator).toHaveAttribute('data-total', total.toString())

        // Check that correct number of indicators are rendered
        for (let i = 0; i < total; i++) {
          expect(screen.getByTestId(`indicator-${i}`)).toBeInTheDocument()
        }
        expect(
          screen.queryByTestId(`indicator-${total}`)
        ).not.toBeInTheDocument()

        unmount()
      })
    })

    it('handles different current values', () => {
      // Arrange & Act
      const currentValues = [0, 2, 4]

      currentValues.forEach(current => {
        const { unmount } = render(
          <SliderControls {...mockProps} current={current} />
        )

        // Assert
        const indicator = screen.getByTestId('slider-indicator')
        expect(indicator).toHaveAttribute('data-current', current.toString())
        expect(screen.getByTestId(`indicator-${current}`)).toHaveAttribute(
          'data-active',
          'true'
        )

        unmount()
      })
    })
  })

  // Test prop combinations
  describe('Prop combinations', () => {
    it('works with all navigation disabled', () => {
      // Arrange & Act
      render(
        <SliderControls
          {...mockProps}
          canScrollPrev={false}
          canScrollNext={false}
        />
      )

      // Assert
      expect(screen.getByTestId('nav-button-prev')).toBeDisabled()
      expect(screen.getByTestId('nav-button-next')).toBeDisabled()
    })

    it('works with all navigation enabled', () => {
      // Arrange & Act
      render(
        <SliderControls
          {...mockProps}
          canScrollPrev={true}
          canScrollNext={true}
        />
      )

      // Assert
      expect(screen.getByTestId('nav-button-prev')).not.toBeDisabled()
      expect(screen.getByTestId('nav-button-next')).not.toBeDisabled()
    })

    it('works with single item (total=1)', () => {
      // Arrange & Act
      render(
        <SliderControls
          {...mockProps}
          total={1}
          current={0}
          canScrollPrev={false}
          canScrollNext={false}
        />
      )

      // Assert
      expect(screen.getByTestId('indicator-0')).toBeInTheDocument()
      expect(screen.queryByTestId('indicator-1')).not.toBeInTheDocument()
      expect(screen.getByTestId('nav-button-prev')).toBeDisabled()
      expect(screen.getByTestId('nav-button-next')).toBeDisabled()
    })

    it('works at first position', () => {
      // Arrange & Act
      render(
        <SliderControls
          {...mockProps}
          current={0}
          canScrollPrev={false}
          canScrollNext={true}
        />
      )

      // Assert
      expect(screen.getByTestId('indicator-0')).toHaveAttribute(
        'data-active',
        'true'
      )
      expect(screen.getByTestId('nav-button-prev')).toBeDisabled()
      expect(screen.getByTestId('nav-button-next')).not.toBeDisabled()
    })

    it('works at last position', () => {
      // Arrange & Act
      render(
        <SliderControls
          {...mockProps}
          current={4}
          canScrollPrev={true}
          canScrollNext={false}
        />
      )

      // Assert
      expect(screen.getByTestId('indicator-4')).toHaveAttribute(
        'data-active',
        'true'
      )
      expect(screen.getByTestId('nav-button-prev')).not.toBeDisabled()
      expect(screen.getByTestId('nav-button-next')).toBeDisabled()
    })

    it('works in middle position', () => {
      // Arrange & Act
      render(
        <SliderControls
          {...mockProps}
          current={2}
          canScrollPrev={true}
          canScrollNext={true}
        />
      )

      // Assert
      expect(screen.getByTestId('indicator-2')).toHaveAttribute(
        'data-active',
        'true'
      )
      expect(screen.getByTestId('nav-button-prev')).not.toBeDisabled()
      expect(screen.getByTestId('nav-button-next')).not.toBeDisabled()
    })
  })

  // Test callback handling
  describe('Callback handling', () => {
    it('calls multiple callbacks independently', () => {
      // Arrange
      const mockOnPrevious = jest.fn()
      const mockOnNext = jest.fn()
      const mockOnSelect = jest.fn()

      render(
        <SliderControls
          {...mockProps}
          onPrevious={mockOnPrevious}
          onNext={mockOnNext}
          onSelect={mockOnSelect}
          canScrollPrev={true}
        />
      )

      // Act
      fireEvent.click(screen.getByTestId('nav-button-prev'))
      fireEvent.click(screen.getByTestId('nav-button-next'))
      fireEvent.click(screen.getByTestId('indicator-3'))

      // Assert
      expect(mockOnPrevious).toHaveBeenCalledTimes(1)
      expect(mockOnNext).toHaveBeenCalledTimes(1)
      expect(mockOnSelect).toHaveBeenCalledWith(3)
    })

    it('handles rapid clicks correctly', () => {
      // Arrange
      const mockOnNext = jest.fn()
      render(<SliderControls {...mockProps} onNext={mockOnNext} />)

      // Act
      const nextButton = screen.getByTestId('nav-button-next')
      fireEvent.click(nextButton)
      fireEvent.click(nextButton)
      fireEvent.click(nextButton)

      // Assert
      expect(mockOnNext).toHaveBeenCalledTimes(3)
    })

    it('calls onSelect with correct indices', () => {
      // Arrange
      const mockOnSelect = jest.fn()
      render(<SliderControls {...mockProps} onSelect={mockOnSelect} />)

      // Act
      fireEvent.click(screen.getByTestId('indicator-0'))
      fireEvent.click(screen.getByTestId('indicator-4'))
      fireEvent.click(screen.getByTestId('indicator-2'))

      // Assert
      expect(mockOnSelect).toHaveBeenNthCalledWith(1, 0)
      expect(mockOnSelect).toHaveBeenNthCalledWith(2, 4)
      expect(mockOnSelect).toHaveBeenNthCalledWith(3, 2)
    })
  })

  // Test edge cases
  describe('Edge cases', () => {
    it('handles zero total items', () => {
      // Arrange & Act
      render(<SliderControls {...mockProps} total={0} current={0} />)

      // Assert
      const indicator = screen.getByTestId('slider-indicator')
      expect(indicator).toHaveAttribute('data-total', '0')
      expect(screen.queryByTestId('indicator-0')).not.toBeInTheDocument()
    })

    it('handles current index beyond total', () => {
      // Arrange & Act
      render(<SliderControls {...mockProps} total={3} current={5} />)

      // Assert
      const indicator = screen.getByTestId('slider-indicator')
      expect(indicator).toHaveAttribute('data-current', '5')
      // Should not crash even with invalid current index
    })

    it('handles negative current index', () => {
      // Arrange & Act
      render(<SliderControls {...mockProps} current={-1} />)

      // Assert
      const indicator = screen.getByTestId('slider-indicator')
      expect(indicator).toHaveAttribute('data-current', '-1')
    })

    it('handles large total numbers', () => {
      // Arrange & Act
      render(<SliderControls {...mockProps} total={100} current={50} />)

      // Assert
      const indicator = screen.getByTestId('slider-indicator')
      expect(indicator).toHaveAttribute('data-total', '100')
      expect(screen.getByTestId('indicator-0')).toBeInTheDocument()
      expect(screen.getByTestId('indicator-99')).toBeInTheDocument()
    })
  })

  // Test accessibility and structure
  describe('Accessibility and structure', () => {
    it('maintains proper DOM structure', () => {
      // Arrange & Act
      render(<SliderControls {...mockProps} />)

      // Assert
      // Navigation buttons should be at root level
      expect(screen.getByTestId('nav-button-prev')).toBeInTheDocument()
      expect(screen.getByTestId('nav-button-next')).toBeInTheDocument()

      // Indicator should be in positioned container
      const indicatorContainer =
        screen.getByTestId('slider-indicator').parentElement
      expect(indicatorContainer).toHaveClass('absolute')
    })

    it('provides proper button elements for interaction', () => {
      // Arrange & Act
      render(<SliderControls {...mockProps} />)

      // Assert
      const prevButton = screen.getByTestId('nav-button-prev')
      const nextButton = screen.getByTestId('nav-button-next')

      expect(prevButton.tagName).toBe('BUTTON')
      expect(nextButton.tagName).toBe('BUTTON')
    })

    it('indicator buttons are focusable', () => {
      // Arrange & Act
      render(<SliderControls {...mockProps} />)

      // Assert
      const indicatorButtons = screen.getAllByTestId(/indicator-\d+/)
      indicatorButtons.forEach(button => {
        expect(button.tagName).toBe('BUTTON')
      })
    })
  })
})
