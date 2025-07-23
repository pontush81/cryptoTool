import Link from 'next/link'
import { TrendingUp, BarChart3, Zap, ArrowRight, Activity, Target, BookOpen, Shield, Users, Play, CheckCircle, Globe, Clock } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Optimized for SEO */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
        <div className="text-center">

          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Crypto Analysis
            <span className="block text-blue-600">Made Simple</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Learn and analyze cryptocurrency markets with confidence. Our beginner-friendly tools and comprehensive education help you understand Bitcoin, technical analysis, and market trends—no experience required.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link href="/dashboard" className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl">
              Start Free Analysis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            
            <Link href="/education" className="inline-flex items-center px-8 py-4 border-2 border-blue-600 text-lg font-medium rounded-lg text-blue-600 bg-white hover:bg-blue-50 transition-colors">
              <BookOpen className="mr-2 h-5 w-5" />
              Learn Crypto Basics
            </Link>
          </div>
          

        </div>
      </div>

      {/* Educational Quick Start - Prominent for beginners */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">New to Crypto? Start Here</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Build your cryptocurrency knowledge step by step with our guided learning path
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/education/bitcoin-basics" className="group">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200 hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">1</div>
                  <BookOpen className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Understanding Bitcoin</h3>
                <p className="text-gray-600 mb-4">Learn what Bitcoin is, how it works, and why it matters. Perfect for complete beginners.</p>
                <div className="flex items-center text-green-600 font-medium">
                  <Clock className="w-4 h-4 mr-2" />
                  15 minutes
                </div>
              </div>
            </Link>

            <Link href="/education/how-it-works" className="group">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200 hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">2</div>
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">How Blockchain Works</h3>
                <p className="text-gray-600 mb-4">Dive deeper into blockchain technology and understand the foundation of crypto.</p>
                <div className="flex items-center text-blue-600 font-medium">
                  <Clock className="w-4 h-4 mr-2" />
                  25 minutes
                </div>
              </div>
            </Link>

            <Link href="/dashboard" className="group">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200 hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">3</div>
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Practice Analysis</h3>
                <p className="text-gray-600 mb-4">Apply your knowledge with our beginner-friendly analysis tools and real market data.</p>
                <div className="flex items-center text-purple-600 font-medium">
                  <Play className="w-4 h-4 mr-2" />
                  Try now
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Live Preview Cards - Enhanced */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">See Our Tools In Action</h2>
          <p className="text-xl text-gray-600">Live cryptocurrency market analysis and insights—updated in real-time</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Technical Analysis Preview - Enhanced */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-blue-50">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Technical Analysis</h3>
                <p className="text-sm text-gray-500">AI-powered market signals</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">RSI Signal</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Buy Signal</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">MACD</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">Bullish</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Trend</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Strong Uptrend</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500">Perfect for beginners - no complex setup required</p>
            </div>
          </div>

          {/* Market Overview Preview - Enhanced */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-purple-50">
                <Globe className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Global Market Data</h3>
                <p className="text-sm text-gray-500">Real-time crypto metrics</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Market Cap</span>
                <span className="text-sm font-medium text-gray-900">$3.4T</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Bitcoin Dominance</span>
                <span className="text-sm font-medium text-gray-900">58.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">24h Volume</span>
                <span className="text-sm font-medium text-green-600">+12.8%</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500">Easy-to-understand market overview for everyone</p>
            </div>
          </div>

          {/* Peak Detection Preview - Enhanced */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-green-50">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Smart Risk Analysis</h3>
                <p className="text-sm text-gray-500">AI-powered insights</p>
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-700 mb-2">LOW RISK</div>
              <div className="text-sm text-gray-600 mb-3">90% confidence level</div>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Safe to hold position</span>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500">Beginner-friendly risk assessment tools</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link href="/dashboard" className="inline-flex items-center px-6 py-3 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors">
            Try All Tools Free
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Why Choose Us - For SEO and Trust */}
      <div className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Why Choose Our Platform</h2>
            <p className="text-xl text-gray-300">The easiest way to learn and analyze cryptocurrency markets</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="p-4 rounded-full bg-blue-600 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Beginner-Friendly</h3>
              <p className="text-gray-300 text-sm">Start with zero experience. Our educational content guides you step by step.</p>
            </div>

            <div className="text-center">
              <div className="p-4 rounded-full bg-green-600 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Real-Time Data</h3>
              <p className="text-gray-300 text-sm">Live market data and analysis. Stay updated with the latest trends.</p>
            </div>

            <div className="text-center">
              <div className="p-4 rounded-full bg-purple-600 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Learn Crypto</h3>
              <p className="text-gray-300 text-sm">Educate yourself about cryptocurrencies and technical analysis with our tools and guides.</p>
            </div>

            <div className="text-center">
              <div className="p-4 rounded-full bg-orange-600 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Easy to Use</h3>
              <p className="text-gray-300 text-sm">Intuitive interface designed for users of all skill levels.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Resources - Prominently Featured */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Master Crypto Analysis</h2>
            <p className="text-xl text-gray-600">Comprehensive learning resources for every skill level</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/education" className="group">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-200 hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-blue-600 rounded-lg mr-4">
                    <BookOpen className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Education Center</h3>
                    <p className="text-gray-600">Start your crypto journey here</p>
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Bitcoin & Blockchain Fundamentals
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Technical Analysis Basics
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Market Psychology & Risk Management
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Interactive Learning Modules
                  </li>
                </ul>
                <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                  Start Learning Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </div>
              </div>
            </Link>

            <Link href="/dashboard" className="group">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 border border-green-200 hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-green-600 rounded-lg mr-4">
                    <BarChart3 className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Analysis Dashboard</h3>
                    <p className="text-gray-600">Professional tools made simple</p>
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Real-time Price Charts & Data
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Technical Indicators (RSI, MACD, MA)
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Market Dominance Analysis
                  </li>
                  <li className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Beginner-Friendly Interface
                  </li>
                </ul>
                <div className="flex items-center text-green-600 font-semibold group-hover:text-green-700">
                  Try Analysis Tools
                  <ArrowRight className="ml-2 h-5 w-5" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Final CTA - Enhanced */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Master Cryptocurrency Analysis?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Start your crypto journey with our free educational content and analysis tools. Learn at your own pace with beginner-friendly guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/education" className="inline-flex items-center px-8 py-4 border-2 border-white text-lg font-medium rounded-lg text-white hover:bg-white hover:text-blue-600 transition-colors">
              <BookOpen className="mr-2 h-5 w-5" />
              Start Learning Now
            </Link>
            <Link href="/dashboard" className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-blue-600 bg-white hover:bg-gray-100 transition-colors">
              Try Analysis Tools
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer - Enhanced with SEO content */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <TrendingUp className="h-8 w-8 text-blue-600" />
                <span className="ml-3 text-xl font-bold text-gray-900">Crypto Analysis Tool</span>
              </div>
              <p className="text-gray-600 mb-4 max-w-md">
                The easiest way to learn cryptocurrency analysis and understand Bitcoin markets. Educational focused platform for beginners and intermediate traders worldwide.
              </p>

            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Learn</h3>
              <ul className="space-y-2">
                <li><Link href="/education/bitcoin-basics" className="text-gray-600 hover:text-gray-900">Bitcoin Basics</Link></li>
                <li><Link href="/education/how-it-works" className="text-gray-600 hover:text-gray-900">How Blockchain Works</Link></li>
                <li><Link href="/education" className="text-gray-600 hover:text-gray-900">All Courses</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Tools</h3>
              <ul className="space-y-2">
                <li><Link href="/dashboard" className="text-gray-600 hover:text-gray-900">Analysis Dashboard</Link></li>
                <li><Link href="/dashboard" className="text-gray-600 hover:text-gray-900">Technical Indicators</Link></li>
                <li><Link href="/dashboard" className="text-gray-600 hover:text-gray-900">Market Data</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                                 <span className="ml-2 text-sm text-gray-600">© 2025 Crypto Analysis Tool - Empowering crypto education worldwide</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 