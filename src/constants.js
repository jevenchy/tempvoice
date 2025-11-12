/**
 * Application-wide constants
 */

// Interaction timeouts
export const INTERACTION_TIMEOUT = 15000 // 15 seconds
export const COLLECTOR_TIMEOUT = 15000 // 15 seconds

// Channel limits
export const MAX_CHANNEL_NAME_LENGTH = 100
export const MAX_CHANNELS_PER_USER = 3
export const MAX_CHANNEL_USER_LIMIT = 99
export const AUTO_CLEANUP_TIMEOUT = 24 * 60 * 60 * 1000 // 24 hours

// Rate limiting
export const RATE_LIMIT_WINDOW = 10000 // 10 seconds
export const RATE_LIMIT_MAX_REQUESTS = 5 // 5 requests per window

// Memory management
export const MAX_LOGGED_DELETIONS = 1000

// Database
export const DB_PATH = './data/tempvoice.db'

// Bitrate options (in bps)
export const BITRATE_OPTIONS = [32000, 48000, 64000, 80000, 96000]

// Voice regions
export const VOICE_REGIONS = [
  'auto',
  'brazil',
  'hongkong',
  'india',
  'japan',
  'russia',
  'singapore',
  'southafrica',
  'sydney',
  'us-central',
  'us-east',
  'us-south',
  'us-west'
]

// Privacy options
export const PRIVACY_OPTIONS = [
  'lock',
  'unlock',
  'invisible',
  'visible',
  'closechat',
  'openchat'
]

// Required Discord permissions for the bot
export const REQUIRED_PERMISSIONS = [
  'ViewChannel',
  'ManageChannels',
  'MoveMembers',
  'Connect',
  'SendMessages'
]
