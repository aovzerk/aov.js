"use strict";
const urls = require("../../consts/urls.json");
const { send_data } = require("../../utils/utils");
class RolesManager {
	constructor(member) {
		this.member = member;
	}
	get cache() {
		return this.member.guild._roles.get_roles(this.member.d.roles);
	}
	async add(role_id) {
		const url = `${urls.base_url}/guilds/${this.member.d.guild_id}/members/${this.member.d.user.id}/roles/${role_id}`;
		return send_data({ "method": "PUT", "url": url, "body": null, "token": this.member.client.token, "get_json": false });
	}
	async delete(role_id) {
		const url = `${urls.base_url}/guilds/${this.member.d.guild_id}/members/${this.member.d.user.id}/roles/${role_id}`;
		return send_data({ "method": "DELETE", "url": url, "body": null, "token": this.member.client.token, "get_json": false });
	}
}
module.exports = RolesManager;