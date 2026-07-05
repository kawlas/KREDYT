import { useState, useEffect } from 'react'

interface ChecklistItem {
  id: string
  text: string
  category: string
  timeframe: string
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  { id: 'bik-check', text: 'Sprawdź swoją historię w BIK', category: 'BIK', timeframe: '6 miesięcy przed' },
  { id: 'close-cards', text: 'Zamknij nieużywane karty kredytowe i limity', category: 'Zdolność', timeframe: '6 miesięcy przed' },
  { id: 'collect-docs', text: 'Zbierz niezbędne dokumenty (zaświadczenia, wyciągi)', category: 'Dokumenty', timeframe: '6 miesięcy przed' },
  { id: 'no-new-loans', text: 'Unikaj nowych zobowiązań (raty, zakupy na raty)', category: 'Zdolność', timeframe: '3 miesiące przed' },
  { id: 'collect-statements', text: 'Zbierz wyciągi bankowe z ostatnich miesięcy', category: 'Dokumenty', timeframe: '3 miesiące przed' },
  { id: 'select-bank', text: 'Wybierz bank i porównaj oferty', category: 'Bank', timeframe: '1 miesiąc przed' },
  { id: 'apply-loan', text: 'Złóż wniosek kredytowy', category: 'Bank', timeframe: '1 miesiąc przed' },
]

export default function PreparationChecklist() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('preparation-checklist')
      return saved ? new Set(JSON.parse(saved)) : new Set()
    }
    return new Set()
  })

  useEffect(() => {
    localStorage.setItem('preparation-checklist', JSON.stringify(Array.from(checkedItems)))
  }, [checkedItems])

  const toggleItem = (id: string) => {
    setCheckedItems(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const timeframes = ['6 miesięcy przed', '3 miesiące przed', '1 miesiąc przed']

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Twoja lista przygotowań</h2>
        <p className="text-gray-600">Zaznacz wykonane kroki, aby mieć pewność, że jesteś gotowy na wizytę w banku.</p>
      </div>

      {timeframes.map(tf => (
        <div key={tf} className="space-y-4">
          <h3 className="text-xl font-bold text-blue-600 border-b pb-2">{tf}</h3>
          <div className="space-y-2">
            {CHECKLIST_ITEMS.filter(item => item.timeframe === tf).map(item => (
              <label 
                key={item.id}
                className={`flex items-center gap-3 p-4 rounded-xl border transition-all cursor-pointer ${
                  checkedItems.has(item.id) 
                    ? 'bg-green-50 border-green-200 opacity-75' 
                    : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-sm'
                }`}
              >
                <input
                  type="checkbox"
                  checked={checkedItems.has(item.id)}
                  onChange={() => toggleItem(item.id)}
                  className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <div className="flex-1">
                  <p className={`font-medium ${checkedItems.has(item.id) ? 'text-green-800 line-through' : 'text-gray-900'}`}>
                    {item.text}
                  </p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">{item.category}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
      ))}

      <div className="pt-8">
        <button
          onClick={() => {
            if (confirm('Czy na pewno chcesz wyczyścić całą listę?')) {
              setCheckedItems(new Set())
            }
          }}
          className="text-sm text-gray-500 hover:text-red-600 transition-colors"
        >
          Wyczyść całą listę
        </button>
      </div>
    </div>
  )
}
