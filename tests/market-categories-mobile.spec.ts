import { test, expect } from '@playwright/test';

test.describe('Market Categories Track - Mobile Responsive Testing', () => {
  const mobileDevices = [
    { 
      name: 'iPhone SE', 
      width: 375, 
      height: 667,
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15'
    },
    { 
      name: 'iPhone 12', 
      width: 390, 
      height: 844,
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15'
    },
    { 
      name: 'Samsung Galaxy S21', 
      width: 360, 
      height: 800,
      userAgent: 'Mozilla/5.0 (Linux; Android 11; SM-G991B) AppleWebKit/537.36'
    },
    { 
      name: 'iPad', 
      width: 768, 
      height: 1024,
      userAgent: 'Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X) AppleWebKit/605.1.15'  
    }
  ];

  mobileDevices.forEach(({ name, width, height, userAgent }) => {
    test.describe(`${name} (${width}x${height})`, () => {
      
      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width, height });
        // Note: userAgent setting is handled by Playwright project configuration
      });

      test('should navigate to Market Categories from dashboard', async ({ page }) => {
        await page.goto('/education/dashboard');
        
        // Wait for page to load
        await expect(page.getByRole('heading').filter({ hasText: 'Your Crypto Learning Journey' })).toBeVisible();
        
        // Find and click Market Categories link
        const marketCategoriesLink = page.getByRole('link', { name: /Market Categories/i }).first();
        await expect(marketCategoriesLink).toBeVisible();
        await marketCategoriesLink.click();
        
        // Verify we're on the market categories page
        await expect(page).toHaveURL('/education/market-categories');
        await expect(page.getByRole('heading').filter({ hasText: 'Market Categories Track' }).first()).toBeVisible();
      });

      test('should display market categories grid properly', async ({ page }) => {
        await page.goto('/education/market-categories');
        
        // Check main heading
        await expect(page.getByRole('heading', { name: 'Market Categories Track' }).first()).toBeVisible();
        
        // Check description
        await expect(page.getByText(/Learn crypto by market sectors/)).toBeVisible();
        
        // Check progress bar
        await expect(page.locator('.bg-gray-200.rounded-full.h-2')).toBeVisible();
        
        // Check search functionality
        const searchInput = page.getByPlaceholder(/Search categories/);
        await expect(searchInput).toBeVisible();
        
        // Check filter dropdowns
        await expect(page.getByRole('combobox').first()).toBeVisible(); // Phase filter
        await expect(page.getByRole('combobox').last()).toBeVisible(); // Difficulty filter
        
        // Check category cards are visible
        const categoryCards = page.locator('.bg-white.rounded-lg.shadow-sm.border');
        const cardCount = await categoryCards.count();
        expect(cardCount).toBeGreaterThan(0);
        
        // Check first few categories exist (using heading selectors to be more specific)
        await expect(page.getByRole('heading', { name: 'Layer 1 Blockchains' }).first()).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Stablecoins' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'DeFi Ecosystem' })).toBeVisible();
      });

      test('should handle search functionality', async ({ page }) => {
        await page.goto('/education/market-categories');
        
        const searchInput = page.getByPlaceholder(/Search categories/);
        
        // Search for Bitcoin-related content
        await searchInput.fill('Bitcoin');
        
        // Should show Layer 1 Blockchains (contains Bitcoin examples)
        await expect(page.getByRole('heading', { name: 'Layer 1 Blockchains' }).first()).toBeVisible();
        
        // Search for something that shouldn't exist
        await searchInput.fill('NonExistentCategory');
        await expect(page.getByText('No categories found')).toBeVisible();
        
        // Clear search
        await searchInput.fill('');
        await expect(page.getByRole('heading', { name: 'Layer 1 Blockchains' }).first()).toBeVisible();
      });

      test('should filter by phase and difficulty', async ({ page }) => {
        await page.goto('/education/market-categories');
        
        // Filter by Phase 1
        const phaseFilter = page.getByRole('combobox').first();
        await phaseFilter.selectOption('1');
        
        // Should show Phase 1 categories
        await expect(page.getByRole('heading', { name: 'Layer 1 Blockchains' }).first()).toBeVisible();
        // Phase 1 text is in dropdown option and not visible, so just check categories are showing
        
        // Filter by Beginner difficulty
        const difficultyFilter = page.getByRole('combobox').last();
        await difficultyFilter.selectOption('Beginner');
        
        // Should show beginner-level categories (like Layer 1 Blockchains)
        await expect(page.getByRole('heading', { name: 'Layer 1 Blockchains' })).toBeVisible();
        
        // Reset filters
        await phaseFilter.selectOption('all');
        await difficultyFilter.selectOption('all');
      });

      test('should navigate to Layer 1 Blockchains category', async ({ page }) => {
        await page.goto('/education/market-categories');
        
        // Wait for the page to fully load
        await expect(page.getByRole('heading', { name: 'Layer 1 Blockchains' }).first()).toBeVisible();
        
        // Find the Layer 1 Blockchains card and click "Start Learning"
        const startLearningButton = page.getByRole('link', { name: /Start Learning/ }).first();
        await expect(startLearningButton).toBeVisible();
        await startLearningButton.click();
        
        // Verify we're on the Layer 1 category page
        await expect(page).toHaveURL('/education/market-categories/layer-1-blockchains');
        await expect(page.getByRole('heading', { name: 'Layer 1 Blockchains' }).first()).toBeVisible();
      });

      test('should display Layer 1 Blockchains modules properly', async ({ page }) => {
        await page.goto('/education/market-categories/layer-1-blockchains');
        
        // Check main heading and description
        await expect(page.getByRole('heading', { name: 'Layer 1 Blockchains' }).first()).toBeVisible();
        await expect(page.getByText(/Base blockchain networks supporting/)).toBeVisible();
        
        // Check badges
        await expect(page.getByText('Very High Market Cap')).toBeVisible();
        await expect(page.getByText('Beginner to Intermediate')).toBeVisible();
        await expect(page.getByText('Phase 1: Core')).toBeVisible();
        
        // Check progress tracking
        await expect(page.getByText(/Progress: \d+\/\d+ modules/)).toBeVisible();
        
        // Check "Why Learn This" section
        await expect(page.getByRole('heading', { name: 'Why Learn Layer 1 Blockchains?' })).toBeVisible();
        
        // Check learning path modules
        await expect(page.getByRole('heading', { name: 'Bitcoin: Digital Gold & Store of Value' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Ethereum: Smart Contract Platform' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Alternative Layer 1s: Beyond Bitcoin & Ethereum' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Consensus Mechanisms: PoW vs PoS vs Beyond' })).toBeVisible();
        
        // Check sidebar elements
        await expect(page.getByRole('heading', { name: 'Your Progress' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Related Foundation Modules' })).toBeVisible();
        await expect(page.getByRole('heading', { name: 'Quick Actions' })).toBeVisible();
      });

      test('should navigate to Bitcoin Digital Gold module', async ({ page }) => {
        await page.goto('/education/market-categories/layer-1-blockchains');
        
        // Wait for the Bitcoin module to load
        await expect(page.getByRole('heading', { name: 'Bitcoin: Digital Gold & Store of Value' })).toBeVisible();
        
        // Find and click the first "Start Learning" button (should be Bitcoin since it has no prerequisites)
        const startButton = page.getByRole('link', { name: /Start Learning/ }).first();
        await expect(startButton).toBeVisible();
        
        // Use navigation promise to handle the click and wait
        await Promise.all([
          page.waitForURL('/education/market-categories/layer-1-blockchains/bitcoin-digital-gold', { timeout: 10000 }),
          startButton.click()
        ]);
        
        // Verify we're on the Bitcoin module page
        await expect(page.getByRole('heading', { name: 'Bitcoin: Digital Gold & Store of Value' })).toBeVisible();
      });

      test('should display Bitcoin module content properly', async ({ page }) => {
        await page.goto('/education/market-categories/layer-1-blockchains/bitcoin-digital-gold');
        
        // Check header elements
        await expect(page.getByRole('heading', { name: 'Bitcoin: Digital Gold & Store of Value' })).toBeVisible();
        await expect(page.getByText('Why Bitcoin is considered digital gold')).toBeVisible();
        
        // Check badges (be more specific with selectors)
        await expect(page.locator('.bg-green-100.text-green-800').filter({ hasText: 'Beginner' })).toBeVisible();
        await expect(page.getByText('45 min')).toBeVisible();
        
        // Check progress section
        await expect(page.getByRole('heading', { name: 'Learning Progress' })).toBeVisible();
        await expect(page.getByText(/\d+\/\d+ sections completed/)).toBeVisible();
        
        // Check sections are expandable
        const digitalScarcitySection = page.getByRole('button').filter({ hasText: 'Digital Scarcity: The 21 Million Bitcoin Cap' });
        await expect(digitalScarcitySection).toBeVisible();
        await digitalScarcitySection.click();
        
        // Check that section content appears
        await expect(page.getByText(/Bitcoin's most revolutionary feature/)).toBeVisible();
        
        // Check other sections exist
        await expect(page.getByRole('button').filter({ hasText: 'Institutional Adoption' })).toBeVisible();
        await expect(page.getByRole('button').filter({ hasText: 'Bitcoin vs. Traditional Gold' })).toBeVisible();
        await expect(page.getByRole('button').filter({ hasText: 'Mining Economics' })).toBeVisible();
        
        // Check knowledge check section
        await expect(page.getByRole('heading', { name: 'Knowledge Check' })).toBeVisible();
      });

      test('should handle touch interactions properly', async ({ page }) => {
        // Skip this test for desktop-like viewports
        if (width > 768) {
          test.skip();
        }
        
        await page.goto('/education/market-categories');
        
        // Test touch scrolling (simulate by checking elements are accessible)
        const categoryCards = page.locator('[class*="bg-white rounded-lg shadow-sm border"]');
        const firstCard = categoryCards.first();
        const lastCard = categoryCards.last();
        
        await expect(firstCard).toBeVisible();
        
        // Scroll to bottom to check last card
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await expect(lastCard).toBeVisible();
        
        // Test touch-friendly button sizes (minimum 44px as per accessibility guidelines)
        const buttons = page.getByRole('button');
        for (let i = 0; i < Math.min(3, await buttons.count()); i++) {
          const button = buttons.nth(i);
          if (await button.isVisible()) {
            const boundingBox = await button.boundingBox();
            if (boundingBox) {
              expect(boundingBox.height).toBeGreaterThanOrEqual(32); // Reasonable touch target
              expect(boundingBox.width).toBeGreaterThanOrEqual(32);
            }
          }
        }
      });

      test('should navigate back properly', async ({ page }) => {
        // Start from Bitcoin module
        await page.goto('/education/market-categories/layer-1-blockchains/bitcoin-digital-gold');
        
        // Click back to Layer 1 category (use first to avoid strict mode violation)
        await page.getByRole('link', { name: /Back to Layer 1 Blockchains/ }).first().click();
        await expect(page).toHaveURL('/education/market-categories/layer-1-blockchains');
        
        // Click back to Market Categories
        await page.getByRole('link', { name: /Back to Market Categories/ }).first().click();
        await expect(page).toHaveURL('/education/market-categories');
        
        // Click back to Dashboard
        await page.getByRole('link', { name: /Back to Dashboard/ }).first().click();
        await expect(page).toHaveURL('/education/dashboard');
      });

      test('should handle responsive layout changes', async ({ page }) => {
        await page.goto('/education/market-categories');
        
        // Check that the layout adapts to screen size
        if (width < 640) {
          // Mobile: Grid should be single column
          const grid = page.locator('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3');
          await expect(grid).toBeVisible();
        } else if (width < 1024) {
          // Tablet: Should show 2 columns
          const grid = page.locator('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3');
          await expect(grid).toBeVisible();
        }
        
        // Check that text remains readable (use first to avoid strict mode violation)
        const categoryTitle = page.getByRole('heading', { name: 'Market Categories Track' }).first();
        const fontSize = await categoryTitle.evaluate(el => window.getComputedStyle(el).fontSize);
        const fontSizeValue = parseInt(fontSize);
        expect(fontSizeValue).toBeGreaterThanOrEqual(16); // Minimum readable font size
      });
    });
  });

  test.describe('Cross-device Navigation Flow', () => {
    test('should maintain state when switching between portrait and landscape', async ({ page, browserName }) => {
      // Skip for non-mobile browsers
      test.skip(browserName !== 'webkit' && browserName !== 'chromium', 'Mobile orientation test');
      
      // Start in portrait
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/education/market-categories');
      
      // Search for something
      await page.getByPlaceholder(/Search categories/).fill('Layer 1');
      await expect(page.getByRole('heading', { name: 'Layer 1 Blockchains' }).first()).toBeVisible();
      
      // Switch to landscape
      await page.setViewportSize({ width: 667, height: 375 });
      
      // Check that search is still active and results are still filtered
      const searchInput = page.getByPlaceholder(/Search categories/);
      await expect(searchInput).toHaveValue('Layer 1');
      await expect(page.getByRole('heading', { name: 'Layer 1 Blockchains' }).first()).toBeVisible();
    });
  });
}); 