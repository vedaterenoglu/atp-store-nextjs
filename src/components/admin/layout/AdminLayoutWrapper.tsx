/**
 * AdminLayoutWrapper - Client-side layout wrapper with sidebar
 *
 * Features:
 * - Client-side component for UI
 * - Contains sidebar navigation
 * - Responsive layout structure
 *
 * SOLID Principles: Single Responsibility - Layout UI only
 * Dependencies: AdminSidebar component
 */
'use client'

import { AdminSidebar } from '@/components/admin'

interface AdminLayoutWrapperProps {
  children: React.ReactNode
}

export function AdminLayoutWrapper({ children }: AdminLayoutWrapperProps) {
  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto bg-background">
        <div className="container mx-auto p-6">{children}</div>
      </main>
    </div>
  )
}
