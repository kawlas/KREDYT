import { useState, useEffect } from 'react'
import { saveCalculation, type SavedCalculation } from '../../utils/calculationStorage'

interface SaveCalculationModalProps {
  isOpen: boolean
  onClose: () => void
  formData: SavedCalculation['formData']
  results: SavedCalculation['results']
  onSaved?: (calculation: SavedCalculation) => void
}

export default function SaveCalculationModal({
  isOpen,
  onClose,
  formData,
  results,
  onSaved
}: SaveCalculationModalProps) {
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  // Generate default name
  useEffect(() => {
    if (isOpen && !name) {
      const date = new Date().toLocaleDateString('pl-PL', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
      setName(`Oferta ${date}`)
    }
  }, [isOpen, name])

  const handleSave = () => {
    if (!name.trim()) {
      setError('Podaj nazwę dla obliczeń')
      return
    }

    if (name.trim().length < 3) {
      setError('Nazwa musi mieć minimum 3 znaki')
      return
    }

    setSaving(true)
    setError('')

    try {
      const saved = saveCalculation(name.trim(), formData, results)
      onSaved?.(saved)
      onClose()
      setName('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Błąd podczas zapisywania')
    } finally {
      setSaving(false)
    }
  }

  const handleClose = () => {
    setName('')
    setError('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <span className="text-3xl">💾</span> Zapisz obliczenia
          </h2>
          <button 
            onClick={handleClose} 
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
            aria-label="Zamknij"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Summary Card */}
        <div className="bg-blue-50/50 rounded-xl p-6 mb-8 border border-blue-100">
          <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-4">Podsumowanie scenariusza</div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">Kwota kredytu:</span>
              <span className="font-bold text-gray-900">
                {formData.principal.toLocaleString('pl-PL')} zł
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">Okres spłaty:</span>
              <span className="font-bold text-gray-900">{formData.years} lat</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-blue-100">
              <span className="text-gray-600 text-sm">Rata miesięczna:</span>
              <span className="text-lg font-black text-blue-600">
                {results.monthlyPayment.toLocaleString('pl-PL', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })} zł
              </span>
            </div>
          </div>
        </div>

        {/* Name input */}
        <div className="mb-8">
          <label className="block text-sm font-bold text-gray-700 mb-3">
            Nazwa kalkulacji
          </label>
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="np. PKO oferta 30.12.2025"
              className={`
                w-full px-5 py-4 bg-gray-50 border rounded-xl transition-all outline-none
                ${error ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50/50'}
              `}
              maxLength={50}
              autoFocus
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">
              {name.length}/50
            </div>
          </div>
          {error && (
            <p className="mt-3 text-sm text-red-600 font-medium flex items-center gap-1.5">
              <span className="text-lg">⚠️</span> {error}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={handleClose}
            className="flex-1 px-6 py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-bold text-sm"
          >
            Anuluj
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !name.trim()}
            className="flex-2 px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-bold text-sm shadow-lg shadow-blue-200 disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {saving ? 'Zapisuję...' : (
              <>
                <span>💾</span> Zapisz
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
