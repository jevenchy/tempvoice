import { ChannelType, PermissionsBitField } from 'discord.js'
import { log } from '../utils/logger.js'

export default async (client, oldChannel, newChannel) => {
  if (
    oldChannel.type !== ChannelType.GuildVoice ||
    newChannel.type !== ChannelType.GuildVoice
  ) return

  if (oldChannel.name !== newChannel.name) {
    if (newChannel.renamedByModal) {
      newChannel.renamedByModal = false
    } else {
      const parts = oldChannel.name.split(' - ')
      const ownerId = parts.at(-1)

      try {
        const member = await newChannel.guild.members.fetch(ownerId)
        if (member) {
          log('log_renamed', client, {
            user: member.user.username,
            name: newChannel.name
          })
        }
      } catch (_) {}
    }
  }

  const categoryID = process.env.CATEGORY_CHANNEL_ID
  const isInTemp = newChannel.parentId === categoryID && newChannel.name.endsWith(' - room')
  if (!isInTemp) return

  const ownerId = client.tempVoiceOwners.get(newChannel.id)
  if (!ownerId) return

  const perms = newChannel.permissionOverwrites.cache.get(ownerId)
  if (!perms || !perms.allow.has(PermissionsBitField.Flags.ManageChannels)) {
    await newChannel.permissionOverwrites.edit(ownerId, {
      ManageChannels: true,
      ManageRoles: true,
      Connect: true,
      MuteMembers: true,
      DeafenMembers: true,
      MoveMembers: true,
      ViewChannel: true
    })

    try {
      const member = await newChannel.guild.members.fetch(ownerId)
      if (member) {
        log('permissions_updated', client, {
          user: member.user.username,
          channel: newChannel.name
        })
      }
    } catch (_) {}
  }
}
