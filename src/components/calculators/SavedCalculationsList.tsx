import { useState, useEffect } from 'react'
import {
  getSavedCalculations,
  deleteCalculation,
  type SavedCalculation
} from '../../utils/calculationStorage'
import { formatCurrencyShort } from '../../utils/formatters'

interface SavedCalculationsListProps {
  isOpen: boolean
  onClose: () => void
  onLoad: (calculation: SavedCalculation) => void
}

export default function SavedCalculationsList({
  isOpen,
  onClose,
  onLoad
}: SavedCalculationsListProps) {
  const [calculations, setCalculations] = useState<SavedCalculation[]>([])
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen) {
      loadCalculations()
    }
  }, [isOpen])

  const loadCalculations = () => {
    setCalculations(getSavedCalculations())
  }

  const handleDelete = (id: string) => {
    deleteCalculation(id)
    loadCalculations()
    setDeleteConfirm(null)
  }

  const handleLoad = (calc: SavedCalculation) => {
    onLoad(calc)
    onClose()
  }

  const formatDate = (isoDate: string) => {
    return new Date(isoDate).toLocaleDateString('pl-PL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4 animate-in fade-in duration-200">
      <div className="bg-card rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-border bg-card sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <span className="text-3xl">📂</span> Zapisane scenariusze
            </h2>
            <p className="text-sm text-muted-foreground mt-1">Masz {calculations.length} zapisanych kalkulacji</p>
          </div>
          <button 
            onClick={onClose} 
            className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-muted rounded-full"
            aria-label="Zamknij"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* List content */}
        <div className="flex-1 overflow-y-auto p-8 bg-secondary/30">
          {calculations.length === 0 ? (
            <div className="text-center py-20 bg-card rounded-2xl border border-dashed border-border">
              <div className="text-7xl mb-6">📭</div>
              <h3 className="text-xl font-bold text-foreground mb-2">Brak zapisanych obliczeń</h3>
              <p className="text-muted-foreground max-w-xs mx-auto">
                Po obliczeniu raty kliknij przycisk "Zapisz", aby móc wrócić do tych danych później.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {calculations.map((calc) => (
                <div
                  key={calc.id}
                  className="group bg-card border border-border rounded-2xl p-6 hover:shadow-xl hover:shadow-blue-500/5 hover:border-primary/40 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    {/* Scenario Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-black text-lg text-foreground truncate group-hover:text-primary transition-colors">
                          {calc.name}
                        </h3>
                        {calc.formData.installmentType === 'declining' && (
                          <span className="px-2 py-0.5 bg-purple-50 text-purple-600 text-[10px] font-bold uppercase tracking-wider rounded border border-purple-100">
                            Malejące
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-medium text-muted-foreground flex items-center gap-1.5 mb-5">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {formatDate(calc.savedAt)}
                      </p>
                      
                      {/* Scenario Metrics */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-4 bg-secondary rounded-xl border border-border">
                        <div>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">Kwota</p>
                          <p className="font-bold text-foreground text-sm">
                            {formatCurrencyShort(calc.formData.principal)}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">Okres</p>
                          <p className="font-bold text-foreground text-sm">
                            {calc.formData.years} lat
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1.5">Rata</p>
                          <p className="font-black text-primary text-sm">
                            {formatCurrencyShort(calc.results.monthlyPayment)}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">Koszt całkowity</p>
                          <p className="font-bold text-foreground text-sm">
                            {formatCurrencyShort(calc.results.totalCost)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Scenario Actions */}
                    <div className="flex flex-row md:flex-col lg:flex-row gap-3 w-full md:w-auto">
                      <button
                        onClick={() => handleLoad(calc)}
                        className="flex-1 md:w-32 px-5 py-3.5 bg-primary text-white rounded-xl hover:bg-primary/90 font-bold text-sm shadow-md shadow-blue-200 transition-all flex items-center justify-center gap-2"
                      >
                        Wczytaj
                      </button>
                      
                      {deleteConfirm === calc.id ? (
                        <div className="flex gap-2 flex-grow lg:flex-grow-0">
                          <button
                            onClick={() => handleDelete(calc.id)}
                            className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 text-xs font-black uppercase tracking-wider transition-all"
                          >
                            Potwierdź
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="flex-1 px-4 py-3 bg-muted text-foreground rounded-xl hover:bg-muted text-xs font-black uppercase tracking-wider transition-all"
                          >
                            Anuluj
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(calc.id)}
                          className="flex-none p-4 text-muted-foreground bg-card border border-border rounded-xl hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all group/del"
                          aria-label="Usuń scenariusz"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer info */}
        {calculations.length > 0 && (
          <div className="p-6 bg-card border-t border-border flex items-center justify-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
            <span className="text-lg">🛡️</span> Dane są zapisane wyłącznie w pamięci Twojej przeglądarki
          </div>
        )}
      </div>
    </div>
  )
}
