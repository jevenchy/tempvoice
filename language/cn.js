const cn = {
    // Dashboard
    "dashboard_title": "Tempvoice 控制面板",
    "dashboard_description": "欢迎来到 Tempvoice 控制面板 — 自定义和管理你的语音频道。",
    "dashboard_create_link": "你的频道，你来掌控。点击创建：https://discord.com/channels/{guildId}/{channelId}",
    "dashboard_footer": "使用下方按钮来管理你的语音频道。",
    "name_desc": "修改语音频道名称",
    "limit_desc": "设置频道人数上限",
    "privacy_desc": "调整频道隐私设置",
    "dnd_desc": "切换“请勿打扰”模式",
    "region_desc": "更改语音服务器区域",
    "trust_desc": "允许指定用户加入并互动",
    "untrust_desc": "移除指定用户的访问权限",
    "block_desc": "阻止用户看到或进入频道",
    "unblock_desc": "恢复被封锁用户的访问权限",
    "bitrate_desc": "调整频道的音频质量",
    "invite_desc": "邀请用户加入语音频道",
    "kick_desc": "将选定用户从频道移除",
    "claim_desc": "如果原主人已离开，则接管频道",
    "transfer_desc": "将频道所有权转移给他人",
    "delete_desc": "删除你的临时语音频道",
    "name": "名称",
    "limit": "人数限制",
    "privacy": "隐私",
    "dnd": "勿扰",
    "region": "区域",
    "trust": "信任",
    "untrust": "取消信任",
    "block": "封锁",
    "unblock": "解封",
    "bitrate": "比特率",
    "invite": "邀请",
    "kick": "踢出",
    "claim": "接管",
    "transfer": "转移",
    "delete": "删除",

    // Delete
    "deleted": "频道已删除。",
    "log_deleted": "{channel} 已被删除。",

    // DND
    "dnd_on": "“请勿打扰”模式已开启。其他人可加入，但无法说话或操作。",
    "dnd_off": "“请勿打扰”模式已关闭。其他人现在可以互动。",

    // Rename
    "invalid_name": "请输入有效的名称。",
    "channel_renamed": "频道已重命名为 **{name}**。",
    "log_renamed": "{user} 将频道名称更改为 {name}",

    // Limit
    "invalid_limit": "人数限制需在 1–99 之间。",
    "limit_updated": "频道人数限制已更新为 {limit}。",
    "log_limit": "{user} 设置 {channel} 的上限为 {limit}。",

    // Claim
    "already_owner": "你已经是这个频道的主人了。",
    "owner_still_present": "原频道主人仍在频道中。",
    "log_claimed": "{user} 接管了语音频道 {channel}。",

    // Trust
    "trust_option": "选择你信任的用户。",
    "trust_placeholder": "选择一个用户",
    "trusted": "你已信任 {user}，他们现在可以加入频道了。",
    "log_trust": "{user} 被允许访问 {channel}。",

    // Untrust
    "untrust_option": "选择要取消信任的用户。",
    "untrust_placeholder": "选择一个用户",
    "untrusted": "你已取消对 {user} 的信任，他们无法再加入。",
    "log_untrust": "{user} 的访问权限已被移除（频道：{channel}）。",

    // Block
    "block_option": "选择要封锁的用户。",
    "block_placeholder": "选择一个用户",
    "blocked": "{user} 已被封锁，无法查看此频道。",
    "log_block": "{user} 被封锁无法访问 {channel}。",

    // Unblock
    "unblock_option": "选择要解封的用户。",
    "unblock_placeholder": "选择一个用户",
    "unblocked": "{user} 已被解封，权限已重置。",
    "log_unblock": "{user} 的封锁已从 {channel} 中解除。",

    // Transfer
    "transfer_option": "选择新主人。",
    "transfer_placeholder": "选择一个用户",
    "no_user_to_transfer": "频道中没有其他成员可以转移。",
    "log_transfer": "{user} 成为了频道 {channel} 的新主人。",

    // Kick
    "kick_option": "选择要踢出的用户。",
    "kick_placeholder": "选择一个用户",
    "user_not_found": "该用户不在频道中。",
    "no_user_to_kick": "没有用户可被踢出。",
    "log_kick": "{user} 被移出 {channel}。",

    // Region
    "region_option": "选择一个区域。",
    "region_placeholder": "选择区域",
    "region_updated": "区域已更新为 {region}。",
    "error_region": "更新区域时出错。",
    "log_region": "{user} 将 {channel} 的区域更改为 {region}。",

    // Bitrate
    "bitrate_option": "选择音质（比特率）。",
    "bitrate_placeholder": "选择一个比特率",
    "bitrate_updated": "音质已设置为 {bitrate} kbps。",
    "error_bitrate": "更新比特率时发生错误。",
    "log_bitrate": "{user} 将频道音质更改为 {bitrate} kbps（频道：{channel}）。",

    // Invite
    "invite_option": "选择要邀请的用户。",
    "invite_placeholder": "选择用户",
    "invite_message": "你被邀请加入语音频道：{name}\n{voiceLink}",
    "invited_user": "{user} 已被邀请。",
    "error_send_invite": "无法发送邀请。",
    "error_user_dms_closed": "无法发送私信，可能对方关闭了私信或是 Bot。",
    "log_invite": "{user} 被邀请加入 {channel}。",

    // Privacy
    "privacy_option": "设置频道隐私状态",
    "privacy_placeholder": "选择隐私设置",
    "privacy_lock_label": "锁定",
    "privacy_lock_desc": "只有受信用户可以加入",
    "privacy_lock": "频道已锁定，仅限受信用户加入。",
    "privacy_unlock_label": "开放",
    "privacy_unlock_desc": "所有人都可以加入",
    "privacy_unlock": "频道已开放，任何人都可以加入。",
    "privacy_invisible_label": "不可见",
    "privacy_invisible_desc": "只有受信用户能看到频道",
    "privacy_invisible": "频道现在对其他人不可见。",
    "privacy_visible_label": "可见",
    "privacy_visible_desc": "所有人都能看到频道",
    "privacy_visible": "频道现在对所有人可见。",
    "privacy_closechat_label": "关闭聊天",
    "privacy_closechat_desc": "只有受信用户可以发消息",
    "privacy_closechat": "聊天已关闭，仅限你和受信用户使用。",
    "privacy_openchat_label": "开启聊天",
    "privacy_openchat_desc": "任何人都可以发消息",
    "privacy_openchat": "聊天已开放，所有人可发送消息。",
    "log_privacy": "{user} 修改了 {channel} 的隐私设置为 {value}。",

    // Voice State Update
    "log_left": "{user} 离开了 {channel}。",
    "log_joined": "{user} 加入了 {channel}。",
    "log_switched": "{user} 从 {from} 切换到了 {to}。",
    "log_channel_already_deleted": "{channel} 已被删除。",
    "log_channel_delete_failed": "删除 {channel} 失败。",

    // General messages
    "not_owner": "你不是这个频道的主人。",
    "invalid_user": "无效的用户，请重试。",
    "not_in_channel": "你还没加入语音频道。",
    "different_channel": "这个功能只能在你创建的频道中使用。",
    "permissions_updated": "{user} 更新了 {channel} 的权限。",
    "log_send_failed": "发送日志失败：{error}",
    "missing_lang_key": "缺少语言键：{key}",
    "failed_load_modal": "加载模态窗口失败：{file}",
    "interaction_timeout": "操作已超时，未收到响应。",
    "error_interaction": "出错了，请稍后再试。",
    "interaction_already_active": "已有进行中的操作，请先完成当前操作。",
    "invalid_category": "CATEGORY_CHANNEL_ID 无效或不是一个分类频道。",
    "invalid_embed": "EMBED_CHANNEL_ID 无效或不是一个文字频道。",
    "invalid_voice": "VOICE_CHANNEL_ID 无效或不是一个语音频道。"
}

export default cn