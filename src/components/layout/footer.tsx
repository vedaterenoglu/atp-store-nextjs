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
 * Dependencies: None (static content)
 */

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
        <p className="text-center text-sm text-muted-foreground">
          © {year} Alfe Tissue Paper AB. All rights reserved.{' '}
          <span className="hidden sm:inline">|</span>
          <span className="block sm:inline sm:ml-1">
            Created by{' '}
            <span className="font-medium text-foreground transition-colors hover:text-primary">
              {author}
            </span>
          </span>
        </p>
      </div>
    </footer>
  )
}
