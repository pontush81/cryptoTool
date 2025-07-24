'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, Network, Calendar, User, Zap, ArrowRight, Code, Cpu, DollarSign } from 'lucide-react'
import QuizComponent from '../../../../components/QuizComponent'
import GlossaryTooltip from '../../../../components/GlossaryTooltip'

interface Section {
  id: string
  title: string
  content: React.ReactNode
  completed: boolean
}

export default function EthereumSmartContractsPage() {
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
      if (!completedModules.includes('ethereum-smart-contracts')) {
        completedModules.push('ethereum-smart-contracts')
        localStorage.setItem('completedEducationModules', JSON.stringify(completedModules))
      }
    }
  }

  const quizQuestions = [
    {
      id: 'q1',
      question: 'What makes Ethereum different from Bitcoin?',
      options: [
        'Ethereum is only for payments',
        'Ethereum can run programmable smart contracts',
        'Ethereum has no transaction fees',
        'Ethereum is controlled by banks'
      ],
      correctAnswer: 1,
      explanation: 'Unlike Bitcoin which is primarily for peer-to-peer payments, Ethereum is a programmable blockchain that can run smart contracts - self-executing programs that enable complex applications.'
    },
    {
      id: 'q2', 
      question: 'What is the Ethereum Virtual Machine (EVM)?',
      options: [
        'A physical computer that runs Ethereum',
        'A programming language',
        'A runtime environment for smart contracts on Ethereum',
        'A type of cryptocurrency wallet'
      ],
      correctAnswer: 2,
      explanation: 'The EVM is a decentralized runtime environment that executes smart contracts on the Ethereum network. Every Ethereum node runs the EVM to process transactions and smart contract calls.'
    },
    {
      id: 'q3',
      question: 'What are gas fees on Ethereum?',
      options: [
        'Fees paid to Ethereum founders',
        'The cost of running computations on the Ethereum network',
        'Fees for converting ETH to other cryptocurrencies',
        'Storage costs for keeping data on Ethereum'
      ],
      correctAnswer: 1,
      explanation: 'Gas fees are payments made to compensate for the computing energy required to process and validate transactions on the Ethereum blockchain. More complex operations require more gas.'
    },
    {
      id: 'q4',
      question: 'Which of these is a popular use case enabled by Ethereum smart contracts?',
      options: [
        'Only sending payments',
        'Decentralized Finance (DeFi) protocols',
        'Only storing Bitcoin',
        'Replacing traditional databases'
      ],
      correctAnswer: 1,
      explanation: 'Ethereum smart contracts enable complex applications like DeFi protocols (Uniswap, Aave), NFT marketplaces, DAOs, and many other decentralized applications that wouldn\'t be possible with simple payment systems.'
    },
    {
      id: 'q5',
      question: 'What was Ethereum 2.0 (now called "The Merge")?',
      options: [
        'A new cryptocurrency to replace Ethereum',
        'The transition from Proof of Work to Proof of Stake',
        'A way to make Ethereum private',
        'A merger with Bitcoin'
      ],
      correctAnswer: 1,
      explanation: 'The Merge was Ethereum\'s transition from energy-intensive Proof of Work to more efficient Proof of Stake consensus, reducing energy consumption by over 99% while maintaining security.'
    }
  ]

  const sections: Section[] = [
    {
      id: 'what-is-ethereum',
      title: 'What is Ethereum?',
      completed: completedSections.has('what-is-ethereum'),
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
            <p className="text-lg leading-relaxed text-gray-700">
              <GlossaryTooltip term="ethereum">
                <strong>Ethereum</strong>
              </GlossaryTooltip> is a programmable blockchain that goes beyond simple payments. 
              While Bitcoin is digital money, Ethereum is a "world computer" that can run any program you want. 
              It's the foundation for most modern crypto applications.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-orange-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">Bitcoin</h4>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>• Digital money system</li>
                <li>• Peer-to-peer payments</li>
                <li>• Store of value</li>
                <li>• Simple transactions</li>
                <li>• Limited programmability</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Network className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">Ethereum</h4>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>• Programmable blockchain</li>
                <li>• Smart contracts platform</li>
                <li>• Decentralized applications</li>
                <li>• Complex financial instruments</li>
                <li>• Full programming capabilities</li>
              </ul>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-green-900 mb-3">Key Innovation: Smart Contracts</h4>
            <p className="text-green-800">
              Smart contracts are self-executing programs that automatically enforce agreements without intermediaries. 
              Think of them as digital vending machines - you put money in, and if conditions are met, you automatically get your product out.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'smart-contracts-explained',
      title: 'Smart Contracts Explained',
      completed: completedSections.has('smart-contracts-explained'),
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700">
            Smart contracts are programs that run on the Ethereum blockchain. They execute automatically when 
            predetermined conditions are met, without requiring human intervention or traditional intermediaries.
          </p>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">How Smart Contracts Work</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">1</span>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900">Code is Written</h5>
                  <p className="text-gray-600 text-sm">Developers write the contract logic defining conditions and outcomes</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">2</span>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900">Contract is Deployed</h5>
                  <p className="text-gray-600 text-sm">The smart contract is published to the Ethereum blockchain</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">3</span>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900">Conditions are Met</h5>
                  <p className="text-gray-600 text-sm">When trigger conditions occur, the contract executes automatically</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-semibold text-sm">4</span>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900">Results Execute</h5>
                  <p className="text-gray-600 text-sm">Actions are performed automatically - payments, transfers, updates</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-yellow-900 mb-3">Real-World Example: Insurance</h4>
            <p className="text-yellow-800 mb-4">
              Flight insurance smart contract: If your flight is delayed by more than 2 hours (verified by oracle data), 
              you automatically receive compensation without filing claims or waiting for approval.
            </p>
            <div className="bg-white rounded-lg p-4">
              <div className="text-sm text-gray-600 font-mono">
                <div>IF flight_delay &gt; 2_hours</div>
                <div>THEN send_payout(passenger_wallet, insurance_amount)</div>
                <div>END</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'ethereum-virtual-machine',
      title: 'The Ethereum Virtual Machine (EVM)',
      completed: completedSections.has('ethereum-virtual-machine'),
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700">
            The Ethereum Virtual Machine (EVM) is the runtime environment where all smart contracts execute. 
            Think of it as a global computer that processes every transaction and smart contract call.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Cpu className="w-6 h-6 text-purple-600" />
                  <h4 className="text-lg font-semibold text-gray-900">What is the EVM?</h4>
                </div>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Decentralized computation engine</li>
                  <li>• Runs on thousands of nodes globally</li>
                  <li>• Executes smart contract code</li>
                  <li>• Maintains consistent state</li>
                  <li>• Enables complex applications</li>
                </ul>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h5 className="font-semibold text-purple-900 mb-2">Key Features</h5>
                <div className="space-y-1 text-sm text-purple-800">
                  <div>• <strong>Deterministic:</strong> Same input = same output</div>
                  <div>• <strong>Isolated:</strong> Contracts can't access external systems</div>
                  <div>• <strong>Turing Complete:</strong> Can perform any computation</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Programming Languages for Ethereum</h4>
              <div className="space-y-3">
                <div className="border-l-4 border-blue-400 pl-4">
                  <h5 className="font-semibold text-blue-900">Solidity</h5>
                  <p className="text-sm text-gray-600">Most popular language, similar to JavaScript</p>
                </div>
                
                <div className="border-l-4 border-green-400 pl-4">
                  <h5 className="font-semibold text-green-900">Vyper</h5>
                  <p className="text-sm text-gray-600">Python-like syntax, focused on security</p>
                </div>
                
                <div className="border-l-4 border-purple-400 pl-4">
                  <h5 className="font-semibold text-purple-900">Yul</h5>
                  <p className="text-sm text-gray-600">Low-level language for optimization</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'gas-fees-explained',
      title: 'Gas Fees Explained',
      completed: completedSections.has('gas-fees-explained'),
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700">
            Gas fees are the cost of computational work on Ethereum. Every operation (sending ETH, calling smart contracts) 
            requires computational resources, and gas fees compensate miners/validators for this work.
          </p>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Gas Fee Components</h4>
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h5 className="font-semibold text-blue-900 mb-2">Gas Limit</h5>
                <p className="text-blue-800 text-sm">
                  Maximum amount of gas you're willing to use for a transaction. 
                  Simple transfers use ~21,000 gas, complex smart contracts can use 200,000+ gas.
                </p>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4">
                <h5 className="font-semibold text-green-900 mb-2">Gas Price</h5>
                <p className="text-green-800 text-sm">
                  How much you pay per unit of gas (measured in Gwei). 
                  Higher prices = faster confirmation. Varies with network congestion.
                </p>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4">
                <h5 className="font-semibold text-purple-900 mb-2">Total Fee</h5>
                <p className="text-purple-800 text-sm">
                  Gas Limit × Gas Price = Total Transaction Fee (paid in ETH)
                </p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-yellow-900 mb-3">Gas Optimization Tips</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2 text-sm text-yellow-800">
                <div>• Use gas trackers to time transactions</div>
                <div>• Batch multiple operations together</div>
                <div>• Choose off-peak hours (weekends)</div>
                <div>• Consider Layer 2 solutions</div>
              </div>
              <div className="space-y-2 text-sm text-yellow-800">
                <div>• Set appropriate gas limits</div>
                <div>• Use efficient smart contracts</div>
                <div>• Avoid failed transactions</div>
                <div>• Monitor network congestion</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'ethereum-applications',
      title: 'Ethereum Applications & Use Cases',
      completed: completedSections.has('ethereum-applications'),
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700">
            Ethereum's programmability has enabled an entire ecosystem of decentralized applications (DApps) 
            that are reshaping finance, art, gaming, and more.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">DeFi (Decentralized Finance)</h4>
              </div>
              <div className="space-y-3 text-sm text-gray-600">
                <div>• <strong>Uniswap:</strong> Decentralized token exchange</div>
                <div>• <strong>Aave:</strong> Lending and borrowing platform</div>
                <div>• <strong>MakerDAO:</strong> Decentralized stablecoin (DAI)</div>
                <div>• <strong>Compound:</strong> Algorithmic money markets</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Zap className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">NFTs & Digital Assets</h4>
              </div>
              <div className="space-y-3 text-sm text-gray-600">
                <div>• <strong>OpenSea:</strong> NFT marketplace</div>
                <div>• <strong>CryptoPunks:</strong> Digital collectibles</div>
                <div>• <strong>Bored Apes:</strong> Profile picture NFTs</div>
                <div>• <strong>Art Blocks:</strong> Generative art platform</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Network className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">DAOs & Governance</h4>
              </div>
              <div className="space-y-3 text-sm text-gray-600">
                <div>• <strong>Aragon:</strong> DAO creation platform</div>
                <div>• <strong>Snapshot:</strong> Governance voting</div>
                <div>• <strong>Gitcoin:</strong> Funding public goods</div>
                <div>• <strong>MolochDAO:</strong> Grant funding</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Code className="w-6 h-6 text-orange-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">Infrastructure & Tools</h4>
              </div>
              <div className="space-y-3 text-sm text-gray-600">
                <div>• <strong>ENS:</strong> Ethereum domain names</div>
                <div>• <strong>IPFS:</strong> Decentralized storage</div>
                <div>• <strong>Chainlink:</strong> Oracle network</div>
                <div>• <strong>The Graph:</strong> Blockchain indexing</div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-blue-900 mb-3">Why This Matters</h4>
            <p className="text-blue-800">
              These applications demonstrate Ethereum's potential to create permissionless, global financial systems 
              and digital experiences that don't require traditional intermediaries. Anyone can participate, 
              build upon existing protocols, or create entirely new use cases.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'ethereum-2-0',
      title: 'Ethereum 2.0 & The Merge',
      completed: completedSections.has('ethereum-2-0'),
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700">
            In September 2022, Ethereum completed "The Merge" - transitioning from energy-intensive Proof of Work 
            to more efficient Proof of Stake consensus. This was one of the largest technical upgrades in crypto history.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Before The Merge (Proof of Work)</h4>
              <div className="space-y-3">
                <div className="bg-red-50 rounded-lg p-3">
                  <div className="text-sm text-red-800">
                    <div className="font-semibold mb-1">Energy Consumption</div>
                    <div>Consumed as much electricity as Argentina</div>
                  </div>
                </div>
                <div className="bg-orange-50 rounded-lg p-3">
                  <div className="text-sm text-orange-800">
                    <div className="font-semibold mb-1">Mining</div>
                    <div>Specialized hardware and computational power</div>
                  </div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-3">
                  <div className="text-sm text-yellow-800">
                    <div className="font-semibold mb-1">Scalability</div>
                    <div>Limited to ~15 transactions per second</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">After The Merge (Proof of Stake)</h4>
              <div className="space-y-3">
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="text-sm text-green-800">
                    <div className="font-semibold mb-1">Energy Reduction</div>
                    <div>99.95% reduction in energy consumption</div>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="text-sm text-blue-800">
                    <div className="font-semibold mb-1">Staking</div>
                    <div>Validators stake 32 ETH to secure network</div>
                  </div>
                </div>
                <div className="bg-purple-50 rounded-lg p-3">
                  <div className="text-sm text-purple-800">
                    <div className="font-semibold mb-1">Foundation</div>
                    <div>Enables future scaling solutions</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-green-900 mb-3">How Proof of Stake Works</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-semibold text-xs">1</span>
                </div>
                <div>
                  <p className="text-green-800 text-sm">
                    <strong>Staking:</strong> Validators deposit 32 ETH as collateral to participate in network security
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-semibold text-xs">2</span>
                </div>
                <div>
                  <p className="text-green-800 text-sm">
                    <strong>Selection:</strong> Algorithm randomly selects validators to propose new blocks
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-semibold text-xs">3</span>
                </div>
                <div>
                  <p className="text-green-800 text-sm">
                    <strong>Rewards:</strong> Honest validators earn ETH rewards; malicious ones lose their stake
                  </p>
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
              <h1 className="text-2xl font-bold text-gray-900">Ethereum & Smart Contracts</h1>
              <p className="text-gray-600 mt-1">
                The programmable blockchain enabling DeFi, NFTs, and decentralized applications
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
              <div className="p-3 bg-blue-100 rounded-lg">
                <Network className="w-8 h-8 text-blue-600" />
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
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-3">What You'll Learn</h3>
              <div className="grid md:grid-cols-2 gap-3 text-sm text-blue-800">
                <div>• What makes Ethereum programmable</div>
                <div>• How smart contracts work</div>
                <div>• Understanding gas fees and the EVM</div>
                <div>• Real-world Ethereum applications</div>
                <div>• The significance of Ethereum 2.0</div>
                <div>• DeFi, NFTs, and DApp ecosystem</div>
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
                <p className="text-gray-600 mt-1">Test your understanding of Ethereum and smart contracts</p>
              </div>
              {!showQuiz && (
                <button
                  onClick={() => setShowQuiz(true)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Take Quiz
                </button>
              )}
            </div>

            {showQuiz && (
              <QuizComponent
                title="Ethereum & Smart Contracts Quiz"
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
                    <p className="text-green-700 text-sm">You've successfully mastered Ethereum fundamentals.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Next Steps */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
            <h2 className="text-xl font-semibold mb-3">Ready for More?</h2>
            <p className="mb-4 opacity-90">
              Now that you understand Ethereum and smart contracts, explore practical applications in DeFi and beyond.
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
                href="/education/modules/stablecoins"
                className="inline-flex items-center px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors text-sm"
              >
                Stablecoins
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 