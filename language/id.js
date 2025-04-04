const id = {
    // Dashboard
    "dashboard_title": "Dasbor Tempvoice",
    "dashboard_description": "Selamat datang di dasbor Tempvoice kamu — atur dan sesuaikan ruang obrolan suaramu.",
    "dashboard_create_link": "Suaramu, ruangmu. Mulai ruang di https://discord.com/channels/{guildId}/{channelId}",
    "dashboard_footer": "Gunakan tombol di bawah ini untuk kelola channel suaramu.",
    "name_desc": "Ubah nama channel suara",
    "limit_desc": "Atur batas jumlah pengguna di channel",
    "privacy_desc": "Ubah pengaturan privasi channel",
    "dnd_desc": "Aktif/nonaktifkan mode Jangan Ganggu di channel",
    "region_desc": "Ubah wilayah server channel suara",
    "trust_desc": "Izinkan user tertentu untuk gabung dan ngobrol",
    "untrust_desc": "Cabut akses khusus dari user tertentu",
    "block_desc": "Cegah user melihat atau masuk ke channel",
    "unblock_desc": "Pulihkan akses dan visibilitas user yang diblokir",
    "bitrate_desc": "Atur kualitas audio channel",
    "invite_desc": "Undang user ke channel suara kamu",
    "kick_desc": "Keluarkan user dari channel suara",
    "claim_desc": "Ambil alih channel kalau owner-nya sudah keluar",
    "transfer_desc": "Pindahkan kepemilikan channel ke user lain",
    "delete_desc": "Hapus channel suara sementara kamu",
    "name": "Nama",
    "limit": "Batas",
    "privacy": "Privasi",
    "dnd": "Jangan Ganggu",
    "region": "Wilayah",
    "trust": "Izinkan",
    "untrust": "Cabut Akses",
    "block": "Blokir",
    "unblock": "Buka Blokir",
    "bitrate": "Bitrate",
    "invite": "Undang",
    "kick": "Keluarkan",
    "claim": "Ambil Alih",
    "transfer": "Pindahkan",
    "delete": "Hapus",

    // Delete
    "deleted": "Channel dihapus.",
    "log_deleted": "{channel} telah dihapus.",

    // DND
    "dnd_on": "Mode Jangan Ganggu aktif. Orang lain bisa masuk tapi nggak bisa bicara atau interaksi.",
    "dnd_off": "Mode Jangan Ganggu nonaktif. Orang lain bisa ngobrol di channel kamu.",

    // Rename
    "invalid_name": "Masukkan nama yang valid.",
    "channel_renamed": "Nama channel diubah jadi **{name}**.",
    "log_renamed": "{user} mengubah nama channel jadi {name}",

    // Limit
    "invalid_limit": "Batas harus antara 1–99.",
    "limit_updated": "Batas pengguna diubah jadi {limit}.",
    "log_limit": "{user} mengatur batas ke {limit} di {channel}.",

    // Claim
    "already_owner": "Kamu sudah jadi pemilik channel ini.",
    "owner_still_present": "Owner saat ini masih ada di channel.",
    "log_claimed": "{user} mengambil alih channel suara {channel}.",

    // Trust
    "trust_option": "Pilih user yang kamu percaya.",
    "trust_placeholder": "Pilih user yang diizinkan",
    "trusted": "Kamu mengizinkan {user}. Mereka sekarang bisa gabung.",
    "log_trust": "{user} diizinkan masuk ke {channel}.",

    // Untrust
    "untrust_option": "Pilih user untuk dicabut aksesnya.",
    "untrust_placeholder": "Pilih user untuk dicabut akses",
    "untrusted": "Kamu mencabut akses {user}. Mereka nggak bisa gabung lagi.",
    "log_untrust": "Akses {user} dicabut dari {channel}.",

    // Block
    "block_option": "Pilih user untuk diblokir.",
    "block_placeholder": "Pilih user untuk diblokir",
    "blocked": "{user} diblokir dari melihat channel ini.",
    "log_block": "{user} diblokir dari {channel}.",

    // Unblock
    "unblock_option": "Pilih user untuk dibuka blokirnya.",
    "unblock_placeholder": "Pilih user untuk dibuka blokirnya",
    "unblocked": "{user} sekarang tidak diblokir dan izinnya sudah disetel ulang.",
    "log_unblock": "Blokir {user} dicabut dari {channel}.",

    // Transfer
    "transfer_option": "Pilih user untuk dijadikan owner baru.",
    "transfer_placeholder": "Pilih pemilik channel baru",
    "no_user_to_transfer": "Nggak ada user lain di channel untuk dijadikan owner.",
    "log_transfer": "{user} jadi owner baru di {channel}.",

    // Kick
    "kick_option": "Pilih user untuk dikeluarkan.",
    "kick_placeholder": "Pilih user untuk dikeluarkan",
    "user_not_found": "User tidak ditemukan di channel.",
    "no_user_to_kick": "Nggak ada user untuk dikeluarkan.",
    "log_kick": "{user} dikeluarkan dari {channel}.",

    // Region
    "region_option": "Pilih wilayah server suara.",
    "region_placeholder": "Pilih wilayah",
    "region_updated": "Wilayah diubah ke {region}.",
    "error_region": "Gagal memperbarui wilayah.",
    "log_region": "{user} mengubah wilayah jadi {region} di {channel}.",

    // Bitrate
    "bitrate_option": "Pilih bitrate.",
    "bitrate_placeholder": "Pilih kualitas suara",
    "bitrate_updated": "Bitrate diatur ke {bitrate} kbps.",
    "error_bitrate": "Gagal memperbarui bitrate.",
    "log_bitrate": "{user} mengubah bitrate jadi {bitrate} kbps di {channel}.",

    // Invite
    "invite_option": "Pilih user untuk diundang.",
    "invite_placeholder": "Undang seseorang ke channel",
    "invite_message": "Kamu diundang untuk gabung ke channel suara: {name}\n{voiceLink}",
    "invited_user": "{user} telah diundang.",
    "error_send_invite": "Gagal mengirim undangan ke user.",
    "error_user_dms_closed": "DM user tidak bisa dihubungi. Mungkin dinonaktifkan atau dia bot.",
    "log_invite": "{user} diundang ke {channel}.",

    // Privacy
    "privacy_option": "Atur privasi — publik atau privat.",
    "privacy_placeholder": "Pilih pengaturan privasi",
    "privacy_lock_label": "Kunci",
    "privacy_lock_desc": "Hanya user terpercaya yang bisa gabung",
    "privacy_lock": "Channel dikunci. Hanya user terpercaya yang bisa gabung.",
    "privacy_unlock_label": "Buka Kunci",
    "privacy_unlock_desc": "Siapa saja bisa gabung ke channel kamu",
    "privacy_unlock": "Channel dibuka. Siapa saja bisa masuk.",
    "privacy_invisible_label": "Tak Terlihat",
    "privacy_invisible_desc": "Hanya user terpercaya yang bisa melihat channel",
    "privacy_invisible": "Channel sekarang tidak terlihat oleh user lain.",
    "privacy_visible_label": "Terlihat",
    "privacy_visible_desc": "Semua orang bisa melihat channel kamu",
    "privacy_visible": "Channel sekarang terlihat oleh semua orang.",
    "privacy_closechat_label": "Tutup Chat",
    "privacy_closechat_desc": "Hanya user terpercaya yang bisa kirim pesan",
    "privacy_closechat": "Chat ditutup. Hanya kamu dan user terpercaya yang bisa chat.",
    "privacy_openchat_label": "Buka Chat",
    "privacy_openchat_desc": "Semua orang bisa kirim pesan",
    "privacy_openchat": "Chat dibuka untuk semua orang.",
    "log_privacy": "{user} mengubah privasi jadi {value} di {channel}.",

    // Voice State Update
    "log_left": "{user} keluar dari {channel}.",
    "log_joined": "{user} masuk ke {channel}.",
    "log_switched": "{user} pindah dari {from} ke {to}.",
    "log_channel_already_deleted": "{channel} sudah dihapus sebelumnya.",
    "log_channel_delete_failed": "Gagal menghapus {channel}.",

    // General messages
    "not_owner": "Kamu bukan pemilik channel ini.",
    "invalid_user": "User tidak valid. Coba lagi ya.",
    "not_in_channel": "Kamu belum gabung ke voice channel.",
    "different_channel": "Fitur ini nggak bisa dipakai di channel suara lain.",
    "permissions_updated": "{user} memperbarui izin di {channel}.",
    "log_send_failed": "Gagal kirim log: {error}",
    "missing_lang_key": "Key bahasa hilang: {key}",
    "failed_load_modal": "Gagal memuat modal: {file}",
    "interaction_timeout": "Interaksi dibatalkan karena tidak ada respons.",
    "error_interaction": "Ada yang salah. Coba lagi nanti.",
    "interaction_already_active": "Masih ada interaksi aktif. Selesaikan dulu ya.",
    "invalid_category": "CATEGORY_CHANNEL_ID tidak valid atau bukan kategori.",
    "invalid_embed": "EMBED_CHANNEL_ID tidak valid atau bukan channel teks.",
    "invalid_voice": "VOICE_CHANNEL_ID tidak valid atau bukan voice channel."
}

export default id