'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { TrendingUp, TrendingDown, BarChart2, Globe, Activity, Zap, X, Menu, RefreshCw, DollarSign, Home } from 'lucide-react'
import TechnicalAnalysisCard from '../../components/TechnicalAnalysisCard'
import AdvancedAnalysisCard from '../../components/AdvancedAnalysisCard'
import DominanceCard from '../../components/DominanceCard'
import CryptoSelector from '../../components/CryptoSelector'
import GlobalPeakAlertCard from '../../components/GlobalPeakAlertCard'
import M2LiquidityCard from '../../components/M2LiquidityCard'

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

type ViewMode = 'overview' | 'analysis'
type AnalysisMode = 'technical' | 'advanced'

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
  const [currentView, setCurrentView] = useState<ViewMode>('overview')
  const [analysisMode, setAnalysisMode] = useState<AnalysisMode>('technical')
  const [selectedCrypto, setSelectedCrypto] = useState<string>('bitcoin')
  const [sidebarOpen, setSidebarOpen] = useState(true)

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

  const navigationItems = [
    { id: 'overview' as ViewMode, label: 'Market Overview', icon: BarChart2, active: currentView === 'overview' },
    { id: 'analysis' as ViewMode, label: 'Analysis', icon: Activity, active: currentView === 'analysis' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex relative">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar Navigation */}
      <div className={`${
        sidebarOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full md:w-16 md:translate-x-0'
      } fixed md:relative z-50 md:z-auto transition-all duration-300 bg-white shadow-lg border-r border-gray-200 flex flex-col h-full md:h-auto min-h-screen`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className={`flex items-center ${sidebarOpen ? '' : 'justify-center'}`}>
              <TrendingUp className="h-8 w-8 text-blue-600" />
              {sidebarOpen && (
                <span className="ml-3 text-xl font-bold text-gray-900">CryptoTool</span>
              )}
            </div>
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>



        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {/* Home Link */}
            <Link
              href="/"
              className="w-full flex items-center justify-between p-3 rounded-lg transition-colors text-gray-600 hover:bg-gray-50 group"
            >
              <div className="flex items-center">
                <Home className="h-5 w-5" />
                {sidebarOpen && (
                  <span className="ml-3 font-medium">Home</span>
                )}
              </div>
            </Link>
            
            {/* Separator */}
            {sidebarOpen && <div className="border-t border-gray-200 my-3"></div>}
            
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                  item.active 
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <item.icon className="h-5 w-5" />
                  {sidebarOpen && (
                    <span className="ml-3 font-medium">{item.label}</span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Analysis Sub-navigation */}
          {sidebarOpen && currentView === 'analysis' && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="space-y-1">
                <button
                  onClick={() => setAnalysisMode('technical')}
                  className={`w-full flex items-start p-2 rounded-lg text-sm transition-colors ${
                    analysisMode === 'technical'
                      ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-500'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}>
                  <Activity className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  <div className="text-left">
                    <p className="font-medium">Technical Analysis</p>
                  </div>
                </button>
                <button
                  onClick={() => setAnalysisMode('advanced')}
                  className={`w-full flex items-start p-2 rounded-lg text-sm transition-colors ${
                    analysisMode === 'advanced'
                      ? 'bg-purple-50 text-purple-700 border-l-2 border-purple-500'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <BarChart2 className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  <div className="text-left">
                    <p className="font-medium">Advanced Analysis</p>
                    <p className="text-xs text-gray-500 mt-0.5">Professional signals</p>
                  </div>
                </button>
              </div>
            </div>
          )}
        </nav>

        {/* Footer - Simplified */}
        {sidebarOpen && lastUpdated && (
          <div className="p-4 border-t border-gray-200">
            <div className="text-xs text-gray-500 text-center">
              Last updated: {new Date(lastUpdated).toLocaleTimeString()}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            
            <div className="flex-1 md:flex-none">
              <h1 className="text-lg md:text-2xl font-bold text-gray-900 flex items-center truncate">
                {currentView === 'overview' && 'Market Overview'}
                {currentView === 'analysis' && 'Analysis'}
                {currentView === 'analysis' && cryptoData.length > 0 && (
                  <span className="ml-2 md:ml-3 text-sm md:text-lg text-blue-600 hidden sm:inline">
                    - {cryptoData.find(c => c.id === selectedCrypto)?.name || 'Bitcoin'} ({cryptoData.find(c => c.id === selectedCrypto)?.symbol.toUpperCase() || 'BTC'})
                  </span>
                )}
              </h1>
              <p className="text-xs md:text-sm text-gray-600 mt-1 hidden sm:block">
                {currentView === 'overview' && 'Real-time crypto market dashboard with key metrics and trends'}
                {currentView === 'analysis' && analysisMode === 'technical' && 'Multi-timeframe technical analysis with professional trading signals'}
                {currentView === 'analysis' && analysisMode === 'advanced' && 'Professional analysis with Phase 3 indicators and market context'}
              </p>
            </div>
            <button 
              onClick={handleManualRefresh}
              disabled={refreshing}
              className="px-3 md:px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:bg-gray-300 flex items-center transition-colors text-sm md:text-base"
            >
              <RefreshCw className={`h-4 w-4 mr-1 md:mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{refreshing ? 'Refreshing...' : 'Refresh'}</span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
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

          {currentView === 'overview' && (
            <div className="space-y-6">
              {/* Global Market Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {/* Total Market Cap - Uses Global Data */}
                <Tooltip tooltip="Det totala värdet av alla kryptovalutor kombinerat. Beräknas genom att multiplicera varje coins pris med dess cirkulerande tillgång och summera allt.">
                  <div className="bg-white p-3 md:p-4 rounded-lg shadow-sm border cursor-help">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <DollarSign className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-xs md:text-sm font-medium text-gray-500">Total Market Cap</p>
                        <p className="text-lg md:text-xl font-bold text-gray-900">
                          {globalData && (
                            `$${(globalData.total_market_cap_usd / 1e12).toFixed(2)}T`
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </Tooltip>

                {/* 24h Volume - Uses Global Data */}
                <Tooltip tooltip="Total handelsvolym för alla kryptovalutor under senaste 24 timmarna. Visar hur mycket som handlas aktivt på marknaden - högre volym indikerar mer likviditet och aktivitet.">
                  <div className="bg-white p-3 md:p-4 rounded-lg shadow-sm border cursor-help">
                    <div className="flex items-center">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Activity className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-xs md:text-sm font-medium text-gray-500">24h Volume</p>
                        <p className="text-lg md:text-xl font-bold text-gray-900">
                          {globalData && (
                            `$${(globalData.total_volume_usd / 1e9).toFixed(1)}B`
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </Tooltip>

                {/* Market Trend - Uses Global Market Cap Change */}
                <Tooltip tooltip="Procentuell förändring av den totala kryptomarknadens värde under senaste 24 timmarna. Använder samma beräkningsmetod som TradingView och CoinMarketCap - baserat på total market cap förändring, inte genomsnitt av individuella coins.">
                  <div className="bg-white p-3 md:p-4 rounded-lg shadow-sm border cursor-help">
                    <div className="flex items-center">
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
                      <div className="ml-3">
                        <p className="text-xs md:text-sm font-medium text-gray-500">Market Trend (24h)</p>
                        <p className={`text-lg md:text-xl font-bold ${
                          globalData && globalData.total_market_cap_change_24h >= 0 
                            ? 'text-green-600' 
                            : 'text-red-600'
                        }`}>
                          {globalData && (
                            `${globalData.total_market_cap_change_24h >= 0 ? '+' : ''}${globalData.total_market_cap_change_24h.toFixed(2)}%`
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </Tooltip>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
                {/* Main Content - 2 columns */}
                <div className="xl:col-span-2 space-y-4 md:space-y-6">
                  {/* Global Market Peak Alert */}
                  <GlobalPeakAlertCard cryptoData={cryptoData} />

                  {/* M2 Liquidity Card */}
                  <M2LiquidityCard cryptoData={cryptoData} />

                  {/* Crypto Table */}
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="px-4 md:px-6 py-4 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Market Overview</h3>
                        <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
                          <span>Last updated: {lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : 'Never'}</span>
                        </div>
                      </div>
                    </div>
                    {loading ? (
                      <div className="flex items-center justify-center py-12">
                        <RefreshCw className="h-8 w-8 animate-spin text-blue-500" />
                        <span className="ml-3 text-gray-600">Loading market data...</span>
                      </div>
                    ) : cryptoData.length > 0 ? (
                      <div className="divide-y divide-gray-100">
                        {cryptoData.slice(0, 8).map((crypto, index) => (
                          <div key={crypto.id} className="flex items-center justify-between p-3 md:p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center space-x-2 md:space-x-3 flex-1 min-w-0">
                              <span className="text-xs md:text-sm text-gray-500 font-medium w-6 md:w-8 flex-shrink-0">#{index + 1}</span>
                              <Image 
                                src={crypto.image} 
                                alt={crypto.name}
                                width={28}
                                height={28}
                                className="rounded-full flex-shrink-0 md:w-8 md:h-8"
                              />
                              <div className="min-w-0">
                                <h4 className="font-medium text-gray-900 text-sm md:text-base truncate">{crypto.name}</h4>
                                <p className="text-xs md:text-sm text-gray-500">{crypto.symbol.toUpperCase()}</p>
                              </div>
                            </div>
                            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 flex-shrink-0">
                              <div className="text-right">
                                <div className="font-semibold text-gray-900 text-sm md:text-base">
                                  ${crypto.current_price.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: crypto.current_price < 1 ? 4 : 2
                                  })}
                                </div>
                                <div className={`text-xs md:text-sm font-medium ${crypto.price_change_percentage_24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {crypto.price_change_percentage_24h >= 0 ? '+' : ''}
                                  {crypto.price_change_percentage_24h.toFixed(2)}%
                                </div>
                              </div>
                              <div className="text-right text-xs md:text-sm text-gray-500 hidden sm:block">
                                <p className="font-medium">${(crypto.market_cap / 1e9).toFixed(1)}B</p>
                                <p className="text-xs">Market Cap</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        <p>No market data available</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Sidebar - 1 column */}
                <div className="space-y-4 md:space-y-6">
                  {/* Market Dominance */}
                  <DominanceCard />
                  
                  {/* Market Movers */}
                  <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">24h Movers</h3>
                    {cryptoData.length > 0 && (
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-medium text-green-900 mb-2">Top Gainers</h4>
                          {cryptoData
                            .filter(crypto => crypto.price_change_percentage_24h > 0)
                            .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
                            .slice(0, 3)
                            .map(crypto => (
                              <div key={crypto.id} className="flex items-center justify-between py-1">
                                <span className="text-sm font-medium">{crypto.symbol.toUpperCase()}</span>
                                <span className="text-sm text-green-600 font-medium">
                                  +{crypto.price_change_percentage_24h.toFixed(2)}%
                                </span>
                              </div>
                            ))}
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-red-900 mb-2">Top Losers</h4>
                          {cryptoData
                            .filter(crypto => crypto.price_change_percentage_24h < 0)
                            .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
                            .slice(0, 3)
                            .map(crypto => (
                              <div key={crypto.id} className="flex items-center justify-between py-1">
                                <span className="text-sm font-medium">{crypto.symbol.toUpperCase()}</span>
                                <span className="text-sm text-red-600 font-medium">
                                  {crypto.price_change_percentage_24h.toFixed(2)}%
                                </span>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentView === 'analysis' && (
            <div className="space-y-4 md:space-y-6">
              {/* Crypto Selector */}
              {cryptoData.length > 0 && (
                <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Select Cryptocurrency</h3>
                    <div className="text-sm text-gray-500">
                      {cryptoData.find(c => c.id === selectedCrypto)?.name || 'Bitcoin'} Analysis
                    </div>
                  </div>
                  <CryptoSelector
                    cryptoData={cryptoData}
                    selectedCrypto={selectedCrypto}
                    onCryptoChange={handleCryptoChange}
                  />
                </div>
              )}

              {analysisMode === 'technical' && (
                <div className="space-y-4 md:space-y-6">
                  {/* Main Technical Analysis - Centralized RSI + MACD */}
                  <TechnicalAnalysisCard symbol={selectedCrypto} className="w-full" />
                  

                </div>
              )}

              {analysisMode === 'advanced' && (
                <div className="space-y-4 md:space-y-6">
                  {/* Advanced Analysis Card */}
                  <AdvancedAnalysisCard symbol={selectedCrypto} className="w-full" />
                  
                  {/* Market Context */}
                  <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Context</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <h4 className="font-medium text-purple-900 mb-2">Volume Analysis</h4>
                        <p className="text-sm text-purple-700 mb-3">
                          Current 24h volume indicates {cryptoData.length > 0 && 
                            cryptoData.find(c => c.id === selectedCrypto)?.total_volume && 
                            cryptoData.find(c => c.id === selectedCrypto)!.total_volume > 1e9 ? 'high' : 'moderate'
                          } trading activity.
                        </p>
                        <div className="text-xs text-purple-600">
                          Volume: {cryptoData.length > 0 && cryptoData.find(c => c.id === selectedCrypto) && 
                            `$${(cryptoData.find(c => c.id === selectedCrypto)!.total_volume / 1e9).toFixed(2)}B`
                          }
                        </div>
                      </div>
                      <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                        <h4 className="font-medium text-orange-900 mb-2">Market Cap Rank</h4>
                        <p className="text-sm text-orange-700 mb-3">
                          {selectedCrypto === 'bitcoin' ? 'Leading cryptocurrency by market dominance' :
                           selectedCrypto === 'ethereum' ? 'Second-largest crypto by market cap' :
                           'Alternative cryptocurrency with growth potential'}
                        </p>
                        <div className="text-xs text-orange-600">
                          Rank: #{cryptoData.findIndex(c => c.id === selectedCrypto) + 1 || 'N/A'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  )
} 