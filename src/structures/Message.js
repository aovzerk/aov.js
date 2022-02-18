"use strict";

const { send_data } = require("../utils/utils");
const urls = require("../consts/urls.json");
class Message {
	constructor(client, action) {
		this.client = client;
		this.d = action.d;
		this.deleted = 0;
	}
	get channel() {
		return this.client.channels.resolve(this.d.channel_id);
	}
	get guild() {
		return this.client.guilds.resolve(this.d.guild_id);
	}
	get member() {
		return this.guild.member(this.d.author.id);
	}
	async reply(options) {
		const { content, embeds, components } = options;
		const full_content_new_msg = {
			"content": content,
			"embeds": embeds,
			"components": components,
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
	async delete() {
		if (!this.deleted) {
			this.deleted = 1;
			const url = `${urls.base_url}/channels/${this.d.channel_id}/messages/${this.d.id}`;
			return send_data({ "method": "DELETE", "body": null, "url": url, "token": this.client.token, "get_json": false });
		} else {

			throw Error("Message is deleted");
		}

	}
}
module.exports = Message;