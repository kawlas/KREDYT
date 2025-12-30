export function calculateRRSO(
  loanAmount: number,
  monthlyPayment: number,
  loanTermMonths: number,
  upfrontCosts: number
): number {
  // RRSO = efektywna stopa uwzględniająca wszystkie koszty
  // Uproszczony wzór

  const totalPaid = monthlyPayment * loanTermMonths
  const effectiveAmount = loanAmount - upfrontCosts
  const totalInterestWithCosts = totalPaid - effectiveAmount

  const averageAnnualCost = totalInterestWithCosts / (loanTermMonths / 12)
  const rrso = (averageAnnualCost / effectiveAmount) * 100

  return Math.max(0, rrso)
}

export function calculateNominalRate(wibor: number, margin: number): number {
  return wibor + margin
}
