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
import { renderWithProviders, screen, fireEvent } from '@/__tests__/utils'
import { ThemeToggle } from '../theme-toggle'
import { createThemeStoreMock } from '@/__tests__/mocks/store-mocks'
import { createMockIconComponent } from '@/__tests__/mocks/component-mocks'

// Create centralized mock
const mockThemeStore = createThemeStoreMock('system', 'light')

// Mock the theme store with centralized mock
jest.mock('@/lib/stores', () => ({
  useThemeStore: jest.fn(() => mockThemeStore),
}))

describe('ThemeToggle', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Reset mock to default state
    mockThemeStore.theme = 'system'
    mockThemeStore.resolvedTheme = 'light'
    mockThemeStore.systemTheme = 'light'
    mockThemeStore.setTheme.mockClear()
    mockThemeStore.setSystemTheme.mockClear()
    if (mockThemeStore.toggleTheme) {
      mockThemeStore.toggleTheme.mockClear()
    }
  })

  it('should render without crashing', () => {
    renderWithProviders(<ThemeToggle />)
    const button = screen.getByRole('button', { name: /current theme/i })
    expect(button).toBeInTheDocument()
  })

  it('should display correct icon for system theme', () => {
    renderWithProviders(<ThemeToggle />)
    const button = screen.getByRole('button', { name: /current theme/i })
    expect(button).toBeInTheDocument()
    // The icon inside the button should have the correct color
    const icon = button.querySelector('.text-slate-500')
    expect(icon).toBeInTheDocument()
  })

  it('should display correct icon for light theme', () => {
    // Update centralized mock
    mockThemeStore.theme = 'light'
    mockThemeStore.resolvedTheme = 'light'

    renderWithProviders(<ThemeToggle />)
    const button = screen.getByRole('button', { name: /current theme/i })
    expect(button).toBeInTheDocument()
    // The icon inside the button should have the correct color
    const icon = button.querySelector('.text-amber-500')
    expect(icon).toBeInTheDocument()
  })

  it('should display correct icon for dark theme', () => {
    // Update centralized mock
    mockThemeStore.theme = 'dark'
    mockThemeStore.resolvedTheme = 'dark'

    renderWithProviders(<ThemeToggle />)
    const button = screen.getByRole('button', { name: /current theme/i })
    expect(button).toBeInTheDocument()
    // The icon inside the button should have the correct color
    const icon = button.querySelector('.text-blue-600')
    expect(icon).toBeInTheDocument()
  })

  it('should open dropdown when clicked', () => {
    renderWithProviders(<ThemeToggle />)
    const button = screen.getByRole('button', { name: /current theme/i })

    fireEvent.click(button)

    // The dropdown should open but not call toggleTheme directly
    expect(mockThemeStore.toggleTheme).not.toHaveBeenCalled()
  })

  it('should render dropdown menu structure', () => {
    renderWithProviders(<ThemeToggle />)
    // With mocked dropdown, we check for the basic structure
    expect(screen.getByTestId('dropdown-root')).toBeInTheDocument()
    expect(screen.getByTestId('dropdown-trigger')).toBeInTheDocument()
  })

  it('should call setTheme when theme option is selected', () => {
    renderWithProviders(<ThemeToggle />)

    // Since dropdown is mocked, we test by checking if the theme options are rendered
    const menuItems = screen.getAllByRole('menuitem')
    expect(menuItems).toHaveLength(3) // Light, Dark, System

    // Click on the second item (Dark)
    if (menuItems[1]) {
      fireEvent.click(menuItems[1])
    }

    expect(mockThemeStore.setTheme).toHaveBeenCalledWith('dark')
  })

  it('should show correct theme option selected', () => {
    // Update centralized mock
    mockThemeStore.theme = 'dark'
    mockThemeStore.resolvedTheme = 'dark'

    renderWithProviders(<ThemeToggle />)

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
    renderWithProviders(<ThemeToggle />)

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

    renderWithProviders(<ThemeToggle />)
    const button = screen.getByRole('button', { name: /current theme/i })
    expect(button).toBeInTheDocument()

    // Should fallback to Sun icon and empty color class from default case (line 104)
    const icon = button.querySelector('[class*="h-[1.2rem]"]')
    expect(icon).toBeInTheDocument()
    // The icon should not have any specific theme color classes when default case is hit
    expect(icon).not.toHaveClass('text-amber-500')
    expect(icon).not.toHaveClass('text-blue-600')
    expect(icon).not.toHaveClass('text-slate-500')
  })

  it('should handle edge cases and provide full coverage', () => {
    // Test scenarios that might trigger default cases in switch statements

    // Test 1: Theme value that doesn't match any case (covers line 104)
    mockThemeStore.theme = 'unknown' as 'light' | 'dark' | 'system'
    mockThemeStore.resolvedTheme = 'light'

    const { rerender } = renderWithProviders(<ThemeToggle />)

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

  it('should handle invalid theme option value in menu items to cover line 183', () => {
    // Use centralized mock for theme toggle module
    const themeToggleModule = jest.requireActual('../theme-toggle') as {
      ThemeMenuItemContent: React.ComponentType<{
        option: {
          value: 'light' | 'dark' | 'system'
          icon: React.ComponentType
          label: string
        }
        isSelected: boolean
      }>
    }
    const { ThemeMenuItemContent } = themeToggleModule

    // Use centralized mock icon component
    const MockIcon = createMockIconComponent('test-icon')

    // Create an invalid theme option to trigger the default case in getIconColor (line 183)
    const invalidOption = {
      value: 'invalid-theme-value' as 'light' | 'dark' | 'system',
      icon: MockIcon,
      label: 'Invalid',
    }

    // This should trigger the default case in getIconColor function (line 183)
    const { container } = renderWithProviders(
      <ThemeMenuItemContent option={invalidOption} isSelected={false} />
    )

    expect(container).toBeInTheDocument()

    // Verify the icon is rendered without any theme-specific color class
    const icon = container.querySelector('[data-testid="test-icon"]')
    expect(icon).toBeInTheDocument()

    // The component should render without crashing with invalid theme value
    // This exercises the default case in getIconColor function (line 183)
    expect(container.firstChild).toBeInTheDocument()
  })
})
