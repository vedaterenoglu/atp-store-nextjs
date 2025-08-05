/**
 * Theme state management with system theme detection and persistence
 *
 * Responsibilities:
 * - Manages user theme preference (light/dark/system)
 * - Tracks resolved theme based on system preference
 * - Persists theme choice across sessions
 * - Provides reactive theme updates
 *
 * Architecture:
 * - SOLID Principles: SRP (theme state only), ISP (focused interface)
 * - Patterns: Observer (reactive updates), Strategy (theme resolution)
 *
 * Dependencies: Zustand state management, localStorage persistence
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Theme = 'light' | 'dark' | 'system'

interface ThemeState {
  theme: Theme
  resolvedTheme: 'light' | 'dark'
  systemTheme: 'light' | 'dark'
  setTheme: (theme: Theme) => void
  setSystemTheme: (systemTheme: 'light' | 'dark') => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'system',
      resolvedTheme: 'light',
      systemTheme: 'light',

      setTheme: (theme: Theme) => {
        set(state => ({
          theme,
          resolvedTheme: theme === 'system' ? state.systemTheme : theme,
        }))

        // Apply theme to document
        const { resolvedTheme } = get()
        applyTheme(resolvedTheme)
      },

      setSystemTheme: (systemTheme: 'light' | 'dark') => {
        set(state => ({
          systemTheme,
          resolvedTheme:
            state.theme === 'system' ? systemTheme : state.resolvedTheme,
        }))

        // Apply theme if currently using system
        const { theme, resolvedTheme } = get()
        if (theme === 'system') {
          applyTheme(resolvedTheme)
        }
      },
    }),
    {
      name: 'theme-storage',
      partialize: state => ({ theme: state.theme }),
    }
  )
)

// Helper function to apply theme to document
function applyTheme(theme: 'light' | 'dark') {
  const root = document.documentElement

  if (theme === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}
