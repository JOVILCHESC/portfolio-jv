import { readFile } from 'node:fs/promises'
import { test, expect } from '@playwright/test'

test('both CV actions download the exact supplied PDF from the application base', async ({
  page,
  request,
  baseURL,
}) => {
  await page.goto('./')
  const links = page.getByRole('link', { name: 'Descargar CV', exact: true })
  await expect(links).toHaveCount(2)
  const expectedURL = new URL('CV_Josue_Vilches.pdf', baseURL)
  const response = await request.get(expectedURL.href)
  expect(response.ok()).toBe(true)
  expect(response.headers()['content-type']).toContain('application/pdf')
  const original = await readFile(
    new URL('../public/CV_Josue_Vilches.pdf', import.meta.url),
  )
  expect((await response.body()).equals(original)).toBe(true)
  expect(original.subarray(0, 5).toString()).toBe('%PDF-')
  for (const link of await links.all()) {
    await expect(link).toHaveAttribute('href', expectedURL.pathname)
    await link.focus()
    const downloadEvent = page.waitForEvent('download')
    await page.keyboard.press('Enter')
    const download = await downloadEvent
    expect(download.suggestedFilename()).toBe('CV_Josue_Vilches.pdf')
    const file = await readFile(await download.path())
    expect(file.equals(original)).toBe(true)
  }
})

test('production assets, fonts and favicon load from the repository subpath', async ({
  page,
  request,
  baseURL,
}) => {
  const failures = []
  page.on('requestfailed', (entry) => failures.push(entry.url()))
  page.on('pageerror', (error) => failures.push(error.message))
  page.on('response', (response) => {
    if (!response.ok()) failures.push(`${response.status()} ${response.url()}`)
  })
  await page.goto('./')
  await page.evaluate(() => document.fonts.ready)
  const base = new URL(baseURL)
  const resources = await page.evaluate(() =>
    performance.getEntriesByType('resource').map((entry) => entry.name),
  )
  expect(resources.some((url) => url.endsWith('.js'))).toBe(true)
  expect(resources.some((url) => url.endsWith('.css'))).toBe(true)
  expect(resources.some((url) => url.endsWith('.woff2'))).toBe(true)
  for (const resource of resources) {
    const url = new URL(resource)
    expect(url.origin).toBe(base.origin)
    expect(url.pathname.startsWith(base.pathname)).toBe(true)
  }
  const favicon = await page.locator('link[rel="icon"]').getAttribute('href')
  expect(favicon).toBe(`${base.pathname}favicon.svg`)
  const response = await request.get(new URL(favicon, baseURL).href)
  expect(response.ok()).toBe(true)
  expect(response.headers()['content-type']).toContain('image/svg+xml')
  expect(failures).toEqual([])
})

test('prerendered metadata and CV use their production URLs before hydration', async ({
  page,
  request,
  baseURL,
}) => {
  const response = await request.get('./')
  const html = await response.text()
  expect(html).toContain(`${new URL(baseURL).pathname}CV_Josue_Vilches.pdf`)
  expect(html).not.toMatch(/localhost|127\.0\.0\.1|og:image/i)
  await page.goto('./')
  const productionURL = 'https://jovilchesc.github.io/portfolio-jv/'
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    productionURL,
  )
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
    'content',
    productionURL,
  )
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute(
    'content',
    'es_CL',
  )
  await expect(page.locator('a[target="_blank"]')).toHaveAttribute(
    'rel',
    /noreferrer/,
  )
})
