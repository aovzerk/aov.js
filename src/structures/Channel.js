"use strict";

const urls = require("../consts/urls.json");
const { send_data } = require("../utils/utils");
const Message = require("../structures/Message");
class Channel {
	constructor(chn_data, client) {
		this.d = chn_data;
		this.client = client;

	}
	async send(options) {
		const { content, embeds, components } = options;
		const full_content_new_msg = {
			"content": content,
			"embeds": embeds,
			"components": components,
			"tts": false
		};
		const url = `${urls.base_url}/channels/${this.d.id}/messages`;
		return new Promise((result, reject) => {
			send_data({ "method": "POST", "body": JSON.stringify(full_content_new_msg), "url": url, "token": this.client.token }).then(async msg_data => {
				result(new Message(this.client, { "d": msg_data }));
			}).catch(err => reject(err));
		});

	}
}
module.exports = Channel;