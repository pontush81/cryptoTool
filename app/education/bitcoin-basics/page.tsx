'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, BookOpen, Calendar, User, TrendingUp, ArrowRight } from 'lucide-react'
import QuizComponent from '../../../components/QuizComponent'
import GlossaryTooltip from '../../../components/GlossaryTooltip'

interface Section {
  id: string
  title: string
  content: React.ReactNode
  completed: boolean
}

export default function BitcoinBasicsPage() {
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
      if (!completedModules.includes('bitcoin-basics')) {
        completedModules.push('bitcoin-basics')
        localStorage.setItem('completedEducationModules', JSON.stringify(completedModules))
      }
    }
  }

  const quizQuestions = [
    {
      id: 'q1',
      question: 'What makes Bitcoin different from traditional money?',
      options: [
        'It is controlled by banks',
        'It has no central authority and works peer-to-peer',
        'It can only be used online',
        'It is backed by gold'
      ],
      correctAnswer: 1,
      explanation: 'Bitcoin operates without a central authority like banks or governments. Transactions happen directly between users (peer-to-peer) on a decentralized network.'
    },
    {
      id: 'q2', 
      question: 'What is the maximum supply of Bitcoin that will ever exist?',
      options: [
        '100 million coins',
        '50 million coins', 
        '21 million coins',
        'Unlimited supply'
      ],
      correctAnswer: 2,
      explanation: 'Bitcoin has a fixed supply cap of 21 million coins, making it deflationary by design. This scarcity is built into the protocol and cannot be changed.'
    },
    {
      id: 'q3',
      question: 'Who created Bitcoin?',
      options: [
        'Elon Musk',
        'Satoshi Nakamoto',
        'Vitalik Buterin',
        'Mark Zuckerberg'
      ],
      correctAnswer: 1,
      explanation: 'Bitcoin was created by the pseudonymous person or group known as Satoshi Nakamoto, who published the Bitcoin whitepaper in 2008 and launched the network in 2009.'
    },
    {
      id: 'q4',
      question: 'What significant event happened on May 22, 2010?',
      options: [
        'Bitcoin reached $1 for the first time',
        'The first Bitcoin was mined',
        'Someone bought pizza with Bitcoin',
        'Bitcoin exchanges were launched'
      ],
      correctAnswer: 2,
      explanation: 'On May 22, 2010, Laszlo Hanyecz bought two pizzas for 10,000 Bitcoin. This is now celebrated as "Bitcoin Pizza Day" as it was one of the first real-world purchases with Bitcoin.'
    },
    {
      id: 'q5',
      question: 'What does "decentralization" mean in the context of Bitcoin?',
      options: [
        'Bitcoin is stored in one central location',
        'Banks control all Bitcoin transactions',
        'The network is maintained by thousands of computers worldwide',
        'Only governments can validate transactions'
      ],
      correctAnswer: 2,
      explanation: 'Decentralization means that Bitcoin\'s network is maintained by thousands of independent computers (nodes) around the world, with no single point of control or failure.'
    }
  ]

  const sections: Section[] = [
    {
      id: 'what-is-bitcoin',
      title: 'What is Bitcoin?',
      completed: completedSections.has('what-is-bitcoin'),
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
            <p className="text-lg leading-relaxed text-gray-700">
              <GlossaryTooltip term="bitcoin">
                <strong>Bitcoin</strong>
              </GlossaryTooltip> is the world&apos;s first successful digital currency that works without a central authority like a bank or government. 
              It&apos;s completely digital money that you can send anywhere in the world, instantly, with very low fees.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-green-600 mb-3">Traditional Money</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Controlled by banks and governments</li>
                <li>• Can be printed/created at will</li>
                <li>• Requires intermediaries for transfers</li>
                <li>• Subject to inflation</li>
                <li>• Can be censored or frozen</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-blue-600 mb-3">Bitcoin</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• No central authority (<GlossaryTooltip term="decentralization">decentralized</GlossaryTooltip>)</li>
                <li>• Fixed supply of 21 million coins</li>
                <li>• Direct peer-to-peer transfers</li>
                <li>• Deflationary by design</li>
                <li>• Censorship resistant</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800">
              <strong>Key Takeaway:</strong> Bitcoin is &quot;programmable money&quot; that gives you complete control over your wealth without needing permission from anyone.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'history',
      title: 'The History of Bitcoin',
      completed: completedSections.has('history'),
      content: (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Bitcoin Timeline</h4>
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-4 h-4 bg-blue-600 rounded-full mt-1.5"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">2008 - The White Paper</h4>
                  <p className="text-gray-600">
                    An anonymous person (or group) using the name <strong>Satoshi Nakamoto</strong> published the Bitcoin whitepaper: 
                    &quot;Bitcoin: A Peer-to-Peer Electronic Cash System&quot;
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-4 h-4 bg-green-600 rounded-full mt-1.5"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">January 3, 2009 - Genesis Block</h4>
                  <p className="text-gray-600">
                    The first Bitcoin block was <GlossaryTooltip term="mining">mined</GlossaryTooltip>, officially launching the Bitcoin network. 
                    Satoshi embedded the message: &quot;The Times 03/Jan/2009 Chancellor on brink of second bailout for banks&quot;
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-4 h-4 bg-purple-600 rounded-full mt-1.5"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">May 22, 2010 - First Real Purchase</h4>
                  <p className="text-gray-600">
                    Laszlo Hanyecz bought two pizzas for 10,000 Bitcoin (~$25 then). 
                    This date is now celebrated as &quot;Bitcoin Pizza Day&quot;
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-4 h-4 bg-red-600 rounded-full mt-1.5"></div>
                <div>
                  <h4 className="font-semibold text-gray-900">2021 - Mainstream Adoption</h4>
                  <p className="text-gray-600">
                    El Salvador became the first country to make Bitcoin legal tender. 
                    Major companies like Tesla and MicroStrategy added Bitcoin to their balance sheets.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800">
              <strong>Fun Fact:</strong> Those 10,000 Bitcoin used for pizza would be worth over $400 million today!
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'decentralization',
      title: 'Understanding Decentralization',
      completed: completedSections.has('decentralization'),
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700">
            <GlossaryTooltip term="decentralization">Decentralization</GlossaryTooltip> means that no single entity controls Bitcoin. Instead, it&apos;s maintained by thousands 
            of computers (called &quot;<GlossaryTooltip term="node">nodes</GlossaryTooltip>&quot;) around the world working together.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-red-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Centralized</h4>
              <p className="text-sm text-gray-600">One authority controls everything (like a bank)</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-yellow-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Decentralized</h4>
              <p className="text-sm text-gray-600">Multiple authorities share control</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="grid grid-cols-2 gap-1">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                </div>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Distributed</h4>
              <p className="text-sm text-gray-600">Everyone participates equally (like Bitcoin)</p>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h4 className="font-semibold text-blue-900 mb-3">Why is Decentralization Important?</h4>
            <ul className="space-y-2 text-blue-800">
              <li>• <strong>No single point of failure:</strong> If one computer goes down, the network continues</li>
              <li>• <strong>Censorship resistance:</strong> No one can stop your transactions</li>
              <li>• <strong>Global access:</strong> Available 24/7 anywhere in the world</li>
              <li>• <strong>Transparency:</strong> All transactions are publicly verifiable</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'digital-money',
      title: 'Digital Money vs Physical Money',
      completed: completedSections.has('digital-money'),
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700">
            Bitcoin exists only as digital information - there are no physical Bitcoin coins. But this doesn&apos;t make it less &quot;real&quot; than physical money.
          </p>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 overflow-x-auto">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Comparison Table</h4>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aspect</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Physical Cash</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Digital Bitcoin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-4 whitespace-nowrap font-medium text-gray-900">Storage</td>
                  <td className="px-4 py-4 text-gray-600">Wallet, safe, bank</td>
                  <td className="px-4 py-4 text-gray-600">Digital <GlossaryTooltip term="wallet">wallet</GlossaryTooltip>, hardware device</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap font-medium text-gray-900">Transfer</td>
                  <td className="px-4 py-4 text-gray-600">Hand-to-hand, mail, bank</td>
                  <td className="px-4 py-4 text-gray-600">Internet, instantly worldwide</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 whitespace-nowrap font-medium text-gray-900">Verification</td>
                  <td className="px-4 py-4 text-gray-600">Feel, see, count</td>
                  <td className="px-4 py-4 text-gray-600">Cryptographic proof</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap font-medium text-gray-900">Divisibility</td>
                  <td className="px-4 py-4 text-gray-600">Limited (cents)</td>
                  <td className="px-4 py-4 text-gray-600">8 decimal places (satoshis)</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <p className="text-purple-800">
              <strong>Did you know?</strong> Most money today is already digital! When you use a credit card or bank transfer, 
              you&apos;re moving digital numbers in bank databases - just like Bitcoin, but controlled by banks.
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
              <h1 className="text-2xl font-bold text-gray-900">Bitcoin Basics</h1>
              <p className="text-gray-600 mt-1">
                Understanding the fundamentals of Bitcoin and cryptocurrency
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
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Course Overview</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    15 min read
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
                  className="bg-green-600 h-3 rounded-full transition-all duration-300"
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

          {/* Quiz Section */}
          {completedSections.size === sections.length && !showQuiz && !quizCompleted && (
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-sm p-6 text-white">
              <h3 className="text-xl font-semibold mb-3">Ready to Test Your Knowledge?</h3>
              <p className="mb-4 opacity-90">
                You&apos;ve completed all sections! Take the quiz to test your understanding and earn your completion certificate.
              </p>
              <button
                onClick={() => setShowQuiz(true)}
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
              >
                Start Quiz
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          )}

          {/* Quiz Component */}
          {showQuiz && (
            <QuizComponent
              title="Bitcoin Basics Quiz"
              questions={quizQuestions}
              onComplete={handleQuizComplete}
            />
          )}

          {/* Next Steps */}
          {(quizCompleted || completedSections.size === sections.length) && (
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-sm p-6 text-white">
              <h3 className="text-xl font-semibold mb-3">
                {quizCompleted ? '🎉 Congratulations!' : 'Ready for the Next Step?'}
              </h3>
              <p className="mb-4 opacity-90">
                {quizCompleted 
                  ? 'You\'ve successfully completed Bitcoin Basics! You now understand the fundamentals of Bitcoin and cryptocurrency.'
                  : 'Now that you understand Bitcoin basics, learn how the underlying blockchain technology actually works.'
                }
              </p>
              <Link href="/education/how-it-works">
                <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center">
                  Learn How Blockchain Works
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  )
} 