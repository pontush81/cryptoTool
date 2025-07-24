'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Clock, Users, Target, Star, ChevronRight, Play, Trophy, ExternalLink, BarChart3, Gamepad2, Palette, Shield, Home } from 'lucide-react'
import Breadcrumb from '../../../../components/Breadcrumb'

interface NFTProject {
  id: string
  name: string
  symbol: string
  category: 'Marketplace' | 'Collection' | 'Gaming' | 'Utility' | 'Platform'
  marketCap: string
  description: string
  keyFeatures: string[]
  riskLevel: 'Low' | 'Medium' | 'High'
  icon: React.ReactNode
}

export default function NFTEcosystemPage() {
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set())
  const [currentSection, setCurrentSection] = useState(0)

  useEffect(() => {
    // Load completed sections from localStorage
    const completed = JSON.parse(localStorage.getItem('completedNFTSections') || '[]')
    setCompletedSections(new Set(completed))
  }, [])

  const markSectionComplete = (sectionId: string) => {
    const newCompleted = new Set(completedSections).add(sectionId)
    setCompletedSections(newCompleted)
    localStorage.setItem('completedNFTSections', JSON.stringify([...newCompleted]))
  }

  const breadcrumbItems = [
    { label: 'Education', href: '/education', icon: <Home className="w-4 h-4" /> },
    { label: 'Market Categories', href: '/education/market-categories' },
    { label: 'NFT Ecosystem', current: true }
  ]

  const nftProjects: NFTProject[] = [
    {
      id: 'opensea',
      name: 'OpenSea',
      symbol: 'OPENSEA',
      category: 'Marketplace',
      marketCap: '$1B+',
      description: 'Largest NFT marketplace enabling buying, selling, and discovery',
      keyFeatures: ['Largest selection', 'Multi-chain support', 'Creator tools', 'Royalty system'],
      riskLevel: 'Low',
      icon: <BarChart3 className="w-6 h-6" />
    },
    {
      id: 'blur',
      name: 'Blur',
      symbol: 'BLUR',
      category: 'Marketplace',
      marketCap: '$500M+',
      description: 'Pro trader-focused NFT marketplace with advanced features',
      keyFeatures: ['Professional tools', 'Aggregated liquidity', 'Token incentives', 'Fast trading'],
      riskLevel: 'Medium',
      icon: <BarChart3 className="w-6 h-6" />
    },
    {
      id: 'yuga-labs',
      name: 'Yuga Labs',
      symbol: 'APE',
      category: 'Collection',
      marketCap: '$2B+',
      description: 'Creator of Bored Ape Yacht Club and major NFT collections',
      keyFeatures: ['Premium collections', 'Strong community', 'Metaverse expansion', 'Brand licensing'],
      riskLevel: 'High',
      icon: <Palette className="w-6 h-6" />
    },
    {
      id: 'immutable',
      name: 'Immutable X',
      symbol: 'IMX',
      category: 'Gaming',
      marketCap: '$800M+',
      description: 'Layer 2 solution for NFT gaming with zero gas fees',
      keyFeatures: ['Zero gas fees', 'Gaming focused', 'Instant trades', 'Carbon neutral'],
      riskLevel: 'Medium',
      icon: <Gamepad2 className="w-6 h-6" />
    }
  ]

  const sections = [
    {
      id: 'overview',
      title: 'NFT Market Overview',
      duration: '8 min',
      description: 'Understanding the digital ownership revolution'
    },
    {
      id: 'use-cases',
      title: 'NFT Use Cases & Categories',
      duration: '12 min',
      description: 'From art to gaming to real-world assets'
    },
    {
      id: 'major-projects',
      title: 'Major NFT Projects & Platforms',
      duration: '15 min',
      description: 'Key players in the NFT ecosystem'
    },
    {
      id: 'investing',
      title: 'NFT Investment Framework',
      duration: '10 min',
      description: 'How to evaluate and invest in NFTs'
    },
    {
      id: 'risks',
      title: 'Risks & Considerations',
      duration: '8 min',
      description: 'Understanding NFT market risks'
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
                <Gamepad2 className="w-8 h-8 text-purple-600" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">NFT Ecosystem</h1>
                <p className="text-gray-600 mb-4">
                  Learn about Non-Fungible Tokens (NFTs), digital ownership, and how to navigate 
                  one of crypto's most innovative and controversial sectors.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    3-5 hours total
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    Beginner Level
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Target className="w-4 h-4 mr-2" />
                    5 modules
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Star className="w-4 h-4 mr-2" />
                    High Growth Sector
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

          {/* Learning Modules */}
          <div className="space-y-4">
            {sections.map((section, index) => (
              <div key={section.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      completedSections.has(section.id) ? 'bg-green-100' : 'bg-purple-100'
                    }`}>
                      {completedSections.has(section.id) ? (
                        <Trophy className="w-4 h-4 text-green-600" />
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
                        ? 'bg-green-100 text-green-700'
                        : 'bg-purple-600 text-white hover:bg-purple-700'
                    }`}
                  >
                    {completedSections.has(section.id) ? 'Completed' : 'Start'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Major NFT Projects */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Major NFT Projects to Study</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {nftProjects.map((project) => (
                <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3 mb-3">
                    <div className={`p-2 rounded-lg ${
                      project.category === 'Marketplace' ? 'bg-blue-100' :
                      project.category === 'Collection' ? 'bg-purple-100' :
                      project.category === 'Gaming' ? 'bg-green-100' :
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
                  <Palette className="w-5 h-5 mr-2 text-purple-600" />
                  NFT Fundamentals
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• What makes NFTs unique and valuable</li>
                  <li>• Different types of NFT use cases</li>
                  <li>• How NFT marketplaces work</li>
                  <li>• Understanding digital ownership</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-green-600" />
                  Investment & Risks
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• How to evaluate NFT projects</li>
                  <li>• Common NFT investment mistakes</li>
                  <li>• Market manipulation and scams</li>
                  <li>• Long-term vs speculative value</li>
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
              href="/education/market-categories/oracles-middleware"
              className="inline-flex items-center px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Next: Oracles & Data
              <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 