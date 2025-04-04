import { log } from '../utils/logger.js'
import t from '../utils/t.js'

export default {
  customId: 'transfer',
  aliases: ['transfer_select'],
  async execute(interaction, client, config) {
    const lang = config.language
    const userId = interaction.user.id
    const voice = interaction.member.voice?.channel
    const selectedId = interaction.values?.[0]

    if (!voice || !selectedId) return

    const target = voice.members.get(selectedId)
    if (!target) {
      return interaction.editReply({
        content: t('user_not_found', lang),
        components: []
      }).catch(() => {})
    }

    client.tempVoiceOwners.set(voice.id, selectedId)

    await voice.permissionOverwrites.edit(selectedId, {
      ManageChannels: true,
      MuteMembers: true,
      DeafenMembers: true,
      MoveMembers: true
    }).catch(() => {})

    await interaction.update({
      content: t('log_transfer', lang, {
        user: `<@${target.user.id}>`,
        channel: voice.name
      }),
      components: []
    }).catch(() => {})

    log('log_transfer', client, {
      user: target.user.username,
      channel: voice.name
    })
  }
}
