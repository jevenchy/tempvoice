import { MessageFlags } from 'discord-api-types/v10'
import checkOwner from '../utils/checkOwner.js'
import { log } from '../utils/logger.js'
import t from '../utils/t.js'

export default {
  customId: 'block',
  async execute(interaction, client, config) {
    const channel = interaction.member.voice.channel
    const member = interaction.member
    const lang = config.language

    if (!channel) return interaction.reply({ content: t('not_in_channel', lang), flags: MessageFlags.Ephemeral })
    if (!checkOwner(client, channel.id, member.id)) {
      return interaction.reply({ content: t('not_owner', lang), flags: MessageFlags.Ephemeral })
    }

    const targetId = interaction.values?.[0]
    if (!targetId) return interaction.reply({ content: t('invalid_user', lang), flags: MessageFlags.Ephemeral })

    const target = await client.users.fetch(targetId).catch(() => null)
    if (!target) return interaction.reply({ content: t('invalid_user', lang), flags: MessageFlags.Ephemeral })

    await channel.permissionOverwrites.edit(target.id, {
      ViewChannel: false,
      Connect: false,
      Speak: false,
      Stream: false,
      UseVAD: false,
      SendMessages: false
    })

    await interaction.update({ content: t('blocked', lang).replace('{user}', `<@${target.id}>`), components: [] })

    log('log_block', client, { user: target.username, channel: channel.name })
  }
}
