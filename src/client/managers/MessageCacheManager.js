"use strict";

const BaseManager = require("./BaseCacheManager");

class MessageCacheManager extends BaseManager {
	constructor(client) {
		super(client);
	}
}
module.exports = MessageCacheManager;