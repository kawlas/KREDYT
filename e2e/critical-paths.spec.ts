import { test, expect } from '@playwright/test'

// ─────────────────────────────────────────────
// Ścieżka 1: Kalkulator raty → wypełnij formularz → rata się pojawiła
// ─────────────────────────────────────────────
test.describe('Kalkulator raty — główny flow', () => {
  test('wypełnia formularz i widzi ratę', async ({ page }) => {
    await page.goto('/kalkulator-raty-kredytu/')

    // Strona się załadowała
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('h1')).toContainText('ratę')

    // Wpisz kwotę — pierwsze pole input[type=number] to 'Kwota kredytu'
    const kwotaInput = page.locator('input[type="number"]').first()
    await kwotaInput.fill('400000')

    // Wpisz okres (drugie pole)
    const okresInput = page.locator('input[type="number"]').nth(1)
    await okresInput.fill('25')

    // Poczekaj na przeliczenie
    await page.waitForTimeout(800)

    // Sprawdź czy wynik się pojawił (rata, koszt całkowity, lub zł)
    const body = page.locator('body')
    await expect(body).toContainText(/rata|zł|miesięczna|całkowity koszt/i)
  })
})

// ─────────────────────────────────────────────
// Ścieżka 2: Nawigacja — sidebar → strona się załadowała
// ─────────────────────────────────────────────
test.describe('Nawigacja — sidebar', () => {
  test('klika w sidebar i trafia na stronę', async ({ page }) => {
    await page.goto('/')

    // Znajdź link w sidebar/nav z "zdolność kredytowa"
    const link = page.locator('a').filter({ hasText: /zdolność kredytowa/i }).first()
    await expect(link).toBeVisible()
    await link.click()

    // Sprawdź czy trafiliśmy na właściwą stronę
    await expect(page).toHaveURL(/zdolnosc-kredytowa/)
    await expect(page.locator('h1')).toBeVisible()
  })
})

// ─────────────────────────────────────────────
// Ścieżka 3: 404 → zła ścieżka → strona błędu
// ─────────────────────────────────────────────
test.describe('404 — nieistniejąca ścieżka', () => {
  test('wyświetla stronę 404', async ({ page }) => {
    await page.goto('/nie-istnieje-taka-strona/')

    // Sprawdź czy to 404
    await expect(page).toHaveTitle(/404|nie znaleziono|not found/i)
    // Albo sprawdź treść
    const body = page.locator('body')
    await expect(body).toContainText(/404|nie znaleziono/i)
  })
})
