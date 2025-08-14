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

interface NavItem {
  label: string
  href: string
  icon: LucideIcon
  description: string
}

const navItems: NavItem[] = [
  {
    label: 'Create Customer',
    href: '/admin/dashboard',
    icon: UserPlus,
    description: 'Create new customer account',
  },
  {
    label: 'Create Admin',
    href: '/admin/dashboard/create-admin',
    icon: ShieldCheck,
    description: 'Create new admin account',
  },
  {
    label: 'Authenticate User',
    href: '/admin/dashboard/authenticate-user',
    icon: UserCheck,
    description: 'Link users to customers',
  },
  {
    label: 'Modify User',
    href: '/admin/dashboard/modify-user',
    icon: UserCog,
    description: 'Edit or delete users',
  },
]

interface AdminSidebarProps {
  onClose?: () => void
}

export function AdminSidebar({ onClose: _onClose }: AdminSidebarProps = {}) {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r bg-background">
      <div className="flex h-full flex-col">
        {/* Sidebar Header */}
        <div className="border-b p-6">
          <h2 className="text-lg font-semibold">Admin Dashboard</h2>
          <p className="text-sm text-muted-foreground">User Management</p>
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
                  <div className="text-sm font-medium">{item.label}</div>
                  <div className="text-xs text-muted-foreground">
                    {item.description}
                  </div>
                </div>
              </Link>
            )
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t p-4">
          <div className="rounded-lg bg-muted/50 p-3">
            <p className="text-xs text-muted-foreground">
              Manage user accounts and permissions through Clerk authentication
              service.
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
