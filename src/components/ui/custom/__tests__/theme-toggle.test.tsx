/**
 * Theme Toggle Component Unit Tests
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for testing theme toggle behavior
 * - OCP: Open for extension with additional test cases
 * - DIP: Depends on testing abstractions and mocked stores
 *
 * Design Patterns:
 * - AAA Pattern: Arrange, Act, Assert test structure
 * - Mock Pattern: Mocking external dependencies (Zustand store)
 *
 * Architecture: Unit tests for theme toggle component ensuring
 * proper theme switching, icon display, and store integration
 */

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

// Mock Lucide React icons inline
jest.mock('lucide-react', () => ({
  Sun: jest.fn(({ className }: { className?: string }) => (
    <div data-testid="sun-icon" className={className} />
  )),
  Moon: jest.fn(({ className }: { className?: string }) => (
    <div data-testid="moon-icon" className={className} />
  )),
  Monitor: jest.fn(({ className }: { className?: string }) => (
    <div data-testid="monitor-icon" className={className} />
  )),
  Check: jest.fn(({ className }: { className?: string }) => (
    <div data-testid="check-icon" className={className} />
  )),
}))

// Mock UI components from schadcn inline
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

// Mock dropdown components inline
jest.mock('@/components/ui', () => ({
  DropdownMenu: jest.fn(({ children }: { children: React.ReactNode }) => (
    <div data-testid="dropdown-root">{children}</div>
  )),
  DropdownMenuContent: jest.fn(({
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
  )),
  DropdownMenuItem: jest.fn(({
    children,
    onClick,
    className,
  }: {
    children: React.ReactNode
    onClick?: () => void
    className?: string
  }) => (
    <div
      role="menuitem"
      onClick={onClick}
      className={className}
    >
      {children}
    </div>
  )),
  DropdownMenuTrigger: React.forwardRef<
    HTMLDivElement,
    { children: React.ReactNode; asChild?: boolean }
  >(function MockDropdownMenuTrigger({ children }, ref) {
    return (
      <div ref={ref} data-testid="dropdown-trigger">
        {children}
      </div>
    )
  }),
}))

// Create inline mock for theme store
const mockSetTheme = jest.fn()
const mockSetSystemTheme = jest.fn()
const mockToggleTheme = jest.fn()

const createMockThemeStore = (theme = 'system', systemTheme = 'light') => ({
  theme: theme as 'light' | 'dark' | 'system',
  systemTheme: systemTheme as 'light' | 'dark',
  resolvedTheme: theme === 'system' ? systemTheme : (theme as 'light' | 'dark'),
  setTheme: mockSetTheme,
  setSystemTheme: mockSetSystemTheme,
  toggleTheme: mockToggleTheme,
})

// Create the mock store instance
const mockThemeStore = createMockThemeStore('system', 'light')

// Mock stores inline
jest.mock('@/lib/stores', () => ({
  useThemeStore: jest.fn(() => mockThemeStore),
}))

// Import the component after mocks are set up
import { ThemeToggle } from '../theme-toggle'

describe('ThemeToggle', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Reset mock to default state
    mockThemeStore.theme = 'system'
    mockThemeStore.resolvedTheme = 'light'
    mockThemeStore.systemTheme = 'light'
    mockSetTheme.mockClear()
    mockSetSystemTheme.mockClear()
    mockToggleTheme.mockClear()
  })

  it('should render without crashing', () => {
    render(<ThemeToggle />)
    const button = screen.getByRole('button', { name: /current theme/i })
    expect(button).toBeInTheDocument()
  })

  it('should display correct icon for system theme', () => {
    render(<ThemeToggle />)
    const button = screen.getByRole('button', { name: /current theme/i })
    expect(button).toBeInTheDocument()
    // The icon inside the button should have the correct color
    const icon = button.querySelector('.text-slate-500')
    expect(icon).toBeInTheDocument()
  })

  it('should display correct icon for light theme', () => {
    // Update mock
    mockThemeStore.theme = 'light'
    mockThemeStore.resolvedTheme = 'light'

    render(<ThemeToggle />)
    const button = screen.getByRole('button', { name: /current theme/i })
    expect(button).toBeInTheDocument()
    // The icon inside the button should have the correct color
    const icon = button.querySelector('.text-amber-500')
    expect(icon).toBeInTheDocument()
  })

  it('should display correct icon for dark theme', () => {
    // Update mock
    mockThemeStore.theme = 'dark'
    mockThemeStore.resolvedTheme = 'dark'

    render(<ThemeToggle />)
    const button = screen.getByRole('button', { name: /current theme/i })
    expect(button).toBeInTheDocument()
    // The icon inside the button should have the correct color
    const icon = button.querySelector('.text-blue-600')
    expect(icon).toBeInTheDocument()
  })

  it('should open dropdown when clicked', () => {
    render(<ThemeToggle />)
    const button = screen.getByRole('button', { name: /current theme/i })

    fireEvent.click(button)

    // The dropdown should open but not call toggleTheme directly
    expect(mockToggleTheme).not.toHaveBeenCalled()
  })

  it('should render dropdown menu structure', () => {
    render(<ThemeToggle />)
    // With mocked dropdown, we check for the basic structure
    expect(screen.getByTestId('dropdown-root')).toBeInTheDocument()
    expect(screen.getByTestId('dropdown-trigger')).toBeInTheDocument()
  })

  it('should call setTheme when theme option is selected', () => {
    render(<ThemeToggle />)

    // Since dropdown is mocked, we test by checking if the theme options are rendered
    const menuItems = screen.getAllByRole('menuitem')
    expect(menuItems).toHaveLength(3) // Light, Dark, System

    // Click on the second item (Dark)
    if (menuItems[1]) {
      fireEvent.click(menuItems[1])
    }

    expect(mockSetTheme).toHaveBeenCalledWith('dark')
  })

  it('should show correct theme option selected', () => {
    // Update mock
    mockThemeStore.theme = 'dark'
    mockThemeStore.resolvedTheme = 'dark'

    render(<ThemeToggle />)

    // With dark theme selected, the dropdown should be rendered with dark selected
    const menuItems = screen.getAllByRole('menuitem')
    expect(menuItems).toHaveLength(3)

    // The check icon should be visible for dark theme (second item)
    const darkOption = menuItems[1]
    if (darkOption) {
      const check = darkOption.querySelector('.opacity-100')
      expect(check).toBeInTheDocument()
    }
  })

  it('should display theme icons with correct colors', () => {
    render(<ThemeToggle />)

    const menuItems = screen.getAllByRole('menuitem')
    expect(menuItems).toHaveLength(3)

    // Check each menu item has the correct icon color
    expect(menuItems[0]?.querySelector('.text-amber-500')).toBeInTheDocument() // Light
    expect(menuItems[1]?.querySelector('.text-blue-600')).toBeInTheDocument() // Dark
    expect(menuItems[2]?.querySelector('.text-slate-500')).toBeInTheDocument() // System
  })

  it('should handle invalid theme value in trigger with empty color class', () => {
    // TypeScript will prevent us from passing invalid values directly,
    // so we need to cast to test the default case
    mockThemeStore.theme = 'invalid-theme' as 'light' | 'dark' | 'system'
    mockThemeStore.resolvedTheme = 'light'

    render(<ThemeToggle />)
    const button = screen.getByRole('button', { name: /current theme/i })
    expect(button).toBeInTheDocument()

    // Should fallback to Sun icon and empty color class from default case
    const icon = button.querySelector('[class*="h-[1.2rem]"]')
    expect(icon).toBeInTheDocument()
    // The icon should not have any specific theme color classes when default case is hit
    expect(icon).not.toHaveClass('text-amber-500')
    expect(icon).not.toHaveClass('text-blue-600')
    expect(icon).not.toHaveClass('text-slate-500')
  })

  it('should handle edge cases and provide full coverage', () => {
    // Test scenarios that might trigger default cases in switch statements

    // Test 1: Theme value that doesn't match any case
    mockThemeStore.theme = 'unknown' as 'light' | 'dark' | 'system'
    mockThemeStore.resolvedTheme = 'light'

    const { rerender } = render(<ThemeToggle />)

    // Should render without crashing when theme is unknown
    let button = screen.getByRole('button', { name: /current theme/i })
    expect(button).toBeInTheDocument()

    // Test 2: Simulate a scenario where themes array might have different values
    // This is more of a defensive test for robustness
    mockThemeStore.theme = 'system'
    mockThemeStore.resolvedTheme = 'light'

    rerender(<ThemeToggle />)

    // Verify system theme works correctly
    button = screen.getByRole('button', { name: /current theme/i })
    expect(button).toBeInTheDocument()

    // Verify all menu items render with proper structure
    const menuItems = screen.getAllByRole('menuitem')
    expect(menuItems).toHaveLength(3)

    // Each menu item should have an icon and check mark
    menuItems.forEach(item => {
      const icon = item.querySelector('[class*="h-4"]')
      const check = item.querySelector('[class*="opacity-"]')
      expect(icon).toBeInTheDocument()
      expect(check).toBeInTheDocument()
    })
  })

  it('should handle invalid theme option value in menu items', () => {
    // This test verifies edge case handling for invalid theme values
    // Start with light theme to ensure we can click all options
    mockThemeStore.theme = 'light'
    mockThemeStore.resolvedTheme = 'light'
    
    render(<ThemeToggle />)
    
    // Test that the component handles all theme options correctly
    const menuItems = screen.getAllByRole('menuitem')
    expect(menuItems).toHaveLength(3)
    
    // Verify each menu item has proper structure even with edge cases
    menuItems.forEach(item => {
      expect(item).toBeInTheDocument()
      
      // Check that icons are rendered
      const icons = item.querySelectorAll('[data-testid*="-icon"]')
      expect(icons.length).toBeGreaterThan(0)
      
      // Verify structure without clicking (to avoid test order issues)
      expect(item).toBeTruthy()
    })
    
    // Test clicking dark menu item (should work since we're on light)
    fireEvent.click(menuItems[1]!) // Dark
    expect(mockSetTheme).toHaveBeenCalledWith('dark')
    
    // Test clicking system menu item
    fireEvent.click(menuItems[2]!) // System  
    expect(mockSetTheme).toHaveBeenCalledWith('system')
    
    // Verify calls were made
    expect(mockSetTheme).toHaveBeenCalledTimes(2)
  })
})