'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { BookOpen, TrendingUp, Shield, Zap, Clock, Users, ArrowRight, Search, Trophy, Filter, Brain, Target, CheckCircle2, Banknote, PiggyBank, Coins, Building, Landmark, Network, Bot, Wrench, Home, CheckCircle, ChevronUp, ChevronDown, BarChart3, Star } from 'lucide-react'
import Breadcrumb from '../../../components/Breadcrumb'
import Tooltip from '../../../components/Tooltip'

// Performance optimization: Memoized module card component
import { memo, useCallback } from 'react'

const ModuleCard = memo(({ module, index, isAccessible, expandedCard, setExpandedCard, trackEvent, modules }: {
  module: any
  index: number
  isAccessible: boolean
  expandedCard: string | null
  setExpandedCard: (id: string | null) => void
  trackEvent: (event: string, properties: Record<string, any>) => void
  modules: any[]
}) => {
  const isExpanded = expandedCard === module.id
  
  const handleToggleExpand = useCallback(() => {
    const newExpandedState = isExpanded ? null : module.id
    console.log('🔧 Toggling card:', module.id, 'from', isExpanded, 'to', !isExpanded)
    setExpandedCard(newExpandedState)
    trackEvent('module_expanded', { moduleId: module.id, moduleTitle: module.title, expanded: !isExpanded })
  }, [isExpanded, module.id, module.title, setExpandedCard, trackEvent])

  return (
    <div 
      className={`bg-white rounded-xl shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-xl hover:border-blue-300 hover:scale-[1.02] overflow-hidden group ${
        !isAccessible ? 'opacity-60' : 
        module.completed ? 'ring-2 ring-green-100 hover:ring-green-200' : ''
      }`}
      role="article"
      aria-labelledby={`module-title-${module.id}`}
      aria-describedby={`module-description-${module.id}`}
      style={{
        animationDelay: `${index * 100}ms`
      }}
    >
      {/* Animated Progress Bar at Top */}
      {module.completed && (
        <div 
          className="h-1 bg-gradient-to-r from-green-400 to-green-600 w-full animate-in slide-in-from-left duration-1000"
          role="progressbar" 
          aria-valuenow={100} 
          aria-valuemin={0} 
          aria-valuemax={100}
          aria-label="Module completion progress"
        ></div>
      )}
      
      <div className="p-4 sm:p-6">
        {/* Header Section - Mobile Optimized */}
        <div className="flex items-start gap-3 mb-4">
          {/* Smaller Icon for Mobile */}
          <div className="relative flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
              module.completed ? 
                'bg-green-50 border border-green-200 group-hover:bg-green-100' : 
                'bg-blue-50 border border-blue-100 group-hover:bg-blue-100'
            }`}>
              {module.completed ? (
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              ) : (
                <div className="text-blue-600 [&>svg]:w-5 [&>svg]:h-5 sm:[&>svg]:w-6 sm:[&>svg]:h-6">
                  {module.icon}
                </div>
              )}
            </div>
            
          </div>
          
          {/* Title and Essential Info Only - Mobile First */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 
                id={`module-title-${module.id}`}
                className="text-lg sm:text-xl font-semibold text-gray-900 leading-tight line-clamp-2"
              >
                {module.title}
              </h3>
              {module.completed && (
                <div className="flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
            
            {/* Single Primary Badge Only - Mobile Optimized */}
            <div className="flex items-center gap-2 mb-3">
              <span 
                className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                  module.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                  module.difficulty === 'Intermediate' ? 'bg-blue-100 text-blue-700' :
                  'bg-purple-100 text-purple-700'
                }`}
              >
                {module.difficulty}
              </span>
              <span className="text-xs text-gray-500">
                {module.duration}
              </span>
            </div>
          </div>
        </div>

        {/* Mobile: Hide description by default, show on expand */}
        <div className="hidden sm:block mb-4">
          <p 
            id={`module-description-${module.id}`}
            className="text-gray-600 text-sm leading-relaxed"
          >
            {module.description}
          </p>
        </div>
        
        {/* Simplified Expandable - Mobile First */}
        <div className="mb-4">
          {/* Mobile: Show on tap only */}
          <div className="sm:hidden">
            <button
              onClick={handleToggleExpand}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium py-1"
              aria-expanded={isExpanded}
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
          
          {/* Desktop: Always show details button */}
          <div className="hidden sm:block">
            <button
              onClick={handleToggleExpand}
              className="flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium"
              aria-expanded={isExpanded}
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

        {/* Compact CTA - Mobile Optimized */}
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

// Add proper memoization comparison
const ModuleCardMemo = memo(ModuleCard, (prevProps, nextProps) => {
  return (
    prevProps.module.id === nextProps.module.id &&
    prevProps.isAccessible === nextProps.isAccessible &&
    prevProps.expandedCard === nextProps.expandedCard &&
    prevProps.index === nextProps.index
  )
})

interface LearningModule {
  id: string
  title: string
  description: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string
  icon: React.ReactNode
  href: string
  topics: string[]
  completed: boolean
  recommendedBackground?: string // Optional soft guidance instead of hard prerequisites
  masteryLevel: 'none' | 'basic' | 'good' | 'excellent'
  categories: string[] // Primary categorization: Blockchain, DeFi, NFTs, Trading, Security, etc.
}

interface UserPreferences {
  learningPath: 'guided' | 'self-paced'
  minimalMode: boolean
  focusOnMastery: boolean
}

export default function EducationModulesPage() {
  const [completedModules, setCompletedModules] = useState<string[]>([])
  const [masteryLevels, setMasteryLevels] = useState<Record<string, string>>({})
  const [preferences, setPreferences] = useState<UserPreferences>({
    learningPath: 'guided',
    minimalMode: false,
    focusOnMastery: true  // Always enabled internally
  })

  const [filterDifficulty, setFilterDifficulty] = useState<'all' | 'Beginner' | 'Intermediate' | 'Advanced'>('all')
  const [filterProgress, setFilterProgress] = useState<'all' | 'not-started' | 'completed'>('all')
  const [filterCategory, setFilterCategory] = useState<'all' | 'Fundamentals' | 'Trading' | 'DeFi' | 'Investment' | 'Advanced'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showPreferences, setShowPreferences] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  // Analytics tracking function
  const trackEvent = (eventName: string, properties: Record<string, any>) => {
    if (typeof window !== 'undefined') {
      // Console logging for development - replace with your analytics service
      console.log('📊 Analytics Event:', eventName, properties)
      
      // Example integration points:
      // gtag('event', eventName, properties)
      // mixpanel.track(eventName, properties)
      // analytics.track(eventName, properties)
      
      // Store in localStorage for now (replace with proper analytics)
      const events = JSON.parse(localStorage.getItem('educationAnalytics') || '[]')
      events.push({
        timestamp: new Date().toISOString(),
        event: eventName,
        properties
      })
      localStorage.setItem('educationAnalytics', JSON.stringify(events.slice(-100))) // Keep last 100 events
    }
  }

  useEffect(() => {
    // Load data from localStorage
    const completed = JSON.parse(localStorage.getItem('completedEducationModules') || '[]')
    const mastery = JSON.parse(localStorage.getItem('educationMasteryLevels') || '{}')
    const userPrefs = JSON.parse(localStorage.getItem('educationPreferences') || '{}')
    
    setCompletedModules(completed)
    setMasteryLevels(mastery)
    setPreferences({ ...preferences, ...userPrefs })
  }, [])

  const savePreferences = (newPrefs: UserPreferences) => {
    setPreferences(newPrefs)
    localStorage.setItem('educationPreferences', JSON.stringify(newPrefs))
  }

  // Helper function to get valid mastery level
  const getMasteryLevel = (moduleId: string): 'none' | 'basic' | 'good' | 'excellent' => {
    const level = masteryLevels[moduleId] || 'none'
    if (['none', 'basic', 'good', 'excellent'].includes(level)) {
      return level as 'none' | 'basic' | 'good' | 'excellent'
    }
    return 'none'
  }

  const modules: LearningModule[] = [
    {
      id: 'crypto-history',
      title: 'Crypto History & Major Milestones',
      description: 'From Bitcoin whitepaper to DeFi Summer: the evolution and key moments that shaped crypto',
      difficulty: 'Beginner',
      duration: '22 min',
      icon: <BookOpen className="w-6 h-6" />,
      href: '/education/modules/crypto-history',
      topics: ['Bitcoin Genesis', 'Major Crashes', 'DeFi Summer', 'Regulatory Milestones', 'Institutional Adoption'],
      completed: completedModules.includes('crypto-history'),
      recommendedBackground: 'No prior knowledge required - great for understanding context',
      masteryLevel: getMasteryLevel('crypto-history'),
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
      completed: completedModules.includes('getting-started'),
      recommendedBackground: 'No prior knowledge required - perfect starting point',
      masteryLevel: getMasteryLevel('getting-started'),
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
      completed: completedModules.includes('bitcoin-basics'),
      recommendedBackground: 'Basic understanding of traditional money systems helpful',
      masteryLevel: getMasteryLevel('bitcoin-basics'),
      categories: ['Blockchain', 'Cryptocurrency', 'Mining']
    },
    {
      id: 'money-systems',
      title: 'Money & Financial Systems',
      description: 'Understanding the foundation of modern money and banking',
      difficulty: 'Beginner',
      duration: '18 min',
      icon: <Banknote className="w-6 h-6" />,
      href: '/education/modules/money-systems',
      topics: ['Fiat Money', 'Central Banking', 'Inflation', 'Financial History'],
      completed: completedModules.includes('money-systems'),
      recommendedBackground: 'No prior knowledge required - foundational content',
      masteryLevel: getMasteryLevel('money-systems'),
      categories: ['Finance', 'Banking', 'Economics']
    },
    {
      id: 'how-it-works',
      title: 'How Blockchain Works',
      description: 'The technology behind cryptocurrencies explained',
      difficulty: 'Beginner',
      duration: '22 min',
      icon: <Zap className="w-6 h-6" />,
      href: '/education/modules/how-it-works',
      topics: ['Cryptography', 'Consensus', 'Nodes', 'Immutability'],
      completed: completedModules.includes('how-it-works'),
      recommendedBackground: 'Basic understanding of Bitcoin helpful but not required',
      masteryLevel: getMasteryLevel('how-it-works'),
      categories: ['Blockchain', 'Technology', 'Cryptography']
    },
    {
      id: 'consensus-blockchain-types',
      title: 'Consensus & Blockchain Types',
      description: 'Proof of Work vs Proof of Stake: different consensus mechanisms and blockchain architectures',
      difficulty: 'Beginner',
      duration: '26 min',
      icon: <Users className="w-6 h-6" />,
      href: '/education/modules/consensus-blockchain-types',
      topics: ['Proof of Work', 'Proof of Stake', 'Delegated PoS', 'Consensus Mechanisms', 'Blockchain Types'],
      completed: completedModules.includes('consensus-blockchain-types'),
      recommendedBackground: 'Understanding of basic blockchain concepts helpful',
      masteryLevel: getMasteryLevel('consensus-blockchain-types'),
      categories: ['Consensus', 'Technology', 'Infrastructure']
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
      completed: completedModules.includes('ethereum-smart-contracts'),
      recommendedBackground: 'Understanding of blockchain basics and Bitcoin concepts helpful',
      masteryLevel: getMasteryLevel('ethereum-smart-contracts'),
      categories: ['Ethereum', 'Smart Contracts', 'DApps']
    },
    {
      id: 'defi-tools',
      title: 'Getting Hands-On: Wallets and Crypto Tools',
      description: 'Level up with advanced wallets, portfolio trackers, and practical crypto tools for daily use',
      difficulty: 'Beginner',
      duration: '25 min',
      icon: <Wrench className="w-6 h-6" />,
      href: '/education/modules/defi-tools',
      topics: ['Advanced Wallets', 'Portfolio Trackers', 'TradingView Setup', 'Multi-Chain Tools'],
      completed: completedModules.includes('defi-tools'),
      recommendedBackground: 'Basic crypto knowledge helpful for practical application',
      masteryLevel: getMasteryLevel('defi-tools'),
      categories: ['Tools', 'Portfolio', 'Security']
    },
    {
      id: 'stablecoins',
      title: 'Stablecoins: The Bridge to Digital Finance',
      description: 'Price-stable cryptocurrencies connecting traditional and digital money',
      difficulty: 'Intermediate',
      duration: '23 min',
      icon: <Target className="w-6 h-6" />,
      href: '/education/modules/stablecoins',
      topics: ['Price Stability', 'USDC', 'USDT', 'Algorithmic Stablecoins'],
      completed: completedModules.includes('stablecoins'),
      recommendedBackground: 'Understanding of traditional finance and basic crypto concepts',
      masteryLevel: getMasteryLevel('stablecoins'),
      categories: ['Stablecoins', 'DeFi', 'Finance']
    },
    {
      id: 'tokenomics',
      title: 'Tokenomics & Crypto Incentives',
      description: 'Token economics: supply models, inflation/deflation, staking rewards, and incentive design',
      difficulty: 'Intermediate',
      duration: '27 min',
      icon: <Coins className="w-6 h-6" />,
      href: '/education/modules/tokenomics',
      topics: ['Token Supply Models', 'Inflation vs Deflation', 'Staking Economics', 'Governance Tokens', 'Incentive Alignment'],
      completed: completedModules.includes('tokenomics'),
      recommendedBackground: 'Understanding of basic crypto concepts and DeFi helpful',
      masteryLevel: getMasteryLevel('tokenomics'),
      categories: ['Economics', 'Tokenomics', 'Incentives']
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
      completed: completedModules.includes('nfts-digital-ownership'),
      recommendedBackground: 'Understanding of Ethereum and smart contracts helpful',
      masteryLevel: getMasteryLevel('nfts-digital-ownership'),
      categories: ['NFTs', 'Digital Art', 'Gaming']
    },
    {
      id: 'crypto-trading-investing',
      title: 'Crypto Trading & Investing',
      description: 'Practical investing: DCA strategies, basic risk management, and tax-efficient crypto investing',
      difficulty: 'Intermediate',
      duration: '35 min',
      icon: <TrendingUp className="w-6 h-6" />,
      href: '/education/modules/crypto-trading-investing',
      topics: ['Dollar-Cost Averaging', 'Basic Portfolio Theory', 'Tax Planning', 'Rebalancing', 'Exit Strategies'],
      completed: completedModules.includes('crypto-trading-investing'),
      recommendedBackground: 'Basic understanding of crypto wallets and exchanges',
      masteryLevel: getMasteryLevel('crypto-trading-investing'),
      categories: ['Trading', 'Investing', 'Finance']
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
      completed: completedModules.includes('defi-fundamentals'),
      recommendedBackground: 'Familiarity with crypto wallets and basic blockchain concepts',
      masteryLevel: getMasteryLevel('defi-fundamentals'),
      categories: ['DeFi', 'Lending', 'Trading']
    },
    {
      id: 'real-world-assets',
      title: 'Real World Assets (RWA): Tokenizing Everything',
      description: 'How traditional assets are being moved onto blockchain',
      difficulty: 'Intermediate',
      duration: '25 min',
      icon: <Landmark className="w-6 h-6" />,
      href: '/education/modules/real-world-assets',
      topics: ['Asset Tokenization', 'BlackRock BUIDL', 'Real Estate', 'Compliance'],
      completed: completedModules.includes('real-world-assets'),
      recommendedBackground: 'Understanding of both traditional assets and blockchain technology',
      masteryLevel: getMasteryLevel('real-world-assets'),
      categories: ['RWA', 'Tokenization', 'Finance']
    },
    {
      id: 'dao-governance',
      title: 'DAO Governance & Web3 Future',
      description: 'Decentralized Autonomous Organizations: governance, voting, and the future of work and ownership',
      difficulty: 'Intermediate',
      duration: '24 min',
      icon: <Users className="w-6 h-6" />,
      href: '/education/modules/dao-governance',
      topics: ['DAO Structure', 'Governance Tokens', 'Proposal Voting', 'Web3 Organizations', 'Decentralized Work'],
      completed: completedModules.includes('dao-governance'),
      recommendedBackground: 'Understanding of smart contracts and DeFi protocols helpful',
      masteryLevel: getMasteryLevel('dao-governance'),
      categories: ['Governance', 'DAOs', 'Web3']
    },
    {
      id: 'institutional-crypto',
      title: 'Institutional Crypto: Custody & Compliance',
      description: 'How major institutions safely manage cryptocurrency assets',
      difficulty: 'Intermediate',
      duration: '22 min',
      icon: <Building className="w-6 h-6" />,
      href: '/education/modules/institutional-crypto',
      topics: ['Custody Solutions', 'Compliance', 'Coinbase Custody', 'Anchorage'],
      completed: completedModules.includes('institutional-crypto'),
      recommendedBackground: 'Knowledge of crypto basics and regulatory frameworks helpful',
      masteryLevel: getMasteryLevel('institutional-crypto'),
      categories: ['Custody', 'Institutional', 'Compliance']
    },
    {
      id: 'cbdcs',
      title: 'CBDCs: Government Digital Currencies',
      description: 'How governments are creating their own digital currencies',
      difficulty: 'Advanced',
      duration: '20 min',
      icon: <Banknote className="w-6 h-6" />,
      href: '/education/modules/cbdcs',
      topics: ['Digital Yuan', 'Digital Euro', 'Monetary Policy', 'Privacy vs Control'],
      completed: completedModules.includes('cbdcs'),
      recommendedBackground: 'Understanding of monetary policy and digital currency concepts',
      masteryLevel: getMasteryLevel('cbdcs'),
      categories: ['CBDCs', 'Government', 'Policy']
    },
    {
      id: 'layer1-diversity',
      title: 'Layer 1 & Layer 0: Beyond Ethereum',
      description: 'Exploring Solana, Avalanche, Cosmos, Polkadot: different approaches to blockchain scaling and design',
      difficulty: 'Advanced',
      duration: '29 min',
      icon: <Network className="w-6 h-6" />,
      href: '/education/modules/layer1-diversity',
      topics: ['Solana Architecture', 'Avalanche Consensus', 'Cosmos Hub', 'Polkadot Parachains', 'Layer 0 Protocols'],
      completed: completedModules.includes('layer1-diversity'),
      recommendedBackground: 'Strong understanding of Ethereum and consensus mechanisms',
      masteryLevel: getMasteryLevel('layer1-diversity'),
      categories: ['Layer 1', 'Scalability', 'Infrastructure']
    },
    {
      id: 'cross-chain-finance',
      title: 'Cross-Chain Finance: Connecting Ecosystems',
      description: 'How different blockchains interact and connect',
      difficulty: 'Advanced',
      duration: '24 min',
      icon: <Network className="w-6 h-6" />,
      href: '/education/modules/cross-chain-finance',
      topics: ['Bridges', 'Interoperability', 'Multi-Chain', 'Layer 2s'],
      completed: completedModules.includes('cross-chain-finance'),
      recommendedBackground: 'Solid understanding of blockchain technology and multiple protocols',
      masteryLevel: getMasteryLevel('cross-chain-finance'),
      categories: ['Interoperability', 'Bridges', 'Infrastructure']
    },
    {
      id: 'defai',
      title: 'AI in Decentralized Finance (DeFi)',
      description: 'AI-powered DeFi: machine learning for yield optimization, automated trading bots, and predictive analytics',
      difficulty: 'Advanced',
      duration: '26 min',
      icon: <Bot className="w-6 h-6" />,
      href: '/education/modules/defai',
      topics: ['ML-Driven Yield Farming', 'Trading Algorithms', 'Risk Prediction', 'Automated DeFi Strategies'],
      completed: completedModules.includes('defai'),
      recommendedBackground: 'Experience with DeFi protocols and basic AI/ML concepts helpful',
      masteryLevel: getMasteryLevel('defai'),
      categories: ['AI', 'DeFi', 'Automation']
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
      completed: completedModules.includes('advanced'),
      recommendedBackground: 'Extensive DeFi experience and understanding of portfolio management',
      masteryLevel: getMasteryLevel('advanced'),
      categories: ['Advanced Strategies', 'Portfolio', 'Risk Management']
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
      completed: completedModules.includes('security'),
      recommendedBackground: 'Experience with crypto storage and basic security concepts',
      masteryLevel: getMasteryLevel('security'),
      categories: ['Security', 'Risk Management', 'Storage']
    },
    {
      id: 'regulation-ethics',
      title: 'Regulation, Ethics & Law in Crypto',
      description: 'Legal landscapes, privacy debates, environmental concerns, and ethical considerations in crypto',
      difficulty: 'Advanced',
      duration: '31 min',
      icon: <Landmark className="w-6 h-6" />,
      href: '/education/modules/regulation-ethics',
      topics: ['Global Regulation', 'Privacy vs Compliance', 'Environmental Impact', 'Ethical Debates', 'Legal Risks'],
      completed: completedModules.includes('regulation-ethics'),
      recommendedBackground: 'General understanding of crypto ecosystem and global finance',
      masteryLevel: getMasteryLevel('regulation-ethics'),
      categories: ['Regulation', 'Ethics', 'Legal']
    }
  ]

  // Remove the canAccessModule function entirely - all modules are now freely accessible

  // Helper function to map specific categories to main categories
  const getMainCategory = (categories: string[]) => {
    const fundamentals = ['History', 'Blockchain', 'Technology', 'Security', 'Cryptocurrency', 'Cryptography', 'Mining', 'Context', 'Milestones', 'Wallets', 'Consensus']
    const trading = ['Trading', 'Investing', 'Finance', 'Exchanges', 'Economics', 'Banking']
    const defi = ['DeFi', 'Lending', 'Stablecoins', 'Smart Contracts', 'DApps', 'Ethereum', 'NFTs', 'Digital Art', 'Gaming']
    const investment = ['Portfolio', 'Risk Management', 'Tools', 'Tokenomics', 'Incentives']
    const advanced = ['Advanced Strategies', 'Institutional', 'CBDCs', 'Government', 'Policy', 'Regulation', 'Ethics', 'Legal', 'Layer 1', 'Scalability', 'Infrastructure', 'Interoperability', 'Bridges', 'AI', 'Automation', 'Governance', 'DAOs', 'Web3', 'Compliance', 'Custody', 'RWA', 'Tokenization']

    for (const category of categories) {
      if (fundamentals.some(f => category.includes(f))) return 'Fundamentals'
      if (trading.some(t => category.includes(t))) return 'Trading'
      if (defi.some(d => category.includes(d))) return 'DeFi'
      if (investment.some(i => category.includes(i))) return 'Investment'
      if (advanced.some(a => category.includes(a))) return 'Advanced'
    }
    return 'Fundamentals' // Default fallback
  }

  const filteredAndSortedModules = modules
    .filter(module => {
      const matchesSearch = module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           module.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           module.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesDifficulty = filterDifficulty === 'all' || module.difficulty === filterDifficulty
      const matchesProgress = filterProgress === 'all' || (module.completed ? 'completed' : 'not-started') === filterProgress
      const matchesCategory = filterCategory === 'all' || getMainCategory(module.categories) === filterCategory

      return matchesSearch && matchesDifficulty && matchesProgress && matchesCategory
    })
    .sort((a, b) => {
      // Default sort: logical learning progression (fundamentals first, then by difficulty within each category)
      const categoryOrder = { 'Fundamentals': 1, 'Trading': 2, 'DeFi': 3, 'Investment': 4, 'Advanced': 5 }
      const difficultyOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 }
      
      const aCategory = getMainCategory(a.categories)
      const bCategory = getMainCategory(b.categories)
      
      // First sort by category
      if (categoryOrder[aCategory] !== categoryOrder[bCategory]) {
        return categoryOrder[aCategory] - categoryOrder[bCategory]
      }
      
      // Then by difficulty within same category
      if (difficultyOrder[a.difficulty] !== difficultyOrder[b.difficulty]) {
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
      }
      
      // Finally alphabetically
      return a.title.localeCompare(b.title)
    })

  const progressPercentage = Math.round((completedModules.length / modules.length) * 100)

  const masteryColors = {
    none: 'bg-gray-200 text-gray-600',
    basic: 'bg-yellow-100 text-yellow-700',
    good: 'bg-blue-100 text-blue-700',
    excellent: 'bg-green-100 text-green-700'
  }

  const masteryLabels = {
    none: 'Not Started',
    basic: 'Basic',
    good: 'Good',
    excellent: 'Excellent'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          
          {/* Breadcrumb Navigation */}
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/', icon: <Home className="w-4 h-4" /> },
              { label: 'Education', current: true, icon: <BookOpen className="w-4 h-4" /> }
            ]} 
            className="mb-4" 
          />

          {/* Learning Journey Header */}
          <div className="mb-8">
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-gray-900">Your Crypto Learning Journey</h1>
              <p className="text-gray-600 mt-2">Master cryptocurrency from basics to advanced concepts</p>
            </div>
          </div>

          {/* Main Progress Overview */}
          {/* Simplified Progress - Mobile First */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
            {/* Mobile: Compact Progress */}
            <div className="sm:hidden">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Your Progress</h2>
                  <p className="text-sm text-gray-600">{completedModules.length}/{modules.length} modules</p>
                </div>
                <div className="text-2xl font-bold text-blue-600">{progressPercentage}%</div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              
              {completedModules.length >= 3 && (
                <button 
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                  onClick={() => setShowPreferences(!showPreferences)}
                  title="View detailed progress breakdown and display preferences"
                >
                  {showPreferences ? '↑ Hide options' : '↓ Display options'}
                </button>
              )}
            </div>
            
            {/* Desktop: Full Progress Display */}
            <div className="hidden sm:block">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Your Learning Progress</h2>
                    <p className="text-gray-600">{completedModules.length} of {modules.length} modules completed</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600">{progressPercentage}%</div>
                  <div className="text-sm text-gray-500">Complete</div>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div 
                  className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
            
            {/* Expandable Progress Breakdown */}
            {showPreferences && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6 pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                  <div>
                    <div className="text-xs sm:text-sm text-gray-500">Beginner</div>
                    <div className="text-sm sm:text-base font-semibold">{modules.filter(m => m.difficulty === 'Beginner' && m.completed).length}/{modules.filter(m => m.difficulty === 'Beginner').length}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Target className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                  <div>
                    <div className="text-xs sm:text-sm text-gray-500">Intermediate</div>
                    <div className="text-sm sm:text-base font-semibold">{modules.filter(m => m.difficulty === 'Intermediate' && m.completed).length}/{modules.filter(m => m.difficulty === 'Intermediate').length}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3 col-span-2 sm:col-span-1">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                  <div>
                    <div className="text-xs sm:text-sm text-gray-500">Advanced</div>
                    <div className="text-sm sm:text-base font-semibold">{modules.filter(m => m.difficulty === 'Advanced' && m.completed).length}/{modules.filter(m => m.difficulty === 'Advanced').length}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Simplified Preferences - Only Essential Options */}
            {showPreferences && completedModules.length >= 3 && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">Display Options</h3>
                <div className="space-y-3">
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={preferences.minimalMode}
                        onChange={(e) => savePreferences({...preferences, minimalMode: e.target.checked})}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-700">Minimal interface mode</span>
                      <span className="text-xs text-gray-500">(reduces visual complexity)</span>
                    </label>
                  </div>
                  
                  {/* Progressive disclosure: Show after more experience */}
                  {completedModules.length >= 5 && (
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Learning Style</label>
                      <select
                        value={preferences.learningPath}
                        onChange={(e) => savePreferences({...preferences, learningPath: e.target.value as 'guided' | 'self-paced'})}
                        className="text-sm border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="guided">📋 Guided (recommended path)</option>
                        <option value="self-paced">🎯 Self-paced (choose your own)</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Simplified Search and Filters - Mobile First */}
            <div className="space-y-4 mb-6">
              {/* Mobile: Compact Search + Filter Button */}
              <div className="sm:hidden">
                <div className="flex gap-2 mb-3">
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
                    className="px-3 py-2 border border-gray-300 rounded-lg flex items-center gap-1 text-sm bg-white hover:bg-gray-50"
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
                      <option value="Trading">📈 Trading</option>
                      <option value="DeFi">🏦 DeFi</option>
                      <option value="Investment">💰 Investment</option>
                      <option value="Advanced">🚀 Advanced</option>
                    </select>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={filterDifficulty}
                        onChange={(e) => setFilterDifficulty(e.target.value as typeof filterDifficulty)}
                        className="px-2 py-2 border border-gray-300 rounded text-sm"
                      >
                        <option value="all">All Levels</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                      
                      <select
                        value={filterProgress}
                        onChange={(e) => setFilterProgress(e.target.value as typeof filterProgress)}
                        className="px-2 py-2 border border-gray-300 rounded text-sm"
                      >
                        <option value="all">📚 All Status</option>
                        <option value="not-started">⭐ Not Started</option>
                        <option value="completed">✅ Completed</option>
                      </select>
                    </div>
                    

                  </div>
                )}
              </div>
              
              {/* Desktop: Full Filter Layout */}
              <div className="hidden sm:block">
                <div className="flex gap-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="🔍 Search modules, topics, or categories..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="flex gap-3">
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value as typeof filterCategory)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      <option value="all">📚 All Topics</option>
                      <option value="Fundamentals">🔰 Fundamentals</option>
                      <option value="Trading">📈 Trading</option>
                      <option value="DeFi">🏦 DeFi</option>
                      <option value="Investment">💰 Investment</option>
                      <option value="Advanced">🚀 Advanced</option>
                    </select>
                    

                    
                    <select
                      value={filterDifficulty}
                      onChange={(e) => setFilterDifficulty(e.target.value as typeof filterDifficulty)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      <option value="all">📚 All Levels</option>
                      <option value="Beginner">🟢 Beginner</option>
                      <option value="Intermediate">🟡 Intermediate</option>
                      <option value="Advanced">🔴 Advanced</option>
                    </select>
                    
                    <select
                      value={filterProgress}
                      onChange={(e) => setFilterProgress(e.target.value as typeof filterProgress)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      <option value="all">📚 All Status</option>
                      <option value="not-started">⭐ Not Started</option>
                      <option value="completed">✅ Completed</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Simplified Active Filters */}
              {(searchTerm || filterDifficulty !== 'all' || filterProgress !== 'all') && (
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-xs text-gray-500">Filters:</span>
                  {searchTerm && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs flex items-center">
                      "{searchTerm}"
                      <button onClick={() => setSearchTerm('')} className="ml-1 text-blue-500">×</button>
                    </span>
                  )}
                  {filterDifficulty !== 'all' && (
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs flex items-center">
                      {filterDifficulty}
                      <button onClick={() => setFilterDifficulty('all')} className="ml-1 text-purple-500">×</button>
                    </span>
                  )}
                  {filterProgress !== 'all' && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs flex items-center">
                      {filterProgress === 'not-started' ? '⭐ Not Started' : '✅ Completed'}
                      <button onClick={() => setFilterProgress('all')} className="ml-1 text-green-500">×</button>
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Module Grid - Mobile List, Desktop Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {filteredAndSortedModules.map((module, index) => {
              const isAccessible = true // All modules are now freely accessible
              const progressPercentage = module.completed ? 100 : 0
              
              return (
                <ModuleCardMemo
                  key={module.id} 
                  module={module} 
                  index={index} 
                  isAccessible={isAccessible} 
                  expandedCard={expandedCard} 
                  setExpandedCard={setExpandedCard} 
                  trackEvent={trackEvent} 
                  modules={modules}
                />
              )
            })}
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