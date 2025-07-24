'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Play, Clock, Users, Target, Star, TrendingUp, Calculator, PieChart, Wallet, Coins, Award, Shield, Zap, BarChart3 } from 'lucide-react'

interface Simulator {
  id: string
  title: string
  description: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string
  category: 'Trading' | 'Investment' | 'DeFi' | 'Fundamentals'
  learningOutcomes: string[]
  features: string[]
  href: string
  icon: React.ReactNode
  status: 'available' | 'coming-soon'
  riskLevel: 'Safe' | 'Simulated' | 'Educational'
}

export default function SimulatorsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const simulators: Simulator[] = [
    {
      id: 'wallet-simulator',
      title: 'Wallet Simulator',
      description: 'Learn wallet fundamentals with hands-on transaction practice, security tests, and recovery scenarios',
      difficulty: 'Beginner',
      duration: '30-45 min',
      category: 'Fundamentals',
      learningOutcomes: [
        'Understand wallet types and security',
        'Practice sending/receiving transactions',
        'Learn private key management',
        'Complete security challenges'
      ],
      features: [
        'Interactive transaction flow',
        'Security scenario testing',
        'Private key recovery simulation',
        'Multi-wallet type comparison'
      ],
      href: '/education/simulators/wallet-simulator',
      icon: <Wallet className="w-6 h-6" />,
      status: 'available',
      riskLevel: 'Safe'
    },
    {
      id: 'defi-trading',
      title: 'DeFi Trading Simulator',
      description: 'Master decentralized trading with realistic DEX mechanics, slippage, fees, and market movements',
      difficulty: 'Intermediate',
      duration: '45-60 min',
      category: 'Trading',
      learningOutcomes: [
        'Understand DEX trading mechanics',
        'Learn about slippage and price impact',
        'Practice with live price feeds',
        'Master trading psychology'
      ],
      features: [
        'Real-time price updates',
        'Uniswap-style interface',
        'Portfolio tracking',
        'Trade history analysis'
      ],
      href: '/education/simulators/defi-trading',
      icon: <TrendingUp className="w-6 h-6" />,
      status: 'available',
      riskLevel: 'Simulated'
    },
    {
      id: 'staking-calculator',
      title: 'Staking Rewards Calculator',
      description: 'Calculate and compare staking rewards across protocols with compound interest effects',
      difficulty: 'Intermediate',
      duration: '20-30 min',
      category: 'Investment',
      learningOutcomes: [
        'Compare staking protocols',
        'Understand compound interest',
        'Learn validator economics',
        'Assess staking risks'
      ],
      features: [
        '5+ staking protocols',
        'Compound frequency options',
        'Risk assessment tools',
        'Validator fee calculations'
      ],
      href: '/education/simulators/staking-calculator',
      icon: <Calculator className="w-6 h-6" />,
      status: 'available',
      riskLevel: 'Educational'
    },
    {
      id: 'portfolio-rebalancing',
      title: 'Portfolio Rebalancing Simulator',
      description: 'Learn portfolio management with different rebalancing strategies and real market simulations',
      difficulty: 'Advanced',
      duration: '60-90 min',
      category: 'Investment',
      learningOutcomes: [
        'Master rebalancing strategies',
        'Understand portfolio drift',
        'Learn risk management',
        'Practice disciplined investing'
      ],
      features: [
        '3 rebalancing strategies',
        'Real-time market simulation',
        'Portfolio health metrics',
        'Rebalancing history tracking'
      ],
      href: '/education/simulators/portfolio-rebalancing',
      icon: <PieChart className="w-6 h-6" />,
      status: 'available',
      riskLevel: 'Simulated'
    },
    {
      id: 'liquidity-pool',
      title: 'Liquidity Pool Simulator',
      description: 'Understand impermanent loss, LP rewards, and yield farming strategies in a risk-free environment',
      difficulty: 'Advanced',
      duration: '45-60 min',
      category: 'DeFi',
      learningOutcomes: [
        'Understand impermanent loss',
        'Calculate LP rewards',
        'Learn yield farming strategies',
        'Assess risk/reward ratios'
      ],
      features: [
        'Multiple trading pairs',
        'Impermanent loss calculator',
        'Yield farming scenarios',
        'Fee distribution modeling'
      ],
      href: '/education/simulators/liquidity-pool',
      icon: <Coins className="w-6 h-6" />,
      status: 'coming-soon',
      riskLevel: 'Simulated'
    },
    {
      id: 'nft-marketplace',
      title: 'NFT Marketplace Simulator',
      description: 'Experience NFT trading, minting, and marketplace mechanics without spending real money',
      difficulty: 'Intermediate',
      duration: '30-45 min',
      category: 'Trading',
      learningOutcomes: [
        'Understand NFT marketplaces',
        'Practice minting and trading',
        'Learn valuation basics',
        'Understand gas fees impact'
      ],
      features: [
        'Simulated NFT collections',
        'Minting simulation',
        'Market trends analysis',
        'Gas fee calculations'
      ],
      href: '/education/simulators/nft-marketplace',
      icon: <Star className="w-6 h-6" />,
      status: 'coming-soon',
      riskLevel: 'Safe'
    }
  ]

  const categories = [
    { id: 'all', name: 'All Simulators', count: simulators.length },
    { id: 'Fundamentals', name: 'Fundamentals', count: simulators.filter(s => s.category === 'Fundamentals').length },
    { id: 'Trading', name: 'Trading', count: simulators.filter(s => s.category === 'Trading').length },
    { id: 'Investment', name: 'Investment', count: simulators.filter(s => s.category === 'Investment').length },
    { id: 'DeFi', name: 'DeFi', count: simulators.filter(s => s.category === 'DeFi').length }
  ]

  const filteredSimulators = selectedCategory === 'all' 
    ? simulators 
    : simulators.filter(s => s.category === selectedCategory)

  const stats = {
    totalSimulators: simulators.length,
    availableNow: simulators.filter(s => s.status === 'available').length,
    totalLearningTime: '4-6 hours',
    skillLevels: 3
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          
          {/* Header */}
          <div className="flex items-center justify-between">
            <Link
              href="/education/modules"
              className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Learning Modules
            </Link>
          </div>

          {/* Hero Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white p-8">
            <div className="max-w-4xl">
              <h1 className="text-3xl font-bold mb-4">Interactive Crypto Simulators</h1>
              <p className="text-blue-100 text-lg mb-6">
                Learn by doing with hands-on simulators that let you practice crypto skills without financial risk. 
                From wallet basics to advanced DeFi strategies - master crypto through interactive experiences.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-sm">
                <div className="bg-white/10 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold">{stats.availableNow}</div>
                  <div className="text-blue-100">Available Now</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold">{stats.totalSimulators}</div>
                  <div className="text-blue-100">Total Simulators</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold">{stats.totalLearningTime}</div>
                  <div className="text-blue-100">Learning Time</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 text-center">
                  <div className="text-2xl font-bold">{stats.skillLevels}</div>
                  <div className="text-blue-100">Skill Levels</div>
                </div>
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Browse by Category</h2>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>

          {/* Simulators Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredSimulators.map((simulator, index) => (
              <div key={simulator.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                
                {/* Status Badge */}
                {simulator.status === 'coming-soon' && (
                  <div className="bg-yellow-100 border-b border-yellow-200 px-4 py-2">
                    <div className="flex items-center justify-center text-yellow-800 text-sm font-medium">
                      <Clock className="w-4 h-4 mr-2" />
                      Coming Soon
                    </div>
                  </div>
                )}
                
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-lg ${
                        simulator.category === 'Fundamentals' ? 'bg-green-100' :
                        simulator.category === 'Trading' ? 'bg-blue-100' :
                        simulator.category === 'Investment' ? 'bg-purple-100' :
                        'bg-orange-100'
                      }`}>
                        <div className={
                          simulator.category === 'Fundamentals' ? 'text-green-600' :
                          simulator.category === 'Trading' ? 'text-blue-600' :
                          simulator.category === 'Investment' ? 'text-purple-600' :
                          'text-orange-600'
                        }>
                          {simulator.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{simulator.title}</h3>
                        <div className="flex items-center space-x-3 mt-1">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            simulator.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                            simulator.difficulty === 'Intermediate' ? 'bg-blue-100 text-blue-700' :
                            'bg-purple-100 text-purple-700'
                          }`}>
                            {simulator.difficulty}
                          </span>
                          <span className="text-xs text-gray-500">{simulator.duration}</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            simulator.riskLevel === 'Safe' ? 'bg-green-100 text-green-700' :
                            simulator.riskLevel === 'Simulated' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {simulator.riskLevel}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {simulator.description}
                  </p>

                  {/* Learning Outcomes */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Target className="w-4 h-4 mr-2 text-green-600" />
                      What You'll Learn
                    </h4>
                    <ul className="space-y-1">
                      {simulator.learningOutcomes.slice(0, 3).map((outcome, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-start">
                          <span className="text-green-600 mr-2">•</span>
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Zap className="w-4 h-4 mr-2 text-blue-600" />
                      Key Features
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {simulator.features.slice(0, 3).map((feature, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          {feature}
                        </span>
                      ))}
                      {simulator.features.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          +{simulator.features.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  {simulator.status === 'available' ? (
                    <Link
                      href={simulator.href}
                      className="w-full inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start Simulator
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="w-full inline-flex items-center justify-center px-6 py-3 bg-gray-300 text-gray-500 rounded-lg font-medium cursor-not-allowed"
                    >
                      <Clock className="w-4 h-4 mr-2" />
                      Coming Soon
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Why Simulators Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Use Interactive Simulators?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Risk-Free Learning</h3>
                <p className="text-gray-600 text-sm">
                  Practice with fake money and simulated environments. Make mistakes without financial consequences while building real skills.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <BarChart3 className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Hands-On Experience</h3>
                <p className="text-gray-600 text-sm">
                  Learn by doing with interactive interfaces that mirror real crypto platforms and tools you'll use in practice.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Award className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Progressive Skills</h3>
                <p className="text-gray-600 text-sm">
                  Start with basics and advance to complex strategies. Each simulator builds on previous knowledge with clear learning paths.
                </p>
              </div>
            </div>
          </div>

          {/* Learning Path Recommendation */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
            <h3 className="font-semibold text-green-900 mb-3 flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Recommended Learning Path
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center p-3 bg-white rounded-lg border border-green-200">
                <div className="font-semibold text-green-900">1. Start Here</div>
                <div className="text-green-700">Wallet Simulator</div>
                <div className="text-xs text-green-600 mt-1">Learn the basics</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg border border-blue-200">
                <div className="font-semibold text-blue-900">2. Trading</div>
                <div className="text-blue-700">DeFi Trading</div>
                <div className="text-xs text-blue-600 mt-1">Practice swapping</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg border border-purple-200">
                <div className="font-semibold text-purple-900">3. Investing</div>
                <div className="text-purple-700">Staking Calculator</div>
                <div className="text-xs text-purple-600 mt-1">Learn yields</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg border border-orange-200">
                <div className="font-semibold text-orange-900">4. Advanced</div>
                <div className="text-orange-700">Portfolio Manager</div>
                <div className="text-xs text-orange-600 mt-1">Master strategy</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 