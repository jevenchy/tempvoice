import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { Collection } from 'discord.js'
import handleReady from '../events/ready.js'
import handleInteractionCreate from '../events/interactionCreate.js'
import handleVoiceStateUpdate from '../events/voiceStateUpdate.js'
import handleChannelUpdate from '../events/channelUpdate.js'
import { initDatabase, loadTempChannelsToMemory } from '../utils/database.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Initializes the Discord bot with all required handlers and configurations
 * @param {Client} client - Discord.js client instance
 */
export default async function initializeBot(client) {
  // Initialize database
  initDatabase()

  client.activeInteractions = new Set()
  client.modals = new Collection()

  // Load temp channels from database into memory
  client.tempVoiceOwners = loadTempChannelsToMemory()

  // Load all modal handlers dynamically
  const modalsDir = path.join(__dirname, '../modals')
  const modalFiles = fs.readdirSync(modalsDir).filter(f => f.endsWith('.js') && f !== 'index.js')

  for (const file of modalFiles) {
    const { default: modal } = await import(`../modals/${file}`)
    const name = path.parse(file).name
    client.modals.set(name, modal)
  }

  // Register event handlers (imported once, not on every event)
  client.once('ready', () => handleReady(client))
  client.on('interactionCreate', interaction => handleInteractionCreate(client, interaction))
  client.on('voiceStateUpdate', (oldState, newState) => handleVoiceStateUpdate(client, oldState, newState))
  client.on('channelUpdate', (oldChannel, newChannel) => handleChannelUpdate(client, oldChannel, newChannel))
}
