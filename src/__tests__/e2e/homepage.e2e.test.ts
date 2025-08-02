/**
 * Homepage End-to-End Test
 *
 * SOLID Principles Applied:
 * - SRP: Single responsibility for testing homepage user flows
 * - OCP: Open for extension with additional test scenarios
 * - DIP: Depends on Playwright abstractions
 *
 * Design Patterns:
 * - Page Object Pattern: Encapsulates page interactions
 * - AAA Pattern: Arrange, Act, Assert test structure
 *
 * Architecture: E2E test verifying critical user journeys on the homepage
 * including theme switching, language selection, and navigation
 */

import { test, expect } from '@playwright/test'

test.describe('Homepage E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display homepage with correct title', async ({ page }) => {
    // Verify page title
    await expect(page).toHaveTitle(/ATP Store/)

    // Verify main heading is visible
    const heading = page.getByRole('heading', { name: /Premium Ürünler/i })
    await expect(heading).toBeVisible()
  })

  test('should toggle theme between light, dark, and system', async ({
    page,
  }) => {
    // Find theme toggle button
    const themeToggle = page.getByRole('button', { name: /toggle theme/i })
    await expect(themeToggle).toBeVisible()

    // Click to open dropdown
    await themeToggle.click()

    // Select dark theme
    await page.getByText('Dark').click()

    // Verify dark theme is applied
    await expect(page.locator('html')).toHaveClass(/dark/)

    // Switch to light theme
    await themeToggle.click()
    await page.getByText('Light').click()

    // Verify light theme is applied
    await expect(page.locator('html')).not.toHaveClass(/dark/)
  })

  test('should switch language and persist selection', async ({ page }) => {
    // Find language toggle (flag button)
    const languageToggle = page.locator('button:has(span:text("🇸🇪"))')
    await expect(languageToggle).toBeVisible()

    // Click to open language dropdown
    await languageToggle.click()

    // Select English
    await page.locator('span:text("🇬🇧")').click()

    // Verify language changed by checking document lang attribute
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')

    // Reload page to verify persistence
    await page.reload()

    // Language should still be English
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')

    // Language toggle should show English flag
    await expect(page.locator('button:has(span:text("🇬🇧"))')).toBeVisible()
  })

  test('should navigate to sign-in page when clicking sign in', async ({
    page,
  }) => {
    // Find and click sign in button
    const signInButton = page.getByRole('button', { name: /sign in/i })
    await expect(signInButton).toBeVisible()
    await signInButton.click()

    // Should navigate to sign-in page
    await expect(page).toHaveURL(/sign-in/)
  })

  test('should display footer with GTBS Coding branding', async ({ page }) => {
    // Scroll to footer
    const footer = page.locator('footer')
    await footer.scrollIntoViewIfNeeded()

    // Verify GTBS Coding text
    await expect(footer.getByText('Created by')).toBeVisible()
    await expect(footer.getByText('GTBS Coding')).toBeVisible()

    // Verify copyright with current year
    const currentYear = new Date().getFullYear()
    await expect(
      footer.getByText(new RegExp(`© ${currentYear}`))
    ).toBeVisible()
  })

  test('should have responsive mobile menu', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })

    // Mobile menu button should be visible
    const mobileMenuButton = page.getByRole('button', { name: /toggle menu/i })
    await expect(mobileMenuButton).toBeVisible()

    // Desktop navigation should be hidden
    const desktopNav = page.locator('nav').filter({ hasText: 'Events' })
    await expect(desktopNav).toBeHidden()
  })

  test('should maintain theme and language across navigation', async ({
    page,
  }) => {
    // Set dark theme and Turkish language
    const themeToggle = page.getByRole('button', { name: /toggle theme/i })
    await themeToggle.click()
    await page.getByText('Dark').click()

    const languageToggle = page.locator('button:has(span:text("🇸🇪"))')
    await languageToggle.click()
    await page.locator('span:text("🇹🇷")').click()

    // Navigate to sign-in
    await page.getByRole('button', { name: /sign in/i }).click()
    await expect(page).toHaveURL(/sign-in/)

    // Verify theme and language are maintained
    await expect(page.locator('html')).toHaveClass(/dark/)
    await expect(page.locator('html')).toHaveAttribute('lang', 'tr')

    // Navigate back
    await page.goBack()

    // Settings should still be preserved
    await expect(page.locator('html')).toHaveClass(/dark/)
    await expect(page.locator('html')).toHaveAttribute('lang', 'tr')
  })

  test('should handle theme toggle keyboard navigation', async ({ page }) => {
    const themeToggle = page.getByRole('button', { name: /toggle theme/i })

    // Focus theme toggle
    await themeToggle.focus()

    // Open dropdown with Enter key
    await page.keyboard.press('Enter')

    // Verify dropdown is open
    await expect(page.getByText('Light')).toBeVisible()
    await expect(page.getByText('Dark')).toBeVisible()
    await expect(page.getByText('System')).toBeVisible()

    // Navigate with arrow keys
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')

    // Verify selection was made
    await expect(page.locator('html')).toHaveClass(/dark/)
  })
})
