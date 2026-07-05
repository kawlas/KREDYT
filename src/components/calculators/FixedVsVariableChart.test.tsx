import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import FixedVsVariableChart from './FixedVsVariableChart'
import type { FixedVsVariableComparison } from '../../utils/fixedVsVariable'
import { compareFixedVsVariable } from '../../utils/fixedVsVariable'

const sampleResult: FixedVsVariableComparison = compareFixedVsVariable(400000, 7.0, 7.5, 25, 5)

describe('FixedVsVariableChart', () => {
  it('renderuje się z wynikiem porównania', () => {
    const { container } = render(
      <MemoryRouter>
        <FixedVsVariableChart result={sampleResult} />
      </MemoryRouter>
    )
    expect(container.querySelector('svg')).toBeTruthy()
  })

  it('pokazuje legendę z etykietami', () => {
    const { getByText } = render(
      <MemoryRouter>
        <FixedVsVariableChart result={sampleResult} />
      </MemoryRouter>
    )
    expect(getByText(/stałe/i)).toBeTruthy()
    expect(getByText(/zmienne/i)).toBeTruthy()
  })

  it('pokazuje oś lat', () => {
    const { container } = render(
      <MemoryRouter>
        <FixedVsVariableChart result={sampleResult} />
      </MemoryRouter>
    )
    const textElements = container.querySelectorAll('text')
    const yearLabels = Array.from(textElements).filter(t => 
      /\d+\s*lat/.test(t.textContent || '')
    )
    expect(yearLabels.length).toBeGreaterThan(0)
  })

  it('renderuje się z minimalnym wynikiem (0 wartości)', () => {
    const emptyResult: FixedVsVariableComparison = compareFixedVsVariable(0, 7.0, 7.5, 25, 5)
    const { container } = render(
      <MemoryRouter>
        <FixedVsVariableChart result={emptyResult} />
      </MemoryRouter>
    )
    expect(container.querySelector('svg')).toBeTruthy()
  })

  it('pokazuje procenty na osi Y', () => {
    const { container } = render(
      <MemoryRouter>
        <FixedVsVariableChart result={sampleResult} />
      </MemoryRouter>
    )
    const textElements = container.querySelectorAll('text')
    const percentLabels = Array.from(textElements).filter(t => 
      t.textContent?.includes('%')
    )
    expect(percentLabels.length).toBeGreaterThan(0)
  })
})