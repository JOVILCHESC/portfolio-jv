import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('renders the portfolio without runtime errors or broken local links', async ({
  page,
}) => {
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  page.on('response', (response) => {
    if (response.status() >= 400)
      errors.push(`${response.status()} ${response.url()}`)
  })
  await page.goto('./')
  await expect(page).toHaveTitle(/Josué Vilches Castro/)
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1)
  await expect(page.locator('.project-card')).toHaveCount(3)
  for (const id of [
    'about',
    'projects',
    'skills',
    'experience',
    'education',
    'contact',
  ]) {
    await expect(page.locator(`#${id}`)).toBeVisible()
  }
  const brokenAnchors = await page
    .locator('a[href^="#"]')
    .evaluateAll((links) =>
      links
        .filter((link) => !document.querySelector(link.getAttribute('href')))
        .map((link) => link.outerHTML),
    )
  expect(brokenAnchors).toEqual([])
  await expect(page.locator('a[download]')).toHaveCount(2)
  await expect(
    page.locator('a[href="mailto:castro.samjv@gmail.com"]'),
  ).toHaveCount(1)
  await page
    .getByRole('link', { name: 'Explorar proyectos', exact: true })
    .click()
  await expect(page).toHaveURL(/#projects$/)
  expect(errors).toEqual([])
})

for (const width of [360, 390, 768, 1024, 1440]) {
  test(`fits viewport and passes accessibility checks at ${width}px`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width, height: 960 })
    await page.goto('./')
    await page.evaluate(() => document.fonts.ready)
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true)
    const clippedProjectContent = await page
      .locator('.project-card')
      .evaluateAll(
        (cards) =>
          cards.filter((card) => {
            const cardBounds = card.getBoundingClientRect()
            const bodyBounds = card
              .querySelector('.project-body')
              .getBoundingClientRect()
            return (
              bodyBounds.bottom > cardBounds.bottom ||
              bodyBounds.right > cardBounds.right
            )
          }).length,
      )
    expect(clippedProjectContent).toBe(0)
    await expect
      .poll(() =>
        page.evaluate(
          () =>
            document
              .getAnimations()
              .filter((animation) => animation.playState === 'running').length,
        ),
      )
      .toBe(0)
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()
    expect(results.violations).toEqual([])
    for (const details of await page.locator('.project-details').all()) {
      await details.locator('summary').focus()
      await page.keyboard.press('Enter')
      await expect(details).toHaveAttribute('open', '')
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true)
    const expandedOverflow = await page
      .locator('.project-card')
      .evaluateAll((cards) =>
        cards.some((card) => {
          const cardBounds = card.getBoundingClientRect()
          const bodyBounds = card
            .querySelector('.project-body')
            .getBoundingClientRect()
          return (
            bodyBounds.bottom > cardBounds.bottom + 1 ||
            bodyBounds.right > cardBounds.right + 1
          )
        }),
      )
    expect(expandedOverflow).toBe(false)
    await expect
      .poll(() =>
        page.evaluate(
          () =>
            document
              .getAnimations()
              .filter((animation) => animation.playState === 'running').length,
        ),
      )
      .toBe(0)
    const expandedResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()
    expect(expandedResults.violations).toEqual([])
    if (width === 390 || width === 1440) {
      await page.locator('#projects').screenshot({
        path: testInfo.outputPath(`project-details-${width}.png`),
      })
    }
    for (const details of await page.locator('.project-details').all()) {
      await details.locator('summary').focus()
      await page.keyboard.press('Enter')
      await expect(details).not.toHaveAttribute('open')
    }
    await page.evaluate(() => {
      document.activeElement.blur()
      window.scrollTo({ top: 0, behavior: 'instant' })
    })
    if (width === 390 || width === 1440) {
      await page.screenshot({
        path: testInfo.outputPath(`portfolio-${width}.png`),
        fullPage: true,
      })
    }
  })
}

test('mobile menu supports navigation, Escape, and keyboard focus', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('./')
  const menu = page.getByRole('button', { name: /menú/ })
  const navigation = page.getByRole('navigation')
  await expect(navigation).toBeHidden()
  await page.keyboard.press('Tab')
  await expect(
    page.getByRole('link', { name: 'Saltar al contenido' }),
  ).toBeFocused()
  await menu.click()
  await expect(menu).toHaveAttribute('aria-expanded', 'true')
  await expect(navigation).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(menu).toBeFocused()
  await expect(navigation).toBeHidden()
  await menu.click()
  await navigation.getByRole('link', { name: 'Proyectos', exact: true }).click()
  await expect(navigation).toBeHidden()
  await expect(page).toHaveURL(/#projects$/)
})

test('respects reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('./')
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe('auto')
})
