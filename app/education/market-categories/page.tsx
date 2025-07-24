'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Search, Filter, TrendingUp, Clock, Target, CheckCircle2, ArrowRight, BarChart3, Coins, Building, DollarSign, Zap, Bot, Gamepad2, Home, Network, Radar, Shield, Globe, Users, Eye, Database, Factory } from 'lucide-react'

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
    // Phase 1: Core Categories (Foundational) - Logical Learning Order
    {
      id: 'layer-1-blockchains',
      title: 'Layer 1 Blockchains',
      description: 'Base blockchain networks - the foundation of all crypto protocols',
      marketCap: 'Very High',
      difficulty: 'Beginner',
      duration: '3-5h',
      icon: <Building className="w-6 h-6" />,
      href: '/education/market-categories/layer-1-blockchains',
      modules: 5,
      completed: 0,
      phase: 1,
      examples: ['Bitcoin (BTC)', 'Ethereum (ETH)', 'Solana (SOL)', 'BNB Chain', 'Cardano (ADA)'],
      whyImportant: 'START HERE: Foundation for the entire crypto ecosystem; understanding consensus, security, and decentralization'
    },
    {
      id: 'stablecoins',
      title: 'Stablecoins',
      description: 'USD-pegged cryptocurrencies providing stability in volatile markets',
      marketCap: 'Very High',
      difficulty: 'Beginner',
      duration: '2-4h',
      icon: <DollarSign className="w-6 h-6" />,
      href: '/education/market-categories/stablecoins',
      modules: 4,
      completed: 0,
      phase: 1,
      examples: ['Tether (USDT)', 'USD Coin (USDC)', 'DAI', 'Frax (FRAX)', 'PayPal USD (PYUSD)'],
      whyImportant: 'Essential bridge to traditional finance; enables trading, remittances, and DeFi without volatility'
    },
    {
      id: 'defi-lending-dexs',
      title: 'DeFi: Lending & DEXs',
      description: 'Core DeFi building blocks - decentralized borrowing and trading',
      marketCap: 'High',
      difficulty: 'Intermediate',
      duration: '4-6h',
      icon: <Coins className="w-6 h-6" />,
      href: '/education/market-categories/defi-lending-dexs',
      modules: 6,
      completed: 0,
      phase: 1,
      examples: ['Uniswap (UNI)', 'Aave (AAVE)', 'Compound (COMP)', 'MakerDAO (MKR)', 'Curve (CRV)'],
      whyImportant: 'Core innovation beyond traditional banking; revolutionizes how we lend, borrow, and trade assets'
    },
    {
      id: 'layer-2-scaling',
      title: 'Layer 2 Scaling',
      description: 'Scaling solutions making blockchains faster and cheaper',
      marketCap: 'Medium',
      difficulty: 'Intermediate',
      duration: '3-5h',
      icon: <Zap className="w-6 h-6" />,
      href: '/education/market-categories/layer-2-scaling',
      modules: 5,
      completed: 0,
      phase: 1,
      examples: ['Polygon (MATIC)', 'Arbitrum (ARB)', 'Optimism (OP)', 'Base (BASE)', 'zkSync (ZK)'],
      whyImportant: 'Solves critical throughput bottlenecks; enables mass adoption through lower fees and faster transactions'
    },

    // Phase 2: Growth Categories (Applied Innovation)
    {
      id: 'nft-ecosystem',
      title: 'NFT Ecosystem',
      description: 'Digital collectibles, art, utility NFTs, and ownership on-chain',
      marketCap: 'High',
      difficulty: 'Beginner',
      duration: '3-5h',
      icon: <Gamepad2 className="w-6 h-6" />,
      href: '/education/market-categories/nft-ecosystem',
      modules: 5,
      completed: 0,
      phase: 2,
      examples: ['OpenSea', 'Blur (BLUR)', 'Yuga Labs (APE)', 'Magic Eden (ME)', 'LooksRare (LOOKS)'],
      whyImportant: 'Revolutionary digital ownership model; bridges art, gaming, identity, and real-world assets'
    },
    {
      id: 'oracles-middleware',
      title: 'Oracles & Data',
      description: 'Connecting blockchains to real-world data and external systems',
      marketCap: 'High',
      difficulty: 'Intermediate',
      duration: '3-4h',
      icon: <Radar className="w-6 h-6" />,
      href: '/education/market-categories/oracles-middleware',
      modules: 4,
      completed: 0,
      phase: 2,
      examples: ['Chainlink (LINK)', 'Band Protocol (BAND)', 'API3 (API3)', 'Pyth Network (PYTH)'],
      whyImportant: 'Critical infrastructure connecting DeFi to real markets; enables price feeds, weather data, sports results'
    },
    {
      id: 'gamefi-metaverse',
      title: 'GameFi & Metaverse',
      description: 'Play-to-earn gaming, virtual worlds, and metaverse economies',
      marketCap: 'Medium',
      difficulty: 'Beginner',
      duration: '3-5h',
      icon: <Gamepad2 className="w-6 h-6" />,
      href: '/education/market-categories/gamefi-metaverse',
      modules: 5,
      completed: 0,
      phase: 2,
      examples: ['Axie Infinity (AXS)', 'The Sandbox (SAND)', 'Decentraland (MANA)', 'Immutable X (IMX)'],
      whyImportant: 'Gaming is crypto\'s biggest consumer application; demonstrates real utility and mass adoption potential'
    },
    {
      id: 'ai-compute',
      title: 'AI & Compute',
      description: 'Decentralized AI, machine learning, and computational resources',
      marketCap: 'Medium',
      difficulty: 'Intermediate',
      duration: '3-4h',
      icon: <Bot className="w-6 h-6" />,
      href: '/education/market-categories/ai-compute',
      modules: 4,
      completed: 0,
      phase: 2,
      examples: ['Fetch.ai (FET)', 'Ocean Protocol (OCEAN)', 'The Graph (GRT)', 'Render Token (RENDER)'],
      whyImportant: 'AI meets crypto: decentralized computation, data markets, and automated blockchain interactions'
    },
    {
      id: 'exchange-cex-tokens',
      title: 'Exchange & CEX Tokens',
      description: 'Native tokens of centralized exchanges and trading platforms',
      marketCap: 'High',
      difficulty: 'Beginner',
      duration: '2-4h',
      icon: <BarChart3 className="w-6 h-6" />,
      href: '/education/market-categories/exchange-cex-tokens',
      modules: 4,
      completed: 0,
      phase: 2,
      examples: ['Binance Coin (BNB)', 'OKX (OKB)', 'KuCoin Token (KCS)', 'Cronos (CRO)', 'FTX Token (FTT)'],
      whyImportant: 'Central to trading ecosystems; often expand into Layer 1s, payments, and DeFi'
    },
    {
      id: 'memecoins-community',
      title: 'Memecoins & Community',
      description: 'Community-driven speculative tokens and viral culture',
      marketCap: 'Medium',
      difficulty: 'Beginner',
      duration: '2-3h',
      icon: <TrendingUp className="w-6 h-6" />,
      href: '/education/market-categories/memecoins-community',
      modules: 3,
      completed: 0,
      phase: 2,
      examples: ['Dogecoin (DOGE)', 'Shiba Inu (SHIB)', 'PEPE', 'Bonk (BONK)', 'Brett (BRETT)'],
      whyImportant: 'Demonstrates market psychology, viral adoption patterns, and speculative risks in crypto'
    },

    // Phase 3: Advanced Categories (Niche & Emerging)
    {
      id: 'privacy-coins',
      title: 'Privacy Coins & ZK Tech',
      description: 'Anonymous transactions and zero-knowledge privacy solutions',
      marketCap: 'Medium',
      difficulty: 'Advanced',
      duration: '4-6h',
      icon: <Shield className="w-6 h-6" />,
      href: '/education/market-categories/privacy-coins',
      modules: 5,
      completed: 0,
      phase: 3,
      examples: ['Franklin Templeton (FOBXX)', 'Centrifuge (CFG)', 'Maple Finance (MPL)', 'Goldfinch (GFI)', 'TrueFi (TRU)'],
      whyImportant: 'Bridges traditional finance to DeFi; massive total addressable market for asset tokenization'
    },
    {
      id: 'synthetic-prediction',
      title: 'Synthetic Assets & Prediction Markets',
      description: 'Synthetic financial instruments and decentralized prediction platforms',
      marketCap: 'Low',
      difficulty: 'Advanced',
      duration: '3-4h',
      icon: <Database className="w-6 h-6" />,
      href: '/education/market-categories/synthetic-prediction',
      modules: 4,
      completed: 0,
      phase: 3,
      examples: ['Synthetix (SNX)', 'Polymarket', 'Augur (REP)', 'UMA (UMA)', 'dYdX (DYDX)'],
      whyImportant: 'Advanced DeFi primitives; enables exposure to any asset without owning it; market efficiency through prediction'
    },
    {
      id: 'depin-infrastructure',
      title: 'DePIN (Physical Infrastructure)',
      description: 'Decentralized networks for IoT devices, storage, and connectivity',
      marketCap: 'Medium',
      difficulty: 'Advanced',
      duration: '4-6h',
      icon: <Network className="w-6 h-6" />,
      href: '/education/market-categories/depin-infrastructure',
      modules: 6,
      completed: 0,
      phase: 3,
      examples: ['Helium (HNT)', 'Filecoin (FIL)', 'Arweave (AR)', 'Hivemapper (HONEY)', 'Render Network (RNDR)'],
      whyImportant: 'Tokenizing real-world infrastructure; bridges digital/physical economies'
    },
    {
      id: 'interoperability-bridges',
      title: 'Interoperability & Bridges',
      description: 'Cross-chain communication and multi-blockchain infrastructure',
      marketCap: 'Medium',
      difficulty: 'Advanced',
      duration: '3-5h',
      icon: <Globe className="w-6 h-6" />,
      href: '/education/market-categories/interoperability-bridges',
      modules: 4,
      completed: 0,
      phase: 3,
      examples: ['Polkadot (DOT)', 'Cosmos (ATOM)', 'Wormhole (W)', 'LayerZero (ZRO)', 'Axelar (AXL)'],
      whyImportant: 'Enables multi-chain future; solves blockchain siloing and fragmentation'
    },
    {
      id: 'dao-governance',
      title: 'DAO & Governance',
      description: 'Decentralized autonomous organizations and governance protocols',
      marketCap: 'Low',
      difficulty: 'Advanced',
      duration: '3-4h',
      icon: <Users className="w-6 h-6" />,
      href: '/education/market-categories/dao-governance',
      modules: 4,
      completed: 0,
      phase: 3,
      examples: ['Maker DAO (MKR)', 'Compound (COMP)', 'Gitcoin (GTC)', 'Aragon (ANT)', 'Snapshot'],
      whyImportant: 'Future of organizational structures; experiments in decentralized decision-making'
    },
    {
      id: 'web3-identity-data',
      title: 'Web3 Identity & Data',
      description: 'Decentralized identity, data ownership, and authentication systems',
      marketCap: 'Low',
      difficulty: 'Advanced',
      duration: '3-5h',
      icon: <Eye className="w-6 h-6" />,
      href: '/education/market-categories/web3-identity-data',
      modules: 4,
      completed: 0,
      phase: 3,
      examples: ['Ethereum Name Service (ENS)', 'Lens Protocol (LENS)', 'Unstoppable Domains', 'Ceramic', 'SPACE ID'],
      whyImportant: 'User-owned digital identity; foundation for decentralized social and data sovereignty'
    },
    {
      id: 'enterprise-rwa',
      title: 'Enterprise & RWA Tokenization',
      description: 'Real-world asset tokenization and institutional blockchain adoption',
      marketCap: 'High',
      difficulty: 'Advanced',
      duration: '4-6h',
      icon: <Factory className="w-6 h-6" />,
      href: '/education/market-categories/enterprise-rwa',
      modules: 5,
      completed: 0,
      phase: 3,
      examples: ['Franklin Templeton (FOBXX)', 'Centrifuge (CFG)', 'Maple Finance (MPL)', 'Goldfinch (GFI)', 'TrueFi (TRU)'],
      whyImportant: 'Bridges traditional finance to DeFi; massive total addressable market for asset tokenization'
    },
    {
      id: 'synthetic-prediction',
      title: 'Synthetic Assets & Prediction Markets',
      description: 'Synthetic financial instruments and decentralized prediction platforms',
      marketCap: 'Low',
      difficulty: 'Advanced',
      duration: '3-4h',
      icon: <Database className="w-6 h-6" />,
      href: '/education/market-categories/synthetic-prediction',
      modules: 4,
      completed: 0,
      phase: 3,
      examples: ['Synthetix (SNX)', 'Polymarket', 'Augur (REP)', 'UMA (UMA)', 'dYdX (DYDX)'],
      whyImportant: 'Advanced DeFi primitives; enables exposure to any asset without owning it; market efficiency through prediction'
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