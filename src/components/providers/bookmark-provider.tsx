/**
 * Bookmark Provider Component
 * SOLID Principles: Single Responsibility - Manages bookmark store initialization
 * Design Patterns: Provider Pattern
 * Dependencies: Zustand bookmark store, Clerk auth
 */

'use client'

import { useEffect } from 'react'
import { useAuth } from '@clerk/nextjs'
import { useBookmarkStore } from '@/lib/stores/bookmark-store'

interface BookmarkProviderProps {
  children: React.ReactNode
}

export function BookmarkProvider({ children }: BookmarkProviderProps) {
  const { isSignedIn, userId } = useAuth()
  const { initializeBookmarks, clearBookmarks, isInitialized } =
    useBookmarkStore()

  // Initialize bookmarks when user signs in
  useEffect(() => {
    if (isSignedIn && userId && !isInitialized) {
      // Initialize bookmarks for user
      initializeBookmarks()
    }
  }, [isSignedIn, userId, isInitialized, initializeBookmarks])

  // Clear bookmarks when user signs out
  useEffect(() => {
    if (!isSignedIn && isInitialized) {
      // Clear bookmarks - user signed out
      clearBookmarks()
    }
  }, [isSignedIn, isInitialized, clearBookmarks])

  return <>{children}</>
}
