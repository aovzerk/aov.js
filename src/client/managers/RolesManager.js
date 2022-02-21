"use strict";

class RolesManager {
	constructor(member) {
		this.member = member;
	}
	get cache() {
		return this.member.guild._roles.get_roles(this.member.d.roles);
	}
	async add(role_id) {
		return this.member.client.rest.rest_guild.add_role_member({ "role_id": role_id, "member": this.member });
	}
	async delete(role_id) {
		return this.member.client.rest.rest_guild.delete_role_member({ "role_id": role_id, "member": this.member });
	}
}
module.exports = RolesManager;