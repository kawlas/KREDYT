import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

const netlifyToml = fs.readFileSync(
  path.resolve(__dirname, '../../netlify.toml'),
  'utf-8'
)

describe('Cache headers w netlify.toml', () => {
  it('/assets/* ma Cache-Control z max-age=31536000 (immutable)', () => {
    expect(netlifyToml).toContain('for = "/assets/*"')
    expect(netlifyToml).toContain('max-age=31536000')
    expect(netlifyToml).toContain('immutable')
  })
})
