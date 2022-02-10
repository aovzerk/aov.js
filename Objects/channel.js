/* eslint-disable no-async-promise-executor */
const { send_data, get_data, Bulk_Delete } = require("../utils/utils");
const consts = require("../consts.json");
class Channel {
	constructor(msg, guild) {
		this.id = msg.message_structure.channel_id;
		this.msg = msg;
		this.guild = guild;
	}
	async send(options) {
		const { content, embeds } = options;
		const full_content_new_msg = {
			"content": content,
			"embeds": embeds,
			"tts": false
		};
		const url = `${consts.base_url}/channels/${this.id}/messages`;
		return new Promise(async (result, reject) => {
			send_data({ "method": "POST", "body": JSON.stringify(full_content_new_msg), "url": url, "token": this.msg.token }).then(async new_msg_d => {
				this.msg.guild.get_member(this.msg.client.user.id).then(async member => {
					const new_msg = this.msg.create_msg_obj({ "d": new_msg_d }, this.msg.token, this.msg.guild, member, this.msg.client);
					result(new_msg);
				}).catch(err => {
					reject(err);
				});
			}).catch(err => {
				reject(err);
			});
		});
	}
	async get_messages(options) {
		const { limit } = options;
		const url = `${consts.base_url}/channels/${this.id}/messages?limit=${limit}`;
		return get_data({ "url": url, "token": this.msg.token });
	}
	async BulkDelete(options) {
		const msg_s = await this.get_messages(options);
		const msg_ids = [];
		for (const el of msg_s) {
			msg_ids.push(el.id);
		}
		const full_data_body = { "messages": msg_ids };
		return Bulk_Delete({ "chn_id": this.id, "body": JSON.stringify(full_data_body), "token": this.msg.token });
	}
}
module.exports = Channel;