"use strict";

class ChannelCacheManager {
	constructor(client) {
		this.client = client;
		this.cache = new Map();
	}
	resolve(id) {
		const gets_channel = this.cache.get(id);
		if (gets_channel) return gets_channel;
		throw Error(`None channel id: ${id}`);
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
	add(channel) {
		this.cache.set(channel.d.id, channel);
	}
}
module.exports = ChannelCacheManager;