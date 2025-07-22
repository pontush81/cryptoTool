import { test, expect } from '@playwright/test';

test.describe('Responsive Design', () => {
  const viewports = [
    { name: 'Mobile Small', width: 320, height: 568 },
    { name: 'Mobile Medium', width: 375, height: 667 },
    { name: 'Mobile Large', width: 414, height: 736 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Desktop', width: 1024, height: 768 },
    { name: 'Desktop Large', width: 1920, height: 1080 }
  ];

  viewports.forEach(({ name, width, height }) => {
    test(`should display correctly on ${name} (${width}x${height})`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.goto('/');
      
      // Check that content is visible and properly arranged
      await expect(page.getByRole('navigation').getByText('Crypto Analysis Tool')).toBeVisible();
      await expect(page.getByText('Advanced Crypto')).toBeVisible();
      
      // Check navigation
      const dashboardLink = page.getByRole('link', { name: 'Open Dashboard' }).first();
      await expect(dashboardLink).toBeVisible();
      
      // Check feature grid responds properly
      const featureCards = page.locator('[class*="crypto-card"], .crypto-card');
      const featureCardsCount = await featureCards.count();
      expect(featureCardsCount).toBeGreaterThan(0);
      
      // Navigate to dashboard
      await dashboardLink.click();
      await expect(page).toHaveURL('/dashboard');
      
      // Mock API to avoid rate limiting
      await page.route('/api/**', async (route) => {
        const mockData = {
          success: true,
          data: [],
          global: {
            total_market_cap_usd: 2100000000000,
            total_market_cap_change_24h: 1.5,
            total_volume_usd: 85000000000
          },
          timestamp: new Date().toISOString()
        };
        await route.fulfill({ json: mockData });
      });
      
      await page.reload();
      
      // Check dashboard responsiveness
      await expect(page.getByText('Market Overview')).toBeVisible();
      
      if (width < 768) {
        // Mobile: Check that sidebar can be collapsed
        const sidebarToggle = page.locator('button').filter({ hasText: /Menu|X/ });
        if (await sidebarToggle.isVisible()) {
          await sidebarToggle.click();
        }
      }
    });
  });

  test('should handle orientation changes', async ({ page, browserName }) => {
    // Skip for non-mobile browsers
    test.skip(browserName !== 'chromium', 'Orientation test only for Chromium');
    
    await page.setViewportSize({ width: 375, height: 667 });
    // Mock API first
    await page.route('/api/**', async (route) => {
      await route.fulfill({ json: { success: true, data: [], timestamp: new Date().toISOString() } });
    });
    
    await page.goto('/dashboard');
    
    await expect(page.getByText('Market Overview')).toBeVisible();
    
    // Simulate landscape orientation
    await page.setViewportSize({ width: 667, height: 375 });
    await expect(page.getByText('Market Overview')).toBeVisible();
  });

  test('should maintain functionality across all screen sizes', async ({ page }) => {
    const testViewports = [
      { width: 375, height: 667 }, // Mobile
      { width: 768, height: 1024 }, // Tablet
      { width: 1920, height: 1080 } // Desktop
    ];

    for (const viewport of testViewports) {
      await page.setViewportSize(viewport);
      await page.goto('/');
      
      // Test navigation works - be more specific with selector
      const dashboardLink = page.getByRole('link', { name: /Dashboard|Open Dashboard/ });
      await dashboardLink.click();
      await expect(page).toHaveURL('/dashboard');
      
      // Mock API for consistent testing
      await page.route('/api/**', async (route) => {
        await route.fulfill({ 
          json: { 
            success: true, 
            data: [
              {
                id: 'bitcoin',
                name: 'Bitcoin',
                symbol: 'btc',
                current_price: 45000,
                price_change_24h: 1234.56,
                price_change_percentage_24h: 2.82,
                market_cap: 850000000000,
                total_volume: 25000000000,
                image: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png'
              }
            ],
            global: {
              total_market_cap_usd: 2100000000000,
              total_market_cap_change_24h: 1.5,
              total_volume_usd: 85000000000
            },
            timestamp: new Date().toISOString() 
          } 
        });
      });
      
      await page.reload();
      
      // Test dashboard functionality
      await expect(page.getByText('Market Overview')).toBeVisible();
      
      // Test navigation between views
      await page.click('text=Analysis');
      await expect(page.getByText('Technical Analysis')).toBeVisible();
      
      // Go back to home
      await page.goto('/');
      await expect(page.getByText('Advanced Crypto')).toBeVisible();
    }
  });
}); 