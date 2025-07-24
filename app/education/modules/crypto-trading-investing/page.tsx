'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, TrendingUp, Calendar, User, BarChart3, Shield, DollarSign, AlertTriangle, ArrowRight } from 'lucide-react'
import QuizComponent from '../../../../components/QuizComponent'
import GlossaryTooltip from '../../../../components/GlossaryTooltip'

interface Section {
  id: string
  title: string
  content: React.ReactNode
  completed: boolean
}

export default function CryptoTradingInvestingPage() {
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
      // Save completion to localStorage
      const completedModules = JSON.parse(localStorage.getItem('completedEducationModules') || '[]')
      if (!completedModules.includes('crypto-trading-investing')) {
        completedModules.push('crypto-trading-investing')
        localStorage.setItem('completedEducationModules', JSON.stringify(completedModules))
      }
    }
  }

  const quizQuestions = [
    {
      id: 'q1',
      question: 'What is Dollar-Cost Averaging (DCA)?',
      options: [
        'Buying crypto all at once when price is low',
        'Investing a fixed amount regularly regardless of price',
        'Only buying when the market is green',
        'Borrowing money to buy more crypto'
      ],
      correctAnswer: 1,
      explanation: 'Dollar-Cost Averaging involves investing a fixed amount regularly (e.g., $100 weekly) regardless of price. This strategy reduces the impact of volatility and removes the need to time the market.'
    },
    {
      id: 'q2', 
      question: 'What is the most important rule of crypto investing?',
      options: [
        'Always buy the dip',
        'Follow social media influencers',
        'Never invest more than you can afford to lose',
        'Only invest in Bitcoin'
      ],
      correctAnswer: 2,
      explanation: 'The golden rule is to never invest more than you can afford to lose. Crypto is highly volatile and speculative, so you should only risk money that won\'t affect your essential needs if lost.'
    },
    {
      id: 'q3',
      question: 'What does HODL mean in crypto?',
      options: [
        'Hold On for Dear Life - never sell',
        'A misspelling of "hold" that became popular',
        'Hold Only During Lows',
        'High-Octane Digital Lending'
      ],
      correctAnswer: 1,
      explanation: 'HODL originated from a misspelled "hold" in a Bitcoin forum post, but is now commonly interpreted as "Hold On for Dear Life" - a long-term investment strategy of not selling despite volatility.'
    },
    {
      id: 'q4',
      question: 'What is a limit order?',
      options: [
        'An order that executes immediately at market price',
        'An order to buy or sell at a specific price or better',
        'An order that limits your losses',
        'An order that expires after one day'
      ],
      correctAnswer: 1,
      explanation: 'A limit order allows you to set the exact price you want to buy or sell at. It will only execute if the market reaches that price or better, giving you more control than market orders.'
    },
    {
      id: 'q5',
      question: 'What is a major risk of leverage trading?',
      options: [
        'You can only make small profits',
        'You can lose more than your initial investment',
        'It takes too long to see results',
        'It only works in bull markets'
      ],
      correctAnswer: 1,
      explanation: 'Leverage trading allows you to control larger positions with less capital, but it amplifies both gains and losses. You can lose more than your initial investment and even owe money to the exchange.'
    }
  ]

  const sections: Section[] = [
    {
      id: 'investing-vs-trading',
      title: 'Investing vs Trading: Know the Difference',
      completed: completedSections.has('investing-vs-trading'),
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
            <p className="text-lg leading-relaxed text-gray-700">
              Before diving into crypto, it's crucial to understand whether you're an <strong>investor</strong> or a <strong>trader</strong>. 
              These are fundamentally different approaches with different risks, time commitments, and strategies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">Crypto Investing (HODLing)</h4>
              </div>
              <div className="space-y-3 text-sm text-gray-600">
                <div>• <strong>Time Horizon:</strong> Years (3-10+ years)</div>
                <div>• <strong>Strategy:</strong> Buy and hold quality projects</div>
                <div>• <strong>Analysis:</strong> Fundamental research on technology</div>
                <div>• <strong>Risk:</strong> Lower volatility tolerance needed</div>
                <div>• <strong>Time Required:</strong> Minimal daily monitoring</div>
                <div>• <strong>Goal:</strong> Long-term wealth building</div>
                <div>• <strong>Example:</strong> DCA into Bitcoin monthly for 5 years</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-orange-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">Crypto Trading</h4>
              </div>
              <div className="space-y-3 text-sm text-gray-600">
                <div>• <strong>Time Horizon:</strong> Minutes to months</div>
                <div>• <strong>Strategy:</strong> Buy low, sell high frequently</div>
                <div>• <strong>Analysis:</strong> Technical analysis, charts, patterns</div>
                <div>• <strong>Risk:</strong> High risk, high reward potential</div>
                <div>• <strong>Time Required:</strong> Constant market monitoring</div>
                <div>• <strong>Goal:</strong> Generate regular income</div>
                <div>• <strong>Example:</strong> Day trading altcoins for quick profits</div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-yellow-900 mb-3">Which Approach Is Right for You?</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-yellow-800">
              <div>
                <strong>Choose Investing If:</strong>
                <div className="mt-2 space-y-1">
                  <div>• You have limited time for market watching</div>
                  <div>• You believe in crypto's long-term potential</div>
                  <div>• You want to minimize stress and taxes</div>
                  <div>• You're building retirement savings</div>
                </div>
              </div>
              <div>
                <strong>Choose Trading If:</strong>
                <div className="mt-2 space-y-1">
                  <div>• You enjoy analyzing markets daily</div>
                  <div>• You have experience with trading</div>
                  <div>• You can handle high stress and losses</div>
                  <div>• You want to generate active income</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'portfolio-strategy',
      title: 'Building a Crypto Portfolio',
      completed: completedSections.has('portfolio-strategy'),
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700">
            A well-diversified crypto portfolio balances risk and reward across different types of assets. 
            Your allocation should match your risk tolerance and investment goals.
          </p>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Sample Portfolio Allocations</h4>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-green-50 rounded-lg p-4">
                <h5 className="font-semibold text-green-900 mb-3">Conservative (Low Risk)</h5>
                <div className="space-y-2 text-sm text-green-800">
                  <div>• 70% Bitcoin (BTC)</div>
                  <div>• 20% Ethereum (ETH)</div>
                  <div>• 10% Stablecoins (USDC)</div>
                </div>
                <p className="text-xs text-green-700 mt-3">
                  Focus on established assets with lower volatility
                </p>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4">
                <h5 className="font-semibold text-blue-900 mb-3">Balanced (Medium Risk)</h5>
                <div className="space-y-2 text-sm text-blue-800">
                  <div>• 50% Bitcoin (BTC)</div>
                  <div>• 30% Ethereum (ETH)</div>
                  <div>• 15% Top 10 Altcoins</div>
                  <div>• 5% Stablecoins (USDC)</div>
                </div>
                <p className="text-xs text-blue-700 mt-3">
                  Mix of established coins with some growth potential
                </p>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4">
                <h5 className="font-semibold text-purple-900 mb-3">Aggressive (High Risk)</h5>
                <div className="space-y-2 text-sm text-purple-800">
                  <div>• 30% Bitcoin (BTC)</div>
                  <div>• 25% Ethereum (ETH)</div>
                  <div>• 30% Large Cap Altcoins</div>
                  <div>• 15% Small Cap/DeFi</div>
                </div>
                <p className="text-xs text-purple-700 mt-3">
                  Higher potential returns with increased volatility
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Construction Principles</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4">
                  <h5 className="font-semibold text-blue-900 mb-2">🏗️ Core Holdings (60-80%)</h5>
                  <p className="text-sm text-gray-600">
                    Bitcoin and Ethereum - established, less volatile, long-term growth
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-4">
                  <h5 className="font-semibold text-green-900 mb-2">⚡ Growth Holdings (15-30%)</h5>
                  <p className="text-sm text-gray-600">
                    Top 20 altcoins - higher growth potential, moderate risk
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4">
                  <h5 className="font-semibold text-purple-900 mb-2">🚀 Speculative Holdings (5-15%)</h5>
                  <p className="text-sm text-gray-600">
                    Small caps, DeFi tokens - high risk, high reward potential
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-4">
                  <h5 className="font-semibold text-orange-900 mb-2">🛡️ Stable Holdings (5-20%)</h5>
                  <p className="text-sm text-gray-600">
                    Stablecoins - dry powder for buying opportunities
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'dollar-cost-averaging',
      title: 'Dollar-Cost Averaging (DCA)',
      completed: completedSections.has('dollar-cost-averaging'),
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700">
            Dollar-Cost Averaging (DCA) is the most popular crypto investment strategy for beginners. 
            It removes emotion from investing and smooths out the impact of volatility over time.
          </p>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-green-900 mb-4">How DCA Works</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-semibold text-sm">1</span>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900">Set a Fixed Amount</h5>
                  <p className="text-gray-600 text-sm">Decide how much you can invest regularly (e.g., $100 per week)</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-semibold text-sm">2</span>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900">Choose a Schedule</h5>
                  <p className="text-gray-600 text-sm">Pick consistent intervals (weekly, bi-weekly, monthly)</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-semibold text-sm">3</span>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900">Buy Regardless of Price</h5>
                  <p className="text-gray-600 text-sm">Purchase your fixed amount whether price is up or down</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-semibold text-sm">4</span>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900">Automate the Process</h5>
                  <p className="text-gray-600 text-sm">Set up recurring buys to remove emotion and ensure consistency</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">DCA Example: $100 Weekly Bitcoin Purchases</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left">Week</th>
                    <th className="px-4 py-2 text-left">Bitcoin Price</th>
                    <th className="px-4 py-2 text-left">Amount Invested</th>
                    <th className="px-4 py-2 text-left">BTC Bought</th>
                    <th className="px-4 py-2 text-left">Total BTC</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="border-t">
                    <td className="px-4 py-2">1</td>
                    <td className="px-4 py-2">$50,000</td>
                    <td className="px-4 py-2">$100</td>
                    <td className="px-4 py-2">0.002 BTC</td>
                    <td className="px-4 py-2">0.002</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-2">2</td>
                    <td className="px-4 py-2">$40,000</td>
                    <td className="px-4 py-2">$100</td>
                    <td className="px-4 py-2">0.0025 BTC</td>
                    <td className="px-4 py-2">0.0045</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-2">3</td>
                    <td className="px-4 py-2">$60,000</td>
                    <td className="px-4 py-2">$100</td>
                    <td className="px-4 py-2">0.0017 BTC</td>
                    <td className="px-4 py-2">0.0062</td>
                  </tr>
                  <tr className="border-t bg-blue-50">
                    <td className="px-4 py-2 font-semibold">Total</td>
                    <td className="px-4 py-2 font-semibold">Avg: $50,000</td>
                    <td className="px-4 py-2 font-semibold">$300</td>
                    <td className="px-4 py-2 font-semibold">-</td>
                    <td className="px-4 py-2 font-semibold">0.0062 BTC</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-600 mt-3">
              Notice how you bought more BTC when prices were lower, averaging out your cost basis over time.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-lg p-4">
              <h5 className="font-semibold text-green-900 mb-3">✅ Benefits of DCA</h5>
              <div className="space-y-2 text-sm text-green-800">
                <div>• Reduces impact of volatility</div>
                <div>• Removes emotional decision-making</div>
                <div>• No need to time the market</div>
                <div>• Works in any market condition</div>
                <div>• Easy to automate and maintain</div>
                <div>• Lower average cost over time</div>
              </div>
            </div>
            
            <div className="bg-orange-50 rounded-lg p-4">
              <h5 className="font-semibold text-orange-900 mb-3">⚠️ DCA Considerations</h5>
              <div className="space-y-2 text-sm text-orange-800">
                <div>• May miss out on lump sum gains</div>
                <div>• Requires discipline and consistency</div>
                <div>• More transaction fees over time</div>
                <div>• Best for long-term horizons</div>
                <div>• Still requires exit strategy</div>
                <div>• Not suitable for trading profits</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'risk-management',
      title: 'Risk Management & Position Sizing',
      completed: completedSections.has('risk-management'),
      content: (
        <div className="space-y-6">
          <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
            <p className="text-lg leading-relaxed text-gray-700">
              <strong>Risk management is more important than picking winners.</strong> Even the best crypto investors lose money on individual trades. 
              The key is managing position sizes so that losses don't wipe out your account.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">The 1% Rule</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-700 mb-4">
                  Never risk more than 1-2% of your total portfolio on a single trade or speculative investment. 
                  This ensures that even a series of losses won't destroy your account.
                </p>
                
                <div className="bg-blue-50 rounded-lg p-4">
                  <h5 className="font-semibold text-blue-900 mb-2">Example: $10,000 Portfolio</h5>
                  <div className="space-y-1 text-sm text-blue-800">
                    <div>• Max risk per trade: $100-200 (1-2%)</div>
                    <div>• Safe core allocation: $7,000 (BTC/ETH)</div>
                    <div>• Growth plays: $2,000 (top altcoins)</div>
                    <div>• High risk bets: $1,000 (small caps)</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="font-semibold text-gray-900 mb-3">Position Sizing Calculator</h5>
                <div className="space-y-3 text-sm text-gray-600">
                  <div>
                    <strong>Portfolio Value:</strong> $10,000<br/>
                    <strong>Risk per Trade:</strong> 2%<br/>
                    <strong>Max Loss:</strong> $200
                  </div>
                  
                  <div className="border-t pt-3">
                    <strong>If buying at $100 with stop at $80:</strong><br/>
                    Risk per share: $20<br/>
                    Max shares: $200 ÷ $20 = 10 shares<br/>
                    <strong>Position size: $1,000</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Stop Losses</h4>
              <p className="text-gray-600 mb-4 text-sm">
                A stop loss automatically sells your position if price drops to a predetermined level, 
                limiting your losses on any single trade.
              </p>
              
              <div className="space-y-3">
                <div className="bg-red-50 rounded-lg p-3">
                  <h5 className="font-semibold text-red-900 mb-1">Hard Stop Loss</h5>
                  <p className="text-red-800 text-sm">
                    Set order that triggers automatically (e.g., sell if price drops 20%)
                  </p>
                </div>
                
                <div className="bg-orange-50 rounded-lg p-3">
                  <h5 className="font-semibold text-orange-900 mb-1">Mental Stop Loss</h5>
                  <p className="text-orange-800 text-sm">
                    Personal rule to sell at certain loss level (requires discipline)
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Diversification</h4>
              <p className="text-gray-600 mb-4 text-sm">
                Don't put all your eggs in one basket. Spread risk across different:
              </p>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div>• <strong>Assets:</strong> BTC, ETH, altcoins, stables</div>
                <div>• <strong>Sectors:</strong> DeFi, NFTs, Gaming, Infrastructure</div>
                <div>• <strong>Market Caps:</strong> Large, mid, small cap coins</div>
                <div>• <strong>Geographies:</strong> Global projects, not just one region</div>
                <div>• <strong>Time:</strong> DCA over weeks/months, not all at once</div>
              </div>
              
              <div className="bg-yellow-50 rounded-lg p-3 mt-4">
                <p className="text-yellow-800 text-sm">
                  <strong>Remember:</strong> Crypto is still one asset class. Don't put more than 5-10% 
                  of your total net worth into crypto.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'technical-analysis-basics',
      title: 'Technical Analysis Basics',
      completed: completedSections.has('technical-analysis-basics'),
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700">
            Technical analysis uses price charts and trading volume to predict future price movements. 
            While not foolproof, these tools can help you make better entry and exit decisions.
          </p>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Chart Patterns</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <h5 className="font-semibold text-green-900 mb-2">🟢 Bullish Patterns</h5>
                  <div className="space-y-2 text-sm text-green-800">
                    <div>• <strong>Higher Highs & Higher Lows:</strong> Uptrend continuation</div>
                    <div>• <strong>Cup and Handle:</strong> Consolidation before breakout</div>
                    <div>• <strong>Bull Flag:</strong> Brief pause in uptrend</div>
                    <div>• <strong>Golden Cross:</strong> 50-day MA crosses above 200-day MA</div>
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4">
                  <h5 className="font-semibold text-blue-900 mb-2">📊 Support & Resistance</h5>
                  <div className="space-y-1 text-sm text-blue-800">
                    <div>• <strong>Support:</strong> Price level where buying interest emerges</div>
                    <div>• <strong>Resistance:</strong> Price level where selling pressure increases</div>
                    <div>• <strong>Breakout:</strong> Price moves decisively above/below key levels</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-red-50 rounded-lg p-4">
                  <h5 className="font-semibold text-red-900 mb-2">🔴 Bearish Patterns</h5>
                  <div className="space-y-2 text-sm text-red-800">
                    <div>• <strong>Lower Highs & Lower Lows:</strong> Downtrend continuation</div>
                    <div>• <strong>Head and Shoulders:</strong> Reversal pattern</div>
                    <div>• <strong>Bear Flag:</strong> Brief pause in downtrend</div>
                    <div>• <strong>Death Cross:</strong> 50-day MA crosses below 200-day MA</div>
                  </div>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-4">
                  <h5 className="font-semibold text-purple-900 mb-2">📈 Volume Analysis</h5>
                  <div className="space-y-1 text-sm text-purple-800">
                    <div>• <strong>Volume confirms trends:</strong> Rising volume = stronger moves</div>
                    <div>• <strong>Breakouts need volume:</strong> Low volume = false breakout risk</div>
                    <div>• <strong>Divergence:</strong> Price up, volume down = weakness</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Popular Technical Indicators</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4">
                <h5 className="font-semibold text-blue-900 mb-2">Moving Averages</h5>
                <div className="text-sm text-gray-600">
                  <div>• Smooth out price noise</div>
                  <div>• Show trend direction</div>
                  <div>• Common: 20, 50, 200-day</div>
                  <div>• Price above MA = bullish</div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4">
                <h5 className="font-semibold text-green-900 mb-2">RSI (Momentum)</h5>
                <div className="text-sm text-gray-600">
                  <div>• Measures overbought/oversold</div>
                  <div>• Scale: 0-100</div>
                  <div>• &gt;70 = potentially overbought</div>
                  <div>• &lt;30 = potentially oversold</div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4">
                <h5 className="font-semibold text-purple-900 mb-2">MACD (Trend)</h5>
                <div className="text-sm text-gray-600">
                  <div>• Shows trend changes</div>
                  <div>• Histogram shows momentum</div>
                  <div>• Bullish: MACD &gt; Signal line</div>
                  <div>• Look for crossovers</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-yellow-900 mb-3">⚠️ Technical Analysis Limitations</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-yellow-800">
              <div>
                <strong>Remember:</strong>
                <div className="mt-2 space-y-1">
                  <div>• Past performance ≠ future results</div>
                  <div>• Crypto markets are highly emotional</div>
                  <div>• News events can override technicals</div>
                  <div>• False signals are common</div>
                </div>
              </div>
              <div>
                <strong>Best Practices:</strong>
                <div className="mt-2 space-y-1">
                  <div>• Use multiple indicators together</div>
                  <div>• Combine with fundamental analysis</div>
                  <div>• Practice with small positions first</div>
                  <div>• Always use risk management</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'tax-considerations',
      title: 'Tax Planning & Record Keeping',
      completed: completedSections.has('tax-considerations'),
      content: (
        <div className="space-y-6">
          <div className="bg-orange-50 border-l-4 border-orange-400 p-6 rounded-r-lg">
            <p className="text-lg leading-relaxed text-gray-700">
              <strong>Crypto taxes are complex and vary by country.</strong> In most jurisdictions, crypto is treated as property, 
              meaning every trade, sale, or spend is a taxable event. Proper record keeping is essential.
            </p>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-red-900 mb-4">⚠️ Important Disclaimer</h4>
            <p className="text-red-800 text-sm">
              This is educational information only, not tax advice. Tax laws vary significantly by country and change frequently. 
              Always consult with a qualified tax professional or accountant familiar with cryptocurrency taxation in your jurisdiction.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Common Taxable Events</h4>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="bg-red-50 p-3 rounded">
                  <strong>• Selling crypto for fiat currency</strong><br/>
                  (e.g., BTC → USD)
                </div>
                <div className="bg-red-50 p-3 rounded">
                  <strong>• Trading one crypto for another</strong><br/>
                  (e.g., BTC → ETH)
                </div>
                <div className="bg-red-50 p-3 rounded">
                  <strong>• Using crypto to buy goods/services</strong><br/>
                  (e.g., buying coffee with Bitcoin)
                </div>
                <div className="bg-red-50 p-3 rounded">
                  <strong>• Receiving crypto as income</strong><br/>
                  (e.g., mining rewards, DeFi yields, airdrops)
                </div>
                <div className="bg-red-50 p-3 rounded">
                  <strong>• Converting to stablecoins</strong><br/>
                  (e.g., ETH → USDC)
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Tax Optimization Strategies</h4>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="bg-green-50 p-3 rounded">
                  <strong>• HODL Strategy</strong><br/>
                  Long-term holdings often have better tax rates
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <strong>• Tax-Loss Harvesting</strong><br/>
                  Sell losing positions to offset gains
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <strong>• FIFO vs LIFO</strong><br/>
                  Choose cost basis method strategically
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <strong>• Retirement Accounts</strong><br/>
                  Some countries allow crypto in IRAs/401ks
                </div>
                <div className="bg-green-50 p-3 rounded">
                  <strong>• Geographic Arbitrage</strong><br/>
                  Some countries have crypto-friendly tax laws
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Essential Record Keeping</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold text-blue-900 mb-3">Track for Every Transaction:</h5>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>• Date and time of transaction</div>
                  <div>• Type of transaction (buy/sell/trade)</div>
                  <div>• Amount of crypto involved</div>
                  <div>• Value in local currency at time of transaction</div>
                  <div>• Exchange or wallet used</div>
                  <div>• Transaction fees paid</div>
                  <div>• Purpose (investment, business, personal)</div>
                </div>
              </div>
              
              <div>
                <h5 className="font-semibold text-purple-900 mb-3">Helpful Tools:</h5>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>• <strong>CoinTracker:</strong> Automated tax reporting</div>
                  <div>• <strong>Koinly:</strong> Portfolio tracking + tax reports</div>
                  <div>• <strong>CryptoTrader.Tax:</strong> Simple tax calculations</div>
                  <div>• <strong>Blockpit:</strong> European-focused platform</div>
                  <div>• <strong>Excel/Sheets:</strong> Manual tracking template</div>
                  <div>• <strong>Exchange CSVs:</strong> Download transaction history</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-blue-900 mb-3">Pro Tips for Tax Season</h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-blue-800">
              <div>
                <strong>Start Early:</strong>
                <div className="mt-2 space-y-1">
                  <div>• Don't wait until tax deadline</div>
                  <div>• Gather records throughout the year</div>
                  <div>• Set up tracking systems now</div>
                </div>
              </div>
              <div>
                <strong>Professional Help:</strong>
                <div className="mt-2 space-y-1">
                  <div>• Find crypto-savvy accountants</div>
                  <div>• Consider tax software specialized for crypto</div>
                  <div>• Join tax-focused crypto communities</div>
                </div>
              </div>
              <div>
                <strong>Stay Compliant:</strong>
                <div className="mt-2 space-y-1">
                  <div>• Report all transactions honestly</div>
                  <div>• Keep records for audit purposes</div>
                  <div>• Understand local regulations</div>
                </div>
              </div>
            </div>
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
              <Link href="/education/modules" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-3">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Learning Journey
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Crypto Trading & Investing</h1>
              <p className="text-gray-600 mt-1">
                Strategies for buying, holding, and trading cryptocurrencies safely
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
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Course Overview</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    35 min read
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
                  className="bg-green-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Learning Objectives */}
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-3">What You'll Learn</h3>
              <div className="grid md:grid-cols-2 gap-3 text-sm text-green-800">
                <div>• Difference between investing vs trading</div>
                <div>• How to build a balanced crypto portfolio</div>
                <div>• Dollar-cost averaging strategy</div>
                <div>• Risk management and position sizing</div>
                <div>• Technical analysis basics</div>
                <div>• Tax implications and record keeping</div>
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

          {/* Quiz Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Knowledge Check</h2>
                <p className="text-gray-600 mt-1">Test your understanding of crypto trading and investing strategies</p>
              </div>
              {!showQuiz && (
                <button
                  onClick={() => setShowQuiz(true)}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Take Quiz
                </button>
              )}
            </div>

            {showQuiz && (
              <QuizComponent
                title="Crypto Trading & Investing Quiz"
                questions={quizQuestions}
                onComplete={handleQuizComplete}
              />
            )}

            {quizCompleted && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-green-900">Module Completed!</h3>
                    <p className="text-green-700 text-sm">You now have the foundation for responsible crypto investing.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Next Steps */}
          <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
            <h2 className="text-xl font-semibold mb-3">Continue Your Learning Journey</h2>
            <p className="mb-4 opacity-90">
              Now that you understand trading and investing basics, explore advanced strategies and risk management.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/education/modules/defi-fundamentals"
                className="inline-flex items-center px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors text-sm"
              >
                DeFi Fundamentals
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="/education/modules/security"
                className="inline-flex items-center px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors text-sm"
              >
                Security & Risk Management
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 