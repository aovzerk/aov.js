"use strict";
const urls = require("../../consts/urls.json");
const gateway_data = require("../../consts/gateway_data.json");
const BaseRestManager = require("./BaseRestManager");
class RestChannelManager extends BaseRestManager {
	constructor(client) {
		super();
		this.client = client;
	}
	async send(options) {
		const { content, embeds, components, channel_id } = options;
		const url = `${urls.base_url}/channels/${channel_id}/messages`;
		const full_content_new_msg = {
			"content": content,
			"embeds": embeds,
			"components": components,
			"tts": false
		};
		return new Promise((result, reject) => {
			this.send_data({ "method": "POST", "body": JSON.stringify(full_content_new_msg), "url": url, "token": this.client.token }).then(async msg_data => {
				result(msg_data);
			}).catch(err => reject(err));
		});
	}
	async message_reply(options) {
		const { content, embeds, components, channel_id, message_id, guild_id } = options;
		const full_content_new_msg = {
			"content": content,
			"embeds": embeds,
			"components": components,
			"message_reference": {
				"message_id": message_id,
				"channel_id": channel_id,
				"guild_id": guild_id,
				"fail_if_not_exists": false
			},
			"type": gateway_data.Message_Types.REPLY,
			"tts": false
		};
		const url = `${urls.base_url}/channels/${channel_id}/messages`;
		return this.send_data({ "method": "POST", "body": JSON.stringify(full_content_new_msg), "url": url, "token": this.client.token });
	}
	async message_delete(options) {
		const { channel_id, message_id } = options;
		const url = `${urls.base_url}/channels/${channel_id}/messages/${message_id}`;
		return this.send_data({ "method": "DELETE", "body": null, "url": url, "token": this.client.token, "get_json": false });
	}
}
module.exports = RestChannelManager;