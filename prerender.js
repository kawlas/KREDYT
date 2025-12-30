import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const toAbsolute = (p) => path.resolve(__dirname, p)

const manifest = JSON.parse(fs.readFileSync(toAbsolute('dist/static/.vite/manifest.json'), 'utf-8'))
const template = fs.readFileSync(toAbsolute('dist/static/index.html'), 'utf-8')
const { render } = await import('./dist/server/entry-server.js')

// Determine routes to prerender
const routesToPrerender = [
  '/',
  '/kalkulator-raty-kredytu/',
  '/raty-rowne-czy-malejace/',
  '/symulacja-wibor/',
  '/zdolnosc-kredytowa/',
  '/faq-kredyt-hipoteczny/',
  '/o-projekcie/',
  '/metodologia/',
  '/kontakt/',
  '/polityka-prywatnosci/'
]

;(async () => {
  for (const url of routesToPrerender) {
    const context = {}
    const helmetContext = {}

    const appHtml = render(url, helmetContext)
    const { helmet } = helmetContext

    const html = template
      .replace(`<!--app-head-->`, `
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        ${helmet.script.toString()}
      `)
      .replace(`<!--app-html-->`, appHtml)

    const filePath = `dist/static${url === '/' ? '/index.html' : url + 'index.html'}`
    const dir = path.dirname(filePath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    
    fs.writeFileSync(filePath, html)
    console.log('Prerendered:', filePath)
  }

  // Generate sitemap.xml
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routesToPrerender.map(route => `
  <url>
    <loc>https://kredytkalkulator.netlify.app${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>
  `).join('').trim()}
</urlset>`

  fs.writeFileSync(toAbsolute('dist/static/sitemap.xml'), sitemap)
  console.log('Generated sitemap.xml')

  // Generate robots.txt
  const robots = `User-agent: *
Allow: /

Sitemap: https://kredytkalkulator.netlify.app/sitemap.xml`

  fs.writeFileSync(toAbsolute('dist/static/robots.txt'), robots)
  console.log('Generated robots.txt')

})()
