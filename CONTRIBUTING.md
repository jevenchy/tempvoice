# Contributing to TempVoice

Thank you for your interest in contributing to TempVoice! This document provides guidelines and instructions for contributing.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Style](#code-style)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

### Prerequisites
- Node.js >= 18.0.0
- npm or yarn
- A Discord bot token for testing
- A test Discord server

### Setup Development Environment

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/tempvoice.git
   cd tempvoice
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp env.example .env
   # Edit .env with your test bot credentials
   ```

4. **Run the bot**
   ```bash
   npm start
   ```

5. **Run linter**
   ```bash
   npm run lint
   ```

## Development Workflow

### Branching Strategy
- `main` - Production-ready code
- `develop` - Development branch (if applicable)
- `feature/your-feature-name` - Feature branches
- `fix/bug-description` - Bug fix branches

### Making Changes

1. **Create a new branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

2. **Make your changes**
   - Write clear, commented code
   - Follow the existing code style
   - Add JSDoc comments to functions
   - Test your changes thoroughly

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

   **Commit Message Format:**
   - `feat:` - New feature
   - `fix:` - Bug fix
   - `docs:` - Documentation changes
   - `style:` - Code style changes (formatting, etc.)
   - `refactor:` - Code refactoring
   - `test:` - Adding or updating tests
   - `chore:` - Maintenance tasks

4. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

5. **Create a Pull Request**
   - Use a clear, descriptive title
   - Describe what changes you made and why
   - Reference any related issues

## Code Style

### JavaScript/ES6+
- Use ES6+ features (arrow functions, destructuring, etc.)
- Use `const` by default, `let` when reassignment is needed
- No `var`
- Use template literals for string interpolation
- Prefer async/await over raw promises

### Naming Conventions
- **Variables/Functions**: `camelCase`
- **Constants**: `UPPER_SNAKE_CASE`
- **Classes**: `PascalCase`
- **Files**: `camelCase.js` for utilities, `PascalCase.js` for classes

### Code Organization
- Keep functions small and focused (single responsibility)
- Extract magic numbers to `src/constants.js`
- Add comments for complex logic
- Use JSDoc for function documentation

### Example JSDoc:
```javascript
/**
 * Creates a temporary voice channel for a user
 * @param {GuildMember} member - Discord guild member
 * @param {VoiceChannel} triggerChannel - The channel that triggered creation
 * @returns {Promise<VoiceChannel>} The created temporary channel
 */
async function createTempChannel(member, triggerChannel) {
  // Implementation
}
```

## Project Structure

```
src/
├── constants.js          # Application constants
├── index.js              # Entry point
├── core/
│   └── initializeBot.js  # Bot initialization
├── events/               # Discord event handlers
│   ├── ready.js
│   ├── interactionCreate.js
│   ├── voiceStateUpdate.js
│   └── channelUpdate.js
├── modals/               # Button/Modal interaction handlers
│   ├── name.js
│   ├── limit.js
│   └── ...
├── handlers/             # Specialized handlers
│   └── embedSender.js
└── utils/                # Utility functions
    ├── database.js       # Database operations
    ├── logger.js         # Logging utilities
    ├── rateLimit.js      # Rate limiting
    ├── contentFilter.js  # Content filtering
    └── ...
```

## Testing

### Manual Testing Checklist
- [ ] Bot starts without errors
- [ ] Channel creation works
- [ ] All buttons function correctly
- [ ] Permissions are properly applied
- [ ] Rate limiting works as expected
- [ ] Content filter blocks inappropriate names
- [ ] Auto-cleanup removes old channels
- [ ] Database persists data across restarts

### Adding Tests (Future)
We're working on adding automated tests. When submitting new features, please consider:
- Edge cases
- Error scenarios
- Permission edge cases
- Rate limit scenarios

## Submitting Changes

### Pull Request Guidelines

1. **Update Documentation**
   - Update README.md if you added features
   - Add entries to CHANGELOG.md
   - Update JSDoc comments

2. **Test Thoroughly**
   - Test on a real Discord server
   - Check for console errors
   - Verify no regressions in existing features

3. **Keep PRs Focused**
   - One feature/fix per PR
   - Avoid mixing refactoring with new features

4. **Respond to Feedback**
   - Be open to suggestions
   - Make requested changes promptly
   - Explain your reasoning if you disagree

### What to Expect

- Initial review within a few days
- Possible requests for changes
- Merge once approved by maintainers

## Adding New Features

### New Modal/Button Feature

1. Create handler in `src/modals/yourfeature.js`
2. Follow existing modal structure
3. Add translation keys to language files
4. Test all interaction flows

### New Language Support

1. Create `language/xx.js` (xx = language code)
2. Copy structure from `language/en.js`
3. Translate all keys
4. Test thoroughly
5. Update README with new language

### Database Changes

1. Update schema in `src/utils/database.js`
2. Ensure backward compatibility
3. Add migration logic if needed
4. Document in CHANGELOG

## Getting Help

- Open an issue for questions
- Join discussions in Issues/PRs
- Be patient and respectful

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to TempVoice! 🎉
