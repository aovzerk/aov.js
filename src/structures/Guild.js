"use strict";

const urls = require("../consts/urls.json");
const { send_data } = require("../utils/utils");
const GuildMembersManager = require("../client/managers/GuildMembersManager");
class Guild {
	constructor(client, action) {
		this.client = client;
		this.d = action.d;
		this._members = new GuildMembersManager(this);
	}
	get channels() {
		return this.client.channels.get_channels_guild(this.d.id);
	}
	get members() {
		return this._members.cache;
	}
	async create_slash(options) {
		const url = `${urls.base_url}/applications/${this.client.user.id}/guilds/${this.d.id}/commands`;
		return send_data({ "method": "POST", "body": JSON.stringify(options), "url": url, "token": this.client.token });
	}
}
module.exports = Guild;