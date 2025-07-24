'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ArrowLeft, TrendingUp, TrendingDown, Repeat, AlertTriangle, DollarSign, Target, Clock, Trophy, Zap, ArrowUpDown, ArrowRight, Settings, RefreshCw, BarChart3 } from 'lucide-react'

interface Token {
  id: string
  symbol: string
  name: string
  price: number
  change24h: number
  logo: string
  balance: number
  totalValue: number
}

interface Trade {
  id: string
  timestamp: number
  fromToken: string
  toToken: string
  fromAmount: number
  toAmount: number
  slippage: number
  fees: number
  priceImpact: number
  type: 'swap' | 'limit'
}

interface PriceHistory {
  timestamp: number
  price: number
}

export default function DeFiTradingSimulator() {
  const [selectedFromToken, setSelectedFromToken] = useState<string>('ETH')
  const [selectedToToken, setSelectedToToken] = useState<string>('USDC')
  const [fromAmount, setFromAmount] = useState<string>('')
  const [toAmount, setToAmount] = useState<string>('')
  const [slippageTolerance, setSlippageTolerance] = useState<number>(0.5)
  const [portfolioValue, setPortfolioValue] = useState<number>(10000)
  const [trades, setTrades] = useState<Trade[]>([])
  const [showSettings, setShowSettings] = useState<boolean>(false)
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [priceUpdateInterval, setPriceUpdateInterval] = useState<NodeJS.Timeout | null>(null)

  const [tokens, setTokens] = useState<Token[]>([
    {
      id: 'eth',
      symbol: 'ETH',
      name: 'Ethereum',
      price: 2500,
      change24h: 2.5,
      logo: '⟠',
      balance: 2.0,
      totalValue: 5000
    },
    {
      id: 'usdc',
      symbol: 'USDC',
      name: 'USD Coin',
      price: 1.00,
      change24h: 0.1,
      logo: '⊕',
      balance: 5000,
      totalValue: 5000
    },
    {
      id: 'uni',
      symbol: 'UNI',
      name: 'Uniswap',
      price: 25,
      change24h: -1.2,
      logo: '🦄',
      balance: 20,
      totalValue: 500
    },
    {
      id: 'aave',
      symbol: 'AAVE',
      name: 'Aave',
      price: 150,
      change24h: 5.8,
      logo: '👻',
      balance: 3,
      totalValue: 450
    },
    {
      id: 'link',
      symbol: 'LINK',
      name: 'Chainlink',
      price: 15,
      change24h: -2.1,
      logo: '🔗',
      balance: 0,
      totalValue: 0
    }
  ])

  // Simulate realistic price movements
  const updatePrices = useCallback(() => {
    setTokens(prevTokens => 
      prevTokens.map(token => {
        const volatility = token.symbol === 'USDC' ? 0.001 : 0.02
        const randomChange = (Math.random() - 0.5) * volatility
        const newPrice = Math.max(0.01, token.price * (1 + randomChange))
        const newChange = ((newPrice - token.price) / token.price) * 100
        
        return {
          ...token,
          price: Number(newPrice.toFixed(token.symbol === 'USDC' ? 4 : 2)),
          change24h: Number((token.change24h + newChange).toFixed(2)),
          totalValue: Number((token.balance * newPrice).toFixed(2))
        }
      })
    )
  }, [])

  useEffect(() => {
    const interval = setInterval(updatePrices, 3000) // Update every 3 seconds
    setPriceUpdateInterval(interval)
    return () => clearInterval(interval)
  }, [updatePrices])

  const calculateOutputAmount = (inputAmount: number, fromToken: Token, toToken: Token) => {
    if (!inputAmount || inputAmount <= 0) return 0
    
    // Simulate AMM pricing with slippage
    const priceRatio = fromToken.price / toToken.price
    const baseOutput = inputAmount * priceRatio
    
    // Price impact based on trade size (larger trades = more impact)
    const priceImpact = Math.min(inputAmount / 10000, 0.05) // Max 5% impact
    const slippageAdjustment = (slippageTolerance / 100) + priceImpact
    
    return baseOutput * (1 - slippageAdjustment)
  }

  const calculateFees = (inputAmount: number, fromToken: Token) => {
    const baseFeeBps = 30 // 0.3% like Uniswap
    return (inputAmount * fromToken.price * baseFeeBps) / 10000
  }

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value)
    const numValue = parseFloat(value)
    if (numValue && !isNaN(numValue)) {
      const fromToken = tokens.find(t => t.symbol === selectedFromToken)!
      const toToken = tokens.find(t => t.symbol === selectedToToken)!
      const output = calculateOutputAmount(numValue, fromToken, toToken)
      setToAmount(output.toFixed(6))
    } else {
      setToAmount('')
    }
  }

  const handleSwapTokens = () => {
    const temp = selectedFromToken
    setSelectedFromToken(selectedToToken)
    setSelectedToToken(temp)
    setFromAmount('')
    setToAmount('')
  }

  const executeTrade = () => {
    const fromAmountNum = parseFloat(fromAmount)
    const toAmountNum = parseFloat(toAmount)
    
    if (!fromAmountNum || !toAmountNum) return

    const fromToken = tokens.find(t => t.symbol === selectedFromToken)!
    const toToken = tokens.find(t => t.symbol === selectedToToken)!
    
    if (fromToken.balance < fromAmountNum) {
      alert(`Insufficient ${fromToken.symbol} balance!`)
      return
    }

    const fees = calculateFees(fromAmountNum, fromToken)
    const priceImpact = Math.min(fromAmountNum / 10000, 0.05) * 100

    // Create trade record
    const newTrade: Trade = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      fromToken: fromToken.symbol,
      toToken: toToken.symbol,
      fromAmount: fromAmountNum,
      toAmount: toAmountNum,
      slippage: slippageTolerance,
      fees,
      priceImpact,
      type: 'swap'
    }

    // Update token balances
    setTokens(prevTokens => 
      prevTokens.map(token => {
        if (token.symbol === fromToken.symbol) {
          const newBalance = token.balance - fromAmountNum
          return {
            ...token,
            balance: Number(newBalance.toFixed(6)),
            totalValue: Number((newBalance * token.price).toFixed(2))
          }
        }
        if (token.symbol === toToken.symbol) {
          const newBalance = token.balance + toAmountNum
          return {
            ...token,
            balance: Number(newBalance.toFixed(6)),
            totalValue: Number((newBalance * token.price).toFixed(2))
          }
        }
        return token
      })
    )

    setTrades(prev => [newTrade, ...prev])
    setFromAmount('')
    setToAmount('')
    
    // Save to localStorage
    localStorage.setItem('defi-simulator-trades', JSON.stringify([newTrade, ...trades]))
  }

  // Load trades from localStorage on mount
  useEffect(() => {
    const savedTrades = localStorage.getItem('defi-simulator-trades')
    if (savedTrades) {
      setTrades(JSON.parse(savedTrades))
    }
  }, [])

  // Calculate total portfolio value
  useEffect(() => {
    const totalValue = tokens.reduce((sum, token) => sum + token.totalValue, 0)
    setPortfolioValue(totalValue)
  }, [tokens])

  const fromToken = tokens.find(t => t.symbol === selectedFromToken)!
  const toToken = tokens.find(t => t.symbol === selectedToToken)!
  const canTrade = fromAmount && toAmount && parseFloat(fromAmount) <= fromToken.balance
  const fees = fromAmount ? calculateFees(parseFloat(fromAmount), fromToken) : 0
  const priceImpact = fromAmount ? Math.min(parseFloat(fromAmount) / 10000, 0.05) * 100 : 0

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          
          {/* Header */}
          <div className="flex items-center justify-between">
            <Link
              href="/education/simulators"
              className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Simulators
            </Link>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Portfolio Value: <span className="font-semibold text-green-600">${portfolioValue.toLocaleString()}</span>
              </div>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">DeFi Trading Simulator</h1>
                <p className="text-gray-600 mt-2">
                  Practice DeFi trading with realistic market conditions and no financial risk
                </p>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-600">Live Prices</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Trading Interface */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Swap Interface */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Swap Tokens</h2>
                  
                  {/* From Token */}
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">From</span>
                        <span className="text-sm text-gray-600">
                          Balance: {fromToken.balance.toFixed(6)} {fromToken.symbol}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <select
                          value={selectedFromToken}
                          onChange={(e) => setSelectedFromToken(e.target.value)}
                          className="flex-shrink-0 text-lg font-semibold bg-transparent border-none focus:ring-0"
                        >
                          {tokens.map(token => (
                            <option key={token.id} value={token.symbol}>
                              {token.logo} {token.symbol}
                            </option>
                          ))}
                        </select>
                        <input
                          type="number"
                          placeholder="0.0"
                          value={fromAmount}
                          onChange={(e) => handleFromAmountChange(e.target.value)}
                          className="flex-1 text-xl font-semibold bg-transparent border-none focus:ring-0 text-right"
                        />
                      </div>
                      <div className="text-right text-sm text-gray-500 mt-1">
                        ≈ ${fromAmount ? (parseFloat(fromAmount) * fromToken.price).toFixed(2) : '0.00'}
                      </div>
                    </div>

                    {/* Swap Button */}
                    <div className="flex justify-center">
                      <button
                        onClick={handleSwapTokens}
                        className="p-2 bg-blue-100 hover:bg-blue-200 rounded-full transition-colors"
                      >
                        <ArrowUpDown className="w-5 h-5 text-blue-600" />
                      </button>
                    </div>

                    {/* To Token */}
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">To</span>
                        <span className="text-sm text-gray-600">
                          Balance: {toToken.balance.toFixed(6)} {toToken.symbol}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <select
                          value={selectedToToken}
                          onChange={(e) => setSelectedToToken(e.target.value)}
                          className="flex-shrink-0 text-lg font-semibold bg-transparent border-none focus:ring-0"
                        >
                          {tokens.map(token => (
                            <option key={token.id} value={token.symbol}>
                              {token.logo} {token.symbol}
                            </option>
                          ))}
                        </select>
                        <input
                          type="text"
                          placeholder="0.0"
                          value={toAmount}
                          readOnly
                          className="flex-1 text-xl font-semibold bg-transparent border-none focus:ring-0 text-right text-gray-600"
                        />
                      </div>
                      <div className="text-right text-sm text-gray-500 mt-1">
                        ≈ ${toAmount ? (parseFloat(toAmount) * toToken.price).toFixed(2) : '0.00'}
                      </div>
                    </div>
                  </div>

                  {/* Trade Details */}
                  {fromAmount && toAmount && (
                    <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Price Impact:</span>
                          <span className={priceImpact > 2 ? 'text-red-600' : 'text-gray-900'}>
                            {priceImpact.toFixed(3)}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Trading Fee:</span>
                          <span className="text-gray-900">${fees.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Slippage Tolerance:</span>
                          <span className="text-gray-900">{slippageTolerance}%</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Swap Button */}
                  <button
                    onClick={executeTrade}
                    disabled={!canTrade}
                    className={`w-full mt-4 py-3 px-4 rounded-lg font-semibold transition-colors ${
                      canTrade
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {!fromAmount ? 'Enter Amount' : 
                     parseFloat(fromAmount) > fromToken.balance ? 'Insufficient Balance' :
                     'Swap Tokens'}
                  </button>
                </div>

                {/* Trading History */}
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Trades</h3>
                  {trades.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No trades yet. Make your first swap above!</p>
                  ) : (
                    <div className="space-y-3">
                      {trades.slice(0, 5).map((trade) => (
                        <div key={trade.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <ArrowRight className="w-4 h-4 text-gray-400" />
                            <div>
                              <div className="text-sm font-medium">
                                {trade.fromAmount.toFixed(4)} {trade.fromToken} → {trade.toAmount.toFixed(4)} {trade.toToken}
                              </div>
                              <div className="text-xs text-gray-500">
                                {new Date(trade.timestamp).toLocaleString()}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-600">
                              Fee: ${trade.fees.toFixed(2)}
                            </div>
                            <div className="text-xs text-gray-500">
                              Impact: {trade.priceImpact.toFixed(2)}%
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Portfolio & Market Data */}
              <div className="space-y-6">
                
                {/* Portfolio Overview */}
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio</h3>
                  <div className="space-y-3">
                    {tokens.map((token) => (
                      <div key={token.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">{token.logo}</span>
                          <div>
                            <div className="font-medium text-gray-900">{token.symbol}</div>
                            <div className="text-sm text-gray-500">{token.balance.toFixed(4)}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-gray-900">
                            ${token.totalValue.toFixed(2)}
                          </div>
                          <div className={`text-sm ${
                            token.change24h >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Market Prices */}
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Prices</h3>
                  <div className="space-y-3">
                    {tokens.map((token) => (
                      <div key={token.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">{token.logo}</span>
                          <span className="font-medium text-gray-900">{token.symbol}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-gray-900">
                            ${token.price.toFixed(token.symbol === 'USDC' ? 4 : 2)}
                          </div>
                          <div className={`text-sm flex items-center ${
                            token.change24h >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {token.change24h >= 0 ? 
                              <TrendingUp className="w-3 h-3 mr-1" /> : 
                              <TrendingDown className="w-3 h-3 mr-1" />
                            }
                            {Math.abs(token.change24h).toFixed(2)}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Learning Tips */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-900 mb-3">💡 Trading Tips</h3>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li>• Higher slippage tolerance = less chance of failed trades</li>
                    <li>• Large trades create more price impact</li>
                    <li>• DEX fees are typically 0.3% of trade value</li>
                    <li>• Watch for price movements in real-time</li>
                    <li>• Practice with small amounts first</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 