<h1 align="center">
  <br>
  <a href="https://github.com/jevenchy"><img src="img/bot_avatar.png" width="250" height="250" alt="TempVoice-bot"></a>
  <br>
  TempVoice-bot
  <br>
</h1>

<p align="center">A dynamic voice channel solution for Discord — temporary, controllable, and multilingual.</p>

<p align="center">
  <img src="https://img.shields.io/badge/lang-JavaScript-yellow" />
  <img src="https://img.shields.io/badge/multilingual-yes-green" />
  <img src="https://img.shields.io/badge/version-v1.4.0-blue" />
  <img src="https://img.shields.io/badge/Jevenchy-black" />
</p>

## Overview

TempVoice is the easiest way for users to own their space.
Join once and get your own voice room — private, customizable, and temporary. Take charge in seconds: rename it, lock it down, invite who you want, and block who you don’t. No commands. No distractions.

## Features

![Bot in action](img/bot_example.gif)

### Core Features
- ⚡ Instantly creates voice channels
- 🗑️ Deletes empty rooms automatically
- ✏️ Rename, limit users, change region/bitrate
- 🔒 Lock, hide, or control chat access
- 👥 Trust, block, untrust, unblock users
- 👢 Kick, claim, or transfer ownership
- 📬 Send invite via DM in one click
- 🌍 Multilingual: `en`, `id`, `ru`, `jp`, `cn`, `de`
- 📝 Logs every action

### New in v2.0.0
- 💾 **Database Persistence** - Channels survive bot restarts
- 🛡️ **Rate Limiting** - Protection against button spam
- 🚫 **Content Filter** - Blocks inappropriate channel names
- 🧹 **Auto-Cleanup** - Removes inactive channels after 24 hours
- 📊 **Usage Limits** - Max 3 channels per user to prevent abuse
- ✅ **Permission Validation** - Checks required permissions on startup
- 🔍 **Enhanced Error Messages** - Clear feedback when something goes wrong

## Setup

```bash
npm install
cp env.example .env
```

Edit `.env` with your bot credentials:

```env
DISCORD_TOKEN=your_token_here
GUILD_ID=...
CATEGORY_CHANNEL_ID=...
EMBED_CHANNEL_ID=...
VOICE_CHANNEL_ID=...
LOG_CHANNEL_ID=...
BANNER_URL=...
USE_UNICODE_EMOJI=true
```

`BANNER_URL` lets you specify a custom image for the embed banner.

`USE_UNICODE_EMOJI` toggles Unicode emoji for dashboard buttons.

Start the bot:

```bash
npm start
```

## Running with Docker Compose

Copy `env.example` to `.env` and edit the credentials for your bot:

```bash
cp env.example .env
# then update .env with your Discord token and channel IDs
```

Start the container:

```bash
docker compose up -d
```

Docker builds the image from the included `Dockerfile` and reads configuration
from your `.env` file.

## File Structure

```
tempvoice/
├── config/                 # Global configuration
├── img/                    # Assets (bot avatar, demo embed)
├── language/               # Translations (multilingual support)
└── src/
    ├── core/               # Client setup and modular event binding
    ├── events/             # Discord event listeners
    ├── modals/             # Modal logic
    ├── handlers/           # Embed sender and interaction controller
    └── utils/              # Logger, translation function, embed builder
```

## Customization

Adjust bot behavior easily through `config/config.js`:

```js
export default {
  language: 'en',        // Language (en, id, ru, jp, cn, de)
  embedcode: '#2f3136',  // Default embed color
  log: true              // Enable or disable action logging
}
```

## Philosophy

TempVoice was designed to feel native — built to blend in. No commands. No clutter. Every interaction is ephemeral, visual, and smooth. Let users manage their voice room like it's theirs — because it is.

## Configuration

You can customize bot behavior in `config/config.js`:

```js
export default {
  language: 'en',        // Language (en, id, ru, jp, cn, de)
  embedcode: '#2f3136',  // Default embed color
  log: true              // Enable or disable action logging
}
```

Advanced settings can be adjusted in `src/constants.js`:

