import Link from 'next/link'
import { TrendingUp, BarChart3, Shield, Zap, Globe, Users } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center min-w-0">
              <TrendingUp className="h-6 w-6 md:h-8 md:w-8 text-blue-600 flex-shrink-0" />
              <span className="ml-2 md:ml-3 text-lg md:text-xl font-bold text-gray-900 truncate">Crypto Analysis Tool</span>
            </div>
            <div className="flex items-center">
              <Link href="/dashboard" className="btn-primary text-sm md:text-base px-3 md:px-4 py-2">
                <span className="hidden sm:inline">Open Dashboard</span>
                <span className="sm:hidden">Dashboard</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-6 md:mb-8">
            Advanced Crypto
            <span className="block text-yellow-400">Analysis Platform</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 text-center max-w-3xl mx-auto mb-8 md:mb-12 px-4">
            Professional technical analysis with RSI + MACD indicators, market dominance tracking, 
            and automated trading signals. Built for serious crypto traders and investors.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center max-w-md mx-auto sm:max-w-none">
            <Link href="/dashboard" className="btn-primary text-base md:text-lg px-6 md:px-8 py-3 text-center">
              Start Analysis
            </Link>
            <button className="btn-secondary text-base md:text-lg px-6 md:px-8 py-3 text-white border-white hover:bg-white hover:text-gray-900">
              View Features
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Professional Trading Tools
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Everything you need for advanced cryptocurrency market analysis and trading decisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Technical Analysis */}
            <div className="crypto-card p-6 md:p-8">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-6">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">RSI + MACD Analysis</h3>
              <p className="text-sm md:text-base text-gray-600 mb-4">
                Advanced technical indicators with custom MACD settings (8,21,5) and RSI oversold signals at 30. 
                Automated buy/sell signal generation based on proven strategies.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Custom MACD crossover detection</li>
                <li>• RSI oversold/overbought zones</li>
                <li>• Real-time trading signals</li>
                <li>• Signal strength scoring</li>
              </ul>
            </div>

            {/* Market Dominance */}
            <div className="crypto-card p-6 md:p-8">
              <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mb-6">
                <Globe className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Market Dominance</h3>
              <p className="text-sm md:text-base text-gray-600 mb-4">
                Track Bitcoin and Ethereum market dominance with real-time updates. 
                Understand market cycles and altcoin season patterns.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Bitcoin dominance tracking</li>
                <li>• Ethereum market share</li>
                <li>• Altcoin dominance metrics</li>
                <li>• Total market cap analysis</li>
              </ul>
            </div>

            {/* Real-time Data */}
            <div className="crypto-card p-6 md:p-8">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-6">
                <Zap className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Real-time Updates</h3>
              <p className="text-sm md:text-base text-gray-600 mb-4">
                Live cryptocurrency prices, volume data, and technical indicators 
                updated every 30 seconds via CoinGecko API.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Live price feeds</li>
                <li>• Volume and market cap data</li>
                <li>• Auto-refresh indicators</li>
                <li>• Historical price charts</li>
              </ul>
            </div>

            {/* Security & Reliability */}
            <div className="crypto-card p-6 md:p-8">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-6">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Secure & Reliable</h3>
              <p className="text-sm md:text-base text-gray-600 mb-4">
                Built with Next.js 15 and TypeScript for maximum performance and type safety. 
                No personal data storage, read-only market analysis.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Type-safe TypeScript</li>
                <li>• Error handling & fallbacks</li>
                <li>• No account required</li>
                <li>• Privacy-focused design</li>
              </ul>
            </div>

            {/* Professional Charts */}
            <div className="crypto-card p-6 md:p-8">
              <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg mb-6">
                <TrendingUp className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Interactive Charts</h3>
              <p className="text-sm md:text-base text-gray-600 mb-4">
                Professional-grade charts powered by Highcharts with zoom, pan, and export features. 
                Visual indicators and trading signal overlays.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Highcharts integration</li>
                <li>• Responsive design</li>
                <li>• Export capabilities</li>
                <li>• Mobile optimized</li>
              </ul>
            </div>

            {/* Coming Soon */}
            <div className="crypto-card p-6 md:p-8 border-2 border-dashed border-gray-300">
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mb-6">
                <Users className="h-6 w-6 text-gray-600" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Coming Soon</h3>
              <p className="text-sm md:text-base text-gray-600 mb-4">
                Advanced features in development: CTO Line indicator, Bull Market Peak detection, 
                and M2 Global Liquidity correlation analysis.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• CTO Line algorithm</li>
                <li>• Bull market signals</li>
                <li>• M2 liquidity correlation</li>
                <li>• Portfolio tracking</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white sm:text-4xl text-center lg:text-left">
            <span className="block">Ready to analyze the market?</span>
            <span className="block text-blue-400">Start your technical analysis now.</span>
          </h2>
          <div className="mt-6 lg:mt-0 lg:flex-shrink-0 flex justify-center lg:justify-end">
            <div className="inline-flex rounded-md shadow">
              <Link href="/dashboard" className="btn-primary text-base md:text-lg px-6 md:px-8 py-3">
                Open Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
              <span className="ml-2 text-base md:text-lg font-semibold text-gray-900">Crypto Analysis Tool</span>
            </div>
            <div className="text-xs md:text-sm text-gray-500 text-center md:text-right">
              © 2024 Advanced Crypto Analysis Platform. Built with Next.js.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 