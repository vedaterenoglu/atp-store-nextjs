/**
 * Language Toggle Dropdown Component
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for language selection UI
 * - OCP: Open for extension with additional language options
 * - DIP: Depends on abstractions (Zustand store, i18next)
 *
 * Design Patterns:
 * - Command Pattern: Language change actions encapsulated
 * - Observer Pattern: Reacts to language state changes
 * - Composite Pattern: Composed of shadcn/ui components
 *
 * Architecture: Dropdown component for language selection integrated with
 * i18next and Zustand language store, supporting English, Swedish, and Turkish
 */
'use client'

import { Languages, Check } from 'lucide-react'
import { Button } from '@/components/ui'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui'
import { useLanguageStore, type SupportedLanguage } from '@/lib/stores'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

interface LanguageOption {
  value: SupportedLanguage
  label: string
  nativeLabel: string
}

const languages: LanguageOption[] = [
  { value: 'en', label: 'English', nativeLabel: 'English' },
  { value: 'sv', label: 'Swedish', nativeLabel: 'Svenska' },
  { value: 'tr', label: 'Turkish', nativeLabel: 'Türkçe' },
]

export function LanguageToggle() {
  const { t, i18n } = useTranslation('common')
  const { language, setLanguage, isLoading } = useLanguageStore()

  // Sync i18n with store on mount
  useEffect(() => {
    if (i18n.language !== language) {
      i18n.changeLanguage(language)
    }
  }, [i18n, language])

  const handleLanguageChange = async (newLanguage: SupportedLanguage) => {
    if (newLanguage !== language && !isLoading) {
      try {
        await setLanguage(newLanguage)
      } catch (error) {
        console.error('Failed to change language:', error)
      }
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="w-9 h-9"
          disabled={isLoading}
        >
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">{t('language.selectLanguage')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map(lang => (
          <DropdownMenuItem
            key={lang.value}
            onClick={() => handleLanguageChange(lang.value)}
            className="cursor-pointer"
          >
            <Check
              className={`mr-2 h-4 w-4 ${
                language === lang.value ? 'opacity-100' : 'opacity-0'
              }`}
            />
            <span className="mr-2">{lang.nativeLabel}</span>
            <span className="text-muted-foreground text-xs">
              ({t(`language.${lang.value}`)})
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
