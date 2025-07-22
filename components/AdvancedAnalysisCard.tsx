'use client'

import { useEffect, useState } from 'react'
import { TrendingUp, TrendingDown, AlertTriangle, Activity, DollarSign, Target, Zap, AlertCircle, CheckCircle, XCircle } from 'lucide-react'

interface AdvancedAnalysisData {
  symbol: string
  current_price: number
  phase3_analysis: {
    trendIndicator: {
      v1: number
      m1: number
      m2: number
      v2: number
      signal: 'bullish' | 'bearish' | 'neutral'
      color: '#FF8C00' | '#C0C0C0' | '#000080'
      strength: number
      timestamp: string
    } | null
    bullMarketPeak: {
      isPeak: boolean
      peakStrength: number
      riskLevel: 'low' | 'medium' | 'high' | 'extreme'
      indicators: {
        priceDeviation: number
        volumeSpike: number
        rsiOverheated: boolean
        fearGreedIndex: number
      }
      timestamp: string
    } | null
    m2Liquidity: {
      m2Value: number
      correlation: number
      lagDays: number
      liquiditySignal: 'expanding' | 'contracting' | 'neutral'
      impactOnCrypto: 'positive' | 'negative' | 'neutral'
      timestamp: string
    } | null
    overallSignal: 'strong_bullish' | 'bullish' | 'neutral' | 'bearish' | 'strong_bearish'
    riskAssessment: 'very_low' | 'low' | 'medium' | 'high' | 'very_high'
  }
  market_regime: {
    phase: 'accumulation' | 'markup' | 'distribution' | 'markdown'
    confidence: number
  }
  timestamp: string
}

interface AdvancedAnalysisCardProps {
  symbol?: string
  className?: string
}

