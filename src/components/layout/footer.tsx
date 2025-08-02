/**
 * Footer Component
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for displaying footer content
 * - OCP: Open for extension via props interface (year, author)
 *
 * Design Patterns:
 * - Simple Component Pattern: Clean, focused footer design
 * - Props Pattern: Configurable via author prop
 *
 * Dependencies: Next.js Image for logo display
 */
'use client'

import Image from 'next/image'

interface FooterProps {
  year?: number
  author?: string
}

export function Footer({
  year = new Date().getFullYear(),
  author = 'GTBS Coding',
}: FooterProps) {
  return (
    <footer className="mt-auto border-t -mx-4">
      <div className="px-4 py-4 sm:py-6">
        <div className="flex flex-col items-center gap-2">
          <p className="text-center text-sm text-muted-foreground">
            © {year} Alfe Tissue Paper AB. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Created by</span>
            <Image
              src="/logo-gtbs.png"
              alt="GTBS Coding Logo"
              width={20}
              height={20}
              className="h-5 w-5 object-contain"
            />
            <span className="font-medium text-foreground transition-colors hover:text-primary">
              {author}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
