import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const symbol = searchParams.get('symbol') || 'bitcoin'
    const days = searchParams.get('days') || '365'
    const interval = searchParams.get('interval') || 'daily'
    
    console.log(`📡 Historical API: Fetching ${days} days of ${interval} data for ${symbol}`)
    
    // CoinGecko API for historical market data (server-side, no CORS issues)
    // Limit days to prevent timeouts
    const maxDays = Math.min(parseInt(days), 365)
    const historyUrl = `https://api.coingecko.com/api/v3/coins/${symbol}/market_chart?vs_currency=usd&days=${maxDays}&interval=${interval}`
    const historyResponse = await fetch(historyUrl, {
      headers: {
        'Accept': 'application/json',
      },
      signal: AbortSignal.timeout(10000), // 10 second timeout
      next: { revalidate: 300 } // Cache for 5 minutes
    })
    
    if (!historyResponse.ok) {
      throw new Error(`CoinGecko API error: ${historyResponse.status}`)
    }
    
    const historyData = await historyResponse.json()
    
    if (historyData.prices && historyData.prices.length > 0) {
      console.log(`✅ Historical API: Got ${historyData.prices.length} price points for ${symbol}`)
      
      return NextResponse.json({
        success: true,
        data: {
          prices: historyData.prices,
          volumes: historyData.total_volumes || [],
          market_caps: historyData.market_caps || []
        },
        symbol,
        days: parseInt(days),
        interval,
        timestamp: new Date().toISOString()
      })
    } else {
      throw new Error('No historical price data available')
    }
    
  } catch (error) {
    console.error('❌ Historical API error:', error)
    
    const { searchParams } = new URL(request.url)
    const symbol = searchParams.get('symbol') || 'bitcoin'
    const days = parseInt(searchParams.get('days') || '365')
    
    // Generate fallback data based on symbol and days
    const mockPrices: [number, number][] = []
    const currentPrice = symbol === 'bitcoin' ? 117234 : symbol === 'ethereum' ? 3800 : 0.6
    let price = currentPrice * 0.8 // Start lower
    
    // Create symbol-specific seed for consistent patterns
    const symbolSeed = symbol.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    
    for (let i = 0; i < Math.min(days, 365); i++) {
      const timestamp = new Date()
      timestamp.setDate(timestamp.getDate() - (days - i))
      
      // Symbol-specific random pattern
      const seed = (symbolSeed * 9301 + i * 777) % 233280
      const random = (seed / 233280) % 1
      const changePercent = (random - 0.5) * 6 // ±3% daily change
      
      price = price * (1 + changePercent / 100)
      mockPrices.push([timestamp.getTime(), Math.max(price, 0.01)])
    }
    
    console.log(`🔄 Historical API: Using fallback data for ${symbol} (${mockPrices.length} points)`)
    
    return NextResponse.json({
      success: false,
      data: {
        prices: mockPrices,
        volumes: [],
        market_caps: []
      },
      symbol,
      days,
      interval: 'daily',
      error: 'Using fallback data due to API error',
      timestamp: new Date().toISOString()
    }, { status: 200 })
  }
} 