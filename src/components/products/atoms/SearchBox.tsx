/**
 * SearchBox Atom Component
 * SOLID Principles: Single Responsibility - Handle search input
 * Design Patterns: Controlled Component Pattern
 * Dependencies: shadcn/ui Input, Button, lucide-react icons
 */

'use client'

import { Input, Button } from '@/components/ui/schadcn'
import { Search, X } from 'lucide-react'
import { cn } from '@/components/ui/utils'

interface SearchBoxProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function SearchBox({
  value,
  onChange,
  placeholder = 'Search products...',
  className,
}: SearchBoxProps) {
  const handleClear = () => {
    onChange('')
  }

  return (
    <div className={cn('relative w-full', className)}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
      <Input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn('h-12 w-full pl-10', value && 'pr-10')}
      />
      {value && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleClear}
          className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 p-0 hover:bg-transparent"
          aria-label="Clear search"
        >
          <X className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
        </Button>
      )}
    </div>
  )
}
