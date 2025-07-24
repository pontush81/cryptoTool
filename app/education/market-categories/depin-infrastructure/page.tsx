'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Clock, Users, Target, Star, ChevronRight, Play, Trophy, ExternalLink, BarChart3, Network, Wifi, HardDrive, Zap, Shield, Home, Radio, MapPin } from 'lucide-react'
import Breadcrumb from '../../../../components/Breadcrumb'

interface DePINProject {
  id: string
  name: string
  symbol: string
  category: 'Wireless' | 'Storage' | 'Compute' | 'Mapping' | 'Energy' | 'Sensor'
  marketCap: string
  description: string
  keyFeatures: string[]
  riskLevel: 'Low' | 'Medium' | 'High'
  icon: React.ReactNode
}

export default function DePINInfrastructurePage() {
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set())
  const [currentSection, setCurrentSection] = useState(0)

  useEffect(() => {
    // Load completed sections from localStorage
    const completed = JSON.parse(localStorage.getItem('completedDePINSections') || '[]')
    setCompletedSections(new Set(completed))
  }, [])

  const markSectionComplete = (sectionId: string) => {
    const newCompleted = new Set(completedSections).add(sectionId)
    setCompletedSections(newCompleted)
    localStorage.setItem('completedDePINSections', JSON.stringify([...newCompleted]))
  }

  const breadcrumbItems = [
    { label: 'Education', href: '/education', icon: <Home className="w-4 h-4" /> },
    { label: 'Market Categories', href: '/education/market-categories' },
    { label: 'DePIN Infrastructure', current: true }
  ]

  const depinProjects: DePINProject[] = [
    {
      id: 'helium',
      name: 'Helium',
      symbol: 'HNT',
      category: 'Wireless',
      marketCap: '$1B+',
      description: 'Decentralized wireless network for IoT devices with token incentives',
      keyFeatures: ['IoT connectivity', 'Proof of Coverage', 'Global network', 'Low power usage'],
      riskLevel: 'Medium',
      icon: <Radio className="w-6 h-6" />
    },
    {
      id: 'filecoin',
      name: 'Filecoin',
      symbol: 'FIL',
      category: 'Storage',
      marketCap: '$2B+',
      description: 'Decentralized storage network turning spare storage into marketplace',
      keyFeatures: ['Distributed storage', 'IPFS integration', 'Cryptographic proofs', 'Data permanence'],
      riskLevel: 'Medium',
      icon: <HardDrive className="w-6 h-6" />
    },
    {
      id: 'render',
      name: 'Render Network',
      symbol: 'RNDR',
      category: 'Compute',
      marketCap: '$3B+',
      description: 'Distributed GPU network for 3D rendering and AI computation',
      keyFeatures: ['GPU rendering', 'AI workloads', 'Creative industry', 'Octane integration'],
      riskLevel: 'High',
      icon: <Zap className="w-6 h-6" />
    },
    {
      id: 'hivemapper',
      name: 'Hivemapper',
      symbol: 'HONEY',
      category: 'Mapping',
      marketCap: '$100M+',
      description: 'Decentralized mapping network using dashcams to build fresh maps',
      keyFeatures: ['Real-time mapping', 'Dashcam network', 'Map-to-earn', 'Fresh map data'],
      riskLevel: 'High',
      icon: <MapPin className="w-6 h-6" />
    }
  ]

  const sections = [
    {
      id: 'depin-basics',
      title: 'What is DePIN?',
      duration: '12 min',
      description: 'Decentralized Physical Infrastructure Networks and tokenizing real-world resources'
    },
    {
      id: 'infrastructure-types',
      title: 'Types of Physical Infrastructure',
      duration: '15 min',
      description: 'Wireless, storage, compute, sensors, and energy networks'
    },
    {
      id: 'tokenization-models',
      title: 'DePIN Tokenization Models',
      duration: '14 min',
      description: 'How tokens incentivize infrastructure provision and usage'
    },
    {
      id: 'major-networks',
      title: 'Major DePIN Networks',
      duration: '18 min',
      description: 'Deep dive into Helium, Filecoin, Render, and emerging networks'
    },
    {
      id: 'investing-evaluation',
      title: 'Evaluating DePIN Investments',
      duration: '12 min',
      description: 'Network effects, utility demand, and infrastructure scalability'
    },
    {
      id: 'challenges-future',
      title: 'Challenges & Future',
      duration: '10 min',
      description: 'Regulatory hurdles, competition with centralized services, and growth potential'
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
              <div className="p-3 bg-green-100 rounded-lg">
                <Network className="w-8 h-8 text-green-600" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">DePIN (Physical Infrastructure)</h1>
                <p className="text-gray-600 mb-4">
                  Learn about Decentralized Physical Infrastructure Networks (DePIN) that use tokens 
                  to incentivize building real-world infrastructure like wireless networks, storage, and compute.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    4-6 hours total
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    Advanced Level
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Target className="w-4 h-4 mr-2" />
                    6 modules
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Star className="w-4 h-4 mr-2" />
                    Emerging Sector
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
                  className="bg-green-600 h-3 rounded-full transition-all duration-300"
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
                      completedSections.has(section.id) ? 'bg-green-100' : 'bg-green-100'
                    }`}>
                      {completedSections.has(section.id) ? (
                        <Trophy className="w-4 h-4 text-green-600" />
                      ) : (
                        <span className="text-green-600 font-semibold text-sm">{index + 1}</span>
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
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    {completedSections.has(section.id) ? 'Completed' : 'Start'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Major DePIN Projects */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Major DePIN Networks to Study</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {depinProjects.map((project) => (
                <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3 mb-3">
                    <div className={`p-2 rounded-lg ${
                      project.category === 'Wireless' ? 'bg-blue-100' :
                      project.category === 'Storage' ? 'bg-green-100' :
                      project.category === 'Compute' ? 'bg-purple-100' :
                      project.category === 'Mapping' ? 'bg-orange-100' :
                      project.category === 'Energy' ? 'bg-yellow-100' :
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
                  <Network className="w-5 h-5 mr-2 text-green-600" />
                  DePIN Fundamentals
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• How tokens incentivize infrastructure</li>
                  <li>• Physical vs digital network effects</li>
                  <li>• Supply and demand side tokenomics</li>
                  <li>• Real-world utility and adoption</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-red-600" />
                  Investment Analysis
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Evaluating network growth metrics</li>
                  <li>• Competition with centralized services</li>
                  <li>• Regulatory and hardware risks</li>
                  <li>• Long-term scalability factors</li>
                </ul>
              </div>
            </div>
          </div>

          {/* DePIN Categories Overview */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">DePIN Infrastructure Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Wifi className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">Wireless Networks</h3>
                </div>
                <p className="text-sm text-gray-600">IoT connectivity, 5G, WiFi hotspots</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <HardDrive className="w-5 h-5 text-green-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">Storage Networks</h3>
                </div>
                <p className="text-sm text-gray-600">Decentralized cloud storage and CDNs</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Zap className="w-5 h-5 text-purple-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">Compute Networks</h3>
                </div>
                <p className="text-sm text-gray-600">GPU rendering, AI training, processing</p>
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
              href="/education/market-categories/privacy-coins"
              className="inline-flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Next: Privacy Coins & ZK Tech
              <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 