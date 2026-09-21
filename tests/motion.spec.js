import { test, expect } from '@playwright/test'

async function jumpTo(page, id) {
  await page.evaluate((sectionId) => {
    const top = sectionId
      ? document.getElementById(sectionId).offsetTop - 100
      : 0
    window.scrollTo({ top, behavior: 'instant' })
  }, id)
}

test('navigation follows scrolling and header progress has no layout footprint', async ({
  page,
}) => {
  await page.goto('/')
  const navigation = page.getByRole('navigation')
  const progress = page.locator('.scroll-progress')
  const headerHeight = await page
    .locator('.site-header')
    .evaluate((header) => header.offsetHeight)
  await expect(navigation.locator('[aria-current]')).toHaveCount(0)
  for (const section of [
    'about',
    'projects',
    'skills',
    'experience',
    'contact',
  ]) {
    await jumpTo(page, section)
    await expect(navigation.locator(`[href="#${section}"]`)).toHaveAttribute(
      'aria-current',
      'location',
    )
    await expect(navigation.locator('[aria-current]')).toHaveCount(1)
  }
  await page.evaluate(() =>
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'instant',
    }),
  )
  await expect(progress).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 0, 0)')
  expect(
    await page
      .locator('.site-header')
      .evaluate((header) => header.offsetHeight),
  ).toBe(headerHeight)
  await jumpTo(page, null)
  await expect(progress).toHaveCSS('transform', 'matrix(0, 0, 0, 1, 0, 0)')
  await expect(navigation.locator('[aria-current]')).toHaveCount(0)
})

test('reveals run once and timeline entries progress independently', async ({
  page,
}) => {
  await page.goto('/')
  const card = page.locator('.project-card').first()
  await expect(card).not.toHaveAttribute('data-revealed')
  await card.evaluate((element) => {
    element.dataset.animationCount = '0'
    element.addEventListener('animationstart', (event) => {
      if (event.target === element && event.animationName === 'reveal-in') {
        element.dataset.animationCount = String(
          Number(element.dataset.animationCount) + 1,
        )
      }
    })
  })
  await jumpTo(page, 'projects')
  await expect(card).toHaveAttribute('data-revealed', 'true')
  await expect(card).toHaveAttribute('data-animation-count', '1')
  await expect(card).toHaveCSS('opacity', '1')
  await jumpTo(page, 'education')
  const entries = page.locator('.timeline > section')
  await expect(entries.nth(1)).toHaveAttribute('data-revealed', 'true')
  await jumpTo(page, 'experience')
  await expect(entries.nth(0)).toHaveAttribute('data-revealed', 'true')
  await jumpTo(page, 'projects')
  await expect(card).toHaveCSS('opacity', '1')
  await expect(card).toHaveAttribute('data-animation-count', '1')
})

test('artwork tilt responds to a mouse, resets, and stops on reduced motion', async ({
  page,
}) => {
  await page.goto('/')
  const artwork = page.locator('.data-artwork')
  await artwork.hover({ position: { x: 40, y: 40 } })
  await expect
    .poll(() =>
      artwork.evaluate((element) => element.style.getPropertyValue('--tilt-x')),
    )
    .not.toBe('')
  await page.mouse.move(0, 0)
  await expect
    .poll(() =>
      artwork.evaluate((element) => element.style.getPropertyValue('--tilt-x')),
    )
    .toBe('')
  await artwork.hover({ position: { x: 40, y: 40 } })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect
    .poll(() =>
      artwork.evaluate((element) => element.style.getPropertyValue('--tilt-x')),
    )
    .toBe('')
  await expect(artwork.locator('.artwork-icon')).toHaveCSS(
    'animation-name',
    'none',
  )
  await artwork.hover({ position: { x: 70, y: 70 } })
  expect(
    await artwork.evaluate((element) =>
      element.style.getPropertyValue('--tilt-x'),
    ),
  ).toBe('')
})

