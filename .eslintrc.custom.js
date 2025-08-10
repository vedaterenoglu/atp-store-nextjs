/**
 * Custom ESLint Rules for Style Enforcement
 * Ensures consistent use of cn() utility for className props
 */

module.exports = {
  meta: {
    name: 'atp-store-style-rules',
    version: '1.0.0',
  },
  rules: {
    'require-cn-for-classname': {
      meta: {
        type: 'suggestion',
        docs: {
          description:
            'Require cn() utility for className props with multiple classes or conditions',
          recommended: true,
        },
        fixable: 'code',
        schema: [],
        messages: {
          requireCn:
            'Use cn() utility for className with multiple classes or conditions',
          requireCnImport: 'Import cn from @/lib/utils when using className',
        },
      },
      create(context) {
        let hasCnImport = false
        let hasClassNameProp = false

        return {
          ImportDeclaration(node) {
            // Check if cn is imported from @/lib/utils
            if (
              node.source.value === '@/lib/utils' &&
              node.specifiers.some(
                spec =>
                  spec.type === 'ImportSpecifier' && spec.imported.name === 'cn'
              )
            ) {
              hasCnImport = true
            }
          },

          JSXAttribute(node) {
            if (node.name.name !== 'className') return

            hasClassNameProp = true
            const value = node.value

            // Check if className value needs cn()
            if (value && value.type === 'Literal') {
              const classString = value.value

              // Check if string has multiple classes or template literal patterns
              if (
                typeof classString === 'string' &&
                (classString.includes(' ') || classString.includes('-'))
              ) {
                // Check if it's already wrapped in cn()
                const parent = node.parent
                const hasMultipleClasses =
                  classString.trim().split(/\s+/).length > 1

                if (hasMultipleClasses && !hasCnImport) {
                  context.report({
                    node,
                    messageId: 'requireCn',
                  })
                }
              }
            }

            // Check for template literals or conditional expressions
            if (
              value &&
              value.type === 'JSXExpressionContainer' &&
              value.expression.type === 'TemplateLiteral'
            ) {
              context.report({
                node,
                messageId: 'requireCn',
              })
            }
          },

          'Program:exit'() {
            // Check if cn import is missing when className is used
            if (hasClassNameProp && !hasCnImport) {
              context.report({
                node: context.getSourceCode().ast,
                messageId: 'requireCnImport',
              })
            }
          },
        }
      },
    },

    'prefer-style-utilities': {
      meta: {
        type: 'suggestion',
        docs: {
          description:
            'Prefer style utility functions over hardcoded spacing classes',
          recommended: true,
        },
        messages: {
          useContainerUtility: 'Consider using getContainerClasses() utility',
          useSpacingUtility: 'Consider using getSpacingClasses() utility',
          useGridUtility: 'Consider using getGridClasses() utility',
        },
      },
      create(context) {
        const containerPatterns = /mx-auto.*max-w-.*px-/
        const spacingPatterns = /p[xy]?-\d+.*sm:p[xy]?-\d+/
        const gridPatterns = /grid.*gap-\d+.*grid-cols/

        return {
          Literal(node) {
            if (typeof node.value !== 'string') return

            const value = node.value

            // Check for container patterns
            if (containerPatterns.test(value)) {
              context.report({
                node,
                messageId: 'useContainerUtility',
              })
            }

            // Check for spacing patterns
            if (spacingPatterns.test(value)) {
              context.report({
                node,
                messageId: 'useSpacingUtility',
              })
            }

            // Check for grid patterns
            if (gridPatterns.test(value)) {
              context.report({
                node,
                messageId: 'useGridUtility',
              })
            }
          },
        }
      },
    },
  },
}
