const urls = require("../consts/urls.json");
const gateway_data = require("../consts/gateway_data.json");
const { send_data } = require("../utils/utils");

class ButtonInteraction {
	constructor(client, action) {
		this.client = client;
		this.d = action.d;
		this.deferReply_is = false;
		this.reply_is = false;
		this.type = "BUTTON";
	}
	get channel() {
		return this.client.channels.resolve(this.d.channel_id);
	}
	get custom_id() {
		return this.d.data.custom_id;
	}
	async deferReply(options) {
		const { ephemeral } = options;
		if (!this.deferReply_is && !this.reply_is) {
			this.deferReply_is = true;
			const url = `${urls.base_url}/interactions/${this.d.id}/${this.d.token}/callback`;
			const full_content_new_msg = {
				"type": gateway_data.Interaction_Callback_Type.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
				"data": {}
			};
			if (ephemeral) {
				full_content_new_msg.data.flags = 64;
			}
			return send_data({ "method": "POST", "body": JSON.stringify(full_content_new_msg), "url": url, "token": this.client.token, "get_json": false });
		}

	}
	async reply(options) {
		const { content, embeds, components, ephemeral } = options;
		if (this.deferReply_is && !this.reply_is) {
			this.reply_is = true;
			const webhook = this.client.webhooks_components.resolve(this.d.message.id);
			const url = `${urls.base_url}/webhooks/${webhook.application_id}/${this.d.token}/messages/${webhook.id}`;
			const full_content_new_msg = {
				"content": content,
				"embeds": embeds,
				"components": components,
				"tts": false
			};
			if (ephemeral) {
				full_content_new_msg.flags = 64;
			}
			return send_data({ "method": "PATCH", "body": JSON.stringify(full_content_new_msg), "url": url, "token": this.client.token, "get_json": false });
		}
		if (!this.deferReply_is && !this.reply_is) {
			this.reply_is = true;
			const url = `${urls.base_url}/interactions/${this.d.id}/${this.d.token}/callback`;
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
			return send_data({ "method": "POST", "body": JSON.stringify(full_content_new_msg), "url": url, "token": this.client.token, "get_json": false });
		}
	}
}
module.exports = ButtonInteraction;