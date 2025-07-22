import { NextResponse } from 'next/server'

export interface DominanceData {
  bitcoin_dominance: number
  ethereum_dominance: number
  total_market_cap_usd: number
  market_cap_change_24h: number
  dominance_change_24h: {
    bitcoin: number
    ethereum: number
  }
  timestamp: string
}

export async function GET() {
  try {
    // Hämtar global marknadsdata från CoinGecko
    const globalResponse = await fetch(
      'https://api.coingecko.com/api/v3/global',
      {
        next: { revalidate: 300 }, // Cache i 5 minuter
      }
    )

    if (!globalResponse.ok) {
      throw new Error(`CoinGecko Global API error: ${globalResponse.status}`)
    }

    const globalData = await globalResponse.json()
    const data = globalData.data

    const dominanceData: DominanceData = {
      bitcoin_dominance: data.market_cap_percentage.btc || 0,
      ethereum_dominance: data.market_cap_percentage.eth || 0, 
      total_market_cap_usd: data.total_market_cap.usd || 0,
      market_cap_change_24h: data.market_cap_change_percentage_24h_usd || 0,
      dominance_change_24h: {
        // Beräkna dominans-förändring (förenkla för nu, kan förbättras med historisk data)
        bitcoin: 0, // TODO: Beräkna från historisk data
        ethereum: 0 // TODO: Beräkna från historisk data  
      },
      timestamp: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      data: dominanceData,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error fetching dominance data:', error)
    
    // Fallback med mock data
    const mockData: DominanceData = {
      bitcoin_dominance: 52.3,
      ethereum_dominance: 18.7,
      total_market_cap_usd: 1200000000000, // $1.2T
      market_cap_change_24h: 2.4,
      dominance_change_24h: {
        bitcoin: 0.3,
        ethereum: -0.1
      },
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