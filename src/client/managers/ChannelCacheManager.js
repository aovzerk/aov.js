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
	add(channel) {
		this.cache.set(channel.d.id, channel);
	}
}
module.exports = ChannelCacheManager;