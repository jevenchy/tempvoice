import { embedSender } from '../handlers/embedSender.js'
import { logStartup } from '../utils/logger.js'
import config from '../../config/config.js'
import t from '../utils/t.js'

export default async client => {
  const guild = await client.guilds.fetch(process.env.GUILD_ID)
  const channels = await guild.channels.fetch()

  const category = channels.get(process.env.CATEGORY_CHANNEL_ID)
  const embed = channels.get(process.env.EMBED_CHANNEL_ID)
  const voice = channels.get(process.env.VOICE_CHANNEL_ID)
  const log = process.env.LOG_CHANNEL_ID
    ? channels.get(process.env.LOG_CHANNEL_ID)
    : null

  if (!category || category.type !== 4) {
    logStartup(t('invalid_category'))
    process.exit(1)
  }

  if (!embed || !['GUILD_TEXT', 0].includes(embed.type)) {
    logStartup(t('invalid_embed'))
    process.exit(1)
  }

  if (!voice || !['GUILD_VOICE', 2].includes(voice.type)) {
    logStartup(t('invalid_voice'))
    process.exit(1)
  }

  await embedSender(embed)

  logStartup(`Logged in as ${client.user.tag}`)
  logStartup(`Category: ${category.name} (${category.id})`)
  logStartup(`Embed: ${embed.name} (${embed.id})`)
  logStartup(`Voice: ${voice.name} (${voice.id})`)
  logStartup(`Log: ${log ? `${log.name} (${log.id})` : '[not set]'}`)
  logStartup(`Lang: ${config.language}`)
  logStartup(`Log Channel: ${config.log ? 'true' : 'false'}`)
  logStartup('Loaded modals:')

  for (const name of client.modals.keys()) {
    logStartup(`${name}`)
  }
}
