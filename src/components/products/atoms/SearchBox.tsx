/**
 * SearchBox Atom Component
 * SOLID Principles: Single Responsibility - Handle search input
 * Design Patterns: Controlled Component Pattern
 * Dependencies: shadcn/ui Input, lucide-react icons
 */

'use client'

import { Input } from '@/components/ui/schadcn'
import { Search } from 'lucide-react'
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
  return (
    <div className={cn('relative w-full', className)}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <Input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-lg border border-gray-800 bg-gray-900/50 pl-10 text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      />
    </div>
  )
}
