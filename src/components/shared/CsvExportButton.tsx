import { useState } from 'react'
import { downloadCsv } from '../../utils/csvExport'
import { generateAmortizationSchedule } from '../../utils/loanCalculations'

interface CsvExportButtonProps {
  principal: number
  annualRate: number
  months: number
  installmentType: 'equal' | 'declining'
  filename?: string
  variant?: 'primary' | 'secondary' | 'outline'
}

export default function CsvExportButton({
  principal,
  annualRate,
  months,
  installmentType,
  filename = 'harmonogram-splat.csv',
  variant = 'outline',
}: CsvExportButtonProps) {
  const [exporting, setExporting] = useState(false)

  const handleExport = () => {
    setExporting(true)
    try {
      // Generate schedule
      const schedule = generateAmortizationSchedule(principal, annualRate, months, installmentType)

      // Build CSV manually (avoid circular deps)
      const separator = ';'
      const escapeField = (value: unknown): string => {
        const str = String(value ?? '').replace('.', ',')
        if (str.includes(separator) || str.includes('"') || str.includes('\n')) {
          return `"${str.replace(/"/g, '""')}"`
        }
        return str
      }

      const header = ['Miesiąc', 'Rata (zł)', 'Kapitał (zł)', 'Odsetki (zł)', 'Saldo (zł)']
        .map(h => escapeField(h)).join(separator)

      const rows = schedule.map(row =>
        [row.month, row.totalPayment, row.principalPart, row.interestPart, row.remainingBalance]
          .map(v => escapeField(v)).join(separator)
      )

      const csv = '\uFEFF' + [header, ...rows].join('\n') // BOM for Excel UTF-8

      downloadCsv(csv, filename)
    } finally {
      setExporting(false)
    }
  }

  const baseClasses = 'inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-400',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
  }

  return (
    <button
      onClick={handleExport}
      disabled={exporting || principal <= 0 || months <= 0}
      className={`${baseClasses} ${variantClasses[variant]} ${exporting ? 'opacity-50 cursor-wait' : ''}`}
      aria-label="Pobierz harmonogram spłat CSV"
    >
      {exporting ? (
        <>
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Generowanie...
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Pobierz CSV
        </>
      )}
    </button>
  )
}

// Helper to get the CSV button props from loan calculator context data
export function getCsvButtonProps(data: {
  principal: number
  annualRate: number
  months: number
  installmentType?: 'equal' | 'declining'
}): CsvExportButtonProps {
  return {
    principal: data.principal,
    annualRate: data.annualRate,
    months: data.months,
    installmentType: data.installmentType || 'equal',
  }
}