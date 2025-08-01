/**
 * Next.js Root Layout Component
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for application-wide layout structure
 * - DIP: Depends on provider abstractions not implementations
 *
 * Design Patterns:
 * - Provider Pattern: Wraps app with theme provider
 * - Composite Pattern: Combines multiple providers into single layout
 * - Template Method: Defines app structure template for all pages
 */

import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeInitializer, I18nProvider } from '@/components/providers'
import { AppLayout } from '@/components/layout'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'ATP Store - Alfe Tissue Paper AB',
  description: 'Premium products from Alfe Tissue Paper AB',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="sv" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeInitializer />
        <I18nProvider>
          <AppLayout>{children}</AppLayout>
        </I18nProvider>
      </body>
    </html>
  )
}
