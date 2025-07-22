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
  const baseIndex = slowPeriod - 1
  
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