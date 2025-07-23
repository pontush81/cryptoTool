'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, Users, Calendar, User, Zap, TrendingUp, BarChart3, Coins, ArrowRight } from 'lucide-react'

interface Section {
  id: string
  title: string
  content: React.ReactNode
  completed: boolean
}

export default function AdvancedPage() {
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set())
  
  const toggleSection = (sectionId: string) => {
    const newCompleted = new Set(completedSections)
    if (newCompleted.has(sectionId)) {
      newCompleted.delete(sectionId)
    } else {
      newCompleted.add(sectionId)
    }
    setCompletedSections(newCompleted)
  }

  const sections: Section[] = [
    {
      id: 'defi-intro',
      title: 'Introduction to DeFi',
      completed: completedSections.has('defi-intro'),
      content: (
        <div className="space-y-6">
          <div className="bg-purple-50 border-l-4 border-purple-400 p-6 rounded-r-lg">
            <p className="text-lg leading-relaxed text-gray-700">
              <strong>DeFi (Decentralized Finance)</strong> recreates traditional financial services like lending, 
              borrowing, and trading without banks or intermediaries. Everything runs on smart contracts.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Traditional Finance vs DeFi</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h5 className="font-semibold text-red-600">Traditional Finance (TradFi)</h5>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>• Banks control your money</div>
                  <div>• Business hours limitations</div>
                  <div>• High fees and minimums</div>
                  <div>• Requires credit checks</div>
                  <div>• Geographic restrictions</div>
                  <div>• Slow international transfers</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h5 className="font-semibold text-purple-600">Decentralized Finance (DeFi)</h5>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>• You control your assets</div>
                  <div>• 24/7 availability</div>
                  <div>• Lower fees, no minimums</div>
                  <div>• No credit checks needed</div>
                  <div>• Global access</div>
                  <div>• Instant transactions</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Popular DeFi Applications</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                <h5 className="font-semibold text-blue-900 mb-2">Decentralized Exchanges (DEXs)</h5>
                <p className="text-sm text-blue-800 mb-2">Trade without intermediaries</p>
                <div className="text-xs text-blue-700">
                  Examples: Uniswap, SushiSwap, PancakeSwap
                </div>
              </div>
              
              <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                <h5 className="font-semibold text-green-900 mb-2">Lending Protocols</h5>
                <p className="text-sm text-green-800 mb-2">Lend crypto to earn interest</p>
                <div className="text-xs text-green-700">
                  Examples: Compound, Aave, MakerDAO
                </div>
              </div>
              
              <div className="border border-purple-200 rounded-lg p-4 bg-purple-50">
                <h5 className="font-semibold text-purple-900 mb-2">Yield Farming</h5>
                <p className="text-sm text-purple-800 mb-2">Earn rewards by providing liquidity</p>
                <div className="text-xs text-purple-700">
                  Examples: Curve, Yearn Finance, Harvest
                </div>
              </div>
              
              <div className="border border-orange-200 rounded-lg p-4 bg-orange-50">
                <h5 className="font-semibold text-orange-900 mb-2">Synthetic Assets</h5>
                <p className="text-sm text-orange-800 mb-2">Trade stocks, commodities on blockchain</p>
                <div className="text-xs text-orange-700">
                  Examples: Synthetix, Mirror Protocol
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800 text-sm">
              <strong>Warning:</strong> DeFi protocols are experimental and risky. Smart contracts can have bugs, 
              and there&apos;s no insurance if things go wrong. Start small and understand the risks!
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'smart-contracts',
      title: 'Smart Contracts Explained',
      completed: completedSections.has('smart-contracts'),
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700">
            <strong>Smart contracts</strong> are self-executing programs that automatically enforce agreements 
            when specific conditions are met. Think of them as digital vending machines.
          </p>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">How Smart Contracts Work</h4>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="font-semibold text-gray-900 mb-3">Traditional Contract</h5>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>1. Two parties agree on terms</div>
                  <div>2. Sign legal documents</div>
                  <div>3. Trust each other to fulfill obligations</div>
                  <div>4. If dispute occurs, go to court</div>
                  <div>5. Judge enforces the contract</div>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4">
                <h5 className="font-semibold text-blue-900 mb-3">Smart Contract</h5>
                <div className="text-sm text-blue-800 space-y-1">
                  <div>1. Parties agree on terms</div>
                  <div>2. Terms are coded into a program</div>
                  <div>3. Contract deployed to blockchain</div>
                  <div>4. Contract automatically executes when conditions are met</div>
                  <div>5. No intermediary needed - code enforces itself</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Real-World Example: Insurance</h4>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h5 className="font-semibold text-green-900 mb-2">Flight Delay Insurance Smart Contract</h5>
              <div className="space-y-2 text-sm text-green-800">
                <div><strong>IF</strong> flight XY123 is delayed more than 2 hours</div>
                <div><strong>AND</strong> customer has paid premium</div>
                <div><strong>THEN</strong> automatically pay $200 compensation</div>
                <div><strong>ELSE</strong> keep the premium</div>
              </div>
              <p className="text-xs text-green-700 mt-3">
                The contract checks flight data automatically and pays out instantly without human intervention.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h5 className="font-semibold text-green-900 mb-3">Advantages</h5>
              <div className="space-y-1 text-sm text-green-800">
                <div>• Automatic execution</div>
                <div>• No intermediaries needed</div>
                <div>• Transparent and verifiable</div>
                <div>• Cost-effective</div>
                <div>• Available 24/7</div>
                <div>• Immutable once deployed</div>
              </div>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h5 className="font-semibold text-red-900 mb-3">Limitations</h5>
              <div className="space-y-1 text-sm text-red-800">
                <div>• Code bugs can be exploited</div>
                <div>• Difficult to change after deployment</div>
                <div>• Limited to on-chain data</div>
                <div>• Gas fees for execution</div>
                <div>• Legal status unclear</div>
                <div>• No recourse if something goes wrong</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'technical-analysis',
      title: 'Technical Analysis Fundamentals',
      completed: completedSections.has('technical-analysis'),
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700">
            <strong>Technical Analysis</strong> is the study of price charts and patterns to predict future price movements. 
            While not always accurate, it&apos;s a valuable tool for timing entries and exits.
          </p>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Concepts</h4>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-400 pl-4">
                <h5 className="font-semibold text-blue-900 mb-2">Support and Resistance</h5>
                <p className="text-sm text-gray-600 mb-2">
                  Support is a price level where buying pressure prevents further decline. 
                  Resistance is where selling pressure prevents further rise.
                </p>
                <div className="bg-blue-50 p-3 rounded text-xs text-blue-800">
                  Example: If Bitcoin repeatedly bounces off $40,000, that&apos;s a support level.
                </div>
              </div>
              
              <div className="border-l-4 border-green-400 pl-4">
                <h5 className="font-semibold text-green-900 mb-2">Trend Lines</h5>
                <p className="text-sm text-gray-600 mb-2">
                  Connect higher lows in an uptrend or lower highs in a downtrend. 
                  Help identify trend direction and potential breakout points.
                </p>
                <div className="bg-green-50 p-3 rounded text-xs text-green-800">
                  &quot;The trend is your friend&quot; - Don&apos;t fight the overall market direction.
                </div>
              </div>
              
              <div className="border-l-4 border-purple-400 pl-4">
                <h5 className="font-semibold text-purple-900 mb-2">Moving Averages</h5>
                <p className="text-sm text-gray-600 mb-2">
                  Smooth out price action by showing average price over a specific period. 
                  Common periods: 20, 50, 200 days.
                </p>
                <div className="bg-purple-50 p-3 rounded text-xs text-purple-800">
                  When price is above the 200-day MA, the long-term trend is typically bullish.
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Popular Indicators</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-lg p-3">
                  <h6 className="font-semibold text-gray-900 text-sm">RSI (Relative Strength Index)</h6>
                  <p className="text-xs text-gray-600 mt-1">Measures if an asset is overbought (&gt;70) or oversold (&lt;30)</p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-3">
                  <h6 className="font-semibold text-gray-900 text-sm">MACD</h6>
                  <p className="text-xs text-gray-600 mt-1">Shows relationship between two moving averages, signals trend changes</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-lg p-3">
                  <h6 className="font-semibold text-gray-900 text-sm">Bollinger Bands</h6>
                  <p className="text-xs text-gray-600 mt-1">Shows volatility and potential overbought/oversold conditions</p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-3">
                  <h6 className="font-semibold text-gray-900 text-sm">Volume</h6>
                  <p className="text-xs text-gray-600 mt-1">Confirms price movements - high volume validates breakouts</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <p className="text-orange-800 text-sm">
              <strong>Remember:</strong> Technical analysis is not fortune telling. It shows probabilities, not certainties. 
              Always combine with fundamental analysis and proper risk management. Past performance doesn&apos;t guarantee future results.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'investment-strategies',
      title: 'Advanced Investment Strategies',
      completed: completedSections.has('investment-strategies'),
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700">
            Beyond just buying and holding, there are various strategies to potentially improve your crypto investing results. 
            Each has different risk-reward profiles.
          </p>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Investment Strategies Comparison</h4>
            <div className="space-y-6">
              <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-semibold text-blue-900">Dollar-Cost Averaging (DCA)</h5>
                  <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded">Low Risk</span>
                </div>
                <p className="text-sm text-blue-800 mb-2">
                  Invest a fixed amount regularly regardless of price. Reduces impact of volatility.
                </p>
                <div className="text-xs text-blue-700">
                  <div>✓ Simple to execute</div>
                  <div>✓ Reduces timing risk</div>
                  <div>✗ May miss big opportunities</div>
                </div>
              </div>
              
              <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-semibold text-green-900">Value Averaging</h5>
                  <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded">Medium Risk</span>
                </div>
                <p className="text-sm text-green-800 mb-2">
                  Adjust investment amount based on portfolio performance to maintain target growth.
                </p>
                <div className="text-xs text-green-700">
                  <div>✓ Potentially better returns than DCA</div>
                  <div>✓ Automatically buys dips, sells highs</div>
                  <div>✗ More complex to execute</div>
                </div>
              </div>
              
              <div className="border border-purple-200 rounded-lg p-4 bg-purple-50">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-semibold text-purple-900">Momentum Trading</h5>
                  <span className="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded">High Risk</span>
                </div>
                <p className="text-sm text-purple-800 mb-2">
                  Buy assets that are trending up, sell when momentum weakens.
                </p>
                <div className="text-xs text-purple-700">
                  <div>✓ Can capture big moves</div>
                  <div>✓ Works well in trending markets</div>
                  <div>✗ High stress and time commitment</div>
                </div>
              </div>
              
              <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-semibold text-red-900">Arbitrage</h5>
                  <span className="text-xs bg-red-200 text-red-800 px-2 py-1 rounded">Very High Risk</span>
                </div>
                <p className="text-sm text-red-800 mb-2">
                  Profit from price differences between exchanges or trading pairs.
                </p>
                <div className="text-xs text-red-700">
                  <div>✓ Potentially consistent profits</div>
                  <div>✓ Market neutral strategy</div>
                  <div>✗ Requires significant capital and speed</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Rebalancing</h4>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Rebalancing maintains your target asset allocation as prices change. 
                It forces you to sell high and buy low.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">Time-Based Rebalancing</h5>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div>• Rebalance monthly/quarterly</div>
                    <div>• Simple calendar-based approach</div>
                    <div>• Good for long-term investors</div>
                    <div>• Less emotional decision-making</div>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">Threshold-Based Rebalancing</h5>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div>• Rebalance when allocation deviates 5-10%</div>
                    <div>• More responsive to market changes</div>
                    <div>• Better for volatile markets</div>
                    <div>• Requires more monitoring</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800 text-sm">
              <strong>Advanced Strategy Warning:</strong> These strategies require significant knowledge, time, and emotional control. 
              Most beginners should stick to simple DCA and long-term holding until they gain more experience.
            </p>
          </div>
        </div>
      )
    }
  ]

  const progress = (completedSections.size / sections.length) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/education" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-3">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Education Hub
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Advanced Concepts</h1>
              <p className="text-gray-600 mt-1">
                DeFi, smart contracts, and advanced trading strategies
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          
          {/* Course Info Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
            <div className="flex items-start space-x-4 mb-6">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Course Overview</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    30 min read
                  </div>
                  <div className="flex items-center text-gray-600">
                    <User className="w-4 h-4 mr-2" />
                    Advanced Level
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
                  className="bg-purple-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
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

          {/* Completion */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-sm p-6 text-white">
            <h3 className="text-xl font-semibold mb-3">🎉 Congratulations!</h3>
            <p className="mb-4 opacity-90">
              You&apos;ve completed the advanced cryptocurrency course. You now have the knowledge to navigate 
              the complex world of digital assets safely and effectively.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/dashboard">
                <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center">
                  Start Analyzing Markets
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </Link>
              <Link href="/education">
                <button className="bg-purple-700 bg-opacity-50 text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-60 transition-colors">
                  Back to Education Hub
                </button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
} 