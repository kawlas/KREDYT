import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const toAbsolute = (p) => path.resolve(__dirname, p)

const manifest = JSON.parse(fs.readFileSync(toAbsolute('dist/static/.vite/manifest.json'), 'utf-8'))
const template = fs.readFileSync(toAbsolute('dist/static/index.html'), 'utf-8')
const { render } = await import('./dist/server/entry-server.js')

// Determine routes to prerender
const baseRoutes = [
  '/',
  '/kalkulator-raty-kredytu/',
  '/raty-rowne-czy-malejace/',
  '/symulacja-wibor/',
  '/zdolnosc-kredytowa/',
  '/faq-kredyt-hipoteczny/',
  '/o-projekcie/',
  '/metodologia/',
  '/kontakt/',
  '/polityka-prywatnosci/',
  '/404/'
]

// Extract topic routes — match slug as an object property (not inside comments or strings)
function extractTopicSlugs(source) {
  // Remove single-line and block comments first
  const noComments = source
    .replace(/\/\/.*$/gm, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
  const re = /^\s*slug:\s*['"]([^'"]+)['"]/gm
  return Array.from(noComments.matchAll(re), m => `/${m[1]}/`)
}

const topicsContent = fs.readFileSync(toAbsolute('src/data/topics.ts'), 'utf-8')
const topicRoutes = extractTopicSlugs(topicsContent)

const routesToPrerender = Array.from(new Set([...baseRoutes, ...topicRoutes]))

;(async () => {
  for (const url of routesToPrerender) {
    const context = {}
    const helmetContext = {}

    const appHtml = render(url, helmetContext)
    const { helmet } = helmetContext

    // Strip AdSense/Google scripts from helmet to avoid double injection
    // (the hardcoded AdSense loader is already in index.html)
    const scriptStr = helmet.script.toString()
      .replace(/<script[^>]*adsbygoogle[^>]*><\/script>/gi, '')
      .replace(/<script[^>]*googlesyndication[^>]*><\/script>/gi, '')

    const html = template
      .replace('<!--app-head-->', `
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
        ${scriptStr}
      `)
      .replace('<!--app-html-->', appHtml)

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
  ${routesToPrerender
    .filter(route => route !== '/404/')
    .map(route => `
  <url>
    <loc>https://kalkulatorkredytowy.pl${route}</loc>
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
Disallow: /404/
Disallow: /kontakt/
Disallow: /polityka-prywatnosci/

# AI crawlers — content jest publiczny
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: Applebot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Allow: /

Sitemap: https://kalkulatorkredytowy.pl/sitemap.xml`

  fs.writeFileSync(toAbsolute('dist/static/robots.txt'), robots)
  console.log('Generated robots.txt')

})()
