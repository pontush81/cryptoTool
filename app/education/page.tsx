'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BookOpen, TrendingUp, Shield, Zap, Clock, Users, ArrowRight } from 'lucide-react'

interface LearningModule {
  id: string
  title: string
  description: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string
  icon: React.ReactNode
  href: string
  topics: string[]
}

const modules: LearningModule[] = [
  {
    id: 'bitcoin-basics',
    title: 'Bitcoin Basics',
    description: 'Understanding the fundamentals of Bitcoin and cryptocurrency',
    difficulty: 'Beginner',
    duration: '15 min',
    icon: <BookOpen className="w-6 h-6" />,
    href: '/education/bitcoin-basics',
    topics: ['What is Bitcoin?', 'Digital Money', 'Decentralization', 'History']
  },
  {
    id: 'how-it-works',
    title: 'How Blockchain Works',
    description: 'Deep dive into blockchain technology and mining',
    difficulty: 'Intermediate',
    duration: '25 min',
    icon: <Zap className="w-6 h-6" />,
    href: '/education/how-it-works',
    topics: ['Blockchain Structure', 'Mining', 'Consensus', 'Transactions']
  },
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'How to buy, store, and use cryptocurrency safely',
    difficulty: 'Beginner',
    duration: '20 min',
    icon: <TrendingUp className="w-6 h-6" />,
    href: '/education/getting-started',
    topics: ['Exchanges', 'Wallets', 'Private Keys', 'First Purchase']
  },
  {
    id: 'security',
    title: 'Security & Risks',
    description: 'Protecting your crypto and understanding the risks',
    difficulty: 'Intermediate',
    duration: '18 min',
    icon: <Shield className="w-6 h-6" />,
    href: '/education/security',
    topics: ['Wallet Security', 'Scams', 'Best Practices', 'Risk Management']
  },
  {
    id: 'advanced',
    title: 'Advanced Concepts',
    description: 'DeFi, smart contracts, and advanced trading strategies',
    difficulty: 'Advanced',
    duration: '30 min',
    icon: <Users className="w-6 h-6" />,
    href: '/education/advanced',
    topics: ['DeFi', 'Smart Contracts', 'Technical Analysis', 'Investment Strategies']
  }
]

const difficultyColors = {
  'Beginner': 'bg-green-50 text-green-700 border border-green-200',
  'Intermediate': 'bg-yellow-50 text-yellow-700 border border-yellow-200',
  'Advanced': 'bg-red-50 text-red-700 border border-red-200'
}

export default function EducationPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null)

  const filteredModules = selectedDifficulty 
    ? modules.filter(module => module.difficulty === selectedDifficulty)
    : modules

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Education</h1>
              <p className="text-gray-600 mt-1">
                Master Bitcoin and cryptocurrency from the ground up
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          
          {/* Learning Path Overview */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Learning Path Overview</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-green-50 border border-green-100">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold text-sm mb-2">1</div>
                    <p className="text-sm font-medium text-green-700 mb-1">Fundamentals</p>
                    <p className="text-xs text-green-600">Start here - Learn the basics</p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-lg">
                    <BookOpen className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-100">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-semibold text-sm mb-2">2</div>
                    <p className="text-sm font-medium text-yellow-700 mb-1">Practical Skills</p>
                    <p className="text-xs text-yellow-600">Apply your knowledge</p>
                  </div>
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-purple-50 border border-purple-100">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm mb-2">3</div>
                    <p className="text-sm font-medium text-purple-700 mb-1">Advanced Topics</p>
                    <p className="text-xs text-purple-600">Expert level concepts</p>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Filter by Level</h2>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedDifficulty(null)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedDifficulty === null
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All Levels
              </button>
              {['Beginner', 'Intermediate', 'Advanced'].map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => setSelectedDifficulty(difficulty)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedDifficulty === difficulty
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>

          {/* Learning Modules */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Learning Modules</h2>
              <div className="text-sm text-gray-500">
                {filteredModules.length} module{filteredModules.length !== 1 ? 's' : ''} available
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredModules.map((module) => (
                <Link key={module.id} href={module.href}>
                  <div className="p-4 rounded-lg border border-gray-200 hover:border-blue-200 hover:bg-blue-50 transition-all duration-200 group">
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                        {module.icon}
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          {module.duration}
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[module.difficulty]}`}>
                          {module.difficulty}
                        </span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">{module.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{module.description}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {module.topics.slice(0, 3).map((topic) => (
                        <span key={topic} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                          {topic}
                        </span>
                      ))}
                      {module.topics.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                          +{module.topics.length - 3} more
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        {module.topics.length} topic{module.topics.length !== 1 ? 's' : ''}
                      </span>
                      <div className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700">
                        Start Learning
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Why Learn Crypto Stats */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Why Learn About Crypto?</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-700 mb-1">Global Interest</p>
                    <p className="text-xl font-bold text-blue-900">1.8B+</p>
                    <p className="text-xs text-blue-600">People worldwide interested in crypto</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-green-50 border border-green-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-700 mb-1">Market Cap</p>
                    <p className="text-xl font-bold text-green-900">$2.3T</p>
                    <p className="text-xs text-green-600">Total cryptocurrency market cap</p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-purple-50 border border-purple-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-700 mb-1">Innovation</p>
                    <p className="text-xl font-bold text-purple-900">15+</p>
                    <p className="text-xs text-purple-600">Years of Bitcoin innovation</p>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Zap className="h-5 w-5 text-purple-600" />
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