import { RATE_LIMIT_WINDOW, RATE_LIMIT_MAX_REQUESTS } from '../constants.js'

/**
 * Simple rate limiter using sliding window
 */
class RateLimiter {
  constructor(windowMs = RATE_LIMIT_WINDOW, maxRequests = RATE_LIMIT_MAX_REQUESTS) {
    this.windowMs = windowMs
    this.maxRequests = maxRequests
    this.requests = new Map() // userId -> array of timestamps
  }

  /**
   * Checks if a user is rate limited
   * @param {string} userId - Discord user ID
   * @returns {boolean} True if rate limited, false otherwise
   */
  isRateLimited(userId) {
    const now = Date.now()
    const userRequests = this.requests.get(userId) || []

    // Remove requests outside the time window
    const validRequests = userRequests.filter(timestamp => now - timestamp < this.windowMs)

    // Check if user has exceeded max requests
    if (validRequests.length >= this.maxRequests) {
      this.requests.set(userId, validRequests)
      return true
    }

    // Add current request
    validRequests.push(now)
    this.requests.set(userId, validRequests)

    // Clean up old entries periodically
    if (Math.random() < 0.01) { // 1% chance on each call
      this.cleanup()
    }

    return false
  }

  /**
   * Gets the time until rate limit resets for a user
   * @param {string} userId - Discord user ID
   * @returns {number} Milliseconds until reset
   */
  getTimeUntilReset(userId) {
    const userRequests = this.requests.get(userId)
    if (!userRequests || userRequests.length === 0) return 0

    const oldestRequest = userRequests[0]
    const resetTime = oldestRequest + this.windowMs
    return Math.max(0, resetTime - Date.now())
  }

  /**
   * Resets rate limit for a user
   * @param {string} userId - Discord user ID
   */
  reset(userId) {
    this.requests.delete(userId)
  }

  /**
   * Cleans up expired entries
   */
  cleanup() {
    const now = Date.now()
    for (const [userId, timestamps] of this.requests.entries()) {
      const validRequests = timestamps.filter(ts => now - ts < this.windowMs)
      if (validRequests.length === 0) {
        this.requests.delete(userId)
      } else {
        this.requests.set(userId, validRequests)
      }
    }
  }
}

// Global rate limiter instance
export const globalRateLimiter = new RateLimiter()

export default RateLimiter
