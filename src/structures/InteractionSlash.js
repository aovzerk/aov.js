const urls = require("../consts/urls.json");
const { send_data } = require("../utils/utils");

class InteractionSlash {
	constructor(client, action) {
		this.client = client;
		this.d = action.d;
		this.deferReply_is = 0;
		this.reply_is = 0;
		this.type = "SLASH";
	}
	async deferReply() {
		if (!this.deferReply_is && !this.reply_is) {
			this.deferReply_is = 1;
			const url = `${urls.base_url}/interactions/${this.d.id}/${this.d.token}/callback`;
			const full_content_new_msg = {
				"type": 5
			};
			return send_data({ "method": "POST", "body": JSON.stringify(full_content_new_msg), "url": url, "token": this.client.token, "get_json": false });
		}

	}
	async reply(options) {
		const { content, embeds, components } = options;
		if (this.deferReply_is && !this.reply_is) {
			this.reply_is = 1;
			const webhook = this.client.webhooks_interation.resolve(this.d.id);
			const url = `${urls.base_url}/webhooks/${webhook.application_id}/${this.d.token}/messages/${webhook.id}`;
			const full_content_new_msg = {
				"content": content,
				"embeds": embeds,
				"components": components,
				"tts": false
			};
			return send_data({ "method": "PATCH", "body": JSON.stringify(full_content_new_msg), "url": url, "token": this.client.token, "get_json": false });
		}
		if (!this.deferReply_is && !this.reply_is) {
			this.reply_is = 1;
			const url = `${urls.base_url}/interactions/${this.d.id}/${this.d.token}/callback`;
			const full_content_new_msg = {
				"type": 4,
				"data": { "content": content,
					"embeds": embeds,
					"tts": false
				}

			};
			return send_data({ "method": "POST", "body": JSON.stringify(full_content_new_msg), "url": url, "token": this.client.token, "get_json": false });
		}
	}
}
module.exports = InteractionSlash;