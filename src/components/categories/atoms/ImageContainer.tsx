/**
 * ImageContainer Atom Component
 * SOLID Principles: Single Responsibility - Handles image display with loading states
 * Design Patterns: Compound Component Pattern for image states
 * Dependencies: next/image, react hooks
 */

'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ImageContainerProps {
  src: string
  alt: string
  fallbackSrc?: string
  className?: string
}

export function ImageContainer({
  src,
  alt,
  fallbackSrc = 'https://res.cloudinary.com/dnptbuf0s/image/upload/v1754299206/samples/atp-store-customer/alfe-fallback_nopd5j.jpg',
  className,
}: ImageContainerProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)

  const handleError = () => {
    if (fallbackSrc && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc)
    }
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  return (
    <div className={cn('relative overflow-hidden bg-muted', className)}>
      <Image
        src={imgSrc}
        alt={alt}
        fill
        className={cn(
          'object-cover transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100'
        )}
        onError={handleError}
        onLoad={handleLoad}
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
      />
      {isLoading && <div className="absolute inset-0 animate-pulse bg-muted" />}
    </div>
  )
}
