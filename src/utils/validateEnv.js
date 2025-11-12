/**
 * Validates required environment variables
 * @throws {Error} If any required environment variable is missing
 */
export function validateEnv() {
  const required = [
    'DISCORD_TOKEN',
    'GUILD_ID',
    'CATEGORY_CHANNEL_ID',
    'EMBED_CHANNEL_ID',
    'VOICE_CHANNEL_ID'
  ]

  const missing = required.filter(key => !process.env[key])

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables:\n  - ${missing.join('\n  - ')}\n\n` +
      'Please check your .env file and ensure all required variables are set.'
    )
  }

  // Validate that IDs are valid snowflakes (numeric strings)
  const ids = [
    'GUILD_ID',
    'CATEGORY_CHANNEL_ID',
    'EMBED_CHANNEL_ID',
    'VOICE_CHANNEL_ID',
    'LOG_CHANNEL_ID'
  ]

  for (const key of ids) {
    const value = process.env[key]
    if (value && !/^\d+$/.test(value)) {
      throw new Error(`${key} must be a valid Discord ID (numeric string), got: ${value}`)
    }
  }

  // Validate USE_UNICODE_EMOJI if present
  if (process.env.USE_UNICODE_EMOJI !== undefined) {
    const value = process.env.USE_UNICODE_EMOJI.toLowerCase()
    if (value !== 'true' && value !== 'false') {
      throw new Error('USE_UNICODE_EMOJI must be either "true" or "false"')
    }
  }

  return true
}
