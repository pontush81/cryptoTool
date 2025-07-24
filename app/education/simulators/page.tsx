'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Wallet, 
  Shield, 
  TrendingUp, 
  Gamepad2, 
  Star,
  Clock,
  Target,
  ArrowRight,
  CheckCircle2,
  PlayCircle,
  Award,
  User,
  BarChart3
} from 'lucide-react'

interface Simulator {
  id: string
  name: string
  description: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  estimatedTime: string
  prerequisites: string[]
  learningObjectives: string[]
  riskScenarios: string[]
  priority: 'Essential' | 'High' | 'Medium' | 'Optional'
  status: 'available' | 'coming-soon'
  icon: React.ElementType
  href: string
  features: string[]
}

export default function SimulatorsPage() {
  const [completedSimulators, setCompletedSimulators] = useState<string[]>([])
  const [simulatorProgress, setSimulatorProgress] = useState<Record<string, number>>({})

  useEffect(() => {
    // Load completed simulators and progress from localStorage
    const completed = JSON.parse(localStorage.getItem('completedSimulators') || '[]')
    const progress = JSON.parse(localStorage.getItem('simulatorProgress') || '{}')
    setCompletedSimulators(completed)
    setSimulatorProgress(progress)
  }, [])

  const simulators: Simulator[] = [
    {
      id: 'wallet-simulator',
      name: 'Crypto Wallet Simulator',
      description: 'Learn wallet creation, seed phrase security, and safe transaction practices in a risk-free environment',
      difficulty: 'Beginner',
      estimatedTime: '30-45 min',
      prerequisites: [],
      learningObjectives: [
        'Create and secure a crypto wallet',
        'Backup and restore seed phrases safely',
        'Send and receive transactions correctly',
        'Recognize and avoid common security threats'
      ],
      riskScenarios: [
        'Phishing seed phrase attempts',
        'Wrong address transactions',
        'Fake wallet apps',
        'Lost backup recovery'
      ],
      priority: 'Essential',
      status: 'available',
      icon: Wallet,
      href: '/education/simulators/wallet-simulator',
      features: [
        'Interactive wallet creation',
        'Seed phrase backup practice',
        'Transaction simulation',
        'Security threat recognition'
      ]
    },
    {
      id: 'security-simulator',
      name: 'Scam & Security Simulator',
      description: 'Practice identifying phishing attempts, verifying legitimate sites, and safe transaction practices',
      difficulty: 'Beginner',
      estimatedTime: '25-35 min',
      prerequisites: [],
      learningObjectives: [
        'Recognize phishing attempts',
        'Verify legitimate websites and apps',
        'Practice safe transaction signing',
        'Understand social engineering tactics'
      ],
      riskScenarios: [
        'Fake website detection',
        'Phishing email identification',
        'Malicious DApp connections',
        'Social engineering attacks'
      ],
      priority: 'Essential',
      status: 'coming-soon',
      icon: Shield,
      href: '/education/simulators/security-simulator',
      features: [
        'Phishing detection tests',
        'Website verification practice',
        'Transaction review training',
        'Real-world scam examples'
      ]
    },
    {
      id: 'trading-simulator',
      name: 'Trading Practice Simulator',
      description: 'Practice trading strategies, portfolio management, and risk assessment without real money',
      difficulty: 'Intermediate',
      estimatedTime: '45-60 min',
      prerequisites: ['wallet-simulator'],
      learningObjectives: [
        'Understand market dynamics',
        'Practice risk management',
        'Learn trading psychology',
        'Implement portfolio strategies'
      ],
      riskScenarios: [
        'FOMO trading decisions',
        'Leverage risks',
        'Market manipulation',
        'Emotional trading'
      ],
      priority: 'High',
      status: 'coming-soon',
      icon: TrendingUp,
      href: '/education/simulators/trading-simulator',
      features: [
        'Real market data simulation',
        'Portfolio tracking',
        'Strategy backtesting',
        'Psychology training'
      ]
    },
    {
      id: 'defi-simulator',
      name: 'DeFi Protocol Simulator',
      description: 'Practice DeFi interactions, liquidity provision, and yield farming in a safe environment',
      difficulty: 'Advanced',
      estimatedTime: '60-90 min',
      prerequisites: ['wallet-simulator', 'security-simulator'],
      learningObjectives: [
        'Safe DApp interactions',
        'Token approvals and revocations',
        'Yield farming strategies',
        'Gas optimization techniques'
      ],
      riskScenarios: [
        'Smart contract risks',
        'Impermanent loss',
        'Rug pull detection',
        'Gas fee optimization'
      ],
      priority: 'High',
      status: 'coming-soon',
      icon: Gamepad2,
      href: '/education/simulators/defi-simulator',
      features: [
        'DEX interaction practice',
        'Liquidity pool simulation',
        'Yield farming calculator',
        'Risk assessment tools'
      ]
    }
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100'
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100'
      case 'Advanced': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Essential': return 'text-red-600 bg-red-100'
      case 'High': return 'text-orange-600 bg-orange-100'
      case 'Medium': return 'text-yellow-600 bg-yellow-100'
      case 'Optional': return 'text-blue-600 bg-blue-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const isSimulatorAccessible = (simulator: Simulator): boolean => {
    if (simulator.status === 'coming-soon') return false
    return simulator.prerequisites.every(prereq => completedSimulators.includes(prereq))
  }

  const availableSimulators = simulators.filter(s => s.status === 'available')
  const comingSoonCount = simulators.filter(s => s.status === 'coming-soon').length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Interactive Learning Simulators
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Practice crypto skills in a safe, risk-free environment. Learn by doing with realistic scenarios and interactive challenges.
            </p>
          </div>
          
          {/* Progress Stats */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <BarChart3 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-900">{completedSimulators.length}</div>
              <div className="text-sm text-blue-700">Completed</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <PlayCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-900">{availableSimulators.length}</div>
              <div className="text-sm text-green-700">Available Now</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 text-center">
              <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-900">{comingSoonCount}</div>
              <div className="text-sm text-orange-700">Coming Soon</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-900">
                {Object.values(simulatorProgress).reduce((a, b) => a + b, 0) || 0}%
              </div>
              <div className="text-sm text-purple-700">Avg Score</div>
            </div>
          </div>
        </div>
      </div>

      {/* Simulators Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {simulators.map((simulator) => {
            const isAccessible = isSimulatorAccessible(simulator)
            const isCompleted = completedSimulators.includes(simulator.id)
            const progress = simulatorProgress[simulator.id] || 0

            return (
              <div
                key={simulator.id}
                className={`bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow ${
                  !isAccessible ? 'opacity-75' : ''
                }`}
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <simulator.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          {simulator.name}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(simulator.difficulty)}`}>
                            {simulator.difficulty}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(simulator.priority)}`}>
                            {simulator.priority}
                          </span>
                          {simulator.status === 'coming-soon' && (
                            <span className="px-2 py-1 rounded-full text-xs font-medium text-gray-600 bg-gray-100">
                              Coming Soon
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    {isCompleted && (
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-4">{simulator.description}</p>

                  {/* Time & Prerequisites */}
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{simulator.estimatedTime}</span>
                    </div>
                    {simulator.prerequisites.length > 0 && (
                      <div className="flex items-center space-x-1">
                        <Target className="w-4 h-4" />
                        <span>{simulator.prerequisites.length} prerequisites</span>
                      </div>
                    )}
                  </div>

                  {/* Learning Objectives */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Learning Objectives:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {simulator.learningObjectives.slice(0, 3).map((objective, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>{objective}</span>
                        </li>
                      ))}
                      {simulator.learningObjectives.length > 3 && (
                        <li className="text-blue-600 text-xs">
                          +{simulator.learningObjectives.length - 3} more objectives
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Progress bar for completed simulators */}
                  {progress > 0 && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      {simulator.features.length} interactive features
                    </div>
                    
                    {isAccessible ? (
                      <Link
                        href={simulator.href}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center text-sm font-medium"
                      >
                        {isCompleted ? 'Practice Again' : 'Start Simulator'}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    ) : simulator.status === 'coming-soon' ? (
                      <span className="bg-gray-100 text-gray-500 px-4 py-2 rounded-lg text-sm">
                        Coming Soon
                      </span>
                    ) : (
                      <span className="bg-gray-100 text-gray-500 px-4 py-2 rounded-lg text-sm">
                        Complete Prerequisites
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Getting Started Section */}
        <div className="mt-12 bg-blue-50 rounded-lg p-8">
          <div className="text-center">
            <User className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              New to Crypto? Start Here!
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We recommend starting with the Crypto Wallet Simulator to learn the fundamentals of secure wallet management. 
              Then progress through our structured learning path based on your interests.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/education/simulators/wallet-simulator"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                Start with Wallet Simulator
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="/education/dashboard"
                className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center"
              >
                View Learning Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 