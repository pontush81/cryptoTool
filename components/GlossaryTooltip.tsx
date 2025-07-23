'use client'

import { useState } from 'react'
import { HelpCircle } from 'lucide-react'

interface GlossaryTooltipProps {
  term: string
  definition: string
  children: React.ReactNode
}

const glossaryTerms: Record<string, string> = {
  'blockchain': 'A distributed digital ledger that records transactions across multiple computers in a way that makes them difficult to change or hack.',
  'bitcoin': 'The first and largest cryptocurrency, created by the pseudonymous Satoshi Nakamoto in 2009.',
  'cryptocurrency': 'Digital or virtual currency secured by cryptography, making it nearly impossible to counterfeit.',
  'private key': 'A secret cryptographic key that allows you to control your cryptocurrency. Never share this with anyone.',
  'public key': 'A cryptographic key that can be shared publicly and is used to receive cryptocurrency.',
  'wallet': 'Software or hardware that stores your private keys and allows you to send and receive cryptocurrency.',
  'mining': 'The process of validating transactions and adding them to the blockchain using computational power.',
  'hash': 'A unique digital fingerprint created by running data through a mathematical algorithm.',
  'node': 'A computer that participates in the blockchain network by maintaining a copy of the ledger.',
  'consensus': 'The process by which the network agrees on the validity of transactions.',
  'defi': 'Decentralized Finance - financial services built on blockchain that operate without traditional intermediaries.',
  'smart contract': 'Self-executing contracts with terms directly written into code that automatically execute when conditions are met.',
  'gas': 'The fee required to execute transactions or smart contracts on blockchain networks like Ethereum.',
  'staking': 'The process of participating in network validation by locking up cryptocurrency to earn rewards.',
  'yield farming': 'The practice of lending or staking cryptocurrency to earn rewards or interest.',
  'liquidity': 'How easily an asset can be bought or sold without affecting its price.',
  'market cap': 'The total value of all coins in circulation, calculated by multiplying price by supply.',
  'volatility': 'The degree of variation in a cryptocurrency\'s price over time.',
  'hodl': 'A misspelling of "hold" that became crypto slang for long-term holding regardless of price fluctuations.',
  'fomo': 'Fear of Missing Out - the anxiety of potentially missing a profitable investment opportunity.',
  'dyor': 'Do Your Own Research - the importance of researching investments independently.',
  'rekt': 'Crypto slang for "wrecked" - suffering significant financial losses.',
  'whale': 'An individual or entity that holds a large amount of cryptocurrency.',
  'pump and dump': 'A fraudulent scheme where the price is artificially inflated then rapidly sold off.',
  'cold storage': 'Storing cryptocurrency offline, typically on hardware wallets, for enhanced security.',
  'hot wallet': 'A cryptocurrency wallet that is connected to the internet.',
  'seed phrase': 'A list of 12-24 words that can restore your entire wallet. Keep this extremely secure.',
  'address': 'A unique identifier where cryptocurrency can be sent, like a bank account number.',
  'transaction fee': 'The cost of sending a cryptocurrency transaction, paid to network validators.',
  'confirmation': 'The process of a transaction being verified and added to the blockchain.',
  'fork': 'A change to the blockchain protocol that creates a new version of the blockchain.',
  'altcoin': 'Any cryptocurrency other than Bitcoin.',
  'stablecoin': 'A cryptocurrency designed to maintain a stable value relative to a reference asset.',
  'exchange': 'A platform where you can buy, sell, and trade cryptocurrencies.',
  'kyc': 'Know Your Customer - the process exchanges use to verify user identity.',
  'aml': 'Anti-Money Laundering - regulations to prevent illegal financial activities.',
  'bull market': 'A period of rising prices and optimistic market sentiment.',
  'bear market': 'A period of declining prices and pessimistic market sentiment.',
  'correction': 'A temporary decline in price after a period of growth.',
  'resistance': 'A price level that cryptocurrency struggles to break above.',
  'support': 'A price level that cryptocurrency tends to bounce off when falling.',
  'ath': 'All-Time High - the highest price a cryptocurrency has ever reached.',
  'atl': 'All-Time Low - the lowest price a cryptocurrency has ever reached.',
  'rsi': 'Relative Strength Index - a technical indicator that measures if an asset is overbought or oversold.',
  'macd': 'Moving Average Convergence Divergence - a technical indicator that shows the relationship between two moving averages.',
  'volume': 'The amount of cryptocurrency traded over a specific period.',
  'market order': 'An order to buy or sell immediately at the current market price.',
  'limit order': 'An order to buy or sell at a specific price or better.',
  'slippage': 'The difference between expected and actual transaction prices.',
  'arbitrage': 'Profiting from price differences of the same asset across different exchanges.',
  'liquidity pool': 'A collection of funds locked in a smart contract to facilitate decentralized trading.',
  'impermanent loss': 'The temporary loss of value that liquidity providers may experience due to price volatility.',
  'apy': 'Annual Percentage Yield - the yearly return on investment including compound interest.',
  'governance token': 'A token that gives holders voting rights in the protocol\'s development and decisions.'
}

export default function GlossaryTooltip({ term, definition, children }: GlossaryTooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  
  // Use provided definition or look up in glossary
  const termDefinition = definition || glossaryTerms[term.toLowerCase()] || 'Definition not available'

  return (
    <div className="relative inline-block">
      <span
        className="cursor-help border-b border-dotted border-blue-500 text-blue-600 hover:text-blue-800 transition-colors"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
      >
        {children}
        <HelpCircle className="inline w-3 h-3 ml-1 opacity-60" />
      </span>
      
      {isVisible && (
        <div className="absolute z-50 w-80 p-4 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg left-1/2 transform -translate-x-1/2">
          <div className="flex items-start space-x-2">
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 text-sm capitalize">{term}</h4>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">{termDefinition}</p>
            </div>
          </div>
          {/* Arrow pointing up */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45"></div>
        </div>
      )}
    </div>
  )
}

// Export the glossary terms for use in other components
export { glossaryTerms } 