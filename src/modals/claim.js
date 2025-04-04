import { MessageFlags } from 'discord-api-types/v10'
import { PermissionsBitField } from 'discord.js'
import { log } from '../utils/logger.js'
import t from '../utils/t.js'

export default {
  customId: 'claim',
  async execute(interaction, client, config) {
    const member = interaction.member
    const userId = member.id
    const lang = config.language
    const channel = member.voice?.channel

    if (!channel) return interaction.reply({ content: t('not_in_channel', lang), flags: MessageFlags.Ephemeral })

    const current = client.tempVoiceOwners?.get(channel.id)
    if (!current) return interaction.reply({ content: t('not_temp_channel', lang), flags: MessageFlags.Ephemeral })
    if (current === userId) return interaction.reply({ content: t('already_owner', lang), flags: MessageFlags.Ephemeral })
    if (channel.members.has(current)) return interaction.reply({ content: t('owner_still_present', lang), flags: MessageFlags.Ephemeral })

    client.tempVoiceOwners.set(channel.id, userId)

    await channel.permissionOverwrites.edit(userId, {
      ManageChannels: true,
      MuteMembers: true,
      DeafenMembers: true,
      MoveMembers: true
    })

    log('log_claimed', client, { user: member.user.username, channel: channel.name })

    return interaction.reply({
      content: t('log_claimed', lang, { user: member.user.username, channel: channel.name }),
      flags: MessageFlags.Ephemeral
    })
  }
}
