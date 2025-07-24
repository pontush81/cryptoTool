'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { BookOpen, TrendingUp, Shield, Zap, Clock, Users, ArrowRight, Search, Trophy, Filter, Settings, Brain, Target, CheckCircle2, Banknote, PiggyBank, Coins, Building, Landmark, Network, Bot, Wrench, Home, CheckCircle, ChevronUp, ChevronDown, BarChart3, Star } from 'lucide-react'
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
      
      <div className="p-8">
        {/* Header Section with Enhanced Micro-interactions */}
        <div className="flex items-start gap-4 mb-6">
          {/* Icon with Progress Ring and Hover Effects */}
          <div className="relative flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${
              module.completed ? 
                'bg-green-50 border-2 border-green-200 group-hover:bg-green-100 group-hover:border-green-300' : 
                'bg-blue-50 border-2 border-blue-100 group-hover:bg-blue-100 group-hover:border-blue-200'
            }`}>
              {module.completed ? (
                <CheckCircle className="w-8 h-8 text-green-600 animate-in zoom-in duration-500" />
              ) : (
                <div className="text-blue-600 group-hover:text-blue-700 transition-colors duration-300">
                  {module.icon}
                </div>
              )}
            </div>
            
            {/* Animated Completion Badge */}
            {module.completed && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            )}
            
            {/* Subtle pulse effect for incomplete modules */}
            {!module.completed && isAccessible && (
              <div className="absolute inset-0 rounded-2xl bg-blue-400 opacity-0 group-hover:animate-ping"></div>
            )}
          </div>
          
          {/* Title and Badges with Improved Accessibility */}
          <div className="flex-1 min-w-0">
            <h3 
              id={`module-title-${module.id}`}
              className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-900 transition-colors duration-300"
            >
              {module.title}
            </h3>
            
            {/* Enhanced Badges with Hover States */}
            <div className="flex items-center gap-2 mb-2">
              <Tooltip content={`${module.difficulty} level - Appropriate skill level for this module`}>
                <span 
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-help focus:ring-2 focus:ring-offset-2 ${
                    module.difficulty === 'Beginner' ? 
                      'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 hover:border-green-300 focus:ring-green-500' :
                    module.difficulty === 'Intermediate' ? 
                      'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 hover:border-blue-300 focus:ring-blue-500' :
                      'bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 hover:border-purple-300 focus:ring-purple-500'
                  }`}
                  role="button"
                  tabIndex={0}
                  aria-label={`Difficulty level: ${module.difficulty}`}
                >
                  <Target className="w-3 h-3 mr-1" />
                  {module.difficulty}
                </span>
              </Tooltip>
              
              <Tooltip content={`${module.difficulty} level - Complexity rating for this module`}>
                <span 
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-help focus:ring-2 focus:ring-offset-2 ${
                    module.difficulty === 'Beginner' ? 
                      'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300 focus:ring-emerald-500' :
                    module.difficulty === 'Intermediate' ? 
                      'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 hover:border-amber-300 focus:ring-amber-500' :
                      'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 hover:border-red-300 focus:ring-red-500'
                  }`}
                  role="button"
                  tabIndex={0}
                  aria-label={`Difficulty level: ${module.difficulty}`}
                >
                  <Target className="w-3 h-3 mr-1" />
                  {module.difficulty}
                </span>
              </Tooltip>
            </div>
          </div>
        </div>

        {/* Description with Improved Readability */}
        <p 
          id={`module-description-${module.id}`}
          className="text-gray-600 text-base leading-relaxed mb-6 group-hover:text-gray-700 transition-colors duration-300"
        >
          {module.description}
        </p>

        {/* Enhanced Meta Information with Icons */}
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
          <div className="flex items-center gap-1 hover:text-gray-700 transition-colors duration-200">
            <Clock className="w-4 h-4" />
            <span>{module.duration}</span>
          </div>
          <div className="flex items-center gap-1 hover:text-gray-700 transition-colors duration-200">
            <Users className="w-4 h-4" />
            <span>{module.topics.length} topics</span>
          </div>
          {module.categories.length > 0 && (
            <div className="flex items-center gap-1 hover:text-gray-700 transition-colors duration-200">
              <Filter className="w-4 h-4" />
              <span>{module.categories.length} categories</span>
            </div>
          )}
        </div>
        
        {/* Enhanced Expandable Details with Better UX */}
        <div className="mb-6">
          <button
            onClick={handleToggleExpand}
            className="flex items-center text-sm text-blue-600 hover:text-blue-800 focus:text-blue-800 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md px-2 py-1 -mx-2"
            aria-expanded={isExpanded}
            aria-controls={`module-details-${module.id}`}
            aria-label={isExpanded ? `Hide details for ${module.title}` : `View learning details for ${module.title}`}
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4 mr-1 transition-transform duration-200" />
                Hide details
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-1 transition-transform duration-200" />
                View learning details
              </>
            )}
          </button>
          
          {/* Enhanced Expanded Content */}
          {isExpanded && (
            <div 
              id={`module-details-${module.id}`}
              className="mt-4 p-4 bg-gray-50 rounded-lg animate-in slide-in-from-top duration-300"
              role="region"
              aria-label={`Detailed information for ${module.title}`}
            >
              <div className="space-y-4">
                {/* Recommended Background - Soft Guidance */}
                {module.recommendedBackground && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-blue-800">{module.recommendedBackground}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">What You'll Learn</h4>
                  <div className="flex flex-wrap gap-2">
                    {module.topics.slice(0, 4).map((topic: string, index: number) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full hover:bg-blue-200 transition-colors duration-200 cursor-default animate-in fade-in"
                        style={{
                          animationDelay: `${index * 50}ms`
                        }}
                      >
                        {topic}
                      </span>
                    ))}
                    {module.topics.length > 4 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{module.topics.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Action Section with Gamification */}
        <div className="pt-4 border-t border-gray-100">
          <Link
            href={module.href}
            className={`w-full inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-base transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 ${
              module.completed ? 
                'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 hover:shadow-xl transform hover:-translate-y-1 focus:ring-green-500 group/btn' :
                'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:shadow-xl transform hover:-translate-y-1 focus:ring-blue-500 group/btn'
            }`}
            onClick={() => {
              trackEvent('module_started', { moduleId: module.id, moduleTitle: module.title })
            }}
            aria-label={module.completed ? `Review completed module: ${module.title}` : `Start learning module: ${module.title}`}
            role="button"
          >
            {module.completed ? (
              <>
                <Trophy className="w-5 h-5 mr-2 group-hover/btn:animate-bounce" />
                Review Module
              </>
            ) : (
              <>
                <ArrowRight className="w-5 h-5 mr-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                Start Learning
              </>
            )}
          </Link>
          
          {/* Enhanced Progress Messaging with Animations */}
          {module.completed && (
            <div className="text-center mt-3 animate-in fade-in duration-500">
              <p className="text-sm text-green-600 font-medium mb-1">
                ✨ Module completed!
              </p>
              <div className="flex items-center justify-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '150ms'}}></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '300ms'}}></div>
              </div>
            </div>
          )}
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
    focusOnMastery: true
  })
  const [sortBy, setSortBy] = useState<'recommended' | 'duration' | 'difficulty' | 'progress'>('recommended')
  const [filterDifficulty, setFilterDifficulty] = useState<'all' | 'Beginner' | 'Intermediate' | 'Advanced'>('all')

  const [filterProgress, setFilterProgress] = useState<'all' | 'not-started' | 'in-progress' | 'completed'>('all')
  const [filterCategory, setFilterCategory] = useState<string>('all')
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
      id: 'getting-started',
      title: 'Getting Started',
      description: 'How to buy, store, and use cryptocurrency safely',
      difficulty: 'Beginner',
      duration: '20 min',
      icon: <TrendingUp className="w-6 h-6" />,
      href: '/education/modules/getting-started',
      topics: ['Exchanges', 'Wallets', 'Private Keys', 'First Purchase'],
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
      id: 'ethereum-smart-contracts',
      title: 'Ethereum & Smart Contracts',
      description: 'The programmable blockchain enabling DeFi, NFTs, and decentralized applications',
      difficulty: 'Beginner',
      duration: '30 min',
      icon: <Network className="w-6 h-6" />,
      href: '/education/modules/ethereum-smart-contracts',
      topics: ['Smart Contracts', 'EVM', 'Gas Fees', 'DApps', 'Ethereum 2.0'],
      completed: completedModules.includes('ethereum-smart-contracts'),
      recommendedBackground: 'Understanding of blockchain basics and Bitcoin concepts helpful',
      masteryLevel: getMasteryLevel('ethereum-smart-contracts'),
      categories: ['Ethereum', 'Smart Contracts', 'DApps']
    },
    {
      id: 'defi-tools',
      title: 'DeFi Tools & Practical Setup',
      description: 'Essential tools for portfolio tracking, analytics, and on-chain activities',
      difficulty: 'Beginner',
      duration: '25 min',
      icon: <Wrench className="w-6 h-6" />,
      href: '/education/modules/defi-tools',
      topics: ['Portfolio Tracking', 'TradingView', 'Multi-Chain Wallets', 'Security Tools'],
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
      description: 'Strategies for buying, holding, and trading cryptocurrencies safely',
      difficulty: 'Intermediate',
      duration: '35 min',
      icon: <TrendingUp className="w-6 h-6" />,
      href: '/education/modules/crypto-trading-investing',
      topics: ['Portfolio Strategy', 'Technical Analysis', 'Risk Management', 'Tax Planning', 'Dollar-Cost Averaging'],
      completed: completedModules.includes('crypto-trading-investing'),
      recommendedBackground: 'Basic understanding of crypto wallets and exchanges',
      masteryLevel: getMasteryLevel('crypto-trading-investing'),
      categories: ['Trading', 'Investing', 'Finance']
    },
    {
      id: 'defi-fundamentals',
      title: 'DeFi Fundamentals: Banking Without Banks',
      description: 'Decentralized finance protocols and how they work',
      difficulty: 'Intermediate',
      duration: '28 min',
      icon: <Building className="w-6 h-6" />,
      href: '/education/modules/defi-fundamentals',
      topics: ['Lending', 'DEXs', 'Yield Farming', 'Smart Contracts'],
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
      title: 'DeFAI: AI-Powered Decentralized Finance',
      description: 'The intersection of artificial intelligence and decentralized finance',
      difficulty: 'Advanced',
      duration: '26 min',
      icon: <Bot className="w-6 h-6" />,
      href: '/education/modules/defai',
      topics: ['AI Trading', 'Automated Strategies', 'Machine Learning', 'Predictive Analytics'],
      completed: completedModules.includes('defai'),
      recommendedBackground: 'Experience with DeFi protocols and basic AI/ML concepts helpful',
      masteryLevel: getMasteryLevel('defai'),
      categories: ['AI', 'DeFi', 'Automation']
    },
    {
      id: 'advanced',
      title: 'Advanced Topics',
      description: 'Advanced strategies and concepts for experienced users',
      difficulty: 'Advanced',
      duration: '35 min',
      icon: <Brain className="w-6 h-6" />,
      href: '/education/modules/advanced',
      topics: ['DeFi Strategies', 'Portfolio Theory', 'Risk Models', 'Tax Optimization'],
      completed: completedModules.includes('advanced'),
      recommendedBackground: 'Extensive DeFi experience and understanding of portfolio management',
      masteryLevel: getMasteryLevel('advanced'),
      categories: ['Advanced Strategies', 'Portfolio', 'Risk Management']
    },
    {
      id: 'security',
      title: 'Security & Risk Management',
      description: 'Protecting your cryptocurrency investments and managing risks',
      difficulty: 'Advanced',
      duration: '28 min',
      icon: <Shield className="w-6 h-6" />,
      href: '/education/modules/security',
      topics: ['Cold Storage', 'Multi-sig', 'Risk Assessment', 'Insurance'],
      completed: completedModules.includes('security'),
      recommendedBackground: 'Experience with crypto storage and basic security concepts',
      masteryLevel: getMasteryLevel('security'),
      categories: ['Security', 'Risk Management', 'Storage']
    }
  ]

  // Remove the canAccessModule function entirely - all modules are now freely accessible

  const filteredAndSortedModules = modules
    .filter(module => {
      const matchesSearch = module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           module.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           module.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesDifficulty = filterDifficulty === 'all' || module.difficulty === filterDifficulty
      const matchesProgress = filterProgress === 'all' || (module.completed ? 'completed' : 'not-started') === filterProgress
      const matchesCategory = filterCategory === 'all' || module.categories.some(cat => cat.toLowerCase().includes(filterCategory.toLowerCase()))

      return matchesSearch && matchesDifficulty && matchesProgress && matchesCategory
    })
    .sort((a, b) => {
      if (sortBy === 'recommended') {
        // Simple recommendation: completed modules first, then by mastery level
        if (a.completed && !b.completed) return -1
        if (!a.completed && b.completed) return 1
        if (a.completed && b.completed) {
          const masteryOrder = { 'excellent': 4, 'good': 3, 'basic': 2, 'none': 1 }
          return masteryOrder[b.masteryLevel] - masteryOrder[a.masteryLevel]
        }
        return 0
      } else if (sortBy === 'duration') {
        return parseInt(a.duration) - parseInt(b.duration)
      } else if (sortBy === 'difficulty') {
        const difficultyOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 }
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
      } else {
        // Sort by progress (completed first, then by mastery level)
        if (a.completed && !b.completed) return -1
        if (!a.completed && b.completed) return 1
        if (a.completed && b.completed) {
          const masteryOrder = { 'excellent': 4, 'good': 3, 'basic': 2, 'none': 1 }
          return masteryOrder[b.masteryLevel] - masteryOrder[a.masteryLevel]
        }
        return 0
      }
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
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Your Crypto Learning Journey</h1>
                <p className="text-gray-600 mt-2">Master cryptocurrency from basics to advanced concepts</p>
              </div>
              <button
                onClick={() => setShowPreferences(!showPreferences)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
            </div>
          </div>

          {/* Main Progress Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
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
            
            {/* Learning Progress Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <BookOpen className="w-5 h-5 text-blue-500" />
                <div>
                  <div className="text-sm text-gray-500">Beginner Level</div>
                  <div className="font-semibold">{modules.filter(m => m.difficulty === 'Beginner' && m.completed).length} of {modules.filter(m => m.difficulty === 'Beginner').length} completed</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Target className="w-5 h-5 text-green-500" />
                <div>
                  <div className="text-sm text-gray-500">Intermediate Level</div>
                  <div className="font-semibold">{modules.filter(m => m.difficulty === 'Intermediate' && m.completed).length} of {modules.filter(m => m.difficulty === 'Intermediate').length} completed</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Zap className="w-5 h-5 text-purple-500" />
                <div>
                  <div className="text-sm text-gray-500">Advanced Level</div>
                  <div className="font-semibold">{modules.filter(m => m.difficulty === 'Advanced' && m.completed).length} of {modules.filter(m => m.difficulty === 'Advanced').length} completed</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Overview */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Overview</h3>
            
            {/* Progress Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <Trophy className="w-8 h-8 text-blue-500 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-blue-700">{completedModules.length}</div>
                    <div className="text-sm text-blue-600">Modules Completed</div>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <Target className="w-8 h-8 text-green-500 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-green-700">{progressPercentage}%</div>
                    <div className="text-sm text-green-600">Progress</div>
                  </div>
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <BookOpen className="w-8 h-8 text-purple-500 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-purple-700">
                      {modules.length - completedModules.length}
                    </div>
                    <div className="text-sm text-purple-600">Modules Remaining</div>
                  </div>
                </div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <Brain className="w-8 h-8 text-orange-500 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-orange-700">
                      {Object.values(masteryLevels).filter(level => ['good', 'excellent'].includes(level)).length}
                    </div>
                    <div className="text-sm text-orange-600">High Mastery</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>

            {/* Preferences Panel */}
            {showPreferences && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">Learning Preferences</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={preferences.focusOnMastery}
                        onChange={(e) => savePreferences({...preferences, focusOnMastery: e.target.checked})}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-700">Focus on mastery levels</span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={preferences.minimalMode}
                        onChange={(e) => savePreferences({...preferences, minimalMode: e.target.checked})}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-700">Minimal interface mode</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Learning Path</label>
                    <select
                      value={preferences.learningPath}
                      onChange={(e) => savePreferences({...preferences, learningPath: e.target.value as 'guided' | 'self-paced'})}
                      className="text-sm border border-gray-300 rounded px-2 py-1"
                    >
                      <option value="guided">Guided</option>
                      <option value="self-paced">Self-paced</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Search and Filters */}
            <div className="space-y-4 mb-6">
              {/* Search Bar */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="🔍 Search modules, topics, or categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                  />
                </div>
              </div>
              
              {/* Filter Chips */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="recommended">📋 Recommended</option>
                    <option value="duration">⏱️ Duration</option>
                    <option value="difficulty">📈 Difficulty</option>
                    <option value="progress">✅ Progress</option>
                  </select>
                </div>
                

                
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">Level:</span>
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
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">Progress:</span>
                  <select
                    value={filterProgress}
                    onChange={(e) => setFilterProgress(e.target.value as typeof filterProgress)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="all">📊 All Progress</option>
                    <option value="not-started">⚪ Not Started</option>
                    <option value="in-progress">🟡 In Progress</option>
                    <option value="completed">✅ Completed</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">Category:</span>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="all">🏷️ All Categories</option>
                    <option value="Exchanges">💱 Exchanges</option>
                    <option value="Wallets">👛 Wallets</option>
                    <option value="Blockchain">⛓️ Blockchain</option>
                    <option value="Mining">⛏️ Mining</option>
                    <option value="Stablecoins">💲 Stablecoins</option>
                    <option value="DeFi">🏦 DeFi</option>
                    <option value="NFTs">🖼️ NFTs</option>
                    <option value="Security">🔒 Security</option>
                    <option value="Trading">📈 Trading</option>
                    <option value="Compliance">📋 Compliance</option>
                  </select>
                </div>
              </div>
              
              {/* Active Filters */}
              {(searchTerm || filterDifficulty !== 'all' || filterProgress !== 'all' || filterCategory !== 'all') && (
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-sm text-gray-500">Active filters:</span>
                  {searchTerm && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center">
                      🔍 "{searchTerm}"
                      <button onClick={() => setSearchTerm('')} className="ml-2 text-blue-500 hover:text-blue-700">×</button>
                    </span>
                  )}
                  {filterDifficulty !== 'all' && (
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center">
                      📚 {filterDifficulty}
                      <button onClick={() => setFilterDifficulty('all')} className="ml-2 text-purple-500 hover:text-purple-700">×</button>
                    </span>
                  )}
                  {filterProgress !== 'all' && (
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm flex items-center">
                      📊 {filterProgress}
                      <button onClick={() => setFilterProgress('all')} className="ml-2 text-orange-500 hover:text-orange-700">×</button>
                    </span>
                  )}
                  {filterCategory !== 'all' && (
                    <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm flex items-center">
                      🏷️ {filterCategory}
                      <button onClick={() => setFilterCategory('all')} className="ml-2 text-pink-500 hover:text-pink-700">×</button>
                    </span>
                  )}
                  <button 
                    onClick={() => {
                      setSearchTerm('')
                      setFilterDifficulty('all')
                      setFilterProgress('all')
                      setFilterCategory('all')
                    }}
                    className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Module Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
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