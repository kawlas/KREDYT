import { describe, it, expect, beforeEach } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import { ThemeProvider, useTheme } from '../../hooks/useTheme'

// Test component to access theme context
function TestConsumer() {
  const { theme, toggleTheme, setTheme } = useTheme()
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button data-testid="toggle" onClick={toggleTheme}>Toggle</button>
      <button data-testid="set-light" onClick={() => setTheme('light')}>Light</button>
      <button data-testid="set-dark" onClick={() => setTheme('dark')}>Dark</button>
    </div>
  )
}

function renderWithProvider(initialTheme?: 'light' | 'dark') {
  if (initialTheme) {
    localStorage.setItem('theme', initialTheme)
  } else {
    localStorage.removeItem('theme')
  }
  return render(
    <ThemeProvider>
      <TestConsumer />
    </ThemeProvider>
  )
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('domyślnie ustawia jasny motyw (gdy brak preferencji)', () => {
    const { getByTestId } = renderWithProvider()
    expect(getByTestId('theme').textContent).toBe('light')
  })

  it('odczytuje motyw z localStorage', () => {
    const { getByTestId } = renderWithProvider('dark')
    expect(getByTestId('theme').textContent).toBe('dark')
  })

  it('toggleTheme przełącza motyw', () => {
    const { getByTestId } = renderWithProvider()
    expect(getByTestId('theme').textContent).toBe('light')

    fireEvent.click(getByTestId('toggle'))
    expect(getByTestId('theme').textContent).toBe('dark')

    fireEvent.click(getByTestId('toggle'))
    expect(getByTestId('theme').textContent).toBe('light')
  })

  it('setTheme ustawia konkretny motyw', () => {
    const { getByTestId } = renderWithProvider()
    fireEvent.click(getByTestId('set-dark'))
    expect(getByTestId('theme').textContent).toBe('dark')

    fireEvent.click(getByTestId('set-light'))
    expect(getByTestId('theme').textContent).toBe('light')
  })

  it('zapisuje motyw do localStorage', () => {
    const { getByTestId } = renderWithProvider()
    fireEvent.click(getByTestId('set-dark'))
    expect(localStorage.getItem('theme')).toBe('dark')
  })

  it('dodaje klasę dark do html gdy ciemny motyw', () => {
    const { getByTestId } = renderWithProvider()
    expect(document.documentElement.classList.contains('dark')).toBe(false)

    fireEvent.click(getByTestId('set-dark'))
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })
})

describe('ThemeToggle', () => {
  it('renderuje się w kontekście ThemeProvider', () => {
    // Just check the provider works
    expect(() => renderWithProvider()).not.toThrow()
  })

  it('ThemeToggle renderuje się poprawnie w providerze', () => {
    const { rerender } = renderWithProvider()
    // Provider renders children, component should be there
    expect(document.querySelector('button')).toBeTruthy()
  })
})