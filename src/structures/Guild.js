"use strict";

const GuildMembersCacheManager = require("../client/managers/GuildMembersCacheManager");
const GuildRoleCacheManager = require("../client/managers/GuildRoleCacheManager");
class Guild {
	constructor(client, action) {
		this.client = client;
		this.d = action.d;
		this._members = new GuildMembersCacheManager(this.client);
		this._roles = new GuildRoleCacheManager(this.client);
	}
	get channels() {
		return this.client.channels.get_channels_guild(this.d.id);
	}
	member(id) {
		return this._members.resolve(id);
	}
	get members() {
		return this._members;
	}
	get roles() {
		return this._roles;
	}
	async create_slash(options) {
		return this.client.rest.rest_guild.create_slash({ "slash_command_data": options, "guild_id": this.d.id });
	}
}
module.exports = Guild;