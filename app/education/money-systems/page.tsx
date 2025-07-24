'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, Banknote, Calendar, User, TrendingUp, ArrowRight, Coins, Building2, Globe } from 'lucide-react'
import QuizComponent from '../../../components/QuizComponent'
import GlossaryTooltip from '../../../components/GlossaryTooltip'

interface Section {
  id: string
  title: string
  content: React.ReactNode
  completed: boolean
}

export default function MoneySystemsPage() {
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
      if (!completedModules.includes('money-systems')) {
        completedModules.push('money-systems')
        localStorage.setItem('completedEducationModules', JSON.stringify(completedModules))
      }
      
      // Set mastery level based on score
      const masteryLevels = JSON.parse(localStorage.getItem('educationMasteryLevels') || '{}')
      masteryLevels['money-systems'] = score >= 90 ? 'excellent' : score >= 80 ? 'good' : 'basic'
      localStorage.setItem('educationMasteryLevels', JSON.stringify(masteryLevels))
    }
  }

  const sections: Section[] = [
    {
      id: 'what-is-money',
      title: 'What is Money?',
      completed: completedSections.has('what-is-money'),
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
            <p className="text-lg leading-relaxed text-gray-700">
              <strong>Money</strong> is anything that is widely accepted as payment for goods and services. 
              But money does much more than just help us buy things - it serves three essential functions in our economy.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Coins className="w-5 h-5 text-green-600" />
                </div>
                <h4 className="ml-3 font-semibold text-gray-900">Medium of Exchange</h4>
              </div>
              <p className="text-sm text-gray-600">
                Money allows us to trade without bartering. Instead of trading chickens for shoes directly, 
                we can sell chickens for money and use that money to buy shoes.
              </p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <h4 className="ml-3 font-semibold text-gray-900">Store of Value</h4>
              </div>
              <p className="text-sm text-gray-600">
                Money allows us to save purchasing power for the future. You can earn money today 
                and use it to buy things tomorrow, next month, or next year.
              </p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-purple-600" />
                </div>
                <h4 className="ml-3 font-semibold text-gray-900">Unit of Account</h4>
              </div>
              <p className="text-sm text-gray-600">
                Money provides a standard way to measure and compare the value of different goods and services. 
                Everything can be priced in dollars, euros, or another currency.
              </p>
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">Think About This:</h4>
            <p className="text-yellow-700 text-sm">
              Imagine if we still used the barter system today. How would you buy a coffee? 
              What if the coffee shop owner doesn't want what you have to trade?
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'history-of-money',
      title: 'A Brief History of Money',  
      completed: completedSections.has('history-of-money'),
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold text-amber-600">1</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Barter System (Prehistoric - 3000 BC)</h4>
                <p className="text-sm text-gray-600 mt-1">
                  People traded goods and services directly. A farmer might trade wheat for tools, 
                  but this required a "double coincidence of wants" - both parties had to want what the other offered.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold text-amber-600">2</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Commodity Money (3000 BC - 700 BC)</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Items with intrinsic value became money: cattle, shells, salt, and precious metals. 
                  These items were useful in themselves but also served as currency.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold text-amber-600">3</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Metal Coins (700 BC - 1000 AD)</h4>
                <p className="text-sm text-gray-600 mt-1">
                  The first coins were made in ancient Turkey around 650 BC. Coins were portable, 
                  durable, and their value was guaranteed by the government that issued them.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold text-amber-600">4</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Paper Money (1000 AD - 1970s)</h4>
                <p className="text-sm text-gray-600 mt-1">
                  China first used paper money around 1000 AD. Initially, paper money was backed by gold or silver, 
                  meaning you could exchange it for a specific amount of precious metal.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold text-amber-600">5</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Fiat Money (1970s - Present)</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Modern money is "fiat" currency - it has value because the government declares it does, 
                  not because it's backed by gold. The US ended the gold standard in 1971.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold text-amber-600">6</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Digital Money (1990s - Present)</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Credit cards, online banking, and mobile payments have made money increasingly digital. 
                  Cryptocurrency, starting with Bitcoin in 2009, represents the newest evolution.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'modern-financial-system',
      title: 'How Our Modern Financial System Works',
      completed: completedSections.has('modern-financial-system'),
      content: (
        <div className="space-y-6">
          <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
            <p className="text-lg leading-relaxed text-gray-700">
              Today's financial system is a complex network of institutions, markets, and regulations 
              that help money flow through the economy efficiently and safely.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Building2 className="w-5 h-5 text-blue-600 mr-2" />
                <h4 className="font-semibold text-gray-900">Central Banks</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Central banks (like the Federal Reserve in the US) control monetary policy, 
                regulate commercial banks, and act as the "bank for banks."
              </p>
              <div className="text-xs bg-blue-50 p-2 rounded">
                <strong>Key Functions:</strong> Control interest rates, manage inflation, 
                ensure financial stability
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Banknote className="w-5 h-5 text-green-600 mr-2" />
                <h4 className="font-semibold text-gray-900">Commercial Banks</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Regular banks where individuals and businesses keep their money, get loans, 
                and access financial services.
              </p>
              <div className="text-xs bg-green-50 p-2 rounded">
                <strong>Key Functions:</strong> Accept deposits, provide loans, 
                facilitate payments
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <TrendingUp className="w-5 h-5 text-purple-600 mr-2" />
                <h4 className="font-semibold text-gray-900">Financial Markets</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Places where people buy and sell financial assets like stocks, bonds, 
                and currencies. Includes stock exchanges and bond markets.
              </p>
              <div className="text-xs bg-purple-50 p-2 rounded">
                <strong>Key Functions:</strong> Price discovery, capital allocation, 
                risk management
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Globe className="w-5 h-5 text-orange-600 mr-2" />
                <h4 className="font-semibold text-gray-900">Payment Systems</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Networks that allow money to move between people and institutions. 
                Includes wire transfers, card networks, and digital payment platforms.
              </p>
              <div className="text-xs bg-orange-50 p-2 rounded">
                <strong>Examples:</strong> SWIFT, Visa/Mastercard, ACH, 
                PayPal, Apple Pay
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Why This System Exists</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• <strong>Trust:</strong> Regulations and institutions create trust between strangers</li>
              <li>• <strong>Efficiency:</strong> Specialized institutions handle financial tasks better than individuals</li>
              <li>• <strong>Stability:</strong> Central oversight helps prevent financial crises</li>
              <li>• <strong>Access:</strong> Financial services become available to more people</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'inflation-and-monetary-policy',
      title: 'Inflation and Monetary Policy',
      completed: completedSections.has('inflation-and-monetary-policy'),
      content: (
        <div className="space-y-6">
          <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
            <p className="text-lg leading-relaxed text-gray-700">
              <GlossaryTooltip term="Inflation">
                <strong>Inflation</strong>
              </GlossaryTooltip> is when prices of goods and services increase over time, 
              which means your money loses purchasing power. Understanding inflation is crucial 
              for making smart financial decisions.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">What Causes Inflation?</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h5 className="font-semibold text-gray-900 mb-2">Demand-Pull Inflation</h5>
                <p className="text-sm text-gray-600">
                  When demand for goods and services exceeds supply. 
                  If everyone wants to buy houses but there aren't enough houses, prices go up.
                </p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h5 className="font-semibold text-gray-900 mb-2">Cost-Push Inflation</h5>
                <p className="text-sm text-gray-600">
                  When the costs of production increase. If oil prices rise, 
                  transportation costs increase, making everything more expensive.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">How Central Banks Control Inflation</h4>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h5 className="font-semibold text-blue-800 mb-3">Monetary Policy Tools</h5>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-semibold">1</span>
                  </div>
                  <div>
                    <h6 className="font-semibold text-blue-800">Interest Rates</h6>
                    <p className="text-sm text-blue-700">
                      Higher rates make borrowing expensive → less spending → lower inflation
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-semibold">2</span>
                  </div>
                  <div>
                    <h6 className="font-semibold text-blue-800">Money Supply</h6>
                    <p className="text-sm text-blue-700">
                      Less money in circulation → less spending → lower inflation
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-semibold">3</span>
                  </div>
                  <div>
                    <h6 className="font-semibold text-blue-800">Reserve Requirements</h6>
                    <p className="text-sm text-blue-700">
                      Banks must hold more money in reserve → less lending → less spending
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">Why Does This Matter to You?</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Your savings lose value if inflation is higher than your savings account interest rate</li>
              <li>• Fixed-rate debt becomes cheaper to pay off during inflation</li>
              <li>• Your salary may not keep up with rising prices</li>
              <li>• Investment decisions should consider inflation risk</li>
            </ul>
          </div>
        </div>
      )
    }
  ]

  const progress = (completedSections.size / sections.length) * 100

  const quizQuestions = [
    {
      id: 'money-functions',
      question: 'What are the three main functions of money?',
      options: [
        'Store of value, medium of exchange, unit of account',
        'Saving, spending, investing',
        'Cash, credit, cryptocurrency',
        'Earning, borrowing, lending'
      ],
      correctAnswer: 0,
      explanation: 'Money serves as a store of value (saving purchasing power), medium of exchange (facilitating trade), and unit of account (measuring value).'
    },
    {
      id: 'fiat-money',
      question: 'What is fiat money?',
      options: [
        'Money backed by gold',
        'Money that has value because the government declares it does',
        'Money made of precious metals',
        'Money that can only be used digitally'
      ],
      correctAnswer: 1,
      explanation: 'Fiat money has value because the government declares it legal tender, not because it\'s backed by physical commodities like gold.'
    },
    {
      id: 'inflation-cause',
      question: 'What typically happens when there is high inflation?',
      options: [
        'Your money gains purchasing power',
        'Prices decrease over time',
        'Your money loses purchasing power',
        'Interest rates automatically decrease'
      ],
      correctAnswer: 2,
      explanation: 'During inflation, prices rise, which means each unit of currency buys fewer goods and services - your money loses purchasing power.'
    },
    {
      id: 'central-bank-role',
      question: 'What is a key role of central banks?',
      options: [
        'To provide personal banking services to individuals',
        'To control monetary policy and regulate commercial banks',
        'To compete with commercial banks for customers',
        'To invest in the stock market'
      ],
      correctAnswer: 1,
      explanation: 'Central banks control monetary policy (like interest rates), regulate commercial banks, and work to maintain financial stability.'
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
            title="Money & Financial Systems Quiz"
            questions={quizQuestions}
            onComplete={handleQuizComplete}
          />
          
          {quizCompleted && (
            <div className="mt-6">
              <Link 
                href="/education/personal-finance"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Continue to Personal Finance Fundamentals
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
                <Banknote className="w-8 h-8 text-blue-600" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Introduction to Money & Financial Systems</h1>
                <p className="text-gray-600 mb-4">
                  Learn the fundamentals of money, how financial systems work, and why they matter for your financial future. 
                  This foundational knowledge will help you understand both traditional finance and cryptocurrency.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    20 min read
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
                <li>• The three essential functions of money and why they matter</li>
                <li>• How money evolved from barter systems to digital payments</li>
                <li>• The structure of modern financial systems and key institutions</li>
                <li>• How inflation works and why central banks try to control it</li>
                <li>• The foundation needed to understand cryptocurrency's role in finance</li>
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
                  Take the quiz to demonstrate your understanding and unlock the next module
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
              <h3 className="font-semibold text-green-800 mb-2">🎉 Great Job!</h3>
              <p className="text-green-700 text-sm mb-4">
                You've mastered the fundamentals of money and financial systems. 
                Now you're ready to learn about personal finance management.
              </p>
              <Link 
                href="/education/personal-finance"
                className="inline-flex items-center text-green-700 hover:text-green-800 font-medium"
              >
                Continue to Personal Finance Fundamentals
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 