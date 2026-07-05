import { describe, it, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import InsuranceCalc from './InsuranceCalc'

describe('InsuranceCalc', () => {
  it('renderuje się z domyślnymi wartościami', () => {
    const { getByLabelText } = render(<InsuranceCalc />)
    expect(getByLabelText(/kwota kredytu/i)).toBeTruthy()
    expect(getByLabelText(/wartość nieruchomości/i)).toBeTruthy()
  })

  it('pokazuje LTV', () => {
    const { getAllByText } = render(<InsuranceCalc />)
    const matches = getAllByText(/LTV/i)
    expect(matches.length).toBeGreaterThanOrEqual(1)
  })

  it('zmiana wartości nieruchomości wpływa na LTV', () => {
    const { getByLabelText, getByText } = render(<InsuranceCalc />)
    const input = getByLabelText(/wartość nieruchomości/i) as HTMLInputElement
    fireEvent.change(input, { target: { value: '300000' } })
    // LTV = 400k/300k ≈ 133% — should show UNWW warning
    expect(getByText(/wymagane UNWW/i)).toBeTruthy()
  })

  it('sekcja ubezpieczeń ma checkboxy', () => {
    const { getByLabelText } = render(<InsuranceCalc />)
    expect(getByLabelText(/ubezpieczenie na życie/i)).toBeTruthy()
    expect(getByLabelText(/ubezpieczenie pomostowe/i)).toBeTruthy()
    expect(getByLabelText(/utraty pracy/i)).toBeTruthy()
  })

  it('wyłączenie ubezpieczenia życia odznacza checkbox', () => {
    const { getByLabelText } = render(<InsuranceCalc />)
    const checkbox = getByLabelText(/ubezpieczenie na życie/i) as HTMLInputElement
    fireEvent.click(checkbox)
    expect(checkbox.checked).toBe(false)
    // Ponowne kliknięcie włącza z powrotem
    fireEvent.click(checkbox)
    expect(checkbox.checked).toBe(true)
  })

  it('pokazuje całkowity koszt ubezpieczeń', () => {
    const { getByText } = render(<InsuranceCalc />)
    expect(getByText(/całkowity koszt ubezpieczeń/i)).toBeTruthy()
  })

  it('ma slider okresu kredytowania', () => {
    const { getByText } = render(<InsuranceCalc />)
    expect(getByText(/okres kredytowania/i)).toBeTruthy()
  })
})