/**
 * Unit tests for LanguageToggle Component
 *
 * SOLID Principles Applied:
 * - SRP: Tests focus solely on language toggle behavior
 * - DIP: Tests depend on mocked abstractions
 *
 * Design Patterns:
 * - AAA Pattern: Arrange, Act, Assert test structure
 * - Mock Pattern: All external dependencies mocked
 */

import React from 'react'
import {
  renderWithProviders,
  screen,
  fireEvent,
  waitFor,
} from '@/__tests__/utils'
import { LanguageToggle } from '../language-toggle'
import { createLanguageStoreMock } from '@/__tests__/mocks/store-mocks'

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  Check: ({ className, ...props }: { className?: string }) => (
    <div data-testid="check-icon" className={className} {...props} />
  ),
}))

// Mock UI components from schadcn
jest.mock('@/components/ui/schadcn/button', () => ({
  Button: React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement> & {
      variant?: string
      size?: string
    }
  >(function MockButton({ children, className, variant, size, ...props }, ref) {
    return (
      <button
        ref={ref}
        className={className}
        data-variant={variant}
        data-size={size}
        {...props}
      >
        {children}
      </button>
    )
  }),
}))

jest.mock('@/components/ui', () => ({
  DropdownMenu: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dropdown-menu">{children}</div>
  ),
  DropdownMenuContent: ({
    children,
    align,
    className,
  }: {
    children: React.ReactNode
    align?: string
    className?: string
  }) => (
    <div
      data-testid="dropdown-menu-content"
      data-align={align}
      className={className}
    >
      {children}
    </div>
  ),
  DropdownMenuItem: ({
    children,
    onClick,
    className,
    disabled,
  }: {
    children: React.ReactNode
    onClick?: () => void
    className?: string
    disabled?: boolean
  }) => (
    <div
      data-testid="dropdown-menu-item"
      onClick={onClick}
      className={className}
      data-disabled={disabled}
      role="menuitem"
    >
      {children}
    </div>
  ),
  DropdownMenuTrigger: React.forwardRef<
    HTMLDivElement,
    { children: React.ReactNode; asChild?: boolean }
  >(function MockDropdownMenuTrigger({ children }, ref) {
    return (
      <div ref={ref} data-testid="dropdown-menu-trigger">
        {children}
      </div>
    )
  }),
}))

// Create mock language store with centralized mock
const mockLanguageStore = createLanguageStoreMock('sv')

jest.mock('@/lib/stores', () => ({
  useLanguageStore: jest.fn(() => mockLanguageStore),
}))

