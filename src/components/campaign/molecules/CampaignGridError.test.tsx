/**
 * Unit tests for CampaignGridError component
 * SOLID Principles: SRP - Single responsibility for error state testing
 * Design Patterns: AAA (Arrange, Act, Assert) Testing Pattern
 * Dependencies: React Testing Library, Jest, i18n mock
 */

import { render, screen, fireEvent } from '@testing-library/react'
import { CampaignGridError } from './CampaignGridError'

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'errors.loadFailed': 'Failed to load campaigns',
        'errors.errorMessage': 'Something went wrong. Please try again.',
        'errors.tryAgain': 'Try Again',
      }
      return translations[key] || key
    },
  }),
}))

// Mock Lucide React icons
interface MockIconProps {
  className?: string
  [key: string]: unknown
}

jest.mock('lucide-react', () => ({
  AlertCircle: ({ className, ...props }: MockIconProps) => (
    <div data-testid="alert-circle" className={className} {...props} />
  ),
  RefreshCw: ({ className, ...props }: MockIconProps) => (
    <div data-testid="refresh-cw" className={className} {...props} />
  ),
}))

// Mock shadcn/ui components
interface MockButtonProps {
  children?: React.ReactNode
  onClick?: () => void
  className?: string
  [key: string]: unknown
}

jest.mock('@/components/ui/schadcn/button', () => ({
  Button: ({ children, onClick, className, ...props }: MockButtonProps) => (
    <button
      onClick={onClick}
      className={className}
      data-testid="retry-button"
      {...props}
    >
      {children}
    </button>
  ),
}))

interface MockCardProps {
  children?: React.ReactNode
  className?: string
}

jest.mock('@/components/ui/schadcn/card', () => ({
  Card: ({ children, className }: MockCardProps) => (
    <div data-testid="error-card" className={className}>
      {children}
    </div>
  ),
  CardContent: ({ children, className }: MockCardProps) => (
    <div data-testid="card-content" className={className}>
      {children}
    </div>
  ),
}))

