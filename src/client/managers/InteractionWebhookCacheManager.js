"use strict";
const BaseManager = require("./BaseCacheManager");

class ChannelCacheManager extends BaseManager {
	constructor(client) {
		super(client);
	}
	resolve(id) {
		const gets_i_w = this.cache.get(id);
		if (gets_i_w) return gets_i_w;
		throw Error(`None webhook id: ${id}`);
	}
	add(webhook) {
		this.cache.set(webhook.d.id, webhook.d);
	}
}
module.exports = ChannelCacheManager;