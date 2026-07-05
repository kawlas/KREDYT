import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import RentVsBuyCalc from './RentVsBuyCalc'

describe('RentVsBuyCalc', () => {
  it('renderuje się z domyślnymi wartościami', () => {
    const { getByLabelText } = render(<RentVsBuyCalc />)
    expect(getByLabelText(/cena nieruchomości/i)).toBeTruthy()
    expect(getByLabelText(/miesięczny czynsz/i)).toBeTruthy()
  })

  it('pokaże wynik porównania', () => {
    const { getByText } = render(<RentVsBuyCalc />)
    expect(getByText(/wynik porównania/i)).toBeTruthy()
  })

  it('ma slider lat do porównania', () => {
    const { getByText } = render(<RentVsBuyCalc />)
    expect(getByText(/lata porównania/i)).toBeTruthy()
  })
})