'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, Coins, Calendar, User, TrendingUp, ArrowRight, Shield, Globe, DollarSign } from 'lucide-react'
import QuizComponent from '../../../../components/QuizComponent'
import GlossaryTooltip from '../../../../components/GlossaryTooltip'

interface Section {
  id: string
  title: string
  content: React.ReactNode
  completed: boolean
}

export default function StablecoinsPage() {
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
      if (!completedModules.includes('stablecoins')) {
        completedModules.push('stablecoins')
        localStorage.setItem('completedEducationModules', JSON.stringify(completedModules))
      }
      
      // Set mastery level based on score
      const masteryLevels = JSON.parse(localStorage.getItem('educationMasteryLevels') || '{}')
      masteryLevels['stablecoins'] = score >= 90 ? 'excellent' : score >= 80 ? 'good' : 'basic'
      localStorage.setItem('educationMasteryLevels', JSON.stringify(masteryLevels))
    }
  }

  const sections: Section[] = [
    {
      id: 'what-are-stablecoins',
      title: 'What Are Stablecoins?',
      completed: completedSections.has('what-are-stablecoins'),
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
            <p className="text-lg leading-relaxed text-gray-700">
              <strong>Stablecoins</strong> are cryptocurrencies designed to maintain a stable value relative to a reference asset, 
              usually the US dollar. They serve as the crucial bridge between volatile crypto and stable traditional money, 
              enabling fast, borderless payments without the wild price swings of Bitcoin or Ethereum.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Why Do We Need Stablecoins?</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <TrendingUp className="w-5 h-5 text-red-500 mr-2" />
                  <h5 className="font-semibold text-gray-900">The Volatility Problem</h5>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Bitcoin can swing 10-20% in a single day. Imagine if your salary was paid in Bitcoin - 
                  you might earn $5,000 on Monday but it's only worth $4,000 by Friday!
                </p>
                <div className="text-xs bg-red-50 p-2 rounded">
                  <strong>Example:</strong> In 2022, Bitcoin went from $69,000 to $15,500 - a 78% drop
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Shield className="w-5 h-5 text-green-500 mr-2" />
                  <h5 className="font-semibold text-gray-900">The Stability Solution</h5>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Stablecoins maintain their value around $1.00, making them practical for everyday use - 
                  payments, savings, and business transactions.
                </p>
                <div className="text-xs bg-green-50 p-2 rounded">
                  <strong>Example:</strong> USDC has stayed within $0.98-$1.02 for most of its existence
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">💡 Real-World Use Case</h4>
            <p className="text-yellow-700 text-sm">
              <strong>The Freelancer Story:</strong> Maria in Mexico needs to pay her web developer in the Philippines. 
              Traditional bank wire takes 3-5 days and costs $25-50 in fees. With USDC stablecoins, 
              she can pay instantly for less than $1 in fees, and both parties know exactly how much value is being transferred.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'types-of-stablecoins',
      title: 'Types of Stablecoins: How Stability Works',
      completed: completedSections.has('types-of-stablecoins'),
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Three Main Types of Stablecoins</h4>
            
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h5 className="font-semibold text-green-800 mb-3 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  1. Fiat-Collateralized (Most Common)
                </h5>
                <p className="text-sm text-green-700 mb-2">
                  <strong>How it works:</strong> For every stablecoin issued, there's $1 held in a bank account or treasury bonds.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-green-800 text-sm">USDC (USD Coin)</p>
                    <p className="text-xs text-green-600">• Backed by cash & short-term US Treasuries</p>
                    <p className="text-xs text-green-600">• Monthly audits published</p>
                    <p className="text-xs text-green-600">• Regulated by US authorities</p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-green-800 text-sm">USDT (Tether)</p>
                    <p className="text-xs text-green-600">• Largest by market cap</p>
                    <p className="text-xs text-green-600">• Less transparent about reserves</p>
                    <p className="text-xs text-green-600">• Widely used but more controversial</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h5 className="font-semibold text-purple-800 mb-3 flex items-center">
                  <Coins className="w-5 h-5 mr-2" />
                  2. Crypto-Collateralized
                </h5>
                <p className="text-sm text-purple-700 mb-2">
                  <strong>How it works:</strong> Backed by other cryptocurrencies (like Ethereum), but over-collateralized to account for volatility.
                </p>
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-purple-800 text-sm">DAI (MakerDAO)</p>
                  <p className="text-xs text-purple-600">• $1 DAI backed by ~$1.50 worth of crypto</p>
                  <p className="text-xs text-purple-600">• Fully decentralized - no bank needed</p>
                  <p className="text-xs text-purple-600">• If collateral drops too much, it's auto-liquidated</p>
                </div>
              </div>
              
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h5 className="font-semibold text-orange-800 mb-3 flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  3. Algorithmic (Most Experimental)
                </h5>
                <p className="text-sm text-orange-700 mb-2">
                  <strong>How it works:</strong> Uses smart contracts and market mechanisms to maintain price stability without collateral.
                </p>
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-orange-800 text-sm">⚠️ High Risk Category</p>
                  <p className="text-xs text-orange-600">• TerraUSD (UST) collapsed in 2022</p>
                  <p className="text-xs text-orange-600">• Still experimental technology</p>
                  <p className="text-xs text-orange-600">• Can "depeg" and lose value suddenly</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Which Type Is Best?</h4>
            <div className="text-sm text-gray-700 space-y-2">
              <p><strong>For beginners:</strong> Fiat-collateralized stablecoins (USDC, USDT) are most reliable and widely accepted.</p>
              <p><strong>For crypto purists:</strong> DAI offers decentralization without relying on traditional banks.</p>
              <p><strong>For risk-tolerant:</strong> Algorithmic stablecoins offer innovation but with significant risk of failure.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'real-world-use-cases',
      title: 'Real-World Use Cases: Where Stablecoins Shine',
      completed: completedSections.has('real-world-use-cases'),
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">How People Actually Use Stablecoins Today</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h5 className="font-semibold text-blue-800 mb-2">🌍 Global Remittances</h5>
                <p className="text-sm text-blue-700 mb-2">
                  Workers sending money home to family across borders
                </p>
                <div className="text-xs bg-white p-2 rounded">
                  <strong>Traditional:</strong> $25-50 fees, 3-5 days<br/>
                  <strong>Stablecoins:</strong> $1-5 fees, 10 minutes
                </div>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h5 className="font-semibold text-green-800 mb-2">💼 Business Payments</h5>
                <p className="text-sm text-green-700 mb-2">
                  Companies paying international suppliers and contractors
                </p>
                <div className="text-xs bg-white p-2 rounded">
                  <strong>Benefit:</strong> Instant settlement, no currency conversion fees, 24/7 availability
                </div>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h5 className="font-semibold text-purple-800 mb-2">🏦 DeFi On/Off Ramps</h5>
                <p className="text-sm text-purple-700 mb-2">
                  Moving between traditional banking and DeFi protocols
                </p>
                <div className="text-xs bg-white p-2 rounded">
                  <strong>Usage:</strong> Convert cash to stablecoins, then access lending, trading, yield farming
                </div>
              </div>
              
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h5 className="font-semibold text-orange-800 mb-2">🛡️ Inflation Hedge</h5>
                <p className="text-sm text-orange-700 mb-2">
                  People in countries with unstable currencies
                </p>
                <div className="text-xs bg-white p-2 rounded">
                  <strong>Examples:</strong> Argentina, Turkey, Lebanon - citizens use USDC to preserve purchasing power
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
            <h4 className="font-semibold text-green-800 mb-2">💡 Concrete Example: The Freelancer Economy</h4>
            <p className="text-green-700 text-sm leading-relaxed">
              <strong>Sarah</strong> is a graphic designer in Brazil. <strong>Tech startup in San Francisco</strong> needs her services. 
              Traditional payment would involve international wire transfer with high fees and 3-5 day delays. 
              
              <br/><br/>Instead, the startup pays Sarah in USDC:
              <br/>• <strong>Payment sent:</strong> Tuesday 3 PM
              <br/>• <strong>Sarah receives:</strong> Tuesday 3:10 PM  
              <br/>• <strong>Fees:</strong> Less than $2
              <br/>• <strong>Amount:</strong> Exactly $2,000 worth (no exchange rate surprises)
              
              <br/><br/>Sarah can then convert USDC to Brazilian reais at local exchanges, or keep some in USDC 
              as a hedge against Brazilian real inflation.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'risks-and-considerations',
      title: 'Risks and What Can Go Wrong',
      completed: completedSections.has('risks-and-considerations'),
      content: (
        <div className="space-y-6">
          <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
            <p className="text-lg leading-relaxed text-gray-700">
              While stablecoins are designed to be stable, they're not risk-free. Understanding these risks 
              helps you make informed decisions about when and how to use them.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Major Risk Categories</h4>
            
            <div className="space-y-4">
              <div className="bg-white border-l-4 border-red-500 rounded-lg p-4">
                <h5 className="font-semibold text-red-800 mb-2">🏦 Counterparty Risk</h5>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>The Problem:</strong> Fiat-collateralized stablecoins depend on the issuer actually holding the reserves
                </p>
                <div className="bg-red-50 p-3 rounded text-xs">
                  <strong>What could go wrong:</strong><br/>
                  • Issuer goes bankrupt or mismanages funds<br/>
                  • Reserves are invested in risky assets that lose value<br/>
                  • Government freezes the issuer's bank accounts<br/>
                  <strong>Real Example:</strong> Tether (USDT) has faced questions about whether it has full reserves
                </div>
              </div>
              
              <div className="bg-white border-l-4 border-orange-500 rounded-lg p-4">
                <h5 className="font-semibold text-orange-800 mb-2">📉 Depeg Events</h5>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>The Problem:</strong> Sometimes stablecoins temporarily lose their $1.00 peg
                </p>
                <div className="bg-orange-50 p-3 rounded text-xs">
                  <strong>What could go wrong:</strong><br/>
                  • Market panic causes mass selling<br/>
                  • Technical issues with smart contracts<br/>
                  • Liquidity shortages on exchanges<br/>
                  <strong>Real Example:</strong> USDC briefly dropped to $0.87 during Silicon Valley Bank crisis in March 2023
                </div>
              </div>
              
              <div className="bg-white border-l-4 border-purple-500 rounded-lg p-4">
                <h5 className="font-semibold text-purple-800 mb-2">⚖️ Regulatory Risk</h5>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>The Problem:</strong> Governments might ban, restrict, or heavily regulate stablecoins
                </p>
                <div className="bg-purple-50 p-3 rounded text-xs">
                  <strong>What could go wrong:</strong><br/>
                  • Exchanges forced to delist certain stablecoins<br/>
                  • New compliance requirements make them expensive<br/>
                  • Cross-border payments restricted<br/>
                  <strong>Real Example:</strong> Facebook's Diem project was killed by regulatory pressure
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Risk Mitigation Strategies</h4>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-semibold">1</span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-blue-800">Diversify Across Stablecoins</h5>
                    <p className="text-sm text-blue-700">Don't put all funds in one stablecoin - spread across USDC, DAI, and others</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-semibold">2</span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-blue-800">Choose Regulated Options</h5>
                    <p className="text-sm text-blue-700">Prefer stablecoins with clear regulations and audited reserves (like USDC)</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-semibold">3</span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-blue-800">Don't Store Long-Term</h5>
                    <p className="text-sm text-blue-700">Use stablecoins for transactions and short-term storage, not as long-term savings</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-semibold">4</span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-blue-800">Monitor News and Updates</h5>
                    <p className="text-sm text-blue-700">Stay informed about regulatory changes and reserve audit reports</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'traditional-finance-connection',
      title: 'Connection to Traditional Finance',
      completed: completedSections.has('traditional-finance-connection'),
      content: (
        <div className="space-y-6">
          <div className="bg-purple-50 border-l-4 border-purple-400 p-6 rounded-r-lg">
            <p className="text-lg leading-relaxed text-gray-700">
              Stablecoins are essentially <strong>digital versions of traditional money market funds</strong> or 
              electronic cash systems like PayPal balances - but without bank intermediaries and with 
              the speed and global accessibility of the internet.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Traditional Finance Parallels</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h5 className="font-semibold text-gray-900 mb-3">💳 Like PayPal or Venmo</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Digital money</span>
                    <span className="text-green-600">✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Instant transfers</span>
                    <span className="text-green-600">✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Low fees</span>
                    <span className="text-green-600">✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Global reach</span>
                    <span className="text-blue-600">Better</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">24/7 availability</span>
                    <span className="text-blue-600">Better</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h5 className="font-semibold text-gray-900 mb-3">🏦 Like Money Market Funds</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Stable value target</span>
                    <span className="text-green-600">✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Backed by safe assets</span>
                    <span className="text-green-600">✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Professional management</span>
                    <span className="text-green-600">✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Instant liquidity</span>
                    <span className="text-blue-600">Better</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Programmable</span>
                    <span className="text-blue-600">New Feature</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">How Banks Are Adapting</h4>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="space-y-3">
                <div>
                  <h5 className="font-semibold text-blue-800">JPMorgan's JPM Coin</h5>
                  <p className="text-sm text-blue-700">
                    JPMorgan created its own stablecoin for institutional clients to make instant, 
                    large-value payments between accounts
                  </p>
                </div>
                
                <div>
                  <h5 className="font-semibold text-blue-800">Visa & Mastercard Integration</h5>
                  <p className="text-sm text-blue-700">
                    Both payment giants now support USDC settlements, allowing faster and cheaper 
                    cross-border transactions for their merchant networks
                  </p>
                </div>
                
                <div>
                  <h5 className="font-semibold text-blue-800">Central Bank Interest</h5>
                  <p className="text-sm text-blue-700">
                    Federal Reserve and other central banks study stablecoins as they develop 
                    their own Central Bank Digital Currencies (CBDCs)
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-2">🚀 The Future Integration</h4>
            <p className="text-green-700 text-sm">
              Stablecoins are becoming the <strong>"internet money"</strong> that connects traditional finance 
              with blockchain technology. They enable:
            </p>
            <ul className="text-sm text-green-700 mt-2 space-y-1">
              <li>• Traditional businesses to accept crypto payments safely</li>
              <li>• Banks to offer 24/7 international settlement</li>
              <li>• Consumers to access global financial services without barriers</li>
              <li>• Developers to build financial apps with stable, programmable money</li>
            </ul>
          </div>
        </div>
      )
    }
  ]

  const progress = (completedSections.size / sections.length) * 100

  const quizQuestions = [
    {
      id: 'stablecoin-definition',
      question: 'What is the primary purpose of stablecoins?',
      options: [
        'To provide high investment returns',
        'To maintain stable value relative to a reference asset',
        'To replace Bitcoin as the main cryptocurrency',
        'To enable mining rewards'
      ],
      correctAnswer: 1,
      explanation: 'Stablecoins are designed to maintain a stable value (usually around $1.00) to serve as reliable digital money for payments and transactions.'
    },
    {
      id: 'collateral-types',
      question: 'Which type of stablecoin is backed by US dollars held in bank accounts?',
      options: [
        'Algorithmic stablecoins',
        'Crypto-collateralized stablecoins', 
        'Fiat-collateralized stablecoins',
        'Mining-based stablecoins'
      ],
      correctAnswer: 2,
      explanation: 'Fiat-collateralized stablecoins like USDC are backed by real US dollars or equivalent assets held in bank accounts or treasury bonds.'
    },
    {
      id: 'use-cases',
      question: 'What is a major real-world advantage of using stablecoins for international payments?',
      options: [
        'They provide guaranteed profits',
        'They are completely anonymous',
        'They offer fast, low-cost cross-border transfers',
        'They eliminate all financial risks'
      ],
      correctAnswer: 2,
      explanation: 'Stablecoins enable fast (minutes vs days) and low-cost (under $5 vs $25-50) international transfers compared to traditional banking.'
    },
    {
      id: 'risks',
      question: 'What happened to USDC in March 2023 that demonstrates stablecoin risks?',
      options: [
        'It was banned by the government',
        'It briefly lost its $1.00 peg during the Silicon Valley Bank crisis',
        'It was hacked and all funds were stolen',
        'It converted to Bitcoin automatically'
      ],
      correctAnswer: 1,
      explanation: 'USDC temporarily dropped to $0.87 when Silicon Valley Bank (where some reserves were held) failed, showing how external events can affect stablecoin stability.'
    },
    {
      id: 'traditional-finance',
      question: 'Stablecoins are most similar to which traditional financial product?',
      options: [
        'High-risk stocks',
        'Money market funds or electronic cash systems',
        'Long-term bonds',
        'Commodity futures'
      ],
      correctAnswer: 1,
      explanation: 'Stablecoins function like digital money market funds - they maintain stable value, are backed by safe assets, and provide instant liquidity.'
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
            title="Stablecoins Quiz"
            questions={quizQuestions}
            onComplete={handleQuizComplete}
          />
          
          {quizCompleted && (
            <div className="mt-6">
              <Link 
                href="/education/defi-fundamentals"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Continue to DeFi Fundamentals
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
                <Coins className="w-8 h-8 text-blue-600" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Stablecoins: The Bridge to Digital Finance</h1>
                <p className="text-gray-600 mb-4">
                  Discover how stablecoins solve cryptocurrency's volatility problem and serve as the crucial bridge 
                  between traditional finance and the crypto ecosystem. Learn about different types, real-world use cases, 
                  and why they're becoming essential infrastructure for digital payments.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    18 min read
                  </div>
                  <div className="flex items-center text-gray-600">
                    <User className="w-4 h-4 mr-2" />
                    Beginner Level
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
                <li>• What stablecoins are and how price stability is achieved</li>
                <li>• The main types: fiat-collateralized, crypto-collateralized, and algorithmic</li>
                <li>• Real-world applications in payments, remittances, and DeFi</li>
                <li>• Key risks including depeg events, counterparty risk, and regulatory challenges</li>
                <li>• How stablecoins connect traditional finance to the crypto ecosystem</li>
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
                  Take the quiz to demonstrate your understanding and unlock the next module
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
                You now understand how stablecoins bridge traditional and digital finance. 
                Ready to explore how decentralized finance eliminates the need for traditional banks?
              </p>
              <Link 
                href="/education/defi-fundamentals"
                className="inline-flex items-center text-green-700 hover:text-green-800 font-medium"
              >
                Continue to DeFi Fundamentals: Banking Without Banks
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 