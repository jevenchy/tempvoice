import { MessageFlags } from 'discord-api-types/v10'
import { PermissionFlagsBits } from 'discord.js'
import checkOwner from '../utils/checkOwner.js'
import { log } from '../utils/logger.js'
import t from '../utils/t.js'

export default {
  data: { name: 'dnd' },
  async execute(interaction, client, config) {
    const member = interaction.member
    const channel = member.voice.channel
    const lang = config.language

    if (!channel) return interaction.reply({ content: t('not_in_channel', lang), flags: MessageFlags.Ephemeral })
    if (!checkOwner(client, channel.id, member.id)) {
      return interaction.reply({ content: t('not_owner', lang), flags: MessageFlags.Ephemeral })
    }

    const everyone = channel.guild.roles.everyone
    const perms = channel.permissionOverwrites.cache.get(everyone.id)
    const isDND = perms && perms.deny.has(PermissionFlagsBits.Speak)

    const permsToUpdate = {
      Speak: isDND ? null : false,
      Stream: isDND ? null : false,
      UseVAD: isDND ? null : false,
      PrioritySpeaker: isDND ? null : false,
      UseSoundboard: isDND ? null : false,
      UseEmbeddedActivities: isDND ? null : false
    }

    await channel.permissionOverwrites.edit(everyone, permsToUpdate)

    return interaction.reply({
      content: t(isDND ? 'dnd_off' : 'dnd_on', lang),
      flags: MessageFlags.Ephemeral
    })
  }
}
