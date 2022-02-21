"use strict";
const RestChannelManager = require("./RestChannelManager");
const BaseRestManager = require("./BaseRestManager");
const RestInteractionManager = require("./RestInteractionManager");
const RestGuildManager = require("./RestGuildManager");
class RestManager extends BaseRestManager {
	constructor(client) {
		super();
		this.client = client;
		this.rest_channel = new RestChannelManager(client);
		this.rest_interaction = new RestInteractionManager(client);
		this.rest_guild = new RestGuildManager(client);
	}
}
module.exports = RestManager;