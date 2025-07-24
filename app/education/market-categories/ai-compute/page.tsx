'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Clock, Users, Target, Star, ChevronRight, Play, Trophy, ExternalLink, BarChart3, Cpu, Brain, Zap, Shield, Home, Bot, Layers } from 'lucide-react'
import Breadcrumb from '../../../../components/Breadcrumb'

interface AIProject {
  id: string
  name: string
  symbol: string
  category: 'GPU Compute' | 'AI Training' | 'Data Storage' | 'AI Oracle' | 'Model Marketplace' | 'Infrastructure'
  marketCap: string
  description: string
  keyFeatures: string[]
  riskLevel: 'Low' | 'Medium' | 'High'
  adoptionStage: 'Early' | 'Growing' | 'Mature'
  icon: React.ReactNode
}

export default function AIComputePage() {
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set())
  const [currentSection, setCurrentSection] = useState(0)

  useEffect(() => {
    // Load completed sections from localStorage
    const completed = JSON.parse(localStorage.getItem('completedAISections') || '[]')
    setCompletedSections(new Set(completed))
  }, [])

  const markSectionComplete = (sectionId: string) => {
    const newCompleted = new Set(completedSections).add(sectionId)
    setCompletedSections(newCompleted)
    localStorage.setItem('completedAISections', JSON.stringify([...newCompleted]))
  }

  const breadcrumbItems = [
    { label: 'Education', href: '/education', icon: <Home className="w-4 h-4" /> },
    { label: 'Market Categories', href: '/education/market-categories' },
    { label: 'AI & Compute', current: true }
  ]

  const aiProjects: AIProject[] = [
    {
      id: 'render-network',
      name: 'Render Network',
      symbol: 'RNDR',
      category: 'GPU Compute',
      marketCap: '$3B+',
      description: 'Distributed GPU network for 3D rendering and AI computation workloads',
      keyFeatures: ['GPU marketplace', 'Octane integration', 'Creative industry focus', 'AI workloads'],
      riskLevel: 'Medium',
      adoptionStage: 'Growing',
      icon: <Cpu className="w-6 h-6" />
    },
    {
      id: 'akash-network',
      name: 'Akash Network',
      symbol: 'AKT',
      category: 'Infrastructure',
      marketCap: '$800M+',
      description: 'Decentralized cloud computing marketplace for AI and general compute',
      keyFeatures: ['Open cloud', 'Container orchestration', 'Cost-effective compute', 'Kubernetes native'],
      riskLevel: 'Medium',
      adoptionStage: 'Growing',
      icon: <Layers className="w-6 h-6" />
    },
    {
      id: 'ocean-protocol',
      name: 'Ocean Protocol',
      symbol: 'OCEAN',
      category: 'Data Storage',
      marketCap: '$400M+',
      description: 'Decentralized data exchange protocol for AI and machine learning',
      keyFeatures: ['Data marketplace', 'Privacy preserving', 'Tokenized datasets', 'Compute-to-data'],
      riskLevel: 'High',
      adoptionStage: 'Early',
      icon: <BarChart3 className="w-6 h-6" />
    },
    {
      id: 'fetch-ai',
      name: 'Fetch.ai',
      symbol: 'FET',
      category: 'AI Oracle',
      marketCap: '$2B+',
      description: 'Autonomous economic agents and AI-powered oracle network',
      keyFeatures: ['Autonomous agents', 'Machine learning', 'IoT integration', 'Agent marketplace'],
      riskLevel: 'High',
      adoptionStage: 'Growing',
      icon: <Bot className="w-6 h-6" />
    }
  ]

  const sections = [
    {
      id: 'ai-blockchain-convergence',
      title: 'AI + Blockchain Convergence',
      duration: '12 min',
      description: 'How blockchain solves AI challenges: compute access, data sharing, and model ownership'
    },
    {
      id: 'decentralized-compute',
      title: 'Decentralized GPU Markets',
      duration: '15 min',
      description: 'GPU sharing networks, training incentives, and distributed AI computation'
    },
    {
      id: 'data-marketplaces',
      title: 'AI Data Marketplaces',
      duration: '14 min',
      description: 'Tokenizing datasets, privacy-preserving data sharing, and compute-to-data'
    },
    {
      id: 'model-ownership',
      title: 'AI Model Ownership & IP',
      duration: '16 min',
      description: 'NFT models, tokenized AI, and decentralized model marketplaces'
    },
    {
      id: 'major-projects',
      title: 'Major AI + Crypto Projects',
      duration: '20 min',
      description: 'Deep dive into Render, Ocean Protocol, Fetch.ai, and Akash Network'
    },
    {
      id: 'investment-thesis',
      title: 'AI + Crypto Investment Analysis',
      duration: '12 min',
      description: 'Evaluating AI crypto projects: adoption metrics, compute demand, and tokenomics'
    },
    {
      id: 'future-trends',
      title: 'Future of AI x Crypto',
      duration: '10 min',
      description: 'Emerging trends: AGI tokenization, AI DAOs, and decentralized model training'
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
              <div className="p-3 bg-indigo-100 rounded-lg">
                <Brain className="w-8 h-8 text-indigo-600" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">AI & Compute Networks</h1>
                <p className="text-gray-600 mb-4">
                  Learn about decentralized artificial intelligence, GPU compute markets, 
                  data tokenization, and the convergence of AI with blockchain technology.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    5-6 hours total
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    Advanced Level
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Target className="w-4 h-4 mr-2" />
                    7 modules
                  </div>
                  <div className="flex items-center text-indigo-600">
                    <Star className="w-4 h-4 mr-2" />
                    High Growth Potential
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
                  className="bg-indigo-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Emerging Sector Notice */}
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Brain className="w-5 h-5 text-indigo-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-indigo-800 mb-1">🚀 Emerging High-Growth Sector</h3>
                <p className="text-sm text-indigo-700">
                  AI + Crypto is an emerging category with massive potential but high volatility. 
                  Projects are experimental and face technical/adoption challenges.
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
                      completedSections.has(section.id) ? 'bg-indigo-100' : 'bg-indigo-100'
                    }`}>
                      {completedSections.has(section.id) ? (
                        <Trophy className="w-4 h-4 text-indigo-600" />
                      ) : (
                        <span className="text-indigo-600 font-semibold text-sm">{index + 1}</span>
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
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    {completedSections.has(section.id) ? 'Completed' : 'Start'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Major AI Projects */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Major AI + Crypto Projects to Study</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {aiProjects.map((project) => (
                <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3 mb-3">
                    <div className={`p-2 rounded-lg ${
                      project.category === 'GPU Compute' ? 'bg-purple-100' :
                      project.category === 'AI Training' ? 'bg-blue-100' :
                      project.category === 'Data Storage' ? 'bg-green-100' :
                      project.category === 'AI Oracle' ? 'bg-orange-100' :
                      project.category === 'Model Marketplace' ? 'bg-pink-100' :
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
                            project.adoptionStage === 'Mature' ? 'bg-green-100 text-green-700' :
                            project.adoptionStage === 'Growing' ? 'bg-blue-100 text-blue-700' :
                            'bg-orange-100 text-orange-700'
                          }`}>
                            {project.adoptionStage}
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
                  <Brain className="w-5 h-5 mr-2 text-indigo-600" />
                  AI + Blockchain Synergies
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Decentralized AI model training</li>
                  <li>• GPU compute marketplace economics</li>
                  <li>• Data tokenization and ownership</li>
                  <li>• AI agent autonomous economies</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-red-600" />
                  Investment & Technical Risks
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Early-stage technology risks</li>
                  <li>• Compute demand sustainability</li>
                  <li>• Competition with Big Tech</li>
                  <li>• Token utility and value accrual</li>
                </ul>
              </div>
            </div>
          </div>

          {/* AI + Crypto Use Cases */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">AI + Crypto Use Cases</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Cpu className="w-5 h-5 text-purple-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">Distributed Computing</h3>
                </div>
                <p className="text-sm text-gray-600">GPU rental, model training, inference markets</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <BarChart3 className="w-5 h-5 text-green-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">Data Monetization</h3>
                </div>
                <p className="text-sm text-gray-600">Dataset tokenization, privacy-preserving sharing</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Bot className="w-5 h-5 text-orange-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">Autonomous Agents</h3>
                </div>
                <p className="text-sm text-gray-600">AI agents with crypto wallets and trading</p>
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
              href="/education/market-categories/gamefi-metaverse"
              className="inline-flex items-center px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Next: GameFi & Metaverse
              <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 