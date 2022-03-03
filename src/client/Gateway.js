"use strict";

const WebSocketClient = require("websocket").client;
const gateway_data = require("../consts/gateway_data.json");
const urls = require("../consts/urls.json");
class Gateway extends WebSocketClient {
	constructor() {
		super();
		this.interval = 0;
		this.connection = null;
	}
	login() {
		this.connect(urls.base_gateway_url);
	}
	heartbeat(connection) { // отправка heartbeat для индентификации того что мы живы
		if (connection.connected) {
			connection.sendUTF(JSON.stringify({
				"op": gateway_data.Opcodes.Heartbeat,
				"d": null }));
		}
	}
	Auth(connection, token, intents) {// авторизация нашего робота
		if (connection.connected) {
			this.connection = connection;
			const JSON_AUTH = {
				"op": gateway_data.Opcodes.Identify,
				"d": {
					"token": token,
					"intents": intents,
					"properties": {
						"$os": "windows",
						"$browser": "AOV.JS",
						"$device": "AOV.JS"
					}
				}
			};
			connection.sendUTF(JSON.stringify(JSON_AUTH));
		}
	}
}
module.exports = Gateway;