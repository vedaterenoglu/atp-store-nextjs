/**
 * Bookmark Store - Centralized bookmark state management
 * SOLID Principles: Single Responsibility - Manages bookmark state only
 * Design Patterns: Store Pattern with Zustand
 * Dependencies: Zustand, bookmark actions
 */

import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import {
  getCustomerBookmarks as fetchBookmarks,
  toggleBookmark as toggleBookmarkAction,
} from '@/app/actions/bookmark-actions'

interface BookmarkState {
  // State
  bookmarkedProducts: Set<string> // Set of stock_ids that are bookmarked
  isLoading: boolean
  isInitialized: boolean
  error: string | null

  // Actions
  initializeBookmarks: () => Promise<void>
  toggleBookmark: (stockId: string) => Promise<void>
  isBookmarked: (stockId: string) => boolean
  clearBookmarks: () => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const useBookmarkStore = create<BookmarkState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        bookmarkedProducts: new Set<string>(),
        isLoading: false,
        isInitialized: false,
        error: null,

        // Initialize bookmarks from backend
        initializeBookmarks: async () => {
          const { isLoading, isInitialized } = get()

          // Prevent multiple simultaneous initializations
          if (isLoading || isInitialized) return

          set({ isLoading: true, error: null })

          try {
            // Fetch all bookmarks for the current customer
            const bookmarks = await fetchBookmarks()

            // Convert to Set for O(1) lookup performance
            const bookmarkSet = new Set<string>(
              bookmarks.map(bookmark => bookmark.stock_id)
            )

            set({
              bookmarkedProducts: bookmarkSet,
              isInitialized: true,
              isLoading: false,
              error: null,
            })

            // Bookmarks initialized successfully
          } catch (error) {
            console.error('❌ Failed to initialize bookmarks:', error)
            set({
              isLoading: false,
              error:
                error instanceof Error
                  ? error.message
                  : 'Failed to load bookmarks',
            })
          }
        },

        // Toggle bookmark with optimistic update
        toggleBookmark: async (stockId: string) => {
          const { bookmarkedProducts } = get()
          const isCurrentlyBookmarked = bookmarkedProducts.has(stockId)

          // Toggle bookmark for product

          // Optimistic update
          const newBookmarks = new Set(bookmarkedProducts)
          if (isCurrentlyBookmarked) {
            newBookmarks.delete(stockId)
          } else {
            newBookmarks.add(stockId)
          }

          set({
            bookmarkedProducts: newBookmarks,
            error: null,
          })

          try {
            // Call server action with current state
            const result = await toggleBookmarkAction(
              stockId,
              isCurrentlyBookmarked
            )

            if (!result.success) {
              // Rollback on failure
              set({
                bookmarkedProducts,
                error: result.error || 'Failed to update bookmark',
              })
              console.error('❌ Bookmark toggle failed:', result.error)
            } else {
              // Bookmark toggled successfully
            }
          } catch (error) {
            // Rollback on error
            set({
              bookmarkedProducts,
              error:
                error instanceof Error
                  ? error.message
                  : 'Failed to update bookmark',
            })
            console.error('❌ Bookmark toggle error:', error)
          }
        },

        // Check if a product is bookmarked
        isBookmarked: (stockId: string) => {
          const { bookmarkedProducts } = get()
          return bookmarkedProducts.has(stockId)
        },

        // Clear all bookmarks (for sign out)
        clearBookmarks: () => {
          set({
            bookmarkedProducts: new Set<string>(),
            isInitialized: false,
            error: null,
          })
        },

        // Utility setters
        setLoading: (loading: boolean) => set({ isLoading: loading }),
        setError: (error: string | null) => set({ error }),
      }),
      {
        name: 'bookmark-store',
        // Only persist the bookmarkedProducts set
        partialize: state => ({
          bookmarkedProducts: Array.from(state.bookmarkedProducts),
        }),
        // Convert array back to Set on rehydration
        onRehydrateStorage: () => state => {
          if (state && Array.isArray(state.bookmarkedProducts)) {
            state.bookmarkedProducts = new Set(state.bookmarkedProducts)
          }
        },
      }
    ),
    {
      name: 'BookmarkStore',
    }
  )
)
