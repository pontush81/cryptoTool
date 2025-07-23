'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { BookOpen, TrendingUp, Shield, Zap, Clock, Users, ArrowRight, Search, Trophy, Star, Filter } from 'lucide-react'

interface LearningModule {
  id: string
  title: string
  description: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string
  icon: React.ReactNode
  href: string
  topics: string[]
  completed?: boolean
  rating?: number
  prerequisites?: string[]
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
    topics: ['What is Bitcoin?', 'Digital Money', 'Decentralization', 'History'],
    completed: false,
    rating: 4.8,
    prerequisites: []
  },
  {
    id: 'how-it-works',
    title: 'How Blockchain Works',
    description: 'Deep dive into blockchain technology and mining',
    difficulty: 'Intermediate',
    duration: '25 min',
    icon: <Zap className="w-6 h-6" />,
    href: '/education/how-it-works',
    topics: ['Blockchain Structure', 'Mining', 'Consensus', 'Transactions'],
    completed: false,
    rating: 4.7,
    prerequisites: ['bitcoin-basics']
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
    completed: false,
    rating: 4.9,
    prerequisites: ['bitcoin-basics']
  },
  {
    id: 'security',
    title: 'Security & Risks',
    description: 'Protecting your crypto and understanding the risks',
    difficulty: 'Intermediate',
    duration: '18 min',
    icon: <Shield className="w-6 h-6" />,
    href: '/education/security',
    topics: ['Wallet Security', 'Scams', 'Best Practices', 'Risk Management'],
    completed: false,
    rating: 4.6,
    prerequisites: ['getting-started']
  },
  {
    id: 'advanced',
    title: 'Advanced Concepts',
    description: 'DeFi, smart contracts, and advanced trading strategies',
    difficulty: 'Advanced',
    duration: '30 min',
    icon: <Users className="w-6 h-6" />,
    href: '/education/advanced',
    topics: ['DeFi', 'Smart Contracts', 'Technical Analysis', 'Investment Strategies'],
    completed: false,
    rating: 4.5,
    prerequisites: ['how-it-works', 'security']
  }
]

const difficultyColors = {
  'Beginner': 'bg-green-50 text-green-700 border border-green-200',
  'Intermediate': 'bg-yellow-50 text-yellow-700 border border-yellow-200',
  'Advanced': 'bg-red-50 text-red-700 border border-red-200'
}

const difficultyFilters = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'] as const

