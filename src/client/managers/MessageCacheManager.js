"use strict";

class MessageCacheManager {
	constructor(client) {
		this.client = client;
		this.cache = new Map();
	}
	resolve(id) {
		const gets_msg = this.cache.get(id);
		if (gets_msg) return gets_msg;
		throw Error(`None msg id: ${id}`);
	}
	add(msg) {
		this.cache.set(msg.d.id, msg);
	}
}
module.exports = MessageCacheManager;