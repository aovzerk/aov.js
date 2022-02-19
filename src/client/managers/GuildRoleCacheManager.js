"use strict";

const BaseManager = require("./BaseCacheManager");

class GuildRoleCacheManager extends BaseManager {
	constructor(client) {
		super(client);
	}
	get_roles(id_s) {
		const cache_roles = new Map();
		id_s.forEach(role_id => {
			cache_roles.set(role_id, this.resolve(role_id));
		});
		return cache_roles;
	}
}
module.exports = GuildRoleCacheManager;