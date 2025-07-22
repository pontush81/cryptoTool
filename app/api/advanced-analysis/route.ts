import { NextResponse } from 'next/server'
import { 
  generatePhase3Analysis, 
  calculateTrendIndicator,
  detectBullMarketPeaks,
  calculateM2LiquidityCorrelation,
  type Phase3Analysis,
  type TrendIndicatorResult,
  type BullMarketPeakResult,
  type M2LiquidityResult
} from '../../../lib/advanced-indicators'
import type { CryptoData } from '../crypto/route'

export interface AdvancedAnalysisData {
  symbol: string
  current_price: number
  phase3_analysis: Phase3Analysis
  trend_indicator: {
    current: TrendIndicatorResult | null
    recent: TrendIndicatorResult[]
    signal_strength: number
  }
  bull_market_peak: {
    current: BullMarketPeakResult | null
    risk_level: string
    warning_active: boolean
  }
  m2_liquidity: {
    current: M2LiquidityResult | null
    correlation_strength: number
    liquidity_trend: string
  }
  market_regime: {
    phase: 'accumulation' | 'markup' | 'distribution' | 'markdown'
    confidence: number
  }
  timestamp: string
}

// Generate mock price and volume data for analysis
function generateAdvancedMockData(currentPrice: number, symbol: string, periods: number = 200) {
  const prices: number[] = []
  const volumes: number[] = []
  
  // Use a deterministic seed based on symbol to prevent hydration mismatch
  const seedValue = symbol.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const mockRandom = (index: number) => {
    const seed = (seedValue * 9301 + 49297) % 233280 + index * 1000
    return (seed / 233280) % 1
  }
  
  let price = currentPrice * 0.7 // Start lower for trend development
  const baseVolume = 50000000 // Base volume
  
  for (let i = 0; i < periods; i++) {
    const random1 = mockRandom(i * 4)
    const random2 = mockRandom(i * 4 + 1)
    const random3 = mockRandom(i * 4 + 2)
    const random4 = mockRandom(i * 4 + 3)
    
    // Simulate market cycles with more realistic patterns
    const cyclePosition = (i / periods) * 4 * Math.PI // 2 full cycles
    const trendComponent = Math.sin(cyclePosition) * 0.3 + 0.2 // Base upward trend with cycles
    const volatility = (random1 - 0.5) * 0.08 // ±4% volatility
    const noiseComponent = (random2 - 0.5) * 0.02 // ±1% noise
    
    price = price * (1 + trendComponent/50 + volatility + noiseComponent)
    
    // Volume tends to increase during price movements
    const volumeMultiplier = 1 + Math.abs(volatility) * 5 + random3 * 2
    const volume = baseVolume * volumeMultiplier
    
    prices.push(Math.max(price, 0.01)) // Ensure positive prices
    volumes.push(Math.max(volume, 1000)) // Ensure positive volumes
  }
  
  return { prices, volumes }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const symbol = searchParams.get('symbol') || 'bitcoin'
    
    // Mock data generation for different market conditions
    const generateMarketData = () => {
      // Base market conditions with realistic data
      const basePrices = [
        119023,   // Current
        119180,
        118900,
        119250,
        118800
      ]
      
      const baseVolume = 45234567890 // Market volume in USD
      
      // Generate mock indicators with realistic ranges
      const random1 = Math.random()
      const random2 = Math.random() 
      const random3 = Math.random()
      
      return {
        prices: basePrices,
        volume: baseVolume,
        rsi: 45 + (random1 * 20), // RSI between 45-65
        macd: -150 + (random2 * 300), // MACD between -150 and +150
        stoch: 30 + (random3 * 40), // Stochastic between 30-70
      }
    }

    const { prices, volume, rsi, macd, stoch } = generateMarketData()
    
    // Fetch current prices from crypto API
    const cryptoResponse = await fetch(`${request.url.replace('/api/advanced-analysis', '/api/crypto')}`)
    
    if (!cryptoResponse.ok) {
      throw new Error('Failed to fetch current crypto prices')  
    }
    
    const cryptoData = await cryptoResponse.json()
    const coin = cryptoData.data.find((c: CryptoData) => 
      c.id === symbol || c.symbol.toLowerCase() === symbol.toLowerCase()
    )
    
    if (!coin) {
      throw new Error(`Coin ${symbol} not found`)
    }
    
    const currentPrice = coin.current_price
    
    // Generate advanced mock data for analysis
    const { prices: mockPrices, volumes: mockVolumes } = generateAdvancedMockData(currentPrice, symbol, 200)
    
    // Calculate advanced indicators
    const phase3Analysis = generatePhase3Analysis(mockPrices, mockVolumes)
    const trendSignals = calculateTrendIndicator(mockPrices, 15)
    const peakSignals = detectBullMarketPeaks(mockPrices, mockVolumes, 30)
    const m2Signals = calculateM2LiquidityCorrelation(mockPrices)
    
    // Market regime detection (simplified)
    const recentPrices = mockPrices.slice(-50)
    const priceMA = recentPrices.reduce((a, b) => a + b, 0) / recentPrices.length
    const priceVolatility = Math.sqrt(
      recentPrices.reduce((sum, price) => sum + Math.pow(price - priceMA, 2), 0) / recentPrices.length
    ) / priceMA
    
    let marketPhase: 'accumulation' | 'markup' | 'distribution' | 'markdown' = 'accumulation'
    let confidence = 50
    
    if (phase3Analysis.overallSignal === 'strong_bullish' && priceVolatility < 0.1) {
      marketPhase = 'markup'
      confidence = 80
    } else if (phase3Analysis.bullMarketPeak?.isPeak && priceVolatility > 0.15) {
      marketPhase = 'distribution'  
      confidence = 85
    } else if (phase3Analysis.overallSignal === 'strong_bearish') {
      marketPhase = 'markdown'
      confidence = 75
    }
    
    const advancedData: AdvancedAnalysisData = {
      symbol: coin.symbol.toUpperCase(),
      current_price: currentPrice,
      phase3_analysis: phase3Analysis,
      trend_indicator: {
        current: phase3Analysis.trendIndicator,
        recent: trendSignals.slice(-10),
        signal_strength: phase3Analysis.trendIndicator?.strength || 0
      },
      bull_market_peak: {
        current: phase3Analysis.bullMarketPeak,
        risk_level: phase3Analysis.riskAssessment,
        warning_active: phase3Analysis.bullMarketPeak?.isPeak || false
      },
      m2_liquidity: {
        current: phase3Analysis.m2Liquidity,
        correlation_strength: Math.abs(phase3Analysis.m2Liquidity?.correlation || 0),
        liquidity_trend: phase3Analysis.m2Liquidity?.liquiditySignal || 'neutral'
      },
      market_regime: {
        phase: marketPhase,
        confidence
      },
      timestamp: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      data: advancedData,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('Error calculating advanced analysis:', error)
    
    // Fallback with mock data
    const mockData: AdvancedAnalysisData = {
      symbol: 'BTC',
      current_price: 43250,
      phase3_analysis: {
        trendIndicator: {
          v1: 43180,
          m1: 43050,
          m2: 42900,
          v2: 43200,
          signal: 'bullish',
          color: '#FF8C00',
          strength: 65,
          timestamp: new Date().toISOString()
        },
        bullMarketPeak: {
          isPeak: false,
          peakStrength: 35,
          riskLevel: 'medium',
          indicators: {
            priceDeviation: 12.5,
            volumeSpike: 45,
            rsiOverheated: false,
            fearGreedIndex: 72,
            piCycleTop: 0.8,
            puellMultiple: 1.2,
            mvrvZScore: 2.1,
            nvtGoldenCross: 0.9,
            reserveRisk: 0.003,
            whaleActivity: 0.15,
            networkGrowth: 1.8,
            stockToFlow: 58,
            onChainVolume: 1.5,
            liquidityRatio: 0.85
          },
          individualSignals: {
            piCycle: 'safe',
            puell: 'safe', 
            mvrv: 'warning',
            nvt: 'safe',
            reserve: 'safe',
            whales: 'safe',
            network: 'safe',
            stockFlow: 'safe',
            volume: 'safe',
            liquidity: 'safe'
          },
          timestamp: new Date().toISOString()
        },
        m2Liquidity: {
          m2Value: 21500000000000,
          correlation: 0.67,
          lagDays: 90,
          liquiditySignal: 'expanding',
          impactOnCrypto: 'positive',
          timestamp: new Date().toISOString()
        },
        overallSignal: 'bullish',
        riskAssessment: 'medium',
        timestamp: new Date().toISOString()
      },
      trend_indicator: {
        current: {
          v1: 43180,
          m1: 43050,
          m2: 42900,
          v2: 43200,
          signal: 'bullish',
          color: '#FF8C00',
          strength: 65,
          timestamp: new Date().toISOString()
        },
        recent: [],
        signal_strength: 65
      },
      bull_market_peak: {
        current: {
          isPeak: false,
          peakStrength: 35,
          riskLevel: 'medium',
          indicators: {
            priceDeviation: 12.5,
            volumeSpike: 45,
            rsiOverheated: false,
            fearGreedIndex: 72,
            piCycleTop: 0.8,
            puellMultiple: 1.2,
            mvrvZScore: 2.1,
            nvtGoldenCross: 0.9,
            reserveRisk: 0.003,
            whaleActivity: 0.15,
            networkGrowth: 1.8,
            stockToFlow: 58,
            onChainVolume: 1.5,
            liquidityRatio: 0.85
          },
          individualSignals: {
            piCycle: 'safe',
            puell: 'safe', 
            mvrv: 'warning',
            nvt: 'safe',
            reserve: 'safe',
            whales: 'safe',
            network: 'safe',
            stockFlow: 'safe',
            volume: 'safe',
            liquidity: 'safe'
          },
          timestamp: new Date().toISOString()
        },
        risk_level: 'medium',
        warning_active: false
      },
      m2_liquidity: {
        current: {
          m2Value: 21500000000000,
          correlation: 0.67,
          lagDays: 90,
          liquiditySignal: 'expanding',
          impactOnCrypto: 'positive',
          timestamp: new Date().toISOString()
        },
        correlation_strength: 0.67,
        liquidity_trend: 'expanding'
      },
      market_regime: {
        phase: 'markup',
        confidence: 78
      },
      timestamp: new Date().toISOString()
    }

    return NextResponse.json({
      success: false,
      data: mockData,
      error: 'Using fallback advanced analysis data',
      timestamp: new Date().toISOString()
    }, { status: 200 })
  }
} 