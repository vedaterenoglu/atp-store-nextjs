/**
 * Category search prefix store for cross-page search persistence
 *
 * Provides: Storage for category prefix used in product search
 * Used by: CategoryCard (setter) and ProductsPage SearchBox (getter)
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CategorySearchState {
  searchPrefix: string
  setSearchPrefix: (prefix: string) => void
  clearSearchPrefix: () => void
}

export const useCategorySearchStore = create<CategorySearchState>()(
  persist(
    set => ({
      searchPrefix: '',
      setSearchPrefix: prefix => set({ searchPrefix: prefix }),
      clearSearchPrefix: () => set({ searchPrefix: '' }),
    }),
    {
      name: 'category-search-storage',
    }
  )
)
