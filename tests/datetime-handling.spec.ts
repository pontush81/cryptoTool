import { test, expect } from '@playwright/test';

test.describe('Date and Time Handling', () => {
  test.beforeEach(async ({ page }) => {
    // Mock M2 liquidity API med känt datum
    await page.route('/api/m2-liquidity', async (route) => {
      const mockM2Response = {
        success: true,
        data: {
          currentM2: 131.3,
          m2Trend: 'expanding',
          correlation: 24.4,
          impact: 'neutral',
          confidence: 85,
          liquidityTrend: 'Expanding 📈',
          lagDays: 90,
          historicalData: [
            {
              date: '2024-01-01',
              m2Value: 128.5,
              bitcoinPrice: 42000,
              growthRate: 3.2,
              timestamp: '2024-01-01T00:00:00.000Z'
            },
            {
              date: '2024-06-01',
              m2Value: 130.1,
              bitcoinPrice: 65000,
              growthRate: 3.5,
              timestamp: '2024-06-01T00:00:00.000Z'
            },
            {
              date: '2024-12-01',
              m2Value: 131.3,
              bitcoinPrice: 95000,
              growthRate: 3.8,
              timestamp: '2024-12-01T00:00:00.000Z'
            }
          ]
        },
        timestamp: new Date().toISOString()
      };
      await route.fulfill({ json: mockM2Response });
    });
  });

  test('should display correct dates in M2 Liquidity chart', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Vänta på att M2 Liquidity kortet laddas
    await expect(page.getByText('M2 Global Liquidity')).toBeVisible();
    
    // Kontrollera att grafen inte visar "Jan 1970"
    const chartArea = page.locator('.bg-gray-50 .bg-white.border');
    await expect(chartArea).toBeVisible();
    
    // Kontrollera att vi INTE ser "Jan 1970" eller "1970" någonstans
    const pageContent = await page.textContent('body');
    expect(pageContent).not.toContain('1970');
    expect(pageContent).not.toContain('Jan 1970');
    
    // Kontrollera att vi ser rimliga årtal (2024, etc)
    expect(pageContent).toMatch(/20[2-9][0-9]/); // Matches years like 2024, 2025, etc
  });

  test('should handle date conversion correctly in chart', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Vänta på M2 Liquidity kortet
    await expect(page.getByText('M2 Global Liquidity')).toBeVisible();
    
    // Kontrollera att SVG grafen finns och innehåller korrekt formaterade datum
    const svgChart = page.locator('svg');
    await expect(svgChart).toBeVisible();
    
    // Kontrollera att SVG-textelementen innehåller månad/år format, inte 1970
    const svgTexts = page.locator('svg text');
    const textContents = await svgTexts.allTextContents();
    
    // Kontrollera att minst en text innehåller korrekt datumformat
    const hasValidDates = textContents.some(text => 
      /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{2}$/.test(text.trim()) &&
      !text.includes('70') // Inte år '70 från 1970
    );
    
    expect(hasValidDates).toBeTruthy();
  });

  test('should not show epoch time (1970) in any date displays', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Mock alla API endpoints för att säkerställa konsekvent beteende
    await page.route('/api/**', async (route) => {
      const url = route.request().url();
      
      if (url.includes('/api/crypto')) {
        await route.fulfill({
          json: {
            success: true,
            data: [
              {
                id: 'bitcoin',
                name: 'Bitcoin',
                symbol: 'btc',
                current_price: 95000,
                price_change_24h: 2000,
                price_change_percentage_24h: 2.15,
                market_cap: 1800000000000,
                total_volume: 45000000000,
                image: 'https://example.com/bitcoin.png'
              }
            ],
            global: {
              total_market_cap_usd: 3200000000000,
              total_market_cap_change_24h: 1.5,
              total_volume_usd: 120000000000
            },
            timestamp: new Date().toISOString()
          }
        });
      } else if (url.includes('/api/dominance')) {
        await route.fulfill({
          json: {
            success: true,
            data: {
              bitcoin_dominance: 56.2,
              ethereum_dominance: 18.5
            },
            timestamp: new Date().toISOString()
          }
        });
      } else {
        await route.continue();
      }
    });
    
    await page.reload();
    
    // Vänta på att sidan laddas helt
    await expect(page.getByText('Market Overview')).toBeVisible();
    
    // Kontrollera all synlig text på sidan
    const bodyText = await page.textContent('body');
    
    // Dessa strängar ska INTE finnas på sidan
    const forbiddenDateStrings = [
      'Jan 1970',
      'January 1970', 
      '1/1/1970',
      '01/01/1970',
      'Thu Jan 01 1970',
      '1970-01-01'
    ];
    
    for (const forbidden of forbiddenDateStrings) {
      expect(bodyText).not.toContain(forbidden);
    }
    
    // Kontrollera att vi har rimliga datum istället
    const currentYear = new Date().getFullYear();
    const hasCurrentYearRange = [currentYear - 2, currentYear - 1, currentYear, currentYear + 1]
      .some(year => bodyText?.includes(year.toString()));
    
    expect(hasCurrentYearRange).toBeTruthy();
  });

  test('should format timestamps correctly in all components', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Navigera till Analysis för att testa alla komponenter
    await page.click('text=Analysis');
    await expect(page.getByText('Technical Analysis')).toBeVisible();
    
    // Kontrollera att ingen komponent visar ogiltiga datum
    const allText = await page.textContent('body');
    
    // Kontrollera för epoch time indikatorer
    expect(allText).not.toMatch(/19[67][0-9]/); // Inte 1960-1979
    expect(allText).not.toContain('Unix');
    expect(allText).not.toContain('Epoch');
    
    // Kontrollera för korrekta datumformat
    const hasValidTimeFormat = /\d{1,2}:\d{2}/.test(allText || ''); // HH:MM format
    const hasValidDateFormat = /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/.test(allText || ''); // Month names
    
    expect(hasValidTimeFormat || hasValidDateFormat).toBeTruthy();
  });
}); 