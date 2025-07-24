'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, Star, Calendar, User, Image, Trophy, Palette, ArrowRight } from 'lucide-react'
import QuizComponent from '../../../../components/QuizComponent'
import GlossaryTooltip from '../../../../components/GlossaryTooltip'

interface Section {
  id: string
  title: string
  content: React.ReactNode
  completed: boolean
}

export default function NFTsDigitalOwnershipPage() {
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
      // Save completion to localStorage
      const completedModules = JSON.parse(localStorage.getItem('completedEducationModules') || '[]')
      if (!completedModules.includes('nfts-digital-ownership')) {
        completedModules.push('nfts-digital-ownership')
        localStorage.setItem('completedEducationModules', JSON.stringify(completedModules))
      }
    }
  }

  const quizQuestions = [
    {
      id: 'q1',
      question: 'What does NFT stand for?',
      options: [
        'New Financial Token',
        'Non-Fungible Token',
        'Network File Transfer',
        'Next Generation Trading'
      ],
      correctAnswer: 1,
      explanation: 'NFT stands for Non-Fungible Token. "Non-fungible" means each token is unique and cannot be replaced with something else, unlike fungible tokens like Bitcoin where each coin is identical.'
    },
    {
      id: 'q2', 
      question: 'What blockchain standard is most commonly used for NFTs?',
      options: [
        'ERC-20',
        'ERC-721',
        'ERC-1155',
        'Both ERC-721 and ERC-1155'
      ],
      correctAnswer: 3,
      explanation: 'Both ERC-721 and ERC-1155 are used for NFTs. ERC-721 creates unique, individual tokens, while ERC-1155 allows for both unique and semi-fungible tokens in the same contract.'
    },
    {
      id: 'q3',
      question: 'What does owning an NFT typically give you?',
      options: [
        'Full copyright ownership of the underlying content',
        'The right to the blockchain record and whatever the creator specifies',
        'Automatic licensing for commercial use',
        'Physical ownership of digital art'
      ],
      correctAnswer: 1,
      explanation: 'Owning an NFT gives you the right to the blockchain record and whatever rights the creator explicitly grants. It doesn\'t automatically transfer copyright or commercial rights unless specifically stated.'
    },
    {
      id: 'q4',
      question: 'Which of these is NOT a common use case for NFTs?',
      options: [
        'Digital art and collectibles',
        'Gaming items and avatars',
        'Replacing traditional bank accounts',
        'Event tickets and memberships'
      ],
      correctAnswer: 2,
      explanation: 'NFTs are not designed to replace bank accounts. They\'re used for unique digital assets like art, gaming items, collectibles, tickets, domain names, and membership tokens.'
    },
    {
      id: 'q5',
      question: 'What is a major criticism of NFTs?',
      options: [
        'They use too much electricity',
        'Digital assets can be easily copied',
        'Many projects lack real utility',
        'All of the above'
      ],
      correctAnswer: 3,
      explanation: 'All of these are common criticisms: energy consumption (though Ethereum now uses Proof of Stake), the fact that digital files can be copied even if ownership is unique, and that many NFT projects lack practical utility beyond speculation.'
    }
  ]

  const sections: Section[] = [
    {
      id: 'what-are-nfts',
      title: 'What Are NFTs?',
      completed: completedSections.has('what-are-nfts'),
      content: (
        <div className="space-y-6">
          <div className="bg-purple-50 border-l-4 border-purple-400 p-6 rounded-r-lg">
            <p className="text-lg leading-relaxed text-gray-700">
              <GlossaryTooltip term="nft">
                <strong>NFTs (Non-Fungible Tokens)</strong>
              </GlossaryTooltip> are unique digital certificates stored on a blockchain 
              that prove ownership of a specific digital or physical item. Unlike cryptocurrencies where each coin is identical, 
              each NFT is one-of-a-kind and cannot be replicated.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Trophy className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">Fungible vs Non-Fungible</h4>
              </div>
              <div className="space-y-3">
                <div className="bg-green-50 rounded-lg p-3">
                  <h5 className="font-semibold text-green-900 mb-1">Fungible (Bitcoin)</h5>
                  <p className="text-green-800 text-sm">Each coin is identical and interchangeable. 1 BTC = 1 BTC always.</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-3">
                  <h5 className="font-semibold text-purple-900 mb-1">Non-Fungible (NFTs)</h5>
                  <p className="text-purple-800 text-sm">Each token is unique with different properties, history, and value.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Image className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">Key Properties</h4>
              </div>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• <strong>Unique:</strong> Each NFT has distinct characteristics</li>
                <li>• <strong>Verifiable:</strong> Ownership proven on blockchain</li>
                <li>• <strong>Transferable:</strong> Can be bought, sold, or traded</li>
                <li>• <strong>Programmable:</strong> Can include smart contract logic</li>
                <li>• <strong>Interoperable:</strong> Work across different platforms</li>
              </ul>
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-orange-900 mb-3">Think of NFTs Like...</h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-orange-800">
              <div>
                <strong>Concert Tickets:</strong> Each seat number is unique, even though they're all tickets to the same show.
              </div>
              <div>
                <strong>Trading Cards:</strong> Each card has different stats and rarity, making some more valuable than others.
              </div>
              <div>
                <strong>Real Estate Deeds:</strong> Each property deed is unique and proves ownership of a specific location.
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'nft-standards',
      title: 'NFT Technical Standards',
      completed: completedSections.has('nft-standards'),
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700">
            NFTs are built using specific technical standards on Ethereum and other blockchains. 
            These standards ensure compatibility across different platforms and marketplaces.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Star className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">ERC-721 Standard</h4>
              </div>
              <div className="space-y-3 text-sm text-gray-600">
                <div>• <strong>Purpose:</strong> Individual unique tokens</div>
                <div>• <strong>Examples:</strong> CryptoPunks, Bored Apes</div>
                <div>• <strong>Features:</strong> Each token completely unique</div>
                <div>• <strong>Gas Costs:</strong> Higher for large collections</div>
                <div>• <strong>Best For:</strong> Art, collectibles, one-of-a-kind items</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Trophy className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">ERC-1155 Standard</h4>
              </div>
              <div className="space-y-3 text-sm text-gray-600">
                <div>• <strong>Purpose:</strong> Multiple token types in one contract</div>
                <div>• <strong>Examples:</strong> Gaming items, event tickets</div>
                <div>• <strong>Features:</strong> Both unique and semi-fungible</div>
                <div>• <strong>Gas Costs:</strong> More efficient for large collections</div>
                <div>• <strong>Best For:</strong> Gaming, utilities, batch operations</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Other Blockchain Standards</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4">
                <h5 className="font-semibold text-purple-900 mb-2">Solana</h5>
                <p className="text-sm text-gray-600">Uses SPL Token standard, faster and cheaper than Ethereum</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h5 className="font-semibold text-blue-900 mb-2">Polygon</h5>
                <p className="text-sm text-gray-600">Ethereum-compatible with lower fees</p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h5 className="font-semibold text-green-900 mb-2">Flow</h5>
                <p className="text-sm text-gray-600">Designed specifically for NFTs and digital assets</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'digital-art-revolution',
      title: 'The Digital Art Revolution',
      completed: completedSections.has('digital-art-revolution'),
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700">
            NFTs have revolutionized digital art by solving the "digital scarcity" problem. 
            For the first time, digital creators can sell original, verifiably unique pieces online.
          </p>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Before NFTs vs After NFTs</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h5 className="font-semibold text-red-900">Digital Art Problems (Before)</h5>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="bg-red-50 p-3 rounded">• Perfect copies were identical to originals</div>
                  <div className="bg-red-50 p-3 rounded">• No way to prove authenticity</div>
                  <div className="bg-red-50 p-3 rounded">• Artists struggled to monetize digital work</div>
                  <div className="bg-red-50 p-3 rounded">• No secondary market royalties</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h5 className="font-semibold text-green-900">NFT Solutions (After)</h5>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="bg-green-50 p-3 rounded">• Blockchain proves authentic ownership</div>
                  <div className="bg-green-50 p-3 rounded">• Digital scarcity creates value</div>
                  <div className="bg-green-50 p-3 rounded">• Artists earn from primary sales</div>
                  <div className="bg-green-50 p-3 rounded">• Programmable royalties on resales</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-purple-900 mb-4">Famous NFT Art Milestones</h4>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Palette className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">Beeple's "Everydays" (2021)</h5>
                    <p className="text-gray-600 text-sm">Sold for $69 million at Christie's, putting NFT art on the global map</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Image className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">CryptoPunks (2017)</h5>
                    <p className="text-gray-600 text-sm">10,000 unique pixel art characters, pioneering the PFP (Profile Picture) trend</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900">Art Blocks (2020)</h5>
                    <p className="text-gray-600 text-sm">Generative art platform where algorithms create unique pieces at mint</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'utility-nfts',
      title: 'Utility NFTs Beyond Art',
      completed: completedSections.has('utility-nfts'),
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700">
            While digital art gets the headlines, NFTs have practical applications across gaming, 
            memberships, virtual worlds, and real-world assets. These "utility NFTs" provide ongoing value beyond speculation.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Trophy className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">Gaming & Virtual Worlds</h4>
              </div>
              <div className="space-y-3 text-sm text-gray-600">
                <div>• <strong>Axie Infinity:</strong> Creatures that battle and earn tokens</div>
                <div>• <strong>The Sandbox:</strong> Virtual land and assets</div>
                <div>• <strong>Decentraland:</strong> Virtual real estate and wearables</div>
                <div>• <strong>Gods Unchained:</strong> Trading card game with real ownership</div>
                <div>• <strong>Benefits:</strong> True ownership, cross-game interoperability</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Star className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">Memberships & Access</h4>
              </div>
              <div className="space-y-3 text-sm text-gray-600">
                <div>• <strong>Bored Ape Yacht Club:</strong> Exclusive community access</div>
                <div>• <strong>VeeFriends:</strong> Conference and event tickets</div>
                <div>• <strong>World of Women:</strong> Community and networking</div>
                <div>• <strong>Proof Collective:</strong> Investment DAO membership</div>
                <div>• <strong>Benefits:</strong> Exclusive events, Discord access, voting rights</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Image className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">Identity & Credentials</h4>
              </div>
              <div className="space-y-3 text-sm text-gray-600">
                <div>• <strong>ENS Domains:</strong> Human-readable blockchain addresses</div>
                <div>• <strong>POAP:</strong> Proof of attendance at events</div>
                <div>• <strong>Academic Credentials:</strong> Tamper-proof diplomas</div>
                <div>• <strong>Professional Certificates:</strong> Verifiable skills and achievements</div>
                <div>• <strong>Benefits:</strong> Portable identity, no central authority needed</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Palette className="w-6 h-6 text-orange-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">Real-World Assets</h4>
              </div>
              <div className="space-y-3 text-sm text-gray-600">
                <div>• <strong>Real Estate:</strong> Property deeds and fractional ownership</div>
                <div>• <strong>Luxury Goods:</strong> Authentication for watches, bags, sneakers</div>
                <div>• <strong>Supply Chain:</strong> Tracking products from origin to consumer</div>
                <div>• <strong>Event Tickets:</strong> Fraud-proof tickets with resale tracking</div>
                <div>• <strong>Benefits:</strong> Transparency, authenticity, global markets</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'nft-marketplaces',
      title: 'NFT Marketplaces & Trading',
      completed: completedSections.has('nft-marketplaces'),
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700">
            NFT marketplaces are platforms where you can buy, sell, and discover NFTs. 
            Each marketplace has different features, fees, and communities.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Major Marketplaces</h4>
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h5 className="font-semibold text-blue-900 mb-2">OpenSea</h5>
                  <div className="text-sm text-blue-800">
                    <div>• Largest NFT marketplace</div>
                    <div>• 2.5% platform fee</div>
                    <div>• Supports all major standards</div>
                    <div>• Easy for beginners</div>
                  </div>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-4">
                  <h5 className="font-semibold text-purple-900 mb-2">LooksRare</h5>
                  <div className="text-sm text-purple-800">
                    <div>• Community-owned marketplace</div>
                    <div>• 2% platform fee</div>
                    <div>• Token rewards for trading</div>
                    <div>• Focus on high-value NFTs</div>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4">
                  <h5 className="font-semibold text-green-900 mb-2">Magic Eden</h5>
                  <div className="text-sm text-green-800">
                    <div>• Leading Solana marketplace</div>
                    <div>• Lower fees due to Solana</div>
                    <div>• Fast transactions</div>
                    <div>• Gaming-focused NFTs</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Trading Considerations</h4>
              <div className="space-y-4 text-sm text-gray-600">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3">
                  <h5 className="font-semibold text-yellow-900 mb-1">Fees to Consider</h5>
                  <div>• Platform fees (2-2.5%)</div>
                  <div>• Creator royalties (0-10%)</div>
                  <div>• Gas fees for transactions</div>
                  <div>• Payment processor fees</div>
                </div>
                
                <div className="bg-red-50 border-l-4 border-red-400 p-3">
                  <h5 className="font-semibold text-red-900 mb-1">Risks to Avoid</h5>
                  <div>• Fake/counterfeit NFTs</div>
                  <div>• Rug pulls and abandoned projects</div>
                  <div>• Market manipulation</div>
                  <div>• Platform risks and downtime</div>
                </div>
                
                <div className="bg-green-50 border-l-4 border-green-400 p-3">
                  <h5 className="font-semibold text-green-900 mb-1">Best Practices</h5>
                  <div>• Verify contract addresses</div>
                  <div>• Research creator history</div>
                  <div>• Understand utility and roadmap</div>
                  <div>• Only invest what you can lose</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'legal-considerations',
      title: 'Legal & IP Considerations',
      completed: completedSections.has('legal-considerations'),
      content: (
        <div className="space-y-6">
          <p className="text-lg text-gray-700">
            Understanding what you actually own when you buy an NFT is crucial. 
            The legal landscape is still evolving, but there are important distinctions between NFT ownership and intellectual property rights.
          </p>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-yellow-900 mb-4">What NFT Ownership Actually Means</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-semibold text-green-900 mb-3">What You DO Own</h5>
                <div className="space-y-2 text-sm text-green-800">
                  <div>• The blockchain record/token itself</div>
                  <div>• Right to transfer/sell the NFT</div>
                  <div>• Access to associated utilities/perks</div>
                  <div>• Whatever rights the creator explicitly grants</div>
                  <div>• Bragging rights and social status</div>
                </div>
              </div>
              
              <div>
                <h5 className="font-semibold text-red-900 mb-3">What You DON'T Own (Usually)</h5>
                <div className="space-y-2 text-sm text-red-800">
                  <div>• Copyright to the underlying artwork</div>
                  <div>• Right to create derivative works</div>
                  <div>• Commercial licensing rights</div>
                  <div>• The actual digital file (often stored elsewhere)</div>
                  <div>• Protection against copying/screenshotting</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Different License Models</h4>
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h5 className="font-semibold text-blue-900 mb-2">Full Commercial Rights (CC0)</h5>
                <p className="text-blue-800 text-sm mb-2">
                  Examples: Nouns, CryptoPunks (after Yuga Labs acquisition)
                </p>
                <div className="text-sm text-blue-800">
                  • Can use for any commercial purpose
                  • Can create derivatives and merchandise
                  • No permission needed from creator
                </div>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4">
                <h5 className="font-semibold text-green-900 mb-2">Limited Commercial Rights</h5>
                <p className="text-green-800 text-sm mb-2">
                  Examples: Bored Ape Yacht Club, World of Women
                </p>
                <div className="text-sm text-green-800">
                  • Commercial use up to certain revenue limits
                  • Can create merchandise and content
                  • Some restrictions on adult content/illegal activities
                </div>
              </div>
              
              <div className="bg-orange-50 rounded-lg p-4">
                <h5 className="font-semibold text-orange-900 mb-2">Personal Use Only</h5>
                <p className="text-orange-800 text-sm mb-2">
                  Examples: Many 1/1 art pieces, some PFP collections
                </p>
                <div className="text-sm text-orange-800">
                  • Can display as profile picture
                  • Cannot use for commercial purposes
                  • Traditional art ownership model
                </div>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-red-900 mb-3">Important Legal Considerations</h4>
            <div className="space-y-3 text-sm text-red-800">
              <div>• <strong>Always read the terms:</strong> Each project defines rights differently</div>
              <div>• <strong>Jurisdiction matters:</strong> NFT laws vary by country</div>
              <div>• <strong>Platform dependencies:</strong> Rights may depend on platform survival</div>
              <div>• <strong>Tax implications:</strong> NFT sales may be taxable events</div>
              <div>• <strong>Estate planning:</strong> Consider how NFTs transfer after death</div>
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
              <Link href="/education/modules" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-3">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Learning Journey
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">NFTs & Digital Ownership</h1>
              <p className="text-gray-600 mt-1">
                Non-fungible tokens and the future of digital asset ownership
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
              <div className="p-3 bg-purple-100 rounded-lg">
                <Star className="w-8 h-8 text-purple-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Course Overview</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    25 min read
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
                  className="bg-purple-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Learning Objectives */}
            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-3">What You'll Learn</h3>
              <div className="grid md:grid-cols-2 gap-3 text-sm text-purple-800">
                <div>• What makes NFTs unique and valuable</div>
                <div>• Technical standards (ERC-721 vs ERC-1155)</div>
                <div>• The digital art revolution</div>
                <div>• Utility NFTs beyond collectibles</div>
                <div>• How to safely buy and sell NFTs</div>
                <div>• Legal rights and intellectual property</div>
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

          {/* Quiz Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Knowledge Check</h2>
                <p className="text-gray-600 mt-1">Test your understanding of NFTs and digital ownership</p>
              </div>
              {!showQuiz && (
                <button
                  onClick={() => setShowQuiz(true)}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Take Quiz
                </button>
              )}
            </div>

            {showQuiz && (
              <QuizComponent
                title="NFTs & Digital Ownership Quiz"
                questions={quizQuestions}
                onComplete={handleQuizComplete}
              />
            )}

            {quizCompleted && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-green-900">Module Completed!</h3>
                    <p className="text-green-700 text-sm">You now understand the fundamentals of NFTs and digital ownership.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Next Steps */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg shadow-lg p-6 text-white">
            <h2 className="text-xl font-semibold mb-3">Ready to Explore More?</h2>
            <p className="mb-4 opacity-90">
              Now that you understand NFTs, explore how they're used in decentralized finance and gaming ecosystems.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/education/modules/defi-fundamentals"
                className="inline-flex items-center px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors text-sm"
              >
                DeFi Fundamentals
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                href="/education/modules/ethereum-smart-contracts"
                className="inline-flex items-center px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors text-sm"
              >
                Smart Contracts
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 