'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Clock, Users, Target, Star, ChevronRight, Play, Trophy, ExternalLink, BarChart3, Eye, EyeOff, Shield, Lock, Key, Home, Fingerprint } from 'lucide-react'
import Breadcrumb from '../../../../components/Breadcrumb'

interface PrivacyProject {
  id: string
  name: string
  symbol: string
  category: 'Privacy Coin' | 'ZK Protocol' | 'Mixer' | 'Privacy Layer' | 'Anonymous'
  marketCap: string
  description: string
  keyFeatures: string[]
  riskLevel: 'Low' | 'Medium' | 'High'
  regulatoryRisk: 'Low' | 'Medium' | 'High'
  icon: React.ReactNode
}

export default function PrivacyCoinsPage() {
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set())
  const [currentSection, setCurrentSection] = useState(0)

  useEffect(() => {
    // Load completed sections from localStorage
    const completed = JSON.parse(localStorage.getItem('completedPrivacySections') || '[]')
    setCompletedSections(new Set(completed))
  }, [])

  const markSectionComplete = (sectionId: string) => {
    const newCompleted = new Set(completedSections).add(sectionId)
    setCompletedSections(newCompleted)
    localStorage.setItem('completedPrivacySections', JSON.stringify([...newCompleted]))
  }

  const breadcrumbItems = [
    { label: 'Education', href: '/education', icon: <Home className="w-4 h-4" /> },
    { label: 'Market Categories', href: '/education/market-categories' },
    { label: 'Privacy Coins & ZK Tech', current: true }
  ]

  const privacyProjects: PrivacyProject[] = [
    {
      id: 'monero',
      name: 'Monero',
      symbol: 'XMR',
      category: 'Privacy Coin',
      marketCap: '$3B+',
      description: 'Leading privacy coin with default anonymity using ring signatures and stealth addresses',
      keyFeatures: ['Default privacy', 'Ring signatures', 'Stealth addresses', 'Dynamic fees'],
      riskLevel: 'Medium',
      regulatoryRisk: 'High',
      icon: <EyeOff className="w-6 h-6" />
    },
    {
      id: 'zcash',
      name: 'Zcash',
      symbol: 'ZEC',
      category: 'Privacy Coin',
      marketCap: '$500M+',
      description: 'Privacy coin using zero-knowledge proofs (zk-SNARKs) for optional privacy',
      keyFeatures: ['zk-SNARKs', 'Optional privacy', 'Selective disclosure', 'Academic backing'],
      riskLevel: 'Medium',
      regulatoryRisk: 'High',
      icon: <Shield className="w-6 h-6" />
    },
    {
      id: 'polygon-zkevm',
      name: 'Polygon zkEVM',
      symbol: 'MATIC',
      category: 'ZK Protocol',
      marketCap: '$4B+',
      description: 'Layer 2 scaling solution using zero-knowledge proofs for Ethereum',
      keyFeatures: ['EVM compatibility', 'zk-SNARKs', 'Low fees', 'Fast finality'],
      riskLevel: 'Medium',
      regulatoryRisk: 'Low',
      icon: <Key className="w-6 h-6" />
    },
    {
      id: 'oasis-network',
      name: 'Oasis Network',
      symbol: 'ROSE',
      category: 'Privacy Layer',
      marketCap: '$300M+',
      description: 'Privacy-focused blockchain for confidential smart contracts and DeFi',
      keyFeatures: ['Confidential computing', 'Privacy ParaTimes', 'Data tokenization', 'Enterprise focus'],
      riskLevel: 'High',
      regulatoryRisk: 'Medium',
      icon: <Fingerprint className="w-6 h-6" />
    }
  ]

  const sections = [
    {
      id: 'privacy-need',
      title: 'Why Privacy Matters in Crypto',
      duration: '10 min',
      description: 'The importance of financial privacy and pseudonymity vs anonymity'
    },
    {
      id: 'privacy-technologies',
      title: 'Privacy Technologies Overview',
      duration: '15 min',
      description: 'Ring signatures, stealth addresses, mixers, and zero-knowledge proofs'
    },
    {
      id: 'zk-fundamentals',
      title: 'Zero-Knowledge Proofs Explained',
      duration: '18 min',
      description: 'zk-SNARKs, zk-STARKs, and how they enable privacy without trust'
    },
    {
      id: 'major-privacy-coins',
      title: 'Major Privacy Projects',
      duration: '20 min',
      description: 'Deep dive into Monero, Zcash, and emerging privacy protocols'
    },
    {
      id: 'regulatory-landscape',
      title: 'Privacy Coin Regulations',
      duration: '12 min',
      description: 'Regulatory challenges, exchange delistings, and compliance issues'
    },
    {
      id: 'investment-risks',
      title: 'Privacy Investment Analysis',
      duration: '10 min',
      description: 'Evaluating privacy projects: technology, adoption, and regulatory risks'
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
              <div className="p-3 bg-purple-100 rounded-lg">
                <EyeOff className="w-8 h-8 text-purple-600" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Privacy Coins & ZK Tech</h1>
                <p className="text-gray-600 mb-4">
                  Learn about privacy-focused cryptocurrencies, zero-knowledge proof technology, 
                  and the ongoing battle between financial privacy and regulatory compliance.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    4-5 hours total
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    Advanced Level
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Target className="w-4 h-4 mr-2" />
                    6 modules
                  </div>
                  <div className="flex items-center text-yellow-600">
                    <Shield className="w-4 h-4 mr-2" />
                    High Regulatory Risk
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
                  className="bg-purple-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Regulatory Warning */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-800 mb-1">⚠️ Regulatory Risk Warning</h3>
                <p className="text-sm text-yellow-700">
                  Privacy coins face increasing regulatory scrutiny and exchange delistings. 
                  Always research local laws and compliance requirements before investing.
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
                      completedSections.has(section.id) ? 'bg-purple-100' : 'bg-purple-100'
                    }`}>
                      {completedSections.has(section.id) ? (
                        <Trophy className="w-4 h-4 text-purple-600" />
                      ) : (
                        <span className="text-purple-600 font-semibold text-sm">{index + 1}</span>
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
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-purple-600 text-white hover:bg-purple-700'
                    }`}
                  >
                    {completedSections.has(section.id) ? 'Completed' : 'Start'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Major Privacy Projects */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Major Privacy Projects to Study</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {privacyProjects.map((project) => (
                <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3 mb-3">
                    <div className={`p-2 rounded-lg ${
                      project.category === 'Privacy Coin' ? 'bg-purple-100' :
                      project.category === 'ZK Protocol' ? 'bg-blue-100' :
                      project.category === 'Mixer' ? 'bg-red-100' :
                      project.category === 'Privacy Layer' ? 'bg-green-100' :
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
                            project.regulatoryRisk === 'Low' ? 'bg-green-100 text-green-700' :
                            project.regulatoryRisk === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            Reg: {project.regulatoryRisk}
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
                  <Key className="w-5 h-5 mr-2 text-purple-600" />
                  Privacy Technologies
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• How ring signatures work</li>
                  <li>• Zero-knowledge proof types</li>
                  <li>• Stealth addresses and mixers</li>
                  <li>• Privacy vs scalability tradeoffs</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-red-600" />
                  Regulatory & Investment Risks
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Exchange delisting patterns</li>
                  <li>• Regulatory compliance challenges</li>
                  <li>• Technology adoption vs regulation</li>
                  <li>• Privacy use case evaluation</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Privacy Technologies Overview */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Privacy Technology Types</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <EyeOff className="w-5 h-5 text-purple-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">Ring Signatures</h3>
                </div>
                <p className="text-sm text-gray-600">Hide sender among group of possible signers (Monero)</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Key className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">Zero-Knowledge Proofs</h3>
                </div>
                <p className="text-sm text-gray-600">Prove validity without revealing information (Zcash, zkEVM)</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Lock className="w-5 h-5 text-green-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">Stealth Addresses</h3>
                </div>
                <p className="text-sm text-gray-600">Generate unique addresses for each transaction</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Fingerprint className="w-5 h-5 text-orange-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">Mixers & Tumblers</h3>
                </div>
                <p className="text-sm text-gray-600">Mix transactions to break link between addresses</p>
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
              href="/education/market-categories/ai-compute"
              className="inline-flex items-center px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Next: AI & Compute
              <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 