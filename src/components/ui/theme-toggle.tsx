'use client'

import { Moon, Sun } from 'lucide-react'
import { useThemeStore } from '@/lib/stores/theme.store'
import { Button } from '@/components/ui/schadcn/button'

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
