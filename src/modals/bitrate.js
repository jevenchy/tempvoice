import { MessageFlags } from 'discord-api-types/v10'
import checkOwner from '../utils/checkOwner.js'
import { log } from '../utils/logger.js'
import t from '../utils/t.js'

export default {
  data: { name: 'bitrate' },
  async execute(interaction, client, config) {
    const { member } = interaction
    const channel = member.voice?.channel
    const lang = config.language

    if (!channel) {
      client.activeInteractions.delete(member.id)
      return interaction.reply({ content: t('not_in_channel', lang), flags: MessageFlags.Ephemeral }).catch(() => {})
    }

    if (!checkOwner(client, channel.id, member.id)) {
      client.activeInteractions.delete(member.id)
      return interaction.reply({ content: t('not_owner', lang), flags: MessageFlags.Ephemeral }).catch(() => {})
    }

    const selected = parseInt(interaction.values[0], 10)

    try {
      await channel.setBitrate(selected)
      if (!interaction.replied && !interaction.deferred) {
        await interaction.update({
          content: t('bitrate_updated', lang).replace('{bitrate}', selected),
          components: []
        })
        log('log_bitrate', client, { user: member.user.username, bitrate: selected, channel: channel.name })
      }
    } catch (err) {
      console.warn('[bitrate]', err.message)
      if (!interaction.replied && !interaction.deferred) {
        await interaction.reply({ content: t('error_bitrate', lang), flags: MessageFlags.Ephemeral }).catch(() => {})
      }
    }

    client.activeInteractions.delete(member.id)
  }
}
