import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import {
  Client,
  GatewayIntentBits,
  Partials,
  Collection
} from 'discord.js'

import { embedSender } from './handlers/embedSender.js'
import { logStartup } from './utils/logger.js'
import config from '../config/config.js'
import t from './utils/t.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel]
})

client.activeInteractions = new Set()
client.modals = new Collection()
client.tempVoiceOwners = new Map()

const modalsDir = path.join(__dirname, 'modals')
const modalFiles = fs.readdirSync(modalsDir).filter(f => f.endsWith('.js') && f !== 'index.js')

for (const file of modalFiles) {
  const { default: modal } = await import(`./modals/${file}`)
  const name = path.parse(file).name
  client.modals.set(name, modal)
}

client.once('ready', async () => {
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
})

client.on('interactionCreate', async interaction => {
  const { default: handler } = await import('./events/interactionCreate.js')
  handler(client, interaction)
})

client.on('voiceStateUpdate', async (oldState, newState) => {
  const { default: handler } = await import('./events/voiceStateUpdate.js')
  handler(client, oldState, newState)
})

client.on('channelUpdate', async (oldChannel, newChannel) => {
  const { default: handler } = await import('./events/channelUpdate.js')
  handler(client, oldChannel, newChannel)
})

client.login(process.env.DISCORD_TOKEN)
