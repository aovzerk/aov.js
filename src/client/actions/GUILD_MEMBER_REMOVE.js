"use strict";

const GuildMember = require("../../structures/GuildMember");
module.exports = async (client, action) => {

	const remove_member = new GuildMember(action.d, client);
	const guild = client.guilds.resolve(action.d.guild_id);
	guild.members.delete(remove_member);
	client.guilds.add(guild);
	client.emit(action.t, remove_member);

};