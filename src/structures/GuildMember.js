"use strict";

class GuildMember {
	constructor(member_data, client) {
		this.d = member_data;
		this.client = client;
	}
}
module.exports = GuildMember;