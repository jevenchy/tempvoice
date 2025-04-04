const ru = {
    // Dashboard
    "dashboard_title": "Панель Tempvoice",
    "dashboard_description": "Добро пожаловать в панель Tempvoice — управляй и настраивай свой голосовой канал.",
    "dashboard_create_link": "Твой голос — твоя комната. Начни здесь: https://discord.com/channels/{guildId}/{channelId}",
    "dashboard_footer": "Используй кнопки ниже, чтобы управлять каналом.",
    "name_desc": "Изменить название голосового канала",
    "limit_desc": "Установить лимит пользователей",
    "privacy_desc": "Настроить приватность канала",
    "dnd_desc": "Включить/выключить режим 'Не беспокоить'",
    "region_desc": "Изменить регион голосового сервера",
    "trust_desc": "Разрешить пользователю присоединяться и взаимодействовать",
    "untrust_desc": "Убрать доступ у выбранных пользователей",
    "block_desc": "Запретить пользователям видеть или заходить в канал",
    "unblock_desc": "Вернуть доступ для разблокированных пользователей",
    "bitrate_desc": "Настроить качество звука",
    "invite_desc": "Пригласить пользователя в голосовой канал",
    "kick_desc": "Выгнать пользователя из канала",
    "claim_desc": "Забрать канал, если владелец ушёл",
    "transfer_desc": "Передать владение каналом другому",
    "delete_desc": "Удалить временный голосовой канал",
    "name": "Имя",
    "limit": "Лимит",
    "privacy": "Приватность",
    "dnd": "Не беспокоить",
    "region": "Регион",
    "trust": "Доверие",
    "untrust": "Убрать доступ",
    "block": "Заблокировать",
    "unblock": "Разблокировать",
    "bitrate": "Битрейт",
    "invite": "Пригласить",
    "kick": "Выгнать",
    "claim": "Забрать",
    "transfer": "Передать",
    "delete": "Удалить",

    // Delete
    "deleted": "Канал удалён.",
    "log_deleted": "{channel} был удалён.",

    // DND
    "dnd_on": "Режим 'Не беспокоить' включён. Пользователи могут заходить, но не смогут говорить.",
    "dnd_off": "Режим 'Не беспокоить' выключен. Все могут говорить и взаимодействовать.",

    // Rename
    "invalid_name": "Пожалуйста, укажи корректное имя.",
    "channel_renamed": "Канал переименован в **{name}**.",
    "log_renamed": "{user} переименовал комнату в {name}",

    // Limit
    "invalid_limit": "Лимит должен быть от 1 до 99.",
    "limit_updated": "Лимит пользователей обновлён: {limit}.",
    "log_limit": "{user} установил лимит {limit} в {channel}.",

    // Claim
    "already_owner": "Ты уже владелец этого канала.",
    "owner_still_present": "Текущий владелец всё ещё в канале.",
    "log_claimed": "{user} забрал канал {channel}.",

    // Trust
    "trust_option": "Выбери, кому доверяешь.",
    "trust_placeholder": "Выбери пользователя",
    "trusted": "Ты дал доступ {user}. Теперь они могут присоединиться.",
    "log_trust": "{user} получил доступ к {channel}.",

    // Untrust
    "untrust_option": "Выбери, кого удалить из списка доверенных.",
    "untrust_placeholder": "Выбери пользователя",
    "untrusted": "Ты убрал доступ у {user}. Он больше не может зайти.",
    "log_untrust": "{user} потерял доступ к {channel}.",

    // Block
    "block_option": "Выбери, кого заблокировать.",
    "block_placeholder": "Выбери пользователя",
    "blocked": "{user} больше не видит этот канал.",
    "log_block": "{user} был заблокирован в {channel}.",

    // Unblock
    "unblock_option": "Выбери, кого разблокировать.",
    "unblock_placeholder": "Выбери пользователя",
    "unblocked": "{user} разблокирован, права сброшены.",
    "log_unblock": "{user} разблокирован в {channel}.",

    // Transfer
    "transfer_option": "Выбери нового владельца.",
    "transfer_placeholder": "Выбери пользователя",
    "no_user_to_transfer": "В канале никого, кроме тебя.",
    "log_transfer": "{user} стал владельцем канала {channel}.",

    // Kick
    "kick_option": "Выбери, кого выгнать.",
    "kick_placeholder": "Выбери пользователя",
    "user_not_found": "Пользователь не найден в канале.",
    "no_user_to_kick": "Некого выгонять.",
    "log_kick": "{user} был выгнан из {channel}.",

    // Region
    "region_option": "Выбери регион.",
    "region_placeholder": "Выбери регион",
    "region_updated": "Регион обновлён: {region}.",
    "error_region": "Ошибка при обновлении региона.",
    "log_region": "{user} изменил регион на {region} в {channel}.",

    // Bitrate
    "bitrate_option": "Выбери битрейт.",
    "bitrate_placeholder": "Выбери качество",
    "bitrate_updated": "Битрейт установлен: {bitrate} кбит/с.",
    "error_bitrate": "Ошибка при установке битрейта.",
    "log_bitrate": "{user} изменил битрейт на {bitrate} кбит/с в {channel}.",

    // Invite
    "invite_option": "Выбери, кого пригласить.",
    "invite_placeholder": "Пригласить пользователя",
    "invite_message": "Тебя пригласили в голосовой канал: {name}\n{voiceLink}",
    "invited_user": "{user} был приглашён.",
    "error_send_invite": "Не удалось отправить приглашение.",
    "error_user_dms_closed": "Невозможно отправить ЛС. Возможно, ЛС отключены или это бот.",
    "log_invite": "{user} был приглашён в {channel}.",

    // Privacy
    "privacy_option": "Настрой приватность — сделать канал открытым или закрытым.",
    "privacy_placeholder": "Выбери вариант",
    "privacy_lock_label": "Закрыт",
    "privacy_lock_desc": "Только доверенные могут зайти",
    "privacy_lock": "Канал закрыт. Только доверенные пользователи могут зайти.",
    "privacy_unlock_label": "Открыт",
    "privacy_unlock_desc": "Канал доступен для всех",
    "privacy_unlock": "Канал открыт. Все могут присоединиться.",
    "privacy_invisible_label": "Невидимый",
    "privacy_invisible_desc": "Канал виден только доверенным",
    "privacy_invisible": "Канал теперь невидим для других.",
    "privacy_visible_label": "Видимый",
    "privacy_visible_desc": "Канал видят все",
    "privacy_visible": "Канал теперь виден всем.",
    "privacy_closechat_label": "Закрыть чат",
    "privacy_closechat_desc": "Только доверенные могут писать",
    "privacy_closechat": "Чат закрыт. Писать могут только доверенные.",
    "privacy_openchat_label": "Открыть чат",
    "privacy_openchat_desc": "Чат доступен для всех",
    "privacy_openchat": "Чат открыт для всех.",
    "log_privacy": "{user} изменил настройки приватности на {value} в {channel}.",

    // Voice State Update
    "log_left": "{user} вышел из {channel}.",
    "log_joined": "{user} зашёл в {channel}.",
    "log_switched": "{user} перешёл из {from} в {to}.",
    "log_channel_already_deleted": "{channel} уже был удалён.",
    "log_channel_delete_failed": "Не удалось удалить {channel}.",

    // General messages
    "not_owner": "Ты не владелец этого канала.",
    "invalid_user": "Неверный пользователь. Попробуй снова.",
    "not_in_channel": "Ты не в голосовом канале.",
    "different_channel": "Эта функция недоступна в этом канале.",
    "permissions_updated": "{user} обновил права в {channel}.",
    "log_send_failed": "Ошибка отправки лога: {error}",
    "missing_lang_key": "Отсутствует ключ перевода: {key}",
    "failed_load_modal": "Не удалось загрузить модальное окно: {file}",
    "interaction_timeout": "Сессия прервана из-за бездействия.",
    "error_interaction": "Что-то пошло не так. Попробуй позже.",
    "interaction_already_active": "Уже есть активная сессия. Заверши её перед новой.",
    "invalid_category": "CATEGORY_CHANNEL_ID недействителен или не является категорией.",
    "invalid_embed": "EMBED_CHANNEL_ID недействителен или не является текстовым каналом.",
    "invalid_voice": "VOICE_CHANNEL_ID недействителен или не является голосовым каналом."
}

export default ru