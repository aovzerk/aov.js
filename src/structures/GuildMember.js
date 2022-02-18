"use strict";
const { get_create_at_user } = require("../utils/utils");
class GuildMember {
	constructor(member_data, client) {
		this.d = member_data;
		this.d.user.create_at = get_create_at_user(this.d.user.id);
		this.d.joined_at = new Date(this.d.joined_at).getTime();
		this.client = client;
	}
}
module.exports = GuildMember;