'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { BookOpen, TrendingUp, Shield, Zap, Clock, Users, ArrowRight, Search, Trophy, Filter, Settings, Brain, Target, CheckCircle2, Banknote, PiggyBank, Coins, Building, Landmark, Network, Bot, Wrench } from 'lucide-react'

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
  prerequisites: string[]
  masteryLevel: 'none' | 'basic' | 'good' | 'excellent'
}

interface UserPreferences {
  learningPath: 'guided' | 'self-paced'
  allowSkipPrerequisites: boolean
  minimalMode: boolean
  focusOnMastery: boolean
}

export default function EducationModulesPage() {
  const [completedModules, setCompletedModules] = useState<string[]>([])
  const [masteryLevels, setMasteryLevels] = useState<Record<string, string>>({})
  const [preferences, setPreferences] = useState<UserPreferences>({
    learningPath: 'guided',
    allowSkipPrerequisites: true,
    minimalMode: false,
    focusOnMastery: true
  })
  const [sortBy, setSortBy] = useState<'difficulty' | 'duration' | 'progress'>('difficulty')
  const [filterDifficulty, setFilterDifficulty] = useState<'all' | 'Beginner' | 'Intermediate' | 'Advanced'>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showPreferences, setShowPreferences] = useState(false)

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
      href: '/education/getting-started',
      topics: ['Exchanges', 'Wallets', 'Private Keys', 'First Purchase'],
      completed: completedModules.includes('getting-started'),
      prerequisites: [],
      masteryLevel: getMasteryLevel('getting-started')
    },
    {
      id: 'bitcoin-basics',
      title: 'Bitcoin Basics',
      description: 'The first cryptocurrency and digital money revolution',
      difficulty: 'Beginner',
      duration: '15 min',
      icon: <Coins className="w-6 h-6" />,
      href: '/education/bitcoin-basics',
      topics: ['Digital Gold', 'Blockchain', 'Mining', 'Decentralization'],
      completed: completedModules.includes('bitcoin-basics'),
      prerequisites: ['getting-started'],
      masteryLevel: getMasteryLevel('bitcoin-basics')
    },
    {
      id: 'money-systems',
      title: 'Money & Financial Systems',
      description: 'Understanding the foundation of modern money and banking',
      difficulty: 'Beginner',
      duration: '18 min',
      icon: <Banknote className="w-6 h-6" />,
      href: '/education/money-systems',
      topics: ['Fiat Money', 'Central Banking', 'Inflation', 'Financial History'],
      completed: completedModules.includes('money-systems'),
      prerequisites: ['bitcoin-basics'],
      masteryLevel: getMasteryLevel('money-systems')
    },
    {
      id: 'how-it-works',
      title: 'How Blockchain Works',
      description: 'The technology behind cryptocurrencies explained',
      difficulty: 'Beginner',
      duration: '22 min',
      icon: <Zap className="w-6 h-6" />,
      href: '/education/how-it-works',
      topics: ['Cryptography', 'Consensus', 'Nodes', 'Immutability'],
      completed: completedModules.includes('how-it-works'),
      prerequisites: ['money-systems'],
      masteryLevel: getMasteryLevel('how-it-works')
    },
    {
      id: 'defi-tools',
      title: 'DeFi Tools & Practical Setup',
      description: 'Essential tools for portfolio tracking, analytics, and on-chain activities',
      difficulty: 'Beginner',
      duration: '25 min',
      icon: <Wrench className="w-6 h-6" />,
      href: '/education/defi-tools',
      topics: ['Portfolio Tracking', 'TradingView', 'Multi-Chain Wallets', 'Security Tools'],
      completed: completedModules.includes('defi-tools'),
      prerequisites: ['how-it-works'],
      masteryLevel: getMasteryLevel('defi-tools')
    },
    {
      id: 'stablecoins',
      title: 'Stablecoins: The Bridge to Digital Finance',
      description: 'Price-stable cryptocurrencies connecting traditional and digital money',
      difficulty: 'Intermediate',
      duration: '23 min',
      icon: <Target className="w-6 h-6" />,
      href: '/education/stablecoins',
      topics: ['Price Stability', 'USDC', 'USDT', 'Algorithmic Stablecoins'],
      completed: completedModules.includes('stablecoins'),
      prerequisites: ['defi-tools'],
      masteryLevel: getMasteryLevel('stablecoins')
    },
    {
      id: 'defi-fundamentals',
      title: 'DeFi Fundamentals: Banking Without Banks',
      description: 'Decentralized finance protocols and how they work',
      difficulty: 'Intermediate',
      duration: '28 min',
      icon: <Building className="w-6 h-6" />,
      href: '/education/defi-fundamentals',
      topics: ['Lending', 'DEXs', 'Yield Farming', 'Smart Contracts'],
      completed: completedModules.includes('defi-fundamentals'),
      prerequisites: ['stablecoins'],
      masteryLevel: getMasteryLevel('defi-fundamentals')
    },
    {
      id: 'real-world-assets',
      title: 'Real World Assets (RWA): Tokenizing Everything',
      description: 'How traditional assets are being moved onto blockchain',
      difficulty: 'Intermediate',
      duration: '25 min',
      icon: <Landmark className="w-6 h-6" />,
      href: '/education/real-world-assets',
      topics: ['Asset Tokenization', 'BlackRock BUIDL', 'Real Estate', 'Compliance'],
      completed: completedModules.includes('real-world-assets'),
      prerequisites: ['defi-fundamentals'],
      masteryLevel: getMasteryLevel('real-world-assets')
    },
    {
      id: 'institutional-crypto',
      title: 'Institutional Crypto: Custody & Compliance',
      description: 'How major institutions safely manage cryptocurrency assets',
      difficulty: 'Intermediate',
      duration: '22 min',
      icon: <Building className="w-6 h-6" />,
      href: '/education/institutional-crypto',
      topics: ['Custody Solutions', 'Compliance', 'Coinbase Custody', 'Anchorage'],
      completed: completedModules.includes('institutional-crypto'),
      prerequisites: ['real-world-assets'],
      masteryLevel: getMasteryLevel('institutional-crypto')
    },
    {
      id: 'cbdcs',
      title: 'CBDCs: Government Digital Currencies',
      description: 'How governments are creating their own digital currencies',
      difficulty: 'Advanced',
      duration: '20 min',
      icon: <Banknote className="w-6 h-6" />,
      href: '/education/cbdcs',
      topics: ['Digital Yuan', 'Digital Euro', 'Monetary Policy', 'Privacy vs Control'],
      completed: completedModules.includes('cbdcs'),
      prerequisites: ['institutional-crypto'],
      masteryLevel: getMasteryLevel('cbdcs')
    },
    {
      id: 'cross-chain-finance',
      title: 'Cross-Chain Finance: Connecting Ecosystems',
      description: 'How different blockchains interact and connect',
      difficulty: 'Advanced',
      duration: '24 min',
      icon: <Network className="w-6 h-6" />,
      href: '/education/cross-chain-finance',
      topics: ['Bridges', 'Interoperability', 'Multi-Chain', 'Layer 2s'],
      completed: completedModules.includes('cross-chain-finance'),
      prerequisites: ['cbdcs'],
      masteryLevel: getMasteryLevel('cross-chain-finance')
    },
    {
      id: 'defai',
      title: 'DeFAI: AI-Powered Decentralized Finance',
      description: 'The intersection of artificial intelligence and decentralized finance',
      difficulty: 'Advanced',
      duration: '26 min',
      icon: <Bot className="w-6 h-6" />,
      href: '/education/defai',
      topics: ['AI Trading', 'Automated Strategies', 'Machine Learning', 'Predictive Analytics'],
      completed: completedModules.includes('defai'),
      prerequisites: ['cross-chain-finance'],
      masteryLevel: getMasteryLevel('defai')
    },
    {
      id: 'advanced',
      title: 'Advanced Topics',
      description: 'Advanced strategies and concepts for experienced users',
      difficulty: 'Advanced',
      duration: '35 min',
      icon: <Brain className="w-6 h-6" />,
      href: '/education/advanced',
      topics: ['DeFi Strategies', 'Portfolio Theory', 'Risk Models', 'Tax Optimization'],
      completed: completedModules.includes('advanced'),
      prerequisites: ['defai'],
      masteryLevel: getMasteryLevel('advanced')
    },
    {
      id: 'security',
      title: 'Security & Risk Management',
      description: 'Protecting your cryptocurrency investments and managing risks',
      difficulty: 'Advanced',
      duration: '28 min',
      icon: <Shield className="w-6 h-6" />,
      href: '/education/security',
      topics: ['Cold Storage', 'Multi-sig', 'Risk Assessment', 'Insurance'],
      completed: completedModules.includes('security'),
      prerequisites: ['advanced'],
      masteryLevel: getMasteryLevel('security')
    }
  ]

  const canAccessModule = (module: LearningModule) => {
    if (preferences.allowSkipPrerequisites) return true
    return module.prerequisites.every(prereq => completedModules.includes(prereq))
  }

  const filteredAndSortedModules = modules
    .filter(module => {
      const matchesSearch = module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           module.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           module.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesDifficulty = filterDifficulty === 'all' || module.difficulty === filterDifficulty
      return matchesSearch && matchesDifficulty
    })
    .sort((a, b) => {
      if (sortBy === 'difficulty') {
        const difficultyOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 }
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
      } else if (sortBy === 'duration') {
        return parseInt(a.duration) - parseInt(b.duration)
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
          
          {/* Header */}
          <div className="flex items-center justify-between">
            <Link href="/education" className="inline-flex items-center text-blue-600 hover:text-blue-700">
              <ArrowRight className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </div>

          {/* Course Overview */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">All Learning Modules</h1>
                <p className="text-gray-600 mt-2">Complete curriculum from basics to advanced concepts</p>
              </div>
              <button
                onClick={() => setShowPreferences(!showPreferences)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
            </div>
            
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
                  <Clock className="w-8 h-8 text-purple-500 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-purple-700">
                      {Math.round((modules.length - completedModules.length) * 22)}min
                    </div>
                    <div className="text-sm text-purple-600">Time Remaining</div>
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
                        checked={preferences.allowSkipPrerequisites}
                        onChange={(e) => savePreferences({...preferences, allowSkipPrerequisites: e.target.checked})}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-700">Allow skipping prerequisites</span>
                    </label>
                  </div>
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
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search modules..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="difficulty">Sort by Difficulty</option>
                  <option value="duration">Sort by Duration</option>
                  <option value="progress">Sort by Progress</option>
                </select>
                <select
                  value={filterDifficulty}
                  onChange={(e) => setFilterDifficulty(e.target.value as typeof filterDifficulty)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>
          </div>

          {/* Module Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedModules.map((module) => {
              const isAccessible = canAccessModule(module)
              
              return (
                <div key={module.id} className={`bg-white rounded-lg shadow-sm border-2 transition-all duration-200 ${
                  !isAccessible ? 'border-gray-200 opacity-60' : 
                  module.completed ? 'border-green-200 hover:border-green-300' : 
                  'border-gray-200 hover:border-blue-300 hover:shadow-md'
                }`}>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg ${
                        module.completed ? 'bg-green-100' : 'bg-blue-100'
                      }`}>
                        {module.completed ? (
                          <CheckCircle2 className="w-6 h-6 text-green-600" />
                        ) : (
                          module.icon
                        )}
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          module.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                          module.difficulty === 'Intermediate' ? 'bg-blue-100 text-blue-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                          {module.difficulty}
                        </span>
                        {module.completed && (
                          <span className={`text-xs px-2 py-1 rounded-full ${masteryColors[module.masteryLevel]}`}>
                            {masteryLabels[module.masteryLevel]}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{module.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{module.description}</p>
                    
                    <div className="flex items-center text-gray-500 text-sm mb-4">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{module.duration}</span>
                      <Users className="w-4 h-4 ml-4 mr-1" />
                      <span>{module.topics.length} topics</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {module.topics.map((topic, index) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {topic}
                        </span>
                      ))}
                    </div>
                    
                    {!preferences.allowSkipPrerequisites && module.prerequisites.length > 0 && (
                      <div className="mb-4">
                        <div className="text-xs text-gray-500 mb-1">Prerequisites:</div>
                        <div className="flex flex-wrap gap-1">
                          {module.prerequisites.map((prereq) => {
                            const prereqModule = modules.find(m => m.id === prereq)
                            const isPrereqCompleted = completedModules.includes(prereq)
                            return (
                              <span key={prereq} className={`text-xs px-2 py-1 rounded ${
                                isPrereqCompleted ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                              }`}>
                                {prereqModule?.title || prereq}
                                {isPrereqCompleted && ' ✓'}
                              </span>
                            )
                          })}
                        </div>
                      </div>
                    )}
                    
                    <Link
                      href={isAccessible ? module.href : '#'}
                      className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        !isAccessible ? 'bg-gray-100 text-gray-400 cursor-not-allowed' :
                        module.completed ? 'bg-green-50 text-green-700 hover:bg-green-100' :
                        'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                      onClick={(e) => !isAccessible && e.preventDefault()}
                    >
                      {module.completed ? 'Review Module' : 'Start Learning'}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
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