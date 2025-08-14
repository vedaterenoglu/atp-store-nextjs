/**
 * @file DashboardSidebar.tsx
 * @role Sidebar navigation for dashboard views
 * @patterns Atomic Design, Navigation Pattern
 * @solid SRP - Single responsibility for dashboard navigation
 * @tests /src/components/dashboard/molecules/__tests__/DashboardSidebar.test.tsx
 */

'use client'

import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/schadcn'
import { Package, Truck, FileText } from 'lucide-react'
import type {
  DashboardView,
  DashboardViewConfig,
} from '@/lib/types/dashboard.types'

interface DashboardSidebarProps {
  activeView: DashboardView
  onViewChange: (view: DashboardView) => void
  className?: string
}

// Moved inside component to use translations

const iconMap = {
  Package,
  Truck,
  FileText,
}

/**
 * DashboardSidebar - Navigation component for dashboard views
 */
export function DashboardSidebar({
  activeView,
  onViewChange,
  className,
}: DashboardSidebarProps) {
  const { t } = useTranslation('customerDashboard')

  const viewConfigs: DashboardViewConfig[] = [
    {
      id: 'waiting-orders',
      label: t('navigation.waitingOrders'),
      icon: 'Package',
      description: t('navigation.waitingOrdersDesc'),
    },
    {
      id: 'uninvoiced-deliveries',
      label: t('navigation.uninvoicedDeliveries'),
      icon: 'Truck',
      description: t('navigation.uninvoicedDeliveriesDesc'),
    },
    {
      id: 'unpaid-invoices',
      label: t('navigation.unpaidInvoices'),
      icon: 'FileText',
      description: t('navigation.unpaidInvoicesDesc'),
    },
  ]

  return (
    <nav className={cn('space-y-2', className)}>
      {viewConfigs.map(config => {
        const Icon = iconMap[config.icon as keyof typeof iconMap]
        const isActive = activeView === config.id

        return (
          <Button
            key={config.id}
            variant={isActive ? 'default' : 'ghost'}
            className={cn(
              'w-full justify-start gap-3',
              !isActive && 'hover:bg-muted'
            )}
            onClick={() => onViewChange(config.id)}
          >
            <Icon className="h-4 w-4" />
            <div className="flex-1 text-left">
              <div className="font-medium">{config.label}</div>
              <div className="text-xs opacity-70">{config.description}</div>
            </div>
          </Button>
        )
      })}
    </nav>
  )
}
