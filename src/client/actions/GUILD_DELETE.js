"use strict";
const Guild = require("../../structures/Guild");
module.exports = async (client, action) => {
	const deleted_guild = new Guild(action, client);
	client.guilds.delete(deleted_guild);
	client.emit(action.t, deleted_guild);
};