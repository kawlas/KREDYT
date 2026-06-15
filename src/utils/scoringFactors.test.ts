import { describe, it, expect } from 'vitest'
import { scoringFactors, calculateScore, getScoreBand, getScoreLabel, getPercentile } from './scoringFactors'

describe('scoringFactors', () => {
  it('has at least 10 factors affecting credit score', () => {
    expect(scoringFactors.length).toBeGreaterThanOrEqual(10)
  })

  it('has at least 15 factors', () => {
    expect(scoringFactors.length).toBeGreaterThanOrEqual(15)
  })

  it('each factor has required fields', () => {
    for (const f of scoringFactors) {
      expect(f.id).toBeDefined()
      expect(typeof f.id).toBe('number')
      expect(f.name).toBeDefined()
      expect(typeof f.name).toBe('string')
      expect(f.name.length).toBeGreaterThan(0)
      expect(f.description).toBeDefined()
      expect(typeof f.description).toBe('string')
      expect(f.description.length).toBeGreaterThan(0)
      expect(typeof f.impact).toBe('number')
      expect(f.impact).toBeGreaterThanOrEqual(-50)
      expect(f.impact).toBeLessThanOrEqual(50)
    }
  })

  it('each factor has valid category', () => {
    for (const f of scoringFactors) {
      expect(['positive', 'negative', 'neutral']).toContain(f.category)
    }
  })

  it('has factors with both positive and negative impact', () => {
    const positives = scoringFactors.filter(f => f.impact > 0)
    const negatives = scoringFactors.filter(f => f.impact < 0)
    expect(positives.length).toBeGreaterThan(0)
    expect(negatives.length).toBeGreaterThan(0)
  })

  it('has at least 4 positive factors', () => {
    const positives = scoringFactors.filter(f => f.impact > 0)
    expect(positives.length).toBeGreaterThanOrEqual(4)
  })

  it('has at least 4 negative factors', () => {
    const negatives = scoringFactors.filter(f => f.impact < 0)
    expect(negatives.length).toBeGreaterThanOrEqual(4)
  })

  it('positive factors have tips for improvement', () => {
    const positives = scoringFactors.filter(f => f.impact > 0)
    for (const f of positives) {
      expect(f.tip).toBeDefined()
    }
  })

  it('negative factors have tips for improvement', () => {
    const negatives = scoringFactors.filter(f => f.impact < 0)
    for (const f of negatives) {
      expect(f.tip).toBeDefined()
    }
  })

  it('has unique IDs across all factors', () => {
    const ids = scoringFactors.map(f => f.id)
    const uniqueIds = new Set(ids)
    expect(uniqueIds.size).toBe(ids.length)
  })

  it('factor with highest positive impact is "Rekomendacja Rzetelny Klient"', () => {
    const highest = scoringFactors.reduce((a, b) => a.impact > b.impact ? a : b)
    expect(highest.name).toContain('Rzetelny')
    expect(highest.impact).toBe(35)
  })

  it('factor with most negative impact is 60-90 day delay', () => {
    const lowest = scoringFactors.reduce((a, b) => a.impact < b.impact ? a : b)
    expect(lowest.name).toContain('60-90')
    expect(lowest.impact).toBe(-40)
  })
})

describe('calculateScore', () => {
  it('calculates base score with no factors applied', () => {
    const result = calculateScore([])
    expect(result).toBe(500)
  })

  it('adds positive impact factors', () => {
    const positiveIds = scoringFactors.filter(f => f.impact > 0).map(f => f.id)
    const result = calculateScore(positiveIds)
    const expectedSum = scoringFactors.filter(f => f.impact > 0).reduce((sum, f) => sum + f.impact, 500)
    expect(result).toBeGreaterThan(500)
    expect(result).toBe(Math.min(800, Math.max(200, expectedSum)))
  })

  it('subtracts negative impact factors', () => {
    const negativeFactor = scoringFactors.find(f => f.impact < 0)
    if (negativeFactor) {
      const result = calculateScore([negativeFactor.id])
      expect(result).toBeLessThan(500)
      expect(result).toBe(500 + negativeFactor.impact)
    }
  })

  it('caps at max score of 800', () => {
    const allIds = scoringFactors.filter(f => f.impact > 0).map(f => f.id)
    const result = calculateScore(allIds)
    expect(result).toBeLessThanOrEqual(800)
  })

  it('floor at min score of 200', () => {
    const allIds = scoringFactors.filter(f => f.impact < 0).map(f => f.id)
    const result = calculateScore(allIds)
    expect(result).toBeGreaterThanOrEqual(200)
  })

  it('rounds to integer', () => {
    const result = calculateScore([1, 2])
    expect(Number.isInteger(result)).toBe(true)
  })
})

describe('getScoreBand', () => {
  it('returns "low" for score < 400', () => {
    expect(getScoreBand(350)).toBe('low')
  })

  it('returns "medium" for score 400-600', () => {
    expect(getScoreBand(400)).toBe('medium')
    expect(getScoreBand(500)).toBe('medium')
    expect(getScoreBand(599)).toBe('medium')
  })

  it('returns "high" for score 600-700', () => {
    expect(getScoreBand(600)).toBe('high')
    expect(getScoreBand(650)).toBe('high')
    expect(getScoreBand(699)).toBe('high')
  })

  it('returns "very-high" for score > 700', () => {
    expect(getScoreBand(701)).toBe('very-high')
    expect(getScoreBand(750)).toBe('very-high')
    expect(getScoreBand(800)).toBe('very-high')
  })

  it('handles edge values correctly', () => {
    expect(getScoreBand(400)).toBe('medium')
    expect(getScoreBand(600)).toBe('high')
    expect(getScoreBand(700)).toBe('very-high')
  })
})

describe('getScoreLabel', () => {
  it('returns label for known bands', () => {
    expect(getScoreLabel('low')).toContain('Niska')
    expect(getScoreLabel('medium')).toContain('Średnia')
    expect(getScoreLabel('high')).toContain('Wysoka')
    expect(getScoreLabel('very-high')).toContain('Bardzo wysoka')
  })

  it('returns empty string for unknown band', () => {
    expect(getScoreLabel('unknown')).toBe('')
  })
})

describe('getPercentile', () => {
  it('returns 0 for minimum score', () => {
    expect(getPercentile(200)).toBe(0)
  })

  it('returns 100 for maximum score', () => {
    expect(getPercentile(800)).toBe(100)
  })

  it('returns 50 for middle score', () => {
    expect(getPercentile(500)).toBe(50)
  })

  it('returns correct percentile for any score', () => {
    const p = getPercentile(350)
    expect(p).toBeGreaterThanOrEqual(0)
    expect(p).toBeLessThanOrEqual(100)
  })
})
