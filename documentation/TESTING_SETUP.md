# Testing & Responsiveness Setup

## Playwright Testing

Denna applikation använder nu Playwright för end-to-end testing med fokus på responsivitet och cross-browser kompatibilitet.

### Installation & Setup

Playwright är redan installerat och konfigurerat med:

```bash
npm install --save-dev @playwright/test
npx playwright install --with-deps
```

### Tillgängliga Test Scripts

```bash
# Kör alla tester
npm run test

# Kör tester med UI (interaktivt)
npm run test:ui

# Kör tester med browser synlig
npm run test:headed

# Visa test rapport
npm run test:report
```

### Test Coverage

Vi har skapat omfattande tester för:

1. **Hemsida (home.spec.ts)**
   - Navigation fungerar korrekt
   - Feature cards visas
   - Responsivitet på mobil och tablet
   - Tillgänglighet (keyboard navigation)

2. **Dashboard (dashboard.spec.ts)**
   - API mock för stabil testning
   - Sidebar navigation
   - Mobile responsivitet
   - Data refresh funktionalitet
   - Analysis modes

3. **Responsivitet (responsive.spec.ts)**
   - Testar 6 olika skärmstorlekar
   - Mobile: 320px, 375px, 414px
   - Tablet: 768px
   - Desktop: 1024px, 1920px
   - Orientation changes
   - Cross-device funktionalitet

4. **API Endpoints (api.spec.ts)**
   - Alla endpoints (/api/crypto, /api/dominance, etc.)
   - Rate limiting hantering
   - Error states
   - Konsistent response format

### Browser & Device Testing

Konfigurerat för att testa på:
- Desktop Chrome, Firefox, Safari
- Mobile Chrome (Pixel 5)
- Mobile Safari (iPhone 12)
- iPad Pro
- Custom viewports

## Responsivitetsförbättringar

### Genomförda förbättringar:

#### 1. Dashboard Responsivitet
- **Mobile-First Sidebar**: Fixed sidebar som blir overlay på mobil
- **Mobile overlay**: Dark overlay för bättre UX
- **Touch-optimerad navigation**: Större touch targets
- **Kompakt mobile header**: Mindre padding och ikoner på små skärmar
- **Responsiv crypto-tabell**: Horisontell scrolling och kompakt layout

#### 2. Hemsida Responsivitet  
- **Flexibel navigation**: Anpassar text beroende på skärmstorlek
- **Hero-sektion**: Responsiva text-storlekar och spacing
- **Feature grid**: Optimerat för 1/2/3 kolumner beroende på skärmstorlek
- **CTA buttons**: Responsiva storlekar och centrering

#### 3. CSS Utilities
Nya responsive utility klasser:
```css
.mobile-scroll { /* Horizontal scroll with hidden scrollbar */ }
.mobile-grid { /* Responsive grid layout */ }
.mobile-text { /* Responsive text sizes */ }
.mobile-heading { /* Responsive heading sizes */ }
.mobile-padding { /* Responsive padding */ }
.mobile-spacing { /* Responsive spacing */ }
.touch-action { /* Touch optimization */ }
.focus-visible { /* Accessibility improvements */ }
```

#### 4. Breakpoint Strategy
- **Mobile First**: Design börjar med mobil och skalas upp
- **Tailwind breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Flexibla komponenter**: Alla komponenter anpassar sig automatiskt

### Responsivitetstest Manuellt

För att testa responsiviteten manuellt:

1. **Öppna utvecklarverktyg**: F12 eller Cmd+Opt+I
2. **Aktivera responsive mode**: Ctrl+Shift+M eller Cmd+Shift+M  
3. **Testa olika enheter**:
   - iPhone SE (375px)
   - iPad (768px) 
   - Desktop (1200px+)

### Nyckelförbättringar

✅ **Sidebar Navigation**: Perfekt mobile experience med overlay
✅ **Touch Targets**: Alla knappar och länkar är touch-vänliga (min 44px)
✅ **Readability**: Text skalas korrekt på alla enheter
✅ **Loading States**: Responsiva loading indicators
✅ **Error Handling**: Mobile-optimerade felmeddelanden
✅ **Charts & Data**: Horisontell scroll för tabeller på mobil

## Nästa Steg

1. **Performance Testing**: Lägg till Lighthouse tester
2. **Accessibility Testing**: Utöka WCAG compliance tester
3. **Visual Regression Testing**: Screenshot comparison
4. **Cross-browser Compatibility**: Utöka browser support

## Kända Problem

- API rate limiting från CoinGecko kan påverka tester
- Vissa test selectors kan behöva justeras för olika skärmstorlekar
- Video recording kan påverka test prestanda

Använd `--reporter=list` för snabbare feedback under utveckling. 