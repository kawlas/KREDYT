import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import FixedVsVariableCalc from './FixedVsVariableCalc'

function renderWithRouter(ui: React.ReactElement) {
  return render(<BrowserRouter>{ui}</BrowserRouter>)
}

describe('FixedVsVariableCalc', () => {
  it('renders calculator form', () => {
    renderWithRouter(<FixedVsVariableCalc />)
    expect(screen.getByText(/stałe czy zmienne/i)).toBeTruthy()
  })

  it('shows comparison results', () => {
    renderWithRouter(<FixedVsVariableCalc />)
    const rates = screen.getAllByText(/rata miesięczna/i)
    expect(rates.length).toBe(2)
  })

  it('allows changing parameters', () => {
    renderWithRouter(<FixedVsVariableCalc />)
    const input = screen.getByLabelText(/kwota kredytu/i) as HTMLInputElement
    fireEvent.change(input, { target: { value: '500000' } })
  })
})
