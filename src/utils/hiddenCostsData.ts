export type CostCategory = 'initial' | 'monthly' | 'oneTime' | 'exit' | 'risk' | 'insurance'

export interface HiddenCostItem {
  id: number
  name: string
  category: CostCategory
  description: string
  typicalRange: { min: number; max: number; unit: 'pln' | 'percent' | 'percentOfLoan' }
  impact: 'low' | 'medium' | 'high' | 'very-high'
}

export const hiddenCosts: HiddenCostItem[] = [
  { id: 1, name: 'Prowizja bankowa', category: 'initial', description: 'Opłata za udzielenie kredytu — zwykle 0-3% kwoty kredytu. W ofertach promocyjnych bywa zerowa, ale wtedy oprocentowanie może być wyższe.', typicalRange: { min: 0, max: 3, unit: 'percent' }, impact: 'high' },
  { id: 2, name: 'Wycena nieruchomości (rzeczoznawca)', category: 'initial', description: 'Bank wymaga operatu szacunkowego sporządzonego przez rzeczoznawcę. Koszt 400-800 zł, przy refinansowaniu trzeba zlecić kolejną wycenę.', typicalRange: { min: 400, max: 800, unit: 'pln' }, impact: 'low' },
  { id: 3, name: 'Opłata przygotowawcza', category: 'initial', description: 'Niektórzy banki pobierają opłatę za przygotowanie i analizę wniosku kredytowego przed wydaniem decyzji.', typicalRange: { min: 200, max: 500, unit: 'pln' }, impact: 'low' },
  { id: 4, name: 'Opłata za wniosek kredytowy', category: 'initial', description: 'Coraz rzadsza opłata za samo złożenie wniosku, ale niektóre banki wciąż pobierają 100-300 zł za rozpatrzenie.', typicalRange: { min: 0, max: 300, unit: 'pln' }, impact: 'low' },
  { id: 5, name: 'Prowadzenie rachunku bankowego', category: 'monthly', description: 'Większość banków wymaga posiadania konta i wpływających na nie wynagrodzeń. Koszt prowadzenia 0-15 zł/mies., często z warunkiem wpływu.', typicalRange: { min: 0, max: 15, unit: 'pln' }, impact: 'low' },
  { id: 6, name: 'Karta debetowa do konta', category: 'monthly', description: 'Niektóre banki naliczają opłatę za kartę do konta, z którego spłacany jest kredyt — 0-10 zł/mies. przy braku transakcji.', typicalRange: { min: 0, max: 10, unit: 'pln' }, impact: 'low' },
  { id: 7, name: 'Opłata za obsługę kredytu', category: 'monthly', description: 'Miesięczna opłata administracyjna za prowadzenie rachunku kredytu. Niekiedy ukryta w RRSO — 0-20 zł/mies.', typicalRange: { min: 0, max: 20, unit: 'pln' }, impact: 'medium' },
  { id: 8, name: 'Ubezpieczenie nieruchomości od ognia', category: 'monthly', description: 'Bank wymaga polisy na nieruchomość. Koszt 300-800 zł/rok, płatne z góry lub w ratach. Wybór polisy poza bankiem bywa tańszy.', typicalRange: { min: 300, max: 800, unit: 'pln' }, impact: 'medium' },
  { id: 9, name: 'Taksa notarialna (umowa kredytu)', category: 'oneTime', description: 'Notariusz pobiera opłatę za sporządzenie aktu notarialnego umowy kredytu. Stawki zależą od kwoty — maksymalnie 500-2000 zł.', typicalRange: { min: 500, max: 2000, unit: 'pln' }, impact: 'medium' },
  { id: 10, name: 'Podatek PCC od zakupu nieruchomości', category: 'oneTime', description: '2% ceny nieruchomości przy zakupie na rynku wtórnym. Rynek pierwotny: VAT w cenie. Często zaskakujący koszt.', typicalRange: { min: 0, max: 2, unit: 'percentOfLoan' }, impact: 'very-high' },
  { id: 11, name: 'Wpis do księgi wieczystej', category: 'oneTime', description: 'Opłata sądowa za założenie lub zmianę wpisu w księdze wieczystej. Koszt 200-1500 zł zależnie od wartości nieruchomości.', typicalRange: { min: 200, max: 1500, unit: 'pln' }, impact: 'low' },
  { id: 12, name: 'Opłata za przelew środków z kredytu', category: 'oneTime', description: 'Bank może naliczyć opłatę za przelew uruchomionych środków na konto sprzedającego lub dewelopera — 0-30 zł.', typicalRange: { min: 0, max: 30, unit: 'pln' }, impact: 'low' },
  { id: 13, name: 'Opłata za wysłanie dokumentów', category: 'oneTime', description: 'Niektóre banki pobierają opłatę za wysłanie umowy i harmonogramu spłat pocztą lub kurierem — 20-50 zł.', typicalRange: { min: 0, max: 50, unit: 'pln' }, impact: 'low' },
  { id: 14, name: 'Opłata za wcześniejszą spłatę', category: 'exit', description: 'W pierwszych latach bank może naliczyć do 3% za nadpłatę lub wcześniejszą spłatę. Po pierwszym roku — zazwyczaj 0% (ustawa).', typicalRange: { min: 0, max: 3, unit: 'percent' }, impact: 'high' },
  { id: 15, name: 'Prowizja za zamknięcie kredytu', category: 'exit', description: 'Niektóre banki pobierają symboliczną opłatę administracyjną za całkowitą spłatę i zamknięcie rachunku kredytu — 0-500 zł.', typicalRange: { min: 0, max: 500, unit: 'pln' }, impact: 'low' },
  { id: 16, name: 'Ryzyko wzrostu stóp (WIBOR)', category: 'risk', description: 'Podwyżki WIBOR mogą drastycznie zwiększyć ratę. Przy kredycie 400k zł każdy 1% wzrostu to ~200-250 zł więcej miesięcznie.', typicalRange: { min: 1, max: 5, unit: 'percentOfLoan' }, impact: 'very-high' },
  { id: 17, name: 'Spread walutowy (kredyty walutowe)', category: 'risk', description: 'Różnica między kursem kupna a sprzedaży waluty. Przy kredytach we frankach czy euro bank zarabia na spreadzie 3-5%.', typicalRange: { min: 3, max: 5, unit: 'percent' }, impact: 'high' },
  { id: 18, name: 'Brak okresu bezodsetkowego', category: 'risk', description: 'Odsetki naliczane są od dnia uruchomienia kredytu, nie od pierwszej raty. Przy opóźnieniu w wypłacie kredyt jest droższy.', typicalRange: { min: 0, max: 3000, unit: 'pln' }, impact: 'medium' },
  { id: 19, name: 'Ryzyko odmowy wakacji kredytowych', category: 'risk', description: 'Bank może odmówić zawieszenia spłaty. W praktyce wakacje kredytowe dostępne tylko w szczególnych sytuacjach.', typicalRange: { min: 0, max: 5000, unit: 'pln' }, impact: 'medium' },
  { id: 20, name: 'Ubezpieczenie pomostowe', category: 'insurance', description: 'Wymagane do momentu wpisu hipoteki do księgi wieczystej. Koszt 300-800 zł, często droższe niż standardowe ubezpieczenie.', typicalRange: { min: 300, max: 800, unit: 'pln' }, impact: 'medium' },
  { id: 21, name: 'Ubezpieczenie niskiego wkładu (LTV > 80%)', category: 'insurance', description: 'Gdy wkład własny jest poniżej 20%, bank wymaga ubezpieczenia. Koszt 1-3% różnicy między wkładem a 20% wartości, płatny z góry.', typicalRange: { min: 1, max: 3, unit: 'percentOfLoan' }, impact: 'high' },
  { id: 22, name: 'Ubezpieczenie na życie (cesja)', category: 'insurance', description: 'Bank wymaga polisy na życie z cesją na bank. Koszt 20-100 zł/mies. Własna polisa poza bankiem bywa 30-50% tańsza.', typicalRange: { min: 20, max: 100, unit: 'pln' }, impact: 'medium' },
  { id: 23, name: 'Ubezpieczenie od utraty pracy', category: 'insurance', description: 'Dodatkowa polisa chroniąca w razie bezrobocia. Koszt 30-80 zł/mies., często ograniczona do 6-12 miesięcy wypłaty.', typicalRange: { min: 30, max: 80, unit: 'pln' }, impact: 'low' },
  { id: 24, name: 'Prowizja za zmianę warunków umowy', category: 'exit', description: 'Bank może naliczyć opłatę za aneks do umowy np. zmianę okresu kredytowania lub zawieszenie spłaty — 200-800 zł.', typicalRange: { min: 200, max: 800, unit: 'pln' }, impact: 'medium' },
]

