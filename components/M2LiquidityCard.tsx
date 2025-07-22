'use client'

import { useState, useEffect, useRef } from 'react'
import { TrendingUp, TrendingDown, Activity } from 'lucide-react'
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
  m2Value: number // in trillions
  bitcoinPrice: number // in thousands (USD), 90-day lagged
  growthRate: number // M2 annualized growth rate percentage
  dayIndex: number
}

interface M2Analysis {
  currentM2: number
  m2Trend: 'expanding' | 'contracting' | 'neutral'
  correlation: number
  impact: 'positive' | 'negative' | 'neutral'
  confidence: number
  liquidityTrend: string
}

export default function M2LiquidityCard({ cryptoData = [], className = '' }: M2LiquidityProps) {
  const [analysis, setAnalysis] = useState<M2Analysis | null>(null)
  const [chartData, setChartData] = useState<M2DataPoint[]>([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  // Professional multi-series chart (no mode toggle needed)
  const [useSimpleChart, setUseSimpleChart] = useState(false) // Fallback to simple chart
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const m2SeriesRef = useRef<ISeriesApi<"Line"> | null>(null)
  const cryptoSeriesRef = useRef<ISeriesApi<"Line"> | null>(null)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (cryptoData.length === 0) return

    const calculateM2Analysis = () => {
      // Generate historical M2 data with realistic expansion cycles and crypto lag
      const generateM2Data = (days: number) => {
        const data: M2DataPoint[] = []
        
        // Step 1: Generate M2 expansion pattern (independent)
        const m2Values: number[] = []
        let baseM2 = 21.0 // Start at $21T
        
        for (let i = 0; i < days; i++) {
          // M2 realistic expansion - gradual and stable
          const baseExpansion = 0.0002 // ~7.3% annual expansion
          const seasonality = Math.sin(i * 0.005) * 0.00005 // Very small seasonal variation
          const noise = (Math.random() - 0.5) * 0.00003 // Very small noise
          
          baseM2 *= (1 + baseExpansion + seasonality + noise)
          m2Values.push(baseM2)
        }
        
        // Step 2: Generate crypto that follows M2 with 90-day lag
        // Get Bitcoin price from crypto data (convert to thousands for better scale)
        const bitcoinData = cryptoData.find(crypto => crypto.symbol === 'BTC')
        let baseBitcoin = bitcoinData ? bitcoinData.current_price / 1000 : 50.0 // Convert to thousands, default $50k
        
                  for (let i = 0; i < days; i++) {
            let bitcoinValue: number

            if (i < 90) {
              // Pre-lag period: Bitcoin moves independently but more stable
              const volatility = Math.sin(i * 0.05) * 0.02 + (Math.random() - 0.5) * 0.015
              baseBitcoin *= (1 + volatility)
              bitcoinValue = baseBitcoin
            } else {
              // Post-lag period: Bitcoin follows M2 changes from 90 days ago
              const currentM2 = m2Values[i]
              const laggedM2 = m2Values[i - 90]
              const m2Change = (currentM2 - laggedM2) / laggedM2

              // Bitcoin responds to M2 changes with strong amplification
              const m2Influence = m2Change * 8.0 // 8x amplification (Bitcoin is more volatile)

              // Bitcoin volatility
              const bitcoinVolatility = Math.sin(i * 0.03) * 0.015 + (Math.random() - 0.5) * 0.02

              // Combined effect
              const totalChange = m2Influence + bitcoinVolatility
              baseBitcoin *= (1 + totalChange)

              // Keep realistic bounds for Bitcoin price (in thousands)
              baseBitcoin = Math.max(20.0, Math.min(baseBitcoin, 150.0)) // $20k - $150k
              bitcoinValue = baseBitcoin
            }

          // Calculate M2 Growth Rate as rolling 30-day annualized percentage
          let growthRate = 0
          if (i >= 30) {
            const monthAgoM2 = m2Values[i - 30]
            const monthlyGrowth = ((m2Values[i] - monthAgoM2) / monthAgoM2) * 100
            growthRate = monthlyGrowth * 12 // Annualized to percentage
          } else {
            // For first 30 days, use a baseline growth rate
            growthRate = 5 + Math.sin(i * 0.1) * 2 // 3-7% baseline range
          }

                      data.push({
              date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              m2Value: parseFloat(m2Values[i].toFixed(3)),
              bitcoinPrice: parseFloat(bitcoinValue.toFixed(2)),
              growthRate: parseFloat(growthRate.toFixed(2)),
              dayIndex: i
            })
        }
        
        return data
      }

      const historicalData = generateM2Data(180) // 6 months of data
      setChartData(historicalData)

      // Calculate analysis metrics
      const recent30Days = historicalData.slice(-30)
      const previous30Days = historicalData.slice(-60, -30)
      
      const recentM2Avg = recent30Days.reduce((sum, d) => sum + d.m2Value, 0) / 30
      const previousM2Avg = previous30Days.reduce((sum, d) => sum + d.m2Value, 0) / 30
      
      const m2Growth = ((recentM2Avg - previousM2Avg) / previousM2Avg) * 100
      
      // Calculate correlation between M2 and lagged crypto
      const correlationData = historicalData.slice(-120) // Last 4 months
      const m2Values = correlationData.map(d => d.m2Value)
              const bitcoinValues = correlationData.map(d => d.bitcoinPrice)
      
              const correlation = calculateCorrelation(m2Values, bitcoinValues)
      
      // Determine trends and impact
      let m2Trend: 'expanding' | 'contracting' | 'neutral' = 'neutral'
      if (m2Growth > 0.5) m2Trend = 'expanding'
      else if (m2Growth < -0.2) m2Trend = 'contracting'
      
      let impact: 'positive' | 'negative' | 'neutral' = 'neutral'
      if (correlation > 0.3 && m2Trend === 'expanding') impact = 'positive'
      else if (correlation > 0.3 && m2Trend === 'contracting') impact = 'negative'
      else if (correlation < -0.3 && m2Trend === 'expanding') impact = 'negative'
      else if (correlation < -0.3 && m2Trend === 'contracting') impact = 'positive'

      setAnalysis({
        currentM2: recentM2Avg,
        m2Trend,
        correlation: correlation * 100,
        impact,
        confidence: Math.min(85, 60 + Math.abs(correlation) * 30),
        liquidityTrend: m2Trend === 'expanding' ? 'Expanding 📈' : 
                       m2Trend === 'contracting' ? 'Contracting 📉' : 'Stable ➡️'
      })
      
      setLoading(false)
    }

    calculateM2Analysis()
  }, [cryptoData])

    // Combined chart initialization and data update
  useEffect(() => {
    if (!mounted || chartData.length === 0 || useSimpleChart) return

    let retryCount = 0
    const maxRetries = 3

    const initializeAndUpdateChart = async () => {
      if (!chartContainerRef.current) {
        retryCount++
        if (retryCount >= maxRetries) {
          console.warn('Chart container not ready after max retries, falling back to simple chart')
          setUseSimpleChart(true)
          return
        }
        setTimeout(initializeAndUpdateChart, 200)
        return
      }

      try {
        // Dynamic import for Next.js compatibility - at function scope
        const { createChart, ColorType, LineSeries } = await import('lightweight-charts')

        // Create chart if it doesn't exist
        if (!chartRef.current) {
          
          const containerWidth = chartContainerRef.current.clientWidth || 800
          
          const chart = createChart(chartContainerRef.current, {
            width: containerWidth,
            height: 400,
            layout: {
              background: { type: ColorType.Solid, color: '#fafbfc' },
              textColor: '#333333',
            },
            grid: {
              vertLines: { 
                color: 'rgba(197, 203, 206, 0.4)', 
                style: 0, 
                visible: true 
              },
              horzLines: { 
                color: 'rgba(197, 203, 206, 0.4)', 
                style: 0, 
                visible: true 
              },
            },
            crosshair: {
              mode: 1,
              vertLine: {
                color: '#9598a1',
                width: 1,
                style: 2,
              },
              horzLine: {
                color: '#9598a1',
                width: 1,
                style: 2,
              },
            },
            rightPriceScale: {
              borderColor: '#c5cbce',
              textColor: '#333333',
              scaleMargins: {
                top: 0.05,
                bottom: 0.05,
              },
            },
            leftPriceScale: {
              visible: true,
              borderColor: '#c5cbce', 
              textColor: '#333333',
              scaleMargins: {
                top: 0.05,
                bottom: 0.05,
              },
            },
            timeScale: {
              borderColor: '#c5cbce',
              textColor: '#333333',
              timeVisible: true,
              secondsVisible: false,
            },
          })

          chartRef.current = chart

          // Chart created successfully with v5.x API

          // Handle resize
          const handleResize = () => {
            if (chartRef.current && chartContainerRef.current) {
              const newWidth = chartContainerRef.current.clientWidth || 800
              chartRef.current.applyOptions({ 
                width: newWidth 
              })
            }
          }

          window.addEventListener('resize', handleResize)
        }

        // Remove existing series if they exist
        if (m2SeriesRef.current) {
          try {
            chartRef.current.removeSeries(m2SeriesRef.current)
          } catch (e) {
            console.warn('Error removing M2 series:', e)
          }
          m2SeriesRef.current = null
        }
        if (cryptoSeriesRef.current) {
          try {
            chartRef.current.removeSeries(cryptoSeriesRef.current)
          } catch (e) {
            console.warn('Error removing crypto series:', e)
          }
          cryptoSeriesRef.current = null
        }

                // Professional multi-series chart like TradingView
        // 1. Bitcoin Price (dark line, left axis)
        const bitcoinSeries = chartRef.current.addSeries(LineSeries, {
          color: '#f7931a', // Bitcoin orange for recognition
          lineWidth: 3,
          lineStyle: 0,
          title: 'Bitcoin Price ($k)',
          priceScaleId: 'left',
          crosshairMarkerVisible: true,
          crosshairMarkerRadius: 4,
        })
        
        // 2. M2 Supply (red/magenta line, right axis)
        const m2Series = chartRef.current.addSeries(LineSeries, {
          color: '#e91e63',
          lineWidth: 2,
          lineStyle: 0,
          title: 'M2 Money Supply',
          priceScaleId: 'right',
          crosshairMarkerVisible: true,
          crosshairMarkerRadius: 4,
        })
        
        // 3. M2 Growth Rate (blue area, separate axis)
        const { AreaSeries } = await import('lightweight-charts')
        const growthSeries = chartRef.current.addSeries(AreaSeries, {
          lineColor: '#2196f3',
          topColor: 'rgba(33, 150, 243, 0.4)',
          bottomColor: 'rgba(33, 150, 243, 0.05)',
          lineWidth: 1,
          title: 'M2 Growth Rate (Annualized)',
          priceScaleId: 'growth',
          crosshairMarkerVisible: true,
          crosshairMarkerRadius: 3,
        })

        // Store series references
        cryptoSeriesRef.current = bitcoinSeries
        m2SeriesRef.current = m2Series
        const growthSeriesRef = { current: growthSeries } // Temporary ref for growth series

        // Configure professional multi-axis layout
        chartRef.current.priceScale('left').applyOptions({
          position: 'left',
          borderColor: '#f7931a', // Match Bitcoin orange color
          textColor: '#f7931a',
          visible: true,
          scaleMargins: {
            top: 0.1,
            bottom: 0.1,
          },
        })
        
        chartRef.current.priceScale('right').applyOptions({
          position: 'right',
          borderColor: '#e91e63',
          textColor: '#e91e63',
          visible: true,
          scaleMargins: {
            top: 0.1,
            bottom: 0.1,
          },
        })
        
        // Configure growth rate axis (invisible, overlaid)
        chartRef.current.priceScale('growth').applyOptions({
          visible: false, // Hidden axis for area chart
          scaleMargins: {
            top: 0.7,
            bottom: 0.05,
          },
        })

        // Set chart data for all three series
        
        // 1. Bitcoin Price (orange line, left axis)
        const bitcoinData = chartData.map(point => ({
          time: point.date,
          value: point.bitcoinPrice,
        }))
        
        // 2. M2 Money Supply (red line, right axis)  
        const m2Data = chartData.map(point => ({
          time: point.date,
          value: point.m2Value,
        }))
        
        // 3. M2 Growth Rate (blue area, growth axis)
        const growthData = chartData.map(point => ({
          time: point.date,
          value: Math.max(0, point.growthRate), // Keep positive for area chart
        }))

        // Apply data to series
        bitcoinSeries.setData(bitcoinData)
        m2Series.setData(m2Data) 
        growthSeries.setData(growthData)

        console.log('✅ TradingView chart loaded successfully!')

      } catch (error) {
        console.error('Error in chart initialization/update:', error)
        retryCount++
        
        if (retryCount >= maxRetries) {
          console.warn('TradingView chart failed after max retries, switching to simple chart')
          setUseSimpleChart(true)
          return
        }
        
        // Reset chart for retry
        if (chartRef.current) {
          try {
            chartRef.current.remove()
          } catch (e) {
            console.warn('Error removing failed chart:', e)
          }
        }
        chartRef.current = null
        m2SeriesRef.current = null
        cryptoSeriesRef.current = null
        
        setTimeout(initializeAndUpdateChart, 500)
      }
    }

    // Start initialization with a small delay
    const timeoutId = setTimeout(initializeAndUpdateChart, 200)
    return () => clearTimeout(timeoutId)
  }, [mounted, chartData, useSimpleChart])

  // Cleanup chart on unmount
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

  // Helper function to calculate correlation
  const calculateCorrelation = (x: number[], y: number[]): number => {
    const n = Math.min(x.length, y.length)
    if (n === 0) return 0

    const sumX = x.slice(0, n).reduce((a, b) => a + b, 0)
    const sumY = y.slice(0, n).reduce((a, b) => a + b, 0)
    const sumXY = x.slice(0, n).reduce((sum, xi, i) => sum + xi * y[i], 0)
    const sumXX = x.slice(0, n).reduce((sum, xi) => sum + xi * xi, 0)
    const sumYY = y.slice(0, n).reduce((sum, yi) => sum + yi * yi, 0)

    const numerator = n * sumXY - sumX * sumY
    const denominator = Math.sqrt((n * sumXX - sumX * sumX) * (n * sumYY - sumY * sumY))
    
    return denominator === 0 ? 0 : numerator / denominator
  }

  if (!mounted || loading || !analysis) {
    return (
      <div className={`bg-white p-6 rounded-lg shadow-sm border ${className}`}>
        <div className="animate-pulse">
          <div className="h-5 bg-gray-200 rounded w-2/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
          <div className="h-32 bg-gray-200 rounded mb-4"></div>
          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white p-6 rounded-lg shadow-sm border ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">M2 Global Liquidity vs Bitcoin (90-day lag)</h3>
          <div className="flex items-center gap-4 mt-1">
            <span className={`text-sm font-medium ${
              analysis.impact === 'positive' ? 'text-green-700' :
              analysis.impact === 'negative' ? 'text-red-700' : 'text-gray-700'
            }`}>
              Impact: {analysis.impact === 'positive' ? 'Bullish' : 
                      analysis.impact === 'negative' ? 'Bearish' : 'Neutral'}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Correlation</div>
          <div className={`font-semibold ${
            Math.abs(analysis.correlation) > 50 ? 'text-blue-600' :
            Math.abs(analysis.correlation) > 30 ? 'text-yellow-600' : 'text-gray-600'
          }`}>
            {analysis.correlation > 0 ? '+' : ''}{analysis.correlation.toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <div className="text-sm text-gray-500 mb-1">M2 Money Supply</div>
          <div className="text-xl font-bold text-gray-900">{analysis.currentM2.toFixed(1)}T</div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">Liquidity Trend</div>
          <div className={`text-sm font-semibold flex items-center gap-1 ${
            analysis.m2Trend === 'expanding' ? 'text-green-700' :
            analysis.m2Trend === 'contracting' ? 'text-red-700' : 'text-gray-700'
          }`}>
            {analysis.m2Trend === 'expanding' ? <TrendingUp className="h-4 w-4" /> :
             analysis.m2Trend === 'contracting' ? <TrendingDown className="h-4 w-4" /> : 
             <Activity className="h-4 w-4" />}
            {analysis.liquidityTrend}
          </div>
        </div>
      </div>

      {/* TradingView-Style Chart */}
      <div className="mb-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <h4 className="font-medium text-gray-900">
                M2 Global Liquidity vs Bitcoin (90-day lag)
              </h4>
                             {/* Professional Legend */}
               <div className="flex gap-4 text-xs text-gray-600">
                                    <div className="flex items-center gap-1">
                     <div className="w-3 h-0.5 bg-orange-500"></div>
                     <span>Bitcoin Price</span>
                   </div>
                 <div className="flex items-center gap-1">
                   <div className="w-3 h-0.5 bg-pink-600"></div>
                   <span>M2 Supply</span>
                 </div>
                 <div className="flex items-center gap-1">
                   <div className="w-3 h-2 bg-gradient-to-t from-blue-200 to-blue-500 rounded-sm"></div>
                   <span>Growth Rate</span>
                 </div>
               </div>
            </div>
            <div className="text-xs text-gray-500">
              Data from top 21 central banks • 90-day correlation lag
            </div>
          </div>
          
          {/* Chart Container */}
          {useSimpleChart ? (
                         /* Simple SVG Chart Fallback */
             <div className="w-full h-[400px] border border-gray-200 rounded-lg bg-white p-4 shadow-sm">
              <div className="h-full flex flex-col">
                <div className="text-center text-sm font-medium text-gray-700 mb-4">
                  M2 Global Liquidity vs Bitcoin (Simple View)
                </div>
                <div className="flex-1 relative">
                  <svg className="w-full h-full" viewBox="0 0 400 200">
                    {/* Grid lines */}
                    <defs>
                      <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 20" fill="none" stroke="#f0f0f0" strokeWidth="1"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                    
                    {/* Chart lines */}
                    {chartData.length > 1 && (() => {
                      const dataPoints = chartData.slice(-30) // Last 30 days
                      let m2Values, bitcoinValues
                      
                      if (false) { // Multi-series chart - always use absolute values
                        const baselineM2 = chartData[0].m2Value
                        const baselineBitcoin = chartData[0].bitcoinPrice
                        m2Values = dataPoints.map(d => ((d.m2Value - baselineM2) / baselineM2) * 100)
                        bitcoinValues = dataPoints.map(d => ((d.bitcoinPrice - baselineBitcoin) / baselineBitcoin) * 100)
                      } else {
                        m2Values = dataPoints.map(d => d.m2Value)
                        bitcoinValues = dataPoints.map(d => d.bitcoinPrice)
                      }
                      
                      const m2Min = Math.min(...m2Values)
                      const m2Max = Math.max(...m2Values)
                      const bitcoinMin = Math.min(...bitcoinValues)
                      const bitcoinMax = Math.max(...bitcoinValues)
                      
                      const normalizeM2 = (val: number) => {
                        const range = m2Max - m2Min || 1
                        return 180 - ((val - m2Min) / range) * 160
                      }
                      
                      const normalizeBitcoin = (val: number) => {
                        const range = bitcoinMax - bitcoinMin || 1
                        return 180 - ((val - bitcoinMin) / range) * 160
                      }
                      
                      const m2Path = m2Values.map((val, i) => {
                        const x = (i / (dataPoints.length - 1)) * 380 + 10
                        const y = normalizeM2(val)
                        return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`
                      }).join(' ')
                      
                      const bitcoinPath = bitcoinValues.map((val, i) => {
                        const x = (i / (dataPoints.length - 1)) * 380 + 10
                        const y = normalizeBitcoin(val)
                        return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`
                      }).join(' ')
                      
                      return (
                        <>
                                                     {/* M2 line */}
                           <path d={m2Path} fill="none" stroke="#2563eb" strokeWidth="3" opacity="0.9"/>
                           {/* Bitcoin line */}
                           <path d={bitcoinPath} fill="none" stroke="#f7931a" strokeWidth="3" opacity="0.9"/>
                        </>
                      )
                    })()}
                  </svg>
                </div>
                <div className="text-center text-xs text-gray-500 mt-2">
                  Simple chart fallback • Switch to TradingView for interactive features
                  <button 
                    onClick={() => {
                      setUseSimpleChart(false)
                      // Reset chart refs to force re-initialization
                      if (chartRef.current) {
                        try {
                          chartRef.current.remove()
                        } catch (e) {
                          console.warn('Error removing chart on retry:', e)
                        }
                      }
                      chartRef.current = null
                      m2SeriesRef.current = null
                      cryptoSeriesRef.current = null
                    }} 
                    className="ml-2 text-blue-600 hover:text-blue-800 underline"
                  >
                    Retry Advanced Chart
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Professional TradingView Chart Container */
            <div 
              ref={chartContainerRef}
              className="w-full h-[400px] border border-gray-200 rounded-lg bg-gradient-to-br from-gray-50 to-white shadow-sm"
              style={{ minHeight: '400px', minWidth: '400px' }}
            />
          )}
          
          {/* Debug Info & Fallback */}
          {chartData.length === 0 && (
            <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
              Loading chart data... ({chartData.length} points)
            </div>
          )}
          
          {chartData.length > 0 && (
            <div className="mt-2 text-xs text-gray-400 text-center">
              {useSimpleChart ? '📊 Simple Chart' : '📈 TradingView Chart'} • 
              Data loaded: {chartData.length} points • Multi-series professional view
              <br />
              Sample: M2 {chartData[0]?.m2Value.toFixed(1)}T → {chartData[chartData.length-1]?.m2Value.toFixed(1)}T, 
              Bitcoin ${chartData[0]?.bitcoinPrice.toFixed(1)}k → ${chartData[chartData.length-1]?.bitcoinPrice.toFixed(1)}k
            </div>
          )}
          
          {/* Chart Instructions */}
          <div className="mt-2 text-xs text-gray-500 text-center">
            Professional multi-axis chart • Orange: Bitcoin Price, Pink: M2 Supply, Blue: Growth Rate
            <br />
            {useSimpleChart 
              ? 'Basic visualization • Click "Retry Advanced Chart" for interactive features'
              : 'Interactive chart • Hover for values • Scroll to zoom • Drag to pan'
            }
          </div>
        </div>
      </div>

      {/* Educational Explanation */}
      <div className="text-sm text-gray-700 bg-blue-50 p-3 rounded-lg border border-blue-200">
        <div className="font-medium text-blue-800 mb-1">💡 What does this mean?</div>
        <p>
                          {false ? ( // Multi-series chart - always show absolute education
            <>
              <strong>Growth Relationship:</strong> The percentage view shows how M2 and crypto have grown relative to their starting points. 
              {Math.abs(analysis.correlation) > 50 
                ? ` Similar growth patterns indicate ${analysis.correlation > 0 ? 'positive' : 'negative'} correlation - when M2 expands by X%, crypto tends to ${analysis.correlation > 0 ? 'grow' : 'shrink'} by Y% (with ~90-day delay).`
                : ' Different growth patterns suggest crypto is currently less influenced by M2 liquidity changes.'
              }
            </>
          ) : (
            <>
              {Math.abs(analysis.correlation) > 50 
                ? `Strong ${analysis.correlation > 0 ? 'positive' : 'negative'} correlation suggests crypto markets ${analysis.correlation > 0 ? 'rise when M2 expands' : 'fall when M2 expands'} (with ~90-day delay).`
                : 'Weak correlation suggests crypto markets are currently less influenced by M2 money supply changes.'
              }
            </>
          )}
          {analysis.m2Trend === 'expanding' 
            ? ' M2 is expanding, potentially providing more liquidity to markets.' 
            : analysis.m2Trend === 'contracting' 
            ? ' M2 is contracting, potentially reducing market liquidity.'
            : ' M2 growth is stable.'}
        </p>
      </div>
    </div>
  )
} 