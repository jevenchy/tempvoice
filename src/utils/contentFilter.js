/**
 * Simple content filter for channel names
 * Can be extended with more sophisticated filtering if needed
 */

// Basic blacklist (can be moved to config or database)
const BLACKLIST_PATTERNS = [
  /n[i1!]gg[ea@]r/i,
  /f[u\*]ck/i,
  /sh[i1!]t/i,
  /b[i1!]tch/i,
  /ass+hole/i,
  /discord\.gg/i, // No invite links
  /https?:\/\//i, // No URLs
  /<@[!&]?\d+>/i, // No mentions
  /@everyone/i,
  /@here/i
]

/**
 * Checks if a channel name contains inappropriate content
 * @param {string} name - Channel name to check
 * @returns {boolean} True if name is inappropriate, false otherwise
 */
export function isInappropriateName(name) {
  if (!name || typeof name !== 'string') return true

  // Check length
  if (name.trim().length === 0 || name.length > 100) return true

  // Check blacklist patterns
  for (const pattern of BLACKLIST_PATTERNS) {
    if (pattern.test(name)) return true
  }

  // Check for excessive special characters (potential spam)
  const specialCharCount = (name.match(/[^a-zA-Z0-9\s\-_]/g) || []).length
  if (specialCharCount > name.length * 0.5) return true

  // Check for excessive caps (more than 80%)
  const upperCount = (name.match(/[A-Z]/g) || []).length
  const letterCount = (name.match(/[a-zA-Z]/g) || []).length
  if (letterCount > 0 && upperCount / letterCount > 0.8 && name.length > 5) return true

  return false
}

/**
 * Sanitizes a channel name by removing/replacing inappropriate content
 * @param {string} name - Channel name to sanitize
 * @returns {string} Sanitized channel name
 */
export function sanitizeChannelName(name) {
  if (!name || typeof name !== 'string') return 'Unnamed Channel'

  // Trim whitespace
  let sanitized = name.trim()

  // Remove URLs
  sanitized = sanitized.replace(/https?:\/\/[^\s]+/gi, '')

  // Remove Discord invites
  sanitized = sanitized.replace(/discord\.gg\/[^\s]+/gi, '')

  // Remove mentions
  sanitized = sanitized.replace(/<@[!&]?\d+>/g, '')
  sanitized = sanitized.replace(/@(everyone|here)/gi, '')

  // Remove excessive special characters
  sanitized = sanitized.replace(/[^a-zA-Z0-9\s\-_äöüÄÖÜß]/g, '')

  // Collapse multiple spaces
  sanitized = sanitized.replace(/\s+/g, ' ')

  // Trim again and check length
  sanitized = sanitized.trim()
  if (sanitized.length === 0) return 'Unnamed Channel'
  if (sanitized.length > 100) sanitized = sanitized.substring(0, 100)

  return sanitized
}

/**
 * Gets a safe channel name, either the original or a sanitized version
 * @param {string} name - Proposed channel name
 * @returns {object} { safe: boolean, name: string }
 */
export function getSafeChannelName(name) {
  if (isInappropriateName(name)) {
    return {
      safe: false,
      name: sanitizeChannelName(name)
    }
  }

  return {
    safe: true,
    name: name.trim()
  }
}
