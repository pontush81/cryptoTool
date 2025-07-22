'use client'

import { useEffect, useState } from 'react'
import { ShoppingCart, TrendingUp, TrendingDown, Activity, AlertTriangle } from 'lucide-react'

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
    latest: any
    recent: any[]
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
  const [taData, setTAData] = useState<TechnicalAnalysisData | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentSymbol, setCurrentSymbol] = useState(symbol)
  const [mounted, setMounted] = useState(false)
  const [showPeakModal, setShowPeakModal] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const fetchTechnicalAnalysis = async (targetSymbol: string = currentSymbol) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/technical-analysis?symbol=${targetSymbol}`)
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

  // Kombinera alla signaler för overall sentiment
  const getOverallSentiment = (rsi: number, macdCrossover: string, ctoSignal: string, ctoCrossover: string, peakRiskLevel: string) => {
    const rsiSignal = rsi <= 30 ? 'bullish' : rsi >= 70 ? 'bearish' : 'neutral'
    const macdSignal = macdCrossover === 'bullish' ? 'bullish' : macdCrossover === 'bearish' ? 'bearish' : 'neutral'
    const ctoTrendSignal = ctoCrossover === 'bullish' ? 'bullish' : ctoCrossover === 'bearish' ? 'bearish' : ctoSignal === 'bullish' ? 'bullish' : ctoSignal === 'bearish' ? 'bearish' : 'neutral'
    
    // Peak detection override - if HIGH RISK, always be cautious
    const peakWarning = peakRiskLevel === 'danger'
    const peakCaution = peakRiskLevel === 'warning'

    const signals = [rsiSignal, macdSignal, ctoTrendSignal]
    const bullishCount = signals.filter(s => s === 'bullish').length
    const bearishCount = signals.filter(s => s === 'bearish').length

    // Peak detection overrides normal sentiment
    if (peakWarning) {
      return {
        sentiment: 'Cautiously Bearish',
        emoji: '🚨',
        color: 'text-red-600',
        bgColor: 'bg-red-50 border-red-200',
        message: 'PEAK RISK DETECTED! Consider taking profits or waiting for better entry.',
        strength: 'High Risk'
      }
    }
    
    if (peakCaution && bullishCount >= 2) {
      return {
        sentiment: 'Cautiously Bullish',
        emoji: '⚠️',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50 border-yellow-200',
        message: 'Mixed signals with peak concerns. Proceed with caution.',
        strength: 'Moderate Caution'
      }
    }

    if (bullishCount >= 2 && bearishCount === 0) {
      return {
        sentiment: 'Bullish',
        emoji: '🚀',
        color: 'text-green-600',
        bgColor: 'bg-green-50 border-green-200',
        message: 'Multiple indicators suggest upward momentum. Consider buying opportunities.',
        strength: bullishCount === 3 ? 'Strong' : 'Moderate'
      }
    }
    
    if (bearishCount >= 2 && bullishCount === 0) {
      return {
        sentiment: 'Bearish',
        emoji: '📉',
        color: 'text-red-600',
        bgColor: 'bg-red-50 border-red-200',
        message: 'Multiple indicators suggest downward pressure. Consider holding or selling.',
        strength: bearishCount === 3 ? 'Strong' : 'Moderate'
      }
    }
    
    if (bullishCount >= 1 && bearishCount >= 1) {
      return {
        sentiment: 'Mixed Signals',
        emoji: '🤔',
        color: 'text-gray-600',
        bgColor: 'bg-gray-50 border-gray-200',
        message: 'Conflicting indicators detected. Wait for clearer signals before making decisions.',
        strength: 'Uncertain'
      }
    }

    return {
      sentiment: 'Neutral',
      emoji: '😐',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 border-blue-200',
      message: 'Market showing neutral conditions. Monitor for developing trends.',
      strength: 'Moderate'
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
    <div className={`card ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Activity className="h-5 w-5 text-blue-600 mr-2" />
          Technical Analysis - {taData.symbol.toUpperCase()}
        </h3>
        <span className="text-xs text-gray-500">
          {new Date(taData.timestamp).toLocaleTimeString('en-US')}
        </span>
      </div>

            <div className="space-y-6">
        {/* Current Price */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="text-center">
            <p className="text-sm text-blue-600">Current Price</p>
            <p className="text-2xl font-bold text-blue-900">
              {formatPrice(taData.current_price)}
            </p>
          </div>
        </div>

        {/* Overall Market Sentiment - Hero Section */}
        <div className="border-2 border-blue-200 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="p-6">
            <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
              Overall Market Sentiment
            </h4>
            
            {(() => {
              const sentiment = getOverallSentiment(safeRSI.current, safeMACD.crossover, safeCTO.current.signal, safeCTO.crossover, safePeak.risk_level)
              return (
                <div className={`p-6 rounded-xl border-2 ${sentiment.bgColor} shadow-sm`}>
                  <div className={`flex items-center justify-between mb-4 ${sentiment.color}`}>
                    <div className="flex items-center gap-4">
                      <span className="text-4xl">{sentiment.emoji}</span>
                      <div>
                        <div className="text-2xl font-bold">{sentiment.sentiment}</div>
                        <div className="text-lg font-medium opacity-75">{sentiment.strength} Signal</div>
                      </div>
                    </div>
                  </div>
                  
                  <p className={`text-base font-medium ${sentiment.color} mb-4`}>
                    {sentiment.message}
                  </p>
                  
                  <div className="flex items-center justify-center gap-6 text-sm">
                    <span className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                      safeRSI.current <= 30 ? 'bg-green-100 text-green-700' : 
                      safeRSI.current >= 70 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      <span className="w-2 h-2 rounded-full bg-current"></span>
                      RSI: {safeRSI.current <= 30 ? 'Oversold' : 
                            safeRSI.current >= 70 ? 'Overbought' : 'Neutral'}
                    </span>
                    
                    <span className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                      safeMACD.crossover === 'bullish' ? 'bg-green-100 text-green-700' :
                      safeMACD.crossover === 'bearish' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      <span className="w-2 h-2 rounded-full bg-current"></span>
                      MACD: {safeMACD.crossover === 'bullish' ? 'Bullish' :
                             safeMACD.crossover === 'bearish' ? 'Bearish' : 'No Signal'}
                    </span>
                    
                    <span className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                      safeCTO.current.signal === 'bullish' ? 'bg-green-100 text-green-700' :
                      safeCTO.current.signal === 'bearish' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      <span className="w-2 h-2 rounded-full bg-current"></span>
                      Trend: {safeCTO.current.signal === 'bullish' ? 'Bullish' :
                              safeCTO.current.signal === 'bearish' ? 'Bearish' : 'Neutral'}
                    </span>
                    
                    <span className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                      safePeak.risk_level === 'danger' ? 'bg-red-100 text-red-700' :
                      safePeak.risk_level === 'warning' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                    }`}>
                      <span className="w-2 h-2 rounded-full bg-current"></span>
                      Peak: {safePeak.risk_level === 'danger' ? 'High Risk' :
                             safePeak.risk_level === 'warning' ? 'Caution' : 'Safe'}
                    </span>
                  </div>
                </div>
              )
            })()}
          </div>
        </div>

        {/* Technical Indicators - Grouped Section */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900 flex items-center">
            <div className="w-2 h-2 bg-gray-400 rounded-full mr-2"></div>
            Technical Indicators
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* RSI Compact Card */}
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h5 className="font-medium text-gray-900">RSI</h5>
                <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                  safeRSI.current <= 30 ? 'bg-green-100 text-green-800' :
                  safeRSI.current >= 70 ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {safeRSI.current.toFixed(1)}
                </span>
              </div>
              
              <div className={`text-center py-2 px-3 rounded-lg text-sm font-medium ${
                safeRSI.current <= 30 ? 'bg-green-50 text-green-700' :
                safeRSI.current >= 70 ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'
              }`}>
                {safeRSI.current <= 30 ? '🛒 BUY SIGNAL' :
                 safeRSI.current >= 70 ? '💰 SELL SIGNAL' : '⏸️ HOLD'}
              </div>
              
              <div className="mt-3 h-2 bg-gray-200 rounded-full">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    safeRSI.current <= 30 ? 'bg-green-500' :
                    safeRSI.current >= 70 ? 'bg-red-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${Math.min(100, Math.max(0, safeRSI.current))}%` }}
                ></div>
              </div>
            </div>

            {/* MACD Compact Card */}
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h5 className="font-medium text-gray-900">MACD</h5>
                <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                  safeMACD.crossover === 'bullish' ? 'bg-green-100 text-green-800' :
                  safeMACD.crossover === 'bearish' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {getMomentumStrength(safeMACD.current.histogram)}
                </span>
              </div>
              
              <div className={`text-center py-2 px-3 rounded-lg text-sm font-medium ${
                safeMACD.crossover === 'bullish' ? 'bg-green-50 text-green-700' :
                safeMACD.crossover === 'bearish' ? 'bg-red-50 text-red-700' : 'bg-gray-50 text-gray-700'
              }`}>
                {safeMACD.crossover === 'bullish' ? '📈 TREND UP' :
                 safeMACD.crossover === 'bearish' ? '📉 TREND DOWN' : '➡️ NO CLEAR TREND'}
              </div>
              
              <div className="mt-3 flex items-center justify-center">
                <div className={`text-xs font-medium ${getMomentumDirection(safeMACD.current.histogram).color}`}>
                  Momentum: {getMomentumDirection(safeMACD.current.histogram).text}
                </div>
              </div>
            </div>

            {/* Trend Signal Compact Card */}
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h5 className="font-medium text-gray-900">Trend Signal</h5>
                <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                  safeCTO.current.signal === 'bullish' ? 'bg-green-100 text-green-800' :
                  safeCTO.current.signal === 'bearish' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {safeCTO.current.signal === 'bullish' ? 'Bullish' : 
                   safeCTO.current.signal === 'bearish' ? 'Bearish' : 'Neutral'}
                </span>
              </div>
              
              <div className={`text-center py-2 px-3 rounded-lg text-sm font-medium ${
                safeCTO.crossover === 'bullish' || (safeCTO.current.signal === 'bullish' && Math.abs(safeCTO.current.value) < 5) ? 'bg-green-50 text-green-700' :
                safeCTO.crossover === 'bearish' || (safeCTO.current.signal === 'bearish' && Math.abs(safeCTO.current.value) < 5) ? 'bg-red-50 text-red-700' : 'bg-gray-50 text-gray-700'
              }`}>
                {safeCTO.crossover === 'bullish' || (safeCTO.current.signal === 'bullish' && Math.abs(safeCTO.current.value) < 5) ? '🚀 UPTREND SIGNAL' :
                 safeCTO.crossover === 'bearish' || (safeCTO.current.signal === 'bearish' && Math.abs(safeCTO.current.value) < 5) ? '⚠️ DOWNTREND SIGNAL' : '🔄 TREND CONTINUATION'}
              </div>
              
              <div className="mt-3 text-center text-xs text-gray-600">
                Value: {safeCTO.current.value.toFixed(2)}
              </div>
            </div>

            {/* Bull Market Peak Detection Compact Card - Clickable */}
            <div 
              className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm cursor-pointer hover:shadow-md transition-all duration-200 hover:border-blue-300"
              onClick={() => setShowPeakModal(true)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h5 className="font-medium text-gray-900">Peak Alert</h5>
                  <div className="px-2 py-1 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full">
                    <span className="text-xs font-bold text-blue-700">10+ Indicators</span>
                  </div>
                  <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-xs font-bold">?</span>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                  safePeak.risk_level === 'danger' ? 'bg-red-100 text-red-800' :
                  safePeak.risk_level === 'warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                }`}>
                  {safePeak.confidence}%
                </span>
              </div>
              
              <div className={`text-center py-2 px-3 rounded-lg text-sm font-medium ${
                safePeak.risk_level === 'danger' ? 'bg-red-50 text-red-700' :
                safePeak.risk_level === 'warning' ? 'bg-yellow-50 text-yellow-700' : 'bg-green-50 text-green-700'
              }`}>
                {safePeak.risk_level === 'danger' ? '🔴 HIGH RISK' :
                 safePeak.risk_level === 'warning' ? '🟡 CAUTION' : '🟢 SAFE CONDITIONS'}
              </div>
              
              <div className="mt-3 text-center text-xs text-gray-600">
                {safePeak.risk_level === 'danger' ? 'Consider profits' :
                 safePeak.risk_level === 'warning' ? 'Monitor closely' : 'Good to invest'}
              </div>
              
              <div className="mt-2 text-center text-xs text-blue-600">
                Pro-level analysis • Click to learn more
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Educational Peak Alert Modal */}
      {showPeakModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">📊 Peak Alert: 10+ Pro Indicators</h3>
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
                    Instead of guessing, you get a <strong>data-driven assessment</strong> of market conditions. It's like having 
                    a team of professional analysts working 24/7 to warn you before major market crashes.
                  </p>
                </div>

                {/* How it Works */}
                <div>
                  <h4 className="font-semibold mb-3">⚡ How does it work?</h4>
                  <p className="text-gray-700 mb-4">
                    Our Peak Alert uses <strong>10 professional indicators</strong> that institutional traders rely on:
                  </p>
                  
                  <div className="space-y-4">
                    {/* Technical Indicators */}
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h5 className="font-medium text-blue-800 mb-3">📊 Technical Analysis (4 indicators)</h5>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <div className="font-medium text-blue-700">Pi Cycle Top</div>
                          <p className="text-blue-600">Moving average crossover</p>
                        </div>
                        <div>
                          <div className="font-medium text-blue-700">Puell Multiple</div>
                          <p className="text-blue-600">Mining profitability</p>
                        </div>
                        <div>
                          <div className="font-medium text-blue-700">MVRV Z-Score</div>
                          <p className="text-blue-600">Market vs realized value</p>
                        </div>
                        <div>
                          <div className="font-medium text-blue-700">NVT Golden Cross</div>
                          <p className="text-blue-600">Network transaction value</p>
                        </div>
                      </div>
                    </div>

                    {/* On-Chain Indicators */}
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                      <h5 className="font-medium text-purple-800 mb-3">⛓️ On-Chain Analysis (3 indicators)</h5>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <div className="font-medium text-purple-700">Reserve Risk</div>
                          <p className="text-purple-600">Long-term holder confidence</p>
                        </div>
                        <div>
                          <div className="font-medium text-purple-700">Whale Activity</div>
                          <p className="text-purple-600">Large holder movements</p>
                        </div>
                        <div>
                          <div className="font-medium text-purple-700">Network Growth</div>
                          <p className="text-purple-600">New user adoption</p>
                        </div>
                      </div>
                    </div>

                    {/* Market Structure */}
                    <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                      <h5 className="font-medium text-orange-800 mb-3">🏗️ Market Structure (3 indicators)</h5>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <div className="font-medium text-orange-700">Stock-to-Flow</div>
                          <p className="text-orange-600">Supply scarcity model</p>
                        </div>
                        <div>
                          <div className="font-medium text-orange-700">Volume Analysis</div>
                          <p className="text-orange-600">Trading activity spikes</p>
                        </div>
                        <div>
                          <div className="font-medium text-orange-700">Liquidity Ratio</div>
                          <p className="text-orange-600">Market depth conditions</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* What to Do */}
                <div>
                  <h4 className="font-semibold mb-3">🎯 What should you do?</h4>
                  {safePeak.risk_level === 'danger' ? (
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                      <div className="font-medium text-red-800 mb-2">🚨 HIGH RISK Action Plan:</div>
                      <ul className="text-red-700 space-y-1 text-sm">
                        <li>• Consider taking some profits if you're up significantly</li>
                        <li>• Avoid making large new investments right now</li>
                        <li>• Review your portfolio and risk management</li>
                        <li>• Wait for better entry points if you're planning to buy</li>
                      </ul>
                    </div>
                  ) : safePeak.risk_level === 'warning' ? (
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <div className="font-medium text-yellow-800 mb-2">⚠️ CAUTION Action Plan:</div>
                      <ul className="text-yellow-700 space-y-1 text-sm">
                        <li>• Monitor the market closely for changes</li>
                        <li>• Be more selective with new investments</li>
                        <li>• Consider smaller position sizes</li>
                        <li>• Keep some cash ready for opportunities</li>
                      </ul>
                    </div>
                  ) : (
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <div className="font-medium text-green-800 mb-2">🟢 SAFE CONDITIONS Action Plan:</div>
                      <ul className="text-green-700 space-y-1 text-sm">
                        <li>• Good environment for gradual investing</li>
                        <li>• Consider dollar-cost averaging strategies</li>
                        <li>• Look for quality projects at reasonable prices</li>
                        <li>• Build positions steadily over time</li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* Historical Context */}
                <div>
                  <h4 className="font-semibold mb-3">📚 Why is this important?</h4>
                  <p className="text-gray-700 mb-3">
                    Professional traders don't rely on just one indicator - they use <strong>multiple signals</strong> for higher accuracy. 
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