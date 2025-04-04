import { MessageFlags } from 'discord-api-types/v10'
import { log } from '../utils/logger.js'
import t from '../utils/t.js'

export default {
  customId: 'name',

  async execute(interaction, client, config) {
    const lang = config.language
    const input = interaction.fields.getTextInputValue('name_input')?.trim()
    const member = interaction.member
    const channel = member.voice?.channel

    const ownerId = client.tempVoiceOwners?.get(channel?.id)
    if (!channel || ownerId !== member.id) {
      return interaction.reply({ content: t('not_owner', lang), flags: MessageFlags.Ephemeral })
    }

    if (!input || input.length < 2 || input.length > 100) {
      return interaction.reply({ content: t('invalid_name', lang), flags: MessageFlags.Ephemeral })
    }

    try {
      await channel.setName(input)
      channel.renamedByModal = true

      log('log_renamed', client, {
        user: member.user.username,
        name: input
      })

      return interaction.reply({
        content: t('channel_renamed', lang, { name: input }),
        flags: MessageFlags.Ephemeral
      })
    } catch (err) {
      console.warn('error_name', err.message)
      return interaction.reply({
        content: t('error_name', lang),
        flags: MessageFlags.Ephemeral
      }).catch(() => {})
    }
  }
}
