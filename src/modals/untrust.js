import { MessageFlags } from 'discord-api-types/v10'
import checkOwner from '../utils/checkOwner.js'
import { log } from '../utils/logger.js'
import t from '../utils/t.js'

export default {
  customId: 'untrust',

  async execute(interaction, client, config) {
    const lang = config.language
    const member = interaction.member
    const voice = member.voice.channel

    if (!voice) {
      return interaction.reply({
        content: t('not_in_channel', lang),
        flags: MessageFlags.Ephemeral
      })
    }

    if (!checkOwner(client, voice.id, member.id)) {
      return interaction.reply({
        content: t('not_owner', lang),
        flags: MessageFlags.Ephemeral
      })
    }

    const selectedId = interaction.values?.[0]
    if (!selectedId) {
      return interaction.reply({
        content: t('invalid_user', lang),
        flags: MessageFlags.Ephemeral
      })
    }

    const target = await client.users.fetch(selectedId).catch(() => null)
    if (!target) {
      return interaction.reply({
        content: t('invalid_user', lang),
        flags: MessageFlags.Ephemeral
      })
    }

    await voice.permissionOverwrites.delete(target.id)

    try {
      await interaction.update({
        content: t('untrusted', lang).replace('{user}', `<@${target.id}>`),
        components: []
      })
    } catch (err) {
    }

    log('log_untrust', client, {
      user: target.username,
      channel: voice.name
    })
  }
}
