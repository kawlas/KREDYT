export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('pl-PL', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount) + ' zł'
}

export const formatCurrencyShort = (amount: number): string => {
  return new Intl.NumberFormat('pl-PL', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(Math.round(amount)) + ' zł'
}

export const formatPercent = (value: number, decimals: number = 2): string => {
  return value.toFixed(decimals) + '%'
}

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('pl-PL').format(Math.round(value))
}

export const formatMonths = (months: number): string => {
  const years = Math.floor(months / 12)
  const remainingMonths = months % 12

  if (years === 0) return `${remainingMonths} mies.`
  if (remainingMonths === 0) return `${years} lat`
  return `${years} lat ${remainingMonths} mies.`
}
