"use strict";

const Message = require("../structures/Message");
class Channel {
	constructor(chn_data, client) {
		this.d = chn_data;
		this.client = client;

	}
	get guild() {
		return this.client.guilds.resolve(this.d.guild_id);
	}
	send(options) {
		const { content, embeds, components } = options;
		return new Promise((result, reject) => {
			this.client.rest.rest_channel.send({ "content": content, "embeds": embeds, "components": components, "channel_id": this.d.id }).then(async msg_data => {
				result(new Message(this.client, { "d": msg_data }));
			}).catch(err => reject(err));
		});

	}
	join() {
		this.client.rest.rest_channel.join({ "guild_id": this.guild.d.id, "channel_id": this.d.id });
		return new Promise((result, reject) => {
			this.client.on("CREATE_VOICE_CONNECTION", function emit_voice(Voice, client) {
				client.removeListener("CREATE_VOICE_CONNECTION", emit_voice);
				result(Voice);
			});
		});
	}
}
module.exports = Channel;