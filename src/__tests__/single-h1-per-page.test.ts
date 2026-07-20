import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

const tabContainer = fs.readFileSync(
  path.resolve(__dirname, '../components/layout/TabContainer.tsx'),
  'utf-8'
)

const poradnikPages = [
  'JakObliczycRatePage.tsx',
  'WiborARataPage.tsx',
  'CreditCapacityCompendiumPage.tsx',
]

describe('Pojedynczy H1 na stronach poradników', () => {
  it('TabContainer renderuje h2 zamiast h1', () => {
    expect(tabContainer).not.toContain('<h1')
    expect(tabContainer).toContain('<h2')
  })

  for (const page of poradnikPages) {
    it(`${page} ma dokładnie jeden h1`, () => {
      const content = fs.readFileSync(
        path.resolve(__dirname, `../pages/${page}`),
        'utf-8'
      )
      const h1Matches = content.match(/<h1[\s>]/g)
      expect(h1Matches).toHaveLength(1)
    })
  }
})
