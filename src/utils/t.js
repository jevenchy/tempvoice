import lang from '../../language/language.js'

export default (key, language = 'en', values = {}) => {
  let str = lang[language]?.[key] || lang.en?.[key] || key
  for (const [k, v] of Object.entries(values)) {
    str = str.replace(`{${k}}`, v)
  }
  return str
}
