import { readFile, writeFile } from 'node:fs/promises'
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
  const html = await readFile('dist/index.html', 'utf8')
  const root = '<div id="root"></div>'
  if (!html.includes(root)) throw new Error('Missing prerender root')
  await writeFile(
    'dist/index.html',
    html.replace(
      root,
      () => `<div id="root">${renderToString(createElement(App))}</div>`,
    ),
  )
} finally {
  await server.close()
}
