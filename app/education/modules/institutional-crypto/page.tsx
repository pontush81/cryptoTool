'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, Building, Calendar, User, TrendingUp, ArrowRight, Shield, Globe, DollarSign, Lock, AlertTriangle, Clock, Landmark, Users } from 'lucide-react'
import QuizComponent from '../../../../components/QuizComponent'

interface Section {
  id: string
  title: string
  content: React.ReactNode
  completed: boolean
}

export default function InstitutionalCryptoPage() {
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
      if (!completedModules.includes('institutional-crypto')) {
        completedModules.push('institutional-crypto')
        localStorage.setItem('completedEducationModules', JSON.stringify(completedModules))
      }
      
      // Set mastery level based on score
      const masteryLevels = JSON.parse(localStorage.getItem('educationMasteryLevels') || '{}')
      masteryLevels['institutional-crypto'] = score >= 90 ? 'excellent' : score >= 80 ? 'good' : 'basic'
      localStorage.setItem('educationMasteryLevels', JSON.stringify(masteryLevels))
    }
  }

  const sections: Section[] = [
    {
      id: 'custody-challenges',
      title: 'Institutional Custody: Unique Challenges & Requirements',
      completed: completedSections.has('custody-challenges'),
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
            <p className="text-lg leading-relaxed text-gray-700">
              When institutions manage <strong>billions in cryptocurrency</strong>, they face unique custody challenges 
              that don't exist in traditional finance. Unlike bank accounts, there's no "forgot password" option—
              lose the private keys, lose the assets forever. This requires entirely new security frameworks.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Why Institutional Crypto Custody is Different</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Landmark className="w-5 h-5 text-red-500 mr-2" />
                  <h5 className="font-semibold text-red-800">Traditional Banking</h5>
                </div>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>Reversibility:</strong> Mistakes can be corrected</p>
                  <p><strong>Insurance:</strong> FDIC protects up to $250K</p>
                  <p><strong>Recovery:</strong> Account access can be restored</p>
                  <p><strong>Regulation:</strong> Established 100+ year frameworks</p>
                  <p><strong>Custody:</strong> Banks hold assets in your name</p>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Lock className="w-5 h-5 text-orange-500 mr-2" />
                  <h5 className="font-semibold text-orange-800">Crypto Custody</h5>
                </div>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>Irreversibility:</strong> All transactions are final</p>
                  <p><strong>Self-insurance:</strong> Institutions must secure their own coverage</p>
                  <p><strong>No recovery:</strong> Lost keys = lost assets permanently</p>
                  <p><strong>Evolving regulation:</strong> New rules being written now</p>
                  <p><strong>Self-custody:</strong> "Not your keys, not your crypto"</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Key Security Challenges</h4>
            
            <div className="space-y-4">
              <div className="bg-red-50 border-l-4 border-red-400 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                  <h5 className="font-semibold text-red-800">Private Key Management</h5>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Private keys are the ultimate access control—whoever controls them controls the assets
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-red-800 text-sm mb-1">Internal Risks</p>
                    <ul className="text-xs text-red-600 space-y-1">
                      <li>• Employee theft or collusion</li>
                      <li>• Operational failures and human error</li>
                      <li>• Key loss during personnel changes</li>
                      <li>• Inadequate access controls</li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-red-800 text-sm mb-1">External Risks</p>
                    <ul className="text-xs text-red-600 space-y-1">
                      <li>• Sophisticated cyber attacks</li>
                      <li>• API vulnerabilities and exploits</li>
                      <li>• Social engineering attacks</li>
                      <li>• Physical security breaches</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 border-l-4 border-purple-400 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Shield className="w-5 h-5 text-purple-500 mr-2" />
                  <h5 className="font-semibold text-purple-800">Advanced Security Technologies</h5>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Institutions use cutting-edge cryptographic solutions to protect assets
                </p>
                
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-purple-800 text-sm mb-1">Multi-Party Computation (MPC)</p>
                    <p className="text-xs text-purple-600">
                      Splits private keys across multiple parties so no single entity can access assets alone. 
                      Requires cooperation to sign transactions, eliminating single points of failure.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-purple-800 text-sm mb-1">Trusted Execution Environments (TEE)</p>
                    <p className="text-xs text-purple-600">
                      Secure hardware enclaves that protect key operations even from privileged system access. 
                      Keys never exist in clear text outside the secure environment.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-purple-800 text-sm mb-1">Hardware Security Modules (HSM)</p>
                    <p className="text-xs text-purple-600">
                      Bank-grade hardware devices that generate and protect cryptographic keys. 
                      Meet strict FIPS 140-2 Level 3+ certification requirements.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Users className="w-5 h-5 text-blue-500 mr-2" />
                  <h5 className="font-semibold text-blue-800">Compliance & Insurance Requirements</h5>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Institutional solutions must meet strict regulatory and insurance standards
                </p>
                
                <div className="bg-white p-3 rounded border text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold text-blue-800 mb-1">Audit Requirements</p>
                      <p className="text-blue-600">SOC 1/2 Type II audits, FIPS compliance, penetration testing, regulatory reporting</p>
                    </div>
                    <div>
                      <p className="font-semibold text-blue-800 mb-1">Insurance Coverage</p>
                      <p className="text-blue-600">Comprehensive coverage for theft, employee dishonesty, cyber attacks, operational failures</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">💰 Scale of Institutional Custody</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white p-3 rounded border text-center">
                <p className="font-semibold text-yellow-800 text-lg">$100+ Billion</p>
                <p className="text-yellow-600 text-xs">Assets under institutional custody</p>
              </div>
              <div className="bg-white p-3 rounded border text-center">
                <p className="font-semibold text-yellow-800 text-lg">500+ Institutions</p>
                <p className="text-yellow-600 text-xs">Using professional crypto custody</p>
              </div>
              <div className="bg-white p-3 rounded border text-center">
                <p className="font-semibold text-yellow-800 text-lg">$500M+</p>
                <p className="text-yellow-600 text-xs">Average insurance coverage per custodian</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'custody-models',
      title: 'Self-Custody vs Third-Party Custodians',
      completed: completedSections.has('custody-models'),
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Two Fundamental Approaches</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 border-l-4 border-green-400 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Lock className="w-5 h-5 text-green-500 mr-2" />
                  <h5 className="font-semibold text-green-800">Self-Custody Solutions</h5>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Institution controls private keys directly using advanced security infrastructure
                </p>
                
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-green-800 text-sm mb-2">✅ Advantages</p>
                    <ul className="text-xs text-green-600 space-y-1">
                      <li>• Maximum control over assets and keys</li>
                      <li>• No counterparty risk with third parties</li>
                      <li>• Potentially lower long-term costs</li>
                      <li>• Custom security and compliance controls</li>
                      <li>• Full transparency into operations</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-green-800 text-sm mb-2">❌ Challenges</p>
                    <ul className="text-xs text-red-600 space-y-1">
                      <li>• High operational and technical burden</li>
                      <li>• Requires specialized security expertise</li>
                      <li>• Full responsibility for compliance</li>
                      <li>• Higher upfront infrastructure costs</li>
                      <li>• Must develop incident response plans</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-100 p-3 rounded">
                    <p className="font-semibold text-green-800 text-sm mb-1">Example Solution: Safeheron</p>
                    <p className="text-xs text-green-700">
                      Enterprise-grade self-custody platform using MPC and TEE technology. 
                      Institutions maintain full control while benefiting from advanced cryptographic security.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Building className="w-5 h-5 text-blue-500 mr-2" />
                  <h5 className="font-semibold text-blue-800">Third-Party Custodians</h5>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Outsource custody to regulated, professional service providers
                </p>
                
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-blue-800 text-sm mb-2">✅ Advantages</p>
                    <ul className="text-xs text-blue-600 space-y-1">
                      <li>• Professional security infrastructure</li>
                      <li>• Established regulatory compliance</li>
                      <li>• Comprehensive insurance coverage</li>
                      <li>• 24/7 monitoring and support</li>
                      <li>• Integration with trading platforms</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-blue-800 text-sm mb-2">❌ Challenges</p>
                    <ul className="text-xs text-red-600 space-y-1">
                      <li>• Counterparty risk with custodian</li>
                      <li>• Less control over security decisions</li>
                      <li>• Ongoing custody fees and costs</li>
                      <li>• Dependency on external operations</li>
                      <li>• Potential for regulatory changes</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-100 p-3 rounded">
                    <p className="font-semibold text-blue-800 text-sm mb-1">Major Players</p>
                    <p className="text-xs text-blue-700">
                      Coinbase Custody, Anchorage Digital, BitGo, Gemini Custody, and traditional 
                      banks like BNY Mellon entering the space.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Decision Framework: Which Model to Choose?</h4>
            
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold text-green-800 mb-2">Self-Custody Makes Sense When:</h5>
                  <ul className="text-sm text-green-700 space-y-2">
                    <li>• <strong>Large AUM</strong> - High custody fees justify internal infrastructure</li>
                    <li>• <strong>Technical expertise</strong> - Strong internal security and ops teams</li>
                    <li>• <strong>Control requirements</strong> - Need full control over security decisions</li>
                    <li>• <strong>Unique compliance</strong> - Special regulatory or business requirements</li>
                    <li>• <strong>Long-term commitment</strong> - Planning for permanent crypto operations</li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-semibold text-blue-800 mb-2">Third-Party Custody Makes Sense When:</h5>
                  <ul className="text-sm text-blue-700 space-y-2">
                    <li>• <strong>Getting started</strong> - New to crypto, need proven solutions</li>
                    <li>• <strong>Regulatory clarity</strong> - Want established compliance frameworks</li>
                    <li>• <strong>Risk management</strong> - Prefer to outsource operational risks</li>
                    <li>• <strong>Speed to market</strong> - Need to launch quickly without infrastructure</li>
                    <li>• <strong>Integration needs</strong> - Want seamless connection to trading/OTC</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-semibold text-purple-800 mb-2">🔄 Hybrid Approaches</h4>
            <p className="text-purple-700 text-sm mb-3">Many institutions use both models simultaneously:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-purple-800 text-sm mb-1">Hot/Cold Split</p>
                <p className="text-xs text-purple-700">
                  Self-custody for long-term holdings (cold storage), third-party for trading assets (hot wallets)
                </p>
              </div>
              <div className="bg-white p-3 rounded border">
                <p className="font-semibold text-purple-800 text-sm mb-1">Geographic Distribution</p>
                <p className="text-xs text-purple-700">
                  Different custody models for different jurisdictions based on local regulations
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'service-providers',
      title: 'Major Custody Service Providers',
      completed: completedSections.has('service-providers'),
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Leading Institutional Custodians</h4>
            
            <div className="space-y-4">
              <div className="bg-white border-l-4 border-blue-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Building className="w-5 h-5 text-blue-500 mr-2" />
                  <h5 className="font-semibold text-blue-800">Coinbase Custody</h5>
                  <span className="ml-2 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">NY Trust Company</span>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Largest crypto custodian serving institutional clients with over $130 billion in assets
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-blue-50 p-3 rounded">
                    <p className="font-semibold text-blue-800 text-sm mb-1">Key Features</p>
                    <ul className="text-xs text-blue-600 space-y-1">
                      <li>• Segregated cold/hot wallet infrastructure</li>
                      <li>• Up to $320M insurance coverage</li>
                      <li>• Support for 300+ digital assets</li>
                      <li>• Advanced trading and staking services</li>
                      <li>• Institutional-grade reporting and API</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-3 rounded">
                    <p className="font-semibold text-blue-800 text-sm mb-1">Notable Clients</p>
                    <ul className="text-xs text-blue-600 space-y-1">
                      <li>• Major asset managers and hedge funds</li>
                      <li>• Corporate treasuries and fintech companies</li>
                      <li>• Family offices and high-net-worth individuals</li>
                      <li>• Publicly traded companies</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-3 p-2 bg-blue-100 rounded text-xs text-blue-800">
                  <strong>Strength:</strong> Public company transparency, regulatory compliance, broad asset support
                </div>
              </div>
              
              <div className="bg-white border-l-4 border-green-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Shield className="w-5 h-5 text-green-500 mr-2" />
                  <h5 className="font-semibold text-green-800">Anchorage Digital</h5>
                  <span className="ml-2 bg-green-100 text-green-700 text-xs px-2 py-1 rounded">Federal Digital Bank</span>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  First federally chartered digital asset bank in the US, serving institutional clients
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-green-50 p-3 rounded">
                    <p className="font-semibold text-green-800 text-sm mb-1">Unique Advantages</p>
                    <ul className="text-xs text-green-600 space-y-1">
                      <li>• OCC federal banking charter</li>
                      <li>• Advanced MPC + hardware isolation</li>
                      <li>• Bank-level regulatory oversight</li>
                      <li>• Comprehensive SOC audit compliance</li>
                      <li>• Deep institutional insurance</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-3 rounded">
                    <p className="font-semibold text-green-800 text-sm mb-1">Notable Integration</p>
                    <ul className="text-xs text-green-600 space-y-1">
                      <li>• BlackRock Bitcoin ETF custody partner</li>
                      <li>• Supporting major ETF launches</li>
                      <li>• US government and enterprise clients</li>
                      <li>• Bank-grade custody for RWA tokens</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-3 p-2 bg-green-100 rounded text-xs text-green-800">
                  <strong>Strength:</strong> Highest level of US regulatory approval, bank-grade security and compliance
                </div>
              </div>
              
              <div className="bg-white border-l-4 border-purple-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Lock className="w-5 h-5 text-purple-500 mr-2" />
                  <h5 className="font-semibold text-purple-800">BitGo</h5>
                  <span className="ml-2 bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded">SOC2 Certified</span>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Leading multi-signature security platform serving institutions and OTC desks
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-purple-50 p-3 rounded">
                    <p className="font-semibold text-purple-800 text-sm mb-1">Core Offerings</p>
                    <ul className="text-xs text-purple-600 space-y-1">
                      <li>• Multi-signature wallet infrastructure</li>
                      <li>• Instant trading and liquidity access</li>
                      <li>• $100M+ insurance coverage</li>
                      <li>• Comprehensive regulatory reporting</li>
                      <li>• White-label custody solutions</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 p-3 rounded">
                    <p className="font-semibold text-purple-800 text-sm mb-1">Market Position</p>
                    <ul className="text-xs text-purple-600 space-y-1">
                      <li>• Wide adoption by OTC trading desks</li>
                      <li>• Strong presence in institutional trading</li>
                      <li>• Extensive blockchain network support</li>
                      <li>• Focus on operational efficiency</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border-l-4 border-orange-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Landmark className="w-5 h-5 text-orange-500 mr-2" />
                  <h5 className="font-semibold text-orange-800">Traditional Banks Entering Custody</h5>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Major traditional financial institutions launching crypto custody services
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-orange-50 p-3 rounded">
                    <p className="font-semibold text-orange-800 text-sm mb-1">BNY Mellon</p>
                    <ul className="text-xs text-orange-600 space-y-1">
                      <li>• Leveraging traditional custody expertise</li>
                      <li>• Serving existing institutional clients</li>
                      <li>• Focus on Bitcoin and major cryptocurrencies</li>
                    </ul>
                  </div>
                  <div className="bg-orange-50 p-3 rounded">
                    <p className="font-semibold text-orange-800 text-sm mb-1">State Street</p>
                    <ul className="text-xs text-orange-600 space-y-1">
                      <li>• Pilot programs with select clients</li>
                      <li>• Integration with existing custody platform</li>
                      <li>• Conservative, compliance-first approach</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Custody Provider Comparison</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Provider</th>
                    <th className="text-left p-2">Regulatory Status</th>
                    <th className="text-left p-2">Insurance</th>
                    <th className="text-left p-2">Key Strength</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2 font-semibold">Coinbase Custody</td>
                    <td className="p-2">NY Trust Company</td>
                    <td className="p-2">$320M+</td>
                    <td className="p-2">Largest scale, public company</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-semibold">Anchorage Digital</td>
                    <td className="p-2">Federal Bank Charter</td>
                    <td className="p-2">Bank-level coverage</td>
                    <td className="p-2">Highest regulatory approval</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-semibold">BitGo</td>
                    <td className="p-2">SOC2 Compliance</td>
                    <td className="p-2">$100M+</td>
                    <td className="p-2">Multi-sig expertise, OTC focus</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold">BNY Mellon</td>
                    <td className="p-2">Traditional Bank</td>
                    <td className="p-2">Banking-level</td>
                    <td className="p-2">Traditional finance integration</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'compliance-frameworks',
      title: 'Regulatory & Compliance Frameworks',
      completed: completedSections.has('compliance-frameworks'),
      content: (
        <div className="space-y-6">
          <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
            <p className="text-lg leading-relaxed text-gray-700">
              Institutional crypto custody operates within a complex web of evolving regulations. 
              Success requires navigating federal banking laws, state trust regulations, AML/KYC requirements, 
              and securities laws—often simultaneously across multiple jurisdictions.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Key Regulatory Frameworks</h4>
            
            <div className="space-y-4">
              <div className="bg-white border-l-4 border-blue-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Landmark className="w-5 h-5 text-blue-500 mr-2" />
                  <h5 className="font-semibold text-blue-800">US Federal Level: OCC Interpretive Letters</h5>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Office of the Comptroller of the Currency provides guidance for national banks
                </p>
                
                <div className="bg-blue-50 p-3 rounded">
                  <p className="font-semibold text-blue-800 text-sm mb-2">OCC Interpretive Letter 1184 (2025)</p>
                  <div className="text-xs text-blue-600 space-y-2">
                    <p><strong>What it allows:</strong> National banks can provide crypto custody services, including sub-custody arrangements</p>
                    <p><strong>Requirements:</strong> Robust KYC/AML procedures, comprehensive risk management, ongoing regulatory reporting</p>
                    <p><strong>Fiduciary roles:</strong> Banks can act in both fiduciary and non-fiduciary capacity</p>
                    <p><strong>Impact:</strong> Enables traditional banks to compete with crypto-native custodians</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border-l-4 border-green-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Shield className="w-5 h-5 text-green-500 mr-2" />
                  <h5 className="font-semibold text-green-800">New York State: BitLicense & Trust Company Framework</h5>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  New York's DFS created comprehensive regulatory framework for crypto businesses
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-green-50 p-3 rounded">
                    <p className="font-semibold text-green-800 text-sm mb-1">BitLicense Requirements</p>
                    <ul className="text-xs text-green-600 space-y-1">
                      <li>• Comprehensive AML/KYC programs</li>
                      <li>• Asset segregation and safekeeping</li>
                      <li>• Capital adequacy requirements</li>
                      <li>• Cybersecurity and business continuity plans</li>
                      <li>• Regular audits and examinations</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-3 rounded">
                    <p className="font-semibold text-green-800 text-sm mb-1">Trust Company Charter</p>
                    <ul className="text-xs text-green-600 space-y-1">
                      <li>• Higher level of regulatory oversight</li>
                      <li>• Fiduciary duty to clients</li>
                      <li>• Strict asset segregation requirements</li>
                      <li>• Regular prudential supervision</li>
                      <li>• Enhanced consumer protection</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-3 p-2 bg-green-100 rounded text-xs text-green-800">
                  <strong>Examples:</strong> Coinbase Custody and Gemini operate under NY Trust Company charters
                </div>
              </div>
              
              <div className="bg-white border-l-4 border-purple-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Globe className="w-5 h-5 text-purple-500 mr-2" />
                  <h5 className="font-semibold text-purple-800">Global Regulatory Approaches</h5>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  International institutions must navigate multiple regulatory regimes
                </p>
                
                <div className="space-y-3">
                  <div className="bg-purple-50 p-3 rounded">
                    <p className="font-semibold text-purple-800 text-sm mb-1">European Union: MiCA Regulation</p>
                    <p className="text-xs text-purple-600">
                      Markets in Crypto-Assets regulation creates harmonized framework across EU. 
                      Requires authorization for crypto custody, strict operational requirements, and client asset protection.
                    </p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded">
                    <p className="font-semibold text-purple-800 text-sm mb-1">Singapore: Payment Services Act</p>
                    <p className="text-xs text-purple-600">
                      Digital Payment Token license required for custody services. 
                      Emphasis on technology risk management, customer protection, and AML compliance.
                    </p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded">
                    <p className="font-semibold text-purple-800 text-sm mb-1">Hong Kong: VASP Licensing</p>
                    <p className="text-xs text-purple-600">
                      Virtual Asset Service Provider framework with custody-specific requirements. 
                      Focus on professional investor protection and systemic risk management.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border-l-4 border-orange-500 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <AlertTriangle className="w-5 h-5 text-orange-500 mr-2" />
                  <h5 className="font-semibold text-orange-800">Compliance Challenges & Requirements</h5>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Meeting regulatory requirements requires comprehensive operational frameworks
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-orange-50 p-3 rounded">
                    <p className="font-semibold text-orange-800 text-sm mb-1">KYC/AML Programs</p>
                    <ul className="text-xs text-orange-600 space-y-1">
                      <li>• Customer Due Diligence (CDD) procedures</li>
                      <li>• Enhanced Due Diligence (EDD) for high-risk clients</li>
                      <li>• Beneficial ownership identification</li>
                      <li>• Ongoing transaction monitoring</li>
                      <li>• Suspicious Activity Reporting (SAR)</li>
                    </ul>
                  </div>
                  <div className="bg-orange-50 p-3 rounded">
                    <p className="font-semibold text-orange-800 text-sm mb-1">Operational Requirements</p>
                    <ul className="text-xs text-orange-600 space-y-1">
                      <li>• Segregated client asset storage</li>
                      <li>• Business continuity and disaster recovery</li>
                      <li>• Cybersecurity and data protection</li>
                      <li>• Regular third-party audits</li>
                      <li>• Regulatory reporting and recordkeeping</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">⚖️ Regulatory Evolution</h4>
            <div className="text-sm text-yellow-700 space-y-2">
              <p><strong>Current State:</strong> Patchwork of evolving regulations with significant variation by jurisdiction</p>
              <p><strong>Trend:</strong> Movement toward comprehensive, harmonized frameworks (like EU's MiCA)</p>
              <p><strong>Challenge:</strong> Institutions must build flexible compliance systems that can adapt to changing rules</p>
              <div className="bg-white p-3 rounded border mt-3 text-xs">
                <strong>Best Practice:</strong> Work with custodians that have strong regulatory track records and 
                maintain compliance across multiple jurisdictions to reduce regulatory risk.
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'integration-strategies',
      title: 'Integration Strategies: How Institutions Actually Onboard',
      completed: completedSections.has('integration-strategies'),
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
            <p className="text-lg leading-relaxed text-gray-700">
              Successfully integrating cryptocurrency custody into institutional operations requires careful 
              planning, robust systems integration, and comprehensive risk management. Here's how leading 
              institutions actually implement crypto custody at scale.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Institutional Onboarding Process</h4>
            
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h5 className="font-semibold text-gray-900 mb-3">Phase 1: Due Diligence & Selection</h5>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="bg-blue-50 p-3 rounded">
                      <p className="font-semibold text-blue-800 text-sm mb-1">Custodian Evaluation Criteria</p>
                      <ul className="text-xs text-blue-600 space-y-1">
                        <li>• Regulatory status and compliance history</li>
                        <li>• Security infrastructure and audit results</li>
                        <li>• Insurance coverage and claims history</li>
                        <li>• API capabilities and system integration</li>
                        <li>• Asset coverage and supported blockchains</li>
                        <li>• Fee structure and operational costs</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="bg-green-50 p-3 rounded">
                      <p className="font-semibold text-green-800 text-sm mb-1">Risk Assessment Framework</p>
                      <ul className="text-xs text-green-600 space-y-1">
                        <li>• Operational risk analysis</li>
                        <li>• Counterparty credit assessment</li>
                        <li>• Technology and cyber risk review</li>
                        <li>• Regulatory and compliance risk</li>
                        <li>• Business continuity evaluation</li>
                        <li>• Insurance gap analysis</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h5 className="font-semibold text-gray-900 mb-3">Phase 2: Legal & Compliance Setup</h5>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-purple-50 p-3 rounded">
                    <p className="font-semibold text-purple-800 text-sm mb-1">Entity Onboarding (KYB)</p>
                    <ul className="text-xs text-purple-600 space-y-1">
                      <li>• Corporate structure documentation</li>
                      <li>• Beneficial ownership identification</li>
                      <li>• Regulatory licenses and registrations</li>
                      <li>• Financial statements and credit checks</li>
                      <li>• Source of funds verification</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-50 p-3 rounded">
                    <p className="font-semibold text-orange-800 text-sm mb-1">Legal Documentation</p>
                    <ul className="text-xs text-orange-600 space-y-1">
                      <li>• Custody agreements and terms</li>
                      <li>• Liability allocation and insurance</li>
                      <li>• Operational procedures and controls</li>
                      <li>• Disaster recovery and business continuity</li>
                      <li>• Regulatory reporting obligations</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h5 className="font-semibold text-gray-900 mb-3">Phase 3: Systems Integration</h5>
                
                <div className="space-y-3">
                  <div className="bg-blue-50 p-3 rounded">
                    <p className="font-semibold text-blue-800 text-sm mb-2">API Integration Requirements</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div>
                        <p className="font-semibold text-blue-800 mb-1">Trading Systems</p>
                        <p className="text-blue-600">Real-time balance queries, transaction execution, order management system integration</p>
                      </div>
                      <div>
                        <p className="font-semibold text-blue-800 mb-1">Risk Management</p>
                        <p className="text-blue-600">Position monitoring, exposure limits, real-time risk calculations</p>
                      </div>
                      <div>
                        <p className="font-semibold text-blue-800 mb-1">Accounting Systems</p>
                        <p className="text-blue-600">Transaction reconciliation, P&L calculation, regulatory reporting feeds</p>
                      </div>
                      <div>
                        <p className="font-semibold text-blue-800 mb-1">Compliance Monitoring</p>
                        <p className="text-blue-600">Transaction screening, AML monitoring, audit trail generation</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-3 rounded">
                    <p className="font-semibold text-green-800 text-sm mb-1">Security & Access Controls</p>
                    <div className="text-xs text-green-600 space-y-1">
                      <p>• Multi-level authorization workflows (maker/checker controls)</p>
                      <p>• IP whitelisting and network security</p>
                      <p>• API key management and rotation</p>
                      <p>• Transaction limits and velocity controls</p>
                      <p>• Audit logging and monitoring systems</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Real-World Integration Examples</h4>
            
            <div className="space-y-4">
              <div className="bg-green-50 border-l-4 border-green-400 rounded-lg p-4">
                <h5 className="font-semibold text-green-800 mb-3">BlackRock Bitcoin ETF Integration</h5>
                <p className="text-sm text-gray-700 mb-3">
                  How the world's largest asset manager integrated crypto custody for their Bitcoin ETF
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-green-800 text-sm mb-1">Custody Solution</p>
                    <ul className="text-xs text-green-600 space-y-1">
                      <li>• Anchorage Digital as primary custodian</li>
                      <li>• Federally chartered bank-level security</li>
                      <li>• Segregated cold storage for ETF assets</li>
                      <li>• Real-time proof of reserves</li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-green-800 text-sm mb-1">Operational Integration</p>
                    <ul className="text-xs text-green-600 space-y-1">
                      <li>• Automated creation/redemption process</li>
                      <li>• Real-time NAV calculation integration</li>
                      <li>• Regulatory reporting automation</li>
                      <li>• 24/7 monitoring and support</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-4">
                <h5 className="font-semibold text-blue-800 mb-3">Corporate Treasury Implementation</h5>
                <p className="text-sm text-gray-700 mb-3">
                  How public companies integrate crypto into their treasury operations
                </p>
                
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border text-xs">
                    <p className="font-semibold text-blue-800 mb-1">Typical Setup Process:</p>
                    <p className="text-blue-600 mb-2">
                      1. Board approval for crypto allocation policy<br/>
                      2. Treasury policy updates and risk limits<br/>
                      3. Custodian selection and contract negotiation<br/>
                      4. Integration with existing treasury systems<br/>
                      5. Accounting and tax consultation setup<br/>
                      6. Regular reporting and governance procedures
                    </p>
                  </div>
                  
                  <div className="bg-white p-3 rounded border">
                    <p className="font-semibold text-blue-800 text-sm mb-1">Common Challenges & Solutions</p>
                    <ul className="text-xs text-blue-600 space-y-1">
                      <li>• <strong>Accounting complexity:</strong> Work with Big 4 firms experienced in crypto</li>
                      <li>• <strong>Regulatory uncertainty:</strong> Choose well-regulated custodians</li>
                      <li>• <strong>Board education:</strong> Provide comprehensive risk/benefit analysis</li>
                      <li>• <strong>Operational integration:</strong> Phased rollout with extensive testing</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Implementation Best Practices</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-semibold text-gray-800 mb-2">Technical Implementation:</h5>
                <ul className="space-y-1 text-gray-700">
                  <li>• Start with testnet integration and small amounts</li>
                  <li>• Implement comprehensive monitoring and alerting</li>
                  <li>• Build redundant systems and failover procedures</li>
                  <li>• Plan for regular security and compliance audits</li>
                  <li>• Document all procedures and maintain audit trails</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-gray-800 mb-2">Organizational Change:</h5>
                <ul className="space-y-1 text-gray-700">
                  <li>• Train operations teams on crypto-specific procedures</li>
                  <li>• Update risk management and compliance frameworks</li>
                  <li>• Establish clear governance and approval processes</li>
                  <li>• Plan for 24/7 monitoring and incident response</li>
                  <li>• Regular review and updates of policies and procedures</li>
                </ul>
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
      id: 'custody-challenges',
      question: 'What is the fundamental difference between traditional banking and crypto custody?',
      options: [
        'Crypto custody is always cheaper than traditional banking',
        'In crypto custody, transactions are irreversible and lost keys mean lost assets forever',
        'Crypto custody is only for retail investors',
        'Traditional banking is completely insecure compared to crypto'
      ],
      correctAnswer: 1,
      explanation: 'Unlike traditional banking where mistakes can be corrected and accounts recovered, crypto custody involves irreversible transactions and permanent asset loss if private keys are lost.'
    },
    {
      id: 'custody-models',
      question: 'What is a key advantage of third-party custodians over self-custody for institutions?',
      options: [
        'Third-party custodians guarantee higher returns',
        'They provide established regulatory compliance and professional security infrastructure',
        'They eliminate all counterparty risks',
        'They are always less expensive than self-custody'
      ],
      correctAnswer: 1,
      explanation: 'Third-party custodians offer professional security infrastructure, established regulatory compliance, comprehensive insurance, and 24/7 monitoring that many institutions prefer over building internally.'
    },
    {
      id: 'anchorage-digital',
      question: 'What makes Anchorage Digital unique among crypto custodians?',
      options: [
        'It offers the lowest fees in the industry',
        'It is the first federally chartered digital asset bank in the US',
        'It only serves retail customers',
        'It specializes in meme coins'
      ],
      correctAnswer: 1,
      explanation: 'Anchorage Digital is the first federally chartered digital asset bank in the US, giving it the highest level of regulatory approval and bank-grade oversight.'
    },
    {
      id: 'regulatory-framework',
      question: 'What does OCC Interpretive Letter 1184 allow for US national banks?',
      options: [
        'Banks can create their own cryptocurrencies',
        'Banks can provide crypto custody services including sub-custody arrangements',
        'Banks can ignore AML/KYC requirements for crypto',
        'Banks can offer guaranteed returns on crypto investments'
      ],
      correctAnswer: 1,
      explanation: 'OCC Interpretive Letter 1184 authorizes US national banks to provide crypto custody services, including sub-custody arrangements, while maintaining robust KYC/AML and risk management procedures.'
    },
    {
      id: 'institutional-integration',
      question: 'In the BlackRock Bitcoin ETF example, what was the key to successful institutional integration?',
      options: [
        'Using multiple unregulated custodians',
        'Partnering with Anchorage Digital for federally regulated custody and automated processes',
        'Avoiding all regulatory compliance',
        'Only using self-custody solutions'
      ],
      correctAnswer: 1,
      explanation: 'BlackRock partnered with Anchorage Digital, a federally chartered bank, to provide regulated custody with automated creation/redemption processes and real-time reporting for their Bitcoin ETF.'
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
            title="Institutional Crypto Quiz"
            questions={quizQuestions}
            onComplete={handleQuizComplete}
          />
          
          {quizCompleted && (
            <div className="mt-6">
              <Link 
                href="/education/cbdcs"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Continue to CBDCs
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
                <Building className="w-8 h-8 text-blue-600" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Institutional Crypto: Custody & Compliance</h1>
                <p className="text-gray-600 mb-4">
                  Discover how major financial institutions safely manage billions in cryptocurrency assets. 
                  Learn about custody solutions from Coinbase and Anchorage Digital, regulatory frameworks, 
                  and real-world integration strategies used by companies like BlackRock for their Bitcoin ETF.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    22 min read
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
                  className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            
            {/* Learning Objectives */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">What You'll Learn</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Unique custody challenges institutions face with cryptocurrency assets</li>
                <li>• Self-custody vs third-party custodian models and trade-offs</li>
                <li>• Major service providers: Coinbase Custody, Anchorage Digital, BitGo</li>
                <li>• Regulatory frameworks including OCC guidance and state trust laws</li>
                <li>• Real integration strategies used by BlackRock, corporate treasuries</li>
                <li>• Compliance requirements for KYC/AML, reporting, and risk management</li>
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
                  Take the quiz to demonstrate your institutional crypto understanding and unlock the next module
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
              <h3 className="font-semibold text-green-800 mb-2">🎉 Outstanding Work!</h3>
              <p className="text-green-700 text-sm mb-4">
                You now understand how major institutions safely manage cryptocurrency assets at scale. 
                Ready to explore how governments are creating their own digital currencies?
              </p>
              <Link 
                href="/education/cbdcs"
                className="inline-flex items-center text-green-700 hover:text-green-800 font-medium"
              >
                Continue to CBDCs: Government Digital Currencies
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 