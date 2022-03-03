"use strict";
const Guild = require("../../structures/Guild");
module.exports = (client, action) => {

	const old_guild = client.guilds.resolve(action.d.id);
	const new_guild = new Guild(client, action);

	Object.assign(new_guild, old_guild);
	new_guild.d = action.d;

	client.guilds.add(new_guild);
	client.emit(action.t, old_guild, new_guild);

};