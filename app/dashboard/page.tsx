'use client'

import { useEffect, useState } from 'react'
import { TrendingUp, TrendingDown, Bitcoin, DollarSign, Activity, Users } from 'lucide-react'
import Link from 'next/link'
import CryptoChart from '../../components/CryptoChart'
import DominanceCard from '../../components/DominanceCard'
import TechnicalAnalysisCard from '../../components/TechnicalAnalysisCard'

interface CryptoData {
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

interface ApiResponse {
  success: boolean
  data: CryptoData[]
  error?: string
  timestamp: string
}

export default function Dashboard() {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<string>('')

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch('/api/crypto')
        const result: ApiResponse = await response.json()
        
        setCryptoData(result.data)
        setLastUpdated(result.timestamp)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching crypto data:', error)
        setLoading(false)
      }
    }

    fetchCryptoData()
    
    // Update data every 30 seconds
    const interval = setInterval(fetchCryptoData, 30000)
    return () => clearInterval(interval)
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 8
    }).format(price)
  }

  const formatMarketCap = (marketCap: number) => {
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      compactDisplay: 'short'
    }).format(marketCap)
  }

  // Calculate portfolio stats based on crypto data
  const calculatePortfolioStats = () => {
    if (cryptoData.length === 0) return { totalValue: 0, changePercent: 0, positiveCount: 0 }
    
    const totalValue = cryptoData.reduce((acc, crypto) => acc + crypto.current_price, 0)
    const avgChangePercent = cryptoData.reduce((acc, crypto) => acc + crypto.price_change_percentage_24h, 0) / cryptoData.length
    const positiveCount = cryptoData.filter(crypto => crypto.price_change_percentage_24h > 0).length
    
    return { totalValue, changePercent: avgChangePercent, positiveCount }
  }

  const { totalValue, changePercent, positiveCount } = calculatePortfolioStats()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <TrendingUp className="h-8 w-8 text-blue-600" />
                <span className="ml-3 text-xl font-bold text-gray-900">Crypto Dashboard</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                {lastUpdated && `Updated: ${new Date(lastUpdated).toLocaleTimeString('en-US')}`}
              </span>
              <button className="btn-secondary">Settings</button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Advanced Crypto Dashboard</h1>
          <p className="mt-2 text-gray-600">RSI + MACD technical analysis with dominance tracking and trading signals</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Market Value</p>
                <p className="text-2xl font-semibold text-gray-900">
                  ${totalValue.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${changePercent >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                {changePercent >= 0 ? (
                  <TrendingUp className="h-6 w-6 text-green-600" />
                ) : (
                  <TrendingDown className="h-6 w-6 text-red-600" />
                )}
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Average Change</p>
                <p className={`text-2xl font-semibold ${changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {changePercent >= 0 ? '+' : ''}{changePercent.toFixed(2)}%
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Activity className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Positive Coins</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {positiveCount}/{cryptoData.length}
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Users className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Tracked Coins</p>
                <p className="text-2xl font-semibold text-gray-900">{cryptoData.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Crypto List - Takes up 2 columns */}
          <div className="xl:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Top Cryptocurrencies</h2>
                <button 
                  onClick={() => window.location.reload()} 
                  className="btn-secondary"
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Refresh'}
                </button>
              </div>
              
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse flex items-center space-x-4 p-4 bg-gray-100 rounded-lg">
                      <div className="rounded-full bg-gray-300 h-10 w-10"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {cryptoData.slice(0, 5).map((crypto) => (
                    <div key={crypto.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <img 
                            src={crypto.image} 
                            alt={crypto.name}
                            className="w-10 h-10 rounded-full"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none'
                              e.currentTarget.nextElementSibling?.classList.remove('hidden')
                            }}
                          />
                          <div className="hidden p-2 bg-orange-100 rounded-full w-10 h-10 flex items-center justify-center">
                            <Bitcoin className="h-6 w-6 text-orange-600" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{crypto.name}</h3>
                          <p className="text-sm text-gray-500">{crypto.symbol.toUpperCase()}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{formatPrice(crypto.current_price)}</p>
                        <div className="flex items-center space-x-1">
                          {crypto.price_change_percentage_24h >= 0 ? (
                            <TrendingUp className="h-4 w-4 text-green-500" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-500" />
                          )}
                          <span className={`text-sm font-medium ${
                            crypto.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'
                          }`}>
                            {crypto.price_change_percentage_24h.toFixed(2)}%
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-right text-sm text-gray-500">
                        <p>Market Cap</p>
                        <p>{formatMarketCap(crypto.market_cap)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar - Two columns of analytics */}
          <div className="xl:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Market Dominance Card */}
            <DominanceCard />

            {/* Technical Analysis Card */}
            <TechnicalAnalysisCard symbol="bitcoin" />

            {/* Real Chart - Spans both columns */}
            <div className="lg:col-span-2">
              {cryptoData.length > 0 && (
                <CryptoChart
                  symbol={cryptoData[0].symbol}
                  name={cryptoData[0].name}
                  height={300}
                />
              )}
            </div>

            {/* Market Summary - Spans both columns */}
            <div className="card lg:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Summary</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-sm text-gray-500">Global Market Cap</p>
                  <p className="font-semibold">
                    {cryptoData.length > 0 && formatMarketCap(
                      cryptoData.reduce((acc, crypto) => acc + crypto.market_cap, 0)
                    )}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">24h Volume</p>
                  <p className="font-semibold">
                    {cryptoData.length > 0 && formatMarketCap(
                      cryptoData.reduce((acc, crypto) => acc + crypto.total_volume, 0)
                    )}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">Avg Change</p>
                  <p className={`font-semibold ${changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {changePercent.toFixed(1)}%
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">Active Signals</p>
                  <p className="font-semibold text-blue-600">RSI + MACD</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="text-center text-xs text-gray-500">
                  <p className="mb-1">✅ <strong>Phase 2 Complete:</strong> RSI + MACD (8,21,5) with trading signals</p>
                  <p><strong>Next:</strong> CTO Line indicator + Bull Market Peak Detection</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 