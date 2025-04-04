import { MessageFlags } from 'discord-api-types/v10'
import { StringSelectMenuOptionBuilder } from 'discord.js'
import checkOwner from '../utils/checkOwner.js'
import t from '../utils/t.js'

export default {
  customId: 'kick',
  aliases: ['kick_select'],

  async execute(interaction, client, config) {
    const lang = config.language
    const member = interaction.member
    const voice = member.voice.channel

    if (!voice) {
      return interaction.reply({ content: t('not_in_channel', lang), flags: MessageFlags.Ephemeral })
    }

    const isOwner = checkOwner(client, voice.id, member.id)
    if (!isOwner) {
      return interaction.reply({ content: t('not_owner', lang), flags: MessageFlags.Ephemeral })
    }

    if (interaction.customId === 'kick_select') {
      const selected = interaction.values?.[0]
      const target = voice.members.get(selected)

      if (!target) {
        return interaction.update({
          content: t('user_not_found', lang),
          components: []
        }).catch(() => {})
      }

      await target.voice.disconnect().catch(() => {})
      await interaction.update({
        content: t('log_kick', lang, {
          user: `<@${target.user.id}>`,
          channel: voice.name
        }),
        components: []
      }).catch(() => {})

      return
    }

    const targets = [...voice.members.values()].filter(m => m.id !== member.id)
    if (!targets.length) {
      return interaction.reply({ content: t('no_user_to_kick', lang), flags: MessageFlags.Ephemeral })
    }

    const options = targets.map(m =>
      new StringSelectMenuOptionBuilder()
        .setLabel(m.user.username)
        .setValue(m.id)
    )

    return {
      editReply: true,
      options
    }
  }
}
