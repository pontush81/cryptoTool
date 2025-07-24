'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, Building, Calendar, User, TrendingUp, ArrowRight, Shield, Globe, DollarSign, Zap, AlertTriangle, Clock, Target } from 'lucide-react'
import QuizComponent from '../../../components/QuizComponent'

interface Section {
  id: string
  title: string
  content: React.ReactNode
  completed: boolean
}

export default function DeFiFundamentalsPage() {
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
      if (!completedModules.includes('defi-fundamentals')) {
        completedModules.push('defi-fundamentals')
        localStorage.setItem('completedEducationModules', JSON.stringify(completedModules))
      }
      
      // Set mastery level based on score
      const masteryLevels = JSON.parse(localStorage.getItem('educationMasteryLevels') || '{}')
      masteryLevels['defi-fundamentals'] = score >= 90 ? 'excellent' : score >= 80 ? 'good' : 'basic'
      localStorage.setItem('educationMasteryLevels', JSON.stringify(masteryLevels))
    }
  }

  const sections: Section[] = [
    {
      id: 'what-is-defi',
      title: 'What is DeFi? Banking Without Banks',
      completed: completedSections.has('what-is-defi'),
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
            <p className="text-lg leading-relaxed text-gray-700">
              <strong>Decentralized Finance (DeFi)</strong> is a system where traditional financial services—lending, 
              borrowing, trading, insurance—are recreated using blockchain technology and smart contracts, 
              removing the need for banks, brokers, and other financial intermediaries.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">How DeFi Works</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Building className="w-5 h-5 text-red-500 mr-2" />
                  <h5 className="font-semibold text-red-800">Traditional Banking</h5>
                </div>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>Centralized:</strong> Banks control everything</p>
                  <p><strong>Paperwork:</strong> Applications, credit checks, wait times</p>
                  <p><strong>Limited hours:</strong> 9-5, weekdays only</p>
                  <p><strong>Geographic limits:</strong> Must be in served regions</p>
                  <p><strong>Fees:</strong> Hidden costs, account maintenance</p>
                </div>
                <div className="mt-3 p-2 bg-red-50 rounded text-xs">
                  <strong>Example:</strong> Getting a loan takes weeks, requires extensive documentation, 
                  and banks can deny you for arbitrary reasons
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Zap className="w-5 h-5 text-green-500 mr-2" />
                  <h5 className="font-semibold text-green-800">DeFi Alternative</h5>
                </div>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>Decentralized:</strong> Smart contracts handle everything</p>
                  <p><strong>Permissionless:</strong> Anyone with a wallet can participate</p>
                  <p><strong>24/7/365:</strong> Never closes, always available</p>
                  <p><strong>Global:</strong> Same access worldwide</p>
                  <p><strong>Transparent:</strong> All transactions visible on blockchain</p>
                </div>
                <div className="mt-3 p-2 bg-green-50 rounded text-xs">
                  <strong>Example:</strong> Borrow $10,000 in stablecoins against your ETH collateral 
                  in under 5 minutes, from anywhere in the world
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-semibold text-purple-800 mb-2">🏦 The DeFi Ecosystem by Numbers</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-purple-800">$100+ Billion</p>
                <p className="text-purple-600 text-xs">Total Value Locked (TVL) in DeFi protocols</p>
              </div>
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-purple-800">3,000+</p>
                <p className="text-purple-600 text-xs">Active DeFi protocols across all blockchains</p>
              </div>
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-purple-800">4+ Million</p>
                <p className="text-purple-600 text-xs">Unique addresses using DeFi protocols monthly</p>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">💡 Real-World DeFi Success Story</h4>
            <p className="text-yellow-700 text-sm">
              <strong>Maria, freelancer in Argentina:</strong> With high inflation and currency controls, 
              Maria can't easily save in dollars through traditional banks. Using DeFi, she:
              <br/><br/>
              1. Receives payments in USDC stablecoins<br/>
              2. Earns 5% yield by supplying USDC to Aave lending protocol<br/>
              3. Borrows against her savings when needed, instantly<br/>
              4. All without ever interacting with a traditional bank
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'defi-primitives',
      title: 'DeFi Building Blocks: Lending, Borrowing, Trading, Staking',
      completed: completedSections.has('defi-primitives'),
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">The Four Core DeFi Primitives</h4>
            
            <div className="space-y-4">
              <div className="bg-green-50 border-l-4 border-green-400 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <DollarSign className="w-5 h-5 text-green-500 mr-2" />
                  <h5 className="font-semibold text-green-800">1. Lending & Borrowing</h5>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Deposit your crypto to earn interest, or borrow against your holdings
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-green-800 text-sm mb-1">Aave Protocol</p>
                    <ul className="text-xs text-green-600 space-y-1">
                      <li>• Deposit USDC, earn 3-8% APY</li>
                      <li>• Borrow up to 80% of collateral value</li>
                      <li>• Flash loans for advanced strategies</li>
                      <li>• $10+ billion total value locked</li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-green-800 text-sm mb-1">Compound Finance</p>
                    <ul className="text-xs text-green-600 space-y-1">
                      <li>• Algorithmically adjusted interest rates</li>
                      <li>• Earn COMP governance tokens</li>
                      <li>• Supply and borrow 20+ assets</li>
                      <li>• Transparent, audited smart contracts</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-3 p-3 bg-green-100 rounded">
                  <p className="text-xs text-green-800">
                    <strong>Use case:</strong> You have $50,000 in ETH but need $20,000 cash for a business opportunity. 
                    Instead of selling your ETH (and paying taxes), you deposit it as collateral on Aave and 
                    borrow $20,000 in USDC. Your ETH keeps potential upside while you access liquidity.
                  </p>
                </div>
              </div>
              
              <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <TrendingUp className="w-5 h-5 text-blue-500 mr-2" />
                  <h5 className="font-semibold text-blue-800">2. Decentralized Trading</h5>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Swap tokens directly from your wallet without centralized exchanges
                </p>
                
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-blue-800 text-sm mb-2">How DEX Trading Works</p>
                  <div className="text-xs text-blue-600 space-y-1">
                    <p>1. <strong>Connect wallet</strong> to Uniswap or SushiSwap</p>
                    <p>2. <strong>Select tokens</strong> to swap (e.g., ETH → USDC)</p>
                    <p>3. <strong>Smart contract executes</strong> trade automatically</p>
                    <p>4. <strong>Tokens appear</strong> in your wallet instantly</p>
                  </div>
                </div>
                
                <div className="mt-3 p-3 bg-blue-100 rounded">
                  <p className="text-xs text-blue-800">
                    <strong>Advantage:</strong> No KYC, no account signup, no deposit/withdrawal delays. 
                    You maintain custody of your funds throughout the entire process.
                  </p>
                </div>
              </div>
              
              <div className="bg-purple-50 border-l-4 border-purple-400 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Shield className="w-5 h-5 text-purple-500 mr-2" />
                  <h5 className="font-semibold text-purple-800">3. Staking & Yield Farming</h5>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Put your crypto to work earning rewards by securing networks or providing liquidity
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-purple-800 text-sm mb-1">Staking (Lido)</p>
                    <ul className="text-xs text-purple-600 space-y-1">
                      <li>• Stake ETH, earn ~4% APR</li>
                      <li>• Get stETH tokens (liquid staking)</li>
                      <li>• Help secure Ethereum network</li>
                      <li>• No 32 ETH minimum required</li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-purple-800 text-sm mb-1">Liquidity Mining</p>
                    <ul className="text-xs text-purple-600 space-y-1">
                      <li>• Provide tokens to DEX pools</li>
                      <li>• Earn trading fees + governance tokens</li>
                      <li>• Help create liquid markets</li>
                      <li>• Higher risk, higher potential rewards</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-orange-50 border-l-4 border-orange-400 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Target className="w-5 h-5 text-orange-500 mr-2" />
                  <h5 className="font-semibold text-orange-800">4. Derivatives & Insurance</h5>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Advanced financial products for hedging, speculation, and risk management
                </p>
                
                <div className="text-xs text-orange-600 space-y-2">
                  <p><strong>Synthetix:</strong> Create synthetic assets that track real-world prices (stocks, commodities)</p>
                  <p><strong>dYdX:</strong> Perpetual futures trading with up to 20x leverage</p>
                  <p><strong>Nexus Mutual:</strong> Decentralized insurance against smart contract failures</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'dexs-and-amms',
      title: 'DEXs and AMMs: How Decentralized Trading Works',
      completed: completedSections.has('dexs-and-amms'),
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
            <p className="text-lg leading-relaxed text-gray-700">
              Traditional exchanges use order books where buyers and sellers place orders. 
              <strong>Automated Market Makers (AMMs)</strong> revolutionized this by using mathematical formulas 
              and liquidity pools to automatically set prices and execute trades.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">How AMMs Work</h4>
            
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h5 className="font-semibold text-blue-800 mb-3">The Uniswap Model</h5>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="bg-blue-50 p-3 rounded">
                    <p className="font-semibold text-blue-800 text-sm">1. Liquidity Pools</p>
                    <p className="text-xs text-blue-600">
                      Users deposit equal values of two tokens (e.g., ETH + USDC) into a smart contract pool
                    </p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded">
                    <p className="font-semibold text-blue-800 text-sm">2. Automatic Pricing</p>
                    <p className="text-xs text-blue-600">
                      Formula x * y = k maintains constant product, automatically adjusting prices based on supply
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-blue-50 p-3 rounded">
                    <p className="font-semibold text-blue-800 text-sm">3. Trading Fees</p>
                    <p className="text-xs text-blue-600">
                      Each trade pays 0.3% fee, distributed proportionally to liquidity providers
                    </p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded">
                    <p className="font-semibold text-blue-800 text-sm">4. Instant Settlement</p>
                    <p className="text-xs text-blue-600">
                      No waiting for order matching - trades execute immediately against the pool
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Major DEX Protocols</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border-l-4 border-pink-400 rounded-lg p-4">
                  <h5 className="font-semibold text-pink-800 mb-2">Uniswap V3</h5>
                  <div className="space-y-2 text-xs">
                    <p className="text-gray-700"><strong>Innovation:</strong> Concentrated liquidity - LPs can focus on specific price ranges</p>
                    <p className="text-gray-700"><strong>Volume:</strong> $1+ trillion in total trading volume</p>
                    <p className="text-gray-700"><strong>Tokens:</strong> 4,000+ listed automatically by anyone</p>
                    <p className="text-gray-700"><strong>Chains:</strong> Ethereum, Polygon, Arbitrum, Optimism</p>
                  </div>
                </div>
                
                <div className="bg-white border-l-4 border-orange-400 rounded-lg p-4">
                  <h5 className="font-semibold text-orange-800 mb-2">SushiSwap</h5>
                  <div className="space-y-2 text-xs">
                    <p className="text-gray-700"><strong>Features:</strong> AMM + yield farming + governance</p>
                    <p className="text-gray-700"><strong>Multi-chain:</strong> 13+ blockchains supported</p>
                    <p className="text-gray-700"><strong>Community:</strong> Fully community-owned and governed</p>
                    <p className="text-gray-700"><strong>Innovation:</strong> BentoBox lending integration</p>
                  </div>
                </div>
                
                <div className="bg-white border-l-4 border-green-400 rounded-lg p-4">
                  <h5 className="font-semibold text-green-800 mb-2">Curve Finance</h5>
                  <div className="space-y-2 text-xs">
                    <p className="text-gray-700"><strong>Specialty:</strong> Optimized for stablecoin swaps</p>
                    <p className="text-gray-700"><strong>Low slippage:</strong> Minimal price impact on large trades</p>
                    <p className="text-gray-700"><strong>CRV rewards:</strong> Governance token with vote-locking mechanism</p>
                    <p className="text-gray-700"><strong>TVL:</strong> $3+ billion in liquidity pools</p>
                  </div>
                </div>
                
                <div className="bg-white border-l-4 border-purple-400 rounded-lg p-4">
                  <h5 className="font-semibold text-purple-800 mb-2">PancakeSwap</h5>
                  <div className="space-y-2 text-xs">
                    <p className="text-gray-700"><strong>Network:</strong> Leading DEX on BNB Smart Chain</p>
                    <p className="text-gray-700"><strong>Low fees:</strong> ~$0.20 per transaction vs $20+ on Ethereum</p>
                    <p className="text-gray-700"><strong>Gamification:</strong> NFTs, lotteries, prediction markets</p>
                    <p className="text-gray-700"><strong>CAKE rewards:</strong> Native token with multiple utilities</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-2">💰 Liquidity Provider Example</h4>
            <p className="text-green-700 text-sm mb-2">
              <strong>Sarah provides liquidity to ETH/USDC pool on Uniswap:</strong>
            </p>
            <div className="text-sm text-green-700 space-y-1">
              <p>• Deposits $10,000 worth: $5,000 ETH + $5,000 USDC</p>
              <p>• Receives LP tokens representing her share of the pool</p>
              <p>• Earns 0.3% fee on all ETH/USDC trades (≈ $2,000-8,000 annually)</p>
              <p>• Can withdraw anytime, getting back ETH + USDC + earned fees</p>
              <p>• Risk: "Impermanent loss" if token prices diverge significantly</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'smart-contract-automation',
      title: 'Smart Contract Automation: Code as Law',
      completed: completedSections.has('smart-contract-automation'),
      content: (
        <div className="space-y-6">
          <div className="bg-purple-50 border-l-4 border-purple-400 p-6 rounded-r-lg">
            <p className="text-lg leading-relaxed text-gray-700">
              Smart contracts are self-executing programs that run on blockchain networks. 
              They automatically enforce rules and execute financial operations without human intervention, 
              making them the backbone of all DeFi protocols.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">How Smart Contracts Replace Traditional Finance</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Building className="w-5 h-5 text-red-500 mr-2" />
                  <h5 className="font-semibold text-red-800">Traditional Process</h5>
                </div>
                <div className="space-y-3">
                  <div className="bg-red-50 p-3 rounded">
                    <p className="font-semibold text-red-800 text-sm">Getting a Loan</p>
                    <ul className="text-xs text-red-600 mt-1 space-y-1">
                      <li>• Fill out application forms</li>
                      <li>• Submit documents, wait for review</li>
                      <li>• Credit check and approval process</li>
                      <li>• Legal contracts and signatures</li>
                      <li>• Manual disbursement by bank staff</li>
                      <li>• Human monitoring of payments</li>
                    </ul>
                    <p className="text-xs text-red-600 mt-2"><strong>Timeline:</strong> Days to weeks</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Zap className="w-5 h-5 text-green-500 mr-2" />
                  <h5 className="font-semibold text-green-800">DeFi Smart Contract</h5>
                </div>
                <div className="space-y-3">
                  <div className="bg-green-50 p-3 rounded">
                    <p className="font-semibold text-green-800 text-sm">Getting a Loan</p>
                    <ul className="text-xs text-green-600 mt-1 space-y-1">
                      <li>• Connect wallet to protocol</li>
                      <li>• Deposit collateral (e.g., ETH)</li>
                      <li>• Select loan amount (up to limit)</li>
                      <li>• Approve transaction</li>
                      <li>• Instant loan disbursement</li>
                      <li>• Automated liquidation if needed</li>
                    </ul>
                    <p className="text-xs text-green-600 mt-2"><strong>Timeline:</strong> Under 5 minutes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Smart Contract Examples in DeFi</h4>
            
            <div className="space-y-4">
              <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-4">
                <h5 className="font-semibold text-blue-800 mb-3">Aave Lending Protocol</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-blue-800 text-sm mb-2">Automated Interest Rates</p>
                    <p className="text-xs text-blue-600">
                      Smart contract automatically adjusts borrowing and lending rates based on supply and demand. 
                      High utilization = higher rates to incentivize more deposits.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">  
                    <p className="font-semibold text-blue-800 text-sm mb-2">Instant Liquidations</p>
                    <p className="text-xs text-blue-600">
                      If collateral value drops below threshold (e.g., 150%), smart contract automatically 
                      liquidates position to protect lenders.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-orange-50 border-l-4 border-orange-400 rounded-lg p-4">
                <h5 className="font-semibold text-orange-800 mb-3">MakerDAO Stability System</h5>
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-orange-800 text-sm mb-2">DAI Stablecoin Maintenance</p>
                  <p className="text-xs text-orange-600 mb-2">
                    Complex system of smart contracts automatically maintains DAI's $1.00 peg:
                  </p>
                  <ul className="text-xs text-orange-600 space-y-1">
                    <li>• Monitors collateral ratios across all vaults</li>
                    <li>• Adjusts stability fees to control DAI supply</li>
                    <li>• Triggers emergency shutdown if needed</li>
                    <li>• Auctions liquidated collateral automatically</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">⚡ The Power of Composability</h4>
            <p className="text-yellow-700 text-sm mb-2">
              <strong>"Money Legos":</strong> DeFi protocols can interact with each other automatically
            </p>
            <div className="bg-white p-3 rounded border text-xs text-yellow-700">
              <p className="font-semibold mb-1">Complex Strategy Example:</p>
              <p>1. Deposit ETH as collateral on Aave</p>
              <p>2. Borrow USDC at low interest rate</p>
              <p>3. Swap USDC for ETH on Uniswap</p>
              <p>4. Deposit new ETH back to Aave</p>
              <p>5. Repeat to increase position size</p>
              <p className="mt-2 font-semibold">All of this can be automated in a single transaction using smart contracts!</p>
            </div>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Key Benefits of Smart Contract Automation</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>No human error:</strong> Code executes exactly as programmed</li>
                  <li>• <strong>24/7 operation:</strong> Never sleeps, never takes breaks</li>
                  <li>• <strong>Transparent:</strong> Anyone can audit the code</li>
                  <li>• <strong>Permissionless:</strong> No gatekeepers or discrimination</li>
                </ul>
              </div>
              <div>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Instant settlement:</strong> No waiting for human approval</li>
                  <li>• <strong>Global access:</strong> Same rules apply worldwide</li>
                  <li>• <strong>Cost efficient:</strong> No salaries for processing staff</li>
                  <li>• <strong>Composable:</strong> Protocols can build on each other</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'risks-and-failures',
      title: 'Risks and What Can Go Wrong',
      completed: completedSections.has('risks-and-failures'),
      content: (
        <div className="space-y-6">
          <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
            <p className="text-lg leading-relaxed text-gray-700">
              DeFi offers incredible opportunities but comes with significant risks. Understanding what can go wrong 
              helps you make informed decisions and protect your funds. Every major DeFi protocol has experienced 
              some form of exploit or failure.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Major Risk Categories with Real Examples</h4>
            
            <div className="space-y-4">
              <div className="bg-white border-l-4 border-red-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                  <h5 className="font-semibold text-red-800">Smart Contract Bugs & Exploits</h5>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Code bugs can be exploited by attackers to drain funds from protocols
                </p>
                
                <div className="space-y-3">
                  <div className="bg-red-50 p-3 rounded border">
                    <p className="font-semibold text-red-800 text-sm">bZx Protocol (2020)</p>
                    <p className="text-xs text-red-600 mb-1">
                      <strong>Loss:</strong> $8+ million across multiple attacks
                    </p>
                    <p className="text-xs text-gray-600">
                      Exploited flash loan vulnerabilities and oracle price manipulation. 
                      Attackers borrowed large amounts, manipulated prices, and profited from price differences.
                    </p>
                  </div>
                  
                  <div className="bg-red-50 p-3 rounded border">
                    <p className="font-semibold text-red-800 text-sm">Poly Network (2021)</p>
                    <p className="text-xs text-red-600 mb-1">
                      <strong>Loss:</strong> $611 million (largest DeFi hack ever)
                    </p>
                    <p className="text-xs text-gray-600">
                      Cross-chain bridge exploit allowed attacker to mint unlimited tokens on different chains. 
                      Interestingly, the hacker eventually returned the funds claiming it was to expose the vulnerability.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border-l-4 border-orange-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Clock className="w-5 h-5 text-orange-500 mr-2" />
                  <h5 className="font-semibold text-orange-800">Liquidity & Market Risks</h5>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  During market stress, DeFi systems can malfunction or become illiquid
                </p>
                
                <div className="space-y-3">
                  <div className="bg-orange-50 p-3 rounded border">
                    <p className="font-semibold text-orange-800 text-sm">Black Thursday - MakerDAO (March 2020)</p>
                    <p className="text-xs text-orange-600 mb-1">
                      <strong>Impact:</strong> $5.67 million in bad debt created
                    </p>
                    <p className="text-xs text-gray-600">
                      ETH crashed 50% in one day, Ethereum network congested. Liquidation auctions failed - 
                      some vaults were liquidated for $0 DAI, creating "bad debt" in the system.
                    </p>
                  </div>
                  
                  <div className="bg-orange-50 p-3 rounded border">
                    <p className="font-semibold text-orange-800 text-sm">Impermanent Loss Reality</p>
                    <p className="text-xs text-orange-600 mb-1">
                      <strong>Risk:</strong> Can lose money even when both tokens go up
                    </p>
                    <p className="text-xs text-gray-600">
                      If you provided ETH/USDC liquidity and ETH doubled, you'd have less ETH than if you just held. 
                      The "impermanent" loss becomes permanent when you withdraw.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border-l-4 border-purple-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Target className="w-5 h-5 text-purple-500 mr-2" />
                  <h5 className="font-semibold text-purple-800">Oracle Manipulation & Flash Loan Attacks</h5>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Attackers manipulate price feeds or use flash loans for complex exploits
                </p>
                
                <div className="space-y-3">
                  <div className="bg-purple-50 p-3 rounded border">
                    <p className="font-semibold text-purple-800 text-sm">Synthetix (2019)</p>
                    <p className="text-xs text-purple-600 mb-1">
                      <strong>Issue:</strong> Korean Won (sKRW) oracle manipulation
                    </p>
                    <p className="text-xs text-gray-600">
                      Trading bot exploited incorrect exchange rate data, generating millions in synthetic assets. 
                      Protocol had to implement emergency pausing mechanisms.
                    </p>
                  </div>
                  
                  <div className="bg-purple-50 p-3 rounded border">
                    <p className="font-semibold text-purple-800 text-sm">Flash Loan Attack Pattern</p>
                    <p className="text-xs text-gray-600">
                      1. Borrow millions instantly (flash loan)<br/>
                      2. Manipulate token prices on small DEXs<br/>
                      3. Exploit price differences on other protocols<br/>
                      4. Repay loan + profit, all in one transaction
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border-l-4 border-gray-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Shield className="w-5 h-5 text-gray-500 mr-2" />
                  <h5 className="font-semibold text-gray-800">Regulatory & Governance Risks</h5>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Government actions or bad governance decisions can impact protocols
                </p>
                
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded border">
                    <p className="font-semibold text-gray-800 text-sm">Tornado Cash Sanctions (2022)</p>
                    <p className="text-xs text-gray-600">
                      US Treasury sanctioned the mixing protocol, affecting all users including innocent ones. 
                      Shows how regulatory actions can impact DeFi users retroactively.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded border">
                    <p className="font-semibold text-gray-800 text-sm">Governance Token Attacks</p>
                    <p className="text-xs text-gray-600">
                      If someone accumulates enough governance tokens, they can potentially vote to 
                      change protocol rules in their favor or drain the treasury.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">🛡️ Risk Management Strategies</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-semibold text-blue-800 mb-2">Before You Invest:</h5>
                <ul className="space-y-1 text-blue-700">
                  <li>• Research protocol history and team</li>
                  <li>• Check if smart contracts are audited</li>
                  <li>• Start with small amounts to test</li>
                  <li>• Understand the specific risks</li>
                  <li>• Never risk more than you can lose</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-blue-800 mb-2">Portfolio Protection:</h5>
                <ul className="space-y-1 text-blue-700">
                  <li>• Diversify across multiple protocols</li>
                  <li>• Use established protocols with long track records</li>
                  <li>• Consider insurance protocols (Nexus Mutual)</li>
                  <li>• Monitor positions regularly</li>
                  <li>• Keep emergency funds in stablecoins</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">⚖️ Risk vs Reward Reality</h4>
            <p className="text-yellow-700 text-sm">
              Despite the risks, DeFi continues to grow because many users successfully earn yields that 
              are impossible in traditional finance. The key is understanding the risks, starting small, 
              and never investing more than you can afford to lose. Many of the biggest failures led to 
              improvements that made DeFi more robust.
            </p>
          </div>
        </div>
      )
    }
  ]

  const progress = (completedSections.size / sections.length) * 100

  const quizQuestions = [
    {
      id: 'defi-definition',
      question: 'What is the main difference between DeFi and traditional banking?',
      options: [
        'DeFi is only for wealthy investors',
        'DeFi uses smart contracts instead of banks and intermediaries',
        'DeFi is completely risk-free',
        'DeFi only works with Bitcoin'
      ],
      correctAnswer: 1,
      explanation: 'DeFi recreates financial services using blockchain smart contracts, eliminating the need for traditional banks, brokers, and other financial intermediaries.'
    },
    {
      id: 'amm-concept',
      question: 'How do Automated Market Makers (AMMs) like Uniswap differ from traditional exchanges?',
      options: [
        'They use order books like stock exchanges',
        'They require KYC verification for all users',
        'They use mathematical formulas and liquidity pools instead of order books',
        'They only allow institutional investors'
      ],
      correctAnswer: 2,
      explanation: 'AMMs use mathematical formulas (like x * y = k) and liquidity pools to automatically set prices and execute trades, rather than matching buy and sell orders.'
    },
    {
      id: 'smart-contract-benefits',
      question: 'What is a key advantage of smart contract automation in DeFi?',
      options: [
        'Smart contracts guarantee profits',
        'They operate 24/7 without human intervention and remove counterparty risk',
        'They eliminate all financial risks',
        'They can only be used by banks'
      ],
      correctAnswer: 1,
      explanation: 'Smart contracts execute automatically according to their code, operating continuously without human intervention and reducing the need to trust intermediaries.'
    },
    {
      id: 'defi-risks',
      question: 'What was the main cause of the "Black Thursday" incident at MakerDAO in March 2020?',
      options: [
        'A government ban on cryptocurrency',
        'ETH price crashed 50% and network congestion prevented proper liquidations',
        'The protocol was hacked by criminals',
        'Users withdrew all their funds at once'
      ],
      correctAnswer: 1,
      explanation: 'Black Thursday occurred when ETH crashed 50% in one day and Ethereum network congestion prevented liquidation auctions from working properly, resulting in bad debt.'
    },
    {
      id: 'liquidity-providing',
      question: 'What is "impermanent loss" in the context of providing liquidity to DEXs?',
      options: [
        'A temporary website outage',
        'When you lose money compared to simply holding the tokens instead of providing liquidity',
        'A type of smart contract bug',
        'When the DEX charges high fees'
      ],
      correctAnswer: 1,
      explanation: 'Impermanent loss occurs when the price ratio of tokens in a liquidity pool changes, resulting in fewer total tokens than if you had simply held them separately.'
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
            title="DeFi Fundamentals Quiz"
            questions={quizQuestions}
            onComplete={handleQuizComplete}
          />
          
          {quizCompleted && (
            <div className="mt-6">
              <Link 
                href="/education/real-world-assets"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Continue to Real World Assets
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
                <Building className="w-8 h-8 text-blue-600" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">DeFi Fundamentals: Banking Without Banks</h1>
                <p className="text-gray-600 mb-4">
                  Discover how decentralized finance is recreating traditional banking services using smart contracts 
                  and blockchain technology. Learn about lending, borrowing, trading, and yield generation without 
                  intermediaries, plus understand the risks and real-world examples of what can go wrong.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    28 min read
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
                <li>• How DeFi recreates banking services using smart contracts and blockchain</li>
                <li>• Core DeFi primitives: lending, borrowing, decentralized trading, and staking</li>
                <li>• How Automated Market Makers (AMMs) revolutionized cryptocurrency trading</li>
                <li>• Major protocols like Uniswap, Aave, Compound, and MakerDAO</li>
                <li>• Real examples of DeFi failures and how to manage risks</li>
                <li>• Smart contract automation and the power of composable "money legos"</li>
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
                  Take the quiz to demonstrate your DeFi understanding and unlock the next module
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
              <h3 className="font-semibold text-green-800 mb-2">🎉 Outstanding Progress!</h3>
              <p className="text-green-700 text-sm mb-4">
                You now understand how DeFi is revolutionizing finance without banks. 
                Ready to explore how real-world assets are being tokenized and brought onto blockchain?
              </p>
              <Link 
                href="/education/real-world-assets"
                className="inline-flex items-center text-green-700 hover:text-green-800 font-medium"
              >
                Continue to Real World Assets: Tokenizing Everything
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 