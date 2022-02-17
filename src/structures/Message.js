"use strict";

const { send_data } = require("../utils/utils");
const urls = require("../consts/urls.json");
class Message {
	constructor(client, action) {
		this.client = client;
		this.d = action.d;
	}
	get channel() {
		return this.client.channels.resolve(this.d.channel_id);
	}
	async reply(options) {
		const { content, embeds } = options;
		const full_content_new_msg = {
			"content": content,
			"embeds": embeds,
			"message_reference": {
				"message_id": this.d.id,
				"channel_id": this.d.channel_id,
				"guild_id": this.d.guild_id,
				"fail_if_not_exists": false
			},
			"type": 19,
			"tts": false
		};
		const url = `${urls.base_url}/channels/${this.d.channel_id}/messages`;
		return send_data({ "method": "POST", "body": JSON.stringify(full_content_new_msg), "url": url, "token": this.client.token });
	}
}
module.exports = Message;