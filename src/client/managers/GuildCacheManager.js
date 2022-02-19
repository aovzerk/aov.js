"use strict";

const BaseManager = require("./BaseCacheManager");

class GuildCacheManager extends BaseManager {
	constructor(client) {
		super(client);
	}
}
module.exports = GuildCacheManager;