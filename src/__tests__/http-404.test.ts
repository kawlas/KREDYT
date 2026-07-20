import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

const redirectsContent = fs.readFileSync(
  path.resolve(__dirname, '../../public/_redirects'),
  'utf-8'
)

describe('HTTP 404 dla nieznanych ścieżek', () => {
  it('_redirects NIE ma catch-all SPA fallback /* -> /index.html 200', () => {
    const lines = redirectsContent.split('\n').filter(l => l.trim() && !l.startsWith('#'))
    const catchAll = lines.find(l => {
      const parts = l.trim().split(/\s+/)
      return parts[0] === '/*' && parts[1] === '/index.html' && parts[2] === '200'
    })
    expect(catchAll).toBeUndefined()
  })

  it('prerender.js generuje 404.html w root (nie tylko /404/index.html)', () => {
    const prerenderSrc = fs.readFileSync(
      path.resolve(__dirname, '../../prerender.js'),
      'utf-8'
    )
    expect(prerenderSrc).toContain('404.html')
  })

  it('znana podstrona zwraca 200 (nie 404)', async () => {
    const res = await fetch('https://kredytkalkulator.netlify.app/kalkulator-raty-kredytu/')
    expect(res.status).toBe(200)
  })

  it.skip('nieznana ścieżka zwraca 404 (WYMAGA DEPLOYU)', async () => {
    const res = await fetch('https://kredytkalkulator.netlify.app/asdfghjkl-nie-istnieje/')
    expect(res.status).toBe(404)
  })
})
