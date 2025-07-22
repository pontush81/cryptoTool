'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, Zap, Calendar, User, Link2, Shield, Cpu, ArrowRight } from 'lucide-react'

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
              Think of a <strong>blockchain</strong> as a digital ledger book that&apos;s copied and stored on thousands 
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
                    <div>Transactions: Coinbase reward</div>
                    <div>Timestamp: 2009-01-03</div>
                    <div>Hash: a1b2c3d4...</div>
                  </div>
                </div>
                <div className="text-2xl text-gray-400">→</div>
              </div>
              
              {/* Block 2 */}
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 border-2 border-green-300 rounded-lg p-4 w-64">
                  <div className="text-sm font-semibold text-green-900 mb-2">Block #2</div>
                  <div className="space-y-1 text-xs text-green-700">
                    <div>Previous Hash: a1b2c3d4...</div>
                    <div>Transactions: 5 transactions</div>
                    <div>Timestamp: 2009-01-09</div>
                    <div>Hash: e5f6g7h8...</div>
                  </div>
                </div>
                <div className="text-2xl text-gray-400">→</div>
              </div>
              
              {/* Block 3 */}
              <div className="flex items-center space-x-4">
                <div className="bg-purple-100 border-2 border-purple-300 rounded-lg p-4 w-64">
                  <div className="text-sm font-semibold text-purple-900 mb-2">Block #3</div>
                  <div className="space-y-1 text-xs text-purple-700">
                    <div>Previous Hash: e5f6g7h8...</div>
                    <div>Transactions: 3 transactions</div>
                    <div>Timestamp: 2009-01-11</div>
                    <div>Hash: i9j0k1l2...</div>
                  </div>
                </div>
                <div className="text-2xl text-gray-400">→</div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Key Point:</strong> Each block contains the hash of the previous block, creating a chain. 
                If someone tries to change a past transaction, it would break this chain and be immediately noticed.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'mining-consensus',
      title: 'Mining and Consensus',
      completed: completedSections.has('mining-consensus'),
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700">
            <strong>Mining</strong> is the process of validating transactions and adding them to the blockchain. 
            Miners compete to solve complex mathematical puzzles, and the winner gets to add the next block.
          </p>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">How Mining Works</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-blue-600">1</span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">Collect Transactions</h5>
                    <p className="text-sm text-gray-600 mt-1">
                      Miners gather pending transactions from the network into a block
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-green-600">2</span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">Solve the Puzzle</h5>
                    <p className="text-sm text-gray-600 mt-1">
                      Find a number (nonce) that makes the block&apos;s hash start with zeros
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-purple-600">3</span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">Broadcast Solution</h5>
                    <p className="text-sm text-gray-600 mt-1">
                      Send the solved block to all other nodes in the network
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-red-600">4</span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">Get Reward</h5>
                    <p className="text-sm text-gray-600 mt-1">
                      Receive Bitcoin reward for successfully mining the block
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800">
                <strong>Why This Works:</strong> The puzzle is hard to solve but easy to verify. 
                It takes lots of computational power to find the answer, but anyone can quickly check if it&apos;s correct.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Proof of Work Explained</h4>
            <div className="space-y-4">
              <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm">
                <div className="text-gray-600">Example Hash Target (must start with 4 zeros):</div>
                <div className="text-red-600">Target: 0000xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</div>
                <div className="mt-2 space-y-1">
                  <div className="text-gray-600">Attempt 1: 7a4b8c2d... ❌</div>
                  <div className="text-gray-600">Attempt 2: 9f1e5a7b... ❌</div>
                  <div className="text-gray-600">Attempt 842,394: 0000a1b2c3... ✅</div>
                </div>
              </div>
              
              <p className="text-gray-700">
                Miners must try billions of different numbers until they find one that produces a hash 
                starting with the required number of zeros. This requires significant computational power and energy.
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
            A Bitcoin transaction is like a digital IOU that says &quot;I&apos;m sending X amount of Bitcoin to address Y.&quot; 
            Each transaction must be verified by the network before it becomes final.
          </p>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Transaction Flow</h4>
            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <User className="w-8 h-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-900">1. Alice Creates Transaction</h5>
                  <p className="text-sm text-gray-600 mt-1">
                    Alice wants to send 0.1 Bitcoin to Bob. She creates a transaction using her digital wallet.
                  </p>
                </div>
                <div className="text-2xl text-gray-300">→</div>
              </div>
              
              {/* Step 2 */}
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-900">2. Digital Signature</h5>
                  <p className="text-sm text-gray-600 mt-1">
                    Alice&apos;s wallet creates a digital signature proving she owns the Bitcoin and authorizes the transfer.
                  </p>
                </div>
                <div className="text-2xl text-gray-300">→</div>
              </div>
              
              {/* Step 3 */}
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-8 h-8 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-900">3. Network Verification</h5>
                  <p className="text-sm text-gray-600 mt-1">
                    Network nodes verify Alice has enough Bitcoin and her signature is valid.
                  </p>
                </div>
                <div className="text-2xl text-gray-300">→</div>
              </div>
              
              {/* Step 4 */}
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Link2 className="w-8 h-8 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-900">4. Added to Block</h5>
                  <p className="text-sm text-gray-600 mt-1">
                    Miners include the transaction in a block and add it to the blockchain.
                  </p>
                </div>
                <div className="text-2xl text-gray-300">→</div>
              </div>
              
              {/* Step 5 */}
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-900">5. Transaction Complete</h5>
                  <p className="text-sm text-gray-600 mt-1">
                    Bob now owns the 0.1 Bitcoin. The transaction is permanently recorded on the blockchain.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="font-semibold text-blue-900 mb-3">Transaction Properties</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-semibold text-blue-900 mb-2">Irreversible</h5>
                <p className="text-sm text-blue-800">Once confirmed, transactions cannot be reversed or cancelled.</p>
              </div>
              <div>
                <h5 className="font-semibold text-blue-900 mb-2">Pseudonymous</h5>
                <p className="text-sm text-blue-800">Addresses are not directly linked to real-world identities.</p>
              </div>
              <div>
                <h5 className="font-semibold text-blue-900 mb-2">Transparent</h5>
                <p className="text-sm text-blue-800">All transactions are visible on the public blockchain.</p>
              </div>
              <div>
                <h5 className="font-semibold text-blue-900 mb-2">Global</h5>
                <p className="text-sm text-blue-800">Can be sent anywhere in the world, 24/7, without intermediaries.</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'network-security',
      title: 'Network Security',
      completed: completedSections.has('network-security'),
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700">
            Bitcoin&apos;s security comes from its decentralized nature and cryptographic design. 
            The more miners participate, the more secure the network becomes.
          </p>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Security Mechanisms</h4>
            <div className="space-y-6">
              <div className="border-l-4 border-green-400 pl-4">
                <h5 className="font-semibold text-green-900 mb-2">Cryptographic Hashing</h5>
                <p className="text-gray-700 text-sm">
                  Each block is secured with SHA-256 hashing. Changing any data completely changes the hash, 
                  making tampering immediately detectable.
                </p>
              </div>
              
              <div className="border-l-4 border-blue-400 pl-4">
                <h5 className="font-semibold text-blue-900 mb-2">Proof of Work</h5>
                <p className="text-gray-700 text-sm">
                  Miners must expend real computational energy to add blocks. This makes attacks expensive and impractical.
                </p>
              </div>
              
              <div className="border-l-4 border-purple-400 pl-4">
                <h5 className="font-semibold text-purple-900 mb-2">Network Consensus</h5>
                <p className="text-gray-700 text-sm">
                  The longest valid chain is accepted as truth. To change history, an attacker would need 
                  to control more than 50% of the network&apos;s computing power.
                </p>
              </div>
              
              <div className="border-l-4 border-red-400 pl-4">
                <h5 className="font-semibold text-red-900 mb-2">Immutability</h5>
                <p className="text-gray-700 text-sm">
                  Once a transaction has several confirmations, it becomes practically impossible to reverse 
                  due to the computational cost required.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-900 mb-2">The 51% Attack Myth</h4>
            <p className="text-red-800 text-sm">
              While theoretically possible, a 51% attack on Bitcoin would require enormous resources 
              and would likely destroy the value of the Bitcoin the attacker would gain, making it economically irrational.
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
                Deep dive into Bitcoin&apos;s underlying technology
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
                <Cpu className="w-8 h-8 text-purple-600" />
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

          {/* Next Steps */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow-sm p-6 text-white">
            <h3 className="text-xl font-semibold mb-3">Continue Your Journey</h3>
            <p className="mb-4 opacity-90">
              Ready to learn about wallets, security, and how to safely get started with Bitcoin?
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/education/getting-started">
                <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center">
                  Getting Started Guide
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