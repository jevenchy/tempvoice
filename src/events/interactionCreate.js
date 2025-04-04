import {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  ComponentType,
  UserSelectMenuBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder
} from 'discord.js'

import { MessageFlags } from 'discord-api-types/v10'
import { log } from '../utils/logger.js'
import t from '../utils/t.js'
import config from '../../config/config.js'

export default async (client, interaction) => {
  try {
    const id = interaction.customId
    const modals = client.modals
    const active = client.activeInteractions
    const lang = config.language
    const userId = interaction.user?.id
    const channel = interaction.member?.voice?.channel
    const isModal = interaction.isModalSubmit?.()
    const isButton = interaction.isButton?.()
    const isStringMenu = interaction.isStringSelectMenu?.()
    const isUserMenu = interaction.componentType === ComponentType.UserSelect

    if (isModal) {
      const modal = modals.get(id)
      if (modal) return await modal.execute(interaction, client, config)
    }

    if (!isButton) return
    if (!channel) {
      return interaction.reply({ content: t('not_in_channel', lang), flags: MessageFlags.Ephemeral })
    }

    if (channel.parentId !== process.env.CATEGORY_CHANNEL_ID) {
      return interaction.reply({ content: t('different_channel', lang), flags: MessageFlags.Ephemeral })
    }

    const isOwner = client.tempVoiceOwners?.get(channel.id) === userId
    if (!isOwner && id !== 'claim') {
      return interaction.reply({ content: t('not_owner', lang), flags: MessageFlags.Ephemeral })
    }

    const basicInputs = {
      name: { id: 'name_input', label: t('name', lang), placeholder: 'e.g. My Room' },
      limit: { id: 'limit_input', label: t('limit', lang), placeholder: 'e.g. 5' }
    }

    if (basicInputs[id]) {
      const input = new TextInputBuilder()
        .setCustomId(basicInputs[id].id)
        .setLabel(basicInputs[id].label)
        .setPlaceholder(basicInputs[id].placeholder)
        .setRequired(false)
        .setMaxLength(100)
        .setStyle(TextInputStyle.Short)

      const modal = new ModalBuilder()
        .setCustomId(id)
        .setTitle(basicInputs[id].label)
        .addComponents(new ActionRowBuilder().addComponents(input))

      return interaction.showModal(modal)
    }

    if (id === 'privacy') {
      if (active.has(userId)) {
        await interaction.reply({ content: t('interaction_already_active', lang), flags: MessageFlags.Ephemeral }).catch(() => {})
        interaction._wasActiveError = true
        return
      }

      active.add(userId)

      const options = [
        'lock',
        'unlock',
        'invisible',
        'visible',
        'closechat',
        'openchat'
      ].map(val => ({
        label: t(`privacy_${val}_label`, lang),
        description: t(`privacy_${val}_desc`, lang),
        value: val
      }))

      const row = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId('privacy')
          .setPlaceholder(t('privacy_placeholder', lang))
          .addOptions(options)
      )

      await interaction.reply({ content: t('privacy_option', lang), components: [row], flags: MessageFlags.Ephemeral })

      const collector = interaction.channel.createMessageComponentCollector({
        componentType: ComponentType.StringSelect,
        time: 15000,
        filter: i => i.user.id === userId && i.customId === 'privacy'
      })

      collector.on('collect', async i => {
        const handler = modals.get('privacy')
        if (handler) await handler.execute(i, client, config)
        collector.stop('handled')
      })

      collector.on('end', async (_, reason) => {
        active.delete(userId)
        if (reason === 'time' && !interaction._wasActiveError) {
          await interaction.editReply({ content: t('interaction_timeout', lang), components: [] }).catch(() => {})
        }
      })

      return
    }

    if (id === 'kick' || id === 'transfer') {
      const members = [...channel.members.values()].filter(m => m.id !== userId)

      if (!members.length) {
        const key = id === 'kick' ? 'no_user_to_kick' : 'no_user_to_transfer'
        return interaction.reply({ content: t(key, lang), flags: MessageFlags.Ephemeral })
      }

      if (active.has(userId)) {
        await interaction.reply({ content: t('interaction_already_active', lang), flags: MessageFlags.Ephemeral }).catch(() => {})
        interaction._wasActiveError = true
        return
      }

      active.add(userId)

      const options = members.map(m =>
        new StringSelectMenuOptionBuilder().setLabel(m.user.username).setValue(m.id)
      )

      const row = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId(`${id}_select`)
          .setPlaceholder(t(`${id}_placeholder`, lang))
          .addOptions(options)
      )

      await interaction.reply({
        content: t(`${id}_option`, lang),
        components: [row],
        flags: MessageFlags.Ephemeral
      })

      const collector = interaction.channel.createMessageComponentCollector({
        componentType: ComponentType.StringSelect,
        time: 15000,
        filter: i => i.user.id === userId && i.customId === `${id}_select`
      })

      collector.on('collect', async i => {
        collector.stop('handled')
        const handler = modals.get(id)
        if (handler) await handler.execute(i, client, config)
      })

      collector.on('end', async (_, reason) => {
        active.delete(userId)
        if (reason === 'time' && !interaction._wasActiveError) {
          await interaction.editReply({ content: t('interaction_timeout', lang), components: [] }).catch(() => {})
        }
      })

      return
    }

    const selectMenus = {
      bitrate: {
        placeholder: t('bitrate_placeholder', lang),
        options: [32000, 48000, 64000, 80000, 96000].map(rate =>
          new StringSelectMenuOptionBuilder().setLabel(`${rate / 1000} kbps`).setValue(`${rate}`)
        )
      },
      region: {
        placeholder: t('region_placeholder', lang),
        options: [
          'auto', 'brazil', 'hongkong', 'india', 'japan', 'russia',
          'singapore', 'southafrica', 'sydney', 'us-central', 'us-east',
          'us-south', 'us-west'
        ].map(region =>
          new StringSelectMenuOptionBuilder().setLabel(region.replace(/-/g, ' ')).setValue(region)
        )
      }
    }

    if (selectMenus[id]) {
      if (active.has(userId)) {
        await interaction.reply({ content: t('interaction_already_active', lang), flags: MessageFlags.Ephemeral }).catch(() => {})
        interaction._wasActiveError = true
        return
      }

      active.add(userId)

      const row = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId(`${id}_select`)
          .setPlaceholder(selectMenus[id].placeholder)
          .addOptions(selectMenus[id].options)
      )

      await interaction.reply({ content: t(`${id}_option`, lang), components: [row], flags: MessageFlags.Ephemeral })

      const collector = interaction.channel.createMessageComponentCollector({
        componentType: ComponentType.StringSelect,
        time: 15000,
        filter: i => i.user.id === userId
      })

      collector.on('collect', async i => {
        const handler = modals.get(id)
        if (handler) await handler.execute(i, client, config)
        collector.stop('handled')
      })

      collector.on('end', async (_, reason) => {
        active.delete(userId)
        if (reason === 'time' && !interaction._wasActiveError) {
          await interaction.editReply({ content: t('interaction_timeout', lang), components: [] }).catch(() => {})
        }
      })

      return
    }

    const userMenus = ['trust', 'untrust', 'invite', 'block', 'unblock']
    if (userMenus.includes(id)) {
      if (active.has(userId)) {
        await interaction.reply({ content: t('interaction_already_active', lang), flags: MessageFlags.Ephemeral }).catch(() => {})
        interaction._wasActiveError = true
        return
      }

      active.add(userId)

      const row = new ActionRowBuilder().addComponents(
        new UserSelectMenuBuilder()
          .setCustomId(id)
          .setMinValues(1)
          .setMaxValues(1)
          .setPlaceholder(t(`${id}_placeholder`, lang))
      )

      await interaction.reply({ content: t(`${id}_option`, lang), components: [row], flags: MessageFlags.Ephemeral })

      const collector = interaction.channel.createMessageComponentCollector({
        componentType: ComponentType.UserSelect,
        time: 15000,
        filter: i => i.user.id === userId
      })

      collector.on('collect', async i => {
        const handler = modals.get(i.customId)
        if (handler) await handler.execute(i, client, config)
        collector.stop('handled')
      })

      collector.on('end', async (_, reason) => {
        active.delete(userId)
        if (reason === 'time' && !interaction._wasActiveError) {
          await interaction.editReply({ content: t('interaction_timeout', lang), components: [] }).catch(() => {})
        }
      })

      return
    }

    const simpleHandlers = ['claim', 'delete', 'dnd']
    if (simpleHandlers.includes(id)) {
      const handler = modals.get(id)
      if (handler) return handler.execute(interaction, client, config)
    }

    if (isStringMenu) {
      const handler = modals.get(id) || [...modals.values()].find(m => m.aliases?.includes(id))
      if (handler) return handler.execute(interaction, client, config)
    }

    if (isUserMenu && !interaction.replied && !interaction.deferred && !userMenus.includes(id)) {
      const handler = modals.get(id)
      if (handler) return handler.execute(interaction, client, config)
    }
  } catch (err) {
    console.error(t('error_interaction', config.language), err)
    if (!interaction.replied) {
      await interaction.reply({ content: t('error_interaction', config.language), flags: MessageFlags.Ephemeral }).catch(() => {})
    }
  }
}
