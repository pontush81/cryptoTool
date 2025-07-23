import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '../components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Crypto Analysis Tool - Learn Bitcoin & Cryptocurrency Analysis for Beginners',
  description: 'Master cryptocurrency analysis with our beginner-friendly tools and comprehensive education. Learn Bitcoin, technical analysis, and market trends. Free crypto analysis tools, educational content, and real-time market data for beginners and intermediate traders.',
  keywords: [
    // Primary keywords
    'crypto analysis for beginners',
    'cryptocurrency analysis tool',
    'bitcoin analysis',
    'learn cryptocurrency',
    'crypto education',
    
    // Educational keywords
    'bitcoin for beginners',
    'how to analyze cryptocurrency',
    'crypto market analysis',
    'blockchain education',
    'cryptocurrency trading basics',
    
    // Technical analysis keywords
    'crypto technical analysis',
    'cryptocurrency charts',
    'bitcoin price analysis',
    'crypto trading indicators',
    'RSI MACD cryptocurrency',
    
    // Long-tail keywords
    'free crypto analysis tools',
    'cryptocurrency analysis dashboard',
    'learn bitcoin technical analysis',
    'crypto market data',
    'bitcoin dominance analysis',
    
    // User intent keywords
    'how to start crypto analysis',
    'cryptocurrency for beginners',
    'bitcoin investment analysis',
    'crypto market trends',
    'blockchain technology explained'
  ],
  authors: [{ name: 'Crypto Analysis Tool Team' }],
  creator: 'Crypto Analysis Tool',
  publisher: 'Crypto Analysis Tool',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://crypto-tool-eight.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://crypto-tool-eight.vercel.app',
    title: 'Crypto Analysis Tool - Learn Bitcoin & Cryptocurrency Analysis for Beginners',
    description: 'Master cryptocurrency analysis with our beginner-friendly tools and comprehensive education. Learn Bitcoin, technical analysis, and market trends with our free tools.',
    siteName: 'Crypto Analysis Tool',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Crypto Analysis Tool - Learn Bitcoin and Cryptocurrency Analysis',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crypto Analysis Tool - Learn Bitcoin & Cryptocurrency Analysis for Beginners',
    description: 'Master cryptocurrency analysis with beginner-friendly tools and education. Free crypto analysis tools for everyone.',
    images: ['/og-image.jpg'],
    creator: '@cryptoanalysistool',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'finance',
  classification: 'cryptocurrency education and analysis',
}

// Structured Data for SEO
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Crypto Analysis Tool',
  description: 'Master cryptocurrency analysis with our beginner-friendly tools and comprehensive education. Learn Bitcoin, technical analysis, and market trends.',
  url: 'https://crypto-tool-eight.vercel.app',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web Browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    description: 'Free cryptocurrency analysis tools and education'
  },
  author: {
    '@type': 'Organization',
    name: 'Crypto Analysis Tool',
    url: 'https://crypto-tool-eight.vercel.app'
  },
  audience: {
    '@type': 'Audience',
    audienceType: 'Cryptocurrency beginners and intermediate traders'
  },
  keywords: 'crypto analysis, bitcoin education, cryptocurrency for beginners, technical analysis, blockchain learning',

  featureList: [
    'Real-time cryptocurrency market data',
    'Technical analysis indicators (RSI, MACD, Moving Averages)',
    'Bitcoin and blockchain education',
    'Beginner-friendly interface',
    'Free crypto analysis tools',
    'Market dominance analysis',
    'Risk assessment tools',
    'Interactive learning modules'
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <link rel="canonical" href="https://crypto-tool-eight.vercel.app" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Crypto Analysis Tool" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="msapplication-tap-highlight" content="no" />
        
        {/* Additional SEO meta tags */}
        <meta name="google-site-verification" content="your-google-site-verification-code" />
        <meta name="application-name" content="Crypto Analysis Tool" />
        <meta name="referrer" content="origin-when-cross-origin" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
      </body>
    </html>
  )
} 