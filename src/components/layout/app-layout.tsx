/**
 * AppLayout - Application shell with navbar, content area, and footer
 * 
 * Features:
 * - Fixed navbar at top
 * - Flexible content area with max-width constraint
 * - Footer pinned to bottom
 * - Responsive padding and centering
 * 
 * Props: Children components to render in main content area
 * State: None (pure layout component)
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
