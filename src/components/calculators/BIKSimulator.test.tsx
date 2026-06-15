import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import BIKSimulator from './BIKSimulator'

describe('BIKSimulator', () => {
  it('renders all scoring factors as switches', () => {
    render(<BIKSimulator />)
    const toggles = screen.getAllByRole('switch')
    expect(toggles.length).toBeGreaterThanOrEqual(10)
  })

  it('shows base score initially', () => {
    render(<BIKSimulator />)
    const scoreDisplay = screen.getByTestId('score-display')
    expect(scoreDisplay.textContent).toBe('500')
  })

  it('shows score band label initially', () => {
    render(<BIKSimulator />)
    const band = screen.getByTestId('score-band')
    expect(band).toBeTruthy()
    expect(band.textContent).toContain('Średnia')
  })

  it('updates score when toggling a positive factor', () => {
    render(<BIKSimulator />)
    const firstToggle = screen.getAllByRole('switch')[0]
    fireEvent.click(firstToggle)
    const scoreElement = screen.getByTestId('score-display')
    expect(Number(scoreElement.textContent)).not.toBe(500)
  })

  it('updates score when toggling a negative factor', () => {
    render(<BIKSimulator />)
    const toggles = screen.getAllByRole('switch')
    const negativeIndex = 1
    fireEvent.click(toggles[negativeIndex])
    const scoreElement = screen.getByTestId('score-display')
    expect(Number(scoreElement.textContent)).toBeLessThan(500)
  })

  it('displays progress bar', () => {
    render(<BIKSimulator />)
    const progressBar = document.querySelector('.bg-gray-100.rounded-full')
    expect(progressBar).toBeTruthy()
    const progressFill = progressBar?.querySelector('div')
    expect(progressFill).toBeTruthy()
  })

  it('shows tips section when negative factors are selected', () => {
    render(<BIKSimulator />)
    const negativeToggle = screen.getAllByRole('switch')[1]
    fireEvent.click(negativeToggle)
    expect(screen.getByText(/wskazówki/i)).toBeTruthy()
  })

  it('shows percentile information', () => {
    render(<BIKSimulator />)
    expect(screen.getByText(/wyższy niż/i)).toBeTruthy()
  })

  it('shows positive message when no negative factors selected', () => {
    render(<BIKSimulator />)
    expect(screen.getByText(/Brak negatywnych czynników/i)).toBeTruthy()
  })
})
