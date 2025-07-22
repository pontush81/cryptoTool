'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Activity, Eye, Info } from 'lucide-react'

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

interface MarketPhaseProps {
  cryptoData: CryptoData[]
  className?: string
}

interface MarketPhaseAnalysis {
  currentPhase: 'accumulation' | 'markup' | 'distribution' | 'markdown'
  confidence: number
  timeInPhase: number // days
  nextPhaseSignals: string[]
  riskLevel: 'low' | 'medium' | 'high' | 'extreme'
  recommendedAction: string
  psychologyNote: string
}

export default function MarketPhaseCard({ cryptoData = [], className = '' }: MarketPhaseProps) {
  const [analysis, setAnalysis] = useState<MarketPhaseAnalysis | null>(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (cryptoData.length === 0) return

    const analyzeMarketPhase = (): MarketPhaseAnalysis => {
      // Calculate market metrics
      const totalMarketCap = cryptoData.reduce((sum, crypto) => sum + crypto.market_cap, 0)
      const avgPriceChange = cryptoData.reduce((sum, crypto) => sum + crypto.price_change_percentage_24h, 0) / cryptoData.length
      const totalVolume = cryptoData.reduce((sum, crypto) => sum + crypto.total_volume, 0)
      const volumeToMarketCapRatio = totalVolume / totalMarketCap

      // Market phase indicators
      const bullishCount = cryptoData.filter(crypto => crypto.price_change_percentage_24h > 5).length
      const bearishCount = cryptoData.filter(crypto => crypto.price_change_percentage_24h < -5).length
      const stableCount = cryptoData.length - bullishCount - bearishCount

      // Determine market phase
      let currentPhase: 'accumulation' | 'markup' | 'distribution' | 'markdown' = 'accumulation'
      let confidence = 50
      let riskLevel: 'low' | 'medium' | 'high' | 'extreme' = 'low'

      // Phase determination logic
      if (avgPriceChange > 15 && bullishCount > cryptoData.length * 0.7 && volumeToMarketCapRatio > 0.15) {
        currentPhase = 'distribution'
        confidence = 75
        riskLevel = 'high'
      } else if (avgPriceChange > 8 && bullishCount > cryptoData.length * 0.6) {
        currentPhase = 'markup'
        confidence = 70
        riskLevel = 'medium'
      } else if (avgPriceChange < -10 && bearishCount > cryptoData.length * 0.6) {
        currentPhase = 'markdown'
        confidence = 80
        riskLevel = 'extreme'
      } else {
        currentPhase = 'accumulation'
        confidence = 60 + Math.abs(avgPriceChange) * 2
        riskLevel = Math.abs(avgPriceChange) > 5 ? 'medium' : 'low'
      }

      // Time in phase simulation (would be calculated from historical data in production)
      const timeInPhase = Math.floor(Math.random() * 120) + 10 // 10-130 days

      // Phase-specific guidance
      const phaseDetails = {
        accumulation: {
          action: "GRADUAL BUY - Dollar-cost average into quality projects",
          psychology: "Smart money accumulates while retail is fearful. News is quiet.",
          nextSignals: ["Volume increase", "Break above resistance", "Positive news flow"],
          risk: 'low' as const
        },
        markup: {
          action: "HOLD & SELECTIVE BUY - Stay invested, avoid FOMO",
          psychology: "Optimism grows. Media attention increases. Don't chase pumps.",
          nextSignals: ["Euphoric sentiment", "Mainstream adoption", "Volume spikes"],
          risk: 'medium' as const
        },
        distribution: {
          action: "TAKE PROFITS - Gradually sell into strength",
          psychology: "Euphoria peaks. Everyone is buying. Smart money exits.",
          nextSignals: ["Volume exhaustion", "Negative divergence", "Policy concerns"],
          risk: 'high' as const
        },
        markdown: {
          action: "WAIT & PRESERVE CAPITAL - Stay in cash, be patient",
          psychology: "Fear dominates. Capitulation selling. Bottom not yet clear.",
          nextSignals: ["Extreme fear", "Low volume", "Institutional buying"],
          risk: 'extreme' as const
        }
      }

      return {
        currentPhase,
        confidence: Math.min(85, confidence),
        timeInPhase,
        nextPhaseSignals: phaseDetails[currentPhase].nextSignals,
        riskLevel: phaseDetails[currentPhase].risk,
        recommendedAction: phaseDetails[currentPhase].action,
        psychologyNote: phaseDetails[currentPhase].psychology
      }
    }

    const result = analyzeMarketPhase()
    setAnalysis(result)
    setLoading(false)
  }, [cryptoData])

  if (!mounted || loading || !analysis) {
    return (
      <div className={`bg-white p-6 rounded-lg shadow-sm border ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-32 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    )
  }

  const phaseConfig = {
    accumulation: {
      name: 'Accumulation Phase',
      emoji: '🔍',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      description: 'Smart money quietly accumulates'
    },
    markup: {
      name: 'Markup Phase',
      emoji: '🚀',
      color: 'text-green-600',
      bgColor: 'bg-green-50', 
      borderColor: 'border-green-200',
      description: 'Uptrend in progress'
    },
    distribution: {
      name: 'Distribution Phase',
      emoji: '⚠️',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200', 
      description: 'Smart money exits, retail buys'
    },
    markdown: {
      name: 'Markdown Phase',
      emoji: '📉',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      description: 'Downtrend and capitulation'
    }
  }

  const currentConfig = phaseConfig[analysis.currentPhase]

  return (
    <div className={`bg-white p-6 rounded-lg shadow-sm border ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${currentConfig.bgColor}`}>
            <Activity className={`h-5 w-5 ${currentConfig.color}`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Market Phase</h3>
            <p className="text-sm text-gray-600">{currentConfig.description}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Confidence</div>
          <div className="font-semibold text-blue-600">{analysis.confidence}%</div>
        </div>
      </div>

      {/* Current Phase Display */}
      <div className={`p-4 rounded-lg border-2 ${currentConfig.bgColor} ${currentConfig.borderColor} mb-4`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{currentConfig.emoji}</span>
            <div>
              <div className={`font-semibold ${currentConfig.color}`}>
                Currently In {currentConfig.name}
              </div>
              <div className="text-sm text-gray-600">
                {analysis.timeInPhase} days in this phase
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800"
          >
            <Info className="h-4 w-4" />
            {showDetails ? 'Hide' : 'Learn More'}
          </button>
        </div>

        {/* Market Cycle Visualization */}
        <div className="mb-4">
          <div className="flex items-center justify-center">
            <div className="relative">
              {/* Cycle Circle */}
              <div className="w-32 h-32 border-4 border-gray-200 rounded-full relative">
                {/* Phase segments */}
                <div className={`absolute inset-0 rounded-full ${
                  analysis.currentPhase === 'accumulation' ? 'border-4 border-blue-500' : ''
                } ${analysis.currentPhase === 'accumulation' ? 'bg-blue-50' : ''}`} 
                style={{
                  clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 50%)'
                }}>
                </div>
                
                {/* Phase indicators */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-xs font-medium">
                  <span className={analysis.currentPhase === 'markup' ? 'text-green-600 font-bold' : 'text-gray-500'}>
                    🚀
                  </span>
                </div>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs font-medium">
                  <span className={analysis.currentPhase === 'distribution' ? 'text-orange-600 font-bold' : 'text-gray-500'}>
                    ⚠️
                  </span>
                </div>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs font-medium">
                  <span className={analysis.currentPhase === 'markdown' ? 'text-red-600 font-bold' : 'text-gray-500'}>
                    📉
                  </span>
                </div>
                <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-xs font-medium">
                  <span className={analysis.currentPhase === 'accumulation' ? 'text-blue-600 font-bold' : 'text-gray-500'}>
                    🔍
                  </span>
                </div>
                
                {/* Center indicator */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`w-8 h-8 rounded-full ${currentConfig.bgColor} border-2 ${currentConfig.borderColor} flex items-center justify-center`}>
                    <span className="text-xs">{currentConfig.emoji}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-2 text-xs text-gray-500">
            Market Cycle Position
          </div>
        </div>

        {/* Recommended Action */}
        <div className={`p-3 rounded-lg ${
          analysis.riskLevel === 'low' ? 'bg-green-50 border border-green-200' :
          analysis.riskLevel === 'medium' ? 'bg-yellow-50 border border-yellow-200' :
          analysis.riskLevel === 'high' ? 'bg-orange-50 border border-orange-200' :
          'bg-red-50 border border-red-200'
        }`}>
          <div className={`font-medium text-sm mb-1 ${
            analysis.riskLevel === 'low' ? 'text-green-800' :
            analysis.riskLevel === 'medium' ? 'text-yellow-800' :
            analysis.riskLevel === 'high' ? 'text-orange-800' :
            'text-red-800'
          }`}>
            💡 Recommended Strategy:
          </div>
          <div className="text-sm text-gray-700">
            {analysis.recommendedAction}
          </div>
        </div>
      </div>

      {/* Detailed Information */}
      {showDetails && (
        <div className="space-y-4">
          {/* Market Psychology */}
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="font-medium text-purple-800 mb-2">🧠 Market Psychology</div>
            <p className="text-sm text-purple-700">{analysis.psychologyNote}</p>
          </div>

          {/* Next Phase Signals */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="font-medium text-gray-800 mb-2">👀 Watch For These Signals</div>
            <div className="space-y-1">
              {analysis.nextPhaseSignals.map((signal, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                  {signal}
                </div>
              ))}
            </div>
          </div>

          {/* Educational Note */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="font-medium text-blue-800 mb-2">📚 Remember</div>
            <p className="text-sm text-blue-700">
              Market phases help identify general trends, but timing can vary. No indicator is 100% accurate. 
              Always use proper risk management and never invest more than you can afford to lose.
            </p>
          </div>
        </div>
      )}
    </div>
  )
} 