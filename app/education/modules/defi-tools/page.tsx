'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, Wrench, Calendar, User, TrendingUp, ArrowRight, Shield, Globe, DollarSign, Smartphone, Monitor, Lock, Eye } from 'lucide-react'
import QuizComponent from '../../../../components/QuizComponent'

interface Section {
  id: string
  title: string
  content: React.ReactNode
  completed: boolean
}

export default function DeFiToolsPage() {
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
      if (!completedModules.includes('defi-tools')) {
        completedModules.push('defi-tools')
        localStorage.setItem('completedEducationModules', JSON.stringify(completedModules))
      }
      
      // Set mastery level based on score
      const masteryLevels = JSON.parse(localStorage.getItem('educationMasteryLevels') || '{}')
      masteryLevels['defi-tools'] = score >= 90 ? 'excellent' : score >= 80 ? 'good' : 'basic'
      localStorage.setItem('educationMasteryLevels', JSON.stringify(masteryLevels))
    }
  }

  const sections: Section[] = [
    {
      id: 'portfolio-tracking',
      title: 'Portfolio Tracking: Get Complete Overview',
      completed: completedSections.has('portfolio-tracking'),
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
            <p className="text-lg leading-relaxed text-gray-700">
              Once you own crypto across multiple wallets, exchanges, and DeFi protocols, tracking everything 
              becomes impossible manually. <strong>Portfolio tracking tools</strong> give you a unified view 
              of all your assets, their performance, and where they're located.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Essential Portfolio Trackers</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border-l-4 border-green-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Monitor className="w-5 h-5 text-green-500 mr-2" />
                  <h5 className="font-semibold text-green-800">CoinStats</h5>
                  <span className="ml-2 bg-green-100 text-green-700 text-xs px-2 py-1 rounded">Recommended</span>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  All-in-one solution for tracking across wallets, exchanges, DeFi protocols, and NFTs
                </p>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Multi-chain support</span>
                    <span className="text-green-600">✓ 300+ chains</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">DeFi protocol tracking</span>
                    <span className="text-green-600">✓ Auto-detection</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax reporting</span>
                    <span className="text-green-600">✓ Built-in</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mobile app</span>
                    <span className="text-green-600">✓ iOS & Android</span>
                  </div>
                </div>
                <div className="mt-3 p-2 bg-green-50 rounded text-xs">
                  <strong>Pro tip:</strong> Connect read-only by adding wallet addresses - never share private keys
                </div>
              </div>
              
              <div className="bg-white border-l-4 border-purple-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Globe className="w-5 h-5 text-purple-500 mr-2" />
                  <h5 className="font-semibold text-purple-800">Zapper & DeBank</h5>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Web-based portfolio trackers with excellent DeFi protocol integration
                </p>
                <div className="space-y-2 text-xs">
                  <div className="bg-purple-50 p-2 rounded">
                    <strong>Zapper:</strong> Great for DeFi yield farming and liquidity pool tracking
                  </div>
                  <div className="bg-purple-50 p-2 rounded">
                    <strong>DeBank:</strong> Clean interface, social features, detailed DeFi analytics
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  <strong>Use case:</strong> Complement CoinStats for detailed DeFi analysis
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">🎯 Getting Started with CoinStats</h4>
            <div className="text-sm text-yellow-700 space-y-2">
              <p><strong>Step 1:</strong> Download CoinStats app or visit coinstats.app</p>
              <p><strong>Step 2:</strong> Add your wallet addresses (never private keys!)</p>
              <p><strong>Step 3:</strong> Connect exchange accounts via API keys (read-only)</p>
              <p><strong>Step 4:</strong> Review your complete portfolio across all platforms</p>
              <p><strong>Step 5:</strong> Set up alerts for price changes and portfolio milestones</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'analytics-trading',
      title: 'Analytics & Trading: TradingView and Beyond',
      completed: completedSections.has('analytics-trading'),
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Essential Analytics Platforms</h4>
            
            <div className="space-y-4">
              <div className="bg-orange-50 border-l-4 border-orange-400 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <TrendingUp className="w-5 h-5 text-orange-500 mr-2" />
                  <h5 className="font-semibold text-orange-800">TradingView</h5>
                  <span className="ml-2 bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded">Essential</span>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  The gold standard for crypto technical analysis, charting, and market research
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded border">
                    <h6 className="font-semibold text-orange-800 text-sm mb-2">Key Features</h6>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Advanced charting tools</li>
                      <li>• Technical indicators (200+)</li>
                      <li>• Price alerts and notifications</li>
                      <li>• Multi-timeframe analysis</li>
                      <li>• Social trading ideas</li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <h6 className="font-semibold text-orange-800 text-sm mb-2">Crypto-Specific</h6>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• All major crypto pairs</li>
                      <li>• DeFi token charts</li>
                      <li>• On-chain metrics integration</li>
                      <li>• Screeners for altcoins</li>
                      <li>• Options and futures data</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-3 p-3 bg-orange-100 rounded">
                  <p className="text-xs text-orange-800">
                    <strong>Pro Setup:</strong> Free plan gives you 3 indicators per chart. 
                    Pro plan ($15/month) unlocks unlimited indicators and advanced features - 
                    essential if you're serious about technical analysis.
                  </p>
                </div>
              </div>
              
              <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-4">
                <h5 className="font-semibold text-blue-800 mb-3">On-Chain Analytics Tools</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-blue-800 text-sm">Dune Analytics</p>
                    <p className="text-xs text-blue-600 mb-1">
                      Custom dashboards for DeFi protocols, token flows, and blockchain metrics
                    </p>
                    <p className="text-xs text-gray-600">
                      <strong>Use case:</strong> Research DeFi protocol health before investing
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-blue-800 text-sm">Nansen</p>
                    <p className="text-xs text-blue-600 mb-1">
                      Wallet tracking, smart money flow analysis, token profitability
                    </p>
                    <p className="text-xs text-gray-600">
                      <strong>Use case:</strong> Follow successful wallet strategies
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-2">🚀 TradingView Setup for Crypto</h4>
            <div className="text-sm text-green-700 space-y-2">
              <p><strong>1. Create account:</strong> Start with free plan to test features</p>
              <p><strong>2. Favorite your pairs:</strong> Add BTC/USDT, ETH/USDT, and your holdings</p>
              <p><strong>3. Essential indicators:</strong> RSI, MACD, Moving Averages, Volume</p>
              <p><strong>4. Set price alerts:</strong> Get notified of breakouts and support levels</p>
              <p><strong>5. Follow ideas:</strong> Learn from experienced crypto traders</p>
              <div className="bg-green-100 p-2 rounded mt-2">
                <strong>Recommended watchlist:</strong> BTC, ETH, major DeFi tokens, and your portfolio holdings
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'wallet-management',
      title: 'Multi-Chain Wallet Management',
      completed: completedSections.has('wallet-management'),
      content: (
        <div className="space-y-6">
          <div className="bg-purple-50 border-l-4 border-purple-400 p-6 rounded-r-lg">
            <p className="text-lg leading-relaxed text-gray-700">
              Different blockchains require different wallets. Smart crypto users maintain multiple wallets 
              for different purposes: hot wallets for daily use, cold storage for long-term holdings, 
              and specialized wallets for specific chains.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Essential Wallet Setup</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border-l-4 border-blue-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Smartphone className="w-5 h-5 text-blue-500 mr-2" />
                  <h5 className="font-semibold text-blue-800">MetaMask</h5>
                  <span className="ml-2 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">Ethereum & EVMs</span>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  The most popular wallet for Ethereum and EVM-compatible chains
                </p>
                <div className="space-y-2 text-xs">
                  <div className="bg-blue-50 p-2 rounded">
                    <strong>Supports:</strong> Ethereum, Polygon, BSC, Arbitrum, Optimism, Avalanche
                  </div>
                  <div className="bg-blue-50 p-2 rounded">
                    <strong>Best for:</strong> DeFi protocols, NFTs, dApp interactions
                  </div>
                  <div className="bg-blue-50 p-2 rounded">
                    <strong>Setup tip:</strong> Add custom networks for L2s and sidechains
                  </div>
                </div>
              </div>
              
              <div className="bg-white border-l-4 border-purple-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Globe className="w-5 h-5 text-purple-500 mr-2" />
                  <h5 className="font-semibold text-purple-800">Phantom</h5>
                  <span className="ml-2 bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded">Solana</span>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  The leading wallet for Solana ecosystem and SPL tokens
                </p>
                <div className="space-y-2 text-xs">
                  <div className="bg-purple-50 p-2 rounded">
                    <strong>Features:</strong> Built-in DEX, NFT management, staking
                  </div>
                  <div className="bg-purple-50 p-2 rounded">
                    <strong>Best for:</strong> Solana DeFi, low-fee transactions, NFT trading
                  </div>
                </div>
              </div>
              
              <div className="bg-white border-l-4 border-green-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Shield className="w-5 h-5 text-green-500 mr-2" />
                  <h5 className="font-semibold text-green-800">Trust Wallet</h5>
                  <span className="ml-2 bg-green-100 text-green-700 text-xs px-2 py-1 rounded">Multi-Chain</span>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Mobile-first wallet supporting 70+ blockchains
                </p>
                <div className="space-y-2 text-xs">
                  <div className="bg-green-50 p-2 rounded">
                    <strong>Supports:</strong> Bitcoin, Ethereum, BSC, Cosmos, and many more
                  </div>
                  <div className="bg-green-50 p-2 rounded">
                    <strong>Best for:</strong> Mobile users, multi-chain portfolios
                  </div>
                </div>
              </div>
              
              <div className="bg-white border-l-4 border-gray-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Lock className="w-5 h-5 text-gray-500 mr-2" />
                  <h5 className="font-semibold text-gray-800">Hardware Wallets</h5>
                  <span className="ml-2 bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">Cold Storage</span>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Physical devices for maximum security of large holdings
                </p>
                <div className="space-y-2 text-xs">
                  <div className="bg-gray-50 p-2 rounded">
                    <strong>Ledger Nano S/X:</strong> Most popular, supports 1800+ coins
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <strong>Trezor:</strong> Open source, excellent Bitcoin support
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-800 mb-2">🛡️ Wallet Security Best Practices</h4>
            <div className="text-sm text-red-700 space-y-2">
              <p><strong>1. Seed phrase backup:</strong> Write down 12/24 words on paper, store safely offline</p>
              <p><strong>2. Never share private keys:</strong> No legitimate service ever asks for these</p>
              <p><strong>3. Use multiple wallets:</strong> Hot wallet for daily use, cold storage for savings</p>
              <p><strong>4. Verify addresses:</strong> Always double-check recipient addresses</p>
              <p><strong>5. Test small amounts:</strong> Send small test transactions first</p>
              <div className="bg-red-100 p-2 rounded mt-2">
                <strong>Golden rule:</strong> If you don't control the keys, you don't control the crypto
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'defi-interfaces',
      title: 'DeFi Interfaces & Dashboards',
      completed: completedSections.has('defi-interfaces'),
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Essential DeFi Platforms</h4>
            
            <div className="space-y-4">
              <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-4">
                <h5 className="font-semibold text-blue-800 mb-3">DeFi Aggregators</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-blue-800 text-sm">Zapper</p>
                    <p className="text-xs text-blue-600 mb-1">
                      One interface for all DeFi protocols - swapping, liquidity, yield farming
                    </p>
                    <p className="text-xs text-gray-600">
                      <strong>Best for:</strong> DeFi beginners who want simplified access
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-blue-800 text-sm">Zerion</p>
                    <p className="text-xs text-blue-600 mb-1">
                      Beautiful interface combining portfolio tracking with DeFi interactions
                    </p>
                    <p className="text-xs text-gray-600">
                      <strong>Best for:</strong> Users who want portfolio + DeFi in one app
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 border-l-4 border-green-400 rounded-lg p-4">
                <h5 className="font-semibold text-green-800 mb-3">Direct Protocol Access</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-green-800 text-sm">Uniswap</p>
                    <p className="text-xs text-green-600 mb-1">
                      Leading decentralized exchange for token swaps and liquidity provision
                    </p>
                    <p className="text-xs text-gray-600">
                      <strong>Use case:</strong> Token swaps, providing liquidity for fees
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-green-800 text-sm">Aave</p>
                    <p className="text-xs text-green-600 mb-1">
                      Lending and borrowing protocol with competitive rates
                    </p>
                    <p className="text-xs text-gray-600">
                      <strong>Use case:</strong> Earn yield on stablecoins, borrow against collateral
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-green-800 text-sm">Curve</p>
                    <p className="text-xs text-green-600 mb-1">
                      Specialized DEX for stablecoin swaps with low slippage
                    </p>
                    <p className="text-xs text-gray-600">
                      <strong>Use case:</strong> Efficient stablecoin swaps, stable yield farming
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-green-800 text-sm">Yearn Finance</p>
                    <p className="text-xs text-green-600 mb-1">
                      Automated yield optimization across multiple protocols
                    </p>
                    <p className="text-xs text-gray-600">
                      <strong>Use case:</strong> Set-and-forget yield farming
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">🎯 DeFi Getting Started Guide</h4>
            <div className="text-sm text-yellow-700 space-y-2">
              <p><strong>Step 1:</strong> Start with Zapper.fi - connect your MetaMask wallet</p>
              <p><strong>Step 2:</strong> Explore available protocols and current yields</p>
              <p><strong>Step 3:</strong> Try a simple swap (ETH → USDC) to understand gas fees</p>
              <p><strong>Step 4:</strong> Provide liquidity to a stablecoin pool for your first yield</p>
              <p><strong>Step 5:</strong> Graduate to direct protocol access as you gain confidence</p>
              <div className="bg-yellow-100 p-2 rounded mt-2">
                <strong>Pro tip:</strong> Always keep some ETH for gas fees - DeFi transactions cost $5-50 each
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'security-tools',
      title: 'Security Tools & Risk Management',
      completed: completedSections.has('security-tools'),
      content: (
        <div className="space-y-6">
          <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
            <p className="text-lg leading-relaxed text-gray-700">
              DeFi is powerful but risky. Every transaction is permanent, and there's no customer service 
              to reverse mistakes. These security tools help protect you from scams, hacks, and costly errors.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Essential Security Tools</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border-l-4 border-red-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Shield className="w-5 h-5 text-red-500 mr-2" />
                  <h5 className="font-semibold text-red-800">Revoke.cash</h5>
                  <span className="ml-2 bg-red-100 text-red-700 text-xs px-2 py-1 rounded">Essential</span>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Review and revoke token approvals that dApps have on your wallet
                </p>
                <div className="space-y-2 text-xs">
                  <div className="bg-red-50 p-2 rounded">
                    <strong>Why needed:</strong> DeFi apps get permission to spend your tokens - some keep it forever
                  </div>
                  <div className="bg-red-50 p-2 rounded">
                    <strong>How to use:</strong> Connect wallet, see all approvals, revoke unused ones
                  </div>
                  <div className="bg-red-50 p-2 rounded">
                    <strong>Schedule:</strong> Check monthly, revoke approvals you no longer use
                  </div>
                </div>
              </div>
              
              <div className="bg-white border-l-4 border-orange-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Eye className="w-5 h-5 text-orange-500 mr-2" />
                  <h5 className="font-semibold text-orange-800">Transaction Simulation</h5>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Preview what a transaction will do before confirming it
                </p>
                <div className="space-y-2 text-xs">
                  <div className="bg-orange-50 p-2 rounded">
                    <strong>Tenderly:</strong> Simulate transactions to see outcomes
                  </div>
                  <div className="bg-orange-50 p-2 rounded">
                    <strong>MetaMask insights:</strong> Built-in transaction warnings
                  </div>
                  <div className="bg-orange-50 p-2 rounded">
                    <strong>Rabby wallet:</strong> Shows transaction details clearly
                  </div>
                </div>
              </div>
              
              <div className="bg-white border-l-4 border-purple-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Monitor className="w-5 h-5 text-purple-500 mr-2" />
                  <h5 className="font-semibold text-purple-800">Scam Detection</h5>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Browser extensions and tools to detect malicious websites
                </p>
                <div className="space-y-2 text-xs">
                  <div className="bg-purple-50 p-2 rounded">
                    <strong>Scam Sniffer:</strong> Browser extension detecting phishing sites
                  </div>
                  <div className="bg-purple-50 p-2 rounded">
                    <strong>Fire:</strong> Mobile app for scanning QR codes and links
                  </div>
                  <div className="bg-purple-50 p-2 rounded">
                    <strong>Official bookmarks:</strong> Always use official protocol URLs
                  </div>
                </div>
              </div>
              
              <div className="bg-white border-l-4 border-blue-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Lock className="w-5 h-5 text-blue-500 mr-2" />
                  <h5 className="font-semibold text-blue-800">Wallet Security</h5>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Additional layers of protection for your crypto assets
                </p>
                <div className="space-y-2 text-xs">
                  <div className="bg-blue-50 p-2 rounded">
                    <strong>Hardware wallets:</strong> Ledger, Trezor for cold storage
                  </div>
                  <div className="bg-blue-50 p-2 rounded">
                    <strong>Multi-sig wallets:</strong> Gnosis Safe for shared/business funds
                  </div>
                  <div className="bg-blue-50 p-2 rounded">
                    <strong>2FA apps:</strong> Authy, Google Authenticator for exchange accounts
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Security Checklist</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-semibold text-gray-800 mb-2">Before Each Transaction:</h5>
                <ul className="space-y-1 text-gray-700">
                  <li>• Double-check the website URL</li>
                  <li>• Verify the contract address</li>
                  <li>• Read transaction details carefully</li>
                  <li>• Start with small amounts</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-gray-800 mb-2">Monthly Maintenance:</h5>
                <ul className="space-y-1 text-gray-700">
                  <li>• Review token approvals on Revoke.cash</li>
                  <li>• Update wallet software</li>
                  <li>• Backup seed phrases securely</li>
                  <li>• Review portfolio allocations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'tax-accounting',
      title: 'Tax & Accounting Tools',
      completed: completedSections.has('tax-accounting'),
      content: (
        <div className="space-y-6">
          <div className="bg-orange-50 border-l-4 border-orange-400 p-6 rounded-r-lg">
            <p className="text-lg leading-relaxed text-gray-700">
              Crypto taxes are complex but unavoidable. Every trade, DeFi transaction, and yield earned 
              may be a taxable event. The right tools automatically track everything and generate 
              reports for your accountant or tax software.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Recommended Tax Tools</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border-l-4 border-green-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <DollarSign className="w-5 h-5 text-green-500 mr-2" />
                  <h5 className="font-semibold text-green-800">CoinStats Tax</h5>
                  <span className="ml-2 bg-green-100 text-green-700 text-xs px-2 py-1 rounded">Integrated</span>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Built into CoinStats portfolio tracker via CoinLedger partnership
                </p>
                <div className="space-y-2 text-xs">
                  <div className="bg-green-50 p-2 rounded">
                    <strong>Advantage:</strong> Automatically tracks transactions from connected accounts
                  </div>
                  <div className="bg-green-50 p-2 rounded">
                    <strong>Features:</strong> Capital gains/losses, DeFi yield, NFT transactions
                  </div>
                  <div className="bg-green-50 p-2 rounded">
                    <strong>Export:</strong> TurboTax, TaxAct, and CSV formats
                  </div>
                </div>
              </div>
              
              <div className="bg-white border-l-4 border-blue-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Monitor className="w-5 h-5 text-blue-500 mr-2" />
                  <h5 className="font-semibold text-blue-800">Koinly</h5>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Dedicated crypto tax software with excellent DeFi support
                </p>
                <div className="space-y-2 text-xs">
                  <div className="bg-blue-50 p-2 rounded">
                    <strong>Strengths:</strong> Complex DeFi transactions, multiple countries
                  </div>
                  <div className="bg-blue-50 p-2 rounded">
                    <strong>Integration:</strong> 350+ exchanges and wallets
                  </div>
                  <div className="bg-blue-50 p-2 rounded">
                    <strong>Pricing:</strong> Free up to 10,000 transactions
                  </div>
                </div>
              </div>
              
              <div className="bg-white border-l-4 border-purple-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Globe className="w-5 h-5 text-purple-500 mr-2" />
                  <h5 className="font-semibold text-purple-800">CoinTracker</h5>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  US-focused tax software with clean interface
                </p>
                <div className="space-y-2 text-xs">
                  <div className="bg-purple-50 p-2 rounded">
                    <strong>Best for:</strong> US taxpayers, TurboTax integration
                  </div>
                  <div className="bg-purple-50 p-2 rounded">
                    <strong>Features:</strong> Real-time tax calculations, audit support
                  </div>
                </div>
              </div>
              
              <div className="bg-white border-l-4 border-gray-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Eye className="w-5 h-5 text-gray-500 mr-2" />
                  <h5 className="font-semibold text-gray-800">DIY Approach</h5>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Manual tracking using spreadsheets and exchange exports
                </p>
                <div className="space-y-2 text-xs">
                  <div className="bg-gray-50 p-2 rounded">
                    <strong>When viable:</strong> Simple buy/hold strategy, few transactions
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <strong>Risk:</strong> Missing transactions, calculation errors
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">📊 Tax Planning Tips</h4>
            <div className="text-sm text-yellow-700 space-y-2">
              <p><strong>Track from day one:</strong> Don't wait until tax season - sync tools continuously</p>
              <p><strong>FIFO vs LIFO:</strong> Understand your country's cost basis method</p>
              <p><strong>Harvest losses:</strong> Sell losing positions to offset gains (where legal)</p>
              <p><strong>DeFi complexity:</strong> Every swap, liquidity provision, and yield claim may be taxable</p>
              <p><strong>Professional help:</strong> Consider crypto-savvy accountant for complex situations</p>
              <div className="bg-yellow-100 p-2 rounded mt-2">
                <strong>Note:</strong> Tax laws vary by country - this is not tax advice, consult professionals
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
      id: 'portfolio-tracking',
      question: 'What is the main advantage of using portfolio tracking tools like CoinStats?',
      options: [
        'They guarantee investment profits',
        'They provide a unified view of assets across multiple wallets and platforms',
        'They automatically trade for you',
        'They eliminate all investment risks'
      ],
      correctAnswer: 1,
      explanation: 'Portfolio trackers consolidate your crypto holdings from multiple wallets, exchanges, and DeFi protocols into one comprehensive view, making it easier to monitor and manage your investments.'
    },
    {
      id: 'tradingview-purpose',
      question: 'Why is TradingView particularly valuable for crypto traders?',
      options: [
        'It provides guaranteed trading signals',
        'It offers advanced charting tools and technical indicators for market analysis',
        'It automatically executes trades',
        'It eliminates all trading fees'
      ],
      correctAnswer: 1,
      explanation: 'TradingView is the gold standard for technical analysis, providing advanced charting tools, 200+ indicators, price alerts, and market research capabilities essential for informed trading decisions.'
    },
    {
      id: 'multi-chain-wallets',
      question: 'Why do experienced crypto users maintain different wallets for different blockchains?',
      options: [
        'Each blockchain has its own native wallet requirements and optimization',
        'It\'s required by law',
        'Single wallets are always insecure',
        'It reduces transaction fees to zero'
      ],
      correctAnswer: 0,
      explanation: 'Different blockchains often require specialized wallets (e.g., MetaMask for Ethereum, Phantom for Solana) that are optimized for their specific features, dApps, and token standards.'
    },
    {
      id: 'revoke-cash',
      question: 'What is the primary purpose of Revoke.cash?',
      options: [
        'To recover lost cryptocurrency',
        'To review and revoke token spending approvals given to DeFi protocols',
        'To automatically trade cryptocurrencies',
        'To backup wallet seed phrases'
      ],
      correctAnswer: 1,
      explanation: 'Revoke.cash helps users review and revoke token approvals they\'ve given to DeFi protocols. These approvals can be security risks if left active after you stop using a protocol.'
    },
    {
      id: 'crypto-taxes',
      question: 'Why are dedicated crypto tax tools like CoinStats Tax or Koinly important?',
      options: [
        'They eliminate the need to pay taxes',
        'They automatically track complex DeFi transactions and generate tax reports',
        'They provide legal advice',
        'They guarantee audit protection'
      ],
      correctAnswer: 1,
      explanation: 'Crypto tax tools automatically track all transactions across multiple platforms and generate comprehensive tax reports, which is essential given the complexity of DeFi transactions and varying tax implications.'
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
            title="DeFi Tools & Practical Setup Quiz"
            questions={quizQuestions}
            onComplete={handleQuizComplete}
          />
          
          {quizCompleted && (
            <div className="mt-6">
              <Link 
                href="/education/stablecoins"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Continue to Stablecoins
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
                <Wrench className="w-8 h-8 text-blue-600" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">DeFi Tools & Practical Setup</h1>
                <p className="text-gray-600 mb-4">
                  Master the essential tools for on-chain crypto activities. Learn to use portfolio trackers like CoinStats, 
                  analytics platforms like TradingView, manage multi-chain wallets, and protect yourself with security tools. 
                  This is your bridge from theoretical knowledge to practical crypto independence.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    25 min read
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
                <li>• Set up portfolio tracking with CoinStats, Zapper, and DeBank</li>
                <li>• Master TradingView for crypto technical analysis and market research</li>
                <li>• Manage multi-chain wallets (MetaMask, Phantom, Trust Wallet, hardware)</li>
                <li>• Navigate DeFi interfaces and aggregation platforms safely</li>
                <li>• Use security tools to protect against scams and manage risks</li>
                <li>• Handle crypto taxes with automated tracking and reporting tools</li>
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
                  Take the quiz to demonstrate your practical tool knowledge and unlock the next module
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
                You now have the practical tools to navigate the crypto ecosystem independently. 
                Ready to learn about the stable digital currencies that power most DeFi activities?
              </p>
              <Link 
                href="/education/stablecoins"
                className="inline-flex items-center text-green-700 hover:text-green-800 font-medium"
              >
                Continue to Stablecoins: The Bridge to Digital Finance
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 