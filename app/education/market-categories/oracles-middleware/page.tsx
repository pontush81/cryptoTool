'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Clock, Users, Target, Star, ChevronRight, Play, Trophy, ExternalLink, BarChart3, Radar, Database, Zap, Shield, Home } from 'lucide-react'
import Breadcrumb from '../../../../components/Breadcrumb'

interface OracleProject {
  id: string
  name: string
  symbol: string
  category: 'Price Feed' | 'Data Provider' | 'Computation' | 'Cross-Chain' | 'Prediction'
  marketCap: string
  description: string
  keyFeatures: string[]
  riskLevel: 'Low' | 'Medium' | 'High'
  icon: React.ReactNode
}

export default function OraclesMiddlewarePage() {
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set())
  const [currentSection, setCurrentSection] = useState(0)

  useEffect(() => {
    // Load completed sections from localStorage
    const completed = JSON.parse(localStorage.getItem('completedOracleSections') || '[]')
    setCompletedSections(new Set(completed))
  }, [])

  const markSectionComplete = (sectionId: string) => {
    const newCompleted = new Set(completedSections).add(sectionId)
    setCompletedSections(newCompleted)
    localStorage.setItem('completedOracleSections', JSON.stringify([...newCompleted]))
  }

  const breadcrumbItems = [
    { label: 'Education', href: '/education', icon: <Home className="w-4 h-4" /> },
    { label: 'Market Categories', href: '/education/market-categories' },
    { label: 'Oracles & Data', current: true }
  ]

  const oracleProjects: OracleProject[] = [
    {
      id: 'chainlink',
      name: 'Chainlink',
      symbol: 'LINK',
      category: 'Price Feed',
      marketCap: '$8B+',
      description: 'Leading decentralized oracle network providing secure price feeds and external data',
      keyFeatures: ['Most secure oracles', 'Widespread adoption', 'Multiple data sources', 'Proven reliability'],
      riskLevel: 'Low',
      icon: <Radar className="w-6 h-6" />
    },
    {
      id: 'pyth-network',
      name: 'Pyth Network',
      symbol: 'PYTH',
      category: 'Price Feed',
      marketCap: '$1B+',
      description: 'High-frequency financial data oracle for DeFi applications',
      keyFeatures: ['Real-time pricing', 'Financial institutions', 'Low latency', 'Traditional finance bridge'],
      riskLevel: 'Medium',
      icon: <BarChart3 className="w-6 h-6" />
    },
    {
      id: 'api3',
      name: 'API3',
      symbol: 'API3',
      category: 'Data Provider',
      marketCap: '$200M+',
      description: 'First-party oracles connecting APIs directly to smart contracts',
      keyFeatures: ['Direct API integration', 'No middlemen', 'dAPI technology', 'Insurance coverage'],
      riskLevel: 'Medium',
      icon: <Database className="w-6 h-6" />
    },
    {
      id: 'band-protocol',
      name: 'Band Protocol',
      symbol: 'BAND',
      category: 'Cross-Chain',
      marketCap: '$150M+',
      description: 'Cross-chain data oracle platform supporting multiple blockchains',
      keyFeatures: ['Multi-chain support', 'Custom datasets', 'Fast finality', 'Developer friendly'],
      riskLevel: 'Medium',
      icon: <Zap className="w-6 h-6" />
    }
  ]

  const sections = [
    {
      id: 'oracle-problem',
      title: 'The Oracle Problem',
      duration: '10 min',
      description: 'Why blockchains need external data and the challenges involved'
    },
    {
      id: 'oracle-types',
      title: 'Types of Oracles',
      duration: '12 min',
      description: 'Price feeds, computation oracles, and cross-chain bridges'
    },
    {
      id: 'major-networks',
      title: 'Major Oracle Networks',
      duration: '15 min',
      description: 'Deep dive into Chainlink, Pyth, API3, and Band Protocol'
    },
    {
      id: 'defi-integration',
      title: 'Oracle Integration in DeFi',
      duration: '12 min',
      description: 'How lending protocols, DEXs, and derivatives use oracles'
    },
    {
      id: 'risks-attacks',
      title: 'Oracle Risks & Attack Vectors',
      duration: '10 min',
      description: 'Flash loan attacks, manipulation, and security considerations'
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
              <div className="p-3 bg-blue-100 rounded-lg">
                <Radar className="w-8 h-8 text-blue-600" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Oracles & Data</h1>
                <p className="text-gray-600 mb-4">
                  Learn about oracle networks that connect blockchains to real-world data, 
                  enabling price feeds, weather data, sports results, and complex computations in DeFi.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    3-4 hours total
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    Intermediate Level
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Target className="w-4 h-4 mr-2" />
                    5 modules
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Star className="w-4 h-4 mr-2" />
                    Critical Infrastructure
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
                  className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
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
                      completedSections.has(section.id) ? 'bg-green-100' : 'bg-blue-100'
                    }`}>
                      {completedSections.has(section.id) ? (
                        <Trophy className="w-4 h-4 text-green-600" />
                      ) : (
                        <span className="text-blue-600 font-semibold text-sm">{index + 1}</span>
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
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {completedSections.has(section.id) ? 'Completed' : 'Start'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Major Oracle Projects */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Major Oracle Networks to Study</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {oracleProjects.map((project) => (
                <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3 mb-3">
                    <div className={`p-2 rounded-lg ${
                      project.category === 'Price Feed' ? 'bg-blue-100' :
                      project.category === 'Data Provider' ? 'bg-green-100' :
                      project.category === 'Computation' ? 'bg-purple-100' :
                      project.category === 'Cross-Chain' ? 'bg-orange-100' :
                      'bg-gray-100'
                    }`}>
                      {project.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900">{project.name}</h3>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          project.riskLevel === 'Low' ? 'bg-green-100 text-green-700' :
                          project.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {project.riskLevel} Risk
                        </span>
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
                  <Database className="w-5 h-5 mr-2 text-blue-600" />
                  Oracle Fundamentals
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Why blockchains need external data</li>
                  <li>• How oracle networks maintain security</li>
                  <li>• Different types of oracle use cases</li>
                  <li>• Decentralized vs centralized oracles</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-red-600" />
                  Security & Risks
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Oracle manipulation attacks</li>
                  <li>• Flash loan oracle exploits</li>
                  <li>• How to evaluate oracle security</li>
                  <li>• Multiple oracle redundancy</li>
                </ul>
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
              className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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