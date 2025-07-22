import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load home page successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Crypto Analysis Tool/);
    await expect(page.getByText('Advanced Crypto Analysis Platform')).toBeVisible();
  });

  test('should have working navigation to dashboard', async ({ page }) => {
    // Use more flexible selector that works on both mobile and desktop
    const dashboardLink = page.getByRole('link').filter({ has: page.getByText('Dashboard') });
    await dashboardLink.click();
    await expect(page).toHaveURL('/dashboard');
  });

  test('should display all feature cards', async ({ page }) => {
    // Use role-based selectors to be more specific
    await expect(page.getByRole('heading', { name: 'RSI + MACD Analysis' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Market Dominance' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Real-time Updates' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Secure & Reliable' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Interactive Charts' })).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check mobile navigation
    await expect(page.getByRole('navigation').getByText('Crypto Analysis Tool')).toBeVisible();
    
    // Check hero section stacking
    await expect(page.getByText('Advanced Crypto')).toBeVisible();
    await expect(page.getByText('Analysis Platform')).toBeVisible();
    
    // Check feature cards are properly stacked
    const featureCards = page.locator('[class*="crypto-card"]');
    await expect(featureCards).toHaveCount(6);
  });

  test('should be responsive on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    
    // Check tablet layout
    await expect(page.getByText('Professional Trading Tools')).toBeVisible();
    
    // Verify grid layout works on tablet
    const featureGrid = page.locator('div.grid');
    await expect(featureGrid).toBeVisible();
  });

  test('should handle CTA buttons correctly', async ({ page }) => {
    // Test main CTA
    const mainCTA = page.getByRole('link', { name: 'Start Analysis' });
    await expect(mainCTA).toBeVisible();
    await expect(mainCTA).toHaveAttribute('href', '/dashboard');

    // Test secondary CTA
    await expect(page.getByText('View Features')).toBeVisible();
  });

  test('should have accessible navigation', async ({ page }) => {
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    
    // Check that we can navigate with keyboard
    const dashboardLink = page.getByRole('link').filter({ has: page.getByText('Dashboard') });
    await expect(dashboardLink).toBeVisible();
  });
}); 