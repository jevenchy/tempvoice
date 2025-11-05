import 'dotenv/config'
import { Client, GatewayIntentBits, Partials } from 'discord.js'
import initializeBot from './core/initializeBot.js'
import { logStartup } from './utils/logger.js'
import { validateEnv } from './utils/validateEnv.js'
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
    // Validate environment variables first
    validateEnv()

    await initializeBot(client)
    await client.login(process.env.DISCORD_TOKEN)
  } catch (err) {
    logStartup(err.message || t('invalid_token'))
    process.exit(1)
  }
}

start()