```js
MAX_CHANNELS_PER_USER = 3           // Max channels per user
RATE_LIMIT_MAX_REQUESTS = 5         // Max button clicks per window
RATE_LIMIT_WINDOW = 10000           // Rate limit window (ms)
AUTO_CLEANUP_TIMEOUT = 24 * 60 * 60 * 1000  // Auto-delete after 24 hours
MAX_CHANNEL_NAME_LENGTH = 100       // Max characters in channel name
```

## Troubleshooting

### Bot doesn't start

**Error: Missing required environment variables**
```
Solution: Check your .env file has all required variables:
- DISCORD_TOKEN
- GUILD_ID
- CATEGORY_CHANNEL_ID
- EMBED_CHANNEL_ID
- VOICE_CHANNEL_ID
```

**Error: Missing permissions in category**
```
Solution: The bot needs these permissions in the category channel:
- View Channel
- Manage Channels
- Move Members
- Connect
- Send Messages

Grant these permissions and restart the bot.
```

**Error: Cannot access guild/channels**
```
Solution:
1. Ensure the bot is invited to your server
2. Check that GUILD_ID matches your server ID
3. Verify channel IDs are correct
4. Make sure channels are not deleted
```

### Channels not being created

**Symptom: Nothing happens when joining the voice channel**
```
Solutions:
1. Check VOICE_CHANNEL_ID is correct
2. Ensure CATEGORY_CHANNEL_ID exists and bot can access it
3. Verify bot has "Manage Channels" permission
4. Check bot logs for error messages
```

**Symptom: "You've reached the maximum limit of 3 channels"**
```
Solution: You have 3 active temp channels. Close one before creating another.
To change this limit, edit MAX_CHANNELS_PER_USER in src/constants.js
```

### Buttons not working

**Symptom: "You're doing that too fast!"**
```
Solution: You're being rate limited. Wait 10 seconds and try again.
This prevents spam. Can be adjusted in src/constants.js
```

**Symptom: Buttons don't respond**
```
Solutions:
1. Ensure you're in a temp voice channel (not the trigger channel)
2. Make sure you're the owner of the channel (or using "claim")
3. Check bot has "Send Messages" permission in embed channel
4. Verify bot is online and not restarting
```

### Database issues

**Error: Cannot create database**
```
Solution:
1. Ensure bot has write permissions in its directory
2. Check ./data directory exists or can be created
3. On Linux: chmod +w ./data
```

**Symptom: Channels disappear after bot restart**
```
Solution: This shouldn't happen in v2.0+. If it does:
1. Check ./data/tempvoice.db exists
2. Verify file has correct permissions
3. Check logs for database errors
```

### Performance issues

**Symptom: Bot is slow or laggy**
```
Solutions:
1. Check CPU/RAM usage
2. Auto-cleanup runs every hour - this is normal
3. Review database size (can be large with high usage)
4. Consider upgrading hosting if needed
```

**Symptom: "Unknown Channel" errors**
```
Solution: This happens when Discord's cache is outdated.
Usually harmless and self-resolves. If persistent, restart the bot.
```

### Docker-specific issues

**Error: Container keeps restarting**
```
Solutions:
1. Check docker logs: docker logs tempvoice-bot-1
2. Ensure .env file is properly mounted
3. Verify all environment variables are set
4. Check file permissions on host
```

**Error: Database not persisting**
```
Solution: Ensure data volume is properly mounted in docker-compose.yml:
volumes:
  - ./data:/app/data
```

### Still having issues?

1. **Check the logs**: Look for error messages in the console
2. **Enable debug logging**: Set `log: true` in config/config.js
3. **Verify permissions**: Use Discord's permission calculator
4. **Test in a clean environment**: Create a new test server
5. **Check Discord API status**: https://discordstatus.com
6. **Open an issue**: https://github.com/SoulofSorrow/tempvoice/issues

Include in your issue report:
- Node.js version (`node --version`)
- Error messages from logs
- Steps to reproduce
- Your configuration (without sensitive data)

## Performance Notes

- **Memory**: ~50-100MB for normal usage
- **Database**: Grows with usage, ~1KB per channel tracked
- **Auto-cleanup**: Runs every hour, cleans channels inactive for 24+ hours
- **Rate limiting**: 5 requests per 10 seconds per user
- **Maximum channels**: 3 per user (configurable)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and migration guides.

## License

MIT License - see LICENSE file for details
