/**
 * Bookmark Store - Centralized bookmark state management
 * SOLID Principles: Single Responsibility - Manages bookmark state only
 * Design Patterns: Store Pattern with Zustand
 * Dependencies: Zustand, bookmark actions
 */

import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { toast } from '@/lib/utils/toast'
import {
  getCustomerBookmarks as fetchBookmarks,
  toggleBookmark as toggleBookmarkAction,
} from '@/app/actions/bookmark-actions'

// Product data stored with bookmark
export interface BookmarkedProduct {
  id: string
  name: string
  price: number
  unit: string
  categoryId: string
  imageUrl?: string
}

interface BookmarkState {
  // State
  bookmarkedProducts: Set<string> // Set of stock_ids that are bookmarked
  bookmarkedProductsData: Map<string, BookmarkedProduct> // Full product data
  isLoading: boolean
  isInitialized: boolean
  error: string | null

  // Actions
  initializeBookmarks: (forceRefresh?: boolean) => Promise<void>
  toggleBookmark: (
    stockId: string,
    productData?: BookmarkedProduct
  ) => Promise<void>
  isBookmarked: (stockId: string) => boolean
  getBookmarkedProductsArray: () => BookmarkedProduct[]
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
        bookmarkedProductsData: new Map<string, BookmarkedProduct>(),
        isLoading: false,
        isInitialized: false,
        error: null,

        // Initialize bookmarks from backend
        initializeBookmarks: async (forceRefresh = false) => {
          const { isLoading, isInitialized } = get()

          // Prevent multiple simultaneous initializations
          // Allow force refresh to bypass isInitialized check
          if (isLoading || (!forceRefresh && isInitialized)) return

          set({ isLoading: true, error: null })

          try {
            // Fetch all bookmarks for the current customer
            const bookmarks = await fetchBookmarks()

            // Convert to Set for O(1) lookup performance
            const bookmarkSet = new Set<string>(
              bookmarks.map(bookmark => bookmark.stock_id)
            )

            // Store product data
            const productDataMap = new Map<string, BookmarkedProduct>()
            bookmarks.forEach(bookmark => {
              if (bookmark.stock) {
                productDataMap.set(bookmark.stock_id, {
                  id: bookmark.stock_id,
                  name: bookmark.stock.stock_name || 'Unknown Product',
                  price: bookmark.stock.stock_price || 0,
                  unit: bookmark.stock.stock_unit || 'pcs',
                  categoryId: bookmark.stock.stock_group || 'uncategorized',
                  ...(bookmark.stock.stock_image_link && {
                    imageUrl: bookmark.stock.stock_image_link,
                  }),
                })
              }
            })

            set({
              bookmarkedProducts: bookmarkSet,
              bookmarkedProductsData: productDataMap,
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
        toggleBookmark: async (
          stockId: string,
          productData?: BookmarkedProduct
        ) => {
          const { bookmarkedProducts, bookmarkedProductsData } = get()
          const isCurrentlyBookmarked = bookmarkedProducts.has(stockId)

          // Toggle bookmark for product

          // Optimistic update
          const newBookmarks = new Set(bookmarkedProducts)
          const newProductsData = new Map(bookmarkedProductsData)

          if (isCurrentlyBookmarked) {
            // Unbookmarking
            newBookmarks.delete(stockId)
            newProductsData.delete(stockId)
          } else {
            // Bookmarking - add ID and product data if provided
            newBookmarks.add(stockId)
            if (productData) {
              newProductsData.set(stockId, productData)
            }
          }

          set({
            bookmarkedProducts: newBookmarks,
            bookmarkedProductsData: newProductsData,
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
                bookmarkedProductsData,
                error: result.error || 'Failed to update bookmark',
              })
              console.error('❌ Bookmark toggle failed:', result.error)

              // Show user-friendly error message
              if (result.error === 'Please select a customer first') {
                toast.error('Please select a customer to use bookmarks')
              } else {
                toast.error(result.error || 'Failed to update bookmark')
              }
            } else {
              // Bookmark toggled successfully
              // If we bookmarked but didn't have product data, fetch it
              if (!isCurrentlyBookmarked && !productData) {
                try {
                  const bookmarks = await fetchBookmarks()
                  const newBookmark = bookmarks.find(
                    b => b.stock_id === stockId
                  )
                  if (newBookmark?.stock) {
                    const updatedProductsData = new Map(
                      get().bookmarkedProductsData
                    )
                    updatedProductsData.set(stockId, {
                      id: stockId,
                      name: newBookmark.stock.stock_name || 'Unknown Product',
                      price: newBookmark.stock.stock_price || 0,
                      unit: newBookmark.stock.stock_unit || 'pcs',
                      categoryId:
                        newBookmark.stock.stock_group || 'uncategorized',
                      ...(newBookmark.stock.stock_image_link && {
                        imageUrl: newBookmark.stock.stock_image_link,
                      }),
                    })
                    set({ bookmarkedProductsData: updatedProductsData })
                  }
                } catch (error) {
                  console.error(
                    'Failed to fetch product data after bookmark:',
                    error
                  )
                }
              }
            }
          } catch (error) {
            // Rollback on error
            set({
              bookmarkedProducts,
              bookmarkedProductsData,
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

        // Get all bookmarked products as array
        getBookmarkedProductsArray: () => {
          const { bookmarkedProductsData } = get()
          return Array.from(bookmarkedProductsData.values())
        },

        // Clear all bookmarks (for sign out)
        clearBookmarks: () => {
          set({
            bookmarkedProducts: new Set<string>(),
            bookmarkedProductsData: new Map<string, BookmarkedProduct>(),
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
        // Only persist the bookmarkedProducts set and product data
        partialize: state => ({
          bookmarkedProducts: Array.from(state.bookmarkedProducts),
          bookmarkedProductsData: Array.from(
            state.bookmarkedProductsData.entries()
          ),
        }),
        // Convert arrays back to Set and Map on rehydration
        onRehydrateStorage: () => state => {
          if (state) {
            if (Array.isArray(state.bookmarkedProducts)) {
              state.bookmarkedProducts = new Set(state.bookmarkedProducts)
            }
            if (Array.isArray(state.bookmarkedProductsData)) {
              state.bookmarkedProductsData = new Map(
                state.bookmarkedProductsData
              )
            }
          }
        },
      }
    ),
    {
      name: 'BookmarkStore',
    }
  )
)
