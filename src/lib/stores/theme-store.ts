/**
 * Theme Store
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for theme state management
 * - OCP: Open for extension with new theme features
 * - DIP: Depends on Zustand abstractions
 *
 * Design Patterns:
 * - State Management Pattern: Centralized theme state
 * - Observer Pattern: Components subscribe to theme changes
 *
 * Architecture: Global theme state management using Zustand
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark' | 'system'

interface ThemeStore {
  theme: Theme
  actualTheme: 'light' | 'dark'
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  initializeTheme: () => () => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: 'system',
      actualTheme: 'light',

      setTheme: (theme: Theme) => {
        set({ theme })

        const root = document.documentElement
        const actualTheme =
          theme === 'system'
            ? window.matchMedia('(prefers-color-scheme: dark)').matches
              ? 'dark'
              : 'light'
            : theme

        set({ actualTheme })

        if (actualTheme === 'dark') {
          root.classList.add('dark')
        } else {
          root.classList.remove('dark')
        }
      },

      toggleTheme: () => {
        const { theme } = get()
        let nextTheme: Theme

        switch (theme) {
          case 'light':
            nextTheme = 'dark'
            break
          case 'dark':
            nextTheme = 'system'
            break
          case 'system':
            nextTheme = 'light'
            break
          default:
            nextTheme = 'system'
        }

        get().setTheme(nextTheme)
      },

      initializeTheme: () => {
        const { theme, setTheme } = get()

        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const handleChange = () => {
          if (theme === 'system') {
            setTheme('system') // This will re-trigger the theme calculation
          }
        }

        mediaQuery.addEventListener('change', handleChange)

        // Set initial theme
        setTheme(theme)

        return () => mediaQuery.removeEventListener('change', handleChange)
      },
    }),
    {
      name: 'theme-storage',
      partialize: state => ({ theme: state.theme }), // Only persist the theme preference
    }
  )
)
