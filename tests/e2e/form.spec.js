import { test, expect } from '@playwright/test'

test.describe('Contact form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.removeItem('menassa-lang'))
    await page.goto('/#contact')
    // Scroll to form so it is visible
    await page.locator('#contactForm').scrollIntoViewIfNeeded()
  })

  test('form is visible on the page', async ({ page }) => {
    await expect(page.locator('#contactForm')).toBeVisible()
  })

  test('shows "Sending..." immediately after submit', async ({ page }) => {
    await page.fill('#name', 'Jane Smith')
    await page.fill('#email', 'jane@example.com')
    await page.fill('#message', 'Test message')
    await page.click('button[type="submit"]')

    await expect(page.locator('button[type="submit"] span')).toHaveText('Sending...')
  })

  test('disables submit button while sending', async ({ page }) => {
    await page.fill('#name', 'Jane Smith')
    await page.fill('#email', 'jane@example.com')
    await page.fill('#message', 'Test message')
    await page.click('button[type="submit"]')

    await expect(page.locator('button[type="submit"]')).toBeDisabled()
  })

  test('shows "Sent!" confirmation after 1.5 seconds', async ({ page }) => {
    await page.fill('#name', 'Jane Smith')
    await page.fill('#email', 'jane@example.com')
    await page.fill('#message', 'Test message')
    await page.click('button[type="submit"]')

    await expect(page.locator('button[type="submit"] span')).toHaveText('Sent!', { timeout: 4000 })
  })

  test('re-enables button and resets form after 3.5 seconds total', async ({ page }) => {
    await page.fill('#name', 'Jane Smith')
    await page.fill('#email', 'jane@example.com')
    await page.fill('#message', 'Test message')
    await page.click('button[type="submit"]')

    await expect(page.locator('button[type="submit"]')).toBeEnabled({ timeout: 6000 })
    await expect(page.locator('#name')).toHaveValue('')
    await expect(page.locator('#message')).toHaveValue('')
  })

  test('shows French loading text when language is FR', async ({ page }) => {
    await page.goto('/')
    await page.click('[data-lang="fr"]')
    await page.goto('/#contact')
    await page.locator('#contactForm').scrollIntoViewIfNeeded()

    await page.fill('#name', 'Jean Dupont')
    await page.fill('#email', 'jean@example.com')
    await page.fill('#message', 'Message de test')
    await page.click('button[type="submit"]')

    await expect(page.locator('button[type="submit"] span')).toHaveText('Envoi en cours...')
  })

  test('shows French success text after 1.5 seconds', async ({ page }) => {
    await page.goto('/')
    await page.click('[data-lang="fr"]')
    await page.goto('/#contact')
    await page.locator('#contactForm').scrollIntoViewIfNeeded()

    await page.fill('#name', 'Jean Dupont')
    await page.fill('#email', 'jean@example.com')
    await page.fill('#message', 'Message de test')
    await page.click('button[type="submit"]')

    await expect(page.locator('button[type="submit"] span')).toHaveText('Envoyé !', { timeout: 4000 })
  })
})
