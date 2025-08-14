/**
 * Admin Dashboard Sidebar Component
 * SOLID Principles: SRP - Single responsibility for admin navigation
 * Design Patterns: Component Composition Pattern
 * Dependencies: Next.js navigation, cn utility
 */

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  UserPlus,
  ShieldCheck,
  UserCheck,
  UserCog,
  type LucideIcon,
} from 'lucide-react'
import { useSafeTranslation } from '@/hooks/use-safe-translation'

interface NavItem {
  labelKey: string
  href: string
  icon: LucideIcon
}

// Navigation items with translation keys
const navItems: NavItem[] = [
  {
    labelKey: 'sidebar.createCustomer',
    href: '/admin/dashboard',
    icon: UserPlus,
  },
  {
    labelKey: 'sidebar.createAdmin',
    href: '/admin/dashboard/create-admin',
    icon: ShieldCheck,
  },
  {
    labelKey: 'sidebar.authenticateUser',
    href: '/admin/dashboard/authenticate-user',
    icon: UserCheck,
  },
  {
    labelKey: 'sidebar.modifyUser',
    href: '/admin/dashboard/modify-user',
    icon: UserCog,
  },
]

interface AdminSidebarProps {
  onClose?: () => void
}

export function AdminSidebar({}: AdminSidebarProps = {}) {
  const { t } = useSafeTranslation('admin')
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r bg-background">
      <div className="flex h-full flex-col">
        {/* Sidebar Header */}
        <div className="border-b p-6">
          <h2 className="text-lg font-semibold">{t('sidebar.title')}</h2>
          <p className="text-sm text-muted-foreground">
            {t('sidebar.dashboard')}
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map(item => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-start gap-3 rounded-lg px-3 py-2 transition-colors',
                  'hover:bg-accent hover:text-accent-foreground',
                  isActive && 'bg-accent text-accent-foreground'
                )}
              >
                <Icon
                  className={cn(
                    'mt-0.5 h-5 w-5',
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  )}
                />
                <div className="flex-1">
                  <div className="text-sm font-medium">{t(item.labelKey)}</div>
                </div>
              </Link>
            )
          })}
        </nav>

        {/* Sidebar Footer - removed as not needed */}
      </div>
    </aside>
  )
}
