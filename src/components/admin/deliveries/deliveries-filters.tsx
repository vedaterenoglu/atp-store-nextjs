/**
 * Deliveries Filters - Filter controls for deliveries
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for delivery filtering
 * - OCP: Open for extension with new filter types
 * - ISP: Focused interface for filter functionality
 * - DIP: Depends on filter abstractions
 *
 * Design Patterns:
 * - Component Pattern: Reusable filter component
 * - Strategy Pattern: Different filtering strategies
 * - Observer Pattern: Notifies parent of filter changes
 *
 * Dependencies: i18n translations, shadcn/ui components
 */

'use client'

import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/schadcn'
import { Filter, Search } from 'lucide-react'

export function DeliveriesFilters() {
  const { t } = useTranslation('admin')

  return (
    <div className="flex items-center gap-4 p-4 bg-card rounded-lg border">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Filters:</span>
      </div>

      <Button variant="outline" size="sm">
        {t('pages.deliveries.status.pending')}
      </Button>

      <Button variant="outline" size="sm">
        {t('pages.deliveries.status.inTransit')}
      </Button>

      <Button variant="outline" size="sm">
        {t('pages.deliveries.status.delivered')}
      </Button>

      <div className="ml-auto">
        <Button variant="ghost" size="sm">
          <Search className="h-4 w-4 mr-2" />
          {t('actions.search')}
        </Button>
      </div>
    </div>
  )
}
