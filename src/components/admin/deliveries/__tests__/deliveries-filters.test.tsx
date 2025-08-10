/**
 * Unit tests for DeliveriesFilters component
 * SOLID Principles: SRP - Single responsibility for filters testing
 * Design Patterns: AAA (Arrange, Act, Assert) Testing Pattern
 * Dependencies: React Testing Library, Jest
 */

import { render, screen } from '@testing-library/react'
import { DeliveriesFilters } from '../deliveries-filters'
import { useTranslation } from 'react-i18next'

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}))

// Mock shadcn/ui Button component
jest.mock('@/components/ui/schadcn', () => ({
  Button: ({
    children,
    variant,
    size,
    className,
    onClick,
  }: {
    children: React.ReactNode
    variant?: string
    size?: string
    className?: string
    onClick?: () => void
  }) => (
    <button
      data-testid="button"
      data-variant={variant}
      data-size={size}
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  ),
}))

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Filter: ({ className }: { className?: string }) => (
    <span data-testid="filter-icon" className={className}>
      Filter Icon
    </span>
  ),
  Search: ({ className }: { className?: string }) => (
    <span data-testid="search-icon" className={className}>
      Search Icon
    </span>
  ),
}))

describe('DeliveriesFilters', () => {
  const mockT = jest.fn((key: string) => {
    const translations: Record<string, string> = {
      'pages.deliveries.status.pending': 'Pending',
      'pages.deliveries.status.inTransit': 'In Transit',
      'pages.deliveries.status.delivered': 'Delivered',
      'actions.search': 'Search',
    }
    return translations[key] || key
  })

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useTranslation as jest.Mock).mockReturnValue({
      t: mockT,
    })
  })

  describe('Component Structure', () => {
    it('renders without crashing', () => {
      expect(() => render(<DeliveriesFilters />)).not.toThrow()
    })

    it('renders main container with correct classes', () => {
      render(<DeliveriesFilters />)

      const container = screen
        .getByTestId('filter-icon')
        .closest('.flex.items-center.gap-4')
      expect(container).toBeInTheDocument()
      expect(container).toHaveClass(
        'flex',
        'items-center',
        'gap-4',
        'p-4',
        'bg-card',
        'rounded-lg',
        'border'
      )
    })

    it('renders filter label section', () => {
      render(<DeliveriesFilters />)

      const filterSection = screen
        .getByTestId('filter-icon')
        .closest('.flex.items-center.gap-2')
      expect(filterSection).toBeInTheDocument()
      expect(filterSection).toHaveClass('flex', 'items-center', 'gap-2')
    })
  })

  describe('Filter Icon and Label', () => {
    it('renders Filter icon with correct classes', () => {
      render(<DeliveriesFilters />)

      const filterIcon = screen.getByTestId('filter-icon')
      expect(filterIcon).toBeInTheDocument()
      expect(filterIcon).toHaveClass('h-4', 'w-4', 'text-muted-foreground')
    })

    it('renders Filters label text', () => {
      render(<DeliveriesFilters />)

      expect(screen.getByText('Filters:')).toBeInTheDocument()
    })

    it('renders label with correct styling', () => {
      render(<DeliveriesFilters />)

      const label = screen.getByText('Filters:')
      expect(label).toHaveClass('text-sm', 'font-medium')
    })
  })

  describe('Filter Buttons', () => {
    it('renders all status filter buttons', () => {
      render(<DeliveriesFilters />)

      expect(screen.getByText('Pending')).toBeInTheDocument()
      expect(screen.getByText('In Transit')).toBeInTheDocument()
      expect(screen.getByText('Delivered')).toBeInTheDocument()
    })

    it('renders filter buttons with correct variant', () => {
      render(<DeliveriesFilters />)

      const buttons = screen.getAllByTestId('button')
      // First 3 buttons are filter buttons (excluding search button)
      const filterButtons = buttons.slice(0, 3)

      filterButtons.forEach(button => {
        expect(button).toHaveAttribute('data-variant', 'outline')
      })
    })

    it('renders filter buttons with correct size', () => {
      render(<DeliveriesFilters />)

      const buttons = screen.getAllByTestId('button')
      // First 3 buttons are filter buttons
      const filterButtons = buttons.slice(0, 3)

      filterButtons.forEach(button => {
        expect(button).toHaveAttribute('data-size', 'sm')
      })
    })

    it('uses correct translation keys for status buttons', () => {
      render(<DeliveriesFilters />)

      expect(mockT).toHaveBeenCalledWith('pages.deliveries.status.pending')
      expect(mockT).toHaveBeenCalledWith('pages.deliveries.status.inTransit')
      expect(mockT).toHaveBeenCalledWith('pages.deliveries.status.delivered')
    })
  })

  describe('Search Button', () => {
    it('renders search button', () => {
      render(<DeliveriesFilters />)

      expect(screen.getByText('Search')).toBeInTheDocument()
    })

    it('renders search icon with correct classes', () => {
      render(<DeliveriesFilters />)

      const searchIcon = screen.getByTestId('search-icon')
      expect(searchIcon).toBeInTheDocument()
      expect(searchIcon).toHaveClass('h-4', 'w-4', 'mr-2')
    })

    it('renders search button with correct variant', () => {
      render(<DeliveriesFilters />)

      const buttons = screen.getAllByTestId('button')
      const searchButton = buttons[buttons.length - 1] // Last button is search

      expect(searchButton).toHaveAttribute('data-variant', 'ghost')
    })

    it('renders search button with correct size', () => {
      render(<DeliveriesFilters />)

      const buttons = screen.getAllByTestId('button')
      const searchButton = buttons[buttons.length - 1]

      expect(searchButton).toHaveAttribute('data-size', 'sm')
    })

    it('positions search button container correctly', () => {
      render(<DeliveriesFilters />)

      const searchContainer = screen.getByTestId('search-icon').closest('div')
      expect(searchContainer).toHaveClass('ml-auto')
    })

    it('uses correct translation key for search button', () => {
      render(<DeliveriesFilters />)

      expect(mockT).toHaveBeenCalledWith('actions.search')
    })
  })

  describe('Translation Integration', () => {
    it('calls useTranslation with correct namespace', () => {
      render(<DeliveriesFilters />)

      expect(useTranslation).toHaveBeenCalledWith('admin')
    })

    it('renders all translated text correctly', () => {
      render(<DeliveriesFilters />)

      expect(screen.getByText('Pending')).toBeInTheDocument()
      expect(screen.getByText('In Transit')).toBeInTheDocument()
      expect(screen.getByText('Delivered')).toBeInTheDocument()
      expect(screen.getByText('Search')).toBeInTheDocument()
    })

    it('calls translation function for all necessary keys', () => {
      render(<DeliveriesFilters />)

      expect(mockT).toHaveBeenCalledTimes(4)
    })
  })

  describe('Layout and Spacing', () => {
    it('renders correct number of buttons', () => {
      render(<DeliveriesFilters />)

      const buttons = screen.getAllByTestId('button')
      expect(buttons).toHaveLength(4) // 3 filter buttons + 1 search button
    })

    it('maintains proper component hierarchy', () => {
      render(<DeliveriesFilters />)

      const mainContainer = screen.getByTestId('filter-icon').closest('.p-4')
      const filterLabel = screen.getByTestId('filter-icon').parentElement
      const searchContainer = screen
        .getByTestId('search-icon')
        .closest('.ml-auto')

      expect(mainContainer).toContainElement(filterLabel as HTMLElement)
      expect(mainContainer).toContainElement(searchContainer as HTMLElement)
    })
  })

  describe('Icon Rendering', () => {
    it('renders both icons', () => {
      render(<DeliveriesFilters />)

      expect(screen.getByTestId('filter-icon')).toBeInTheDocument()
      expect(screen.getByTestId('search-icon')).toBeInTheDocument()
    })

    it('icons have correct size classes', () => {
      render(<DeliveriesFilters />)

      const filterIcon = screen.getByTestId('filter-icon')
      const searchIcon = screen.getByTestId('search-icon')

      expect(filterIcon).toHaveClass('h-4', 'w-4')
      expect(searchIcon).toHaveClass('h-4', 'w-4')
    })
  })

  describe('Component Reusability', () => {
    it('renders consistently on multiple renders', () => {
      const { rerender } = render(<DeliveriesFilters />)

      const firstRenderButtons = screen.getAllByTestId('button').length

      rerender(<DeliveriesFilters />)

      const secondRenderButtons = screen.getAllByTestId('button').length
      expect(secondRenderButtons).toBe(firstRenderButtons)
    })
  })
})
