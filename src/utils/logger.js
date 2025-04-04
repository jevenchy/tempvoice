import config from '../../config/config.js'
import lang from '../../language/language.js'
import t from './t.js'

const label = config.label || 'TempVoice'

const now = () => new Date().toISOString().replace('T', ' ').split('.')[0]

export const logStartup = msg => {
  console.log(`${now()} INFO    ${label.padEnd(3)} - ${msg}`)
}

export const log = (key, client, data = {}) => {
  if (!config.log) return

  const tKey = t(key, config.language)
  if (!tKey) {
    const fallback = t('missing_lang_key', config.language, { key })
    console.warn(`${now()} WARN    ${label.padEnd(3)} - ${fallback}`)
    return
  }

  const template = lang[config.language]?.[key] || key
  const message = template.replace(/\{(\w+)\}/g, (_, k) => data[k] || `{${k}}`)

  const channelId = process.env.LOG_CHANNEL_ID
  const logChannel = client.channels.cache.get(channelId)

  if (logChannel) {
    logChannel.send(message).catch(err => {
      const errMsg = t('log_send_failed', config.language, { error: err.message })
      console.error(`${now()} ERROR   ${label.padEnd(3)} - ${errMsg}`)
    })
  }

  console.log(`${now()} LOG     ${label.padEnd(3)} - ${message}`)
}
