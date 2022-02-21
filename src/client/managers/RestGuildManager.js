"use strict";
const urls = require("../../consts/urls.json");
const BaseRestManager = require("./BaseRestManager");
class RestGuildManager extends BaseRestManager {
	constructor(client) {
		super();
		this.client = client;
	}
	create_slash(options) {
		const { slash_command_data, guild_id } = options;
		const url = `${urls.base_url}/applications/${this.client.user.id}/guilds/${guild_id}/commands`;
		return this.send_data({ "method": "POST", "body": JSON.stringify(slash_command_data), "url": url, "token": this.client.token });
	}
	add_role_member(options) {
		const { role_id, member } = options;
		const url = `${urls.base_url}/guilds/${member.d.guild_id}/members/${member.d.user.id}/roles/${role_id}`;
		return this.send_data({ "method": "PUT", "url": url, "body": null, "token": this.client.token, "get_json": false });
	}
	delete_role_member(options) {
		const { role_id, member } = options;
		const url = `${urls.base_url}/guilds/${member.d.guild_id}/members/${member.d.user.id}/roles/${role_id}`;
		return this.send_data({ "method": "DELETE", "url": url, "body": null, "token": this.client.token, "get_json": false });
	}
}
module.exports = RestGuildManager;