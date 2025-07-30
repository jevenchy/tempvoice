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

- Instantly creates voice channels
- Deletes empty rooms automatically
- Rename, limit users, change region/bitrate
- Lock, hide, or control chat access
- Trust, block, untrust, unblock users
- Kick, claim, or transfer ownership
- Send invite via DM in one click
- Multilingual: `en`, `id`, `ru`, `jp`, `cn`, `de`
- Logs every action

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
