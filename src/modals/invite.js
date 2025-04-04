import { MessageFlags } from 'discord-api-types/v10'
import { log } from '../utils/logger.js'
import t from '../utils/t.js'

export default {
  customId: 'invite',

  async execute(interaction, client, config) {
    const lang = config.language
    const channel = interaction.member.voice.channel

    if (!channel) {
      return interaction.reply({
        content: t('not_in_channel', lang),
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

    try {
      const user = await client.users.fetch(selectedId)
      const invite = await channel.createInvite({ maxAge: 86400, unique: true })

      await user.send({
        content: t('invite_message', lang)
          .replace('{name}', channel.name)
          .replace('{voiceLink}', invite.url)
      })

      await interaction.update({
        content: t('invited_user', lang).replace('{user}', `<@${user.id}>`),
        components: []
      })

      log('log_invite', client, {
        user: user.username,
        channel: channel.name
      })
    } catch (err) {
      const isDM = err.code === 50007
      const msg = isDM
        ? t('error_user_dms_closed', lang)
        : t('error_send_invite', lang)

      try {
        await interaction.update({
          content: msg,
          components: []
        })
      } catch (e) {
      }
    }
  }
}
