import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

const netlifyToml = fs.readFileSync(
  path.resolve(__dirname, '../../netlify.toml'),
  'utf-8'
)

describe('Server-Timing header', () => {
  it('netlify.toml zawiera Server-Timing', () => {
    expect(netlifyToml).toContain('Server-Timing')
  })
})
