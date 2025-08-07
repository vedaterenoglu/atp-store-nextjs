/**
 * LanguageToggle - Dropdown menu for language selection with flag emojis
 *
 * Features:
 * - Displays current language flag (🇬🇧/🇸🇪/🇹🇷)
 * - Dropdown with English/Swedish/Turkish options
 * - Shows check mark on selected language
 * - Persists selection via Zustand store
 *
 * Props: None (uses language store)
 * State: Manages mounted state for hydration safety
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
      className="w-9 h-9 cursor-pointer"
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
        className="w-9 h-9 cursor-pointer"
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
    <DropdownMenuContent
      align="end"
      className="!w-[80px] min-w-0 bg-popover border-border"
    >
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
      <span className="text-xl mr-2">{option.flag}</span>
      <Check
        className={`h-4 w-4 ${isSelected ? 'opacity-100' : 'opacity-0'}`}
        aria-hidden="true"
      />
    </>
  )
}
