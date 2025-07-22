'use client'

import { useEffect, useState } from 'react'
import { TrendingUp, TrendingDown, AlertTriangle, Target, Activity, ShoppingCart, HandCoins } from 'lucide-react'

interface TechnicalAnalysisData {
  symbol: string
  current_price: number
  rsi: {
    current: number
    signal: 'oversold' | 'overbought' | 'neutral'
    values: number[]
  }
  macd: {
    current: {
      macd: number
      signal: number
      histogram: number
    }
    crossover: 'bullish' | 'bearish' | 'none'
  }
  trading_signals: {
    latest: {
      type: 'buy' | 'sell' | 'hold'
      strength: number
      reason: string
      timestamp: string
      rsi: number
    } | null
    stats: {
      total: number
      buy: number
      sell: number
      hold: number
      accuracy: string
    }
  }
  timestamp: string
}

interface TechnicalAnalysisCardProps {
  symbol?: string
  className?: string
}

export default function TechnicalAnalysisCard({ symbol = 'bitcoin', className = '' }: TechnicalAnalysisCardProps) {
  const [taData, setTaData] = useState<TechnicalAnalysisData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTechnicalAnalysis = async () => {
      try {
        const response = await fetch(`/api/technical-analysis?symbol=${symbol}`)
        const result = await response.json()
        
        setTaData(result.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching technical analysis:', error)
        setLoading(false)
      }
    }

    fetchTechnicalAnalysis()
    
    // Update every 30 seconds
    const interval = setInterval(fetchTechnicalAnalysis, 30000)
    return () => clearInterval(interval)
  }, [symbol])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price)
  }

  const getRSIColor = (rsi: number) => {
    if (rsi <= 30) return 'text-green-600 bg-green-50' // Oversold (buy opportunity)
    if (rsi >= 70) return 'text-red-600 bg-red-50' // Overbought (sell opportunity)
    return 'text-blue-600 bg-blue-50' // Neutral
  }

  const getRSISignalText = (signal: string, rsi: number) => {
    switch (signal) {
      case 'oversold': return `Oversold (${rsi.toFixed(1)})`
      case 'overbought': return `Overbought (${rsi.toFixed(1)})`
      default: return `Neutral (${rsi.toFixed(1)})`
    }
  }

  const getMACDColor = (crossover: string) => {
    switch (crossover) {
      case 'bullish': return 'text-green-600 bg-green-50'
      case 'bearish': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getSignalIcon = (type: string) => {
    switch (type) {
      case 'buy': return <ShoppingCart className="h-5 w-5 text-green-600" />
      case 'sell': return <HandCoins className="h-5 w-5 text-red-600" />
      default: return <Target className="h-5 w-5 text-gray-600" />
    }
  }

  if (loading) {
    return (
      <div className={`card ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!taData) return null

  const latestSignal = taData.trading_signals.latest

  return (
    <div className={`card ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Activity className="h-5 w-5 text-blue-600 mr-2" />
          Technical Analysis - {taData.symbol}
        </h3>
        <span className="text-xs text-gray-500">
          {new Date(taData.timestamp).toLocaleTimeString('en-US')}
        </span>
      </div>

      <div className="space-y-6">
        {/* Current Price */}
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Current Price</p>
          <p className="text-2xl font-bold text-gray-900">
            {formatPrice(taData.current_price)}
          </p>
        </div>

        {/* Latest Trading Signal */}
        {latestSignal && (
          <div className={`p-4 rounded-lg border-2 ${
            latestSignal.type === 'buy' 
              ? 'bg-green-50 border-green-200' 
              : latestSignal.type === 'sell' 
              ? 'bg-red-50 border-red-200'
              : 'bg-gray-50 border-gray-200'
          }`}>
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-lg bg-white shadow-sm">
                {getSignalIcon(latestSignal.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900 capitalize">
                    {latestSignal.type === 'buy' ? '🟢 BUY SIGNAL' : 
                     latestSignal.type === 'sell' ? '🔴 SELL SIGNAL' : 
                     '⚪ HOLD POSITION'}
                  </h4>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-current rounded-full mr-1"></div>
                      <span className="text-sm font-medium">
                        Strength: {latestSignal.strength}%
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{latestSignal.reason}</p>
                <p className="text-xs text-gray-500">
                  {new Date(latestSignal.timestamp).toLocaleString('en-US')}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* RSI Indicator */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">RSI (Relative Strength Index)</h4>
          <div className={`p-3 rounded-lg ${getRSIColor(taData.rsi.current)}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">
                {getRSISignalText(taData.rsi.signal, taData.rsi.current)}
              </span>
              <div className="text-right">
                <div className="text-sm">
                  {taData.rsi.signal === 'oversold' && '📈 Buy Zone'}
                  {taData.rsi.signal === 'overbought' && '📉 Sell Zone'}
                  {taData.rsi.signal === 'neutral' && '➡️ Neutral'}
                </div>
              </div>
            </div>
            
            {/* RSI Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div 
                className="bg-current h-2 rounded-full transition-all duration-300" 
                style={{ width: `${taData.rsi.current}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between text-xs text-gray-600">
              <span>0 (Oversold)</span>
              <span>30</span>
              <span>50</span>
              <span>70</span>
              <span>100 (Overbought)</span>
            </div>
          </div>
        </div>

        {/* MACD Indicator */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">MACD (8, 21, 5)</h4>
          <div className={`p-3 rounded-lg ${getMACDColor(taData.macd.crossover)}`}>
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <p className="text-xs text-gray-600">MACD Line</p>
                <p className="font-semibold">{taData.macd.current.macd.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Signal Line</p>
                <p className="font-semibold">{taData.macd.current.signal.toFixed(2)}</p>
              </div>
            </div>
            
            <div className="mb-3">
              <p className="text-xs text-gray-600">Histogram</p>
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${
                  taData.macd.current.histogram > 0 ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <span className="font-semibold">{taData.macd.current.histogram.toFixed(2)}</span>
                {taData.macd.current.histogram > 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
              </div>
            </div>

            {taData.macd.crossover !== 'none' && (
              <div className="flex items-center space-x-2 text-sm">
                {taData.macd.crossover === 'bullish' ? (
                  <>
                    <TrendingUp className="h-4 w-4" />
                    <span>Bullish Crossover - Buy Signal</span>
                  </>
                ) : (
                  <>
                    <TrendingDown className="h-4 w-4" />
                    <span>Bearish Crossover - Sell Signal</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Signal Statistics */}
        <div className="border-t border-gray-200 pt-4">
          <h4 className="font-medium text-gray-900 mb-3">Signal Statistics</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-center p-2 bg-green-50 rounded">
              <p className="font-semibold text-green-600">{taData.trading_signals.stats.buy}</p>
              <p className="text-green-700">Buy Signals</p>
            </div>
            <div className="text-center p-2 bg-red-50 rounded">
              <p className="font-semibold text-red-600">{taData.trading_signals.stats.sell}</p>
              <p className="text-red-700">Sell Signals</p>
            </div>
          </div>
          <div className="mt-2 text-center">
            <span className="text-xs text-gray-500">
              Accuracy: {taData.trading_signals.stats.accuracy}% 
              ({taData.trading_signals.stats.total} total)
            </span>
          </div>
        </div>
      </div>
    </div>
  )
} 