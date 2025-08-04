/**
 * Products Page Loading State
 * SOLID Principles: Single Responsibility - Loading UI
 * Design Patterns: Loading Pattern - Next.js App Router loading
 * Dependencies: None
 */

export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Header Section Skeleton */}
      <div className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 text-center">
            {/* Title skeleton */}
            <div className="mx-auto h-10 w-48 animate-pulse rounded-md bg-muted" />

            {/* Subtitle skeleton */}
            <div className="mx-auto h-6 w-96 animate-pulse rounded-md bg-muted" />

            {/* Search and filter skeleton */}
            <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12 w-full animate-pulse rounded-md bg-muted sm:flex-1" />
              <div className="h-12 w-full animate-pulse rounded-md bg-muted sm:w-40" />
            </div>
          </div>
        </div>

        {/* Products Grid Skeleton */}
        <div className="py-8 sm:py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {/* Product card skeletons */}
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-lg border bg-card"
                >
                  {/* Image skeleton */}
                  <div className="aspect-[3/2] animate-pulse bg-muted" />

                  {/* Content skeleton */}
                  <div className="p-4 space-y-3">
                    <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
                    <div className="space-y-1">
                      <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
                      <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
                    </div>
                    <div className="space-y-2 pt-2">
                      <div className="h-8 w-full animate-pulse rounded bg-muted" />
                      <div className="h-8 w-full animate-pulse rounded bg-muted" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
