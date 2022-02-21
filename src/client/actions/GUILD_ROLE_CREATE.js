"use strict";

const Role = require("../../structures/Role");
module.exports = async (client, action) => {
	const new_role = new Role(action.d.role, client);
	const guild = client.guilds.resolve(action.d.guild_id);
	guild.roles.add(new_role);
	client.guilds.add(guild);
	client.emit(action.t, new_role);

};