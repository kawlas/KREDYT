import { useState } from 'react'
import { Link } from 'react-router-dom'
import { formatCurrencyShort, formatPercent } from '../../utils/formatters'

interface DataSourceBannerProps {
  source: 'calculator' | 'none'
  values: {
    loanAmount: number
    annualRate: number
    loanTermYears: number
    wibor?: number
    margin?: number
  }
  onApply: (values: { loanAmount: number; annualRate: number; loanTermYears: number }) => void
  calculatorLink?: string
}

export default function DataSourceBanner({
  source,
  values,
  onApply,
  calculatorLink = '/kalkulator-raty-kredytu/'
}: DataSourceBannerProps) {
  const [editing, setEditing] = useState(false)
  const [editLoanAmount, setEditLoanAmount] = useState(values.loanAmount)
  const [editAnnualRate, setEditAnnualRate] = useState(values.annualRate)
  const [editLoanTermYears, setEditLoanTermYears] = useState(values.loanTermYears)

  const isCalculator = source === 'calculator'

  const handleApply = () => {
    onApply({
      loanAmount: editLoanAmount,
      annualRate: editAnnualRate,
      loanTermYears: editLoanTermYears,
    })
    setEditing(false)
  }

  const handleCancel = () => {
    setEditLoanAmount(values.loanAmount)
    setEditAnnualRate(values.annualRate)
    setEditLoanTermYears(values.loanTermYears)
    setEditing(false)
  }

  const handleEdit = () => {
    setEditLoanAmount(values.loanAmount)
    setEditAnnualRate(values.annualRate)
    setEditLoanTermYears(values.loanTermYears)
    setEditing(true)
  }

  return (
    <div className={`rounded-xl border p-4 sm:p-6 ${isCalculator ? 'bg-indigo-50 border-indigo-200' : 'bg-gray-50 border-gray-200'}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <p className={`font-semibold ${isCalculator ? 'text-indigo-800' : 'text-gray-800'}`}>
          {isCalculator ? 'Wartości pobrane z kalkulatora głównego' : 'Wprowadź dane ręcznie lub skorzystaj z kalkulatora głównego'}
        </p>
        <div className="flex items-center gap-2 shrink-0">
          {!editing && (
            <button
              onClick={handleEdit}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isCalculator
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-600 text-white hover:bg-gray-700'
              }`}
            >
              Edytuj
            </button>
          )}
          <Link
            to={calculatorLink}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
              isCalculator
                ? 'border-indigo-300 text-indigo-700 hover:bg-indigo-100'
                : 'border-gray-300 text-gray-700 hover:bg-gray-100'
            }`}
          >
            ← Kalkulator główny
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className={`rounded-lg p-3 ${isCalculator ? 'bg-indigo-100/50' : 'bg-white'}`}>
          <div className="text-sm text-gray-600">Kwota kredytu</div>
          <div className="text-lg font-bold text-gray-900">{formatCurrencyShort(values.loanAmount)}</div>
        </div>
        <div className={`rounded-lg p-3 ${isCalculator ? 'bg-indigo-100/50' : 'bg-white'}`}>
          <div className="text-sm text-gray-600">Oprocentowanie</div>
          <div className="text-lg font-bold text-gray-900">
            {formatPercent(values.annualRate)}
            {values.wibor !== undefined && values.margin !== undefined && (
              <span className="text-sm font-normal text-gray-500 ml-1">
                (WIBOR: {formatPercent(values.wibor)} + marża: {formatPercent(values.margin)})
              </span>
            )}
          </div>
        </div>
        <div className={`rounded-lg p-3 ${isCalculator ? 'bg-indigo-100/50' : 'bg-white'}`}>
          <div className="text-sm text-gray-600">Okres kredytowania</div>
          <div className="text-lg font-bold text-gray-900">{values.loanTermYears} lat</div>
        </div>
      </div>

      {editing && (
        <div className={`mt-4 p-4 rounded-lg border ${isCalculator ? 'bg-indigo-100/30 border-indigo-200' : 'bg-white border-gray-200'}`}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kwota kredytu (PLN)</label>
              <input
                type="number"
                value={editLoanAmount}
                onChange={e => setEditLoanAmount(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Oprocentowanie (%)</label>
              <input
                type="number"
                step="0.01"
                value={editAnnualRate}
                onChange={e => setEditAnnualRate(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Okres (lata)</label>
              <input
                type="number"
                value={editLoanTermYears}
                onChange={e => setEditLoanTermYears(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              Anuluj
            </button>
            <button
              onClick={handleApply}
              className={`px-4 py-2 text-sm font-medium text-white rounded-lg ${isCalculator ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-600 hover:bg-gray-700'}`}
            >
              Zastosuj
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
