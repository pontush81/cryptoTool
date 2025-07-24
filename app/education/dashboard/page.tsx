'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { BookOpen, TrendingUp, Shield, Zap, Clock, Users, ArrowRight, Search, Trophy, Target, CheckCircle2, Banknote, Coins, Building, Landmark, Network, Bot, Wrench, BarChart3, Award, Calendar, User, Eye, PlayCircle, Star, ChevronRight, Progress } from 'lucide-react'

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
  track: 'foundation' | 'applications' | 'advanced'
}

interface TrackProgress {
  name: string
  modules: LearningModule[]
  completed: number
  total: number
  progress: number
  estimatedTime: string
  description: string
}

export default function EducationDashboard() {
  const [completedModules, setCompletedModules] = useState<string[]>([])
  const [masteryLevels, setMasteryLevels] = useState<Record<string, string>>({})
  const [totalTimeSpent, setTotalTimeSpent] = useState(0)

  useEffect(() => {
    // Load progress data from localStorage
    const completed = JSON.parse(localStorage.getItem('completedEducationModules') || '[]')
    const mastery = JSON.parse(localStorage.getItem('educationMasteryLevels') || '{}')
    const timeSpent = parseInt(localStorage.getItem('totalEducationTime') || '0')
    
    setCompletedModules(completed)
    setMasteryLevels(mastery)
    setTotalTimeSpent(timeSpent)
  }, [])

  const modules: LearningModule[] = [
    // Foundation Track
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
      prerequisites: [],
      masteryLevel: masteryLevels['money-systems'] || 'none',
      track: 'foundation'
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
      prerequisites: [],
      masteryLevel: masteryLevels['bitcoin-basics'] || 'none',
      track: 'foundation'
    },
    {
      id: 'how-it-works',
      title: 'How Blockchain Works',
      description: 'The technology behind cryptocurrencies explained',
      difficulty: 'Beginner',
      duration: '22 min',
      icon: <Network className="w-6 h-6" />,
      href: '/education/how-it-works',
      topics: ['Cryptography', 'Consensus', 'Nodes', 'Immutability'],
      completed: completedModules.includes('how-it-works'),
      prerequisites: ['bitcoin-basics'],
      masteryLevel: masteryLevels['how-it-works'] || 'none',
      track: 'foundation'
    },
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
      prerequisites: ['money-systems', 'bitcoin-basics'],
      masteryLevel: masteryLevels['getting-started'] || 'none',
      track: 'foundation'
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
      prerequisites: ['getting-started'],
      masteryLevel: masteryLevels['defi-tools'] || 'none',
      track: 'foundation'
    },
    
    // Applications Track (Intermediate)
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
      masteryLevel: masteryLevels['stablecoins'] || 'none',
      track: 'applications'
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
      masteryLevel: masteryLevels['defi-fundamentals'] || 'none',
      track: 'applications'
    },
    {
      id: 'real-world-assets',
      title: 'Real World Assets (RWA): Tokenizing Everything',
      description: 'How traditional assets are being moved onto blockchain',
      difficulty: 'Intermediate',
      duration: '25 min',
      icon: <Building className="w-6 h-6" />,
      href: '/education/real-world-assets',
      topics: ['Asset Tokenization', 'BlackRock BUIDL', 'Real Estate', 'Compliance'],
      completed: completedModules.includes('real-world-assets'),
      prerequisites: ['defi-fundamentals'],
      masteryLevel: masteryLevels['real-world-assets'] || 'none',
      track: 'applications'
    },
    {
      id: 'institutional-crypto',
      title: 'Institutional Crypto: Custody & Compliance',
      description: 'How major institutions safely manage cryptocurrency assets',
      difficulty: 'Intermediate',
      duration: '22 min',
      icon: <Shield className="w-6 h-6" />,
      href: '/education/institutional-crypto',
      topics: ['Custody Solutions', 'Compliance', 'Coinbase Custody', 'Anchorage'],
      completed: completedModules.includes('institutional-crypto'),
      prerequisites: ['real-world-assets'],
      masteryLevel: masteryLevels['institutional-crypto'] || 'none',
      track: 'applications'
    },
    
    // Advanced Track
    {
      id: 'cbdcs',
      title: 'CBDCs: Government Digital Currencies',
      description: 'How governments are creating their own digital currencies',
      difficulty: 'Advanced',
      duration: '20 min',
      icon: <Landmark className="w-6 h-6" />,
      href: '/education/cbdcs',
      topics: ['Digital Yuan', 'Digital Euro', 'Monetary Policy', 'Privacy vs Control'],
      completed: completedModules.includes('cbdcs'),
      prerequisites: ['institutional-crypto'],
      masteryLevel: masteryLevels['cbdcs'] || 'none',
      track: 'advanced'
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
      masteryLevel: masteryLevels['cross-chain-finance'] || 'none',
      track: 'advanced'
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
      masteryLevel: masteryLevels['defai'] || 'none',
      track: 'advanced'
    },
    {
      id: 'security',
      title: 'Security & Risk Management',
      description: 'Protecting your cryptocurrency investments',
      difficulty: 'Advanced',
      duration: '30 min',
      icon: <Shield className="w-6 h-6" />,
      href: '/education/security',
      topics: ['Cold Storage', 'Multi-sig', 'Risk Assessment', 'Insurance'],
      completed: completedModules.includes('security'),
      prerequisites: ['defai'],
      masteryLevel: masteryLevels['security'] || 'none',
      track: 'advanced'
    }
  ]

  // Group modules by track
  const tracks: TrackProgress[] = [
    {
      name: 'Foundation Track',
      description: 'Essential concepts and practical setup',
      modules: modules.filter(m => m.track === 'foundation'),
      completed: modules.filter(m => m.track === 'foundation' && m.completed).length,
      total: modules.filter(m => m.track === 'foundation').length,
      progress: 0,
      estimatedTime: '1h 40min'
    },
    {
      name: 'Applications Track',
      description: 'Real-world use cases and implementations',
      modules: modules.filter(m => m.track === 'applications'),
      completed: modules.filter(m => m.track === 'applications' && m.completed).length,
      total: modules.filter(m => m.track === 'applications').length,
      progress: 0,
      estimatedTime: '1h 58min'
    },
    {
      name: 'Advanced Track',
      description: 'Cutting-edge topics and future trends',
      modules: modules.filter(m => m.track === 'advanced'),
      completed: modules.filter(m => m.track === 'advanced' && m.completed).length,
      total: modules.filter(m => m.track === 'advanced').length,
      progress: 0,
      estimatedTime: '2h 00min'
    }
  ]

  // Calculate progress percentages
  tracks.forEach(track => {
    track.progress = track.total > 0 ? Math.round((track.completed / track.total) * 100) : 0
  })

  const totalCompleted = completedModules.length
  const totalModules = modules.length
  const overallProgress = Math.round((totalCompleted / totalModules) * 100)

  // Get next recommended module
  const getNextModule = () => {
    // Find first incomplete module that has prerequisites met
    for (const module of modules) {
      if (!module.completed) {
        const prerequisitesMet = module.prerequisites.every(prereq => 
          completedModules.includes(prereq)
        )
        if (prerequisitesMet) {
          return module
        }
      }
    }
    return null
  }

  const nextModule = getNextModule()

  // Calculate achievements
  const achievements = [
    {
      id: 'first-steps',
      title: 'First Steps',
      description: 'Complete your first module',
      icon: <PlayCircle className="w-5 h-5" />,
      earned: totalCompleted >= 1,
      progress: Math.min(totalCompleted, 1)
    },
    {
      id: 'foundation-master',
      title: 'Foundation Master',
      description: 'Complete the Foundation Track',
      icon: <BookOpen className="w-5 h-5" />,
      earned: tracks[0].completed === tracks[0].total,
      progress: tracks[0].progress / 100
    },
    {
      id: 'defi-explorer',
      title: 'DeFi Explorer',
      description: 'Complete 5 modules',
      icon: <Target className="w-5 h-5" />,
      earned: totalCompleted >= 5,
      progress: Math.min(totalCompleted / 5, 1)
    },
    {
      id: 'crypto-expert',
      title: 'Crypto Expert',
      description: 'Complete all modules with good mastery',
      icon: <Award className="w-5 h-5" />,
      earned: totalCompleted === totalModules && Object.values(masteryLevels).every(level => ['good', 'excellent'].includes(level)),
      progress: totalCompleted / totalModules
    }
  ]

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

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}min`
    }
    return `${mins}min`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Your Crypto Learning Journey</h1>
              <p className="text-gray-600 mt-2">Master cryptocurrency from basics to advanced concepts</p>
            </div>
            <Link 
              href="/education/modules"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View All Modules →
            </Link>
          </div>
          
          {/* Overall Progress */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Overall Progress</h2>
                  <p className="text-gray-600">{totalCompleted} of {totalModules} modules completed</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600">{overallProgress}%</div>
                <div className="text-sm text-gray-500">Complete</div>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${overallProgress}%` }}
              ></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">Time Invested</div>
                  <div className="font-semibold">{formatTime(totalTimeSpent)}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Target className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">Remaining</div>
                  <div className="font-semibold">{formatTime((totalModules - totalCompleted) * 22)}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Trophy className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">Achievements</div>
                  <div className="font-semibold">{achievements.filter(a => a.earned).length}/{achievements.length}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Recommended Module */}
        {nextModule && (
          <div className="mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-sm p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <PlayCircle className="w-5 h-5" />
                    <span className="text-sm font-medium opacity-90">Continue Learning</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{nextModule.title}</h3>
                  <p className="opacity-90 mb-4">{nextModule.description}</p>
                  <div className="flex items-center space-x-4 text-sm opacity-90">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{nextModule.duration}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Target className="w-4 h-4" />
                      <span>{nextModule.difficulty}</span>
                    </span>
                  </div>
                </div>
                <div className="ml-6">
                  <Link
                    href={nextModule.href}
                    className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Start Module
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Learning Tracks */}
        <div className="space-y-8">
          {tracks.map((track, trackIndex) => (
            <div key={track.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{track.name}</h2>
                  <p className="text-gray-600 mt-1">{track.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{track.progress}%</div>
                  <div className="text-sm text-gray-500">{track.completed}/{track.total} modules</div>
                  <div className="text-xs text-gray-400 mt-1">{track.estimatedTime}</div>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    trackIndex === 0 ? 'bg-green-500' : 
                    trackIndex === 1 ? 'bg-blue-500' : 'bg-purple-500'
                  }`}
                  style={{ width: `${track.progress}%` }}
                ></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {track.modules.map((module) => (
                  <Link
                    key={module.id}
                    href={module.href}
                    className="block bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${
                        module.completed ? 'bg-green-100' : 'bg-gray-200'
                      }`}>
                        {module.completed ? 
                          <CheckCircle2 className="w-5 h-5 text-green-600" /> :
                          module.icon
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">{module.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{module.duration}</p>
                        <div className="flex items-center justify-between mt-2">
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
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    achievement.earned
                      ? 'border-yellow-300 bg-yellow-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`p-2 rounded-lg ${
                      achievement.earned ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-200 text-gray-400'
                    }`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-medium ${
                        achievement.earned ? 'text-yellow-800' : 'text-gray-600'
                      }`}>
                        {achievement.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        achievement.earned ? 'bg-yellow-500' : 'bg-gray-400'
                      }`}
                      style={{ width: `${achievement.progress * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/education/modules"
                className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <BookOpen className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="font-medium text-blue-900">Browse All Modules</div>
                  <div className="text-sm text-blue-600">Explore the complete curriculum</div>
                </div>
              </Link>
              
              <button className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                <Search className="w-5 h-5 text-purple-600" />
                <div>
                  <div className="font-medium text-purple-900">Search Content</div>
                  <div className="text-sm text-purple-600">Find specific topics quickly</div>
                </div>
              </button>
              
              <Link
                href="/dashboard"
                className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              >
                <BarChart3 className="w-5 h-5 text-green-600" />
                <div>
                  <div className="font-medium text-green-900">Portfolio Dashboard</div>
                  <div className="text-sm text-green-600">Track your crypto investments</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 