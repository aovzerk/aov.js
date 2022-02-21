const urls = require("../../consts/urls.json");
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
}
module.exports = RestChannelManager;