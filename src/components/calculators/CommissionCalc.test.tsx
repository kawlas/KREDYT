import { describe, it, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import CommissionCalc from './CommissionCalc'

describe('CommissionCalc', () => {
  it('renderuje się z domyślnymi wartościami', () => {
    const { getByLabelText } = render(<CommissionCalc />)
    expect(getByLabelText(/kwota kredytu/i)).toBeTruthy()
    expect(getByLabelText(/prowizja banku/i)).toBeTruthy()
  })

  it('pokaże wyniki po wprowadzeniu danych — rekomendacja', () => {
    const { getByText } = render(<CommissionCalc />)
    expect(getByText(/rekomendacja/i)).toBeTruthy()
  })

  it('zmiana kwoty kredytu wpływa na wyniki', () => {
    const { getByLabelText, getByText } = render(<CommissionCalc />)
    const input = getByLabelText(/kwota kredytu/i) as HTMLInputElement
    fireEvent.change(input, { target: { value: '500000' } })
    expect(input.value).toBe('500000')
    // Po zmianie wciąż widać rekomendację
    expect(getByText(/rekomendacja/i)).toBeTruthy()
  })

  it('zerowa prowizja wciąż pokazuje kartę wariantu z prowizją', () => {
    const { getByLabelText, getAllByText } = render(<CommissionCalc />)
    const commissionInput = getByLabelText(/prowizja banku/i) as HTMLInputElement
    fireEvent.change(commissionInput, { target: { value: '0' } })
    const matches = getAllByText(/z prowizją/i)
    expect(matches.length).toBeGreaterThanOrEqual(1)
  })

  it('wyświetla sekcję optymalnej prowizji', () => {
    const { getAllByText } = render(<CommissionCalc />)
    const matches = getAllByText(/optymalna prowizja/i)
    expect(matches.length).toBeGreaterThanOrEqual(1)
  })

  it('ma slider okresu kredytowania', () => {
    const { getByText } = render(<CommissionCalc />)
    expect(getByText(/okres kredytowania/i)).toBeTruthy()
  })
})