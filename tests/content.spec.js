import { test, expect } from '@playwright/test'

test('publishes verified identity, internship, education and contact channels', async ({
  page,
}) => {
  await page.goto('/')
  await expect(page.locator('.hero-headline')).toHaveText(
    'Ingeniería Civil en Computación e Informática | Desarrollo, Datos y Soporte TI',
  )
  await expect(page.locator('#about')).toContainText(
    'Alto Hospicio, Tarapacá, Chile',
  )
  const experience = page.locator('#experience')
  await expect(experience).toContainText(
    'Practicante — Desarrollo Web y Soporte TI',
  )
  await expect(experience).toContainText('YMCA Iquique')
  await expect(experience).toContainText('Enero 2025 - Febrero 2025')
  await expect(experience).toContainText('Visual Composer')
  await expect(experience).toContainText('diagnóstico inicial')
  const education = page.locator('#education')
  await expect(education).toContainText('Universidad Arturo Prat (UNAP)')
  await expect(education).toContainText('2021 - Actualidad')
  await expect(education).toContainText('Iquique, Tarapacá, Chile')
  await expect(education).toContainText(
    'pendiente únicamente de Práctica Profesional II',
  )
  await expect(education).toContainText('Cisco Networking Academy')
  await expect(education).toContainText('Introducción a la Ciberseguridad')
  await expect(education).toContainText('Gestión de Amenazas Cibernéticas')
  await expect(page.locator('#contact a[href^="mailto:"]')).toHaveAttribute(
    'href',
    'mailto:castro.samjv@gmail.com',
  )
  await expect(
    page.locator('#contact').getByRole('link', { name: 'GitHub' }),
  ).toHaveAttribute('href', 'https://github.com/JOVILCHESC')
  await expect(
    page.locator('a[download], a[href^="tel:"], a[href*="linkedin.com"]'),
  ).toHaveCount(0)
})

test('distinguishes team development from documented individual contributions', async ({
  page,
}) => {
  await page.goto('/')
  const datamart = page.getByRole('article', {
    name: 'Datamart y Business Intelligence Inmobiliario',
    exact: true,
  })
  const mining = page.getByRole('article', {
    name: 'Data Mining y Machine Learning Inmobiliario',
    exact: true,
  })
  const vision = page.getByRole('article', {
    name: 'IA Aplicada y Visión Computacional',
    exact: true,
  })
  for (const card of [datamart, mining]) {
    await expect(card.locator('time')).toHaveText('2026')
    await expect(card.locator('time')).toHaveAttribute('datetime', '2026')
    await expect(card.locator('.project-description')).toContainText(
      'académico en equipo',
    )
  }
  await expect(vision.locator('time')).toHaveCount(0)
  for (const card of [datamart, mining, vision]) {
    await card.locator('summary').focus()
    await page.keyboard.press('Enter')
    await expect(card.locator('dt')).toHaveText([
      'Objetivo',
      'Desarrollo del proyecto',
      'Mi contribución',
      'Resultado',
    ])
    await expect(card.locator('.project-technologies')).toBeVisible()
    await expect(card.locator('.visual-caption')).toHaveText(
      'Ilustración conceptual',
    )
    await expect(card.locator('.project-links a')).toHaveCount(0)
  }
  await expect(
    datamart
      .locator('dt')
      .filter({ hasText: 'Mi contribución' })
      .locator('+ dd'),
  ).toContainText('integrante del equipo académico')
  await expect(
    mining.locator('dt').filter({ hasText: 'Mi contribución' }).locator('+ dd'),
  ).toContainText('Analista Data Mining — Preparación de Datos y ETL')
  await expect(
    mining
      .locator('dt')
      .filter({ hasText: 'Desarrollo del proyecto' })
      .locator('+ dd'),
  ).toContainText('El equipo siguió CRISP-DM')
  await expect(mining).toContainText('control de fuga de información')
  await expect(mining).toContainText('simulación de despliegue')
  await expect(mining).toContainText('React y FastAPI')
  await expect(vision).toContainText(
    'modelo de visión computacional preentrenado',
  )
  await expect(vision).toContainText('API de Google AI Studio')
})

test('public HTML and metadata exclude withdrawn topics and unreviewed metrics', async ({
  request,
}) => {
  const response = await request.get('/')
  const html = await response.text()
  expect(html).not.toMatch(
    /MARL|Multi-Agent Reinforcement Learning|Dynamic Scheduling|SimPy|planificación dinámica|refuerzo multiagente|tesis|R²|accuracy|recall|\bF1\b|\bMAE\b|\bRMSE\b|\bMAPE\b|sale.?year|predictor columns/i,
  )
  expect(html).toContain('Ingeniería Civil en Computación e Informática')
  expect(html).toContain('Data Mining')
  expect(html).toContain('Power BI')
  expect(html).toContain('castro.samjv@gmail.com')
})

test('skills avoid duplicated items and distinguish AI tools from frameworks', async ({
  page,
}) => {
  await page.goto('/')
  const items = await page.locator('#skills .skill-list li').allTextContents()
  expect(new Set(items).size).toBe(items.length)
  expect(items).toEqual(
    expect.arrayContaining([
      'Power BI',
      'Microsoft Excel',
      'PostgreSQL',
      'Python',
      'React',
      'FastAPI',
      'WordPress',
      'scikit-learn',
      'MongoDB',
      'Cisco Packet Tracer',
    ]),
  )
  await expect(page.locator('.skill-tools')).toContainText(
    'Herramientas de IA de apoyo',
  )
  await expect(page.locator('.skill-tools li')).toHaveText([
    'Gemini',
    'NotebookLM',
    'ChatGPT',
  ])
})

test('expanding real project details preserves navigation and scroll progress', async ({
  page,
}) => {
  await page.goto('/')
  const card = page.locator('.project-card').nth(1)
  const summary = card.locator('summary')
  await summary.focus()
  await page.keyboard.press('Enter')
  await expect(card.locator('details')).toHaveAttribute('open', '')
  await expect(card).toHaveCSS('outline-style', 'solid')
  await page.locator('.project-card').first().locator('summary').focus()
  await expect(card).toHaveCSS('animation-name', 'none')
  await expect(card).toHaveCSS('opacity', '1')
  await expect(page.locator('.navigation [href="#projects"]')).toHaveAttribute(
    'aria-current',
    'location',
  )
  await page.evaluate(() =>
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'instant',
    }),
  )
  await expect(page.locator('.scroll-progress')).toHaveCSS(
    'transform',
    'matrix(1, 0, 0, 1, 0, 0)',
  )
  await expect(page.locator('.navigation [href="#contact"]')).toHaveAttribute(
    'aria-current',
    'location',
  )
})
