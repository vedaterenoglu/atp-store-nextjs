/**
 * Dashboard Overview - Main overview section for admin dashboard
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for dashboard overview display
 * - OCP: Open for extension with new overview features
 * - ISP: Focused interface for overview functionality
 * - DIP: Depends on i18n translation abstractions
 *
 * Design Patterns:
 * - Component Pattern: Reusable overview component
 * - Template Method Pattern: Defines overview structure
 * - Facade Pattern: Simplifies overview complexity
 *
 * Dependencies: i18n translations, shadcn/ui Card component
 */

'use client'

import { useTranslation } from 'react-i18next'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/schadcn'

export function DashboardOverview() {
  const { t } = useTranslation('admin')

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('pages.dashboard.title')}</CardTitle>
        <CardDescription>{t('pages.dashboard.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center py-8 text-muted-foreground">
          <p>{t('status.loading')}</p>
        </div>
      </CardContent>
    </Card>
  )
}
