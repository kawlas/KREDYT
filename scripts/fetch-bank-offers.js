import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Current WIBOR reference — fetched from public/wibor.json if available
function getWiborRef() {
  try {
    const wiborPath = path.join(__dirname, '..', 'public', 'wibor.json')
    const data = JSON.parse(fs.readFileSync(wiborPath, 'utf-8'))
    return data.rates?.['3M'] || 5.85
  } catch {
    return 5.85
  }
}

/**
 * Fetch current bank mortgage margins from comparison site Bankier.pl ranking page.
 *
 * Data source: Bankier.pl mortgage ranking — periodically published side-by-side
 * comparison of major Polish banks with current margins and conditions.
 *
 * Since scraping HTML is fragile, this script uses a conservative matching strategy:
 * it looks for known bank names and their margin values in the page text.
 *
 * If parsing fails, the existing data file is NOT overwritten.
 */
async function main() {
  console.log('Fetching bank offers from Bankier.pl ranking...')

  let html
  try {
    const resp = await fetch('https://www.bankier.pl/smart/mieszkaniowe/ranking-kredytow-hipotecznych')
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
    html = await resp.text()
  } catch (e) {
    console.error('Failed to fetch Bankier.pl ranking:', e.message)
    console.log('Keeping existing bank-offers.json unchanged.')
    process.exit(0) // Soft fail — don't break build
  }

  // Extract bank margin data using regex patterns
  // Format expected: "Nazwa Banku" near percentage values
  const bankPatterns = [
    { id: 'pko-bp', name: 'PKO BP', pattern: /PKO\s*BP[^%]*?(\d+[.,]\d+)\s*%/i },
    { id: 'ing', name: 'ING', pattern: /ING[^%]*?(\d+[.,]\d+)\s*%/i },
    { id: 'santander', name: 'Santander', pattern: /Santander[^%]*?(\d+[.,]\d+)\s*%/i },
    { id: 'mbank', name: 'mBank', pattern: /mBank[^%]*?(\d+[.,]\d+)\s*%/i },
    { id: 'millennium', name: 'Millennium', pattern: /Millennium[^%]*?(\d+[.,]\d+)\s*%/i },
    { id: 'pekao', name: 'Pekao', pattern: /Pekao[^%]*?(\d+[.,]\d+)\s*%/i },
    { id: 'alior', name: 'Alior', pattern: /Alior[^%]*?(\d+[.,]\d+)\s*%/i },
  ]

  let parsedCount = 0
  const wiborRef = getWiborRef()

  for (const bank of bankPatterns) {
    const match = html.match(bank.pattern)
    if (match) {
      const margin = parseFloat(match[1].replace(',', '.'))
      if (margin > 0.5 && margin < 10) {
        bank._margin = margin
        bank._totalRate = +(margin + wiborRef).toFixed(2)
        parsedCount++
      }
    }
  }

  if (parsedCount < 4) {
    console.error(`Only parsed ${parsedCount}/7 banks — data incomplete, keeping existing file.`)
    process.exit(0)
  }

  const output = {
    updated: new Date().toISOString(),
    wiborRef,
    source: 'Bankier.pl — ranking kredytów hipotecznych',
    sourceUrl: 'https://www.bankier.pl/smart/mieszkaniowe/ranking-kredytow-hipotecznych',
    banks: bankPatterns.map(b => ({
      id: b.id,
      name: b.name,
      margin: +((b._margin || 0)).toFixed(2),
      totalRate: b._totalRate || null,
    })),
    disclaimer: 'Marże są wartościami orientacyjnymi. Rzeczywista oferta zależy od indywidualnej oceny zdolności kredytowej, LTV i negocjacji.',
  }

  const outPath = path.join(__dirname, '..', 'public', 'bank-offers.json')
  fs.mkdirSync(path.dirname(outPath), { recursive: true })
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2))

  console.log(`Bank offers updated: ${parsedCount}/7 banks parsed`)
  console.log(`File: ${outPath}`)
}

main()
