import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    console.error('ErrorBoundary caught:', error)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8 text-center">
          <p className="text-lg font-semibold text-foreground mb-2">Coś poszło nie tak</p>
          <p className="text-sm text-muted-foreground mb-4">Spróbuj odświeżyć stronę lub wrócić do strony głównej.</p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            Spróbuj ponownie
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
