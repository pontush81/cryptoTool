import { NextResponse } from 'next/server'
import { calculateRSI, calculateMACD, calculateCTO, type RSIResult, type MACDResult, type CTOResult } from '../../../lib/indicators'

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
    
    // Fetch current prices from crypto API
    const cryptoResponse = await fetch(`${request.url.replace('/api/technical-analysis', '/api/crypto')}`)
    
    if (!cryptoResponse.ok) {
      throw new Error('Failed to fetch current crypto prices')
    }
    
    const cryptoData = await cryptoResponse.json()
    const coin = cryptoData.data.find((c: any) => 
      c.id === symbol || c.symbol.toLowerCase() === symbol.toLowerCase()
    )
    
    if (!coin) {
      throw new Error(`Coin ${symbol} not found`)
    }
    
    const currentPrice = coin.current_price
    
    // Try to fetch advanced analysis data for peak detection
    let peakDetection = {
      risk_level: 'safe' as const,
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
    
    // Generate mock historical data for indicators
    const historicalPrices: number[] = []
    let price = currentPrice * 0.9 // Start 10% lower
    
    // Use a deterministic seed based on symbol to prevent hydration mismatch
    const seedValue = symbol.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const mockRandom = (index: number) => {
      const seed = (seedValue * 9301 + 49297) % 233280 + index * 1000
      return (seed / 233280) % 1
    }
    
    for (let i = 0; i < 100; i++) {
      const random1 = mockRandom(i * 3)
      const random2 = mockRandom(i * 3 + 1)
      const random3 = mockRandom(i * 3 + 2)
      
      // Simulate market cycles with more realistic patterns
      const cyclePosition = (i / 100) * Math.PI * 4 // 2 full cycles
      const trendComponent = Math.sin(cyclePosition) * 0.3 + 0.2 // Base upward trend with cycles
      const volatility = (random1 - 0.5) * 0.08 // ±4% volatility
      const noiseComponent = (random2 - 0.5) * 0.02 // ±1% noise
      
      price = price * (1 + trendComponent/50 + volatility + noiseComponent)
      historicalPrices.push(Math.max(price, 0.01)) // Ensure positive prices
    }
    
    // Calculate technical indicators
    const rsiData = calculateRSI(historicalPrices, 14)
    const macdData = calculateMACD(historicalPrices)
    const ctoData = calculateCTO(historicalPrices)
    
    // Get latest values
    const latestRSI = rsiData[rsiData.length - 1]
    const latestMACD = macdData[macdData.length - 1]
    const latestCTO = ctoData[ctoData.length - 1]
    
    if (!latestRSI || !latestMACD || !latestCTO) {
      throw new Error('Unable to calculate technical indicators')
    }
    
    // Determine RSI signal
    let rsiSignal: 'oversold' | 'overbought' | 'neutral' = 'neutral'
    if (latestRSI.value <= 30) rsiSignal = 'oversold'
    else if (latestRSI.value >= 70) rsiSignal = 'overbought'
    
    // Determine MACD crossover
    const previousMACD = macdData[macdData.length - 2]
    let macdCrossover: 'bullish' | 'bearish' | 'none' = 'none'
    
    if (previousMACD) {
      const currentCross = latestMACD.macd > latestMACD.signal
      const previousCross = previousMACD.macd > previousMACD.signal
      
      if (currentCross && !previousCross) macdCrossover = 'bullish'
      else if (!currentCross && previousCross) macdCrossover = 'bearish'
    }
    
    // Generate mock trading signals with deterministic values
    const mockSignals: TradingSignal[] = [
      {
        type: rsiSignal === 'oversold' ? 'buy' : rsiSignal === 'overbought' ? 'sell' : 'hold',
        price: currentPrice * (0.95 + mockRandom(200) * 0.1),
        timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        confidence: 70 + mockRandom(201) * 25
      },
      {
        type: macdCrossover === 'bullish' ? 'buy' : macdCrossover === 'bearish' ? 'sell' : 'hold',
        price: currentPrice * (0.98 + mockRandom(202) * 0.04),
        timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
        confidence: 65 + mockRandom(203) * 30
      }
    ]
    
    const technicalData: TechnicalAnalysisData = {
      symbol: coin.symbol.toUpperCase(),
      current_price: currentPrice,
      rsi: {
        current: latestRSI.value,
        signal: rsiSignal,
        values: rsiData.slice(-20).map(r => r.value)
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
      data: technicalData,
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