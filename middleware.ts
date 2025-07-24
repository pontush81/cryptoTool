import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Education route redirects - old structure to new consolidated structure
  const educationRedirects: Record<string, string> = {
    // Direct module redirects to /education/modules/[name]
    '/education/getting-started': '/education/modules/getting-started',
    '/education/bitcoin-basics': '/education/modules/bitcoin-basics',
    '/education/money-systems': '/education/modules/money-systems',
    '/education/how-it-works': '/education/modules/how-it-works',
    '/education/defi-tools': '/education/modules/defi-tools',
    '/education/stablecoins': '/education/modules/stablecoins',
    '/education/defi-fundamentals': '/education/modules/defi-fundamentals',
    '/education/real-world-assets': '/education/modules/real-world-assets',
    '/education/institutional-crypto': '/education/modules/institutional-crypto',
    '/education/cbdcs': '/education/modules/cbdcs',
    '/education/cross-chain-finance': '/education/modules/cross-chain-finance',
    '/education/defai': '/education/modules/defai',
    '/education/security': '/education/modules/security',
    '/education/advanced': '/education/modules/advanced',
    
    // Market categories redirects to modules with appropriate filtering
    '/education/market-categories': '/education/modules',
    '/education/market-categories/layer-1-blockchains': '/education/modules',
    '/education/market-categories/layer-1-blockchains/bitcoin-digital-gold': '/education/modules/bitcoin-basics'
  }

  // Check if current path needs redirect
  if (educationRedirects[pathname]) {
    const url = request.nextUrl.clone()
    url.pathname = educationRedirects[pathname]
    return NextResponse.redirect(url, 301) // Permanent redirect
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all education routes
    '/education/:path*'
  ]
} 