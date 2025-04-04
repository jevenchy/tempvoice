import { MessageFlags } from 'discord-api-types/v10'
import { log } from '../utils/logger.js'
import t from '../utils/t.js'

export default {
  customId: 'limit',

  async execute(interaction, client, config) {
    const input = interaction.fields.getTextInputValue('limit_input')
    const channel = interaction.member.voice?.channel
    const lang = config.language

    const ownerId = client.tempVoiceOwners?.get(channel?.id)
    if (!channel || ownerId !== interaction.user.id) {
      return interaction.reply({ content: t('not_owner', lang), flags: MessageFlags.Ephemeral })
    }

    const limit = parseInt(input)
    if (isNaN(limit) || limit < 0 || limit > 99) {
      return interaction.reply({ content: t('invalid_limit', lang), flags: MessageFlags.Ephemeral })
    }

    await channel.setUserLimit(limit)

    log('log_limit', client, {
      user: interaction.user.username,
      limit,
      channel: channel.name
    })

    return interaction.reply({
      content: t('limit_updated', lang, { limit }),
      flags: MessageFlags.Ephemeral
    })
  }
}
