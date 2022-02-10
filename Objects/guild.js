/* eslint-disable no-undef */
/* eslint-disable no-async-promise-executor */
const { send_data, get_create_at_user } = require("../utils/utils");
const consts = require("../consts.json");
const Guild_member = require("./guild_member");
const Role = require("./role");
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
			const user = await this.get_user(id).catch(err => reject(err));
			const guild = this;
			send_data({ "method": method, "body": null, "url": url, "token": this.token }).then(async member => {
				const full_member = member;
				full_member.user.create_at = user.create_at;
				full_member.user.banner = user.banner;
				full_member.user.bot = user.bot ? user.bot : false;
				full_member.joined_at = new Date(full_member.joined_at).getTime();
				let role_everyone = null;
				this.data.roles.forEach(role => {
					full_member.roles.forEach((user_role, i) => {
						if (role.id == user_role) {
							full_member.roles[i] = new Role(role);
						}
					});
					if (role.name == "@everyone") {
						role_everyone = new Role(role);
					}
				});
				full_member.roles.push(role_everyone);
				full_member.roles.sort((a, b) => (a.position < b.position ? -1 : 1));
				const guildmember = new Guild_member(full_member, guild);
				result(guildmember);
			}).catch(err => reject(err));
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
			}).catch(err => reject(err));
		});
	}

}
module.exports = Guild;