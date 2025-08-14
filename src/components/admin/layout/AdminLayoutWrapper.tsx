/**
 * AdminLayoutWrapper - Client-side layout wrapper with sidebar
 *
 * Features:
 * - Mobile-first responsive design
 * - Collapsible sidebar for mobile
 * - Hamburger menu toggle
 * - Responsive layout structure
 *
 * SOLID Principles: Single Responsibility - Layout UI only
 * Dependencies: AdminSidebar component
 */
'use client'

import { useState } from 'react'
import { AdminSidebar } from '@/components/admin'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/schadcn'
import { useSafeTranslation } from '@/hooks/use-safe-translation'

interface AdminLayoutWrapperProps {
  children: React.ReactNode
}

export function AdminLayoutWrapper({ children }: AdminLayoutWrapperProps) {
  const { t } = useSafeTranslation('admin')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <div className="flex h-screen relative">
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - hidden on mobile by default, visible on desktop */}
      <div
        className={`
          fixed lg:relative
          z-50 lg:z-0
          h-full
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        <AdminSidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-y-auto bg-background">
        {/* Mobile header with hamburger menu */}
        <div className="lg:hidden sticky top-0 z-30 bg-background border-b">
          <div className="flex items-center justify-between p-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="lg:hidden"
            >
              {isSidebarOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
            <h1 className="text-lg font-semibold">{t('sidebar.title')}</h1>
            <div className="w-10" /> {/* Spacer for centering */}
          </div>
        </div>

        {/* Page content */}
        <div className="flex-1">
          <div className="container mx-auto p-4 sm:p-6">{children}</div>
        </div>
      </main>
    </div>
  )
}
