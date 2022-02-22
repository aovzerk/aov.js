"use strict";

const Role = require("../../structures/Role");
module.exports = async (client, action) => {

	const guild = client.guilds.resolve(action.d.guild_id);
	const new_role = new Role(action.d.role, client);
	const old_role = guild.roles.resolve(new_role.d.id);

	guild.roles.add(new_role);
	client.guilds.add(guild);
	client.emit(action.t, old_role, new_role);

};