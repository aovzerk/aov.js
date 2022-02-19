"use strict";

const BaseManager = require("./BaseCacheManager");

class ChannelCacheManager extends BaseManager {
	constructor(client) {
		super(client);
	}
	get_channels_guild(id) {
		const cache_channels = new Map();
		this.cache.forEach(el => {
			if (el.d.guild_id == id) {
				cache_channels.set(el.d.id, el);
			}
		});
		return cache_channels;
	}
}
module.exports = ChannelCacheManager;