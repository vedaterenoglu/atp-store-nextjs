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
import { UserPlus, ShieldCheck, UserCheck, type LucideIcon } from 'lucide-react'
import { useSafeTranslation } from '@/hooks/use-safe-translation'
import { useSecureAuth } from '@/hooks/use-secure-auth'

interface NavItem {
  labelKey: string
  href: string
  icon: LucideIcon
  requiresSuperadmin?: boolean
  hideForSuperadmin?: boolean
}

// Navigation items with translation keys
// Order optimized: superadmin items first, then regular admin items
const navItems: NavItem[] = [
  {
    labelKey: 'sidebar.createAdmin',
    href: '/admin/dashboard/create-admin',
    icon: ShieldCheck,
    requiresSuperadmin: true,
  },
  {
    labelKey: 'sidebar.createCustomer',
    href: '/admin/dashboard',
    icon: UserPlus,
    hideForSuperadmin: true,
  },
  {
    labelKey: 'sidebar.authenticateUser',
    href: '/admin/dashboard/authenticate-user',
    icon: UserCheck,
    hideForSuperadmin: true,
  },
]

interface AdminSidebarProps {
  onClose?: () => void
}

export function AdminSidebar({}: AdminSidebarProps = {}) {
  const { t } = useSafeTranslation('admin')
  const pathname = usePathname()
  const { auth } = useSecureAuth()

  // Filter navigation items based on user role
  const visibleNavItems = navItems.filter(item => {
    // Hide items that require superadmin if user is not superadmin
    if (item.requiresSuperadmin && auth.role !== 'superadmin') {
      return false
    }

    // Hide items marked as hideForSuperadmin if user is superadmin
    if (item.hideForSuperadmin && auth.role === 'superadmin') {
      return false
    }

    return true
  })

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
          {visibleNavItems.map(item => {
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
