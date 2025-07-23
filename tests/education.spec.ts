import { test, expect } from '@playwright/test'

test.describe('Education Section', () => {
  test('should load education hub page', async ({ page }) => {
    await page.goto('/education')
    
    // Check main heading
    await expect(page.getByRole('heading', { name: 'Education' })).toBeVisible()
    
    // Check for learning modules
    await expect(page.getByText('Bitcoin Basics')).toBeVisible()
    await expect(page.getByText('How Blockchain Works')).toBeVisible()
    await expect(page.getByText('Getting Started')).toBeVisible()
    await expect(page.getByText('Security & Risks')).toBeVisible()
    await expect(page.getByText('Advanced Concepts')).toBeVisible()
    
    // Check learning path overview
    await expect(page.getByText('Learning Path Overview')).toBeVisible()
    await expect(page.getByText('Fundamentals')).toBeVisible()
    await expect(page.getByText('Practical Skills')).toBeVisible()
    await expect(page.getByText('Advanced Topics')).toBeVisible()
  })

  test('should filter modules by difficulty level', async ({ page }) => {
    await page.goto('/education')
    
    // Click on Beginner filter
    await page.getByRole('button', { name: 'Beginner' }).click()
    
    // Should show only beginner modules
    await expect(page.getByText('Bitcoin Basics')).toBeVisible()
    await expect(page.getByText('Getting Started')).toBeVisible()
    
    // Should not show intermediate/advanced modules in learning modules section
    await expect(page.locator('.bg-white.rounded-lg.shadow-sm').filter({ hasText: 'How Blockchain Works' })).not.toBeVisible()
  })



  test('should navigate to Bitcoin Basics', async ({ page }) => {
    await page.goto('/education')
    
    // Click on Bitcoin Basics module
    await page.getByRole('link', { name: /Bitcoin Basics/ }).first().click()
    
    // Check we're on the right page
    await expect(page.getByRole('heading', { name: 'Bitcoin Basics' })).toBeVisible()
    await expect(page.getByText('Understanding the fundamentals of Bitcoin')).toBeVisible()
    
    // Check course overview card
    await expect(page.getByText('Course Overview')).toBeVisible()
    await expect(page.getByText('15 min read')).toBeVisible()
    await expect(page.getByText('Beginner Level')).toBeVisible()
    
    // Check sections are present
    await expect(page.getByText('What is Bitcoin?')).toBeVisible()
    await expect(page.getByText('The History of Bitcoin')).toBeVisible()
    await expect(page.getByText('Understanding Decentralization')).toBeVisible()
    await expect(page.getByText('Digital Money vs Physical Money')).toBeVisible()
  })

  test('should navigate to How Blockchain Works', async ({ page }) => {
    await page.goto('/education/how-it-works')
    
    // Check main content
    await expect(page.getByRole('heading', { name: 'How Blockchain Works' })).toBeVisible()
    await expect(page.getByText('Deep dive into blockchain technology and mining')).toBeVisible()
    
    // Check course overview
    await expect(page.getByText('Course Overview')).toBeVisible()
    await expect(page.getByText('25 min read')).toBeVisible()
    await expect(page.getByText('Intermediate Level')).toBeVisible()
    
    // Check sections
    await expect(page.getByText('Blockchain Structure')).toBeVisible()
    await expect(page.getByText('Mining and Validation')).toBeVisible()
    await expect(page.getByText('Consensus Mechanisms')).toBeVisible()
    await expect(page.getByText('How Transactions Work')).toBeVisible()
  })

  test('should allow marking sections as completed', async ({ page }) => {
    await page.goto('/education/bitcoin-basics')
    
    // Find the first "Mark Complete" button and click it
    await page.getByRole('button', { name: /Mark Complete/ }).first().click()
    
    // Check that it changes to "Completed"
    await expect(page.getByRole('button', { name: /Completed/ }).first()).toBeVisible()
    
    // Progress should update
    await expect(page.getByText('1/4 completed')).toBeVisible()
  })

  test('should navigate back from education pages', async ({ page }) => {
    await page.goto('/education/bitcoin-basics')
    
    // Click back to education hub
    await page.getByRole('link', { name: /Back to Education Hub/ }).click()
    
    // Should be back on main education page
    await expect(page.getByRole('heading', { name: 'Education' })).toBeVisible()
  })

  test('should show correct progress indicators', async ({ page }) => {
    await page.goto('/education/bitcoin-basics')
    
    // Check initial progress is 0
    await expect(page.getByText('0/4 completed')).toBeVisible()
    
    // Progress bar should be at 0%
    const progressBar = page.locator('.bg-green-600')
    await expect(progressBar).toHaveCSS('width', '0px')
  })

  test('should display educational content correctly', async ({ page }) => {
    await page.goto('/education/bitcoin-basics')
    
    // Check key educational content is present
    await expect(page.getByText('Bitcoin is the world\'s first successful digital currency')).toBeVisible()
    await expect(page.getByText('Satoshi Nakamoto')).toBeVisible()
    await expect(page.getByText('Bitcoin Pizza Day')).toBeVisible()
    await expect(page.getByText('21 million coins')).toBeVisible()
  })

  test('should have consistent card design', async ({ page }) => {
    await page.goto('/education')
    
    // Check that cards use the new design system
    const cards = page.locator('.bg-white.rounded-lg.shadow-sm.border.border-gray-200')
    await expect(cards.first()).toBeVisible()
    
    // Check learning path overview cards
    const overviewCards = page.locator('.bg-green-50.border.border-green-100, .bg-yellow-50.border.border-yellow-100, .bg-purple-50.border.border-purple-100')
    await expect(overviewCards.first()).toBeVisible()
  })

  test('should display next steps correctly', async ({ page }) => {
    await page.goto('/education/bitcoin-basics')
    
    // Check next steps section
    await expect(page.getByText('Ready for the Next Step?')).toBeVisible()
    await expect(page.getByRole('link', { name: /Learn How Blockchain Works/ })).toBeVisible()
  })
}) 