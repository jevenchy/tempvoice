import { log } from '../utils/logger.js'
import t from '../utils/t.js'

const loggedDeleted = new Set()

export default async (client, oldState, newState) => {
  const oldChannel = oldState.channel
  const newChannel = newState.channel
  const member = newState.member || oldState.member
  const lang = client.config?.language || 'en'

  if (!oldChannel && newChannel) {
    if (newChannel.id === process.env.VOICE_CHANNEL_ID) {
      const temp = await newChannel.guild.channels.create({
        name: `${member.user.username} - room`,
        type: 2,
        parent: process.env.CATEGORY_CHANNEL_ID
      })

      await newState.setChannel(temp)
      client.tempVoiceOwners ??= new Map()
      client.tempVoiceOwners.set(temp.id, member.id)

      log('log_switched', client, {
        user: member.user.username,
        from: newChannel.name,
        to: temp.name
      })
    } else {
      log('log_joined', client, {
        user: member.user.username,
        channel: newChannel.name
      })
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

    client.tempVoiceOwners.delete(channel.id)
    client.deletedByInteraction?.delete(channel.id)
  } catch (err) {
    if (err.code === 10003) {
      if (
        !client.deletedByInteraction?.has(channel.id) &&
        !loggedDeleted.has(channel.id)
      ) {
        log('log_deleted', client, { channel: channel.name })
        loggedDeleted.add(channel.id)
      }
    } else {
      log('log_channel_delete_failed', client, { channel: channel.name })
    }
  }
}
