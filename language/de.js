const de = {
  // Dashboard
  "dashboard_title": "Tempvoice-Dashboard",
  "dashboard_description": "Willkommen in deinem Tempvoice-Dashboard – verwalte und passe deinen Sprachkanal an.",
  "dashboard_create_link": "Deine Stimme, dein Raum. Starte einen Kanal in https://discord.com/channels/{guildId}/{channelId}",
  "dashboard_footer": "Nutze die Schaltflächen unten, um deinen Sprachkanal zu verwalten.",
  "name_desc": "Namen des Sprachkanals ändern",
  "limit_desc": "Nutzerlimit für den Kanal festlegen",
  "privacy_desc": "Privatsphäre-Einstellungen für den Kanal anpassen",
  "dnd_desc": "Nicht-stören-Modus für den Kanal ein-/ausschalten",
  "region_desc": "Region des Sprachkanals ändern",
  "trust_desc": "Bestimmten Nutzern den Zutritt erlauben",
  "untrust_desc": "Zugriffsrechte für bestimmte Nutzer entziehen",
  "block_desc": "Nutzer vom Kanal ausschließen",
  "unblock_desc": "Zugang und Sichtbarkeit für gesperrte Nutzer wiederherstellen",
  "bitrate_desc": "Audioqualität des Kanals anpassen",
  "invite_desc": "Nutzer zum Sprachkanal einladen",
  "kick_desc": "Ausgewählte Nutzer aus dem Sprachkanal entfernen",
  "claim_desc": "Kanal übernehmen, wenn der Besitzer gegangen ist",
  "transfer_desc": "Besitz des Kanals an einen anderen Nutzer übertragen",
  "delete_desc": "Temporären Sprachkanal löschen",
  "name": "Name",
  "limit": "Limit",
  "privacy": "Privatsphäre",
  "dnd": "Nicht stören",
  "region": "Region",
  "trust": "Vertrauen",
  "untrust": "Entfernen",
  "block": "Blockieren",
  "unblock": "Entblocken",
  "bitrate": "Bitrate",
  "invite": "Einladen",
  "kick": "Kicken",
  "claim": "Übernehmen",
  "transfer": "Übertragen",
  "delete": "Löschen",

  // Delete
  "deleted": "Kanal gelöscht.",
  "log_deleted": "{channel} wurde gelöscht.",

  // DND
  "dnd_on": "Nicht-stören-Modus ist aktiviert. Andere können beitreten, aber nicht sprechen oder interagieren.",
  "dnd_off": "Nicht-stören-Modus ist deaktiviert. Andere können jetzt sprechen und interagieren.",

  // Name
  "invalid_name": "Bitte gib einen gültigen Namen ein.",
  "channel_renamed": "Kanal wurde in **{name}** umbenannt.",
  "log_renamed": "{user} hat den Raum in {name} umbenannt.",

  // Limit
  "invalid_limit": "Das Limit muss zwischen 1 und 99 liegen.",
  "limit_updated": "Nutzerlimit wurde auf {limit} gesetzt.",
  "log_limit": "{user} hat das Limit in {channel} auf {limit} gesetzt.",

  // Claim
  "already_owner": "Du bist bereits der Besitzer dieses Kanals.",
  "owner_still_present": "Der aktuelle Besitzer ist noch im Sprachkanal.",
  "log_claimed": "{user} hat den Kanal {channel} übernommen.",

  // Trust
  "trust_option": "Wähle einen Nutzer, dem du vertraust.",
  "trust_placeholder": "Nutzer zum Vertrauen auswählen",
  "trusted": "{user} wurde vertraut. Er kann dem Kanal jetzt beitreten.",
  "log_trust": "{user} wurde in {channel} vertraut.",

  // Untrust
  "untrust_option": "Wähle einen Nutzer, dem du nicht mehr vertraust.",
  "untrust_placeholder": "Nutzer auswählen",
  "untrusted": "{user} wurde das Vertrauen entzogen. Kein Zutritt mehr zum Kanal.",
  "log_untrust": "{user} wurde das Vertrauen in {channel} entzogen.",

  // Block
  "block_option": "Wähle einen Nutzer zum Blockieren.",
  "block_placeholder": "Nutzer zum Blockieren auswählen",
  "blocked": "{user} wurde vom Zugriff auf diesen Kanal ausgeschlossen.",
  "log_block": "{user} wurde in {channel} blockiert.",

  // Unblock
  "unblock_option": "Wähle einen Nutzer zum Entblocken.",
  "unblock_placeholder": "Nutzer zum Entblocken auswählen",
  "unblocked": "{user} wurde entblockt und Berechtigungen zurückgesetzt.",
  "log_unblock": "{user} wurde in {channel} entblockt.",

  // Transfer
  "transfer_option": "Wähle jemanden, an den du den Besitz übertragen willst.",
  "transfer_placeholder": "Neuen Besitzer auswählen",
  "no_user_to_transfer": "Es ist niemand im Kanal, an den du den Besitz übertragen kannst.",
  "log_transfer": "{user} hat den Besitz von {channel} übernommen.",

  // Kick
  "kick_option": "Wähle einen Nutzer zum Entfernen.",
  "kick_placeholder": "Nutzer zum Entfernen auswählen",
  "user_not_found": "Nutzer nicht im Kanal gefunden.",
  "no_user_to_kick": "Niemand zum Entfernen vorhanden.",
  "log_kick": "{user} wurde aus {channel} entfernt.",

  // Region
  "region_option": "Region auswählen.",
  "region_placeholder": "Region wählen",
  "region_updated": "Region wurde auf {region} geändert.",
  "error_region": "Fehler beim Ändern der Region.",
  "log_region": "{user} hat die Region in {channel} auf {region} gesetzt.",

  // Bitrate
  "bitrate_option": "Bitrate wählen.",
  "bitrate_placeholder": "Bitrate auswählen",
  "bitrate_updated": "Bitrate auf {bitrate} kbps gesetzt.",
  "error_bitrate": "Fehler beim Setzen der Bitrate.",
  "log_bitrate": "{user} hat die Bitrate in {channel} auf {bitrate} kbps gesetzt.",

  // Invite
  "invite_option": "Wähle einen Nutzer zum Einladen.",
  "invite_placeholder": "Nutzer zum Sprachkanal einladen",
  "invite_message": "Du wurdest in einen Sprachkanal eingeladen: {name}\n{voiceLink}",
  "invited_user": "{user} wurde eingeladen.",
  "error_send_invite": "Einladung konnte nicht gesendet werden.",
  "error_user_dms_closed": "DM konnte nicht gesendet werden. DMs deaktiviert oder Nutzer ist ein Bot.",
  "log_invite": "{user} wurde in {channel} eingeladen.",

  // Privacy
  "privacy_option": "Privatsphäre einstellen – öffentlich oder privat.",
  "privacy_placeholder": "Privatsphäre auswählen",
  "privacy_lock_label": "Sperren",
  "privacy_lock_desc": "Nur vertrauenswürdige Nutzer können beitreten",
  "privacy_lock": "Kanal gesperrt. Nur vertrauenswürdige Nutzer haben Zugang.",
  "privacy_unlock_label": "Entsperren",
  "privacy_unlock_desc": "Jeder kann dem Sprachkanal beitreten",
  "privacy_unlock": "Kanal entsperrt. Jeder kann beitreten.",
  "privacy_invisible_label": "Unsichtbar",
  "privacy_invisible_desc": "Nur vertrauenswürdige Nutzer sehen den Sprachkanal",
  "privacy_invisible": "Kanal ist jetzt für andere unsichtbar.",
  "privacy_visible_label": "Sichtbar",
  "privacy_visible_desc": "Jeder kann den Sprachkanal sehen",
  "privacy_visible": "Kanal ist jetzt für alle sichtbar.",
  "privacy_closechat_label": "Chat schließen",
  "privacy_closechat_desc": "Nur vertrauenswürdige Nutzer dürfen chatten",
  "privacy_closechat": "Chat geschlossen. Nur du und vertraute Nutzer können schreiben.",
  "privacy_openchat_label": "Chat öffnen",
  "privacy_openchat_desc": "Jeder darf Nachrichten senden",
  "privacy_openchat": "Chat ist für alle offen.",
  "log_privacy": "{user} hat die Privatsphäre in {channel} auf {value} geändert.",

  // Voice State Update
  "log_left": "{user} hat {channel} verlassen.",
  "log_joined": "{user} ist {channel} beigetreten.",
  "log_switched": "{user} ist von {from} nach {to} gewechselt.",
  "log_channel_already_deleted": "{channel} wurde bereits gelöscht.",
  "log_channel_delete_failed": "Löschen von {channel} fehlgeschlagen.",

  // Allgemeine Nachrichten
  "not_owner": "Du bist nicht der Besitzer dieses Sprachkanals.",
  "invalid_user": "Ungültiger Nutzer. Bitte erneut versuchen.",
  "not_in_channel": "Du befindest dich in keinem Sprachkanal.",
  "different_channel": "Diese Funktion kann nicht in diesem Kanal verwendet werden.",
  "permissions_updated": "{user} hat Berechtigungen in {channel} aktualisiert.",
  "log_send_failed": "Log-Nachricht konnte nicht gesendet werden: {error}",
  "missing_lang_key": "Fehlender Übersetzungsschlüssel: {key}",
  "failed_load_modal": "Modal konnte nicht geladen werden: {file}",
  "interaction_timeout": "Interaktion wegen Inaktivität abgelaufen.",
  "error_interaction": "Es ist ein Fehler aufgetreten. Bitte später erneut versuchen.",
  "interaction_already_active": "Es läuft bereits eine Interaktion. Bitte beende diese zuerst.",
  "invalid_category": "CATEGORY_CHANNEL_ID ist ungültig oder keine Kategorie.",
  "invalid_embed": "EMBED_CHANNEL_ID ist ungültig oder kein Textkanal.",
  "invalid_voice": "VOICE_CHANNEL_ID ist ungültig oder kein Sprachkanal."
}

export default de;
