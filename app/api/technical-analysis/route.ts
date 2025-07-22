import { NextResponse } from 'next/server'
import { generateTradingSignals, calculateRSI, calculateMACD, getLatestSignal, getSignalStats, type TradingSignal } from '../../../lib/indicators'

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
    
    // Fetch current price from our crypto API
    const cryptoResponse = await fetch(`${request.url.replace('/api/technical-analysis', '/api/crypto')}`)
    
    if (!cryptoResponse.ok) {
      throw new Error('Failed to fetch current crypto prices')
    }
    
    const cryptoData = await cryptoResponse.json()
    const coin = cryptoData.data.find((c: any) => c.id === symbol || c.symbol.toLowerCase() === symbol.toLowerCase())
    
    if (!coin) {
      throw new Error(`Coin ${symbol} not found`)
    }
    
    const currentPrice = coin.current_price
    
    // Generate historical price data (in production: fetch from real API)
    const historicalPrices = generateMockPriceData(currentPrice, 100)
    
    // Calculate technical indicators
    const rsiValues = calculateRSI(historicalPrices, 14)
    const macdData = calculateMACD(historicalPrices, 8, 21, 5)
    const tradingSignals = generateTradingSignals(historicalPrices)
    
    // Latest values
    const latestRSI = rsiValues[rsiValues.length - 1] || 50
    const latestMACD = macdData[macdData.length - 1]
    
    // Determine RSI signal
    let rsiSignal: 'oversold' | 'overbought' | 'neutral' = 'neutral'
    if (latestRSI <= 30) rsiSignal = 'oversold'
    else if (latestRSI >= 70) rsiSignal = 'overbought'
    
    const technicalData: TechnicalAnalysisData = {
      symbol: coin.symbol.toUpperCase(),
      current_price: currentPrice,
      rsi: {
        current: latestRSI,
        signal: rsiSignal,
        values: rsiValues.slice(-20) // Latest 20 values for chart
      },
      macd: {
        current: latestMACD ? {
          macd: latestMACD.macd,
          signal: latestMACD.signal,
          histogram: latestMACD.histogram
        } : { macd: 0, signal: 0, histogram: 0 },
        crossover: latestMACD?.crossover || 'none'
      },
      trading_signals: {
        latest: getLatestSignal(tradingSignals),
        recent: tradingSignals.slice(-10), // Latest 10 signals
        stats: getSignalStats(tradingSignals)
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
    
    // Fallback with mock data
    const mockData: TechnicalAnalysisData = {
      symbol: 'BTC',
      current_price: 43250,
      rsi: {
        current: 45.2,
        signal: 'neutral',
        values: [35, 38, 42, 45, 48, 45, 42, 39, 36, 33, 31, 35, 38, 41, 44, 47, 45, 43, 41, 45]
      },
      macd: {
        current: {
          macd: 125.5,
          signal: 98.2,
          histogram: 27.3
        },
        crossover: 'bullish'
      },
      trading_signals: {
        latest: {
          type: 'buy',
          strength: 75,
          reason: 'MACD bullish crossover + RSI recovery from oversold',
          timestamp: new Date().toISOString(),
          rsi: 45.2,
          macd: {
            macd: 125.5,
            signal: 98.2,
            histogram: 27.3,
            crossover: 'bullish',
            timestamp: new Date().toISOString()
          }
        },
        recent: [],
        stats: {
          total: 15,
          buy: 6,
          sell: 4,
          hold: 5,
          accuracy: '66.7'
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