/**
 * Navigation Bar Component
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for navigation and branding UI
 * - OCP: Open for extension via modular component structure
 * - DIP: Depends on theme toggle abstraction
 *
 * Design Patterns:
 * - Simple Component Pattern: Clean, focused navigation bar
 * - Composition Pattern: Combines brand and controls
 *
 * Dependencies: Next.js Link, Lucide icons, Theme toggle component
 */
'use client'

import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/custom/theme-toggle'
import { LanguageToggle } from '@/components/ui/custom/language-toggle'

export function Navbar() {
  return (
    <nav className="border-b -mx-4">
      <div className="px-6 sm:px-8 py-4">
        <div className="flex items-center justify-between">
          <NavbarBrand />
          <NavbarActions />
        </div>
      </div>
    </nav>
  )
}

function NavbarBrand() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3 text-foreground transition-colors hover:text-primary"
    >
      <ShoppingBag className="h-6 w-6" aria-hidden="true" />
      <span className="text-xl font-bold">ATP Store</span>
    </Link>
  )
}

function NavbarActions() {
  return (
    <div className="flex items-center gap-4">
      <LanguageToggle />
      <ThemeToggle />
      {/* Future navigation and authentication controls will go here */}
    </div>
  )
}
