/**
 * Admin Sidebar - Navigation sidebar for admin dashboard
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for sidebar navigation
 * - OCP: Open for extension with new navigation items
 * - ISP: Focused interface for navigation functionality
 * - DIP: Depends on Next.js navigation abstractions
 *
 * Design Patterns:
 * - Component Pattern: Reusable sidebar component
 * - Strategy Pattern: Different navigation items based on user role
 * - Observer Pattern: Responds to route changes
 *
 * Dependencies: Next.js Link, i18n translations, Lucide icons
 */

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import {
  LayoutDashboard,
  Clock,
  Truck,
  FileText,
  AlertCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavItem {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

export function AdminSidebar() {
  const { t } = useTranslation('admin')
  const pathname = usePathname()

  const navItems: NavItem[] = [
    {
      href: '/admin/dashboard',
      label: t('navigation.dashboard'),
      icon: LayoutDashboard,
    },
    {
      href: '/admin/pending-orders',
      label: t('navigation.pendingOrders'),
      icon: Clock,
    },
    {
      href: '/admin/deliveries',
      label: t('navigation.deliveries'),
      icon: Truck,
    },
    {
      href: '/admin/invoices',
      label: t('navigation.invoices'),
      icon: FileText,
    },
    {
      href: '/admin/unpaid-invoices',
      label: t('navigation.unpaidInvoices'),
      icon: AlertCircle,
    },
  ]

  return (
    <aside className="w-64 bg-card border-r min-h-screen">
      <SidebarHeader />
      <SidebarNav items={navItems} currentPath={pathname} />
    </aside>
  )
}

function SidebarHeader() {
  const { t } = useTranslation('admin')

  return (
    <div className="p-6 border-b">
      <h2 className="text-lg font-semibold text-foreground">
        {t('dashboard.title')}
      </h2>
      <p className="text-sm text-muted-foreground mt-1">
        {t('dashboard.subtitle')}
      </p>
    </div>
  )
}

function SidebarNav({
  items,
  currentPath,
}: {
  items: NavItem[]
  currentPath: string
}) {
  return (
    <nav className="p-4 space-y-2">
      {items.map(item => (
        <SidebarNavItem
          key={item.href}
          item={item}
          isActive={currentPath === item.href}
        />
      ))}
    </nav>
  )
}

function SidebarNavItem({
  item,
  isActive,
}: {
  item: NavItem
  isActive: boolean
}) {
  const Icon = item.icon

  return (
    <Link
      href={item.href}
      className={cn(
        'flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors',
        'hover:bg-accent hover:text-accent-foreground',
        isActive && 'bg-primary text-primary-foreground hover:bg-primary/90'
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{item.label}</span>
    </Link>
  )
}
