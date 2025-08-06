/**
 * Categories Route Page
 * SOLID Principles: Single Responsibility - Route handler for categories
 * Design Patterns: Page Pattern - Next.js App Router page
 * Dependencies: CategoriesPage template, categories service
 */

import { CategoriesPage } from '@/components/categories'
import { getCategories } from '@/services'

export const metadata = {
  title: 'Categories | ATP Store',
  description: 'Browse our product categories',
}

// Force dynamic rendering to prevent build-time fetching
export const dynamic = 'force-dynamic'

export default async function Page() {
  try {
    // Fetch categories from backend
    const categories = await getCategories()

    return <CategoriesPage categories={categories} />
  } catch (error) {
    // Pass error to CategoriesGrid which has error boundary
    return <CategoriesPage categories={[]} error={error as Error} />
  }
}
