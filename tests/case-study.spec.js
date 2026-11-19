import { readFile } from 'node:fs/promises'
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const route = 'projects/deteccion-epp/'

test('home links to a real project page with direct access, reload and return navigation', async ({
  page,
  request,
  baseURL,
}) => {
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  page.on('response', (response) => {
    if (response.status() >= 400) errors.push(response.url())
  })
  await page.goto('./')
  await page.getByRole('link', { name: 'Ver proyecto', exact: true }).click()
  await expect(page).toHaveURL(new URL(route, baseURL).href)
  await expect(page).toHaveTitle(
    'Vigía — Detección de EPP | Josué Vilches Castro',
  )
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'La seguridad, a la vista.',
  )
  await page.reload()
  await expect(page.locator('#project-title')).toBeVisible()
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://jovilchesc.github.io/portfolio-jv/projects/deteccion-epp/',
  )
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    'content',
    'https://jovilchesc.github.io/portfolio-jv/projects/deteccion-epp/',
  )
  const response = await request.get(route)
  expect(response.status()).toBe(200)
  const html = await response.text()
  expect(html).toContain('La seguridad,')
  expect(html).toContain('La cámara no está disponible.')
  expect(html).not.toMatch(/og:image|localhost|127\.0\.0\.1/)
  const file = await readFile('dist/projects/deteccion-epp/index.html', 'utf8')
  expect(file).toContain(
    '<title>Vigía — Detección de EPP | Josué Vilches Castro</title>',
  )
  await page
    .getByRole('link', { name: 'Volver a proyectos', exact: true })
    .click()
  await expect(page).toHaveURL(new URL('#projects', baseURL).href)
  expect(errors).toEqual([])
})

test('all six authentic screenshots load and the viewer supports keyboard, zoom and focus return', async ({
  page,
  request,
}) => {
  await page.goto(route)
  const views = page
    .getByRole('navigation', { name: 'Vistas del sistema' })
    .getByRole('link')
  await expect(views).toHaveCount(6)
  for (const view of await views.all()) {
    await view.click()
    await expect(view).toHaveAttribute('aria-current', 'true')
    const image = page.locator('.gallery-image img')
    await expect(image).toBeVisible()
    await expect
      .poll(() => image.evaluate((img) => img.complete && img.naturalWidth > 0))
      .toBe(true)
    const original = await request.get(await view.getAttribute('href'))
    expect(original.status()).toBe(200)
    expect(original.headers()['content-type']).toContain('image/png')
  }
  const trigger = page.getByRole('link', {
    name: 'Ampliar: Historial móvil',
    exact: true,
  })
  await trigger.focus()
  await page.keyboard.press('Enter')
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  await expect(
    dialog.getByRole('button', { name: 'Cerrar', exact: true }),
  ).toBeFocused()
  await page.keyboard.press('Shift+Tab')
  await expect(
    dialog.getByRole('link', { name: 'Descargar PNG' }),
  ).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(
    dialog.getByRole('button', { name: 'Cerrar', exact: true }),
  ).toBeFocused()
  await dialog.getByRole('button', { name: 'Tamaño original' }).click()
  await expect(dialog.locator('.image-dialog-scroll')).toHaveClass(
    /is-original/,
  )
  await page.keyboard.press('ArrowRight')
  await expect(dialog.getByRole('heading')).toHaveText('Dashboard')
  await page.keyboard.press('ArrowLeft')
  await expect(dialog.getByRole('heading')).toHaveText('Historial móvil')
  await page.keyboard.press('Escape')
  await expect(dialog).not.toBeVisible()
  await expect(trigger).toBeFocused()
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe(
    'hidden',
  )
})

for (const width of [360, 390, 768, 1024, 1440]) {
  test(`case study and viewer remain accessible without overflow at ${width}px`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width, height: 960 })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto(route)
    await page.evaluate(() => document.fonts.ready)
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true)
    expect(
      await page.evaluate(
        () =>
          document
            .getAnimations()
            .filter((animation) => animation.playState === 'running').length,
      ),
    ).toBe(0)
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()
    expect(results.violations).toEqual([])
    if (width === 390 || width === 1440)
      await page.screenshot({
        path: testInfo.outputPath(`case-study-${width}.png`),
        fullPage: true,
      })
    await page
      .getByRole('link', { name: 'Ampliar: Dashboard', exact: true })
      .click()
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    const modalResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()
    expect(modalResults.violations).toEqual([])
    const bounds = await dialog.boundingBox()
    expect(bounds.x).toBeGreaterThanOrEqual(0)
    expect(bounds.x + bounds.width).toBeLessThanOrEqual(width)
    await page.keyboard.press('Escape')
    if (width < 800)
      await page.getByRole('button', { name: 'Abrir menú' }).click()
    await page
      .getByRole('navigation', { name: 'Navegación principal' })
      .getByRole('link', { name: 'Sobre mí', exact: true })
      .click()
    await expect(page).toHaveURL(/\/portfolio-jv\/#about$/)
  })
}

test('project content, screenshot links and home navigation survive without JavaScript', async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL,
    viewport: { width: 390, height: 844 },
  })
  try {
    const page = await context.newPage()
    await page.goto(route)
    await expect(page.locator('#project-title')).toBeVisible()
    await expect(page.locator('#status')).toContainText(
      'la condición heredada todavía las exige',
    )
    await expect(
      page
        .getByRole('navigation', { name: 'Vistas del sistema' })
        .getByRole('link'),
    ).toHaveCount(6)
    await page
      .getByRole('link', { name: 'Ampliar: Dashboard', exact: true })
      .click()
    await expect(page).toHaveURL(/\/projects\/epp\/dashboard\.png$/)
    await page.goBack()
    await page
      .getByRole('link', { name: 'Volver a proyectos', exact: true })
      .click()
    await expect(page.locator('#projects')).toBeVisible()
  } finally {
    await context.close()
  }
})
