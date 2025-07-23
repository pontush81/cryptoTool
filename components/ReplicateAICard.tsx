'use client';

import { useState } from 'react';
import { Brain, Image, FileText, TrendingUp, Loader2 } from 'lucide-react';

interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  image: string;
}

interface ReplicateAICardProps {
  cryptoData?: CryptoData;
}

export default function ReplicateAICard({ cryptoData }: ReplicateAICardProps) {
  const [activeTab, setActiveTab] = useState<'insight' | 'education' | 'image'>('insight');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>('');
  const [prompt, setPrompt] = useState('');
  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');

  const generateMarketInsight = async () => {
    if (!cryptoData || !prompt.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/replicate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'market-insight',
          marketData: cryptoData,
          insightPrompt: prompt
        })
      });
      
      const data = await response.json();
      if (data.insight) {
        setResult(data.insight);
      }
    } catch (error) {
      console.error('Error generating market insight:', error);
      setResult('Error generating insight. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const generateEducationalContent = async () => {
    if (!topic.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/replicate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'educational-content',
          topic,
          level
        })
      });
      
      const data = await response.json();
      if (data.content) {
        setResult(data.content);
      }
    } catch (error) {
      console.error('Error generating educational content:', error);
      setResult('Error generating content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const generateImage = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/replicate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generate-image',
          prompt: `Professional cryptocurrency ${prompt}, modern financial design, high quality`,
          width: 1024,
          height: 768
        })
      });
      
      const data = await response.json();
      if (data.images && data.images.length > 0) {
        setResult(`Image generated successfully! URL: ${data.images[0]}`);
      }
    } catch (error) {
      console.error('Error generating image:', error);
      setResult('Error generating image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    {
      id: 'insight' as const,
      label: 'Market Insights',
      icon: TrendingUp,
      description: 'AI-powered market analysis'
    },
    {
      id: 'education' as const,
      label: 'Education',
      icon: FileText,
      description: 'Learn crypto concepts'
    },
    {
      id: 'image' as const,
      label: 'Visualizations',
      icon: Image,
      description: 'Generate charts & graphics'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-purple-100 p-2 rounded-lg">
          <Brain className="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">AI Assistant</h2>
          <p className="text-sm text-gray-600">Powered by Replicate</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-purple-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Market Insights Tab */}
      {activeTab === 'insight' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What would you like to know about the market?
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., What are the current trends and risks?"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={3}
            />
          </div>
          <button
            onClick={generateMarketInsight}
            disabled={loading || !cryptoData || !prompt.trim()}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Generate Insight'
            )}
          </button>
        </div>
      )}

      {/* Education Tab */}
      {activeTab === 'education' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Topic to learn about
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., DeFi, NFTs, Blockchain basics"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Level
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value as 'beginner' | 'intermediate' | 'advanced')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <button
            onClick={generateEducationalContent}
            disabled={loading || !topic.trim()}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating...
              </>
            ) : (
              'Create Content'
            )}
          </button>
        </div>
      )}

      {/* Image Generation Tab */}
      {activeTab === 'image' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Describe the visualization you want
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., Bitcoin price chart, trading dashboard, DeFi infographic"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={3}
            />
          </div>
          <button
            onClick={generateImage}
            disabled={loading || !prompt.trim()}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate Image'
            )}
          </button>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-2">Result:</h3>
          <div className="text-sm text-gray-700 whitespace-pre-wrap">
            {result}
          </div>
        </div>
      )}

      {/* Info */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-xs text-blue-800">
          <strong>Note:</strong> You need to add your Replicate API token to the .env.local file to use these features.
          Get your token from <a href="https://replicate.com" target="_blank" rel="noopener noreferrer" className="underline">replicate.com</a>
        </p>
      </div>
    </div>
  );
} 