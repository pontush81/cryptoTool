// Professional API request throttling for CoinGecko rate limits
// Based on industry best practices for crypto chart applications

interface QueuedRequest {
  url: string
  resolve: (data: any) => void
  reject: (error: any) => void
  timestamp: number
}

class APIThrottle {
  private queue: QueuedRequest[] = []
  private isProcessing = false
  private lastRequestTime = 0
  private readonly MIN_INTERVAL = 2100 // 2.1 seconds between requests (safe for 30/min limit)
  private cache = new Map<string, { data: any; timestamp: number }>()
  private readonly CACHE_TTL = 5 * 60 * 1000 // 5 minutes cache

  // Add request to throttled queue
  async request(url: string): Promise<any> {
    // Check cache first
    const cacheKey = url
    const cached = this.cache.get(cacheKey)
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      console.log(`🎯 Cache hit for: ${url}`)
      return cached.data
    }

    return new Promise((resolve, reject) => {
      this.queue.push({
        url,
        resolve,
        reject,
        timestamp: Date.now()
      })

      this.processQueue()
    })
  }

  private async processQueue() {
    if (this.isProcessing || this.queue.length === 0) {
      return
    }

    this.isProcessing = true

    while (this.queue.length > 0) {
      const request = this.queue.shift()!
      
      // Enforce minimum interval between requests
      const timeSinceLastRequest = Date.now() - this.lastRequestTime
      const waitTime = Math.max(0, this.MIN_INTERVAL - timeSinceLastRequest)
      
      if (waitTime > 0) {
        console.log(`⏳ Throttling: waiting ${waitTime}ms for rate limit...`)
        await this.sleep(waitTime)
      }

      try {
        console.log(`📡 Throttled request: ${request.url}`)
        this.lastRequestTime = Date.now()
        
        const response = await fetch(request.url, {
          signal: AbortSignal.timeout(15000) // 15 second timeout
        })

        if (response.status === 429) {
          // Rate limited - wait longer and retry
          console.log('🔄 Rate limited (429) - waiting 60s before retry...')
          await this.sleep(60000) // Wait 60 seconds
          this.queue.unshift(request) // Put back at front of queue
          continue
        }

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }

        const data = await response.json()
        
        // Cache successful response
        this.cache.set(request.url, {
          data,
          timestamp: Date.now()
        })

        request.resolve(data)

      } catch (error) {
        console.error(`❌ Throttled request failed: ${request.url}`, error)
        request.reject(error)
      }
    }

    this.isProcessing = false
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  // Clear old cache entries
  clearExpiredCache() {
    const now = Date.now()
    for (const [key, value] of this.cache.entries()) {
      if (now - value.timestamp > this.CACHE_TTL) {
        this.cache.delete(key)
      }
    }
  }

  // Get cache stats for debugging
  getCacheStats() {
    return {
      size: this.cache.size,
      queueLength: this.queue.length,
      isProcessing: this.isProcessing
    }
  }
}

// Global throttle instance
export const apiThrottle = new APIThrottle()

// Clean up cache every 10 minutes
setInterval(() => {
  apiThrottle.clearExpiredCache()
}, 10 * 60 * 1000) 