describe('CampaignGridError', () => {
  // Test basic rendering
  describe('Basic rendering', () => {
    it('renders error message with default text', () => {
      // Arrange & Act
      render(<CampaignGridError />)

      // Assert
      expect(screen.getByText('Failed to load campaigns')).toBeInTheDocument()
      expect(
        screen.getByText('Something went wrong. Please try again.')
      ).toBeInTheDocument()
      expect(screen.getByTestId('alert-circle')).toBeInTheDocument()
      expect(screen.getByTestId('error-card')).toBeInTheDocument()
    })

    it('renders with custom error message', () => {
      // Arrange
      const customError = new Error('Network connection failed')

      // Act
      render(<CampaignGridError error={customError} />)

      // Assert
      expect(screen.getByText('Failed to load campaigns')).toBeInTheDocument()
      expect(screen.getByText('Network connection failed')).toBeInTheDocument()
    })

    it('applies custom className', () => {
      // Arrange
      const customClassName = 'custom-error-class'

      // Act
      render(<CampaignGridError className={customClassName} />)

      // Assert
      const errorCard = screen.getByTestId('error-card')
      expect(errorCard).toHaveClass('border-destructive', customClassName)
    })

    it('applies default className when none provided', () => {
      // Arrange & Act
      render(<CampaignGridError />)

      // Assert
      const errorCard = screen.getByTestId('error-card')
      expect(errorCard).toHaveClass('border-destructive')
    })
  })

  // Test retry functionality
  describe('Retry functionality', () => {
    it('renders retry button when onRetry is provided', () => {
      // Arrange
      const mockOnRetry = jest.fn()

      // Act
      render(<CampaignGridError onRetry={mockOnRetry} />)

      // Assert
      expect(screen.getByTestId('retry-button')).toBeInTheDocument()
      expect(screen.getByText('Try Again')).toBeInTheDocument()
      expect(screen.getByTestId('refresh-cw')).toBeInTheDocument()
    })

    it('does not render retry button when onRetry is not provided', () => {
      // Arrange & Act
      render(<CampaignGridError />)

      // Assert
      expect(screen.queryByTestId('retry-button')).not.toBeInTheDocument()
      expect(screen.queryByText('Try Again')).not.toBeInTheDocument()
    })

    it('calls onRetry when retry button is clicked', () => {
      // Arrange
      const mockOnRetry = jest.fn()
      render(<CampaignGridError onRetry={mockOnRetry} />)

      // Act
      fireEvent.click(screen.getByTestId('retry-button'))

      // Assert
      expect(mockOnRetry).toHaveBeenCalledTimes(1)
    })

    it('calls onRetry multiple times when retry button is clicked multiple times', () => {
      // Arrange
      const mockOnRetry = jest.fn()
      render(<CampaignGridError onRetry={mockOnRetry} />)

      // Act
      fireEvent.click(screen.getByTestId('retry-button'))
      fireEvent.click(screen.getByTestId('retry-button'))
      fireEvent.click(screen.getByTestId('retry-button'))

      // Assert
      expect(mockOnRetry).toHaveBeenCalledTimes(3)
    })
  })

  // Test error message handling
  describe('Error message handling', () => {
    it('displays error message when error object is provided', () => {
      // Arrange
      const error = new Error('Custom error message')

      // Act
      render(<CampaignGridError error={error} />)

      // Assert
      expect(screen.getByText('Custom error message')).toBeInTheDocument()
    })

    it('displays default message when error object has no message', () => {
      // Arrange
      const error = new Error('')

      // Act
      render(<CampaignGridError error={error} />)

      // Assert
      expect(
        screen.getByText('Something went wrong. Please try again.')
      ).toBeInTheDocument()
    })

    it('displays default message when error is undefined', () => {
      // Arrange & Act
      render(<CampaignGridError error={undefined as unknown as Error} />)

      // Assert
      expect(
        screen.getByText('Something went wrong. Please try again.')
      ).toBeInTheDocument()
    })
  })

  // Test component structure and styling
  describe('Component structure', () => {
    it('has correct card structure with destructive border', () => {
      // Arrange & Act
      render(<CampaignGridError />)

      // Assert
      const card = screen.getByTestId('error-card')
      const content = screen.getByTestId('card-content')

      expect(card).toHaveClass('border-destructive')
      expect(content).toHaveClass(
        'flex',
        'flex-col',
        'items-center',
        'justify-center',
        'py-12',
        'text-center'
      )
    })

    it('displays alert icon with correct styling', () => {
      // Arrange & Act
      render(<CampaignGridError />)

      // Assert
      const alertIcon = screen.getByTestId('alert-circle')
      expect(alertIcon).toHaveClass('h-12', 'w-12', 'text-destructive', 'mb-4')
    })

    it('displays refresh icon in retry button when onRetry is provided', () => {
      // Arrange
      const mockOnRetry = jest.fn()

      // Act
      render(<CampaignGridError onRetry={mockOnRetry} />)

      // Assert
      const refreshIcon = screen.getByTestId('refresh-cw')
      expect(refreshIcon).toHaveClass('h-4', 'w-4')
    })
  })

  // Test prop combinations
  describe('Prop combinations', () => {
    it('renders correctly with all props provided', () => {
      // Arrange
      const error = new Error('Test error')
      const onRetry = jest.fn()
      const className = 'test-class'

      // Act
      render(
        <CampaignGridError
          error={error}
          onRetry={onRetry}
          className={className}
        />
      )

      // Assert
      expect(screen.getByText('Failed to load campaigns')).toBeInTheDocument()
      expect(screen.getByText('Test error')).toBeInTheDocument()
      expect(screen.getByTestId('retry-button')).toBeInTheDocument()
      expect(screen.getByTestId('error-card')).toHaveClass(
        'border-destructive',
        'test-class'
      )
    })

    it('renders correctly with minimal props', () => {
      // Arrange & Act
      render(<CampaignGridError />)

      // Assert
      expect(screen.getByText('Failed to load campaigns')).toBeInTheDocument()
      expect(
        screen.getByText('Something went wrong. Please try again.')
      ).toBeInTheDocument()
      expect(screen.queryByTestId('retry-button')).not.toBeInTheDocument()
    })
  })

  // Test accessibility
  describe('Accessibility', () => {
    it('has accessible heading structure', () => {
      // Arrange & Act
      render(<CampaignGridError />)

      // Assert
      const heading = screen.getByRole('heading', { level: 3 })
      expect(heading).toHaveTextContent('Failed to load campaigns')
    })

    it('retry button is accessible when provided', () => {
      // Arrange
      const mockOnRetry = jest.fn()

      // Act
      render(<CampaignGridError onRetry={mockOnRetry} />)

      // Assert
      const button = screen.getByRole('button', { name: /try again/i })
      expect(button).toBeInTheDocument()
      expect(button).not.toBeDisabled()
    })
  })
})
