import React from 'react'
import { formatPercent } from '../../utils/formatters'

interface WIBORDisplayProps {
  wibor: number | null
  loading: boolean
  error: string | null
  lastUpdate: string
  source: 'stooq' | 'fallback' | null
  onRefresh: () => void
  compact?: boolean
}

export default function WIBORDisplay({
  wibor,
  loading,
  error,
  lastUpdate,
  source,
  onRefresh,
  compact = false
}: WIBORDisplayProps) {
  if (compact) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <span className="text-gray-600">WIBOR 3M:</span>
        {loading ? (
          <span className="text-gray-400">Ładowanie...</span>
        ) : (
          <>
            <span className="font-bold text-blue-600">
              {wibor ? formatPercent(wibor) : '---'}
            </span>
            <button
              onClick={onRefresh}
              disabled={loading}
              className="text-blue-600 hover:text-blue-800 disabled:opacity-50"
              title="Odśwież WIBOR"
            >
              🔄
            </button>
          </>
        )}
      </div>
    )
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="text-sm text-gray-600 mb-1">
            Aktualny WIBOR 3M
          </div>
          {loading ? (
            <div className="text-2xl font-bold text-gray-400">
              Ładowanie...
            </div>
          ) : (
            <div className="text-3xl font-bold text-blue-600">
              {wibor ? formatPercent(wibor) : '---'}
            </div>
          )}
        </div>
        
        <button
          onClick={onRefresh}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <span>🔄</span>
          <span>Odśwież</span>
        </button>
      </div>
      
      <div className="flex items-center gap-4 text-xs text-gray-600">
        <div>
          📅 Zaktualizowano: {lastUpdate}
        </div>
        {source === 'stooq' && (
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>Stooq.pl</span>
          </div>
        )}
        {source === 'fallback' && (
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
            <span>Wartość zastępcza</span>
          </div>
        )}
      </div>
      
      {error && (
        <div className="mt-2 text-xs text-yellow-700 bg-yellow-50 p-2 rounded">
          ⚠️ {error}
        </div>
      )}
    </div>
  )
}
