/**
 * GraphQL File Type Declarations
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for GraphQL file type declarations
 * - OCP: Open for extension with additional GraphQL file types
 *
 * Design Patterns:
 * - Module Declaration Pattern: TypeScript module declarations for GraphQL files
 */

declare module '*.graphql' {
  import { DocumentNode } from 'graphql'
  const defaultDocument: DocumentNode
  export default defaultDocument
}

declare module '*.gql' {
  import { DocumentNode } from 'graphql'
  const defaultDocument: DocumentNode
  export default defaultDocument
}
