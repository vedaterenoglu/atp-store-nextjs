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

import { render, screen, fireEvent } from '@/__tests__/utils/test-utils'
import { ThemeToggle } from './theme-toggle'
import { useThemeStore } from '@/lib/stores'

// Mock the theme store
jest.mock('@/lib/stores', () => ({
  useThemeStore: jest.fn(),
}))

describe('ThemeToggle', () => {
  const mockToggleTheme = jest.fn()
  const mockSetTheme = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useThemeStore as unknown as jest.Mock).mockReturnValue({
      theme: 'system',
      resolvedTheme: 'light',
      systemTheme: 'light',
      toggleTheme: mockToggleTheme,
      setTheme: mockSetTheme,
    })
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
    ;(useThemeStore as unknown as jest.Mock).mockReturnValue({
      theme: 'light',
      resolvedTheme: 'light',
      systemTheme: 'light',
      toggleTheme: mockToggleTheme,
      setTheme: mockSetTheme,
    })

    render(<ThemeToggle />)
    const button = screen.getByRole('button', { name: /current theme/i })
    expect(button).toBeInTheDocument()
    // The icon inside the button should have the correct color
    const icon = button.querySelector('.text-amber-500')
    expect(icon).toBeInTheDocument()
  })

  it('should display correct icon for dark theme', () => {
    ;(useThemeStore as unknown as jest.Mock).mockReturnValue({
      theme: 'dark',
      resolvedTheme: 'dark',
      systemTheme: 'light',
      toggleTheme: mockToggleTheme,
      setTheme: mockSetTheme,
    })

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
    ;(useThemeStore as unknown as jest.Mock).mockReturnValue({
      theme: 'dark',
      resolvedTheme: 'dark',
      systemTheme: 'light',
      toggleTheme: mockToggleTheme,
      setTheme: mockSetTheme,
    })

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
})
