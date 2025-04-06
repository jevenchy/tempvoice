import 'dotenv/config'
import { Client, GatewayIntentBits, Partials } from 'discord.js'
import initializeBot from './core/initializeBot.js'
import { logStartup } from './utils/logger.js'
import t from './utils/t.js'

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel]
})

const start = async () => {
  try {
    if (!process.env.DISCORD_TOKEN) throw new Error('MISSING_TOKEN')

    await initializeBot(client)
    await client.login(process.env.DISCORD_TOKEN)
  } catch {
    logStartup(t('invalid_token'))
    process.exit(1)
  }
}

start()
