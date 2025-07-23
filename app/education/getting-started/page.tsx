'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, TrendingUp, Calendar, User, Wallet, CreditCard, Shield, AlertTriangle, ArrowRight } from 'lucide-react'

interface Section {
  id: string
  title: string
  content: React.ReactNode
  completed: boolean
}

export default function GettingStartedPage() {
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
      id: 'choosing-exchange',
      title: 'Choosing a Cryptocurrency Exchange',
      completed: completedSections.has('choosing-exchange'),
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
            <p className="text-lg leading-relaxed text-gray-700">
              A <strong>cryptocurrency exchange</strong> is like a digital marketplace where you can buy, sell, and trade cryptocurrencies. 
              Choosing the right exchange is crucial for your crypto journey.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Popular Beginner-Friendly Exchanges</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h5 className="font-semibold text-green-600 mb-2">Coinbase</h5>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>• Very user-friendly interface</div>
                  <div>• Strong regulatory compliance</div>
                  <div>• Higher fees but more security</div>
                  <div>• Great for beginners</div>
                  <div>• Mobile app available</div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h5 className="font-semibold text-blue-600 mb-2">Kraken</h5>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>• Lower fees than Coinbase</div>
                  <div>• Good security track record</div>
                  <div>• More advanced features</div>
                  <div>• European-friendly</div>
                  <div>• Better for trading</div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h5 className="font-semibold text-purple-600 mb-2">Binance</h5>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>• Lowest fees</div>
                  <div>• Largest selection of coins</div>
                  <div>• Advanced trading features</div>
                  <div>• Can be overwhelming for beginners</div>
                  <div>• Strong global presence</div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h5 className="font-semibold text-orange-600 mb-2">Gemini</h5>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>• Regulated in New York</div>
                  <div>• Very secure</div>
                  <div>• Clean, simple interface</div>
                  <div>• Higher fees</div>
                  <div>• Limited coin selection</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-yellow-800">
                  <strong>Important:</strong> Always verify you&apos;re on the official website! Scammers create fake exchange websites to steal your information. 
                  Double-check the URL and look for security certificates.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'setting-up-account',
      title: 'Setting Up Your Account',
      completed: completedSections.has('setting-up-account'),
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700">
            Most reputable exchanges require <strong>KYC (Know Your Customer)</strong> verification. 
            This means you&apos;ll need to provide identification to comply with financial regulations.
          </p>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Account Setup Steps</h4>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-blue-600">1</span>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900">Create Account</h5>
                  <p className="text-sm text-gray-600 mt-1">
                    Sign up with your email and create a strong, unique password. Enable 2FA immediately!
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-green-600">2</span>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900">Verify Email</h5>
                  <p className="text-sm text-gray-600 mt-1">
                    Click the verification link sent to your email address.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-purple-600">3</span>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900">Complete KYC Verification</h5>
                  <p className="text-sm text-gray-600 mt-1">
                    Upload a government-issued ID (passport, driver&apos;s license) and sometimes a proof of address.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-orange-600">4</span>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900">Link Payment Method</h5>
                  <p className="text-sm text-gray-600 mt-1">
                    Connect your bank account, debit card, or credit card for funding your purchases.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800 text-sm">
              <strong>Pro Tip:</strong> Verification can take anywhere from minutes to several days. 
              Start this process early, and never share your verification documents with anyone else!
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'first-purchase',
      title: 'Making Your First Purchase',
      completed: completedSections.has('first-purchase'),
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700">
            Ready to buy your first Bitcoin? Start small! It&apos;s better to learn with a small amount than risk money you can&apos;t afford to lose.
          </p>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Purchase Process</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="border-l-4 border-blue-400 pl-4">
                  <h5 className="font-semibold text-blue-900">Market Order</h5>
                  <p className="text-sm text-gray-600 mt-1">
                    Buy immediately at current market price. Best for beginners - simple and fast.
                  </p>
                </div>
                
                <div className="border-l-4 border-green-400 pl-4">
                  <h5 className="font-semibold text-green-900">Limit Order</h5>
                  <p className="text-sm text-gray-600 mt-1">
                    Set a specific price you want to pay. The order executes when the price reaches your target.
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="font-semibold text-gray-900 mb-3">Beginner Strategy</h5>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>• Start with $25-$100</div>
                  <div>• Use market orders initially</div>
                  <div>• Focus on Bitcoin first</div>
                  <div>• Dollar-cost average over time</div>
                  <div>• Don&apos;t try to time the market</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Understanding Fees</h4>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fee Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Typical Range</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">When Applied</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-4 font-medium text-gray-900">Trading Fee</td>
                    <td className="px-4 py-4 text-gray-600">0.1% - 1.5%</td>
                    <td className="px-4 py-4 text-gray-600">Every buy/sell transaction</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-4 font-medium text-gray-900">Deposit Fee</td>
                    <td className="px-4 py-4 text-gray-600">Free - 3.99%</td>
                    <td className="px-4 py-4 text-gray-600">Adding money to exchange</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-4 font-medium text-gray-900">Withdrawal Fee</td>
                    <td className="px-4 py-4 text-gray-600">$0.50 - $25</td>
                    <td className="px-4 py-4 text-gray-600">Moving crypto to your wallet</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-red-800">
                  <strong>Golden Rule:</strong> Never invest more than you can afford to lose completely. 
                  Cryptocurrency is highly volatile and risky. Start small and learn as you go.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'wallets-explained',
      title: 'Understanding Wallets',
      completed: completedSections.has('wallets-explained'),
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700">
            A <strong>cryptocurrency wallet</strong> doesn&apos;t actually store your Bitcoin - it stores the private keys 
            that prove you own Bitcoin on the blockchain. Understanding wallets is crucial for security.
          </p>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Types of Wallets</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="border border-orange-200 rounded-lg p-4 bg-orange-50">
                  <div className="flex items-center mb-3">
                    <Wallet className="w-5 h-5 text-orange-600 mr-2" />
                    <h5 className="font-semibold text-orange-900">Hot Wallets</h5>
                  </div>
                  <p className="text-sm text-orange-800 mb-3">Connected to the internet</p>
                  <div className="space-y-1 text-xs text-orange-700">
                    <div>✓ Easy to use</div>
                    <div>✓ Quick transactions</div>
                    <div>✓ Free</div>
                    <div>✗ More vulnerable to hacks</div>
                    <div>✗ Dependent on internet</div>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600">
                  <strong>Examples:</strong> Mobile apps (Exodus, Trust Wallet), Exchange wallets, Web wallets
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                  <div className="flex items-center mb-3">
                    <Shield className="w-5 h-5 text-blue-600 mr-2" />
                    <h5 className="font-semibold text-blue-900">Cold Wallets</h5>
                  </div>
                  <p className="text-sm text-blue-800 mb-3">Offline storage</p>
                  <div className="space-y-1 text-xs text-blue-700">
                    <div>✓ Maximum security</div>
                    <div>✓ Not hackable when offline</div>
                    <div>✓ Long-term storage</div>
                    <div>✗ Less convenient</div>
                    <div>✗ Cost money</div>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600">
                  <strong>Examples:</strong> Hardware wallets (Ledger, Trezor), Paper wallets
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Wallet Security Levels</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-red-50 border border-red-200">
                <div>
                  <span className="font-medium text-red-900">Exchange Wallet</span>
                  <p className="text-xs text-red-700">Easiest but least secure</p>
                </div>
                <div className="text-red-600 text-sm">Risk: High</div>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                <div>
                  <span className="font-medium text-yellow-900">Mobile/Desktop Wallet</span>
                  <p className="text-xs text-yellow-700">Good balance of security and convenience</p>
                </div>
                <div className="text-yellow-600 text-sm">Risk: Medium</div>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-200">
                <div>
                  <span className="font-medium text-green-900">Hardware Wallet</span>
                  <p className="text-xs text-green-700">Most secure for significant amounts</p>
                </div>
                <div className="text-green-600 text-sm">Risk: Low</div>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <p className="text-purple-800 text-sm">
              <strong>Best Practice:</strong> Use exchange wallets for small amounts you&apos;re actively trading, 
              mobile wallets for medium amounts, and hardware wallets for your long-term savings. 
              &quot;Not your keys, not your crypto!&quot;
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
              <h1 className="text-2xl font-bold text-gray-900">Getting Started</h1>
              <p className="text-gray-600 mt-1">
                How to buy, store, and use cryptocurrency safely
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
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Course Overview</h2>
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

          {/* Next Steps */}
          <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-lg shadow-sm p-6 text-white">
            <h3 className="text-xl font-semibold mb-3">Secure Your Investment</h3>
            <p className="mb-4 opacity-90">
              Now that you know how to get started, learn about security best practices to protect your cryptocurrency.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/education/security">
                <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center">
                  Learn Security Practices
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </Link>
              <Link href="/education">
                <button className="bg-green-700 bg-opacity-50 text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-60 transition-colors">
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