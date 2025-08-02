/**
 * CI Build Validation Tests
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for CI/CD pipeline validation
 * - OCP: Open for extension with additional CI checks
 * - DIP: Depends on Node.js and build tool abstractions
 *
 * Design Patterns:
 * - Validation Pattern: Validates build artifacts and configurations
 * - Health Check Pattern: Ensures build environment health
 *
 * Architecture: CI-specific tests that validate build output,
 * environment configuration, and deployment readiness
 */

import fs from 'fs'
import path from 'path'

describe('CI Build Validation', () => {
  const projectRoot = path.join(__dirname, '../../..')

  describe('Environment Configuration', () => {
    it('should have all required environment files', () => {
      const envFiles = [
        '.env.example',
        '.env.development',
        '.env.test',
        '.env.production',
      ]

      envFiles.forEach(file => {
        const filePath = path.join(projectRoot, file)
        expect(fs.existsSync(filePath)).toBe(true)
      })
    })

    it('should have all required environment variables in .env.example', () => {
      const envExamplePath = path.join(projectRoot, '.env.example')
      const envContent = fs.readFileSync(envExamplePath, 'utf-8')

      const requiredVars = [
        'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY',
        'CLERK_SECRET_KEY',
        'NEXT_PUBLIC_CLERK_SIGN_IN_URL',
        'NEXT_PUBLIC_CLERK_SIGN_UP_URL',
      ]

      requiredVars.forEach(varName => {
        expect(envContent).toContain(varName)
      })
    })
  })

  describe('Dependencies', () => {
    it('should have no conflicting dependencies', () => {
      const packageJsonPath = path.join(projectRoot, 'package.json')
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))

      // Check for React version compatibility
      expect(packageJson.dependencies.react).toBeDefined()
      expect(packageJson.dependencies['react-dom']).toBeDefined()
      expect(packageJson.dependencies.react).toBe(
        packageJson.dependencies['react-dom']
      )
    })

    it('should not have any dependencies in devDependencies', () => {
      const packageJsonPath = path.join(projectRoot, 'package.json')
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))

      const prodDeps = Object.keys(packageJson.dependencies || {})
      const devDeps = Object.keys(packageJson.devDependencies || {})

      // Check that no production dependency is also in devDependencies
      const duplicates = prodDeps.filter(dep => devDeps.includes(dep))
      expect(duplicates).toHaveLength(0)
    })
  })

  describe('TypeScript Configuration', () => {
    it('should have strict TypeScript configuration', () => {
      const tsconfigPath = path.join(projectRoot, 'tsconfig.json')

      // Instead of parsing JSON with comments, check the file content directly
      const tsconfigContent = fs.readFileSync(tsconfigPath, 'utf-8')

      // Check for strict mode and related settings
      expect(tsconfigContent).toContain('"strict": true')
      expect(tsconfigContent).toContain('"noImplicitAny": true')
      expect(tsconfigContent).toContain('"strictNullChecks": true')
      expect(tsconfigContent).toContain('"strictFunctionTypes": true')
      expect(tsconfigContent).toContain('"strictBindCallApply": true')
      expect(tsconfigContent).toContain('"noImplicitThis": true')
    })
  })

  describe('Build Output', () => {
    it('should have required configuration files', () => {
      const configFiles = [
        'next.config.ts',
        'jest.config.ts',
        'playwright.config.ts',
        'postcss.config.mjs',
        'eslint.config.mjs',
      ]

      configFiles.forEach(file => {
        const filePath = path.join(projectRoot, file)
        expect(fs.existsSync(filePath)).toBe(true)
      })
    })

    it('should have all required directories', () => {
      const requiredDirs = [
        'src/app',
        'src/components',
        'src/lib',
        'src/__tests__',
        'public',
      ]

      requiredDirs.forEach(dir => {
        const dirPath = path.join(projectRoot, dir)
        expect(fs.existsSync(dirPath)).toBe(true)
        expect(fs.statSync(dirPath).isDirectory()).toBe(true)
      })
    })
  })

  describe('Security Checks', () => {
    it('should not have any hardcoded secrets', () => {
      const sourceFiles = ['src/app/layout.tsx', 'src/middleware.ts']

      sourceFiles.forEach(file => {
        const filePath = path.join(projectRoot, file)
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, 'utf-8')

          // Check for common secret patterns
          expect(content).not.toMatch(/sk_live_[a-zA-Z0-9]+/)
          expect(content).not.toMatch(/pk_live_[a-zA-Z0-9]+/)
          expect(content).not.toMatch(/api[_-]?key\s*[:=]\s*["'][^"']+["']/i)
          expect(content).not.toMatch(/secret\s*[:=]\s*["'][^"']+["']/i)
        }
      })
    })
  })

  describe('Code Quality', () => {
    it('should not have any console.log statements in production code', () => {
      const sourceDir = path.join(projectRoot, 'src')
      const checkDirectory = (dir: string) => {
        const files = fs.readdirSync(dir)

        files.forEach(file => {
          const filePath = path.join(dir, file)
          const stat = fs.statSync(filePath)

          if (stat.isDirectory() && !file.includes('__tests__')) {
            checkDirectory(filePath)
          } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
            const content = fs.readFileSync(filePath, 'utf-8')
            expect(content).not.toMatch(/console\.log\s*\(/)
          }
        })
      }

      checkDirectory(sourceDir)
    })

    it('should not have any TODO comments in production code', () => {
      const sourceDir = path.join(projectRoot, 'src')
      const checkDirectory = (dir: string) => {
        const files = fs.readdirSync(dir)

        files.forEach(file => {
          const filePath = path.join(dir, file)
          const stat = fs.statSync(filePath)

          if (
            stat.isDirectory() &&
            !file.includes('__tests__') &&
            !file.includes('documents')
          ) {
            checkDirectory(filePath)
          } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
            const content = fs.readFileSync(filePath, 'utf-8')
            expect(content).not.toMatch(/\/\/\s*TODO/i)
            expect(content).not.toMatch(/\/\*\s*TODO/i)
          }
        })
      }

      checkDirectory(sourceDir)
    })
  })
})