export default function EducationPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'title' | 'difficulty' | 'duration' | 'rating'>('title')
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set())
  const [showFilters, setShowFilters] = useState(false)

  // Load completed modules from localStorage
  useEffect(() => {
    const completed = localStorage.getItem('completedEducationModules')
    if (completed) {
      setCompletedModules(new Set(JSON.parse(completed)))
    }
  }, [])

  // Filter and search modules
  const filteredModules = modules
    .filter(module => {
      const matchesDifficulty = !selectedDifficulty || selectedDifficulty === 'All Levels' || module.difficulty === selectedDifficulty
      const matchesSearch = !searchQuery || 
        module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        module.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        module.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()))
      
      return matchesDifficulty && matchesSearch
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'difficulty':
          const difficultyOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 }
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
        case 'duration':
          return parseInt(a.duration) - parseInt(b.duration)
        case 'rating':
          return (b.rating || 0) - (a.rating || 0)
        default:
          return a.title.localeCompare(b.title)
      }
    })

  const totalModules = modules.length
  const completedCount = completedModules.size
  const progressPercentage = (completedCount / totalModules) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Page Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Cryptocurrency Education</h1>
              <p className="text-blue-100 text-lg">
                Master Bitcoin and cryptocurrency from the ground up with interactive lessons
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{completedCount}/{totalModules}</div>
              <div className="text-sm text-blue-100">Modules Complete</div>
            </div>
          </div>
          
          {/* Overall Progress */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-blue-100">Overall Progress</span>
              <span className="text-sm font-medium text-blue-100">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-blue-500 bg-opacity-30 rounded-full h-3">
              <div 
                className="bg-white h-3 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
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
              <div className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span className="text-sm text-gray-600">Structured Learning Path</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-green-50 border border-green-100">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold text-sm mb-2">1</div>
                    <p className="text-sm font-medium text-green-700 mb-1">Fundamentals</p>
                    <p className="text-xs text-green-600">Start here - Learn the basics</p>
                    <div className="mt-2 text-xs text-green-600">
                      {modules.filter(m => m.difficulty === 'Beginner').length} modules
                    </div>
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
                    <div className="mt-2 text-xs text-yellow-600">
                      {modules.filter(m => m.difficulty === 'Intermediate').length} modules
                    </div>
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
                    <div className="mt-2 text-xs text-purple-600">
                      {modules.filter(m => m.difficulty === 'Advanced').length} modules
                    </div>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Find Your Next Lesson</h2>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>
            
            <div className={`grid grid-cols-1 lg:grid-cols-12 gap-4 ${showFilters ? 'block' : 'hidden lg:grid'}`}>
              {/* Search */}
              <div className="lg:col-span-6 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search topics, modules, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              {/* Difficulty Filter */}
              <div className="lg:col-span-3">
                <select
                  value={selectedDifficulty || 'All Levels'}
                  onChange={(e) => setSelectedDifficulty(e.target.value === 'All Levels' ? null : e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {difficultyFilters.map((filter) => (
                    <option key={filter} value={filter}>{filter}</option>
                  ))}
                </select>
              </div>
              
              {/* Sort By */}
              <div className="lg:col-span-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="title">Sort by Title</option>
                  <option value="difficulty">Sort by Difficulty</option>
                  <option value="duration">Sort by Duration</option>
                  <option value="rating">Sort by Rating</option>
                </select>
              </div>
            </div>
            
            {/* Results Counter */}
            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredModules.length} of {modules.length} modules
              {searchQuery && ` for "${searchQuery}"`}
            </div>
          </div>

          {/* Learning Modules */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Learning Modules</h2>
            </div>
            
            {filteredModules.length === 0 ? (
              <div className="text-center py-8">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No modules found matching your criteria</p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedDifficulty(null)
                  }}
                  className="mt-2 text-blue-600 hover:text-blue-700 text-sm"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredModules.map((module) => {
                  const isCompleted = completedModules.has(module.id)
                  const canAccess = module.prerequisites?.every(prereq => completedModules.has(prereq)) ?? true
                  
                  return (
                    <div key={module.id} className={`relative ${!canAccess ? 'opacity-60' : ''}`}>
                      <Link href={canAccess ? module.href : '#'} className={canAccess ? '' : 'pointer-events-none'}>
                        <div className={`p-4 rounded-lg border transition-all duration-200 group ${
                          isCompleted 
                            ? 'border-green-200 bg-green-50 hover:bg-green-100' 
                            : canAccess 
                              ? 'border-gray-200 hover:border-blue-200 hover:bg-blue-50'
                              : 'border-gray-200 bg-gray-50'
                        }`}>
                          {/* Completion Badge */}
                          {isCompleted && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                          
                          <div className="flex items-start justify-between mb-3">
                            <div className={`p-2 rounded-lg group-hover:scale-105 transition-transform ${
                              isCompleted ? 'bg-green-200' : 'bg-blue-100 group-hover:bg-blue-200'
                            }`}>
                              {module.icon}
                            </div>
                            <div className="flex items-center space-x-3">
                              {/* Rating */}
                              <div className="flex items-center space-x-1">
                                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                <span className="text-xs text-gray-500">{module.rating}</span>
                              </div>
                              
                              <div className="flex items-center text-xs text-gray-500">
                                <Clock className="w-3 h-3 mr-1" />
                                {module.duration}
                              </div>
                              
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[module.difficulty]}`}>
                                {module.difficulty}
                              </span>
                            </div>
                          </div>
                          
                          <h3 className={`text-lg font-semibold mb-2 transition-colors ${
                            isCompleted 
                              ? 'text-green-800' 
                              : canAccess 
                                ? 'text-gray-900 group-hover:text-blue-700' 
                                : 'text-gray-600'
                          }`}>
                            {module.title}
                          </h3>
                          
                          <p className="text-gray-600 text-sm mb-3">{module.description}</p>
                          
                          {/* Prerequisites */}
                          {module.prerequisites && module.prerequisites.length > 0 && (
                            <div className="mb-3">
                              <p className="text-xs text-gray-500 mb-1">Prerequisites:</p>
                              <div className="flex flex-wrap gap-1">
                                {module.prerequisites.map((prereq) => {
                                  const prereqModule = modules.find(m => m.id === prereq)
                                  const isPrereqCompleted = completedModules.has(prereq)
                                  
                                  return (
                                    <span 
                                      key={prereq} 
                                      className={`text-xs px-2 py-1 rounded ${
                                        isPrereqCompleted 
                                          ? 'bg-green-100 text-green-700' 
                                          : 'bg-red-100 text-red-700'
                                      }`}
                                    >
                                      {prereqModule?.title || prereq}
                                    </span>
                                  )
                                })}
                              </div>
                            </div>
                          )}
                          
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
                            
                            {canAccess ? (
                              <div className={`flex items-center text-sm font-medium transition-colors ${
                                isCompleted 
                                  ? 'text-green-700' 
                                  : 'text-blue-600 group-hover:text-blue-700'
                              }`}>
                                {isCompleted ? 'Review Lesson' : 'Start Learning'}
                                <ArrowRight className="w-4 h-4 ml-1" />
                              </div>
                            ) : (
                              <div className="text-sm text-gray-500">
                                Complete prerequisites first
                              </div>
                            )}
                          </div>
                        </div>
                      </Link>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 