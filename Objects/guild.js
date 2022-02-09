/* eslint-disable no-undef */
/* eslint-disable no-async-promise-executor */
const { send_data, get_create_at_user } = require("../utils/utils");
const consts = require("../consts.json");
const Guild_member = require("./guild_member");
class Guild {
	constructor(options) {
		const { id, token, data } = options;
		this.id = id;
		this.token = token;
		this.data = data;
	}


	async get_member(id) {
		return new Promise(async (result, reject) => {
			const url = `${consts.base_url}/guilds/${this.id}/members/${id}`;
			const method = "GET";
			const user = await this.get_user(id);
			const guild = this;
			send_data({ "method": method, "body": null, "url": url, "token": this.token }).then(async member => {
				const full_member = member;
				full_member.user.create_at = user.create_at;
				full_member.user.banner = user.banner;
				const guildmember = new Guild_member(full_member, guild);
				result(guildmember);
			});
		});
	}
	async get_user(id) {
		return new Promise(async (result, reject) => {
			const url = `${consts.base_url}/users/${id}`;
			const method = "GET";
			send_data({ "method": method, "body": null, "url": url, "token": this.token }).then(async user => {

				const create_at = get_create_at_user(id);
				const full_user = user;
				full_user.create_at = create_at;
				result(full_user);
			});
		});
	}

}
module.exports = Guild;