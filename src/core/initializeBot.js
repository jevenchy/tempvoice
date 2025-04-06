import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { Collection } from 'discord.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default async function initializeBot(client) {
  client.activeInteractions = new Set()
  client.modals = new Collection()
  client.tempVoiceOwners = new Map()

  const modalsDir = path.join(__dirname, '../modals')
  const modalFiles = fs.readdirSync(modalsDir).filter(f => f.endsWith('.js') && f !== 'index.js')

  for (const file of modalFiles) {
    const { default: modal } = await import(`../modals/${file}`)
    const name = path.parse(file).name
    client.modals.set(name, modal)
  }

  client.once('ready', async () => {
    const { default: handleReady } = await import('../events/ready.js')
    handleReady(client)
  })

  client.on('interactionCreate', async interaction => {
    const { default: handler } = await import('../events/interactionCreate.js')
    handler(client, interaction)
  })

  client.on('voiceStateUpdate', async (oldState, newState) => {
    const { default: handler } = await import('../events/voiceStateUpdate.js')
    handler(client, oldState, newState)
  })

  client.on('channelUpdate', async (oldChannel, newChannel) => {
    const { default: handler } = await import('../events/channelUpdate.js')
    handler(client, oldChannel, newChannel)
  })
}
