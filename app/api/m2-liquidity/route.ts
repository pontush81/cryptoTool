import { NextResponse } from 'next/server'

export interface M2DataPoint {
  date: string
  m2Value: number // in trillions USD
  bitcoinPrice: number // in USD (lagged by 90 days)
  growthRate: number // M2 YoY growth rate percentage
  timestamp: string
}

export interface M2LiquidityResponse {
  currentM2: number
  m2Trend: 'expanding' | 'contracting' | 'neutral'
  correlation: number
  impact: 'bullish' | 'bearish' | 'neutral'
  liquidityTrend: string
  historicalData: M2DataPoint[]
  confidence: number
  lagDays: number
}

// Top 21 central banks M2 data (in local currency billions)
// This would normally come from real APIs, but using realistic mock data for demonstration
const centralBankM2Data = {
  'USD': { current: 21500, growth: 6.2 }, // Federal Reserve (US)
  'EUR': { current: 15800, growth: 4.1 }, // ECB (Eurozone)
  'JPY': { current: 1450000, growth: 2.8 }, // Bank of Japan
  'CNY': { current: 285000, growth: 8.9 }, // People's Bank of China
  'GBP': { current: 2850, growth: 5.3 }, // Bank of England
  'CAD': { current: 2100, growth: 7.1 }, // Bank of Canada
  'AUD': { current: 2450, growth: 6.8 }, // Reserve Bank of Australia
  'CHF': { current: 850, growth: 3.2 }, // Swiss National Bank
  'SEK': { current: 3200, growth: 4.9 }, // Sveriges Riksbank
  'NOK': { current: 2800, growth: 5.1 }, // Norges Bank
  'DKK': { current: 1900, growth: 4.3 }, // Danmarks Nationalbank
  'NZD': { current: 380, growth: 6.2 }, // Reserve Bank of New Zealand
  'SGD': { current: 720, growth: 5.8 }, // Monetary Authority of Singapore
  'HKD': { current: 8200, growth: 4.7 }, // Hong Kong Monetary Authority
  'KRW': { current: 3800000, growth: 7.3 }, // Bank of Korea
  'TWD': { current: 52000, growth: 6.1 }, // Central Bank of Taiwan
  'THB': { current: 18500, growth: 5.9 }, // Bank of Thailand
  'MXN': { current: 12500, growth: 8.2 }, // Bank of Mexico
  'BRL': { current: 4200, growth: 9.1 }, // Central Bank of Brazil
  'INR': { current: 225000, growth: 10.2 }, // Reserve Bank of India
  'ZAR': { current: 4800, growth: 7.8 }  // South African Reserve Bank
}

// Current exchange rates to USD (normally fetched from live API)
const exchangeRates = {
  'USD': 1.0,
  'EUR': 1.09,
  'JPY': 0.0067,
  'CNY': 0.14,
  'GBP': 1.27,
  'CAD': 0.74,
  'AUD': 0.66,
  'CHF': 1.12,
  'SEK': 0.096,
  'NOK': 0.094,
  'DKK': 0.146,
  'NZD': 0.62,
  'SGD': 0.74,
  'HKD': 0.128,
  'KRW': 0.00076,
  'TWD': 0.031,
  'THB': 0.028,
  'MXN': 0.058,
  'BRL': 0.20,
  'INR': 0.012,
  'ZAR': 0.055
}

// Function to fetch live Bitcoin price (integrates with existing crypto API)
async function getLiveBitcoinPrice(): Promise<number> {
  try {
    // Use same CoinGecko API as the main crypto API
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd', {
      headers: {
        'Accept': 'application/json',
      },
    })
    
    if (!response.ok) {
      console.warn('⚠️ Failed to fetch live Bitcoin price, using fallback')
      return 118000 // Fallback to current approximate price
    }
    
    const data = await response.json()
    const livePrice = data?.bitcoin?.usd
    
    if (livePrice && typeof livePrice === 'number') {
      console.log(`🔄 Live Bitcoin price fetched: $${livePrice.toLocaleString()}`)
      return livePrice
    } else {
      console.warn('⚠️ Invalid Bitcoin price data, using fallback')
      return 118000
    }
    
  } catch (error) {
    console.error('❌ Error fetching live Bitcoin price:', error)
    return 118000 // Fallback price
  }
}

