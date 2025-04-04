import { createVoiceEmbed } from '../utils/embedBuilder.js'
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} from 'discord.js'

export const embedSender = async channel => {
  const embed = createVoiceEmbed()

  const row = (...buttons) =>
    new ActionRowBuilder().addComponents(
      ...buttons.map(([id, emoji, style = ButtonStyle.Secondary]) =>
        new ButtonBuilder()
          .setCustomId(id)
          .setEmoji({ id: emoji, name: id })
          .setStyle(style)
      )
    )

  const buttons1 = row(
    ['name', '1356995682963292230'],
    ['limit', '1356995669298122854'],
    ['privacy', '1356995699472076820'],
    ['dnd', '1356995625404858558'],
    ['region', '1356995714542075914']
  )

  const buttons2 = row(
    ['trust', '1356995749036036156'],
    ['untrust', '1356995771232157783'],
    ['block', '1356995584497680384'],
    ['unblock', '1356995760163520573'],
    ['bitrate', '1356995567368016085']
  )

  const buttons3 = row(
    ['invite', '1356995639422091485'],
    ['kick', '1356995655188349069'],
    ['claim', '1356995597751812187'],
    ['transfer', '1356995727221461082'],
    ['delete', '1356995611185909824', ButtonStyle.Danger]
  )

  await channel.send({
    embeds: [embed],
    components: [buttons1, buttons2, buttons3]
  })
}
