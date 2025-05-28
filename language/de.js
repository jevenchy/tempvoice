const de = {
    // Dashboard
    "dashboard_title": "Tempvoice Dashboard",
    "dashboard_description": "Willkommen in deinem Tempvoice-Dashboard – verwalte und passe deinen Sprachraum an.",
    "dashboard_create_link": "Deine Stimme, dein Raum. Starte einen Raum in https://discord.com/channels/{guildId}/{channelId}",
    "dashboard_footer": "Nutze die Schaltflächen unten, um deinen Sprachraum zu verwalten.",
    "name_desc": "Namen des Sprachkanals ändern",
    "limit_desc": "Benutzerlimit für den Kanal festlegen",
    "privacy_desc": "Privatsphäre-Einstellungen für den Kanal anpassen",
    "dnd_desc": "Nicht stören-Modus für deinen Kanal umschalten",
    "region_desc": "Region deines Sprachkanals ändern",
    "trust_desc": "Bestimmten Nutzern den Zutritt erlauben",
    "untrust_desc": "Vertrauen für ausgewählte Nutzer entfernen",
    "block_desc": "Nutzer am Betreten oder Sehen des Kanals hindern",
    "unblock_desc": "Blockierung für Nutzer aufheben",
    "bitrate_desc": "Audioqualität (Bitrate) anpassen",
    "invite_desc": "Nutzer zum Sprachkanal einladen",
    "kick_desc": "Nutzer aus dem Sprachkanal entfernen",
    "claim_desc": "Besitz des Kanals übernehmen",
    "transfer_desc": "Besitz des Kanals übertragen",
    "delete_desc": "Temporären Sprachkanal löschen",
    "name": "Name",
    "limit": "Limit",
    "privacy": "Privatsphäre",
    "dnd": "Nicht stören",
    "region": "Region",
    "trust": "Vertrauen",
    "untrust": "Enttrauen",
    "block": "Blockieren",
    "unblock": "Entblocken",
    "bitrate": "Bitrate",
    "invite": "Einladen",
    "kick": "Rauswerfen",
    "claim": "Übernehmen",
    "transfer": "Übertragen",
    "delete": "Löschen",

    // Delete
    "deleted": "Kanal gelöscht.",
    "log_deleted": "{channel} wurde gelöscht.",

    // DND
    "dnd_on": "Nicht stören ist jetzt aktiviert. Andere können beitreten, aber nicht sprechen oder interagieren.",
    "dnd_off": "Nicht stören ist jetzt deaktiviert. Andere können sprechen und im Kanal interagieren.",

    // Name
    "invalid_name": "Bitte gib einen gültigen Namen ein.",
    "channel_renamed": "Kanal wurde in **{name}** umbenannt.",
    "log_renamed": "{user} hat den Raum in {name} umbenannt.",

    // Limit
    "invalid_limit": "Das Limit muss zwischen 1 und 99 liegen.",
    "limit_updated": "Benutzerlimit auf {limit} gesetzt.",
    "log_limit": "{user} hat das Limit in {channel} auf {limit} gesetzt.",

    // Claim
    "already_owner": "Du bist bereits der Besitzer dieses Kanals.",
    "owner_still_present": "Der aktuelle Besitzer ist noch im Sprachkanal.",
    "log_claimed": "{user} hat den Besitz des Sprachkanals {channel} übernommen.",

    // Trust
    "trust_option": "Wähle jemanden, dem du vertraust.",
    "trust_placeholder": "Nutzer zum Vertrauen auswählen",
    "trusted": "{user} ist nun vertrauenswürdig und kann dem Kanal beitreten.",
    "log_trust": "{user} wurde in {channel} als vertrauenswürdig markiert.",

    // Untrust
    "untrust_option": "Wähle jemanden, dem du das Vertrauen entziehst.",
    "untrust_placeholder": "Nutzer zum Enttrauen auswählen",
    "untrusted": "Du hast {user} das Vertrauen entzogen.",
    "log_untrust": "{user} wurde in {channel} das Vertrauen entzogen.",

    // Block
    "block_option": "Wähle jemanden zum Blockieren.",
    "block_placeholder": "Nutzer zum Blockieren auswählen",
    "blocked": "{user} wurde für diesen Kanal blockiert.",
    "log_block": "{user} wurde in {channel} blockiert.",

    // Unblock
    "unblock_option": "Wähle jemanden zum Entblocken.",
    "unblock_placeholder": "Nutzer zum Entblocken auswählen",
    "unblocked": "{user} wurde entblockt und Berechtigungen zurückgesetzt.",
    "log_unblock": "{user} wurde in {channel} entblockt.",

    // Transfer
    "transfer_option": "Wähle jemanden, dem du den Kanal übergeben möchtest.",
    "transfer_placeholder": "Neuen Besitzer auswählen",
    "no_user_to_transfer": "Es ist niemand sonst im Kanal, dem du den Besitz übertragen könntest.",
    "log_transfer": "{user} hat den Besitz von {channel} übernommen.",

    // Kick
    "kick_option": "Wähle jemanden zum Rauswerfen.",
    "kick_placeholder": "Nutzer zum Rauswerfen auswählen",
    "user_not_found": "Nutzer nicht im Kanal gefunden.",
    "no_user_to_kick": "Es gibt niemanden zum Rauswerfen.",
    "log_kick": "{user} wurde aus {channel} entfernt.",

    // Region
    "region_option": "Wähle eine Sprachregion.",
    "region_placeholder": "Region auswählen",
    "region_updated": "Region auf {region} aktualisiert.",
    "error_region": "Beim Ändern der Region ist ein Fehler aufgetreten.",
    "log_region": "{user} hat die Region in {channel} auf {region} geändert.",

    // Bitrate
    "bitrate_option": "Wähle eine Bitrate.",
    "bitrate_placeholder": "Bitrate auswählen",
    "bitrate_updated": "Bitrate auf {bitrate} kbps gesetzt.",
    "error_bitrate": "Beim Ändern der Bitrate ist ein Fehler aufgetreten.",
    "log_bitrate": "{user} hat die Bitrate in {channel} auf {bitrate} kbps geändert.",

    // Invite
    "invite_option": "Wähle jemanden zum Einladen.",
    "invite_placeholder": "Nutzer zum Einladen auswählen",
    "invite_message": "Du wurdest in einen Sprachkanal eingeladen: {name}\n{voiceLink}",
    "invited_user": "{user} wurde eingeladen.",
    "error_send_invite": "Einladung konnte nicht gesendet werden.",
    "error_user_dms_closed": "Dem Nutzer konnte keine DM gesendet werden.",
    "log_invite": "{user} wurde in {channel} eingeladen.",

    // Privacy
    "privacy_option": "Privatsphäre einstellen – öffentlich oder privat.",
    "privacy_placeholder": "Privatsphäre-Option wählen",
    "privacy_lock_label": "Sperren",
    "privacy_lock_desc": "Nur vertrauenswürdige Nutzer können beitreten",
    "privacy_lock": "Kanal gesperrt. Nur vertrauenswürdige Nutzer können beitreten.",
    "privacy_unlock_label": "Entsperren",
    "privacy_unlock_desc": "Jeder kann deinem Sprachkanal beitreten",
    "privacy_unlock": "Kanal entsperrt. Jeder kann beitreten.",
    "privacy_invisible_label": "Unsichtbar",
    "privacy_invisible_desc": "Nur vertrauenswürdige Nutzer sehen deinen Sprachkanal",
    "privacy_invisible": "Kanal ist nun für andere unsichtbar.",
    "privacy_visible_label": "Sichtbar",
    "privacy_visible_desc": "Jeder kann deinen Sprachkanal sehen",
    "privacy_visible": "Kanal ist jetzt für alle sichtbar.",
    "privacy_closechat_label": "Chat schließen",
    "privacy_closechat_desc": "Nur vertrauenswürdige Nutzer können chatten",
    "privacy_closechat": "Chat geschlossen. Nur du und vertrauenswürdige Nutzer können chatten.",
    "privacy_openchat_label": "Chat öffnen",
    "privacy_openchat_desc": "Jeder kann Nachrichten senden",
    "privacy_openchat": "Chat ist für alle offen.",
    "log_privacy": "{user} hat die Privatsphäre in {channel} auf {value} geändert.",

    // Voice State Update
    "log_left": "{user} hat {channel} verlassen.",
    "log_joined": "{user} ist {channel} beigetreten.",
    "log_switched": "{user} ist von {from} zu {to} gewechselt.",
    "log_channel_already_deleted": "{channel} war bereits gelöscht.",
    "log_channel_delete_failed": "{channel} konnte nicht gelöscht werden.",

    // General messages
    "not_owner": "Du bist nicht der Besitzer dieses Sprachkanals.",
    "invalid_user": "Ungültiger Nutzer. Bitte versuche es erneut.",
    "not_in_channel": "Du befindest dich in keinem Sprachkanal.",
    "different_channel": "Du kannst diese Funktion nicht in diesem Sprachkanal nutzen.",
    "permissions_updated": "{user} hat die Berechtigungen in {channel} aktualisiert.",
    "log_send_failed": "Fehler beim Senden der Lognachricht: {error}",
    "missing_lang_key": "Fehlender Übersetzungsschlüssel: {key}",
    "failed_load_modal": "Konnte das Modal nicht laden: {file}",
    "interaction_timeout": "Die Interaktion wurde wegen Inaktivität beendet.",
    "error_interaction": "Etwas ist schiefgelaufen. Bitte versuche es später noch einmal.",
    "interaction_already_active": "Es gibt bereits eine aktive Interaktion. Bitte beende sie zuerst.",
    "invalid_category": "CATEGORY_CHANNEL_ID ist ungültig oder keine Kategorie.",
    "invalid_embed": "EMBED_CHANNEL_ID ist ungültig oder kein Textkanal.",
    "invalid_voice": "VOICE_CHANNEL_ID ist ungültig oder kein Sprachkanal."
}

export default de;
