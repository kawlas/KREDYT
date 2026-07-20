import { useState } from 'react'
import { hiddenCosts, getCategories, simulateTotalHiddenCosts, type CostCategory } from '../../utils/hiddenCostsData'
import { formatCurrency } from '../../utils/formatters'
import Card from '../shared/Card'

interface HiddenCostChecklistProps {
  loanAmount?: number
}

export default function HiddenCostChecklist({ loanAmount = 400000 }: HiddenCostChecklistProps) {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())
  const [activeCategory, setActiveCategory] = useState<CostCategory | 'all'>('all')

  const toggleItem = (id: number) => {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const filtered = activeCategory === 'all'
    ? hiddenCosts
    : hiddenCosts.filter(c => c.category === activeCategory)

  const totalSimulated = simulateTotalHiddenCosts(loanAmount, Array.from(selectedIds))
  const totalCount = selectedIds.size

  const categories = getCategories()

  const impactLabels: Record<string, string> = {
    'very-high': 'Bardzo wysoki',
    'high': 'Wysoki',
    'medium': 'Średni',
    'low': 'Niski',
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setActiveCategory('all')} data-category="all"
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${activeCategory === 'all' ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground hover:bg-muted'}`}>
          Wszystkie ({hiddenCosts.length})
        </button>
        {categories.map(cat => (
          <button key={cat.key} onClick={() => setActiveCategory(cat.key)} data-category={cat.key}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${activeCategory === cat.key ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground hover:bg-muted'}`}>
            {cat.label} ({hiddenCosts.filter(c => c.category === cat.key).length})
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map(item => (
          <label key={item.id}
            className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${selectedIds.has(item.id) ? 'border-primary/30 bg-primary/10' : 'border-border hover:border-border bg-card'}`}>
            <input type="checkbox" checked={selectedIds.has(item.id)} onChange={() => toggleItem(item.id)}
              className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-ring" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">{item.name}</span>
                <span className="text-xs px-1.5 py-0.5 rounded-full font-medium bg-secondary text-muted-foreground">{impactLabels[item.impact]}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">{item.description}</p>
              <span className="text-xs text-muted-foreground">
                {item.typicalRange.unit === 'pln' ? `${item.typicalRange.min}-${item.typicalRange.max} zł` :
                 item.typicalRange.unit === 'percent' ? `~${item.typicalRange.min}-${item.typicalRange.max}% kwoty kredytu` :
                 `~${item.typicalRange.min}-${item.typicalRange.max}% wartości nieruchomości`}
              </span>
            </div>
          </label>
        ))}
      </div>

      {totalCount > 0 && (
        <Card>
          <h4 className="font-semibold text-foreground">Szacowany koszt ukrytych opłat</h4>
          <p className="text-2xl font-bold text-primary mt-2">{formatCurrency(totalSimulated)}</p>
          <p className="text-sm text-muted-foreground">Dla kredytu {formatCurrency(loanAmount)} &bull; {totalCount} pozycji zaznaczonych</p>
        </Card>
      )}

      {totalCount === 0 && (
        <Card>
          <p className="text-muted-foreground text-center py-4">Wybierz pozycje z listy, aby oszacować ukryte koszty swojego kredytu.</p>
        </Card>
      )}
    </div>
  )
}
