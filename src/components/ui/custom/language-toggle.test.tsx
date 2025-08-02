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
  render,
  screen,
  fireEvent,
  waitFor,
} from '@/__tests__/utils/test-utils'
import { LanguageToggle } from './language-toggle'

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  Check: ({ className, ...props }: { className?: string }) => (
    <div data-testid="check-icon" className={className} {...props} />
  ),
}))

// Mock UI components
jest.mock('@/components/ui', () => ({
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
        className={`btn ${variant} ${size} ${className}`}
        data-variant={variant}
        data-size={size}
        {...props}
      >
        {children}
      </button>
    )
  }),
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

// Mock language store
const mockLanguageStore = {
  language: 'sv' as 'en' | 'sv' | 'tr',
  setLanguage: jest.fn().mockResolvedValue(undefined),
  isLoading: false,
  getAvailableLanguages: jest.fn(() => ['en', 'sv', 'tr'] as const),
}

jest.mock('@/lib/stores', () => ({
  useLanguageStore: jest.fn(() => mockLanguageStore),
}))

describe('LanguageToggle', () => {
  beforeEach(() => {
    jest.clearAllMocks()
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

      render(<LanguageToggle />)

      const skeleton = screen.getByLabelText('Loading language selector')
      expect(skeleton).toBeInTheDocument()
      expect(skeleton).toHaveAttribute('disabled')
      expect(screen.getByText('🌐')).toBeInTheDocument()
    })

    it('should render dropdown after mounting', async () => {
      render(<LanguageToggle />)

      await waitFor(() => {
        expect(screen.getByTestId('dropdown-menu')).toBeInTheDocument()
      })
    })

    it('should render current language flag in trigger', async () => {
      render(<LanguageToggle />)

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

    it('should render fallback globe icon when language not found', async () => {
      mockLanguageStore.language = 'unknown' as 'en' | 'sv' | 'tr'

      render(<LanguageToggle />)

      await waitFor(() => {
        // Check the trigger button specifically
        const trigger = screen.getByTestId('dropdown-menu-trigger')
        const button = trigger.querySelector('button')
        expect(button).toContainHTML('🌐')
        expect(
          screen.getByLabelText('Current language: unknown')
        ).toBeInTheDocument()
      })
    })
  })

  describe('Language Options', () => {
    it('should render all language options in dropdown content', async () => {
      render(<LanguageToggle />)

      await waitFor(() => {
        // Check that all flags appear (they appear in both trigger and menu items)
        expect(screen.getAllByText('🇬🇧')).toHaveLength(1) // English (only in menu, not trigger since Swedish is selected)
        expect(screen.getAllByText('🇸🇪')).toHaveLength(2) // Swedish (in trigger and menu)
        expect(screen.getAllByText('🇹🇷')).toHaveLength(1) // Turkish (only in menu)
      })
    })

    it('should show check icon for currently selected language', async () => {
      render(<LanguageToggle />)

      await waitFor(() => {
        const checkIcons = screen.getAllByTestId('check-icon')
        const swedishCheck = checkIcons.find(icon =>
          icon.className?.includes('opacity-100')
        )
        expect(swedishCheck).toBeInTheDocument()

        const hiddenChecks = checkIcons.filter(icon =>
          icon.className?.includes('opacity-0')
        )
        expect(hiddenChecks).toHaveLength(2) // English and Turkish should be hidden
      })
    })

    it('should render dropdown content with correct styling', async () => {
      render(<LanguageToggle />)

      await waitFor(() => {
        const content = screen.getByTestId('dropdown-menu-content')
        expect(content).toHaveAttribute('data-align', 'end')
        expect(content).toHaveClass(
          '!w-[80px]',
          'min-w-0',
          'bg-popover',
          'border-border'
        )
      })
    })
  })

  describe('Language Selection', () => {
    it('should call setLanguage when clicking on different language', async () => {
      render(<LanguageToggle />)

      await waitFor(() => {
        const menuItems = screen.getAllByTestId('dropdown-menu-item')
        // Find English option (first item)
        const englishItem = menuItems[0]
        if (englishItem) {
          fireEvent.click(englishItem)
        }
      })

      expect(mockLanguageStore.setLanguage).toHaveBeenCalledWith('en')
    })

    it('should not call setLanguage when clicking on currently selected language', async () => {
      render(<LanguageToggle />)

      await waitFor(() => {
        const menuItems = screen.getAllByTestId('dropdown-menu-item')
        // Find Swedish option (second item) - currently selected
        const swedishItem = menuItems[1]
        if (swedishItem) {
          fireEvent.click(swedishItem)
        }
      })

      expect(mockLanguageStore.setLanguage).not.toHaveBeenCalled()
    })

    it('should not call setLanguage when loading', async () => {
      mockLanguageStore.isLoading = true

      render(<LanguageToggle />)

      await waitFor(() => {
        const menuItems = screen.getAllByTestId('dropdown-menu-item')
        const englishItem = menuItems[0]
        if (englishItem) {
          fireEvent.click(englishItem)
        }
      })

      expect(mockLanguageStore.setLanguage).not.toHaveBeenCalled()
    })

    it('should handle async language change', async () => {
      const setLanguagePromise = Promise.resolve()
      mockLanguageStore.setLanguage.mockReturnValue(setLanguagePromise)

      render(<LanguageToggle />)

      await waitFor(() => {
        const menuItems = screen.getAllByTestId('dropdown-menu-item')
        const englishItem = menuItems[0]
        if (englishItem) {
          fireEvent.click(englishItem)
        }
      })

      expect(mockLanguageStore.setLanguage).toHaveBeenCalledWith('en')
      await expect(setLanguagePromise).resolves.toBeUndefined()
    })
  })

  describe('Loading States', () => {
    it('should disable trigger when loading', async () => {
      mockLanguageStore.isLoading = true

      render(<LanguageToggle />)

      await waitFor(() => {
        const trigger = screen.getByTestId('dropdown-menu-trigger')
        const button = trigger.querySelector('button')
        expect(button).toHaveAttribute('disabled')
      })
    })

    it('should disable menu items when loading', async () => {
      mockLanguageStore.isLoading = true

      render(<LanguageToggle />)

      await waitFor(() => {
        const menuItems = screen.getAllByTestId('dropdown-menu-item')
        menuItems.forEach(item => {
          expect(item).toHaveAttribute('data-disabled', 'true')
        })
      })
    })
  })

  describe('Different Languages', () => {
    it('should display English flag and label correctly', async () => {
      mockLanguageStore.language = 'en'

      render(<LanguageToggle />)

      await waitFor(() => {
        // Check the trigger button specifically
        const trigger = screen.getByTestId('dropdown-menu-trigger')
        const button = trigger.querySelector('button')
        expect(button).toContainHTML('🇬🇧')
        expect(
          screen.getByLabelText('Current language: English')
        ).toBeInTheDocument()
      })
    })

    it('should display Turkish flag and label correctly', async () => {
      mockLanguageStore.language = 'tr'

      render(<LanguageToggle />)

      await waitFor(() => {
        // Check the trigger button specifically
        const trigger = screen.getByTestId('dropdown-menu-trigger')
        const button = trigger.querySelector('button')
        expect(button).toContainHTML('🇹🇷')
        expect(
          screen.getByLabelText('Current language: Türkçe')
        ).toBeInTheDocument()
      })
    })
  })

  describe('Component Structure', () => {
    it('should render all component parts', async () => {
      render(<LanguageToggle />)

      await waitFor(() => {
        expect(screen.getByTestId('dropdown-menu')).toBeInTheDocument()
        expect(screen.getByTestId('dropdown-menu-trigger')).toBeInTheDocument()
        expect(screen.getByTestId('dropdown-menu-content')).toBeInTheDocument()
        expect(screen.getAllByTestId('dropdown-menu-item')).toHaveLength(3)
      })
    })

    it('should render trigger button with correct props', async () => {
      render(<LanguageToggle />)

      await waitFor(() => {
        const trigger = screen.getByTestId('dropdown-menu-trigger')
        const button = trigger.querySelector('button')
        expect(button).toHaveAttribute('data-variant', 'ghost')
        expect(button).toHaveAttribute('data-size', 'icon')
        expect(button).toHaveClass('w-9', 'h-9')
      })
    })

    it('should render menu items with correct structure', async () => {
      render(<LanguageToggle />)

      await waitFor(() => {
        const menuItems = screen.getAllByTestId('dropdown-menu-item')
        expect(menuItems).toHaveLength(3)

        menuItems.forEach(item => {
          expect(item).toHaveClass('cursor-pointer')
          expect(item).toHaveAttribute('role', 'menuitem')
        })
      })
    })
  })

  describe('Accessibility', () => {
    it('should have proper aria labels', async () => {
      render(<LanguageToggle />)

      await waitFor(() => {
        expect(
          screen.getByLabelText('Current language: Svenska')
        ).toBeInTheDocument()
      })
    })

    it('should have aria-hidden on check icons', async () => {
      render(<LanguageToggle />)

      await waitFor(() => {
        const checkIcons = screen.getAllByTestId('check-icon')
        checkIcons.forEach(icon => {
          expect(icon).toHaveAttribute('aria-hidden', 'true')
        })
      })
    })

    it('should have proper role attributes on menu items', async () => {
      render(<LanguageToggle />)

      await waitFor(() => {
        const menuItems = screen.getAllByTestId('dropdown-menu-item')
        menuItems.forEach(item => {
          expect(item).toHaveAttribute('role', 'menuitem')
        })
      })
    })
  })
})
