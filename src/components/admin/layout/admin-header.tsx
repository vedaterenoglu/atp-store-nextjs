/**
 * Admin Header - Header component for admin dashboard
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for admin header display
 * - OCP: Open for extension with new header features
 * - ISP: Focused interface for header functionality
 * - DIP: Depends on user object abstraction from Clerk
 *
 * Design Patterns:
 * - Component Pattern: Reusable header component
 * - Facade Pattern: Simplifies user information display
 * - Decorator Pattern: Enhances basic header with user info
 *
 * Dependencies: Clerk user object, i18n translations
 */

'use client'

import { useTranslation } from 'react-i18next'
import type { User } from '@clerk/nextjs/server'

interface AdminHeaderProps {
  user: User
}

export function AdminHeader({ user }: AdminHeaderProps) {
  return (
    <header className="bg-card border-b px-6 py-4">
      <div className="flex justify-between items-center">
        <HeaderWelcome user={user} />
        <HeaderActions />
      </div>
    </header>
  )
}

function HeaderWelcome({ user }: { user: User }) {
  const { t } = useTranslation('admin')
  const displayName =
    user.firstName || user.emailAddresses[0]?.emailAddress || 'Customer'

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">
        {t('dashboard.welcome')}, {displayName}
      </h1>
      <p className="text-sm text-muted-foreground">{t('dashboard.overview')}</p>
    </div>
  )
}

function HeaderActions() {
  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-muted-foreground">
        {new Date().toLocaleDateString()}
      </span>
    </div>
  )
}
