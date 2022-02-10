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
	bannerURL(size) {
		if (this.data.user.banner == null) return "";
		const url = `${consts.cdn_url}/banners/${this.data.user.id}/${this.data.user.banner}`;
		if (this.data.user.banner[0] == "a") {
			return `${url}.gif?size=${size}`;
		} else {
			return `${url}.png?size=${size}`;
		}

	}
	avatarURL(size) {
		if (this.data.user.avatar == null) return "";
		const url = `${consts.cdn_url}/avatars/${this.data.user.id}/${this.data.user.avatar}`;
		if (this.data.user.avatar[0] == "a") {
			return `${url}.gif?size=${size}`;
		} else {
			return `${url}.png?size=${size}`;
		}
	}
	highest_role() {
		return this.data.roles[0];
	}
	toString() {
		return `<@${this.data.user.id}>`;
	}

}
module.exports = Guild_member;