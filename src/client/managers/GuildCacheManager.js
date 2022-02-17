"use strict";

class GuildCacheManager {
	constructor(client) {
		this.client = client;
		this.cache = new Map();
	}
	resolve(id) {
		const gets_guild = this.cache.get(id);
		if (gets_guild) return gets_guild;
		throw Error(`None guild id: ${id}`);
	}
	add(guild) {
		this.cache.set(guild.d.id, guild);
	}
}
module.exports = GuildCacheManager;