/**
 * Language Toggle Dropdown Component
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for language selection UI with flag display
 * - OCP: Open for extension with additional language/flag options
 * - DIP: Depends on abstractions (Zustand store interface)
 * - ISP: Minimal interface with only required language functionality
 *
 * Design Patterns:
 * - Command Pattern: Language change actions encapsulated
 * - Observer Pattern: Reacts to language state changes via Zustand
 * - Composite Pattern: Composed of atomic UI components
 * - Strategy Pattern: Flag display strategy based on selected language
 *
 * Architecture: Flag-based language selector with dropdown menu
 * displaying British, Swedish, and Turkish flags for language selection
 */
'use client'

import { Check } from 'lucide-react'
import { Button } from '@/components/ui'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui'
import { useLanguageStore, type SupportedLanguage } from '@/lib/stores'
import { useEffect, useState } from 'react'

interface LanguageOption {
  value: SupportedLanguage
  flag: string
  label: string
}

const languages: LanguageOption[] = [
  { value: 'en', flag: '🇬🇧', label: 'English' },
  { value: 'sv', flag: '🇸🇪', label: 'Svenska' },
  { value: 'tr', flag: '🇹🇷', label: 'Türkçe' },
]

export function LanguageToggle() {
  return (
    <LanguageToggleContainer>
      <LanguageToggleDropdown />
    </LanguageToggleContainer>
  )
}

function LanguageToggleContainer({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <LanguageToggleSkeleton />
  }

  return <>{children}</>
}

function LanguageToggleSkeleton() {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="w-9 h-9"
      disabled
      aria-label="Loading language selector"
    >
      <span className="text-xl">🌐</span>
    </Button>
  )
}

function LanguageToggleDropdown() {
  const { language, setLanguage, isLoading } = useLanguageStore()

  return (
    <DropdownMenu>
      <LanguageToggleTrigger language={language} isLoading={isLoading} />
      <LanguageToggleContent
        language={language}
        onLanguageChange={setLanguage}
        isLoading={isLoading}
      />
    </DropdownMenu>
  )
}

function LanguageToggleTrigger({
  language,
  isLoading,
}: {
  language: SupportedLanguage
  isLoading: boolean
}) {
  const currentLanguage = languages.find(lang => lang.value === language)

  return (
    <DropdownMenuTrigger asChild>
      <Button
        variant="ghost"
        size="icon"
        className="w-9 h-9"
        disabled={isLoading}
        aria-label={`Current language: ${currentLanguage?.label || language}`}
      >
        <span className="text-xl">{currentLanguage?.flag || '🌐'}</span>
      </Button>
    </DropdownMenuTrigger>
  )
}

function LanguageToggleContent({
  language,
  onLanguageChange,
  isLoading,
}: {
  language: SupportedLanguage
  onLanguageChange: (language: SupportedLanguage) => Promise<void>
  isLoading: boolean
}) {
  return (
    <DropdownMenuContent align="end" className="min-w-[120px]">
      {languages.map(lang => (
        <LanguageMenuItem
          key={lang.value}
          option={lang}
          isSelected={language === lang.value}
          onSelect={onLanguageChange}
          isLoading={isLoading}
        />
      ))}
    </DropdownMenuContent>
  )
}

function LanguageMenuItem({
  option,
  isSelected,
  onSelect,
  isLoading,
}: {
  option: LanguageOption
  isSelected: boolean
  onSelect: (language: SupportedLanguage) => Promise<void>
  isLoading: boolean
}) {
  const handleClick = async () => {
    if (!isSelected && !isLoading) {
      await onSelect(option.value)
    }
  }

  return (
    <DropdownMenuItem
      onClick={handleClick}
      className="cursor-pointer"
      disabled={isLoading}
    >
      <LanguageMenuItemContent option={option} isSelected={isSelected} />
    </DropdownMenuItem>
  )
}

function LanguageMenuItemContent({
  option,
  isSelected,
}: {
  option: LanguageOption
  isSelected: boolean
}) {
  return (
    <>
      <span className="text-xl mr-3">{option.flag}</span>
      <Check
        className={`h-4 w-4 ml-auto ${
          isSelected ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      />
    </>
  )
}
