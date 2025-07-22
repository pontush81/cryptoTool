import { NextResponse } from 'next/server'

export interface CryptoData {
  id: string
  name: string
  symbol: string
  current_price: number
  price_change_24h: number
  price_change_percentage_24h: number
  market_cap: number
  total_volume: number
  image: string
}

export async function GET() {
  try {
    // Använder CoinGecko's fria API
    const response = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&locale=en',
      {
        next: { revalidate: 60 }, // Cache i 60 sekunder
      }
    )

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`)
    }

    const data: CryptoData[] = await response.json()

    return NextResponse.json({
      success: true,
      data,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error fetching crypto data:', error)
    
    // Fallback med mock data om API:et inte fungerar
    const mockData: CryptoData[] = [
      {
        id: 'bitcoin',
        name: 'Bitcoin',
        symbol: 'btc',
        current_price: 43250.00,
        price_change_24h: 1250.30,
        price_change_percentage_24h: 2.98,
        market_cap: 847000000000,
        total_volume: 23400000000,
        image: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png'
      },
      {
        id: 'ethereum', 
        name: 'Ethereum',
        symbol: 'eth',
        current_price: 2650.75,
        price_change_24h: -45.20,
        price_change_percentage_24h: -1.68,
        market_cap: 318000000000,
        total_volume: 12100000000,
        image: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png'
      },
      {
        id: 'cardano',
        name: 'Cardano',
        symbol: 'ada',
        current_price: 0.485,
        price_change_24h: 0.023,
        price_change_percentage_24h: 4.97,
        market_cap: 17200000000,
        total_volume: 560000000,
        image: 'https://assets.coingecko.com/coins/images/975/small/cardano.png'
      }
    ]

    return NextResponse.json({
      success: false,
      data: mockData,
      error: 'Using fallback data due to API error',
      timestamp: new Date().toISOString()
    }, { status: 200 }) // Returnera 200 med mock data istället för error
  }
} 