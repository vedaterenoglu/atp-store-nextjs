/**
 * CampaignCardSkeleton - Loading skeleton for campaign product cards
 * SOLID Principles: SRP - Single responsibility for loading state display
 * Design Patterns: Molecular Component Pattern
 * Dependencies: React, shadcn/ui Skeleton
 */

import { Card, CardContent, CardFooter } from '@/components/ui/schadcn/card'
import { Skeleton } from '@/components/ui/schadcn/skeleton'

export function CampaignCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      {/* Image skeleton */}
      <div className="relative aspect-[3/2] bg-secondary/10">
        <Skeleton className="w-full h-full" />
      </div>

      <CardContent className="p-4 space-y-4">
        {/* Product name skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-4 w-1/3" />
        </div>

        {/* Price skeleton */}
        <div className="flex items-baseline gap-2">
          <Skeleton className="h-7 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="space-y-2">
          {/* Counter skeleton */}
          <div className="flex items-center justify-center gap-3">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-6 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
          {/* Button skeleton */}
          <Skeleton className="h-10 w-full" />
        </div>
      </CardFooter>
    </Card>
  )
}
