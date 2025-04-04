import fs from 'fs'
import path from 'path'
import t from '../utils/t.js'
import config from '../config/config.js'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const modals = new Map()

for (const file of fs.readdirSync(__dirname)) {
  if (!file.endsWith('.js') || file === 'index.js') continue

  try {
    const { default: modal } = await import(`./${file}`)
    if (modal?.customId && typeof modal.execute === 'function') {
      modals.set(modal.customId, modal)
    }
  } catch (err) {
    console.error(t('failed_load_modal', config.language, { file }), err)
  }
}

export default modals
