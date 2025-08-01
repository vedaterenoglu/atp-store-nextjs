/**
 * AppLayout - Main application layout component
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for application layout structure
 * - OCP: Open for extension via children prop
 *
 * Design Patterns:
 * - Layout Pattern: Provides consistent page structure with header, main, and footer
 * - Composition Pattern: Composes Navbar, main content, and Footer components
 * - Slot Pattern: Uses children prop for flexible content insertion
 *
 * Architecture: Layout component that provides consistent structure across all pages
 * with max-width constraint of 1280px for optimal viewing experience
 */
import { Navbar } from './navbar'
import { Footer } from './footer'

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const author = 'GTBS Coding'

  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full max-w-[1280px] mx-auto flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 flex flex-col px-4">{children}</main>
        <Footer author={author} />
      </div>
    </div>
  )
}
