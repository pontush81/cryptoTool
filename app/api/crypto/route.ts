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

interface SearchCoin {
  id: string
  name: string
  symbol: string
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const symbol = searchParams.get('symbol')
    const timeframe = searchParams.get('timeframe')
    
    // If we have a search query, search for cryptos
    if (search) {
      const searchResponse = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(search)}`,
        { next: { revalidate: 300 } } // Cache search results for 5 minutes
      )
      
      if (!searchResponse.ok) {
        throw new Error(`CoinGecko Search API error: ${searchResponse.status}`)
      }
      
      const searchData = await searchResponse.json()
      
      // Get detailed info for found coins (limit to 20 results)
      const coinIds = searchData.coins.slice(0, 20).map((coin: SearchCoin) => coin.id).join(',')
      
      if (coinIds) {
        const detailsResponse = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds}&order=market_cap_desc&sparkline=false&locale=en`,
          { next: { revalidate: 300 } }
        )
        
        if (detailsResponse.ok) {
          const detailsData: CryptoData[] = await detailsResponse.json()
          return NextResponse.json({
            success: true,
            data: detailsData,
            search: true,
            timestamp: new Date().toISOString()
          })
        }
      }
      
      return NextResponse.json({
        success: true,
        data: [],
        search: true,
        timestamp: new Date().toISOString()
      })
    }

    // Original logic for regular data fetching
    // Hämta både individual coins OCH global market cap data
    const [coinsResponse, globalResponse] = await Promise.all([
      fetch(
        // Increase from 10 to 100 for initial load
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en',
        { next: { revalidate: 60 } }
      ),
      fetch(
        'https://api.coingecko.com/api/v3/global',
        { next: { revalidate: 60 } }
      )
    ])

    if (!coinsResponse.ok || !globalResponse.ok) {
      throw new Error(`CoinGecko API error: ${coinsResponse.status} / ${globalResponse.status}`)
    }

    const coinsData: CryptoData[] = await coinsResponse.json()
    const globalData = await globalResponse.json()

    return NextResponse.json({
      success: true,
      data: coinsData,
      global: {
        total_market_cap_usd: globalData.data.total_market_cap.usd,
        total_market_cap_change_24h: globalData.data.market_cap_change_percentage_24h_usd,
        total_volume_usd: globalData.data.total_volume.usd
      },
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
      global: {
        total_market_cap_usd: 2.45e12, // $2.45T fallback
        total_market_cap_change_24h: -1.85, // -1.85% fallback
        total_volume_usd: 89e9 // $89B fallback
      },
      error: 'Using fallback data due to API error',
      timestamp: new Date().toISOString()
    }, { status: 200 }) // Returnera 200 med mock data istället för error
  }
} 