"use strict";
const BaseManager = require("./BaseManager");

class ComponentsWebhookCacheManager extends BaseManager {
	constructor(client) {
		super(client);
	}
	resolve(id) {
		const gets_i_w = this.cache.get(id);
		if (gets_i_w) return gets_i_w;
		throw Error(`None webhook id: ${id}`);
	}
	add(webhook) {
		this.cache.set(webhook.d.message_reference.message_id, webhook.d);
	}
}
module.exports = ComponentsWebhookCacheManager;