'use client'

import { useState, useEffect, useRef } from 'react'
import { TrendingUp, TrendingDown, Activity, RefreshCw } from 'lucide-react'
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
            const timestamp = Math.floor(date.getTime() / 1000) // Convert to Unix timestamp
            return {
              time: timestamp,
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

        // Set data for both series using timestamp conversion
        try {
          bitcoinSeries.setData(
            sortedData.map(point => ({
              time: (point.time / 1000) as never, // Force cast to work around strict typing
              value: point.btcValue,
            }))
          )
          
          m2Series.setData(
            sortedData.map(point => ({
              time: (point.time / 1000) as never, // Force cast to work around strict typing
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
      <div className={`bg-white p-6 rounded-lg shadow-sm border ${className}`}>
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
      <div className={`bg-white p-6 rounded-lg shadow-sm border ${className}`}>
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

  return (
    <div className={`bg-white p-6 rounded-lg shadow-sm border ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            M2 Global Liquidity vs Bitcoin ({m2Data.lagDays}-day lag)
          </h3>
          <div className="flex items-center gap-4 mt-1">
            <span className={`text-sm font-medium ${
              m2Data.impact === 'bullish' ? 'text-green-700' :
              m2Data.impact === 'bearish' ? 'text-red-700' : 'text-gray-700'
            }`}>
              Impact: {m2Data.impact === 'bullish' ? 'Bullish' : 
                      m2Data.impact === 'bearish' ? 'Bearish' : 'Neutral'}
            </span>
            <button
              onClick={fetchM2Data}
              disabled={loading}
              className="text-xs text-blue-600 hover:text-blue-800 underline flex items-center gap-1"
            >
              <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
              Refresh Data
            </button>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Correlation</div>
          <div className={`text-xl font-bold ${
            Math.abs(m2Data.correlation) > 50 ? 'text-blue-600' :
            Math.abs(m2Data.correlation) > 30 ? 'text-yellow-600' : 'text-gray-600'
          }`}>
            {m2Data.correlation > 0 ? '+' : ''}{m2Data.correlation.toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <div className="text-sm text-gray-500 mb-1">M2 Money Supply</div>
          <div className="text-2xl font-bold text-gray-900">{m2Data.currentM2.toFixed(1)}T</div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Liquidity Trend</div>
          <div className={`text-sm font-semibold flex items-center gap-1 ${
            m2Data.m2Trend === 'expanding' ? 'text-green-700' :
            m2Data.m2Trend === 'contracting' ? 'text-red-700' : 'text-gray-700'
          }`}>
            {m2Data.m2Trend === 'expanding' ? <TrendingUp className="h-4 w-4" /> :
             m2Data.m2Trend === 'contracting' ? <TrendingDown className="h-4 w-4" /> : 
             <Activity className="h-4 w-4" />}
            {m2Data.liquidityTrend}
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="mb-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-gray-900">
              M2 Global Liquidity vs Bitcoin ({m2Data.lagDays}-day lag)
            </h4>
            <div className="flex gap-4 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <div className="w-3 h-0.5 bg-orange-500"></div>
                <span>Bitcoin Price</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-0.5 bg-pink-600"></div>
                <span>M2 Supply</span>
              </div>
            </div>
          </div>

          {/* Chart Container */}
          {useSimpleChart ? (
            // Simple SVG Chart with real data
            <div className="w-full h-96 border border-gray-200 rounded-lg bg-white p-4">
              <div className="h-full flex flex-col">
                <div className="text-center text-sm font-medium text-gray-700 mb-4">
                  M2 Global Liquidity vs Bitcoin (Simple View)
                </div>
                <div className="flex-1 relative">
                  <svg className="w-full h-full" viewBox="0 0 800 300">
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
                      
                      // Add some sample labels
                      const timeLabels = []
                      for (let i = 0; i <= 4; i++) {
                        const pointIndex = Math.floor((i / 4) * (dataPoints.length - 1))
                        const date = new Date(dataPoints[pointIndex]?.date || Date.now())
                        const x = (i / 4) * 760 + 20
                        timeLabels.push(
                          <text key={i} x={x} y="295" textAnchor="middle" fontSize="10" fill="#666">
                            {date.getMonth() + 1}/{date.getDate()}
                          </text>
                        )
                      }
                      
                      return (
                        <>
                          {/* Y-axis labels for Bitcoin (left) */}
                          <text x="10" y="25" fontSize="10" fill="#f7931a" textAnchor="end">
                            ${Math.round(bitcoinMax / 1000)}K
                          </text>
                          <text x="10" y="150" fontSize="10" fill="#f7931a" textAnchor="end">
                            ${Math.round((bitcoinMax + bitcoinMin) / 2000)}K
                          </text>
                          <text x="10" y="275" fontSize="10" fill="#f7931a" textAnchor="end">
                            ${Math.round(bitcoinMin / 1000)}K
                          </text>
                          
                          {/* Y-axis labels for M2 (right) */}
                          <text x="790" y="25" fontSize="10" fill="#e91e63" textAnchor="start">
                            {m2Max.toFixed(1)}T
                          </text>
                          <text x="790" y="150" fontSize="10" fill="#e91e63" textAnchor="start">
                            {((m2Max + m2Min) / 2).toFixed(1)}T
                          </text>
                          <text x="790" y="275" fontSize="10" fill="#e91e63" textAnchor="start">
                            {m2Min.toFixed(1)}T
                          </text>
                          
                          {/* M2 line */}
                          <path 
                            d={m2Path} 
                            fill="none" 
                            stroke="#e91e63" 
                            strokeWidth="2" 
                            opacity="0.9"
                          />
                          
                          {/* Bitcoin line */}
                          <path 
                            d={bitcoinPath} 
                            fill="none" 
                            stroke="#f7931a" 
                            strokeWidth="3" 
                            opacity="0.9"
                          />
                          
                          {/* Time labels */}
                          {timeLabels}
                          
                          {/* Legend */}
                          <g>
                            <rect x="250" y="10" width="300" height="40" fill="white" fillOpacity="0.9" rx="5"/>
                            <line x1="260" y1="20" x2="280" y2="20" stroke="#f7931a" strokeWidth="3"/>
                            <text x="285" y="24" fontSize="12" fill="#333">Bitcoin Price</text>
                            <line x1="260" y1="35" x2="280" y2="35" stroke="#e91e63" strokeWidth="2"/>
                            <text x="285" y="39" fontSize="12" fill="#333">M2 Supply</text>
                            <text x="400" y="24" fontSize="10" fill="#666">Correlation: {m2Data.correlation.toFixed(1)}%</text>
                            <text x="400" y="39" fontSize="10" fill="#666">90-day lag applied</text>
                          </g>
                        </>
                      )
                    })()}
                  </svg>
                </div>
                <div className="text-center text-xs text-gray-500 mt-2">
                  <span className="mr-4">Last 90 days • </span>
                  <button 
                    onClick={() => setUseSimpleChart(false)}
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    Try interactive chart
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div 
              ref={chartContainerRef}
              className="w-full h-96 border border-gray-200 rounded-lg bg-white"
              style={{ minHeight: '400px' }}
            />
          )}

          {!useSimpleChart && m2Data.historicalData.length > 0 && (
            <div className="mt-3 text-xs text-gray-500 text-center">
              💡 Hover for values • Scroll to zoom • Drag to pan
            </div>
          )}
        </div>
      </div>

      {/* Key Insight */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <div className="font-medium text-blue-800">Key Insight</div>
        </div>
        <p className="text-gray-700 text-sm">
          {Math.abs(m2Data.correlation) > 50 
            ? `Strong correlation (${Math.abs(m2Data.correlation).toFixed(0)}%) suggests Bitcoin tends to ${m2Data.correlation > 0 ? 'rise' : 'fall'} when M2 money supply increases (with ~${m2Data.lagDays}-day delay).`
            : `Current correlation is moderate (${Math.abs(m2Data.correlation).toFixed(0)}%), indicating Bitcoin is less influenced by M2 changes right now.`
          }
          {m2Data.m2Trend === 'expanding' && m2Data.correlation > 30
            ? ' 🟢 M2 expansion may support future Bitcoin growth.' 
            : m2Data.m2Trend === 'contracting' && m2Data.correlation > 30
            ? ' 🔴 M2 contraction may pressure Bitcoin prices.'
            : ' ⚪ Mixed signals - monitor for trend changes.'
          }
        </p>
        {error && (
          <div className="mt-2 text-xs text-amber-700 bg-amber-50 p-2 rounded">
            Note: Using fallback data due to: {error}
          </div>
        )}
      </div>
    </div>
  )
} 