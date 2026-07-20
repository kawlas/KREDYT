import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

describe('AI Crawler — llms.txt', () => {
  it('llms.txt istnieje w public/', () => {
    const file = path.resolve(__dirname, '../../public/llms.txt')
    expect(fs.existsSync(file)).toBe(true)
  })

  it('llms.txt zawiera nagłówek z nazwą strony', () => {
    const content = fs.readFileSync(
      path.resolve(__dirname, '../../public/llms.txt'),
      'utf-8'
    )
    expect(content).toMatch(/^# Kalkulator Kredytowy/m)
  })

  it('llms.txt zawiera linki do kalkulatorów', () => {
    const content = fs.readFileSync(
      path.resolve(__dirname, '../../public/llms.txt'),
      'utf-8'
    )
    expect(content).toContain('/kalkulator-raty-kredytu/')
    expect(content).toContain('/symulacja-wibor/')
    expect(content).toContain('/zdolnosc-kredytowa/')
  })
})

describe('AI Crawler — sameAs w JSON-LD', () => {
  it('SEOHead zawiera sameAs dla Organization', () => {
    const content = fs.readFileSync(
      path.resolve(__dirname, '../components/shared/SEOHead.tsx'),
      'utf-8'
    )
    expect(content).toContain('sameAs')
    expect(content).toContain('github.com/kawlas/KREDYT')
  })
})

describe('AI Crawler — og:locale', () => {
  it('SEOHead zawiera og:locale pl_PL', () => {
    const content = fs.readFileSync(
      path.resolve(__dirname, '../components/shared/SEOHead.tsx'),
      'utf-8'
    )
    expect(content).toContain('og:locale')
    expect(content).toContain('pl_PL')
  })
})

describe('AI Crawler — sitemap priority granularny', () => {
  it('prerender.js definiuje priorityMap z różnymi priorytetami', () => {
    const content = fs.readFileSync(
      path.resolve(__dirname, '../../prerender.js'),
      'utf-8'
    )
    expect(content).toContain('priorityMap')
    expect(content).toContain("'/': '1.0'")
    expect(content).toContain("'0.9'")
    expect(content).toContain("'0.5'")
    expect(content).toContain("'0.3'")
  })
})
