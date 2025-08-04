/**
 * Main barrel exports for categories components
 * SOLID Principles: Interface Segregation - Clean export interface
 * Design Patterns: Module Pattern - Centralized exports
 * Dependencies: None
 */

// Atoms
export {
  ImageContainer,
  OverlayComponent,
  PageTitle,
  PriceTag,
  ViewAllProductsButton,
} from './atoms'

// Molecules
export { CategoryCard } from './molecules'

// Organisms
export { CategoriesGrid } from './organisms'

// Templates
export { CategoriesPage } from './templates'
