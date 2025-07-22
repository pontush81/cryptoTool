import { NextResponse } from 'next/server'
import { calculateRSI, calculateMACD, calculateCTO, type RSIResult, type MACDResult, type CTOResult } from '../../../lib/indicators'
import type { CryptoData } from '../crypto/route'

interface TradingSignal {
  type: 'buy' | 'sell' | 'hold'
  price: number
  timestamp: string
  confidence: number
}

export interface TechnicalAnalysisData {
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
    latest: TradingSignal | null
    recent: TradingSignal[]
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

// Mock historical price data generator for demonstration
// In production this would be fetched from a real API like CoinGecko Pro or Alpha Vantage
function generateMockPriceData(currentPrice: number, periods: number = 50): number[] {
  const prices: number[] = []
  let price = currentPrice * 0.85 // Start 15% lower to create trend
  
  for (let i = 0; i < periods; i++) {
    // Simulate volatility with general upward trend
    const volatility = (Math.random() - 0.5) * 0.06 // ±3% volatility
    const trend = 0.002 // 0.2% upward per period
    
    price = price * (1 + trend + volatility)
    prices.push(price)
  }
  
  return prices
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const symbol = searchParams.get('symbol') || 'bitcoin'
    const timeframe = searchParams.get('timeframe') || '1d' // Default to daily
    
    // Log timeframe for debugging
    console.log(`🕒 Fetching ${symbol} technical analysis for ${timeframe} timeframe`)
    
    // Fetch current prices from crypto API
    const cryptoResponse = await fetch(`${request.url.replace('/api/technical-analysis', '/api/crypto')}`)
    
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
    
    // Try to fetch advanced analysis data for peak detection
    let peakDetection = {
      risk_level: 'safe' as 'safe' | 'warning' | 'danger',
      message: 'Market conditions appear stable',
      confidence: 70,
      is_peak_warning: false
    }
    
    try {
      const advancedResponse = await fetch(`${request.url.replace('/api/technical-analysis', '/api/advanced-analysis')}`)
      if (advancedResponse.ok) {
        const advancedData = await advancedResponse.json()
        const bullMarketPeak = advancedData.data?.phase3_analysis?.bullMarketPeak
        
        if (bullMarketPeak) {
          // Simplify advanced peak detection for pedagogical use
          if (bullMarketPeak.isPeak && bullMarketPeak.peakStrength > 70) {
            peakDetection = {
              risk_level: 'danger',
              message: 'HIGH RISK - Consider taking profits or avoiding new positions',
              confidence: Math.min(95, bullMarketPeak.peakStrength),
              is_peak_warning: true
            }
          } else if (bullMarketPeak.peakStrength > 40 || bullMarketPeak.riskLevel === 'high') {
            peakDetection = {
              risk_level: 'warning',
              message: 'CAUTION - Market showing signs of overheating',
              confidence: Math.min(85, bullMarketPeak.peakStrength + 10),
              is_peak_warning: false
            }
          } else {
            peakDetection = {
              risk_level: 'safe',
              message: 'GOOD CONDITIONS - Market appears healthy for investment',
              confidence: Math.max(60, 100 - bullMarketPeak.peakStrength),
              is_peak_warning: false
            }
          }
        }
      }
    } catch (error) {
      console.log('Advanced analysis unavailable, using default peak detection')
    }
    
    // Generate mock historical data for indicators with timeframe-specific characteristics
    const historicalPrices: number[] = []
    let price = currentPrice * 0.9 // Start 10% lower
    
    // Use a deterministic seed based on symbol AND timeframe to get different patterns
    const seedValue = symbol.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + timeframe.charCodeAt(0) * 1000
    const mockRandom = (index: number) => {
      const seed = (seedValue * 9301 + 49297) % 233280 + index * 1000
      return (seed / 233280) % 1
    }
    
    // Timeframe-specific volatility and noise levels
    const getTimeframeVolatility = (tf: string) => {
      switch (tf) {
        case '1h': return { volatility: 0.12, noise: 0.04 } // High volatility for hourly
        case '4h': return { volatility: 0.08, noise: 0.02 } // Medium volatility  
        case '1w': return { volatility: 0.04, noise: 0.005 } // Low volatility for weekly
        case '1d':
        default: return { volatility: 0.06, noise: 0.015 } // Standard for daily
      }
    }
    
    const { volatility, noise } = getTimeframeVolatility(timeframe)
    
    for (let i = 0; i < 100; i++) {
      const random1 = mockRandom(i * 3)
      const random2 = mockRandom(i * 3 + 1)
      const random3 = mockRandom(i * 3 + 2)
      
      // Simulate market cycles with timeframe-specific patterns
      const cyclePosition = (i / 100) * Math.PI * 4 // 2 full cycles
      const trendComponent = Math.sin(cyclePosition) * 0.3 + 0.2 // Base upward trend with cycles
      const volatilityComponent = (random1 - 0.5) * volatility // Timeframe-specific volatility
      const noiseComponent = (random2 - 0.5) * noise // Timeframe-specific noise
      
      price = price * (1 + trendComponent/50 + volatilityComponent + noiseComponent)
      historicalPrices.push(Math.max(price, 0.01)) // Ensure positive prices
    }
    
    // Timeframe-specific parameters for indicators
    const getTimeframeParams = (timeframe: string) => {
      switch (timeframe) {
        case '1h':
          return {
            rsiPeriod: 14,
            macdFast: 12,
            macdSlow: 26,
            macdSignal: 9,
            multiplier: 1.2, // More sensitive for shorter timeframes
            description: 'Hourly analysis - Fast signals'
          }
        case '4h':
          return {
            rsiPeriod: 14,
            macdFast: 12, 
            macdSlow: 26,
            macdSignal: 9,
            multiplier: 1.0, // Balanced
            description: '4-Hour analysis - Balanced view'
          }
        case '1w':
          return {
            rsiPeriod: 14,
            macdFast: 12,
            macdSlow: 26,
            macdSignal: 9,
            multiplier: 0.6, // Less sensitive for weekly analysis
            description: 'Weekly analysis - Long-term trends'
          }
        case '1d':
        default:
          return {
            rsiPeriod: 14,
            macdFast: 12,
            macdSlow: 26, 
            macdSignal: 9,
            multiplier: 0.8, // Less sensitive for longer timeframes
            description: 'Daily analysis - Strong trends'
          }
      }
    }
    
    const timeframeParams = getTimeframeParams(timeframe)
    console.log(`📊 Using ${timeframeParams.description}`)
    
    // Calculate technical indicators with timeframe-specific parameters
    const rsiData = calculateRSI(historicalPrices, timeframeParams.rsiPeriod)
    const macdData = calculateMACD(historicalPrices, timeframeParams.macdFast, timeframeParams.macdSlow, timeframeParams.macdSignal)
    const ctoData = calculateCTO(historicalPrices)
    
    // Get latest values
    const latestRSI = rsiData[rsiData.length - 1]
    const latestMACD = macdData[macdData.length - 1]
    const latestCTO = ctoData[ctoData.length - 1]
    
    if (!latestRSI || !latestMACD || !latestCTO) {
      throw new Error('Unable to calculate technical indicators')
    }
    
    // Apply timeframe-specific signal thresholds using multiplier
    const oversoldThreshold = 30 / timeframeParams.multiplier  // More sensitive for shorter timeframes
    const overboughtThreshold = 70 * timeframeParams.multiplier // Less sensitive for shorter timeframes
    
    // Determine RSI signal with timeframe-adjusted thresholds
    let rsiSignal: 'oversold' | 'overbought' | 'neutral' = 'neutral'
    if (latestRSI <= oversoldThreshold) rsiSignal = 'oversold'
    else if (latestRSI >= overboughtThreshold) rsiSignal = 'overbought'
    
    // Determine MACD crossover with timeframe-adjusted sensitivity
    const previousMACD = macdData[macdData.length - 2]
    let macdCrossover: 'bullish' | 'bearish' | 'none' = 'none'
    
    if (previousMACD) {
      const currentCross = latestMACD.macd > latestMACD.signal
      const previousCross = previousMACD.macd > previousMACD.signal
      
      // Apply timeframe multiplier to crossover sensitivity
      const crossoverStrength = Math.abs(latestMACD.macd - latestMACD.signal) * timeframeParams.multiplier
      const minimumCrossoverThreshold = 0.1 // Base threshold for considering a significant crossover
      
      if (currentCross && !previousCross && crossoverStrength > minimumCrossoverThreshold) {
        macdCrossover = 'bullish'
      } else if (!currentCross && previousCross && crossoverStrength > minimumCrossoverThreshold) {
        macdCrossover = 'bearish'
      }
    }
    
    // Generate mock trading signals with timeframe-adjusted confidence
    const baseConfidence = 70
    const timeframeConfidenceBonus = (2 - timeframeParams.multiplier) * 10 // Longer timeframes = higher confidence
    
    const mockSignals: TradingSignal[] = [
      {
        type: rsiSignal === 'oversold' ? 'buy' : rsiSignal === 'overbought' ? 'sell' : 'hold',
        price: currentPrice * (0.95 + mockRandom(200) * 0.1),
        timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        confidence: baseConfidence + timeframeConfidenceBonus + mockRandom(201) * 15
      },
      {
        type: macdCrossover === 'bullish' ? 'buy' : macdCrossover === 'bearish' ? 'sell' : 'hold',
        price: currentPrice * (0.98 + mockRandom(202) * 0.04),
        timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
        confidence: baseConfidence + timeframeConfidenceBonus + mockRandom(203) * 15
      }
    ]
    
    const technicalData: TechnicalAnalysisData = {
      symbol: coin.symbol.toUpperCase(),
      current_price: currentPrice,
      rsi: {
        current: latestRSI,
        signal: rsiSignal,
        values: rsiData.slice(-20)
      },
      macd: {
        current: {
          macd: latestMACD.macd,
          signal: latestMACD.signal,
          histogram: latestMACD.histogram
        },
        crossover: macdCrossover
      },
      cto: {
        current: {
          value: latestCTO.value,
          signal: latestCTO.signal
        },
        crossover: latestCTO.crossover
      },
      peak_detection: peakDetection,
      trading_signals: {
        latest: mockSignals[0],
        recent: mockSignals,
        stats: {
          total: 25,
          buy: 12,
          sell: 8,
          hold: 5,
          accuracy: '72%'
        }
      },
      timestamp: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      data: {
        ...technicalData,
        timeframe: timeframe,
        timeframe_description: timeframeParams.description
      },
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('Error calculating technical analysis:', error)
    
    // Fallback data
    const mockData: TechnicalAnalysisData = {
      symbol: 'BTC',
      current_price: 43250,
      rsi: {
        current: 38.9,
        signal: 'neutral',
        values: [42, 38, 35, 33, 38, 41, 39]
      },
      macd: {
        current: {
          macd: -125.45,
          signal: -98.32,
          histogram: -27.13
        },
        crossover: 'none'
      },
      cto: {
        current: {
          value: -10.24,
          signal: 'bearish'
        },
        crossover: 'none'
      },
      peak_detection: {
        risk_level: 'safe',
        message: 'GOOD CONDITIONS - Market appears healthy for investment',
        confidence: 75,
        is_peak_warning: false
      },
      trading_signals: {
        latest: {
          type: 'hold',
          price: 43100,
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          confidence: 68
        },
        recent: [],
        stats: {
          total: 25,
          buy: 12,
          sell: 8,
          hold: 5,
          accuracy: '72%'
        }
      },
      timestamp: new Date().toISOString()
    }

    return NextResponse.json({
      success: false,
      data: mockData,
      error: 'Using fallback technical analysis data',
      timestamp: new Date().toISOString()
    }, { status: 200 })
  }
} 