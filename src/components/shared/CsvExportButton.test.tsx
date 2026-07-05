import { describe, it, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import CsvExportButton from './CsvExportButton'

describe('CsvExportButton', () => {
  const baseProps = {
    principal: 400000,
    annualRate: 7.0,
    months: 300, // 25 years
    installmentType: 'equal' as const,
  }

  it('renderuje przycisk z etykietą', () => {
    const { getByText } = render(<CsvExportButton {...baseProps} />)
    expect(getByText(/pobierz csv/i)).toBeTruthy()
  })

  it('jest nieaktywny gdy brak kwoty kredytu', () => {
    const { getByRole } = render(
      <CsvExportButton {...baseProps} principal={0} />
    )
    const button = getByRole('button') as HTMLButtonElement
    expect(button.disabled).toBe(true)
  })

  it('jest nieaktywny gdy brak okresu', () => {
    const { getByRole } = render(
      <CsvExportButton {...baseProps} months={0} />
    )
    const button = getByRole('button') as HTMLButtonElement
    expect(button.disabled).toBe(true)
  })

  it('ma wariant outline jako domyślny', () => {
    const { getByRole } = render(<CsvExportButton {...baseProps} />)
    const button = getByRole('button')
    expect(button.className).toContain('border')
  })

  it('wariant primary ma niebieskie tło', () => {
    const { getByRole } = render(
      <CsvExportButton {...baseProps} variant="primary" />
    )
    const button = getByRole('button')
    expect(button.className).toContain('bg-blue-600')
  })

  it('ma atrybut aria-label', () => {
    const { getByRole } = render(<CsvExportButton {...baseProps} />)
    const button = getByRole('button')
    expect(button.getAttribute('aria-label')).toContain('CSV')
  })

  it('działa z declining installmentType', () => {
    const { getByRole } = render(
      <CsvExportButton {...baseProps} installmentType="declining" />
    )
    const button = getByRole('button') as HTMLButtonElement
    expect(button.disabled).toBe(false)
  })
})