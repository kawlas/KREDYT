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
  it('TabContainer renderuje h1', () => {
    expect(tabContainer).toContain('<h1')
  })

  for (const page of poradnikPages) {
    it(`${page} nie ma wewnętrznego h1 (h1 z TabContainer)`, () => {
      const content = fs.readFileSync(
        path.resolve(__dirname, `../pages/${page}`),
        'utf-8'
      )
      const h1Matches = content.match(/<h1[\s>]/g)
      expect(h1Matches ?? []).toHaveLength(0)
    })
  }
})
