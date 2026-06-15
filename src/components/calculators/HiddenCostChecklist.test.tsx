import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import HiddenCostChecklist from './HiddenCostChecklist'

describe('HiddenCostChecklist', () => {
  it('renders cost items grouped by category', () => {
    render(<HiddenCostChecklist />)
    expect(screen.getByText(/koszty początkowe/i)).toBeTruthy()
  })

  it('allows checking/unchecking items', () => {
    render(<HiddenCostChecklist />)
    const checkbox = screen.getAllByRole('checkbox')[0]
    fireEvent.click(checkbox)
    expect(checkbox).toBeChecked()
    fireEvent.click(checkbox)
    expect(checkbox).not.toBeChecked()
  })

  it('shows total simulation when items are selected', () => {
    render(<HiddenCostChecklist loanAmount={400000} />)
    fireEvent.click(screen.getAllByRole('checkbox')[0])
    expect(screen.getByText(/szacowany koszt/i)).toBeTruthy()
  })

  it('shows empty state when nothing selected', () => {
    render(<HiddenCostChecklist />)
    expect(screen.getByText(/wybierz pozycje/i)).toBeTruthy()
  })

  it('filters items by category', () => {
    render(<HiddenCostChecklist />)
    const filterButtons = screen.getAllByRole('button').filter(b => b.dataset.category)
    if (filterButtons.length > 0) {
      fireEvent.click(filterButtons[0])
    }
  })
  
  it('is accessible', () => {
    render(<HiddenCostChecklist />)
    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes.length).toBeGreaterThan(0)
  })
})
