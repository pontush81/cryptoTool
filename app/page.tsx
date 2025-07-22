import Link from 'next/link'
import { TrendingUp, BarChart3, Zap, ArrowRight, Activity, Target } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <span className="ml-3 text-xl font-bold text-gray-900">Crypto Analysis Tool</span>
            </div>
            <div className="flex items-center">
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Crypto
            <span className="block text-blue-600">Analysis</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Crypto market analysis tools
          </p>
          <Link href="/dashboard" className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl">
            Start Analysis
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Live Preview Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">See It In Action</h2>
          <p className="text-gray-600">Live market analysis and trading insights</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Technical Analysis Preview */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-blue-50">
                <Activity className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Technical Analysis</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">RSI Signal</span>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Buy Signal</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">MACD</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">Bullish</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Trend</span>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Strong Uptrend</span>
              </div>
            </div>
          </div>

          {/* Market Overview Preview */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-purple-50">
                <BarChart3 className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Market Overview</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Market Cap</span>
                <span className="text-sm font-medium text-gray-900">$3.4T</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">BTC Dominance</span>
                <span className="text-sm font-medium text-gray-900">58.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">24h Volume</span>
                <span className="text-sm font-medium text-green-600">+12.8%</span>
              </div>
            </div>
          </div>

          {/* Peak Detection Preview */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-green-50">
                <Target className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Peak Detection</h3>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-700 mb-2">LOW RISK</div>
              <div className="text-sm text-gray-600 mb-3">90% confidence</div>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Safe to hold</span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="p-3 rounded-full bg-blue-100 mb-4">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Technical Indicators</h3>
              <p className="text-sm text-gray-600">Advanced market analysis</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="p-3 rounded-full bg-green-100 mb-4">
                <Zap className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Market Data</h3>
              <p className="text-sm text-gray-600">Current market insights</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="p-3 rounded-full bg-orange-100 mb-4">
                <Target className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Risk Analysis</h3>
              <p className="text-sm text-gray-600">Smart insights</p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gray-900 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to analyze the crypto market?
          </h2>
          <p className="text-xl text-gray-300">
            Start using advanced analysis tools right now
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                      <div className="flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span className="ml-2 text-sm text-gray-600">© Crypto Analysis Tool</span>
            </div>
        </div>
      </footer>
    </div>
  )
} 