# Use the official Node.js 18 image as base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (only production packages)
RUN npm install --production

# Copy the remaining application code
COPY . .

# Set environment variables (should be set at runtime)
# ENV DISCORD_TOKEN=your_token
# ENV GUILD_ID=your_guild_id
# ENV HUB_VC_CHANNEL_ID=your_hub_vc_channel_id
# ENV DEFAULT_ROLE_ID=your_default_role_id
# ENV CATEGORY_ID=your_category_id
# ENV OWNERS=owner_id1,owner_id2

# No port needs to be exposed since Discord bots initiate outgoing connections

# Add a simple healthcheck to verify if the bot process is running
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD pgrep -f "node src/index.js" || exit 1

# Declare the config directory as a volume so it can be modified externally
VOLUME ["/app/config"]

# Start the bot
CMD ["node", "src/index.js"]
