import { EmbedBuilder } from 'discord.js'
import config from '../../config/config.js'
import t from './t.js'
import 'dotenv/config'

const { GUILD_ID, VOICE_CHANNEL_ID, BANNER_URL } = process.env

const unicodeEmojis = {
  setting: '⚙️',
  name: '📝',
  limit: '🔢',
  privacy: '🔒',
  dnd: '🔕',
  region: '🌐',
  trust: '✅',
  untrust: '🚫',
  block: '⛔',
  unblock: '⭕',
  bitrate: '🎚️',
  invite: '📨',
  kick: '👢',
  claim: '🙋',
  transfer: '🔄',
  delete: '🗑️'
}

export const createVoiceEmbed = () => {
  const hex = config.embedcode || '#2f3136'
  const color = parseInt(hex.replace('#', ''), 16)
  const lang = config.language

  const commands = [
    ['name', '1356995682963292230'],
    ['limit', '1356995669298122854'],
    ['privacy', '1356995699472076820'],
    ['dnd', '1356995625404858558'],
    ['region', '1356995714542075914'],
    ['trust', '1356995749036036156'],
    ['untrust', '1356995771232157783'],
    ['block', '1356995584497680384'],
    ['unblock', '1356995760163520573'],
    ['bitrate', '1356995567368016085'],
    ['invite', '1356995639422091485'],
    ['kick', '1356995655188349069'],
    ['claim', '1356995597751812187'],
    ['transfer', '1356995727221461082'],
    ['delete', '1356995611185909824']
  ]

  const desc = [
    t('dashboard_description', lang),
    '',
    ...commands.map(([k]) => `${unicodeEmojis[k]} **${t(k, lang)}**: ${t(`${k}_desc`, lang)}`),
    '',
    t('dashboard_create_link', lang, {
      guildId: GUILD_ID,
      channelId: VOICE_CHANNEL_ID
    })
  ].join('\n')

  const image = BANNER_URL ||
    'https://media.discordapp.net/attachments/1357016908611715284/1357016929142964376/tempvoice-dashboard.png'

  return new EmbedBuilder()
    .setTitle(`${unicodeEmojis.setting} ${t('dashboard_title', lang)}`)
    .setDescription(desc)
    .setImage(image)
    .setFooter({ text: t('dashboard_footer', lang) })
    .setColor(color)
}
