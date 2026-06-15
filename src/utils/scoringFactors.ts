export interface ScoringFactor {
  id: number
  name: string
  description: string
  impact: number
  category: 'positive' | 'negative' | 'neutral'
  tip?: string
}

export const scoringFactors: ScoringFactor[] = [
  {
    id: 1,
    name: 'Terminowe spłaty wszystkich zobowiązań',
    description: 'Brak opóźnień w spłacie kredytów, rat, rachunków.',
    impact: 30,
    category: 'positive',
    tip: 'Ustaw automatyczne przelewy, aby nigdy nie przegapić terminu płatności.',
  },
  {
    id: 2,
    name: 'Opóźnienia w spłatach 30-60 dni',
    description: 'Jednorazowe opóźnienie do 60 dni w spłacie zobowiązań.',
    impact: -20,
    category: 'negative',
    tip: 'Spłać zaległości i unikaj opóźnień przez minimum 12 kolejnych miesięcy.',
  },
  {
    id: 3,
    name: 'Opóźnienia w spłatach 60-90 dni',
    description: 'Poważne opóźnienie w spłacie trwające do 90 dni.',
    impact: -40,
    category: 'negative',
    tip: 'Skontaktuj się z bankiem w sprawie restrukturyzacji zadłużenia i spłacaj regularnie.',
  },
  {
    id: 4,
    name: 'Wysokie zadłużenie na kartach kredytowych',
    description: 'Wykorzystanie powyżej 50% limitu na kartach kredytowych.',
    impact: -15,
    category: 'negative',
    tip: 'Spłać karty kredytowe i utrzymuj saldo poniżej 30% limitu.',
  },
  {
    id: 5,
    name: 'Wiek historii kredytowej powyżej 5 lat',
    description: 'Posiadasz udokumentowaną historię spłat dłuższą niż 5 lat.',
    impact: 25,
    category: 'positive',
    tip: 'Im dłuższa pozytywna historia, tym lepiej — kontynuuj budowanie swojej wiarygodności.',
  },
  {
    id: 6,
    name: 'Krótka historia kredytowa (poniżej 1 roku)',
    description: 'Twoja historia w BIK jest krótsza niż 12 miesięcy.',
    impact: -20,
    category: 'negative',
    tip: 'Rozważ założenie karty kredytowej i regulowanie jej w terminie, aby zbudować historię.',
  },
  {
    id: 7,
    name: 'Liczba zapytań BIK powyżej 5 w ostatnim roku',
    description: 'Wiele zapytań o scoring w krótkim czasie może świadczyć o desperacji.',
    impact: -10,
    category: 'negative',
    tip: 'Unikaj składania wielu wniosków kredytowych naraz — każde pozostawia ślad w BIK.',
  },
  {
    id: 8,
    name: 'Posiadanie konta oszczędnościowego',
    description: 'Regularne oszczędzanie na koncie oszczędnościowym.',
    impact: 10,
    category: 'positive',
    tip: 'Odkładaj regularnie choćby małe kwoty — to buduje profil oszczędnościowy.',
  },
  {
    id: 9,
    name: 'Stałe zatrudnienie powyżej 2 lat (umowa o pracę)',
    description: 'Stabilne zatrudnienie na umowę o pracę od co najmniej 2 lat.',
    impact: 20,
    category: 'positive',
    tip: 'Stałe zatrudnienie to jeden z najważniejszych atutów — nie zmieniaj pracy przed wnioskiem.',
  },
  {
    id: 10,
    name: 'Umowa o dzieło lub zlecenie',
    description: 'Praca na elastycznych formach zatrudnienia (mniej stabilna).',
    impact: -10,
    category: 'negative',
    tip: 'Przed wnioskiem o kredyt pokaż historię wpływów na konto z ostatnich 12-24 miesięcy.',
  },
  {
    id: 11,
    name: 'Posiadanie innych czynnych kredytów',
    description: 'Spłacasz już inne kredyty (gotówkowy, samochodowy, mieszkaniowy).',
    impact: -5,
    category: 'negative',
    tip: 'Rozważ konsolidację istniejących zobowiązań przed wnioskiem o nowy kredyt.',
  },
  {
    id: 12,
    name: 'Kredyt konsolidacyjny w historii',
    description: 'Korzystałeś z kredytu konsolidacyjnego.',
    impact: -15,
    category: 'negative',
    tip: 'Konsolidacja może świadczyć o problemach finansowych — pracuj nad stabilnością.',
  },
  {
    id: 13,
    name: 'Działalność gospodarcza powyżej 3 lat',
    description: 'Prowadzisz własną firmę od co najmniej 3 lat z dodatnim wynikiem.',
    impact: 15,
    category: 'positive',
    tip: 'Przygotuj PIT-y i wyciągi z konta firmowego z ostatnich 3 lat.',
  },
  {
    id: 14,
    name: 'Rekomendacja Rzetelny Klient w BIK',
    description: 'Posiadasz rekomendację "Rzetelny Klient" w systemie BIK.',
    impact: 35,
    category: 'positive',
    tip: 'Sprawdź w BIK, czy posiadasz taką rekomendację — możesz wypromować swój scoring.',
  },
  {
    id: 15,
    name: 'Zmiana danych osobowych w ostatnim roku',
    description: 'Częste zmiany adresu zameldowania lub nazwiska.',
    impact: -5,
    category: 'negative',
    tip: 'Stabilność danych osobowych buduje zaufanie banku — unikaj częstych zmian.',
  },
]

export function calculateScore(selectedFactorIds: number[]): number {
  let score = 500
  for (const id of selectedFactorIds) {
    const factor = scoringFactors.find(f => f.id === id)
    if (factor) score += factor.impact
  }
  return Math.max(200, Math.min(800, Math.round(score)))
}

export function getScoreBand(score: number): 'low' | 'medium' | 'high' | 'very-high' {
  if (score < 400) return 'low'
  if (score < 600) return 'medium'
  if (score < 700) return 'high'
  return 'very-high'
}

export function getScoreLabel(band: string): string {
  const labels: Record<string, string> = {
    'low': 'Niska zdolność — ryzyko odmowy',
    'medium': 'Średnia zdolność — możliwe wyższe marże',
    'high': 'Wysoka zdolność — dobre warunki',
    'very-high': 'Bardzo wysoka — najlepsze oferty',
  }
  return labels[band] || ''
}

export function getScoreBandColor(band: string): string {
  const colors: Record<string, string> = {
    'low': 'text-red-600 bg-red-50 border-red-200',
    'medium': 'text-yellow-600 bg-yellow-50 border-yellow-200',
    'high': 'text-green-600 bg-green-50 border-green-200',
    'very-high': 'text-emerald-600 bg-emerald-50 border-emerald-200',
  }
  return colors[band] || 'text-gray-600 bg-gray-50 border-gray-200'
}

export function getScoreProgressColor(band: string): string {
  const colors: Record<string, string> = {
    'low': 'bg-red-500',
    'medium': 'bg-yellow-500',
    'high': 'bg-green-500',
    'very-high': 'bg-emerald-500',
  }
  return colors[band] || 'bg-gray-300'
}

export function getPercentile(score: number): number {
  if (score <= 200) return 0
  if (score >= 800) return 100
  return Math.round(((score - 200) / 600) * 100)
}
