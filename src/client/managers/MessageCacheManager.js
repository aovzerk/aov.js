"use strict";

const BaseManager = require("./BaseManager");

class MessageCacheManager extends BaseManager {
	constructor(client) {
		super(client);
	}
}
module.exports = MessageCacheManager;