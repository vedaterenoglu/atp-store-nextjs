/**
 * useMediaQuery Hook
 * SOLID Principles: SRP - Single responsibility for media query detection
 * Design Patterns: Custom Hook Pattern
 * Dependencies: React hooks
 */

'use client'

import { useState, useEffect } from 'react'

/**
 * Custom hook to detect media query matches
 * @param query - The media query string to match
 * @returns Boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  // Initialize with false for SSR compatibility
  const [matches, setMatches] = useState<boolean>(false)

  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window === 'undefined') {
      return
    }

    // Create media query list
    const mediaQueryList = window.matchMedia(query)

    // Set initial value
    setMatches(mediaQueryList.matches)

    // Define event handler
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // Add event listener
    // Use addEventListener for modern browsers
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', handleChange)
    } else {
      // Fallback for older browsers
      mediaQueryList.addListener(handleChange)
    }

    // Cleanup
    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener('change', handleChange)
      } else {
        // Fallback for older browsers
        mediaQueryList.removeListener(handleChange)
      }
    }
  }, [query])

  return matches
}

/**
 * Hook to detect if the screen is mobile size
 * Uses Tailwind's sm breakpoint (640px) as the threshold
 * @returns Boolean indicating if the screen is mobile size
 */
export function useIsMobile(): boolean {
  // Matches screens smaller than 640px (Tailwind's sm breakpoint)
  return useMediaQuery('(max-width: 639px)')
}

/**
 * Hook to detect if the screen is tablet size
 * Uses Tailwind's md breakpoint (768px) as the threshold
 * @returns Boolean indicating if the screen is tablet size
 */
export function useIsTablet(): boolean {
  // Matches screens between 640px and 767px
  return useMediaQuery('(min-width: 640px) and (max-width: 767px)')
}

/**
 * Hook to detect if the screen is desktop size
 * Uses Tailwind's lg breakpoint (1024px) as the threshold
 * @returns Boolean indicating if the screen is desktop size
 */
export function useIsDesktop(): boolean {
  // Matches screens 1024px and larger (Tailwind's lg breakpoint)
  return useMediaQuery('(min-width: 1024px)')
}

/**
 * Hook to detect device type with more granular control
 * @returns Object with device type booleans
 */
export function useDeviceType(): {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isLargeDesktop: boolean
} {
  const isMobile = useMediaQuery('(max-width: 639px)')
  const isTablet = useMediaQuery('(min-width: 640px) and (max-width: 1023px)')
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const isLargeDesktop = useMediaQuery('(min-width: 1280px)')

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
  }
}

/**
 * Hook to detect user's preferred color scheme
 * @returns 'dark' | 'light' based on user preference
 */
export function usePreferredColorScheme(): 'dark' | 'light' {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')
  return prefersDark ? 'dark' : 'light'
}

/**
 * Hook to detect if user prefers reduced motion
 * @returns Boolean indicating if user prefers reduced motion
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}
