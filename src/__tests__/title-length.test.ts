import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

const MAX_TITLE_LENGTH = 60

function extractTitlesFromFile(filePath: string): { line: number; title: string }[] {
  const content = fs.readFileSync(filePath, 'utf-8')
  const lines = content.split('\n')
  const titles: { line: number; title: string }[] = []
  lines.forEach((line, i) => {
    const match = line.match(/title=["'](.+?)["']/)
    if (match) titles.push({ line: i + 1, title: match[1] })
  })
  return titles
}

function extractMetaTitlesFromFile(filePath: string): { line: number; title: string }[] {
  const content = fs.readFileSync(filePath, 'utf-8')
  const lines = content.split('\n')
  const titles: { line: number; title: string }[] = []
  lines.forEach((line, i) => {
    const match = line.match(/metaTitle:\s*["'](.+?)["']/)
    if (match) titles.push({ line: i + 1, title: match[1] })
  })
  return titles
}

describe(`Meta titles ≤ ${MAX_TITLE_LENGTH} znaków`, () => {
  const pagesDir = path.resolve(__dirname, '../pages')
  const pageFiles = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'))

  for (const file of pageFiles) {
    const titles = extractTitlesFromFile(path.join(pagesDir, file))
    for (const { line, title } of titles) {
      it(`${file}:${line} — "${title.slice(0, 30)}..." ≤ ${MAX_TITLE_LENGTH} (${title.length})`, () => {
        expect(title.length).toBeLessThanOrEqual(MAX_TITLE_LENGTH)
      })
    }
  }

  const topicsFile = path.resolve(__dirname, '../data/topics.ts')
  const topicTitles = extractMetaTitlesFromFile(topicsFile)
  for (const { line, title } of topicTitles) {
    it(`topics.ts:${line} — "${title.slice(0, 30)}..." ≤ ${MAX_TITLE_LENGTH} (${title.length})`, () => {
      expect(title.length).toBeLessThanOrEqual(MAX_TITLE_LENGTH)
    })
  }
})
