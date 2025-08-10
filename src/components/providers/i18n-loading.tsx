/**
 * I18n Loading Component - Professional loading state for i18n initialization
 * SOLID Principles: SRP - Single responsibility for i18n loading UI
 * Design Patterns: Component Pattern - Reusable loading component
 * Dependencies: None (standalone component)
 */

export function I18nLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="relative flex flex-col items-center space-y-4">
        {/* Professional animated spinner */}
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 animate-ping rounded-full bg-primary/20"></div>
          <div className="relative flex h-full w-full items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-muted border-t-primary"></div>
          </div>
        </div>

        {/* Loading text with professional animation */}
        <div className="flex flex-col items-center space-y-2">
          <h2 className="text-lg font-semibold text-foreground">
            Initializing Language Settings
          </h2>
          <div className="flex space-x-1">
            <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]"></span>
            <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]"></span>
            <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-primary"></span>
          </div>
        </div>

        {/* Professional progress bar */}
        <div className="h-1 w-48 overflow-hidden rounded-full bg-muted">
          <div className="h-full bg-gradient-to-r from-transparent via-primary to-transparent animate-shimmer"></div>
        </div>
      </div>
    </div>
  )
}
