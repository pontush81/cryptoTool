import { NextResponse } from 'next/server'

export interface DominanceData {
  bitcoin: number
  ethereum: number
  total_market_cap: number
  timestamp: string
}

export async function GET() {
  try {
    // Fetch global market data from CoinGecko
    const globalResponse = await fetch(
      'https://api.coingecko.com/api/v3/global',
      {
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    )

    if (!globalResponse.ok) {
      throw new Error(`CoinGecko Global API error: ${globalResponse.status}`)
    }

    const globalData = await globalResponse.json()
    const data = globalData.data

    const dominanceData: DominanceData = {
      bitcoin: data.market_cap_percentage.btc || 0,
      ethereum: data.market_cap_percentage.eth || 0, 
      total_market_cap: data.total_market_cap.usd || 0,
      timestamp: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      data: dominanceData,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error fetching dominance data:', error)
    
    // Fallback with mock data
    const mockData: DominanceData = {
      bitcoin: 52.3,
      ethereum: 18.7,
      total_market_cap: 1200000000000, // $1.2T
      timestamp: new Date().toISOString()
    }

    return NextResponse.json({
      success: false,
      data: mockData,
      error: 'Using fallback dominance data',
      timestamp: new Date().toISOString()
    }, { status: 200 })
  }
} 