import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function parseBankierHtml(html) {
  const match3M = html.match(/WIBOR\s*3M[^0-9]*(\d+[.,]\d+)\s*%/i)
  const match6M = html.match(/WIBOR\s*6M[^0-9]*(\d+[.,]\d+)\s*%/i)

  if (!match3M || !match6M) return null

  const rate3M = parseFloat(match3M[1].replace(',', '.'))
  const rate6M = parseFloat(match6M[1].replace(',', '.'))

  if (rate3M <= 0 || rate3M > 20 || rate6M <= 0 || rate6M > 20) return null

  return { rate3M, rate6M }
}

async function fetchWIBOR() {
  let rates = null
  let source = ''

  // Primary: Bankier.pl
  try {
    console.log('Fetching WIBOR rates from Bankier.pl...')
    const response = await fetch('https://www.bankier.pl/mieszkaniowe/stopy-procentowe/wibor')
    if (response.ok) {
      const html = await response.text()
      rates = parseBankierHtml(html)
      if (rates) source = 'Bankier.pl'
    }
  } catch (e) {
    console.warn('Bankier.pl fetch failed:', e.message)
  }

  // Fallback: NBP API reference rates
  if (!rates) {
    try {
      console.log('Trying NBP API fallback...')
      const resp = await fetch('https://api.nbp.pl/api/stopyreferencyjne/2026-06-01/2026-06-14/?format=json')
      if (resp.ok) {
        const data = await resp.json()
        // NBP reference rate is a proxy for WIBOR direction
        // Take the latest reference rate and adjust to approximate WIBOR
        const latest = data[data.length - 1]
        if (latest?.wartosc) {
          // WIBOR is typically ~0.2-0.3pp above the NBP reference rate
          const refRate = parseFloat(latest.wartosc.replace(',', '.'))
          rates = {
            rate3M: +(refRate + 0.10).toFixed(2),
            rate6M: +(refRate + 0.05).toFixed(2),
          }
          source = 'NBP (reference rate approximation)'
          console.warn('Using NBP approximation — WIBOR estimated from reference rate')
        }
      }
    } catch (e) {
      console.warn('NBP fallback also failed:', e.message)
    }
  }

  if (!rates) {
    console.error('✗ All WIBOR sources failed')
    process.exit(1)
  }

  const data = {
    updated: new Date().toISOString(),
    source,
    rates: {
      '3M': rates.rate3M,
      '6M': rates.rate6M
    }
  }

  const outputPath = path.join(__dirname, '..', 'public', 'wibor.json')
  fs.mkdirSync(path.dirname(outputPath), { recursive: true })
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2))

  console.log('✓ WIBOR updated successfully:')
  console.log(`  3M: ${rates.rate3M}%`)
  console.log(`  6M: ${rates.rate6M}%`)
  console.log(`  Source: ${source}`)
  console.log(`  File: ${outputPath}`)
}

fetchWIBOR();
