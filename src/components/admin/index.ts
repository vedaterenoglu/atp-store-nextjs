/**
 * Admin Components Barrel Export
 *
 * Central export point for all admin/customer dashboard components
 */

// Layout
export { AdminLayoutWrapper } from './layout/AdminLayoutWrapper'

// Sidebar - Using the new admin user management sidebar
export { AdminSidebar } from './layout/AdminSidebar'

// Legacy Customer Dashboard Sidebar (kept for backward compatibility)
export { AdminSidebar as CustomerDashboardSidebar } from './sidebar/AdminSidebar'
