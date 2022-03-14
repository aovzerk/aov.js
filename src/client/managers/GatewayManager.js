"use strict";

const WebSocketClient = require("websocket").client;
const gateway_data = require("../../consts/gateway_data.json");
const urls = require("../../consts/urls.json");

class GatewayManager extends WebSocketClient {
	constructor() {
		super();
		this.logined = false;
	}
	create_connection() {
		this.connect(urls.base_gateway_url);
	}
	analys_start_connection() {

	}
}
module.exports = GatewayManager;