'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, Zap, Calendar, User, Link2, Shield, Users, Cpu, ArrowRight } from 'lucide-react'

interface Section {
  id: string
  title: string
  content: React.ReactNode
  completed: boolean
}

export default function HowItWorksPage() {
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
      id: 'blockchain-structure',
      title: 'Blockchain Structure',
      completed: completedSections.has('blockchain-structure'),
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
            <p className="text-lg leading-relaxed text-gray-700">
              Think of a <strong>blockchain</strong> as a digital ledger book that's copied and stored on thousands 
              of computers worldwide. Each page (block) contains a list of transactions and is linked to the previous page.
            </p>
          </div>
          
          {/* Visual Block Representation */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Block Structure Visualization</h4>
            <div className="flex flex-col space-y-4">
              {/* Block 1 */}
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 border-2 border-blue-300 rounded-lg p-4 w-64">
                  <div className="text-sm font-semibold text-blue-900 mb-2">Block #1 (Genesis)</div>
                  <div className="space-y-1 text-xs text-blue-700">
                    <div>Previous Hash: 0000...</div>
                    <div>Transactions: 1</div>
                    <div>Hash: a1b2c3...</div>
                  </div>
                </div>
                <Link2 className="w-6 h-6 text-gray-400" />
              </div>
              
              {/* Block 2 */}
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 border-2 border-green-300 rounded-lg p-4 w-64">
                  <div className="text-sm font-semibold text-green-900 mb-2">Block #2</div>
                  <div className="space-y-1 text-xs text-green-700">
                    <div>Previous Hash: a1b2c3...</div>
                    <div>Transactions: 3</div>
                    <div>Hash: d4e5f6...</div>
                  </div>
                </div>
                <Link2 className="w-6 h-6 text-gray-400" />
              </div>
              
              {/* Block 3 */}
              <div className="flex items-center space-x-4">
                <div className="bg-purple-100 border-2 border-purple-300 rounded-lg p-4 w-64">
                  <div className="text-sm font-semibold text-purple-900 mb-2">Block #3</div>
                  <div className="space-y-1 text-xs text-purple-700">
                    <div>Previous Hash: d4e5f6...</div>
                    <div>Transactions: 2</div>
                    <div>Hash: g7h8i9...</div>
                  </div>
                </div>
                <Link2 className="w-6 h-6 text-gray-400" />
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-blue-600 mb-3 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Security Features
              </h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Each block references the previous block's hash</li>
                <li>• Changing one block breaks the entire chain</li>
                <li>• Cryptographic signatures verify authenticity</li>
                <li>• Distributed across thousands of computers</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-green-600 mb-3 flex items-center">
                <Link2 className="w-5 h-5 mr-2" />
                Chain Properties
              </h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Chronological order (time-stamped)</li>
                <li>• Immutable (can't be changed)</li>
                <li>• Transparent (publicly viewable)</li>
                <li>• Permanent record of all transactions</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'mining-process',
      title: 'Mining and Validation',
      completed: completedSections.has('mining-process'),
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700">
            <strong>Mining</strong> is the process of validating transactions and creating new blocks. 
            Miners compete to solve complex mathematical puzzles to add the next block to the chain.
          </p>
          
          {/* Mining Process Flow */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Mining Process Steps</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-100 text-center">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-lg font-bold text-white">1</span>
                </div>
                <h5 className="font-semibold text-gray-900 mb-2">Collect Transactions</h5>
                <p className="text-sm text-gray-600">Miners gather pending transactions from the network</p>
              </div>
              
              <div className="p-4 rounded-lg bg-blue-50 border border-blue-100 text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-lg font-bold text-white">2</span>
                </div>
                <h5 className="font-semibold text-gray-900 mb-2">Verify Transactions</h5>
                <p className="text-sm text-gray-600">Check digital signatures and account balances</p>
              </div>
              
              <div className="p-4 rounded-lg bg-purple-50 border border-purple-100 text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-lg font-bold text-white">3</span>
                </div>
                <h5 className="font-semibold text-gray-900 mb-2">Solve Puzzle</h5>
                <p className="text-sm text-gray-600">Compete to find the correct hash for the block</p>
              </div>
              
              <div className="p-4 rounded-lg bg-green-50 border border-green-100 text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-lg font-bold text-white">4</span>
                </div>
                <h5 className="font-semibold text-gray-900 mb-2">Add Block</h5>
                <p className="text-sm text-gray-600">Winner adds block and receives Bitcoin reward</p>
              </div>
            </div>
          </div>
          
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <h4 className="font-semibold text-orange-900 mb-3 flex items-center">
              <Cpu className="w-5 h-5 mr-2" />
              Why Mining Matters
            </h4>
            <ul className="space-y-2 text-orange-800">
              <li>• <strong>Security:</strong> Makes it expensive to attack the network</li>
              <li>• <strong>Decentralization:</strong> Anyone can participate as a miner</li>
              <li>• <strong>New Bitcoin:</strong> Only way new Bitcoin is created</li>
              <li>• <strong>Transaction Processing:</strong> Keeps the network running 24/7</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-gray-700">
              <strong>Fun Fact:</strong> Bitcoin mining consumes energy, but most miners use renewable energy sources 
              and it's driving innovation in clean energy technology!
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'consensus',
      title: 'Consensus Mechanisms',
      completed: completedSections.has('consensus'),
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700">
            <strong>Consensus mechanisms</strong> are rules that help all computers in the network agree 
            on which transactions are valid and what the "correct" blockchain looks like.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-orange-600 mb-3">Proof of Work (Bitcoin)</h4>
              <ul className="space-y-2 text-gray-600 mb-4">
                <li>• Miners compete to solve puzzles</li>
                <li>• Most computational power wins</li>
                <li>• Energy-intensive but very secure</li>
                <li>• Used by Bitcoin and Ethereum (until 2022)</li>
              </ul>
              <div className="bg-orange-50 p-3 rounded-lg">
                <p className="text-sm text-orange-700">
                  <strong>Pro:</strong> Battle-tested security<br/>
                  <strong>Con:</strong> High energy consumption
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-green-600 mb-3">Proof of Stake (Ethereum 2.0)</h4>
              <ul className="space-y-2 text-gray-600 mb-4">
                <li>• Validators stake coins as security deposit</li>
                <li>• Random selection with stake weighting</li>
                <li>• 99% less energy than Proof of Work</li>
                <li>• Used by newer cryptocurrencies</li>
              </ul>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm text-green-700">
                  <strong>Pro:</strong> Energy efficient<br/>
                  <strong>Con:</strong> Less proven over time
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="font-semibold text-blue-900 mb-3">The 51% Attack Problem</h4>
            <p className="text-blue-800 mb-3">
              If someone controls 51% or more of the network's power, they could potentially:
            </p>
            <ul className="space-y-1 text-blue-800">
              <li>• Reverse their own transactions</li>
              <li>• Prevent new transactions from confirming</li>
              <li>• Double-spend their coins</li>
            </ul>
            <div className="mt-3 p-3 bg-blue-100 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>Why it's unlikely:</strong> For Bitcoin, this would require billions of dollars in equipment 
                and electricity costs, making it economically irrational.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'transactions',
      title: 'How Transactions Work',
      completed: completedSections.has('transactions'),
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700">
            Every Bitcoin transaction is like sending a digitally signed message saying 
            "I want to send X Bitcoin to address Y" along with proof that you own those coins.
          </p>
          
          {/* Transaction Flow Visualization */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Transaction Journey</h4>
            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-900">Alice Creates Transaction</h5>
                  <p className="text-gray-600 text-sm">Alice wants to send 0.1 Bitcoin to Bob. She signs the transaction with her private key.</p>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-900">Broadcast to Network</h5>
                  <p className="text-gray-600 text-sm">Transaction is sent to Bitcoin nodes, which verify the signature and spread it to other nodes.</p>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-900">Miners Include in Block</h5>
                  <p className="text-gray-600 text-sm">Miners collect the transaction and include it in their next block attempt.</p>
                </div>
              </div>
              
              {/* Step 4 */}
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">4</div>
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-900">Confirmation</h5>
                  <p className="text-gray-600 text-sm">Block is mined and added to blockchain. Bob now owns 0.1 Bitcoin!</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700 mb-1">Block Time</p>
                  <p className="text-xl font-bold text-blue-900">~10 min</p>
                  <p className="text-xs text-blue-600">Average time between blocks</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-green-50 border border-green-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-700 mb-1">Security</p>
                  <p className="text-xl font-bold text-green-900">6+</p>
                  <p className="text-xs text-green-600">Confirmations for security</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-purple-50 border border-purple-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-700 mb-1">Uptime</p>
                  <p className="text-xl font-bold text-purple-900">24/7</p>
                  <p className="text-xs text-purple-600">Network never stops</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800">
              <strong>Key Point:</strong> Once a transaction has several confirmations (blocks built on top of it), 
              it becomes extremely difficult and expensive to reverse, making it practically permanent.
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
              <h1 className="text-2xl font-bold text-gray-900">How Blockchain Works</h1>
              <p className="text-gray-600 mt-1">
                Deep dive into blockchain technology and mining
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
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Course Overview</h2>
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
                  className="bg-green-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          {sections.map((section, index) => (
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

          {/* Next Steps */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg shadow-sm p-6 text-white">
            <h3 className="text-xl font-semibold mb-3">Ready to Get Started?</h3>
            <p className="mb-4 opacity-90">
              Now that you understand how Bitcoin works, learn how to safely buy, store, and use cryptocurrency.
            </p>
            <Link href="/education/getting-started">
              <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center">
                Learn Getting Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
} 