describe('LanguageToggle', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Reset to Swedish as default for tests
    mockLanguageStore.language = 'sv'
    mockLanguageStore.isLoading = false
    mockLanguageStore.setLanguage.mockResolvedValue(undefined)
  })

  describe('Component Rendering', () => {
    it('should render loading skeleton initially before mounting', () => {
      // Mock useState to simulate unmounted state
      const mockSetMounted = jest.fn()
      jest
        .spyOn(React, 'useState')
        .mockImplementationOnce(() => [false, mockSetMounted])

      renderWithProviders(<LanguageToggle />)

      const skeleton = screen.getByLabelText('Loading language selector')
      expect(skeleton).toBeInTheDocument()
      expect(skeleton).toHaveAttribute('disabled')
      expect(screen.getByText('🌐')).toBeInTheDocument()
    })

    it('should render dropdown after mounting', async () => {
      renderWithProviders(<LanguageToggle />)

      await waitFor(() => {
        expect(screen.getByTestId('dropdown-menu')).toBeInTheDocument()
      })
    })

    it('should render current language flag in trigger', async () => {
      renderWithProviders(<LanguageToggle />)

      await waitFor(() => {
        // Check the trigger button specifically
        const trigger = screen.getByTestId('dropdown-menu-trigger')
        const button = trigger.querySelector('button')
        expect(button).toContainHTML('🇸🇪')
        expect(
          screen.getByLabelText('Current language: Svenska')
        ).toBeInTheDocument()
      })
    })
  })

  describe('Language Options', () => {
    it('should render all language options in dropdown content', async () => {
      renderWithProviders(<LanguageToggle />)

      await waitFor(() => {
        // Check that all flags appear
        expect(screen.getAllByText('🇬🇧')).toHaveLength(1) // English (only in menu)
        expect(screen.getAllByText('🇸🇪')).toHaveLength(2) // Swedish (in trigger and menu)
        expect(screen.getAllByText('🇹🇷')).toHaveLength(1) // Turkish (only in menu)
        expect(screen.getAllByText('🇩🇰')).toHaveLength(1) // Danish (only in menu)
        expect(screen.getAllByText('🇩🇪')).toHaveLength(1) // German (only in menu)
      })
    })

    it('should show check icon for currently selected language', async () => {
      renderWithProviders(<LanguageToggle />)

      await waitFor(() => {
        const checkIcons = screen.getAllByTestId('check-icon')
        const swedishCheck = checkIcons.find(icon =>
          icon.className?.includes('opacity-100')
        )
        expect(swedishCheck).toBeInTheDocument()

        const otherChecks = checkIcons.filter(
          icon => !icon.className?.includes('opacity-100')
        )
        otherChecks.forEach(icon => {
          expect(icon.className).toContain('opacity-0')
        })
      })
    })

    it('should handle language change when clicking an option', async () => {
      renderWithProviders(<LanguageToggle />)

      await waitFor(() => {
        const menuItems = screen.getAllByTestId('dropdown-menu-item')
        // First item is English (component only shows flags, not labels)
        const englishItem = menuItems[0]
        expect(englishItem).toBeInTheDocument()

        if (englishItem) {
          fireEvent.click(englishItem)
        }
      })

      expect(mockLanguageStore.setLanguage).toHaveBeenCalledWith('en')
    })

    it('should disable menu items when loading', async () => {
      mockLanguageStore.isLoading = true
      renderWithProviders(<LanguageToggle />)

      await waitFor(() => {
        const menuItems = screen.getAllByTestId('dropdown-menu-item')
        menuItems.forEach(item => {
          expect(item).toHaveAttribute('data-disabled', 'true')
        })
      })
    })
  })

  describe('Component Structure', () => {
    it('should render trigger button with correct props', async () => {
      renderWithProviders(<LanguageToggle />)

      await waitFor(() => {
        const trigger = screen.getByTestId('dropdown-menu-trigger')
        const button = trigger.querySelector('button')
        expect(button).toHaveAttribute('data-variant', 'ghost')
        expect(button).toHaveAttribute('data-size', 'icon')
      })
    })

    it('should render dropdown content with correct alignment', async () => {
      renderWithProviders(<LanguageToggle />)

      await waitFor(() => {
        const content = screen.getByTestId('dropdown-menu-content')
        expect(content).toHaveAttribute('data-align', 'end')
        expect(content).toHaveClass(
          '!w-[100px]',
          'min-w-0',
          'bg-popover',
          'border-border'
        )
      })
    })

    it('should render language flags correctly', async () => {
      renderWithProviders(<LanguageToggle />)

      await waitFor(() => {
        // Component only shows flags, not labels
        const menuItems = screen.getAllByTestId('dropdown-menu-item')
        expect(menuItems).toHaveLength(5) // 5 languages

        // Check that flags are present in dropdown
        expect(screen.getAllByText('🇬🇧')).toHaveLength(1) // English
        expect(screen.getAllByText('🇸🇪')).toHaveLength(2) // Swedish (trigger + menu)
        expect(screen.getAllByText('🇹🇷')).toHaveLength(1) // Turkish
        expect(screen.getAllByText('🇩🇰')).toHaveLength(1) // Danish
        expect(screen.getAllByText('🇩🇪')).toHaveLength(1) // German
      })
    })
  })

  describe('Accessibility', () => {
    it('should have proper aria labels', async () => {
      renderWithProviders(<LanguageToggle />)

      await waitFor(() => {
        expect(
          screen.getByLabelText('Current language: Svenska')
        ).toBeInTheDocument()
      })
    })

    it('should disable button when in loading state', async () => {
      mockLanguageStore.isLoading = true
      renderWithProviders(<LanguageToggle />)

      await waitFor(() => {
        const trigger = screen.getByTestId('dropdown-menu-trigger')
        const button = trigger.querySelector('button')
        expect(button).toHaveAttribute('disabled')
      })
    })
  })

  describe('Edge Cases', () => {
    it('should NOT call setLanguage when clicking same language', async () => {
      renderWithProviders(<LanguageToggle />)

      await waitFor(() => {
        const menuItems = screen.getAllByTestId('dropdown-menu-item')
        // Swedish is at index 1 (after English)
        const swedishItem = menuItems[1]
        expect(swedishItem).toBeInTheDocument()

        if (swedishItem) {
          fireEvent.click(swedishItem)
        }
      })

      // Should NOT call setLanguage if it's already the selected language
      expect(mockLanguageStore.setLanguage).not.toHaveBeenCalled()
    })

    it('should handle rapid language changes', async () => {
      renderWithProviders(<LanguageToggle />)

      await waitFor(() => {
        const menuItems = screen.getAllByTestId('dropdown-menu-item')
        const englishItem = menuItems[0] // English is first
        const turkishItem = menuItems[2] // Turkish is third

        if (englishItem) fireEvent.click(englishItem)
        if (turkishItem) fireEvent.click(turkishItem)
      })

      expect(mockLanguageStore.setLanguage).toHaveBeenCalledTimes(2)
      expect(mockLanguageStore.setLanguage).toHaveBeenCalledWith('en')
      expect(mockLanguageStore.setLanguage).toHaveBeenCalledWith('tr')
    })
  })
})
