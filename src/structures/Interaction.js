"use strict";
class Interaction {
	constructor(client, action) {
		this.client = client;
		this.d = action.d;
	}
	get channel() {
		return this.client.channels.resolve(this.d.channel_id);
	}
	get guild() {
		return this.client.guilds.resolve(this.d.guild_id);
	}
	get member() {
		return this.guild.member(this.d.member.user.id);
	}
	async deferReply() {
		if (!this.deferReply_is && !this.reply_is) {
			this.deferReply_is = 1;
			return this.client.rest.rest_interaction.deferReply({ "token": this.d.token, "id": this.d.id });
		}

	}
	async reply(options) {
		const { content, embeds, components, ephemeral } = options;
		if (this.deferReply_is && !this.reply_is) {
			this.reply_is = 1;
			return this.client.rest.rest_interaction.edit_webhook({ "content": content, "embeds": embeds, "components": components, "ephemeral": ephemeral, "token": this.d.token, "id": this.d.application_id });
		}
		if (!this.deferReply_is && !this.reply_is) {
			this.reply_is = 1;
			return this.client.rest.rest_interaction.callback_reply({ "content": content, "embeds": embeds, "components": components, "ephemeral": ephemeral, "token": this.d.token, "id": this.d.id });
		}
	}
}
module.exports = Interaction;