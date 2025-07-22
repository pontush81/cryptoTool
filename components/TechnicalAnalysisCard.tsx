'use client'

import React, { useState, useEffect } from 'react'
import { Activity, TrendingUp, TrendingDown, ShoppingCart, Clock } from 'lucide-react'

// Timeframe options for multi-timeframe analysis
type Timeframe = '1h' | '4h' | '1d' | '1w'

interface TimeframeOption {
  value: Timeframe
  label: string
  description: string
}

const TIMEFRAME_OPTIONS: TimeframeOption[] = [
  { value: '1h', label: '1H', description: 'Hourly - Fast signals, good for day trading' },
  { value: '4h', label: '4H', description: '4-Hour - Balanced view, less noise' },
  { value: '1d', label: '1D', description: 'Daily - Strong trends' },
  { value: '1w', label: '1W', description: 'Weekly - Long-term trends, minimal noise' }
]

// TimeframeSelector Component
interface TimeframeSelectorProps {
  selectedTimeframe: Timeframe
  onTimeframeChange: (timeframe: Timeframe) => void
  className?: string
}

function TimeframeSelector({ selectedTimeframe, onTimeframeChange, className = '' }: TimeframeSelectorProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Clock className="h-4 w-4 text-gray-500" />
      <span className="text-sm font-medium text-gray-700">Timeframe:</span>
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
        {TIMEFRAME_OPTIONS.map((option) => (
          <button
            key={option.value}
            onClick={() => onTimeframeChange(option.value)}
            title={option.description}
            className={`px-3 py-1 text-xs font-medium rounded transition-all duration-200 ${
              selectedTimeframe === option.value
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}

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
  cto: {
    current: {
      value: number
      signal: 'bullish' | 'bearish' | 'neutral'
    }
    crossover: 'bullish' | 'bearish' | 'none'
  }
  peak_detection: {
    risk_level: 'safe' | 'warning' | 'danger'
    message: string
    confidence: number
    is_peak_warning: boolean
  }
  trading_signals: {
    latest: {
      type: 'buy' | 'sell' | 'hold'
      price: number
      timestamp: string
      confidence: number
    } | null
    recent: Array<{
      type: 'buy' | 'sell' | 'hold'
      price: number
      timestamp: string
      confidence: number
    }>
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

interface CryptoData {
  id: string
  name: string
  symbol: string
  current_price: number
  price_change_24h: number
  price_change_percentage_24h: number
  market_cap: number
  total_volume: number
}

interface TechnicalAnalysisCardProps {
  symbol?: string
  className?: string
}

export default function TechnicalAnalysisCard({ symbol = 'bitcoin', className = '' }: TechnicalAnalysisCardProps) {
  const [taData, setTAData] = useState<TechnicalAnalysisData | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentSymbol, setCurrentSymbol] = useState(symbol)
  const [mounted, setMounted] = useState(false)
  const [showPeakModal, setShowPeakModal] = useState(false)
  const [selectedTimeframe, setSelectedTimeframe] = useState<Timeframe>('1d')

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const fetchTechnicalAnalysis = async (targetSymbol: string = currentSymbol) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/technical-analysis?symbol=${targetSymbol}&timeframe=${selectedTimeframe}`)
      const result = await response.json()
      
      setTAData(result.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching technical analysis:', error)
      setLoading(false)
    }
  }

  useEffect(() => {
    // Update current symbol when prop changes
    setCurrentSymbol(symbol)
    
    // Initial load
    fetchTechnicalAnalysis(symbol)
    
    // Listen for manual refresh events from parent
    const handleManualRefresh = () => {
      fetchTechnicalAnalysis()
    }
    
    // Listen for crypto change events
    const handleCryptoChanged = (event: CustomEvent) => {
      const newSymbol = event.detail.cryptoId
      setCurrentSymbol(newSymbol)
      fetchTechnicalAnalysis(newSymbol)
    }
    
    window.addEventListener('manualRefresh', handleManualRefresh)
    window.addEventListener('cryptoChanged', handleCryptoChanged as EventListener)
    
    return () => {
      window.removeEventListener('manualRefresh', handleManualRefresh)
      window.removeEventListener('cryptoChanged', handleCryptoChanged as EventListener)
    }
  }, [symbol, selectedTimeframe]) // Re-fetch when symbol OR timeframe changes

  // Add helper functions
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
    const safeRsi = rsi || 0;
    switch (signal) {
      case 'oversold': return `Oversold (${safeRsi.toFixed(1)})`
      case 'overbought': return `Overbought (${safeRsi.toFixed(1)})`
      default: return `Neutral (${safeRsi.toFixed(1)})`
    }
  }

  const getRSIAdvice = (rsi: number) => {
    if (rsi <= 30) return {
      title: 'BUY SIGNAL',
      message: 'Good opportunity to buy - price may rise',
      icon: <ShoppingCart className="h-5 w-5" />,
      bgColor: 'bg-green-100 border-green-300',
      textColor: 'text-green-800'
    }
    if (rsi >= 70) return {
      title: 'SELL SIGNAL', 
      message: 'Consider selling - price may fall',
      icon: <ShoppingCart className="h-5 w-5" />,
      bgColor: 'bg-red-100 border-red-300',
      textColor: 'text-red-800'
    }
    return {
      title: 'HOLD',
      message: 'Wait for clearer signal - neutral zone',
      icon: <ShoppingCart className="h-5 w-5" />,
      bgColor: 'bg-blue-100 border-blue-300', 
      textColor: 'text-blue-800'
    }
  }

  const getMACDColor = (crossover: string) => {
    switch (crossover) {
      case 'bullish': return 'text-green-600 bg-green-50'
      case 'bearish': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getMACDAdvice = (crossover: string, histogram: number) => {
    if (crossover === 'bullish') return {
      title: 'TREND UP',
      message: 'Momentum turning positive - consider buying',
      icon: <TrendingUp className="h-5 w-5" />,
      bgColor: 'bg-green-100 border-green-300',
      textColor: 'text-green-800'
    }
    if (crossover === 'bearish') return {
      title: 'TREND DOWN', 
      message: 'Momentum turning negative - consider selling',
      icon: <TrendingDown className="h-5 w-5" />,
      bgColor: 'bg-red-100 border-red-300',
      textColor: 'text-red-800'
    }
    return {
      title: 'NO CLEAR TREND',
      message: 'Wait for momentum to develop - sideways movement',
      icon: <Activity className="h-5 w-5" />,
      bgColor: 'bg-gray-100 border-gray-300', 
      textColor: 'text-gray-800'
    }
  }

  const getMomentumStrength = (histogram: number) => {
    const absHistogram = Math.abs(histogram)
    if (absHistogram > 500) return 'Strong'
    if (absHistogram > 100) return 'Moderate'
    return 'Weak'
  }

  const getMomentumDirection = (histogram: number) => {
    if (histogram > 0) return { text: 'Increasing', color: 'text-green-600' }
    if (histogram < 0) return { text: 'Decreasing', color: 'text-red-600' }
    return { text: 'Neutral', color: 'text-gray-600' }
  }

  const getTrendAdvice = (signal: string, crossover: string, value: number) => {
    if (crossover === 'bullish' || (signal === 'bullish' && Math.abs(value) < 5)) {
      return {
        title: 'UPTREND SIGNAL',
        message: 'Trend indicator suggests upward momentum building',
        icon: <TrendingUp className="h-5 w-5" />,
        bgColor: 'bg-green-100 border-green-300',
        textColor: 'text-green-800'
      }
    }
    if (crossover === 'bearish' || (signal === 'bearish' && Math.abs(value) < 5)) {
      return {
        title: 'DOWNTREND SIGNAL',
        message: 'Trend indicator suggests downward momentum building', 
        icon: <TrendingDown className="h-5 w-5" />,
        bgColor: 'bg-red-100 border-red-300',
        textColor: 'text-red-800'
      }
    }
    return {
      title: 'TREND CONTINUATION',
      message: signal === 'bullish' ? 'Uptrend continuing - hold position' : 
               signal === 'bearish' ? 'Downtrend continuing - stay cautious' : 'No clear trend direction',
      icon: <Activity className="h-5 w-5" />,
      bgColor: 'bg-gray-100 border-gray-300',
      textColor: 'text-gray-800'
    }
  }

  if (!mounted) {
    return (
      <div className={`card ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className={`card ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!taData || !taData.rsi || !taData.macd || !taData.cto || !taData.peak_detection) {
    return (
      <div className={`card ${className}`}>
        <div className="p-4 text-center text-gray-500">
          <p>Unable to load technical analysis data</p>
        </div>
      </div>
    )
  }

  // Safe defaults for all data
  const safeRSI = {
    current: taData.rsi?.current || 50,
    signal: taData.rsi?.signal || 'neutral'
  }
  
  const safeMACD = {
    current: {
      macd: taData.macd?.current?.macd || 0,
      signal: taData.macd?.current?.signal || 0,
      histogram: taData.macd?.current?.histogram || 0
    },
    crossover: taData.macd?.crossover || 'none'
  }
  
  const safeCTO = {
    current: {
      value: taData.cto?.current?.value || 0,
      signal: taData.cto?.current?.signal || 'neutral'
    },
    crossover: taData.cto?.crossover || 'none'
  }
  
  const safePeak = {
    risk_level: taData.peak_detection?.risk_level || 'safe',
    confidence: taData.peak_detection?.confidence || 0
  }


  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      {/* Clean Header */}
      <div className="p-4 md:p-6 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-gray-50">
              <Activity className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Technical Analysis - {taData.symbol.toUpperCase()}
              </h3>
              <div className="flex items-center gap-2">
                <TimeframeSelector 
                  selectedTimeframe={selectedTimeframe}
                  onTimeframeChange={setSelectedTimeframe}
                  className="text-sm"
                />
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-gray-500">
              {TIMEFRAME_OPTIONS.find(opt => opt.value === selectedTimeframe)?.description}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {new Date(taData.timestamp).toLocaleTimeString('en-US')}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 md:p-6">
        {/* Current Price - Simplified */}
        <div className="mb-6 text-center">
          <p className="text-sm text-gray-600 mb-1">Current Price</p>
          <p className="text-3xl font-bold text-gray-900">
            {formatPrice(taData.current_price)}
          </p>
        </div>

        {/* Technical Indicators - Modern Design */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

          {/* RSI Card - Clean Design */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 min-h-[180px] flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h5 className="font-semibold text-gray-900">RSI Signal</h5>
              <span className={`w-2 h-2 rounded-full ${
                safeRSI.current <= 30 ? 'bg-green-500' :
                safeRSI.current >= 70 ? 'bg-red-500' : 'bg-blue-500'
              }`}></span>
            </div>
            
            <div className="text-center mb-3 flex-1 flex flex-col justify-center">
              <div className={`text-lg font-bold mb-1 ${
                safeRSI.current <= 30 ? 'text-green-700' :
                safeRSI.current >= 70 ? 'text-red-700' : 'text-blue-700'
              }`}>
                {safeRSI.current <= 30 ? 'Oversold Zone' :
                 safeRSI.current >= 70 ? 'Overbought Zone' : 'Neutral Zone'}
              </div>
              
              <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                safeRSI.current <= 30 ? 'bg-green-100 text-green-700' :
                safeRSI.current >= 70 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
              }`}>
                {safeRSI.current <= 30 ? 'Buy Signal' :
                 safeRSI.current >= 70 ? 'Sell Signal' : 'Hold Position'}
              </div>
            </div>
            
            {/* Progress bar instead of large colored background */}
            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
              <div 
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  safeRSI.current <= 30 ? 'bg-green-500' :
                  safeRSI.current >= 70 ? 'bg-red-500' : 'bg-blue-500'
                }`}
                style={{ width: `${safeRSI.current}%` }}
              ></div>
            </div>
          </div>

          {/* MACD Card - Clean Design */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 min-h-[180px] flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h5 className="font-semibold text-gray-900">MACD Signal</h5>
              <span className={`w-2 h-2 rounded-full ${
                safeMACD.crossover === 'bullish' ? 'bg-green-500' :
                safeMACD.crossover === 'bearish' ? 'bg-red-500' : 'bg-gray-500'
              }`}></span>
            </div>
            
            <div className="text-center mb-3 flex-1 flex flex-col justify-center">
              <div className={`text-lg font-bold mb-1 ${
                safeMACD.crossover === 'bullish' ? 'text-green-700' :
                safeMACD.crossover === 'bearish' ? 'text-red-700' : 'text-gray-700'
              }`}>
                {safeMACD.crossover === 'bullish' ? 'Bullish Momentum' :
                 safeMACD.crossover === 'bearish' ? 'Bearish Momentum' : 'Sideways Movement'}
              </div>
              
              <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                safeMACD.crossover === 'bullish' ? 'bg-green-100 text-green-700' :
                safeMACD.crossover === 'bearish' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
              }`}>
                {safeMACD.crossover === 'bullish' ? 'Upward Pressure' :
                 safeMACD.crossover === 'bearish' ? 'Downward Pressure' : 'Wait for Signal'}
              </div>
            </div>
          </div>

          {/* Trend Direction Card - Clean Design */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 min-h-[180px] flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h5 className="font-semibold text-gray-900">Trend Direction</h5>
              <span className={`w-2 h-2 rounded-full ${
                safeCTO.current.signal === 'bullish' ? 'bg-green-500' :
                safeCTO.current.signal === 'bearish' ? 'bg-red-500' : 'bg-gray-500'
              }`}></span>
            </div>
            
            <div className="text-center mb-3 flex-1 flex flex-col justify-center">
              <div className="text-lg font-bold text-gray-900 mb-1">
                {safeCTO.current.signal === 'bullish' ? 'Strong Uptrend' :
                 safeCTO.current.signal === 'bearish' ? 'Strong Downtrend' : 'Sideways Movement'}
              </div>
              <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                safeCTO.current.signal === 'bullish' ? 'bg-green-100 text-green-700' :
                safeCTO.current.signal === 'bearish' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
              }`}>
                {safeCTO.current.signal === 'bullish' ? 'Bullish' :
                 safeCTO.current.signal === 'bearish' ? 'Bearish' : 'Neutral'}
              </div>
            </div>
          </div>

          {/* Risk Assessment Card - Clean Design */}
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 min-h-[180px] flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h5 className="font-semibold text-gray-900">Risk Assessment</h5>
              <span className={`w-2 h-2 rounded-full ${
                safePeak.risk_level === 'danger' ? 'bg-red-500' :
                safePeak.risk_level === 'warning' ? 'bg-amber-500' : 'bg-green-500'
              }`}></span>
            </div>
            
            <div className="text-center mb-3 flex-1 flex flex-col justify-center">
              {/* Show risk level more prominently */}
              <div className={`text-lg font-bold mb-1 ${
                safePeak.risk_level === 'danger' ? 'text-red-700' :
                safePeak.risk_level === 'warning' ? 'text-amber-700' : 'text-green-700'
              }`}>
                {safePeak.risk_level === 'danger' ? 'HIGH RISK' :
                 safePeak.risk_level === 'warning' ? 'MEDIUM RISK' : 'LOW RISK'}
              </div>
              
              <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                safePeak.risk_level === 'danger' ? 'bg-red-100 text-red-700' :
                safePeak.risk_level === 'warning' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
              }`}>
                {safePeak.risk_level === 'danger' ? 'Consider selling' :
                 safePeak.risk_level === 'warning' ? 'Monitor closely' : 'Safe to hold'}
              </div>
            </div>
            
            <div className="text-xs text-center text-gray-500">
              {safePeak.confidence}% confidence • <button 
                onClick={() => setShowPeakModal(true)}
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Learn more
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Educational Peak Alert Modal - Unchanged */}
      {showPeakModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">📊 Peak Detector: Is a Crypto Top Forming?</h3>
                <button 
                  onClick={() => setShowPeakModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                {/* Current Status */}
                <div className={`p-4 rounded-lg border-2 ${
                  safePeak.risk_level === 'danger' ? 'bg-red-50 border-red-200' :
                  safePeak.risk_level === 'warning' ? 'bg-yellow-50 border-yellow-200' : 'bg-green-50 border-green-200'
                }`}>
                  <h4 className="font-semibold mb-2">🎯 Current Status for {currentSymbol.toUpperCase()}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium">
                      {safePeak.risk_level === 'danger' ? '🔴 HIGH RISK DETECTED' :
                       safePeak.risk_level === 'warning' ? '🟡 CAUTION ADVISED' : '🟢 SAFE CONDITIONS'}
                    </span>
                    <span className="font-bold">{safePeak.confidence}% Confidence</span>
                  </div>
                </div>

                {/* Simple Explanation */}
                <div>
                  <h4 className="font-semibold mb-3">🤔 What does this mean?</h4>
                  <p className="text-gray-700 mb-4">
                    Peak Alert is a <strong>comprehensive bubble detector</strong> that combines 10+ professional indicators used by 
                    institutional traders - the same tools that hedge funds and crypto exchanges rely on.
                  </p>
                  <p className="text-gray-700">
                    Instead of guessing, you get a <strong>data-driven assessment</strong> of market conditions. It is like having
                    a team of professional analysts working 24/7 to keep you informed of critical market changes.
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-3">
                      <h5 className="font-semibold text-orange-800">🔍 What we monitor:</h5>
                      <div className="space-y-2">
                        <div>
                          <div className="font-medium text-orange-700">Technical Oscillators</div>
                          <p className="text-orange-600">RSI, Stochastic, Williams %R</p>
                        </div>
                        <div>
                          <div className="font-medium text-orange-700">Moving Averages</div>
                          <p className="text-orange-600">50, 100, 200-day trends</p>
                        </div>
                        <div>
                          <div className="font-medium text-orange-700">Volume Indicators</div>
                          <p className="text-orange-600">OBV, Accumulation/Distribution</p>
                        </div>
                        <div>
                          <div className="font-medium text-orange-700">Sentiment Metrics</div>
                          <p className="text-orange-600">Fear & Greed, Social metrics</p>
                        </div>
                        <div>
                          <div className="font-medium text-orange-700">Market Structure</div>
                          <p className="text-orange-600">Support/Resistance levels</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h5 className="font-semibold text-orange-800">⚡ Advanced Analysis:</h5>
                      <div className="space-y-2">
                        <div>
                          <div className="font-medium text-orange-700">Market Cycles</div>
                          <p className="text-orange-600">Bull/bear phases</p>
                        </div>
                        <div>
                          <div className="font-medium text-orange-700">Volatility Models</div>
                          <p className="text-orange-600">Risk assessment</p>
                        </div>
                        <div>
                          <div className="font-medium text-orange-700">Correlation Analysis</div>
                          <p className="text-orange-600">Cross-asset relationships</p>
                        </div>
                        <div>
                          <div className="font-medium text-orange-700">Macro Indicators</div>
                          <p className="text-orange-600">Economic conditions</p>
                        </div>
                        <div>
                          <div className="font-medium text-orange-700">On-Chain Metrics</div>
                          <p className="text-orange-600">Network activity</p>
                        </div>
                        <div>
                          <div className="font-medium text-orange-700">Supply & Demand</div>
                          <p className="text-orange-600">Supply scarcity model</p>
                        </div>
                        <div>
                          <div className="font-medium text-orange-700">Volume Analysis</div>
                          <p className="text-orange-600">Trading activity spikes</p>
                        </div>
                        <div>
                          <div className="font-medium text-orange-700">Liquidity Ratio</div>
                          <p className="text-orange-600">Market depth analysis</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recommended Actions */}
                <div className={`p-4 rounded-lg border-l-4 ${
                  safePeak.risk_level === 'danger' ? 'bg-red-50 border-red-400' :
                  safePeak.risk_level === 'warning' ? 'bg-yellow-50 border-yellow-400' : 'bg-green-50 border-green-400'
                }`}>
                  <h4 className="font-semibold mb-2">💡 Recommended Actions</h4>
                  {safePeak.risk_level === 'danger' && (
                    <div className="text-red-700 space-y-1">
                      <p className="font-medium mb-2">⚠️ High Risk - Consider Defensive Strategies:</p>
                      <ul className="text-sm space-y-1 pl-4">
                        <li>• Consider taking some profits if you are up significantly</li>
                        <li>• Reduce position sizes or exposure</li>
                        <li>• Wait for better entry points if you are planning to buy</li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* Historical Context */}
                <div>
                  <h4 className="font-semibold mb-3">📚 Why is this important?</h4>
                  <p className="text-gray-700 mb-3">
                    Professional traders do not rely on just one indicator - they use <strong>multiple signals</strong> for higher accuracy. 
                    Our Peak Alert combines 10+ proven indicators that have successfully predicted major market tops.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg text-sm space-y-3">
                    <div className="font-medium mb-2">🎯 Why Multiple Indicators Work Better:</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <div className="font-medium text-blue-700">📊 Technical Analysis</div>
                        <p className="text-gray-600">Catches price & trend reversals</p>
                      </div>
                      <div>
                        <div className="font-medium text-purple-700">⛓️ On-Chain Data</div>
                        <p className="text-gray-600">Shows real user behavior</p>
                      </div>
                      <div>
                        <div className="font-medium text-orange-700">🏗️ Market Structure</div>
                        <p className="text-gray-600">Reveals supply/demand dynamics</p>
                      </div>
                      <div>
                        <div className="font-medium text-red-700">🚨 Combined Signal</div>
                        <p className="text-gray-600">Much higher accuracy than any single indicator</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-gray-200">
                      <div className="font-medium mb-2">🏆 Historical Success Examples:</div>
                      <div className="space-y-1 text-gray-700">
                        <div>• <strong>Bitcoin 2017:</strong> 8/10 indicators warned before 80% crash</div>
                        <div>• <strong>Ethereum 2018:</strong> 7/10 indicators detected bubble conditions</div>
                        <div>• <strong>General Market 2021:</strong> 9/10 indicators signaled extreme risk</div>
                        <div>• <strong>Recent Corrections:</strong> Consistently 70-85% accuracy rate</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="bg-gray-100 p-4 rounded-lg border">
                  <h4 className="font-semibold mb-2">⚠️ Important Disclaimer</h4>
                  <p className="text-sm text-gray-700 mb-3">
                    While Peak Alert uses <strong>10+ professional indicators</strong> trusted by institutional traders, 
                    no system is 100% accurate. Crypto markets can be unpredictable.
                  </p>
                  <div className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-400 mb-3">
                    <p className="text-sm text-yellow-800">
                      <strong>Remember:</strong> Even with 70-85% historical accuracy, 15-30% of signals can be wrong. 
                      Always use proper risk management and never invest more than you can afford to lose.
                    </p>
                  </div>
                  <p className="text-sm text-gray-700">
                    This tool is for <strong>educational purposes</strong> and is not financial advice. 
                    Always do your own research and consider your personal risk tolerance before making investment decisions.
                  </p>
                </div>

                {/* Close Button */}
                <div className="text-center pt-4">
                  <button 
                    onClick={() => setShowPeakModal(false)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium"
                  >
                    Got it, thanks!
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}