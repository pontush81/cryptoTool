'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Search, Filter, TrendingUp, Clock, Target, CheckCircle2, ArrowRight, BarChart3, Coins, Building, DollarSign, Zap, Bot, Gamepad2, Home, Network, Radar } from 'lucide-react'

interface MarketCategory {
  id: string
  title: string
  description: string
  marketCap: 'Very High' | 'High' | 'Medium' | 'Low'
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string
  icon: React.ReactNode
  href: string
  modules: number
  completed: number
  phase: 1 | 2 | 3
  examples: string[]
  whyImportant: string
}

export default function MarketCategoriesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPhase, setSelectedPhase] = useState<number | 'all'>('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')
  const [completedCategories, setCompletedCategories] = useState<string[]>([])

  useEffect(() => {
    // Load completed categories from localStorage
    const completed = JSON.parse(localStorage.getItem('completedMarketCategories') || '[]')
    setCompletedCategories(completed)
  }, [])

  const categories: MarketCategory[] = [
    // Phase 1: Core Categories (Immediate Priority)
    {
      id: 'layer-1-blockchains',
      title: 'Layer 1 Blockchains',
      description: 'Base blockchain networks supporting decentralized apps and assets',
      marketCap: 'Very High',
      difficulty: 'Beginner',
      duration: '3-5h',
      icon: <Building className="w-6 h-6" />,
      href: '/education/market-categories/layer-1-blockchains',
      modules: 4,
      completed: 0,
      phase: 1,
      examples: ['Bitcoin (BTC)', 'Ethereum (ETH)', 'Solana (SOL)', 'BNB Chain'],
      whyImportant: 'Foundation for the entire crypto ecosystem; core to security and scalability debates'
    },
    {
      id: 'stablecoins',
      title: 'Stablecoins',
      description: 'USD-pegged cryptocurrencies for stability and DeFi liquidity',
      marketCap: 'Very High',
      difficulty: 'Beginner',
      duration: '2-4h',
      icon: <DollarSign className="w-6 h-6" />,
      href: '/education/market-categories/stablecoins',
      modules: 3,
      completed: 0,
      phase: 1,
      examples: ['Tether (USDT)', 'USD Coin (USDC)', 'DAI', 'Frax (FRAX)'],
      whyImportant: 'Essential for trading, remittances, and DeFi; underpin market liquidity'
    },
    {
      id: 'defi-ecosystem',
      title: 'DeFi Ecosystem',
      description: 'Decentralized financial protocols and applications',
      marketCap: 'High',
      difficulty: 'Intermediate',
      duration: '5-8h',
      icon: <Coins className="w-6 h-6" />,
      href: '/education/market-categories/defi-ecosystem',
      modules: 5,
      completed: 0,
      phase: 1,
      examples: ['Uniswap', 'Aave', 'Curve', 'MakerDAO', 'Compound'],
      whyImportant: 'Core innovation beyond traditional banking; vital for understanding crypto\'s use case revolution'
    },
    {
      id: 'layer-2-solutions',
      title: 'Layer 2 Solutions',
      description: 'Scaling solutions for Layer 1 blockchains',
      marketCap: 'Medium',
      difficulty: 'Intermediate',
      duration: '3-5h',
      icon: <Zap className="w-6 h-6" />,
      href: '/education/market-categories/layer-2-solutions',
      modules: 4,
      completed: 0,
      phase: 1,
      examples: ['Polygon (MATIC)', 'Arbitrum (ARB)', 'Optimism (OP)', 'Base'],
      whyImportant: 'Addresses critical throughput and fee bottlenecks; essential for mass adoption'
    },

    // Phase 2: Growth Categories (Next Priority)
    {
      id: 'memecoins',
      title: 'Memecoins',
      description: 'Community-driven speculative tokens',
      marketCap: 'Medium',
      difficulty: 'Beginner',
      duration: '1-2h',
      icon: <TrendingUp className="w-6 h-6" />,
      href: '/education/market-categories/memecoins',
      modules: 2,
      completed: 0,
      phase: 2,
      examples: ['Dogecoin (DOGE)', 'Shiba Inu (SHIB)', 'PEPE', 'Bonk (BONK)'],
      whyImportant: 'Showcase market psychology, risks of speculation, and viral culture'
    },
    {
      id: 'exchange-tokens',
      title: 'Exchange Tokens',
      description: 'Native tokens of major crypto exchanges',
      marketCap: 'High',
      difficulty: 'Beginner',
      duration: '2-4h',
      icon: <BarChart3 className="w-6 h-6" />,
      href: '/education/market-categories/exchange-tokens',
      modules: 3,
      completed: 0,
      phase: 2,
      examples: ['Binance Coin (BNB)', 'OKX (OKB)', 'KuCoin Token (KCS)', 'Cronos (CRO)'],
      whyImportant: 'Central to exchange ecosystems; often cross into DeFi or Layer 1s'
    },
    {
      id: 'ai-big-data',
      title: 'AI & Big Data',
      description: 'AI integration with blockchain and crypto',
      marketCap: 'Medium',
      difficulty: 'Intermediate',
      duration: '3-4h',
      icon: <Bot className="w-6 h-6" />,
      href: '/education/market-categories/ai-big-data',
      modules: 4,
      completed: 0,
      phase: 2,
      examples: ['Fetch.ai (FET)', 'Ocean Protocol (OCEAN)', 'The Graph (GRT)', 'Render Token (RENDER)'],
      whyImportant: 'Emerging intersection; potential for transformative on-chain automation and data access'
    },
    {
      id: 'gamefi',
      title: 'Gaming (GameFi)',
      description: 'Blockchain gaming and play-to-earn mechanics',
      marketCap: 'Medium',
      difficulty: 'Beginner',
      duration: '2-4h',
      icon: <Gamepad2 className="w-6 h-6" />,
      href: '/education/market-categories/gamefi',
      modules: 3,
      completed: 0,
      phase: 2,
      examples: ['Axie Infinity (AXS)', 'Immutable (IMX)', 'Gala Games (GALA)', 'Enjin (ENJ)'],
      whyImportant: 'Drives mainstream adoption via entertainment and NFTs; experimental business models'
    },

    // Phase 3: Advanced Categories (Future)
    {
      id: 'real-world-assets',
      title: 'Real World Assets (RWA)',
      description: 'Tokenized physical and financial assets',
      marketCap: 'Medium',
      difficulty: 'Intermediate',
      duration: '3-5h',
      icon: <Home className="w-6 h-6" />,
      href: '/education/market-categories/real-world-assets',
      modules: 4,
      completed: 0,
      phase: 3,
      examples: ['Centrifuge', 'Ondo Finance', 'Maple Finance', 'Goldfinch'],
      whyImportant: 'Represents next phase of crypto integration with traditional finance; regulatory frontier'
    },
    {
      id: 'oracles',
      title: 'Oracles',
      description: 'External data providers for smart contracts',
      marketCap: 'Medium',
      difficulty: 'Advanced',
      duration: '3-6h',
      icon: <Radar className="w-6 h-6" />,
      href: '/education/market-categories/oracles',
      modules: 3,
      completed: 0,
      phase: 3,
      examples: ['Chainlink (LINK)', 'Band Protocol (BAND)', 'API3', 'Pyth Network'],
      whyImportant: 'Critical for DeFi and automation; without oracles, blockchains can\'t interact with real-world events'
    }
  ]

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.examples.some(example => example.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesPhase = selectedPhase === 'all' || category.phase === selectedPhase
    const matchesDifficulty = selectedDifficulty === 'all' || category.difficulty === selectedDifficulty

    return matchesSearch && matchesPhase && matchesDifficulty
  })

  const getMarketCapColor = (marketCap: string) => {
    switch (marketCap) {
      case 'Very High': return 'text-green-600 bg-green-100'
      case 'High': return 'text-blue-600 bg-blue-100'
      case 'Medium': return 'text-yellow-600 bg-yellow-100'
      case 'Low': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100'
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100'
      case 'Advanced': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const totalCategories = categories.length
  const completedCount = completedCategories.length
  const progressPercentage = totalCategories > 0 ? (completedCount / totalCategories) * 100 : 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/education/dashboard"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Dashboard
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Progress: {completedCount}/{totalCategories} categories
              </div>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h1 className="text-3xl font-bold text-gray-900">Market Categories Track</h1>
            <p className="mt-2 text-lg text-gray-600">
              Learn crypto by market sectors - from Layer 1 blockchains to emerging categories like AI and GameFi
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search categories, examples, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Phase Filter */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <select
                  value={selectedPhase}
                  onChange={(e) => setSelectedPhase(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Phases</option>
                  <option value={1}>Phase 1: Core</option>
                  <option value={2}>Phase 2: Growth</option>
                  <option value={3}>Phase 3: Advanced</option>
                </select>
              </div>

              {/* Difficulty Filter */}
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Difficulties</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-blue-600">
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{category.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                    </div>
                  </div>
                  {completedCategories.includes(category.id) && (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  )}
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMarketCapColor(category.marketCap)}`}>
                    {category.marketCap} Cap
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(category.difficulty)}`}>
                    {category.difficulty}
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs font-medium text-gray-600 bg-gray-100 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {category.duration}
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs font-medium text-purple-600 bg-purple-100">
                    Phase {category.phase}
                  </span>
                </div>

                {/* Why Important */}
                <div className="mb-4">
                  <p className="text-sm text-gray-700 font-medium mb-2">Why Learn This:</p>
                  <p className="text-sm text-gray-600">{category.whyImportant}</p>
                </div>

                {/* Examples */}
                <div className="mb-4">
                  <p className="text-sm text-gray-700 font-medium mb-2">Key Projects:</p>
                  <div className="flex flex-wrap gap-1">
                    {category.examples.slice(0, 3).map((example, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded"
                      >
                        {example}
                      </span>
                    ))}
                    {category.examples.length > 3 && (
                      <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded">
                        +{category.examples.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Progress */}
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <span>{category.completed}/{category.modules} modules completed</span>
                  <div className="flex items-center">
                    <Target className="w-4 h-4 mr-1" />
                    {category.modules} modules
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href={category.href}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  {category.phase === 1 ? 'Start Learning' : category.phase === 2 ? 'Coming Soon' : 'Planned'}
                  {category.phase === 1 && <ArrowRight className="w-4 h-4 ml-2" />}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <Search className="w-12 h-12 mx-auto mb-4" />
              <p className="text-lg font-medium">No categories found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">About Market Categories Track</h3>
          <p className="text-blue-800 text-sm leading-relaxed">
            This track organizes crypto learning by market sectors, similar to how CoinGecko categorizes projects. 
            Each category focuses on a specific sector (Layer 1s, DeFi, etc.) with real-world examples and practical applications. 
            Perfect for understanding how different crypto projects fit into the broader ecosystem.
          </p>
          <div className="mt-4 text-sm text-blue-700">
            <strong>Tip:</strong> Start with Phase 1 categories (Core) before moving to Growth and Advanced phases. 
            Each category cross-references with our Foundation Track modules for deeper technical understanding.
          </div>
        </div>
      </div>
    </div>
  )
} 