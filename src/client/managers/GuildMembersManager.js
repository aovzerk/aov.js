"use strict";

class GuildMembersManager {
	constructor(client) {
		this.client = client;
		this.cache = new Map();
	}
	resolve(id) {
		const gets_member = this.cache.get(id);
		if (gets_member) return gets_member;
		throw Error(`None member id: ${id}`);
	}
	get_members_guild(id) {
		const cache_members = new Map();
		this.cache.forEach(el => {
			if (el.d.guild_id == id) {
				cache_members.set(el.d.id, el);
			}
		});
		return cache_members;
	}
	add(member) {
		this.cache.set(member.d.user.id, member);
	}
}
module.exports = GuildMembersManager;