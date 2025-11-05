import Database from 'better-sqlite3'
import { DB_PATH } from '../constants.js'
import fs from 'fs'
import path from 'path'

let db = null

/**
 * Initializes the SQLite database
 * Creates tables if they don't exist
 */
export function initDatabase() {
  // Create data directory if it doesn't exist
  const dir = path.dirname(DB_PATH)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  db = new Database(DB_PATH)
  db.pragma('journal_mode = WAL') // Better performance for concurrent reads

  // Create tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS temp_channels (
      channel_id TEXT PRIMARY KEY,
      owner_id TEXT NOT NULL,
      guild_id TEXT NOT NULL,
      created_at INTEGER NOT NULL,
      last_activity INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS guild_configs (
      guild_id TEXT PRIMARY KEY,
      category_channel_id TEXT,
      embed_channel_id TEXT,
      voice_channel_id TEXT,
      log_channel_id TEXT,
      language TEXT DEFAULT 'en',
      created_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS statistics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      guild_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      event_type TEXT NOT NULL,
      channel_id TEXT,
      timestamp INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS channel_templates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      guild_id TEXT NOT NULL,
      name TEXT NOT NULL,
      user_limit INTEGER,
      bitrate INTEGER,
      region TEXT,
      created_at INTEGER NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_temp_channels_owner ON temp_channels(owner_id);
    CREATE INDEX IF NOT EXISTS idx_temp_channels_guild ON temp_channels(guild_id);
    CREATE INDEX IF NOT EXISTS idx_statistics_guild ON statistics(guild_id);
    CREATE INDEX IF NOT EXISTS idx_statistics_user ON statistics(user_id);
    CREATE INDEX IF NOT EXISTS idx_channel_templates_guild ON channel_templates(guild_id);
  `)

  return db
}

/**
 * Gets the database instance
 * @returns {Database} SQLite database instance
 */
export function getDatabase() {
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase() first.')
  }
  return db
}

/**
 * Adds a temporary channel to the database
 * @param {string} channelId - Discord channel ID
 * @param {string} ownerId - Discord user ID of the owner
 * @param {string} guildId - Discord guild ID
 */
export function addTempChannel(channelId, ownerId, guildId) {
  const now = Date.now()
  const stmt = db.prepare(`
    INSERT INTO temp_channels (channel_id, owner_id, guild_id, created_at, last_activity)
    VALUES (?, ?, ?, ?, ?)
  `)
  stmt.run(channelId, ownerId, guildId, now, now)
}

/**
 * Removes a temporary channel from the database
 * @param {string} channelId - Discord channel ID
 */
export function removeTempChannel(channelId) {
  const stmt = db.prepare('DELETE FROM temp_channels WHERE channel_id = ?')
  stmt.run(channelId)
}

/**
 * Gets the owner of a temporary channel
 * @param {string} channelId - Discord channel ID
 * @returns {string|null} Owner user ID or null if not found
 */
export function getTempChannelOwner(channelId) {
  const stmt = db.prepare('SELECT owner_id FROM temp_channels WHERE channel_id = ?')
  const row = stmt.get(channelId)
  return row ? row.owner_id : null
}

/**
 * Gets all temporary channels for a user
 * @param {string} userId - Discord user ID
 * @returns {Array} Array of channel objects
 */
export function getUserTempChannels(userId) {
  const stmt = db.prepare('SELECT * FROM temp_channels WHERE owner_id = ?')
  return stmt.all(userId)
}

/**
 * Updates the last activity timestamp for a channel
 * @param {string} channelId - Discord channel ID
 */
export function updateChannelActivity(channelId) {
  const stmt = db.prepare('UPDATE temp_channels SET last_activity = ? WHERE channel_id = ?')
  stmt.run(Date.now(), channelId)
}

/**
 * Gets all channels that haven't had activity for a given time
 * @param {number} maxAge - Maximum age in milliseconds
 * @returns {Array} Array of channel objects
 */
export function getInactiveChannels(maxAge) {
  const cutoff = Date.now() - maxAge
  const stmt = db.prepare('SELECT * FROM temp_channels WHERE last_activity < ?')
  return stmt.all(cutoff)
}

/**
 * Loads all temp channels into memory (for compatibility with existing code)
 * @returns {Map} Map of channel_id -> owner_id
 */
export function loadTempChannelsToMemory() {
  const stmt = db.prepare('SELECT channel_id, owner_id FROM temp_channels')
  const rows = stmt.all()
  const map = new Map()
  for (const row of rows) {
    map.set(row.channel_id, row.owner_id)
  }
  return map
}

/**
 * Saves guild configuration
 * @param {string} guildId - Discord guild ID
 * @param {object} config - Guild configuration object
 */
export function saveGuildConfig(guildId, config) {
  const stmt = db.prepare(`
    INSERT OR REPLACE INTO guild_configs
    (guild_id, category_channel_id, embed_channel_id, voice_channel_id, log_channel_id, language, created_at)
    VALUES (?, ?, ?, ?, ?, ?, COALESCE((SELECT created_at FROM guild_configs WHERE guild_id = ?), ?))
  `)
  const now = Date.now()
  stmt.run(
    guildId,
    config.categoryChannelId,
    config.embedChannelId,
    config.voiceChannelId,
    config.logChannelId,
    config.language,
    guildId,
    now
  )
}

/**
 * Gets guild configuration
 * @param {string} guildId - Discord guild ID
 * @returns {object|null} Guild configuration or null
 */
export function getGuildConfig(guildId) {
  const stmt = db.prepare('SELECT * FROM guild_configs WHERE guild_id = ?')
  return stmt.get(guildId)
}

/**
 * Logs a statistics event
 * @param {string} guildId - Discord guild ID
 * @param {string} userId - Discord user ID
 * @param {string} eventType - Type of event
 * @param {string} channelId - Discord channel ID (optional)
 */
export function logStatistic(guildId, userId, eventType, channelId = null) {
  const stmt = db.prepare(`
    INSERT INTO statistics (guild_id, user_id, event_type, channel_id, timestamp)
    VALUES (?, ?, ?, ?, ?)
  `)
  stmt.run(guildId, userId, eventType, channelId, Date.now())
}

/**
 * Gets statistics for a guild
 * @param {string} guildId - Discord guild ID
 * @param {number} limit - Maximum number of results
 * @returns {Array} Array of statistic objects
 */
export function getGuildStatistics(guildId, limit = 100) {
  const stmt = db.prepare(`
    SELECT * FROM statistics
    WHERE guild_id = ?
    ORDER BY timestamp DESC
    LIMIT ?
  `)
  return stmt.all(guildId, limit)
}

/**
 * Closes the database connection
 */
export function closeDatabase() {
  if (db) {
    db.close()
    db = null
  }
}
