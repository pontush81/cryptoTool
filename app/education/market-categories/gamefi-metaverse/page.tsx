'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Clock, Users, Target, Star, ChevronRight, Play, Trophy, ExternalLink, BarChart3, Gamepad2, Coins, Zap, Shield, Home, Globe, Gem } from 'lucide-react'
import Breadcrumb from '../../../../components/Breadcrumb'

interface GameFiProject {
  id: string
  name: string
  symbol: string
  category: 'P2E Game' | 'Metaverse' | 'Gaming Token' | 'NFT Game' | 'Virtual World' | 'Gaming Infrastructure'
  marketCap: string
  description: string
  keyFeatures: string[]
  riskLevel: 'Low' | 'Medium' | 'High'
  playerBase: 'Small' | 'Growing' | 'Large'
  icon: React.ReactNode
}

export default function GameFiMetaversePage() {
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set())
  const [currentSection, setCurrentSection] = useState(0)

  useEffect(() => {
    // Load completed sections from localStorage
    const completed = JSON.parse(localStorage.getItem('completedGameFiSections') || '[]')
    setCompletedSections(new Set(completed))
  }, [])

  const markSectionComplete = (sectionId: string) => {
    const newCompleted = new Set(completedSections).add(sectionId)
    setCompletedSections(newCompleted)
    localStorage.setItem('completedGameFiSections', JSON.stringify([...newCompleted]))
  }

  const breadcrumbItems = [
    { label: 'Education', href: '/education', icon: <Home className="w-4 h-4" /> },
    { label: 'Market Categories', href: '/education/market-categories' },
    { label: 'GameFi & Metaverse', current: true }
  ]

  const gamefiProjects: GameFiProject[] = [
    {
      id: 'axie-infinity',
      name: 'Axie Infinity',
      symbol: 'AXS',
      category: 'P2E Game',
      marketCap: '$800M+',
      description: 'Pioneer play-to-earn game with collectible creatures and strategic battles',
      keyFeatures: ['P2E mechanics', 'NFT creatures', 'Breeding system', 'Land ownership'],
      riskLevel: 'High',
      playerBase: 'Large',
      icon: <Gamepad2 className="w-6 h-6" />
    },
    {
      id: 'the-sandbox',
      name: 'The Sandbox',
      symbol: 'SAND',
      category: 'Metaverse',
      marketCap: '$1B+',
      description: 'Decentralized virtual world where users create, own, and monetize gaming experiences',
      keyFeatures: ['Virtual land', 'User-generated content', 'Creator economy', 'Brand partnerships'],
      riskLevel: 'Medium',
      playerBase: 'Growing',
      icon: <Globe className="w-6 h-6" />
    },
    {
      id: 'enjin-coin',
      name: 'Enjin Coin',
      symbol: 'ENJ',
      category: 'Gaming Infrastructure',
      marketCap: '$400M+',
      description: 'Gaming-focused blockchain platform for creating and managing NFT gaming items',
      keyFeatures: ['Multi-game NFTs', 'Melting mechanism', 'Developer tools', 'Cross-game items'],
      riskLevel: 'Medium',
      playerBase: 'Growing',
      icon: <Gem className="w-6 h-6" />
    },
    {
      id: 'immutable-x',
      name: 'Immutable X',
      symbol: 'IMX',
      category: 'Gaming Infrastructure',
      marketCap: '$2B+',
      description: 'Layer 2 scaling solution specifically designed for NFT games and marketplaces',
      keyFeatures: ['Zero gas fees', 'Instant trading', 'Carbon neutral', 'Game development tools'],
      riskLevel: 'Medium',
      playerBase: 'Growing',
      icon: <Zap className="w-6 h-6" />
    }
  ]

  const sections = [
    {
      id: 'gamefi-revolution',
      title: 'The GameFi Revolution',
      duration: '12 min',
      description: 'How blockchain transforms gaming: ownership, earnings, and player-driven economies'
    },
    {
      id: 'p2e-mechanics',
      title: 'Play-to-Earn Mechanics',
      duration: '15 min',
      description: 'Token rewards, NFT assets, guild systems, and sustainable P2E economics'
    },
    {
      id: 'metaverse-concepts',
      title: 'Metaverse & Virtual Worlds',
      duration: '16 min',
      description: 'Virtual land ownership, avatar systems, and interoperable digital identities'
    },
    {
      id: 'nft-gaming-assets',
      title: 'NFT Gaming Assets',
      duration: '14 min',
      description: 'In-game items, character ownership, cross-game compatibility, and asset trading'
    },
    {
      id: 'major-projects',
      title: 'Major GameFi Projects',
      duration: '20 min',
      description: 'Deep dive into Axie Infinity, The Sandbox, Enjin, and emerging gaming ecosystems'
    },
    {
      id: 'guild-economics',
      title: 'Gaming Guilds & Scholarships',
      duration: '12 min',
      description: 'YGG model, scholar programs, and community-driven gaming economies'
    },
    {
      id: 'investment-analysis',
      title: 'GameFi Investment Strategy',
      duration: '10 min',
      description: 'Evaluating gaming projects: player retention, token utility, and long-term sustainability'
    },
    {
      id: 'future-gaming',
      title: 'Future of Blockchain Gaming',
      duration: '8 min',
      description: 'VR integration, AI NPCs, cross-chain gaming, and mainstream adoption trends'
    }
  ]

  const progress = (completedSections.size / sections.length) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          
          {/* Breadcrumb */}
          <Breadcrumb items={breadcrumbItems} />
          
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start space-x-4 mb-6">
              <div className="p-3 bg-pink-100 rounded-lg">
                <Gamepad2 className="w-8 h-8 text-pink-600" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">GameFi & Metaverse</h1>
                <p className="text-gray-600 mb-4">
                  Learn about blockchain gaming, play-to-earn mechanics, virtual worlds, 
                  and how NFTs are revolutionizing game asset ownership and player economies.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    5-7 hours total
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    Intermediate Level
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Target className="w-4 h-4 mr-2" />
                    8 modules
                  </div>
                  <div className="flex items-center text-pink-600">
                    <Star className="w-4 h-4 mr-2" />
                    High Volatility
                  </div>
                </div>
              </div>
            </div>
            
            {/* Progress */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Progress</span>
                <span className="text-sm font-medium text-gray-700">{completedSections.size}/{sections.length} completed</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-pink-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Market Cycle Warning */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-orange-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-orange-800 mb-1">⚡ High Volatility Sector</h3>
                <p className="text-sm text-orange-700">
                  GameFi projects are highly sensitive to crypto market cycles and gaming trends. 
                  Player retention and token sustainability remain major challenges.
                </p>
              </div>
            </div>
          </div>

          {/* Learning Modules */}
          <div className="space-y-4">
            {sections.map((section, index) => (
              <div key={section.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      completedSections.has(section.id) ? 'bg-pink-100' : 'bg-pink-100'
                    }`}>
                      {completedSections.has(section.id) ? (
                        <Trophy className="w-4 h-4 text-pink-600" />
                      ) : (
                        <span className="text-pink-600 font-semibold text-sm">{index + 1}</span>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{section.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{section.description}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        {section.duration}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => markSectionComplete(section.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      completedSections.has(section.id)
                        ? 'bg-pink-100 text-pink-700'
                        : 'bg-pink-600 text-white hover:bg-pink-700'
                    }`}
                  >
                    {completedSections.has(section.id) ? 'Completed' : 'Start'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Major GameFi Projects */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Major GameFi Projects to Study</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {gamefiProjects.map((project) => (
                <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3 mb-3">
                    <div className={`p-2 rounded-lg ${
                      project.category === 'P2E Game' ? 'bg-pink-100' :
                      project.category === 'Metaverse' ? 'bg-purple-100' :
                      project.category === 'Gaming Token' ? 'bg-blue-100' :
                      project.category === 'NFT Game' ? 'bg-green-100' :
                      project.category === 'Virtual World' ? 'bg-indigo-100' :
                      'bg-gray-100'
                    }`}>
                      {project.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900">{project.name}</h3>
                        <div className="flex space-x-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            project.riskLevel === 'Low' ? 'bg-green-100 text-green-700' :
                            project.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {project.riskLevel} Risk
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            project.playerBase === 'Large' ? 'bg-green-100 text-green-700' :
                            project.playerBase === 'Growing' ? 'bg-blue-100 text-blue-700' :
                            'bg-orange-100 text-orange-700'
                          }`}>
                            {project.playerBase}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {project.category}
                        </span>
                        <span className="text-xs text-gray-500">{project.marketCap}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                      <div className="space-y-1">
                        {project.keyFeatures.slice(0, 2).map((feature, index) => (
                          <div key={index} className="text-xs text-gray-500">
                            • {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Learning Points */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">What You'll Learn</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Gamepad2 className="w-5 h-5 mr-2 text-pink-600" />
                  GameFi Mechanics
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Play-to-earn token economics</li>
                  <li>• NFT gaming asset creation</li>
                  <li>• Guild and scholarship systems</li>
                  <li>• Cross-game interoperability</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-red-600" />
                  Investment & Market Risks
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Player retention challenges</li>
                  <li>• Token inflation and sustainability</li>
                  <li>• Gaming market cycle sensitivity</li>
                  <li>• Regulatory uncertainty for P2E</li>
                </ul>
              </div>
            </div>
          </div>

          {/* GameFi Ecosystem Map */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">GameFi Ecosystem Components</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Gamepad2 className="w-5 h-5 text-pink-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">Games</h3>
                </div>
                <p className="text-sm text-gray-600">P2E mechanics, NFT integration</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Globe className="w-5 h-5 text-purple-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">Metaverse</h3>
                </div>
                <p className="text-sm text-gray-600">Virtual worlds, land ownership</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Gem className="w-5 h-5 text-green-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">NFT Assets</h3>
                </div>
                <p className="text-sm text-gray-600">Characters, items, collectibles</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Zap className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">Infrastructure</h3>
                </div>
                <p className="text-sm text-gray-600">Scaling, marketplaces, tools</p>
              </div>
            </div>
          </div>

          {/* P2E Economics Model */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Play-to-Earn Economics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Players</h3>
                <p className="text-sm text-gray-600">Time & skill investment, asset ownership, token earnings</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Coins className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Token Economy</h3>
                <p className="text-sm text-gray-600">Governance tokens, utility tokens, NFT marketplaces</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Trophy className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Rewards</h3>
                <p className="text-sm text-gray-600">Battle rewards, staking yields, asset appreciation</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Link
              href="/education/market-categories"
              className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Market Categories
            </Link>
            
            <Link
              href="/education/modules"
              className="inline-flex items-center px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
            >
              Explore All Learning Modules
              <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 