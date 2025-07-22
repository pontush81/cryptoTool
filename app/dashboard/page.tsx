'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { TrendingUp, TrendingDown, BarChart2, Globe, Activity, Zap, X, RefreshCw, DollarSign } from 'lucide-react'
import TechnicalAnalysisCard from '../../components/TechnicalAnalysisCard'
import AdvancedAnalysisCard from '../../components/AdvancedAnalysisCard'
import DominanceCard from '../../components/DominanceCard'
import CryptoSelector from '../../components/CryptoSelector'
import GlobalPeakAlertCard from '../../components/GlobalPeakAlertCard'

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
    <div className="min-h-screen bg-gray-50">
      {/* Content Area */}
      <main className="flex-1">
           {/* Page Header */}
           <div className="bg-white shadow-sm border-b border-gray-200">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
               <div className="flex items-center justify-between">
                 <div>
                   <h1 className="text-2xl font-bold text-gray-900">
                     {currentView === 'overview' && 'Market Overview'}
                     {currentView === 'analysis' && 'Analysis'}
                     {currentView === 'analysis' && cryptoData.length > 0 && (
                       <span className="ml-3 text-lg text-blue-600 hidden sm:inline">
                         - {cryptoData.find(c => c.id === selectedCrypto)?.name || 'Bitcoin'} ({cryptoData.find(c => c.id === selectedCrypto)?.symbol.toUpperCase() || 'BTC'})
                       </span>
                     )}
                   </h1>
                   <p className="text-sm text-gray-600 mt-1">
                     {currentView === 'overview' && 'Real-time crypto market dashboard with key metrics and trends'}
                     {currentView === 'analysis' && analysisMode === 'technical' && 'Multi-timeframe technical analysis with professional trading signals'}
                     {currentView === 'analysis' && analysisMode === 'advanced' && 'Professional analysis with Phase 3 indicators and market context'}
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

           {/* Dashboard Navigation */}
           <div className="bg-white border-b border-gray-200">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="flex space-x-8">
                 {navigationItems.map((item) => (
                   <button
                     key={item.id}
                     onClick={() => setCurrentView(item.id)}
                     className={`inline-flex items-center px-1 py-4 text-sm font-medium transition-colors ${
                       item.active
                         ? 'text-blue-600 border-b-2 border-blue-600'
                         : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent'
                     }`}
                   >
                     <item.icon className="h-4 w-4 mr-2" />
                     {item.label}
                   </button>
                 ))}
                 
                 {/* Analysis sub-navigation */}
                 {currentView === 'analysis' && (
                   <div className="flex space-x-4 ml-4 pl-4 border-l border-gray-200">
                     <button
                       onClick={() => setAnalysisMode('technical')}
                       className={`inline-flex items-center px-1 py-4 text-sm font-medium transition-colors ${
                         analysisMode === 'technical'
                           ? 'text-blue-600 border-b-2 border-blue-600'
                           : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent'
                       }`}
                     >
                       <Activity className="h-4 w-4 mr-2" />
                       Technical
                     </button>
                     <button
                       onClick={() => setAnalysisMode('advanced')}
                       className={`inline-flex items-center px-1 py-4 text-sm font-medium transition-colors ${
                         analysisMode === 'advanced'
                           ? 'text-purple-600 border-b-2 border-purple-600'
                           : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent'
                       }`}
                     >
                       <BarChart2 className="h-4 w-4 mr-2" />
                       Advanced
                     </button>
                   </div>
                 )}
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

          {currentView === 'overview' && (
            <div className="space-y-6">
              {/* Global Market Stats - Improved Design */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Market Overview</h2>
                  <div className="text-sm text-gray-500">
                    {lastUpdated && `Updated ${new Date(lastUpdated).toLocaleTimeString()}`}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Total Market Cap */}
                  <Tooltip tooltip="Det totala värdet av alla kryptovalutor kombinerat. Beräknas genom att multiplicera varje coins pris med dess cirkulerande tillgång och summera allt.">
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
                  <Tooltip tooltip="Total handelsvolym för alla kryptovalutor under senaste 24 timmarna. Visar hur mycket som handlas aktivt på marknaden - högre volym indikerar mer likviditet och aktivitet.">
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
                  <Tooltip tooltip="Procentuell förändring av den totala kryptomarknadens värde under senaste 24 timmarna. Använder samma beräkningsmetod som TradingView och CoinMarketCap - baserat på total market cap förändring, inte genomsnitt av individuella coins.">
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
                <GlobalPeakAlertCard />
              </div>

              {/* Market Dominance */}
              <DominanceCard />
            </div>
          )}

          {currentView === 'analysis' && (
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
        </div>
      </main>
    </div>
  )
} 