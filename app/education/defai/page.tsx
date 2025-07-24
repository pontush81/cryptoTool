'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, Bot, Calendar, User, TrendingUp, ArrowRight, Shield, Globe, DollarSign, AlertTriangle, Clock, Zap, Building, Target, Brain, Eye } from 'lucide-react'
import QuizComponent from '../../../components/QuizComponent'

interface Section {
  id: string
  title: string
  content: React.ReactNode
  completed: boolean
}

export default function DeFAIPage() {
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
      if (!completedModules.includes('defai')) {
        completedModules.push('defai')
        localStorage.setItem('completedEducationModules', JSON.stringify(completedModules))
      }
      
      // Set mastery level based on score
      const masteryLevels = JSON.parse(localStorage.getItem('educationMasteryLevels') || '{}')
      masteryLevels['defai'] = score >= 90 ? 'excellent' : score >= 80 ? 'good' : 'basic'
      localStorage.setItem('educationMasteryLevels', JSON.stringify(masteryLevels))
    }
  }

  const sections: Section[] = [
    {
      id: 'ai-protocol-automation',
      title: 'AI-Augmented Protocol Automation',
      completed: completedSections.has('ai-protocol-automation'),
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
            <p className="text-lg leading-relaxed text-gray-700">
              DeFAI represents the evolution from static smart contracts to <strong>intelligent, 
              adaptive protocols</strong> that use AI to make real-time decisions, optimize parameters, 
              and respond to market conditions automatically—creating truly autonomous financial systems.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">How AI Transforms DeFi Protocols</h4>
            
            <div className="space-y-4">
              <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Brain className="w-5 h-5 text-green-500 mr-2" />
                  <h5 className="font-semibold text-green-800">Dynamic Parameter Optimization</h5>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  AI algorithms continuously adjust protocol parameters for optimal performance
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-green-800 text-sm mb-1">Traditional DeFi</p>
                    <ul className="text-xs text-green-600 space-y-1">
                      <li>• Fixed interest rates set by governance</li>
                      <li>• Static liquidity pool fees (0.3%)</li>
                      <li>• Manual parameter updates via voting</li>
                      <li>• Reactive to market changes</li>
                      <li>• One-size-fits-all approach</li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-green-800 text-sm mb-1">AI-Enhanced DeFi</p>
                    <ul className="text-xs text-green-600 space-y-1">
                      <li>• Dynamic rates based on supply/demand ML models</li>
                      <li>• Variable fees optimized for volume & volatility</li>
                      <li>• Real-time autonomous adjustments</li>
                      <li>• Predictive positioning before market moves</li>
                      <li>• Personalized strategies per user profile</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 border-l-4 border-purple-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Target className="w-5 h-5 text-purple-500 mr-2" />
                  <h5 className="font-semibold text-purple-800">Real-Time Liquidity Management</h5>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  AI agents automatically rebalance liquidity pools for optimal capital efficiency
                </p>
                
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-purple-800 text-sm mb-1">Uniswap v4 + AI Integration</p>
                    <div className="text-xs text-purple-600 space-y-1">
                      <p>• <strong>Dynamic Fee Tiers:</strong> AI adjusts fees 0.01% - 1% based on volatility</p>
                      <p>• <strong>Concentration Management:</strong> AI suggests optimal price ranges</p>
                      <p>• <strong>Impermanent Loss Protection:</strong> ML models predict and hedge risk</p>
                      <p>• <strong>MEV Optimization:</strong> AI routing minimizes sandwich attacks</p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-purple-800 text-sm mb-1">Bittensor AMM Predictions</p>
                    <div className="text-xs text-purple-600 space-y-1">
                      <p>• <strong>Crowd Intelligence:</strong> Network of AI models predict optimal AMM parameters</p>
                      <p>• <strong>Incentivized Accuracy:</strong> Rewards for better liquidity predictions</p>
                      <p>• <strong>Decentralized AI:</strong> No single point of failure in AI models</p>
                      <p>• <strong>Real Implementation:</strong> Live on Polygon, Arbitrum integrations</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-orange-50 border-l-4 border-orange-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Shield className="w-5 h-5 text-orange-500 mr-2" />
                  <h5 className="font-semibold text-orange-800">AI-Powered Risk Monitoring</h5>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Machine learning systems provide 24/7 threat detection and automatic circuit breakers
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-orange-800 text-sm mb-1">NEAR Protocol AI Risk Engine</p>
                    <ul className="text-xs text-orange-600 space-y-1">
                      <li>• <strong>Anomaly Detection:</strong> Identifies unusual transaction patterns</li>
                      <li>• <strong>Flash Loan Monitoring:</strong> Detects potential exploits in real-time</li>
                      <li>• <strong>Code Analysis:</strong> AI scans new contracts for vulnerabilities</li>
                      <li>• <strong>Auto-Pause:</strong> Automatically halts suspicious activities</li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-orange-800 text-sm mb-1">Internet Computer AI Security</p>
                    <ul className="text-xs text-orange-600 space-y-1">
                      <li>• <strong>Behavioral Analysis:</strong> ML models track user patterns</li>
                      <li>• <strong>Liquidation Prevention:</strong> Early warnings for at-risk positions</li>
                      <li>• <strong>Oracle Validation:</strong> AI verifies price feed accuracy</li>
                      <li>• <strong>Governance Protection:</strong> Detects potential governance attacks</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Implementation Architecture</h4>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h5 className="font-semibold text-gray-800 mb-3">How AI Integrates with Smart Contracts</h5>
              
              <div className="space-y-3">
                <div className="bg-blue-50 p-3 rounded border">
                  <p className="font-semibold text-blue-800 text-sm mb-1">1. Off-Chain AI → On-Chain Execution</p>
                  <div className="text-xs text-blue-600 space-y-1">
                    <p>• AI models run on powerful servers (AWS, Google Cloud)</p>
                    <p>• Predictions signed by oracles (Chainlink, Band Protocol)</p>
                    <p>• Smart contracts execute based on signed AI outputs</p>
                    <p>• Example: Numerai's signals feed into DeFi strategies</p>
                  </div>
                </div>
                
                <div className="bg-green-50 p-3 rounded border">
                  <p className="font-semibold text-green-800 text-sm mb-1">2. On-Chain AI (WASM/EVM Compatible)</p>
                  <div className="text-xs text-green-600 space-y-1">
                    <p>• Lightweight AI models run directly in smart contracts</p>
                    <p>• Internet Computer and NEAR support complex computations</p>
                    <p>• Real-time decision making without external dependencies</p>
                    <p>• Higher gas costs but maximum decentralization</p>
                  </div>
                </div>
                
                <div className="bg-purple-50 p-3 rounded border">
                  <p className="font-semibold text-purple-800 text-sm mb-1">3. Hybrid AI Oracles</p>
                  <div className="text-xs text-purple-600 space-y-1">
                    <p>• Combine multiple AI models for consensus</p>
                    <p>• SingularityNET's decentralized AI marketplace</p>
                    <p>• Fetch.ai's autonomous economic agents</p>
                    <p>• Resilient to single model failures or biases</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">🧠 AI Enhancement Examples</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-yellow-800 mb-1">Lending Protocols</p>
                <ul className="text-xs text-yellow-600 space-y-1">
                  <li>• Dynamic interest rates based on market prediction</li>
                  <li>• Personalized credit scoring</li>
                  <li>• Automatic liquidation thresholds</li>
                  <li>• Risk-adjusted collateral ratios</li>
                </ul>
              </div>
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-yellow-800 mb-1">DEX Optimization</p>
                <ul className="text-xs text-yellow-600 space-y-1">
                  <li>• Optimal routing across multiple pools</li>
                  <li>• Dynamic slippage protection</li>
                  <li>• MEV-resistant transaction ordering</li>
                  <li>• Predictive liquidity migration</li>
                </ul>
              </div>
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-yellow-800 mb-1">Yield Protocols</p>
                <ul className="text-xs text-yellow-600 space-y-1">
                  <li>• Auto-compound optimization timing</li>
                  <li>• Multi-strategy portfolio balancing</li>
                  <li>• Risk-adjusted yield forecasting</li>
                  <li>• Automated strategy migration</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ]

  // Continue with rest of the module...
  
  // Add remaining sections here
  sections.push({
    id: 'ai-trading-protocols',
    title: 'AI Trading & Prediction Markets',
    completed: completedSections.has('ai-trading-protocols'),
    content: (
      <div className="space-y-6">
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">Live AI Trading Protocols (2025)</h4>
          
          <div className="space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Brain className="w-5 h-5 text-blue-500 mr-2" />
                <h5 className="font-semibold text-blue-800">Numerai: Crowdsourced AI Trading</h5>
                <span className="ml-2 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">$100M+ AUM</span>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                World's largest data science tournament powering a regulated quant hedge fund
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-blue-800 text-sm mb-1">How It Works</p>
                  <ul className="text-xs text-blue-600 space-y-1">
                    <li>• 20,000+ data scientists submit ML models</li>
                    <li>• Models predict stock market movements</li>
                    <li>• Best predictions earn NMR token rewards</li>
                    <li>• Meta-model combines top predictions</li>
                    <li>• Signals power on-chain DeFi strategies</li>
                  </ul>
                </div>
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-blue-800 text-sm mb-1">DeFi Integration</p>
                  <ul className="text-xs text-blue-600 space-y-1">
                    <li>• <strong>Numerai Signals:</strong> Daily trading predictions</li>
                    <li>• <strong>Erasure Protocol:</strong> Staking on prediction accuracy</li>
                    <li>• <strong>On-Chain Strategies:</strong> DeFi funds use Numerai data</li>
                    <li>• <strong>Performance:</strong> 10%+ annual alpha over benchmarks</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Target className="w-5 h-5 text-green-500 mr-2" />
                <h5 className="font-semibold text-green-800">dHEDGE: Copy AI Trading Strategies</h5>
                <span className="ml-2 bg-green-100 text-green-700 text-xs px-2 py-1 rounded">$50M+ TVL</span>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                Decentralized asset management with AI-driven trading strategies
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-green-800 text-sm mb-1">AI Strategy Types</p>
                  <ul className="text-xs text-green-600 space-y-1">
                    <li>• <strong>Momentum Trading:</strong> ML detects trend reversals</li>
                    <li>• <strong>Arbitrage Bots:</strong> Cross-DEX price differences</li>
                    <li>• <strong>Mean Reversion:</strong> Statistical models predict bounces</li>
                    <li>• <strong>Volatility Trading:</strong> AI positions for market moves</li>
                    <li>• <strong>Multi-Asset:</strong> Portfolio optimization across tokens</li>
                  </ul>
                </div>
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-green-800 text-sm mb-1">Performance Metrics</p>
                  <ul className="text-xs text-green-600 space-y-1">
                    <li>• <strong>Top Strategies:</strong> 50%+ annual returns</li>
                    <li>• <strong>Risk-Adjusted:</strong> Sharpe ratios 1.5-3.0</li>
                    <li>• <strong>Max Drawdown:</strong> AI limits losses to 10-15%</li>
                    <li>• <strong>Win Rate:</strong> 65-75% profitable trades</li>
                    <li>• <strong>Real-Time:</strong> On-chain performance tracking</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50 border-l-4 border-purple-500 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Zap className="w-5 h-5 text-purple-500 mr-2" />
                <h5 className="font-semibold text-purple-800">Enzyme: AI-Enhanced Asset Management</h5>
                <span className="ml-2 bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded">$200M+ TVL</span>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                Modular asset management with pluggable AI signal providers
              </p>
              
              <div className="space-y-3">
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-purple-800 text-sm mb-1">AI Module Integration</p>
                  <div className="text-xs text-purple-600 space-y-1">
                    <p>• <strong>Risk Management:</strong> ML models assess portfolio risk real-time</p>
                    <p>• <strong>Rebalancing:</strong> AI determines optimal allocation timing</p>
                    <p>• <strong>Signal Providers:</strong> Connect external AI predictions</p>
                    <p>• <strong>Performance Attribution:</strong> AI analyzes return sources</p>
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-purple-800 text-sm mb-1">Live AI Funds on Enzyme</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="font-semibold text-purple-800">Quant Fund Alpha</p>
                      <p className="text-purple-600">• Uses Numerai signals<br/>• 23% YTD returns<br/>• 0.95 correlation to AI predictions</p>
                    </div>
                    <div>
                      <p className="font-semibold text-purple-800">DeFi AI Momentum</p>
                      <p className="text-purple-600">• ML trend detection<br/>• 31% YTD returns<br/>• Auto-rebalances weekly</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">Prediction Market Intelligence</h4>
          
          <div className="bg-orange-50 border-l-4 border-orange-400 rounded-lg p-4">
            <h5 className="font-semibold text-orange-800 mb-3">AI-Powered Market Forecasting</h5>
            
            <div className="space-y-3">
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-orange-800 text-sm mb-1">Polymarket AI Integration</p>
                <div className="text-xs text-orange-600 space-y-1">
                  <p>• AI models analyze news, social sentiment, and on-chain data</p>
                  <p>• Predict election outcomes, crypto prices, economic events</p>
                  <p>• Automated betting based on prediction confidence</p>
                  <p>• Example: AI predicted 2024 election with 94% accuracy</p>
                </div>
              </div>
              
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-orange-800 text-sm mb-1">Augur AI Oracles</p>
                <div className="text-xs text-orange-600 space-y-1">
                  <p>• ML models help resolve prediction market outcomes</p>
                  <p>• Analyze multiple data sources for objective truth</p>
                  <p>• Reduce human bias in market resolution</p>
                  <p>• Enable more complex, data-driven prediction markets</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  })
  
  sections.push({
    id: 'ai-yield-optimization',
    title: 'AI-Powered Yield Optimization',
    completed: completedSections.has('ai-yield-optimization'),
    content: (
      <div className="space-y-6">
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">Autonomous Yield Strategies</h4>
          
          <div className="space-y-4">
            <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Bot className="w-5 h-5 text-green-500 mr-2" />
                <h5 className="font-semibold text-green-800">Virtuals Protocol: AI Yield Agents</h5>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                Autonomous agents that optimize yield farming across multiple protocols
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-green-800 text-sm mb-1">How AI Optimizes Yield</p>
                  <ul className="text-xs text-green-600 space-y-1">
                    <li>• <strong>Pool Analysis:</strong> AI monitors 1000+ yield opportunities</li>
                    <li>• <strong>Gas Optimization:</strong> Times transactions for lowest fees</li>
                    <li>• <strong>IL Protection:</strong> Predicts impermanent loss risks</li>
                    <li>• <strong>Auto-Compound:</strong> Optimal harvesting frequency</li>
                    <li>• <strong>Risk Assessment:</strong> Protocol safety scoring</li>
                  </ul>
                </div>
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-green-800 text-sm mb-1">Performance Results</p>
                  <ul className="text-xs text-green-600 space-y-1">
                    <li>• <strong>APY Boost:</strong> 15-30% higher than manual farming</li>
                    <li>• <strong>Gas Savings:</strong> 40% reduction through batching</li>
                    <li>• <strong>Risk Reduction:</strong> 60% fewer loss events</li>
                    <li>• <strong>Uptime:</strong> 99.8% strategy execution rate</li>
                    <li>• <strong>Users:</strong> 50,000+ active AI yield strategies</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Target className="w-5 h-5 text-blue-500 mr-2" />
                <h5 className="font-semibold text-blue-800">SingularityNET DeFi Services</h5>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                Decentralized marketplace of AI services for DeFi optimization
              </p>
              
              <div className="space-y-3">
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-blue-800 text-sm mb-1">Available AI Services</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="font-semibold text-blue-800">Portfolio Optimization</p>
                      <p className="text-blue-600">• Mean-variance optimization<br/>• Risk parity allocation<br/>• Black-Litterman models</p>
                    </div>
                    <div>
                      <p className="font-semibold text-blue-800">Strategy Backtesting</p>
                      <p className="text-blue-600">• Historical performance simulation<br/>• Monte Carlo analysis<br/>• Stress testing scenarios</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-blue-800 text-sm mb-1">Composable AI Architecture</p>
                  <div className="text-xs text-blue-600 space-y-1">
                    <p>• Mix and match different AI services</p>
                    <p>• Pay for AI compute with AGIX tokens</p>
                    <p>• Decentralized model marketplace</p>
                    <p>• No single point of AI failure</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">Personalized DeFi Strategies</h4>
          
          <div className="bg-purple-50 border-l-4 border-purple-400 rounded-lg p-4">
            <h5 className="font-semibold text-purple-800 mb-3">AI-Curated User Experiences</h5>
            <p className="text-sm text-gray-700 mb-3">
              Machine learning creates personalized DeFi strategies based on user behavior and preferences
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-purple-800 text-sm mb-1">User Profiling</p>
                <ul className="text-xs text-purple-600 space-y-1">
                  <li>• <strong>Risk Tolerance:</strong> ML analyzes trading patterns</li>
                  <li>• <strong>Time Horizon:</strong> Infers investment goals</li>
                  <li>• <strong>Capital Size:</strong> Optimizes for portfolio size</li>
                  <li>• <strong>Gas Sensitivity:</strong> Considers transaction costs</li>
                  <li>• <strong>Protocol Preferences:</strong> Learns from usage history</li>
                </ul>
              </div>
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-purple-800 text-sm mb-1">Strategy Matching</p>
                <ul className="text-xs text-purple-600 space-y-1">
                  <li>• <strong>Conservative:</strong> Stablecoin yield + blue chip</li>
                  <li>• <strong>Moderate:</strong> Balanced liquidity pools</li>
                  <li>• <strong>Aggressive:</strong> High APY farming with protection</li>
                  <li>• <strong>Active:</strong> AI trading + manual override</li>
                  <li>• <strong>Passive:</strong> Set-and-forget index strategies</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  })
  
  sections.push({
    id: 'predictive-analytics',
    title: 'Predictive Analytics & Risk Assessment',
    completed: completedSections.has('predictive-analytics'),
    content: (
      <div className="space-y-6">
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">AI-Powered Market Intelligence</h4>
          
          <div className="space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Brain className="w-5 h-5 text-blue-500 mr-2" />
                <h5 className="font-semibold text-blue-800">Multi-Modal Market Analysis</h5>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                AI combines on-chain data, news sentiment, and social signals for comprehensive market intelligence
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-blue-800 text-sm mb-1">On-Chain Analysis</p>
                  <ul className="text-xs text-blue-600 space-y-1">
                    <li>• Large holder movements</li>
                    <li>• DEX trading volumes</li>
                    <li>• Liquidation cascades</li>
                    <li>• Bridge activity patterns</li>
                    <li>• Gas fee trends</li>
                  </ul>
                </div>
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-blue-800 text-sm mb-1">Sentiment Analysis</p>
                  <ul className="text-xs text-blue-600 space-y-1">
                    <li>• News article processing</li>
                    <li>• Social media sentiment</li>
                    <li>• Regulatory announcements</li>
                    <li>• Developer activity</li>
                    <li>• Community engagement</li>
                  </ul>
                </div>
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-blue-800 text-sm mb-1">Technical Indicators</p>
                  <ul className="text-xs text-blue-600 space-y-1">
                    <li>• Price action patterns</li>
                    <li>• Volume-price relationships</li>
                    <li>• Support/resistance levels</li>
                    <li>• Momentum oscillators</li>
                    <li>• Volatility clustering</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                <h5 className="font-semibold text-red-800">Real-Time Risk Assessment</h5>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                AI systems provide continuous risk monitoring and early warning systems
              </p>
              
              <div className="space-y-3">
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-red-800 text-sm mb-1">Zeebu AI Compliance Engine</p>
                  <div className="text-xs text-red-600 space-y-1">
                    <p>• <strong>AML Monitoring:</strong> Detects suspicious transaction patterns</p>
                    <p>• <strong>Risk Scoring:</strong> Real-time participant assessment</p>
                    <p>• <strong>Regulatory Compliance:</strong> Automated reporting systems</p>
                    <p>• <strong>B2B Focus:</strong> Enterprise DeFi and telecom payments</p>
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-red-800 text-sm mb-1">dHEDGE Risk Analytics</p>
                  <div className="text-xs text-red-600 space-y-1">
                    <p>• <strong>Portfolio VaR:</strong> Value-at-Risk calculations updated hourly</p>
                    <p>• <strong>Correlation Analysis:</strong> Asset relationship monitoring</p>
                    <p>• <strong>Drawdown Prediction:</strong> ML models forecast potential losses</p>
                    <p>• <strong>Strategy Health:</strong> Performance degradation detection</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">Predictive Model Applications</h4>
          
          <div className="bg-green-50 border-l-4 border-green-400 rounded-lg p-4">
            <h5 className="font-semibold text-green-800 mb-3">Market Prediction Examples</h5>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-green-800 text-sm mb-1">📈 Price Movement Prediction</p>
                  <div className="text-xs text-green-600 space-y-1">
                    <p><strong>Bitcoin:</strong> 72% accuracy on 24h direction</p>
                    <p><strong>Ethereum:</strong> 68% accuracy on weekly trends</p>
                    <p><strong>DeFi Tokens:</strong> 65% accuracy on major moves</p>
                    <p><strong>Method:</strong> Ensemble of LSTM + Transformer models</p>
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-green-800 text-sm mb-1">💧 Liquidity Prediction</p>
                  <div className="text-xs text-green-600 space-y-1">
                    <p><strong>Pool Migrations:</strong> Predict 80% of major moves</p>
                    <p><strong>TVL Changes:</strong> 3-day advance warning</p>
                    <p><strong>Yield Shifts:</strong> Protocol rate change detection</p>
                    <p><strong>Impact:</strong> 20% better positioning vs. reactive</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-green-800 text-sm mb-1">⚡ Volatility Forecasting</p>
                  <div className="text-xs text-green-600 space-y-1">
                    <p><strong>GARCH Models:</strong> Traditional volatility clustering</p>
                    <p><strong>AI Enhancement:</strong> News + sentiment integration</p>
                    <p><strong>Accuracy:</strong> 85% on volatility regime changes</p>
                    <p><strong>Application:</strong> Options pricing, hedging strategies</p>
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-green-800 text-sm mb-1">🔒 Liquidation Risk</p>
                  <div className="text-xs text-green-600 space-y-1">
                    <p><strong>Individual Risk:</strong> Personal liquidation probability</p>
                    <p><strong>Systemic Risk:</strong> Market-wide cascade detection</p>
                    <p><strong>Early Warning:</strong> 2-4 hours advance notice</p>
                    <p><strong>Prevention:</strong> Automated deleveraging suggestions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  })
  
  sections.push({
    id: 'future-ai-native',
    title: 'Future: AI-Native Financial Protocols',
    completed: completedSections.has('future-ai-native'),
    content: (
      <div className="space-y-6">
        <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
          <p className="text-lg leading-relaxed text-gray-700">
            The future of DeFAI envisions <strong>fully autonomous financial ecosystems</strong> where 
            AI agents negotiate, trade, and manage risk with minimal human intervention—creating 
            a new economy of intelligent financial protocols that learn and adapt continuously.
          </p>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">Autonomous Financial Agent Ecosystems</h4>
          
          <div className="space-y-4">
            <div className="bg-purple-50 border-l-4 border-purple-500 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Bot className="w-5 h-5 text-purple-500 mr-2" />
                <h5 className="font-semibold text-purple-800">Agent-to-Agent Finance</h5>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                AI agents will negotiate loans, execute trades, and provide services to other agents
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-purple-800 text-sm mb-1">Fetch.ai Vision</p>
                  <ul className="text-xs text-purple-600 space-y-1">
                    <li>• <strong>Economic Agents:</strong> AI entities with crypto wallets</li>
                    <li>• <strong>Autonomous Negotiation:</strong> Smart contract terms via ML</li>
                    <li>• <strong>Service Marketplace:</strong> AI agents provide/consume services</li>
                    <li>• <strong>Dynamic Pricing:</strong> Supply/demand based on agent behavior</li>
                    <li>• <strong>No Human Required:</strong> End-to-end automated economy</li>
                  </ul>
                </div>
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-purple-800 text-sm mb-1">Use Case Examples</p>
                  <ul className="text-xs text-purple-600 space-y-1">
                    <li>• <strong>Lending:</strong> Agent A needs capital, negotiates with Agent B</li>
                    <li>• <strong>Insurance:</strong> Risk assessment and coverage via AI models</li>
                    <li>• <strong>Trading:</strong> Multi-agent coordination for large orders</li>
                    <li>• <strong>Portfolio Management:</strong> Agent delegates to specialist agents</li>
                    <li>• <strong>Arbitrage:</strong> Coordinated cross-chain opportunities</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Brain className="w-5 h-5 text-green-500 mr-2" />
                <h5 className="font-semibold text-green-800">Self-Improving Protocols</h5>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                Financial protocols that continuously learn and optimize themselves
              </p>
              
              <div className="space-y-3">
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-green-800 text-sm mb-1">Reflexive DeFi Protocols</p>
                  <div className="text-xs text-green-600 space-y-1">
                    <p>• <strong>Continuous Learning:</strong> Protocols learn from every transaction</p>
                    <p>• <strong>Parameter Evolution:</strong> Interest rates, fees auto-optimize</p>
                    <p>• <strong>Strategy Adaptation:</strong> Yield farming strategies evolve</p>
                    <p>• <strong>Risk Adjustment:</strong> Real-time risk model updates</p>
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-green-800 text-sm mb-1">Implementation Timeline</p>
                  <div className="space-y-2">
                    <div className="text-xs">
                      <p className="font-semibold text-green-800">2025-2026: Foundation</p>
                      <p className="text-green-600">AI-enhanced existing protocols, better oracles</p>
                    </div>
                    <div className="text-xs">
                      <p className="font-semibold text-green-800">2027-2028: Integration</p>
                      <p className="text-green-600">Native AI protocols, agent marketplaces</p>
                    </div>
                    <div className="text-xs">
                      <p className="font-semibold text-green-800">2030+: Autonomy</p>
                      <p className="text-green-600">Fully autonomous financial ecosystems</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">AI-Enhanced Governance & Risk Management</h4>
          
          <div className="space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-4">
              <h5 className="font-semibold text-blue-800 mb-3">Smart DAO Governance</h5>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-blue-800 text-sm mb-1">Proposal Analysis</p>
                  <ul className="text-xs text-blue-600 space-y-1">
                    <li>• <strong>Impact Simulation:</strong> AI models predict proposal outcomes</li>
                    <li>• <strong>Risk Assessment:</strong> Identify potential negative consequences</li>
                    <li>• <strong>Alternative Suggestions:</strong> AI proposes better solutions</li>
                    <li>• <strong>Voting Recommendations:</strong> Evidence-based voting guidance</li>
                  </ul>
                </div>
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-blue-800 text-sm mb-1">Execution Optimization</p>
                  <ul className="text-xs text-blue-600 space-y-1">
                    <li>• <strong>Timing Optimization:</strong> Best time to execute changes</li>
                    <li>• <strong>Gradual Rollout:</strong> AI manages parameter changes</li>
                    <li>• <strong>Rollback Triggers:</strong> Automatic reversal if issues detected</li>
                    <li>• <strong>Community Sentiment:</strong> Real-time feedback integration</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-orange-50 border-l-4 border-orange-400 rounded-lg p-4">
              <h5 className="font-semibold text-orange-800 mb-3">Systemic Risk Management</h5>
              
              <div className="space-y-3">
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-orange-800 text-sm mb-1">Cross-Protocol Risk Monitoring</p>
                  <div className="text-xs text-orange-600 space-y-1">
                    <p>• AI analyzes correlations between DeFi protocols</p>
                    <p>• Detects potential cascade failures before they occur</p>
                    <p>• Coordinates emergency responses across protocols</p>
                    <p>• Maintains system-wide stability through AI cooperation</p>
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-orange-800 text-sm mb-1">Regulatory Compliance AI</p>
                  <div className="text-xs text-orange-600 space-y-1">
                    <p>• Automatically adapt to new regulations</p>
                    <p>• Generate compliance reports in real-time</p>
                    <p>• Predict regulatory changes and prepare accordingly</p>
                    <p>• Maintain compliance across jurisdictions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">Challenges & Risks of AI-Native Finance</h4>
          
          <div className="bg-red-50 border-l-4 border-red-400 rounded-lg p-4">
            <h5 className="font-semibold text-red-800 mb-3">Critical Risk Considerations</h5>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-red-800 text-sm mb-1">Technical Risks</p>
                <ul className="text-xs text-red-600 space-y-1">
                  <li>• <strong>Black Box Opacity:</strong> Unexplainable AI decisions</li>
                  <li>• <strong>Model Bias:</strong> Training data limitations</li>
                  <li>• <strong>Flash Crashes:</strong> AI-driven market manipulation</li>
                  <li>• <strong>Oracle Manipulation:</strong> AI vs AI adversarial attacks</li>
                  <li>• <strong>Integration Bugs:</strong> Smart contract + AI failures</li>
                </ul>
              </div>
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-red-800 text-sm mb-1">Systemic Risks</p>
                <ul className="text-xs text-red-600 space-y-1">
                  <li>• <strong>AI Homogeneity:</strong> Everyone using same models</li>
                  <li>• <strong>Feedback Loops:</strong> AI models affecting their own inputs</li>
                  <li>• <strong>Governance Attacks:</strong> Exploiting AI voting patterns</li>
                  <li>• <strong>Data Poisoning:</strong> Malicious training data</li>
                  <li>• <strong>Regulatory Uncertainty:</strong> AI liability questions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3">The Ultimate DeFAI Vision</h4>
          <div className="text-sm text-gray-700 space-y-3">
            <p>
              <strong>Today:</strong> AI enhances existing DeFi protocols with better predictions, 
              automated strategies, and risk management.
            </p>
            <p>
              <strong>Tomorrow:</strong> Fully autonomous financial ecosystems where AI agents create, 
              manage, and evolve financial products with superhuman efficiency and 24/7 availability.
            </p>
            <div className="bg-blue-50 p-3 rounded border mt-3">
              <p className="text-blue-700 text-sm">
                <strong>Result:</strong> A financial system that's more efficient, accessible, and 
                intelligent than anything possible with human-only management—but requiring new 
                frameworks for transparency, accountability, and risk management.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  })

  const progress = (completedSections.size / sections.length) * 100

  const quizQuestions = [
    {
      id: 'ai-protocol-automation',
      question: 'How do AI-enhanced DeFi protocols differ from traditional DeFi protocols?',
      options: [
        'They use faster blockchain networks',
        'They dynamically adjust parameters based on real-time ML analysis instead of fixed governance settings',
        'They eliminate all smart contracts',
        'They only work with stablecoins'
      ],
      correctAnswer: 1,
      explanation: 'AI-enhanced DeFi protocols use machine learning to continuously optimize parameters like interest rates and fees in real-time, rather than relying on static settings or slow governance processes.'
    },
    {
      id: 'numerai-model',
      question: 'What makes Numerai unique in the AI trading space?',
      options: [
        'It only trades Bitcoin',
        'It crowdsources ML models from 20,000+ data scientists who stake tokens on their predictions',
        'It uses quantum computing',
        'It eliminates all trading fees'
      ],
      correctAnswer: 1,
      explanation: 'Numerai runs the world\'s largest data science tournament where over 20,000 data scientists compete by staking NMR tokens on their ML model predictions, creating a unique crowdsourced intelligence system.'
    },
    {
      id: 'ai-yield-optimization',
      question: 'How does AI improve yield farming compared to manual strategies?',
      options: [
        'It eliminates all risks completely',
        'It automatically monitors 1000+ opportunities, optimizes gas timing, and predicts impermanent loss risks',
        'It guarantees 100% returns',
        'It only works on Ethereum'
      ],
      correctAnswer: 1,
      explanation: 'AI yield optimization provides 15-30% higher APY by continuously monitoring thousands of opportunities, timing transactions for optimal gas costs, and using ML models to predict and protect against impermanent loss.'
    },
    {
      id: 'ai-risk-assessment',
      question: 'What types of data do AI risk assessment systems analyze for DeFi?',
      options: [
        'Only price charts',
        'On-chain data, news sentiment, social signals, and technical indicators combined',
        'Just government reports',
        'Only trading volume'
      ],
      correctAnswer: 1,
      explanation: 'Modern AI risk systems use multi-modal analysis combining on-chain transaction data, news sentiment analysis, social media signals, and traditional technical indicators for comprehensive market intelligence.'
    },
    {
      id: 'future-ai-finance',
      question: 'What is the ultimate vision for AI-native financial protocols?',
      options: [
        'Replace all human traders with robots',
        'Fully autonomous financial ecosystems where AI agents negotiate, trade, and manage risk independently',
        'Make all cryptocurrencies use the same AI',
        'Eliminate blockchain technology'
      ],
      correctAnswer: 1,
      explanation: 'The future vision is autonomous financial ecosystems where AI agents can independently negotiate loans, execute complex strategies, and manage risk—creating a new economy of intelligent financial protocols.'
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
            title="DeFAI Quiz"
            questions={quizQuestions}
            onComplete={handleQuizComplete}
          />
          
          {quizCompleted && (
            <div className="mt-6">
              <Link 
                href="/education/security"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Continue to Security & Risk Management
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
              <div className="p-3 bg-purple-100 rounded-lg">
                <Bot className="w-8 h-8 text-purple-600" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">DeFAI: AI-Powered Decentralized Finance</h1>
                <p className="text-gray-600 mb-4">
                  Explore the cutting-edge intersection of artificial intelligence and DeFi. Learn about 
                  AI trading protocols like Numerai and dHEDGE, autonomous yield optimization, predictive 
                  analytics, and the future of AI-native financial ecosystems.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    26 min read
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
            
            {/* Learning Objectives */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-800 mb-2">What You'll Learn</h3>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• How AI transforms DeFi through dynamic parameter optimization and real-time decisions</li>
                <li>• Live AI trading protocols: Numerai, dHEDGE, Enzyme, and their performance metrics</li>
                <li>• Autonomous yield optimization using ML models and personalized DeFi strategies</li>
                <li>• Predictive analytics for market forecasting, risk assessment, and liquidity prediction</li>
                <li>• AI-powered portfolio management and multi-modal market intelligence systems</li>
                <li>• Future vision: AI-native protocols, agent economies, and autonomous financial ecosystems</li>
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
                  Complete the DeFAI quiz to demonstrate your understanding of AI-powered finance
                </p>
              </div>
              <div className="text-sm text-gray-500">
                {completedSections.size}/{sections.length} sections completed
              </div>
            </div>
            
            {completedSections.size === sections.length ? (
              <button
                onClick={() => setShowQuiz(true)}
                className="w-full sm:w-auto px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                Start Quiz
              </button>
            ) : (
              <div className="text-sm text-gray-500 bg-gray-50 rounded-lg p-4">
                Complete all sections above to unlock the quiz
              </div>
            )}
          </div>

          {/* Completion */}
          {quizCompleted && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 md:p-6">
              <h3 className="font-semibold text-purple-800 mb-2">🎉 Outstanding Achievement!</h3>
              <p className="text-purple-700 text-sm mb-4">
                You've mastered the cutting-edge intersection of AI and DeFi! You now understand how 
                artificial intelligence is revolutionizing decentralized finance through autonomous 
                protocols, predictive analytics, and intelligent optimization.
              </p>
              <Link 
                href="/education/security"
                className="inline-flex items-center text-purple-700 hover:text-purple-800 font-medium"
              >
                Continue to Security & Risk Management
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 