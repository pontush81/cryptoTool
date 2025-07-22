import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Mock API responses to avoid rate limiting during tests
    await page.route('/api/crypto', async (route) => {
      const mockData = {
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
          },
          {
            id: 'ethereum',
            name: 'Ethereum',
            symbol: 'eth',
            current_price: 3200,
            price_change_24h: -45.67,
            price_change_percentage_24h: -1.41,
            market_cap: 380000000000,
            total_volume: 15000000000,
            image: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png'
          }
        ],
        global: {
          total_market_cap_usd: 2100000000000,
          total_market_cap_change_24h: 1.5,
          total_volume_usd: 85000000000
        },
        timestamp: new Date().toISOString()
      };
      await route.fulfill({ json: mockData });
    });

    await page.route('/api/dominance', async (route) => {
      const mockDominance = {
        success: true,
        data: {
          bitcoin_dominance: 42.5,
          ethereum_dominance: 18.2
        },
        timestamp: new Date().toISOString()
      };
      await route.fulfill({ json: mockDominance });
    });

    await page.route('/api/m2-liquidity', async (route) => {
      const mockM2 = {
        success: true,
        data: {
          current_m2: 131300000000000,
          bitcoin_price: 45000,
          correlation: 0.346,
          impact: 'neutral'
        },
        timestamp: new Date().toISOString()
      };
      await route.fulfill({ json: mockM2 });
    });

    await page.goto('/dashboard');
  });

  test('should load dashboard with all components', async ({ page }) => {
    await expect(page.getByText('Market Overview')).toBeVisible();
    await expect(page.getByText('CryptoTool')).toBeVisible();
    
    // Wait for data to load
    await expect(page.getByText('Bitcoin')).toBeVisible();
    await expect(page.getByText('Ethereum')).toBeVisible();
  });

  test('should handle sidebar navigation', async ({ page }) => {
    // Test sidebar toggle
    const menuButton = page.locator('button').filter({ hasText: /Menu|X/ });
    await menuButton.click();
    
    // Test navigation between views
    await page.click('text=Analysis');
    await expect(page.getByText('Analysis')).toBeVisible();
    
    await page.click('text=Market Overview');
    await expect(page.getByText('Market Overview')).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check mobile sidebar behavior
    const sidebar = page.locator('div').filter({ hasText: 'CryptoTool' }).first();
    await expect(sidebar).toBeVisible();
    
    // Check content scrolling
    await expect(page.getByText('Market Overview')).toBeVisible();
    
    // Test mobile navigation
    const menuButton = page.locator('button').filter({ hasText: /Menu|X/ });
    await menuButton.click();
    
    // Check that content is not hidden on mobile
    await expect(page.getByText('Total Market Cap')).toBeVisible();
  });

  test('should handle data refresh', async ({ page }) => {
    // Wait for initial load
    await expect(page.getByText('Bitcoin')).toBeVisible();
    
    // Test refresh button
    const refreshButton = page.getByRole('button', { name: /Refresh/ });
    await refreshButton.click();
    
    // Should show loading state
    await expect(refreshButton).toBeDisabled();
  });

  test('should switch between analysis modes', async ({ page }) => {
    // Navigate to analysis
    await page.click('text=Analysis');
    
    // Check technical analysis is default
    await expect(page.getByText('Technical Analysis')).toBeVisible();
    
    // Switch to advanced analysis
    await page.click('text=Advanced Analysis');
    await expect(page.getByText('Professional signals')).toBeVisible();
  });

  test('should handle crypto selection in analysis mode', async ({ page }) => {
    // Navigate to analysis
    await page.click('text=Analysis');
    
    // Wait for crypto selector to appear
    await expect(page.getByText('Select Cryptocurrency')).toBeVisible();
    
    // Test crypto selection (this will depend on the actual selector implementation)
    const cryptoSelector = page.locator('select, [role="combobox"]').first();
    if (await cryptoSelector.isVisible()) {
      await cryptoSelector.click();
    }
  });

  test('should display global stats correctly', async ({ page }) => {
    // Check global market stats are displayed
    await expect(page.getByText('Total Market Cap')).toBeVisible();
    await expect(page.getByText('24h Volume')).toBeVisible();
    await expect(page.getByText('Market Trend')).toBeVisible();
    
    // Check values are displayed (from mock data)
    await expect(page.getByText('$2.10T')).toBeVisible();
    await expect(page.getByText('$85.0B')).toBeVisible();
  });

  test('should handle error states gracefully', async ({ page }) => {
    // Test with API error
    await page.route('/api/crypto', async (route) => {
      await route.fulfill({ status: 429, json: { error: 'Rate limit exceeded' } });
    });
    
    await page.reload();
    
    // Should show error message
    await expect(page.getByText('Error')).toBeVisible();
    await expect(page.getByText('Try Again')).toBeVisible();
  });

  test('should be keyboard accessible', async ({ page }) => {
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    
    // Should be able to navigate with keyboard
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });
}); 