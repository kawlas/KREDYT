import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import LTVCalc from './LTVCalc'

function renderWithRouter(ui: React.ReactElement) {
  return render(<BrowserRouter>{ui}</BrowserRouter>)
}

describe('LTVCalc', () => {
  it('renders calculator form', () => {
    renderWithRouter(<LTVCalc />)
    expect(screen.getByText(/wartość nieruchomości/i)).toBeTruthy()
    expect(screen.getByText(/kwota kredytu/i)).toBeTruthy()
  })

  it('shows LTV result after entering values', () => {
    renderWithRouter(<LTVCalc />)
    const propertyInput = screen.getByLabelText(/wartość nieruchomości/i) as HTMLInputElement
    const loanInput = screen.getByLabelText(/kwota kredytu/i) as HTMLInputElement
    
    fireEvent.change(propertyInput, { target: { value: '500000' } })
    fireEvent.change(loanInput, { target: { value: '400000' } })
    
    expect(screen.getByText(/80/)).toBeTruthy()
  })

  it('shows equity slider', () => {
    renderWithRouter(<LTVCalc />)
    expect(screen.getByText(/wkład własny/i)).toBeTruthy()
  })
})
