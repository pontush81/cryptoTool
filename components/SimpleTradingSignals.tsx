'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Minus, ArrowUp, ArrowDown, Target, Clock, Info, ChevronDown, ChevronUp } from 'lucide-react'

interface SimpleTradingSignalsProps {
  symbol?: string
  className?: string
}

interface SignalData {
  action: 'BUY' | 'SELL' | 'HOLD'
  confidence: number
  trend: 'Bullish' | 'Bearish' | 'Neutral'
  price: number
  reason: string
  technicalDetails?: {
    rsi: number
    macdSignal: string
    trendStrength: number
  }
}

export default function SimpleTradingSignals({ symbol = 'bitcoin', className = '' }: SimpleTradingSignalsProps) {
  const [signalData, setSignalData] = useState<SignalData | null>(null)
  const [loading, setLoading] = useState(true)
  const [showDetails, setShowDetails] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  const fetchSignalData = async () => {
    try {
      const response = await fetch(`/api/technical-analysis?symbol=${symbol}&timeframe=1d`)
      const data = await response.json()
      
      // Convert complex technical data to simple signals
      const simplifiedSignal = convertToSimpleSignal(data)
      setSignalData(simplifiedSignal)
      setLastUpdate(new Date())
    } catch (error) {
      console.error('Error fetching signal data:', error)
      // Fallback to neutral signal
      setSignalData({
        action: 'HOLD',
        confidence: 50,
        trend: 'Neutral',
        price: 0,
        reason: 'Data temporarily unavailable'
      })
    } finally {
      setLoading(false)
    }
  }

  const convertToSimpleSignal = (technicalData: any): SignalData => {
    const rsi = technicalData.rsi?.current || 50
    const macdCrossover = technicalData.macd?.crossover || 'none'
    const trendSignal = technicalData.cto?.current?.signal || 'neutral'
    const price = technicalData.current_price || 0
    
    // Simple signal logic
    let action: 'BUY' | 'SELL' | 'HOLD' = 'HOLD'
    let confidence = 50
    let reason = 'Waiting for clear signal'
    
    // BUY conditions: RSI oversold OR bullish MACD OR bullish trend
    if (rsi <= 35 || macdCrossover === 'bullish' || trendSignal === 'bullish') {
      action = 'BUY'
      confidence = Math.min(90, 60 + (35 - Math.min(rsi, 35)) + (macdCrossover === 'bullish' ? 15 : 0) + (trendSignal === 'bullish' ? 10 : 0))
      reason = rsi <= 35 ? 'Price dropped to attractive levels' : 
               macdCrossover === 'bullish' ? 'Momentum turning positive' : 
               'Uptrend confirmed'
    }
    // SELL conditions: RSI overbought OR bearish MACD
    else if (rsi >= 70 || macdCrossover === 'bearish') {
      action = 'SELL'
      confidence = Math.min(90, 60 + Math.max(0, rsi - 70) + (macdCrossover === 'bearish' ? 15 : 0))
      reason = rsi >= 70 ? 'Price reached high levels' : 'Momentum turning negative'
    }
    
    // Determine trend
    let trend: 'Bullish' | 'Bearish' | 'Neutral' = 'Neutral'
    if (trendSignal === 'bullish' || (rsi > 45 && macdCrossover !== 'bearish')) {
      trend = 'Bullish'
    } else if (trendSignal === 'bearish' || (rsi < 45 && macdCrossover === 'bearish')) {
      trend = 'Bearish'
    }
    
    return {
      action,
      confidence,
      trend,
      price,
      reason,
      technicalDetails: {
        rsi,
        macdSignal: macdCrossover,
        trendStrength: Math.abs(rsi - 50) * 2
      }
    }
  }

  useEffect(() => {
    fetchSignalData()
    const interval = setInterval(fetchSignalData, 30000) // Update every 30 seconds
    return () => clearInterval(interval)
  }, [symbol])

  if (loading) {
    return (
      <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-20 bg-gray-200 rounded mb-4"></div>
          <div className="h-6 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (!signalData) return null

  const getActionConfig = (action: string) => {
    switch (action) {
      case 'BUY':
        return {
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          icon: <ArrowUp className="w-8 h-8" />,
          emoji: '🚀'
        }
      case 'SELL':
        return {
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          icon: <ArrowDown className="w-8 h-8" />,
          emoji: '⚠️'
        }
      default:
        return {
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          icon: <Minus className="w-8 h-8" />,
          emoji: '⏳'
        }
    }
  }

  const getTrendConfig = (trend: string) => {
    switch (trend) {
      case 'Bullish':
        return {
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          icon: <TrendingUp className="w-6 h-6" />,
          emoji: '📈'
        }
      case 'Bearish':
        return {
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          icon: <TrendingDown className="w-6 h-6" />,
          emoji: '📉'
        }
      default:
        return {
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          icon: <Minus className="w-6 h-6" />,
          emoji: '➡️'
        }
    }
  }

  const actionConfig = getActionConfig(signalData.action)
  const trendConfig = getTrendConfig(signalData.trend)

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 ${className}`}>
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">Trading Signal</h3>
          <div className="flex items-center text-xs text-gray-500">
            <Clock className="w-3 h-3 mr-1" />
            {lastUpdate.toLocaleTimeString()}
          </div>
        </div>
        <p className="text-sm text-gray-600">
          Simple signals for {symbol.toUpperCase()} - No complex charts needed
        </p>
      </div>

      {/* Main Signal Display */}
      <div className="px-6 pb-4">
        <div className={`rounded-xl p-6 border-2 ${actionConfig.borderColor} ${actionConfig.bgColor}`}>
          <div className="text-center">
            {/* Action with Icon */}
            <div className={`flex items-center justify-center mb-3 ${actionConfig.color}`}>
              <span className="text-3xl mr-2">{actionConfig.emoji}</span>
              {actionConfig.icon}
            </div>
            
            {/* Action Text */}
            <div className={`text-3xl font-bold mb-2 ${actionConfig.color}`}>
              {signalData.action}
            </div>
            
            {/* Confidence */}
            <div className="text-lg text-gray-600 mb-3">
              {signalData.confidence}% confidence
            </div>
            
            {/* Simple Reason */}
            <div className="text-sm text-gray-700 font-medium">
              {signalData.reason}
            </div>
          </div>
        </div>
      </div>

      {/* Trend Display */}
      <div className="px-6 pb-4">
        <div className={`rounded-lg p-4 ${trendConfig.bgColor} border ${trendConfig.borderColor}`}>
          <div className="flex items-center justify-center">
            <span className="text-2xl mr-2">{trendConfig.emoji}</span>
            <div className={`text-xl font-semibold ${trendConfig.color}`}>
              Trend is {signalData.trend}
            </div>
            {trendConfig.icon}
          </div>
        </div>
      </div>

      {/* Current Price */}
      {signalData.price > 0 && (
        <div className="px-6 pb-4">
          <div className="text-center">
            <div className="text-sm text-gray-500">Current Price</div>
            <div className="text-2xl font-bold text-gray-900">
              ${signalData.price.toLocaleString()}
            </div>
          </div>
        </div>
      )}

      {/* Optional Technical Details */}
      <div className="border-t border-gray-100">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full px-6 py-3 text-sm text-gray-600 hover:text-gray-800 flex items-center justify-center"
        >
          <Info className="w-4 h-4 mr-2" />
          {showDetails ? 'Hide' : 'Show'} Technical Details
          {showDetails ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
        </button>
        
        {showDetails && signalData.technicalDetails && (
          <div className="px-6 pb-4 border-t border-gray-100 bg-gray-50">
            <div className="pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">RSI:</span>
                <span className="font-medium">{signalData.technicalDetails.rsi.toFixed(1)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">MACD:</span>
                <span className="font-medium capitalize">{signalData.technicalDetails.macdSignal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Trend Strength:</span>
                <span className="font-medium">{signalData.technicalDetails.trendStrength.toFixed(0)}%</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 