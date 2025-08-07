/**
 * Generic GraphQL Document Mock
 * SOLID Principles: SRP - Single responsibility for mocking GraphQL documents
 * Design Patterns: Mock Pattern
 * Dependencies: @apollo/client types
 */

import type { DocumentNode } from '@apollo/client'
import { Kind, OperationTypeNode } from 'graphql'

// Create a generic GraphQL document mock
const mockGraphQLDocument: DocumentNode = {
  kind: Kind.DOCUMENT,
  definitions: [
    {
      kind: Kind.OPERATION_DEFINITION,
      operation: OperationTypeNode.QUERY,
      name: {
        kind: Kind.NAME,
        value: 'MockQuery',
      },
      selectionSet: {
        kind: Kind.SELECTION_SET,
        selections: [
          {
            kind: Kind.FIELD,
            name: {
              kind: Kind.NAME,
              value: 'mock',
            },
          },
        ],
      },
    },
  ],
}

export default mockGraphQLDocument
