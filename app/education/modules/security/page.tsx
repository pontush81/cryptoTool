'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, Shield, Calendar, User, Lock, AlertTriangle, Eye, Smartphone, ArrowRight } from 'lucide-react'

interface Section {
  id: string
  title: string
  content: React.ReactNode
  completed: boolean
}

export default function SecurityPage() {
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
      id: 'wallet-security',
      title: 'Wallet Security Best Practices',
      completed: completedSections.has('wallet-security'),
      content: (
        <div className="space-y-6">
          <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
            <p className="text-lg leading-relaxed text-gray-700">
              <strong>Your private keys are everything</strong> in cryptocurrency. If someone gets your private keys, 
              they can steal all your crypto. If you lose your private keys, your crypto is gone forever.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">The Golden Rules</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Lock className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-green-900">Never Share Private Keys</h5>
                    <p className="text-sm text-gray-600 mt-1">
                      Your private keys or seed phrase should never be entered online, emailed, or shared with anyone.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-blue-900">Use Hardware Wallets</h5>
                    <p className="text-sm text-gray-600 mt-1">
                      For amounts over $1000, use a hardware wallet like Ledger or Trezor.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Eye className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-purple-900">Write Down Seed Phrases</h5>
                    <p className="text-sm text-gray-600 mt-1">
                      Write your 12-24 word seed phrase on paper and store it in multiple secure locations.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Smartphone className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-orange-900">Enable 2FA Everywhere</h5>
                    <p className="text-sm text-gray-600 mt-1">
                      Use Google Authenticator or similar apps, never SMS for 2FA.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Seed Phrase Security</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h5 className="font-semibold text-green-900 mb-3">✅ Do This</h5>
                <div className="space-y-2 text-sm text-green-800">
                  <div>• Write on paper or metal</div>
                  <div>• Store in multiple locations</div>
                  <div>• Use a safety deposit box</div>
                  <div>• Tell trusted family where it is</div>
                  <div>• Make multiple copies</div>
                  <div>• Test recovery process</div>
                </div>
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h5 className="font-semibold text-red-900 mb-3">❌ Never Do This</h5>
                <div className="space-y-2 text-sm text-red-800">
                  <div>• Store on phone/computer</div>
                  <div>• Take a photo of it</div>
                  <div>• Save in cloud storage</div>
                  <div>• Email it to yourself</div>
                  <div>• Share with strangers</div>
                  <div>• Enter it online</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'common-scams',
      title: 'Recognizing Common Scams',
      completed: completedSections.has('common-scams'),
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700">
            The crypto space unfortunately attracts many scammers. Being able to recognize common scams 
            is essential to protecting yourself and your money.
          </p>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Common Scam Types</h4>
            <div className="space-y-6">
              <div className="border-l-4 border-red-400 pl-4 bg-red-50 p-4 rounded-r-lg">
                <h5 className="font-semibold text-red-900 mb-2">Phishing Websites</h5>
                <p className="text-sm text-red-800 mb-2">
                  Fake websites that look identical to real exchanges or wallets.
                </p>
                <div className="text-xs text-red-700">
                  <div>• Always type URLs manually</div>
                  <div>• Check for HTTPS and padlock icon</div>
                  <div>• Bookmark legitimate sites</div>
                </div>
              </div>
              
              <div className="border-l-4 border-orange-400 pl-4 bg-orange-50 p-4 rounded-r-lg">
                <h5 className="font-semibold text-orange-900 mb-2">Fake Support</h5>
                <p className="text-sm text-orange-800 mb-2">
                  Scammers pretending to be customer support asking for your private keys.
                </p>
                <div className="text-xs text-orange-700">
                  <div>• Real support never asks for private keys</div>
                  <div>• Always contact support through official channels</div>
                  <div>• Be suspicious of unsolicited help</div>
                </div>
              </div>
              
              <div className="border-l-4 border-purple-400 pl-4 bg-purple-50 p-4 rounded-r-lg">
                <h5 className="font-semibold text-purple-900 mb-2">Investment Scams</h5>
                <p className="text-sm text-purple-800 mb-2">
                  &quot;Get rich quick&quot; schemes promising guaranteed returns.
                </p>
                <div className="text-xs text-purple-700">
                  <div>• If it sounds too good to be true, it is</div>
                  <div>• No legitimate investment guarantees profits</div>
                  <div>• Research any investment thoroughly</div>
                </div>
              </div>
              
              <div className="border-l-4 border-blue-400 pl-4 bg-blue-50 p-4 rounded-r-lg">
                <h5 className="font-semibold text-blue-900 mb-2">Social Engineering</h5>
                <p className="text-sm text-blue-800 mb-2">
                  Scammers using personal information to gain your trust.
                </p>
                <div className="text-xs text-blue-700">
                  <div>• Be careful what you share on social media</div>
                  <div>• Never discuss your crypto holdings publicly</div>
                  <div>• Be suspicious of targeted messages</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="font-semibold text-yellow-900 mb-2">Red Flags to Watch For</h5>
                <div className="grid md:grid-cols-2 gap-2 text-sm text-yellow-800">
                  <div>• Urgency (&quot;Limited time offer!&quot;)</div>
                  <div>• Guaranteed profits</div>
                  <div>• Requests for private keys</div>
                  <div>• Unsolicited contact</div>
                  <div>• Poor spelling/grammar</div>
                  <div>• Pressure to act quickly</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'exchange-security',
      title: 'Exchange Security',
      completed: completedSections.has('exchange-security'),
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700">
            While exchanges are convenient for buying and trading, they&apos;re also attractive targets for hackers. 
            Learn how to use them safely.
          </p>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Exchange Security Checklist</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <input type="checkbox" className="mt-1.5 h-4 w-4 text-blue-600 rounded" />
                <div>
                  <p className="font-medium text-gray-900">Enable 2FA with authenticator app</p>
                  <p className="text-sm text-gray-600">Never use SMS for 2FA - SIM swapping is common</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <input type="checkbox" className="mt-1.5 h-4 w-4 text-blue-600 rounded" />
                <div>
                  <p className="font-medium text-gray-900">Use unique, strong password</p>
                  <p className="text-sm text-gray-600">Use a password manager to generate and store complex passwords</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <input type="checkbox" className="mt-1.5 h-4 w-4 text-blue-600 rounded" />
                <div>
                  <p className="font-medium text-gray-900">Enable withdrawal whitelist</p>
                  <p className="text-sm text-gray-600">Only allow withdrawals to pre-approved addresses</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <input type="checkbox" className="mt-1.5 h-4 w-4 text-blue-600 rounded" />
                <div>
                  <p className="font-medium text-gray-900">Set up withdrawal limits</p>
                  <p className="text-sm text-gray-600">Limit how much can be withdrawn in 24 hours</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <input type="checkbox" className="mt-1.5 h-4 w-4 text-blue-600 rounded" />
                <div>
                  <p className="font-medium text-gray-900">Enable email notifications</p>
                  <p className="text-sm text-gray-600">Get alerts for all account activity</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <input type="checkbox" className="mt-1.5 h-4 w-4 text-blue-600 rounded" />
                <div>
                  <p className="font-medium text-gray-900">Regular security checkups</p>
                  <p className="text-sm text-gray-600">Review active sessions and connected apps monthly</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Choosing Secure Exchanges</h4>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-green-900 mb-2">Look For:</h5>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div>• Long track record (5+ years)</div>
                    <div>• Proper regulatory compliance</div>
                    <div>• Insurance for user funds</div>
                    <div>• Cold storage for most funds</div>
                    <div>• Regular security audits</div>
                    <div>• Transparent about incidents</div>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-semibold text-red-900 mb-2">Avoid:</h5>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div>• New exchanges with no history</div>
                    <div>• Unregulated in major jurisdictions</div>
                    <div>• History of major hacks</div>
                    <div>• No insurance or cold storage</div>
                    <div>• Poor customer service</div>
                    <div>• Unrealistic rewards/yields</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 text-sm">
              <strong>Remember:</strong> Even the most secure exchanges can be hacked. Never store large amounts 
              on exchanges long-term. Move your crypto to your own wallet where you control the private keys.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'risk-management',
      title: 'Risk Management Strategies',
      completed: completedSections.has('risk-management'),
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700">
            Cryptocurrency investing involves significant risks. Proper risk management helps protect 
            your capital and mental health in this volatile market.
          </p>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Investment Risk Principles</h4>
            <div className="space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h5 className="font-semibold text-red-900 mb-2">Rule #1: Only Invest What You Can Afford to Lose</h5>
                <p className="text-sm text-red-800">
                  Cryptocurrency should be considered high-risk speculation, not guaranteed investment. 
                  Never invest rent money, emergency funds, or money you need for necessities.
                </p>
              </div>
              
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h5 className="font-semibold text-orange-900 mb-2">Rule #2: Diversify Your Portfolio</h5>
                <p className="text-sm text-orange-800">
                  Don&apos;t put all your money in one cryptocurrency. Consider Bitcoin as your largest holding, 
                  but also explore other established projects.
                </p>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h5 className="font-semibold text-blue-900 mb-2">Rule #3: Dollar-Cost Average</h5>
                <p className="text-sm text-blue-800">
                  Instead of trying to time the market, invest a fixed amount regularly. 
                  This reduces the impact of volatility over time.
                </p>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h5 className="font-semibold text-green-900 mb-2">Rule #4: Have an Exit Strategy</h5>
                <p className="text-sm text-green-800">
                  Decide in advance when you might sell - both for profits and to cut losses. 
                  Emotion-driven decisions are usually bad decisions.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Sample Portfolio Allocation</h4>
            <div className="space-y-4">
              <div className="text-sm text-gray-600 mb-4">
                This is just an example - do your own research and consult financial advisors.
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <span className="font-medium text-orange-900">Bitcoin (BTC)</span>
                  <span className="text-orange-700">50-60%</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium text-blue-900">Ethereum (ETH)</span>
                  <span className="text-blue-700">20-30%</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <span className="font-medium text-purple-900">Other Altcoins</span>
                  <span className="text-purple-700">10-20%</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="font-medium text-green-900">Stablecoins (for opportunities)</span>
                  <span className="text-green-700">5-10%</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="font-semibold text-yellow-900 mb-2">Emotional Management</h5>
                <p className="text-sm text-yellow-800">
                  Crypto markets are extremely volatile. Prices can drop 50% or more in days. 
                  If you find yourself constantly checking prices or losing sleep over your investments, 
                  you&apos;ve probably invested too much.
                </p>
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
              <Link href="/education" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-3">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Education Hub
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Security & Risks</h1>
              <p className="text-gray-600 mt-1">
                Protecting your crypto and understanding the risks
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
              <div className="p-3 bg-red-100 rounded-lg">
                <Shield className="w-8 h-8 text-red-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Course Overview</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    18 min read
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
                  className="bg-red-600 h-3 rounded-full transition-all duration-300"
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
          <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-lg shadow-sm p-6 text-white">
            <h3 className="text-xl font-semibold mb-3">Master Advanced Concepts</h3>
            <p className="mb-4 opacity-90">
              Ready to dive deeper? Learn about DeFi, smart contracts, and advanced trading strategies.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/education/advanced">
                <button className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center">
                  Explore Advanced Topics
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </Link>
              <Link href="/education">
                <button className="bg-red-700 bg-opacity-50 text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-60 transition-colors">
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