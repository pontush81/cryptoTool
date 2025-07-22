'use client'

import { useState, useEffect } from 'react'

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

interface GlobalPeakAlertProps {
  cryptoData: CryptoData[]
  className?: string
}

interface GlobalMarketAnalysis {
  overall_risk_level: 'safe' | 'warning' | 'danger'
  market_cap_deviation: number
  volume_spike: number
  fear_greed_index: number
  market_momentum: 'bullish' | 'bearish' | 'neutral'
  bubble_indicators: {
    extreme_valuations: boolean
    retail_fomo: boolean
    institutional_exits: boolean
    correlation_breakdown: boolean
  }
  confidence: number
  message: string
}

export default function GlobalPeakAlertCard({ cryptoData = [], className = '' }: GlobalPeakAlertProps) {
  const [analysis, setAnalysis] = useState<GlobalMarketAnalysis | null>(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [showModal, setShowModal] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Calculate global market analysis
  useEffect(() => {
    if (cryptoData.length === 0) return

    const calculateGlobalAnalysis = (): GlobalMarketAnalysis => {
      // Calculate market metrics
      const totalMarketCap = cryptoData.reduce((sum, crypto) => sum + crypto.market_cap, 0)
      const totalVolume = cryptoData.reduce((sum, crypto) => sum + crypto.total_volume, 0)
      const avgPriceChange = cryptoData.reduce((sum, crypto) => sum + crypto.price_change_percentage_24h, 0) / cryptoData.length

      // Market cap concentration (top 3 vs rest)
      const sortedByMcap = [...cryptoData].sort((a, b) => b.market_cap - a.market_cap)
      const top3MarketCap = sortedByMcap.slice(0, 3).reduce((sum, crypto) => sum + crypto.market_cap, 0)
      const marketCapConcentration = (top3MarketCap / totalMarketCap) * 100

      // Volume analysis
      const avgMarketCap = totalMarketCap / cryptoData.length
      const volumeToMcapRatio = totalVolume / totalMarketCap
      const normalVolumeRatio = 0.1 // 10% is considered normal
      const volumeSpike = ((volumeToMcapRatio - normalVolumeRatio) / normalVolumeRatio) * 100

      // Market momentum analysis
      const bullishCount = cryptoData.filter(crypto => crypto.price_change_percentage_24h > 2).length
      const bearishCount = cryptoData.filter(crypto => crypto.price_change_percentage_24h < -2).length
      const neutralCount = cryptoData.length - bullishCount - bearishCount

      let market_momentum: 'bullish' | 'bearish' | 'neutral' = 'neutral'
      if (bullishCount > bearishCount * 1.5) market_momentum = 'bullish'
      else if (bearishCount > bullishCount * 1.5) market_momentum = 'bearish'

      // Bubble indicators assessment
      const extreme_valuations = marketCapConcentration > 75 && avgPriceChange > 15
      const retail_fomo = volumeSpike > 200 && bullishCount > cryptoData.length * 0.7
      const institutional_exits = bearishCount > cryptoData.length * 0.6 && volumeSpike > 150
      const correlation_breakdown = Math.abs(avgPriceChange) > 10 && volumeSpike > 100

      // Fear & Greed simulation (based on market conditions)
      let fear_greed_index = 50 // neutral
      if (market_momentum === 'bullish') fear_greed_index += 20
      if (market_momentum === 'bearish') fear_greed_index -= 20
      if (extreme_valuations) fear_greed_index += 15
      if (retail_fomo) fear_greed_index += 10
      fear_greed_index = Math.max(0, Math.min(100, fear_greed_index))

      // Risk level calculation
      const riskFactors = [
        extreme_valuations ? 25 : 0,
        retail_fomo ? 25 : 0,
        institutional_exits ? 20 : 0,
        correlation_breakdown ? 15 : 0,
        volumeSpike > 200 ? 15 : volumeSpike > 100 ? 10 : 0,
        fear_greed_index > 80 ? 20 : fear_greed_index > 70 ? 10 : 0
      ]

      const totalRisk = riskFactors.reduce((sum, risk) => sum + risk, 0)
      
      let overall_risk_level: 'safe' | 'warning' | 'danger' = 'safe'
      let message = 'HEALTHY CONDITIONS - Good environment for gradual investment'
      let confidence = 70

      if (totalRisk > 70 || (extreme_valuations && retail_fomo)) {
        overall_risk_level = 'danger'
        message = 'HIGH MARKET RISK - Consider taking profits and reducing exposure'
        confidence = Math.min(95, 75 + totalRisk / 4)
      } else if (totalRisk > 40 || extreme_valuations || retail_fomo) {
        overall_risk_level = 'warning'
        message = 'CAUTION ADVISED - Market showing signs of overheating'
        confidence = Math.min(85, 70 + totalRisk / 3)
      } else {
        confidence = Math.max(65, 85 - totalRisk / 2)
      }

      return {
        overall_risk_level,
        market_cap_deviation: (totalMarketCap - avgMarketCap * cryptoData.length) / (avgMarketCap * cryptoData.length) * 100,
        volume_spike: Math.max(0, volumeSpike),
        fear_greed_index,
        market_momentum,
        bubble_indicators: {
          extreme_valuations,
          retail_fomo,
          institutional_exits,
          correlation_breakdown
        },
        confidence: Math.round(confidence),
        message
      }
    }

    const result = calculateGlobalAnalysis()
    setAnalysis(result)
    setLoading(false)
  }, [cryptoData])

  if (!mounted || loading || !analysis) {
    return (
      <div className={`bg-white p-4 rounded-lg border border-gray-200 shadow-sm ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>
          <div className="h-8 bg-gray-200 rounded mb-3"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Global Peak Alert Compact Card - Clickable */}
      <div 
        className={`bg-white p-4 rounded-lg border border-gray-200 shadow-sm cursor-pointer hover:shadow-md transition-all duration-200 hover:border-purple-300 ${className}`}
        onClick={() => setShowModal(true)}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900">🌍 Global Peak Alert</h3>
            <div className="px-2 py-1 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full">
              <span className="text-xs font-bold text-purple-700">Market-Wide</span>
            </div>
            <div className="w-4 h-4 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 text-xs font-bold">?</span>
            </div>
          </div>
          <span className={`px-3 py-1 text-sm font-bold rounded-full ${
            analysis.overall_risk_level === 'danger' ? 'bg-red-100 text-red-800' :
            analysis.overall_risk_level === 'warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
          }`}>
            {analysis.confidence}%
          </span>
        </div>
        
        <div className={`text-center py-3 px-4 rounded-lg font-medium ${
          analysis.overall_risk_level === 'danger' ? 'bg-red-50 text-red-700 border border-red-200' :
          analysis.overall_risk_level === 'warning' ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' : 
          'bg-green-50 text-green-700 border border-green-200'
        }`}>
          <div className="text-lg">
            {analysis.overall_risk_level === 'danger' ? '🚨 HIGH MARKET RISK' :
             analysis.overall_risk_level === 'warning' ? '⚠️ MARKET CAUTION' : '🟢 HEALTHY MARKET'}
          </div>
          <div className="text-sm mt-1 opacity-90">
            Entire crypto market analysis
          </div>
        </div>
        
        <div className="mt-3 text-center text-xs text-gray-600">
          {analysis.overall_risk_level === 'danger' ? 'Reduce exposure' :
           analysis.overall_risk_level === 'warning' ? 'Monitor closely' : 'Good to invest gradually'}
        </div>
        
        <div className="mt-2 text-center text-xs text-purple-600">
          Global analysis • Click to learn more
        </div>
      </div>

      {/* Educational Global Peak Alert Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">🌍 Global Market Peak Alert</h3>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                {/* Current Market Status */}
                <div className={`p-4 rounded-lg border-2 ${
                  analysis.overall_risk_level === 'danger' ? 'bg-red-50 border-red-200' :
                  analysis.overall_risk_level === 'warning' ? 'bg-yellow-50 border-yellow-200' : 'bg-green-50 border-green-200'
                }`}>
                  <h4 className="font-semibold mb-2">🎯 Current Global Market Status</h4>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-medium">
                      {analysis.overall_risk_level === 'danger' ? '🚨 HIGH MARKET RISK DETECTED' :
                       analysis.overall_risk_level === 'warning' ? '⚠️ MARKET CAUTION ADVISED' : '🟢 HEALTHY MARKET CONDITIONS'}
                    </span>
                    <span className="font-bold">{analysis.confidence}% Confidence</span>
                  </div>
                  <p className="text-sm opacity-90">{analysis.message}</p>
                </div>

                {/* How Global Analysis Works */}
                <div>
                  <h4 className="font-semibold mb-3">🔍 How Global Market Analysis Works</h4>
                  <p className="text-gray-700 mb-4">
                    Unlike individual crypto analysis, our Global Peak Alert examines the <strong>entire cryptocurrency market</strong> 
                    to identify systemic risks that could affect all digital assets simultaneously.
                  </p>
                  
                  <div className="space-y-4">
                    {/* Market Structure Analysis */}
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h5 className="font-medium text-blue-800 mb-3">📊 Market Structure Analysis</h5>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <div className="font-medium text-blue-700">Market Cap Distribution</div>
                          <p className="text-blue-600">Concentration risk assessment</p>
                        </div>
                        <div>
                          <div className="font-medium text-blue-700">Volume Patterns</div>
                          <p className="text-blue-600">Trading activity spikes</p>
                        </div>
                        <div>
                          <div className="font-medium text-blue-700">Cross-Asset Correlation</div>
                          <p className="text-blue-600">Market-wide movements</p>
                        </div>
                        <div>
                          <div className="font-medium text-blue-700">Momentum Analysis</div>
                          <p className="text-blue-600">Overall trend direction</p>
                        </div>
                      </div>
                    </div>

                    {/* Bubble Indicators */}
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                      <h5 className="font-medium text-red-800 mb-3">🫧 Market Bubble Indicators</h5>
                      <div className="space-y-2 text-sm">
                        <div className={`flex justify-between p-2 rounded ${analysis.bubble_indicators.extreme_valuations ? 'bg-red-100' : 'bg-green-100'}`}>
                          <span>Extreme Valuations</span>
                          <span className={analysis.bubble_indicators.extreme_valuations ? 'text-red-700 font-medium' : 'text-green-700'}>
                            {analysis.bubble_indicators.extreme_valuations ? '⚠️ DETECTED' : '✅ HEALTHY'}
                          </span>
                        </div>
                        <div className={`flex justify-between p-2 rounded ${analysis.bubble_indicators.retail_fomo ? 'bg-red-100' : 'bg-green-100'}`}>
                          <span>Retail FOMO</span>
                          <span className={analysis.bubble_indicators.retail_fomo ? 'text-red-700 font-medium' : 'text-green-700'}>
                            {analysis.bubble_indicators.retail_fomo ? '⚠️ HIGH' : '✅ MODERATE'}
                          </span>
                        </div>
                        <div className={`flex justify-between p-2 rounded ${analysis.bubble_indicators.institutional_exits ? 'bg-red-100' : 'bg-green-100'}`}>
                          <span>Institutional Exits</span>
                          <span className={analysis.bubble_indicators.institutional_exits ? 'text-red-700 font-medium' : 'text-green-700'}>
                            {analysis.bubble_indicators.institutional_exits ? '⚠️ DETECTED' : '✅ STABLE'}
                          </span>
                        </div>
                        <div className={`flex justify-between p-2 rounded ${analysis.bubble_indicators.correlation_breakdown ? 'bg-red-100' : 'bg-green-100'}`}>
                          <span>Correlation Breakdown</span>
                          <span className={analysis.bubble_indicators.correlation_breakdown ? 'text-red-700 font-medium' : 'text-green-700'}>
                            {analysis.bubble_indicators.correlation_breakdown ? '⚠️ YES' : '✅ NORMAL'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Plan */}
                <div>
                  <h4 className="font-semibold mb-3">🎯 Global Market Action Plan</h4>
                  {analysis.overall_risk_level === 'danger' ? (
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                      <div className="font-medium text-red-800 mb-2">🚨 HIGH RISK - Market-Wide Defense Strategy:</div>
                      <ul className="text-red-700 space-y-1 text-sm">
                        <li>• <strong>Reduce overall crypto exposure</strong> - Take profits across all positions</li>
                        <li>• <strong>Avoid new investments</strong> - Wait for market correction</li>
                        <li>• <strong>Increase cash reserves</strong> - Prepare for buying opportunities</li>
                        <li>• <strong>Focus on blue chips only</strong> - BTC/ETH if you must stay in</li>
                        <li>• <strong>Set strict stop losses</strong> - Protect existing gains</li>
                      </ul>
                    </div>
                  ) : analysis.overall_risk_level === 'warning' ? (
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <div className="font-medium text-yellow-800 mb-2">⚠️ CAUTION - Selective Strategy:</div>
                      <ul className="text-yellow-700 space-y-1 text-sm">
                        <li>• <strong>Reduce position sizes</strong> - Smaller bets only</li>
                        <li>• <strong>Focus on quality projects</strong> - Avoid meme coins</li>
                        <li>• <strong>Monitor daily</strong> - Market can shift quickly</li>
                        <li>• <strong>Take partial profits</strong> - Secure some gains</li>
                        <li>• <strong>Avoid leverage</strong> - Too risky in current conditions</li>
                      </ul>
                    </div>
                  ) : (
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <div className="font-medium text-green-800 mb-2">🟢 HEALTHY MARKET - Growth Strategy:</div>
                      <ul className="text-green-700 space-y-1 text-sm">
                        <li>• <strong>Dollar-cost average</strong> - Gradual investment approach</li>
                        <li>• <strong>Diversify across sectors</strong> - DeFi, Layer 1s, etc.</li>
                        <li>• <strong>Focus on fundamentals</strong> - Strong projects with utility</li>
                        <li>• <strong>Build long-term positions</strong> - Good entry conditions</li>
                        <li>• <strong>Consider altcoins</strong> - Healthy risk appetite environment</li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* Global vs Individual Analysis */}
                <div>
                  <h4 className="font-semibold mb-3">🔄 Global vs Individual Analysis</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-medium text-purple-700 mb-2">🌍 Global Analysis (This Alert)</div>
                        <ul className="text-gray-600 space-y-1">
                          <li>• Entire crypto market assessment</li>
                          <li>• Systemic risk identification</li>
                          <li>• Market-wide bubble detection</li>
                          <li>• Portfolio-level guidance</li>
                        </ul>
                      </div>
                      <div>
                        <div className="font-medium text-blue-700 mb-2">🪙 Individual Analysis</div>
                        <ul className="text-gray-600 space-y-1">
                          <li>• Specific cryptocurrency focus</li>
                          <li>• Asset-specific indicators</li>
                          <li>• Relative strength analysis</li>
                          <li>• Individual position guidance</li>
                        </ul>
                      </div>
                    </div>
                    <div className="mt-3 p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                      <p className="text-sm text-blue-800">
                        <strong>Pro Tip:</strong> Use Global Analysis for overall market timing and risk management, 
                        then use Individual Analysis for specific crypto selection and entry/exit points.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="bg-gray-100 p-4 rounded-lg border">
                  <h4 className="font-semibold mb-2">⚠️ Important Disclaimer</h4>
                  <p className="text-sm text-gray-700">
                    Global Peak Alert analyzes market-wide conditions but cannot predict sudden news events, 
                    regulatory changes, or black swan events. Always maintain proper risk management and 
                    never invest more than you can afford to lose. This is educational content, not financial advice.
                  </p>
                </div>

                {/* Close Button */}
                <div className="text-center pt-4">
                  <button 
                    onClick={() => setShowModal(false)}
                    className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 font-medium"
                  >
                    Got it, thanks!
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 