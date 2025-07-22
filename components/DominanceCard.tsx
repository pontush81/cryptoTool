'use client'

import { useEffect, useState } from 'react'
import { PieChart, TrendingUp } from 'lucide-react'

interface DominanceData {
  bitcoin: number
  ethereum: number
  others: number
  total_market_cap: number
  timestamp: string
}

interface DominanceCardProps {
  className?: string
}

export default function DominanceCard({ className = '' }: DominanceCardProps) {
  const [dominanceData, setDominanceData] = useState<DominanceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const fetchDominance = async () => {
    try {
      const response = await fetch('/api/dominance')
      if (!response.ok) {
        throw new Error('Failed to fetch dominance data')
      }
      const data = await response.json()
      setDominanceData(data.data)
    } catch (error) {
      console.error('Error fetching dominance data:', error)
      
      // Fallback data for development
      const fallback: DominanceData = {
        bitcoin: 58.2,
        ethereum: 18.3, 
        others: 23.5,
        total_market_cap: 2800000000000,
        timestamp: new Date().toISOString()
      }
      setDominanceData(fallback)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Initial load only - no automatic refresh
    fetchDominance()
  }, [])

  if (!mounted) {
    return null
  }

  if (loading) {
    return (
      <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!dominanceData) {
    return (
      <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
        <div className="text-center text-gray-500">
          No dominance data available
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <PieChart className="h-5 w-5 text-blue-600 mr-2" />
          Market Dominance
        </h3>
        <span className="text-xs text-gray-500">
          {dominanceData && new Date(dominanceData.timestamp).toLocaleTimeString('en-US')}
        </span>
      </div>

      <div className="space-y-4">
        {/* Bitcoin Dominance */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <TrendingUp className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Bitcoin</p>
              <p className="text-sm text-gray-500">BTC Dominance</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold text-lg text-gray-900">
              {dominanceData.bitcoin.toFixed(1)}%
            </p>
            <div className="flex items-center text-green-600">
              <span className="text-xs">+0.0%</span>
            </div>
          </div>
        </div>

        {/* Ethereum Dominance */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Ethereum</p>
              <p className="text-sm text-gray-500">ETH Dominance</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold text-lg text-gray-900">
              {dominanceData.ethereum.toFixed(1)}%
            </p>
            <div className="flex items-center text-green-600">
              <span className="text-xs">+0.0%</span>
            </div>
          </div>
        </div>

        {/* Others */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Others</p>
              <p className="text-sm text-gray-500">Rest of Market</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-lg text-gray-900">
                {(100 - dominanceData.bitcoin - dominanceData.ethereum).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        {/* Total Market Cap */}
        <div className="pt-3 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Total Market Cap</p>
              <p className="text-sm text-gray-500">Global crypto market</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-lg text-gray-900">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  notation: 'compact',
                  compactDisplay: 'short',
                  maximumFractionDigits: 2
                }).format(dominanceData.total_market_cap)}
              </p>
              <div className="flex items-center text-red-600">
                <span className="text-xs">-5.8%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 