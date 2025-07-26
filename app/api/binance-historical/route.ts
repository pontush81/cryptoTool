import { NextResponse } from 'next/server'

// Binance API has 1200 requests/minute - much better than CoinGecko's 30/min!
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const symbol = searchParams.get('symbol') || 'BTCUSDT'
    const timeframe = searchParams.get('timeframe') || '1d'
    const days = parseInt(searchParams.get('days') || '90')
    
    console.log(`📡 Binance API: Fetching ${days} days of ${timeframe} data for ${symbol}`)
    
    // Convert our symbols to Binance format
    const symbolMap: { [key: string]: string } = {
      'bitcoin': 'BTCUSDT',
      'ethereum': 'ETHUSDT', 
      'ripple': 'XRPUSDT',
      'cardano': 'ADAUSDT',
      'solana': 'SOLUSDT',
      'dogecoin': 'DOGEUSDT',
      'polkadot': 'DOTUSDT',
      'avalanche-2': 'AVAXUSDT',
      'chainlink': 'LINKUSDT',
      'polygon': 'MATICUSDT'
    }
    
    // Industry standard: timeframe button = candle interval (per Perplexity research)
    const intervalMap: { [key: string]: string } = {
      '1h': '1h',    // 1H timeframe = 1-hour candles
      '4h': '4h',    // 4H timeframe = 4-hour candles
      '1d': '1d',    // 1D timeframe = 1-day candles
      '3d': '3d',    // 3D timeframe = 3-day candles
      '1w': '1w',    // 1W timeframe = 1-week candles
      '1m': '1M',    // 1M timeframe = 1-month candles
      '3m': '1M'     // 3M timeframe = 1-month candles (3 months apart)
    }
    
    const binanceSymbol = symbolMap[symbol] || 'BTCUSDT'
    const binanceInterval = intervalMap[timeframe] || '1d'
    
    // Calculate how many candles we need (max 1000 per Binance limit)
    let candleCount
    switch (timeframe) {
      case '1h': candleCount = Math.min(days * 24, 1000); break      // 24 hourly candles per day
      case '4h': candleCount = Math.min(days * 6, 1000); break       // 6 4-hour candles per day  
      case '1d': candleCount = Math.min(days, 1000); break           // 1 daily candle per day
      case '3d': candleCount = Math.min(days / 3, 1000); break       // 1 3-day candle per 3 days
      case '1w': candleCount = Math.min(days / 7, 1000); break       // 1 weekly candle per 7 days
      case '1m': candleCount = Math.min(days / 30, 1000); break      // 1 monthly candle per 30 days
      case '3m': candleCount = Math.min(days / 30, 1000); break      // Monthly candles for 3M view
      default: candleCount = Math.min(days, 1000)
    }
    
    // Binance Klines API - completely free with 1200 requests/minute limit!
    const binanceUrl = `https://api.binance.com/api/v3/klines?symbol=${binanceSymbol}&interval=${binanceInterval}&limit=${candleCount}`
    
    console.log(`🎯 Binance URL: ${binanceUrl}`)
    
    const response = await fetch(binanceUrl, {
      headers: {
        'Accept': 'application/json',
      },
      signal: AbortSignal.timeout(10000)
    })
    
    if (!response.ok) {
      throw new Error(`Binance API error: ${response.status} ${response.statusText}`)
    }
    
    const klineData = await response.json()
    
    if (klineData && klineData.length > 0) {
      // Convert Binance kline format to our format
      // Binance kline: [timestamp, open, high, low, close, volume, close_time, ...]
      const prices: [number, number][] = klineData.map((kline: any[]) => [
        parseInt(kline[0]), // Open time timestamp
        parseFloat(kline[4]) // Close price
      ])
      
      console.log(`✅ Binance API: Got ${prices.length} real price points for ${binanceSymbol}`)
      
      return NextResponse.json({
        success: true,
        data: {
          prices: prices,
          volumes: klineData.map((kline: any[]) => [parseInt(kline[0]), parseFloat(kline[5])]),
          market_caps: [] // Binance doesn't provide market cap
        },
        symbol: binanceSymbol,
        originalSymbol: symbol,
        days,
        timeframe,
        interval: binanceInterval,
        source: 'Binance API (Free)',
        rateLimit: '1200 requests/minute',
        timestamp: new Date().toISOString()
      })
    } else {
      throw new Error('No kline data available from Binance')
    }
    
  } catch (error) {
    console.error('❌ Binance API error:', error)
    
    const { searchParams } = new URL(request.url)
    const symbol = searchParams.get('symbol') || 'bitcoin'
    const days = parseInt(searchParams.get('days') || '90')
    
    // Fallback to realistic mock data
    const mockPrices: [number, number][] = []
    const currentPrice = symbol === 'bitcoin' ? 117234 : symbol === 'ethereum' ? 3800 : 0.6
    let price = currentPrice * 0.9
    
    const symbolSeed = symbol.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    
    for (let i = 0; i < Math.min(days, 365); i++) {
      const timestamp = new Date()
      timestamp.setDate(timestamp.getDate() - (days - i))
      
      const seed = (symbolSeed * 9301 + i * 777) % 233280
      const random = (seed / 233280) % 1
      const changePercent = (random - 0.5) * 4 // ±2% daily change
      
      price = price * (1 + changePercent / 100)
      mockPrices.push([timestamp.getTime(), Math.max(price, 0.01)])
    }
    
    console.log(`🔄 Binance API: Using fallback data for ${symbol} (${mockPrices.length} points)`)
    
    return NextResponse.json({
      success: false,
      data: {
        prices: mockPrices,
        volumes: [],
        market_caps: []
      },
      symbol,
      days,
      error: 'Using fallback data due to Binance API error',
      source: 'Fallback Mock Data',
      timestamp: new Date().toISOString()
    }, { status: 200 })
  }
} 