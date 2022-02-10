const { send_data } = require("../utils/utils");
const consts = require("../consts.json");

class Interaction {
	constructor(member, guild, data, client) {
		this.member = member;
		this.guild = guild;
		this.data = data.data;
		this.id = data.id,
		this.channel_id = data.application_id;
		this.message_id = data.channel_id;
		this.token = data.token;
		this.client = client;
	}
	async reply(options) {
		const webhook = this.client.cache_webhook_interaction.get(this.id);
		this.client.cache_webhook_interaction.delete(this.id);
		const { content, embeds } = options;
		const url = `${consts.base_url}/webhooks/${webhook.application_id}/${this.token}/messages/${webhook.message_id}`;
		const full_content_new_msg = {
			"content": content,
			"embeds": embeds,
			"tts": false
		};
		return send_data({ "method": "PATCH", "body": JSON.stringify(full_content_new_msg), "url": url, "token": this.client.token, "get_json": false });
	}
}
module.exports = Interaction;