export function getCostsByCategory(category: CostCategory): HiddenCostItem[] {
  return hiddenCosts.filter(c => c.category === category)
}

export function getCategories(): { key: CostCategory; label: string; icon: string }[] {
  return [
    { key: 'initial', label: 'Koszty początkowe', icon: '' },
    { key: 'monthly', label: 'Koszty miesięczne', icon: '' },
    { key: 'oneTime', label: 'Opłaty jednorazowe', icon: '📄' },
    { key: 'exit', label: 'Koszty wyjścia', icon: '🚪' },
    { key: 'risk', label: 'Ryzyka', icon: '⚠️' },
    { key: 'insurance', label: 'Ubezpieczenia', icon: '🛡️' },
  ]
}

export function simulateTotalHiddenCosts(loanAmount: number, selectedIds: number[]): number {
  const selected = hiddenCosts.filter(c => selectedIds.includes(c.id))
  let total = 0
  for (const item of selected) {
    if (item.typicalRange.unit === 'pln') {
      total += (item.typicalRange.min + item.typicalRange.max) / 2
    } else if (item.typicalRange.unit === 'percent') {
      const avgPct = (item.typicalRange.min + item.typicalRange.max) / 2 / 100
      total += loanAmount * avgPct
    } else if (item.typicalRange.unit === 'percentOfLoan') {
      const avgPct = (item.typicalRange.min + item.typicalRange.max) / 2 / 100
      total += loanAmount * avgPct
    }
  }
  return total
}
