const { send_data, delet_msg } = require("../utils/utils");
const consts = require("../consts.json");
const channel = require("./channel");
class Message {
	constructor(action, token, guild, member, client) {
		this.client = client;
		this.message_structure = action.d;
		this.id = this.message_structure.id;
		this.token = token;
		this.channel = new channel(this);
		this.guild = guild;
		this.member = member;
		this.url_delete = `${consts.base_url}/channels/${this.message_structure.channel_id}/messages/${this.message_structure.id}`;
	}

	async delete(id) {
		return delet_msg({ "url": this.url_delete, "token": this.token });
	}
	async reply(options) {
		const { content, embeds } = options;
		const full_content_new_msg = {
			"content": content,
			"embeds": embeds,
			"message_reference": {
				"message_id": this.message_structure.id,
				"channel_id": this.message_structure.channel_id,
				"guild_id": this.message_structure.guild_id,
				"fail_if_not_exists": false
			},
			"type": 19,
			"tts": false
		};
		const url = `${consts.base_url}/channels/${this.message_structure.channel_id}/messages`;
		send_data({ "method": "POST", "body": JSON.stringify(full_content_new_msg), "url": url, "token": this.token });
	}
	async create_msg_obj(action, token, guild, member, client) {
		const new_msg = new Message(action, token, guild, member, client);
		return new_msg;
	}
}
module.exports = Message;