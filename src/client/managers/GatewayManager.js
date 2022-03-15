"use strict";

const WebSocketClient = require("websocket").client;
const gateway_data = require("../../consts/gateway_data.json");
const urls = require("../../consts/urls.json");

class GatewayManager extends WebSocketClient {
	constructor() {
		super();
		this.logined = false;
		this.connection = null;
		this.heartbeat_interval = null;
	}
	create_connection() {
		this.analys_start_connection();
		this.connect(urls.base_gateway_url);
	}
	analys_start_connection() {
		this.on("connect", connection => {
			this.connection = connection;
			this.emit("created");
			this.connection.on("message", action_data => {
				if (action_data.type === "utf8") {
					const json_action = JSON.parse(action_data.utf8Data);
					this.analys_heartbeat(json_action);
				}

			});
		});
	}
	analys_heartbeat(json_action) {
		if (json_action.t == null && json_action.op == gateway_data.Opcodes.Hello) {
			this.heartbeat_interval = Number(json_action.d.heartbeat_interval);
			setTimeout(() => this.send_heartbeat(), this.heartbeat_interval);
		} else if (json_action.t == null && json_action.op == gateway_data.Opcodes.Heartbeat_ACK) {
			setTimeout(() => this.send_heartbeat(), this.heartbeat_interval);
		}
	}
	send_heartbeat() {
		if (this.connection.connected) {
			const json_heartbeat = {
				"op": gateway_data.Opcodes.Heartbeat,
				"d": null
			};
			this.connection.sendUTF(JSON.stringify(json_heartbeat));
		}
	}
	Auth(token, intents) {// авторизация нашего робота

		if (this.connection.connected) {
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
			this.connection.sendUTF(JSON.stringify(JSON_AUTH));
		}
	}
}
module.exports = GatewayManager;