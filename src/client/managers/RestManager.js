"use strict";
const RestChannelManager = require("./RestChannelManager");
const BaseRestManager = require("./BaseRestManager");
class RestManager extends BaseRestManager {
	constructor(client) {
		super();
		this.client = client;
		this.rest_channel = new RestChannelManager(client);
	}
}
module.exports = RestManager;