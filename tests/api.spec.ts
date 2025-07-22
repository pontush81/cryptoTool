import { test, expect } from '@playwright/test';

test.describe('API Endpoints', () => {
  test.beforeEach(async ({ page }) => {
    // Set up a page context for API tests
    await page.goto('/');
  });

  test('should handle /api/crypto endpoint', async ({ page }) => {
    // Test direct API call
    const response = await page.request.get('/api/crypto');
    
    // Should return valid JSON response
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    
    // Check response structure
    expect(data).toHaveProperty('success');
    expect(data).toHaveProperty('timestamp');
    
    if (data.success) {
      expect(data).toHaveProperty('data');
      expect(Array.isArray(data.data)).toBeTruthy();
      
      // Check that crypto data has expected properties
      if (data.data.length > 0) {
        const crypto = data.data[0];
        expect(crypto).toHaveProperty('id');
        expect(crypto).toHaveProperty('name');
        expect(crypto).toHaveProperty('symbol');
        expect(crypto).toHaveProperty('current_price');
        expect(crypto).toHaveProperty('price_change_24h');
        expect(crypto).toHaveProperty('price_change_percentage_24h');
        expect(crypto).toHaveProperty('market_cap');
        expect(crypto).toHaveProperty('total_volume');
        expect(crypto).toHaveProperty('image');
      }
    }
  });

  test('should handle /api/dominance endpoint', async ({ page }) => {
    const response = await page.request.get('/api/dominance');
    
    // Should return valid JSON response
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    
    // Check response structure
    expect(data).toHaveProperty('success');
    expect(data).toHaveProperty('timestamp');
    
    if (data.success) {
      expect(data).toHaveProperty('data');
      expect(data.data).toHaveProperty('bitcoin_dominance');
      expect(data.data).toHaveProperty('ethereum_dominance');
      
      // Check values are reasonable numbers
      expect(typeof data.data.bitcoin_dominance).toBe('number');
      expect(typeof data.data.ethereum_dominance).toBe('number');
      expect(data.data.bitcoin_dominance).toBeGreaterThan(0);
      expect(data.data.bitcoin_dominance).toBeLessThan(100);
    }
  });

  test('should handle /api/m2-liquidity endpoint', async ({ page }) => {
    const response = await page.request.get('/api/m2-liquidity');
    
    // Should return valid JSON response
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    
    // Check response structure
    expect(data).toHaveProperty('success');
    expect(data).toHaveProperty('timestamp');
    
    if (data.success) {
      expect(data).toHaveProperty('data');
      expect(data.data).toHaveProperty('current_m2');
      expect(data.data).toHaveProperty('bitcoin_price');
      expect(data.data).toHaveProperty('correlation');
      expect(data.data).toHaveProperty('impact');
      
      // Check values are reasonable
      expect(typeof data.data.current_m2).toBe('number');
      expect(typeof data.data.bitcoin_price).toBe('number');
      expect(typeof data.data.correlation).toBe('number');
      expect(typeof data.data.impact).toBe('string');
    }
  });

  test('should handle /api/technical-analysis endpoint', async ({ page }) => {
    const response = await page.request.get('/api/technical-analysis?symbol=bitcoin');
    
    // Should return valid JSON response
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    
    // Check response structure
    expect(data).toHaveProperty('success');
    expect(data).toHaveProperty('timestamp');
    
    if (data.success) {
      expect(data).toHaveProperty('data');
      expect(data.data).toHaveProperty('symbol');
      expect(data.data).toHaveProperty('price');
      expect(data.data).toHaveProperty('rsi');
      expect(data.data).toHaveProperty('macd');
      expect(data.data).toHaveProperty('signals');
    }
  });

  test('should handle /api/advanced-analysis endpoint', async ({ page }) => {
    const response = await page.request.get('/api/advanced-analysis?symbol=bitcoin');
    
    // Should return valid JSON response
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    
    // Check response structure
    expect(data).toHaveProperty('success');
    expect(data).toHaveProperty('timestamp');
    
    if (data.success) {
      expect(data).toHaveProperty('data');
      expect(data.data).toHaveProperty('symbol');
      expect(data.data).toHaveProperty('phase3_signals');
    }
  });

  test('should handle rate limiting gracefully', async ({ page }) => {
    // Make multiple rapid requests to test rate limiting behavior
    const promises = [];
    for (let i = 0; i < 5; i++) {
      promises.push(page.request.get('/api/crypto'));
    }
    
    const responses = await Promise.all(promises);
    
    // At least some requests should succeed
    const successCount = responses.filter(r => r.ok()).length;
    expect(successCount).toBeGreaterThan(0);
    
    // Check that error responses are handled properly
    const errorResponses = responses.filter(r => !r.ok());
    for (const errorResponse of errorResponses) {
      const data = await errorResponse.json();
      expect(data).toHaveProperty('error');
      expect(data).toHaveProperty('success');
      expect(data.success).toBe(false);
    }
  });

  test('should handle invalid parameters', async ({ page }) => {
    // Test technical analysis with invalid symbol
    const response = await page.request.get('/api/technical-analysis?symbol=invalid-symbol');
    
    // Should still return a valid JSON response even if data is not found
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    
    expect(data).toHaveProperty('success');
    expect(data).toHaveProperty('timestamp');
    
    // Either success with empty data or explicit error
    if (!data.success) {
      expect(data).toHaveProperty('error');
    }
  });

  test('should have consistent response format across all endpoints', async ({ page }) => {
    const endpoints = [
      '/api/crypto',
      '/api/dominance',
      '/api/m2-liquidity',
      '/api/technical-analysis?symbol=bitcoin',
      '/api/advanced-analysis?symbol=bitcoin'
    ];

    for (const endpoint of endpoints) {
      const response = await page.request.get(endpoint);
      expect(response.ok()).toBeTruthy();
      
      const data = await response.json();
      
      // All endpoints should have these basic properties
      expect(data).toHaveProperty('success');
      expect(data).toHaveProperty('timestamp');
      expect(typeof data.success).toBe('boolean');
      expect(typeof data.timestamp).toBe('string');
      
      // Should be valid ISO date string
      expect(() => new Date(data.timestamp)).not.toThrow();
    }
  });
}); 