import { MessageFlags } from 'discord-api-types/v10'
import checkOwner from '../utils/checkOwner.js'
import { log } from '../utils/logger.js'
import t from '../utils/t.js'

export default {
  customId: 'delete',
  async execute(interaction, client, config) {
    const member = interaction.member
    const channel = member.voice.channel
    const lang = config.language

    if (!channel) return interaction.reply({ content: t('not_in_channel', lang), flags: MessageFlags.Ephemeral })
    if (!checkOwner(client, channel.id, member.id)) {
      return interaction.reply({ content: t('not_owner', lang), flags: MessageFlags.Ephemeral })
    }

    log('log_deleted', client, { channel: channel.name })
    client.deletedByInteraction = client.deletedByInteraction || new Set()
    client.deletedByInteraction.add(channel.id)

    await interaction.reply({ content: t('deleted', lang), flags: MessageFlags.Ephemeral })

    setTimeout(() => {
      channel.delete().catch(() => {})
      client.tempVoiceOwners.delete(channel.id)
    }, 500)
  }
}
