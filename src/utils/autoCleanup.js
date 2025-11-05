import { getInactiveChannels, removeTempChannel } from './database.js'
import { AUTO_CLEANUP_TIMEOUT } from '../constants.js'
import { logStartup } from './logger.js'
import { log } from './logger.js'

/**
 * Cleans up inactive temporary channels
 * @param {Client} client - Discord client instance
 */
export async function cleanupInactiveChannels(client) {
  try {
    const inactiveChannels = getInactiveChannels(AUTO_CLEANUP_TIMEOUT)

    if (inactiveChannels.length === 0) return

    logStartup(`🧹 Found ${inactiveChannels.length} inactive channels to clean up`)

    for (const dbChannel of inactiveChannels) {
      try {
        // Try to fetch the channel from Discord
        const guild = await client.guilds.fetch(dbChannel.guild_id).catch(() => null)
        if (!guild) {
          // Guild no longer accessible, remove from database
          removeTempChannel(dbChannel.channel_id)
          client.tempVoiceOwners?.delete(dbChannel.channel_id)
          continue
        }

        const channel = await guild.channels.fetch(dbChannel.channel_id).catch(() => null)

        if (!channel) {
          // Channel no longer exists, remove from database
          removeTempChannel(dbChannel.channel_id)
          client.tempVoiceOwners?.delete(dbChannel.channel_id)
          continue
        }

        // Check if channel is still empty
        if (channel.members.size === 0) {
          await channel.delete('Auto-cleanup: Inactive for 24+ hours')
          removeTempChannel(dbChannel.channel_id)
          client.tempVoiceOwners?.delete(dbChannel.channel_id)

          log('log_auto_cleanup', client, {
            channel: channel.name,
            hours: Math.floor(AUTO_CLEANUP_TIMEOUT / (60 * 60 * 1000))
          })

          logStartup(`  ✓ Cleaned up ${channel.name}`)
        }
      } catch (err) {
        console.error(`Error cleaning up channel ${dbChannel.channel_id}:`, err.message)
      }

      // Add a small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000))
    }

    logStartup(`✅ Auto-cleanup completed`)
  } catch (err) {
    console.error('Error during auto-cleanup:', err)
  }
}

/**
 * Starts the auto-cleanup scheduler
 * Runs every hour
 * @param {Client} client - Discord client instance
 */
export function startAutoCleanup(client) {
  // Run immediately on start
  setTimeout(() => cleanupInactiveChannels(client), 30000) // 30 seconds after bot starts

  // Then run every hour
  setInterval(() => {
    cleanupInactiveChannels(client)
  }, 60 * 60 * 1000) // 1 hour

  logStartup('🔄 Auto-cleanup scheduler started (runs every 1 hour)')
}
