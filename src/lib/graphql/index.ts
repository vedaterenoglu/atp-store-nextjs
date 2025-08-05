/**
 * GraphQL Utilities Barrel Export
 * SOLID Principles: Interface Segregation - Clean export interface
 * Design Patterns: Barrel Export Pattern - Centralized GraphQL exports
 * Dependencies: None
 */

// Client exports
export { getGraphQLClient, executeGraphQLOperation } from './client'

// Server fetch exports
export { serverGraphQLFetch } from './server-fetch'

// Schema exports - Categories
export {
  StockGroupSchema,
  GetCategoriesQueryResponseSchema,
  GraphQLCategoriesResponseSchema,
  CategorySchema,
  CategoriesArraySchema,
  validateAndTransformCategories,
} from './schemas/categories'

export type {
  StockGroup,
  GetCategoriesQueryResponse,
  Category,
  CategoriesArray,
} from './schemas/categories'

// Schema exports - Products
export {
  ProductSchema,
  ProductsArraySchema,
  validateAndTransformProducts,
} from './schemas/products'

export type { Product, ProductsArray } from './schemas/products'
