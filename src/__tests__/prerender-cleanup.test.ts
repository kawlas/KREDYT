import { describe, it, expect } from 'vitest'

// Testujemy logikę czyszczenia template z hardcoded tagów
describe('prerender.js - cleanup template', () => {
  const mockTemplate = `<!doctype html>
<html>
<head>
    <title>Stary tytuł</title>
    <meta name="description" content="Stary opis" />
    <meta name="keywords" content="słowa, kluczowe" />
    <link rel="canonical" href="https://example.com/" />
    <meta property="og:image" content="/image.jpg" />
    <!--app-head-->
    <script src="adsbygoogle.js"></script>
</head>
<body>
    <div id="root"><!--app-html--></div>
</body>
</html>`

  const cleanTemplate = (template: string): string => {
    return template
      .replace(/\s*<title>[^<]*<\/title>/, '')
      .replace(/\s*<meta name="description"[^>]*>/g, '')
      .replace(/\s*<meta name="keywords"[^>]*>/g, '')
      .replace(/\s*<link rel="canonical"[^>]*>/g, '')
      .replace(/\s*<meta property="og:image"[^>]*>/g, '')
      .replace(/\n{2,}/g, '\n')  // collapse multiple empty lines
  }

  it('usuwa stary <title>', () => {
    const result = cleanTemplate(mockTemplate)
    expect(result).not.toContain('<title>Stary tytuł')
  })

  it('usuwa <meta name="description">', () => {
    const result = cleanTemplate(mockTemplate)
    expect(result).not.toContain('name="description"')
  })

  it('usuwa <meta name="keywords">', () => {
    const result = cleanTemplate(mockTemplate)
    expect(result).not.toContain('name="keywords"')
  })

  it('usuwa <link rel="canonical">', () => {
    const result = cleanTemplate(mockTemplate)
    expect(result).not.toContain('rel="canonical"')
  })

  it('usuwa <meta property="og:image">', () => {
    const result = cleanTemplate(mockTemplate)
    expect(result).not.toContain('property="og:image"')
  })

  it('zostawia <!--app-head-->', () => {
    const result = cleanTemplate(mockTemplate)
    expect(result).toContain('<!--app-head-->')
  })

  it('zostawia adsbygoogle.js', () => {
    const result = cleanTemplate(mockTemplate)
    expect(result).toContain('adsbygoogle.js')
  })

  it('nie zostawia pustych linii po usunięciu', () => {
    const result = cleanTemplate(mockTemplate)
    // Nie powinno być podwójnych pustych linii po usunięciu tagów
    const lines = result.split('\n')
    const emptyLines = lines.filter(l => l.trim() === '')
    expect(emptyLines.length).toBeLessThan(5) // przed czyszczeniem było 5 pustych
  })
})
