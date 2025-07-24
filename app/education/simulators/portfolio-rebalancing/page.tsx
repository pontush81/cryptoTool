'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { ArrowLeft, PieChart, TrendingUp, TrendingDown, RefreshCw, Target, AlertTriangle, BarChart3, DollarSign, Percent, Settings, Award, Shield } from 'lucide-react'

interface Asset {
  id: string
  symbol: string
  name: string
  price: number
  change24h: number
  logo: string
  currentAllocation: number
  targetAllocation: number
  currentValue: number
  targetValue: number
  rebalanceAmount: number
  volatility: number
}

interface RebalanceStrategy {
  id: string
  name: string
  description: string
  triggerThreshold: number
  frequency: number // days
  benefits: string[]
  risks: string[]
}

interface PortfolioMetrics {
  totalValue: number
  totalDeviation: number
  riskScore: number
  diversificationScore: number
  volatility: number
  sharpeRatio: number
}

export default function PortfolioRebalancingSimulator() {
  const [portfolioValue, setPortfolioValue] = useState<number>(10000)
  const [rebalanceStrategy, setRebalanceStrategy] = useState<string>('threshold')
  const [rebalanceHistory, setRebalanceHistory] = useState<any[]>([])
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false)
  const [timeElapsed, setTimeElapsed] = useState<number>(0) // days
  const [isRunning, setIsRunning] = useState<boolean>(false)

  const [assets, setAssets] = useState<Asset[]>([
    {
      id: 'btc',
      symbol: 'BTC',
      name: 'Bitcoin',
      price: 45000,
      change24h: 2.1,
      logo: '₿',
      currentAllocation: 40,
      targetAllocation: 40,
      currentValue: 4000,
      targetValue: 4000,
      rebalanceAmount: 0,
      volatility: 0.04
    },
    {
      id: 'eth',
      symbol: 'ETH',
      name: 'Ethereum',
      price: 2800,
      change24h: 3.5,
      logo: '⟠',
      currentAllocation: 30,
      targetAllocation: 30,
      currentValue: 3000,
      targetValue: 3000,
      rebalanceAmount: 0,
      volatility: 0.045
    },
    {
      id: 'ada',
      symbol: 'ADA',
      name: 'Cardano',
      price: 0.45,
      change24h: -1.2,
      logo: '₳',
      currentAllocation: 15,
      targetAllocation: 15,
      currentValue: 1500,
      targetValue: 1500,
      rebalanceAmount: 0,
      volatility: 0.05
    },
    {
      id: 'dot',
      symbol: 'DOT',
      name: 'Polkadot',
      price: 6.2,
      change24h: 4.8,
      logo: '●',
      currentAllocation: 10,
      targetAllocation: 10,
      currentValue: 1000,
      targetValue: 1000,
      rebalanceAmount: 0,
      volatility: 0.055
    },
    {
      id: 'usdc',
      symbol: 'USDC',
      name: 'USD Coin',
      price: 1.00,
      change24h: 0.0,
      logo: '⊕',
      currentAllocation: 5,
      targetAllocation: 5,
      currentValue: 500,
      targetValue: 500,
      rebalanceAmount: 0,
      volatility: 0.001
    }
  ])

  const rebalanceStrategies: RebalanceStrategy[] = [
    {
      id: 'threshold',
      name: 'Threshold Rebalancing',
      description: 'Rebalance when any asset deviates more than 5% from target',
      triggerThreshold: 5,
      frequency: 0, // triggered by threshold
      benefits: ['Responsive to market changes', 'Maintains target allocation', 'Tax-efficient'],
      risks: ['May trade too frequently', 'Market timing risk', 'Transaction costs']
    },
    {
      id: 'calendar',
      name: 'Calendar Rebalancing',
      description: 'Rebalance portfolio on a fixed schedule (monthly)',
      triggerThreshold: 0,
      frequency: 30,
      benefits: ['Disciplined approach', 'Reduced emotions', 'Predictable costs'],
      risks: ['May miss opportunities', 'Ignores market conditions', 'Rigid timing']
    },
    {
      id: 'hybrid',
      name: 'Hybrid Strategy',
      description: 'Combine threshold (10%) and calendar (quarterly) approaches',
      triggerThreshold: 10,
      frequency: 90,
      benefits: ['Balanced approach', 'Reduced overtrading', 'Flexible timing'],
      risks: ['Complex to implement', 'May delay necessary rebalancing', 'Opportunity costs']
    }
  ]

  // Simulate price movements and portfolio drift
  const simulateMarketMovement = useCallback(() => {
    setAssets(prevAssets => {
      return prevAssets.map(asset => {
        // Generate realistic price movement based on volatility
        const dailyVolatility = asset.volatility
        const randomChange = (Math.random() - 0.5) * 2 * dailyVolatility
        const trendFactor = asset.symbol === 'USDC' ? 0 : (Math.random() - 0.48) * 0.02 // Slight upward bias except stablecoins
        
        const newPrice = Math.max(0.01, asset.price * (1 + randomChange + trendFactor))
        const priceChange = ((newPrice - asset.price) / asset.price) * 100
        
        // Calculate new value while keeping quantity constant
        const quantity = asset.currentValue / asset.price
        const newValue = quantity * newPrice
        
        return {
          ...asset,
          price: Number(newPrice.toFixed(asset.symbol === 'USDC' ? 4 : 2)),
          change24h: Number(priceChange.toFixed(2)),
          currentValue: Number(newValue.toFixed(2))
        }
      })
    })
  }, [])

  // Calculate portfolio metrics without updating state inside useMemo
  const portfolioMetrics = useMemo((): PortfolioMetrics => {
    const totalValue = assets.reduce((sum, asset) => sum + asset.currentValue, 0)
    
    // Calculate current allocations based on current values
    const currentAllocations = assets.map(asset => ({
      ...asset,
      currentAllocation: totalValue > 0 ? (asset.currentValue / totalValue) * 100 : 0,
      targetValue: (asset.targetAllocation / 100) * totalValue,
      rebalanceAmount: ((asset.targetAllocation / 100) * totalValue) - asset.currentValue
    }))

    // Calculate deviation from target
    const totalDeviation = currentAllocations.reduce((sum, asset) => 
      sum + Math.abs(asset.currentAllocation - asset.targetAllocation), 0
    )

    // Risk score based on deviation and volatility
    const avgVolatility = currentAllocations.reduce((sum, asset) => 
      sum + (asset.volatility * asset.currentAllocation / 100), 0
    )
    const riskScore = Math.min(100, (totalDeviation * 2) + (avgVolatility * 1000))

    // Diversification score (higher is better)
    const herfindahlIndex = currentAllocations.reduce((sum, asset) => 
      sum + Math.pow(asset.currentAllocation / 100, 2), 0
    )
    const diversificationScore = Math.max(0, 100 - (herfindahlIndex * 100))

    return {
      totalValue,
      totalDeviation,
      riskScore,
      diversificationScore,
      volatility: avgVolatility,
      sharpeRatio: 1.5 - (riskScore / 100) // Simplified Sharpe ratio
    }
  }, [assets])

  // Separate effect to update asset calculations - only when total value changes significantly
  useEffect(() => {
    const totalValue = portfolioMetrics.totalValue
    if (totalValue > 0) {
      setAssets(prevAssets => {
        const needsUpdate = prevAssets.some(asset => {
          const newAllocation = (asset.currentValue / totalValue) * 100
          return Math.abs(newAllocation - asset.currentAllocation) > 0.01
        })
        
        if (!needsUpdate) return prevAssets
        
        return prevAssets.map(asset => ({
          ...asset,
          currentAllocation: (asset.currentValue / totalValue) * 100,
          targetValue: (asset.targetAllocation / 100) * totalValue,
          rebalanceAmount: ((asset.targetAllocation / 100) * totalValue) - asset.currentValue
        }))
      })
    }
  }, [portfolioMetrics.totalValue])

  // Check if rebalancing is needed
  const needsRebalancing = useMemo(() => {
    const strategy = rebalanceStrategies.find(s => s.id === rebalanceStrategy)!
    
    if (strategy.id === 'threshold' || strategy.id === 'hybrid') {
      return assets.some(asset => 
        Math.abs(asset.currentAllocation - asset.targetAllocation) > strategy.triggerThreshold
      )
    }
    
    if (strategy.id === 'calendar' || strategy.id === 'hybrid') {
      return timeElapsed > 0 && timeElapsed % strategy.frequency === 0
    }
    
    return false
  }, [assets, rebalanceStrategy, timeElapsed, rebalanceStrategies])

  // Execute rebalancing
  const executeRebalance = () => {
    const totalValue = portfolioMetrics.totalValue
    const rebalanceRecord = {
      timestamp: Date.now(),
      day: timeElapsed,
      beforeDeviation: portfolioMetrics.totalDeviation,
      totalValue,
      adjustments: assets.map(asset => ({
        symbol: asset.symbol,
        fromAllocation: asset.currentAllocation,
        toAllocation: asset.targetAllocation,
        amountMoved: asset.rebalanceAmount
      }))
    }

    // Reset allocations to targets
    setAssets(prevAssets => 
      prevAssets.map(asset => ({
        ...asset,
        currentValue: (asset.targetAllocation / 100) * totalValue,
        currentAllocation: asset.targetAllocation,
        rebalanceAmount: 0
      }))
    )

    setRebalanceHistory(prev => [rebalanceRecord, ...prev.slice(0, 9)]) // Keep last 10
    
    // Save to localStorage
    localStorage.setItem('portfolio-rebalance-history', JSON.stringify([rebalanceRecord, ...rebalanceHistory]))
  }

  // Update target allocation
  const updateTargetAllocation = (assetId: string, newTarget: number) => {
    setAssets(prevAssets => {
      const totalOtherTargets = prevAssets
        .filter(a => a.id !== assetId)
        .reduce((sum, a) => sum + a.targetAllocation, 0)
      
      if (totalOtherTargets + newTarget > 100) {
        return prevAssets // Don't allow over 100%
      }

      return prevAssets.map(asset => 
        asset.id === assetId 
          ? { ...asset, targetAllocation: newTarget }
          : asset
      )
    })
  }

  // Start/stop simulation
  const toggleSimulation = () => {
    setIsRunning(!isRunning)
  }

  // Reset simulation
  const resetSimulation = () => {
    setIsRunning(false)
    setTimeElapsed(0)
    setRebalanceHistory([])
    setAssets(prevAssets => 
      prevAssets.map(asset => ({
        ...asset,
        currentValue: (asset.targetAllocation / 100) * portfolioValue,
        currentAllocation: asset.targetAllocation,
        rebalanceAmount: 0,
        price: asset.id === 'btc' ? 45000 :
               asset.id === 'eth' ? 2800 :
               asset.id === 'ada' ? 0.45 :
               asset.id === 'dot' ? 6.2 : 1.00,
        change24h: 0
      }))
    )
  }

  // Simulation timer
  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      simulateMarketMovement()
      setTimeElapsed(prev => prev + 1)
    }, 1000) // 1 second = 1 day

    return () => clearInterval(interval)
  }, [isRunning, simulateMarketMovement])

  // Load history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('portfolio-rebalance-history')
    if (savedHistory) {
      setRebalanceHistory(JSON.parse(savedHistory))
    }
  }, [])

  const selectedStrategy = rebalanceStrategies.find(s => s.id === rebalanceStrategy)!

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
                Day {timeElapsed} | Portfolio: ${portfolioMetrics.totalValue.toLocaleString()}
              </div>
              <button
                onClick={toggleSimulation}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isRunning 
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {isRunning ? 'Pause' : 'Start'} Simulation
              </button>
              <button
                onClick={resetSimulation}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <PieChart className="w-6 h-6 mr-3 text-purple-600" />
                Portfolio Rebalancing Simulator
              </h1>
              <p className="text-gray-600 mt-2">
                Learn portfolio management by simulating different rebalancing strategies and market conditions
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              
              {/* Controls */}
              <div className="lg:col-span-1 space-y-6">
                
                {/* Strategy Selection */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Rebalancing Strategy</h3>
                  <div className="space-y-3">
                    {rebalanceStrategies.map((strategy) => (
                      <label key={strategy.id} className="flex items-start p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-white transition-colors">
                        <input
                          type="radio"
                          name="strategy"
                          value={strategy.id}
                          checked={rebalanceStrategy === strategy.id}
                          onChange={(e) => setRebalanceStrategy(e.target.value)}
                          className="mt-1 mr-3"
                        />
                        <div>
                          <div className="font-medium text-gray-900">{strategy.name}</div>
                          <div className="text-xs text-gray-600 mt-1">{strategy.description}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Portfolio Metrics */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-900 mb-3">Portfolio Health</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-700">Allocation Drift:</span>
                      <span className={`font-semibold ${
                        portfolioMetrics.totalDeviation < 5 ? 'text-green-600' :
                        portfolioMetrics.totalDeviation < 10 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {portfolioMetrics.totalDeviation.toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Risk Score:</span>
                      <span className={`font-semibold ${
                        portfolioMetrics.riskScore < 30 ? 'text-green-600' :
                        portfolioMetrics.riskScore < 60 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {portfolioMetrics.riskScore.toFixed(0)}/100
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Diversification:</span>
                      <span className="font-semibold text-blue-900">
                        {portfolioMetrics.diversificationScore.toFixed(0)}/100
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Volatility:</span>
                      <span className="font-semibold text-blue-900">
                        {(portfolioMetrics.volatility * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Rebalancing Trigger */}
                {needsRebalancing && (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                    <div className="flex items-center mb-3">
                      <AlertTriangle className="w-5 h-5 text-orange-600 mr-2" />
                      <h3 className="font-semibold text-orange-900">Rebalancing Needed</h3>
                    </div>
                    <p className="text-sm text-orange-700 mb-4">
                      Your portfolio has drifted from target allocations according to your {selectedStrategy.name.toLowerCase()} strategy.
                    </p>
                    <button
                      onClick={executeRebalance}
                      className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                    >
                      <RefreshCw className="w-4 h-4 inline mr-2" />
                      Rebalance Portfolio
                    </button>
                  </div>
                )}
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3 space-y-6">
                
                {/* Current Portfolio */}
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Allocation</h3>
                  <div className="space-y-4">
                    {assets.map((asset) => {
                      const deviationPercent = Math.abs(asset.currentAllocation - asset.targetAllocation)
                      const isOffTarget = deviationPercent > selectedStrategy.triggerThreshold
                      
                      return (
                        <div key={asset.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <span className="text-xl">{asset.logo}</span>
                              <div>
                                <div className="font-medium text-gray-900">{asset.symbol}</div>
                                <div className="text-sm text-gray-500">${asset.price.toLocaleString()}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-gray-900">
                                ${asset.currentValue.toLocaleString()}
                              </div>
                              <div className={`text-sm flex items-center ${
                                asset.change24h >= 0 ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {asset.change24h >= 0 ? 
                                  <TrendingUp className="w-3 h-3 mr-1" /> : 
                                  <TrendingDown className="w-3 h-3 mr-1" />
                                }
                                {Math.abs(asset.change24h).toFixed(1)}%
                              </div>
                            </div>
                          </div>
                          
                          {/* Allocation Bars */}
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Current: {asset.currentAllocation.toFixed(1)}%</span>
                              <span className="text-gray-600">Target: {asset.targetAllocation.toFixed(1)}%</span>
                            </div>
                            <div className="relative">
                              <div className="w-full bg-gray-200 rounded-full h-3">
                                <div 
                                  className={`h-3 rounded-full transition-all duration-300 ${
                                    isOffTarget ? 'bg-red-500' : 'bg-blue-500'
                                  }`}
                                  style={{ width: `${Math.min(asset.currentAllocation, 100)}%` }}
                                ></div>
                              </div>
                              <div 
                                className="absolute top-0 h-3 w-1 bg-green-600 opacity-75"
                                style={{ left: `${asset.targetAllocation}%` }}
                              ></div>
                            </div>
                            {isOffTarget && (
                              <div className="text-xs text-red-600">
                                Drift: {deviationPercent.toFixed(1)}% from target
                              </div>
                            )}
                          </div>

                          {/* Target Allocation Adjuster */}
                          <div className="flex items-center space-x-2">
                            <label className="text-xs text-gray-600">Target:</label>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={asset.targetAllocation}
                              onChange={(e) => updateTargetAllocation(asset.id, Number(e.target.value))}
                              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                            <span className="text-xs text-gray-600 w-8">
                              {asset.targetAllocation}%
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Rebalancing History */}
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Rebalancing History</h3>
                  {rebalanceHistory.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No rebalancing events yet. Run the simulation to see results!</p>
                  ) : (
                    <div className="space-y-3">
                      {rebalanceHistory.slice(0, 5).map((event, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-sm font-medium text-gray-900">
                              Day {event.day} Rebalancing
                            </div>
                            <div className="text-sm text-gray-600">
                              Portfolio: ${event.totalValue.toLocaleString()}
                            </div>
                          </div>
                          <div className="text-xs text-gray-600 mb-2">
                            Drift before: {event.beforeDeviation.toFixed(1)}%
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-xs">
                            {event.adjustments.map((adj: any) => (
                              <div key={adj.symbol} className="text-center">
                                <div className="font-medium">{adj.symbol}</div>
                                <div className={adj.amountMoved > 0 ? 'text-green-600' : 'text-red-600'}>
                                  {adj.amountMoved > 0 ? '+' : ''}${adj.amountMoved.toFixed(0)}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Strategy Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h4 className="font-semibold text-green-900 mb-3">Benefits</h4>
                    <ul className="space-y-1 text-sm text-green-800">
                      {selectedStrategy.benefits.map((benefit, index) => (
                        <li key={index}>• {benefit}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h4 className="font-semibold text-red-900 mb-3">Risks</h4>
                    <ul className="space-y-1 text-sm text-red-800">
                      {selectedStrategy.risks.map((risk, index) => (
                        <li key={index}>• {risk}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 