'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, Network, Calendar, User, TrendingUp, ArrowRight, Shield, Globe, DollarSign, AlertTriangle, Clock, Zap, Building, Link as LinkIcon, Eye } from 'lucide-react'
import QuizComponent from '../../../components/QuizComponent'

interface Section {
  id: string
  title: string
  content: React.ReactNode
  completed: boolean
}

export default function CrossChainFinancePage() {
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
      if (!completedModules.includes('cross-chain-finance')) {
        completedModules.push('cross-chain-finance')
        localStorage.setItem('completedEducationModules', JSON.stringify(completedModules))
      }
      
      // Set mastery level based on score
      const masteryLevels = JSON.parse(localStorage.getItem('educationMasteryLevels') || '{}')
      masteryLevels['cross-chain-finance'] = score >= 90 ? 'excellent' : score >= 80 ? 'good' : 'basic'
      localStorage.setItem('educationMasteryLevels', JSON.stringify(masteryLevels))
    }
  }

  const sections: Section[] = [
    {
      id: 'interoperability-problem',
      title: 'Why Blockchain Interoperability Matters',
      completed: completedSections.has('interoperability-problem'),
      content: (
        <div className="space-y-6">
          <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
            <p className="text-lg leading-relaxed text-gray-700">
              Most blockchains operate in isolation, creating <strong>liquidity silos</strong> and limiting 
              composability. This fragmentation restricts users and protocols from maximizing value across 
              ecosystems—imagine if you could only send emails within Gmail, not to Yahoo or Outlook users.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">The Fragmentation Problem</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                  <h5 className="font-semibold text-red-800">Isolated Ecosystems</h5>
                </div>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>Ethereum:</strong> High security, expensive transactions</p>
                  <p><strong>Polygon:</strong> Fast & cheap, but separate liquidity</p>
                  <p><strong>Solana:</strong> High performance, different programming model</p>
                  <p><strong>Arbitrum:</strong> Ethereum-compatible L2, isolated rollup state</p>
                  <p><strong>Result:</strong> Users must choose one ecosystem or manage assets across multiple</p>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <DollarSign className="w-5 h-5 text-orange-500 mr-2" />
                  <h5 className="font-semibold text-orange-800">Liquidity Silos</h5>
                </div>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>Split Markets:</strong> Same token trading at different prices</p>
                  <p><strong>Reduced Efficiency:</strong> Lower liquidity per market</p>
                  <p><strong>User Friction:</strong> Complex asset management</p>
                  <p><strong>Limited Arbitrage:</strong> Price differences persist longer</p>
                  <p><strong>Impact:</strong> Higher costs, worse execution for users</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-4">
              <h5 className="font-semibold text-blue-800 mb-3">Real-World Example: USDC Fragmentation</h5>
              <p className="text-sm text-gray-700 mb-3">
                USDC exists natively on multiple chains but can't move freely between them without bridges
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                <div className="bg-white p-2 rounded border">
                  <p className="font-semibold text-blue-800">Ethereum USDC</p>
                  <p className="text-blue-600">$25B+ supply, high fees</p>
                </div>
                <div className="bg-white p-2 rounded border">
                  <p className="font-semibold text-blue-800">Polygon USDC</p>
                  <p className="text-blue-600">$400M+ supply, low fees</p>
                </div>
                <div className="bg-white p-2 rounded border">
                  <p className="font-semibold text-blue-800">Arbitrum USDC</p>
                  <p className="text-blue-600">$2B+ supply, medium fees</p>
                </div>
                <div className="bg-white p-2 rounded border">
                  <p className="font-semibold text-blue-800">Solana USDC</p>
                  <p className="text-blue-600">$3B+ supply, very low fees</p>
                </div>
              </div>
              
              <p className="text-blue-700 text-sm mt-3">
                <strong>Problem:</strong> Can't directly send USDC from Ethereum to Polygon without a bridge
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Why Interoperability is Critical</h4>
            
            <div className="space-y-4">
              <div className="bg-green-50 border-l-4 border-green-400 rounded-lg p-4">
                <h5 className="font-semibold text-green-800 mb-3">For Users</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-green-800 text-sm mb-1">Access Best Features</p>
                    <ul className="text-xs text-green-600 space-y-1">
                      <li>• Use Ethereum's security for large trades</li>
                      <li>• Use Polygon's speed for small transactions</li>
                      <li>• Use Solana's efficiency for high-frequency trading</li>
                      <li>• Switch chains based on optimal conditions</li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-green-800 text-sm mb-1">Unified Experience</p>
                    <ul className="text-xs text-green-600 space-y-1">
                      <li>• Single wallet across all chains</li>
                      <li>• No need to manage multiple assets</li>
                      <li>• Seamless cross-chain transactions</li>
                      <li>• Portfolio aggregation across ecosystems</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 border-l-4 border-purple-400 rounded-lg p-4">
                <h5 className="font-semibold text-purple-800 mb-3">For Protocols & Institutions</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-purple-800 text-sm mb-1">Composability</p>
                    <ul className="text-xs text-purple-600 space-y-1">
                      <li>• Build on best chain for each function</li>
                      <li>• Leverage existing protocols across chains</li>
                      <li>• Create multi-chain financial products</li>
                      <li>• Access deeper aggregated liquidity</li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-purple-800 text-sm mb-1">Institutional Adoption</p>
                    <ul className="text-xs text-purple-600 space-y-1">
                      <li>• CBDCs on different blockchain networks</li>
                      <li>• Cross-border payment settlements</li>
                      <li>• Multi-chain custody solutions</li>
                      <li>• Regulatory compliance across jurisdictions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">📊 Market Scale</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white p-3 rounded border text-center">
                <p className="font-semibold text-yellow-800 text-lg">$100+ Billion</p>
                <p className="text-yellow-600 text-xs">Total value locked across top 10 chains</p>
              </div>
              <div className="bg-white p-3 rounded border text-center">
                <p className="font-semibold text-yellow-800 text-lg">50+ Chains</p>
                <p className="text-yellow-600 text-xs">Active blockchain ecosystems</p>
              </div>
              <div className="bg-white p-3 rounded border text-center">
                <p className="font-semibold text-yellow-800 text-lg">$10+ Billion</p>
                <p className="text-yellow-600 text-xs">Daily cross-chain transaction volume</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'cross-chain-solutions',
      title: 'Types of Cross-Chain Solutions',
      completed: completedSections.has('cross-chain-solutions'),
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">How Blockchains Connect Today</h4>
            
            <div className="space-y-4">
              <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <LinkIcon className="w-5 h-5 text-blue-500 mr-2" />
                  <h5 className="font-semibold text-blue-800">Bridges (Most Common)</h5>
                  <span className="ml-2 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">Lock & Mint</span>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Lock assets on source chain, mint wrapped version on destination chain
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-blue-800 text-sm mb-1">How It Works</p>
                    <div className="text-xs text-blue-600 space-y-1">
                      <p>1. User deposits 100 USDC on Ethereum</p>
                      <p>2. Bridge locks USDC in smart contract</p>
                      <p>3. Bridge mints 100 USDC.e on Polygon</p>
                      <p>4. User receives wrapped USDC on Polygon</p>
                      <p>5. Reverse process to return to Ethereum</p>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-blue-800 text-sm mb-1">Trade-offs</p>
                    <ul className="text-xs text-blue-600 space-y-1">
                      <li>• <strong>Speed:</strong> Minutes to hours</li>
                      <li>• <strong>Cost:</strong> Gas fees on both chains</li>
                      <li>• <strong>Security:</strong> Varies by design</li>
                      <li>• <strong>Trust:</strong> Often requires validators</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Zap className="w-5 h-5 text-green-500 mr-2" />
                  <h5 className="font-semibold text-green-800">Layer 2s & Rollups</h5>
                  <span className="ml-2 bg-green-100 text-green-700 text-xs px-2 py-1 rounded">Native Connection</span>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Built-in connection to main chain with inherit security
                </p>
                
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-green-800 text-sm mb-1">Arbitrum & Optimism (Optimistic Rollups)</p>
                    <div className="text-xs text-green-600 space-y-1">
                      <p>• <strong>Security:</strong> Inherits from Ethereum</p>
                      <p>• <strong>Withdrawal Time:</strong> 7 days (dispute period)</p>
                      <p>• <strong>Cost:</strong> ~90% cheaper than Ethereum</p>
                      <p>• <strong>Use Cases:</strong> DeFi, trading, general applications</p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-green-800 text-sm mb-1">Polygon zkEVM (ZK Rollup)</p>
                    <div className="text-xs text-green-600 space-y-1">
                      <p>• <strong>Security:</strong> Cryptographic proofs</p>
                      <p>• <strong>Withdrawal Time:</strong> ~30 minutes</p>
                      <p>• <strong>Cost:</strong> Very low transaction fees</p>
                      <p>• <strong>Compatibility:</strong> Full Ethereum EVM support</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 border-l-4 border-purple-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Network className="w-5 h-5 text-purple-500 mr-2" />
                  <h5 className="font-semibold text-purple-800">Sidechains</h5>
                  <span className="ml-2 bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded">Independent Security</span>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Separate blockchains with their own consensus, connected via bridges
                </p>
                
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-purple-800 text-sm mb-1">Polygon PoS (Most Popular)</p>
                  <div className="text-xs text-purple-600 space-y-1">
                    <p>• <strong>Consensus:</strong> Proof-of-Stake with 100+ validators</p>
                    <p>• <strong>Transaction Speed:</strong> ~2 seconds</p>
                    <p>• <strong>Cost:</strong> $0.001-0.01 per transaction</p>
                    <p>• <strong>Security Trade-off:</strong> Not as secure as Ethereum mainnet</p>
                    <p>• <strong>Ecosystem:</strong> Aave, Uniswap, Curve, and 37,000+ dApps</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-orange-50 border-l-4 border-orange-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Globe className="w-5 h-5 text-orange-500 mr-2" />
                  <h5 className="font-semibold text-orange-800">Interoperability Protocols</h5>
                  <span className="ml-2 bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded">Messaging Layer</span>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Enable cross-chain messaging and programmable interoperability
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-orange-800 text-sm mb-1">LayerZero</p>
                    <ul className="text-xs text-orange-600 space-y-1">
                      <li>• Omnichain applications (OFT standard)</li>
                      <li>• 60+ supported chains</li>
                      <li>• Ultra-light node architecture</li>
                      <li>• Powers Stargate DEX</li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-orange-800 text-sm mb-1">Chainlink CCIP</p>
                    <ul className="text-xs text-orange-600 space-y-1">
                      <li>• Cross-Chain Interoperability Protocol</li>
                      <li>• Enterprise-grade security</li>
                      <li>• Programmable token transfers</li>
                      <li>• Risk management network</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 border-l-4 border-gray-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Shield className="w-5 h-5 text-gray-500 mr-2" />
                  <h5 className="font-semibold text-gray-800">Atomic Swaps</h5>
                  <span className="ml-2 bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">Peer-to-Peer</span>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Direct peer-to-peer swaps between different chains without intermediaries
                </p>
                
                <div className="bg-white p-3 rounded border">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="font-semibold text-gray-800 mb-1">Advantages:</p>
                      <p className="text-gray-600">No counterparty risk, truly decentralized, no bridge hacking risk</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 mb-1">Limitations:</p>
                      <p className="text-gray-600">Complex UX, limited to direct swaps, mainly Bitcoin ↔ Ethereum</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">🔗 Solution Comparison</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Solution</th>
                    <th className="text-left p-2">Speed</th>
                    <th className="text-left p-2">Security</th>
                    <th className="text-left p-2">Cost</th>
                    <th className="text-left p-2">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2 font-semibold">Bridges</td>
                    <td className="p-2">Minutes-Hours</td>
                    <td className="p-2">Varies</td>
                    <td className="p-2">Medium</td>
                    <td className="p-2">Asset movement</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-semibold">Layer 2s</td>
                    <td className="p-2">Seconds</td>
                    <td className="p-2">High</td>
                    <td className="p-2">Low</td>
                    <td className="p-2">Ethereum scaling</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-semibold">Sidechains</td>
                    <td className="p-2">Seconds</td>
                    <td className="p-2">Medium</td>
                    <td className="p-2">Very Low</td>
                    <td className="p-2">High throughput</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold">Atomic Swaps</td>
                    <td className="p-2">Minutes</td>
                    <td className="p-2">Very High</td>
                    <td className="p-2">Low</td>
                    <td className="p-2">Trustless swaps</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'bridge-protocols',
      title: 'Real Bridge Protocols in Operation',
      completed: completedSections.has('bridge-protocols'),
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Leading Cross-Chain Bridges (2025)</h4>
            
            <div className="space-y-4">
              <div className="bg-white border-l-4 border-blue-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Shield className="w-5 h-5 text-blue-500 mr-2" />
                  <h5 className="font-semibold text-blue-800">Polygon Bridge</h5>
                  <span className="ml-2 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">$2B+ TVL</span>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Official bridge connecting Ethereum and Polygon PoS chain
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-blue-50 p-3 rounded">
                    <p className="font-semibold text-blue-800 text-sm mb-1">Technical Details</p>
                    <ul className="text-xs text-blue-600 space-y-1">
                      <li>• <strong>Mechanism:</strong> Trusted multisig validators</li>
                      <li>• <strong>Deposit Time:</strong> ~7-8 minutes</li>
                      <li>• <strong>Withdrawal Time:</strong> 30 minutes - 3 hours</li>
                      <li>• <strong>Supported Assets:</strong> ETH, USDC, USDT, WBTC, etc.</li>
                      <li>• <strong>Security Model:</strong> ⅔ of validator set consensus</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-3 rounded">
                    <p className="font-semibold text-blue-800 text-sm mb-1">Trade-offs</p>
                    <ul className="text-xs text-blue-600 space-y-1">
                      <li>• ✅ <strong>Fast:</strong> Minutes for deposits</li>
                      <li>• ✅ <strong>Low Cost:</strong> ~$1-5 bridge fee</li>
                      <li>• ✅ <strong>Reliable:</strong> No major hacks</li>
                      <li>• ⚠️ <strong>Trust:</strong> Depends on validator honesty</li>
                      <li>• ❌ <strong>Centralization:</strong> Not fully decentralized</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border-l-4 border-green-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Network className="w-5 h-5 text-green-500 mr-2" />
                  <h5 className="font-semibold text-green-800">Arbitrum Bridge</h5>
                  <span className="ml-2 bg-green-100 text-green-700 text-xs px-2 py-1 rounded">$3B+ TVL</span>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Native rollup bridge with Ethereum-level security
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-green-50 p-3 rounded">
                    <p className="font-semibold text-green-800 text-sm mb-1">Technical Details</p>
                    <ul className="text-xs text-green-600 space-y-1">
                      <li>• <strong>Mechanism:</strong> Optimistic rollup native</li>
                      <li>• <strong>Deposit Time:</strong> ~10-15 minutes</li>
                      <li>• <strong>Withdrawal Time:</strong> 7 days (dispute period)</li>
                      <li>• <strong>Security:</strong> Inherits from Ethereum</li>
                      <li>• <strong>Fast Withdrawals:</strong> Third-party liquidity providers</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-3 rounded">
                    <p className="font-semibold text-green-800 text-sm mb-1">Trade-offs</p>
                    <ul className="text-xs text-green-600 space-y-1">
                      <li>• ✅ <strong>Security:</strong> Ethereum-level guarantees</li>
                      <li>• ✅ <strong>Decentralized:</strong> No trusted validators</li>
                      <li>• ✅ <strong>Native:</strong> Built into rollup protocol</li>
                      <li>• ❌ <strong>Slow Withdrawals:</strong> 7-day wait</li>
                      <li>• ⚠️ <strong>Cost:</strong> Ethereum gas for withdrawals</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border-l-4 border-purple-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Globe className="w-5 h-5 text-purple-500 mr-2" />
                  <h5 className="font-semibold text-purple-800">Wormhole</h5>
                  <span className="ml-2 bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded">Multi-Chain</span>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Cross-chain bridge connecting Ethereum, Solana, Polygon, and 30+ other chains
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-purple-50 p-3 rounded">
                    <p className="font-semibold text-purple-800 text-sm mb-1">Multi-Chain Coverage</p>
                    <ul className="text-xs text-purple-600 space-y-1">
                      <li>• <strong>Ethereum ↔ Solana:</strong> Major route</li>
                      <li>• <strong>BSC, Avalanche, Fantom:</strong> EVM chains</li>
                      <li>• <strong>Terra, Sui, Aptos:</strong> Newer ecosystems</li>
                      <li>• <strong>Guardian Network:</strong> 19 validators</li>
                      <li>• <strong>Volume:</strong> $40+ billion bridged</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 p-3 rounded">
                    <p className="font-semibold text-purple-800 text-sm mb-1">Risk Profile</p>
                    <ul className="text-xs text-purple-600 space-y-1">
                      <li>• ✅ <strong>Coverage:</strong> Most chains supported</li>
                      <li>• ✅ <strong>Speed:</strong> Minutes for most routes</li>
                      <li>• ❌ <strong>History:</strong> $326M hack in 2022</li>
                      <li>• ⚠️ <strong>Complexity:</strong> Many attack vectors</li>
                      <li>• ⚠️ <strong>Governance:</strong> Token-based upgrades</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border-l-4 border-orange-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Zap className="w-5 h-5 text-orange-500 mr-2" />
                  <h5 className="font-semibold text-orange-800">LayerZero (Stargate)</h5>
                  <span className="ml-2 bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded">Omnichain</span>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Omnichain protocol enabling native asset transfers across 60+ chains
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-orange-50 p-3 rounded">
                    <p className="font-semibold text-orange-800 text-sm mb-1">Innovation</p>
                    <ul className="text-xs text-orange-600 space-y-1">
                      <li>• <strong>Omnichain Fungible Tokens (OFT):</strong> Native multi-chain</li>
                      <li>• <strong>Ultra-Light Node:</strong> Efficient verification</li>
                      <li>• <strong>Unified Liquidity:</strong> Single pools across chains</li>
                      <li>• <strong>Delta Algorithm:</strong> Optimal routing</li>
                      <li>• <strong>User Experience:</strong> One-click cross-chain swaps</li>
                    </ul>
                  </div>
                  <div className="bg-orange-50 p-3 rounded">
                    <p className="font-semibold text-orange-800 text-sm mb-1">Recent Developments</p>
                    <ul className="text-xs text-orange-600 space-y-1">
                      <li>• ⚠️ <strong>2024 Incident:</strong> $25M exploit</li>
                      <li>• 🔧 <strong>Security Upgrade:</strong> Enhanced oracle system</li>
                      <li>• 📈 <strong>Adoption:</strong> Growing DeFi integration</li>
                      <li>• 🔗 <strong>Expansion:</strong> Adding more chains</li>
                      <li>• 💼 <strong>Enterprise:</strong> Institutional partnerships</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border-l-4 border-red-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <LinkIcon className="w-5 h-5 text-red-500 mr-2" />
                  <h5 className="font-semibold text-red-800">Chainlink CCIP</h5>
                  <span className="ml-2 bg-red-100 text-red-700 text-xs px-2 py-1 rounded">Enterprise Grade</span>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Cross-Chain Interoperability Protocol with enterprise-grade security
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-red-50 p-3 rounded">
                    <p className="font-semibold text-red-800 text-sm mb-1">Security Features</p>
                    <ul className="text-xs text-red-600 space-y-1">
                      <li>• <strong>Risk Management Network:</strong> Independent monitoring</li>
                      <li>• <strong>Multiple Validation:</strong> Chainlink DONs + external validators</li>
                      <li>• <strong>Rate Limiting:</strong> Automatic circuit breakers</li>
                      <li>• <strong>Time Delays:</strong> Large transaction cooling periods</li>
                      <li>• <strong>Insurance:</strong> Built-in coverage mechanisms</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 p-3 rounded">
                    <p className="font-semibold text-red-800 text-sm mb-1">Current Status</p>
                    <ul className="text-xs text-red-600 space-y-1">
                      <li>• 🚀 <strong>Launch:</strong> Early 2024 mainnet</li>
                      <li>• 🏗️ <strong>Adoption:</strong> Growing DeFi integration</li>
                      <li>• 🔒 <strong>Security:</strong> Conservative approach</li>
                      <li>• 📊 <strong>Monitoring:</strong> Real-time risk assessment</li>
                      <li>• 🏢 <strong>Target:</strong> Institutional users</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Bridge Protocol Comparison</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Protocol</th>
                    <th className="text-left p-2">Chains</th>
                    <th className="text-left p-2">Security Model</th>
                    <th className="text-left p-2">Speed</th>
                    <th className="text-left p-2">TVL/Usage</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2 font-semibold">Polygon Bridge</td>
                    <td className="p-2">ETH ↔ Polygon</td>
                    <td className="p-2">Trusted validators</td>
                    <td className="p-2">7 minutes</td>
                    <td className="p-2">$2B+ TVL</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-semibold">Arbitrum Bridge</td>
                    <td className="p-2">ETH ↔ Arbitrum</td>
                    <td className="p-2">Ethereum security</td>
                    <td className="p-2">15 min / 7 days</td>
                    <td className="p-2">$3B+ TVL</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-semibold">Wormhole</td>
                    <td className="p-2">30+ chains</td>
                    <td className="p-2">Guardian network</td>
                    <td className="p-2">2-15 minutes</td>
                    <td className="p-2">$40B+ volume</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-semibold">LayerZero</td>
                    <td className="p-2">60+ chains</td>
                    <td className="p-2">Oracle + relayer</td>
                    <td className="p-2">1-5 minutes</td>
                    <td className="p-2">$1B+ TVL</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold">Chainlink CCIP</td>
                    <td className="p-2">12+ chains</td>
                    <td className="p-2">Multi-layer validation</td>
                    <td className="p-2">5-20 minutes</td>
                    <td className="p-2">Growing adoption</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'security-risks',
      title: 'Security Risks & Bridge Failures',
      completed: completedSections.has('security-risks'),
      content: (
        <div className="space-y-6">
          <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
            <p className="text-lg leading-relaxed text-gray-700">
              Cross-chain bridges represent the <strong>largest honeypots</strong> in DeFi, holding billions 
              in locked assets. Their complexity and high value make them prime targets for hackers, 
              resulting in over <strong>$2 billion in losses</strong> from bridge exploits since 2021.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Major Bridge Hacks & Lessons</h4>
            
            <div className="space-y-4">
              <div className="bg-white border-l-4 border-red-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                  <h5 className="font-semibold text-red-800">Ronin Bridge (Axie Infinity) - $625M</h5>
                  <span className="ml-2 bg-red-100 text-red-700 text-xs px-2 py-1 rounded">March 2022</span>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Attackers gained control of validator private keys to authorize fraudulent withdrawals
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-red-50 p-3 rounded">
                    <p className="font-semibold text-red-800 text-sm mb-1">What Happened</p>
                    <ul className="text-xs text-red-600 space-y-1">
                      <li>• Attackers compromised 5 of 9 validator keys</li>
                      <li>• Social engineering + spear phishing</li>
                      <li>• Unauthorized $625M ETH/USDC withdrawal</li>
                      <li>• Went undetected for 6 days</li>
                      <li>• No circuit breakers or monitoring alerts</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 p-3 rounded">
                    <p className="font-semibold text-red-800 text-sm mb-1">Lessons Learned</p>
                    <ul className="text-xs text-red-600 space-y-1">
                      <li>• Multisig security is only as strong as key management</li>
                      <li>• Need real-time monitoring and alerts</li>
                      <li>• Social engineering remains major attack vector</li>
                      <li>• Decentralization prevents single points of failure</li>
                      <li>• Regular security audits are insufficient</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border-l-4 border-orange-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <AlertTriangle className="w-5 h-5 text-orange-500 mr-2" />
                  <h5 className="font-semibold text-orange-800">Wormhole Bridge - $326M</h5>
                  <span className="ml-2 bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded">February 2022</span>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Smart contract vulnerability allowed attacker to mint unbacked wrapped ETH on Solana
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-orange-50 p-3 rounded">
                    <p className="font-semibold text-orange-800 text-sm mb-1">Technical Exploit</p>
                    <ul className="text-xs text-orange-600 space-y-1">
                      <li>• Flaw in signature verification logic</li>
                      <li>• Attacker bypassed guardian signature checks</li>
                      <li>• Minted 120k ETH (~$326M) on Solana</li>
                      <li>• Sold for SOL and other tokens</li>
                      <li>• Bridge became insolvent</li>
                    </ul>
                  </div>
                  <div className="bg-orange-50 p-3 rounded">
                    <p className="font-semibold text-orange-800 text-sm mb-1">Recovery & Impact</p>
                    <ul className="text-xs text-orange-600 space-y-1">
                      <li>• Jump Crypto provided $326M bailout</li>
                      <li>• Bridge operations resumed after fixes</li>
                      <li>• Enhanced security protocols implemented</li>
                      <li>• User funds eventually made whole</li>
                      <li>• Highlighted code audit limitations</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border-l-4 border-purple-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <AlertTriangle className="w-5 h-5 text-purple-500 mr-2" />
                  <h5 className="font-semibold text-purple-800">LayerZero (Stargate) - $25M</h5>
                  <span className="ml-2 bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded">2024</span>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Oracle manipulation attack exploiting external data dependency
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-purple-50 p-3 rounded">
                    <p className="font-semibold text-purple-800 text-sm mb-1">Attack Vector</p>
                    <ul className="text-xs text-purple-600 space-y-1">
                      <li>• Exploited oracle dependency weakness</li>
                      <li>• Manipulated external price feeds</li>
                      <li>• Created arbitrage opportunity</li>
                      <li>• Drained liquidity pools</li>
                      <li>• Highlighted centralization risks</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 p-3 rounded">
                    <p className="font-semibold text-purple-800 text-sm mb-1">Protocol Response</p>
                    <ul className="text-xs text-purple-600 space-y-1">
                      <li>• Rapid incident response and pause</li>
                      <li>• Enhanced oracle validation</li>
                      <li>• Multiple oracle source requirements</li>
                      <li>• Circuit breaker implementation</li>
                      <li>• User funds partially recovered</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Common Attack Vectors</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h5 className="font-semibold text-red-800 mb-3">Technical Vulnerabilities</h5>
                <div className="space-y-2">
                  <div className="bg-white p-2 rounded text-xs">
                    <p className="font-semibold text-red-800 mb-1">Smart Contract Bugs</p>
                    <p className="text-red-600">Logic errors, signature verification flaws, reentrancy attacks</p>
                  </div>
                  <div className="bg-white p-2 rounded text-xs">
                    <p className="font-semibold text-red-800 mb-1">Oracle Manipulation</p>
                    <p className="text-red-600">Price feed attacks, data source compromise, timing exploits</p>
                  </div>
                  <div className="bg-white p-2 rounded text-xs">
                    <p className="font-semibold text-red-800 mb-1">Validator Compromise</p>
                    <p className="text-red-600">Key theft, social engineering, consensus attacks</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h5 className="font-semibold text-orange-800 mb-3">Systemic Risks</h5>
                <div className="space-y-2">
                  <div className="bg-white p-2 rounded text-xs">
                    <p className="font-semibold text-orange-800 mb-1">Centralization Points</p>
                    <p className="text-orange-600">Trusted multisigs, admin keys, upgrade mechanisms</p>
                  </div>
                  <div className="bg-white p-2 rounded text-xs">
                    <p className="font-semibold text-orange-800 mb-1">Liquidity Risks</p>
                    <p className="text-orange-600">Bank runs, insufficient reserves, MEV attacks</p>
                  </div>
                  <div className="bg-white p-2 rounded text-xs">
                    <p className="font-semibold text-orange-800 mb-1">Composability Risks</p>
                    <p className="text-orange-600">Cross-chain MEV, flash loan attacks, cascading failures</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Security Best Practices</h4>
            
            <div className="space-y-4">
              <div className="bg-green-50 border-l-4 border-green-400 rounded-lg p-4">
                <h5 className="font-semibold text-green-800 mb-3">For Users</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-green-800 text-sm mb-1">Risk Assessment</p>
                    <ul className="text-xs text-green-600 space-y-1">
                      <li>• Check bridge's security track record</li>
                      <li>• Understand the trust assumptions</li>
                      <li>• Review audit reports and findings</li>
                      <li>• Consider bridge age and maturity</li>
                      <li>• Monitor for unusual activity</li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-green-800 text-sm mb-1">Usage Guidelines</p>
                    <ul className="text-xs text-green-600 space-y-1">
                      <li>• Use small amounts for testing first</li>
                      <li>• Don't bridge more than you can afford to lose</li>
                      <li>• Prefer established bridges with good track records</li>
                      <li>• Monitor transaction status closely</li>
                      <li>• Have exit strategies for different scenarios</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-4">
                <h5 className="font-semibold text-blue-800 mb-3">For Protocols</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-blue-800 text-sm mb-1">Security Measures</p>
                    <ul className="text-xs text-blue-600 space-y-1">
                      <li>• Multiple independent security audits</li>
                      <li>• Formal verification where possible</li>
                      <li>• Bug bounty programs</li>
                      <li>• Gradual rollout with monitoring</li>
                      <li>• Emergency pause mechanisms</li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-blue-800 text-sm mb-1">Operational Security</p>
                    <ul className="text-xs text-blue-600 space-y-1">
                      <li>• Real-time monitoring and alerting</li>
                      <li>• Circuit breakers for unusual activity</li>
                      <li>• Rate limiting and withdrawal delays</li>
                      <li>• Multi-signature key management</li>
                      <li>• Incident response procedures</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">🛡️ Security Trade-offs</h4>
            <div className="text-sm text-yellow-700 space-y-2">
              <p><strong>High Security:</strong> Rollup-native bridges (Arbitrum) - slow but Ethereum-level security</p>
              <p><strong>Medium Security:</strong> Trusted validators (Polygon) - faster but depends on honest majority</p>
              <p><strong>Variable Security:</strong> General bridges (Wormhole) - fast and flexible but complex attack surface</p>
              <div className="bg-white p-3 rounded border mt-3 text-xs">
                <strong>Key Insight:</strong> There's no perfect solution. Every bridge design involves trade-offs between 
                security, speed, cost, and decentralization. Understanding these trade-offs is crucial for making informed decisions.
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'future-vision',
      title: 'Future: Seamless Multi-Chain Finance',
      completed: completedSections.has('future-vision'),
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
            <p className="text-lg leading-relaxed text-gray-700">
              The future of cross-chain finance envisions a <strong>seamless multi-chain world</strong> where 
              users interact with protocols across different blockchains without knowing or caring which 
              chain they're using—like sending emails between different providers today.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Emerging Interoperability Standards</h4>
            
            <div className="space-y-4">
              <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Network className="w-5 h-5 text-green-500 mr-2" />
                  <h5 className="font-semibold text-green-800">Universal Cross-Chain Messaging</h5>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Protocols creating standard ways for different blockchains to communicate
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-green-800 text-sm mb-1">Chainlink CCIP Vision</p>
                    <ul className="text-xs text-green-600 space-y-1">
                      <li>• Standard for cross-chain messaging</li>
                      <li>• Enterprise-grade security guarantees</li>
                      <li>• Risk management and monitoring</li>
                      <li>• Insurance and recovery mechanisms</li>
                      <li>• Integration with traditional finance</li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-green-800 text-sm mb-1">LayerZero Omnichain</p>
                    <ul className="text-xs text-green-600 space-y-1">
                      <li>• Native multi-chain applications</li>
                      <li>• Unified liquidity across chains</li>
                      <li>• Omnichain Fungible Tokens (OFT)</li>
                      <li>• Seamless user experience</li>
                      <li>• Developer-friendly abstractions</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 border-l-4 border-purple-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Eye className="w-5 h-5 text-purple-500 mr-2" />
                  <h5 className="font-semibold text-purple-800">Chain Abstraction</h5>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Users interact with applications without directly managing cross-chain complexity
                </p>
                
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-purple-800 text-sm mb-1">User Experience Evolution</p>
                    <div className="text-xs text-purple-600 space-y-2">
                      <p><strong>Today:</strong> "Send USDC from Ethereum to Polygon using this bridge"</p>
                      <p><strong>Tomorrow:</strong> "Pay Alice $100" (app handles all chain routing automatically)</p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-purple-800 text-sm mb-1">Technical Implementation</p>
                    <ul className="text-xs text-purple-600 space-y-1">
                      <li>• Intent-based architectures</li>
                      <li>• Cross-chain account abstraction</li>
                      <li>• Automated routing and optimization</li>
                      <li>• Unified gas payment systems</li>
                      <li>• Chain-agnostic wallet interfaces</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Multi-Chain DeFi Evolution</h4>
            
            <div className="space-y-4">
              <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-4">
                <h5 className="font-semibold text-blue-800 mb-3">Current Multi-Chain Strategies</h5>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-blue-800 text-sm mb-1">Aave's Approach</p>
                    <ul className="text-xs text-blue-600 space-y-1">
                      <li>• Deployed on 8+ chains independently</li>
                      <li>• Cross-chain governance via bridges</li>
                      <li>• Unified brand, fragmented liquidity</li>
                      <li>• Portal for cross-chain asset management</li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-blue-800 text-sm mb-1">Uniswap's Evolution</p>
                    <ul className="text-xs text-blue-600 space-y-1">
                      <li>• V3 on Ethereum, Arbitrum, Polygon, Base</li>
                      <li>• Wormhole integration for cross-chain swaps</li>
                      <li>• Universal router for optimal routing</li>
                      <li>• Moving toward unified liquidity</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-orange-50 border-l-4 border-orange-400 rounded-lg p-4">
                <h5 className="font-semibold text-orange-800 mb-3">Next-Generation Architectures</h5>
                
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-orange-800 text-sm mb-1">Unified Liquidity Pools</p>
                    <div className="text-xs text-orange-600 space-y-1">
                      <p>• Single liquidity pool shared across multiple chains</p>
                      <p>• Optimal capital efficiency and deeper liquidity</p>
                      <p>• Reduced slippage and better pricing</p>
                      <p>• Example: Stargate's delta algorithm</p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-orange-800 text-sm mb-1">Cross-Chain Yield Strategies</p>
                    <div className="text-xs text-orange-600 space-y-1">
                      <p>• Automatically move assets to highest yield opportunities</p>
                      <p>• Cross-chain arbitrage and liquidation</p>
                      <p>• Multi-chain portfolio optimization</p>
                      <p>• Risk-adjusted returns across ecosystems</p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-orange-800 text-sm mb-1">Omnichain Applications</p>
                    <div className="text-xs text-orange-600 space-y-1">
                      <p>• Single application deployed across all chains</p>
                      <p>• Shared state and synchronized logic</p>
                      <p>• Chain-agnostic user interfaces</p>
                      <p>• Automatic load balancing and routing</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Institutional & CBDC Interoperability</h4>
            
            <div className="space-y-4">
              <div className="bg-green-50 border-l-4 border-green-400 rounded-lg p-4">
                <h5 className="font-semibold text-green-800 mb-3">Cross-Border CBDC Networks</h5>
                <p className="text-sm text-gray-700 mb-3">
                  Central banks exploring interoperable digital currencies for international trade
                </p>
                
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-green-800 text-sm mb-1">mBridge Project Expansion</p>
                  <div className="text-xs text-green-600 space-y-1">
                    <p>• Current: China, Hong Kong, Thailand, UAE</p>
                    <p>• $22+ billion in cross-border settlements</p>
                    <p>• 15-second international transfers</p>
                    <p>• Expanding to more countries and CBDCs</p>
                    <p>• Potential SWIFT alternative for CBDC payments</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 border-l-4 border-purple-400 rounded-lg p-4">
                <h5 className="font-semibold text-purple-800 mb-3">Institutional Cross-Chain Infrastructure</h5>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-purple-800 text-sm mb-1">Custody Solutions</p>
                    <ul className="text-xs text-purple-600 space-y-1">
                      <li>• Multi-chain custody platforms</li>
                      <li>• Cross-chain risk management</li>
                      <li>• Institutional-grade bridges</li>
                      <li>• Compliance across jurisdictions</li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-purple-800 text-sm mb-1">Settlement Networks</p>
                    <ul className="text-xs text-purple-600 space-y-1">
                      <li>• 24/7 cross-chain settlements</li>
                      <li>• Atomic swaps for institutional trades</li>
                      <li>• Multi-currency payment rails</li>
                      <li>• Regulatory-compliant protocols</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Challenges & Limitations</h4>
            
            <div className="bg-red-50 border-l-4 border-red-400 rounded-lg p-4">
              <h5 className="font-semibold text-red-800 mb-3">Persistent Challenges</h5>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-red-800 text-sm mb-1">Technical Limitations</p>
                  <ul className="text-xs text-red-600 space-y-1">
                    <li>• No perfect trustless solution exists</li>
                    <li>• Complex attack surfaces increase risk</li>
                    <li>• Scalability vs security trade-offs</li>
                    <li>• Interoperability standards still evolving</li>
                  </ul>
                </div>
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-red-800 text-sm mb-1">Systemic Risks</p>
                  <ul className="text-xs text-red-600 space-y-1">
                    <li>• Cross-chain MEV and front-running</li>
                    <li>• Cascading failures across chains</li>
                    <li>• Regulatory arbitrage and compliance gaps</li>
                    <li>• Centralization in bridge validators</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">🔮 Timeline Predictions</h4>
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-blue-800 mb-1">2025-2026: Standards</p>
                  <ul className="text-xs text-blue-600 space-y-1">
                    <li>• Cross-chain messaging standards</li>
                    <li>• Improved security protocols</li>
                    <li>• Better user abstractions</li>
                    <li>• Institutional adoption growth</li>
                  </ul>
                </div>
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-blue-800 mb-1">2027-2028: Integration</p>
                  <ul className="text-xs text-blue-600 space-y-1">
                    <li>• Seamless multi-chain apps</li>
                    <li>• CBDC interoperability</li>
                    <li>• Chain-agnostic wallets</li>
                    <li>• Unified liquidity pools</li>
                  </ul>
                </div>
                <div className="bg-white p-3 rounded border">
                  <p className="font-semibold text-blue-800 mb-1">2030+: Maturation</p>
                  <ul className="text-xs text-blue-600 space-y-1">
                    <li>• Invisible chain boundaries</li>
                    <li>• Global settlement networks</li>
                    <li>• AI-optimized routing</li>
                    <li>• Full financial convergence</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">The Ultimate Vision</h4>
            <div className="text-sm text-gray-700 space-y-3">
              <p>
                <strong>Today:</strong> Users must manually bridge assets, manage multiple wallets, 
                and understand complex cross-chain mechanics.
              </p>
              <p>
                <strong>Tomorrow:</strong> A unified financial layer where blockchain boundaries are invisible. 
                Users interact with applications naturally while the infrastructure automatically optimizes 
                for security, cost, and speed across all chains.
              </p>
              <div className="bg-blue-50 p-3 rounded border mt-3">
                <p className="text-blue-700 text-sm">
                  <strong>Result:</strong> The best features of every blockchain—Ethereum's security, 
                  Solana's speed, Polygon's efficiency—combined into one seamless financial experience.
                </p>
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
      id: 'interoperability-problem',
      question: 'What is the main problem that cross-chain interoperability aims to solve?',
      options: [
        'Making all blockchains use the same programming language',
        'Eliminating liquidity silos and enabling value transfer between isolated blockchain ecosystems',
        'Reducing transaction fees on all blockchains',
        'Making all blockchains equally fast'
      ],
      correctAnswer: 1,
      explanation: 'Cross-chain interoperability addresses the fragmentation problem where blockchains operate in isolation, creating liquidity silos and limiting composability between ecosystems.'
    },
    {
      id: 'bridge-mechanism',
      question: 'How do most cross-chain bridges work?',
      options: [
        'They physically move tokens from one chain to another',
        'They lock assets on the source chain and mint wrapped versions on the destination chain',
        'They destroy tokens on one chain and create new ones on another',
        'They use atomic swaps exclusively'
      ],
      correctAnswer: 1,
      explanation: 'Most bridges use a lock-and-mint mechanism: assets are locked in a smart contract on the source chain, and wrapped versions are minted on the destination chain.'
    },
    {
      id: 'bridge-security',
      question: 'What was the primary cause of the Ronin Bridge hack that resulted in $625M losses?',
      options: [
        'A smart contract bug in the bridge code',
        'Attackers gained control of validator private keys through social engineering',
        'The bridge ran out of liquidity',
        'A flash loan attack on the liquidity pools'
      ],
      correctAnswer: 1,
      explanation: 'The Ronin Bridge hack occurred when attackers compromised 5 of 9 validator private keys through social engineering and spear phishing, allowing unauthorized withdrawals.'
    },
    {
      id: 'layer2-vs-bridge',
      question: 'How do Layer 2 solutions like Arbitrum differ from general cross-chain bridges?',
      options: [
        'Layer 2s are always faster than bridges',
        'Layer 2s inherit security from their parent chain while bridges rely on separate security models',
        'Layer 2s are more expensive to use',
        'Layer 2s can only handle one type of token'
      ],
      correctAnswer: 1,
      explanation: 'Layer 2 solutions like Arbitrum inherit security from Ethereum mainnet through their rollup design, while general bridges rely on separate validator sets or security models.'
    },
    {
      id: 'future-vision',
      question: 'What is the ultimate vision for cross-chain finance?',
      options: [
        'All blockchains will merge into one single chain',
        'Users will interact with applications seamlessly while infrastructure automatically handles cross-chain complexity',
        'Every user will need to run their own bridge',
        'Cross-chain interactions will become more complex over time'
      ],
      correctAnswer: 1,
      explanation: 'The future vision is chain abstraction where users interact naturally with applications while the infrastructure invisibly handles cross-chain optimization for security, cost, and speed.'
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
            title="Cross-Chain Finance Quiz"
            questions={quizQuestions}
            onComplete={handleQuizComplete}
          />
          
          {quizCompleted && (
            <div className="mt-6">
              <Link 
                href="/education/defai"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Continue to DeFAI
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
                <Network className="w-8 h-8 text-blue-600" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Cross-Chain Finance: Connecting Ecosystems</h1>
                <p className="text-gray-600 mb-4">
                  Discover how different blockchains connect and interact through bridges, Layer 2s, and 
                  interoperability protocols. Learn about Polygon Bridge, Wormhole, LayerZero, and the 
                  security challenges in a $10+ billion daily cross-chain economy.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    24 min read
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
                  className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            
            {/* Learning Objectives */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">What You'll Learn</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Why blockchain interoperability matters and the liquidity silo problem</li>
                <li>• Types of cross-chain solutions: bridges, Layer 2s, sidechains, atomic swaps</li>
                <li>• Real bridge protocols: Polygon, Arbitrum, Wormhole, LayerZero, Chainlink CCIP</li>
                <li>• Security risks with examples of major bridge hacks and lessons learned</li>
                <li>• Multi-chain strategies used by Aave, Uniswap, and other DeFi protocols</li>
                <li>• Future vision for seamless cross-chain finance and chain abstraction</li>
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
                  Take the quiz to demonstrate your cross-chain understanding and unlock the next module
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
              <h3 className="font-semibold text-green-800 mb-2">🎉 Excellent Work!</h3>
              <p className="text-green-700 text-sm mb-4">
                You now understand how blockchain ecosystems connect and the future of seamless multi-chain finance. 
                Ready to explore the cutting-edge intersection of AI and decentralized finance?
              </p>
              <Link 
                href="/education/defai"
                className="inline-flex items-center text-green-700 hover:text-green-800 font-medium"
              >
                Continue to DeFAI: AI-Powered Decentralized Finance
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 