/**
 * Export danych do CSV (Excel-compatible)
 */

import type { AmortizationRow } from './loanCalculations'

export type { AmortizationRow }

export interface CsvExportOptions {
  separator?: string // domyślnie ';' (Excel PL)
  decimalSeparator?: string // domyślnie ',' (Excel PL)
}

/**
 * Konwertuje tablicę obiektów na CSV
 */
export function objectsToCsv<T extends Record<string, unknown>>(
  data: T[],
  columns: { key: keyof T; label: string }[],
  options: CsvExportOptions = {}
): string {
  const { separator = ';', decimalSeparator = ',' } = options

  const escapeField = (value: unknown): string => {
    if (value === null || value === undefined) return ''
    const str = String(value)
    // Replace decimal separator
    const formatted = decimalSeparator === ',' ? str.replace('.', ',') : str
    // Escape quotes and wrap in quotes if contains separator or newline
    if (formatted.includes(separator) || formatted.includes('"') || formatted.includes('\n')) {
      return `"${formatted.replace(/"/g, '""')}"`
    }
    return formatted
  }

  const header = columns.map(c => escapeField(c.label)).join(separator)
  const rows = data.map(row =>
    columns.map(c => escapeField(row[c.key])).join(separator)
  )

  return [header, ...rows].join('\n')
}

/**
 * Generuje i pobiera plik CSV
 */
export function downloadCsv(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Generuje CSV harmonogramu spłat z AmortizationRow[]
 */
export function amortizationToCsv(
  schedule: AmortizationRow[],
  options: CsvExportOptions = {}
): string {
  const columns = [
    { key: 'month' as keyof AmortizationRow, label: 'Miesiąc' },
    { key: 'totalPayment' as keyof AmortizationRow, label: 'Rata (zł)' },
    { key: 'principalPart' as keyof AmortizationRow, label: 'Część kapitałowa (zł)' },
    { key: 'interestPart' as keyof AmortizationRow, label: 'Część odsetkowa (zł)' },
    { key: 'remainingBalance' as keyof AmortizationRow, label: 'Pozostało do spłaty (zł)' },
  ]
  return objectsToCsv(schedule, columns, options)
}


