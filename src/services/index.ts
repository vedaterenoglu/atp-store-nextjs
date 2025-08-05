/**
 * Services Barrel Export
 * SOLID Principles: Interface Segregation - Clean export interface
 * Design Patterns: Barrel Export Pattern - Centralized service exports
 * Dependencies: None
 */

// Category services
export {
  getCategories,
  getCategoriesWithCache,
  clearCategoriesCache,
  getCategoryById,
  getCategoriesGrouped,
} from './categories.service'

// Product services
export { getProducts } from './products.service'
