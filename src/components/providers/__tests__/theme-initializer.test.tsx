/**
 * Unit tests for ThemeInitializer Component
 *
 * SOLID Principles Applied:
 * - SRP: Tests focus solely on theme initializer behavior
 * - DIP: Tests depend on mocked abstractions
 *
 * Design Patterns:
 * - AAA Pattern: Arrange, Act, Assert test structure
 * - Mock Pattern: All external dependencies mocked
 */

import React from 'react'
import { render } from '@/__tests__/utils/test-utils'
import { ThemeInitializer } from '../theme-initializer'

// Mock theme store
const mockSetSystemTheme = jest.fn()
const mockSetTheme = jest.fn()

jest.mock('@/lib/stores', () => ({
  useThemeStore: jest.fn(() => ({
    setSystemTheme: mockSetSystemTheme,
    setTheme: mockSetTheme,
  })),
}))

describe('ThemeInitializer', () => {
  // Mock matchMedia
  const mockMatchMedia = jest.fn()
  const mockAddEventListener = jest.fn()
  const mockRemoveEventListener = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()

    mockMatchMedia.mockReturnValue({
      matches: false,
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
    })

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: mockMatchMedia,
    })

    // Mock localStorage
    Storage.prototype.getItem = jest.fn()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should render null', () => {
    const { container } = render(<ThemeInitializer />)
    expect(container.firstChild).toBeNull()
  })

  it('should detect light system theme', () => {
    mockMatchMedia.mockReturnValue({
      matches: false, // Light theme
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
    })

    render(<ThemeInitializer />)

    expect(mockSetSystemTheme).toHaveBeenCalledWith('light')
  })

  it('should detect dark system theme', () => {
    mockMatchMedia.mockReturnValue({
      matches: true, // Dark theme
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
    })

    render(<ThemeInitializer />)

    expect(mockSetSystemTheme).toHaveBeenCalledWith('dark')
  })

  it('should apply saved theme from localStorage', () => {
    const savedTheme = { state: { theme: 'dark' } }
    ;(Storage.prototype.getItem as jest.Mock).mockReturnValue(
      JSON.stringify(savedTheme)
    )

    render(<ThemeInitializer />)

    expect(mockSetTheme).toHaveBeenCalledWith('dark')
  })

  it('should handle invalid JSON in localStorage', () => {
    ;(Storage.prototype.getItem as jest.Mock).mockReturnValue('invalid json')

    render(<ThemeInitializer />)

    // Should fallback to system theme
    expect(mockSetTheme).toHaveBeenCalledWith('system')
  })

  it('should handle missing theme in localStorage data', () => {
    const savedData = { state: {} }
    ;(Storage.prototype.getItem as jest.Mock).mockReturnValue(
      JSON.stringify(savedData)
    )

    render(<ThemeInitializer />)

    // Should not call setTheme since theme is missing
    expect(mockSetTheme).not.toHaveBeenCalled()
  })

  it('should handle null state in localStorage', () => {
    const savedData = { state: null }
    ;(Storage.prototype.getItem as jest.Mock).mockReturnValue(
      JSON.stringify(savedData)
    )

    render(<ThemeInitializer />)

    // Should not call setTheme
    expect(mockSetTheme).not.toHaveBeenCalled()
  })

  it('should apply system theme when no saved theme exists', () => {
    ;(Storage.prototype.getItem as jest.Mock).mockReturnValue(null)

    render(<ThemeInitializer />)

    expect(mockSetTheme).toHaveBeenCalledWith('system')
  })

  it('should listen for system theme changes', () => {
    render(<ThemeInitializer />)

    expect(mockAddEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function)
    )
  })

  it('should handle system theme change to dark', () => {
    render(<ThemeInitializer />)

    // Get the change handler
    const changeHandler = mockAddEventListener.mock.calls[0][1]

    // Simulate system theme change to dark
    changeHandler({ matches: true })

    expect(mockSetSystemTheme).toHaveBeenCalledWith('dark')
  })

  it('should handle system theme change to light', () => {
    render(<ThemeInitializer />)

    // Get the change handler
    const changeHandler = mockAddEventListener.mock.calls[0][1]

    // Simulate system theme change to light
    changeHandler({ matches: false })

    expect(mockSetSystemTheme).toHaveBeenCalledWith('light')
  })

  it('should cleanup event listener on unmount', () => {
    const { unmount } = render(<ThemeInitializer />)

    const changeHandler = mockAddEventListener.mock.calls[0][1]

    unmount()

    expect(mockRemoveEventListener).toHaveBeenCalledWith(
      'change',
      changeHandler
    )
  })

  it('should handle localStorage errors gracefully', () => {
    // Spy on console.error to suppress error output in tests
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

    ;(Storage.prototype.getItem as jest.Mock).mockImplementation(() => {
      throw new Error('localStorage error')
    })

    render(<ThemeInitializer />)

    // Should fallback to system theme
    expect(mockSetTheme).toHaveBeenCalledWith('system')
    expect(mockSetSystemTheme).toHaveBeenCalled()

    consoleErrorSpy.mockRestore()
  })

  it('should handle missing matchMedia gracefully', () => {
    const originalMatchMedia = window.matchMedia
    // @ts-expect-error - Testing edge case
    delete window.matchMedia

    // Should not throw
    expect(() => {
      render(<ThemeInitializer />)
    }).not.toThrow()

    // Restore matchMedia
    window.matchMedia = originalMatchMedia
  })

  it('should call setTheme only once per render', () => {
    ;(Storage.prototype.getItem as jest.Mock).mockReturnValue(
      JSON.stringify({ state: { theme: 'dark' } })
    )

    const { rerender } = render(<ThemeInitializer />)

    expect(mockSetTheme).toHaveBeenCalledTimes(1)

    // Rerender should not call setTheme again
    rerender(<ThemeInitializer />)

    expect(mockSetTheme).toHaveBeenCalledTimes(1)
  })

  it('should handle different theme values from localStorage', () => {
    const themes = ['light', 'dark', 'system']

    themes.forEach(theme => {
      jest.clearAllMocks()
      ;(Storage.prototype.getItem as jest.Mock).mockReturnValue(
        JSON.stringify({ state: { theme } })
      )

      render(<ThemeInitializer />)

      expect(mockSetTheme).toHaveBeenCalledWith(theme)
    })
  })

  it('should handle empty localStorage response', () => {
    ;(Storage.prototype.getItem as jest.Mock).mockReturnValue('')

    render(<ThemeInitializer />)

    // Should fallback to system theme
    expect(mockSetTheme).toHaveBeenCalledWith('system')
  })

  it('should initialize with correct call order', () => {
    ;(Storage.prototype.getItem as jest.Mock).mockReturnValue(
      JSON.stringify({ state: { theme: 'dark' } })
    )

    render(<ThemeInitializer />)

    // Should call setSystemTheme before setTheme
    const setSystemThemeCallOrder =
      mockSetSystemTheme.mock.invocationCallOrder[0]
    const setThemeCallOrder = mockSetTheme.mock.invocationCallOrder[0]

    expect(setSystemThemeCallOrder).toBeLessThan(setThemeCallOrder!)
  })
})
