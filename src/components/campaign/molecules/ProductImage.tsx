/**
 * ProductImage - Displays product image with loading states
 * SOLID Principles: SRP - Single responsibility for image display
 * Design Patterns: Molecular Component Pattern
 * Dependencies: React, Next.js Image
 */

'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Skeleton } from '@/components/ui/schadcn/skeleton'

interface ProductImageProps {
  src: string
  alt: string
  className?: string
}

export function ProductImage({ src, alt, className = '' }: ProductImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  return (
    <div className={`relative w-full h-full ${className}`}>
      {isLoading && <Skeleton className="absolute inset-0 w-full h-full" />}
      {hasError ? (
        <div className="flex items-center justify-center w-full h-full bg-muted">
          <span className="text-muted-foreground text-sm">No image</span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false)
            setHasError(true)
          }}
        />
      )}
    </div>
  )
}
