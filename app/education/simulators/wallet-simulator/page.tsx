'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Wallet, 
  Shield, 
  Eye, 
  EyeOff,
  Copy,
  Check,
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Info,
  Shuffle,
  Download,
  Upload,
  Send,
  QrCode,
  History,
  Settings,
  RefreshCw,
  Lock,
  Unlock,
  Key,
  Globe,
  Smartphone,
  HardDrive,
  Award
} from 'lucide-react'

// Wallet Types
interface WalletType {
  id: 'hot' | 'cold' | 'hardware'
  name: string
  icon: React.ElementType
  description: string
  securityLevel: 'Low' | 'Medium' | 'High' | 'Highest'
  convenience: 'High' | 'Medium' | 'Low'
  useCases: string[]
  pros: string[]
  cons: string[]
}

interface SimulatedWallet {
  id: string
  name: string
  type: WalletType['id']
  address: string
  seedPhrase: string[]
  balance: number
  isBackedUp: boolean
  created: Date
}

interface Transaction {
  id: string
  type: 'send' | 'receive'
  amount: number
  toAddress?: string
  fromAddress?: string
  status: 'pending' | 'confirmed' | 'failed'
  timestamp: Date
  gasUsed?: number
}

interface SimulatorScenario {
  id: string
  title: string
  description: string
  type: 'wallet-creation' | 'seed-backup' | 'transaction' | 'security-test'
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  completed: boolean
  points: number
}

interface SecurityScenario {
  id: string
  title: string
  description: string
  scenario: string
  question: string
  correctAnswer: boolean | number
  explanation: string
  options?: string[]
}