// Updated function that uses live Bitcoin price for current period
async function generateM2LiquidityDataWithLivePrice(years: number = 10, currentBitcoinPrice: number = 118000): Promise<M2DataPoint[]> {
  const data: M2DataPoint[] = []
  
  // Start from January 1, 2015 and go to current date (July 2025)
  const startDate = new Date('2015-01-01')
  const endDate = new Date('2025-07-22') // Current date in July 2025
  const totalDays = Math.floor((endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)) + 1
  
  // Calculate global M2 in USD trillions (baseline from 2015)
  let globalM2USD = 0
  let weightedGrowthRate = 0
  let totalWeight = 0
  
  // Aggregate M2 from all central banks (adjusted for 2015 baseline)
  Object.entries(centralBankM2Data).forEach(([currency, data]) => {
    // Scale back to 2015 levels (roughly 70% of current levels)
    const baseline2015 = (data.current * 0.7) / 1000
    const usdValue = baseline2015 * exchangeRates[currency as keyof typeof exchangeRates]
    globalM2USD += usdValue
    weightedGrowthRate += data.growth * usdValue
    totalWeight += usdValue
  })
  
  // Calculate weighted average growth rate
  const avgGrowthRate = weightedGrowthRate / totalWeight
  const baseline2015M2 = globalM2USD // ~77T USD in 2015
  
  console.log(`📊 Global M2 Baseline (2015): $${baseline2015M2.toFixed(1)}T USD, Period: 2015-2025, Days: ${totalDays}`)
  
  // Historical periods with different M2 and Bitcoin characteristics
  // NOTE: For a production system, 2025 bitcoinBase would be fetched from getLiveBitcoinPrice()
  const periods = [
    { start: 2015, end: 2017, m2Growth: 3.5, bitcoinBase: 250, bitcoinVolatility: 800, m2Correlation: -0.1 },     // Pre-bull run
    { start: 2018, end: 2019, m2Growth: 4.2, bitcoinBase: 6000, bitcoinVolatility: 4000, m2Correlation: 0.2 },   // Bear/accumulation
    { start: 2020, end: 2021, m2Growth: 12.8, bitcoinBase: 20000, bitcoinVolatility: 15000, m2Correlation: 0.7 }, // COVID QE bull run
    { start: 2022, end: 2022, m2Growth: 1.2, bitcoinBase: 30000, bitcoinVolatility: 12000, m2Correlation: -0.6 }, // QT bear market
    { start: 2023, end: 2024, m2Growth: 2.8, bitcoinBase: 35000, bitcoinVolatility: 10000, m2Correlation: 0.5 },  // Recovery
    { start: 2025, end: 2025, m2Growth: 6.5, bitcoinBase: currentBitcoinPrice, bitcoinVolatility: 15000, m2Correlation: -0.8 } // Current period (Updated to ~$118k)
  ]
  
  // Generate historical data year by year
  for (let dayIndex = 0; dayIndex < totalDays; dayIndex++) {
    const currentDate = new Date(startDate.getTime() + (dayIndex * 24 * 60 * 60 * 1000))
    const year = currentDate.getFullYear()
    const dayOfYear = Math.floor((dayIndex % 365))
    
    // Find current period characteristics
    const period = periods.find(p => year >= p.start && year <= p.end) || periods[periods.length - 1]
    
    // M2 expansion with realistic periods
    const yearsFromStart = (currentDate.getTime() - startDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
    
    // Calculate M2 with different growth rates per period
    let m2Value = baseline2015M2
    let cumulativeGrowth = 1
    
    // Apply growth for each completed period
    for (const p of periods) {
      if (year > p.end) {
        const periodYears = p.end - p.start + 1
        cumulativeGrowth *= Math.pow(1 + p.m2Growth / 100, periodYears)
      } else if (year >= p.start && year <= p.end) {
        const partialYear = year - p.start + (dayOfYear / 365)
        cumulativeGrowth *= Math.pow(1 + p.m2Growth / 100, partialYear)
        break
      }
    }
    
    // Add seasonal and policy variations
    const seasonalVariation = 1 + (Math.sin(dayIndex / 30) * 0.015) // Monthly policy cycles
    const policyShocks = 1 + (Math.sin(dayIndex / 180) * 0.03) // Semi-annual QE/QT cycles
    
    m2Value = m2Value * cumulativeGrowth * seasonalVariation * policyShocks
    
    // Bitcoin price with 90-day forward lag correlation
    let bitcoinPrice: number
    const futureIndex = Math.min(dayIndex + 90, totalDays - 1) // 90-day forward lag
    const futurePeriod = periods.find(p => {
      const futureDate = new Date(startDate.getTime() + (futureIndex * 24 * 60 * 60 * 1000))
      const futureYear = futureDate.getFullYear()
      return futureYear >= p.start && futureYear <= p.end
    }) || periods[periods.length - 1]
    
    // Base Bitcoin price for the period
    bitcoinPrice = futurePeriod.bitcoinBase
    
    // Add M2 correlation effect with 90-day forward lag
    if (dayIndex >= 90) {
      const pastM2 = baseline2015M2 * Math.pow(1.04, (dayIndex - 90) / 365) // M2 value 90 days ago
      const m2Change = (m2Value - pastM2) / pastM2
      const correlationEffect = m2Change * futurePeriod.m2Correlation * bitcoinPrice * 0.8
      bitcoinPrice += correlationEffect
    }
    
    // Add volatility and trend
    const trendComponent = Math.sin(dayIndex / 100) * futurePeriod.bitcoinVolatility * 0.3
    const volatilityComponent = (Math.random() - 0.5) * futurePeriod.bitcoinVolatility * 0.6
    
    bitcoinPrice = Math.max(100, bitcoinPrice + trendComponent + volatilityComponent)
    
    // Calculate growth rate
    const growthRate = period.m2Growth + (Math.random() - 0.5) * 2 // ±1% variation
    
    data.push({
      date: currentDate.toISOString().split('T')[0],
      m2Value: parseFloat(m2Value.toFixed(2)),
      bitcoinPrice: Math.round(bitcoinPrice),
      growthRate: parseFloat(Math.max(0, growthRate).toFixed(2)),
      timestamp: currentDate.toISOString()
    })
  }
  
  return data
}

function calculateCorrelation(x: number[], y: number[]): number {
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

export async function GET() {
  try {
    console.log('🌍 Generating M2 Global Liquidity analysis with live Bitcoin data...')
    
    // Fetch live Bitcoin price for current period
    const liveBitcoinPrice = await getLiveBitcoinPrice()
    
    // Generate historical data (with live price for 2025)
    const historicalData = await generateM2LiquidityDataWithLivePrice(10, liveBitcoinPrice)
    
    // Calculate current analysis
    const recent30Days = historicalData.slice(-30)
    const previous30Days = historicalData.slice(-60, -30)
    
    const currentM2 = recent30Days[recent30Days.length - 1].m2Value
    const recentM2Avg = recent30Days.reduce((sum, d) => sum + d.m2Value, 0) / 30
    const previousM2Avg = previous30Days.reduce((sum, d) => sum + d.m2Value, 0) / 30
    
    const m2Growth = ((recentM2Avg - previousM2Avg) / previousM2Avg) * 100
    
    // Calculate 90-day lagged correlation
    const correlationWindow = historicalData.slice(-120) // Last 4 months
    const m2Values = correlationWindow.map(d => d.m2Value)
    const bitcoinValues = correlationWindow.map(d => d.bitcoinPrice)
    
    const correlation = calculateCorrelation(m2Values, bitcoinValues)
    
    // Determine trends and impact
    let m2Trend: 'expanding' | 'contracting' | 'neutral' = 'neutral'
    if (m2Growth > 1.0) m2Trend = 'expanding'
    else if (m2Growth < -0.5) m2Trend = 'contracting'
    
    let impact: 'bullish' | 'bearish' | 'neutral' = 'neutral'
    if (correlation > 0.3 && m2Trend === 'expanding') impact = 'bullish'
    else if (correlation > 0.3 && m2Trend === 'contracting') impact = 'bearish'
    else if (correlation < -0.3 && m2Trend === 'expanding') impact = 'bearish'
    else if (correlation < -0.3 && m2Trend === 'contracting') impact = 'bullish'

    const response: M2LiquidityResponse = {
      currentM2,
      m2Trend,
      correlation: correlation * 100,
      impact,
      confidence: Math.min(90, 65 + Math.abs(correlation) * 25),
      liquidityTrend: m2Trend === 'expanding' ? 'Expanding 📈' : 
                     m2Trend === 'contracting' ? 'Contracting 📉' : 'Stable ➡️',
      historicalData,
      lagDays: 90
    }

    console.log(`✅ M2 Analysis: $${currentM2.toFixed(1)}T, Live Bitcoin: $${liveBitcoinPrice.toLocaleString()}, Correlation: ${(correlation * 100).toFixed(1)}%, Impact: ${impact}`)

    return NextResponse.json({
      success: true,
      data: response,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('Error generating M2 liquidity data:', error)
    
    // Fallback data
    const fallbackData: M2LiquidityResponse = {
      currentM2: 32.8,
      m2Trend: 'expanding',
      correlation: 74.3,
      impact: 'bullish',
      confidence: 85,
      liquidityTrend: 'Expanding 📈',
      historicalData: [],
      lagDays: 90
    }

    return NextResponse.json({
      success: false,
      data: fallbackData,
      error: 'Using fallback M2 liquidity data',
      timestamp: new Date().toISOString()
    }, { status: 200 })
  }
} 