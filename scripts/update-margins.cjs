#!/usr/bin/env node
/**
 * update-margins.js
 *
 * Narzędzie do aktualizacji marż banków w bank-offers.json.
 * Uruchamiane raz w miesiącu po sprawdzeniu rankingu Bankier.pl.
 *
 * Użycie:
 *   node scripts/update-margins.js               # interaktywny — wpisujesz marże ręcznie
 *   node scripts/update-margins.js --check        # tylko pokazuje co trzeba zaktualizować
 *   node scripts/update-margins.js --help         # pomoc
 *
 * Proces:
 *   1. Otwierasz https://www.bankier.pl/smart/kredyty-hipoteczne
 *   2. Spisujesz aktualne marże (najniższa oferowana dla LTV~80%)
 *   3. Uruchamiasz: node scripts/update-margins.js
 *   4. Skrypt aktualizuje bank-offers.json i bankProfiles.ts
 *   5. Commit: git commit -m "margins: sierpień 2026"
 *   6. Push → auto-deploy na Netlify
 */

const fs = require('fs')
const path = require('path')

const BANK_OFFERS_PATH = path.resolve(__dirname, '..', 'public', 'bank-offers.json')
const BANK_PROFILES_PATH = path.resolve(__dirname, '..', 'src', 'data', 'bankProfiles.ts')

const BANKS = [
  { id: 'pko-bp',     name: 'PKO BP',             key: 'pkoBp' },
  { id: 'ing',        name: 'ING Bank Śląski',     key: 'ing' },
  { id: 'santander',  name: 'Santander Bank Polska', key: 'santander' },
  { id: 'mbank',      name: 'mBank',               key: 'mbank' },
  { id: 'millennium', name: 'Bank Millennium',     key: 'millennium' },
  { id: 'pekao',      name: 'Bank Pekao SA',       key: 'pekao' },
  { id: 'alior',      name: 'Alior Bank',          key: 'alior' },
]

// === Help
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`
  📋 update-margins.js — aktualizacja marż banków

  Użycie:
    node scripts/update-margins.js               # tryb interaktywny
    node scripts/update-margins.js --check        # sprawdź stan
    node scripts/update-margins.js --help         # ta pomoc

  Co robi:
    1. Pokazuje aktualne marże z bank-offers.json
    2. Pozwala wpisać nowe dla każdego banku
    3. Aktualizuje bank-offers.json i bankProfiles.ts
    4. Ustawia datę weryfikacji na dzisiaj

  Źródło danych:
    https://www.bankier.pl/smart/kredyty-hipoteczne
  `)
  process.exit(0)
}

// === Read current data
function readJSON(filepath) {
  return JSON.parse(fs.readFileSync(filepath, 'utf-8'))
}

function writeJSON(filepath, data) {
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2) + '\n', 'utf-8')
}

// === Validate margin input
function parseMargin(input) {
  const str = input.trim().replace(',', '.')
  const val = parseFloat(str)
  if (isNaN(val) || val < 0 || val > 20) return null
  return Math.round(val * 100) / 100
}

