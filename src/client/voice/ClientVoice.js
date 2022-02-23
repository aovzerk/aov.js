"use strict";
const actions = require("./actions");
const VoiceGuildChacheManager = require("./managers/VoiceGuildChacheManager");
class ClientVoiceManager {
	constructor(client) {
		this.client = client;
		this.actions = actions;
		this.voices = new VoiceGuildChacheManager();
	}
	tracking_data(connection) {
		this.connection = connection;
		this.connection.on("message", async message => {
			const msg_action = await JSON.parse(message.utf8Data);
			this.analys_data(msg_action);
		});
	}
	async analys_data(action) {
		if (this.actions[action.t]) {
			this.actions[action.t](this, action, this.client);
		}
	}
}
module.exports = ClientVoiceManager;