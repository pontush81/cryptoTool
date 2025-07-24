'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, Coins, Calendar, User, TrendingUp, ArrowRight, Shield, Globe, DollarSign, AlertTriangle, Clock, Zap, Building, Target, Brain, Eye } from 'lucide-react'
import QuizComponent from '../../../../../components/QuizComponent'

interface Section {
  id: string
  title: string
  content: React.ReactNode
  completed: boolean
}

export default function BitcoinDigitalGoldPage() {
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
      // Save completion to localStorage for both Market Categories and Foundation Track cross-reference
      const completedLayer1Modules = JSON.parse(localStorage.getItem('completedLayer1Modules') || '[]')
      if (!completedLayer1Modules.includes('bitcoin-digital-gold')) {
        completedLayer1Modules.push('bitcoin-digital-gold')
        localStorage.setItem('completedLayer1Modules', JSON.stringify(completedLayer1Modules))
      }
      
      // Set mastery level based on score for Layer 1 track
      const layer1MasteryLevels = JSON.parse(localStorage.getItem('layer1MasteryLevels') || '{}')
      layer1MasteryLevels['bitcoin-digital-gold'] = score >= 90 ? 'excellent' : score >= 80 ? 'good' : 'basic'
      localStorage.setItem('layer1MasteryLevels', JSON.stringify(layer1MasteryLevels))
    }
  }

  const sections: Section[] = [
    {
      id: 'digital-scarcity',
      title: 'Digital Scarcity: The 21 Million Bitcoin Cap',
      completed: completedSections.has('digital-scarcity'),
      content: (
        <div className="space-y-6">
          <div className="bg-orange-50 border-l-4 border-orange-400 p-6 rounded-r-lg">
            <p className="text-lg leading-relaxed text-gray-700">
              Bitcoin's most revolutionary feature is its <strong>absolute scarcity</strong>. Unlike fiat currencies that can be printed infinitely, 
              only <strong>21 million bitcoins</strong> will ever exist. This mathematical certainty creates digital gold—the first truly scarce digital asset.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">The Mathematics of Scarcity</h4>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h5 className="font-semibold text-gray-800 mb-3">Bitcoin's Supply Schedule</h5>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded border">
                    <p className="font-semibold text-blue-600 text-lg">50 BTC</p>
                    <p className="text-sm text-gray-600">Initial block reward (2009-2012)</p>
                    <p className="text-xs text-gray-500">First halving era</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded border">
                    <p className="font-semibold text-blue-600 text-lg">25 BTC</p>
                    <p className="text-sm text-gray-600">After 1st halving (2012-2016)</p>
                    <p className="text-xs text-gray-500">Second halving era</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-white p-4 rounded border">
                    <p className="font-semibold text-blue-600 text-lg">12.5 BTC</p>
                    <p className="text-sm text-gray-600">After 2nd halving (2016-2020)</p>
                    <p className="text-xs text-gray-500">Third halving era</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded border">
                    <p className="font-semibold text-blue-600 text-lg">6.25 BTC</p>
                    <p className="text-sm text-gray-600">After 3rd halving (2020-2024)</p>
                    <p className="text-xs text-gray-500">Current era</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 bg-orange-50 p-3 rounded border border-orange-200">
                <p className="text-sm text-orange-800">
                  <strong>Key Insight:</strong> Every 210,000 blocks (~4 years), the mining reward halves automatically. 
                  This creates predictable, decreasing inflation until approximately 2140 when the last bitcoin is mined.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Why Scarcity Matters</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Shield className="w-5 h-5 text-blue-500 mr-2" />
                  <h5 className="font-semibold text-blue-800">Inflation Protection</h5>
                </div>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• No central authority can create more bitcoin</li>
                  <li>• Predictable, decreasing inflation schedule</li>
                  <li>• Fixed supply immune to monetary policy changes</li>
                  <li>• Mathematical guarantees vs. government promises</li>
                </ul>
              </div>
              
              <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <TrendingUp className="w-5 h-5 text-green-500 mr-2" />
                  <h5 className="font-semibold text-green-800">Store of Value Properties</h5>
                </div>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Durability: Digital, cannot be destroyed</li>
                  <li>• Portability: Transfer globally in minutes</li>
                  <li>• Divisibility: Up to 8 decimal places</li>
                  <li>• Uniformity: Every bitcoin is identical</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">🏛️ Central Bank vs. Bitcoin</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-red-600 mb-2">Central Bank Money</p>
                <ul className="text-red-600 space-y-1">
                  <li>• Unlimited money printing capability</li>
                  <li>• Supply controlled by political decisions</li>
                  <li>• Historical inflation average 2-3% annually</li>
                  <li>• Emergency printing (2008, 2020) can be extreme</li>
                </ul>
              </div>
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-green-600 mb-2">Bitcoin</p>
                <ul className="text-green-600 space-y-1">
                  <li>• Maximum 21 million coins, mathematically enforced</li>
                  <li>• Supply controlled by code, not politicians</li>
                  <li>• Deflationary: decreasing issuance rate</li>
                  <li>• No emergency "money printing" possible</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'institutional-adoption',
      title: 'Institutional Adoption: From Experiment to Treasury Asset',
      completed: completedSections.has('institutional-adoption'),
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
            <p className="text-lg leading-relaxed text-gray-700">
              The narrative around Bitcoin has evolved from "internet money" to <strong>"digital gold"</strong> as major institutions, 
              corporations, and even governments recognize its value as a treasury asset and hedge against inflation.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Corporate Treasury Adoption</h4>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h5 className="font-semibold text-gray-800 mb-4">Major Corporate Bitcoin Holdings</h5>
              
              <div className="space-y-3">
                <div className="bg-white p-4 rounded border">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <Building className="w-5 h-5 text-blue-600 mr-2" />
                      <h6 className="font-semibold text-gray-900">MicroStrategy</h6>
                    </div>
                    <span className="text-lg font-bold text-blue-600">129,218 BTC</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Business intelligence company, first major corporate adopter</p>
                  <p className="text-xs text-gray-500">Strategy: "Bitcoin as primary treasury reserve asset"</p>
                </div>
                
                <div className="bg-white p-4 rounded border">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <Zap className="w-5 h-5 text-green-600 mr-2" />
                      <h6 className="font-semibold text-gray-900">Tesla</h6>
                    </div>
                    <span className="text-lg font-bold text-green-600">~9,720 BTC</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Electric vehicle manufacturer, briefly accepted BTC payments</p>
                  <p className="text-xs text-gray-500">Strategy: "Alternative to cash on balance sheet"</p>
                </div>
                
                <div className="bg-white p-4 rounded border">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <Globe className="w-5 h-5 text-purple-600 mr-2" />
                      <h6 className="font-semibold text-gray-900">Block (Square)</h6>
                    </div>
                    <span className="text-lg font-bold text-purple-600">8,027 BTC</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Fintech company, heavy Bitcoin ecosystem builder</p>
                  <p className="text-xs text-gray-500">Strategy: "Long-term investment in economic empowerment"</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Why Institutions Choose Bitcoin</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-orange-50 border-l-4 border-orange-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Shield className="w-5 h-5 text-orange-500 mr-2" />
                  <h5 className="font-semibold text-orange-800">Inflation Hedge</h5>
                </div>
                <p className="text-sm text-orange-700">
                  With central banks printing trillions, Bitcoin offers protection against currency debasement and inflation.
                </p>
              </div>
              
              <div className="bg-purple-50 border-l-4 border-purple-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Target className="w-5 h-5 text-purple-500 mr-2" />
                  <h5 className="font-semibold text-purple-800">Portfolio Diversification</h5>
                </div>
                <p className="text-sm text-purple-700">
                  Low correlation with traditional assets provides portfolio diversification benefits during economic uncertainty.
                </p>
              </div>
              
              <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Globe className="w-5 h-5 text-green-500 mr-2" />
                  <h5 className="font-semibold text-green-800">Digital Transformation</h5>
                </div>
                <p className="text-sm text-green-700">
                  Represents the future of digital, programmable money and aligns with technology-forward companies.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Government & Nation-State Adoption</h4>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="space-y-3">
                <div className="bg-blue-50 p-4 rounded border border-blue-200">
                  <div className="flex items-center mb-2">
                    <Building className="w-5 h-5 text-blue-600 mr-2" />
                    <h6 className="font-semibold text-blue-800">El Salvador</h6>
                  </div>
                  <p className="text-sm text-blue-700 mb-2">First country to make Bitcoin legal tender (September 2021)</p>
                  <ul className="text-xs text-blue-600 space-y-1">
                    <li>• Citizens can pay taxes in Bitcoin</li>
                    <li>• Government holds ~2,381 BTC in treasury</li>
                    <li>• Built Bitcoin city and geothermal mining</li>
                    <li>• Reduced remittance costs from diaspora</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 p-4 rounded border border-green-200">
                  <div className="flex items-center mb-2">
                    <Target className="w-5 h-5 text-green-600 mr-2" />
                    <h6 className="font-semibold text-green-800">Central African Republic</h6>
                  </div>
                  <p className="text-sm text-green-700 mb-2">Second country to adopt Bitcoin as legal tender</p>
                  <ul className="text-xs text-green-600 space-y-1">
                    <li>• Launched "Sango" Bitcoin project</li>
                    <li>• Aims to attract crypto investment</li>
                    <li>• Focus on economic development</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">📊 Institutional Impact on Bitcoin</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-green-600 mb-1">Positive Effects</p>
                <ul className="text-green-600 space-y-1">
                  <li>• Increased legitimacy and mainstream acceptance</li>
                  <li>• Better regulatory clarity and compliance</li>
                  <li>• Professional custody and infrastructure</li>
                  <li>• Higher price stability over time</li>
                </ul>
              </div>
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-orange-600 mb-1">Considerations</p>
                <ul className="text-orange-600 space-y-1">
                  <li>• Large holders can influence price significantly</li>
                  <li>• Regulatory changes affect institutional appetite</li>
                  <li>• Correlation with traditional markets may increase</li>
                  <li>• ESG concerns from some institutional investors</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'bitcoin-vs-gold',
      title: 'Bitcoin vs. Traditional Gold: Digital vs. Physical Store of Value',
      completed: completedSections.has('bitcoin-vs-gold'),
      content: (
        <div className="space-y-6">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
            <p className="text-lg leading-relaxed text-gray-700">
              For thousands of years, <strong>gold</strong> has been humanity's premier store of value. Bitcoin challenges this 
              by offering <strong>digital gold</strong>—all the benefits of gold with none of its physical limitations.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Head-to-Head Comparison</h4>
            
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-4 font-semibold text-gray-900 border-b">Property</th>
                    <th className="text-center p-4 font-semibold text-yellow-600 border-b">Gold</th>
                    <th className="text-center p-4 font-semibold text-orange-600 border-b">Bitcoin</th>
                    <th className="text-center p-4 font-semibold text-gray-700 border-b">Winner</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr className="border-b">
                    <td className="p-4 font-medium">Scarcity</td>
                    <td className="p-4 text-center text-sm">Limited by mining, ~190k tons exist</td>
                    <td className="p-4 text-center text-sm">Absolutely scarce: 21M maximum</td>
                    <td className="p-4 text-center">🟠 Bitcoin</td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="p-4 font-medium">Portability</td>
                    <td className="p-4 text-center text-sm">Heavy, expensive to transport</td>
                    <td className="p-4 text-center text-sm">Instantly transferable globally</td>
                    <td className="p-4 text-center">🟠 Bitcoin</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Divisibility</td>
                    <td className="p-4 text-center text-sm">Can be melted but loses purity</td>
                    <td className="p-4 text-center text-sm">8 decimal places (satoshis)</td>
                    <td className="p-4 text-center">🟠 Bitcoin</td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="p-4 font-medium">Verifiability</td>
                    <td className="p-4 text-center text-sm">Requires testing, can be faked</td>
                    <td className="p-4 text-center text-sm">Cryptographically verifiable</td>
                    <td className="p-4 text-center">🟠 Bitcoin</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Storage Cost</td>
                    <td className="p-4 text-center text-sm">Vaults, insurance, security</td>
                    <td className="p-4 text-center text-sm">Minimal (hardware wallet)</td>
                    <td className="p-4 text-center">🟠 Bitcoin</td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td className="p-4 font-medium">Track Record</td>
                    <td className="p-4 text-center text-sm">5,000+ years as store of value</td>
                    <td className="p-4 text-center text-sm">15+ years, still proving itself</td>
                    <td className="p-4 text-center">🟨 Gold</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Volatility</td>
                    <td className="p-4 text-center text-sm">Relatively stable</td>
                    <td className="p-4 text-center text-sm">High volatility</td>
                    <td className="p-4 text-center">🟨 Gold</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">Industrial Use</td>
                    <td className="p-4 text-center text-sm">Electronics, jewelry, medical</td>
                    <td className="p-4 text-center text-sm">Pure monetary/store of value</td>
                    <td className="p-4 text-center">🟨 Gold</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Market Dynamics</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Coins className="w-6 h-6 text-yellow-600 mr-3" />
                  <h5 className="font-semibold text-yellow-800">Gold Market</h5>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-sm text-gray-900 mb-1">Market Cap: ~$13 Trillion</p>
                    <p className="text-xs text-gray-600">All gold ever mined</p>
                  </div>
                  
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-sm text-gray-900 mb-1">Annual Production: ~3,300 tons</p>
                    <p className="text-xs text-gray-600">~1.7% inflation rate</p>
                  </div>
                  
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-sm text-gray-900 mb-1">Storage: Physical vaults</p>
                    <p className="text-xs text-gray-600">Costs 0.5-1% annually</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <DollarSign className="w-6 h-6 text-orange-600 mr-3" />
                  <h5 className="font-semibold text-orange-800">Bitcoin Market</h5>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-sm text-gray-900 mb-1">Market Cap: ~$800 Billion</p>
                    <p className="text-xs text-gray-600">All existing bitcoin</p>
                  </div>
                  
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-sm text-gray-900 mb-1">Annual Issuance: Decreasing</p>
                    <p className="text-xs text-gray-600">Currently ~1.8%, halving every 4 years</p>
                  </div>
                  
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-sm text-gray-900 mb-1">Storage: Digital wallets</p>
                    <p className="text-xs text-gray-600">Hardware wallet: ~$100 one-time</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">The Generational Shift</h4>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="space-y-4">
                <div className="bg-white p-4 rounded border">
                  <h5 className="font-semibold text-blue-800 mb-2">Millennials & Gen Z Preference</h5>
                  <p className="text-sm text-blue-700 mb-3">
                    Younger generations increasingly prefer Bitcoin over gold as their store of value hedge.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <p className="font-medium text-blue-800 text-sm mb-1">Why They Choose Bitcoin:</p>
                      <ul className="text-xs text-blue-600 space-y-1">
                        <li>• Native to digital economy</li>
                        <li>• Easy to buy on apps (Coinbase, etc.)</li>
                        <li>• No storage/insurance headaches</li>
                        <li>• 24/7 liquid markets</li>
                        <li>• Programmable and composable</li>
                      </ul>
                    </div>
                    
                    <div>
                      <p className="font-medium text-blue-800 text-sm mb-1">Gold's Disadvantages for Digital Natives:</p>
                      <ul className="text-xs text-blue-600 space-y-1">
                        <li>• Feels archaic and physical</li>
                        <li>• Complex to buy and store securely</li>
                        <li>• Limited trading hours</li>
                        <li>• Hard to use for payments</li>
                        <li>• No smart contract integration</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-2">💡 Key Takeaway: Complementary Assets</h4>
            <p className="text-sm text-green-700 leading-relaxed">
              Bitcoin and gold aren't necessarily competitors—they can be complementary in a portfolio. 
              Gold offers proven stability and industrial utility, while Bitcoin provides digital scarcity 
              and technological advantages. Many investors hold both as different types of "hard assets" 
              that protect against currency debasement and inflation.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'mining-economics',
      title: 'Mining Economics: Security Through Energy',
      completed: completedSections.has('mining-economics'),
      content: (
        <div className="space-y-6">
          <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
            <p className="text-lg leading-relaxed text-gray-700">
              Bitcoin mining isn't just about creating new coins—it's the <strong>security backbone</strong> of the network. 
              Miners spend real energy to secure the blockchain, making Bitcoin the most secure monetary network ever created.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">How Mining Secures Bitcoin</h4>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h5 className="font-semibold text-gray-800 mb-4">The Mining Process</h5>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded border">
                  <div className="flex items-center mb-2">
                    <Zap className="w-5 h-5 text-yellow-500 mr-2" />
                    <h6 className="font-semibold text-gray-900">1. Transaction Collection</h6>
                  </div>
                  <p className="text-sm text-gray-600">
                    Miners collect pending transactions from the mempool and package them into a block template.
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded border">
                  <div className="flex items-center mb-2">
                    <Brain className="w-5 h-5 text-blue-500 mr-2" />
                    <h6 className="font-semibold text-gray-900">2. Proof of Work Computation</h6>
                  </div>
                  <p className="text-sm text-gray-600">
                    Miners try trillions of random numbers (nonces) to find a hash that meets the difficulty requirement.
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded border">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    <h6 className="font-semibold text-gray-900">3. Block Reward</h6>
                  </div>
                  <p className="text-sm text-gray-600">
                    First miner to find valid proof gets the block reward (currently 6.25 BTC) plus transaction fees.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Mining Economics & Incentives</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h5 className="font-semibold text-blue-800 mb-3">Revenue Sources</h5>
                
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-sm text-gray-900 mb-1">Block Subsidy</p>
                    <p className="text-lg font-bold text-blue-600">6.25 BTC</p>
                    <p className="text-xs text-gray-600">Fixed reward per block (halves every 4 years)</p>
                  </div>
                  
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-sm text-gray-900 mb-1">Transaction Fees</p>
                    <p className="text-lg font-bold text-blue-600">0.1-2 BTC</p>
                    <p className="text-xs text-gray-600">Variable based on network congestion</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h5 className="font-semibold text-red-800 mb-3">Operating Costs</h5>
                
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-sm text-gray-900 mb-1">Electricity</p>
                    <p className="text-lg font-bold text-red-600">70-80%</p>
                    <p className="text-xs text-gray-600">Largest expense, varies by location</p>
                  </div>
                  
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-sm text-gray-900 mb-1">Equipment & Maintenance</p>
                    <p className="text-lg font-bold text-red-600">15-20%</p>
                    <p className="text-xs text-gray-600">ASIC miners, cooling, facilities</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">The Security Model</h4>
            
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h5 className="font-semibold text-purple-800 mb-3">Cost of Attack vs. Security Budget</h5>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded border">
                  <p className="font-semibold text-purple-800 mb-2">51% Attack Cost</p>
                  <p className="text-sm text-purple-700 mb-3">
                    To attack Bitcoin, someone would need to control majority of mining power. 
                    This requires enormous capital investment and ongoing electricity costs.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-purple-50 p-3 rounded">
                      <p className="font-semibold text-sm text-purple-800">Hardware Cost</p>
                      <p className="text-lg font-bold text-purple-600">$10+ Billion</p>
                      <p className="text-xs text-purple-600">To buy 51% of mining equipment</p>
                    </div>
                    
                    <div className="bg-purple-50 p-3 rounded">
                      <p className="font-semibold text-sm text-purple-800">Daily Electricity</p>
                      <p className="text-lg font-bold text-purple-600">$15+ Million</p>
                      <p className="text-xs text-purple-600">To run 51% of the network</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded border">
                  <p className="font-semibold text-green-800 mb-2">Why Attacks Are Irrational</p>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Enormous upfront and ongoing costs</li>
                    <li>• Success would destroy Bitcoin's value (and attacker's investment)</li>
                    <li>• More profitable to mine honestly than attack</li>
                    <li>• Network would likely fork away from attack</li>
                    <li>• Physical mining infrastructure is easily identified</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Energy Use & Sustainability</h4>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h5 className="font-semibold text-green-800 mb-3">The Energy Narrative</h5>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded border">
                    <p className="font-semibold text-red-600 mb-2">Critics Say:</p>
                    <ul className="text-sm text-red-600 space-y-1">
                      <li>• Bitcoin uses as much energy as small countries</li>
                      <li>• Wasteful proof-of-work consensus</li>
                      <li>• Environmental impact from fossil fuels</li>
                      <li>• Could be more efficient with proof-of-stake</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-4 rounded border">
                    <p className="font-semibold text-green-600 mb-2">Supporters Counter:</p>
                    <ul className="text-sm text-green-600 space-y-1">
                      <li>• Energy secures $800B+ digital asset</li>
                      <li>• Incentivizes renewable energy development</li>
                      <li>• Uses stranded/excess energy sources</li>
                      <li>• More efficient than traditional banking system</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded border border-blue-200">
                  <p className="font-semibold text-blue-800 mb-2">Sustainable Mining Trends</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-white p-3 rounded text-center">
                      <p className="text-lg font-bold text-green-600">56%</p>
                      <p className="text-xs text-gray-600">Sustainable energy mix (Bitcoin Mining Council)</p>
                    </div>
                    
                    <div className="bg-white p-3 rounded text-center">
                      <p className="text-lg font-bold text-blue-600">Growing</p>
                      <p className="text-xs text-gray-600">Solar & wind mining operations</p>
                    </div>
                    
                    <div className="bg-white p-3 rounded text-center">
                      <p className="text-lg font-bold text-purple-600">Flare Gas</p>
                      <p className="text-xs text-gray-600">Using waste gas from oil drilling</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ]

  const quizQuestions = [
    {
      id: 'btc-supply',
      question: "What is the maximum number of bitcoins that will ever exist?",
      options: [
        "18 million",
        "21 million", 
        "100 million",
        "Unlimited"
      ],
      correctAnswer: 1,
      explanation: "Bitcoin is hard-capped at 21 million coins, making it absolutely scarce. This limit is enforced by the protocol and cannot be changed without consensus from the entire network."
    },
    {
      id: 'btc-halving',
      question: "How often does the Bitcoin block reward halve?",
      options: [
        "Every 2 years",
        "Every 4 years",
        "Every 6 years", 
        "Every 10 years"
      ],
      correctAnswer: 1,
      explanation: "The Bitcoin halving occurs approximately every 4 years (210,000 blocks), reducing the mining reward by half. This creates a predictable, decreasing inflation schedule."
    },
    {
      id: 'btc-treasury',
      question: "Which company was the first major corporation to add Bitcoin to its treasury?",
      options: [
        "Tesla",
        "Block (Square)",
        "MicroStrategy",
        "PayPal"
      ],
      correctAnswer: 2,
      explanation: "MicroStrategy, led by Michael Saylor, was the first major public company to adopt Bitcoin as its primary treasury reserve asset, starting in August 2020."
    },
    {
      id: 'btc-mining-cost',
      question: "What is the primary cost for Bitcoin miners?",
      options: [
        "Equipment purchase",
        "Internet connectivity",
        "Electricity",
        "Staff salaries"
      ],
      correctAnswer: 2,
      explanation: "Electricity typically represents 70-80% of mining costs. This is why miners seek cheap, often renewable energy sources and why mining operations tend to relocate based on energy prices."
    },
    {
      id: 'btc-vs-gold',
      question: "Compared to gold, Bitcoin's main advantage is:",
      options: [
        "Lower volatility",
        "Longer track record",
        "Digital portability",
        "Industrial use cases"
      ],
      correctAnswer: 2,
      explanation: "Bitcoin's key advantage over gold is its digital nature—it can be transferred globally in minutes, stored without physical vaults, and verified cryptographically. However, gold has lower volatility and a much longer track record."
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link
              href="/education/market-categories/layer-1-blockchains"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Layer 1 Blockchains
            </Link>
            <div className="flex items-center space-x-4">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                Beginner
              </span>
              <span className="flex items-center text-gray-600 text-sm">
                <Clock className="w-4 h-4 mr-1" />
                45 min
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Coins className="w-12 h-12 text-orange-500 mr-4" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Bitcoin: Digital Gold & Store of Value</h1>
              <p className="text-lg text-gray-600 mt-2">Why Bitcoin is considered digital gold and the ultimate store of value</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center">
              <Target className="w-4 h-4 mr-1" />
              4 learning objectives
            </div>
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              Market Categories Track
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              Phase 1: Core
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Learning Progress</h2>
            <span className="text-sm text-gray-600">
              {completedSections.size}/{sections.length} sections completed
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completedSections.size / sections.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section.id} className="bg-white rounded-lg shadow-sm border">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${
                    section.completed ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    {section.completed ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                </div>
                <ArrowRight className={`w-5 h-5 text-gray-400 transition-transform ${
                  completedSections.has(section.id) ? 'rotate-90' : ''
                }`} />
              </button>
              
              {completedSections.has(section.id) && (
                <div className="px-6 pb-6">
                  <div className="border-t pt-6">
                    {section.content}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quiz Section */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Knowledge Check</h2>
              <p className="text-gray-600 mt-1">Test your understanding of Bitcoin as digital gold</p>
            </div>
            <div className="flex items-center space-x-2">
              {quizCompleted && (
                <div className="flex items-center text-green-600">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">Completed</span>
                </div>
              )}
            </div>
          </div>

          {completedSections.size === sections.length ? (
            <div>
              {!showQuiz && !quizCompleted && (
                <button
                  onClick={() => setShowQuiz(true)}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Start Knowledge Check
                </button>
              )}

              {showQuiz && (
                <QuizComponent
                  title="Bitcoin Digital Gold Quiz"
                  questions={quizQuestions}
                  onComplete={handleQuizComplete}
                />
              )}

              {quizCompleted && (
                <div className="text-center">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                    <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-green-900 mb-2">Module Completed!</h3>
                    <p className="text-green-700">
                      Great job! You've mastered Bitcoin as digital gold and store of value.
                    </p>
                  </div>
                  
                  <div className="flex justify-center space-x-4">
                    <Link
                      href="/education/market-categories/layer-1-blockchains/ethereum-smart-contracts"
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                    >
                      Next: Ethereum Smart Contracts
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                    
                    <Link
                      href="/education/market-categories/layer-1-blockchains"
                      className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Back to Category
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <Eye className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Complete all sections to unlock the knowledge check</p>
              <p className="text-sm text-gray-500 mt-2">
                {sections.length - completedSections.size} sections remaining
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <Link
            href="/education/market-categories/layer-1-blockchains"
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Layer 1 Blockchains
          </Link>
          
          {quizCompleted && (
            <Link
              href="/education/market-categories/layer-1-blockchains/ethereum-smart-contracts"
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Next Module: Ethereum Smart Contracts
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
} 