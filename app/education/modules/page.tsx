'use client'

import { useState, useEffect, memo, useCallback } from 'react'
import Link from 'next/link'
import { BookOpen, TrendingUp, Shield, Zap, Clock, Users, ArrowRight, Search, Trophy, Filter, Brain, Target, CheckCircle2, Banknote, PiggyBank, Coins, Building, Landmark, Network, Bot, Wrench, Home, CheckCircle, ChevronUp, ChevronDown, BarChart3, Star } from 'lucide-react'
import Breadcrumb from '../../../components/Breadcrumb'

// Module Card Component
const ModuleCard = memo(({ module, index, trackEvent }: {
  module: any
  index: number
  trackEvent: (event: string, properties: Record<string, any>) => void
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleToggleExpand = useCallback(() => {
    setIsExpanded(!isExpanded)
    trackEvent('module_expanded', { moduleId: module.id, moduleTitle: module.title, expanded: !isExpanded })
  }, [isExpanded, module.id, module.title, trackEvent])

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-xl hover:border-blue-300 hover:scale-[1.02] overflow-hidden group">
      {module.completed && (
        <div className="h-1 bg-gradient-to-r from-green-400 to-green-600 w-full"></div>
      )}
      
      <div className="p-4 sm:p-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="relative flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
              module.completed ? 
                'bg-green-50 border border-green-200 group-hover:bg-green-100' : 
                'bg-blue-50 border border-blue-100 group-hover:bg-blue-100'
            }`}>
              {module.completed ? (
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              ) : (
                <div className="text-blue-600">
                  {module.icon}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 leading-tight">
                {module.title}
              </h3>
              {module.completed && (
                <div className="flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2 mb-3">
              <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                module.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                module.difficulty === 'Intermediate' ? 'bg-blue-100 text-blue-700' :
                'bg-purple-100 text-purple-700'
              }`}>
                {module.difficulty}
              </span>
              <span className="text-xs text-gray-500">
                {module.duration}
              </span>
            </div>
          </div>
        </div>

        <div className="hidden sm:block mb-4">
          <p className="text-gray-600 text-sm leading-relaxed">
            {module.description}
          </p>
        </div>
        
        <div className="mb-4">
          <div className="sm:hidden">
            <button
              onClick={handleToggleExpand}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium py-1"
            >
              {isExpanded ? '↑ Less info' : '↓ More info'}
            </button>
            
            {isExpanded && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg text-sm space-y-2">
                <p className="text-gray-600">{module.description}</p>
                <div className="flex flex-wrap gap-1">
                  {module.topics.slice(0, 3).map((topic: string, index: number) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                      {topic}
                    </span>
                  ))}
                  {module.topics.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      +{module.topics.length - 3}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <div className="hidden sm:block">
            <button
              onClick={handleToggleExpand}
              className="flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              <ChevronDown className={`w-4 h-4 mr-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
              Learning details
            </button>
            
            {isExpanded && (
              <div className="mt-3 p-4 bg-gray-50 rounded-lg space-y-3">
                {module.recommendedBackground && (
                  <div className="bg-blue-50 border border-blue-200 rounded p-3">
                    <p className="text-sm text-blue-800">{module.recommendedBackground}</p>
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Topics covered</h4>
                  <div className="flex flex-wrap gap-2">
                    {module.topics.map((topic: string, index: number) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Users className="w-3 h-3" />
            <span>{module.topics.length} topics</span>
          </div>
          
          <Link
            href={module.href}
            className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              module.completed ? 
                'bg-green-600 text-white hover:bg-green-700' :
                'bg-blue-600 text-white hover:bg-blue-700'
            }`}
            onClick={() => trackEvent('module_started', { moduleId: module.id, moduleTitle: module.title })}
          >
            {module.completed ? (
              <>
                <Trophy className="w-4 h-4 mr-2" />
                Review
              </>
            ) : (
              <>
                <ArrowRight className="w-4 h-4 mr-2" />
                Start
              </>
            )}
          </Link>
        </div>
      </div>
    </div>
  )
})

ModuleCard.displayName = 'ModuleCard'

export default function EducationModulesPage() {
  const [completedModules, setCompletedModules] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDifficulty, setFilterDifficulty] = useState<'all' | 'Beginner' | 'Intermediate' | 'Advanced'>('all')
  const [filterProgress, setFilterProgress] = useState<'all' | 'not-started' | 'in-progress' | 'completed'>('all')
  const [filterCategory, setFilterCategory] = useState<'all' | 'Fundamentals' | 'Wallets & Security' | 'Trading & Investment' | 'Blockchain Technology' | 'DeFi & DAOs' | 'NFTs & Digital Assets' | 'Regulation & Compliance' | 'Industry & Institutional'>('all')
  const [showPreferences, setShowPreferences] = useState(false)

  // Get completed modules from localStorage
  const completedModulesFromStorage = typeof window !== 'undefined' 
    ? JSON.parse(localStorage.getItem('completedEducationModules') || '[]') 
    : []

  // Get visited/started modules from localStorage  
  const visitedModules = typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('visitedEducationModules') || '[]')
    : []

  const trackEvent = (event: string, properties: Record<string, any>) => {
    console.log('📊 Event:', event, properties)
    
    if (event === 'module_started' && typeof window !== 'undefined') {
      const visitedModules = JSON.parse(localStorage.getItem('visitedEducationModules') || '[]')
      if (!visitedModules.includes(properties.moduleId)) {
        visitedModules.push(properties.moduleId)
        localStorage.setItem('visitedEducationModules', JSON.stringify(visitedModules))
      }
    }
  }

  // Helper function to get module progress status
  const getModuleProgressStatus = (moduleId: string): 'not-started' | 'in-progress' | 'completed' => {
    if (completedModulesFromStorage.includes(moduleId)) {
      return 'completed'
    }
    if (visitedModules.includes(moduleId)) {
      return 'in-progress'
    }
    return 'not-started'
  }

  const modules = [
    {
      id: 'crypto-history',
      title: 'Crypto History & Major Milestones',
      description: 'From Bitcoin whitepaper to DeFi Summer: the evolution and key moments that shaped crypto',
      difficulty: 'Beginner',
      duration: '22 min',
      icon: <BookOpen className="w-6 h-6" />,
      href: '/education/modules/crypto-history',
      topics: ['Bitcoin Genesis', 'Major Crashes', 'DeFi Summer', 'Regulatory Milestones', 'Institutional Adoption'],
      completed: completedModulesFromStorage.includes('crypto-history'),
      recommendedBackground: 'No prior knowledge required - great for understanding context',
      categories: ['History', 'Context', 'Milestones']
    },
    {
      id: 'getting-started',
      title: 'Getting Started',
      description: 'Your first steps: choosing exchanges, basic wallets, and making your first crypto purchase',
      difficulty: 'Beginner',
      duration: '20 min',
      icon: <TrendingUp className="w-6 h-6" />,
      href: '/education/modules/getting-started',
      topics: ['Exchange Selection', 'Basic Wallets', 'First Purchase', 'Initial Setup'],
      completed: completedModulesFromStorage.includes('getting-started'),
      recommendedBackground: 'No prior knowledge required - perfect starting point',
      categories: ['Blockchain', 'Wallets', 'Exchanges']
    },
    {
      id: 'bitcoin-basics',
      title: 'Bitcoin Basics',
      description: 'The first cryptocurrency and digital money revolution',
      difficulty: 'Beginner',
      duration: '15 min',
      icon: <Coins className="w-6 h-6" />,
      href: '/education/modules/bitcoin-basics',
      topics: ['Digital Gold', 'Blockchain', 'Mining', 'Decentralization'],
      completed: completedModulesFromStorage.includes('bitcoin-basics'),
      recommendedBackground: 'Basic understanding of traditional money systems helpful',
      categories: ['Blockchain', 'Cryptocurrency', 'Mining']
    },
    {
      id: 'ethereum-smart-contracts',
      title: 'Ethereum & Smart Contracts',
      description: 'Understanding Ethereum as a programmable blockchain: smart contracts, gas fees, and the EVM',
      difficulty: 'Beginner',
      duration: '30 min',
      icon: <Network className="w-6 h-6" />,
      href: '/education/modules/ethereum-smart-contracts',
      topics: ['Smart Contract Basics', 'Ethereum Virtual Machine', 'Gas Economics', 'Ethereum 2.0', 'Layer 2 Solutions'],
      completed: completedModulesFromStorage.includes('ethereum-smart-contracts'),
      recommendedBackground: 'Understanding of blockchain basics and Bitcoin concepts helpful',
      categories: ['Ethereum', 'Smart Contracts', 'DApps']
    },
    {
      id: 'defi-fundamentals',
      title: 'DeFi Fundamentals: Banking Without Banks',
      description: 'Core DeFi protocols: Uniswap, Aave, Compound - lending, trading, and yield generation',
      difficulty: 'Intermediate',
      duration: '28 min',
      icon: <Building className="w-6 h-6" />,
      href: '/education/modules/defi-fundamentals',
      topics: ['AMM Trading', 'Lending Protocols', 'Yield Farming', 'Liquidity Mining', 'DeFi Composability'],
      completed: completedModulesFromStorage.includes('defi-fundamentals'),
      recommendedBackground: 'Familiarity with crypto wallets and basic blockchain concepts',
      categories: ['DeFi', 'Lending', 'Trading']
    },
    {
      id: 'nfts-digital-ownership',
      title: 'NFTs & Digital Ownership',
      description: 'Non-fungible tokens and the future of digital asset ownership',
      difficulty: 'Intermediate',
      duration: '25 min',
      icon: <Star className="w-6 h-6" />,
      href: '/education/modules/nfts-digital-ownership',
      topics: ['NFT Standards', 'Digital Art', 'Utility NFTs', 'Marketplaces', 'IP Rights'],
      completed: completedModulesFromStorage.includes('nfts-digital-ownership'),
      recommendedBackground: 'Understanding of Ethereum and smart contracts helpful',
      categories: ['NFTs', 'Digital Art', 'Gaming']
    },
    {
      id: 'security',
      title: 'Security & Risk Management',
      description: 'Enterprise-level security: cold storage, multi-sig, risk modeling, and institutional protection',
      difficulty: 'Advanced',
      duration: '28 min',
      icon: <Shield className="w-6 h-6" />,
      href: '/education/modules/security',
      topics: ['Cold Storage Systems', 'Multi-Sig Wallets', 'Risk Modeling', 'Crypto Insurance'],
      completed: completedModulesFromStorage.includes('security'),
      recommendedBackground: 'Experience with crypto storage and basic security concepts',
      categories: ['Security', 'Risk Management', 'Storage']
    },
    {
      id: 'advanced',
      title: 'Advanced Portfolio & DeFi Strategy',
      description: 'Quantitative strategies: advanced DeFi yield farming, risk modeling, and algorithmic portfolio management',
      difficulty: 'Advanced',
      duration: '35 min',
      icon: <Brain className="w-6 h-6" />,
      href: '/education/modules/advanced',
      topics: ['Quantitative DeFi', 'Risk Modeling', 'Yield Optimization', 'Algorithmic Trading', 'Advanced Tax Strategies'],
      completed: completedModulesFromStorage.includes('advanced'),
      recommendedBackground: 'Extensive DeFi experience and understanding of portfolio management',
      categories: ['Advanced Strategies', 'Portfolio', 'Risk Management']
    }
  ]

  // Helper function to map categories to main categories
  const getMainCategory = (categories: string[]) => {
    const fundamentals = ['History', 'Context', 'Milestones', 'Blockchain', 'Technology', 'Cryptocurrency', 'Cryptography', 'Mining', 'Consensus', 'Finance', 'Banking', 'Economics']
    const walletsAndSecurity = ['Wallets', 'Exchanges', 'Tools', 'Portfolio', 'Security', 'Risk Management', 'Storage']
    const tradingAndInvestment = ['Trading', 'Investing', 'Tokenomics', 'Incentives', 'Advanced Strategies']
    const blockchainTechnology = ['Ethereum', 'Smart Contracts', 'DApps', 'Layer 1', 'Scalability', 'Infrastructure', 'Interoperability', 'Bridges']
    const defiAndDaos = ['DeFi', 'Lending', 'Stablecoins', 'Governance', 'DAOs', 'Web3', 'AI', 'Automation']
    const nftsAndDigitalAssets = ['NFTs', 'Digital Art', 'Gaming', 'RWA', 'Tokenization']
    const regulationAndCompliance = ['Regulation', 'Ethics', 'Legal', 'CBDCs', 'Government', 'Policy']
    const industryAndInstitutional = ['Institutional', 'Custody', 'Compliance']

    for (const category of categories) {
      if (fundamentals.some(f => category.includes(f))) return 'Fundamentals'
      if (walletsAndSecurity.some(w => category.includes(w))) return 'Wallets & Security'
      if (tradingAndInvestment.some(t => category.includes(t))) return 'Trading & Investment'
      if (blockchainTechnology.some(b => category.includes(b))) return 'Blockchain Technology'
      if (defiAndDaos.some(d => category.includes(d))) return 'DeFi & DAOs'
      if (nftsAndDigitalAssets.some(n => category.includes(n))) return 'NFTs & Digital Assets'
      if (regulationAndCompliance.some(r => category.includes(r))) return 'Regulation & Compliance'
      if (industryAndInstitutional.some(i => category.includes(i))) return 'Industry & Institutional'
    }
    return 'Fundamentals'
  }

  const filteredAndSortedModules = modules
    .filter(module => {
      const matchesSearch = module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           module.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           module.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesDifficulty = filterDifficulty === 'all' || module.difficulty === filterDifficulty
      const matchesProgress = filterProgress === 'all' || getModuleProgressStatus(module.id) === filterProgress
      const matchesCategory = filterCategory === 'all' || getMainCategory(module.categories) === filterCategory

      return matchesSearch && matchesDifficulty && matchesProgress && matchesCategory
    })
    .sort((a, b) => {
      const categoryOrder = { 'Fundamentals': 1, 'Wallets & Security': 2, 'Trading & Investment': 3, 'Blockchain Technology': 4, 'DeFi & DAOs': 5, 'NFTs & Digital Assets': 6, 'Regulation & Compliance': 7, 'Industry & Institutional': 8 }
      const difficultyOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 }
      
      const aCategory = getMainCategory(a.categories)
      const bCategory = getMainCategory(b.categories)
      
      if (categoryOrder[aCategory as keyof typeof categoryOrder] !== categoryOrder[bCategory as keyof typeof categoryOrder]) {
        return categoryOrder[aCategory as keyof typeof categoryOrder] - categoryOrder[bCategory as keyof typeof categoryOrder]
      }
      
      if (difficultyOrder[a.difficulty as keyof typeof difficultyOrder] !== difficultyOrder[b.difficulty as keyof typeof difficultyOrder]) {
        return difficultyOrder[a.difficulty as keyof typeof difficultyOrder] - difficultyOrder[b.difficulty as keyof typeof difficultyOrder]
      }
      
      return a.title.localeCompare(b.title)
    })

  const progressPercentage = Math.round((completedModulesFromStorage.length / modules.length) * 100)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/', icon: <Home className="w-4 h-4" /> },
              { label: 'Education', current: true, icon: <BookOpen className="w-4 h-4" /> }
            ]} 
            className="mb-4" 
          />

          <div className="mb-8">
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-gray-900">Your Crypto Learning Journey</h1>
              <p className="text-gray-600 mt-2">Master cryptocurrency from basics to advanced concepts</p>
            </div>
          </div>

          {/* Find Courses Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Search className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Find Courses</h2>
                <p className="text-sm text-gray-600">Search and filter through {modules.length} learning modules</p>
              </div>
            </div>

            {/* Mobile: Compact Search + Filter Button */}
            <div className="sm:hidden">
              <div className="flex mb-3 bg-white p-3 rounded-lg border border-gray-100">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search modules..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <button
                  onClick={() => setShowPreferences(!showPreferences)}
                  className="ml-6 px-3 py-2 border border-gray-300 rounded-lg flex items-center gap-1 text-sm bg-white hover:bg-gray-50"
                >
                  <Filter className="w-4 h-4" />
                  {(filterDifficulty !== 'all' || filterProgress !== 'all' || filterCategory !== 'all') && (
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  )}
                </button>
              </div>
              
              {/* Mobile: Collapsed Filters */}
              {showPreferences && (
                <div className="space-y-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value as typeof filterCategory)}
                    className="w-full px-2 py-2 border border-gray-300 rounded text-sm"
                  >
                    <option value="all">📚 All Topics</option>
                    <option value="Fundamentals">🔰 Fundamentals</option>
                    <option value="Wallets & Security">🔒 Wallets & Security</option>
                    <option value="Trading & Investment">📈 Trading & Investment</option>
                    <option value="Blockchain Technology">🌐 Blockchain Technology</option>
                    <option value="DeFi & DAOs">🏦 DeFi & DAOs</option>
                    <option value="NFTs & Digital Assets">🎨 NFTs & Digital Assets</option>
                    <option value="Regulation & Compliance">⚖️ Regulation & Compliance</option>
                    <option value="Industry & Institutional">🏢 Industry & Institutional</option>
                  </select>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={filterDifficulty}
                      onChange={(e) => setFilterDifficulty(e.target.value as typeof filterDifficulty)}
                      className="w-full px-2 py-2 border border-gray-300 rounded text-sm"
                    >
                      <option value="all">All Levels</option>
                      <option value="Beginner">🔰 Beginner</option>
                      <option value="Intermediate">📈 Intermediate</option>
                      <option value="Advanced">🧠 Advanced</option>
                    </select>
                    
                    <select
                      value={filterProgress}
                      onChange={(e) => setFilterProgress(e.target.value as typeof filterProgress)}
                      className="w-full px-2 py-2 border border-gray-300 rounded text-sm"
                    >
                      <option value="all">🏷️ All Status</option>
                      <option value="not-started">📘 Not Started</option>
                      <option value="in-progress">🔄 In Progress</option>
                      <option value="completed">✅ Completed</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Desktop: Full Search and Filters */}
            <div className="hidden sm:block space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search modules..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex flex-wrap gap-4">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value as typeof filterCategory)}
                  className="px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="all">📚 All Topics</option>
                  <option value="Fundamentals">🔰 Fundamentals</option>
                  <option value="Wallets & Security">🔒 Wallets & Security</option>
                  <option value="Trading & Investment">📈 Trading & Investment</option>
                  <option value="Blockchain Technology">🌐 Blockchain Technology</option>
                  <option value="DeFi & DAOs">🏦 DeFi & DAOs</option>
                  <option value="NFTs & Digital Assets">🎨 NFTs & Digital Assets</option>
                  <option value="Regulation & Compliance">⚖️ Regulation & Compliance</option>
                  <option value="Industry & Institutional">🏢 Industry & Institutional</option>
                </select>
                
                <select
                  value={filterDifficulty}
                  onChange={(e) => setFilterDifficulty(e.target.value as typeof filterDifficulty)}
                  className="px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="all">All Levels</option>
                  <option value="Beginner">🔰 Beginner</option>
                  <option value="Intermediate">📈 Intermediate</option>
                  <option value="Advanced">🧠 Advanced</option>
                </select>
                
                <select
                  value={filterProgress}
                  onChange={(e) => setFilterProgress(e.target.value as typeof filterProgress)}
                  className="px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="all">🏷️ All Status</option>
                  <option value="not-started">📘 Not Started</option>
                  <option value="in-progress">🔄 In Progress</option>
                  <option value="completed">✅ Completed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Your Progress Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <BarChart3 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Your Progress</h2>
                <p className="text-sm text-gray-600">{completedModulesFromStorage.length} of {modules.length} modules completed • {progressPercentage}% complete</p>
              </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            
            {completedModulesFromStorage.length >= 3 && (
              <button 
                className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                onClick={() => setShowPreferences(!showPreferences)}
              >
                {showPreferences ? '↑ Hide details' : '↓ View details'}
              </button>
            )}
          </div>

          {/* Module Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {filteredAndSortedModules.map((module, index) => (
              <ModuleCard
                key={module.id} 
                module={module} 
                index={index} 
                trackEvent={trackEvent} 
              />
            ))}
          </div>

          {filteredAndSortedModules.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No modules found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}

        </div>
      </div>
    </div>
  )
} 