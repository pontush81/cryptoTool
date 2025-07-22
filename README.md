# 🚀 Advanced Crypto Analysis Tool

A professional cryptocurrency analysis platform built with Next.js 15, featuring advanced technical indicators, real-time market data, and automated trading signals.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://typescript.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

## ✨ Features

### 📊 Technical Analysis
- **RSI (Relative Strength Index)** with customizable periods
- **MACD (8,21,5)** with custom settings optimized for crypto markets
- **Trading Signals** with automated buy/sell/hold recommendations
- **Signal Strength Scoring** (0-100%) for decision confidence

### 🌍 Market Intelligence
- **Real-time Price Data** from CoinGecko API
- **Market Dominance Tracking** (Bitcoin, Ethereum, Altcoins)
- **Global Market Cap** monitoring
- **Volume Analysis** across top cryptocurrencies

### 🎯 Advanced Features
- **Live Dashboard** with auto-refresh every 30 seconds
- **Professional Charts** powered by Highcharts
- **Mobile Responsive** design for all devices
- **Error Handling** with graceful fallbacks
- **Type Safety** with full TypeScript implementation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/pontush81/cryptoTool.git
cd cryptoTool

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📱 Usage

### Dashboard
- Navigate to `/dashboard` for the main analysis interface
- View real-time crypto prices and market data
- Monitor technical indicators (RSI, MACD)
- Receive automated trading signals

### Technical Analysis
- RSI values: 
  - **≤ 30**: Oversold (potential buy opportunity)
  - **≥ 70**: Overbought (potential sell opportunity)
  - **30-70**: Neutral zone
- MACD crossovers generate buy/sell signals
- Combined RSI+MACD logic for enhanced accuracy

## 🏗️ Project Structure

```
├── app/
│   ├── api/
│   │   ├── crypto/          # CoinGecko API integration
│   │   ├── dominance/       # Market dominance data
│   │   └── technical-analysis/ # RSI + MACD calculations
│   ├── dashboard/           # Main dashboard page
│   └── page.tsx            # Landing page
├── components/
│   ├── CryptoChart.tsx     # Highcharts integration
│   ├── DominanceCard.tsx   # Market dominance display
│   └── TechnicalAnalysisCard.tsx # RSI + MACD indicators
├── lib/
│   └── indicators.ts       # Technical analysis algorithms
└── public/                 # Static assets
```

## 🔌 API Endpoints

### `/api/crypto`
Returns real-time cryptocurrency data for top 10 coins by market cap.

### `/api/dominance`
Provides Bitcoin and Ethereum market dominance percentages.

### `/api/technical-analysis?symbol=bitcoin`
Calculates RSI, MACD, and trading signals for specified cryptocurrency.

## 🧮 Technical Indicators

### RSI (Relative Strength Index)
- Period: 14 (configurable)
- Wilders smoothing method
- Oversold: ≤ 30
- Overbought: ≥ 70

### MACD (Moving Average Convergence Divergence)
- Fast EMA: 8 periods
- Slow EMA: 21 periods  
- Signal Line: 5 periods
- Detects bullish/bearish crossovers

### Trading Signals
- **Buy**: MACD bullish crossover + RSI recovery from oversold
- **Sell**: MACD bearish crossover
- **Hold**: All other conditions

## 🎨 Components

### CryptoChart
Interactive price charts with Highcharts integration, supporting zoom, pan, and export functionality.

### TechnicalAnalysisCard
Real-time RSI and MACD indicators with visual signal displays and trading recommendations.

### DominanceCard
Market dominance tracking for Bitcoin, Ethereum, and altcoins with percentage breakdowns.

## ⚡ Performance

- **Auto-refresh**: 30-second intervals for live data
- **Caching**: API responses cached for 60 seconds
- **Error Handling**: Graceful degradation with mock data fallbacks
- **Type Safety**: Full TypeScript coverage
- **Mobile Optimized**: Responsive design for all screen sizes

## 🔒 Security

- **No Authentication Required**: Read-only market analysis
- **No Personal Data**: Privacy-focused design
- **API Rate Limiting**: Respects CoinGecko API limits
- **HTTPS Only**: Secure data transmission

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel deploy
```

### Docker
```bash
docker build -t crypto-analysis-tool .
docker run -p 3000:3000 crypto-analysis-tool
```

## 🗺️ Roadmap

### Phase 3 - Advanced Indicators (In Progress)
- [ ] CTO Line indicator implementation
- [ ] Bull Market Peak detection
- [ ] M2 Global Liquidity correlation

### Phase 4 - Enhanced Features (Planned)
- [ ] Portfolio tracking
- [ ] Custom alerts and notifications
- [ ] Historical backtesting
- [ ] Advanced charting tools

### Phase 5 - Enterprise Features (Future)
- [ ] User accounts and preferences
- [ ] Custom indicator builder
- [ ] API integration marketplace
- [ ] White-label solutions

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **CoinGecko** for providing reliable cryptocurrency API
- **Highcharts** for professional charting capabilities
- **Next.js Team** for the incredible React framework
- **Tailwind CSS** for utility-first styling
- **Vercel** for seamless deployment platform

---

Built with ❤️ for serious crypto traders and investors.

**Live Demo**: [https://cryptotool.vercel.app](https://cryptotool.vercel.app)
**Repository**: [https://github.com/pontush81/cryptoTool](https://github.com/pontush81/cryptoTool)
