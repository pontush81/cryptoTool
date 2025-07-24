'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, Target, Calendar, User, TrendingUp, ArrowRight, Shield, Globe, DollarSign, Building, AlertTriangle, Clock, Landmark, Zap } from 'lucide-react'
import QuizComponent from '../../../components/QuizComponent'

interface Section {
  id: string
  title: string
  content: React.ReactNode
  completed: boolean
}

export default function RealWorldAssetsPage() {
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
      if (!completedModules.includes('real-world-assets')) {
        completedModules.push('real-world-assets')
        localStorage.setItem('completedEducationModules', JSON.stringify(completedModules))
      }
      
      // Set mastery level based on score
      const masteryLevels = JSON.parse(localStorage.getItem('educationMasteryLevels') || '{}')
      masteryLevels['real-world-assets'] = score >= 90 ? 'excellent' : score >= 80 ? 'good' : 'basic'
      localStorage.setItem('educationMasteryLevels', JSON.stringify(masteryLevels))
    }
  }

  const sections: Section[] = [
    {
      id: 'what-is-rwa-tokenization',
      title: 'What is RWA Tokenization?',
      completed: completedSections.has('what-is-rwa-tokenization'),
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
            <p className="text-lg leading-relaxed text-gray-700">
              <strong>Real World Asset (RWA) tokenization</strong> is the process of creating digital tokens 
              on a blockchain that represent ownership rights in physical or financial assets—real estate, 
              stocks, bonds, commodities, or even art. It's the bridge that brings trillions of dollars 
              worth of traditional assets into the digital economy.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">The Tokenization Process</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">1</div>
                    <h5 className="font-semibold text-blue-800">Asset Selection</h5>
                  </div>
                  <p className="text-sm text-gray-700">
                    Identify and evaluate a tokenizable asset—real estate, bonds, commodities, or collectibles
                  </p>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">2</div>
                    <h5 className="font-semibold text-blue-800">Legal Structure</h5>
                  </div>
                  <p className="text-sm text-gray-700">
                    Create legal framework defining token holder rights and regulatory compliance
                  </p>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">3</div>
                    <h5 className="font-semibold text-blue-800">Token Design</h5>
                  </div>
                  <p className="text-sm text-gray-700">
                    Specify token type (fungible/NFT), blockchain platform, and smart contract features
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">4</div>
                    <h5 className="font-semibold text-blue-800">Asset Custody</h5>
                  </div>
                  <p className="text-sm text-gray-700">
                    Secure underlying asset in bankruptcy-remote structure with professional custody
                  </p>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">5</div>
                    <h5 className="font-semibold text-blue-800">Token Issuance</h5>
                  </div>
                  <p className="text-sm text-gray-700">
                    Deploy smart contracts, mint tokens, and distribute to qualified investors
                  </p>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">6</div>
                    <h5 className="font-semibold text-blue-800">Trading & Servicing</h5>
                  </div>
                  <p className="text-sm text-gray-700">
                    Enable secondary market trading and ongoing asset management services
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-semibold text-purple-800 mb-2">💡 Simple Example: Tokenizing a Rental Property</h4>
            <div className="text-sm text-purple-700 space-y-2">
              <p><strong>Property:</strong> $500,000 rental apartment in Miami</p>
              <p><strong>Tokenization:</strong> Create 500,000 tokens (each = $1 ownership)</p>
              <p><strong>Investment:</strong> Buy 1,000 tokens = $1,000 = 0.2% ownership</p>
              <p><strong>Returns:</strong> Receive 0.2% of monthly rent via stablecoins</p>
              <p><strong>Liquidity:</strong> Sell tokens anytime on secondary market</p>
              <p><strong>Result:</strong> Global real estate access with $1,000 minimum!</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'benefits-of-tokenization',
      title: 'Benefits: Why Tokenize Everything?',
      completed: completedSections.has('benefits-of-tokenization'),
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Key Advantages of Asset Tokenization</h4>
            
            <div className="space-y-4">
              <div className="bg-green-50 border-l-4 border-green-400 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Target className="w-5 h-5 text-green-500 mr-2" />
                  <h5 className="font-semibold text-green-800">Fractionalization</h5>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Split expensive assets into affordable pieces, democratizing access to investments
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-green-800 text-sm mb-1">Traditional Investment</p>
                    <ul className="text-xs text-green-600 space-y-1">
                      <li>• $2M minimum for commercial real estate</li>
                      <li>• $100K+ for private equity funds</li>
                      <li>• $10K+ for many bonds</li>
                      <li>• Excludes most retail investors</li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-green-800 text-sm mb-1">Tokenized Investment</p>
                    <ul className="text-xs text-green-600 space-y-1">
                      <li>• $100+ for same real estate exposure</li>
                      <li>• $50+ for private fund tokens</li>
                      <li>• $10+ for bond fractions</li>
                      <li>• Global access to premium assets</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Clock className="w-5 h-5 text-blue-500 mr-2" />
                  <h5 className="font-semibold text-blue-800">24/7 Liquidity</h5>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Trade traditionally illiquid assets around the clock on global markets
                </p>
                
                <div className="bg-white p-3 rounded border">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="font-semibold text-blue-800 mb-1">Before Tokenization:</p>
                      <p className="text-blue-600">Selling real estate: 3-6 months, 6% fees, legal complexity</p>
                    </div>
                    <div>
                      <p className="font-semibold text-blue-800 mb-1">After Tokenization:</p>
                      <p className="text-blue-600">Selling tokens: Minutes, <1% fees, click of a button</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-orange-50 border-l-4 border-orange-400 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Globe className="w-5 h-5 text-orange-500 mr-2" />
                  <h5 className="font-semibold text-orange-800">Global Access & Programmability</h5>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Anyone with internet can invest, and smart contracts automate complex operations
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-orange-800 text-sm mb-1">Global Access</p>
                    <ul className="text-xs text-orange-600 space-y-1">
                      <li>• Investor in Japan buys US real estate</li>
                      <li>• No geographic restrictions</li>
                      <li>• Reduced paperwork and middlemen</li>
                      <li>• Instant cross-border settlements</li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-orange-800 text-sm mb-1">Smart Contract Automation</p>
                    <ul className="text-xs text-orange-600 space-y-1">
                      <li>• Automatic dividend/rent distribution</li>
                      <li>• Programmed compliance checks</li>
                      <li>• Instant settlements and transfers</li>
                      <li>• Reduced operational costs</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 border-l-4 border-purple-400 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Shield className="w-5 h-5 text-purple-500 mr-2" />
                  <h5 className="font-semibold text-purple-800">Transparency & Efficiency</h5>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Blockchain records provide immutable ownership history and streamlined operations
                </p>
                
                <div className="bg-white p-3 rounded border text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="font-semibold text-purple-800 mb-1">Transparency</p>
                      <p className="text-purple-600">All transactions visible, auditable ownership, real-time reporting</p>
                    </div>
                    <div>
                      <p className="font-semibold text-purple-800 mb-1">Efficiency</p>
                      <p className="text-purple-600">Reduced settlement time, lower operational costs, automated compliance</p>
                    </div>
                    <div>
                      <p className="font-semibold text-purple-800 mb-1">Composability</p>
                      <p className="text-purple-600">Use tokens as DeFi collateral, integrate with other protocols</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">🚀 Market Size Opportunity</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white p-3 rounded border text-center">
                <p className="font-semibold text-yellow-800 text-lg">$867 Trillion</p>
                <p className="text-yellow-600 text-xs">Global real estate market</p>
              </div>
              <div className="bg-white p-3 rounded border text-center">
                <p className="font-semibold text-yellow-800 text-lg">$130 Trillion</p>
                <p className="text-yellow-600 text-xs">Global bond market</p>
              </div>
              <div className="bg-white p-3 rounded border text-center">
                <p className="font-semibold text-yellow-800 text-lg">$100+ Trillion</p>
                <p className="text-yellow-600 text-xs">Global equity markets</p>
              </div>
            </div>
            <p className="text-yellow-700 text-sm mt-3">
              <strong>Current RWA tokenization:</strong> Less than $10 billion—massive growth potential!
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'real-world-examples',
      title: 'Real-World Examples: Who\'s Doing This Today',
      completed: completedSections.has('real-world-examples'),
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Leading RWA Tokenization Platforms</h4>
            
            <div className="space-y-4">
              <div className="bg-white border-l-4 border-green-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Building className="w-5 h-5 text-green-500 mr-2" />
                  <h5 className="font-semibold text-green-800">RealT - Real Estate Tokenization</h5>
                  <span className="ml-2 bg-green-100 text-green-700 text-xs px-2 py-1 rounded">Live Platform</span>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Fractionalizes US rental properties, enabling global investors to buy tokens and receive rental income
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-green-50 p-3 rounded">
                    <p className="font-semibold text-green-800 text-sm mb-1">How It Works</p>
                    <ul className="text-xs text-green-600 space-y-1">
                      <li>• Properties held in LLCs</li>
                      <li>• Tokens represent LLC ownership</li>
                      <li>• Rental income paid in stablecoins</li>
                      <li>• 400+ properties tokenized</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-3 rounded">
                    <p className="font-semibold text-green-800 text-sm mb-1">Real Example</p>
                    <ul className="text-xs text-green-600 space-y-1">
                      <li>• Detroit duplex: $100,000 property</li>
                      <li>• 100,000 tokens at $1 each</li>
                      <li>• $900/month rent = $0.009/token</li>
                      <li>• ~10% annual yield</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border-l-4 border-blue-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Landmark className="w-5 h-5 text-blue-500 mr-2" />
                  <h5 className="font-semibold text-blue-800">BlackRock BUIDL - Institutional Money Markets</h5>
                  <span className="ml-2 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">$500M+ TVL</span>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  World's largest asset manager tokenizes money market fund for 24/7 settlement and DeFi integration
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-blue-50 p-3 rounded">
                    <p className="font-semibold text-blue-800 text-sm mb-1">Revolutionary Approach</p>
                    <ul className="text-xs text-blue-600 space-y-1">
                      <li>• Tokenized US Treasury fund</li>
                      <li>• Built on Ethereum blockchain</li>
                      <li>• Instant settlement vs T+2 traditional</li>
                      <li>• Can be used as DeFi collateral</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-3 rounded">
                    <p className="font-semibold text-blue-800 text-sm mb-1">Market Impact</p>
                    <ul className="text-xs text-blue-600 space-y-1">
                      <li>• Major TradFi validation of RWAs</li>
                      <li>• Paves way for other asset managers</li>
                      <li>• Bridges institutional capital to DeFi</li>
                      <li>• Demonstrates regulatory pathway</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border-l-4 border-purple-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <DollarSign className="w-5 h-5 text-purple-500 mr-2" />
                  <h5 className="font-semibold text-purple-800">Ondo Finance - Tokenized Treasuries</h5>
                  <span className="ml-2 bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded">$200M+ AUM</span>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Issues tokenized US Treasury and money market products, bringing traditional yield to DeFi
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-purple-50 p-3 rounded">
                    <p className="font-semibold text-purple-800 text-sm mb-1">Product Suite</p>
                    <ul className="text-xs text-purple-600 space-y-1">
                      <li>• OUSG: Tokenized short-term Treasuries</li>
                      <li>• OMMF: Tokenized money market fund</li>
                      <li>• Minimum investment: $100,000</li>
                      <li>• KYC required for compliance</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 p-3 rounded">
                    <p className="font-semibold text-purple-800 text-sm mb-1">User Experience</p>
                    <ul className="text-xs text-purple-600 space-y-1">
                      <li>• Earn 4-5% risk-free yield</li>
                      <li>• Tokens trade 24/7 on-chain</li>
                      <li>• Auto-compounding interest</li>
                      <li>• Redeemable for USD</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border-l-4 border-orange-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Shield className="w-5 h-5 text-orange-500 mr-2" />
                  <h5 className="font-semibold text-orange-800">Securitize - Enterprise Tokenization Platform</h5>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Partners with major institutions to tokenize funds and private assets under regulatory compliance
                </p>
                
                <div className="bg-orange-50 p-3 rounded">
                  <p className="font-semibold text-orange-800 text-sm mb-1">Notable Partnerships</p>
                  <div className="text-xs text-orange-600 space-y-1">
                    <p>• <strong>BlackRock:</strong> Technology partner for BUIDL fund</p>
                    <p>• <strong>KKR:</strong> Tokenized private credit funds</p>
                    <p>• <strong>Hamilton Lane:</strong> Private equity fund tokens</p>
                    <p>• <strong>Regulation:</strong> SEC-registered, broker-dealer licensed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-2">🌟 Success Story: From Theory to Reality</h4>
            <p className="text-green-700 text-sm mb-2">
              <strong>2020:</strong> RWA tokenization was mostly theoretical whitepapers
            </p>
            <p className="text-green-700 text-sm mb-2">
              <strong>2024:</strong> $10+ billion in tokenized assets, major institutions participating
            </p>
            <div className="bg-white p-3 rounded border text-xs text-green-700 mt-2">
              <p><strong>Growth drivers:</strong> Regulatory clarity, institutional adoption, proven technology, real yield demand</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'regulatory-challenges',
      title: 'Regulatory Challenges: Navigating Compliance',
      completed: completedSections.has('regulatory-challenges'),
      content: (
        <div className="space-y-6">
          <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
            <p className="text-lg leading-relaxed text-gray-700">
              Most RWA tokens are considered securities and must navigate complex regulatory frameworks. 
              Success requires careful legal structuring, ongoing compliance, and often restrictions on 
              who can invest and how tokens can be traded.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Major Regulatory Hurdles</h4>
            
            <div className="space-y-4">
              <div className="bg-white border-l-4 border-red-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                  <h5 className="font-semibold text-red-800">Securities Laws & Registration</h5>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Most RWA tokens are securities requiring registration, disclosure, and investor protection compliance
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-red-50 p-3 rounded">
                    <p className="font-semibold text-red-800 text-sm mb-1">✅ What's Working</p>
                    <ul className="text-xs text-red-600 space-y-1">
                      <li>• Securitize: SEC-registered, broker-dealer licensed</li>
                      <li>• BlackRock BUIDL: Regulated fund structure</li>
                      <li>• Reg A+ offerings for public tokens</li>
                      <li>• Qualified investor restrictions</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 p-3 rounded">
                    <p className="font-semibold text-red-800 text-sm mb-1">❌ Common Failures</p>
                    <ul className="text-xs text-red-600 space-y-1">
                      <li>• Unregistered securities offerings</li>
                      <li>• Misleading marketing to retail</li>
                      <li>• Cross-border compliance gaps</li>
                      <li>• Ignoring KYC/AML requirements</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border-l-4 border-orange-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Landmark className="w-5 h-5 text-orange-500 mr-2" />
                  <h5 className="font-semibold text-orange-800">KYC/AML & Investor Restrictions</h5>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Most platforms must verify investor identity and limit participation to qualified investors
                </p>
                
                <div className="space-y-3">
                  <div className="bg-orange-50 p-3 rounded">
                    <p className="font-semibold text-orange-800 text-sm mb-1">Typical Requirements</p>
                    <div className="text-xs text-orange-600 space-y-1">
                      <p>• <strong>Accredited Investors:</strong> $1M+ net worth or $200K+ income</p>
                      <p>• <strong>KYC Verification:</strong> ID, address, source of funds</p>
                      <p>• <strong>Geographic Restrictions:</strong> Often US-only or excluding certain countries</p>
                      <p>• <strong>Holding Periods:</strong> Lock-ups before tokens can be traded</p>
                    </div>
                  </div>
                  
                  <div className="bg-orange-50 p-3 rounded">
                    <p className="font-semibold text-orange-800 text-sm mb-1">Impact on DeFi Composability</p>
                    <p className="text-xs text-orange-600">
                      These restrictions limit how RWA tokens can be used in permissionless DeFi protocols, 
                      creating tension between compliance and composability.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border-l-4 border-purple-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Shield className="w-5 h-5 text-purple-500 mr-2" />
                  <h5 className="font-semibold text-purple-800">Asset Custody & Bankruptcy Protection</h5>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Ensuring underlying assets are properly segregated and protected from issuer bankruptcy
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-purple-50 p-3 rounded">
                    <p className="font-semibold text-purple-800 text-sm mb-1">Best Practices</p>
                    <ul className="text-xs text-purple-600 space-y-1">
                      <li>• Bankruptcy-remote SPVs</li>
                      <li>• Third-party custody services</li>
                      <li>• Regular audits and attestations</li>
                      <li>• Insurance coverage where possible</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 p-3 rounded">
                    <p className="font-semibold text-purple-800 text-sm mb-1">Risk Examples</p>
                    <ul className="text-xs text-purple-600 space-y-1">
                      <li>• Commingled assets with issuer funds</li>
                      <li>• Unclear legal title to underlying assets</li>
                      <li>• Inadequate insurance coverage</li>
                      <li>• Poor custody provider selection</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border-l-4 border-blue-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Globe className="w-5 h-5 text-blue-500 mr-2" />
                  <h5 className="font-semibold text-blue-800">Valuation & Audit Requirements</h5>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Regular, credible third-party valuations ensure token prices reflect underlying asset values
                </p>
                
                <div className="bg-blue-50 p-3 rounded">
                  <div className="text-xs text-blue-600 space-y-2">
                    <p><strong>Chainlink Proof of Reserve:</strong> Automated verification of asset backing</p>
                    <p><strong>Traditional Audits:</strong> Quarterly reports from recognized accounting firms</p>
                    <p><strong>Real Estate Appraisals:</strong> Annual valuations for property tokens</p>
                    <p><strong>Market Pricing:</strong> Daily NAV calculations for fund tokens</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">🌍 Global Regulatory Landscape</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-semibold text-yellow-800 mb-2">Favorable Jurisdictions:</h5>
                <ul className="space-y-1 text-yellow-700">
                  <li>• <strong>Singapore:</strong> Clear DPT framework</li>
                  <li>• <strong>Switzerland:</strong> Token classification system</li>
                  <li>• <strong>UK:</strong> Developing comprehensive rules</li>
                  <li>• <strong>US:</strong> Complex but manageable with compliance</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-yellow-800 mb-2">Emerging Challenges:</h5>
                <ul className="space-y-1 text-yellow-700">
                  <li>• Cross-border regulatory arbitrage</li>
                  <li>• Changing tax treatment</li>
                  <li>• CBDC competition considerations</li>
                  <li>• Privacy vs transparency balance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'bridging-tradfi-defi',
      title: 'Bridging TradFi and DeFi: The Future of Finance',
      completed: completedSections.has('bridging-tradfi-defi'),
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
            <p className="text-lg leading-relaxed text-gray-700">
              RWA tokenization represents the convergence of traditional finance and DeFi—bringing the 
              trillions of dollars in traditional assets into the programmable, composable, and globally 
              accessible world of blockchain finance.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">How RWAs Bridge Two Worlds</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Building className="w-5 h-5 text-red-500 mr-2" />
                  <h5 className="font-semibold text-red-800">Traditional Finance</h5>
                </div>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>Assets:</strong> $1,000+ trillion in real estate, bonds, equities</p>
                  <p><strong>Access:</strong> High minimums, geographic restrictions</p>
                  <p><strong>Trading:</strong> 9-5 markets, slow settlement</p>
                  <p><strong>Liquidity:</strong> Often poor, especially real estate</p>
                  <p><strong>Efficiency:</strong> Multiple intermediaries, high fees</p>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Zap className="w-5 h-5 text-green-500 mr-2" />
                  <h5 className="font-semibold text-green-800">DeFi Innovation</h5>
                </div>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>Technology:</strong> Smart contracts, instant settlement</p>
                  <p><strong>Access:</strong> Global, permissionless (when possible)</p>
                  <p><strong>Trading:</strong> 24/7/365 markets</p>
                  <p><strong>Composability:</strong> Programmable, interoperable</p>
                  <p><strong>Innovation:</strong> Rapid product development</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-green-50 border-l-4 border-green-400 rounded-lg p-4">
                <h5 className="font-semibold text-green-800 mb-3">Institutional Adoption Examples</h5>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-green-800 text-sm mb-1">BlackRock BUIDL Impact</p>
                    <ul className="text-xs text-green-600 space-y-1">
                      <li>• $500M+ in tokenized Treasury fund</li>
                      <li>• Instant settlement vs T+2 traditional</li>
                      <li>• Can serve as DeFi collateral</li>
                      <li>• Opens door for other asset managers</li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-green-800 text-sm mb-1">JPMorgan Onyx Platform</p>
                    <ul className="text-xs text-green-600 space-y-1">
                      <li>• $300B+ in transaction volume</li>
                      <li>• Institutional repo transactions</li>
                      <li>• Cross-border payments</li>
                      <li>• Validates blockchain for banking</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 border-l-4 border-purple-400 rounded-lg p-4">
                <h5 className="font-semibold text-purple-800 mb-3">New Financial Products Enabled</h5>
                
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-purple-800 text-sm mb-1">RWA-Backed DeFi Lending</p>
                    <p className="text-xs text-purple-600">
                      Use tokenized real estate or Treasury tokens as collateral to borrow stablecoins on Aave or Compound
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-purple-800 text-sm mb-1">Yield Farming with Treasuries</p>
                    <p className="text-xs text-purple-600">
                      Provide tokenized Treasury liquidity to DEXs, earning trading fees + risk-free Treasury yield
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-purple-800 text-sm mb-1">Cross-Asset Arbitrage</p>
                    <p className="text-xs text-purple-600">
                      Automated strategies that exploit price differences between tokenized and traditional versions of same assets
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-orange-50 border-l-4 border-orange-400 rounded-lg p-4">
                <h5 className="font-semibold text-orange-800 mb-3">Operational Efficiency Gains</h5>
                
                <div className="bg-white p-3 rounded border">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div>
                      <p className="font-semibold text-orange-800 mb-1">Settlement Speed</p>
                      <p className="text-orange-600">Minutes instead of days for asset transfers and payments</p>
                    </div>
                    <div>
                      <p className="font-semibold text-orange-800 mb-1">Cost Reduction</p>
                      <p className="text-orange-600">Eliminate multiple intermediaries and manual processes</p>
                    </div>
                    <div>
                      <p className="font-semibold text-orange-800 mb-1">Global Access</p>
                      <p className="text-orange-600">24/7 markets with instant cross-border transactions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">The Vision: Unified Global Finance</h4>
            <div className="space-y-3 text-sm text-gray-700">
              <p>
                <strong>Today:</strong> Traditional and digital assets exist in separate silos with different 
                rules, access requirements, and operational procedures.
              </p>
              <p>
                <strong>Tomorrow:</strong> A unified financial system where all assets—stocks, bonds, real estate, 
                commodities, and digital assets—exist as programmable tokens on blockchain infrastructure.
              </p>
              <div className="bg-blue-50 p-3 rounded border mt-3">
                <p className="text-blue-700 text-sm">
                  <strong>Result:</strong> Anyone, anywhere can invest in any asset, with instant settlement, 
                  transparent pricing, and programmable features that enable entirely new types of financial products.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">🔮 What's Coming Next</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-semibold text-yellow-800 mb-2">Short Term (1-2 years):</h5>
                <ul className="space-y-1 text-yellow-700">
                  <li>• More asset managers launch tokenized funds</li>
                  <li>• Corporate bonds and equities tokenization</li>
                  <li>• Improved DeFi-RWA composability</li>
                  <li>• Cross-chain RWA protocols</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-yellow-800 mb-2">Long Term (5+ years):</h5>
                <ul className="space-y-1 text-yellow-700">
                  <li>• Most financial assets exist as tokens</li>
                  <li>• Unified global settlement layer</li>
                  <li>• AI-powered portfolio management</li>
                  <li>• Complete TradFi-DeFi convergence</li>
                </ul>
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
      id: 'rwa-definition',
      question: 'What is the primary purpose of Real World Asset (RWA) tokenization?',
      options: [
        'To create new cryptocurrencies',
        'To represent ownership rights in physical or financial assets using blockchain tokens',
        'To replace all traditional investments',
        'To eliminate the need for banks'
      ],
      correctAnswer: 1,
      explanation: 'RWA tokenization creates digital tokens that represent ownership rights in real-world assets like real estate, bonds, or stocks, bridging traditional and digital finance.'
    },
    {
      id: 'tokenization-benefits',
      question: 'What is a key advantage of asset tokenization?',
      options: [
        'It guarantees higher returns than traditional investments',
        'It enables fractionalization and 24/7 liquidity for traditionally illiquid assets',
        'It eliminates all investment risks',
        'It only works with cryptocurrency assets'
      ],
      correctAnswer: 1,
      explanation: 'Tokenization allows expensive assets to be split into affordable fractions and traded around the clock, making traditionally illiquid assets like real estate more accessible and liquid.'
    },
    {
      id: 'real-world-example',
      question: 'What does BlackRock\'s BUIDL fund represent in the RWA space?',
      options: [
        'A failed experiment in tokenization',
        'A major asset manager successfully tokenizing a money market fund for institutional use',
        'A cryptocurrency replacement for US dollars',
        'A real estate investment platform'
      ],
      correctAnswer: 1,
      explanation: 'BlackRock BUIDL is a tokenized money market fund that demonstrates major institutional adoption of RWA tokenization, with 24/7 settlement and DeFi composability.'
    },
    {
      id: 'regulatory-challenges',
      question: 'Why do most RWA platforms require KYC and limit investors to accredited individuals?',
      options: [
        'To make more profit from wealthy investors',
        'Because most RWA tokens are considered securities and must comply with financial regulations',
        'To keep retail investors away from good investments',
        'Because blockchain technology is too complex for average users'
      ],
      correctAnswer: 1,
      explanation: 'Most RWA tokens are legally considered securities, requiring compliance with investor protection laws, including KYC verification and accredited investor restrictions.'
    },
    {
      id: 'tradfi-defi-bridge',
      question: 'How do RWAs bridge traditional finance (TradFi) and DeFi?',
      options: [
        'They replace traditional finance entirely',
        'They bring traditional assets onto blockchain infrastructure for programmable, composable use in DeFi',
        'They only work within traditional banking systems',
        'They eliminate the need for any financial regulations'
      ],
      correctAnswer: 1,
      explanation: 'RWAs bridge TradFi and DeFi by tokenizing traditional assets so they can be used in DeFi protocols while maintaining compliance with traditional finance regulations.'
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
            title="Real World Assets Quiz"
            questions={quizQuestions}
            onComplete={handleQuizComplete}
          />
          
          {quizCompleted && (
            <div className="mt-6">
              <Link 
                href="/education/institutional-crypto"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Continue to Institutional Crypto
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
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Real World Assets (RWA): Tokenizing Everything</h1>
                <p className="text-gray-600 mb-4">
                  Discover how blockchain technology is tokenizing trillions of dollars in traditional assets—from 
                  real estate and bonds to private equity and commodities. Learn about platforms like BlackRock BUIDL, 
                  RealT, and Ondo Finance that are bridging traditional finance with DeFi today.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    25 min read
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
                <li>• The complete asset tokenization process from selection to trading</li>
                <li>• Benefits of fractionalization, 24/7 liquidity, and global market access</li>
                <li>• Real platforms: BlackRock BUIDL, RealT, Ondo Finance, and Securitize</li>
                <li>• Regulatory challenges, securities laws, and compliance requirements</li>
                <li>• How RWA tokenization bridges traditional finance and DeFi</li>
                <li>• The vision for a unified, programmable global financial system</li>
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
                  Take the quiz to demonstrate your RWA understanding and unlock the next module
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
                You now understand how real-world assets are being tokenized and integrated into blockchain finance. 
                Ready to explore how major institutions manage cryptocurrency assets safely and compliantly?
              </p>
              <Link 
                href="/education/institutional-crypto"
                className="inline-flex items-center text-green-700 hover:text-green-800 font-medium"
              >
                Continue to Institutional Crypto: Custody & Compliance
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 