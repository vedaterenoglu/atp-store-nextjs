/**
 * Dashboard Metrics - Display key business metrics
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for metrics display
 * - OCP: Open for extension with new metrics
 * - ISP: Focused interface for metrics functionality
 * - DIP: Depends on metrics data abstractions
 *
 * Design Patterns:
 * - Component Pattern: Reusable metrics component
 * - Composite Pattern: Combines multiple metric cards
 * - Strategy Pattern: Different metric display strategies
 *
 * Dependencies: i18n translations, shadcn/ui components
 */

'use client'

import { useTranslation } from 'react-i18next'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/schadcn'
import { ShoppingCart, Clock, Truck, FileText } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string | number
  icon: React.ComponentType<{ className?: string }>
  description?: string
}

export function DashboardMetrics() {
  const { t } = useTranslation('admin')

  const metrics: MetricCardProps[] = [
    {
      title: t('pages.dashboard.metrics.totalOrders'),
      value: '156',
      icon: ShoppingCart,
      description: 'Total orders this month',
    },
    {
      title: t('pages.dashboard.metrics.pendingOrders'),
      value: '23',
      icon: Clock,
      description: 'Orders awaiting processing',
    },
    {
      title: t('pages.dashboard.metrics.completedDeliveries'),
      value: '89',
      icon: Truck,
      description: 'Deliveries completed',
    },
    {
      title: t('pages.dashboard.metrics.outstandingInvoices'),
      value: '12',
      icon: FileText,
      description: 'Invoices pending payment',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  )
}

function MetricCard({
  title,
  value,
  icon: Icon,
  description,
}: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  )
}
