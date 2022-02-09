const { del_roles, add_roles } = require("../utils/utils");
const consts = require("../consts.json");

class Guild_member {
	constructor(data, guild) {
		this.data = data;
		this.guild = guild;
	}
	async add_role(id) {
		const url = `${consts.base_url}/guilds/${this.guild.id}/members/${this.data.user.id}/roles/${id}`;
		return add_roles({ "url": url, "token": this.guild.token });
	}
	async del_role(id) {
		const url = `${consts.base_url}/guilds/${this.guild.id}/members/${this.data.user.id}/roles/${id}`;
		return del_roles({ "url": url, "token": this.guild.token });
	}

}
module.exports = Guild_member;