export interface OverpaymentInput {
  principal: number       // Początkowy kapitał
  annualRate: number      // Oprocentowanie roczne w %
  years: number           // Okres w latach
  lumpSum: number         // Jednorazowa nadpłata
  monthlyExtra: number    // Nadpłata cykliczna co miesiąc
  strategy: 'term' | 'payment' // 'term' = skrócenie okresu, 'payment' = zmniejszenie raty
  monthsElapsed: number   // Ile miesięcy kredyt już trwa
  rateType: 'variable' | 'fixed' // Zmienne vs Stałe oprocentowanie
  installmentType: 'equal' | 'declining' // Równe vs Malejące
}

export interface ScheduleRow {
  month: number
  payment: number
  principalPart: number
  interestPart: number
  extraPayment: number
  remainingPrincipal: number
}

export interface OverpaymentSummary {
  originalMonthlyPayment: number
  newMonthlyPayment?: number
  originalTotalInterest: number
  newTotalInterest: number
  interestSaved: number
  originalMonths: number
  newMonths: number
  monthsSaved: number
  earlyRepaymentFee: number
  feeReason: string | null
  schedule: ScheduleRow[]
}

/**
 * Precyzyjne wyliczenie harmonogramu z nadpłatami uwzględniające polskie przepisy:
 * - Zmienne: brak prowizji po 12 miesiącach, max 3% wcześniej.
 * - Stałe: max 2% w ciągu pierwszych 36 miesięcy.
 * - Równe vs Malejące raty.
 */
export function calculateOverpaymentSchedule(input: OverpaymentInput): OverpaymentSummary {
  const monthlyRate = input.annualRate / 100 / 12
  const totalMonths = input.years * 12

  // 1. Rata początkowa (dla równych) lub pierwsza rata (dla malejących)
  const originalPayment = monthlyRate === 0
    ? input.principal / totalMonths
    : input.principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1)

  // 2. Prowizja za wcześniejszą spłatę wg przepisów w Polsce
  const totalExtraPlanned = input.lumpSum + (input.monthlyExtra * totalMonths)
  let fee = 0
  let feeReason: string | null = null

  if (input.rateType === 'variable') {
    if (input.monthsElapsed < 12 && totalExtraPlanned > 0) {
      fee = Math.min(totalExtraPlanned * 0.03, totalExtraPlanned)
      feeReason = 'Prowizja 3% (zgodnie z ustawą dla oprocentowania zmiennego w pierwszym roku)'
    } else {
      feeReason = 'Brak prowizji (dla oprocentowania zmiennego po 12 miesiącach spłaty)'
    }
  } else {
    // Stałe oprocentowanie: zazwyczaj pierwsze 36 miesięcy, do 2%
    if (input.monthsElapsed < 36 && totalExtraPlanned > 0) {
      fee = Math.min(totalExtraPlanned * 0.02, totalExtraPlanned)
      feeReason = 'Prowizja do 2% (dla oprocentowania stałego w okresie pierwszych 3 lat)'
    } else {
      feeReason = 'Brak prowizji (po okresie stałym lub po 3 latach)'
    }
  }

  // 3. Symulacja miesiąc po miesiącu
  let schedule: ScheduleRow[] = []
  let totalInterestPaid = 0
  let activeMonth = 0
  let workingPrincipal = input.principal

  const decliningPrincipalPart = input.principal / totalMonths

  while (workingPrincipal > 0 && activeMonth < totalMonths) {
    activeMonth++
    const interestPart = workingPrincipal * monthlyRate

    let principalPart = 0
    if (input.installmentType === 'equal') {
      principalPart = originalPayment - interestPart
    } else {
      principalPart = decliningPrincipalPart
    }

    // Dodanie jednorazowej nadpłaty w 1 miesiącu
    let extraThisMonth = input.monthlyExtra
    if (activeMonth === 1) {
      extraThisMonth += input.lumpSum
    }

    if (principalPart + extraThisMonth >= workingPrincipal) {
      principalPart = workingPrincipal
      extraThisMonth = 0
      workingPrincipal = 0
    } else {
      workingPrincipal -= (principalPart + extraThisMonth)
    }

    totalInterestPaid += interestPart

    const currentMonthlyPayment = input.installmentType === 'equal'
      ? principalPart + interestPart + extraThisMonth
      : decliningPrincipalPart + interestPart + extraThisMonth

    schedule.push({
      month: activeMonth,
      payment: currentMonthlyPayment,
      principalPart,
      interestPart,
      extraPayment: extraThisMonth,
      remainingPrincipal: Math.max(0, workingPrincipal)
    })

    if (workingPrincipal <= 0) break
  }

  // Oryginalne odsetki szacunkowe
  const originalInterest = (originalPayment * totalMonths) - input.principal
  const newMonths = schedule.length
  const monthsSaved = totalMonths - newMonths
  const interestSaved = Math.max(0, originalInterest - totalInterestPaid)

  let newPayment: number | undefined = undefined
  if (input.strategy === 'payment' && newMonths > 0 && input.installmentType === 'equal') {
    const remainingTerm = totalMonths - input.monthsElapsed
    if (remainingTerm > 0 && workingPrincipal > 0) {
      newPayment = monthlyRate === 0
        ? workingPrincipal / remainingTerm
        : workingPrincipal * (monthlyRate * Math.pow(1 + monthlyRate, remainingTerm)) / (Math.pow(1 + monthlyRate, remainingTerm) - 1)
    }
  }

  return {
    originalMonthlyPayment: originalPayment,
    newMonthlyPayment: newPayment,
    originalTotalInterest: originalInterest,
    newTotalInterest: totalInterestPaid,
    interestSaved,
    originalMonths: totalMonths,
    newMonths,
    monthsSaved: monthsSaved > 0 ? monthsSaved : 0,
    earlyRepaymentFee: fee,
    feeReason,
    schedule
  }
}
