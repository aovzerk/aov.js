"use strict";

const BaseCacheManager = require("./BaseCacheManager");

class GuildMembersCacheManager extends BaseCacheManager {
	constructor(client) {
		super(client);
	}
	resolve(id) {
		const gets_member = this.cache.get(id);
		if (gets_member) return gets_member;
		return null;
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
	delete(member) {
		this.cache.delete(member.d.user.id);
	}
}
module.exports = GuildMembersCacheManager;