/**
 * Theme Toggle Button Component
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for theme toggling UI
 * - OCP: Open for extension with additional theme options
 * - DIP: Depends on abstractions (Zustand store)
 *
 * Design Patterns:
 * - Command Pattern: Theme change actions encapsulated
 * - Observer Pattern: Reacts to theme state changes
 * - State Pattern: Handles different theme states (light/dark/system)
 *
 * Architecture: Button component for theme switching integrated with
 * Zustand theme store, supporting light/dark modes with smooth transitions
 */
'use client'

import { Moon, Sun } from 'lucide-react'
import { useThemeStore } from '@/lib/stores'
import { Button } from '@/components/ui'

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useThemeStore()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        if (theme === 'system') {
          setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
        } else {
          setTheme(theme === 'light' ? 'dark' : 'light')
        }
      }}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
