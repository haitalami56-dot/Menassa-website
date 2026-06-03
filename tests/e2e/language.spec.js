import { test, expect } from '@playwright/test'

test.describe('Language switching', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    // Clear persisted language preference so each test starts from English
    await page.evaluate(() => localStorage.removeItem('menassa-lang'))
    await page.reload()
  })

  test('defaults to English on first visit', async ({ page }) => {
    expect(await page.getAttribute('html', 'dir')).toBe('ltr')
    await expect(page.locator('[data-i18n="nav.home"]').first()).toHaveText('Home')
  })

  test('switches to French when FR button is clicked', async ({ page }) => {
    await page.click('[data-lang="fr"]')
    await expect(page.locator('[data-i18n="nav.home"]').first()).toHaveText('Accueil')
    await expect(page.locator('[data-i18n="nav.about"]').first()).toContainText('Propos')
  })

  test('switches to Arabic and applies RTL direction', async ({ page }) => {
    await page.click('[data-lang="ar"]')
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
  })

  test('Arabic lang attribute is set on <html>', async ({ page }) => {
    await page.click('[data-lang="ar"]')
    await expect(page.locator('html')).toHaveAttribute('lang', 'ar')
  })

  test('marks the selected language button as active', async ({ page }) => {
    await page.click('[data-lang="fr"]')
    await expect(page.locator('[data-lang="fr"]')).toHaveClass(/active/)
    await expect(page.locator('[data-lang="en"]')).not.toHaveClass(/active/)
  })

  test('only one language button is active at a time', async ({ page }) => {
    await page.click('[data-lang="fr"]')
    const activeButtons = page.locator('.lang-btn.active')
    await expect(activeButtons).toHaveCount(1)
  })

  test('removes RTL direction when switching from Arabic to English', async ({ page }) => {
    await page.click('[data-lang="ar"]')
    await page.click('[data-lang="en"]')
    await expect(page.locator('html')).toHaveAttribute('dir', 'ltr')
    await expect(page.locator('[data-i18n="nav.home"]').first()).toHaveText('Home')
  })

  test('persists language preference across page reload', async ({ page }) => {
    await page.click('[data-lang="fr"]')
    await page.reload()
    await expect(page.locator('[data-i18n="nav.home"]').first()).toHaveText('Accueil')
  })

  test('all visible data-i18n elements are updated after language switch', async ({ page }) => {
    await page.click('[data-lang="fr"]')
    // Spot-check several sections
    await expect(page.locator('[data-i18n="services.tag"]').first()).not.toHaveText('What We Do')
    await expect(page.locator('[data-i18n="contact.send"]').first()).not.toHaveText('Send Message')
  })
})
