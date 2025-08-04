/**
 * Categories Route Page
 * SOLID Principles: Single Responsibility - Route handler for categories
 * Design Patterns: Page Pattern - Next.js App Router page
 * Dependencies: CategoriesPage template, mock data
 */

import { CategoriesPage } from '@/components/categories/templates/CategoriesPage'
import categoriesData from '@/mock/categories.json'

export const metadata = {
  title: 'Categories | ATP Store',
  description: 'Browse our product categories',
}

export default function Page() {
  // Transform mock data to match component interface
  const categories = categoriesData.data._type_stock_groups

  return <CategoriesPage categories={categories} />
}
