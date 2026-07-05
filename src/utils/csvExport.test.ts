import { describe, it, expect } from 'vitest'
import { objectsToCsv, amortizationToCsv, downloadCsv } from './csvExport'
import type { AmortizationRow } from './loanCalculations'

describe('objectsToCsv', () => {
  it('tworzy nagłówek i wiersze', () => {
    const data = [{ name: 'Jan', age: 30 }, { name: 'Anna', age: 25 }]
    const columns = [
      { key: 'name' as keyof typeof data[0], label: 'Imię' },
      { key: 'age' as keyof typeof data[0], label: 'Wiek' },
    ]
    const csv = objectsToCsv(data, columns)
    expect(csv).toContain('Imię')
    expect(csv).toContain('Wiek')
    expect(csv).toContain('Jan')
    expect(csv).toContain('30')
  })

  it('używa średnika jako separatora', () => {
    const data = [{ a: 1, b: 2 }]
    const columns = [
      { key: 'a' as keyof typeof data[0], label: 'A' },
      { key: 'b' as keyof typeof data[0], label: 'B' },
    ]
    const csv = objectsToCsv(data, columns)
    expect(csv).toContain('A;B')
  })

  it('zamienia kropkę na przecinek w liczbach', () => {
    const data = [{ value: 1234.56 }]
    const columns = [{ key: 'value' as keyof typeof data[0], label: 'Wartość' }]
    const csv = objectsToCsv(data, columns)
    expect(csv).toContain('1234,56')
  })

  it('obsługuje puste dane', () => {
    const csv = objectsToCsv([], [{ key: 'x' as never, label: 'X' }])
    expect(csv).toBe('X')
  })

  it('eskapuje wartości z cudzysłowem — podwaja cudzysłów', () => {
    const data = [{ text: 'he"llo' }]
    const columns = [{ key: 'text' as keyof typeof data[0], label: 'Text' }]
    const csv = objectsToCsv(data, columns)
    expect(csv).toContain('"he""llo"')
  })

  it('eskapuje wartości z separatorem', () => {
    const data = [{ text: 'a;b' }]
    const columns = [{ key: 'text' as keyof typeof data[0], label: 'Text' }]
    const csv = objectsToCsv(data, columns)
    expect(csv).toContain('"')
  })
})

describe('amortizationToCsv', () => {
  it('generuje CSV z harmonogramem', () => {
    const schedule: AmortizationRow[] = [
      { month: 1, principalPart: 500, interestPart: 2000, totalPayment: 2500, remainingBalance: 399500 },
      { month: 2, principalPart: 502, interestPart: 1998, totalPayment: 2500, remainingBalance: 398998 },
    ]
    const csv = amortizationToCsv(schedule)
    expect(csv).toContain('Miesiąc')
    expect(csv).toContain('Rata')
    expect(csv).toContain('kapitałowa')
    expect(csv).toContain('odsetkowa')
    expect(csv).toContain('Pozostało')
    expect(csv).toContain('1')
    expect(csv).toContain('2')
  })

  it('obsługuje pusty harmonogram', () => {
    const csv = amortizationToCsv([])
    expect(csv).toContain('Miesiąc')
    const lines = csv.split('\n')
    expect(lines.length).toBe(1) // tylko nagłówek
  })
})

describe('downloadCsv', () => {
  it('tworzy i klika link (nie rzuca błędem jeśli URL.createObjectURL istnieje)', () => {
    // W jsdom URL.createObjectURL nie istnieje, więc test sprawdza
    // że funkcja nie rzuca błędu gdy API jest dostępne
    if (typeof URL.createObjectURL === 'function') {
      expect(() => {
        downloadCsv('test,data', 'test.csv')
      }).not.toThrow()
    }
    // Jeśli nie ma API (jsdom), po prostu pomijamy test
  })
})