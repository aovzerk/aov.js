# Client extends EventEmitter
## Список полей
- ``user`` - ``Информация о пользователе(боте)``
- ``intents`` - ``Указанные разрешение бота в виде суммы``
- ``channels`` - [ChannelCacheManager](https://github.com/aovzerk/aov.js/tree/main/doc/ChannelCacheManager.md)
- ``guilds`` - ``GuildCacheManager``
- ``messages`` - ``MessageCacheManager``
- ``webhooks_interaсtion`` - ``InteractionWebhookCacheManager``
- ``webhooks_components`` - ``ComponentsWebhookCacheManager``
- ``rest`` - ``RestManager``
- ``voices`` - ``ClientVoiceManager``
## Список событий
- ``CHANNEL_CREATE``
- ``CHANNEL_DELETE``
- ``CHANNEL_UPDATE``
-  ``GUILD_CREATE``
- ``GUILD_DELETE``
- ``GUILD_MEMBER_ADD``
- ``GUILD_MEMBER_REMOVE``
- ``GUILD_MEMBER_UPDATE``
- ``GUILD_ROLE_CREATE``
- ``GUILD_ROLE_DELETE``
- ``GUILD_ROLE_UPDATE``
- ``GUILD_UPDATE``
- ``INTERACTION_CREATE``
- ``MESSAGE_CREATE``
- ``MESSAGE_DELETE``
- ``MESSAGE_UPDATE``
- ``READY``
- ``VOICE_STATE_UPDATE``