export default function WalletSimulatorPage() {
  // State management
  const [currentStep, setCurrentStep] = useState<'intro' | 'wallet-types' | 'create-wallet' | 'seed-backup' | 'transactions' | 'security-tests' | 'completion'>('intro')
  const [selectedWalletType, setSelectedWalletType] = useState<WalletType['id'] | null>(null)
  const [simulatedWallet, setSimulatedWallet] = useState<SimulatedWallet | null>(null)
  const [showSeedPhrase, setShowSeedPhrase] = useState(false)
  const [seedPhraseInput, setSeedPhraseInput] = useState<string[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [currentScenario, setCurrentScenario] = useState<SimulatorScenario | null>(null)
  const [userScore, setUserScore] = useState(0)
  const [completedScenarios, setCompletedScenarios] = useState<string[]>([])
  const [copiedText, setCopiedText] = useState('')

  // Load progress from localStorage
  useEffect(() => {
    const completed = JSON.parse(localStorage.getItem('completedWalletScenarios') || '[]')
    const score = parseInt(localStorage.getItem('walletSimulatorScore') || '0')
    setCompletedScenarios(completed)
    setUserScore(score)
  }, [])

  // Wallet types configuration
  const walletTypes: WalletType[] = [
    {
      id: 'hot',
      name: 'Hot Wallet (Software)',
      icon: Smartphone,
      description: 'Connected to the internet, stored on your device or browser',
      securityLevel: 'Medium',
      convenience: 'High',
      useCases: ['Daily transactions', 'Small amounts', 'DeFi interactions', 'Quick access'],
      pros: ['Easy to use', 'Quick transactions', 'Great for DeFi', 'Free to create'],
      cons: ['Always online', 'Vulnerable to hacks', 'Device dependent', 'Not for large amounts']
    },
    {
      id: 'cold',
      name: 'Cold Wallet (Paper/Offline)',
      icon: HardDrive,
      description: 'Completely offline storage, highest security for long-term holding',
      securityLevel: 'High',
      convenience: 'Low',
      useCases: ['Long-term storage', 'Large amounts', 'Backup storage', 'Inheritance planning'],
      pros: ['Completely offline', 'Immune to online hacks', 'Full control', 'No ongoing costs'],
      cons: ['Inconvenient for transactions', 'Physical storage risks', 'Easy to lose', 'Technical complexity']
    },
    {
      id: 'hardware',
      name: 'Hardware Wallet',
      icon: Lock,
      description: 'Physical device that stores keys offline but can sign transactions',
      securityLevel: 'Highest',
      convenience: 'Medium',
      useCases: ['Serious investors', 'Medium to large amounts', 'Regular trading', 'Business use'],
      pros: ['Best security', 'Easy to use', 'Backup friendly', 'Multi-currency support'],
      cons: ['Costs money', 'Can be lost/damaged', 'Learning curve', 'Still need backup']
    }
  ]

  // Generate a realistic seed phrase
  const generateSeedPhrase = (): string[] => {
    const words = [
      'abandon', 'ability', 'able', 'about', 'above', 'absent', 'absorb', 'abstract', 'absurd', 'abuse',
      'access', 'accident', 'account', 'accuse', 'achieve', 'acid', 'acoustic', 'acquire', 'across', 'act',
      'action', 'actor', 'actress', 'actual', 'adapt', 'add', 'addict', 'address', 'adjust', 'admit',
      'adult', 'advance', 'advice', 'aerobic', 'affair', 'afford', 'afraid', 'again', 'against', 'agent',
      'agree', 'ahead', 'aim', 'air', 'airport', 'aisle', 'alarm', 'album', 'alcohol', 'alert'
    ]
    
    const seedPhrase: string[] = []
    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * words.length)
      seedPhrase.push(words[randomIndex])
    }
    return seedPhrase
  }

  // Generate a realistic wallet address
  const generateWalletAddress = (): string => {
    const chars = '0123456789abcdef'
    let address = '0x'
    for (let i = 0; i < 40; i++) {
      address += chars[Math.floor(Math.random() * chars.length)]
    }
    return address
  }

  // Create a simulated wallet
  const createWallet = (type: WalletType['id'], name: string) => {
    const wallet: SimulatedWallet = {
      id: Date.now().toString(),
      name,
      type,
      address: generateWalletAddress(),
      seedPhrase: generateSeedPhrase(),
      balance: Math.floor(Math.random() * 100) / 100, // Random small balance
      isBackedUp: false,
      created: new Date()
    }
    setSimulatedWallet(wallet)
    setCurrentStep('seed-backup')
  }

  // Copy to clipboard functionality
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(label)
      setTimeout(() => setCopiedText(''), 2000)
    })
  }

  // Verify seed phrase
  const verifySeedPhrase = () => {
    if (!simulatedWallet) return false
    
    const isCorrect = seedPhraseInput.every((word, index) => 
      word.toLowerCase().trim() === simulatedWallet.seedPhrase[index]
    )
    
    if (isCorrect) {
      setSimulatedWallet(prev => prev ? { ...prev, isBackedUp: true } : null)
      setUserScore(prev => prev + 25)
      setCurrentStep('transactions')
      return true
    }
    return false
  }

  // Add additional state for transactions and security tests
  const [sendAmount, setSendAmount] = useState('')
  const [sendAddress, setSendAddress] = useState('')
  const [receiveAddress, setReceiveAddress] = useState('')
  const [transactionStep, setTransactionStep] = useState<'send' | 'receive' | 'history'>('send')
  const [securityScenarios, setSecurityScenarios] = useState<number>(0)
  const [securityAnswers, setSecurityAnswers] = useState<Record<string, boolean>>({})

  // Create a sample transaction
  const createTransaction = (type: 'send' | 'receive', amount: number, address: string) => {
    const transaction: Transaction = {
      id: Date.now().toString(),
      type,
      amount,
      toAddress: type === 'send' ? address : simulatedWallet?.address,
      fromAddress: type === 'send' ? simulatedWallet?.address : address,
      status: 'confirmed',
      timestamp: new Date(),
      gasUsed: Math.floor(Math.random() * 50000) + 21000
    }
    setTransactions(prev => [transaction, ...prev])
    
    if (simulatedWallet) {
      setSimulatedWallet(prev => prev ? {
        ...prev,
        balance: type === 'send' ? prev.balance - amount : prev.balance + amount
      } : null)
    }
    
    return transaction
  }

  // Validate Ethereum-like address
  const isValidAddress = (address: string): boolean => {
    return /^0x[a-fA-F0-9]{40}$/.test(address)
  }

  // Security scenarios data
  const securityScenariosData: SecurityScenario[] = [
    {
      id: 'phishing-email',
      title: 'Phishing Email Detection',
      description: 'You receive an email claiming to be from your wallet provider asking for your seed phrase.',
      scenario: `
        Subject: ⚠️ URGENT: Wallet Security Update Required
        From: support@metamask-security.com
        
        Dear User,
        
        We've detected suspicious activity on your wallet. To secure your account, 
        please verify your seed phrase immediately by clicking the link below:
        
        [SECURE YOUR WALLET NOW]
        
        Failure to verify within 24 hours will result in permanent account suspension.
        
        Best regards,
        MetaMask Security Team
      `,
      question: 'Should you provide your seed phrase through this email link?',
      correctAnswer: false,
      explanation: 'This is a classic phishing attempt. Legitimate wallet providers NEVER ask for seed phrases via email. Always verify through official channels.'
    },
    {
      id: 'fake-website',
      title: 'Fake Website Recognition', 
      description: 'You want to use Uniswap but notice something odd about the website URL.',
      scenario: 'You search for Uniswap and find these websites. Which one is legitimate?',
      options: [
        'https://uniswap.org',
        'https://uniwsap.org', 
        'https://uniswap-app.com',
        'https://app.uniswap.org'
      ],
      question: 'Which website is the real Uniswap?',
      correctAnswer: 3, // app.uniswap.org
      explanation: 'The official Uniswap protocol is at app.uniswap.org. Notice the subtle misspellings and different domains in the fake options.'
    },
    {
      id: 'suspicious-transaction',
      title: 'Suspicious Transaction Warning',
      description: 'Your wallet shows a transaction request with unusual characteristics.',
      scenario: `
        Transaction Request:
        To: 0x1234...unknown
        Amount: 0.001 ETH ($2.50)
        Gas Fee: 0.05 ETH ($125)
        Contract: Token Approval for "GET FREE NFT"
        
        This transaction will approve unlimited token spending.
      `,
      question: 'Should you approve this transaction?',
      correctAnswer: false,
      explanation: 'Red flags: Unlimited approval, extremely high gas fees, unknown contract, and "free" NFT promises are common scam tactics.'
    }
  ]

  // Render different steps
  const renderIntroStep = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <Wallet className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Crypto Wallet Simulator
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Learn wallet security, seed phrase management, and safe transaction practices in a completely risk-free environment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-50 rounded-lg p-6 text-center">
          <Key className="w-8 h-8 text-blue-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Wallet Creation</h3>
          <p className="text-sm text-gray-600">Learn different wallet types and how to create them securely</p>
        </div>
        <div className="bg-green-50 rounded-lg p-6 text-center">
          <Shield className="w-8 h-8 text-green-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Seed Phrase Security</h3>
          <p className="text-sm text-gray-600">Practice backing up and recovering your wallet safely</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-6 text-center">
          <Send className="w-8 h-8 text-purple-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Transactions</h3>
          <p className="text-sm text-gray-600">Learn to send and receive crypto safely</p>
        </div>
        <div className="bg-red-50 rounded-lg p-6 text-center">
          <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Security Tests</h3>
          <p className="text-sm text-gray-600">Practice recognizing and avoiding common threats</p>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
        <div className="flex items-start space-x-3">
          <Info className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-yellow-800 mb-2">Important: This is a Simulation</h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• No real cryptocurrency is involved</li>
              <li>• All wallets and transactions are simulated</li>
              <li>• Your actual funds are completely safe</li>
              <li>• Practice as much as you want without risk</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={() => setCurrentStep('wallet-types')}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center mx-auto text-lg font-medium"
        >
          Start Learning
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  )

  const renderWalletTypesStep = () => (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Choose Your Wallet Type</h2>
        <p className="text-gray-600">
          Each wallet type has different security and convenience trade-offs. Choose one to create and explore.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {walletTypes.map((type) => (
          <div
            key={type.id}
            className={`bg-white rounded-lg shadow-sm border p-6 cursor-pointer transition-all hover:shadow-md ${
              selectedWalletType === type.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
            }`}
            onClick={() => setSelectedWalletType(type.id)}
          >
            <div className="text-center mb-4">
              <div className="p-3 bg-blue-100 rounded-lg w-fit mx-auto mb-3">
                <type.icon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{type.name}</h3>
              <p className="text-gray-600 mt-2">{type.description}</p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Security:</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  type.securityLevel === 'Highest' ? 'bg-green-100 text-green-800' :
                  type.securityLevel === 'High' ? 'bg-green-100 text-green-800' :
                  type.securityLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {type.securityLevel}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Convenience:</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  type.convenience === 'High' ? 'bg-green-100 text-green-800' :
                  type.convenience === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {type.convenience}
                </span>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Best for:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {type.useCases.slice(0, 2).map((useCase, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <span className="w-1 h-1 bg-blue-600 rounded-full"></span>
                      <span>{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {selectedWalletType === type.id && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-xs text-blue-800 font-medium mb-2">Quick Comparison:</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="font-medium text-green-700 mb-1">Pros:</div>
                    <ul className="space-y-1">
                      {type.pros.slice(0, 2).map((pro, idx) => (
                        <li key={idx} className="text-green-600">• {pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="font-medium text-red-700 mb-1">Cons:</div>
                    <ul className="space-y-1">
                      {type.cons.slice(0, 2).map((con, idx) => (
                        <li key={idx} className="text-red-600">• {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setCurrentStep('intro')}
          className="flex items-center px-6 py-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>
        
        {selectedWalletType && (
          <button
            onClick={() => createWallet(selectedWalletType, `My ${walletTypes.find(w => w.id === selectedWalletType)?.name}`)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            Create This Wallet
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        )}
      </div>
    </div>
  )

  const renderSeedBackupStep = () => {
    if (!simulatedWallet) return null

    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Shield className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Backup Your Seed Phrase</h2>
          <p className="text-gray-600">
            Your seed phrase is the master key to your wallet. Anyone with this phrase can access your funds.
          </p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-red-800 mb-2">Critical Security Rules</h3>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Never share your seed phrase with anyone</li>
                <li>• Never store it digitally (screenshots, cloud, etc.)</li>
                <li>• Write it down on paper and store it safely</li>
                <li>• Consider multiple physical copies in different locations</li>
                <li>• Verify your backup before sending funds to the wallet</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Your Seed Phrase</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowSeedPhrase(!showSeedPhrase)}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                {showSeedPhrase ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span className="text-sm">{showSeedPhrase ? 'Hide' : 'Show'}</span>
              </button>
              <button
                onClick={() => copyToClipboard(simulatedWallet.seedPhrase.join(' '), 'seed-phrase')}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
              >
                {copiedText === 'seed-phrase' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span className="text-sm">{copiedText === 'seed-phrase' ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
            {simulatedWallet.seedPhrase.map((word, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-3 text-center border"
              >
                <div className="text-xs text-gray-500 mb-1">{index + 1}</div>
                <div className="font-mono text-sm text-gray-900">
                  {showSeedPhrase ? word : '•••••'}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Verify Your Backup</h3>
          <p className="text-gray-600 mb-4">
            To ensure you've backed up your seed phrase correctly, please enter it below:
          </p>
          
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mb-6">
            {Array.from({ length: 12 }, (_, index) => (
              <div key={index} className="relative">
                <div className="text-xs text-gray-500 mb-1">{index + 1}</div>
                <input
                  type="text"
                  placeholder="word"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={seedPhraseInput[index] || ''}
                  onChange={(e) => {
                    const newInput = [...seedPhraseInput]
                    newInput[index] = e.target.value
                    setSeedPhraseInput(newInput)
                  }}
                />
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              if (verifySeedPhrase()) {
                alert('✅ Correct! Your seed phrase backup is verified.')
              } else {
                alert('❌ Incorrect. Please double-check your seed phrase.')
              }
            }}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Verify Backup
          </button>
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => setCurrentStep('wallet-types')}
            className="flex items-center px-6 py-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>
          
          {simulatedWallet.isBackedUp && (
            <button
              onClick={() => setCurrentStep('transactions')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              Continue to Transactions
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          )}
        </div>
      </div>
    )
  }

  const renderTransactionsStep = () => {
    if (!simulatedWallet) return null

    return (
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <Send className="w-16 h-16 text-purple-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Practice Transactions</h2>
          <p className="text-gray-600">
            Learn to send and receive cryptocurrency safely with realistic transaction scenarios.
          </p>
        </div>

        {/* Wallet Overview */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Your {simulatedWallet.type} Wallet</h3>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Connected</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Balance</div>
              <div className="text-2xl font-bold text-gray-900">{simulatedWallet.balance.toFixed(4)} ETH</div>
              <div className="text-sm text-gray-500">${(simulatedWallet.balance * 2500).toFixed(2)}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Address</div>
              <div className="font-mono text-sm text-gray-900 break-all">{simulatedWallet.address}</div>
              <button
                onClick={() => copyToClipboard(simulatedWallet.address, 'address')}
                className="text-xs text-blue-600 hover:text-blue-800 mt-1"
              >
                {copiedText === 'address' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-600 mb-1">Transactions</div>
              <div className="text-2xl font-bold text-gray-900">{transactions.length}</div>
              <div className="text-sm text-gray-500">Total sent/received</div>
            </div>
          </div>
        </div>

        {/* Transaction Tabs */}
        <div className="bg-white rounded-lg shadow-sm border mb-8">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-6">
              {[
                { id: 'send', label: 'Send Crypto', icon: Send },
                { id: 'receive', label: 'Receive Crypto', icon: Download },
                { id: 'history', label: 'Transaction History', icon: History }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setTransactionStep(tab.id as 'send' | 'receive' | 'history')}
                  className={`py-4 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    transactionStep === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {transactionStep === 'send' && (
              <div className="max-w-md mx-auto">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Send Cryptocurrency</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Recipient Address
                    </label>
                    <input
                      type="text"
                      placeholder="0x..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={sendAddress}
                      onChange={(e) => setSendAddress(e.target.value)}
                    />
                    {sendAddress && !isValidAddress(sendAddress) && (
                      <p className="text-red-600 text-xs mt-1">Invalid Ethereum address format</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount (ETH)
                    </label>
                    <input
                      type="number"
                      step="0.0001"
                      placeholder="0.0000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={sendAmount}
                      onChange={(e) => setSendAmount(e.target.value)}
                    />
                    {parseFloat(sendAmount) > simulatedWallet.balance && (
                      <p className="text-red-600 text-xs mt-1">Amount exceeds wallet balance</p>
                    )}
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-600" />
                      <div className="text-sm text-yellow-800">
                        <strong>Security Tip:</strong> Always double-check the recipient address. 
                        Transactions cannot be reversed!
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (isValidAddress(sendAddress) && parseFloat(sendAmount) > 0 && parseFloat(sendAmount) <= simulatedWallet.balance) {
                        createTransaction('send', parseFloat(sendAmount), sendAddress)
                        setUserScore(prev => prev + 15)
                        setSendAmount('')
                        setSendAddress('')
                        alert('✅ Transaction sent successfully!')
                      }
                    }}
                    disabled={!isValidAddress(sendAddress) || parseFloat(sendAmount) <= 0 || parseFloat(sendAmount) > simulatedWallet.balance}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Send Transaction
                  </button>
                </div>
              </div>
            )}

            {transactionStep === 'receive' && (
              <div className="max-w-md mx-auto text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Receive Cryptocurrency</h3>
                <div className="bg-gray-50 rounded-lg p-6 mb-4">
                  <QrCode className="w-24 h-24 text-gray-400 mx-auto mb-4" />
                  <div className="text-sm text-gray-600 mb-2">Your Wallet Address:</div>
                  <div className="bg-white border rounded-lg p-3 font-mono text-sm break-all">
                    {simulatedWallet.address}
                  </div>
                  <button
                    onClick={() => copyToClipboard(simulatedWallet.address, 'receive-address')}
                    className="mt-3 flex items-center justify-center space-x-2 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                  >
                    {copiedText === 'receive-address' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedText === 'receive-address' ? 'Copied!' : 'Copy Address'}</span>
                  </button>
                </div>
                <button
                  onClick={() => {
                    const randomAmount = Math.random() * 0.1 + 0.01
                    const randomAddress = generateWalletAddress()
                    createTransaction('receive', randomAmount, randomAddress)
                    setUserScore(prev => prev + 10)
                    alert(`✅ Received ${randomAmount.toFixed(4)} ETH from ${randomAddress.slice(0,10)}...`)
                  }}
                  className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700"
                >
                  Simulate Incoming Transaction
                </button>
              </div>
            )}

            {transactionStep === 'history' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction History</h3>
                {transactions.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <History className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No transactions yet. Try sending or receiving some crypto!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {transactions.map((tx) => (
                      <div key={tx.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-full ${
                              tx.type === 'send' ? 'bg-red-100' : 'bg-green-100'
                            }`}>
                              {tx.type === 'send' ? 
                                <Upload className="w-4 h-4 text-red-600" /> : 
                                <Download className="w-4 h-4 text-green-600" />
                              }
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">
                                {tx.type === 'send' ? 'Sent' : 'Received'} {tx.amount.toFixed(4)} ETH
                              </div>
                              <div className="text-sm text-gray-500">
                                {tx.type === 'send' ? 'To' : 'From'}: {(tx.type === 'send' ? tx.toAddress : tx.fromAddress)?.slice(0, 10)}...
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-500">
                              {tx.timestamp.toLocaleTimeString()}
                            </div>
                            <div className="text-xs text-gray-400">
                              Gas: {tx.gasUsed?.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => setCurrentStep('seed-backup')}
            className="flex items-center px-6 py-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>
          
          <button
            onClick={() => {
              setUserScore(prev => prev + 10)
              setCurrentStep('security-tests')
            }}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            Continue to Security Tests
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    )
  }

  const renderSecurityTestsStep = () => {
    const currentScenario = securityScenariosData[securityScenarios]
    
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Shield className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Security Awareness Tests</h2>
          <p className="text-gray-600">
            Practice recognizing and avoiding common crypto scams and security threats.
          </p>
        </div>

        {currentScenario ? (
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{currentScenario.title}</h3>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {securityScenarios + 1} of {securityScenariosData.length}
                </span>
              </div>
              <p className="text-gray-600 mb-6">{currentScenario.description}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h4 className="font-medium text-gray-900 mb-3">Scenario:</h4>
              {currentScenario.options ? (
                <div>
                  <p className="text-gray-700 mb-4">{currentScenario.scenario}</p>
                  <div className="space-y-2">
                    {currentScenario.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          const isCorrect = index === currentScenario.correctAnswer
                          setSecurityAnswers(prev => ({ ...prev, [currentScenario.id]: isCorrect }))
                          if (isCorrect) setUserScore(prev => prev + 20)
                          
                          setTimeout(() => {
                            if (securityScenarios < securityScenariosData.length - 1) {
                              setSecurityScenarios(prev => prev + 1)
                            } else {
                              setCurrentStep('completion')
                            }
                          }, 2000)
                        }}
                        className="block w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
                      >
                        {index + 1}. {option}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 bg-white border rounded-lg p-4 mb-4">
                    {currentScenario.scenario}
                  </pre>
                  <div className="text-center space-x-4">
                    <button
                      onClick={() => {
                        const isCorrect = !currentScenario.correctAnswer
                        setSecurityAnswers(prev => ({ ...prev, [currentScenario.id]: isCorrect }))
                        if (isCorrect) setUserScore(prev => prev + 20)
                        
                        setTimeout(() => {
                          if (securityScenarios < securityScenariosData.length - 1) {
                            setSecurityScenarios(prev => prev + 1)
                          } else {
                            setCurrentStep('completion')
                          }
                        }, 2000)
                      }}
                      className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      NO - Don't trust this
                    </button>
                    <button
                      onClick={() => {
                        const isCorrect = currentScenario.correctAnswer
                        setSecurityAnswers(prev => ({ ...prev, [currentScenario.id]: isCorrect }))
                        if (isCorrect) setUserScore(prev => prev + 20)
                        
                        setTimeout(() => {
                          if (securityScenarios < securityScenariosData.length - 1) {
                            setSecurityScenarios(prev => prev + 1)
                          } else {
                            setCurrentStep('completion')
                          }
                        }, 2000)
                      }}
                      className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      YES - This seems safe
                    </button>
                  </div>
                </div>
              )}
            </div>

            {securityAnswers[currentScenario.id] !== undefined && (
              <div className={`rounded-lg p-4 ${
                securityAnswers[currentScenario.id] ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
              }`}>
                <div className="flex items-start space-x-3">
                  {securityAnswers[currentScenario.id] ? 
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" /> :
                    <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                  }
                  <div>
                    <h4 className={`font-medium mb-2 ${
                      securityAnswers[currentScenario.id] ? 'text-green-800' : 'text-red-800'
                    }`}>
                      {securityAnswers[currentScenario.id] ? 'Correct!' : 'Incorrect'}
                    </h4>
                    <p className={`text-sm ${
                      securityAnswers[currentScenario.id] ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {currentScenario.explanation}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16">
            <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Security Tests Complete!</h3>
            <p className="text-gray-600 mb-8">
              You've completed all security awareness scenarios. Well done!
            </p>
          </div>
        )}

        <div className="flex justify-between mt-8">
          <button
            onClick={() => setCurrentStep('transactions')}
            className="flex items-center px-6 py-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>
          
          {securityScenarios >= securityScenariosData.length && (
            <button
              onClick={() => setCurrentStep('completion')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              Complete Simulator
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          )}
        </div>
      </div>
    )
  }

  const renderCompletionStep = () => {
    const correctAnswers = Object.values(securityAnswers).filter(answer => answer).length
    const totalScore = userScore

    // Save completion to localStorage when component renders
    if (typeof window !== 'undefined') {
      const completed = JSON.parse(localStorage.getItem('completedSimulators') || '[]')
      if (!completed.includes('wallet-simulator')) {
        localStorage.setItem('completedSimulators', JSON.stringify([...completed, 'wallet-simulator']))
      }
      localStorage.setItem('walletSimulatorScore', totalScore.toString())
    }

    return (
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <Award className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Congratulations!</h2>
          <p className="text-xl text-gray-600 mb-8">
            You've successfully completed the Crypto Wallet Simulator
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">{totalScore}</div>
              <div className="text-sm text-blue-700">Total Points Earned</div>
            </div>
            <div className="bg-green-50 rounded-lg p-6">
              <div className="text-3xl font-bold text-green-600 mb-2">{correctAnswers}/3</div>
              <div className="text-sm text-green-700">Security Tests Passed</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">{transactions.length}</div>
              <div className="text-sm text-purple-700">Transactions Completed</div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">What You've Learned:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Wallet types and security trade-offs</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Seed phrase backup and recovery</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Safe transaction practices</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Phishing detection skills</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Address validation importance</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">Common scam recognition</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                setCurrentStep('intro')
                setSelectedWalletType(null)
                setSimulatedWallet(null)
                setSeedPhraseInput([])
                setShowSeedPhrase(false)
                setSendAmount('')
                setSendAddress('')
                setTransactions([])
                setSecurityScenarios(0)
                setSecurityAnswers({})
                setUserScore(0)
              }}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Practice Again
            </button>
            <Link
              href="/education/simulators"
              className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Back to Simulators
            </Link>
            <Link
              href="/education/dashboard"
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Continue Learning
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Main render function
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/education/simulators"
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Simulators
              </Link>
              <div className="text-gray-300">|</div>
              <div className="flex items-center space-x-2">
                <Wallet className="w-6 h-6 text-blue-600" />
                <span className="font-semibold text-gray-900">Wallet Simulator</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Score: <span className="font-semibold text-blue-600">{userScore}</span>
              </div>
              <div className="w-px h-6 bg-gray-300"></div>
              <div className="text-sm text-gray-600">
                Step {
                  currentStep === 'intro' ? '1' :
                  currentStep === 'wallet-types' ? '2' :
                  currentStep === 'create-wallet' ? '3' :
                  currentStep === 'seed-backup' ? '4' :
                  currentStep === 'transactions' ? '5' :
                  currentStep === 'security-tests' ? '6' : '7'
                } of 7
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentStep === 'intro' && renderIntroStep()}
        {currentStep === 'wallet-types' && renderWalletTypesStep()}
        {currentStep === 'seed-backup' && renderSeedBackupStep()}
        {/* Other steps will be implemented next */}
        
        {currentStep === 'transactions' && renderTransactionsStep()}
        {currentStep === 'security-tests' && renderSecurityTestsStep()}
        {currentStep === 'completion' && renderCompletionStep()}
      </div>
    </div>
  )
} 