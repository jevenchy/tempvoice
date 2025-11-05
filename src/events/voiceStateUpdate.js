import { ChannelType } from 'discord.js'
import { log } from '../utils/logger.js'
import t from '../utils/t.js'
import config from '../../config/config.js'
import { addTempChannel, removeTempChannel, updateChannelActivity, getUserTempChannels } from '../utils/database.js'
import { MAX_CHANNELS_PER_USER } from '../constants.js'

/**
 * Bounded set to prevent memory leaks
 * Automatically removes oldest entries when max size is reached
 */
class BoundedSet {
  constructor(maxSize = 1000) {
    this.maxSize = maxSize
    this.items = new Set()
  }

  add(item) {
    // If at max capacity, remove oldest item
    if (this.items.size >= this.maxSize) {
      const firstItem = this.items.values().next().value
      this.items.delete(firstItem)
    }
    this.items.add(item)
  }

  has(item) {
    return this.items.has(item)
  }

  delete(item) {
    this.items.delete(item)
  }

  clear() {
    this.items.clear()
  }
}

const loggedDeleted = new BoundedSet(1000)

// Lock to prevent race conditions when multiple users join simultaneously
const creationLocks = new Set()

/**
 * Handles voice state updates (join, leave, move)
 * @param {Client} client - Discord client instance
 * @param {VoiceState} oldState - Previous voice state
 * @param {VoiceState} newState - New voice state
 */
export default async (client, oldState, newState) => {
  const oldChannel = oldState.channel
  const newChannel = newState.channel
  const member = newState.member || oldState.member
  const lang = config.language

  if (!oldChannel && newChannel) {
    if (newChannel.id === process.env.VOICE_CHANNEL_ID) {
      // Check if user already has a creation in progress (race condition prevention)
      if (creationLocks.has(member.id)) {
        return
      }

      // Check if user has exceeded max channels
      const userChannels = getUserTempChannels(member.id)
      if (userChannels.length >= MAX_CHANNELS_PER_USER) {
        try {
          await member.send(t('max_channels_reached', lang, { max: MAX_CHANNELS_PER_USER }) ||
            `You've reached the maximum limit of ${MAX_CHANNELS_PER_USER} active channels. Please close one of your existing channels first.`)
        } catch (err) {
          // User has DMs disabled, silently fail
        }
        return
      }

      // Lock this user's channel creation
      creationLocks.add(member.id)

      try {
        const temp = await newChannel.guild.channels.create({
          name: `${member.user.username} - room`,
          type: ChannelType.GuildVoice,
          parent: process.env.CATEGORY_CHANNEL_ID
        })

        await newState.setChannel(temp)
        client.tempVoiceOwners ??= new Map()
        client.tempVoiceOwners.set(temp.id, member.id)

        // Save to database
        addTempChannel(temp.id, member.id, newChannel.guild.id)

        log('log_switched', client, {
          user: member.user.username,
          from: newChannel.name,
          to: temp.name
        })
      } finally {
        // Always unlock, even if there was an error
        creationLocks.delete(member.id)
      }
    } else {
      log('log_joined', client, {
        user: member.user.username,
        channel: newChannel.name
      })

      // Update activity if it's a temp channel
      if (client.tempVoiceOwners?.has(newChannel.id)) {
        updateChannelActivity(newChannel.id)
      }
    }

    return
  }

  if (oldChannel && !newChannel) {
    log('log_left', client, {
      user: member.user.username,
      channel: oldChannel.name
    })

    const isOwner = client.tempVoiceOwners?.get(oldChannel.id) === member.id
    if (oldChannel.members.size > 0 || !isOwner) return

    await deleteChannel(oldChannel, client)
    return
  }

  if (oldChannel && newChannel && oldChannel.id !== newChannel.id) {
    const isOwner = client.tempVoiceOwners?.get(oldChannel.id) === member.id
    if (oldChannel.members.size > 0 || !isOwner) return

    await deleteChannel(oldChannel, client)
  }
}

/**
 * Deletes a temporary voice channel
 * @param {VoiceChannel} channel - Discord voice channel to delete
 * @param {Client} client - Discord client instance
 */
async function deleteChannel(channel, client) {
  if (!client.channels.cache.has(channel.id)) return

  try {
    await channel.delete()

    if (
      !client.deletedByInteraction?.has(channel.id) &&
      !loggedDeleted.has(channel.id)
    ) {
      log('log_deleted', client, { channel: channel.name })
      loggedDeleted.add(channel.id)
    }

    // Remove from memory and database
    client.tempVoiceOwners.delete(channel.id)
    client.deletedByInteraction?.delete(channel.id)
    removeTempChannel(channel.id)
  } catch (err) {
    if (err.code === 10003) {
      // Channel already deleted
      if (
        !client.deletedByInteraction?.has(channel.id) &&
        !loggedDeleted.has(channel.id)
      ) {
        log('log_deleted', client, { channel: channel.name })
        loggedDeleted.add(channel.id)
      }
      // Still remove from database even if already deleted
      client.tempVoiceOwners.delete(channel.id)
      removeTempChannel(channel.id)
    } else {
      log('log_channel_delete_failed', client, { channel: channel.name })
    }
  }
}
