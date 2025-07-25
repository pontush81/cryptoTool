import { NextResponse } from 'next/server'
import { apiThrottle } from '../../../lib/api-throttle'

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
    
    // CoinGecko auto-provides hourly data for 2-90 days, daily for longer periods
    // hourly interval is Enterprise-only but auto-provided based on days parameter
    let apiUrl = `https://api.coingecko.com/api/v3/coins/${symbol}/market_chart?vs_currency=usd&days=${maxDays}`
    
    // Only add interval for daily data (longer periods)
    if (interval === 'daily' && maxDays > 90) {
      apiUrl += `&interval=daily`
    }
    // For hourly (2-90 days): CoinGecko auto-provides hourly data, don't specify interval
    
    const historyUrl = apiUrl
    
    // Use professional API throttling to prevent rate limits
    const historyData = await apiThrottle.request(historyUrl)
    
    if (historyData.prices && historyData.prices.length > 0) {
      console.log(`✅ Historical API: Got ${historyData.prices.length} real price points for ${symbol}`)
      
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
      throw new Error('No historical price data available from CoinGecko')
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
    
    console.log(`🔄 Historical API: Using realistic fallback data for ${symbol} (${mockPrices.length} points)`)
    
    return NextResponse.json({
      success: false,
      data: {
        prices: mockPrices,
        volumes: [],
        market_caps: []
      },
      symbol,
      days,
      interval: interval === 'auto' ? 'daily' : interval,
      error: 'Using realistic fallback data due to CoinGecko API rate limit or error',
      timestamp: new Date().toISOString(),
      throttleStats: apiThrottle.getCacheStats()
    }, { status: 200 })
  }
} 