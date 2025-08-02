'use client'

import { useEffect } from 'react'
import { useThemeStore } from '@/lib/stores'

export function ThemeInitializer() {
  const { setSystemTheme, setTheme } = useThemeStore()

  useEffect(() => {
    // Initialize system theme
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const systemTheme = mediaQuery.matches ? 'dark' : 'light'
    setSystemTheme(systemTheme)

    // Apply initial theme
    try {
      const savedTheme = localStorage.getItem('theme-storage')
      if (savedTheme) {
        try {
          const parsed = JSON.parse(savedTheme)
          if (parsed.state?.theme) {
            setTheme(parsed.state.theme)
          }
        } catch {
          // If parsing fails, apply system theme
          setTheme('system')
        }
      } else {
        // No saved theme, apply system theme
        setTheme('system')
      }
    } catch {
      // If localStorage access fails, apply system theme
      setTheme('system')
    }

    // Listen for system theme changes
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [setSystemTheme, setTheme])

  return null
}
