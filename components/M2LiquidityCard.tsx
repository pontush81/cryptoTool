'use client'

import { useState, useEffect, useRef } from 'react'
import { TrendingUp, TrendingDown, Activity, RefreshCw, BarChart3 } from 'lucide-react'
import type { IChartApi, ISeriesApi } from 'lightweight-charts'

interface CryptoData {
  id: string
  name: string
  symbol: string
  current_price: number
  price_change_24h: number
  price_change_percentage_24h: number
  market_cap: number
  total_volume: number
}

interface M2LiquidityProps {
  cryptoData: CryptoData[]
  className?: string
}

interface M2DataPoint {
  date: string
  m2Value: number // in trillions USD
  bitcoinPrice: number // in USD (lagged by 90 days)
  growthRate: number // M2 YoY growth rate percentage
  timestamp: string
}

interface M2LiquidityData {
  currentM2: number
  m2Trend: 'expanding' | 'contracting' | 'neutral'
  correlation: number
  impact: 'bullish' | 'bearish' | 'neutral'
  liquidityTrend: string
  historicalData: M2DataPoint[]
  confidence: number
  lagDays: number
}

export default function M2LiquidityCard({ cryptoData = [], className = '' }: M2LiquidityProps) {
  const [m2Data, setM2Data] = useState<M2LiquidityData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const [useSimpleChart, setUseSimpleChart] = useState(false)
  
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const m2SeriesRef = useRef<ISeriesApi<"Line"> | null>(null)
  const cryptoSeriesRef = useRef<ISeriesApi<"Line"> | null>(null)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Fetch M2 liquidity data from API
  const fetchM2Data = async () => {
    try {
      setLoading(true)
      setError(null)
      
      console.log('🔄 Fetching M2 liquidity data...')
      
      const response = await fetch('/api/m2-liquidity')
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }
      
      const result = await response.json()
      
      if (result.success && result.data) {
        setM2Data(result.data)
        console.log('✅ M2 data loaded:', result.data)
      } else {
        throw new Error(result.error || 'Failed to load M2 data')
      }
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      console.error('❌ Error fetching M2 data:', errorMessage)
      setError(errorMessage)
      
      // Use fallback data
      setM2Data({
        currentM2: 32.8,
        m2Trend: 'expanding',
        correlation: 74.3,
        impact: 'bullish',
        confidence: 85,
        liquidityTrend: 'Expanding 📈',
        historicalData: [],
        lagDays: 90
      })
    } finally {
      setLoading(false)
    }
  }

  // Initial data fetch
  useEffect(() => {
    if (mounted) {
      fetchM2Data()
    }
  }, [mounted])

  // Chart initialization
  useEffect(() => {
    if (!mounted || !m2Data || m2Data.historicalData.length === 0) {
      return
    }

    // Force try interactive chart first, don't fallback to simple too quickly
    if (useSimpleChart) {
      return
    }

    const initializeChart = async () => {
      try {
        console.log('📊 Initializing TradingView chart...')
        
        // Import lightweight-charts dynamically with new v5.x API
        const { createChart, AreaSeries } = await import('lightweight-charts')
        console.log('✅ TradingView charts module loaded successfully')
        
        if (!chartContainerRef.current) {
          console.log('❌ Chart container not available')
          setUseSimpleChart(true)
          return
        }

        // Ensure container has dimensions
        if (chartContainerRef.current.offsetWidth === 0) {
          console.log('❌ Chart container has no width')
          setUseSimpleChart(true)
          return
        }

        console.log(`📐 Chart container dimensions: ${chartContainerRef.current.offsetWidth}px width`)

        // Create chart with proper configuration for v5.x
        const chart = createChart(chartContainerRef.current, {
          width: chartContainerRef.current.offsetWidth,
          height: 400,
          layout: {
            background: { color: '#ffffff' },
            textColor: '#333333',
            fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto',
          },
          grid: {
            vertLines: { color: '#f0f0f0' },
            horzLines: { color: '#f0f0f0' },
          },
          timeScale: {
            borderColor: '#cccccc',
            timeVisible: true,
            secondsVisible: false,
            tickMarkFormatter: (time: number) => {
              const date = new Date(time * 1000)
              const month = date.toLocaleDateString('en-US', { month: 'short' })
              const year = date.getFullYear()
              return `${month} ${year}`
            },
          },
          rightPriceScale: {
            visible: true,
            borderColor: '#cccccc',
            mode: 0, // normal price scale mode
          },
          leftPriceScale: {
            visible: true,
            borderColor: '#cccccc',
            mode: 0, // normal price scale mode
          },
          crosshair: {
            mode: 0, // normal crosshair
          },
        })

        // Create two series: one for Bitcoin, one for M2 Supply
        const bitcoinSeries = chart.addSeries(AreaSeries, {
          topColor: 'rgba(255, 165, 0, 0.4)',
          bottomColor: 'rgba(255, 165, 0, 0.0)',
          lineColor: '#FFA500',
          lineWidth: 2,
          priceScaleId: 'right',
          title: 'Bitcoin Price (USD)',
        })

        const m2Series = chart.addSeries(AreaSeries, {
          topColor: 'rgba(199, 21, 133, 0.4)',
          bottomColor: 'rgba(199, 21, 133, 0.0)',
          lineColor: '#C71585',
          lineWidth: 2,
          priceScaleId: 'left',
          title: 'M2 Global Liquidity (Trillions USD)',
        })

        // Prepare data for chart with 90-day forward lag for Bitcoin
        // Filter to weekly data to reduce noise (every 7th day)
        const chartData = m2Data.historicalData
          .filter((_, index) => index % 7 === 0) // Weekly data
          .map(point => {
            const date = new Date(point.date)
            const timestamp = Math.floor(date.getTime() / 1000) // Convert to Unix timestamp in seconds
            return {
              time: timestamp, // Already in seconds for lightweight-charts
              btcValue: point.bitcoinPrice, // Already lagged 90 days forward in API
              m2Value: point.m2Value,
            }
          })
          .filter(point => point.time && point.btcValue && point.m2Value)
          .sort((a, b) => a.time - b.time) // Ensure chronological order

        if (chartData.length === 0) {
          console.log('❌ No valid chart data available')
          setUseSimpleChart(true)
          return
        }

        console.log('📊 Chart data prepared:', `${chartData.length} data points (weekly sampling)`)

        // Process data with weekly intervals for smoother visualization
        const weeklyData = chartData.filter((_, index) => index % 7 === 0) // Show every 7th day
        const sortedData = weeklyData.sort((a, b) => a.time - b.time)

        // Set data for both series using correct timestamp (already in seconds)
        try {
          bitcoinSeries.setData(
            sortedData.map(point => ({
              time: point.time as never, // Unix timestamp already in seconds
              value: point.btcValue,
            }))
          )
          
          m2Series.setData(
            sortedData.map(point => ({
              time: point.time as never, // Unix timestamp already in seconds
              value: point.m2Value,
            }))
          )
          
          // Auto-fit content
          chart.timeScale().fitContent()
          
          chartRef.current = chart
          console.log('✅ Chart successfully initialized with data')
        } catch (error) {
          console.error('❌ Failed to set chart data:', error)
          setUseSimpleChart(true)
        }

      } catch (error) {
        console.error('❌ Chart initialization failed:', error)
        console.log('Error details:', {
          name: (error as Error).name,
          message: (error as Error).message,
          stack: (error as Error).stack,
          [Symbol.for('next.console.error.digest')]: 'NEXT_CONSOLE_ERROR'
        })
        console.log('📉 Falling back to simple chart due to error')
        setUseSimpleChart(true)
      }
    }

    // Start chart initialization immediately
    initializeChart()
  }, [mounted, m2Data, useSimpleChart])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.remove()
        chartRef.current = null
        m2SeriesRef.current = null
        cryptoSeriesRef.current = null
      }
    }
  }, [])

  if (!mounted || loading) {
    return (
      <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-5 bg-gray-200 rounded w-2/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
          <div className="h-96 bg-gray-200 rounded mb-4"></div>
          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    )
  }

  if (!m2Data) {
    return (
      <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
        <div className="text-center py-8">
          <div className="text-red-600 mb-2">Failed to load M2 data</div>
          <button 
            onClick={fetchM2Data}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  const getCorrelationStrength = (correlation: number) => {
    const absCorr = Math.abs(correlation)
    if (absCorr >= 70) return { label: 'Strong', color: 'text-green-600' }
    if (absCorr >= 40) return { label: 'Moderate', color: 'text-blue-600' }
    if (absCorr >= 20) return { label: 'Weak', color: 'text-yellow-600' }
    return { label: 'Very Weak', color: 'text-gray-600' }
  }

  const correlationInfo = getCorrelationStrength(m2Data.correlation)

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      {/* Clean Header */}
      <div className="p-4 md:p-6 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-gray-50">
              <BarChart3 className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                M2 Global Liquidity Analysis
              </h3>
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                  m2Data.impact === 'bullish' ? 'bg-green-100 text-green-700 border-green-200' :
                  m2Data.impact === 'bearish' ? 'bg-red-100 text-red-700 border-red-200' :
                  'bg-gray-100 text-gray-700 border-gray-200'
                }`}>
                  {m2Data.impact === 'bullish' ? 'Bullish Impact' : 
                   m2Data.impact === 'bearish' ? 'Bearish Impact' : 'Neutral Impact'}
                </span>
              </div>
            </div>
          </div>
          
          <button
            onClick={fetchM2Data}
            disabled={loading}
            className="p-2 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 md:p-6">
        {/* Key Metrics - Simplified for mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-xl sm:text-lg font-bold text-gray-900">
              {m2Data.currentM2.toFixed(1)}T
            </div>
            <div className="text-sm text-gray-500">M2 Supply</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className={`text-xl sm:text-lg font-bold ${correlationInfo.color}`}>
              {correlationInfo.label}
            </div>
            <div className="text-sm text-gray-500">Correlation</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg sm:block hidden">
            <div className="text-lg font-bold text-gray-900">
              {m2Data.lagDays}d
            </div>
            <div className="text-sm text-gray-500">Lag Applied</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg sm:block hidden">
            <div className="text-lg font-bold text-gray-900">
              {m2Data.correlation.toFixed(1)}%
            </div>
            <div className="text-sm text-gray-500">Correlation</div>
          </div>
        </div>

        {/* Status Indicator - Improved mobile layout */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-start gap-3 mb-3">
            <div className={`w-3 h-3 rounded-full mt-0.5 ${
              m2Data.impact === 'bullish' ? 'bg-green-500' :
              m2Data.impact === 'bearish' ? 'bg-red-500' : 'bg-gray-500'
            }`}></div>
            <div>
              <span className="text-sm sm:text-base font-medium text-gray-900 block mb-1">
                {Math.abs(m2Data.correlation) > 30 
                  ? `Bitcoin ${m2Data.correlation > 0 ? 'rises' : 'falls'} when M2 increases`
                  : 'Bitcoin currently moving independently of M2 trends'
                }
              </span>
              <span className="text-xs sm:text-sm text-gray-500">
                {Math.abs(m2Data.correlation) > 30 && `${m2Data.lagDays}d lag applied`}
              </span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                m2Data.impact === 'bullish' ? 'bg-green-500' :
                m2Data.impact === 'bearish' ? 'bg-red-500' : 'bg-gray-500'
              }`}
              style={{ width: `${Math.abs(m2Data.correlation)}%` }}
            ></div>
          </div>
        </div>

        {/* Chart Section - Mobile optimized */}
        <div className="mb-4">
          {/* Chart Legend - Simplified on mobile */}
          <div className="flex items-center justify-between mb-3 p-3 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 text-sm sm:text-base">Historical Correlation</h4>
            <div className="flex gap-2 sm:gap-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-0.5 bg-orange-500"></div>
                <span className="text-gray-600 hidden sm:inline">Bitcoin Price</span>
                <span className="text-gray-600 sm:hidden">BTC</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-0.5 bg-purple-600"></div>
                <span className="text-gray-600 hidden sm:inline">M2 Supply</span>
                <span className="text-gray-600 sm:hidden">M2</span>
              </div>
            </div>
          </div>

          {/* Chart Container - Responsive height */}
          {useSimpleChart ? (
            // Simple SVG Chart with mobile optimization
            <div className="w-full h-60 sm:h-80 md:h-96 border border-gray-200 rounded-lg bg-white p-2 md:p-4">
              <div className="h-full flex flex-col">
                <div className="flex-1 relative overflow-hidden">
                  <svg className="w-full h-full" viewBox="0 0 800 300" preserveAspectRatio="xMidYMid meet">
                    {/* Grid lines */}
                    <defs>
                      <pattern id="grid" width="80" height="30" patternUnits="userSpaceOnUse">
                        <path d="M 80 0 L 0 0 0 30" fill="none" stroke="#f0f0f0" strokeWidth="1"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                    
                    {/* Chart lines with real data */}
                    {m2Data.historicalData.length > 1 && (() => {
                      // Use last 90 days for better visibility
                      const dataPoints = m2Data.historicalData.slice(-90)
                      const m2Values = dataPoints.map(d => d.m2Value)
                      const bitcoinValues = dataPoints.map(d => d.bitcoinPrice)
                      
                      const m2Min = Math.min(...m2Values)
                      const m2Max = Math.max(...m2Values)
                      const bitcoinMin = Math.min(...bitcoinValues)
                      const bitcoinMax = Math.max(...bitcoinValues)
                      
                      // Normalize values to fit chart area (with padding)
                      const normalizeM2 = (val: number) => {
                        const range = m2Max - m2Min || 1
                        return 280 - ((val - m2Min) / range) * 240
                      }
                      
                      const normalizeBitcoin = (val: number) => {
                        const range = bitcoinMax - bitcoinMin || 1
                        return 280 - ((val - bitcoinMin) / range) * 240
                      }
                      
                      // Create SVG path for M2 line
                      const m2Path = m2Values.map((val, i) => {
                        const x = (i / (dataPoints.length - 1)) * 760 + 20
                        const y = normalizeM2(val)
                        return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`
                      }).join(' ')
                      
                      // Create SVG path for Bitcoin line
                      const bitcoinPath = bitcoinValues.map((val, i) => {
                        const x = (i / (dataPoints.length - 1)) * 760 + 20
                        const y = normalizeBitcoin(val)
                        return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`
                      }).join(' ')
                      
                      // Add properly formatted time labels - fewer on mobile
                      const timeLabels = []
                      const labelCount = 4 // Simplified for mobile compatibility
                      for (let i = 0; i < labelCount; i++) {
                        const pointIndex = Math.floor((i / (labelCount - 1)) * (dataPoints.length - 1))
                        const dateStr = dataPoints[pointIndex]?.date
                        if (dateStr) {
                          const date = new Date(dateStr)
                          const x = (i / (labelCount - 1)) * 760 + 20
                          timeLabels.push(
                            <text key={i} x={x} y="295" textAnchor="middle" fontSize="10" fill="#666">
                              {date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}
                            </text>
                          )
                        }
                      }
                      
                      return (
                        <>
                          {/* Y-axis labels - Hidden on small mobile */}
                          <text x="10" y="25" fontSize="10" fill="#f7931a" textAnchor="end" className="hidden md:block">
                            ${Math.round(bitcoinMax / 1000)}K
                          </text>
                          <text x="10" y="275" fontSize="10" fill="#f7931a" textAnchor="end" className="hidden md:block">
                            ${Math.round(bitcoinMin / 1000)}K
                          </text>
                          
                          <text x="790" y="25" fontSize="10" fill="#8b5cf6" textAnchor="start" className="hidden md:block">
                            {m2Max.toFixed(1)}T
                          </text>
                          <text x="790" y="275" fontSize="10" fill="#8b5cf6" textAnchor="start" className="hidden md:block">
                            {m2Min.toFixed(1)}T
                          </text>
                          
                          {/* M2 line - thinner on mobile */}
                          <path 
                            d={m2Path} 
                            fill="none" 
                            stroke="#8b5cf6" 
                            strokeWidth="2" 
                            opacity="0.9"
                          />
                          
                          {/* Bitcoin line - prominent */}
                          <path 
                            d={bitcoinPath} 
                            fill="none" 
                            stroke="#f7931a" 
                            strokeWidth="3" 
                            opacity="0.9"
                          />
                          
                          {/* Current value indicators - only on larger screens */}
                          <g className="hidden sm:block">
                            {/* Current M2 value indicator */}
                            <circle 
                              cx={760} 
                              cy={normalizeM2(m2Values[m2Values.length - 1])} 
                              r="4" 
                              fill="#8b5cf6"
                            />
                            {/* Current Bitcoin value indicator */}
                            <circle 
                              cx={760} 
                              cy={normalizeBitcoin(bitcoinValues[bitcoinValues.length - 1])} 
                              r="4" 
                              fill="#f7931a"
                            />
                          </g>
                          
                          {/* Time labels */}
                          {timeLabels}
                        </>
                      )
                    })()}
                  </svg>
                </div>
                <div className="text-center text-xs text-gray-500 mt-2 space-y-1 sm:space-y-0 sm:flex sm:items-center sm:justify-center sm:gap-4">
                  <span>Last 90 days</span>
                  <button 
                    onClick={() => setUseSimpleChart(false)}
                    className="text-blue-600 hover:text-blue-800 underline text-xs p-1"
                  >
                    Try interactive chart
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div 
              ref={chartContainerRef}
              className="w-full h-60 sm:h-80 md:h-96 border border-gray-200 rounded-lg bg-white"
              style={{ minHeight: '240px' }}
            />
          )}

          {!useSimpleChart && m2Data.historicalData.length > 0 && (
            <div className="mt-3 text-xs text-gray-500 text-center">
              <span className="hidden sm:inline">💡 Hover for values • Scroll to zoom • Drag to pan</span>
              <span className="sm:hidden">💡 Tap and drag to explore</span>
            </div>
          )}
        </div>

        {/* Progressive Disclosure - Analysis - Improved mobile experience */}
        <details className="group">
          <summary className="flex items-center justify-between cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-800 py-3 px-2 rounded-lg hover:bg-blue-50 select-none">
            <span>View detailed analysis</span>
            <span className="group-open:rotate-180 transition-transform text-lg">▼</span>
          </summary>
          
          <div className="mt-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-blue-900 mb-2 text-sm sm:text-base">Current Analysis</h4>
                <p className="text-sm text-blue-800 leading-relaxed">
                  {Math.abs(m2Data.correlation) > 30 
                    ? `M2 money supply shows ${correlationInfo.label.toLowerCase()} correlation with Bitcoin. 
                       Current trend is ${m2Data.liquidityTrend.toLowerCase()} which ${
                         m2Data.impact === 'bullish' ? 'supports' : 
                         m2Data.impact === 'bearish' ? 'pressures' : 'has neutral impact on'
                       } Bitcoin pricing.`
                    : 'Bitcoin is currently moving independently of M2 liquidity trends, suggesting other factors are dominating price action.'
                  }
                </p>
              </div>

              {/* Mobile-friendly stats grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-white bg-opacity-60 rounded-lg">
                  <div className="font-semibold text-sm text-blue-900 mb-1">M2 Status</div>
                  <div className="text-sm text-blue-800">{m2Data.liquidityTrend}</div>
                  <div className="text-xs text-blue-700 mt-1">${m2Data.currentM2.toFixed(1)}T USD</div>
                </div>
                <div className="p-3 bg-white bg-opacity-60 rounded-lg">
                  <div className="font-semibold text-sm text-blue-900 mb-1">Methodology</div>
                  <div className="text-sm text-blue-800">{m2Data.lagDays}-day forward lag</div>
                  <div className="text-xs text-blue-700 mt-1">Policy transmission delays</div>
                </div>
              </div>

              {error && (
                <div className="text-xs text-amber-700 bg-amber-50 p-2 rounded border border-amber-200">
                  Note: Using fallback data due to API error
                </div>
              )}
            </div>
          </div>
        </details>
      </div>
    </div>
  )
} 