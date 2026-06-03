import { test, expect } from '@playwright/test'

test.describe('Navbar — scroll behaviour', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => window.scrollTo(0, 0))
  })

  test('navbar does not have "scrolled" class at top of page', async ({ page }) => {
    await expect(page.locator('#navbar')).not.toHaveClass(/scrolled/)
  })

  test('navbar gains "scrolled" class after scrolling past 50px', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 100))
    // Allow scroll event to fire
    await page.waitForTimeout(150)
    await expect(page.locator('#navbar')).toHaveClass(/scrolled/)
  })

  test('navbar loses "scrolled" class when scrolled back to top', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, 100))
    await page.waitForTimeout(150)
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(150)
    await expect(page.locator('#navbar')).not.toHaveClass(/scrolled/)
  })
})

test.describe('Navbar — mobile menu', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
  })

  test('mobile menu button is visible on small screens', async ({ page }) => {
    await expect(page.locator('#mobileMenuBtn')).toBeVisible()
  })

  test('opens the nav menu when hamburger is clicked', async ({ page }) => {
    await page.click('#mobileMenuBtn')
    await expect(page.locator('#navLinks')).toHaveClass(/active/)
  })

  test('hamburger button itself gets "active" class when menu is open', async ({ page }) => {
    await page.click('#mobileMenuBtn')
    await expect(page.locator('#mobileMenuBtn')).toHaveClass(/active/)
  })

  test('closes the menu when clicking a nav link', async ({ page }) => {
    await page.click('#mobileMenuBtn')
    await expect(page.locator('#navLinks')).toHaveClass(/active/)

    await page.click('.nav-link[href="#about"]')
    await expect(page.locator('#navLinks')).not.toHaveClass(/active/)
  })

  test('prevents body scroll while menu is open', async ({ page }) => {
    await page.click('#mobileMenuBtn')
    const overflow = await page.evaluate(() => document.body.style.overflow)
    expect(overflow).toBe('hidden')
  })

  test('restores body scroll when menu is closed via link click', async ({ page }) => {
    await page.click('#mobileMenuBtn')
    await page.click('.nav-link[href="#about"]')
    const overflow = await page.evaluate(() => document.body.style.overflow)
    expect(overflow).toBe('')
  })
})

test.describe('Navbar — smooth scroll', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('/')
  })

  test('clicking About link scrolls to the about section', async ({ page }) => {
    await page.click('.nav-link[href="#about"]')
    await page.waitForTimeout(800)
    await expect(page.locator('#about')).toBeInViewport()
  })

  test('clicking Services link scrolls to the services section', async ({ page }) => {
    await page.click('.nav-link[href="#services"]')
    await page.waitForTimeout(800)
    await expect(page.locator('#services')).toBeInViewport()
  })
})
