const en = {
    // Dashboard
    "dashboard_title": "Tempvoice Dashboard",
    "dashboard_description": "Welcome to your Tempvoice dashboard — manage and customize your voice room.",
    "dashboard_create_link": "Your voice, your space. Start a room in https://discord.com/channels/{guildId}/{channelId}",
    "dashboard_footer": "Press the buttons below to manage your voice room.",
    "name_desc": "Change the voice channel name",
    "limit_desc": "Set the user limit for the channel",
    "privacy_desc": "Adjust channel privacy settings",
    "dnd_desc": "Toggle Do Not Disturb mode for your channel",
    "region_desc": "Change the voice region of your channel",
    "trust_desc": "Allow specific users to join and interact in the channel",
    "untrust_desc": "Remove trusted access from selected users",
    "block_desc": "Prevent users from seeing or joining the channel",
    "unblock_desc": "Restore visibility and access for blocked users",
    "bitrate_desc": "Adjust the audio quality of your channel",
    "invite_desc": "Send an invite to users to join your voice channel",
    "kick_desc": "Remove selected users from the voice channel",
    "claim_desc": "Take ownership of the channel if the owner has left",
    "transfer_desc": "Assign ownership of the channel to another user",
    "delete_desc": "Delete your temporary voice channel",
    "name": "Name",
    "limit": "Limit",
    "privacy": "Privacy",
    "dnd": "DND",
    "region": "Region",
    "trust": "Trust",
    "untrust": "Untrust",
    "block": "Block",
    "unblock": "Unblock",
    "bitrate": "Bitrate",
    "invite": "Invite",
    "kick": "Kick",
    "claim": "Claim",
    "transfer": "Transfer",
    "delete": "Delete",

    // Delete
    "deleted": "Deleted channel.",
    "log_deleted": "{channel} has been deleted.",

    // DND
    "dnd_on": "Do Not Disturb is now on. Others can join but won’t be able to speak or interact.",
    "dnd_off": "Do Not Disturb is now off. Others can speak and interact in your channel.",

    // Nname
    "invalid_name": "Please enter a valid name.",
    "channel_renamed": "Channel renamed to **{name}**.",
    "log_renamed": "{user} renamed the room to {name}",

    // Limit
    "invalid_limit": "Limit must be between 1–99.",
    "limit_updated": "User limit updated to {limit}.",
    "log_limit": "{user} set the limit to {limit} in {channel}.",

    // Claim
    "already_owner": "You already own this channel.",
    "owner_still_present": "The current owner is still in the voice channel.",
    "log_claimed": "{user} claimed ownership of the voice channel {channel}.",

    // Trust
    "trust_option": "Select someone you trust.",
    "trust_placeholder": "Select a user to trust",
    "trusted": "You’ve trusted {user}. They can now join the channel.",
    "log_trust": "{user} was trusted in {channel}.",

    // Untrust
    "untrust_option": "Select someone to untrust.",
    "untrust_placeholder": "Select a user to untrust",
    "untrusted": "You’ve untrusted {user}. They can no longer join the channel.",
    "log_untrust": "{user} was untrusted in {channel}.",

    // Block
    "block_option": "Select someone to block.",
    "block_placeholder": "Select a user to block",
    "blocked": "{user} has been blocked from viewing this channel.",
    "log_block": "{user} was blocked from {channel}.",

    // Unblock
    "unblock_option": "Select someone to unblock.",
    "unblock_placeholder": "Select a user to unblock",
    "unblocked": "{user} has been unblocked and their permissions have been reset.",
    "log_unblock": "{user} was unblocked from {channel}.",

    // Transfer
    "transfer_option": "Select someone to transfer ownership to.",
    "transfer_placeholder": "Choose a new channel owner",
    "no_user_to_transfer": "There's no one else in the channel to transfer ownership to.",
    "log_transfer": "{user} took ownership of {channel}.",

    // Kick
    "kick_option": "Select someone to kick.",
    "kick_placeholder": "Choose a user to kick",
    "user_not_found": "User not found in the channel.",
    "no_user_to_kick": "There's no one to kick.",
    "log_kick": "{user} was kicked from {channel}.",

    // Region
    "region_option": "Choose a voice region.",
    "region_placeholder": "Select a region",
    "region_updated": "Region updated to {region}.",
    "error_region": "An error occurred while updating the region.",
    "log_region": "{user} changed the region to {region} in {channel}.",

    // Bitrate
    "bitrate_option": "Choose a bitrate.",
    "bitrate_placeholder": "Select a bitrate",
    "bitrate_updated": "Bitrate set to {bitrate} kbps.",
    "error_bitrate": "An error occurred while updating the bitrate.",
    "log_bitrate": "{user} changed the bitrate to {bitrate} kbps in {channel}.",

    // Invite
    "invite_option": "Select someone to invite.",
    "invite_placeholder": "Invite someone to your voice channel",
    "invite_message": "You’ve been invited to join a voice channel: {name}\n{voiceLink}",
    "invited_user": "{user} was invited.",
    "error_send_invite": "Could not send invite to the user.",
    "error_user_dms_closed": "Cannot send a DM to this user. They may have DMs disabled or are a bot.",
    "log_invite": "{user} was invited to {channel}.",

    // Privacy
    "privacy_option": "Set the privacy — make it public or private.",
    "privacy_placeholder": "Select a privacy option",
    "privacy_lock_label": "Lock",
    "privacy_lock_desc": "Only trusted users can join",
    "privacy_lock": "Channel locked. Only trusted users can join.",
    "privacy_unlock_label": "Unlock",
    "privacy_unlock_desc": "Anyone can join your voice channel",
    "privacy_unlock": "Channel unlocked. Everyone can join.",
    "privacy_invisible_label": "Invisible",
    "privacy_invisible_desc": "Only trusted users can see your voice channel",
    "privacy_invisible": "Channel is now invisible to others.",
    "privacy_visible_label": "Visible",
    "privacy_visible_desc": "Everyone can see your voice channel",
    "privacy_visible": "Channel is now visible to everyone.",
    "privacy_closechat_label": "Close Chat",
    "privacy_closechat_desc": "Only trusted users can chat",
    "privacy_closechat": "Chat is closed. Only you and trusted users can chat.",
    "privacy_openchat_label": "Open Chat",
    "privacy_openchat_desc": "Everyone can send messages",
    "privacy_openchat": "Chat is open to everyone.",
    "log_privacy": "{user} changed the privacy to {value} in {channel}.",

    // Voice State Update
    "log_left": "{user} left {channel}.",
    "log_joined": "{user} joined {channel}.",
    "log_switched": "{user} switched from {from} to {to}.",
    "log_channel_already_deleted": "{channel} was already deleted.",
    "log_channel_delete_failed": "Failed to delete {channel}.",

    // General messages
    "not_owner": "You’re not the owner of this voice channel.",
    "invalid_user": "Invalid user. Please try again.",
    "not_in_channel": "You're not in a voice channel.",
    "different_channel": "You can’t use this feature in this voice channel.",
    "permissions_updated": "{user} updated permissions in {channel}.",
    "log_send_failed": "Failed to send log message: {error}",
    "missing_lang_key": "Missing translation key: {key}",
    "failed_load_modal": "Could not load modal: {file}",    
    "interaction_timeout": "Interaction timed out due to inactivity.",
    "error_interaction": "Something went wrong. Please try again later.",
    "interaction_already_active": "There's already an active interaction. Please complete it before starting a new one.",
    "invalid_category": "CATEGORY_CHANNEL_ID is invalid or not a category.",
    "invalid_embed": "EMBED_CHANNEL_ID is invalid or not a text channel.",
    "invalid_voice": "VOICE_CHANNEL_ID is invalid or not a voice channel."
}

export default en