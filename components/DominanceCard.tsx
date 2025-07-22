'use client'

import { useEffect, useState } from 'react'
import { Bitcoin, TrendingUp, TrendingDown, Globe } from 'lucide-react'

interface DominanceData {
  bitcoin_dominance: number
  ethereum_dominance: number
  total_market_cap: number
  timestamp: string
}

export default function DominanceCard() {
  const [dominanceData, setDominanceData] = useState<DominanceData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDominanceData = async () => {
      try {
        const response = await fetch('/api/dominance')
        const result = await response.json()
        
        setDominanceData(result.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching dominance data:', error)
        setLoading(false)
      }
    }

    fetchDominanceData()
    
    // Update every 30 seconds
    const interval = setInterval(fetchDominanceData, 30000)
    return () => clearInterval(interval)
  }, [])

  const formatMarketCap = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      compactDisplay: 'short',
      maximumFractionDigits: 2
    }).format(value)
  }

  if (loading) {
    return (
      <div className="card">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!dominanceData) return null

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Globe className="h-5 w-5 text-blue-600 mr-2" />
          Market Dominance
        </h3>
        <span className="text-xs text-gray-500">
          {new Date(dominanceData.timestamp).toLocaleTimeString('en-US')}
        </span>
      </div>

      <div className="space-y-4">
        {/* Bitcoin Dominance */}
        <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <Bitcoin className="h-8 w-8 text-orange-600" />
            <div>
              <p className="font-medium text-gray-900">Bitcoin</p>
              <p className="text-sm text-gray-500">BTC Dominance</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-orange-600">
              {dominanceData.bitcoin_dominance.toFixed(1)}%
            </p>
            <div className="flex items-center text-sm text-gray-500">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>Market Leader</span>
            </div>
          </div>
        </div>

        {/* Ethereum Dominance */}
        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">Ξ</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">Ethereum</p>
              <p className="text-sm text-gray-500">ETH Dominance</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-blue-600">
              {dominanceData.ethereum_dominance.toFixed(1)}%
            </p>
            <div className="flex items-center text-sm text-gray-500">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>Smart Contracts</span>
            </div>
          </div>
        </div>

        {/* Total Market Cap */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
              <Globe className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Total Market</p>
              <p className="text-sm text-gray-500">Global Cap</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-gray-900">
              {formatMarketCap(dominanceData.total_market_cap)}
            </p>
            <div className="flex items-center text-sm text-gray-500">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>All Crypto</span>
            </div>
          </div>
        </div>

        {/* Altcoin Dominance */}
        <div className="pt-3 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Altcoin Dominance</span>
            <span className="text-sm font-medium text-gray-900">
              {(100 - dominanceData.bitcoin_dominance - dominanceData.ethereum_dominance).toFixed(1)}%
            </span>
          </div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300" 
              style={{ 
                width: `${100 - dominanceData.bitcoin_dominance - dominanceData.ethereum_dominance}%` 
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
} 