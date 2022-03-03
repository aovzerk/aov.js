"use strict";
const TrackMessageComponent = require("./TrackMessageComponent");
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
	reply(options) {
		const { content, embeds, components } = options;
		return new Promise((result, reject) => {
			this.client.rest.rest_channel.message_reply({ "content": content, "embeds": embeds, "components": components, "channel_id": this.d.channel_id, "message_id": this.d.id, "guild_id": this.d.guild_id }).then(async msg_data => {
				result(new Message(this.client, { "d": msg_data }));
			}).catch(err => reject(err));
		});

	}
	delete() {
		if (!this.deleted) {
			this.deleted = 1;
			return this.client.rest.rest_channel.message_delete({ "channel_id": this.d.channel_id, "message_id": this.d.id });
		} else {

			throw Error("Message is deleted");
		}

	}
	create_tracking_componets_action(filter, time) {
		return new TrackMessageComponent(this, filter, time);
	}
}
module.exports = Message;