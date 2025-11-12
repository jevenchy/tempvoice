# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-11-05

### Added
- **SQLite Database Persistence**: All temporary channels are now persisted to a database, surviving bot restarts
- **Multi-Guild Support**: Bot can now manage multiple Discord servers with per-guild configurations
- **Rate Limiting**: Protection against button spam (5 requests per 10 seconds)
- **Maximum Channel Limits**: Users are limited to 3 active temporary channels to prevent abuse
- **Content Filtering**: Inappropriate channel names are automatically blocked (profanity, URLs, Discord invites)
- **Auto-Cleanup System**: Inactive channels (24+ hours with no activity) are automatically deleted
- **Permission Validation**: Bot validates required permissions on startup and provides clear error messages
- **Environment Variable Validation**: Comprehensive validation of `.env` configuration with helpful error messages
- **Channel Activity Tracking**: Database tracks last activity time for each temporary channel
- **Statistics System**: Track usage metrics (channel creations, user activity, etc.)
- **Constants File**: Centralized configuration constants for easier customization
- **Improved Logging**: Better structured console output with emojis and timestamps

### Changed
- **Updated discord.js**: Bumped from 14.14.1 to 14.16.3 for latest features and security fixes
- **Event Handler Optimization**: Event handlers are now loaded once on startup instead of on every event (better performance)
- **Memory Leak Fix**: Implemented bounded set for deletion logging to prevent unbounded memory growth
- **Race Condition Fix**: Added locking mechanism to prevent duplicate channel creation when users join simultaneously
- **Enhanced Error Handling**: Better error messages throughout the codebase with proper logging
- **JSDoc Comments**: Added comprehensive documentation to all major functions

### Removed
- **Moment.js dependency**: Replaced with native JavaScript date functions (lighter bundle)

### Fixed
- Memory leak in `voiceStateUpdate.js` where deleted channel IDs were stored indefinitely
- Race condition that could cause duplicate channels when multiple users joined trigger channel simultaneously
- Missing error handling in various catch blocks
- Inconsistent error messages

### Security
- Added content filtering to prevent inappropriate channel names
- Implemented rate limiting to prevent API abuse
- Added user channel limits to prevent resource exhaustion
- Validated bot permissions on startup

## [1.4.0] - Previous Release

### Added
- German language support
- Icon customization for buttons
- ARM support for Docker images

### Changed
- Updated Docker configuration
- README improvements

## [1.3.0] and earlier

See git history for changes in earlier versions.

---

## Migration Guide: 1.4.0 → 2.0.0

### Breaking Changes
1. **New Dependency**: Install `better-sqlite3` for database support
   ```bash
   npm install
   ```

2. **Data Directory**: The bot now creates a `./data` directory for the SQLite database
   - Ensure write permissions in the bot's directory
   - Add `data/` to your `.gitignore` if not already present

3. **First Run After Upgrade**:
   - Existing temp channels will NOT be in the database initially
   - They will be added to the database as users interact with them
   - Old orphaned channels can be manually deleted or will auto-cleanup after 24 hours

### New Features to Configure

1. **Rate Limiting** (optional customization in `src/constants.js`):
   ```javascript
   RATE_LIMIT_WINDOW = 10000 // milliseconds
   RATE_LIMIT_MAX_REQUESTS = 5 // requests per window
   ```

2. **Channel Limits** (optional customization in `src/constants.js`):
   ```javascript
   MAX_CHANNELS_PER_USER = 3 // maximum active channels per user
   AUTO_CLEANUP_TIMEOUT = 24 * 60 * 60 * 1000 // 24 hours
   ```

3. **Content Filter**: Edit blacklist patterns in `src/utils/contentFilter.js` if needed

### Recommended Actions After Upgrade

1. **Test Permission Validation**:
   - The bot will now validate permissions on startup
   - Ensure the bot has all required permissions in the category channel

2. **Monitor Auto-Cleanup**:
   - Auto-cleanup runs every hour
   - Check logs for cleanup activity

3. **Review Database**:
   - Database file: `./data/tempvoice.db`
   - Can be backed up regularly for data persistence

4. **Update Documentation**:
   - Inform your users about the new 3-channel limit
   - Explain the auto-cleanup feature
