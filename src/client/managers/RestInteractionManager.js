"use strict";
const urls = require("../../consts/urls.json");
const gateway_data = require("../../consts/gateway_data.json");
const BaseRestManager = require("./BaseRestManager");
class RestInteractionManager extends BaseRestManager {
	constructor(client) {
		super();
		this.client = client;
	}
	deferReply(options) {
		const { token, id, ephemeral } = options;
		const url = `${urls.base_url}/interactions/${id}/${token}/callback`;
		const full_content_new_msg = {
			"type": gateway_data.Interaction_Callback_Type.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
			"data": {}
		};
		if (ephemeral) {
			full_content_new_msg.data.flags = 64;
		}
		return this.send_data({ "method": "POST", "body": JSON.stringify(full_content_new_msg), "url": url, "token": this.client.token, "get_json": false });
	}
	edit_webhook(options) {
		const { content, embeds, components, ephemeral, token, id } = options;
		const url = `${urls.base_url}/webhooks/${id}/${token}/messages/@original`;
		const full_content_new_msg = {
			"content": content,
			"embeds": embeds,
			"components": components,
			"tts": false
		};
		if (ephemeral) {
			full_content_new_msg.flags = 64;
		}
		return this.send_data({ "method": "PATCH", "body": JSON.stringify(full_content_new_msg), "url": url, "token": this.client.token, "get_json": false });
	}
	callback_reply(options) {
		const { content, embeds, components, ephemeral, token, id } = options;
		const url = `${urls.base_url}/interactions/${id}/${token}/callback`;
		const full_content_new_msg = {
			"type": gateway_data.Interaction_Callback_Type.CHANNEL_MESSAGE_WITH_SOURCE,
			"data": {
				"content": content,
				"embeds": embeds,
				"components": components,
				"tts": false
			}

		};
		if (ephemeral) {
			full_content_new_msg.data.flags = 64;
		}
		return this.send_data({ "method": "POST", "body": JSON.stringify(full_content_new_msg), "url": url, "token": this.client.token, "get_json": false });
	}
}
module.exports = RestInteractionManager;