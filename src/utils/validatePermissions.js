import { PermissionsBitField } from 'discord.js'
import { REQUIRED_PERMISSIONS } from '../constants.js'
import { logStartup } from './logger.js'
import t from './t.js'
import config from '../../config/config.js'

/**
 * Validates that the bot has required permissions in the guild
 * @param {Client} client - Discord client instance
 * @returns {boolean} True if all permissions are present, false otherwise
 */
export async function validateBotPermissions(client) {
  const guildId = process.env.GUILD_ID
  const categoryId = process.env.CATEGORY_CHANNEL_ID

  if (!guildId || !categoryId) {
    logStartup('⚠️  Cannot validate permissions: GUILD_ID or CATEGORY_CHANNEL_ID not set')
    return false
  }

  try {
    const guild = await client.guilds.fetch(guildId)
    const category = await guild.channels.fetch(categoryId)

    if (!category) {
      logStartup(`❌ Category channel ${categoryId} not found`)
      return false
    }

    const botMember = await guild.members.fetch(client.user.id)
    const permissions = category.permissionsFor(botMember)

    const missingPermissions = []

    for (const permission of REQUIRED_PERMISSIONS) {
      if (!permissions.has(PermissionsBitField.Flags[permission])) {
        missingPermissions.push(permission)
      }
    }

    if (missingPermissions.length > 0) {
      logStartup(`❌ Missing permissions in category: ${missingPermissions.join(', ')}`)
      logStartup('   Please grant the bot these permissions and restart.')
      return false
    }

    logStartup('✅ All required permissions verified')
    return true
  } catch (err) {
    logStartup(`❌ Error validating permissions: ${err.message}`)
    return false
  }
}

/**
 * Validates that required channels exist and are accessible
 * @param {Client} client - Discord client instance
 * @returns {object} Validation results
 */
export async function validateChannels(client) {
  const results = {
    valid: true,
    errors: []
  }

  const requiredChannels = {
    GUILD_ID: 'guild',
    CATEGORY_CHANNEL_ID: 'category',
    EMBED_CHANNEL_ID: 'text channel (embed)',
    VOICE_CHANNEL_ID: 'voice channel (trigger)'
  }

  const guildId = process.env.GUILD_ID

  try {
    const guild = await client.guilds.fetch(guildId).catch(() => null)

    if (!guild) {
      results.valid = false
      results.errors.push(`Cannot access guild ${guildId}`)
      return results
    }

    for (const [envVar, description] of Object.entries(requiredChannels)) {
      if (envVar === 'GUILD_ID') continue

      const channelId = process.env[envVar]
      if (!channelId) {
        results.valid = false
        results.errors.push(`${envVar} not set in environment`)
        continue
      }

      const channel = await guild.channels.fetch(channelId).catch(() => null)
      if (!channel) {
        results.valid = false
        results.errors.push(`${description} (${channelId}) not found or not accessible`)
      }
    }

    // Optional: Log channel
    if (process.env.LOG_CHANNEL_ID) {
      const logChannel = await guild.channels.fetch(process.env.LOG_CHANNEL_ID).catch(() => null)
      if (!logChannel) {
        logStartup(`⚠️  Log channel (${process.env.LOG_CHANNEL_ID}) not found - logging will only go to console`)
      }
    }
  } catch (err) {
    results.valid = false
    results.errors.push(`Error validating channels: ${err.message}`)
  }

  return results
}