export default function AdvancedAnalysisCard({ symbol = 'bitcoin', className = '' }: AdvancedAnalysisCardProps) {
  const [analysisData, setAnalysisData] = useState<AdvancedAnalysisData | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentSymbol, setCurrentSymbol] = useState(symbol)
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const fetchAdvancedAnalysis = async (targetSymbol: string = currentSymbol) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/advanced-analysis?symbol=${targetSymbol}`)
      const result = await response.json()
      
      setAnalysisData(result.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching advanced analysis:', error)
      setLoading(false)
    }
  }

  useEffect(() => {
    // Update current symbol when prop changes
    setCurrentSymbol(symbol)
    
    // Initial load
    fetchAdvancedAnalysis(symbol)
    
    // Listen for manual refresh events from parent
    const handleManualRefresh = () => {
      fetchAdvancedAnalysis()
    }
    
    // Listen for crypto change events
    const handleCryptoChanged = (event: CustomEvent) => {
      const newSymbol = event.detail.cryptoId
      setCurrentSymbol(newSymbol)
      fetchAdvancedAnalysis(newSymbol)
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

  const formatLargeNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      compactDisplay: 'short'
    }).format(num)
  }

  const getOverallSignalColor = (signal: string) => {
    switch (signal) {
      case 'strong_bullish': return 'text-green-700 bg-green-100'
      case 'bullish': return 'text-green-600 bg-green-50'
      case 'neutral': return 'text-gray-600 bg-gray-50'
      case 'bearish': return 'text-red-600 bg-red-50'
      case 'strong_bearish': return 'text-red-700 bg-red-100'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'very_low': return 'text-green-700 bg-green-100'
      case 'low': return 'text-green-600 bg-green-50'
      case 'medium': return 'text-yellow-600 bg-yellow-50'
      case 'high': return 'text-red-600 bg-red-50'
      case 'very_high': return 'text-red-700 bg-red-100'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getMarketPhaseIcon = (phase: string) => {
    switch (phase) {
      case 'accumulation': return <Target className="h-4 w-4 text-blue-600" />
      case 'markup': return <TrendingUp className="h-4 w-4 text-green-600" />
      case 'distribution': return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case 'markdown': return <TrendingDown className="h-4 w-4 text-red-600" />
      default: return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  if (!mounted || loading) {
    return (
      <div className={`card ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!analysisData) return null

  const { phase3_analysis: analysis, market_regime } = analysisData

  return (
    <div className={`card ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Zap className="h-5 w-5 text-purple-600 mr-2" />
          Advanced Analysis - {analysisData.symbol}
        </h3>
        <span className="text-xs text-gray-500">
          {new Date(analysisData.timestamp).toLocaleTimeString('en-US')}
        </span>
      </div>

      <div className="space-y-6">
        {/* Overall Signal & Risk Assessment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-4 rounded-lg ${getOverallSignalColor(analysis.overallSignal)}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Overall Signal</p>
                <p className="font-semibold capitalize">
                  {analysis.overallSignal.replace('_', ' ')}
                </p>
              </div>
              <div>
                {analysis.overallSignal.includes('bullish') ? (
                  <TrendingUp className="h-6 w-6" />
                ) : analysis.overallSignal.includes('bearish') ? (
                  <TrendingDown className="h-6 w-6" />
                ) : (
                  <Activity className="h-6 w-6" />
                )}
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-lg ${getRiskColor(analysis.riskAssessment)}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Risk Level</p>
                <p className="font-semibold capitalize">
                  {analysis.riskAssessment.replace('_', ' ')}
                </p>
              </div>
              <div>
                {analysis.riskAssessment.includes('high') ? (
                  <AlertTriangle className="h-6 w-6" />
                ) : analysis.riskAssessment.includes('low') ? (
                  <CheckCircle className="h-6 w-6" />
                ) : (
                  <AlertCircle className="h-6 w-6" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Market Regime */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-gray-900 flex items-center">
              {getMarketPhaseIcon(market_regime.phase)}
              <span className="ml-2">Market Phase</span>
            </h4>
            <span className="text-sm font-medium text-blue-600">
              {market_regime.confidence}% confidence
            </span>
          </div>
          <p className="text-sm text-gray-700 capitalize">
            Currently in <strong>{market_regime.phase}</strong> phase
          </p>
        </div>

        {/* Trend Indicator */}
        {analysis.trendIndicator && (
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Trend Indicator (CTO Line)</h4>
            <div 
              className="p-4 rounded-lg"
              style={{ 
                backgroundColor: analysis.trendIndicator.color + '20',
                borderLeft: `4px solid ${analysis.trendIndicator.color}`
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium capitalize">
                  {analysis.trendIndicator.signal} Trend
                </span>
                <span className="text-sm font-medium">
                  Strength: {analysis.trendIndicator.strength.toFixed(1)}%
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">V1 (Main)</p>
                  <p className="font-semibold">{formatPrice(analysis.trendIndicator.v1)}</p>
                </div>
                <div>
                  <p className="text-gray-600">V2 (Confirm)</p>
                  <p className="font-semibold">{formatPrice(analysis.trendIndicator.v2)}</p>
                </div>
                <div>
                  <p className="text-gray-600">M1 (Fast)</p>
                  <p className="font-semibold">{formatPrice(analysis.trendIndicator.m1)}</p>
                </div>
                <div>
                  <p className="text-gray-600">M2 (Slow)</p>
                  <p className="font-semibold">{formatPrice(analysis.trendIndicator.m2)}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bull Market Peak Detection */}
        {analysis.bullMarketPeak && (
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Bull Market Peak Detection</h4>
            <div className={`p-4 rounded-lg ${
              analysis.bullMarketPeak.isPeak 
                ? 'bg-red-50 border-l-4 border-red-500' 
                : 'bg-green-50 border-l-4 border-green-500'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium flex items-center">
                  {analysis.bullMarketPeak.isPeak ? (
                    <AlertTriangle className="h-4 w-4 text-red-600 mr-2" />
                  ) : (
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  )}
                  {analysis.bullMarketPeak.isPeak ? 'Peak Warning Active' : 'No Peak Detected'}
                </span>
                <span className="text-sm font-medium">
                  Peak Strength: {analysis.bullMarketPeak.peakStrength.toFixed(1)}%
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Price Deviation</p>
                  <p className="font-semibold">
                    {analysis.bullMarketPeak.indicators.priceDeviation > 0 ? '+' : ''}
                    {analysis.bullMarketPeak.indicators.priceDeviation.toFixed(1)}%
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Volume Spike</p>
                  <p className="font-semibold">
                    {analysis.bullMarketPeak.indicators.volumeSpike.toFixed(1)}%
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">RSI Status</p>
                  <p className="font-semibold">
                    {analysis.bullMarketPeak.indicators.rsiOverheated ? 'Overheated' : 'Normal'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Fear & Greed</p>
                  <p className="font-semibold">
                    {analysis.bullMarketPeak.indicators.fearGreedIndex.toFixed(0)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* M2 Liquidity Correlation */}
        {analysis.m2Liquidity && (
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">M2 Global Liquidity (90-day lag)</h4>
            <div className={`p-4 rounded-lg ${
              analysis.m2Liquidity.impactOnCrypto === 'positive' 
                ? 'bg-green-50 border-l-4 border-green-500'
                : analysis.m2Liquidity.impactOnCrypto === 'negative'
                ? 'bg-red-50 border-l-4 border-red-500'
                : 'bg-gray-50 border-l-4 border-gray-500'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium">
                  Impact: {analysis.m2Liquidity.impactOnCrypto.charAt(0).toUpperCase() + 
                           analysis.m2Liquidity.impactOnCrypto.slice(1)}
                </span>
                <span className="text-sm font-medium">
                  Correlation: {(analysis.m2Liquidity.correlation * 100).toFixed(1)}%
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">M2 Money Supply</p>
                  <p className="font-semibold">{formatLargeNumber(analysis.m2Liquidity.m2Value)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Liquidity Trend</p>
                  <p className="font-semibold capitalize">
                    {analysis.m2Liquidity.liquiditySignal}
                    {analysis.m2Liquidity.liquiditySignal === 'expanding' ? ' 📈' :
                     analysis.m2Liquidity.liquiditySignal === 'contracting' ? ' 📉' : ' ➡️'}
                  </p>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-600">
                  {analysis.m2Liquidity.lagDays}-day correlation analysis shows {
                    Math.abs(analysis.m2Liquidity.correlation) > 0.5 ? 'strong' : 
                    Math.abs(analysis.m2Liquidity.correlation) > 0.3 ? 'moderate' : 'weak'
                  } relationship between M2 expansion and crypto prices.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Phase 3 Summary */}
        <div className="border-t border-gray-200 pt-4">
          <h4 className="font-medium text-gray-900 mb-3">Phase 3 Analysis Summary</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p>• <strong>Trend Indicator:</strong> {analysis.trendIndicator?.signal || 'N/A'} with {analysis.trendIndicator?.strength?.toFixed(1) || '0'}% strength</p>
            <p>• <strong>Peak Warning:</strong> {analysis.bullMarketPeak?.isPeak ? 'Active' : 'Inactive'} ({analysis.bullMarketPeak?.riskLevel || 'N/A'} risk)</p>
            <p>• <strong>M2 Liquidity:</strong> {analysis.m2Liquidity?.liquiditySignal || 'N/A'} with {analysis.m2Liquidity?.impactOnCrypto || 'N/A'} crypto impact</p>
            <p>• <strong>Market Phase:</strong> {market_regime.phase} ({market_regime.confidence}% confidence)</p>
          </div>
        </div>
      </div>
    </div>
  )
} 