// === Interaktywny update
async function interactiveUpdate() {
  const offers = readJSON(BANK_OFFERS_PATH)
  const oldVersion = offers.version || '(brak)'

  console.log('\n📊 Aktualizacja marż banków\n')
  console.log(`Aktualna wersja: ${oldVersion}`)
  console.log(`Ostatnia weryfikacja: ${offers.lastVerifiedAt ? new Date(offers.lastVerifiedAt).toLocaleDateString('pl-PL') : '(brak)'}`)
  console.log(`Źródło: ${offers.source}`)
  console.log(`Link:   ${offers.sourceUrl}\n`)

  // Generate new version string
  const now = new Date()
  const newVersion = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  console.log(`Nowa wersja: ${newVersion}\n`)

  // === PKO BP — próba auto-scrape
  console.log('🔄 Próba pobrania marży PKO BP z pkobp.pl/oprocentowanie...')
  let scrapedMargin = null
  try {
    const https = require('https')
    const html = await new Promise((resolve, reject) => {
      https.get('https://www.pkobp.pl/oprocentowanie', { timeout: 8000 }, res => {
        let data = ''
        res.on('data', chunk => data += chunk)
        res.on('end', () => resolve(data))
      }).on('error', reject)
    })
    // Szukamy marży w tekście (wzór: "marża X,XX%")
    const match = html.match(/marża\s+(\d+[.,]\d+)/i)
    if (match) {
      scrapedMargin = parseFloat(match[1].replace(',', '.'))
      console.log(`   ✅ Znaleziono: marża PKO BP = ${scrapedMargin}%\n`)
    } else {
      console.log('   ⚠️  Nie znaleziono marży w treści strony.\n')
    }
  } catch (err) {
    console.log(`   ⚠️  Błąd połączenia: ${err.message}\n`)
  }

  // === Wprowadzanie marż
  const newMargins = {}
  console.log('Wprowadź aktualne marże. Naciśnij Enter aby pominąć (zostanie poprzednia wartość).\n')

  for (const bank of BANKS) {
    const currentBank = offers.banks.find(b => b.id === bank.id)
    const currentMargin = currentBank ? currentBank.margin : '???'

    let promptText = `${bank.name} (obecnie: ${currentMargin}%): `
    if (bank.id === 'pko-bp' && scrapedMargin) {
      promptText = `${bank.name} [auto: ${scrapedMargin}%, obecnie: ${currentMargin}%]: `
    }

    const readline = require('readline')
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
    
    const answer = await new Promise(resolve => {
      rl.question(promptText, resolve)
    })
    rl.close()

    if (!answer.trim() && bank.id === 'pko-bp' && scrapedMargin) {
      newMargins[bank.id] = scrapedMargin
      console.log(`   → Zostawiam auto-scraped: ${scrapedMargin}%`)
    } else if (!answer.trim()) {
      newMargins[bank.id] = currentMargin
      console.log(`   → Zostawiam poprzednią: ${currentMargin}%`)
    } else {
      const parsed = parseMargin(answer)
      if (parsed === null) {
        console.log(`   ⚠️  Nieprawidłowa wartość, zostawiam: ${currentMargin}%`)
        newMargins[bank.id] = currentMargin
      } else {
        newMargins[bank.id] = parsed
      }
    }
  }

  // === Potwierdzenie
  console.log('\n📋 Podsumowanie zmian:')
  for (const bank of BANKS) {
    const currentBank = offers.banks.find(b => b.id === bank.id)
    const oldVal = currentBank ? currentBank.margin : '?'
    const newVal = newMargins[bank.id]
    const arrow = oldVal !== newVal ? ' ← ZMIANA' : ''
    console.log(`   ${bank.name.padEnd(22)} ${String(oldVal).padStart(5)}% → ${String(newVal).padStart(5)}%${arrow}`)
  }

  console.log('')
  const readline = require('readline')
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  const confirm = await new Promise(resolve => {
    rl.question('Zatwierdzić zmiany? (t/N) ', resolve)
  })
  rl.close()

  if (!confirm.toLowerCase().startsWith('t')) {
    console.log('❌ Anulowano.')
    process.exit(0)
  }

  // === Aktualizacja bank-offers.json
  const updatedBanks = offers.banks.map(b => ({
    ...b,
    margin: newMargins[b.id] ?? b.margin,
    totalRate: b.totalRate,  // totalRate zostaje — WIBOR jest live
  }))

  const updatedOffers = {
    ...offers,
    version: newVersion,
    updatedAt: now.toISOString(),
    lastVerifiedAt: now.toISOString(),
    banks: updatedBanks,
  }

  writeJSON(BANK_OFFERS_PATH, updatedOffers)
  console.log(`\n✅ bank-offers.json zaktualizowany (wersja ${newVersion})`)

  // === Aktualizacja bankProfiles.ts
  // Szukamy bloków typicalMarginMin/Max i aktualizujemy górną granicę
  let profilesContent = fs.readFileSync(BANK_PROFILES_PATH, 'utf-8')
  
  for (const bank of BANKS) {
    const newMargin = newMargins[bank.id]
    // Aktualizujemy typicalMarginMin i typicalMarginMax na podstawie nowej marży
    // Min: newMargin - 0.5 p.p. (ale nie mniej niż 0)
    // Max: newMargin + 0.5 p.p.
    const newMin = Math.max(0, parseFloat((newMargin - 0.50).toFixed(2)))
    const newMax = parseFloat((newMargin + 0.50).toFixed(2))

    // Regex: typicalMarginMin: X.XX, typicalMarginMax: Y.YY
    const pattern = new RegExp(
      `(id:\\s*'${bank.id}'.*?typicalMarginMin:\\s*)\\d+\\.?\\d*(,\\s*typicalMarginMax:\\s*)\\d+\\.?\\d*`,
      's'
    )
    const replacement = `$1${newMin}$2${newMax}`
    profilesContent = profilesContent.replace(pattern, replacement)
  }

  fs.writeFileSync(BANK_PROFILES_PATH, profilesContent, 'utf-8')
  console.log('✅ bankProfiles.ts zaktualizowany\n')

  // === Instrukcja
  console.log('📌 Aby opublikować zmiany:')
  console.log(`   git add -A`)
  console.log(`   git commit -m "margins: ${newVersion}"`)
  console.log(`   git push origin main`)
  console.log('')
  console.log(`   https://github.com/kawlas/KREDYT/commit/new`)
  console.log('')
  console.log('📊 Źródło: https://www.bankier.pl/smart/kredyty-hipoteczne')
  console.log('💹 WIBOR:  https://stooq.pl/q/?s=wibor3m (live)')
}

// === Tryb --check
function checkMode() {
  const offers = readJSON(BANK_OFFERS_PATH)
  const now = new Date()
  const lastVerified = offers.lastVerifiedAt ? new Date(offers.lastVerifiedAt) : null
  const daysSince = lastVerified ? Math.floor((now - lastVerified) / 86400000) : '???'

  console.log(`\n📊 Stan danych: ${offers.version}`)
  console.log(`   Ostatnia weryfikacja: ${lastVerified ? lastVerified.toLocaleDateString('pl-PL') : '(brak)'}`)
  console.log(`   Dni od weryfikacji:   ${daysSince}`)
  console.log(`   Źródło:              ${offers.source}`)
  
  if (daysSince !== '???' && daysSince > 45) {
    console.log('\n⚠️  Dane wymagają aktualizacji! (ponad 45 dni od weryfikacji)')
    console.log('   Uruchom: node scripts/update-margins.js')
  } else if (daysSince !== '???' && daysSince > 30) {
    console.log('\n⚠️  Wkrótce wymagana aktualizacja (za ' + (45 - daysSince) + ' dni)')
  } else {
    console.log('\n✅ Dane aktualne.')
  }

  console.log('\nMarże:')
  for (const bank of offers.banks) {
    console.log(`   ${bank.name.padEnd(22)} ${String(bank.margin).padStart(5)}%`)
  }
  console.log('')
}

// === Main
if (process.argv.includes('--check')) {
  checkMode()
} else {
  interactiveUpdate().catch(err => {
    console.error('Błąd:', err.message)
    process.exit(1)
  })
}
