// Technical Analysis Indicators Library
// Implements RSI and MACD according to specifications

export interface PriceData {
  timestamp: string
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export interface RSIResult {
  value: number
  signal: 'oversold' | 'overbought' | 'neutral'
  timestamp: string
}

export interface MACDResult {
  macd: number
  signal: number
  histogram: number
  crossover: 'bullish' | 'bearish' | 'none'
  timestamp: string
}

export interface CTOResult {
  value: number
  signal: 'bullish' | 'bearish' | 'neutral'
  crossover: 'bullish' | 'bearish' | 'none'
  timestamp: string
}

export interface BullMarketPeakResult {
  signal: 'peak-warning' | 'peak-danger' | 'no-peak-signal'
  confidence: 'low' | 'medium' | 'high'
  indicators: {
    extremeRSI: boolean // RSI > 90
    piCycleSignal: boolean // Modified Pi Cycle for shorter timeframes
    volumeDivergence: boolean // Declining volume on price highs
    momentumDivergence: boolean // RSI making lower highs while price makes higher highs
  }
  score: number // 0-4 based on how many indicators are triggered
  message: string
  timestamp: string
}

export interface TradingSignal {
  type: 'buy' | 'sell' | 'hold'
  strength: number // 0-100
  reason: string
  timestamp: string
  rsi: number
  macd: MACDResult
}

/**
 * Calculates RSI (Relative Strength Index)
 * @param prices Array of closing prices
 * @param period RSI period (default 14)
 * @returns RSI values
 */
export function calculateRSI(prices: number[], period: number = 14): number[] {
  if (prices.length < period + 1) return []
  
  const rsiValues: number[] = []
  
  // Calculate first RS value
  let gains = 0
  let losses = 0
  
  for (let i = 1; i <= period; i++) {
    const change = prices[i] - prices[i - 1]
    if (change > 0) {
      gains += change
    } else {
      losses += Math.abs(change)
    }
  }
  
  let avgGain = gains / period
  let avgLoss = losses / period
  
  // First RSI value
  let rs = avgGain / avgLoss
  let rsi = 100 - (100 / (1 + rs))
  rsiValues.push(rsi)
  
  // Calculate remaining RSI values with Wilders smoothing
  for (let i = period + 1; i < prices.length; i++) {
    const change = prices[i] - prices[i - 1]
    const gain = change > 0 ? change : 0
    const loss = change < 0 ? Math.abs(change) : 0
    
    avgGain = (avgGain * (period - 1) + gain) / period
    avgLoss = (avgLoss * (period - 1) + loss) / period
    
    rs = avgGain / avgLoss
    rsi = 100 - (100 / (1 + rs))
    rsiValues.push(rsi)
  }
  
  return rsiValues
}

/**
 * Calculates EMA (Exponential Moving Average)
 * @param prices Array of prices
 * @param period EMA period
 * @returns EMA values
 */
export function calculateEMA(prices: number[], period: number): number[] {
  if (prices.length < period) return []
  
  const emaValues: number[] = []
  const multiplier = 2 / (period + 1)
  
  // First EMA is SMA
  let sum = 0
  for (let i = 0; i < period; i++) {
    sum += prices[i]
  }
  let ema = sum / period
  emaValues.push(ema)
  
  // Calculate remaining EMA values
  for (let i = period; i < prices.length; i++) {
    ema = (prices[i] - ema) * multiplier + ema
    emaValues.push(ema)
  }
  
  return emaValues
}

/**
 * Calculates WMA (Weighted Moving Average)
 * @param values Array of values
 * @param period WMA period
 * @returns WMA values
 */
export function calculateWMA(values: number[], period: number): number[] {
  if (values.length < period) return []
  
  const wmaValues: number[] = []
  const weights = []
  for (let i = 1; i <= period; i++) {
    weights.push(i)
  }
  const weightSum = weights.reduce((sum, weight) => sum + weight, 0)
  
  for (let i = period - 1; i < values.length; i++) {
    let weightedSum = 0
    for (let j = 0; j < period; j++) {
      weightedSum += values[i - j] * weights[period - 1 - j]
    }
    wmaValues.push(weightedSum / weightSum)
  }
  
  return wmaValues
}

/**
 * Calculates Rate of Change (ROC)
 * @param prices Array of prices
 * @param period ROC period
 * @returns ROC values as percentages
 */
export function calculateROC(prices: number[], period: number): number[] {
  if (prices.length <= period) return []
  
  const rocValues: number[] = []
  
  for (let i = period; i < prices.length; i++) {
    const currentPrice = prices[i]
    const pastPrice = prices[i - period]
    const roc = ((currentPrice - pastPrice) / pastPrice) * 100
    rocValues.push(roc)
  }
  
  return rocValues
}

/**
 * Calculates SMMA (Smoothed Moving Average)
 * @param values Array of values
 * @param period Period length
 * @returns SMMA values
 */
function calculateSMMA(values: number[], period: number): number[] {
  if (values.length < period) return []
  
  const results: number[] = []
  
  // First value is SMA
  let sum = 0
  for (let i = 0; i < period; i++) {
    sum += values[i]
  }
  let smma = sum / period
  results.push(smma)
  
  // Subsequent values use SMMA formula: (smma[1] * (length - 1) + src) / length
  for (let i = period; i < values.length; i++) {
    smma = (smma * (period - 1) + values[i]) / period
    results.push(smma)
  }
  
  return results
}

/**
 * Calculates CTO Line (Custom Trend Oscillator) - Your original Pine Script logic
 * @param prices Array of price data
 * @returns CTO results with signals
 */
export function calculateCTO(prices: number[]): CTOResult[] {
  if (prices.length < 29) return [] // Need at least 29 periods for longest SMMA
  
  // Calculate HL2 (high + low) / 2 for each price
  const hl2Values: number[] = []
  for (let i = 0; i < prices.length; i++) {
    // For simple prices array, assume high = low = price (crypto API typically gives closes)
    const price = prices[i]
    // Generate mock high/low based on price (±1% variation)
    const variation = price * 0.01 * (Math.sin(i * 0.1) * 0.5 + 0.5)
    const high = price + variation
    const low = price - variation
    hl2Values.push((high + low) / 2)
  }
  
  // Calculate SMMA values with different periods
  const v1 = calculateSMMA(hl2Values, 15) // smma(hl2, 15)
  const m1 = calculateSMMA(hl2Values, 19) // smma(hl2, 19)  
  const m2 = calculateSMMA(hl2Values, 25) // smma(hl2, 25)
  const v2 = calculateSMMA(hl2Values, 29) // smma(hl2, 29)
  
  const results: CTOResult[] = []
  const minLength = Math.min(v1.length, m1.length, m2.length, v2.length)
  
  for (let i = 0; i < minLength; i++) {
    const v1Val = v1[v1.length - minLength + i]
    const m1Val = m1[m1.length - minLength + i]
    const m2Val = m2[m2.length - minLength + i]
    const v2Val = v2[v2.length - minLength + i]
    
    // Your exact Pine Script logic:
    // p2 = v1 < m1 != v1 < v2 or m2 < v2 != v1 < v2
    const cond1 = (v1Val < m1Val) !== (v1Val < v2Val)
    const cond2 = (m2Val < v2Val) !== (v1Val < v2Val)
    const p2 = cond1 || cond2
    
    // p3 = not p2 and v1 < v2
    const p3 = !p2 && (v1Val < v2Val)
    
    // p1 = not p2 and not p3
    const p1 = !p2 && !p3
    
    // Determine signal based on your color logic:
    // c = p1 ? color.orange : p2 ? color.silver : color.navy
    let signal: 'bullish' | 'bearish' | 'neutral'
    if (p1) {
      signal = 'bullish' // orange
    } else if (p2) {
      signal = 'neutral' // silver  
    } else {
      signal = 'bearish' // navy (p3)
    }
    
    // Calculate a representative value (difference between v1 and v2)
    const value = v1Val - v2Val
    
    // Detect crossovers (signal changes)
    let crossover: 'bullish' | 'bearish' | 'none' = 'none'
    if (i > 0) {
      const prevSignal = results[i - 1].signal
      if (prevSignal !== 'bullish' && signal === 'bullish') {
        crossover = 'bullish'
      } else if (prevSignal !== 'bearish' && signal === 'bearish') {
        crossover = 'bearish'
      }
    }
    
    results.push({
      value,
      signal,
      crossover,
      timestamp: new Date(Date.now() - (results.length * 1000 * 60 * 60)).toISOString()
    })
  }
  
  return results
}

/**
 * Calculates MACD with custom settings (8, 21, 5)
 * @param prices Array of closing prices
 * @param fastPeriod Fast EMA period (8)
 * @param slowPeriod Slow EMA period (21) 
 * @param signalPeriod Signal line EMA period (5)
 * @returns MACD data
 */
export function calculateMACD(
  prices: number[], 
  fastPeriod: number = 8, 
  slowPeriod: number = 21, 
  signalPeriod: number = 5
): MACDResult[] {
  if (prices.length < slowPeriod) return []
  
  const fastEMA = calculateEMA(prices, fastPeriod)
  const slowEMA = calculateEMA(prices, slowPeriod)
  
  if (fastEMA.length === 0 || slowEMA.length === 0) return []
  
  // Calculate MACD line (fast EMA - slow EMA)
  const macdLine: number[] = []
  const startIndex = slowPeriod - fastPeriod
  
  for (let i = 0; i < slowEMA.length; i++) {
    const fastValue = fastEMA[i + startIndex]
    const slowValue = slowEMA[i]
    macdLine.push(fastValue - slowValue)
  }
  
  // Calculate Signal line (EMA of MACD line)
  const signalLine = calculateEMA(macdLine, signalPeriod)
  
  // Create MACD results with crossover detection
  const results: MACDResult[] = []
  
  for (let i = signalPeriod - 1; i < macdLine.length; i++) {
    const macdValue = macdLine[i]
    const signalValue = signalLine[i - signalPeriod + 1]
    const histogram = macdValue - signalValue
    
    // Detect crossover
    let crossover: 'bullish' | 'bearish' | 'none' = 'none'
    if (i > signalPeriod - 1) {
      const prevMacd = macdLine[i - 1]
      const prevSignal = signalLine[i - signalPeriod]
      
      if (prevMacd <= prevSignal && macdValue > signalValue) {
        crossover = 'bullish' // MACD crosses above signal (buy)
      } else if (prevMacd >= prevSignal && macdValue < signalValue) {
        crossover = 'bearish' // MACD crosses below signal (sell)
      }
    }
    
    results.push({
      macd: macdValue,
      signal: signalValue,
      histogram,
      crossover,
      timestamp: new Date(Date.now() - (results.length * 1000 * 60 * 60)).toISOString()
    })
  }
  
  return results
}

/**
 * Generates trading signals based on RSI + MACD
 * Rules: Buy when MACD crosses over and RSI has touched 30
 * Sell when MACD crosses under
 */
export function generateTradingSignals(
  prices: number[],
  timestamps: string[] = []
): TradingSignal[] {
  const rsiValues = calculateRSI(prices)
  const macdData = calculateMACD(prices, 8, 21, 5)
  
  if (rsiValues.length === 0 || macdData.length === 0) return []
  
  const signals: TradingSignal[] = []
  const rsiStartIndex = prices.length - rsiValues.length
  
  // Track if RSI has been under 30 recently (for buy signal)
  let recentlyOversold = false
  
  for (let i = 0; i < macdData.length; i++) {
    const macd = macdData[i]
    const rsiIndex = rsiStartIndex + i
    
    if (rsiIndex >= rsiValues.length) continue
    
    const rsi = rsiValues[rsiIndex - rsiStartIndex]
    
    // Track if RSI has been oversold
    if (rsi <= 30) {
      recentlyOversold = true
    }
    
    let signal: TradingSignal | null = null
    
    // Buy signal: MACD bullish crossover AND RSI has touched 30
    if (macd.crossover === 'bullish' && recentlyOversold) {
      signal = {
        type: 'buy',
        strength: Math.min(100, 70 + (30 - Math.min(rsi, 30)) + Math.max(0, macd.histogram * 10)),
        reason: `MACD bullish crossover (${macd.macd.toFixed(3)}) + RSI recovery from oversold (${rsi.toFixed(1)})`,
        timestamp: timestamps[i] || macd.timestamp,
        rsi,
        macd
      }
      recentlyOversold = false // Reset after buy signal
    }
    
    // Sell signal: MACD bearish crossover
    else if (macd.crossover === 'bearish') {
      signal = {
        type: 'sell',
        strength: Math.min(100, 60 + Math.max(0, Math.abs(macd.histogram) * 10)),
        reason: `MACD bearish crossover (${macd.macd.toFixed(3)})`,
        timestamp: timestamps[i] || macd.timestamp,
        rsi,
        macd
      }
    }
    
    // Hold signal for other cases
    else {
      signal = {
        type: 'hold',
        strength: 50,
        reason: `RSI: ${rsi.toFixed(1)}, MACD: ${macd.macd.toFixed(3)}`,
        timestamp: timestamps[i] || macd.timestamp,
        rsi,
        macd
      }
    }
    
    if (signal) {
      signals.push(signal)
    }
  }
  
  return signals
}

/**
 * Analyzes latest trading signal
 */
export function getLatestSignal(signals: TradingSignal[]): TradingSignal | null {
  if (signals.length === 0) return null
  return signals[signals.length - 1]
}

/**
 * Counts buy/sell signals for statistics
 */
export function getSignalStats(signals: TradingSignal[]) {
  const buySignals = signals.filter(s => s.type === 'buy').length
  const sellSignals = signals.filter(s => s.type === 'sell').length
  const holdSignals = signals.filter(s => s.type === 'hold').length
  
  return {
    total: signals.length,
    buy: buySignals,
    sell: sellSignals,
    hold: holdSignals,
    accuracy: signals.length > 0 ? ((buySignals + sellSignals) / signals.length * 100).toFixed(1) : '0'
  }
} 