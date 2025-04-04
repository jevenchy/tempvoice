import checkOwner from '../utils/checkOwner.js'
import { MessageFlags } from 'discord-api-types/v10'
import { PermissionsBitField } from 'discord.js'
import { log } from '../utils/logger.js'
import t from '../utils/t.js'

export default {
  customId: 'privacy',

  async execute(interaction, client, config) {
    const lang = config.language
    const userId = interaction.user.id
    const voice = interaction.member.voice.channel

    if (!voice || !checkOwner(client, voice.id, userId)) {
      return interaction.reply({ content: t('not_owner', lang), flags: MessageFlags.Ephemeral }).catch(() => {})
    }

    const selected = interaction.values?.[0]
    if (!selected) return

    if (interaction._privacyExecuted) return
    interaction._privacyExecuted = true

    client.activeInteractions.delete(userId)

    const everyone = interaction.guild.roles.everyone.id
    const trusted = voice.permissionOverwrites.cache
      .filter(p => p.allow.has(PermissionsBitField.Flags.Connect) && p.type === 'member')
      .map(p => p.id)

    const map = {
      unlock: {
        [everyone]: [PermissionsBitField.Flags.Connect, PermissionsBitField.Flags.ViewChannel]
      },
      lock: {
        [everyone]: [],
        ...trusted.reduce((acc, id) => {
          acc[id] = [PermissionsBitField.Flags.Connect, PermissionsBitField.Flags.ViewChannel]
          return acc
        }, {})
      },
      invisible: {
        [everyone]: [],
        ...trusted.reduce((acc, id) => {
          acc[id] = [PermissionsBitField.Flags.ViewChannel]
          return acc
        }, {})
      },
      visible: {
        [everyone]: [PermissionsBitField.Flags.ViewChannel]
      },
      closechat: {
        [everyone]: [],
        ...trusted.reduce((acc, id) => {
          acc[id] = [PermissionsBitField.Flags.SendMessages]
          return acc
        }, {})
      },
      openchat: {
        [everyone]: [PermissionsBitField.Flags.SendMessages]
      }
    }

    const rules = map[selected]

    for (const [id, allow] of Object.entries(rules || {})) {
      await voice.permissionOverwrites.edit(id, {
        ViewChannel: allow.includes(PermissionsBitField.Flags.ViewChannel),
        Connect: allow.includes(PermissionsBitField.Flags.Connect),
        SendMessages: allow.includes(PermissionsBitField.Flags.SendMessages)
      })
    }

    await interaction.update({
      content: t(`privacy_${selected}`, lang),
      components: []
    }).catch(() => {})

    log('log_privacy', client, {
      user: interaction.user.username,
      value: t(`privacy_${selected}_label`, lang),
      channel: voice.name
    })
  }
}
