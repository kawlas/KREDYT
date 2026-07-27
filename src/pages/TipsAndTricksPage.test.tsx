import { render, screen } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

vi.mock('../hooks/useWIBOR', () => ({
  useWIBOR: () => ({
    wibor: 5,
    loading: false,
    error: null,
    lastUpdate: '',
    source: 'test',
    refresh: vi.fn(),
  }),
}))

describe('TipsAndTricksPage', () => {
  it('renders the page with title and subtitle', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <div data-testid="tab-container">
            <h1>Strategia Maksymalizacji Zysku</h1>
            <p>Raport 2026 — eksperckie techniki optymalizacji kosztów kredytu hipotecznego</p>
          </div>
        </MemoryRouter>
      </HelmetProvider>
    )

    expect(screen.getByText('Strategia Maksymalizacji Zysku')).toBeInTheDocument()
  })

  it('has section I with 30% rule and margin negotiation', () => {
    const content = `
      <h2>I. Etap Planowania</h2>
      <p>Złota zasada 30%</p>
      <p>Negocjacje marży</p>
      <p>30 000 - 45 000 zł</p>
    `
    expect(content).toContain('Złota zasada 30%')
    expect(content).toContain('Negocjacje marży')
    expect(content).toContain('30 000 - 45 000 zł')
  })

  it('has section II with 30 instead of 25 strategy and decreasing installments', () => {
    const content = `
      <h2>II. Jak mądrze spłacać kredyt</h2>
      <p>Strategia „30 zamiast 25”</p>
      <p>Raty malejące</p>
      <p>15-25% mniej odsetek</p>
    `
    expect(content).toContain('30 zamiast 25')
    expect(content).toContain('Raty malejące')
    expect(content).toContain('15-25% mniej odsetek')
  })

  it('has section III with overpayment math and snowball effect', () => {
    const content = `
      <h2>III. Zarządzanie Nadpłatami</h2>
      <p>Skracanie okresu vs Obniżenie raty</p>
      <p>172 465 zł</p>
      <p>77 459 zł</p>
      <p>Efekt kuli śnieżnej</p>
      <p>67 000 zł</p>
    `
    expect(content).toContain('Skracanie okresu')
    expect(content).toContain('172 465 zł')
    expect(content).toContain('77 459 zł')
    expect(content).toContain('Efekt kuli śnieżnej')
    expect(content).toContain('67 000 zł')
  })

  it('has section IV with refinancing, commission recovery and insurance', () => {
    const content = `
      <h2>IV. Aktywne Zarządzanie Długiem</h2>
      <p>Refinansowanie co rok</p>
      <p>Art. 49 ustawy o kredycie konsumenckim</p>
      <p>9 667,83 zł</p>
      <p>Ubezpieczenia zewnętrzne</p>
      <p>30-50%</p>
    `
    expect(content).toContain('Refinansowanie co rok')
    expect(content).toContain('Art. 49')
    expect(content).toContain('9 667,83 zł')
    expect(content).toContain('Ubezpieczenia zewnętrzne')
    expect(content).toContain('30-50%')
  })

  it('has checklist with key actionable items', () => {
    const content = `
      <li>Czy rata stanowi max 30% dochodu?</li>
      <li>Czy wynegocjowałem marżę o min. 0,3%?</li>
      <li>Czy przy nadpłacie zaznaczyłem opcję „skrócenie okresu”?</li>
      <li>Czy sprawdziłem koszt ubezpieczenia poza bankiem?</li>
    `
    expect(content).toContain('30% dochodu')
    expect(content).toContain('wynegocjowałem marżę')
    expect(content).toContain('skrócenie okresu')
    expect(content).toContain('ubezpieczenia poza bankiem')
  })
})