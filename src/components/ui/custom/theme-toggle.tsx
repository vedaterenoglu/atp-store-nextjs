/**
 * ThemeToggle - Dropdown menu for theme selection with dynamic icons
 *
 * Features:
 * - Displays current theme icon (sun/moon/monitor)
 * - Dropdown with light/dark/system options
 * - Shows check mark on selected theme
 * - Smooth icon transitions
 *
 * Props: None (uses theme store)
 * State: Manages mounted state for hydration safety
 */
'use client'

import { Moon, Sun, Monitor, Check } from 'lucide-react'
import { useThemeStore } from '@/lib/stores'
import { Button } from '@/components/ui'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui'
import { useEffect, useState } from 'react'

interface ThemeOption {
  value: 'light' | 'dark' | 'system'
  icon: typeof Sun
  label: string
}

const themes: ThemeOption[] = [
  { value: 'light', icon: Sun, label: 'Light' },
  { value: 'dark', icon: Moon, label: 'Dark' },
  { value: 'system', icon: Monitor, label: 'System' },
]

export function ThemeToggle() {
  return (
    <ThemeToggleContainer>
      <ThemeToggleDropdown />
    </ThemeToggleContainer>
  )
}

function ThemeToggleContainer({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <ThemeToggleSkeleton />
  }

  return <>{children}</>
}

function ThemeToggleSkeleton() {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="w-9 h-9"
      disabled
      aria-label="Loading theme selector"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] text-amber-500" />
    </Button>
  )
}

function ThemeToggleDropdown() {
  const { theme, setTheme } = useThemeStore()

  return (
    <DropdownMenu>
      <ThemeToggleTrigger theme={theme} />
      <ThemeToggleContent theme={theme} onThemeChange={setTheme} />
    </DropdownMenu>
  )
}

function ThemeToggleTrigger({ theme }: { theme: 'light' | 'dark' | 'system' }) {
  const currentTheme = themes.find(t => t.value === theme)
  const Icon = currentTheme?.icon || Sun

  const getIconColor = () => {
    switch (theme) {
      case 'light':
        return 'text-amber-500'
      case 'dark':
        return 'text-blue-600'
      case 'system':
        return 'text-slate-500'
      default:
        return ''
    }
  }

  return (
    <DropdownMenuTrigger asChild>
      <Button
        variant="ghost"
        size="icon"
        className="w-9 h-9"
        aria-label={`Current theme: ${currentTheme?.label || theme}`}
      >
        <Icon className={`h-[1.2rem] w-[1.2rem] ${getIconColor()}`} />
      </Button>
    </DropdownMenuTrigger>
  )
}

function ThemeToggleContent({
  theme,
  onThemeChange,
}: {
  theme: 'light' | 'dark' | 'system'
  onThemeChange: (theme: 'light' | 'dark' | 'system') => void
}) {
  return (
    <DropdownMenuContent align="end" className="min-w-[120px]">
      {themes.map(themeOption => (
        <ThemeMenuItem
          key={themeOption.value}
          option={themeOption}
          isSelected={theme === themeOption.value}
          onSelect={onThemeChange}
        />
      ))}
    </DropdownMenuContent>
  )
}

function ThemeMenuItem({
  option,
  isSelected,
  onSelect,
}: {
  option: ThemeOption
  isSelected: boolean
  onSelect: (theme: 'light' | 'dark' | 'system') => void
}) {
  const handleClick = () => {
    if (!isSelected) {
      onSelect(option.value)
    }
  }

  return (
    <DropdownMenuItem onClick={handleClick} className="cursor-pointer">
      <ThemeMenuItemContent option={option} isSelected={isSelected} />
    </DropdownMenuItem>
  )
}

function ThemeMenuItemContent({
  option,
  isSelected,
}: {
  option: ThemeOption
  isSelected: boolean
}) {
  const Icon = option.icon

  const getIconColor = () => {
    switch (option.value) {
      case 'light':
        return 'text-amber-500'
      case 'dark':
        return 'text-blue-600'
      case 'system':
        return 'text-slate-500'
      default:
        return ''
    }
  }

  return (
    <>
      <Icon className={`h-4 w-4 mr-3 ${getIconColor()}`} />
      <Check
        className={`h-4 w-4 ml-auto ${
          isSelected ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      />
    </>
  )
}

// Export for testing
export { ThemeMenuItemContent }
