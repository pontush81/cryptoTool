'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Clock, Target, CheckCircle2, ArrowRight, Building, Coins, Zap, Shield, TrendingUp, Users, BookOpen, Play, Trophy, Search } from 'lucide-react'

interface CategoryModule {
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
  projects: string[]
  learningObjectives: string[]
}

export default function Layer1BlockchainsPage() {
  const [completedModules, setCompletedModules] = useState<string[]>([])
  const [masteryLevels, setMasteryLevels] = useState<Record<string, string>>({})

  useEffect(() => {
    // Load completion data from localStorage
    const completed = JSON.parse(localStorage.getItem('completedLayer1Modules') || '[]')
    const mastery = JSON.parse(localStorage.getItem('layer1MasteryLevels') || '{}')
    setCompletedModules(completed)
    setMasteryLevels(mastery)
  }, [])

  const categoryInfo = {
    title: 'Layer 1 Blockchains',
    description: 'Base blockchain networks supporting decentralized apps and assets',
    marketCap: 'Very High',
    difficulty: 'Beginner to Intermediate',
    totalDuration: '3-5 hours',
    whyImportant: 'Layer 1 blockchains are the foundation of the entire crypto ecosystem. Understanding them is crucial for grasping how different cryptocurrencies work, their security models, and scalability trade-offs.',
    keyInsights: [
      'Different consensus mechanisms and their trade-offs',
      'Smart contract capabilities vs. simple value transfer',
      'Scalability challenges and solutions',
      'Network effects and ecosystem development'
    ]
  }

  const modules: CategoryModule[] = [
    {
      id: 'bitcoin-digital-gold',
      title: 'Bitcoin: Digital Gold & Store of Value',
      description: 'Why Bitcoin is considered digital gold and the ultimate store of value',
      difficulty: 'Beginner',
      duration: '45 min',
      icon: <Coins className="w-6 h-6 text-orange-500" />,
      href: '/education/market-categories/layer-1-blockchains/bitcoin-digital-gold',
      topics: ['Store of Value', 'Digital Scarcity', 'Proof of Work', 'Mining Economics', 'Institutional Adoption'],
      completed: completedModules.includes('bitcoin-digital-gold'),
      prerequisites: [],
      projects: ['Bitcoin (BTC)', 'Bitcoin Cash (BCH)', 'Bitcoin SV (BSV)'],
      learningObjectives: [
        'Understand Bitcoin\'s monetary properties',
        'Learn about the 21 million supply cap',
        'Explore institutional adoption trends',
        'Compare Bitcoin to traditional gold'
      ]
    },
    {
      id: 'ethereum-smart-contracts',
      title: 'Ethereum: Smart Contract Platform',
      description: 'The world computer enabling programmable money and decentralized applications',
      difficulty: 'Beginner',
      duration: '60 min',
      icon: <Zap className="w-6 h-6 text-blue-500" />,
      href: '/education/market-categories/layer-1-blockchains/ethereum-smart-contracts',
      topics: ['Smart Contracts', 'EVM', 'Gas Fees', 'DeFi Ecosystem', 'Ethereum 2.0'],
      completed: completedModules.includes('ethereum-smart-contracts'),
      prerequisites: ['bitcoin-digital-gold'],
      projects: ['Ethereum (ETH)', 'Ethereum Classic (ETC)'],
      learningObjectives: [
        'Understand smart contract functionality',
        'Learn about the Ethereum Virtual Machine',
        'Explore gas fees and optimization',
        'Discover the transition to Proof of Stake'
      ]
    },
    {
      id: 'alternative-layer1s',
      title: 'Alternative Layer 1s: Beyond Bitcoin & Ethereum',
      description: 'Exploring high-performance blockchains like Solana, Cardano, and Polkadot',
      difficulty: 'Intermediate',
      duration: '75 min',
      icon: <Building className="w-6 h-6 text-green-500" />,
      href: '/education/market-categories/layer-1-blockchains/alternative-layer1s',
      topics: ['Solana Speed', 'Cardano Research', 'Polkadot Interoperability', 'BNB Chain Adoption', 'Avalanche Subnets'],
      completed: completedModules.includes('alternative-layer1s'),
      prerequisites: ['ethereum-smart-contracts'],
      projects: ['Solana (SOL)', 'Cardano (ADA)', 'Polkadot (DOT)', 'BNB Chain (BNB)', 'Avalanche (AVAX)'],
      learningObjectives: [
        'Compare different blockchain architectures',
        'Understand various consensus mechanisms',
        'Learn about interoperability solutions',
        'Explore scalability approaches'
      ]
    },
    {
      id: 'consensus-mechanisms',
      title: 'Consensus Mechanisms: PoW vs PoS vs Beyond',
      description: 'Deep dive into how blockchains achieve agreement and security',
      difficulty: 'Intermediate',
      duration: '60 min',
      icon: <Shield className="w-6 h-6 text-purple-500" />,
      href: '/education/market-categories/layer-1-blockchains/consensus-mechanisms',
      topics: ['Proof of Work', 'Proof of Stake', 'Delegated PoS', 'Practical Byzantine Fault Tolerance', 'Energy Efficiency'],
      completed: completedModules.includes('consensus-mechanisms'),
      prerequisites: ['alternative-layer1s'],
      projects: ['Bitcoin (PoW)', 'Ethereum (PoS)', 'Tezos (LPoS)', 'Algorand (Pure PoS)'],
      learningObjectives: [
        'Understand security vs. scalability trade-offs',
        'Learn about energy consumption differences',
        'Explore governance implications',
        'Compare validator economics'
      ]
    }
  ]

  const canAccessModule = (module: CategoryModule): boolean => {
    if (module.prerequisites.length === 0) return true
    return module.prerequisites.every(prereq => completedModules.includes(prereq))
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100'
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100'
      case 'Advanced': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const completedCount = completedModules.length
  const totalModules = modules.length
  const progressPercentage = totalModules > 0 ? (completedCount / totalModules) * 100 : 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/education/market-categories"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Market Categories
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Progress: {completedCount}/{totalModules} modules
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
            <div className="flex items-center space-x-4 mb-4">
              <Building className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{categoryInfo.title}</h1>
                <p className="text-lg text-gray-600">{categoryInfo.description}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                {categoryInfo.marketCap} Market Cap
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {categoryInfo.difficulty}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {categoryInfo.totalDuration}
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                Phase 1: Core
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Why Important */}
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Why Learn Layer 1 Blockchains?</h2>
              <p className="text-gray-700 mb-4">{categoryInfo.whyImportant}</p>
              
              <h3 className="font-semibold text-gray-900 mb-3">Key Learning Insights:</h3>
              <ul className="space-y-2">
                {categoryInfo.keyInsights.map((insight, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{insight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Learning Path */}
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Learning Path</h2>
              
              <div className="space-y-6">
                {modules.map((module, index) => (
                  <div key={module.id} className="relative">
                    {/* Connection Line */}
                    {index < modules.length - 1 && (
                      <div className="absolute left-6 top-16 w-0.5 h-6 bg-gray-300"></div>
                    )}
                    
                    <div className={`border rounded-lg p-6 transition-all ${
                      canAccessModule(module) 
                        ? 'border-gray-200 hover:border-blue-300 bg-white' 
                        : 'border-gray-100 bg-gray-50'
                    }`}>
                      <div className="flex items-start space-x-4">
                        {/* Icon */}
                        <div className={`p-3 rounded-lg ${
                          module.completed 
                            ? 'bg-green-100' 
                            : canAccessModule(module)
                              ? 'bg-blue-100'
                              : 'bg-gray-100'
                        }`}>
                          {module.completed ? (
                            <CheckCircle2 className="w-6 h-6 text-green-600" />
                          ) : (
                            module.icon
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-gray-900">{module.title}</h3>
                              <p className="text-gray-600 text-sm mt-1">{module.description}</p>
                            </div>
                            {module.completed && (
                              <Trophy className="w-5 h-5 text-yellow-500" />
                            )}
                          </div>

                          {/* Badges */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(module.difficulty)}`}>
                              {module.difficulty}
                            </span>
                            <span className="px-2 py-1 rounded-full text-xs font-medium text-gray-600 bg-gray-100 flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {module.duration}
                            </span>
                          </div>

                          {/* Topics */}
                          <div className="mb-4">
                            <p className="text-sm font-medium text-gray-700 mb-2">Topics Covered:</p>
                            <div className="flex flex-wrap gap-1">
                              {module.topics.map((topic, topicIndex) => (
                                <span
                                  key={topicIndex}
                                  className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded"
                                >
                                  {topic}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Projects */}
                          <div className="mb-4">
                            <p className="text-sm font-medium text-gray-700 mb-2">Featured Projects:</p>
                            <div className="flex flex-wrap gap-1">
                              {module.projects.map((project, projectIndex) => (
                                <span
                                  key={projectIndex}
                                  className="px-2 py-1 bg-gray-50 text-gray-700 text-xs rounded border"
                                >
                                  {project}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Prerequisites */}
                          {module.prerequisites.length > 0 && (
                            <div className="mb-4">
                              <p className="text-sm font-medium text-gray-700 mb-2">Prerequisites:</p>
                              <div className="flex flex-wrap gap-1">
                                {module.prerequisites.map((prereq, prereqIndex) => {
                                  const prereqModule = modules.find(m => m.id === prereq)
                                  const isCompleted = completedModules.includes(prereq)
                                  return (
                                    <span
                                      key={prereqIndex}
                                      className={`px-2 py-1 text-xs rounded flex items-center ${
                                        isCompleted 
                                          ? 'bg-green-50 text-green-700' 
                                          : 'bg-red-50 text-red-700'
                                      }`}
                                    >
                                      {isCompleted ? (
                                        <CheckCircle2 className="w-3 h-3 mr-1" />
                                      ) : (
                                        <Target className="w-3 h-3 mr-1" />
                                      )}
                                      {prereqModule?.title || prereq}
                                    </span>
                                  )
                                })}
                              </div>
                            </div>
                          )}

                          {/* CTA */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span>{module.learningObjectives.length} learning objectives</span>
                            </div>
                            
                            {canAccessModule(module) ? (
                              <Link
                                href={module.href}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center text-sm"
                              >
                                {module.completed ? 'Review Module' : 'Start Learning'}
                                <ArrowRight className="w-4 h-4 ml-2" />
                              </Link>
                            ) : (
                              <span className="bg-gray-100 text-gray-500 px-4 py-2 rounded-lg text-sm">
                                Complete Prerequisites
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Card */}
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Your Progress</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Modules Completed</span>
                    <span>{completedCount}/{totalModules}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-600 mb-3">Next Steps:</p>
                  {completedCount === totalModules ? (
                    <div className="text-sm text-green-700 bg-green-50 p-3 rounded-lg">
                      🎉 Category Complete! Consider exploring DeFi Ecosystem or Stablecoins next.
                    </div>
                  ) : (
                    <div className="text-sm text-blue-700 bg-blue-50 p-3 rounded-lg">
                      Continue with the next available module in the learning path.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Cross-References */}
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Related Foundation Modules</h3>
              
              <div className="space-y-3">
                <Link 
                  href="/education/bitcoin-basics"
                  className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900 text-sm">Bitcoin Basics</p>
                      <p className="text-xs text-gray-600">Foundation Track</p>
                    </div>
                  </div>
                </Link>

                <Link 
                  href="/education/how-it-works"
                  className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900 text-sm">How Blockchain Works</p>
                      <p className="text-xs text-gray-600">Foundation Track</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <Link
                  href="/education/market-categories"
                  className="block w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-center text-sm"
                >
                  Browse All Categories
                </Link>
                
                <Link
                  href="/education/dashboard"
                  className="block w-full bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors text-center text-sm"
                >
                  Back to Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 