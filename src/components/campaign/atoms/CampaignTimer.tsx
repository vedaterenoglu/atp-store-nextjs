/**
 * CampaignTimer - Displays campaign badge
 * SOLID Principles: SRP - Single responsibility for campaign indicator
 * Design Patterns: Atomic Component Pattern
 * Dependencies: React
 */

'use client'

import { Tag } from 'lucide-react'

interface CampaignTimerProps {
  className?: string
}

export function CampaignTimer({ className = '' }: CampaignTimerProps) {
  return (
    <div
      className={`flex items-center gap-1 text-sm text-green-600 dark:text-green-400 font-medium ${className}`}
    >
      <Tag className="h-3 w-3" />
      <span>Campaign</span>
    </div>
  )
}
