import { MessageFlags } from 'discord-api-types/v10'
import checkOwner from '../utils/checkOwner.js'
import { log } from '../utils/logger.js'
import t from '../utils/t.js'

export default {
  data: { name: 'region' },

  async execute(interaction, client, config) {
    const lang = config.language
    const member = interaction.member
    const voice = member.voice?.channel
    const selected = interaction.values[0]

    if (!voice) {
      client.activeInteractions.delete(member.id)
      return interaction.reply({ content: t('not_in_channel', lang), flags: MessageFlags.Ephemeral }).catch(() => {})
    }

    if (!checkOwner(client, voice.id, member.id)) {
      client.activeInteractions.delete(member.id)
      return interaction.reply({ content: t('not_owner', lang), flags: MessageFlags.Ephemeral }).catch(() => {})
    }

    try {
      await voice.setRTCRegion(selected === 'auto' ? null : selected)

      if (!interaction.replied && !interaction.deferred) {
        await interaction.update({
          content: t('region_updated', lang).replace('{region}', selected),
          components: []
        }).catch(e => {
          console.warn('[region] update failed:', e.message)
        })

        log('log_region', client, {
          user: member.user.username,
          region: selected,
          channel: voice.name
        })
      }
    } catch (err) {
      console.error('[region]', err)

      if (!interaction.replied && !interaction.deferred) {
        await interaction.reply({
          content: t('error_region', lang),
          flags: MessageFlags.Ephemeral
        }).catch(() => {})
      }
    }

    client.activeInteractions.delete(member.id)
  }
}