test('touch devices do not tilt the artwork or lift project cards', async ({
  browser,
}) => {
  const context = await browser.newContext({
    hasTouch: true,
    isMobile: true,
    viewport: { width: 390, height: 844 },
  })
  const page = await context.newPage()
  await page.goto('http://127.0.0.1:4173/')
  expect(
    await page.evaluate(() => matchMedia('(pointer: coarse)').matches),
  ).toBe(true)
  const artwork = page.locator('.data-artwork')
  await artwork.dispatchEvent('pointerenter', {
    pointerType: 'touch',
    clientX: 50,
    clientY: 50,
  })
  await artwork.dispatchEvent('pointermove', {
    pointerType: 'touch',
    clientX: 70,
    clientY: 70,
  })
  expect(
    await artwork.evaluate((element) =>
      element.style.getPropertyValue('--tilt-x'),
    ),
  ).toBe('')
  const card = page.locator('.project-card').first()
  await card.scrollIntoViewIfNeeded()
  await expect(card).toHaveCSS('opacity', '1')
  await card.tap()
  await expect(card).toHaveCSS('transform', 'none')
  await context.close()
})

test('reduced motion disables all decorative movement and preserves active navigation', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await expect(page.locator('.scroll-progress')).toBeHidden()
  await expect(page.locator('.artwork-icon')).toHaveCSS(
    'animation-name',
    'none',
  )
  await jumpTo(page, 'projects')
  const card = page.locator('.project-card').first()
  await card.hover()
  await expect(card).toHaveCSS('transform', 'none')
  await expect(card).toHaveCSS('animation-name', 'none')
  await expect(card.locator('.project-visual')).toHaveCSS('translate', 'none')
  await expect(page.locator('.navigation [href="#projects"]')).toHaveAttribute(
    'aria-current',
    'location',
  )
  expect(
    await page.evaluate(
      () =>
        document
          .getAnimations()
          .filter((animation) => animation.playState === 'running').length,
    ),
  ).toBe(0)
})

test('project focus styling supports optional links without adding empty tab stops', async ({
  page,
}) => {
  await page.goto('/')
  const card = page.locator('.project-card').first()
  await expect(card).not.toHaveAttribute('tabindex')
  // Exercise the optional-link focus path without changing real portfolio data.
  await card.evaluate((element) => {
    const link = document.createElement('a')
    link.href = '#contact'
    link.textContent = 'Test link'
    element.querySelector('.project-body').append(link)
  })
  await card.getByRole('link', { name: 'Test link' }).focus()
  await expect(card).toHaveCSS('outline-style', 'solid')
  await expect(card.locator('.project-visual')).toHaveCSS(
    'translate',
    '0px -3px',
  )
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/#contact$/)
})

test('content stays visible if IntersectionObserver is unavailable', async ({
  page,
}) => {
  await page.addInitScript(() => {
    delete window.IntersectionObserver
  })
  await page.goto('/')
  await jumpTo(page, 'projects')
  await expect(page.locator('.project-card').first()).toHaveCSS('opacity', '1')
  await expect(page.locator('.project-card').first()).toHaveCSS(
    'animation-name',
    'none',
  )
  await expect(page.locator('.navigation [href="#projects"]')).toHaveAttribute(
    'aria-current',
    'location',
  )
})

for (const width of [390, 1440]) {
  test(`static portfolio and navigation work without JavaScript at ${width}px`, async ({
    browser,
  }) => {
    const context = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width, height: 960 },
    })
    const page = await context.newPage()
    await page.goto('http://127.0.0.1:4173/')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.locator('.project-card')).toHaveCount(3)
    await expect(page.locator('#education')).toBeVisible()
    const projectsLink = page
      .getByRole('navigation')
      .getByRole('link', { name: 'Proyectos', exact: true })
    await projectsLink.focus()
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/#projects$/)
    await expect(page.locator('.project-card').first()).toHaveCSS(
      'opacity',
      '1',
    )
    const details = page.locator('.project-details').first()
    await details.locator('summary').focus()
    await page.keyboard.press('Enter')
    await expect(details).toHaveAttribute('open', '')
    await expect(
      details.getByText('Mi contribución', { exact: true }),
    ).toBeVisible()
    await context.close()
  })
}

test('static content survives a failed JavaScript download', async ({
  page,
}) => {
  await page.route('**/assets/*.js', (route) => route.abort())
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(page.locator('.project-card')).toHaveCount(3)
  await page
    .getByRole('link', { name: 'Explorar proyectos', exact: true })
    .click()
  await expect(page).toHaveURL(/#projects$/)
})
