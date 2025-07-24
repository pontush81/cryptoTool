'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, Landmark, Calendar, User, TrendingUp, ArrowRight, Shield, Globe, DollarSign, AlertTriangle, Clock, Eye, Users, Building } from 'lucide-react'
import QuizComponent from '../../../../components/QuizComponent'

interface Section {
  id: string
  title: string
  content: React.ReactNode
  completed: boolean
}

export default function CBDCsPage() {
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set())
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  
  const toggleSection = (sectionId: string) => {
    const newCompleted = new Set(completedSections)
    if (newCompleted.has(sectionId)) {
      newCompleted.delete(sectionId)
    } else {
      newCompleted.add(sectionId)
    }
    setCompletedSections(newCompleted)
  }

  const handleQuizComplete = (score: number, passed: boolean) => {
    setQuizCompleted(passed)
    if (passed) {
      // Save completion and mastery level to localStorage
      const completedModules = JSON.parse(localStorage.getItem('completedEducationModules') || '[]')
      if (!completedModules.includes('cbdcs')) {
        completedModules.push('cbdcs')
        localStorage.setItem('completedEducationModules', JSON.stringify(completedModules))
      }
      
      // Set mastery level based on score
      const masteryLevels = JSON.parse(localStorage.getItem('educationMasteryLevels') || '{}')
      masteryLevels['cbdcs'] = score >= 90 ? 'excellent' : score >= 80 ? 'good' : 'basic'
      localStorage.setItem('educationMasteryLevels', JSON.stringify(masteryLevels))
    }
  }

  const sections: Section[] = [
    {
      id: 'cbdc-fundamentals',
      title: 'CBDC Fundamentals: What Are They?',
      completed: completedSections.has('cbdc-fundamentals'),
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
            <p className="text-lg leading-relaxed text-gray-700">
              <strong>Central Bank Digital Currencies (CBDCs)</strong> are digital forms of national currency 
              issued and controlled by central banks. Unlike cryptocurrencies or stablecoins, CBDCs carry 
              the full legal status of physical cash and represent direct liabilities of the issuing central bank.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Understanding the Key Differences</h4>
            
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h5 className="font-semibold text-gray-900 mb-3">CBDCs vs Cryptocurrencies vs Stablecoins</h5>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-semibold">Feature</th>
                        <th className="text-left p-3 font-semibold text-blue-700">CBDCs</th>
                        <th className="text-left p-3 font-semibold text-orange-700">Cryptocurrencies</th>
                        <th className="text-left p-3 font-semibold text-green-700">Stablecoins</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-3 font-medium">Issuer</td>
                        <td className="p-3 text-blue-700">Central Bank</td>
                        <td className="p-3 text-orange-700">Decentralized Network</td>
                        <td className="p-3 text-green-700">Private Company</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 font-medium">Backing</td>
                        <td className="p-3 text-blue-700">Government Authority</td>
                        <td className="p-3 text-orange-700">Market Forces</td>
                        <td className="p-3 text-green-700">Reserves/Collateral</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 font-medium">Control</td>
                        <td className="p-3 text-blue-700">Centralized</td>
                        <td className="p-3 text-orange-700">Decentralized</td>
                        <td className="p-3 text-green-700">Centralized</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 font-medium">Legal Status</td>
                        <td className="p-3 text-blue-700">Legal Tender</td>
                        <td className="p-3 text-orange-700">Varies by Country</td>
                        <td className="p-3 text-green-700">Digital Asset</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium">Privacy</td>
                        <td className="p-3 text-blue-700">Controlled by Gov</td>
                        <td className="p-3 text-orange-700">Pseudonymous</td>
                        <td className="p-3 text-green-700">Company Policy</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="bg-purple-50 border-l-4 border-purple-400 rounded-lg p-4">
                <h5 className="font-semibold text-purple-800 mb-3">Technology Foundation</h5>
                <p className="text-sm text-gray-700 mb-3">
                  While CBDCs can leverage blockchain technology, most use permissioned (private) ledgers
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-purple-800 text-sm mb-1">Why Permissioned?</p>
                    <ul className="text-xs text-purple-600 space-y-1">
                      <li>• Scalability for millions of transactions</li>
                      <li>• Regulatory compliance and oversight</li>
                      <li>• Energy efficiency vs public blockchains</li>
                      <li>• Integration with existing banking systems</li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-purple-800 text-sm mb-1">Key Features</p>
                    <ul className="text-xs text-purple-600 space-y-1">
                      <li>• Instant settlement capability</li>
                      <li>• Programmable money features</li>
                      <li>• Offline payment capability</li>
                      <li>• Multi-tier privacy controls</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Two Main CBDC Types</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-4">
                <h5 className="font-semibold text-blue-800 mb-3">Retail CBDCs</h5>
                <p className="text-sm text-gray-700 mb-3">
                  For everyday use by citizens and businesses
                </p>
                
                <div className="space-y-2">
                  <div className="bg-white p-2 rounded text-xs">
                    <p className="font-semibold text-blue-800 mb-1">Examples:</p>
                    <p className="text-blue-600">China's e-CNY, Nigeria's eNaira, Bahamas Sand Dollar</p>
                  </div>
                  <div className="bg-white p-2 rounded text-xs">
                    <p className="font-semibold text-blue-800 mb-1">Use Cases:</p>
                    <p className="text-blue-600">Payments, remittances, government benefits, retail purchases</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 border-l-4 border-green-400 rounded-lg p-4">
                <h5 className="font-semibold text-green-800 mb-3">Wholesale CBDCs</h5>
                <p className="text-sm text-gray-700 mb-3">
                  For interbank settlements and institutional use
                </p>
                
                <div className="space-y-2">
                  <div className="bg-white p-2 rounded text-xs">
                    <p className="font-semibold text-green-800 mb-1">Examples:</p>
                    <p className="text-green-600">Brazil's DREX, India's Digital Rupee (wholesale pilot)</p>
                  </div>
                  <div className="bg-white p-2 rounded text-xs">
                    <p className="font-semibold text-green-800 mb-1">Use Cases:</p>
                    <p className="text-green-600">Bank settlements, bond trading, tokenized asset transactions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">🌍 Global CBDC Status</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white p-3 rounded border text-center">
                <p className="font-semibold text-yellow-800 text-lg">130+</p>
                <p className="text-yellow-600 text-xs">Countries exploring CBDCs</p>
              </div>
              <div className="bg-white p-3 rounded border text-center">
                <p className="font-semibold text-yellow-800 text-lg">20+</p>
                <p className="text-yellow-600 text-xs">In advanced pilot phases</p>
              </div>
              <div className="bg-white p-3 rounded border text-center">
                <p className="font-semibold text-yellow-800 text-lg">5+</p>
                <p className="text-yellow-600 text-xs">Fully launched</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'real-implementations',
      title: 'Real-World CBDC Implementations',
      completed: completedSections.has('real-implementations'),
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Live CBDCs and Advanced Pilots</h4>
            
            <div className="space-y-4">
              <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Building className="w-5 h-5 text-red-500 mr-2" />
                  <h5 className="font-semibold text-red-800">China - Digital Yuan (e-CNY)</h5>
                  <span className="ml-2 bg-red-100 text-red-700 text-xs px-2 py-1 rounded">Live - 200M+ Users</span>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  The world's largest live CBDC, fully integrated into China's digital ecosystem
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-red-800 text-sm mb-1">Scale & Adoption</p>
                    <ul className="text-xs text-red-600 space-y-1">
                      <li>• 200+ million users across major cities</li>
                      <li>• Integration with Alipay and WeChat Pay</li>
                      <li>• Used in retail stores, transport, utilities</li>
                      <li>• Government salary and benefit payments</li>
                      <li>• Cross-border trade settlements</li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-red-800 text-sm mb-1">Technical Features</p>
                    <ul className="text-xs text-red-600 space-y-1">
                      <li>• Two-tier distribution model</li>
                      <li>• Offline payment capability</li>
                      <li>• "Controllable anonymity" design</li>
                      <li>• Smart contract functionality</li>
                      <li>• Interoperable with existing payment rails</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-3 p-2 bg-red-100 rounded text-xs text-red-800">
                  <strong>Impact:</strong> Demonstrating CBDC viability at scale, influencing global central bank strategies
                </div>
              </div>
              
              <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Globe className="w-5 h-5 text-blue-500 mr-2" />
                  <h5 className="font-semibold text-blue-800">European Union - Digital Euro</h5>
                  <span className="ml-2 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">Advanced Pilot</span>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Privacy-focused CBDC in advanced testing across EU member states
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-blue-800 text-sm mb-1">Design Principles</p>
                    <ul className="text-xs text-blue-600 space-y-1">
                      <li>• "Privacy by default & design"</li>
                      <li>• Offline transaction capability</li>
                      <li>• Transaction caps to limit bank disruption</li>
                      <li>• No interest bearing to protect banks</li>
                      <li>• Pan-European interoperability</li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-blue-800 text-sm mb-1">Current Status</p>
                    <ul className="text-xs text-blue-600 space-y-1">
                      <li>• Technical infrastructure testing</li>
                      <li>• Privacy feature development</li>
                      <li>• Initial deployment planned 2026-2027</li>
                      <li>• Limited transaction caps initially</li>
                      <li>• Two-year investigation phase ongoing</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-3 p-2 bg-blue-100 rounded text-xs text-blue-800">
                  <strong>Challenge:</strong> Balancing privacy demands with AML/regulatory requirements across 27 countries
                </div>
              </div>
              
              <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Landmark className="w-5 h-5 text-green-500 mr-2" />
                  <h5 className="font-semibold text-green-800">Nigeria - eNaira</h5>
                  <span className="ml-2 bg-green-100 text-green-700 text-xs px-2 py-1 rounded">Live Since 2021</span>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Africa's first live CBDC focused on financial inclusion and remittances
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-green-800 text-sm mb-1">Primary Goals</p>
                    <ul className="text-xs text-green-600 space-y-1">
                      <li>• Financial inclusion for unbanked population</li>
                      <li>• Reduce cost of remittances</li>
                      <li>• Government-to-person (G2P) payments</li>
                      <li>• Support for SME payments</li>
                      <li>• Cross-border trade facilitation</li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-green-800 text-sm mb-1">Implementation</p>
                    <ul className="text-xs text-green-600 space-y-1">
                      <li>• Wallet tiers based on KYC levels</li>
                      <li>• Integration with existing banks</li>
                      <li>• USSD support for feature phones</li>
                      <li>• Strong national ID system integration</li>
                      <li>• Merchant payment acceptance growing</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 border-l-4 border-purple-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <DollarSign className="w-5 h-5 text-purple-500 mr-2" />
                  <h5 className="font-semibold text-purple-800">Other Notable Implementations</h5>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <div className="bg-white p-3 rounded border">
                      <p className="font-semibold text-purple-800 text-sm mb-1">Bahamas - Sand Dollar</p>
                      <p className="text-xs text-purple-600">
                        First fully launched CBDC. Used for daily payments, addressing financial inclusion 
                        across the island nation. Focus on hurricane disaster resilience.
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <p className="font-semibold text-purple-800 text-sm mb-1">Brazil - DREX</p>
                      <p className="text-xs text-purple-600">
                        Wholesale pilot focusing on interbank settlement and tokenized asset integration. 
                        Testing DeFi-like capabilities within regulated framework.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-white p-3 rounded border">
                      <p className="font-semibold text-purple-800 text-sm mb-1">India - Digital Rupee</p>
                      <p className="text-xs text-purple-600">
                        Both retail and wholesale pilots underway with banks. Focus on interbank 
                        settlements and small-value retail transactions.
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <p className="font-semibold text-purple-800 text-sm mb-1">Sweden - e-krona</p>
                      <p className="text-xs text-purple-600">
                        Advanced pilot examining cash-alternative use cases, offline payments, 
                        and privacy-preserving technologies for a largely cashless society.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Cross-Border CBDC Initiatives</h4>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-gray-800 text-sm mb-1">mBridge Project</p>
                <p className="text-xs text-gray-600 mb-2">
                  Multi-CBDC platform connecting China, Hong Kong, Thailand, and UAE for cross-border settlements
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">Achievements:</p>
                    <p className="text-gray-600">$22+ billion in transaction value, 15-second cross-border settlements</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">Impact:</p>
                    <p className="text-gray-600">Demonstrating potential to replace SWIFT for CBDC payments</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'government-motivations',
      title: 'Government Motivations for CBDCs',
      completed: completedSections.has('government-motivations'),
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Why Central Banks Are Racing to Launch CBDCs</h4>
            
            <div className="space-y-4">
              <div className="bg-red-50 border-l-4 border-red-400 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Shield className="w-5 h-5 text-red-500 mr-2" />
                  <h5 className="font-semibold text-red-800">Monetary Sovereignty & Control</h5>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Responding to threats from private digital currencies and foreign CBDCs
                </p>
                
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-red-800 text-sm mb-1">Private Stablecoin Challenge</p>
                    <div className="text-xs text-red-600 space-y-1">
                      <p>• USDC, USDT represent $150+ billion in circulation</p>
                      <p>• Could undermine national currency adoption</p>
                      <p>• Reduce effectiveness of monetary policy</p>
                      <p>• Create dependency on foreign currency systems</p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-red-800 text-sm mb-1">Foreign CBDC Competition</p>
                    <div className="text-xs text-red-600 space-y-1">
                      <p>• China's e-CNY being used internationally</p>
                      <p>• Risk of "digital dollarization/yuan-ization"</p>
                      <p>• Potential loss of seigniorage revenue</p>
                      <p>• Reduced control over domestic payment systems</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Clock className="w-5 h-5 text-blue-500 mr-2" />
                  <h5 className="font-semibold text-blue-800">Payment System Modernization</h5>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Upgrading aging payment infrastructure for the digital economy
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-blue-800 text-sm mb-1">Current Pain Points</p>
                    <ul className="text-xs text-blue-600 space-y-1">
                      <li>• Cross-border payments take 3-5 days</li>
                      <li>• High correspondent banking fees</li>
                      <li>• Limited operating hours (no weekends)</li>
                      <li>• Multiple intermediaries increase costs</li>
                      <li>• Poor integration with digital services</li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-blue-800 text-sm mb-1">CBDC Solutions</p>
                    <ul className="text-xs text-blue-600 space-y-1">
                      <li>• 24/7/365 instant settlement</li>
                      <li>• Direct peer-to-peer transactions</li>
                      <li>• Reduced reliance on intermediaries</li>
                      <li>• Programmable payment features</li>
                      <li>• Lower costs for consumers and businesses</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 border-l-4 border-green-400 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Users className="w-5 h-5 text-green-500 mr-2" />
                  <h5 className="font-semibold text-green-800">Financial Inclusion</h5>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Providing direct access to central bank money for unbanked populations
                </p>
                
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-green-800 text-sm mb-1">Global Challenge</p>
                    <div className="text-xs text-green-600">
                      <p><strong>1.7 billion adults</strong> remain unbanked globally</p>
                      <p><strong>Key barriers:</strong> High fees, documentation requirements, geographic access</p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-green-800 text-sm mb-1">CBDC Advantages</p>
                    <ul className="text-xs text-green-600 space-y-1">
                      <li>• Direct central bank account access</li>
                      <li>• No minimum balance requirements</li>
                      <li>• Mobile phone-based access</li>
                      <li>• Government benefit distribution</li>
                      <li>• Reduced dependency on commercial banks</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-100 p-3 rounded">
                    <p className="font-semibold text-green-800 text-sm mb-1">Success Story: Nigeria eNaira</p>
                    <p className="text-xs text-green-700">
                      Targeting 36% unbanked population with mobile-first approach and 
                      USSD support for feature phones
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 border-l-4 border-purple-400 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Eye className="w-5 h-5 text-purple-500 mr-2" />
                  <h5 className="font-semibold text-purple-800">Enhanced Regulatory Oversight</h5>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Better visibility into money flows for compliance and policy effectiveness
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-purple-800 text-sm mb-1">AML/CFT Benefits</p>
                    <ul className="text-xs text-purple-600 space-y-1">
                      <li>• Real-time transaction monitoring</li>
                      <li>• Enhanced suspicious activity detection</li>
                      <li>• Reduced cash-based money laundering</li>
                      <li>• Improved sanctions enforcement</li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-purple-800 text-sm mb-1">Tax Collection</p>
                    <ul className="text-xs text-purple-600 space-y-1">
                      <li>• Automatic transaction reporting</li>
                      <li>• Reduced tax evasion opportunities</li>
                      <li>• Better visibility into shadow economy</li>
                      <li>• Simplified compliance for businesses</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-orange-50 border-l-4 border-orange-400 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <TrendingUp className="w-5 h-5 text-orange-500 mr-2" />
                  <h5 className="font-semibold text-orange-800">Crisis Response & Monetary Policy</h5>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Enhanced tools for economic stimulus and emergency response
                </p>
                
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-orange-800 text-sm mb-1">Direct Stimulus Distribution</p>
                    <div className="text-xs text-orange-600 space-y-1">
                      <p>• Instant "helicopter money" capability</p>
                      <p>• Targeted relief for specific demographics</p>
                      <p>• Programmable expiration for urgent spending</p>
                      <p>• Reduced bureaucracy and distribution costs</p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-orange-800 text-sm mb-1">Enhanced Monetary Policy</p>
                    <div className="text-xs text-orange-600 space-y-1">
                      <p>• Direct negative interest rate implementation</p>
                      <p>• Real-time economic data collection</p>
                      <p>• Targeted sectoral policy interventions</p>
                      <p>• Bypass commercial bank transmission delays</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">⚡ First-Mover Advantages</h4>
            <div className="text-sm text-yellow-700 space-y-2">
              <p><strong>Network Effects:</strong> Early adoption can establish payment corridors and international usage</p>
              <p><strong>Technical Standards:</strong> Influence global CBDC interoperability protocols</p>
              <p><strong>Economic Benefits:</strong> Attract fintech investment and digital economy development</p>
              <div className="bg-white p-3 rounded border mt-3 text-xs">
                <strong>Example:</strong> China's e-CNY is being integrated into Belt and Road Initiative countries, 
                potentially creating yuan-denominated payment networks across Asia and Africa.
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'privacy-vs-control',
      title: 'Privacy vs Control: Design Trade-offs',
      completed: completedSections.has('privacy-vs-control'),
      content: (
        <div className="space-y-6">
          <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
            <p className="text-lg leading-relaxed text-gray-700">
              The most contentious aspect of CBDC design is balancing user privacy with government oversight. 
              Every implementation makes different trade-offs, creating a spectrum from high surveillance 
              to enhanced privacy—each with significant implications for citizens and financial freedom.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">The Privacy-Control Spectrum</h4>
            
            <div className="space-y-4">
              <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Eye className="w-5 h-5 text-red-500 mr-2" />
                  <h5 className="font-semibold text-red-800">China e-CNY: "Controllable Anonymity"</h5>
                  <span className="ml-2 bg-red-100 text-red-700 text-xs px-2 py-1 rounded">High Control</span>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Emphasizes government oversight with limited user privacy protections
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-red-800 text-sm mb-1">Privacy Features</p>
                    <ul className="text-xs text-red-600 space-y-1">
                      <li>• Small transactions can be pseudonymous</li>
                      <li>• No transaction history shared with merchants</li>
                      <li>• Different anonymity levels by wallet tier</li>
                      <li>• Offline payments don't require real-time ID</li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-red-800 text-sm mb-1">Control Mechanisms</p>
                    <ul className="text-xs text-red-600 space-y-1">
                      <li>• Real names required for account setup</li>
                      <li>• Large transactions fully traceable</li>
                      <li>• PBOC has access to all transaction data</li>
                      <li>• Law enforcement can freeze accounts instantly</li>
                      <li>• Geographic and spending restrictions possible</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-3 p-2 bg-red-100 rounded text-xs text-red-800">
                  <strong>Philosophy:</strong> "Privacy for the user, transparency for the regulator"
                </div>
              </div>
              
              <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Shield className="w-5 h-5 text-blue-500 mr-2" />
                  <h5 className="font-semibold text-blue-800">EU Digital Euro: "Privacy by Design"</h5>
                  <span className="ml-2 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">High Privacy</span>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Prioritizes user privacy while maintaining essential regulatory compliance
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-blue-800 text-sm mb-1">Privacy Protections</p>
                    <ul className="text-xs text-blue-600 space-y-1">
                      <li>• Offline transactions completely private</li>
                      <li>• Data minimization principles</li>
                      <li>• No central transaction database</li>
                      <li>• Limited transaction history retention</li>
                      <li>• Strong encryption and anonymization</li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-blue-800 text-sm mb-1">Compliance Balance</p>
                    <ul className="text-xs text-blue-600 space-y-1">
                      <li>• AML checks only for large transactions</li>
                      <li>• Court orders required for account freezing</li>
                      <li>• Data access limited to financial crimes</li>
                      <li>• Regular privacy audits mandated</li>
                      <li>• Citizen privacy rights protected by GDPR</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-3 p-2 bg-blue-100 rounded text-xs text-blue-800">
                  <strong>Challenge:</strong> Harmonizing privacy standards across 27 different legal systems
                </div>
              </div>
              
              <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Users className="w-5 h-5 text-green-500 mr-2" />
                  <h5 className="font-semibold text-green-800">Tiered Privacy Models</h5>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Many CBDCs use tiered systems balancing privacy with compliance based on transaction amounts
                </p>
                
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-green-800 text-sm mb-2">Bahamas Sand Dollar Example</p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Tier</th>
                            <th className="text-left p-2">KYC Level</th>
                            <th className="text-left p-2">Transaction Limit</th>
                            <th className="text-left p-2">Privacy Level</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="p-2 font-medium text-green-700">Basic</td>
                            <td className="p-2">Minimal (phone only)</td>
                            <td className="p-2">$500/month</td>
                            <td className="p-2">High privacy</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2 font-medium text-green-700">Enhanced</td>
                            <td className="p-2">ID verification</td>
                            <td className="p-2">$1,500/month</td>
                            <td className="p-2">Moderate privacy</td>
                          </tr>
                          <tr>
                            <td className="p-2 font-medium text-green-700">Full</td>
                            <td className="p-2">Complete KYC</td>
                            <td className="p-2">Unlimited</td>
                            <td className="p-2">Full transparency</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-orange-50 border-l-4 border-orange-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <AlertTriangle className="w-5 h-5 text-orange-500 mr-2" />
                  <h5 className="font-semibold text-orange-800">Privacy Concerns & Risks</h5>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Critics highlight potential risks of government-controlled digital money
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-orange-800 text-sm mb-1">Surveillance Risks</p>
                    <ul className="text-xs text-orange-600 space-y-1">
                      <li>• Complete transaction history visibility</li>
                      <li>• Real-time spending pattern analysis</li>
                      <li>• Political spending monitoring</li>
                      <li>• Social credit scoring integration</li>
                      <li>• Behavioral modification through incentives</li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-orange-800 text-sm mb-1">Control Mechanisms</p>
                    <ul className="text-xs text-orange-600 space-y-1">
                      <li>• Instant account freezing without court orders</li>
                      <li>• Programmable spending restrictions</li>
                      <li>• Geographic transaction limits</li>
                      <li>• Automatic tax deduction</li>
                      <li>• Expiring money for forced spending</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">The Fundamental Trade-off</h4>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-3 rounded border-l-4 border-green-400">
                  <h5 className="font-semibold text-green-800 mb-2">More Privacy →</h5>
                  <div className="space-y-2 text-sm">
                    <div className="text-green-700">
                      <p className="font-semibold">Benefits:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Protection from government overreach</li>
                        <li>• Preservation of financial autonomy</li>
                        <li>• Enhanced personal security</li>
                        <li>• Freedom of political expression</li>
                      </ul>
                    </div>
                    <div className="text-red-600">
                      <p className="font-semibold">Risks:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Money laundering opportunities</li>
                        <li>• Tax evasion facilitation</li>
                        <li>• Terrorism financing risks</li>
                        <li>• Reduced regulatory effectiveness</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-red-50 p-3 rounded border-l-4 border-red-400">
                  <h5 className="font-semibold text-red-800 mb-2">More Control →</h5>
                  <div className="space-y-2 text-sm">
                    <div className="text-green-700">
                      <p className="font-semibold">Benefits:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Enhanced AML/CFT compliance</li>
                        <li>• Better tax collection</li>
                        <li>• Effective sanctions enforcement</li>
                        <li>• Crisis response capabilities</li>
                      </ul>
                    </div>
                    <div className="text-red-600">
                      <p className="font-semibold">Risks:</p>
                      <ul className="text-xs space-y-1">
                        <li>• Government surveillance state</li>
                        <li>• Political persecution tools</li>
                        <li>• Loss of financial privacy</li>
                        <li>• Authoritarian control mechanisms</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">🔍 Technical Solutions Being Explored</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-semibold text-yellow-800 mb-2">Privacy-Preserving Technologies:</h5>
                <ul className="space-y-1 text-yellow-700 text-xs">
                  <li>• <strong>Zero-Knowledge Proofs:</strong> Prove transaction validity without revealing details</li>
                  <li>• <strong>Differential Privacy:</strong> Add mathematical noise to protect individual data</li>
                  <li>• <strong>Secure Multi-Party Computation:</strong> Process data without exposing it</li>
                  <li>• <strong>Ring Signatures:</strong> Hide transaction source in group of possibilities</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-yellow-800 mb-2">Regulatory Solutions:</h5>
                <ul className="space-y-1 text-yellow-700 text-xs">
                  <li>• <strong>Threshold-based disclosure:</strong> Privacy for small amounts only</li>
                  <li>• <strong>Purpose limitation:</strong> Data only used for specified purposes</li>
                  <li>• <strong>Judicial oversight:</strong> Court orders required for account access</li>
                  <li>• <strong>Data retention limits:</strong> Automatic deletion after specified periods</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'future-implications',
      title: 'Future Implications for Banking & Finance',
      completed: completedSections.has('future-implications'),
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
            <p className="text-lg leading-relaxed text-gray-700">
              CBDCs represent the most significant change to monetary systems since the abandonment of 
              the gold standard. Their widespread adoption will reshape banking, payments, monetary policy, 
              and the fundamental relationship between citizens, money, and government.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Impact on Retail Banking</h4>
            
            <div className="space-y-4">
              <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Building className="w-5 h-5 text-red-500 mr-2" />
                  <h5 className="font-semibold text-red-800">Disintermediation Risk</h5>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  CBDCs could enable direct public access to central bank money, potentially bypassing commercial banks
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-red-800 text-sm mb-1">The Threat</p>
                    <ul className="text-xs text-red-600 space-y-1">
                      <li>• Consumers could move deposits to CBDCs</li>
                      <li>• Banks lose low-cost funding source</li>
                      <li>• Reduced ability to create credit</li>
                      <li>• Higher funding costs for banks</li>
                      <li>• Potential credit contraction</li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-red-800 text-sm mb-1">Mitigation Strategies</p>
                    <ul className="text-xs text-red-600 space-y-1">
                      <li>• CBDC balance caps (e.g., €3,000 limit)</li>
                      <li>• No interest paid on CBDC holdings</li>
                      <li>• Two-tier distribution model via banks</li>
                      <li>• Transaction fees for large amounts</li>
                      <li>• Emergency lending facilities for banks</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-3 p-2 bg-red-100 rounded text-xs text-red-800">
                  <strong>Industry Response:</strong> Banks investing in value-added services, personalized banking, and credit products to differentiate from basic CBDC functionality
                </div>
              </div>
              
              <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Users className="w-5 h-5 text-blue-500 mr-2" />
                  <h5 className="font-semibold text-blue-800">New Banking Models</h5>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Banks adapting to serve as CBDC distributors and service providers
                </p>
                
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-blue-800 text-sm mb-1">Two-Tier Model</p>
                    <p className="text-xs text-blue-600 mb-2">
                      Central banks issue CBDCs to commercial banks, who then distribute to customers
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div>
                        <p className="font-semibold text-blue-700 text-xs mb-1">Bank Benefits:</p>
                        <ul className="text-xs text-blue-600 space-y-1">
                          <li>• Maintain customer relationships</li>
                          <li>• Value-added service opportunities</li>
                          <li>• KYC/AML compliance revenue</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-blue-700 text-xs mb-1">Central Bank Benefits:</p>
                        <ul className="text-xs text-blue-600 space-y-1">
                          <li>• Leverage existing infrastructure</li>
                          <li>• Maintain financial stability</li>
                          <li>• Preserve credit creation mechanism</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Transformation of Payments</h4>
            
            <div className="space-y-4">
              <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Clock className="w-5 h-5 text-green-500 mr-2" />
                  <h5 className="font-semibold text-green-800">Instant, 24/7 Settlements</h5>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  CBDCs enable instant final settlement without intermediaries
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-green-800 text-sm mb-1">Current System</p>
                    <ul className="text-xs text-green-600 space-y-1">
                      <li>• Card payments: 2-3 days settlement</li>
                      <li>• Wire transfers: Same day or next day</li>
                      <li>• Cross-border: 3-5 days</li>
                      <li>• Multiple intermediaries and fees</li>
                      <li>• Limited to business hours</li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-green-800 text-sm mb-1">CBDC System</p>
                    <ul className="text-xs text-green-600 space-y-1">
                      <li>• All payments: Instant final settlement</li>
                      <li>• Direct peer-to-peer transfers</li>
                      <li>• Cross-border in seconds (with interop)</li>
                      <li>• Minimal fees (or fee-free)</li>
                      <li>• 24/7/365 availability</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 border-l-4 border-purple-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Globe className="w-5 h-5 text-purple-500 mr-2" />
                  <h5 className="font-semibold text-purple-800">Programmable Money Features</h5>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Smart contract functionality enables automated and conditional payments
                </p>
                
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-purple-800 text-sm mb-1">Government Applications</p>
                    <ul className="text-xs text-purple-600 space-y-1">
                      <li>• <strong>Targeted stimulus:</strong> Money that can only be spent on essentials</li>
                      <li>• <strong>Automatic tax collection:</strong> Built-in tax deduction on transactions</li>
                      <li>• <strong>Expiring benefits:</strong> Use-it-or-lose-it emergency payments</li>
                      <li>• <strong>Geographic restrictions:</strong> Local economic development funds</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-purple-800 text-sm mb-1">Commercial Applications</p>
                    <ul className="text-xs text-purple-600 space-y-1">
                      <li>• <strong>Supply chain payments:</strong> Automatic release upon delivery confirmation</li>
                      <li>• <strong>Subscription services:</strong> Recurring payments with automatic cancellation</li>
                      <li>• <strong>Escrow services:</strong> Conditional release based on milestones</li>
                      <li>• <strong>Loyalty programs:</strong> Programmable rewards and redemption</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Monetary Policy Revolution</h4>
            
            <div className="space-y-4">
              <div className="bg-orange-50 border-l-4 border-orange-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <TrendingUp className="w-5 h-5 text-orange-500 mr-2" />
                  <h5 className="font-semibold text-orange-800">Direct Monetary Transmission</h5>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Central banks could bypass commercial banks for monetary policy implementation
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-orange-800 text-sm mb-1">Traditional Transmission</p>
                    <div className="text-xs text-orange-600 space-y-1">
                      <p>1. Central bank sets interest rate</p>
                      <p>2. Banks adjust lending/deposit rates</p>
                      <p>3. Eventually affects consumer behavior</p>
                      <p>4. Impact varies by bank willingness</p>
                      <p><strong>Timeline:</strong> 6-18 months for full effect</p>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-orange-800 text-sm mb-1">CBDC Transmission</p>
                    <div className="text-xs text-orange-600 space-y-1">
                      <p>1. Direct interest rate on CBDC holdings</p>
                      <p>2. Automatic adjustment of rates</p>
                      <p>3. Immediate impact on all users</p>
                      <p>4. No bank intermediation delays</p>
                      <p><strong>Timeline:</strong> Instant to weeks</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <DollarSign className="w-5 h-5 text-blue-500 mr-2" />
                  <h5 className="font-semibold text-blue-800">New Policy Tools</h5>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  CBDCs enable monetary policy approaches impossible with physical cash
                </p>
                
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-blue-800 text-sm mb-1">Helicopter Money</p>
                    <p className="text-xs text-blue-600 mb-1">
                      Direct money creation and distribution to citizens for economic stimulus
                    </p>
                    <p className="text-xs text-blue-500 italic">
                      Example: $1,000 automatically added to every citizen's CBDC wallet during recession
                    </p>
                  </div>
                  
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-blue-800 text-sm mb-1">Negative Interest Rates</p>
                    <p className="text-xs text-blue-600 mb-1">
                      Automatic deduction from CBDC balances to encourage spending over saving
                    </p>
                    <p className="text-xs text-blue-500 italic">
                      Example: -2% annual rate reduces idle balances, stimulating economic activity
                    </p>
                  </div>
                  
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-blue-800 text-sm mb-1">Targeted Economic Incentives</p>
                    <p className="text-xs text-blue-600 mb-1">
                      Programmable money for specific economic objectives
                    </p>
                    <p className="text-xs text-blue-500 italic">
                      Example: Extra purchasing power for domestic goods to support local industries
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Cross-Border & Geopolitical Implications</h4>
            
            <div className="space-y-4">
              <div className="bg-purple-50 border-l-4 border-purple-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Globe className="w-5 h-5 text-purple-500 mr-2" />
                  <h5 className="font-semibold text-purple-800">International Payment Infrastructure</h5>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  CBDCs could reshape global payment systems and currency dominance
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-purple-800 text-sm mb-1">Potential Benefits</p>
                    <ul className="text-xs text-purple-600 space-y-1">
                      <li>• Reduced dependence on SWIFT network</li>
                      <li>• Lower correspondent banking costs</li>
                      <li>• Instant cross-border settlements</li>
                      <li>• Enhanced financial inclusion globally</li>
                      <li>• Alternative to dollar-dominated system</li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-purple-800 text-sm mb-1">Geopolitical Risks</p>
                    <ul className="text-xs text-purple-600 space-y-1">
                      <li>• Digital currency competition between nations</li>
                      <li>• Potential for economic surveillance/control</li>
                      <li>• Risk of fragmented payment systems</li>
                      <li>• Challenge to US dollar hegemony</li>
                      <li>• New forms of financial sanctions/warfare</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-3 p-2 bg-purple-100 rounded text-xs text-purple-800">
                  <strong>mBridge Example:</strong> China, Hong Kong, Thailand, UAE testing multi-CBDC platform 
                  that could bypass traditional correspondent banking for $22+ billion in transactions
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Timeline & Adoption Scenarios</h4>
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-blue-50 p-3 rounded border">
                  <p className="font-semibold text-blue-800 mb-1">2025-2027: Early Adoption</p>
                  <ul className="text-xs text-blue-600 space-y-1">
                    <li>• Major economies launch retail CBDCs</li>
                    <li>• Limited functionality and caps</li>
                    <li>• Coexistence with cash and cards</li>
                    <li>• Initial cross-border experiments</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-3 rounded border">
                  <p className="font-semibold text-green-800 mb-1">2027-2030: Mainstream</p>
                  <ul className="text-xs text-green-600 space-y-1">
                    <li>• Widespread public adoption</li>
                    <li>• Advanced programmable features</li>
                    <li>• Multi-CBDC payment corridors</li>
                    <li>• Banking sector adaptation complete</li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-3 rounded border">
                  <p className="font-semibold text-purple-800 mb-1">2030+: Maturation</p>
                  <ul className="text-xs text-purple-600 space-y-1">
                    <li>• CBDCs as primary payment method</li>
                    <li>• Full monetary policy integration</li>
                    <li>• Global interoperability standards</li>
                    <li>• Potential cash phase-out in some regions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ]

  const progress = (completedSections.size / sections.length) * 100

  const quizQuestions = [
    {
      id: 'cbdc-definition',
      question: 'What fundamentally distinguishes CBDCs from both cryptocurrencies and stablecoins?',
      options: [
        'CBDCs are always more expensive to use',
        'CBDCs are direct liabilities of central banks with full legal tender status',
        'CBDCs can only be used by governments',
        'CBDCs are always built on public blockchains'
      ],
      correctAnswer: 1,
      explanation: 'CBDCs are digital forms of national currency issued by central banks, carrying full legal tender status as direct central bank liabilities, unlike cryptocurrencies (decentralized) or stablecoins (private company issued).'
    },
    {
      id: 'china-dcep',
      question: 'What makes China\'s e-CNY (Digital Yuan) significant in the global CBDC landscape?',
      options: [
        'It was the first CBDC ever created',
        'It is the world\'s largest live CBDC with 200+ million users and real-world integration',
        'It offers complete anonymity to users',
        'It only works for international transactions'
      ],
      correctAnswer: 1,
      explanation: 'China\'s e-CNY is the world\'s largest operational CBDC with over 200 million users, integrated into major payment platforms like Alipay and WeChat Pay, demonstrating CBDC viability at scale.'
    },
    {
      id: 'government-motivation',
      question: 'What is a primary motivation for governments to develop CBDCs?',
      options: [
        'To eliminate all forms of cash permanently',
        'To respond to private stablecoins and maintain monetary sovereignty',
        'To make money creation more expensive',
        'To give up control over monetary policy'
      ],
      correctAnswer: 1,
      explanation: 'A key motivation is maintaining monetary sovereignty in response to private stablecoins (like USDC, USDT) and foreign CBDCs that could undermine national currency adoption and monetary policy effectiveness.'
    },
    {
      id: 'privacy-tradeoff',
      question: 'How does the EU\'s Digital Euro approach privacy differently from China\'s e-CNY?',
      options: [
        'The Digital Euro offers no privacy protections',
        'The Digital Euro emphasizes "privacy by design" with offline transactions and data minimization',
        'Both systems offer identical privacy features',
        'The e-CNY provides more privacy than the Digital Euro'
      ],
      correctAnswer: 1,
      explanation: 'The EU Digital Euro prioritizes "privacy by design" with features like completely private offline transactions and data minimization, while China\'s e-CNY uses "controllable anonymity" with stronger government oversight capabilities.'
    },
    {
      id: 'banking-impact',
      question: 'How do CBDCs potentially threaten traditional retail banking?',
      options: [
        'CBDCs make banks completely unnecessary',
        'CBDCs could cause disintermediation if people move deposits to central bank money',
        'CBDCs only help banks increase profits',
        'CBDCs have no impact on banking'
      ],
      correctAnswer: 1,
      explanation: 'CBDCs pose disintermediation risk because they enable direct public access to central bank money, potentially causing people to move deposits away from commercial banks, reducing banks\' low-cost funding sources.'
    }
  ]

  if (showQuiz) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <Link href="/education" className="inline-flex items-center text-blue-600 hover:text-blue-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Education
            </Link>
          </div>
          
          <QuizComponent 
            title="CBDCs Quiz"
            questions={quizQuestions}
            onComplete={handleQuizComplete}
          />
          
          {quizCompleted && (
            <div className="mt-6">
              <Link 
                href="/education/cross-chain-finance"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Continue to Cross-Chain Finance
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          
          {/* Header */}
          <div className="flex items-center justify-between">
            <Link href="/education" className="inline-flex items-center text-blue-600 hover:text-blue-700">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Education
            </Link>
          </div>

          {/* Course Info Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
            <div className="flex items-start space-x-4 mb-6">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Landmark className="w-8 h-8 text-blue-600" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">CBDCs: Government Digital Currencies</h1>
                <p className="text-gray-600 mb-4">
                  Explore how governments worldwide are creating their own digital currencies. Learn about 
                  China's e-CNY with 200+ million users, the EU's privacy-focused Digital Euro, and how 
                  CBDCs will reshape banking, payments, and monetary policy forever.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    20 min read
                  </div>
                  <div className="flex items-center text-gray-600">
                    <User className="w-4 h-4 mr-2" />
                    Intermediate Level
                  </div>
                  <div className="flex items-center text-gray-600">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {sections.length} sections
                  </div>
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
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
            
            {/* Learning Objectives */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">What You'll Learn</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• How CBDCs differ from cryptocurrencies and stablecoins</li>
                <li>• Real implementations: China's e-CNY, EU Digital Euro, Nigeria's eNaira</li>
                <li>• Government motivations: monetary sovereignty, financial inclusion, efficiency</li>
                <li>• Privacy vs control trade-offs with specific country examples</li>
                <li>• Future impact on banking, payments, and monetary policy</li>
                <li>• Cross-border implications and potential geopolitical effects</li>
              </ul>
            </div>
          </div>

          {/* Content Sections */}
          {sections.map((section) => (
            <div key={section.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 md:p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
                  <button
                    onClick={() => toggleSection(section.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      section.completed
                        ? 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    <CheckCircle className={`w-4 h-4 ${section.completed ? 'text-green-600' : 'text-gray-400'}`} />
                    <span>
                      {section.completed ? 'Completed' : 'Mark Complete'}
                    </span>
                  </button>
                </div>
              </div>
              <div className="p-4 md:p-6">
                {section.content}
              </div>
            </div>
          ))}

          {/* Quiz Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Test Your Knowledge</h2>
                <p className="text-gray-600 text-sm mt-1">
                  Take the quiz to demonstrate your CBDC understanding and unlock the next module
                </p>
              </div>
              <div className="text-sm text-gray-500">
                {completedSections.size}/{sections.length} sections completed
              </div>
            </div>
            
            {completedSections.size === sections.length ? (
              <button
                onClick={() => setShowQuiz(true)}
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Start Quiz
              </button>
            ) : (
              <div className="text-sm text-gray-500 bg-gray-50 rounded-lg p-4">
                Complete all sections above to unlock the quiz
              </div>
            )}
          </div>

          {/* Next Steps */}
          {quizCompleted && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 md:p-6">
              <h3 className="font-semibold text-green-800 mb-2">🎉 Excellent Progress!</h3>
              <p className="text-green-700 text-sm mb-4">
                You now understand how governments are creating digital currencies and their implications 
                for the financial system. Ready to explore how different blockchains connect and interact?
              </p>
              <Link 
                href="/education/cross-chain-finance"
                className="inline-flex items-center text-green-700 hover:text-green-800 font-medium"
              >
                Continue to Cross-Chain Finance: Connecting Ecosystems
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 