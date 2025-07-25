'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { TrendingUp, TrendingDown, BarChart2, Activity, X, RefreshCw, DollarSign, Globe, Zap, Target, Brain } from 'lucide-react'
import TechnicalAnalysisCard from '../../components/TechnicalAnalysisCard'
import SimpleTradingSignals from '../../components/SimpleTradingSignals'
import AdvancedAnalysisCard from '../../components/AdvancedAnalysisCard'
import DominanceCard from '../../components/DominanceCard'
import CryptoSelector from '../../components/CryptoSelector'
import GlobalPeakAlertCard from '../../components/GlobalPeakAlertCard'
import ProfessionalCryptoChart from '../../components/ProfessionalCryptoChart'
import ReplicateAICard from '../../components/ReplicateAICard'

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
  global?: {
    total_market_cap_usd: number
    total_market_cap_change_24h: number
    total_volume_usd: number
  }
  error?: string
  timestamp: string
}

// New simplified navigation structure
type DashboardView = 'market' | 'charts' | 'signals' | 'ai'

// Tooltip komponent
interface TooltipProps {
  children: React.ReactNode
  tooltip: string
  className?: string
}

function Tooltip({ children, tooltip, className = '' }: TooltipProps) {
  return (
    <div className={`relative group ${className}`}>
      {children}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 w-64 text-center">
        {tooltip}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([])
  const [globalData, setGlobalData] = useState<{
    total_market_cap_usd: number
    total_market_cap_change_24h: number
    total_volume_usd: number
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<string>('')
  const [currentView, setCurrentView] = useState<DashboardView>('market')
  const [selectedCrypto, setSelectedCrypto] = useState<string>('bitcoin')

  const fetchCryptoData = async () => {
    try {
      setRefreshing(true)
      setError(null)
      
      const response = await fetch('/api/crypto')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result: ApiResponse = await response.json()
      
      if (result.success && result.data) {
        setCryptoData(result.data)
        if (result.global) {
          setGlobalData(result.global)
        }
        setLastUpdated(result.timestamp)
      } else {
        throw new Error(result.error || 'Failed to fetch data')
      }
      
      setLoading(false)
    } catch (err) {
      console.error('Error fetching crypto data:', err)
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
      setLoading(false)
    } finally {
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchCryptoData()
    
    // Scroll to top when dashboard loads - with slight delay to ensure page is rendered
    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
      // Fallback for older browsers
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }
    
    // Immediate scroll
    scrollToTop()
    
    // Also scroll after a short delay to handle any async rendering
    const timeoutId = setTimeout(scrollToTop, 100)
    
    return () => clearTimeout(timeoutId)
  }, [])

  const handleManualRefresh = () => {
    if (!refreshing) {
      fetchCryptoData()
      // Trigger refresh for child components
      window.dispatchEvent(new CustomEvent('manualRefresh'))
    }
  }

  const handleCryptoChange = (cryptoId: string) => {
    setSelectedCrypto(cryptoId)
    // Trigger refresh for analysis components with new crypto
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('cryptoChanged', { detail: { cryptoId } }))
    }, 100)
  }

  // New flat navigation structure - no nested tabs!
  const navigationItems = [
    { 
      id: 'market' as DashboardView, 
      label: 'Market Overview', 
      icon: Globe, 
      description: 'Global market data and trends',
      active: currentView === 'market' 
    },
    { 
      id: 'charts' as DashboardView, 
      label: 'Price Charts', 
      icon: BarChart2, 
      description: 'Technical analysis and indicators',
      active: currentView === 'charts' 
    },
    { 
      id: 'signals' as DashboardView, 
      label: 'Trading Signals', 
      icon: Zap, 
      description: 'Buy/sell signals and momentum',
      active: currentView === 'signals' 
    },
    { 
      id: 'ai' as DashboardView, 
      label: 'AI Assistant', 
      icon: Brain, 
      description: 'AI-powered analysis and insights',
      active: currentView === 'ai' 
    }
  ]

  // Get current page info for header
  const getCurrentPageInfo = () => {
    const current = navigationItems.find(item => item.id === currentView)
    return {
      title: current?.label || 'Dashboard',
      description: current?.description || 'Crypto analysis dashboard'
    }
  }

  const pageInfo = getCurrentPageInfo()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Content Area */}
      <main className="flex-1">
           {/* Page Header */}
           <div className="bg-white shadow-sm border-b border-gray-200">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
               <div className="flex items-center justify-between">
                 <div>
                   <h1 className="text-2xl font-bold text-gray-900">
                     {pageInfo.title}
                     {(currentView === 'charts' || currentView === 'signals' || currentView === 'ai') && cryptoData.length > 0 && (
                       <span className="ml-3 text-lg text-blue-600 hidden sm:inline">
                         - {cryptoData.find(c => c.id === selectedCrypto)?.name || 'Bitcoin'} ({cryptoData.find(c => c.id === selectedCrypto)?.symbol.toUpperCase() || 'BTC'})
                       </span>
                     )}
                   </h1>
                   <p className="text-sm text-gray-600 mt-1">
                     {pageInfo.description}
                   </p>
                 </div>
                 <button 
                   onClick={handleManualRefresh}
                   disabled={refreshing}
                   className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:bg-gray-300 flex items-center transition-colors"
                 >
                   <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                   {refreshing ? 'Refreshing...' : 'Refresh'}
                 </button>
               </div>
             </div>
           </div>

           {/* New Flat Dashboard Navigation */}
           <div className="bg-white border-b border-gray-200">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="flex space-x-8 overflow-x-auto">
                 {navigationItems.map((item) => (
                   <button
                     key={item.id}
                     onClick={() => setCurrentView(item.id)}
                     className={`inline-flex items-center px-1 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                       item.active
                         ? 'text-blue-600 border-b-2 border-blue-600'
                         : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent'
                     }`}
                   >
                     <item.icon className="h-4 w-4 mr-2" />
                     {item.label}
                   </button>
                 ))}
               </div>
             </div>
           </div>

           {/* Main Dashboard Content */}
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <X className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={handleManualRefresh}
                      className="text-sm bg-red-100 text-red-800 px-3 py-1 rounded-md hover:bg-red-200 transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentView === 'market' && (
            <div className="space-y-6">
              {/* Global Market Stats - Improved Design */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Global Market Data</h2>
                  <div className="text-sm text-gray-500">
                    {lastUpdated && `Updated ${new Date(lastUpdated).toLocaleTimeString()}`}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Total Market Cap */}
                  <Tooltip tooltip="The total value of all cryptocurrencies combined. Calculated by multiplying each coin's price by its circulating supply and summing everything together.">
                    <div className="p-4 rounded-lg bg-blue-50 border border-blue-100 cursor-help">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-blue-700 mb-1">Total Market Cap</p>
                          <p className="text-xl font-bold text-blue-900">
                            {globalData && (
                              `$${(globalData.total_market_cap_usd / 1e12).toFixed(2)}T`
                            )}
                          </p>
                        </div>
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <DollarSign className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                    </div>
                  </Tooltip>

                  {/* 24h Volume */}
                  <Tooltip tooltip="Total trading volume for all cryptocurrencies in the last 24 hours. Shows how much is actively being traded in the market - higher volume indicates more liquidity and activity.">
                    <div className="p-4 rounded-lg bg-gray-50 border border-gray-100 cursor-help">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600 mb-1">24h Volume</p>
                          <p className="text-xl font-bold text-gray-900">
                            {globalData && (
                              `$${(globalData.total_volume_usd / 1e9).toFixed(1)}B`
                            )}
                          </p>
                        </div>
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <Activity className="h-5 w-5 text-gray-600" />
                        </div>
                      </div>
                    </div>
                  </Tooltip>

                  {/* Market Trend */}
                  <Tooltip tooltip="Percentage change in total crypto market value over the last 24 hours. Uses the same calculation method as TradingView and CoinMarketCap - based on total market cap change, not average of individual coins.">
                    <div className={`p-4 rounded-lg border cursor-help ${
                      globalData && globalData.total_market_cap_change_24h >= 0 
                        ? 'bg-green-50 border-green-100' 
                        : 'bg-red-50 border-red-100'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`text-sm font-medium mb-1 ${
                            globalData && globalData.total_market_cap_change_24h >= 0 
                              ? 'text-green-700' 
                              : 'text-red-700'
                          }`}>Market Trend (24h)</p>
                          <p className={`text-xl font-bold ${
                            globalData && globalData.total_market_cap_change_24h >= 0 
                              ? 'text-green-900' 
                              : 'text-red-900'
                          }`}>
                            {globalData && `${globalData.total_market_cap_change_24h.toFixed(2)}%`}
                          </p>
                        </div>
                        <div className={`p-2 rounded-lg ${
                          globalData && globalData.total_market_cap_change_24h >= 0 
                            ? 'bg-green-100' 
                            : 'bg-red-100'
                        }`}>
                          {globalData && globalData.total_market_cap_change_24h >= 0 ? (
                            <TrendingUp className="h-5 w-5 text-green-600" />
                          ) : (
                            <TrendingDown className="h-5 w-5 text-red-600" />
                          )}
                        </div>
                      </div>
                    </div>
                  </Tooltip>
                </div>
              </div>

              {/* Top Cryptos Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Crypto List */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Cryptocurrencies</h2>
                  {loading ? (
                    <div className="animate-pulse space-y-3">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                          <div className="flex-1">
                            <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
                            <div className="h-3 bg-gray-300 rounded w-1/4"></div>
                          </div>
                          <div className="h-4 bg-gray-300 rounded w-20"></div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {cryptoData.slice(0, 5).map((crypto) => (
                        <div key={crypto.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                          <div className="flex items-center space-x-3">
                            <Image
                              src={crypto.image}
                              alt={crypto.name}
                              width={32}
                              height={32}
                              className="rounded-full"
                            />
                            <div>
                              <h3 className="font-medium text-gray-900">{crypto.name}</h3>
                              <p className="text-sm text-gray-500 uppercase">{crypto.symbol}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-gray-900">
                              ${crypto.current_price.toLocaleString()}
                            </div>
                            <div className={`text-sm font-medium ${
                              crypto.price_change_percentage_24h >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {crypto.price_change_percentage_24h >= 0 ? '+' : ''}
                              {crypto.price_change_percentage_24h.toFixed(2)}%
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Global Peak Alert */}
                <GlobalPeakAlertCard cryptoData={cryptoData} />
              </div>

              {/* Market Dominance */}
              <DominanceCard />
            </div>
          )}

          {currentView === 'charts' && (
            <div className="space-y-6">
              {/* Crypto Selector */}
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Cryptocurrency</h3>
                <CryptoSelector 
                  selectedCrypto={selectedCrypto}
                  onCryptoChange={handleCryptoChange}
                  cryptoData={cryptoData}
                />
              </div>

              {/* Professional Price Charts */}
              <div className="bg-white rounded-lg shadow-sm">
                <ProfessionalCryptoChart 
                  symbol={selectedCrypto}
                  timeframe="1d"
                  height={500}
                />
              </div>
            </div>
          )}

          {currentView === 'signals' && (
            <div className="space-y-6">
              {/* Crypto Selector */}
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Cryptocurrency</h3>
                <CryptoSelector 
                  selectedCrypto={selectedCrypto}
                  onCryptoChange={handleCryptoChange}
                  cryptoData={cryptoData}
                />
              </div>

              {/* Main Technical Analysis - Clean Focus */}
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Technical Analysis</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500 bg-blue-100 px-2 py-1 rounded">Price • Momentum • Direction • Risk</span>
                    <button className="text-xs text-blue-600 hover:text-blue-800" title="User-friendly technical indicators">
                      ℹ️
                    </button>
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-6">
                  📊 Easy-to-understand analysis for{' '}
                  <span className="font-medium">{cryptoData.find(c => c.id === selectedCrypto)?.name || 'Bitcoin'}</span>
                </div>
                <TechnicalAnalysisCard symbol={selectedCrypto} className="w-full" />
              </div>

              {/* Optional Advanced Features - Collapsed by Default */}
              <details className="bg-white rounded-lg shadow-sm border border-gray-200">
                <summary className="p-4 md:p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Show Advanced Analysis</h3>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Optional • For experienced traders</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Advanced indicators, market dominance, and professional analysis tools
                  </p>
                </summary>
                
                <div className="p-4 md:p-6 pt-0 border-t border-gray-100 grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Advanced Analysis */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">Advanced Analysis</h4>
                      <span className="text-xs text-gray-500 bg-purple-100 px-2 py-1 rounded">Phase 3</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      CTO Line, Bull Market Peak Detection, and M2 Liquidity analysis
                    </p>
                    <AdvancedAnalysisCard symbol={selectedCrypto} className="w-full" />
                  </div>

                  {/* Market Overview (moved from individual coin to market-wide) */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">Market Overview</h4>
                      <span className="text-xs text-gray-500 bg-green-100 px-2 py-1 rounded">Market-wide</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Overall crypto market dominance and trends
                    </p>
                    <DominanceCard />
                  </div>
                </div>
              </details>
            </div>
          )}


          {currentView === 'ai' && (
            <div className="space-y-6">
              {/* AI Assistant */}
              <ReplicateAICard 
                cryptoData={cryptoData.find(c => c.id === selectedCrypto) || cryptoData[0]} 
              />
              
              {/* Quick Access to Other Analysis */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Analysis</h3>
                  <p className="text-sm text-gray-700 mb-4">
                    Get quick technical signals for {cryptoData.find(c => c.id === selectedCrypto)?.name || 'Bitcoin'}.
                  </p>
                  <TechnicalAnalysisCard symbol={selectedCrypto} className="w-full" />
                </div>
                
                <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Dominance</h3>
                  <p className="text-sm text-gray-700 mb-4">
                    Understand overall market dynamics and trends.
                  </p>
                  <DominanceCard />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
} 