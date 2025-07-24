'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { ArrowLeft, Calculator, TrendingUp, Clock, Target, Award, Info, Zap, Shield, BarChart3, Coins, PiggyBank } from 'lucide-react'

interface StakingOption {
  id: string
  name: string
  symbol: string
  apy: number
  minStake: number
  lockPeriod: number // in days
  riskLevel: 'Low' | 'Medium' | 'High'
  description: string
  features: string[]
  logo: string
  validatorFee: number // percentage
  slashingRisk: boolean
}

interface CalculationResult {
  dailyRewards: number
  weeklyRewards: number
  monthlyRewards: number
  yearlyRewards: number
  totalReturn: number
  compound: {
    daily: number
    weekly: number
    monthly: number
    yearly: number
  }
}

export default function StakingCalculator() {
  const [selectedStaking, setSelectedStaking] = useState<string>('eth2')
  const [stakeAmount, setStakeAmount] = useState<string>('1000')
  const [stakingPeriod, setStakingPeriod] = useState<number>(365) // days
  const [compoundFrequency, setCompoundFrequency] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('monthly')
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false)

  const stakingOptions: StakingOption[] = [
    {
      id: 'eth2',
      name: 'Ethereum 2.0',
      symbol: 'ETH',
      apy: 4.2,
      minStake: 32,
      lockPeriod: 365,
      riskLevel: 'Low',
      description: 'Native Ethereum staking with validator rewards',
      features: ['No impermanent loss', 'Native yield', 'Network security', 'Long-term commitment'],
      logo: '⟠',
      validatorFee: 0,
      slashingRisk: true
    },
    {
      id: 'ada',
      name: 'Cardano',
      symbol: 'ADA',
      apy: 4.6,
      minStake: 10,
      lockPeriod: 0,
      riskLevel: 'Low',
      description: 'Flexible Cardano staking with epoch rewards',
      features: ['No lock period', 'Liquid staking', 'Delegation rewards', 'Low fees'],
      logo: '₳',
      validatorFee: 2.5,
      slashingRisk: false
    },
    {
      id: 'sol',
      name: 'Solana',
      symbol: 'SOL',
      apy: 6.8,
      minStake: 0.01,
      lockPeriod: 2,
      riskLevel: 'Medium',
      description: 'High-yield Solana validator staking',
      features: ['High APY', 'Fast unstaking', 'Validator choice', 'MEV rewards'],
      logo: '◎',
      validatorFee: 5,
      slashingRisk: true
    },
    {
      id: 'atom',
      name: 'Cosmos',
      symbol: 'ATOM',
      apy: 15.2,
      minStake: 0.1,
      lockPeriod: 21,
      riskLevel: 'Medium',
      description: 'Cosmos Hub staking with inflation rewards',
      features: ['High inflation rewards', 'IBC ecosystem', 'Governance voting', 'Airdrops'],
      logo: '⚛',
      validatorFee: 5,
      slashingRisk: true
    },
    {
      id: 'defi-pool',
      name: 'DeFi Liquidity Pool',
      symbol: 'LP',
      apy: 25.0,
      minStake: 100,
      lockPeriod: 0,
      riskLevel: 'High',
      description: 'High-yield DeFi pool with impermanent loss risk',
      features: ['Very high APY', 'Impermanent loss risk', 'Trading fees', 'Token rewards'],
      logo: '🏊',
      validatorFee: 0,
      slashingRisk: false
    }
  ]

  const selectedOption = stakingOptions.find(option => option.id === selectedStaking)!
  const stakeAmountNum = parseFloat(stakeAmount) || 0

  const calculations = useMemo((): CalculationResult => {
    if (!stakeAmountNum || !selectedOption) {
      return {
        dailyRewards: 0,
        weeklyRewards: 0,
        monthlyRewards: 0,
        yearlyRewards: 0,
        totalReturn: 0,
        compound: { daily: 0, weekly: 0, monthly: 0, yearly: 0 }
      }
    }

    const annualRate = selectedOption.apy / 100
    const validatorFeeRate = selectedOption.validatorFee / 100
    const netRate = annualRate * (1 - validatorFeeRate)

    // Simple interest calculations
    const dailyRewards = (stakeAmountNum * netRate) / 365
    const weeklyRewards = dailyRewards * 7
    const monthlyRewards = dailyRewards * 30
    const yearlyRewards = stakeAmountNum * netRate

    // Compound interest calculations
    const periods = {
      daily: 365,
      weekly: 52,
      monthly: 12,
      yearly: 1
    }

    const compound = {
      daily: stakeAmountNum * Math.pow(1 + netRate / periods.daily, periods.daily * (stakingPeriod / 365)) - stakeAmountNum,
      weekly: stakeAmountNum * Math.pow(1 + netRate / periods.weekly, periods.weekly * (stakingPeriod / 365)) - stakeAmountNum,
      monthly: stakeAmountNum * Math.pow(1 + netRate / periods.monthly, periods.monthly * (stakingPeriod / 365)) - stakeAmountNum,
      yearly: stakeAmountNum * Math.pow(1 + netRate / periods.yearly, periods.yearly * (stakingPeriod / 365)) - stakeAmountNum
    }

    const totalReturn = compound[compoundFrequency]

    return {
      dailyRewards,
      weeklyRewards,
      monthlyRewards,
      yearlyRewards,
      totalReturn,
      compound
    }
  }, [stakeAmountNum, selectedOption, stakingPeriod, compoundFrequency])

  // Calculate monthly projection for chart
  const monthlyProjection = useMemo(() => {
    const data = []
    const monthlyRate = selectedOption.apy / 100 / 12
    let currentValue = stakeAmountNum

    for (let month = 0; month <= Math.min(stakingPeriod / 30, 24); month++) {
      data.push({
        month,
        value: currentValue,
        rewards: currentValue - stakeAmountNum
      })
      
      if (compoundFrequency === 'monthly') {
        currentValue = currentValue * (1 + monthlyRate * (1 - selectedOption.validatorFee / 100))
      }
    }
    
    return data
  }, [stakeAmountNum, selectedOption, stakingPeriod, compoundFrequency])

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
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <Calculator className="w-6 h-6 mr-3 text-blue-600" />
                Staking Rewards Calculator
              </h1>
              <p className="text-gray-600 mt-2">
                Calculate potential staking rewards across different protocols and understand compound interest effects
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Calculator Inputs */}
              <div className="lg:col-span-1 space-y-6">
                
                {/* Staking Protocol Selection */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Protocol</h3>
                  <div className="space-y-3">
                    {stakingOptions.map((option) => (
                      <div key={option.id}>
                        <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-white transition-colors">
                          <input
                            type="radio"
                            name="staking-option"
                            value={option.id}
                            checked={selectedStaking === option.id}
                            onChange={(e) => setSelectedStaking(e.target.value)}
                            className="mr-3"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-gray-900 flex items-center">
                                <span className="text-lg mr-2">{option.logo}</span>
                                {option.name}
                              </span>
                              <span className="text-sm font-semibold text-green-600">
                                {option.apy}% APY
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span className={`px-2 py-1 rounded ${
                                option.riskLevel === 'Low' ? 'bg-green-100 text-green-700' :
                                option.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {option.riskLevel} Risk
                              </span>
                              <span>
                                Min: {option.minStake} {option.symbol}
                              </span>
                            </div>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Calculation Parameters */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Parameters</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Stake Amount ({selectedOption.symbol})
                      </label>
                      <input
                        type="number"
                        value={stakeAmount}
                        onChange={(e) => setStakeAmount(e.target.value)}
                        placeholder="1000"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {stakeAmountNum < selectedOption.minStake && (
                        <p className="text-xs text-red-600 mt-1">
                          Minimum stake: {selectedOption.minStake} {selectedOption.symbol}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Staking Period (days)
                      </label>
                      <select
                        value={stakingPeriod}
                        onChange={(e) => setStakingPeriod(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value={30}>1 Month</option>
                        <option value={90}>3 Months</option>
                        <option value={180}>6 Months</option>
                        <option value={365}>1 Year</option>
                        <option value={730}>2 Years</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Compound Frequency
                      </label>
                      <select
                        value={compoundFrequency}
                        onChange={(e) => setCompoundFrequency(e.target.value as any)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Protocol Details */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
                    <Info className="w-4 h-4 mr-2" />
                    Protocol Details
                  </h3>
                  <div className="space-y-2 text-sm text-blue-800">
                    <p><strong>APY:</strong> {selectedOption.apy}%</p>
                    <p><strong>Lock Period:</strong> {selectedOption.lockPeriod === 0 ? 'None' : `${selectedOption.lockPeriod} days`}</p>
                    <p><strong>Validator Fee:</strong> {selectedOption.validatorFee}%</p>
                    <p><strong>Slashing Risk:</strong> {selectedOption.slashingRisk ? 'Yes' : 'No'}</p>
                  </div>
                  <div className="mt-3">
                    <p className="text-xs text-blue-700">{selectedOption.description}</p>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Rewards Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-green-900">Total Rewards</h3>
                      <PiggyBank className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="text-3xl font-bold text-green-900 mb-2">
                      {calculations.totalReturn.toFixed(2)} {selectedOption.symbol}
                    </div>
                    <div className="text-sm text-green-700">
                      ≈ ${(calculations.totalReturn * 2000).toLocaleString()} USD
                    </div>
                    <div className="mt-3 text-xs text-green-600">
                      With {compoundFrequency} compounding over {stakingPeriod} days
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-blue-900">Final Value</h3>
                      <Target className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-3xl font-bold text-blue-900 mb-2">
                      {(stakeAmountNum + calculations.totalReturn).toFixed(2)} {selectedOption.symbol}
                    </div>
                    <div className="text-sm text-blue-700">
                      ROI: {stakeAmountNum > 0 ? ((calculations.totalReturn / stakeAmountNum) * 100).toFixed(1) : '0'}%
                    </div>
                    <div className="mt-3 text-xs text-blue-600">
                      Initial: {stakeAmountNum} + Rewards: {calculations.totalReturn.toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Periodic Rewards Breakdown */}
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Rewards Breakdown</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Daily</div>
                      <div className="text-xl font-semibold text-gray-900">
                        {calculations.dailyRewards.toFixed(4)}
                      </div>
                      <div className="text-xs text-gray-500">{selectedOption.symbol}</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Weekly</div>
                      <div className="text-xl font-semibold text-gray-900">
                        {calculations.weeklyRewards.toFixed(3)}
                      </div>
                      <div className="text-xs text-gray-500">{selectedOption.symbol}</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Monthly</div>
                      <div className="text-xl font-semibold text-gray-900">
                        {calculations.monthlyRewards.toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-500">{selectedOption.symbol}</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Yearly</div>
                      <div className="text-xl font-semibold text-gray-900">
                        {calculations.yearlyRewards.toFixed(1)}
                      </div>
                      <div className="text-xs text-gray-500">{selectedOption.symbol}</div>
                    </div>
                  </div>
                </div>

                {/* Compound Interest Comparison */}
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Compound Frequency Impact</h3>
                  <div className="space-y-3">
                    {Object.entries(calculations.compound).map(([frequency, value]) => {
                      const isSelected = frequency === compoundFrequency
                      return (
                        <div key={frequency} className={`flex items-center justify-between p-3 rounded-lg ${
                          isSelected ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
                        }`}>
                          <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full mr-3 ${
                              isSelected ? 'bg-blue-600' : 'bg-gray-400'
                            }`}></div>
                            <span className={`font-medium ${
                              isSelected ? 'text-blue-900' : 'text-gray-700'
                            }`}>
                              {frequency.charAt(0).toUpperCase() + frequency.slice(1)} Compounding
                            </span>
                          </div>
                          <div className="text-right">
                            <div className={`font-semibold ${
                              isSelected ? 'text-blue-900' : 'text-gray-900'
                            }`}>
                              {value.toFixed(2)} {selectedOption.symbol}
                            </div>
                            <div className="text-xs text-gray-500">
                              Difference: {value > calculations.compound.yearly ? '+' : ''}{(value - calculations.compound.yearly).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Risk Factors */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <h3 className="font-semibold text-yellow-900 mb-3 flex items-center">
                    <Shield className="w-4 h-4 mr-2" />
                    Risk Factors
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-yellow-800 mb-2">Considerations</h4>
                      <ul className="space-y-1 text-sm text-yellow-700">
                        <li>• Token price volatility</li>
                        <li>• Validator commission changes</li>
                        <li>• Network upgrade risks</li>
                        {selectedOption.slashingRisk && <li>• Slashing penalties possible</li>}
                        {selectedOption.lockPeriod > 0 && <li>• {selectedOption.lockPeriod} day lock period</li>}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-yellow-800 mb-2">Best Practices</h4>
                      <ul className="space-y-1 text-sm text-yellow-700">
                        <li>• Research validator performance</li>
                        <li>• Diversify across validators</li>
                        <li>• Monitor network health</li>
                        <li>• Consider tax implications</li>
                        <li>• Start with small amounts</li>
                      </ul>
                    </div>
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