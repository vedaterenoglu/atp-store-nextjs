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
import { Button } from '@/components/ui/schadcn/button'
import { useSafeTranslation } from '@/hooks/use-safe-translation'
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

// Static labels for aria-label (tests don't have i18n)
const staticLabels = {
  light: 'Light',
  dark: 'Dark',
  system: 'System',
}

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
  const { t } = useSafeTranslation('common')

  const themes: ThemeOption[] = [
    { value: 'light', icon: Sun, label: t('theme.light') },
    { value: 'dark', icon: Moon, label: t('theme.dark') },
    { value: 'system', icon: Monitor, label: t('theme.system') },
  ]

  return (
    <DropdownMenu>
      <ThemeToggleTrigger theme={theme} themes={themes} />
      <ThemeToggleContent
        theme={theme}
        themes={themes}
        onThemeChange={setTheme}
      />
    </DropdownMenu>
  )
}

function ThemeToggleTrigger({
  theme,
  themes,
}: {
  theme: 'light' | 'dark' | 'system'
  themes: ThemeOption[]
}) {
  const currentTheme = themes.find(th => th.value === theme)
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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Remove focus after click to hide tooltip
    setTimeout(() => {
      ;(e.currentTarget as HTMLButtonElement).blur()
    }, 100)
  }

  return (
    <DropdownMenuTrigger asChild>
      <Button
        variant="ghost"
        size="icon"
        className="w-9 h-9 focus:outline-none focus:ring-0"
        aria-label={`Current theme: ${staticLabels[theme] || theme}`}
        onClick={handleClick}
        onMouseDown={e => e.preventDefault()}
      >
        <Icon className={`h-[1.2rem] w-[1.2rem] ${getIconColor()}`} />
      </Button>
    </DropdownMenuTrigger>
  )
}

function ThemeToggleContent({
  theme,
  themes,
  onThemeChange,
}: {
  theme: 'light' | 'dark' | 'system'
  themes: ThemeOption[]
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
      // Blur any focused element to close tooltip
      setTimeout(() => {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur()
        }
      }, 50)
    }
  }

  return (
    <DropdownMenuItem onClick={handleClick}>
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
