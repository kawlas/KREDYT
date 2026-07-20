import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
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
  '/ltv-kalkulator/',
  '/ukryte-koszty-kredytu/',
  '/raty-rowne-czy-malejace/',
  '/stale-vs-zmienne-oprocentowanie/',
  '/symulacja-wibor/',
  '/zdolnosc-kredytowa/',
  '/symulator-nadplat/',
  '/odsetki-dzienne/',
  '/refinansowanie-kredytu/',
  '/porownanie-ofert-bankow/',
  '/faq-kredyt-hipoteczny/',
  '/co-wplywa-na-zdolnosc/',
  '/przygotowanie-do-kredytu/',
  '/koszt-utrzymania-nieruchomosci/',
  '/o-projekcie/',
  '/metodologia/',
  '/kontakt/',
  '/polityka-prywatnosci/',
  '/404/',
  '/polityka-redakcyjna/',
  '/poradniki/',
  '/poradniki/jak-obliczyc-rate/',
  '/poradniki/zdolnosc-kredytowa/',
  '/poradniki/wibor-a-rata/',
  '/mity-kredytowe/',
  '/kalkulator-prowizji/',
  '/kalkulator-ubezpieczen/',
  '/kredyt-vs-wynajem/'
]

// Extract topic routes — match slug as an object property (not inside comments or strings)
function extractTopicSlugs(source) {  // Remove single-line and block comments first
  const noComments = source
    .replace(/\/\/.*$/gm, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
  const re = /^\s*slug:\s*['"]([^'"]+)['"]/gm
  return Array.from(noComments.matchAll(re), m => `/${m[1]}/`)
}

const topicsContent = fs.readFileSync(toAbsolute('src/data/topics.ts'), 'utf-8')
const topicRoutes = extractTopicSlugs(topicsContent)

const routesToPrerender = Array.from(new Set([...baseRoutes, ...topicRoutes]))

/**
 * Build a per-page Content-Security-Policy with SHA-256 hashes of every
 * inline <script> (the consent/gtag block + react-helmet JSON-LD blocks).
 * This lets us drop 'unsafe-inline' from script-src while still allowing the
 * exact inline scripts we ship. style-src keeps 'unsafe-inline' because React
 * renders inline `style` attributes.
 */
function buildCsp(html) {
  const re = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi
  const hashes = new Set()
  let m
  while ((m = re.exec(html))) {
    const body = m[1]
    if (!body.trim()) continue
    const hash = crypto.createHash('sha256').update(body).digest('base64')
    hashes.add(`'sha256-${hash}'`)
  }
  const scriptSrc = `'self' ${[...hashes].join(' ')} https://pagead2.googlesyndication.com`
  return [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self'",
    "img-src 'self' data: https:",
    "connect-src 'self' https://stooq.pl https://bankier.pl https://api.nbp.pl",
    "frame-src https://googleads.g.doubleclick.net",
  ].join('; ')
}

;(async () => {
  for (const url of routesToPrerender) {
    const context = {}
    const helmetContext = {}

    const appHtml = await render(url, helmetContext)
    const { helmet } = helmetContext

    // Strip AdSense/Google scripts from helmet to avoid double injection
    // (the hardcoded AdSense loader is already in index.html)
    const scriptStr = helmet.script.toString()
      .replace(/<script[^>]*adsbygoogle[^>]*><\/script>/gi, '')
      .replace(/<script[^>]*googlesyndication[^>]*><\/script>/gi, '')

    // Clean template from hardcoded SEO tags that helmet will replace
    let cleanTemplate = template
      .replace(/\s*<title>[^<]*<\/title>/, '')
      .replace(/\s*<meta name="description"[^>]*>/g, '')
      .replace(/\s*<meta name="keywords"[^>]*>/g, '')
      .replace(/\s*<link rel="canonical"[^>]*>/g, '')
      .replace(/\s*<meta property="og:image"[^>]*>/g, '')
      .replace(/\n{2,}/g, '\n')  // collapse multiple empty lines

    const html = cleanTemplate
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

    // Inject a per-page CSP (hashes for our inline scripts) into <head>.
    const csp = buildCsp(html)
    const htmlWithCsp = html.replace(
      '<head>',
      `<head>\n    <meta http-equiv="Content-Security-Policy" content="${csp}" />`
    )

    fs.writeFileSync(filePath, htmlWithCsp)
    console.log('Prerendered:', filePath)
  }

  // Generate sitemap.xml
  const priorityMap = {
    '/': '1.0',
    '/kalkulator-raty-kredytu/': '0.9',
    '/zdolnosc-kredytowa/': '0.9',
    '/symulacja-wibor/': '0.9',
    '/ltv-kalkulator/': '0.9',
    '/symulator-nadplat/': '0.9',
    '/refinansowanie-kredytu/': '0.9',
    '/porownanie-ofert-bankow/': '0.9',
    '/raty-rowne-czy-malejace/': '0.8',
    '/stale-vs-zmienne-oprocentowanie/': '0.8',
    '/odsetki-dzienne/': '0.8',
    '/kredyt-vs-wynajem/': '0.8',
    '/ukryte-koszty-kredytu/': '0.8',
    '/koszt-utrzymania-nieruchomosci/': '0.8',
    '/kalkulator-prowizji/': '0.8',
    '/kalkulator-ubezpieczen/': '0.8',
    '/faq-kredyt-hipoteczny/': '0.7',
    '/poradniki/': '0.7',
    '/poradniki/jak-obliczyc-rate/': '0.7',
    '/poradniki/zdolnosc-kredytowa/': '0.7',
    '/poradniki/wibor-a-rata/': '0.7',
    '/mity-kredytowe/': '0.7',
    '/co-wplywa-na-zdolnosc/': '0.7',
    '/przygotowanie-do-kredytu/': '0.7',
    '/o-projekcie/': '0.5',
    '/metodologia/': '0.5',
    '/kontakt/': '0.5',
    '/polityka-prywatnosci/': '0.3',
    '/polityka-redakcyjna/': '0.3',
  }
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routesToPrerender
    .filter(route => route !== '/404/')
    .map(route => `
  <url>
    <loc>https://kredytkalkulator.netlify.app${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priorityMap[route] || '0.8'}</priority>
  </url>
  `).join('').trim()}
</urlset>`

  fs.writeFileSync(toAbsolute('dist/static/sitemap.xml'), sitemap)
  console.log('Generated sitemap.xml')

  // Generate robots.txt
  const robots = `User-agent: *
Allow: /
Disallow: /404/

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

Sitemap: https://kredytkalkulator.netlify.app/sitemap.xml

# LLM/AI crawlers — structured content directory
# See https://llmstxt.org/ for the specification
# llms.txt: https://kredytkalkulator.netlify.app/llms.txt`

  fs.writeFileSync(toAbsolute('dist/static/robots.txt'), robots)
  console.log('Generated robots.txt')

  // Copy /404/index.html to /404.html for Netlify custom 404 page
  const notFoundSrc = toAbsolute('dist/static/404/index.html')
  const notFoundDst = toAbsolute('dist/static/404.html')
  if (fs.existsSync(notFoundSrc)) {
    fs.copyFileSync(notFoundSrc, notFoundDst)
    console.log('Copied 404.html')
  }

})()
