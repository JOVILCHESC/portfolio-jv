import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { createServer } from 'vite'
import viteConfig from '../vite.config.js'

// Render from the same components so content also survives a failed script download.
const server = await createServer({
  ...viteConfig,
  configFile: false,
  server: { middlewareMode: true },
  appType: 'custom',
})

try {
  const { default: App } = await server.ssrLoadModule('/src/App.jsx')
  const { caseStudies } = await server.ssrLoadModule('/src/data/caseStudies.js')
  const html = await readFile('dist/index.html', 'utf8')
  const root = '<div id="root"></div>'
  if (!html.includes(root)) throw new Error('Missing prerender root')
  const escape = (value) =>
    value
      .replaceAll('&', '&amp;')
      .replaceAll('"', '&quot;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
  for (const project of [null, ...caseStudies]) {
    const path = project?.path ?? ''
    const pathname = `${viteConfig.base}${path}`
    let page = html.replace(
      root,
      () =>
        `<div id="root">${renderToString(createElement(App, { pathname }))}</div>`,
    )
    if (project) {
      const url = `https://jovilchesc.github.io${pathname}`
      page = page
        .replace(
          /<title>[^<]*<\/title>/,
          () => `<title>${escape(project.metaTitle)}</title>`,
        )
        .replace(
          /(<link rel="canonical" href=")[^"]*/,
          (_, prefix) => prefix + escape(url),
        )
      for (const [name, value] of [
        ['description', project.metaDescription],
        ['og:title', project.metaTitle],
        ['og:description', project.metaDescription],
        ['og:url', url],
      ]) {
        page = page.replace(
          new RegExp(
            `(<meta\\s+(?:name|property)="${name}"\\s+content=")[^"]*`,
          ),
          (_, prefix) => prefix + escape(value),
        )
      }
    }
    const output = `dist/${path}index.html`
    await mkdir(dirname(output), { recursive: true })
    await writeFile(output, page)
    console.log(`Prerendered ${pathname}`)
  }
} finally {
  await server.close()
}
