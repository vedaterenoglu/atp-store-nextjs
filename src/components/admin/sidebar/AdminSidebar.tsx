/**
 * AdminSidebar - Sidebar navigation for customer dashboard
 *
 * Features:
 * - Multilingual menu items (TR/EN/SV)
 * - Active route highlighting
 * - Responsive design
 *
 * SOLID Principles: Single Responsibility - Navigation menu only
 * Dependencies: Next.js navigation, i18next
 */
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Clock,
  Truck,
  FileText,
  AlertCircle,
} from 'lucide-react'

interface NavItem {
  href: string
  labelKey: string
  icon: React.ElementType
}

const navItems: NavItem[] = [
  {
    href: '/admin/dashboard',
    labelKey: 'dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/admin/pending-orders',
    labelKey: 'pendingOrders',
    icon: Clock,
  },
  {
    href: '/admin/deliveries',
    labelKey: 'deliveries',
    icon: Truck,
  },
  {
    href: '/admin/invoices',
    labelKey: 'invoices',
    icon: FileText,
  },
  {
    href: '/admin/unpaid-invoices',
    labelKey: 'unpaidInvoices',
    icon: AlertCircle,
  },
]

interface AdminSidebarProps {
  onClose?: () => void
}

export function AdminSidebar({ onClose }: AdminSidebarProps) {
  const pathname = usePathname()
  const { t } = useTranslation('admin')

  const handleLinkClick = () => {
    // Close sidebar on mobile after navigation
    if (onClose) {
      onClose()
    }
  }

  return (
    <aside className="w-64 h-full border-r bg-card">
      <div className="p-4 sm:p-6 border-b">
        <h2 className="text-base sm:text-lg font-semibold">{t('dashboard')}</h2>
      </div>
      <nav className="space-y-1 p-3">
        {navItems.map(item => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleLinkClick}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{t(item.labelKey)}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
